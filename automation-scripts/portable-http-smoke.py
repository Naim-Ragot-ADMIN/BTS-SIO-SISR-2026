#!/usr/bin/env python3
import argparse
import json
import time
from urllib import request
from urllib.error import URLError, HTTPError


def check_url(url, timeout):
    started = time.perf_counter()
    try:
        with request.urlopen(url, timeout=timeout) as response:
            elapsed_ms = round((time.perf_counter() - started) * 1000, 2)
            return {
                "url": url,
                "status": response.status,
                "content_type": response.getheader("Content-Type"),
                "elapsed_ms": elapsed_ms
            }
    except HTTPError as error:
        elapsed_ms = round((time.perf_counter() - started) * 1000, 2)
        return {"url": url, "status": error.code, "error": str(error), "elapsed_ms": elapsed_ms}
    except URLError as error:
        elapsed_ms = round((time.perf_counter() - started) * 1000, 2)
        return {"url": url, "status": "unreachable", "error": str(error), "elapsed_ms": elapsed_ms}


def main():
    parser = argparse.ArgumentParser(description="Smoke test HTTP simple.")
    parser.add_argument("urls", nargs="+", help="URLs a verifier")
    parser.add_argument("--timeout", type=float, default=5.0, help="Timeout HTTP")
    parser.add_argument("--json", action="store_true", help="Sortie JSON")
    args = parser.parse_args()

    results = [check_url(url, args.timeout) for url in args.urls]

    if args.json:
        print(json.dumps(results, indent=2, ensure_ascii=False))
    else:
        for item in results:
            print(f"{item['url']}: {item['status']} en {item['elapsed_ms']} ms")


if __name__ == "__main__":
    main()
