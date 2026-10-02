#!/usr/bin/env python3
"""Extract entries from an f14 batch file for Thai translation.
Usage: extract.py <srcfile> [start] [end]
Prints compact JSONL to stdout: {"i": idx, "en": ..., "my": ..., "cefr": ..., "topic": ...}
Mirrors tools/vectorize/index.py _ENTRY_RE exactly so counts agree.
"""
import json
import re
import sys

sys.path.insert(0, "tools/vectorize")
from index import _ENTRY_RE, _unescape  # noqa: E402

QUOTED_END_RE = re.compile(r"my:\s*'")


def main() -> None:
    src = sys.argv[1]
    start = int(sys.argv[2]) if len(sys.argv) > 2 else 0
    end = int(sys.argv[3]) if len(sys.argv) > 3 else None
    text = open(src, encoding="utf-8").read()
    matches = list(_ENTRY_RE.finditer(text))
    for i, m in enumerate(matches):
        if i < start or (end is not None and i >= end):
            continue
        en = _unescape(m.group(1))
        my = _unescape(m.group(2))
        topic = _unescape(m.group(3)) if m.group(3) else ""
        # cefr is a later key; grab from the raw entry text
        raw = m.group(0)
        cefr_m = re.search(r"cefr:\s*'([^']*)'", raw)
        cefr = cefr_m.group(1) if cefr_m else ""
        print(json.dumps({"i": i, "en": en, "cefr": cefr},
                         ensure_ascii=False))


if __name__ == "__main__":
    main()
