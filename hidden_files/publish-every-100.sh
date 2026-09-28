#!/bin/bash
# Incremental publisher: pushes the app every time >=100 new word images exist since last publish.
set -u
REPO_DIR="$HOME/workspace/nyein-sensei-english"
STATE_FILE="$REPO_DIR/hidden_files/publish-state.json"
cd "$REPO_DIR" || exit 1

count=$(ls public/word-images/*.png 2>/dev/null | wc -l)
last=0
[ -f "$STATE_FILE" ] && last=$(python3 -c "import json;print(json.load(open('$STATE_FILE')).get('published_images',0))" 2>/dev/null || true)
delta=$((count - last))
echo "images=$count last_published=$last delta=$delta"

if [ "$delta" -lt 100 ]; then
  echo "SKIP: fewer than 100 new images since last publish."
  exit 0
fi

# Merge batch mappings (idempotent union)
python3 -c "
import json, glob
total = json.load(open('src/data/word-images.json'))
for f in sorted(glob.glob('src/data/word-images-batch-*.json')):
    total.update(json.load(open(f)))
json.dump(total, open('src/data/word-images.json','w'), ensure_ascii=False, indent=1)
print('mapped:', len(total))
"

npm run typecheck >/tmp/pub-check.log 2>&1 || { echo "TYPECHECK FAILED"; tail -20 /tmp/pub-check.log; exit 1; }
npm run build >>/tmp/pub-check.log 2>&1 || { echo "BUILD FAILED"; tail -20 /tmp/pub-check.log; exit 1; }
npm run dedup-check >>/tmp/pub-check.log 2>&1 || { echo "DEDUP FAILED"; tail -20 /tmp/pub-check.log; exit 1; }

"$HOME/workspace/skills/github/bin/gh-push-dir" --repo Nyeiln2000n-sketch/nyein-sensei-english \
  --dir . --branch main \
  --message "Word images batch: $count total (+$delta)" >>/tmp/pub-check.log 2>&1 \
  || { echo "PUSH FAILED"; tail -20 /tmp/pub-check.log; exit 1; }

python3 -c "import json;json.dump({'published_images':$count},open('$STATE_FILE','w'))"
echo "PUBLISHED_OK images=$count"
