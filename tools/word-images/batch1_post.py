#!/usr/bin/env python3
"""Post-process generated slice-1 word images into word-images-batch-1.json.

Usage: batch1_post.py <word1> <word2> ...
For each word: rename media-generation-<word>-0-*.png -> <slug>.png,
delete JSON sidecars, optimize via optimize.py, and record mapping in
src/data/word-images-batch-1.json. Never touches word-images.json.
"""
import json
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
IMGDIR = REPO / "public" / "word-images"
BATCH = REPO / "src" / "data" / "word-images-batch-1.json"
MAX_PX = 320
MAX_BYTES = 60 * 1024


def slug(w: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", w.lower().strip()).strip("-")


def optimize_png(path: Path) -> None:
    """Same normalization as tools/word-images/optimize.py, single file."""
    from PIL import Image

    img = Image.open(path).convert("RGBA")
    bg = Image.new("RGBA", img.size, (255, 248, 241, 255))
    bg.alpha_composite(img)
    img = bg.convert("RGB")
    if max(img.size) > MAX_PX:
        img.thumbnail((MAX_PX, MAX_PX), Image.LANCZOS)
    tmp = path.with_suffix(".tmp.png")
    img.save(tmp, optimize=True)
    if tmp.stat().st_size > MAX_BYTES:
        img.convert("P", palette=Image.ADAPTIVE, colors=128).save(tmp, optimize=True)
    tmp.replace(path)


def main(words):
    # 1. rename generated files
    for f in IMGDIR.glob("media-generation-*.png"):
        m = re.match(r"media-generation-(.+)-0-[0-9a-f-]+\.png", f.name)
        if not m:
            continue
        target = IMGDIR / f"{m.group(1)}.png"
        if target.exists():
            target.unlink()
        f.rename(target)
    for f in IMGDIR.glob("media-generation-*.json"):
        f.unlink()

    # 2. optimize only the newly added files (skip already-optimized ones)
    for w in words:
        png = IMGDIR / f"{slug(w)}.png"
        if png.exists():
            optimize_png(png)

    # 3. register into batch-1 json only
    batch = json.loads(BATCH.read_text()) if BATCH.exists() else {}
    registered = 0
    for w in words:
        s = slug(w)
        png = IMGDIR / f"{s}.png"
        if png.exists():
            batch[w] = f"word-images/{s}.png"
            registered += 1
        else:
            print(f"WARN: no png for {w!r} (slug {s})", flush=True)
    BATCH.write_text(json.dumps(batch, indent=2, ensure_ascii=False) + "\n")

    total = len(batch)
    print(f"registered this batch: {registered}/{len(words)}")
    print(f"batch-1 total: {total}")
    # count slice coverage
    slice_words = json.load(open("/tmp/slice-1.json"))
    missing = [w for w in slice_words if w not in batch]
    print(f"slice-1 remaining: {len(missing)}")


if __name__ == "__main__":
    main(sys.argv[1:])
