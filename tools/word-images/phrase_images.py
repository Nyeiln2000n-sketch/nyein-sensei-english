#!/usr/bin/env python3
"""Per-phrase image pipeline for Nyein Sensei English (FASE 14).

Every everyday phrase in src/data/phrases-*.ts and src/data/f14/phrases-batch-*.ts
gets its own illustration. Those TS files are NEVER edited here. Instead we keep
a separate mapping:

    src/data/phrase-images.json
        { "<english-phrase-lowercased>": "phrase-images/<slug>.png" }

Image files live in public/phrase-images/<slug>.png (served at
/phrase-images/<slug>.png). A <PhraseImage> component can read the mapping and
show a brand-palette fallback tile when a phrase has no image yet (mirror of
src/components/WordImage.tsx).

Usage:
    python phrase_images.py list            # all phrases in generation priority order
    python phrase_images.py list --missing  # same, but only phrases without an image
    python phrase_images.py stats           # coverage counts per topic
    python phrase_images.py verify          # check mapped files exist; list orphans on disk
    python phrase_images.py prompts         # JSON list of {phrase, slug, prompt} for the
                                            # next N missing phrases (default 20; --n N)
    python phrase_images.py register <phrase> [file]
        # register an image: default file is phrase-images/<slug>.png; fails if the
        # file is not on disk under public/phrase-images/

Slug rule: lowercase the English phrase, replace every run of non [a-z0-9]
with a single '-', strip leading/trailing '-'. Example: "See you soon!" ->
"see-you-soon".

How the continuation worker adds the next batch:
    1. python phrase_images.py prompts --n 20 > /tmp/pbatch.json
    2. Generate each image (256-384px, flat vector style on soft cream
       background #FFF8F1, PNG, target <=60KB) into public/phrase-images/<slug>.png
       — see README.md for the exact prompt template.
    3. python phrase_images.py register "<phrase>"   (once per phrase)
    4. npm run typecheck  (mapping is typechecked via resolveJsonModule)
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent.parent
DATA_DIR = REPO / "src" / "data"
PUBLIC_IMG_DIR = REPO / "public" / "phrase-images"
MAPPING_PATH = DATA_DIR / "phrase-images.json"

PRIORITY_TOPICS = [
    "family", "friends", "food", "animals", "daily-life",
    "home", "restaurant", "market", "emotions", "clothing",
    "nature", "sports", "school", "travel", "work",
    "shopping", "health", "weather", "time", "seasons",
    "office", "computer", "doctor", "airport", "technology",
    "business", "emergencies", "personality",
]

PROMPT_TEMPLATE = (
    "Simple flat vector-style illustration of the everyday situation "
    '"{subject}", centered, on a soft cream background (#FFF8F1), minimal '
    "clean shapes, warm friendly colors, educational flashcard style, "
    "no text, no watermark."
)


def slugify(phrase: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", phrase.lower().strip()).strip("-")


def load_phrases(source: str = "all") -> list[dict]:
    """Parse phrases-*.ts files; returns [{en, my, topic}].

    source: 'all' (default), 'f14' (only FASE 14 batches), 'base' (only base corpus).
    """
    phrases: list[dict] = []
    base_paths = sorted(DATA_DIR.glob("phrases-*.ts"))
    f14_paths = sorted((DATA_DIR / "f14").glob("phrases-batch-*.ts"))
    paths = {"all": base_paths + f14_paths, "f14": f14_paths, "base": base_paths}[source]
    _SQ = r"'(?:[^'\\]|\\.)*'"
    _DQ = r'"(?:[^"\\]|\\.)*"'
    _QV = rf"(?:{_SQ}|{_DQ})"

    def _unq(v: str) -> str:
        return v[1:-1].replace("\\'", "'").replace('\\"', '"')

    for path in paths:
        text = path.read_text(encoding="utf-8")
        for m in re.finditer(
            rf"\{{\s*en:\s*({_QV})\s*,\s*my:\s*({_QV})"
            rf"\s*,\s*topic:\s*'([^']+)'",
            text,
        ):
            en, my, topic = _unq(m.group(1)), _unq(m.group(2)), m.group(3)
            phrases.append({"en": en, "my": my, "topic": topic})
    return phrases


def priority_order(phrases: list[dict]) -> list[dict]:
    rank = {t: i for i, t in enumerate(PRIORITY_TOPICS)}
    seen: set[str] = set()
    ordered: list[dict] = []
    for p in sorted(phrases, key=lambda p: rank.get(p["topic"], 99)):
        key = p["en"].lower().strip()
        if key in seen:
            continue
        seen.add(key)
        ordered.append(p)
    return ordered


def load_mapping() -> dict[str, str]:
    if not MAPPING_PATH.exists():
        return {}
    return json.loads(MAPPING_PATH.read_text(encoding="utf-8"))


def save_mapping(mapping: dict[str, str]) -> None:
    MAPPING_PATH.write_text(
        json.dumps(mapping, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )


def prompt_for(phrase: str) -> str:
    return PROMPT_TEMPLATE.format(subject=phrase.strip())


def cmd_list(args: argparse.Namespace) -> int:
    phrases = priority_order(load_phrases())
    mapping = load_mapping()
    for p in phrases:
        key = p["en"].lower().strip()
        if args.missing and key in mapping:
            continue
        print(f"{p['topic']}\t{p['en']}\t{slugify(p['en'])}\t{'YES' if key in mapping else 'no'}")
    return 0


def cmd_stats(_args: argparse.Namespace) -> int:
    phrases = load_phrases()
    mapping = load_mapping()
    by_topic: dict[str, list[int]] = {}
    for p in phrases:
        t = p["topic"]
        by_topic.setdefault(t, [0, 0])
        by_topic[t][0] += 1
        if p["en"].lower().strip() in mapping:
            by_topic[t][1] += 1
    total = sum(v[0] for v in by_topic.values())
    covered = sum(v[1] for v in by_topic.values())
    for t in PRIORITY_TOPICS:
        if t in by_topic:
            n, c = by_topic[t]
            print(f"{t:12s} {c:4d}/{n:<4d} ({100*c//max(n,1)}%)")
    print(f"{'TOTAL':12s} {covered:4d}/{total:<4d} ({100*covered//max(total,1)}%)")
    return 0


def cmd_verify(_args: argparse.Namespace) -> int:
    mapping = load_mapping()
    ok = True
    for phrase, rel in sorted(mapping.items()):
        p = REPO / "public" / rel
        if not p.exists():
            print(f"MISSING FILE: {phrase} -> {rel}")
            ok = False
    on_disk = {p.stem for p in PUBLIC_IMG_DIR.glob("*.png")} if PUBLIC_IMG_DIR.exists() else set()
    mapped_stems = {Path(v).stem for v in mapping.values()}
    for stem in sorted(on_disk - mapped_stems):
        print(f"ORPHAN (not registered): public/phrase-images/{stem}.png")
        ok = False
    if ok:
        print(f"OK: {len(mapping)} mappings, all files present, no orphans.")
    return 0 if ok else 1


def cmd_register(args: argparse.Namespace) -> int:
    phrase = args.phrase.strip()
    key = phrase.lower()
    slug = slugify(phrase)
    rel = args.file or f"phrase-images/{slug}.png"
    disk = REPO / "public" / rel
    if not disk.exists():
        print(f"ERROR: file not on disk: public/{rel}", file=sys.stderr)
        print("Generate it first, then register.", file=sys.stderr)
        return 1
    mapping = load_mapping()
    mapping[key] = rel
    save_mapping(mapping)
    print(f"registered: {key!r} -> {rel}")
    return 0


def cmd_prompts(args: argparse.Namespace) -> int:
    phrases = priority_order(load_phrases(args.source))
    mapping = load_mapping()
    batch = []
    for p in phrases:
        key = p["en"].lower().strip()
        if key in mapping:
            continue
        batch.append(
            {
                "phrase": p["en"],
                "slug": slugify(p["en"]),
                "topic": p["topic"],
                "prompt": prompt_for(p["en"]),
            }
        )
        if len(batch) >= args.n:
            break
    print(json.dumps(batch, indent=2, ensure_ascii=False))
    return 0


def main() -> int:
    ap = argparse.ArgumentParser(description="Per-phrase image pipeline.")
    sub = ap.add_subparsers(dest="cmd", required=True)

    p_list = sub.add_parser("list", help="list phrases in generation priority order")
    p_list.add_argument("--missing", action="store_true", help="only phrases without images")

    sub.add_parser("stats", help="coverage per topic")
    sub.add_parser("verify", help="check mapped files exist / find orphans")

    p_reg = sub.add_parser("register", help="register an image for a phrase")
    p_reg.add_argument("phrase", help='English phrase, e.g. "See you soon!"')
    p_reg.add_argument("file", nargs="?", help="relative path under public/, default phrase-images/<slug>.png")

    p_pr = sub.add_parser("prompts", help="emit generation prompts for next missing phrases as JSON")
    p_pr.add_argument("--n", type=int, default=20)
    p_pr.add_argument("--source", choices=["all", "f14", "base"], default="all",
                      help="restrict backlog to FASE 14 batches, base corpus, or all")

    args = ap.parse_args()
    return {
        "list": cmd_list,
        "stats": cmd_stats,
        "verify": cmd_verify,
        "register": cmd_register,
        "prompts": cmd_prompts,
    }[args.cmd](args)


if __name__ == "__main__":
    raise SystemExit(main())
