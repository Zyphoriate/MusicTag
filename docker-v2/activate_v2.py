#!/usr/bin/env python3
"""Seed the Music Tag Web database with a self-signed V2 license.

Run AFTER `manage.py migrate` and BEFORE supervisord starts the app.
The license public key must already have been replaced at build time
(see gen_license.py / Dockerfile).
"""
import os
import sys

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "django_vue_cli.settings")
sys.path.insert(0, "/app")

import django  # noqa: E402

django.setup()

from django.conf import settings  # noqa: E402

from applications.task.models import SysSettings  # noqa: E402

LICENSE_DIR = os.path.join(str(settings.BASE_DIR), "license")
BLOB_PATH = os.path.join(LICENSE_DIR, "license_blob.txt")
CODE_PATH = os.path.join(LICENSE_DIR, "license_code.txt")


def main() -> None:
    with open(BLOB_PATH) as f:
        blob = f.read().strip()
    try:
        with open(CODE_PATH) as f:
            code = f.read().strip()
    except FileNotFoundError:
        code = "SELF-ACTIVATED-V2"
    if not code:
        code = "SELF-ACTIVATED-V2"

    rows = [
        ("code", code),
        ("raw_code", code),
        ("license_blob", blob),
        ("license_schema", "signed_v1"),
    ]
    for key, value in rows:
        _, created = SysSettings.objects.update_or_create(
            key=key, defaults={"value": value}
        )
        print(f"{'created' if created else 'updated'} SysSettings[{key}]")
    print("V2 license activated")


if __name__ == "__main__":
    main()
