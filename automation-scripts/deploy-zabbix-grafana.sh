#!/usr/bin/env bash
set -euo pipefail

ZABBIX_VERSION="${ZABBIX_VERSION:-7.4}"
WORKDIR="${WORKDIR:-/opt/monitoring}"
ZABBIX_REPO="${WORKDIR}/zabbix-docker"
GRAFANA_VOLUME="${GRAFANA_VOLUME:-grafana-storage}"

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker doit etre installe avant de lancer ce script." >&2
  exit 1
fi

mkdir -p "${WORKDIR}"

if [ ! -d "${ZABBIX_REPO}/.git" ]; then
  git clone https://github.com/zabbix/zabbix-docker.git "${ZABBIX_REPO}"
fi

cd "${ZABBIX_REPO}"
git fetch --tags --force
git checkout "${ZABBIX_VERSION}"

docker compose -f docker-compose_v3_alpine_mysql_latest.yaml up -d

docker volume create "${GRAFANA_VOLUME}" >/dev/null

if ! docker ps -a --format '{{.Names}}' | grep -qx 'grafana'; then
  docker run -d \
    --name grafana \
    --restart unless-stopped \
    -p 3000:3000 \
    -v "${GRAFANA_VOLUME}:/var/lib/grafana" \
    grafana/grafana-enterprise
else
  docker start grafana >/dev/null || true
fi

cat <<EOF
Deploiement termine.
- Zabbix Web: http://<IP>:8080
- Grafana: http://<IP>:3000
- Pense a securiser les mots de passe et a verifier les fichiers .env du projet Zabbix.
EOF
