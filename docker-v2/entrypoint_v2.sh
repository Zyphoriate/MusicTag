#!/bin/sh
# Entrypoint for the self-activated Music Tag Web V2 image.
# Mirrors /entrypoint.sh from the base image, but runs the V2 activation
# step after migrations and before supervisord starts the services.

set -e

PUID=${PUID:-0}
PGID=${PGID:-0}
UMASK=${UMASK:-022}

mkdir -p /app/log /app/data /app/media /app/download /app/virtual /app/webdav
umask "$UMASK"

if [ "$PUID" -eq 0 ] || [ "$PGID" -eq 0 ]; then
    echo "Skipping creation of musictag user because PUID or PGID is set to 0."
    export MY_PROGRAM_USER=root
else
    if ! id -u musictag >/dev/null 2>&1; then
        echo "user musictag not exists, creating it"
        useradd -d /app -u "$PUID" musictag
        usermod -o -u "$PUID" musictag
        groupmod -o -g "$PGID" musictag
        chown -R musictag:musictag /var/run/ /usr/local/nginx/
        chown musictag:musictag /app
        chown musictag:musictag /app/compose/prod/nginx/nginx.conf
        for directory in /app/log /app/data /app/media /app/download /app/virtual /app/webdav; do
            if ! grep -Fq " $directory " /proc/self/mountinfo; then
                chown -R musictag:musictag "$directory"
            fi
        done
        chmod 644 /app/supervisor.conf
    fi
    export MY_PROGRAM_USER=musictag
fi

run_migrations() {
    if [ "$PUID" -eq 0 ] || [ "$PGID" -eq 0 ]; then
        python manage.py migrate --noinput
    else
        gosu musictag python manage.py migrate --noinput
    fi
}

run_activation() {
    if [ "$PUID" -eq 0 ] || [ "$PGID" -eq 0 ]; then
        python /activate_v2.py
    else
        gosu musictag python /activate_v2.py
    fi
}

cd /app
run_migrations
run_activation

# This image never relies on `command:` from compose: activation runs in the
# entrypoint, so `command: /start` and the default CMD behave the same here.
echo "requested command args (ignored): $*"
echo "gunicorn=${GUNICORN_PORT:-8001} nginx=${NGINX_PORT:-8002} user=${MY_PROGRAM_USER}"

if [ "$PUID" -eq 0 ] || [ "$PGID" -eq 0 ]; then
    exec /usr/bin/supervisord -c /app/supervisor-root.conf
else
    exec gosu musictag /usr/bin/supervisord -c /app/supervisor.conf
fi
