#!/usr/bin/env python3
"""Per-word image pipeline for Nyein Sensei English.

Every vocabulary word in src/data/words-*.ts gets its own illustration.
Those TS files are NEVER edited here. Instead we keep a separate mapping:

    src/data/word-images.json
        { "<english-word-lowercased>": "word-images/<slug>.png" }

Image files live in public/word-images/<slug>.png (served at
/word-images/<slug>.png). The <WordImage> component (src/components/WordImage.tsx)
reads the mapping and shows a brand-palette fallback tile when a word has
no image yet.

Usage:
    python word_images.py list            # all 1000 words in generation priority order
    python word_images.py list --missing  # same, but only words without an image
    python word_images.py stats           # coverage counts per topic
    python word_images.py verify          # check mapped files exist; list orphans on disk
    python word_images.py prompts         # JSON list of {word, slug, prompt} for the
                                          # next N missing words (default 20; --n N)
    python word_images.py register <word> [file]
        # register an image: default file is word-images/<slug>.png; fails if the
        # file is not on disk under public/word-images/

Slug rule: lowercase the English word, replace every run of non [a-z0-9]
with a single '-', strip leading/trailing '-'. Example: "best friend" ->
"best-friend", "wake up" -> "wake-up".

How the (nightly/30-min) continuation worker adds the next batch:
    1. python word_images.py prompts --n 20 > /tmp/batch.json
    2. Generate each image (256-384px, flat vector style on soft cream
       background #FFF8F1, PNG, target <=60KB) into public/word-images/<slug>.png
       — see README.md for the exact prompt template.
    3. python word_images.py register "<word>"        (once per word)
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
PUBLIC_IMG_DIR = REPO / "public" / "word-images"
MAPPING_PATH = DATA_DIR / "word-images.json"

# Generation priority: most-taught everyday topics first. The first 150
# (family, friends, food, animals, daily-life) were the launch batch.
PRIORITY_TOPICS = [
    "family", "friends", "food", "animals", "daily-life",
    "home", "restaurant", "market", "emotions", "clothing",
    "nature", "sports", "school", "travel", "work",
    "shopping", "health", "weather", "time", "seasons",
    "office", "computer", "doctor", "airport", "technology",
    "business", "emergencies", "personality",
]

# Hints for abstract words / verbs / adjectives so the illustration brief
# is concrete ("love" -> two people with a heart, not the word "love").
# Anything not listed uses the word itself as the subject.
HINTS: dict[str, str] = {
    # family
    "love": "two people with a red heart between them",
    "care": "gentle hands holding a heart",
    "together": "a happy family holding hands in a circle",
    "cheerful": "a smiling cheerful child",
    "elderly": "a kind smiling grandparent",
    "young": "a small happy child",
    "marry": "a wedding couple, bride and groom",
    "birth": "a newborn baby wrapped in a blanket",
    "photo": "a printed photograph of a family",
    "memory": "a photo album with old pictures",
    # friends
    "friend": "two smiling friends side by side",
    "best friend": "two best friends hugging",
    "buddy": "two pals giving a high five",
    "neighbor": "a friendly neighbor waving at a door",
    "party": "a fun birthday party with balloons",
    "invite": "an invitation card envelope",
    "visit": "a guest arriving at a front door",
    "chat": "two speech bubbles",
    "laugh": "a laughing happy face",
    "smile": "a big warm smile",
    "kind": "a hand giving a heart",
    "helpful": "a helping hand lifting someone",
    "honest": "open honest hands",
    "trust": "a firm handshake",
    "share": "two children sharing an apple",
    "gift": "a wrapped gift box with a bow",
    "celebrate": "confetti and party poppers",
    "birthday": "a birthday cake with candles",
    "team": "a sports team huddle",
    "victory": "a golden trophy",
    "defeat": "a sad sports team",
    "sorry": "a person bowing apologetically",
    "thanks": "a thank-you card with a heart",
    "hello": "a person waving hello",
    "goodbye": "a person waving goodbye",
    "meet": "two people meeting and shaking hands",
    "talk": "two people talking with speech bubbles",
    "listen": "an ear with sound waves",
    "joke": "friends laughing at a joke",
    "secret": "a finger over lips, shh gesture",
    # food
    "spicy": "a red chili pepper",
    "sweet": "colorful candy",
    "sour": "a yellow lemon slice",
    "salty": "a salt shaker",
    "hot": "a steaming hot bowl of soup",
    "frozen": "ice cubes",
    "eat": "a child happily eating",
    "drink": "a person drinking a glass of water",
    "cook": "a cooking pot on a stove",
    "delicious": "a tasty meal with a thumbs up",
    "recipe": "an open recipe cookbook",
    # animals
    "animal": "a cute cartoon animal",
    "cute": "an adorable smiling puppy",
    "wild": "a wild tiger in the jungle",
    "pet": "a happy puppy in a home",
    "fly": "a bird flying in the sky",
    "swim": "a fish swimming underwater",
    "vet": "a veterinarian with a stethoscope and a dog",
    # daily-life
    "day": "a bright sun in the sky",
    "morning": "a sunrise over hills",
    "afternoon": "a bright afternoon sun",
    "evening": "an orange sunset",
    "night": "a crescent moon and stars",
    "today": "a calendar page marked today",
    "tomorrow": "a calendar with a forward arrow",
    "yesterday": "a calendar with a back arrow",
    "week": "a weekly planner calendar",
    "wake up": "a ringing alarm clock",
    "get up": "a person getting out of bed",
    "wash": "hands being washed with soap",
    "brush": "a toothbrush brushing teeth",
    "chore": "a broom and dustpan",
    "clean": "a sparkling clean spray bottle",
    "stroll": "a person taking a relaxed walk",
    "watch": "eyes watching a television",
    "life": "a heart full of life",
    "breakfast": "a breakfast plate with eggs and toast",
    "lunch": "a lunch box meal",
    "dinner": "a dinner plate with a full meal",
    "shower": "a shower head with water drops",
    "toothbrush": "a toothbrush with toothpaste",
    "mirror": "an oval wall mirror",
    "key": "a golden door key",
    "routine": "a daily checklist with checkmarks",
    "habit": "circular repeating arrows",
    "relax": "a person relaxing in an armchair",
    "rush": "a person running fast in a hurry",
    "free time": "a hammock between palm trees",
}

PROMPT_TEMPLATE = (
    "Simple flat vector-style illustration of {subject}, centered, "
    "on a soft cream background (#FFF8F1), minimal clean shapes, warm "
    "friendly colors, educational flashcard style, no text, no watermark."
)


def slugify(word: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", word.lower().strip()).strip("-")


def load_words() -> list[dict]:
    """Parse all words-*.ts files; returns [{en, my, topic, level}] in file order."""
    words: list[dict] = []
    for path in sorted(DATA_DIR.glob("words-*.ts")):
        text = path.read_text(encoding="utf-8")
        topic = path.stem.replace("words-", "")
        for m in re.finditer(
            r"\{\s*en:\s*'([^']+)'\s*,\s*my:\s*'([^']+)'\s*,\s*topic:\s*'([^']+)'\s*,\s*level:\s*(\d)",
            text,
        ):
            en, my, t, level = m.groups()
            words.append({"en": en, "my": my, "topic": t or topic, "level": int(level)})
    return words


def priority_order(words: list[dict]) -> list[dict]:
    rank = {t: i for i, t in enumerate(PRIORITY_TOPICS)}
    seen: set[str] = set()
    ordered: list[dict] = []
    for w in sorted(words, key=lambda w: (rank.get(w["topic"], 99), w["level"])):
        key = w["en"].lower().strip()
        if key in seen:
            continue
        seen.add(key)
        ordered.append(w)
    # Any topic not in PRIORITY_TOPICS lands at the end (shouldn't happen).
    return ordered


def load_mapping() -> dict[str, str]:
    if not MAPPING_PATH.exists():
        return {}
    return json.loads(MAPPING_PATH.read_text(encoding="utf-8"))


def save_mapping(mapping: dict[str, str]) -> None:
    MAPPING_PATH.write_text(
        json.dumps(mapping, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )


def prompt_for(word: str) -> str:
    subject = HINTS.get(word.lower().strip(), f"a {word.lower().strip()}")
    return PROMPT_TEMPLATE.format(subject=subject)


def cmd_list(args: argparse.Namespace) -> int:
    words = priority_order(load_words())
    mapping = load_mapping()
    for w in words:
        key = w["en"].lower().strip()
        if args.missing and key in mapping:
            continue
        print(f"{w['topic']}\t{w['en']}\t{slugify(w['en'])}\t{'YES' if key in mapping else 'no'}")
    return 0


def cmd_stats(_args: argparse.Namespace) -> int:
    words = load_words()
    mapping = load_mapping()
    by_topic: dict[str, list[int]] = {}
    for w in words:
        t = w["topic"]
        by_topic.setdefault(t, [0, 0])
        by_topic[t][0] += 1
        if w["en"].lower().strip() in mapping:
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
    for word, rel in sorted(mapping.items()):
        p = REPO / "public" / rel
        if not p.exists():
            print(f"MISSING FILE: {word} -> {rel}")
            ok = False
    on_disk = {p.stem for p in PUBLIC_IMG_DIR.glob("*.png")} if PUBLIC_IMG_DIR.exists() else set()
    mapped_stems = {Path(v).stem for v in mapping.values()}
    for stem in sorted(on_disk - mapped_stems):
        print(f"ORPHAN (not registered): public/word-images/{stem}.png")
        ok = False
    if ok:
        print(f"OK: {len(mapping)} mappings, all files present, no orphans.")
    return 0 if ok else 1


def cmd_register(args: argparse.Namespace) -> int:
    word = args.word.strip()
    key = word.lower()
    slug = slugify(word)
    rel = args.file or f"word-images/{slug}.png"
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
    words = priority_order(load_words())
    mapping = load_mapping()
    batch = []
    for w in words:
        key = w["en"].lower().strip()
        if key in mapping:
            continue
        batch.append(
            {
                "word": w["en"],
                "slug": slugify(w["en"]),
                "topic": w["topic"],
                "prompt": prompt_for(w["en"]),
            }
        )
        if len(batch) >= args.n:
            break
    print(json.dumps(batch, indent=2, ensure_ascii=False))
    return 0


def main() -> int:
    ap = argparse.ArgumentParser(description="Per-word image pipeline.")
    sub = ap.add_subparsers(dest="cmd", required=True)

    p_list = sub.add_parser("list", help="list words in generation priority order")
    p_list.add_argument("--missing", action="store_true", help="only words without images")

    sub.add_parser("stats", help="coverage per topic")
    sub.add_parser("verify", help="check mapped files exist / find orphans")

    p_reg = sub.add_parser("register", help="register an image for a word")
    p_reg.add_argument("word", help='English word, e.g. "rice"')
    p_reg.add_argument("file", nargs="?", help="relative path under public/, default word-images/<slug>.png")

    p_pr = sub.add_parser("prompts", help="emit generation prompts for next missing words as JSON")
    p_pr.add_argument("--n", type=int, default=20)

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
