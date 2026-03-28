#!/usr/bin/env bash
set -euo pipefail

STACK_DIR="${STACK_DIR:-/opt/observability-platform}"
GRAFANA_PORT="${GRAFANA_PORT:-3000}"
PROMETHEUS_PORT="${PROMETHEUS_PORT:-9090}"
LOKI_PORT="${LOKI_PORT:-3100}"
NODE_EXPORTER_PORT="${NODE_EXPORTER_PORT:-9100}"

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Commande requise absente: $1" >&2
    exit 1
  fi
}

require_command docker

mkdir -p "${STACK_DIR}/prometheus" "${STACK_DIR}/loki" "${STACK_DIR}/grafana/provisioning/datasources"

cat > "${STACK_DIR}/compose.yaml" <<YAML
services:
  prometheus:
    image: prom/prometheus:latest
    container_name: obs-prometheus
    restart: unless-stopped
    ports:
      - "${PROMETHEUS_PORT}:9090"
    volumes:
      - ./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml:ro

  grafana:
    image: grafana/grafana:latest
    container_name: obs-grafana
    restart: unless-stopped
    ports:
      - "${GRAFANA_PORT}:3000"
    volumes:
      - grafana-storage:/var/lib/grafana
      - ./grafana/provisioning:/etc/grafana/provisioning

  loki:
    image: grafana/loki:latest
    container_name: obs-loki
    restart: unless-stopped
    ports:
      - "${LOKI_PORT}:3100"
    command: -config.file=/etc/loki/local-config.yaml

  node-exporter:
    image: prom/node-exporter:latest
    container_name: obs-node-exporter
    restart: unless-stopped
    ports:
      - "${NODE_EXPORTER_PORT}:9100"

volumes:
  grafana-storage:
YAML

cat > "${STACK_DIR}/prometheus/prometheus.yml" <<YAML
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: prometheus
    static_configs:
      - targets: ['prometheus:9090']
  - job_name: node-exporter
    static_configs:
      - targets: ['node-exporter:9100']
  - job_name: loki
    static_configs:
      - targets: ['loki:3100']
YAML

cat > "${STACK_DIR}/grafana/provisioning/datasources/datasources.yaml" <<YAML
apiVersion: 1
datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    isDefault: true
  - name: Loki
    type: loki
    access: proxy
    url: http://loki:3100
YAML

echo "Lancement de la plateforme d'observabilite..."
docker compose -f "${STACK_DIR}/compose.yaml" up -d

cat <<EOF
Stack deployee dans ${STACK_DIR}
- Grafana:    http://localhost:${GRAFANA_PORT}
- Prometheus: http://localhost:${PROMETHEUS_PORT}
- Loki:       http://localhost:${LOKI_PORT}/ready
- Node Exporter: http://localhost:${NODE_EXPORTER_PORT}/metrics
EOF
