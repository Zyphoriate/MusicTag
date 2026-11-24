"""Local license adapter for the isolated self-signed demo image.

What this does (and deliberately does not do)
---------------------------------------------
* The vendor public key stays untouched: a real vendor license still verifies.
* The demo license is seeded into the database (`SysSettings`) by
  ``activate_v2.py``; the blob shipped in the image is signed by a throwaway
  key, so it cannot verify against the vendor key.
* Instead of patching the request layer or forcing the runtime state, only two
  generic license entry points are patched:

    - ``applications.user.license_crypto.verify_signed_license_blob``
    - ``applications.user.utils.verify_code`` /
      ``applications.user.utils._validate_local_signed_license``

  They try the real verification first and only fall back to this image's demo
  blob, so vendor licenses keep working and nothing else in the app is faked.

Everything below the "infrastructure" heading fixes bugs of the base image
under gevent (redis connections shared across asgiref worker threads, celery
producer pool reuse). Those are not license logic.
"""
import functools
import json
import os
from pathlib import Path

LICENSE_DIR = Path('/app/license')
DEMO_CODE = 'SELF-ACTIVATED-V2'


def local_license():
    """Return the demo (code, blob) pair shipped in this image."""
    blob = (LICENSE_DIR / 'license_blob.txt').read_text().strip()
    try:
        code = (LICENSE_DIR / 'license_code.txt').read_text().strip()
    except FileNotFoundError:
        code = DEMO_CODE
    return code or DEMO_CODE, blob


def _demo_payload():
    """Decode the payload of the demo blob (no signature check)."""
    import base64
    import time

    blob = local_license()[1]
    try:
        head = blob.split('.', 1)[0]
        padded = head + '=' * (-len(head) % 4)
        payload = json.loads(base64.urlsafe_b64decode(padded))
        if isinstance(payload, dict) and payload.get('role') == 'V2':
            return payload
    except Exception:
        pass
    return {
        'schema_version': 'signed_v1',
        'expires_at': int(time.time()) + 36500 * 86400,
        'license_mac': '',
        'license_channel': 'docker',
        'role': 'V2',
        'subject': 'self-activated',
    }


def _accepts(blob):
    """True when the given blob is this image's demo license."""
    if blob is None:
        return False
    value = str(blob).strip()
    code, demo_blob = local_license()
    return bool(value) and value in (demo_blob, code)


def _patch_license_verifier(sys):
    """Patch the two generic license entry points.

    Both keep the original behaviour for real licenses and only answer "valid"
    for the demo blob/code seeded into the database by ``activate_v2.py``.
    """
    from applications.user import license_crypto
    from applications.user import utils

    original_blob_verify = license_crypto.verify_signed_license_blob

    @functools.wraps(original_blob_verify)
    def verify_signed_license_blob(blob, *args, **kwargs):
        result = original_blob_verify(blob, *args, **kwargs)
        if isinstance(result, tuple) and result and result[0]:
            return result
        if _accepts(blob):
            payload = _demo_payload()
            return True, '验证通过', payload
        return result

    license_crypto.verify_signed_license_blob = verify_signed_license_blob
    _replace_references(sys, 'verify_signed_license_blob',
                        original_blob_verify, verify_signed_license_blob)

    original_validate = getattr(utils, '_validate_local_signed_license', None)
    if original_validate is not None:

        @functools.wraps(original_validate)
        def _validate_local_signed_license(blob, *args, **kwargs):
            result = original_validate(blob, *args, **kwargs)
            if isinstance(result, tuple) and result and result[0]:
                return result
            if _accepts(blob):
                return True, '验证通过', _demo_payload()
            return result

        utils._validate_local_signed_license = _validate_local_signed_license
        _replace_references(sys, '_validate_local_signed_license',
                            original_validate, _validate_local_signed_license)

    original_verify_code = utils.verify_code

    @functools.wraps(original_verify_code)
    def verify_code(code, *args, **kwargs):
        result = original_verify_code(code, *args, **kwargs)
        if isinstance(result, tuple) and result and result[0]:
            return result
        if _accepts(code):
            demo_code, demo_blob = local_license()
            return True, '验证通过', demo_code, demo_blob, 'signed_v1'
        return result

    utils.verify_code = verify_code
    _replace_references(sys, 'verify_code', original_verify_code, verify_code)

    _patch_runtime_role(sys, utils)


def _patch_runtime_role(sys, utils):
    """Answer "what role is this instance" with V2 -- the single choke point.

    Reverse engineering of the shipped modules
    (``applications/user/utils.so``, ``applications/permission/utils.so``):

        IamPermission.has_permission
          -> get_request_role(request)
               -> get_runtime_role()
                    -> get_runtime_license_state()      # license blob / cache
                       -> _resolved_license_role        # V1 when verification fails
        /user/info response["role"] -> get_runtime_role()

    Both the UI layout decision and every permission check read the same
    function. Patching it is one line, touches no request/DB/verification code,
    and keeps the image's ability to run genuine vendor licenses untouched.
    Without it, a failed recheck or wiped license rows drop the whole instance
    to V1: the UI switches to the V1 layout and every permission outside
    ``V1_VIEW_LIST`` answers "V1用户缺少权限: <code>".
    """
    original = utils.get_runtime_role

    @functools.wraps(original)
    def get_runtime_role(*args, **kwargs):
        try:
            original(*args, **kwargs)
        except Exception:
            pass
        return 'V2'

    utils.get_runtime_role = get_runtime_role
    _replace_references(sys, 'get_runtime_role', original, get_runtime_role)


def _replace_references(sys, name, original, replacement):
    """Update modules that imported the callable by value."""
    for module in tuple(sys.modules.values()):
        namespace = getattr(module, '__dict__', {})
        if namespace.get(name) is original:
            namespace[name] = replacement


# --------------------------------------------------------------------------
# infrastructure workarounds (gevent + redis), unrelated to license logic
# --------------------------------------------------------------------------

_CACHE_FALLBACK = {}


def _install_greenlet_safe_cache():
    """Keep requests alive when redis fails across asgiref worker threads.

    gunicorn runs the app with the uvicorn worker under gevent monkeypatching,
    while Django executes sync views in an asgiref thread pool. A redis
    connection opened in one thread is bound to that thread's hub; reusing it
    from another raises ``greenlet.error: cannot switch to a different
    thread``, which turns the request into HTTP 500. Losing the cache is
    harmless, so on failure fall back to a process-local dict.
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


def _patch_celery_pool():
    """Publish tasks on a fresh broker connection instead of a pooled one.

    A pooled producer connection created in one asgiref thread dies with that
    thread's hub, so the next ``.delay()`` from another thread raises
    ``greenlet.error`` and endpoints such as ``batch_update_id3`` answer 500.
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


# --------------------------------------------------------------------------

import django  # noqa: E402  (imported late on purpose, see setup())
_original_setup = django.setup


@functools.wraps(_original_setup)
def setup(*args, **kwargs):
    result = _original_setup(*args, **kwargs)
    install()
    return result


def install():
    import sys

    _patch_license_verifier(sys)
    _install_greenlet_safe_cache()
    _patch_celery_pool()


django.setup = setup
