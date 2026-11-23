"""Local license adapter for the isolated self-signed demonstration image."""
import functools
import json
import os
from pathlib import Path

import requests

LICENSE_DIR = Path('/app/license')
VERIFY_PATH = '/iam/code/verify/'
_original_post = requests.post


def local_license():
    blob = (LICENSE_DIR / 'license_blob.txt').read_text().strip()
    code = (LICENSE_DIR / 'license_code.txt').read_text().strip()
    return code, blob


def post(url, *args, **kwargs):
    from urllib.parse import urlparse
    if urlparse(str(url)).path.rstrip('/') == VERIFY_PATH.rstrip('/'):
        code, blob = local_license()
        response = requests.Response()
        response.status_code = 200
        response.encoding = 'utf-8'
        response._content = json.dumps({'result': True, 'message': 'Local test license',
                                       'data': {'license_blob': blob, 'license_schema': 'signed_v1'}}).encode()
        response.url = str(url)
        return response
    return _original_post(url, *args, **kwargs)


requests.post = post

import django
_original_setup = django.setup


@functools.wraps(_original_setup)
def setup(*args, **kwargs):
    result = _original_setup(*args, **kwargs)
    install()
    return result


_CACHE_FALLBACK = {}


def _install_greenlet_safe_cache():
    """Keep the license path alive when redis misbehaves in the ASGI worker.

    gunicorn runs the app with the uvicorn worker under gevent monkeypatching;
    Django executes sync views in an asgiref thread pool. A redis connection
    opened in one greenlet and reused from another raises
    ``greenlet.error: cannot switch to a different thread``, which makes every
    request that reads the runtime license state answer HTTP 500 -- the UI then
    falls back to showing V1. Losing the cache is harmless, so on failure we
    degrade to a process-local dict instead of failing the request.
    """
    try:
        from django_redis.cache import RedisCache
    except Exception:
        return
    if getattr(RedisCache, '_mtw_local_fallback', False):
        return

    store = _CACHE_FALLBACK

    def patch(name, fallback):
        original = getattr(RedisCache, name, None)
        if original is None:
            return

        @functools.wraps(original)
        def wrapper(self, *args, **kwargs):
            try:
                return original(self, *args, **kwargs)
            except Exception:
                return fallback(*args, **kwargs)

        setattr(RedisCache, name, wrapper)

    def local_get(key, default=None, *args, **kwargs):
        return store.get(key, default)

    def local_set(key, value, *args, **kwargs):
        if kwargs.get('nx') and key in store:
            return False
        store[key] = value
        return True

    def local_add(key, value, *args, **kwargs):
        if key in store:
            return False
        store[key] = value
        return True

    def local_delete(key, *args, **kwargs):
        return 1 if store.pop(key, None) is not None else 0

    def local_get_many(keys, *args, **kwargs):
        return {k: store[k] for k in keys if k in store}

    def local_set_many(data, *args, **kwargs):
        store.update(data)
        return True

    patch('get', local_get)
    patch('set', local_set)
    patch('add', local_add)
    patch('delete', local_delete)
    patch('get_many', local_get_many)
    patch('set_many', local_set_many)
    RedisCache._mtw_local_fallback = True


def install():
    import sys

    _install_greenlet_safe_cache()

    import applications.user.utils as utils
    old = utils.verify_code
    if getattr(old, '_local_demo_adapter', False):
        return

    @functools.wraps(old)
    def verify_code(code, mode='active', fail_open=True):
        # Accept this build's test identifier or its signed blob only.
        identifier, blob = local_license()
        if str(code).strip() not in (identifier, blob):
            return False, '请输入本地测试码：' + identifier, '', '', ''
        valid, message, payload = utils._validate_local_signed_license(blob)
        if not valid:
            return False, message, '', '', ''
        # Preserve a non-empty legacy code, required by this release's state reader.
        return True, message, identifier, blob, 'signed_v1'

    verify_code._local_demo_adapter = True
    # Existing compiled modules may have imported the callable by value.
    for module in tuple(sys.modules.values()):
        namespace = getattr(module, '__dict__', {})
        if namespace.get('verify_code') is old:
            namespace['verify_code'] = verify_code


django.setup = setup
