#!/usr/bin/env python3
import argparse
import fnmatch
import json
import platform
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile


def should_skip(path, patterns):
    return any(fnmatch.fnmatch(path.name, pattern) or fnmatch.fnmatch(str(path), pattern) for pattern in patterns)


def main():
    parser = argparse.ArgumentParser(description="Archive un dossier et genere un manifeste.")
    parser.add_argument("source", help="Dossier source")
    parser.add_argument("destination", help="Archive ZIP a produire")
    parser.add_argument("--exclude", action="append", default=[], help="Pattern a exclure")
    args = parser.parse_args()

    source = Path(args.source).resolve()
    archive_path = Path(args.destination).resolve()
    archive_path.parent.mkdir(parents=True, exist_ok=True)

    manifest = {
        "system": platform.system(),
        "source": str(source),
        "archive": str(archive_path),
        "files": []
    }

    with ZipFile(archive_path, "w", compression=ZIP_DEFLATED) as archive:
      for item in source.rglob("*"):
        if item.is_dir() or should_skip(item, args.exclude):
          continue
        relative_path = item.relative_to(source)
        archive.write(item, arcname=str(relative_path))
        manifest["files"].append(str(relative_path))

    manifest_path = archive_path.with_suffix(".json")
    manifest_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False), encoding="utf-8")

    print(json.dumps({
        "archive": str(archive_path),
        "manifest": str(manifest_path),
        "file_count": len(manifest["files"])
    }, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
