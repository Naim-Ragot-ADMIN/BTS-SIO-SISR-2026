#!/usr/bin/env python3
import argparse
import json
import socket
import sys


def check_target(host, port, timeout):
    try:
        with socket.create_connection((host, port), timeout=timeout):
            return {"target": f"{host}:{port}", "status": "open"}
    except OSError as error:
        return {"target": f"{host}:{port}", "status": "closed", "detail": str(error)}


def parse_target(value):
    host, port = value.rsplit(":", 1)
    return host, int(port)


def main():
    parser = argparse.ArgumentParser(description="Teste plusieurs cibles TCP.")
    parser.add_argument("targets", nargs="+", help="Liste host:port")
    parser.add_argument("--timeout", type=float, default=2.0, help="Timeout par connexion")
    parser.add_argument("--json", action="store_true", help="Sortie JSON")
    args = parser.parse_args()

    results = [check_target(*parse_target(target), args.timeout) for target in args.targets]

    if args.json:
        print(json.dumps(results, indent=2, ensure_ascii=False))
    else:
        for item in results:
            suffix = f" ({item['detail']})" if "detail" in item else ""
            print(f"{item['target']}: {item['status']}{suffix}")

    sys.exit(0 if all(item["status"] == "open" for item in results) else 1)


if __name__ == "__main__":
    main()
