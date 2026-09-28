# Dedup report — exact duplicates

Groups of items sharing the same fingerprint (SHA-256 of normalized English text).

> NOTE — cross-kind collisions are accepted by design: a topic is meant to share its name with its headword (e.g. topic `family` teaches the word `family`), and a phrase may teach a word it contains (e.g. phrase "Smile!" vs word `smile`). These groups are listed under *Informational* below and do NOT fail `check.py`; only TRUE (same-kind) duplicates fail the gate and must be rewritten by the content team.

# TRUE duplicates (same kind) — fail the gate

## words — 0 group(s)

## phrases — 0 group(s)

## topics — 0 group(s)

# Cross-kind collisions (informational — accepted)

## words — 0 group(s)

## phrases — 1 group(s)

### fingerprint `fa1eadc4c6995667` (2 items)
- `phrase:emotions:0205` — "Smile!" (src/data/phrases-b.ts:53)
- `word:friends:smile` — "smile" (src/data/words-friends.ts:14)

## topics — 13 group(s)

### fingerprint `11d40417959631d3` (2 items)
- `topic:business` — "Business" (src/data/topics.ts:15)
- `word:business:business` — "business" (src/data/words-business.ts:5)

### fingerprint `12d264de09a571d6` (2 items)
- `topic:clothing` — "Clothing" (src/data/topics.ts:20)
- `word:clothing:clothing` — "clothing" (src/data/words-clothing.ts:5)

### fingerprint `d34a569ab7aaa54d` (2 items)
- `topic:family` — "Family" (src/data/topics.ts:4)
- `word:family:family` — "family" (src/data/words-family.ts:23)

### fingerprint `c1f026582fe6e8cb` (2 items)
- `topic:food` — "Food" (src/data/topics.ts:11)
- `word:food:food` — "food" (src/data/words-food.ts:5)

### fingerprint `62484e22a6a5ade1` (2 items)
- `topic:health` — "Health" (src/data/topics.ts:9)
- `word:health:health` — "health" (src/data/words-health.ts:5)

### fingerprint `4ea140588150773c` (2 items)
- `topic:home` — "Home" (src/data/topics.ts:19)
- `word:family:home` — "home" (src/data/words-family.ts:24)

### fingerprint `5697abca7a318e68` (2 items)
- `topic:nature` — "Nature" (src/data/topics.ts:12)
- `word:nature:nature` — "nature" (src/data/words-nature.ts:5)

### fingerprint `d64debd942d7dc26` (2 items)
- `topic:school` — "School" (src/data/topics.ts:10)
- `word:school:school` — "school" (src/data/words-school.ts:5)

### fingerprint `e91fadf24f78c081` (2 items)
- `topic:technology` — "Technology" (src/data/topics.ts:14)
- `word:technology:technology` — "technology" (src/data/words-technology.ts:5)

### fingerprint `336074805fc85398` (2 items)
- `topic:time` — "Time" (src/data/topics.ts:22)
- `word:time:time` — "time" (src/data/words-time.ts:5)

### fingerprint `0209442e115ad7bc` (2 items)
- `topic:travel` — "Travel" (src/data/topics.ts:8)
- `word:travel:travel` — "travel" (src/data/words-travel.ts:5)

### fingerprint `e5e72beb4e3c6926` (2 items)
- `topic:weather` — "Weather" (src/data/topics.ts:23)
- `word:weather:weather` — "weather" (src/data/words-weather.ts:5)

### fingerprint `00e13ed7af55b276` (2 items)
- `topic:work` — "Work" (src/data/topics.ts:6)
- `word:work:work` — "work" (src/data/words-work.ts:5)

---
SUMMARY: 0 true same-kind duplicate group(s) fail the gate; 14 cross-kind collision group(s) are accepted by design.