#!/usr/bin/env python3
"""Apply Thai translations to an f14 batch file (ADDITIVE ONLY).
Usage: apply.py <srcfile> <translations.jsonl>
translations.jsonl: {"i": idx, "th": "...thai..."} one per line.
Inserts `, th: '...'` IMMEDIATELY after the closing quote of the my literal,
with the comma directly against the quote: ('x', th: 'y', ...).
Escapes backslash and single-quote in the Thai text.

Safety: refuses to run if translations file has an index out of range,
a duplicate index, an empty th, or an entry that already has a th field.
"""
import json
import re
import sys

sys.path.insert(0, "tools/vectorize")
from index import _ENTRY_RE  # noqa: E402

# find the my literal inside a raw entry match: my: '....' with \\' escapes
MY_RE = re.compile(r"my:\s*'(?:[^'\\]|\\.)*'")


def escape_th(s: str) -> str:
    return s.replace("\\", "\\\\").replace("'", "\\'")


def main() -> None:
    src = sys.argv[1]
    tr_path = sys.argv[2]
    trans = {}
    for line in open(tr_path, encoding="utf-8"):
        line = line.strip()
        if not line:
            continue
        d = json.loads(line)
        if not d.get("th") or not d["th"].strip():
            sys.exit(f"ERROR: empty th for index {d.get('i')}")
        if d["i"] in trans:
            sys.exit(f"ERROR: duplicate index {d['i']}")
        trans[d["i"]] = d["th"].strip()

    text = open(src, encoding="utf-8").read()
    matches = list(_ENTRY_RE.finditer(text))
    if any(i >= len(matches) for i in trans):
        bad = [i for i in trans if i >= len(matches)]
        sys.exit(f"ERROR: index out of range {bad} (entries={len(matches)})")

    inserts = []  # (position, th_text)
    for i, m in enumerate(matches):
        if i not in trans:
            continue
        raw = m.group(0)
        my_m = MY_RE.search(raw)
        if not my_m:
            sys.exit(f"ERROR: could not locate my literal at entry {i}")
        if re.search(r",\s*th\s*:", raw):
            sys.exit(f"ERROR: entry {i} already has th field")
        pos = m.start() + my_m.end()  # right after closing quote of my
        inserts.append((pos, trans[i]))

    # apply from last to first so offsets stay valid
    for pos, th in sorted(inserts, key=lambda x: -x[0]):
        text = text[:pos] + ", th: '" + escape_th(th) + "'" + text[pos:]

    open(src, "w", encoding="utf-8").write(text)
    print(f"OK: inserted {len(inserts)} th fields into {src}")


if __name__ == "__main__":
    main()
