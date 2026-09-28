#!/usr/bin/env python3
"""Normalize generated word images: resize to <=320px, keep PNG <=60KB.

Run after each generation batch:
    python3 tools/word-images/optimize.py
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image

REPO = Path(__file__).resolve().parent.parent.parent
IMG_DIR = REPO / "public" / "word-images"
MAX_PX = 320
MAX_BYTES = 60 * 1024


def optimize(path: Path) -> None:
    img = Image.open(path).convert("RGBA")
    # Paste over the cream background so the saved PNG has no alpha channel
    # (smaller files) while keeping the look.
    bg = Image.new("RGBA", img.size, (255, 248, 241, 255))
    bg.alpha_composite(img)
    img = bg.convert("RGB")
    if max(img.size) > MAX_PX:
        img.thumbnail((MAX_PX, MAX_PX), Image.LANCZOS)
    tmp = path.with_suffix(".tmp.png")
    img.save(tmp, optimize=True)
    if tmp.stat().st_size > MAX_BYTES:
        # Fallback: quantize to 128 colors; flat vector art survives this.
        img.convert("P", palette=Image.ADAPTIVE, colors=128).save(tmp, optimize=True)
    tmp.replace(path)
    print(f"{path.name}: {img.size[0]}x{img.size[1]}, {path.stat().st_size//1024}KB")


def main() -> None:
    for path in sorted(IMG_DIR.glob("*.png")):
        try:
            optimize(path)
        except Exception as exc:  # noqa: BLE001
            print(f"ERROR {path.name}: {exc}")


if __name__ == "__main__":
    main()
