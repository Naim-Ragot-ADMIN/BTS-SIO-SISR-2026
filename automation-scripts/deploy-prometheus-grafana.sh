#!/usr/bin/env bash
set -euo pipefail

STACK_DIR="${STACK_DIR:-/opt/observability-stack}"
PROMETHEUS_PORT="${PROMETHEUS_PORT:-9090}"
GRAFANA_PORT="${GRAFANA_PORT:-3000}"

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker est requis." >&2
  exit 1
fi

mkdir -p "${STACK_DIR}/prometheus"

cat > "${STACK_DIR}/compose.yaml" <<YAML
services:
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    restart: unless-stopped
    ports:
      - "${PROMETHEUS_PORT}:9090"
    volumes:
      - ./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml:ro
  grafana:
    image: grafana/grafana:latest
    container_name: grafana
    restart: unless-stopped
    ports:
      - "${GRAFANA_PORT}:3000"
    volumes:
      - grafana-storage:/var/lib/grafana
volumes:
  grafana-storage:
YAML

cat > "${STACK_DIR}/prometheus/prometheus.yml" <<'YAML'
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: prometheus
    static_configs:
      - targets: ['prometheus:9090']
YAML

docker compose -f "${STACK_DIR}/compose.yaml" up -d

echo "Stack Prometheus + Grafana deployee dans ${STACK_DIR}."
