"""Build the content index: walk src/data/**/*.ts (recursive) and write content-index.json.

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
    normalize_th,
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
# Trailing extra fields (phonetic, example, exampleMy, ...) are tolerated so
# enriched word entries keep indexing.
# Optional Thai field (OLA 2/3, additive-only) is captured as group 3 when
# present right after my: so enriched entries keep indexing exactly like
# before (groups shift: 1=en, 2=my, 3=th, 4=topic, 5=level).
_ENTRY_RE = re.compile(
    rf"\{{\s*en:\s*{_QUOTED},\s*my:\s*{_QUOTED}"
    rf"(?:,\s*th:\s*({_SQ}|{_DQ}))?"
    rf"(?:,\s*topic:\s*{_QUOTED})?"
    rf"(?:,\s*level:\s*(\d+))?"
    rf"(?:,\s*[a-zA-Z_][a-zA-Z0-9_]*:\s*(?:{_QUOTED}|\d+))*"
    rf"\s*\}}"
)
# example: '...' / "..." inside a word entry (captured separately per match).
_EXAMPLE_RE = re.compile(rf"example:\s*{_QUOTED}")
# Verb entry: { base: 'go', past: 'went', ... } (only parsed in verbs-* files).
_VERB_RE = re.compile(r"\{\s*base:\s*'((?:[^'\\]|\\.)*)'")
# Dialogue turn: { speaker: '...', en: '...', my: '...' }
# Optional Thai fields (OLA 4a, additive-only) are tolerated so enriched
# turns keep indexing exactly like before: speakerTh after speaker,
# th after my.
_TURN_RE = re.compile(
    rf"\{{\s*speaker:\s*{_QUOTED}(?:,\s*speakerTh:\s*(?:{_SQ}|{_DQ}))?"
    rf",\s*en:\s*{_QUOTED},\s*my:\s*{_QUOTED}(?:,\s*th:\s*(?:{_SQ}|{_DQ}))?\s*\}}"
)
# Dialogue / story header ids (match 'family-1' style dialogue ids and
# 'story-a1-1' style story ids; these parsers only run on dialogues*/stories* files).
_DIALOGUE_ID_RE = re.compile(r"id:\s*'([a-z][a-z0-9-]*-\d+)'")
_STORY_ID_RE = re.compile(r"id:\s*'((?:story|f14-s|hl-s)-[a-z0-9-]+)'")
# Story paragraph: { en: '...', my: '...' } (no speaker, no topic; trailing comma tolerated)
# Optional Thai field (OLA 4a, additive-only) is tolerated so enriched
# paragraphs keep indexing exactly like before: th after my.
_PARA_RE = re.compile(
    rf"\{{\s*en:\s*{_QUOTED},\s*my:\s*{_QUOTED}(?:,\s*th:\s*(?:{_SQ}|{_DQ}))?\s*,?\s*\}}"
)
_TOPIC_FIELD_RE = re.compile(r"topic:\s*'([^']+)'")
_TOPIC_RE = re.compile(
    rf"\{{\s*id:\s*{_QUOTED},\s*nameMy:\s*{_QUOTED},"
    rf"(?:\s*nameTh:\s*{_QUOTED},)?"
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
        en, my, th, topic, level = (
            _unescape(m.group(i)) if m.group(i) is not None else None
            for i in (1, 2, 3, 4, 5)
        )
        line = text.count("\n", 0, m.start()) + 1
        ex_m = _EXAMPLE_RE.search(m.group(0))
        example = _unescape(ex_m.group(0)[len("example:"):].strip()) if ex_m else None
        items.append({
            "kind": "word",
            "en": en,
            "my": my,
            "th": th,
            "topic": topic,
            "level": int(level) if level else None,
            "example": example,
            "file": os.path.relpath(path, REPO),
            "line": line,
        })
    return items


def parse_verbs(path: str) -> list:
    """Extract irregular-verb base forms from a verbs-* file (kind: verb)."""
    with open(path, encoding="utf-8") as fh:
        text = fh.read()
    items = []
    for m in _VERB_RE.finditer(text):
        base = _unescape("'" + m.group(1) + "'")
        line = text.count("\n", 0, m.start()) + 1
        items.append({
            "kind": "verb",
            "en": base,
            "file": os.path.relpath(path, REPO),
            "line": line,
        })
    return items


def parse_phrases(path: str, start_index: int) -> tuple:
    with open(path, encoding="utf-8") as fh:
        text = fh.read()
    items = []
    for i, m in enumerate(_ENTRY_RE.finditer(text)):
        en, my, th, topic, _level = (
            _unescape(m.group(j)) if m.group(j) is not None else None
            for j in (1, 2, 3, 4, 5)
        )
        line = text.count("\n", 0, m.start()) + 1
        items.append({
            "kind": "phrase",
            "en": en,
            "my": my,
            "th": th,
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


def parse_dialogues(path: str) -> list:
    """One item per dialogue: id + topic + all turn English concatenated.

    Turns are grouped to the dialogue header (`id: 'dialogue:...'`) that
    precedes them in file order.
    """
    with open(path, encoding="utf-8") as fh:
        text = fh.read()
    rel = os.path.relpath(path, REPO)
    headers = [(m.start(), _unescape(m.group(1))) for m in _DIALOGUE_ID_RE.finditer(text)]
    turns = [
        (m.start(), _unescape(m.group(2)))
        for m in _TURN_RE.finditer(text)
    ]
    items = []
    for i, (hpos, did) in enumerate(headers):
        end = headers[i + 1][0] if i + 1 < len(headers) else len(text)
        dlg_turns = [en for (tpos, en) in turns if hpos < tpos < end]
        topic_m = _TOPIC_FIELD_RE.search(text, hpos, end)
        topic = topic_m.group(1) if topic_m else None
        line = text.count("\n", 0, hpos) + 1
        full_en = " ".join(dlg_turns)
        items.append({
            "kind": "dialogue",
            "id": did,
            "en": full_en,
            "topic": topic,
            "turn_count": len(dlg_turns),
            "file": rel,
            "line": line,
        })
    return items


def parse_stories(path: str) -> list:
    """One item per story: id + all paragraph English concatenated."""
    with open(path, encoding="utf-8") as fh:
        text = fh.read()
    rel = os.path.relpath(path, REPO)
    headers = [(m.start(), _unescape(m.group(1))) for m in _STORY_ID_RE.finditer(text)]
    paras = [
        (m.start(), _unescape(m.group(1)))
        for m in _PARA_RE.finditer(text)
    ]
    items = []
    for i, (hpos, sid) in enumerate(headers):
        end = headers[i + 1][0] if i + 1 < len(headers) else len(text)
        story_paras = [en for (ppos, en) in paras if hpos < ppos < end]
        line = text.count("\n", 0, hpos) + 1
        full_en = " ".join(story_paras)
        items.append({
            "kind": "story",
            "id": sid,
            "en": full_en,
            "para_count": len(story_paras),
            "file": rel,
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

    # Recursive: src/data/*.ts plus src/data/f14/*.ts (FASE 14 batches).
    ts_files = []
    for root, _dirs, files in os.walk(DATA_DIR):
        for f in files:
            if f.endswith(".ts"):
                ts_files.append(os.path.join(root, f))

    for path in sorted(ts_files):
        fname = os.path.basename(path)
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
                    "th_norm": normalize_th(w["th"]),
                    "fingerprint": fingerprint(w["en"]),
                    "vocab_sig": vocab_signature(w["en"]),
                    "template_sig": template_signature(w["en"]),
                    "tags": [w["topic"], f"level{w['level']}", "word"]
                    if w["level"] else [w["topic"], "word"],
                    "file": w["file"],
                    "line": w["line"],
                })
                if w.get("example"):
                    index["items"].append({
                        "id": f"example:{w['topic']}:{slugify(w['en'])}",
                        "kind": "example",
                        "en": w["example"],
                        "en_norm": normalize_en(w["example"]),
                        "my_norm": "",
                        "fingerprint": fingerprint(w["example"]),
                        "vocab_sig": vocab_signature(w["example"]),
                        "template_sig": template_signature(w["example"]),
                        "tags": [w["topic"], "example"],
                        "file": w["file"],
                        "line": w["line"],
                    })
            continue

        if fname.startswith("dialogues-") or fname == "dialogues.ts":
            for d in parse_dialogues(path):
                index["items"].append({
                    "id": d["id"],
                    "kind": "dialogue",
                    "en": d["en"],
                    "en_norm": normalize_en(d["en"]),
                    "my_norm": "",
                    "fingerprint": fingerprint(d["en"]),
                    "vocab_sig": vocab_signature(d["en"]),
                    "template_sig": template_signature(d["en"]),
                    "tags": [d["topic"], "dialogue"] if d["topic"] else ["dialogue"],
                    "file": d["file"],
                    "line": d["line"],
                })
            continue

        if fname.startswith("stories-") or fname == "stories.ts":
            for s in parse_stories(path):
                index["items"].append({
                    "id": s["id"],
                    "kind": "story",
                    "en": s["en"],
                    "en_norm": normalize_en(s["en"]),
                    "my_norm": "",
                    "fingerprint": fingerprint(s["en"]),
                    "vocab_sig": vocab_signature(s["en"]),
                    "template_sig": template_signature(s["en"]),
                    "tags": ["story"],
                    "file": s["file"],
                    "line": s["line"],
                })
            continue

        if fname.startswith("verbs-"):
            for v in parse_verbs(path):
                index["items"].append({
                    "id": f"verb:{slugify(v['en'])}",
                    "kind": "verb",
                    "en": v["en"],
                    "en_norm": normalize_en(v["en"]),
                    "my_norm": "",
                    "fingerprint": fingerprint(v["en"]),
                    "vocab_sig": vocab_signature(v["en"]),
                    "template_sig": template_signature(v["en"]),
                    "tags": ["verb"],
                    "file": v["file"],
                    "line": v["line"],
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
                    "th_norm": normalize_th(p["th"]),
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
            "example": sum(1 for i in index["items"] if i["kind"] == "example"),
            "dialogue": sum(1 for i in index["items"] if i["kind"] == "dialogue"),
            "story": sum(1 for i in index["items"] if i["kind"] == "story"),
            "verb": sum(1 for i in index["items"] if i["kind"] == "verb"),
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
          f"{kinds['topic']} topics, {kinds['example']} examples, "
          f"{kinds['dialogue']} dialogues, {kinds['story']} stories, "
          f"{kinds['verb']} verbs) "
          f"-> tools/vectorize/content-index.json")


if __name__ == "__main__":
    main()
