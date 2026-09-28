"""Audit the content index for duplicates and near-duplicates.

Run from the repo root:
    python3 tools/vectorize/audit.py

Writes:
    tools/vectorize/dedup-report.md    - exact fingerprint matches
    tools/vectorize/similar-report.md  - pairs with similarity > 0.85
Both end with a one-line SUMMARY.
"""

import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from vectors import cosine_similarity  # noqa: E402

HERE = os.path.dirname(os.path.abspath(__file__))
INDEX_FILE = os.path.join(HERE, "content-index.json")
DEDUP_FILE = os.path.join(HERE, "dedup-report.md")
SIMILAR_FILE = os.path.join(HERE, "similar-report.md")

SIMILARITY_THRESHOLD = 0.85
MAX_PAIRS = 200


def load_index() -> list:
    with open(INDEX_FILE, encoding="utf-8") as fh:
        return json.load(fh)["items"]


def location(item: dict) -> str:
    return f"{item['file']}:{item['line']}"


def audit_duplicates(items: list) -> dict:
    """Map fingerprint -> list of items (only groups with > 1 member)."""
    groups: dict = {}
    for item in items:
        groups.setdefault(item["fingerprint"], []).append(item)
    return {fp: g for fp, g in groups.items() if len(g) > 1}


def is_true_duplicate(group: list) -> bool:
    """A group is a TRUE duplicate when two or more members share the same
    kind. Cross-kind collisions are accepted by design (see report header)."""
    by_kind: dict = {}
    for item in group:
        by_kind.setdefault(item["kind"], []).append(item)
    return any(len(kg) > 1 for kg in by_kind.values())


def audit_similar(items: list) -> list:
    """All item pairs with similarity > threshold, sorted desc, capped."""
    pairs = []
    n = len(items)
    for i in range(n):
        for j in range(i + 1, n):
            score, driver = cosine_similarity(items[i], items[j])
            if score > SIMILARITY_THRESHOLD:
                pairs.append((score, driver, items[i], items[j]))
    pairs.sort(key=lambda p: p[0], reverse=True)
    return pairs[:MAX_PAIRS]


def write_dedup_report(groups: dict) -> None:
    lines = ["# Dedup report — exact duplicates", ""]
    lines.append("Groups of items sharing the same fingerprint "
                 "(SHA-256 of normalized English text).")
    lines.append("")
    lines.append("> NOTE — cross-kind collisions are accepted by design: a "
                 "topic is meant to share its name with its headword "
                 "(e.g. topic `family` teaches the word `family`), and a "
                 "phrase may teach a word it contains "
                 "(e.g. phrase \"Smile!\" vs word `smile`). These groups "
                 "are listed under *Informational* below and do NOT fail "
                 "`check.py`; only TRUE (same-kind) duplicates fail the "
                 "gate and must be rewritten by the content team.")
    lines.append("")

    true_groups = [g for g in groups.values() if is_true_duplicate(g)]
    info_groups = [g for g in groups.values() if not is_true_duplicate(g)]

    def dump_section(title: str, section_groups: list) -> None:
        lines.append(title)
        lines.append("")
        for kind in ("word", "phrase", "topic"):
            # informational groups are classified by their first item's kind
            kind_groups = [g for g in section_groups if g[0]["kind"] == kind]
            lines.append(f"## {kind}s — {len(kind_groups)} group(s)")
            lines.append("")
            for g in sorted(kind_groups, key=lambda x: x[0]["id"]):
                lines.append(f"### fingerprint `{g[0]['fingerprint']}` "
                             f"({len(g)} items)")
                for item in sorted(g, key=lambda i: i["id"]):
                    lines.append(f"- `{item['id']}` — \"{item['en']}\" "
                                 f"({location(item)})")
                lines.append("")

    dump_section("# TRUE duplicates (same kind) — fail the gate",
                 true_groups)
    dump_section("# Cross-kind collisions (informational — accepted)",
                 info_groups)

    lines.append("---")
    lines.append(f"SUMMARY: {len(true_groups)} true same-kind duplicate "
                 f"group(s) fail the gate; {len(info_groups)} cross-kind "
                 f"collision group(s) are accepted by design.")
    with open(DEDUP_FILE, "w", encoding="utf-8") as fh:
        fh.write("\n".join(lines))


def write_similar_report(pairs: list) -> None:
    lines = ["# Similar-content report — pairs above 0.85", ""]
    lines.append("Similarity = 0.7 x vocab-signature cosine overlap "
                 "+ 0.3 x template-signature Jaccard.")
    lines.append(f"Showing {len(pairs)} pair(s) with score > "
                 f"{SIMILARITY_THRESHOLD} (cap {MAX_PAIRS}), sorted by score.")
    lines.append("")

    for rank, (score, driver, a, b) in enumerate(pairs, 1):
        lines.append(f"## #{rank} — score {score:.3f} (driver: {driver})")
        lines.append(f"- A `{a['id']}` — \"{a['en']}\" ({location(a)})")
        lines.append(f"- B `{b['id']}` — \"{b['en']}\" ({location(b)})")
        shared = sorted(set(a["vocab_sig"]) & set(b["vocab_sig"]))
        lines.append(f"- shared vocab: {', '.join(shared) or '—'}")
        lines.append("")

    lines.append("---")
    lines.append(f"SUMMARY: {len(pairs)} pairs above {SIMILARITY_THRESHOLD}.")
    with open(SIMILAR_FILE, "w", encoding="utf-8") as fh:
        fh.write("\n".join(lines))


def main() -> None:
    items = load_index()
    groups = audit_duplicates(items)
    pairs = audit_similar(items)
    write_dedup_report(groups)
    write_similar_report(pairs)
    dup_items = sum(len(g) for g in groups.values())
    print(f"Wrote dedup-report.md ({len(groups)} groups, {dup_items} items) "
          f"and similar-report.md ({len(pairs)} pairs).")


if __name__ == "__main__":
    main()
