#!/usr/bin/env bash
set -euo pipefail

STACK_DIR="${STACK_DIR:-/opt/glpi-stack}"
GLPI_PORT="${GLPI_PORT:-8088}"
DB_NAME="${DB_NAME:-glpi}"
DB_USER="${DB_USER:-glpi}"
DB_PASSWORD="${DB_PASSWORD:-ChangeMe123!}"
DB_ROOT_PASSWORD="${DB_ROOT_PASSWORD:-RootChangeMe123!}"
TZ_VALUE="${TZ_VALUE:-Europe/Paris}"

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Commande requise absente: $1" >&2
    exit 1
  fi
}

require_command docker

mkdir -p "${STACK_DIR}"

cat > "${STACK_DIR}/compose.yaml" <<YAML
services:
  mariadb:
    image: mariadb:11
    container_name: glpi-mariadb
    restart: unless-stopped
    environment:
      MARIADB_DATABASE: ${DB_NAME}
      MARIADB_USER: ${DB_USER}
      MARIADB_PASSWORD: ${DB_PASSWORD}
      MARIADB_ROOT_PASSWORD: ${DB_ROOT_PASSWORD}
      TZ: ${TZ_VALUE}
    command:
      - --character-set-server=utf8mb4
      - --collation-server=utf8mb4_unicode_ci
    volumes:
      - glpi-db:/var/lib/mysql

  glpi:
    image: diouxx/glpi:latest
    container_name: glpi-app
    restart: unless-stopped
    depends_on:
      - mariadb
    ports:
      - "${GLPI_PORT}:80"
    environment:
      TIMEZONE: ${TZ_VALUE}
    volumes:
      - glpi-files:/var/www/html/files
      - glpi-config:/var/www/html/config

volumes:
  glpi-db:
  glpi-files:
  glpi-config:
YAML

echo "Lancement de la stack GLPI..."
docker compose -f "${STACK_DIR}/compose.yaml" up -d

cat <<EOF
GLPI deploye dans ${STACK_DIR}
- Interface: http://localhost:${GLPI_PORT}
- Base: mariadb:11

Pense a terminer l'assistant d'installation web puis a securiser les mots de passe et les volumes.
EOF
