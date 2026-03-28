#!/usr/bin/env bash
set -euo pipefail

WAZUH_DIR="${WAZUH_DIR:-/opt/wazuh-docker}"
REPO_URL="${REPO_URL:-https://github.com/wazuh/wazuh-docker.git}"

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker est requis." >&2
  exit 1
fi

if ! command -v git >/dev/null 2>&1; then
  echo "Git est requis." >&2
  exit 1
fi

if [ ! -d "${WAZUH_DIR}/.git" ]; then
  git clone "${REPO_URL}" "${WAZUH_DIR}"
else
  git -C "${WAZUH_DIR}" pull --ff-only
fi

cd "${WAZUH_DIR}/single-node"
docker compose up -d

echo "Wazuh single-node lance depuis ${WAZUH_DIR}/single-node."
