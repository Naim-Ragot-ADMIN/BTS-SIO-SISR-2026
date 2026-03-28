#!/usr/bin/env bash
set -euo pipefail

STACK_DIR="${STACK_DIR:-/opt/gitea-stack}"
HTTP_PORT="${HTTP_PORT:-3000}"
SSH_PORT="${SSH_PORT:-2222}"

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker est requis." >&2
  exit 1
fi

mkdir -p "${STACK_DIR}"

cat > "${STACK_DIR}/compose.yaml" <<YAML
services:
  server:
    image: gitea/gitea:latest
    container_name: gitea
    restart: unless-stopped
    ports:
      - "${HTTP_PORT}:3000"
      - "${SSH_PORT}:22"
    volumes:
      - gitea-data:/data
volumes:
  gitea-data:
YAML

docker compose -f "${STACK_DIR}/compose.yaml" up -d

echo "Gitea deployee. Interface web sur le port ${HTTP_PORT}, SSH sur ${SSH_PORT}."
