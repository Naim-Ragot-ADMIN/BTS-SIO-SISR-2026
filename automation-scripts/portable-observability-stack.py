#!/usr/bin/env python3
import argparse
import shutil
import subprocess
from pathlib import Path


COMPOSE_TEMPLATE = """services:
  prometheus:
    image: prom/prometheus:latest
    container_name: portable-prometheus
    restart: unless-stopped
    ports:
      - "{prometheus_port}:9090"
    volumes:
      - ./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml:ro
  grafana:
    image: grafana/grafana:latest
    container_name: portable-grafana
    restart: unless-stopped
    ports:
      - "{grafana_port}:3000"
    volumes:
      - grafana-storage:/var/lib/grafana
volumes:
  grafana-storage:
"""

PROMETHEUS_TEMPLATE = """global:
  scrape_interval: 15s

scrape_configs:
  - job_name: prometheus
    static_configs:
      - targets: ['prometheus:9090']
"""


def main():
    parser = argparse.ArgumentParser(description="Cree une stack portable Prometheus + Grafana.")
    parser.add_argument("--project-dir", default="portable-observability", help="Dossier du projet")
    parser.add_argument("--prometheus-port", type=int, default=9090)
    parser.add_argument("--grafana-port", type=int, default=3000)
    parser.add_argument("--launch", action="store_true", help="Lance docker compose up -d")
    args = parser.parse_args()

    docker_bin = shutil.which("docker")
    if not docker_bin:
        raise SystemExit("Docker est requis pour ce script.")

    project_dir = Path(args.project_dir).resolve()
    prometheus_dir = project_dir / "prometheus"
    prometheus_dir.mkdir(parents=True, exist_ok=True)

    compose_file = project_dir / "compose.yaml"
    prometheus_file = prometheus_dir / "prometheus.yml"

    compose_file.write_text(
        COMPOSE_TEMPLATE.format(prometheus_port=args.prometheus_port, grafana_port=args.grafana_port),
        encoding="utf-8"
    )
    prometheus_file.write_text(PROMETHEUS_TEMPLATE, encoding="utf-8")

    if args.launch:
        subprocess.run([docker_bin, "compose", "up", "-d"], cwd=project_dir, check=True)

    print(f"Stack generee dans {project_dir}")
    print(f"Compose: {compose_file}")
    print(f"Prometheus: {prometheus_file}")


if __name__ == "__main__":
    main()
