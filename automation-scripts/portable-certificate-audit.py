#!/usr/bin/env python3
import argparse
import json
import socket
import ssl
import time
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse


def normalize_target(raw_target, default_port):
    text = str(raw_target or "").strip()
    if not text:
        raise ValueError("cible vide")

    if "://" in text:
        parsed = urlparse(text)
        host = parsed.hostname
        port = parsed.port or (443 if parsed.scheme == "https" else default_port)
        label = text
    else:
        host, _, port_fragment = text.partition(":")
        port = int(port_fragment) if port_fragment else default_port
        label = f"{host}:{port}"

    if not host:
        raise ValueError(f"cible invalide: {text}")

    return {
        "input": text,
        "label": label,
        "host": host,
        "port": int(port)
    }


def extract_sans(certificate):
    values = []
    for key, names in certificate.get("subjectAltName", []):
        if key == "DNS":
            values.append(names)
    return values


def flatten_name(name_items):
    parts = []
    for group in name_items:
        for key, value in group:
            parts.append(f"{key}={value}")
    return ", ".join(parts)


def audit_target(target, timeout, warning_days):
    started = time.perf_counter()
    context = ssl.create_default_context()
    context.check_hostname = False
    context.verify_mode = ssl.CERT_NONE

    try:
        with socket.create_connection((target["host"], target["port"]), timeout=timeout) as sock:
            with context.wrap_socket(sock, server_hostname=target["host"]) as tls_socket:
                certificate = tls_socket.getpeercert()
                cipher = tls_socket.cipher()
                protocol = tls_socket.version()

        expires_text = certificate.get("notAfter", "")
        expires_at = datetime.strptime(expires_text, "%b %d %H:%M:%S %Y %Z").replace(tzinfo=timezone.utc)
        now = datetime.now(timezone.utc)
        days_left = (expires_at - now).days
        elapsed = round((time.perf_counter() - started) * 1000, 2)

        if days_left < 0:
            status = "expired"
        elif days_left <= warning_days:
            status = "warning"
        else:
            status = "ok"

        return {
            "target": target["label"],
            "host": target["host"],
            "port": target["port"],
            "status": status,
            "days_left": days_left,
            "expires_at": expires_at.isoformat(),
            "issuer": flatten_name(certificate.get("issuer", [])),
            "subject": flatten_name(certificate.get("subject", [])),
            "san": extract_sans(certificate),
            "serial_number": certificate.get("serialNumber", ""),
            "version": certificate.get("version", ""),
            "protocol": protocol,
            "cipher": cipher[0] if cipher else "",
            "elapsed_ms": elapsed
        }
    except Exception as error:  # noqa: BLE001
        elapsed = round((time.perf_counter() - started) * 1000, 2)
        return {
            "target": target["label"],
            "host": target["host"],
            "port": target["port"],
            "status": "error",
            "elapsed_ms": elapsed,
            "error": str(error)
        }


def main():
    parser = argparse.ArgumentParser(description="Audit de certificats TLS portable.")
    parser.add_argument("targets", nargs="+", help="URLs HTTPS ou couples host:port")
    parser.add_argument("--timeout", type=float, default=5.0, help="Timeout reseau en secondes")
    parser.add_argument("--warning-days", type=int, default=30, help="Seuil d'alerte")
    parser.add_argument("--port", type=int, default=443, help="Port par defaut pour host sans port")
    parser.add_argument("--output", default="certificate-audit.json", help="JSON de sortie")
    args = parser.parse_args()

    audits = []
    for raw_target in args.targets:
        target = normalize_target(raw_target, args.port)
        audits.append(audit_target(target, args.timeout, args.warning_days))

    summary = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "warning_days": args.warning_days,
        "targets": audits,
        "ok": sum(1 for item in audits if item["status"] == "ok"),
        "warning": sum(1 for item in audits if item["status"] == "warning"),
        "expired": sum(1 for item in audits if item["status"] == "expired"),
        "error": sum(1 for item in audits if item["status"] == "error")
    }

    output_path = Path(args.output).resolve()
    output_path.write_text(json.dumps(summary, indent=2, ensure_ascii=False), encoding="utf-8")
    print(json.dumps({"status": "ok", "output": str(output_path)}, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
