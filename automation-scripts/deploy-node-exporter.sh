#!/usr/bin/env bash
set -euo pipefail

CONTAINER_NAME="${CONTAINER_NAME:-node-exporter}"
PORT="${PORT:-9100}"

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker est requis." >&2
  exit 1
fi

if docker ps -a --format '{{.Names}}' | grep -qx "${CONTAINER_NAME}"; then
  echo "Le conteneur ${CONTAINER_NAME} existe deja."
  exit 0
fi

docker run -d \
  --name "${CONTAINER_NAME}" \
  --restart unless-stopped \
  -p "${PORT}:9100" \
  prom/node-exporter:latest

echo "Node Exporter deployee sur le port ${PORT}."
