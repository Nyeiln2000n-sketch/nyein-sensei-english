"""Shared text-normalization and similarity-vector utilities for the
content-intelligence toolkit (stdlib only, Python 3).

Provides:
  normalize_en(text)  - lowercase, strip accents, strip punctuation,
                        collapse whitespace (used for fingerprints +
                        signatures of English text)
  normalize_my(text)  - Myanmar text: keep as-is (no case), strip
                        punctuation and collapse whitespace
  fingerprint(text)   - sha256 of normalized English text, first 16 hex chars
  STOPWORDS           - small English stopword set used by signatures
  vocab_signature(text)   - sorted unique content-words of English text
  template_signature(text) - sentence pattern: content words -> 'W',
                        stopwords + punctuation kept, e.g.
                        "I love my W ." (example from spec)
  cosine_similarity(a, vec) - 0.7 * vocab overlap + 0.3 * template Jaccard
"""

import hashlib
import re
import unicodedata

# ---------------------------------------------------------------------------
# Normalization
# ---------------------------------------------------------------------------

# Punctuation (incl. Myanmar full stop "。" used in translations) stripped
# from fingerprints / Myanmar normalization. Anything that is not a
# letter/number/whitespace becomes a separator.
_PUNCT_RE = re.compile(r"[^\w\s\u1000-\u109F]", re.UNICODE)


def _collapse_ws(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()


def strip_accents(text: str) -> str:
    """Remove diacritics (e.g. café -> cafe)."""
    decomposed = unicodedata.normalize("NFKD", text)
    return "".join(c for c in decomposed if not unicodedata.combining(c))


def normalize_en(text: str) -> str:
    """Lowercase, strip accents, strip punctuation, collapse whitespace."""
    text = text.lower()
    text = strip_accents(text)
    text = _PUNCT_RE.sub(" ", text)
    return _collapse_ws(text)


def normalize_my(text: str) -> str:
    """Myanmar has no case: keep text as-is, strip punctuation/extra spaces."""
    text = _PUNCT_RE.sub(" ", text)
    return _collapse_ws(text)


def fingerprint(text: str) -> str:
    """SHA-256 (first 16 hex chars) of NORMALIZED English text."""
    return hashlib.sha256(normalize_en(text).encode("utf-8")).hexdigest()[:16]


# ---------------------------------------------------------------------------
# Signatures
# ---------------------------------------------------------------------------

STOPWORDS = {
    "a", "an", "the", "i", "me", "my", "mine", "you", "your", "yours",
    "he", "him", "his", "she", "her", "hers", "it", "its", "we", "us",
    "our", "ours", "they", "them", "their", "theirs", "this", "that",
    "these", "those", "is", "am", "are", "was", "were", "be", "been",
    "being", "do", "does", "did", "have", "has", "had", "can", "could",
    "will", "would", "shall", "should", "may", "might", "must", "of",
    "in", "on", "at", "to", "for", "from", "with", "by", "about",
    "as", "into", "like", "through", "over", "after", "before",
    "between", "out", "up", "down", "off", "and", "but", "or", "so",
    "if", "when", "where", "what", "which", "who", "whom", "whose",
    "how", "why", "not", "no", "yes", "very", "too", "also", "just",
    "there", "here", "one", "two", "three", "please", "let", "let's",
    # contraction fragments left behind when apostrophes are stripped
    # (let's -> let s, don't -> don t, I'm -> i m ...)
    "s", "t", "d", "m", "re", "ll", "ve", "don", "won",
}

_TOKEN_RE = re.compile(r"[^\w\s]", re.UNICODE)


def _en_tokens(text: str) -> list:
    """Word tokens of normalized English text (accents/punctuation removed)."""
    norm = normalize_en(text)
    return [t for t in norm.split(" ") if t]


def vocab_signature(text: str) -> list:
    """Sorted unique content-words of the English text (stopwords removed)."""
    return sorted({t for t in _en_tokens(text) if t not in STOPWORDS})


def template_signature(text: str) -> str:
    """Sentence pattern: every content word -> 'W'; stopwords kept;
    punctuation kept as its own token.

    Example: "I love my mother." -> "i love my W ."
    """
    raw = text.lower()
    raw = strip_accents(raw)
    # split keeping punctuation as separate tokens
    tokens = re.findall(r"\w+|[^\w\s]", raw, re.UNICODE)
    out = []
    for tok in tokens:
        if re.fullmatch(r"\w+", tok, re.UNICODE):
            out.append("W" if tok not in STOPWORDS else tok)
        else:
            out.append(tok)
    return " ".join(out)


# ---------------------------------------------------------------------------
# Similarity
# ---------------------------------------------------------------------------

def _overlap_cosine(a: set, b: set) -> float:
    if not a or not b:
        return 0.0
    return len(a & b) / ((len(a) * len(b)) ** 0.5)


def _jaccard(a: set, b: set) -> float:
    union = len(a | b)
    if union == 0:
        return 0.0
    return len(a & b) / union


def cosine_similarity(vec_a: dict, vec_b: dict) -> tuple:
    """Similarity between two item vectors.

    Returns (score, driver) where driver is "vocab" or "template"
    indicating which component contributed most.
    """
    va = set(vec_a.get("vocab_sig", []))
    vb = set(vec_b.get("vocab_sig", []))
    ta = set(vec_a.get("template_sig", "").split())
    tb = set(vec_b.get("template_sig", "").split())

    vocab_score = _overlap_cosine(va, vb)
    template_score = _jaccard(ta, tb)
    score = 0.7 * vocab_score + 0.3 * template_score
    driver = "vocab" if vocab_score >= template_score else "template"
    return round(score, 3), driver
