#!/usr/bin/env python3
import argparse
import ctypes
import json
import os
import platform
import shutil
import socket
import subprocess
from pathlib import Path


def get_memory_total_mb():
    system = platform.system()
    if system == "Windows":
        class MemoryStatus(ctypes.Structure):
            _fields_ = [
                ("length", ctypes.c_ulong),
                ("memory_load", ctypes.c_ulong),
                ("total_phys", ctypes.c_ulonglong),
                ("avail_phys", ctypes.c_ulonglong),
                ("total_page_file", ctypes.c_ulonglong),
                ("avail_page_file", ctypes.c_ulonglong),
                ("total_virtual", ctypes.c_ulonglong),
                ("avail_virtual", ctypes.c_ulonglong),
                ("avail_extended_virtual", ctypes.c_ulonglong),
            ]

        status = MemoryStatus()
        status.length = ctypes.sizeof(MemoryStatus)
        ctypes.windll.kernel32.GlobalMemoryStatusEx(ctypes.byref(status))
        return round(status.total_phys / 1024 / 1024)

    meminfo = Path("/proc/meminfo")
    if meminfo.exists():
        for line in meminfo.read_text(encoding="utf-8").splitlines():
            if line.startswith("MemTotal:"):
                return round(int(line.split()[1]) / 1024)
    return None


def get_ip_addresses():
    addresses = set()
    for family, *_rest, sockaddr in socket.getaddrinfo(socket.gethostname(), None):
        if family not in (socket.AF_INET, socket.AF_INET6):
            continue
        ip = sockaddr[0]
        if ip.startswith("127.") or ip == "::1":
            continue
        addresses.add(ip)
    return sorted(addresses)


def get_disks():
    disks = []
    if platform.system() == "Windows":
        candidates = [f"{letter}:\\" for letter in "CDEFGHIJKLMNOPQRSTUVWXYZ" if Path(f"{letter}:\\").exists()]
    else:
        candidates = ["/"]

    for target in candidates:
        usage = shutil.disk_usage(target)
        disks.append({
            "mount": target,
            "total_gb": round(usage.total / 1024 / 1024 / 1024, 2),
            "free_gb": round(usage.free / 1024 / 1024 / 1024, 2),
        })
    return disks


def detect_docker():
    docker_bin = shutil.which("docker")
    if not docker_bin:
        return {"installed": False}
    result = subprocess.run([docker_bin, "--version"], capture_output=True, text=True, check=False)
    return {"installed": result.returncode == 0, "version": result.stdout.strip()}


def main():
    parser = argparse.ArgumentParser(description="Inventaire systeme multi-OS.")
    parser.add_argument("--output", help="Chemin JSON de sortie.")
    parser.add_argument("--pretty", action="store_true", help="Active l'indentation JSON.")
    args = parser.parse_args()

    report = {
        "system": platform.system(),
        "release": platform.release(),
        "hostname": socket.gethostname(),
        "fqdn": socket.getfqdn(),
        "user": os.environ.get("USERNAME") or os.environ.get("USER"),
        "python": platform.python_version(),
        "memory_mb": get_memory_total_mb(),
        "ip_addresses": get_ip_addresses(),
        "disks": get_disks(),
        "docker": detect_docker(),
    }

    text = json.dumps(report, indent=2 if args.pretty else None, ensure_ascii=False)
    if args.output:
        Path(args.output).write_text(text, encoding="utf-8")
    print(text)


if __name__ == "__main__":
    main()
