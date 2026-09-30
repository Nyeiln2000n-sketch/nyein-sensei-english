#!/bin/bash
# Sube los episodios del podcast a Supabase Storage vía /api/upload-podcast.
# USO (después de que el deploy con api/upload-podcast.ts esté en producción):
#   ./scripts/upload-podcast-episodes.sh
# Requiere: el secreto en ~/workspace/goals/learn-to-speak-english/hidden_files/podcast-upload-secret.txt
set -euo pipefail

SECRET_FILE="$HOME/workspace/goals/learn-to-speak-english/hidden_files/podcast-upload-secret.txt"
API="https://nyein-sensei-english.vercel.app/api/upload-podcast"

if [ ! -f "$SECRET_FILE" ]; then
  echo "ERROR: no existe $SECRET_FILE" >&2
  exit 1
fi
SECRET=$(cat "$SECRET_FILE")

# slug -> ruta local del MP3 (los 13 episodios únicos del manifest)
declare -A EPS=(
  ["ep-13-phone-numbers-2026-09-30"]="$HOME/workspace/podcasts/ep-13-phone-numbers-2026-09-30/ep-13-phone-numbers-2026-09-30.mp3"
  ["ep-12-11-100-2026-09-30"]="$HOME/workspace/podcasts/ep-12-11-100-2026-09-30/ep-12-11-100-2026-09-30.mp3"
  ["ep-11-numbers-one-to-ten-2026-09-30"]="$HOME/workspace/podcasts/ep-11-numbers-one-to-ten-2026-09-30/ep-11-numbers-one-to-ten-2026-09-30.mp3"
  ["english-with-aung-and-may-ep-10-review-all-verbs-mega-challenge-2026-09-30"]="$HOME/workspace/podcasts/english-with-aung-and-may-ep-10-review-all-verbs-mega-challenge-2026-09-30/english-with-aung-and-may-ep-10-review-all-verbs-mega-challenge-2026-09-30.mp3"
  ["english-with-aung-and-may-ep-9-do-2026-09-29"]="$HOME/workspace/podcasts/english-with-aung-and-may-ep-9-do-2026-09-29/english-with-aung-and-may-ep-9-do-2026-09-29.mp3"
  ["english-with-aung-and-may-ep-8-can-2026-09-29"]="$HOME/workspace/podcasts/english-with-aung-and-may-ep-8-can-2026-09-29/english-with-aung-and-may-ep-8-can-2026-09-29.mp3"
  ["english-with-aung-and-may-ep-7-have-asking-for-things-hotel-shop-2026-09-29"]="$HOME/workspace/podcasts/english-with-aung-and-may-ep-7-have-asking-for-things-hotel-shop-2026-09-29/english-with-aung-and-may-ep-7-have-asking-for-things-hotel-shop-2026-09-29.mp3"
  ["english-with-aung-and-may-ep-6-buy-how-much-shopping-market-2026-09-29"]="$HOME/workspace/podcasts/english-with-aung-and-may-ep-6-buy-how-much-shopping-market-2026-09-29/english-with-aung-and-may-ep-6-buy-how-much-shopping-market-2026-09-29.mp3"
  ["eat-drink-2026-09-28"]="$HOME/workspace/podcasts/eat-drink-2026-09-28/eat-drink-2026-09-28.mp3"
  ["go-come-2026-09-28"]="$HOME/workspace/podcasts/go-come-2026-09-28/go-come-2026-09-28.mp3"
  ["i-like-i-dont-like-2026-09-28"]="$HOME/workspace/podcasts/i-like-i-dont-like-2026-09-28/i-like-i-dont-like-2026-09-28.mp3"
  ["i-want-i-need-2026-09-28"]="$HOME/workspace/podcasts/i-want-i-need-2026-09-28/i-want-i-need-2026-09-28.mp3"
  ["english-with-aung-and-may-ep-1-thai-greetings-2026-09-27"]="$HOME/workspace/podcasts/english-with-aung-and-may-ep-1-thai-greetings-2026-09-27/english-with-aung-and-may-ep-1-thai-greetings-2026-09-27.mp3"
)

ok=0; fail=0
for slug in "${!EPS[@]}"; do
  f="${EPS[$slug]}"
  if [ ! -f "$f" ]; then echo "SKIP $slug (no existe $f)"; continue; fi
  echo "Subiendo $slug ($(du -h "$f" | cut -f1))..."
  code=$(curl -s -o /tmp/podup.json -w "%{http_code}" -X POST "$API" \
    -H "x-upload-secret: $SECRET" \
    -F "slug=$slug" -F "file=@$f;type=audio/mpeg" \
    --max-time 300)
  if [ "$code" = "200" ]; then
    echo "  OK: $(head -c 120 /tmp/podup.json)"
    ok=$((ok+1))
  else
    echo "  FAIL ($code): $(head -c 200 /tmp/podup.json)"
    fail=$((fail+1))
  fi
done
echo "---"
echo "Subidos: $ok, fallidos: $fail"
