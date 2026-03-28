#!/usr/bin/env python3
import argparse
import ipaddress
import json
import platform
import socket
import subprocess
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path


def ping_command(ip, timeout):
    if platform.system() == "Windows":
        wait_ms = max(500, int(timeout * 1000))
        return ["ping", "-n", "1", "-w", str(wait_ms), ip]
    wait_s = max(1, int(timeout))
    return ["ping", "-c", "1", "-W", str(wait_s), ip]


def reverse_lookup(ip):
    try:
        host, _, _ = socket.gethostbyaddr(ip)
        return host
    except OSError:
        return ""


def probe_host(ip, timeout, with_reverse):
    started = time.perf_counter()
    result = subprocess.run(
        ping_command(ip, timeout),
        capture_output=True,
        text=True,
        check=False
    )
    elapsed = round((time.perf_counter() - started) * 1000, 2)
    alive = result.returncode == 0
    payload = {
        "ip": ip,
        "alive": alive,
        "elapsed_ms": elapsed
    }
    if with_reverse and alive:
        payload["hostname"] = reverse_lookup(ip)
    if not alive:
        payload["stderr"] = (result.stderr or result.stdout).strip()
    return payload


def expand_targets(targets):
    ips = []
    for target in targets:
        if "/" in target:
            network = ipaddress.ip_network(target, strict=False)
            ips.extend(str(host) for host in network.hosts())
        else:
            ips.append(str(ipaddress.ip_address(target)))
    return ips


def main():
    parser = argparse.ArgumentParser(description="Decouverte d'hotes portable par ping.")
    parser.add_argument("targets", nargs="+", help="IPs ou CIDR a scanner")
    parser.add_argument("--timeout", type=float, default=1.5, help="Timeout par ping")
    parser.add_argument("--threads", type=int, default=32, help="Parallelisme")
    parser.add_argument("--reverse", action="store_true", help="Tente une resolution DNS inverse")
    parser.add_argument("--output", default="host-discovery.json", help="JSON de sortie")
    args = parser.parse_args()

    ips = expand_targets(args.targets)
    results = []

    with ThreadPoolExecutor(max_workers=max(1, args.threads)) as executor:
        future_map = {executor.submit(probe_host, ip, args.timeout, args.reverse): ip for ip in ips}
        for future in as_completed(future_map):
            results.append(future.result())

    results.sort(key=lambda item: tuple(int(part) for part in item["ip"].split(".")))
    output = {
        "generated_at": time.strftime("%Y-%m-%d %H:%M:%S"),
        "system": platform.system(),
        "scanned": len(results),
        "alive": sum(1 for item in results if item["alive"]),
        "dead": sum(1 for item in results if not item["alive"]),
        "results": results
    }

    output_path = Path(args.output).resolve()
    output_path.write_text(json.dumps(output, indent=2, ensure_ascii=False), encoding="utf-8")
    print(json.dumps({"status": "ok", "output": str(output_path)}, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
