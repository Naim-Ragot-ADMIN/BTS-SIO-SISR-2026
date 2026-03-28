#!/usr/bin/env python3
import argparse
import json
import platform
import shutil
import socket
import subprocess


def run(command):
    return subprocess.run(command, capture_output=True, text=True, check=False)


def resolve_host(host):
    try:
        values = socket.getaddrinfo(host, None)
        return sorted({item[4][0] for item in values})
    except OSError as error:
        return [f"resolution-error: {error}"]


def ping_host(host):
    system = platform.system()
    count_args = ["-n", "2"] if system == "Windows" else ["-c", "2"]
    result = run(["ping", *count_args, host])
    return {
        "returncode": result.returncode,
        "stdout": result.stdout.strip(),
        "stderr": result.stderr.strip()
    }


def trace_host(host):
    system = platform.system()
    binary = "tracert" if system == "Windows" else "traceroute"
    if not shutil.which(binary):
        return {"available": False, "detail": f"{binary} introuvable"}
    result = run([binary, host])
    return {
        "available": True,
        "returncode": result.returncode,
        "stdout": result.stdout.strip(),
        "stderr": result.stderr.strip()
    }


def main():
    parser = argparse.ArgumentParser(description="Diagnostic reseau portable.")
    parser.add_argument("hosts", nargs="+", help="Hosts ou FQDN a verifier")
    parser.add_argument("--json", action="store_true", help="Sortie JSON")
    args = parser.parse_args()

    report = []
    for host in args.hosts:
        report.append({
            "host": host,
            "resolved": resolve_host(host),
            "ping": ping_host(host),
            "trace": trace_host(host)
        })

    if args.json:
        print(json.dumps(report, indent=2, ensure_ascii=False))
    else:
        for item in report:
            print(f"=== {item['host']} ===")
            print("Resolution:", ", ".join(item["resolved"]))
            print("Ping code:", item["ping"]["returncode"])
            print()


if __name__ == "__main__":
    main()
