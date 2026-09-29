# Dedup report — exact duplicates

Groups of items sharing the same fingerprint (SHA-256 of normalized English text).

> NOTE — cross-kind collisions are accepted by design: a topic is meant to share its name with its headword (e.g. topic `family` teaches the word `family`), and a phrase may teach a word it contains (e.g. phrase "Smile!" vs word `smile`). These groups are listed under *Informational* below and do NOT fail `check.py`; only TRUE (same-kind) duplicates fail the gate and must be rewritten by the content team.

# TRUE duplicates (same kind) — fail the gate

## words — 0 group(s)

## phrases — 0 group(s)

## topics — 0 group(s)

# Cross-kind collisions (informational — accepted)

## words — 0 group(s)

## phrases — 54 group(s)

### fingerprint `ee3fc062563bf126` (2 items)
- `example:animals:duck` — "The duck swims in the pond." (src/data/words-animals.ts:10)
- `phrase:animals:0947` — "The duck swims in the pond." (src/data/f14/phrases-batch-4.ts:202)

### fingerprint `a7fc746be7f6ca6b` (2 items)
- `example:animals:turtle` — "The turtle walks slowly." (src/data/f14/words-batch-6.ts:118)
- `phrase:animals:0953` — "The turtle walks slowly." (src/data/f14/phrases-batch-4.ts:208)

### fingerprint `b14680f600f8f43c` (2 items)
- `example:animals:wolf` — "Wolves howl at night." (src/data/f14/words-batch-6.ts:108)
- `phrase:animals:0962` — "Wolves howl at night." (src/data/f14/phrases-batch-4.ts:217)

### fingerprint `a6ffcaaa96856556` (2 items)
- `example:animals:penguin` — "Penguins cannot fly." (src/data/f14/words-batch-6.ts:112)
- `phrase:animals:0965` — "Penguins cannot fly." (src/data/f14/phrases-batch-4.ts:220)

### fingerprint `de4bacac300ec6ae` (2 items)
- `example:office:department` — "She works in the sales department." (src/data/words-office.ts:11)
- `phrase:business:0569` — "She works in the sales department." (src/data/f14/phrases-batch-3.ts:76)

### fingerprint `3170ea5408e90fc1` (2 items)
- `example:office:invoice` — "Please send the invoice by email." (src/data/words-office.ts:22)
- `phrase:business:0577` — "Please send the invoice by email." (src/data/f14/phrases-batch-3.ts:84)

### fingerprint `2259b47af51ed529` (2 items)
- `example:clothing:zip-up` — "Zip up your jacket." (src/data/f14/words-batch-6.ts:67)
- `phrase:clothing:0886` — "Zip up your jacket." (src/data/f14/phrases-batch-4.ts:141)

### fingerprint `98deb68002ef4bbe` (2 items)
- `example:clothing:sleeve` — "Roll up your sleeves." (src/data/f14/words-batch-6.ts:38)
- `phrase:clothing:0887` — "Roll up your sleeves." (src/data/f14/phrases-batch-4.ts:142)

### fingerprint `38b2b928c231ae19` (2 items)
- `example:clothing:tuck-in` — "Tuck in your shirt." (src/data/f14/words-batch-6.ts:66)
- `phrase:clothing:0888` — "Tuck in your shirt." (src/data/f14/phrases-batch-4.ts:143)

### fingerprint `0d4a0914f58edbc1` (2 items)
- `example:travel:rain-boots` — "Wear your rain boots today." (src/data/f14/words-batch-2.ts:8)
- `phrase:clothing:0893` — "Wear your rain boots today." (src/data/f14/phrases-batch-4.ts:148)

### fingerprint `344fc40c12b0e64f` (2 items)
- `example:clothing:dress` — "She wears a red dress." (src/data/words-clothing.ts:8)
- `phrase:clothing:1758` — "She wears a red dress." (src/data/phrases-b.ts:110)

### fingerprint `11c9c14178842f6b` (2 items)
- `example:work:computer` — "Turn on the computer." (src/data/words-work.ts:12)
- `phrase:computer:1335` — "Turn on the computer." (src/data/f14/phrases-batch-6.ts:93)

### fingerprint `8fdbc6ea79a68244` (2 items)
- `example:computer:click` — "Click the blue button." (src/data/words-computer.ts:40)
- `phrase:computer:1337` — "Click the blue button." (src/data/f14/phrases-batch-6.ts:95)

### fingerprint `500de7e804671e1b` (2 items)
- `example:computer:volume` — "Turn up the volume please." (src/data/words-computer.ts:49)
- `phrase:computer:1906` — "Turn up the volume, please." (src/data/phrases-d.ts:33)

### fingerprint `a220ab03813c8c71` (2 items)
- `example:daily-life:day` — "Have a nice day." (src/data/words-daily-life.ts:5)
- `phrase:daily-life:1715` — "Have a nice day!" (src/data/phrases-b.ts:64)

### fingerprint `162849e38cc3bfde` (2 items)
- `example:emotions:dream` — "I had a strange dream." (src/data/words-emotions.ts:27)
- `phrase:daily-life:2028` — "I had a strange dream." (src/data/phrases-f.ts:35)

### fingerprint `f5568798097191c3` (2 items)
- `example:family:baby` — "The baby is sleeping now." (src/data/words-family.ts:13)
- `phrase:daily-life:2034` — "The baby is sleeping now." (src/data/phrases-f.ts:41)

### fingerprint `7eafdd231ca45a73` (2 items)
- `example:health:pill` — "Take one pill after meals." (src/data/words-health.ts:11)
- `phrase:doctor:1882` — "Take one pill after meals." (src/data/phrases-d.ts:8)

### fingerprint `d9730aecb41298e5` (2 items)
- `example:health:clinic` — "The clinic opens at nine." (src/data/words-health.ts:9)
- `phrase:doctor:1884` — "The clinic opens at nine." (src/data/phrases-d.ts:10)

### fingerprint `c56360fea2a969cb` (2 items)
- `example:emergencies:stairs` — "Use the stairs." (src/data/f14/words-batch-5.ts:153)
- `phrase:emergencies:0755` — "Use the stairs!" (src/data/f14/phrases-batch-4.ts:10)

### fingerprint `66f68b2e1a2596bd` (2 items)
- `example:weather:inside` — "Stay inside during the storm." (src/data/words-weather.ts:24)
- `phrase:emergencies:0778` — "Stay inside during the storm!" (src/data/f14/phrases-batch-4.ts:33)

### fingerprint `87f6e4f13e21506c` (2 items)
- `example:emergencies:light` — "Turn on the light." (src/data/words-emergencies.ts:16)
- `phrase:emergencies:1734` — "Turn on the light." (src/data/phrases-b.ts:84)

### fingerprint `af79500cd4f9e1d3` (2 items)
- `example:emotions:happy` — "I am happy today." (src/data/words-emotions.ts:6)
- `phrase:emotions:1692` — "I am happy today." (src/data/phrases-b.ts:40)

### fingerprint `d1322993fbc58234` (2 items)
- `example:emotions:proud` — "I am proud of you." (src/data/words-emotions.ts:13)
- `phrase:emotions:1700` — "I am proud of you." (src/data/phrases-b.ts:48)

### fingerprint `fa1eadc4c6995667` (2 items)
- `phrase:emotions:1705` — "Smile!" (src/data/phrases-b.ts:53)
- `word:friends:smile` — "smile" (src/data/words-friends.ts:14)

### fingerprint `41842f13b2da3f67` (2 items)
- `example:family:love` — "I love my family." (src/data/words-family.ts:25)
- `phrase:family:1500` — "I love my family." (src/data/phrases-a.ts:6)

### fingerprint `430f1af999f24051` (2 items)
- `example:work:help` — "Can you help me?" (src/data/words-work.ts:25)
- `phrase:friends:1523` — "Can you help me?" (src/data/phrases-a.ts:30)

### fingerprint `73ec5a78a33d1c07` (2 items)
- `example:health:headache` — "I have a headache." (src/data/words-health.ts:17)
- `phrase:health:0250` — "I have a headache." (src/data/f14/phrases-batch-2.ts:6)

### fingerprint `cc3c306f7a579bd2` (2 items)
- `example:health:stomach` — "My stomach hurts." (src/data/f14/words-batch-2.ts:99)
- `phrase:health:0254` — "My stomach hurts." (src/data/f14/phrases-batch-2.ts:10)

### fingerprint `1f1d77f56419b099` (2 items)
- `example:daily-life:wash` — "Wash your hands before eating." (src/data/words-daily-life.ts:16)
- `phrase:health:0269` — "Wash your hands before eating." (src/data/f14/phrases-batch-2.ts:25)

### fingerprint `25b3c505c2015922` (2 items)
- `example:health:allergic` — "She is allergic to peanuts." (src/data/f14/words-batch-2.ts:143)
- `phrase:health:0276` — "She is allergic to peanuts." (src/data/f14/phrases-batch-2.ts:32)

### fingerprint `e57227e51885a420` (2 items)
- `example:shopping:close` — "The market closes at six." (src/data/words-shopping.ts:29)
- `phrase:market:1396` — "The market closes at six." (src/data/f14/phrases-batch-6.ts:155)

### fingerprint `88e4ee8ea298fbeb` (2 items)
- `example:market:vendor` — "The vendor gave me a discount." (src/data/words-market.ts:6)
- `phrase:market:1401` — "The vendor gave me a discount." (src/data/f14/phrases-batch-6.ts:160)

### fingerprint `299d553e5e271404` (2 items)
- `example:market:lower` — "Can you lower the price a little?" (src/data/words-market.ts:33)
- `phrase:market:1922` — "Can you lower the price a little?" (src/data/phrases-d.ts:50)

### fingerprint `8ec19ddafa52c065` (2 items)
- `example:nature:volcano` — "The volcano erupted last year." (src/data/f14/words-batch-3.ts:125)
- `phrase:nature:0433` — "The volcano erupted last year." (src/data/f14/phrases-batch-2.ts:192)

### fingerprint `88b38017078f3f93` (2 items)
- `example:personality:listener` — "She is a good listener." (src/data/words-personality.ts:45)
- `phrase:personality:1472` — "She is a good listener." (src/data/f14/phrases-batch-6.ts:233)

### fingerprint `de70df00095e7908` (2 items)
- `example:personality:quiet` — "He is quiet in class." (src/data/words-personality.ts:13)
- `phrase:personality:1477` — "He is quiet in class." (src/data/f14/phrases-batch-6.ts:238)

### fingerprint `a3f1c8919448881b` (2 items)
- `example:restaurant:recommend` — "What do you recommend today?" (src/data/words-restaurant.ts:50)
- `phrase:restaurant:1822` — "What do you recommend today?" (src/data/phrases-c.ts:8)

### fingerprint `16bc7bfe9c18a5e9` (2 items)
- `example:school:school` — "I go to school every day." (src/data/words-school.ts:5)
- `phrase:school:0300` — "I go to school every day." (src/data/f14/phrases-batch-2.ts:57)

### fingerprint `efdbba1ef93ca84d` (2 items)
- `example:school:exam` — "The exam is next week." (src/data/words-school.ts:16)
- `phrase:school:0306` — "The exam is next week." (src/data/f14/phrases-batch-2.ts:63)

### fingerprint `79b892209a23f059` (2 items)
- `example:weather:summer` — "Summer is very hot here." (src/data/words-weather.ts:17)
- `phrase:seasons:1419` — "Summer is very hot here." (src/data/f14/phrases-batch-6.ts:179)

### fingerprint `0d6c6d86869f1c09` (2 items)
- `example:nature:wind` — "The wind is strong today." (src/data/words-nature.ts:16)
- `phrase:seasons:1431` — "The wind is strong today." (src/data/f14/phrases-batch-6.ts:191)

### fingerprint `3cedebc6756de040` (2 items)
- `example:weather:rainy-season` — "The rainy season starts in June." (src/data/words-weather.ts:19)
- `phrase:seasons:1439` — "The rainy season starts in June." (src/data/f14/phrases-batch-6.ts:199)

### fingerprint `1408f662eb3e29a3` (2 items)
- `example:shopping:open` — "The shop opens at nine." (src/data/words-shopping.ts:28)
- `phrase:shopping:0161` — "The shop opens at nine." (src/data/f14/phrases-batch-1.ts:170)

### fingerprint `3a2df62ae9b7d099` (2 items)
- `example:market:credit-card` — "Do you accept credit cards?" (src/data/f14/words-batch-8.ts:175)
- `phrase:shopping:0162` — "Do you accept credit cards?" (src/data/f14/phrases-batch-1.ts:171)

### fingerprint `c501e470c3e28f53` (2 items)
- `example:market:half` — "Give me half a kilo, please." (src/data/words-market.ts:19)
- `phrase:shopping:2112` — "Give me half a kilo, please." (src/data/phrases-f.ts:121)

### fingerprint `659da070c6542db4` (2 items)
- `example:sports:ball` — "Catch the ball!" (src/data/words-sports.ts:12)
- `phrase:sports:1655` — "Catch the ball." (src/data/phrases-a.ts:170)

### fingerprint `d9ace543793a28b9` (2 items)
- `example:time:time` — "What time is it now?" (src/data/words-time.ts:5)
- `phrase:time:1000` — "What time is it now?" (src/data/f14/phrases-batch-5.ts:6)

### fingerprint `3750893cbdd218c9` (2 items)
- `example:daily-life:wake-up` — "I wake up at six." (src/data/words-daily-life.ts:14)
- `phrase:time:1796` — "I wake up at six." (src/data/phrases-b.ts:150)

### fingerprint `35b40c06ad602939` (2 items)
- `example:travel:hotel` — "The hotel is near the beach." (src/data/words-travel.ts:15)
- `phrase:travel:0202` — "The hotel is near the beach." (src/data/f14/phrases-batch-1.ts:212)

### fingerprint `bb8c9852a84717a3` (2 items)
- `example:travel:souvenir` — "I bought souvenirs for my family." (src/data/f14/words-batch-2.ts:43)
- `phrase:travel:0208` — "I bought souvenirs for my family." (src/data/f14/phrases-batch-1.ts:218)

### fingerprint `3a1d9f5208900d20` (2 items)
- `example:weather:temperature` — "The temperature is thirty degrees." (src/data/words-weather.ts:15)
- `phrase:weather:1075` — "The temperature is thirty degrees." (src/data/f14/phrases-batch-5.ts:82)

### fingerprint `8b4e977e873afa21` (2 items)
- `example:seasons:downpour` — "We got caught in a sudden downpour." (src/data/words-seasons.ts:53)
- `phrase:weather:1095` — "We got caught in a sudden downpour." (src/data/f14/phrases-batch-5.ts:102)

### fingerprint `2cae155641866cd9` (2 items)
- `example:work:boss` — "My boss is very kind." (src/data/words-work.ts:8)
- `phrase:work:1533` — "My boss is very kind." (src/data/phrases-a.ts:41)

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
SUMMARY: 0 true same-kind duplicate group(s) fail the gate; 150 cross-kind collision group(s) are accepted by design.