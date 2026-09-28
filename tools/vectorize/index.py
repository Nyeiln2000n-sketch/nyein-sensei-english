"""Build the content index: walk src/data/*.ts and write content-index.json.

Run from the repo root:
    python3 tools/vectorize/index.py

Every word, phrase and topic gets:
  id          e.g. word:family:father | phrase:family:0007 | topic:family
  fingerprint sha256 (16 hex) of normalized English text
  vocab_sig   sorted unique content-words (stopwords removed)
  template_sig sentence pattern (content words -> W)
  tags        [topic, level|kind ...]
  file / line where the entry was found (for audit reports)
"""

import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from vectors import (  # noqa: E402
    fingerprint,
    normalize_en,
    normalize_my,
    template_signature,
    vocab_signature,
)

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
DATA_DIR = os.path.join(REPO, "src", "data")
OUT_FILE = os.path.join(REPO, "tools", "vectorize", "content-index.json")

# Value in either single or double quotes, with backslash escapes honoured.
# Written as an alternation so each value can use either quote style
# independently (no cross-field backreferences).
_SQ = r"'(?:[^'\\]|\\.)*'"
_DQ = r'"(?:[^"\\]|\\.)*"'
_QUOTED = rf"({_SQ}|{_DQ})"
# Match a single entry object: { en: '...' / "...", my: '...', ... }
_ENTRY_RE = re.compile(
    rf"\{{\s*en:\s*{_QUOTED},\s*my:\s*{_QUOTED}"
    rf"(?:,\s*topic:\s*{_QUOTED})?"
    rf"(?:,\s*level:\s*(\d+))?\s*\}}"
)
_TOPIC_RE = re.compile(
    rf"\{{\s*id:\s*{_QUOTED},\s*nameMy:\s*{_QUOTED},"
    rf"\s*nameEn:\s*{_QUOTED}"
)


def _unescape(value: str) -> str:
    """Strip surrounding quotes and resolve backslash escapes."""
    inner = value[1:-1]
    return inner.replace("\\'", "'").replace('\\"', '"').replace("\\\\", "\\")


def parse_words(path: str) -> list:
    with open(path, encoding="utf-8") as fh:
        text = fh.read()
    items = []
    for m in _ENTRY_RE.finditer(text):
        en, my, topic, level = (
            _unescape(m.group(i)) if m.group(i) is not None else None
            for i in (1, 2, 3, 4)
        )
        line = text.count("\n", 0, m.start()) + 1
        items.append({
            "kind": "word",
            "en": en,
            "my": my,
            "topic": topic,
            "level": int(level) if level else None,
            "file": os.path.relpath(path, REPO),
            "line": line,
        })
    return items


def parse_phrases(path: str, start_index: int) -> tuple:
    with open(path, encoding="utf-8") as fh:
        text = fh.read()
    items = []
    for i, m in enumerate(_ENTRY_RE.finditer(text)):
        en, my, topic, _level = (
            _unescape(m.group(j)) if m.group(j) is not None else None
            for j in (1, 2, 3, 4)
        )
        line = text.count("\n", 0, m.start()) + 1
        items.append({
            "kind": "phrase",
            "en": en,
            "my": my,
            "topic": topic,
            "level": None,
            "phrase_index": start_index + i,
            "file": os.path.relpath(path, REPO),
            "line": line,
        })
    return items, start_index + len(items)


def parse_topics(path: str) -> list:
    with open(path, encoding="utf-8") as fh:
        text = fh.read()
    items = []
    for m in _TOPIC_RE.finditer(text):
        tid, name_my, name_en = (_unescape(m.group(i)) for i in (1, 2, 3))
        line = text.count("\n", 0, m.start()) + 1
        items.append({
            "kind": "topic",
            "id": tid,
            "nameMy": name_my,
            "nameEn": name_en,
            "file": os.path.relpath(path, REPO),
            "line": line,
        })
    return items


def slugify(text: str) -> str:
    slug = normalize_en(text).replace(" ", "-")
    slug = re.sub(r"[^a-z0-9\-]", "", slug)
    return slug or "untitled"


def build_index() -> dict:
    index = {"items": []}
    counter = {"phrase": 0}

    for fname in sorted(os.listdir(DATA_DIR)):
        if not fname.endswith(".ts"):
            continue
        path = os.path.join(DATA_DIR, fname)
        rel = os.path.relpath(path, REPO)

        if fname == "topics.ts":
            for t in parse_topics(path):
                index["items"].append({
                    "id": f"topic:{t['id']}",
                    "kind": "topic",
                    "en": t["nameEn"],
                    "en_norm": normalize_en(t["nameEn"]),
                    "my_norm": normalize_my(t["nameMy"]),
                    "fingerprint": fingerprint(t["nameEn"]),
                    "vocab_sig": vocab_signature(t["nameEn"]),
                    "template_sig": template_signature(t["nameEn"]),
                    "tags": [t["id"], "topic"],
                    "file": t["file"],
                    "line": t["line"],
                })
            continue

        if fname.startswith("words-"):
            for w in parse_words(path):
                index["items"].append({
                    "id": f"word:{w['topic']}:{slugify(w['en'])}",
                    "kind": "word",
                    "en": w["en"],
                    "en_norm": normalize_en(w["en"]),
                    "my_norm": normalize_my(w["my"]),
                    "fingerprint": fingerprint(w["en"]),
                    "vocab_sig": vocab_signature(w["en"]),
                    "template_sig": template_signature(w["en"]),
                    "tags": [w["topic"], f"level{w['level']}", "word"]
                    if w["level"] else [w["topic"], "word"],
                    "file": w["file"],
                    "line": w["line"],
                })
            continue

        if fname.startswith("phrases-"):
            parsed, counter["phrase"] = parse_phrases(path, counter["phrase"])
            for p in parsed:
                index["items"].append({
                    "id": f"phrase:{p['topic']}:{p['phrase_index']:04d}",
                    "kind": "phrase",
                    "en": p["en"],
                    "en_norm": normalize_en(p["en"]),
                    "my_norm": normalize_my(p["my"]),
                    "fingerprint": fingerprint(p["en"]),
                    "vocab_sig": vocab_signature(p["en"]),
                    "template_sig": template_signature(p["en"]),
                    "tags": [p["topic"], "phrase"],
                    "file": p["file"],
                    "line": p["line"],
                })
            continue

    index["meta"] = {
        "kinds": {
            "word": sum(1 for i in index["items"] if i["kind"] == "word"),
            "phrase": sum(1 for i in index["items"] if i["kind"] == "phrase"),
            "topic": sum(1 for i in index["items"] if i["kind"] == "topic"),
        },
        "data_dir": "src/data",
    }
    return index


def main() -> None:
    index = build_index()
    os.makedirs(os.path.dirname(OUT_FILE), exist_ok=True)
    with open(OUT_FILE, "w", encoding="utf-8") as fh:
        json.dump(index, fh, ensure_ascii=False, indent=1)
    n = len(index["items"])
    kinds = index["meta"]["kinds"]
    print(f"Indexed {n} items "
          f"({kinds['word']} words, {kinds['phrase']} phrases, "
          f"{kinds['topic']} topics) -> tools/vectorize/content-index.json")


if __name__ == "__main__":
    main()
