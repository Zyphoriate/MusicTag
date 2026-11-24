# syntax=docker/dockerfile:1

# Music Tag Web — self-activated V2 image
# Base: xhongc/music_tag_web:latest (v2.8.2)
#
# How it works:
#   1. At BUILD time we generate an RSA key pair, sign a `signed_v1` license
#      blob and OVERWRITE /app/license/license_public_key.pem with our own
#      public key.  The private key is deleted from the image.
#   2. At RUN time (after `manage.py migrate`) a small script writes
#      `code` / `raw_code` / `license_blob` / `license_schema` into the
#      SysSettings table so the runtime resolves role=V2 offline.
#
# WARNING: this replaces the vendor's public key.  A genuine license bought
# from the vendor will NOT verify on this image until you restore the
# original /app/license/license_public_key.pem.

FROM xhongc/music_tag_web:latest

# ---- build-time license generation -------------------------------------
# The vendor public key is left untouched (--skip-public-key): the runtime
# adapter accepts this blob through the normal license entry points, so a
# genuine vendor license keeps working on this image.
COPY gen_license.py /tmp/gen_license.py
RUN /usr/local/bin/python3 /tmp/gen_license.py \
        --out-dir /app/license \
        --code SELF-ACTIVATED-V2 \
        --channel docker \
        --days 36500 \
        --skip-public-key \
    && rm -f /app/license/license_private_key.pem /tmp/gen_license.py

# ---- runtime activation -------------------------------------------------
ENV MTW_LOCAL_TEST_LICENSE=1
COPY local_license_runtime.py sitecustomize.py /usr/local/lib/python3.11/site-packages/
COPY activate_v2.py /activate_v2.py
COPY entrypoint_v2.sh /start-gunicorn.sh /
RUN chmod +x /entrypoint_v2.sh /activate_v2.py /start-gunicorn.sh

# The entrypoint already migrated before supervisord starts, so the gunicorn
# program must not run /start again (that would migrate a second time and race
# celery beat/worker on the SQLite database).
RUN sed -i 's#^command = /start$#command = /start-gunicorn.sh#' \
        /app/supervisor.conf /app/supervisor-root.conf \
    && grep -H '^command = /start-gunicorn.sh$' /app/supervisor.conf /app/supervisor-root.conf

ENTRYPOINT ["/entrypoint_v2.sh"]
CMD ["/usr/bin/supervisord"]
