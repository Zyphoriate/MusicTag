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


def install():
    import sys
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
