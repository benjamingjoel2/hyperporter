#!/bin/sh
# One-time TLS bootstrap. Run this ONCE on the server, before the first
# `docker compose up -d --build`.
#
# Why it exists: nginx/default.conf has ssl_certificate directives, and
# nginx refuses to start if those files are missing. But certbot needs a
# running nginx to answer the ACME HTTP challenge. Chicken and egg. This
# writes a throwaway self-signed cert so nginx can boot, requests the real
# one, then swaps it in.
#
# Safe to re-run: it will not overwrite a real certificate (see the guard
# below). To force a reissue, delete data/certbot/conf/live/<domain> first.

set -eu

DOMAIN="${DOMAIN:-hyperporter.com}"
WWW_DOMAIN="www.${DOMAIN}"
EMAIL="${LETSENCRYPT_EMAIL:-hello@hyperporter.com}"
DATA_PATH="./data/certbot"
# Set STAGING=1 to use Let's Encrypt's staging CA. Do this on your first
# attempt: the production CA rate-limits failed issuance attempts per
# domain per week, and a misconfigured DNS record can burn through them.
STAGING="${STAGING:-0}"

cd "$(dirname "$0")/.."

if [ -d "$DATA_PATH/conf/live/$DOMAIN" ]; then
  echo "Certificate directory for $DOMAIN already exists."
  echo "Refusing to overwrite. Delete $DATA_PATH/conf/live/$DOMAIN to reissue."
  exit 0
fi

echo "==> Fetching recommended TLS parameters"
mkdir -p "$DATA_PATH/conf" "$DATA_PATH/www"
if [ ! -e "$DATA_PATH/conf/options-ssl-nginx.conf" ]; then
  curl -fsSL https://raw.githubusercontent.com/certbot/certbot/main/certbot-nginx/src/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf \
    > "$DATA_PATH/conf/options-ssl-nginx.conf"
fi
if [ ! -e "$DATA_PATH/conf/ssl-dhparams.pem" ]; then
  curl -fsSL https://raw.githubusercontent.com/certbot/certbot/main/certbot/certbot/ssl-dhparams.pem \
    > "$DATA_PATH/conf/ssl-dhparams.pem"
fi

echo "==> Creating a temporary self-signed certificate so nginx can start"
mkdir -p "$DATA_PATH/conf/live/$DOMAIN"
docker compose run --rm --entrypoint "\
  openssl req -x509 -nodes -newkey rsa:2048 -days 1 \
    -keyout '/etc/letsencrypt/live/$DOMAIN/privkey.pem' \
    -out '/etc/letsencrypt/live/$DOMAIN/fullchain.pem' \
    -subj '/CN=localhost'" certbot

echo "==> Starting nginx"
docker compose up --force-recreate -d web

echo "==> Removing the temporary certificate"
docker compose run --rm --entrypoint "\
  rm -rf /etc/letsencrypt/live/$DOMAIN \
         /etc/letsencrypt/archive/$DOMAIN \
         /etc/letsencrypt/renewal/$DOMAIN.conf" certbot

echo "==> Requesting the real certificate from Let's Encrypt"
[ "$STAGING" != "0" ] && STAGING_ARG="--staging" || STAGING_ARG=""
# shellcheck disable=SC2086
docker compose run --rm --entrypoint "\
  certbot certonly --webroot -w /var/www/certbot \
    $STAGING_ARG \
    -d $DOMAIN -d $WWW_DOMAIN \
    --email $EMAIL \
    --rsa-key-size 2048 \
    --agree-tos \
    --non-interactive" certbot

echo "==> Reloading nginx with the real certificate"
docker compose exec web nginx -s reload

echo
echo "Done. https://$DOMAIN should now be serving."
echo "From here on, deploys are just:  git pull origin main && docker compose up -d --build"
