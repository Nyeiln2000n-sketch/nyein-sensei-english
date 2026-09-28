"""Pre-commit style check: fail if any SAME-KIND exact-duplicate fingerprint exists.

Run from the repo root:
    python3 tools/vectorize/check.py

Rebuilds the index via index.py, then exits 1 with a printed list if any
fingerprint is shared by two or more items of the SAME kind
(word<->word, phrase<->phrase, topic<->topic), else exits 0 printing
"OK: no exact duplicates".

Cross-kind collisions (e.g. topic "family" vs word "family", phrase
"Smile!" vs word "smile") are pedagogically intentional — a topic is meant
to share its name with its headword — and do NOT fail this gate. They are
still listed in dedup-report.md as informational.
"""

import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import index as indexer  # noqa: E402

INDEX_FILE = os.path.join(HERE, "content-index.json")


def same_kind_dup_groups(items: list) -> dict:
    """Return {fingerprint: items} for groups where two or more items share
    both a fingerprint AND the same kind (word/phrase/topic).

    Cross-kind collisions (e.g. topic "family" vs word "family") are
    accepted by design and excluded here.
    """
    groups: dict = {}
    for item in items:
        groups.setdefault(item["fingerprint"], []).append(item)

    dup_groups = {}
    for fp, g in groups.items():
        by_kind: dict = {}
        for item in g:
            by_kind.setdefault(item["kind"], []).append(item)
        failing = [i for kind_group in by_kind.values()
                   if len(kind_group) > 1 for i in kind_group]
        if failing:
            dup_groups[fp] = sorted(failing, key=lambda i: i["id"])
    return dup_groups


def main() -> int:
    # Rebuild the index first so the check always sees fresh data.
    indexer.main()

    with open(INDEX_FILE, encoding="utf-8") as fh:
        items = json.load(fh)["items"]

    dup_groups = same_kind_dup_groups(items)

    if dup_groups:
        print(f"FAIL: {len(dup_groups)} same-kind exact-duplicate group(s) found:")
        for fp, g in sorted(dup_groups.items()):
            print(f"  fingerprint {fp} ({len(g)} items, kind: {g[0]['kind']}):")
            for item in g:
                print(f"    - {item['id']} — \"{item['en']}\" "
                      f"({item['file']}:{item['line']})")
        return 1

    print("OK: no same-kind exact duplicates "
          "(cross-kind collisions are accepted by design)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
