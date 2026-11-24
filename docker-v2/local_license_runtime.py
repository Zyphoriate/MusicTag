"""Local license adapter for the isolated self-signed demonstration image."""
import functools
import json
import os
from pathlib import Path

LICENSE_DIR = Path('/app/license')
VERIFY_PATH = '/iam/code/verify/'
_POST_PATCHED = False


def local_license():
    blob = (LICENSE_DIR / 'license_blob.txt').read_text().strip()
    code = (LICENSE_DIR / 'license_code.txt').read_text().strip()
    return code, blob


def _patch_requests():
    """Intercept the IAM verify call -- lazily, and only after gevent patched.

    ``sitecustomize`` runs before ``applications`` calls
    ``gevent.monkey.patch_all()``. Importing ``requests`` (and therefore
    ``urllib3``/``ssl``) that early leaves those modules unpatched, which
    breaks every later HTTPS call with
    ``RecursionError: maximum recursion depth exceeded`` inside
    ``ssl``/``enum``. So the import happens here, at first setup, not on
    interpreter start.
    """
    global _POST_PATCHED
    if _POST_PATCHED:
        return
    import requests

    original_post = requests.post

    @functools.wraps(original_post)
    def post(url, *args, **kwargs):
        from urllib.parse import urlparse

        if urlparse(str(url)).path.rstrip('/') == VERIFY_PATH.rstrip('/'):
            code, blob = local_license()
            response = requests.Response()
            response.status_code = 200
            response.encoding = 'utf-8'
            response._content = json.dumps(
                {
                    'result': True,
                    'message': 'Local test license',
                    'data': {'license_blob': blob, 'license_schema': 'signed_v1'},
                }
            ).encode()
            response.url = str(url)
            return response
        return original_post(url, *args, **kwargs)

    requests.post = post
    _POST_PATCHED = True


import django
_original_setup = django.setup


@functools.wraps(_original_setup)
def setup(*args, **kwargs):
    result = _original_setup(*args, **kwargs)
    install()
    return result


_CACHE_FALLBACK = {}


def _patch_celery_pool():
    """Publish tasks on a fresh broker connection instead of a pooled one.

    Celery keeps producers in a pool. Under gevent, a connection created in one
    (asgiref worker) thread is bound to that thread's hub; once the thread
    exits, reusing it from another thread raises
    ``greenlet.error: cannot switch to a different thread (which happens to
    have exited)`` and the endpoint answers HTTP 500. Disabling the producer
    pool makes every ``.delay()`` open and use its connection locally.
    """
    candidates = []
    try:
        from django_vue_cli.celery_app import app as django_celery_app

        candidates.append(django_celery_app)
    except Exception:
        pass
    try:
        from celery import current_app

        candidates.append(current_app)
    except Exception:
        pass

    for app in candidates:
        try:
            app.conf.broker_pool_limit = 0
            app.conf.broker_connection_retry_on_startup = True
        except Exception:
            pass


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

    _patch_requests()
    _install_greenlet_safe_cache()
    _patch_celery_pool()

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

    _patch_license_state(utils)


def _patch_license_state(utils):
    """Make the runtime state derive from the signed blob, never from IAM.

    ``get_runtime_license_state`` caches its result and re-verifies it every
    ``LICENSE_RECHECK_SECONDS``. Inside gunicorn that recheck can fail (redis
    cache, IAM round trip, SQLite lock) and the app then falls back to role V1
    -- the UI flips to the V1 layout and every non-whitelisted endpoint answers
    "V1用户缺少权限". The license is local and signed, so when the normal path
    cannot produce a validated V2 state, compute it straight from the blob.
    """
    import sys
    import threading
    import time

    old = utils.get_runtime_license_state
    if getattr(old, '_local_demo_adapter', False):
        return

    guard = threading.local()

    @functools.wraps(old)
    def get_runtime_license_state(*args, **kwargs):
        # The compiled original looks the name up in module globals, so a call
        # from inside it would re-enter this wrapper and recurse forever.
        if getattr(guard, 'busy', False):
            return _v2_state_from_blob(utils)
        guard.busy = True
        try:
            state = old(*args, **kwargs)
        except Exception:
            state = None
        finally:
            guard.busy = False
        if isinstance(state, dict) and state.get('role') == 'V2' and state.get('validated'):
            return state
        return _v2_state_from_blob(utils)

    get_runtime_license_state._local_demo_adapter = True
    utils.get_runtime_license_state = get_runtime_license_state
    for module in tuple(sys.modules.values()):
        namespace = getattr(module, '__dict__', {})
        if namespace.get('get_runtime_license_state') is old:
            namespace['get_runtime_license_state'] = get_runtime_license_state


def _v2_state_from_blob(utils):
    import time

    now = int(time.time())
    try:
        _, blob = local_license()
        valid, message, payload = utils._validate_local_signed_license(blob)
    except Exception as exc:
        valid, message, payload = False, repr(exc), None
    payload = payload or {}
    return {
        'role': 'V2' if valid else 'V1',
        'validated': bool(valid),
        'message': message,
        'recheck_at': now + int(getattr(utils, 'LICENSE_RECHECK_SECONDS', 1800) or 1800),
        'grace_expires_at': now + int(getattr(utils, 'LICENSE_GRACE_SECONDS', 86400) or 86400),
        'license_payload': payload,
        'expires_at': payload.get('expires_at', now + 86400),
    }


django.setup = setup
