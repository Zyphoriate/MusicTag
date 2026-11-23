#!/bin/sh
# Gunicorn launcher used by supervisord.
#
# The base image's /start does `manage.py migrate` and then gunicorn. This
# image already migrates in the entrypoint before supervisord starts, so
# reusing /start makes two processes migrate and write the SQLite database at
# the same time as celery beat/worker start up -- which is what produces the
# "sqlite3.OperationalError: database is locked" tracebacks in the log.
set -e

GUNICORN_PORT=${GUNICORN_PORT:-8001}
GUNICORN_WORKERS=${GUNICORN_WORKERS:-1}
GUNICORN_TIMEOUT=${GUNICORN_TIMEOUT:-120}
USE_ASGI=${USE_ASGI:-true}

if [ "$USE_ASGI" = "true" ]; then
    exec gunicorn \
        -w "$GUNICORN_WORKERS" \
        -k django_vue_cli.uvicorn_worker.LifespanOffUvicornWorker \
        -b "0.0.0.0:${GUNICORN_PORT}" \
        django_vue_cli.asgi:application \
        --timeout "$GUNICORN_TIMEOUT"
else
    exec gunicorn \
        -w 1 \
        -b "0.0.0.0:${GUNICORN_PORT}" \
        django_vue_cli.wsgi:application \
        --timeout "$GUNICORN_TIMEOUT" \
        --worker-class=gevent
fi
