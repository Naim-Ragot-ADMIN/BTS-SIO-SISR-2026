#!/usr/bin/env python3
import argparse
import json
import os
import platform
import shutil
import socket
import subprocess
import time
from pathlib import Path
from urllib import request
from urllib.error import URLError, HTTPError


def run(command):
    return subprocess.run(command, capture_output=True, text=True, check=False)


def detect_system():
    return {
        "system": platform.system(),
        "release": platform.release(),
        "hostname": socket.gethostname(),
        "python": platform.python_version(),
    }


def disk_snapshot():
    targets = []
    if platform.system() == "Windows":
        for letter in "CDEFGHIJKLMNOPQRSTUVWXYZ":
            root = Path(f"{letter}:\\")
            if root.exists():
                targets.append(str(root))
    else:
        targets.append("/")

    report = []
    for target in targets:
        usage = shutil.disk_usage(target)
        report.append({
            "mount": target,
            "total_gb": round(usage.total / 1024 / 1024 / 1024, 2),
            "free_gb": round(usage.free / 1024 / 1024 / 1024, 2),
        })
    return report


def service_snapshot(names):
    results = []
    if platform.system() == "Windows":
        for name in names:
            cmd = ["powershell", "-NoProfile", "-Command", f"$svc = Get-Service -Name '{name}' -ErrorAction SilentlyContinue; if ($svc) {{ $svc.Status }} else {{ 'NotFound' }}"]
            result = run(cmd)
            results.append({"name": name, "status": (result.stdout or "").strip() or "NotFound"})
    else:
        for name in names:
            if shutil.which("systemctl"):
                result = run(["systemctl", "is-active", name])
                status = (result.stdout or result.stderr or "").strip() or "unknown"
            else:
                result = run(["pgrep", "-f", name])
                status = "running" if result.returncode == 0 else "not-found"
            results.append({"name": name, "status": status})
    return results


def port_snapshot(targets, timeout):
    report = []
    for target in targets:
        host, port = target.rsplit(":", 1)
        started = time.perf_counter()
        try:
            with socket.create_connection((host, int(port)), timeout=timeout):
                elapsed = round((time.perf_counter() - started) * 1000, 2)
                report.append({"target": target, "status": "open", "elapsed_ms": elapsed})
        except OSError as error:
            elapsed = round((time.perf_counter() - started) * 1000, 2)
            report.append({"target": target, "status": "closed", "elapsed_ms": elapsed, "detail": str(error)})
    return report


def http_snapshot(urls, timeout):
    report = []
    for url in urls:
        started = time.perf_counter()
        try:
            with request.urlopen(url, timeout=timeout) as response:
                elapsed = round((time.perf_counter() - started) * 1000, 2)
                report.append({"url": url, "status": response.status, "elapsed_ms": elapsed})
        except HTTPError as error:
            elapsed = round((time.perf_counter() - started) * 1000, 2)
            report.append({"url": url, "status": error.code, "elapsed_ms": elapsed, "detail": str(error)})
        except URLError as error:
            elapsed = round((time.perf_counter() - started) * 1000, 2)
            report.append({"url": url, "status": "unreachable", "elapsed_ms": elapsed, "detail": str(error)})
    return report


def command_snapshot(commands):
    report = []
    for command in commands:
        started = time.perf_counter()
        result = run(command)
        elapsed = round((time.perf_counter() - started) * 1000, 2)
        report.append({
            "command": " ".join(command),
            "returncode": result.returncode,
            "elapsed_ms": elapsed,
            "stdout": result.stdout.strip(),
            "stderr": result.stderr.strip()
        })
    return report


def main():
    parser = argparse.ArgumentParser(description="Bundle de maintenance multi-OS.")
    parser.add_argument("--services", nargs="*", default=[], help="Services ou processus a verifier")
    parser.add_argument("--ports", nargs="*", default=[], help="Cibles host:port a verifier")
    parser.add_argument("--urls", nargs="*", default=[], help="URLs a tester")
    parser.add_argument("--output", default="maintenance-bundle.json", help="JSON de sortie")
    parser.add_argument("--timeout", type=float, default=3.0, help="Timeout reseau")
    parser.add_argument("--with-docker-check", action="store_true", help="Ajoute un check docker")
    args = parser.parse_args()

    commands = []
    if args.with_docker_check and shutil.which("docker"):
        commands.append(["docker", "--version"])

    report = {
        "generated_at": time.strftime("%Y-%m-%d %H:%M:%S"),
        "system": detect_system(),
        "user": os.environ.get("USERNAME") or os.environ.get("USER"),
        "disks": disk_snapshot(),
        "services": service_snapshot(args.services),
        "ports": port_snapshot(args.ports, args.timeout),
        "urls": http_snapshot(args.urls, args.timeout),
        "commands": command_snapshot(commands),
    }

    output_path = Path(args.output).resolve()
    output_path.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")
    print(json.dumps({"output": str(output_path), "status": "ok"}, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
