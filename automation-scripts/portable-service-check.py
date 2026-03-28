#!/usr/bin/env python3
import argparse
import json
import platform
import shutil
import subprocess
import sys


def run(command):
    return subprocess.run(command, capture_output=True, text=True, check=False)


def check_windows(name):
    if not shutil.which("powershell"):
        return {"name": name, "status": "unknown", "detail": "PowerShell introuvable"}
    command = [
        "powershell",
        "-NoProfile",
        "-Command",
        f"$svc = Get-Service -Name '{name}' -ErrorAction SilentlyContinue; if ($svc) {{ $svc.Status }} else {{ 'NotFound' }}"
    ]
    result = run(command)
    status = (result.stdout or "").strip() or "NotFound"
    return {"name": name, "status": status, "detail": result.stderr.strip()}


def check_linux(name):
    if shutil.which("systemctl"):
        result = run(["systemctl", "is-active", name])
        status = (result.stdout or "").strip() or (result.stderr or "").strip() or "unknown"
        if status and status != "unknown":
            return {"name": name, "status": status, "detail": ""}
    result = run(["pgrep", "-f", name])
    return {"name": name, "status": "running" if result.returncode == 0 else "not-found", "detail": ""}


def main():
    parser = argparse.ArgumentParser(description="Controle services/proc multi-OS.")
    parser.add_argument("names", nargs="+", help="Noms de services ou processus")
    parser.add_argument("--json", action="store_true", help="Sortie JSON")
    args = parser.parse_args()

    system = platform.system()
    checker = check_windows if system == "Windows" else check_linux
    results = [checker(name) for name in args.names]

    if args.json:
        print(json.dumps(results, indent=2, ensure_ascii=False))
    else:
        for item in results:
            print(f"{item['name']}: {item['status']}")

    healthy = {"running", "active", "Running"}
    sys.exit(0 if all(item["status"] in healthy for item in results) else 1)


if __name__ == "__main__":
    main()
