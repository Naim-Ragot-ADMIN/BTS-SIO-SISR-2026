#!/usr/bin/env bash
set -euo pipefail

PORTAINER_NAME="${PORTAINER_NAME:-portainer}"
HTTP_EDGE_PORT="${HTTP_EDGE_PORT:-8000}"
HTTPS_PORT="${HTTPS_PORT:-9443}"

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker est requis." >&2
  exit 1
fi

docker volume create portainer_data >/dev/null

if docker ps -a --format '{{.Names}}' | grep -qx "${PORTAINER_NAME}"; then
  echo "Le conteneur ${PORTAINER_NAME} existe deja."
  exit 0
fi

docker run -d \
  --name "${PORTAINER_NAME}" \
  --restart unless-stopped \
  -p "${HTTP_EDGE_PORT}:8000" \
  -p "${HTTPS_PORT}:9443" \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v portainer_data:/data \
  portainer/portainer-ce:lts

echo "Portainer deployee sur le port ${HTTPS_PORT}."
