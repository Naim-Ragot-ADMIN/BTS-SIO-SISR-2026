#!/usr/bin/env bash
set -euo pipefail

STACK_DIR="${STACK_DIR:-/opt/reverse-proxy-lab}"
HTTP_PORT="${HTTP_PORT:-80}"
HTTPS_PORT="${HTTPS_PORT:-443}"
ADMIN_PORT="${ADMIN_PORT:-81}"

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker est requis." >&2
  exit 1
fi

mkdir -p "${STACK_DIR}"

cat > "${STACK_DIR}/compose.yaml" <<YAML
services:
  nginx-proxy-manager:
    image: jc21/nginx-proxy-manager:latest
    container_name: nginx-proxy-manager
    restart: unless-stopped
    ports:
      - "${HTTP_PORT}:80"
      - "${HTTPS_PORT}:443"
      - "${ADMIN_PORT}:81"
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
YAML

docker compose -f "${STACK_DIR}/compose.yaml" up -d

cat <<EOF
Reverse proxy de lab deployee.
- HTTP  : ${HTTP_PORT}
- HTTPS : ${HTTPS_PORT}
- Admin : ${ADMIN_PORT}
EOF
