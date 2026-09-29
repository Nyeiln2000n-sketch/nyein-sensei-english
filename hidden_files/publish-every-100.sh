#!/bin/bash
# Incremental publisher: pushes the app every time >=100 new word images exist since last publish.
# Chunked pushes: at most CHUNK_MAX new PNGs per run, so GitHub's Git Data API
# never chokes (HTTP 403 rate limit / 502 / 422 tree-too-large on ~1200+ blob runs).
set -u
REPO_DIR="$HOME/workspace/nyein-sensei-english"
STATE_FILE="$REPO_DIR/hidden_files/publish-state.json"
IMG_DIR="$REPO_DIR/public/word-images"
QUARANTINE="$REPO_DIR/hidden_files/png-quarantine"
CHUNK_MAX=200
COOLDOWN_FILE="$REPO_DIR/hidden_files/publish-cooldown-until"
mkdir -p "$QUARANTINE"
cd "$REPO_DIR" || exit 1

# GitHub secondary rate limits (abuse detection) don't show in /rate_limit
# and are re-triggered by every retry. After a 403/429 we back off quietly
# for 60 minutes so the limit can fully clear instead of self-perpetuating.
if [ -f "$COOLDOWN_FILE" ]; then
  until_ts=$(cat "$COOLDOWN_FILE" 2>/dev/null || echo 0)
  if [ "$(date +%s)" -lt "$until_ts" ]; then
    echo "SKIP: GitHub API cooldown active until $(date -d "@$until_ts" '+%Y-%m-%d %H:%M %Z') — letting the secondary rate limit clear."
    exit 0
  fi
fi

# Always restore quarantined PNGs on exit (success or failure) so files
# never get stranded outside the images dir.
restore_quarantine() {
  if ls "$QUARANTINE"/*.png >/dev/null 2>&1; then
    mv "$QUARANTINE"/*.png "$IMG_DIR"/ 2>/dev/null || true
  fi
}
trap restore_quarantine EXIT
restore_quarantine  # crash recovery from a previous interrupted run

mapfile -t pngs < <(ls "$IMG_DIR"/*.png 2>/dev/null | sort)
count=${#pngs[@]}
last=0
[ -f "$STATE_FILE" ] && last=$(python3 -c "import json;print(json.load(open('$STATE_FILE')).get('published_images',0))" 2>/dev/null || true)
delta=$((count - last))
echo "images=$count last_published=$last delta=$delta chunk_max=$CHUNK_MAX"

if [ "$delta" -lt 100 ]; then
  echo "SKIP: fewer than 100 new images since last publish."
  exit 0
fi

# Chunk: keep at most last+CHUNK_MAX PNGs visible to the push; move the
# alphabetically-last excess to quarantine (gh-push-dir only uploads
# blobs that changed vs remote, so each run uploads <= CHUNK_MAX blobs).
push_count=$count
if [ "$count" -gt $((last + CHUNK_MAX)) ]; then
  push_count=$((last + CHUNK_MAX))
  for f in "${pngs[@]:$push_count}"; do
    mv "$f" "$QUARANTINE"/ 2>/dev/null || true
  done
  echo "chunked: publishing $push_count images (+$((push_count - last)) new), $((count - push_count)) deferred to next run"
fi

# Merge batch mappings (idempotent union), filtered to PNGs actually present
# in this chunk so the published mapping never points at unpublished images.
python3 -c "
import json, glob, os
present = {os.path.basename(p) for p in glob.glob('public/word-images/*.png')}
total = json.load(open('src/data/word-images.json'))
for f in sorted(glob.glob('src/data/word-images-batch-*.json')):
    total.update(json.load(open(f)))
total = {k: v for k, v in total.items() if os.path.basename(v) in present}
json.dump(total, open('src/data/word-images.json','w'), ensure_ascii=False, indent=1)
print('mapped:', len(total))
"

npm run typecheck >/tmp/pub-check.log 2>&1 || { echo "TYPECHECK FAILED"; tail -20 /tmp/pub-check.log; exit 1; }
# The image workers rename temp files (media-generation-*.png -> final name)
# concurrently; if Vite lists the dir then the file vanishes mid-build it
# fails with ENOENT. That race is transient: wait 30s and retry once.
build_attempt=1
while true; do
  if npm run build >>/tmp/pub-check.log 2>&1; then break; fi
  if [ "$build_attempt" -eq 1 ] && grep -q "ENOENT" /tmp/pub-check.log; then
    echo "BUILD hit ENOENT (concurrent image-worker rename) — retrying once after 30s settle"
    sleep 30
    build_attempt=2
  else
    echo "BUILD FAILED"; tail -20 /tmp/pub-check.log; exit 1
  fi
done
npm run dedup-check >>/tmp/pub-check.log 2>&1 || { echo "DEDUP FAILED"; tail -20 /tmp/pub-check.log; exit 1; }

"$HOME/workspace/skills/github/bin/gh-push-dir" --repo Nyeiln2000n-sketch/nyein-sensei-english \
  --dir . --branch main \
  --message "Word images batch: $push_count total (+$((push_count - last)) new)" >>/tmp/pub-check.log 2>&1 \
  || { echo "PUSH FAILED"; tail -20 /tmp/pub-check.log;
       if grep -qE "HTTP 40[39]|HTTP 429" /tmp/pub-check.log; then
         date -d "+60 minutes" +%s > "$COOLDOWN_FILE"
         echo "cooldown set for 60 min (GitHub API secondary rate limit)"
       fi
       exit 1; }

python3 -c "import json;json.dump({'published_images':$push_count},open('$STATE_FILE','w'))"
echo "PUBLISHED_OK images=$push_count (+$((push_count - last)) new this run)"
