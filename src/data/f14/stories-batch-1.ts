import type { Story } from '../../types';

// FASE 14 Ola 1 — 30 graded stories (12 A2 / 12 B1 / 6 B2)
// New mini-stories: adventure, mystery, Myanmar culture, travel, work, science,
// friendship, nature, food, sports. No overlap with src/data/stories.ts.
// Each story reuses 3-5 key words from the app vocabulary list (noted above it).
// A2 = simple sentences | B1 = connectors (however / because / when / while)
// B2 = richer vocabulary and subordinate clauses.

export const storiesBatch1: Story[] = [
// key words: key, door, lose, find, search, happy
{
  id: 'story-f14-a2-1',
  level: 'A2',
  titleEn: 'The Lost Key',
  titleMy: 'ပျောက်သွားတဲ့သော့',
  paragraphs: [
    {
      en: 'Ko Aung comes home from work. He wants to open the door, but the key is not in his bag.',
      my: 'ကိုအောင်က အလုပ်ကနေ အိမ်ပြန်လာတယ်။ တံခါးကို ဖွင့်ချင်ပေမယ့် သူ့အိတ်ထဲမှာ သော့မရှိဘူး။',
    },
    {
      en: 'He searches his pockets. He searches the street. He cannot find the key.',
      my: 'သူက သူ့အိတ်ကပ်တွေကို ရှာတယ်။ လမ်းပေါ်မှာ ရှာတယ်။ သော့ကို ရှာမတွေ့ဘူး။',
    },
    {
      en: 'His little sister runs out. "Is this your key?" she asks. It is under the table.',
      my: 'သူ့ညီမလေးက ပြေးထွက်လာတယ်။ "ဒါ မင်းသော့လား" လို့ သူမက မေးတယ်။ သော့က စားပွဲအောက်မှာ ရှိနေတယ်။',
    },
    {
      en: 'Ko Aung laughs. "Thank you!" Now he can open the door. He is very happy.',
      my: 'ကိုအောင်က ရယ်တယ်။ "ကျေးဇူးတင်ပါတယ်"။ အခု သူတံခါးဖွင့်နိုင်ပြီ။ သူ အရမ်းပျော်တယ်။',
    },
  ],
},
// key words: bus, night, sleep, wake, arrive, driver
{
  id: 'story-f14-a2-2',
  level: 'A2',
  titleEn: 'The Night Bus',
  titleMy: 'ညပိုင်းဘတ်စ်ကား',
  paragraphs: [
    {
      en: 'May takes the night bus to Yangon. The bus leaves at ten o\'clock.',
      my: 'မေက ရန်ကုန်ကို ညပိုင်းဘတ်စ်ကားစီးတယ်။ ဘတ်စ်ကားက ည ဆယ်နာရီမှာ ထွက်တယ်။',
    },
    {
      en: 'She sits near the window. The road is dark, but the stars are beautiful.',
      my: 'သူမ ဝင်းဒိုးနားမှာ ထိုင်တယ်။ လမ်းက မှောင်နေပေမယ့် ကြယ်တွေက လှတယ်။',
    },
    {
      en: 'May sleeps for a long time. The driver wakes her up. "We are here," he says.',
      my: 'မေက အချိန်ကြာကြာ အိပ်တယ်။ ယာဉ်မောင်းက သူမကို နှိုးတယ်။ "ကျွန်တော်တို့ ရောက်ပြီ" လို့ သူက ပြောတယ်။',
    },
    {
      en: 'It is five in the morning. May smiles. The trip is over.',
      my: 'မနက် ငါးနာရီထိုးပြီ။ မေ ပြုံးတယ်။ ခရီးစဉ် ပြီးဆုံးပြီ။',
    },
  ],
},
// key words: garden, plant, flower, water, grow, beautiful
{
  id: 'story-f14-a2-3',
  level: 'A2',
  titleEn: 'The Little Garden',
  titleMy: 'ပန်းခြံအသေးလေး',
  paragraphs: [
    {
      en: 'Daw Su has a little garden behind her house. Every morning she works there.',
      my: 'ဒေါ်စုမှာ သူမအိမ်နောက်မှာ ပန်းခြံအသေးလေး တစ်ခုရှိတယ်။ မနက်တိုင်း သူမ အဲဒီမှာ အလုပ်လုပ်တယ်။',
    },
    {
      en: 'She plants red flowers and green vegetables. She gives them water every day.',
      my: 'သူမ အနီရောင် ပန်းတွေနဲ့ အစိမ်းရောင် ဟင်းသီးဟင်းရွက်တွေ စိုက်တယ်။ သူမကို နေ့တိုင်း ရေ လောင်းတယ်။',
    },
    {
      en: 'After one month, the flowers are beautiful. The vegetables grow big.',
      my: 'တစ်လအကြာမှာ ပန်းတွေက လှလာတယ်။ ဟင်းသီးဟင်းရွက်တွေက ကြီးထွားလာတယ်။',
    },
    {
      en: 'Daw Su gives vegetables to her friends. Her garden makes everyone happy.',
      my: 'ဒေါ်စုက သူမသူငယ်ချင်းတွေကို ဟင်းသီးဟင်းရွက် ပေးတယ်။ သူမရဲ့ ပန်းခြံက အားလုံးကို ပျော်ရွှင်စေတယ်။',
    },
  ],
},
// key words: neighbor, move, box, help, tea, friendly
{
  id: 'story-f14-a2-4',
  level: 'A2',
  titleEn: 'A New Neighbor',
  titleMy: 'အိမ်နီးချင်းအသစ်',
  paragraphs: [
    {
      en: 'A new family moves into the house next door. Their name is Tun Tun\'s family.',
      my: 'မိသားစုအသစ်တစ်စု ဘေးအိမ်ကို ပြောင်းလာတယ်။ သူတို့နာမည်က ထွန်းထွန်းတို့ မိသားစုပါ။',
    },
    {
      en: 'They have many boxes. Ko Aung sees them. "Can I help you?" he asks.',
      my: 'သူတို့မှာ အထုပ်အပိုးတွေ အများကြီးရှိတယ်။ ကိုအောင်က သူတို့ကို မြင်တယ်။ "ကျွန်တော် ကူညီရမလား" လို့ သူက မေးတယ်။',
    },
    {
      en: 'He carries the big boxes inside. The new neighbors are very friendly.',
      my: 'သူက အထုပ်ကြီးတွေကို အထဲကို သယ်ပေးတယ်။ အိမ်နီးချင်းအသစ်တွေက အရမ်းဖော်ရွေတယ်။',
    },
    {
      en: 'Later, they drink tea together. Now they are good neighbors.',
      my: 'နောက်တော့ သူတို့ အတူ လက်ဖက်ရည် သောက်ကြတယ်။ အခု သူတို့က အိမ်နီးချင်းကောင်းတွေ ဖြစ်သွားပြီ။',
    },
  ],
},
// key words: football, match, team, score, win, excited
{
  id: 'story-f14-a2-5',
  level: 'A2',
  titleEn: 'The Football Match',
  titleMy: 'ဘောလုံးပွဲ',
  paragraphs: [
    {
      en: 'Today is the big football match. My team plays against the red team.',
      my: 'ဒီနေ့က ဘောလုံးပွဲကြီး နေ့ပါ။ ကျွန်တော်တို့အသင်းက အနီရောင် အသင်းနဲ့ ကစားတယ်။',
    },
    {
      en: 'The stadium is full. Everyone shouts and cheers. I am very excited.',
      my: 'ကွင်းက ပြည့်နေတယ်။ အားလုံး အော်ဟစ် အားပေးကြတယ်။ ကျွန်တော် အရမ်း စိတ်လှုပ်ရှားတယ်။',
    },
    {
      en: 'In the last minute, my friend scores a goal! The score is two to one.',
      my: 'နောက်ဆုံး မိနစ်မှာ ကျွန်တော့်သူငယ်ချင်းက ဂိုးသွင်းတယ်။ ရမှတ်က နှစ်ဂိုးတစ် ဖြစ်သွားတယ်။',
    },
    {
      en: 'We win the match! We run and jump. It is the best day.',
      my: 'ကျွန်တော်တို့ ပွဲကို အနိုင်ရတယ်။ ကျွန်တော်တို့ ပြေးပြီး ခုန်ကြတယ်။ ဒါ အကောင်းဆုံး နေ့ပါပဲ။',
    },
  ],
},
// key words: cook, fish, noodle, soup, hot, delicious
{
  id: 'story-f14-a2-6',
  level: 'A2',
  titleEn: 'Cooking Mohinga',
  titleMy: 'မုန့်ဟင်းခါး ချက်ခြင်း',
  paragraphs: [
    {
      en: 'Sunday is a good day for mohinga. My mother cooks it in the morning.',
      my: 'တနင်္ဂနွေနေ့က မုန့်ဟင်းခါးချက်ဖို့ ကောင်းတဲ့နေ့ပါ။ ကျွန်တော့်အမေက မနက်မှာ ချက်တယ်။',
    },
    {
      en: 'She boils the fish. She adds the noodles. The soup is hot and smells good.',
      my: 'သူမ ငါးကို ပြုတ်တယ်။ သူမ ခေါက်ဆွဲ ထည့်တယ်။ ဟင်းရည်က ပူပြီး အနံ့မွှေးတယ်။',
    },
    {
      en: 'We all sit at the table. My brother eats two bowls. It is so delicious!',
      my: 'ကျွန်တော်တို့ အားလုံး စားပွဲမှာ ထိုင်ကြတယ်။ ကျွန်တော့်အစ်ကိုက နှစ်ပန်းကန် စားတယ်။ အရမ်း အရသာရှိတယ်။',
    },
    {
      en: 'My mother smiles. "Eat more," she says. We are a happy family.',
      my: 'ကျွန်တော့်အမေ ပြုံးတယ်။ "ပိုစားပါ" လို့ သူမ ပြောတယ်။ ကျွန်တော်တို့က ပျော်ရွှင်တဲ့ မိသားစုပါ။',
    },
  ],
},
// key words: boat, lake, fish, row, old, repair
{
  id: 'story-f14-a2-7',
  level: 'A2',
  titleEn: 'The Old Boat',
  titleMy: 'လှေဟောင်း',
  paragraphs: [
    {
      en: 'Grandfather has an old boat. It sits near Inle Lake for many years.',
      my: 'အဘိုးမှာ လှေဟောင်းတစ်စီး ရှိတယ်။ အဲဒါ အင်းလေးကန်နားမှာ နှစ်ပေါင်းများစွာ ရှိနေတယ်။',
    },
    {
      en: 'The boat is broken. "I will repair it," says Ko Min. He works every day.',
      my: 'လှေက ပျက်နေတယ်။ "ကျွန်တော် ပြင်မယ်" လို့ ကိုမင်းက ပြောတယ်။ သူ နေ့တိုင်း အလုပ်လုပ်တယ်။',
    },
    {
      en: 'He cleans the wood. He paints it blue. Now the boat looks new.',
      my: 'သူက သစ်သားကို သန့်ရှင်းတယ်။ အပြာရောင် သုတ်တယ်။ အခု လှေက အသစ်လို ဖြစ်နေတယ်။',
    },
    {
      en: 'They row on the lake. They catch fish. Grandfather is proud of Ko Min.',
      my: 'သူတို့ ကန်ပေါ်မှာ လှော်ခတ်ကြတယ်။ ငါး ဖမ်းကြတယ်။ အဘိုးက ကိုမင်းကို ဂုဏ်ယူတယ်။',
    },
  ],
},
// key words: school, trip, teacher, mountain, walk, tired
{
  id: 'story-f14-a2-8',
  level: 'A2',
  titleEn: 'The School Trip',
  titleMy: 'ကျောင်းခရီးစဉ်',
  paragraphs: [
    {
      en: 'Our school trip is on Friday. We go to a beautiful mountain.',
      my: 'ကျွန်တော်တို့ ကျောင်းခရီးစဉ်က သောကြာနေ့ပါ။ ကျွန်တော်တို့ လှပတဲ့ တောင်တစ်ခုကို သွားကြတယ်။',
    },
    {
      en: 'The teacher counts the students. "Thirty children. All here!" she says.',
      my: 'ဆရာမက ကျောင်းသားတွေကို ရေတွက်တယ်။ "ကလေး သုံးဆယ်။ အားလုံး ရှိတယ်" လို့ သူမ ပြောတယ်။',
    },
    {
      en: 'We walk up the mountain. It is a long walk. We sing songs on the way.',
      my: 'ကျွန်တော်တို့ တောင်ပေါ်ကို လမ်းလျှောက်တက်ကြတယ်။ လမ်းက ရှည်တယ်။ လမ်းမှာ သီချင်းတွေ ဆိုကြတယ်။',
    },
    {
      en: 'At the top, we eat lunch. We are tired, but we are happy.',
      my: 'ထိပ်မှာ ကျွန်တော်တို့ နေ့လည်စာ စားကြတယ်။ ကျွန်တော်တို့ ပင်ပန်းပေမယ့် ပျော်ရွှင်ကြတယ်။',
    },
  ],
},
// key words: bicycle, ride, wheel, fall, practice, strong
{
  id: 'story-f14-a2-9',
  level: 'A2',
  titleEn: 'The Blue Bicycle',
  titleMy: 'စက်ဘီးအပြာ',
  paragraphs: [
    {
      en: 'Thiri gets a blue bicycle for her birthday. It is a wonderful gift.',
      my: 'သီရိက သူမမွေးနေ့အတွက် စက်ဘီးအပြာတစ်စီး ရတယ်။ အဲဒါ အံ့ဩစရာ လက်ဆောင်ပါ။',
    },
    {
      en: 'She tries to ride it. She falls down. "Don\'t give up," says her father.',
      my: 'သူမ စီးဖို့ ကြိုးစားတယ်။ သူမ လဲကျတယ်။ "လက်မလျှော့ပါနဲ့" လို့ သူမအဖေက ပြောတယ်။',
    },
    {
      en: 'Thiri practices every afternoon. She rides slowly, then faster and faster.',
      my: 'သီရိက နေ့တိုင်း ညနေပိုင်းမှာ လေ့ကျင့်တယ်။ သူမ ဖြည်းဖြည်းစီးတယ်၊ ပြီးတော့ ပိုမြန်လာတယ်။',
    },
    {
      en: 'Now she rides to school every day. Her legs are strong. She is proud.',
      my: 'အခု သူမ နေ့တိုင်း ကျောင်းကို စက်ဘီးစီးတယ်။ သူမခြေထောက်တွေက သန်မာတယ်။ သူမ ဂုဏ်ယူတယ်။',
    },
  ],
},
// key words: festival, light, candle, night, celebrate, together
{
  id: 'story-f14-a2-10',
  level: 'A2',
  titleEn: 'The Festival of Lights',
  titleMy: 'မီးထွန်းပွဲတော်',
  paragraphs: [
    {
      en: 'In October, Myanmar celebrates the Festival of Lights. It is called Thadingyut.',
      my: 'အောက်တိုဘာလမှာ မြန်မာနိုင်ငံက မီးထွန်းပွဲတော် ကျင်းပတယ်။ အဲဒါကို သီတင်းကျွတ်လို့ ခေါ်တယ်။',
    },
    {
      en: 'At night, people light candles in front of their houses. The streets are bright.',
      my: 'ညမှာ လူတွေက သူတို့အိမ်ရှေ့မှာ ဖယောင်းတိုင်တွေ ထွန်းကြတယ်။ လမ်းတွေက လင်းထိန်နေတယ်။',
    },
    {
      en: 'Children visit their grandparents. They give them gifts and say thank you.',
      my: 'ကလေးတွေက သူတို့အဘိုးအဘွားတွေကို သွားလည်ကြတယ်။ လက်ဆောင်တွေ ပေးပြီး ကျေးဇူးတင်စကား ပြောကြတယ်။',
    },
    {
      en: 'Families eat together and laugh. The festival is full of light and love.',
      my: 'မိသားစုတွေက အတူ စားသောက်ပြီး ရယ်မောကြတယ်။ ပွဲတော်က အလင်းနဲ့ ချစ်ခြင်းမေတ္တာတွေ ပြည့်နေတယ်။',
    },
  ],
},
// key words: library, book, borrow, read, quiet, learn
{
  id: 'story-f14-a2-11',
  level: 'A2',
  titleEn: 'The Quiet Library',
  titleMy: 'တိတ်ဆိတ်တဲ့ စာကြည့်တိုက်',
  paragraphs: [
    {
      en: 'There is a small library near my house. It is quiet and clean.',
      my: 'ကျွန်တော့်အိမ်နားမှာ စာကြည့်တိုက်အသေးလေး တစ်ခုရှိတယ်။ အဲဒါ တိတ်ဆိတ်ပြီး သန့်ရှင်းတယ်။',
    },
    {
      en: 'The librarian is a kind old woman. She helps me find good books.',
      my: 'စာကြည့်တိုက်မှူးက သဘောကောင်းတဲ့ အဖွားအိုတစ်ယောက်ပါ။ သူမ ကောင်းတဲ့ စာအုပ်တွေ ရှာဖို့ ကျွန်တော့်ကို ကူညီတယ်။',
    },
    {
      en: 'I borrow two books every week. I read them at home in the evening.',
      my: 'ကျွန်တော် အပတ်တိုင်း စာအုပ်နှစ်အုပ် ငှားတယ်။ ညနေမှာ အိမ်မှာ ဖတ်တယ်။',
    },
    {
      en: 'Reading is fun. I learn new words and new ideas every day.',
      my: 'စာဖတ်တာ ပျော်စရာကောင်းတယ်။ ကျွန်တော် နေ့တိုင်း စကားလုံးအသစ်တွေနဲ့ အတွေးအခေါ်အသစ်တွေ သင်ယူတယ်။',
    },
  ],
},
// key words: sick, medicine, doctor, rest, soup, care
{
  id: 'story-f14-a2-12',
  level: 'A2',
  titleEn: 'A Day in Bed',
  titleMy: 'ကုတင်ပေါ်မှာ တစ်နေ့',
  paragraphs: [
    {
      en: 'This morning I feel sick. My head hurts, and I have a fever.',
      my: 'ဒီမနက် ကျွန်တော် နေမကောင်းဘူး။ ခေါင်းကိုက်ပြီး ဖျားနေတယ်။',
    },
    {
      en: 'My mother calls the doctor. The doctor gives me medicine. "Rest," he says.',
      my: 'ကျွန်တော့်အမေက ဆရာဝန်ကို ခေါ်တယ်။ ဆရာဝန်က ကျွန်တော့်ကို ဆေးပေးတယ်။ "အနားယူပါ" လို့ သူက ပြောတယ်။',
    },
    {
      en: 'I stay in bed all day. My sister brings me hot soup. It tastes good.',
      my: 'ကျွန်တော် တစ်နေ့လုံး ကုတင်ပေါ်မှာ နေတယ်။ ကျွန်တော့်ညီမက ဟင်းချိုပူပူ ယူလာပေးတယ်။ အရသာကောင်းတယ်။',
    },
    {
      en: 'My family takes care of me. Tomorrow I will feel better.',
      my: 'ကျွန်တော့်မိသားစုက ကျွန်တော့်ကို ပြုစုတယ်။ မနက်ဖြန် ကျွန်တော် သက်သာလာမယ်။',
    },
  ],
},
// key words: bicycle, steal, police, suspect, honest, reward
{
  id: 'story-f14-b1-1',
  level: 'B1',
  titleEn: 'The Stolen Bicycle',
  titleMy: 'ခိုးယူခံရတဲ့ စက်ဘီး',
  paragraphs: [
    {
      en: 'When Zaw woke up on Saturday, his red bicycle was gone. It was not in the yard, and it was not on the street.',
      my: 'စနေနေ့ ဇော်က နိုးလာတဲ့အခါ သူ့စက်ဘီးအနီရောင် ပျောက်နေပြီ။ ခြံထဲမှာလည်း မရှိ၊ လမ်းပေါ်မှာလည်း မရှိဘူး။',
    },
    {
      en: 'He asked his neighbors, because someone must have seen it. However, nobody knew anything.',
      my: 'သူမ အိမ်နီးချင်းတွေကို မေးတယ်၊ ဘာလို့လဲဆိုတော့ တစ်ယောက်ယောက်က မြင်ခဲ့ရမှာပဲ။ ဒါပေမယ့် ဘယ်သူမှ ဘာမှ မသိဘူး။',
    },
    {
      en: 'While he was walking home from the market, he saw a boy riding a red bicycle. It looked exactly like his!',
      my: 'သူဈေးကနေ အိမ်ပြန်လမ်းလျှောက်လာတုန်း စက်ဘီးအနီရောင် စီးနေတဲ့ ကောင်လေးတစ်ယောက်ကို မြင်တယ်။ သူ့စက်ဘီးနဲ့ အတိအကျ တူနေတယ်။',
    },
    {
      en: 'Zaw ran after him and shouted. The boy stopped, because he was frightened. Then Zaw saw the small scratch on the wheel — it was really his bicycle.',
      my: 'ဇော်က သူ့နောက်ကို ပြေးလိုက်ပြီး အော်တယ်။ ကောင်လေးက ရပ်သွားတယ်၊ ဘာလို့လဲဆိုတော့ သူ ကြောက်နေလို့ပါ။ ပြီးတော့ ဇော်က ဘီးပေါ်က အစင်းအရာအသေးလေးကို မြင်တယ် — ဒါ တကယ့်သူ့စက်ဘီးပါပဲ။',
    },
    {
      en: 'The boy cried and said he was sorry. Although Zaw was angry, he forgave him. After that day, the boy became his friend, and they rode their bicycles together every evening.',
      my: 'ကောင်လေးက ငိုပြီး တောင်းပန်တယ်။ ဇော် ဒေါသထွက်နေပေမယ့် သူ့ကို ခွင့်လွှတ်လိုက်တယ်။ အဲဒီနေ့နောက်ပိုင်း ကောင်လေးက သူ့သူငယ်ချင်း ဖြစ်လာပြီး သူတို့ ညနေတိုင်း စက်ဘီးအတူ စီးကြတယ်။',
    },
  ],
},
// key words: letter, abroad, family, miss, news, reply
{
  id: 'story-f14-b1-2',
  level: 'B1',
  titleEn: 'The Letter from Abroad',
  titleMy: 'နိုင်ငံရပ်ခြားက စာ',
  paragraphs: [
    {
      en: 'Daw Hla had not heard from her son for two years. He worked in a factory far away, and letters took a long time.',
      my: 'ဒေါ်လှဟာ သူမသားဆီက နှစ်နှစ်ကြာ သတင်းမရဘူး။ သူက ဝေးတဲ့နေရာက စက်ရုံတစ်ခုမှာ အလုပ်လုပ်တယ်၊ စာတွေက အချိန်ကြာတယ်။',
    },
    {
      en: 'One morning, the postman brought a thick envelope. When she saw her son\'s handwriting, her hands started to shake.',
      my: 'တစ်မနက် စာပို့သမားက စာအိတ်ထူထူတစ်ခု ယူလာတယ်။ သူမသားရဲ့ လက်ရေးကို မြင်လိုက်တဲ့အခါ သူမလက်တွေ တုန်လာတယ်။',
    },
    {
      en: 'In the letter, her son wrote that he was healthy and that he missed home. He also sent money, because he wanted to repair the old house.',
      my: 'စာထဲမှာ သူမသားက သူ ကျန်းမာကြောင်း၊ အိမ်ကို လွမ်းကြောင်း ရေးထားတယ်။ အိမ်ဟောင်းကို ပြင်ချင်လို့ ပိုက်ဆံလည်း ပို့လိုက်တယ်။',
    },
    {
      en: 'Daw Hla read the letter three times. Although she tried not to cry, tears ran down her face. They were happy tears.',
      my: 'ဒေါ်လှက စာကို သုံးကြိမ် ဖတ်တယ်။ မငိုဖို့ ကြိုးစားပေမယ့် မျက်ရည်တွေ ကျလာတယ်။ အဲဒါတွေက ပျော်ရွှင်တဲ့ မျက်ရည်တွေပါ။',
    },
    {
      en: 'That evening, she sat down and wrote a long reply. She told him about the village, the neighbors, and the mango tree. "Come home soon," she wrote at the end.',
      my: 'အဲဒီညနေမှာ သူမ ထိုင်ပြီး အဖြေစာရှည်ရှည် ရေးတယ်။ ရွာအကြောင်း၊ အိမ်နီးချင်းတွေအကြောင်း၊ သရက်ပင်အကြောင်း ပြောပြတယ်။ အဆုံးမှာ "အမြန် အိမ်ပြန်လာပါ" လို့ ရေးတယ်။',
    },
  ],
},
// key words: hotel, guest, job, uniform, serve, polite
{
  id: 'story-f14-b1-3',
  level: 'B1',
  titleEn: 'A Job at the Hotel',
  titleMy: 'ဟိုတယ်မှာ အလုပ်',
  paragraphs: [
    {
      en: 'After school, Thida needed a job. Her family had little money, so she looked for work in the city.',
      my: 'ကျောင်းပြီးနောက် သီတာက အလုပ်တစ်ခု လိုအပ်တယ်။ သူမမိသားစုမှာ ပိုက်ဆံနည်းလို့ မြို့မှာ အလုပ်ရှာတယ်။',
    },
    {
      en: 'A new hotel near the river was hiring waiters. Thida applied, although she had no experience. The manager liked her smile and gave her a chance.',
      my: 'မြစ်နားက ဟိုတယ်အသစ်တစ်ခု စားပွဲထိုးတွေ ခေါ်နေတယ်။ သီတာက အတွေ့အကြုံမရှိပေမယ့် လျှောက်ထားတယ်။ မန်နေဂျာက သူမအပြုံးကို သဘောကျပြီး အခွင့်အရေးပေးတယ်။',
    },
    {
      en: 'On her first day, she wore the blue uniform and felt nervous. However, an older waiter taught her everything: how to serve food and how to talk politely to guests.',
      my: 'ပထမနေ့မှာ သူမ အပြာရောင် ယူနီဖောင်းဝတ်ပြီး စိုးရိမ်နေတယ်။ ဒါပေမယ့် စားပွဲထိုးအကြီးတစ်ယောက်က အရာအားလုံး သင်ပေးတယ် — အစားအသောက် ဘယ်လို ချပေးရမယ်၊ ဧည့်သည်တွေနဲ့ ယဉ်ယဉ်ကျေးကျေး ဘယ်လို ပြောရမယ်ဆိုတာ။',
    },
    {
      en: 'After one month, Thida was excellent at her job. Guests often asked for her, because she remembered their names and their favorite dishes.',
      my: 'တစ်လအကြာမှာ သီတာက သူမအလုပ်မှာ ထူးချွန်လာတယ်။ ဧည့်သည်တွေက သူမကို မကြာခဏ တောင်းဆိုကြတယ်၊ ဘာလို့လဲဆိုတော့ သူမက သူတို့အမည်တွေနဲ့ သူတို့ကြိုက်တဲ့ ဟင်းလျာတွေကို မှတ်မိနေလို့ပါ။',
    },
    {
      en: 'When she received her first salary, she bought medicine for her grandmother. "Work hard and stay kind," her grandmother said, "and life will reward you."',
      my: 'သူမ ပထမဆုံး လစာ ရတဲ့အခါ သူမအဘွားအတွက် ဆေးဝယ်ပေးတယ်။ "ကြိုးစားအလုပ်လုပ်ပြီး သဘောကောင်းကောင်းနေပါ၊ ဘဝက မင်းကို ဆုချမယ်" လို့ သူမအဘွားက ပြောတယ်။',
    },
  ],
},
// key words: flood, rain, boat, rescue, village, brave
{
  id: 'story-f14-b1-4',
  level: 'B1',
  titleEn: 'The Flood Season',
  titleMy: 'ရေကြီးတဲ့ရာသီ',
  paragraphs: [
    {
      en: 'Every year, the heavy rain comes in July. The river rises, and the low fields disappear under water.',
      my: 'နှစ်တိုင်း ဇူလိုင်လမှာ မိုးသည်းထန်စွာ ရွာတယ်။ မြစ်ရေ တက်လာပြီး နိမ့်တဲ့ လယ်ကွင်းတွေ ရေအောက်မှာ ပျောက်သွားတယ်။',
    },
    {
      en: 'This year was worse than before. The water entered the village, and families had to leave their houses quickly.',
      my: 'ဒီနှစ်က အရင်နှစ်တွေထက် ပိုဆိုးတယ်။ ရေက ရွာထဲကို ဝင်လာပြီး မိသားစုတွေက သူတို့အိမ်တွေကို အမြန် စွန့်ခွာရတယ်။',
    },
    {
      en: 'U Ba owned the only big boat. While the rain was falling, he rowed from house to house. He carried children, old people, and even chickens to the high school on the hill.',
      my: 'ဦးဘမှာ လှေကြီးတစ်စီးပဲ ရှိတယ်။ မိုးရွာနေတုန်း သူက အိမ်တစ်အိမ်ကနေ တစ်အိမ်ကို လှော်ခတ်တယ်။ ကလေးတွေ၊ သက်ကြီးရွယ်အိုတွေနဲ့ ကြက်တွေကိုပါ တောင်ပေါ်က အထက်တန်းကျောင်းကို သယ်ပေးတယ်။',
    },
    {
      en: 'After three days, the rain stopped. Although many houses were damaged, nobody was hurt, because U Ba had rescued everyone.',
      my: 'သုံးရက်အကြာမှာ မိုးရပ်သွားတယ်။ အိမ်တော်တော်များများ ပျက်စီးပေမယ့် ဘယ်သူမှ မထိခိုက်ဘူး၊ ဘာလို့လဲဆိုတော့ ဦးဘက အားလုံးကို ကယ်တင်ခဲ့လို့ပါ။',
    },
    {
      en: 'The villagers gave him a small medal. "You are our hero," they said. U Ba just smiled and repaired his boat for the next rainy season.',
      my: 'ရွာသားတွေက သူ့ကို ဆုတံဆိပ်အသေးလေး ပေးတယ်။ "ရှင်က ကျွန်တော်တို့ရဲ့ သူရဲကောင်းပါ" လို့ သူတို့ ပြောတယ်။ ဦးဘက ပြုံးပြီး နောက် မိုးရာသီအတွက် သူ့လှေကို ပြင်တယ်။',
    },
  ],
},
// key words: mango, tree, childhood, memory, grandmother, sweet
{
  id: 'story-f14-b1-5',
  level: 'B1',
  titleEn: 'The Mango Tree',
  titleMy: 'သရက်ပင်',
  paragraphs: [
    {
      en: 'Behind our old house stood a tall mango tree. My grandmother planted it when my mother was a little girl.',
      my: 'ကျွန်တော်တို့ အိမ်ဟောင်းနောက်မှာ သရက်ပင်မြင့်မြင့် တစ်ပင် ရှိတယ်။ ကျွန်တော့်အမေ ကလေးဘဝတုန်းက ကျွန်တော့်အဘွားက စိုက်ခဲ့တာပါ။',
    },
    {
      en: 'Every summer, the tree was full of sweet mangoes. My cousins and I climbed up, although our parents told us not to.',
      my: 'နွေရာသီတိုင်း အပင်က ချိုတဲ့ သရက်သီးတွေ ပြည့်နေတယ်။ ကျွန်တော့်ဝမ်းကွဲတွေနဲ့ ကျွန်တော်က တက်ကြတယ်၊ မိဘတွေက မတက်ဖို့ ပြောပေမယ့်။',
    },
    {
      en: 'My grandmother always laughed when she saw us. "Eat as many as you want," she said, "but leave some for the neighbors."',
      my: 'ကျွန်တော့်အဘွားက ကျွန်တော်တို့ကို မြင်တိုင်း ရယ်တယ်။ "စားချင်သလောက် စားပါ၊ ဒါပေမယ့် အိမ်နီးချင်းတွေအတွက် ချန်ထားပါ" လို့ သူမ ပြောတယ်။',
    },
    {
      en: 'Years later, we sold the old house. I felt sad, because I thought I would never see the tree again.',
      my: 'နှစ်တွေကြာတော့ ကျွန်တော်တို့ အိမ်ဟောင်းကို ရောင်းလိုက်တယ်။ ကျွန်တော် ဝမ်းနည်းတယ်၊ ဘာလို့လဲဆိုတော့ အပင်ကို နောက်တစ်ခါ ဘယ်တော့မှ မြင်ရတော့မှာ မဟုတ်ဘူးလို့ ထင်ခဲ့လို့ပါ။',
    },
    {
      en: 'Last month I visited the new owners. The mango tree is still there, taller than ever. When I touched its leaves, all my childhood memories came back.',
      my: 'ပြီးခဲ့တဲ့လက ကျွန်တော် ပိုင်ရှင်အသစ်တွေဆီ သွားလည်တယ်။ သရက်ပင်က အရင်ကထက် ပိုမြင့်ပြီး ရှိနေတုန်းပဲ။ သူ့အရွက်တွေကို ထိလိုက်တဲ့အခါ ကျွန်တော့်ကလေးဘဝ အမှတ်တရတွေ အားလုံး ပြန်လာတယ်။',
    },
  ],
},
// key words: night, market, stall, snack, bargain, crowd
{
  id: 'story-f14-b1-6',
  level: 'B1',
  titleEn: 'The Night Market',
  titleMy: 'ညဈေး',
  paragraphs: [
    {
      en: 'When the sun goes down, the night market wakes up. Hundreds of small lamps light up the long street.',
      my: 'နေ ဝင်သွားတဲ့အခါ ညဈေးက နိုးထလာတယ်။ မီးလုံးအသေးလေး ရာချီက ရှည်လျားတဲ့ လမ်းကို လင်းထိန်စေတယ်။',
    },
    {
      en: 'Stalls sell everything: clothes, toys, fruit, and hot snacks. The smell of grilled corn fills the air.',
      my: 'ဆိုင်ခန်းတွေက အရာအားလုံး ရောင်းတယ် — အဝတ်အစား၊ အရုပ်၊ သစ်သီးနဲ့ ပူပူနွေးနွေး မုန့်တွေ။ ပြောင်းဖူးကင် အနံ့က လေထဲမှာ ပြည့်နေတယ်။',
    },
    {
      en: 'My friend and I walked through the crowd. Although it was noisy, we loved the energy. We tried fried bananas and sweet tea.',
      my: 'ကျွန်တော့်သူငယ်ချင်းနဲ့ ကျွန်တော်က လူအုပ်ကြားမှာ လမ်းလျှောက်ကြတယ်။ ဆူညံနေပေမယ့် အဲဒီတက်ကြွမှုကို ကျွန်တော်တို့ ကြိုက်တယ်။ ငှက်ပျောသီးကြော်နဲ့ လက်ဖက်ရည်ချို သောက်ကြည့်ကြတယ်။',
    },
    {
      en: 'At one stall, I found a beautiful shirt. The seller asked for a high price, so I bargained politely. Finally, we agreed on a fair price.',
      my: 'ဆိုင်တစ်ဆိုင်မှာ လှပတဲ့ အင်္ကျီတစ်ထည် တွေ့တယ်။ ရောင်းသူက ဈေးများများတောင်းလို့ ကျွန်တော် ယဉ်ယဉ်ကျေးကျေး ဈေးဆစ်တယ်။ နောက်ဆုံး သင့်တင့်တဲ့ ဈေးနဲ့ သဘောတူညီမှုရတယ်။',
    },
    {
      en: 'We left the market at midnight, tired but happy. The night market is my favorite place, because it feels like the whole city is celebrating.',
      my: 'ကျွန်တော်တို့ သန်းခေါင်ယံမှာ ဈေးက ထွက်လာတယ်၊ ပင်ပန်းပေမယ့် ပျော်ရွှင်တယ်။ ညဈေးက ကျွန်တော့်အကြိုက်ဆုံး နေရာပါ၊ ဘာလို့လဲဆိုတော့ မြို့တစ်ခုလုံး ပွဲတော်ကျင်းပနေသလို ခံစားရလို့ပါ။',
    },
  ],
},
// key words: elephant, forest, banana, kind, wild, protect
{
  id: 'story-f14-b1-7',
  level: 'B1',
  titleEn: 'The Elephant in the Forest',
  titleMy: 'တောထဲက ဆင်',
  paragraphs: [
    {
      en: 'While I was walking in the forest with my uncle, we heard a strange sound. Something big was moving between the trees.',
      my: 'ကျွန်တော်ဦးလေးနဲ့ တောထဲ လမ်းလျှောက်နေတုန်း ထူးဆန်းတဲ့ အသံတစ်ခု ကြားတယ်။ ကြီးမားတဲ့ အရာတစ်ခုက သစ်ပင်တွေကြားမှာ လှုပ်ရှားနေတယ်။',
    },
    {
      en: 'Suddenly, a young elephant appeared. It was alone, and it looked hungry. My uncle told me to stay calm and quiet.',
      my: 'ရုတ်တရက် ဆင်ငယ်တစ်ကောင် ပေါ်လာတယ်။ အဲဒါ တစ်ကောင်တည်း ရှိနေပြီး ဗိုက်ဆာနေပုံရတယ်။ ကျွန်တော့်ဦးလေးက ကျွန်တော့်ကို တည်တည်ငြိမ်ငြိမ် တိတ်တိတ်နေဖို့ ပြောတယ်။',
    },
    {
      en: 'I slowly took the bananas from my bag and placed them on the ground. The elephant came closer, because it could smell the fruit.',
      my: 'ကျွန်တော် ကျွန်တော့်အိတ်ထဲက ငှက်ပျောသီးတွေကို ဖြည်းဖြည်း ထုတ်ပြီး မြေပေါ်မှာ ချထားတယ်။ ဆင်က အသီးအနံ့ ရလို့ ပိုနီးလာတယ်။',
    },
    {
      en: 'It ate the bananas quickly and then looked at me with gentle eyes. Although it was wild, it did not seem dangerous at all.',
      my: 'အဲဒါ ငှက်ပျောသီးတွေကို အမြန် စားပြီး နူးညံ့တဲ့ မျက်လုံးတွေနဲ့ ကျွန်တော့်ကို ကြည့်တယ်။ တောရိုင်းတိရစ္ဆာန် ဖြစ်ပေမယ့် လုံးဝ အန္တရာယ်မရှိပုံရတယ်။',
    },
    {
      en: 'After a few minutes, the elephant walked back into the forest. I will never forget that morning, and I always tell people to protect wild animals.',
      my: 'မိနစ်အနည်းငယ်အကြာမှာ ဆင်က တောထဲကို ပြန်သွားတယ်။ အဲဒီမနက်ကို ကျွန်တော် ဘယ်တော့မှ မေ့မှာမဟုတ်ဘူး၊ တောရိုင်းတိရစ္ဆာန်တွေကို ကာကွယ်ဖို့ လူတွေကို အမြဲ ပြောတယ်။',
    },
  ],
},
// key words: promise, secret, argue, forgive, trust, friendship
{
  id: 'story-f14-b1-8',
  level: 'B1',
  titleEn: 'The Broken Promise',
  titleMy: 'ကျိုးပျက်သွားတဲ့ ကတိ',
  paragraphs: [
    {
      en: 'Su and I had been best friends since childhood. We promised to tell each other everything, and we never kept secrets.',
      my: 'စုနဲ့ ကျွန်တော်က ကလေးဘဝတည်းက အကောင်းဆုံး သူငယ်ချင်းတွေပါ။ တစ်ယောက်ကို တစ်ယောက် အရာအားလုံး ပြောမယ်လို့ ကတိပေးထားပြီး လျှို့ဝှက်ချက် ဘယ်တော့မှ မထားဘူး။',
    },
    {
      en: 'Last month, I told Su about my plan to study abroad. She promised not to tell anyone. However, two days later, the whole class knew.',
      my: 'ပြီးခဲ့တဲ့လက ကျွန်တော် နိုင်ငံခြားမှာ ပညာသင်မယ့် အစီအစဉ်အကြောင်း စုကို ပြောပြတယ်။ သူမ ဘယ်သူ့ကိုမှ မပြောဖို့ ကတိပေးတယ်။ ဒါပေမယ့် နှစ်ရက်အကြာမှာ အတန်းတစ်ခုလုံး သိသွားတယ်။',
    },
    {
      en: 'I felt hurt and angry. When I asked her about it, she first denied everything. Then she started to cry.',
      my: 'ကျွန်တော် နာကျင်ပြီး ဒေါသထွက်တယ်။ သူမကို မေးတဲ့အခါ အစမှာ အရာအားလုံး ငြင်းတယ်။ ပြီးတော့ သူမ ငိုလာတယ်။',
    },
    {
      en: 'Su explained that her mother had asked her many questions, and she could not lie. Although I was still upset, I understood her situation.',
      my: 'စုက သူမအမေက မေးခွန်းတွေ အများကြီး မေးလို့ လိမ်လို့ မရဘူးလို့ ရှင်းပြတယ်။ ကျွန်တော် စိတ်မကောင်းဖြစ်နေပေမယ့် သူမ အခြေအနေကို နားလည်တယ်။',
    },
    {
      en: 'We talked for a long time that evening. In the end, I forgave her, because real friendship is stronger than one mistake. Our trust grew even deeper after that.',
      my: 'အဲဒီညနေမှာ ကျွန်တော်တို့ အချိန်ကြာကြာ စကားပြောကြတယ်။ အဆုံးမှာ ကျွန်တော် သူမကို ခွင့်လွှတ်တယ်၊ ဘာလို့လဲဆိုတော့ စစ်မှန်တဲ့ သူငယ်ချင်းသံယောဇဉ်က အမှားတစ်ခုထက် ပိုခိုင်မာလို့ပါ။ အဲဒီနောက်ပိုင်း ကျွန်တော်တို့ရဲ့ ယုံကြည်မှုက ပိုနက်ရှိုင်းလာတယ်။',
    },
  ],
},
// key words: salary, save, mother, gift, proud, responsible
{
  id: 'story-f14-b1-9',
  level: 'B1',
  titleEn: 'The First Salary',
  titleMy: 'ပထမဆုံး လစာ',
  paragraphs: [
    {
      en: 'When Min received his first salary, he could not stop smiling. It was not a lot of money, but he had earned it himself.',
      my: 'မင်းက ပထမဆုံး လစာ ရတဲ့အခါ ပြုံးတာ ရပ်လို့ မရဘူး။ ပိုက်ဆံ အများကြီး မဟုတ်ပေမယ့် သူကိုယ်တိုင် ရှာထားတာပါ။',
    },
    {
      en: 'He divided the money carefully. Half went to his mother, because she had worked so hard for the family. The rest he saved for the future.',
      my: 'သူ ပိုက်ဆံကို ဂရုတစိုက် ခွဲတယ်။ တစ်ဝက်ကို သူ့အမေကို ပေးတယ်၊ ဘာလို့လဲဆိုတော့ သူမက မိသားစုအတွက် အရမ်း ကြိုးစားခဲ့လို့ပါ။ ကျန်တာကို အနာဂတ်အတွက် စုတယ်။',
    },
    {
      en: 'His mother tried to refuse the money. "Keep it for yourself," she said. However, Min insisted, and finally she accepted it with tears in her eyes.',
      my: 'သူ့အမေက ပိုက်ဆံကို ငြင်းဖို့ ကြိုးစားတယ်။ "မင်းအတွက် ထားပါ" လို့ သူမ ပြောတယ်။ ဒါပေမယ့် မင်းက အတင်းပေးပြီး နောက်ဆုံး သူမက မျက်ရည်တွေနဲ့ လက်ခံတယ်။',
    },
    {
      en: 'With a small part of his savings, he bought a new shirt for his younger brother. The boy ran around the house, shouting with joy.',
      my: 'သူ့စုဆောင်းငွေရဲ့ အနည်းငယ်နဲ့ သူ့ညီလေးအတွက် အင်္ကျီအသစ် ဝယ်ပေးတယ်။ ကောင်လေးက အိမ်ထဲမှာ ပျော်ရွှင်စွာ အော်ပြီး ပြေးလွှားတယ်။',
    },
    {
      en: 'That night, Min felt truly grown up. He understood that earning money is not just about spending — it is about taking care of the people you love.',
      my: 'အဲဒီည မင်းက တကယ့် လူကြီးတစ်ယောက်လို ခံစားရတယ်။ ပိုက်ဆံရှာတာက သုံးဖို့အတွက်ပဲ မဟုတ်ဘဲ — ချစ်တဲ့သူတွေကို ဂရုစိုက်ဖို့အတွက်ဆိုတာ သူ နားလည်တယ်။',
    },
  ],
},
// key words: voice, midnight, mystery, courage, discover, explain
{
  id: 'story-f14-b1-10',
  level: 'B1',
  titleEn: 'The Mysterious Voice',
  titleMy: 'ထူးဆန်းတဲ့ အသံ',
  paragraphs: [
    {
      en: 'Every night at midnight, Nandar heard a strange voice in her new apartment. It sounded like someone whispering her name.',
      my: 'ညတိုင်း သန်းခေါင်ယံမှာ နန္ဒာက သူမ တိုက်ခန်းအသစ်မှာ ထူးဆန်းတဲ့ အသံတစ်ခု ကြားတယ်။ တစ်ယောက်ယောက်က သူမနာမည်ကို တိုးတိုးလေး ခေါ်နေသလို ဖြစ်တယ်။',
    },
    {
      en: 'At first, she was too frightened to sleep. She asked her neighbors about it, but they only laughed. "It is just the wind," they said.',
      my: 'အစမှာ သူမ အိပ်ဖို့ အရမ်း ကြောက်တယ်။ အိမ်နီးချင်းတွေကို မေးပေမယ့် သူတို့ ရယ်ကြတယ်။ "လေတိုက်တာပါ" လို့ သူတို့ ပြောတယ်။',
    },
    {
      en: 'One night, Nandar decided to find the truth. She stayed awake and waited. When the clock struck twelve, she heard the voice again — it came from the wall.',
      my: 'တစ်ည နန္ဒာက အမှန်တရားကို ရှာဖို့ ဆုံးဖြတ်တယ်။ သူမ နိုးနေပြီး စောင့်တယ်။ နာရီ ဆယ့်နှစ်ချက် ထိုးတဲ့အခါ အသံကို ထပ်ကြားတယ် — နံရံကနေ လာနေတာပါ။',
    },
    {
      en: 'She knocked on the wall and listened carefully. Then she understood: the voice was her neighbor\'s television! The old man next door watched movies very late, and the sound traveled through the thin wall.',
      my: 'သူမ နံရံကို ခေါက်ပြီး ဂရုတစိုက် နားထောင်တယ်။ ပြီးတော့ သူမ နားလည်သွားတယ် — အသံက သူမ အိမ်နီးချင်းရဲ့ တီဗွီသံပါ။ ဘေးအိမ်က အဘိုးအိုက ညဉ့်နက်တဲ့အထိ ရုပ်ရှင်ကြည့်တယ်၊ အသံက ပါးလွှာတဲ့ နံရံကို ဖြတ်ပြီး လာနေတာပါ။',
    },
    {
      en: 'Nandar laughed at herself. Although the mystery was simple, she felt proud, because she had faced her fear instead of running away. The next day, she brought the old man some tea and asked him to lower the volume.',
      my: 'နန္ဒာက သူ့ကိုယ်သူ ရယ်တယ်။ လျှို့ဝှက်ချက်က ရိုးရှင်းပေမယ့် သူမ ဂုဏ်ယူတယ်၊ ဘာလို့လဲဆိုတော့ သူမ ကြောက်ရွံ့မှုကို ရင်ဆိုင်ခဲ့လို့ပါ၊ ထွက်ပြေးမသွားဘူး။ နောက်နေ့ သူမ အဘိုးအိုကို လက်ဖက်ရည် ယူသွားပေးပြီး အသံတိုးဖို့ တောင်းဆိုတယ်။',
    },
  ],
},
// key words: marathon, run, train, finish, exhausted, medal
{
  id: 'story-f14-b1-11',
  level: 'B1',
  titleEn: 'The Marathon',
  titleMy: 'မာရသွန်ပြိုင်ပွဲ',
  paragraphs: [
    {
      en: 'Aye Chan had never run more than five kilometers. When his friends invited him to join the city marathon, he almost said no.',
      my: 'အေးချမ်းက ငါးကီလိုမီတာထက် ပိုပြီး ဘယ်တော့မှ မပြေးဖူးဘူး။ သူ့သူငယ်ချင်းတွေက မြို့မာရသွန်ပြိုင်ပွဲမှာ ပါဖို့ ဖိတ်တဲ့အခါ သူ ငြင်းလုနီးပါး ဖြစ်တယ်။',
    },
    {
      en: 'However, he decided to try. For three months, he trained every morning. He ran in the rain, in the heat, and even when his legs hurt.',
      my: 'ဒါပေမယ့် သူ ကြိုးစားဖို့ ဆုံးဖြတ်တယ်။ သုံးလတာ မနက်တိုင်း လေ့ကျင့်တယ်။ မိုးရွာရွာ၊ နေပူပူ၊ ခြေထောက်တွေ နာနာ သူ ပြေးတယ်။',
    },
    {
      en: 'On race day, thousands of people stood at the starting line. Aye Chan felt nervous, but he remembered all his training.',
      my: 'ပြိုင်ပွဲနေ့မှာ လူထောင်ချီက စတင်မျဉ်းမှာ ရပ်နေတယ်။ အေးချမ်း စိုးရိမ်နေပေမယ့် သူ့လေ့ကျင့်မှုအားလုံးကို သတိရတယ်။',
    },
    {
      en: 'After twenty kilometers, he wanted to stop. His body was exhausted. Then he heard his friends shouting his name, so he kept running.',
      my: 'ကီလိုမီတာ နှစ်ဆယ်အကြာမှာ သူ ရပ်ချင်လာတယ်။ သူ့ခန္ဓာကိုယ်က ပင်ပန်းနွမ်းနယ်နေပြီ။ ပြီးတော့ သူ့သူငယ်ချင်းတွေက သူ့နာမည်ကို အော်နေတာ ကြားတယ်၊ ဒါကြောင့် ဆက်ပြေးတယ်။',
    },
    {
      en: 'When he finally crossed the finish line, he cried with happiness. He did not win the race, but he won something bigger — he proved to himself that he could do it.',
      my: 'နောက်ဆုံး ပန်းတိုင်မျဉ်းကို ဖြတ်တဲ့အခါ သူ ပျော်ရွှင်စွာ ငိုတယ်။ ပြိုင်ပွဲကို အနိုင်မရပေမယ့် ပိုကြီးတဲ့ အရာကို အနိုင်ရတယ် — သူ လုပ်နိုင်တယ်ဆိုတာ သူ့ကိုယ်သူ သက်သေပြလိုက်တယ်။',
    },
  ],
},
// key words: photograph, memory, grandmother, young, smile, album
{
  id: 'story-f14-b1-12',
  level: 'B1',
  titleEn: 'The Old Photograph',
  titleMy: 'ဓာတ်ပုံဟောင်း',
  paragraphs: [
    {
      en: 'While cleaning the attic, Thuzar found a dusty box. Inside, there was an old photograph of a young woman with a bright smile.',
      my: 'သူဇာက အိမ်ခေါင်မိုးခန်းကို သန့်ရှင်းနေတုန်း ဖုန်တက်နေတဲ့ အထုပ်တစ်ခု တွေ့တယ်။ အထဲမှာ အပြုံးလင်းလက်နေတဲ့ မိန်းမငယ်တစ်ယောက်ရဲ့ ဓာတ်ပုံဟောင်း တစ်ပုံ ရှိတယ်။',
    },
    {
      en: 'She showed it to her mother. "That is your grandmother," her mother said. "She was only twenty years old in this picture."',
      my: 'သူမ သူ့အမေကို ပြတယ်။ "အဲဒါ မင်းအဘွားပဲ" လို့ သူ့အမေက ပြောတယ်။ "ဒီဓာတ်ပုံထဲမှာ သူ အသက် နှစ်ဆယ်ပဲ ရှိသေးတယ်။"',
    },
    {
      en: 'Thuzar looked at the photograph for a long time. Her grandmother had been a teacher, although Thuzar had only known her as an old woman who baked delicious cakes.',
      my: 'သူဇာက ဓာတ်ပုံကို အချိန်ကြာကြာ ကြည့်တယ်။ သူမအဘွားက ဆရာမတစ်ယောက် ဖြစ်ခဲ့တယ်၊ သူဇာက အရသာရှိတဲ့ ကိတ်မုန့်တွေ ဖုတ်တဲ့ အဖွားအိုအဖြစ်ပဲ သိခဲ့ပေမယ့်။',
    },
    {
      en: 'Her mother told stories about those days. The young woman in the picture had traveled, studied hard, and helped many poor children learn to read.',
      my: 'သူ့အမေက အဲဒီနေ့တွေအကြောင်း ပုံပြင်တွေ ပြောပြတယ်။ ဓာတ်ပုံထဲက မိန်းမငယ်က ခရီးတွေသွားခဲ့တယ်၊ ကြိုးစားပညာသင်ခဲ့တယ်၊ ဆင်းရဲတဲ့ ကလေးတော်တော်များများကို စာဖတ်တတ်ဖို့ ကူညီခဲ့တယ်။',
    },
    {
      en: 'That evening, Thuzar put the photograph in a new frame. Now it hangs in the living room, because she wants to remember that her grandmother was once young, brave, and full of dreams — just like her.',
      my: 'အဲဒီည သူဇာက ဓာတ်ပုံကို ဘောင်အသစ်ထဲ ထည့်တယ်။ အခု ဧည့်ခန်းမှာ ချိတ်ထားတယ်၊ ဘာလို့လဲဆိုတော့ သူမအဘွားက တစ်ချိန်က ငယ်ရွယ်ပြီး ရဲရင့်ပြီး အိပ်မက်တွေ ပြည့်နေခဲ့တယ်ဆိုတာ သတိရချင်လို့ပါ — သူမလိုပဲ။',
    },
  ],
},
// key words: train, journey, stranger, ticket, destination, adventure
{
  id: 'story-f14-b2-1',
  level: 'B2',
  titleEn: 'The Last Train to Mandalay',
  titleMy: 'မန္တလေးကို နောက်ဆုံး ရထား',
  paragraphs: [
    {
      en: 'The station clock showed 11:47 PM when Htet finally arrived, breathless and carrying a bag that was far too heavy for one night\'s journey.',
      my: 'ထွဋ် အသက်ရှူမဝဖြစ်ပြီး တစ်ညတာ ခရီးအတွက် အရမ်းလေးလံတဲ့ အိတ်ကို သယ်ကာ နောက်ဆုံး ရောက်လာတဲ့အခါ ဘူတာနာရီက ည ၁၁:၄၇ ကို ပြနေတယ်။',
    },
    {
      en: 'The last train to Mandalay was already waiting on the platform, its windows glowing warmly in the darkness. Although every seat seemed taken, the conductor waved him aboard with a tired smile.',
      my: 'မန္တလေးကို နောက်ဆုံး ရထားက ပလက်ဖောင်းပေါ်မှာ စောင့်နေပြီ၊ သူ့ပြတင်းပေါက်တွေက အမှောင်ထဲမှာ နွေးထွေးစွာ လင်းနေတယ်။ ထိုင်ခုံနေရာတိုင်း ပြည့်နေပုံရပေမယ့် လက်မှတ်စစ်သူက ပင်ပန်းတဲ့ အပြုံးနဲ့ သူ့ကို တက်ဖို့ လက်ပြတယ်။',
    },
    {
      en: 'Htet squeezed into a corner seat beside an elderly monk, who was quietly reciting verses. The rhythmic sound of the wheels soon blended with the monk\'s gentle voice, and Htet felt an unexpected sense of calm.',
      my: 'ထွဋ်က ဂါထာတွေ တိုးတိုးရွတ်နေတဲ့ ရဟန်းတော်အကြီးတစ်ပါးဘေးက ထောင့်ခုံမှာ ညှပ်ထိုင်တယ်။ ဘီးတွေရဲ့ စည်းချက်ညီတဲ့ အသံက ရဟန်းတော်ရဲ့ နူးညံ့တဲ့ အသံနဲ့ မကြာခင် ရောနှောသွားပြီး ထွဋ် မမျှော်လင့်တဲ့ ငြိမ်သက်မှုကို ခံစားရတယ်။',
    },
    {
      en: 'Halfway through the night, the train stopped in the middle of nowhere. Passengers leaned out of the windows, wondering what had happened, until the conductor announced that a fallen tree was blocking the tracks ahead.',
      my: 'ညတစ်ဝက်မှာ ရထားက ဘယ်မှ မဟုတ်တဲ့နေရာမှာ ရပ်သွားတယ်။ ခရီးသည်တွေက ပြတင်းပေါက်တွေကနေ ခေါင်းထုတ်ပြီး ဘာဖြစ်တာလဲ သိချင်နေကြတယ်၊ ရှေ့မှာ လဲကျနေတဲ့ သစ်ပင်တစ်ပင်က လမ်းကို ပိတ်နေတယ်လို့ လက်မှတ်စစ်သူက ကြေညာတဲ့အထိပါ။',
    },
    {
      en: 'Instead of complaining, the passengers climbed down together. Farmers, students, and traders pushed the great trunk aside while children cheered them on. By the time the train moved again, strangers had become friends.',
      my: 'ညည်းညူမယ့်အစား ခရီးသည်တွေက အတူ ဆင်းလာကြတယ်။ လယ်သမားတွေ၊ ကျောင်းသားတွေနဲ့ ကုန်သည်တွေက သစ်ပင်ကြီးကို ဘေးကို တွန်းဖယ်ကြပြီး ကလေးတွေက အားပေးကြတယ်။ ရထား ပြန်ရွေ့တဲ့အချိန်မှာ သူစိမ်းတွေက သူငယ်ချင်းတွေ ဖြစ်သွားကြပြီ။',
    },
    {
      en: 'When the sun rose over the hills of Mandalay, Htet realized that the delay had given him something precious: a reminder that the best part of any journey is rarely the destination itself, but the people you meet along the way.',
      my: 'မန္တလေးတောင်တန်းတွေအပေါ် နေထွက်လာတဲ့အခါ ထွဋ် သဘောပေါက်သွားတယ် — နှောင့်နှေးမှုက သူ့ကို အဖိုးတန်တဲ့ အရာတစ်ခု ပေးခဲ့တယ်။ ဘယ်ခရီးရဲ့ အကောင်းဆုံးအပိုင်းကလည်း ပန်းတိုင်ကိုယ်တိုင်ထက် လမ်းမှာ တွေ့တဲ့ လူတွေပဲ ဖြစ်တယ်ဆိုတဲ့ သတိပေးချက်ပါ။',
    },
  ],
},
// key words: pagoda, secret, restore, heritage, uncover, generation
{
  id: 'story-f14-b2-2',
  level: 'B2',
  titleEn: 'The Secret of the Old Pagoda',
  titleMy: 'ဘုရားဟောင်းရဲ့ လျှို့ဝှက်ချက်',
  paragraphs: [
    {
      en: 'For as long as anyone could remember, the small pagoda on the hill had been slowly crumbling. Its golden paint had faded, and few villagers bothered to climb up anymore.',
      my: 'ဘယ်သူမှ မှတ်မိနိုင်သလောက် တောင်ပေါ်က ဘုရားငယ်လေးက ဖြည်းဖြည်း ပြိုပျက်နေတယ်။ သူ့ရွှေဆေးက မှိန်သွားပြီး ရွာသားအနည်းငယ်ပဲ အပေါ်ကို တက်ကြတော့တယ်။',
    },
    {
      en: 'Everything changed when a team of young architects arrived, determined to restore the ancient structure before the next rainy season destroyed it completely.',
      my: 'ရှေးဟောင်း အဆောက်အအုံကို နောက် မိုးရာသီက လုံးဝ ဖျက်ဆီးမသွားခင် ပြန်လည်ထိန်းသိမ်းဖို့ စိတ်ပိုင်းဖြတ်ထားတဲ့ ဗိသုကာငယ်တွေ အဖွဲ့တစ်ဖွဲ့ ရောက်လာတဲ့အခါ အရာအားလုံး ပြောင်းလဲသွားတယ်။',
    },
    {
      en: 'While carefully removing a damaged wall, one of the workers discovered a hidden chamber. Inside, wrapped in cloth that had survived for centuries, lay dozens of palm-leaf manuscripts covered in delicate writing.',
      my: 'ပျက်စီးနေတဲ့ နံရံတစ်ခုကို ဂရုတစိုက် ဖယ်ရှားနေတုန်း အလုပ်သမားတစ်ယောက်က ဝှက်ထားတဲ့ အခန်းတစ်ခု တွေ့တယ်။ အထဲမှာ ရာစုနှစ်ပေါင်းများစွာ ရှင်သန်ခဲ့တဲ့ အဝတ်မှာ ထုပ်ထားတဲ့ နူးညံ့တဲ့ စာတွေနဲ့ ပြည့်နေတဲ့ ပေစာတွေ ဒါဇင်ချီ ရှိတယ်။',
    },
    {
      en: 'Scholars who examined the manuscripts were astonished. The texts described medical remedies, star charts, and poems that had been lost to history for over three hundred years.',
      my: 'ပေစာတွေကို စစ်ဆေးတဲ့ ပညာရှင်တွေ အံ့ဩသွားတယ်။ စာတွေမှာ ဆေးနည်းတွေ၊ ကြယ်ပုံဇယားတွေနဲ့ နှစ်သုံးရာကျော် သမိုင်းမှာ ပျောက်ဆုံးခဲ့တဲ့ ကဗျာတွေ ဖော်ပြထားတယ်။',
    },
    {
      en: 'News of the discovery spread quickly, and visitors began arriving from distant towns. Although the village had once felt forgotten, it suddenly found itself at the center of national attention.',
      my: 'တွေ့ရှိမှုသတင်းက အမြန် ပျံ့နှံ့သွားပြီး ဝေးလံတဲ့ မြို့တွေက ဧည့်သည်တွေ ရောက်လာကြတယ်။ ရွာက တစ်ချိန်က မေ့လျော့ခံရသလို ခံစားရပေမယ့် ရုတ်တရက် နိုင်ငံတစ်ဝန်း အာရုံစိုက်မှုရဲ့ ဗဟိုမှာ ရောက်သွားတယ်။',
    },
    {
      en: 'Today, the restored pagoda shines again in the sunlight. The manuscripts are preserved in a small museum nearby, reminding every generation that the past still has secrets worth protecting.',
      my: 'ဒီနေ့ ပြန်လည်ထိန်းသိမ်းထားတဲ့ ဘုရားက နေရောင်အောက် ပြန်တောက်ပနေတယ်။ ပေစာတွေကို အနီးက ပြတိုက်အသေးလေးမှာ ထိန်းသိမ်းထားတယ်၊ အတိတ်မှာ ကာကွယ်ထိန်းသိမ်းထိုက်တဲ့ လျှို့ဝှက်ချက်တွေ ရှိနေသေးတယ်ဆိုတာ မျိုးဆက်တိုင်းကို သတိပေးနေတယ်။',
    },
  ],
},
// key words: tea shop, decision, career, opportunity, risk, future
{
  id: 'story-f14-b2-3',
  level: 'B2',
  titleEn: 'The Tea Shop Decision',
  titleMy: 'လက်ဖက်ရည်ဆိုင်က ဆုံးဖြတ်ချက်',
  paragraphs: [
    {
      en: 'Every morning for five years, Khin had sat at the same corner table of the tea shop, watching office workers hurry past with their briefcases.',
      my: 'ငါးနှစ်တာ မနက်တိုင်း ခင်က လက်ဖက်ရည်ဆိုင်ရဲ့ ထောင့်စားပွဲတစ်ခုတည်းမှာ ထိုင်ပြီး အိတ်တွေနဲ့ အလုပ်သမားတွေ အလျင်အမြန် ဖြတ်သွားတာကို ကြည့်နေတယ်။',
    },
    {
      en: 'She had a stable job at the bank, which paid well and pleased her parents. Yet lately, she had begun to feel that something important was missing from her life.',
      my: 'သူမမှာ ဘဏ်မှာ တည်ငြိမ်တဲ့ အလုပ်ရှိတယ်၊ လစာကောင်းပြီး သူမမိဘတွေကို စိတ်ချမ်းသာစေတယ်။ ဒါပေမယ့် မကြာသေးခင်က သူမဘဝမှာ အရေးကြီးတဲ့ အရာတစ်ခု ပျောက်နေတယ်လို့ ခံစားလာတယ်။',
    },
    {
      en: 'What she truly loved was baking. On weekends, her small kitchen filled with the smell of fresh bread, and her friends always begged her to open a bakery.',
      my: 'သူမ တကယ် ချစ်တာက မုန့်ဖုတ်တာပါ။ စနေ၊ တနင်္ဂနွေတွေမှာ သူမရဲ့ မီးဖိုချောင်အသေးလေးက လတ်ဆတ်တဲ့ ပေါင်မုန့်အနံ့နဲ့ ပြည့်နေတယ်၊ သူ့သူငယ်ချင်းတွေက မုန့်ဆိုင်ဖွင့်ဖို့ အမြဲ တောင်းဆိုကြတယ်။',
    },
    {
      en: 'One rainy morning, while stirring her tea, Khin made her decision. She would resign from the bank and risk everything on her dream, even though everyone warned her that most new businesses fail.',
      my: 'မိုးရွာတဲ့ မနက်တစ်မနက် လက်ဖက်ရည်ကို မွှေနေတုန်း ခင် ဆုံးဖြတ်ချက်ချတယ်။ ဘဏ်ကနေ ထွက်ပြီး သူမအိပ်မက်အတွက် အရာအားလုံး စွန့်စားမယ်၊ အလုပ်သစ်တော်တော်များများ ကျရှုံးတယ်လို့ အားလုံးက သတိပေးပေမယ့်။',
    },
    {
      en: 'The first year was brutally difficult. She woke before dawn, worked until midnight, and more than once considered giving up. But each morning, the smell of warm bread reminded her why she had started.',
      my: 'ပထမနှစ်က အရမ်း ခက်ခဲတယ်။ သူမ အရုဏ်မတက်ခင် နိုးတယ်၊ သန်းခေါင်အထိ အလုပ်လုပ်တယ်၊ လက်လျှော့ဖို့ တစ်ကြိမ်မက စဉ်းစားတယ်။ ဒါပေမယ့် မနက်တိုင်း နွေးထွေးတဲ့ ပေါင်မုန့်အနံ့က သူမ ဘာလို့ စခဲ့တာလဲဆိုတာ သတိပေးတယ်။',
    },
    {
      en: 'Three years later, her bakery employs twelve people and supplies bread to hotels across the city. Khin still drinks tea at the same corner table — but now she watches the office workers hurry past, and she smiles, because she chose a different path.',
      my: 'သုံးနှစ်အကြာမှာ သူမမုန့်ဆိုင်က လူ ဆယ့်နှစ်ယောက် အလုပ်ခန့်ထားပြီး မြို့တစ်ဝန်းက ဟိုတယ်တွေကို ပေါင်မုန့် ပို့ပေးတယ်။ ခင်က အဲဒီထောင့်စားပွဲမှာပဲ လက်ဖက်ရည် သောက်နေတုန်း — ဒါပေမယ့် အခု အလုပ်သမားတွေ အလျင်အမြန် ဖြတ်သွားတာကို ကြည့်ပြီး ပြုံးတယ်၊ ဘာလို့လဲဆိုတော့ သူမ မတူတဲ့ လမ်းကို ရွေးခဲ့လို့ပါ။',
    },
  ],
},
// key words: storm, river, captain, wave, survive, rescue
{
  id: 'story-f14-b2-4',
  level: 'B2',
  titleEn: 'The Storm on the River',
  titleMy: 'မြစ်ပေါ်က မုန်တိုင်း',
  paragraphs: [
    {
      en: 'Captain Myo had sailed the great river for twenty years, and he believed he had seen every kind of weather. That afternoon, however, the sky turned a color he had never witnessed before.',
      my: 'ကပ္ပတိန် မျိုးက မြစ်ကြီးကို နှစ်နှစ်ဆယ် လှော်ခဲ့ပြီး ရာသီဥတုအမျိုးမျိုး မြင်ဖူးပြီလို့ ယုံကြည်တယ်။ ဒါပေမယ့် အဲဒီနေ့လည်မှာ ကောင်းကင်က သူ ဘယ်တော့မှ မမြင်ဖူးတဲ့ အရောင် ဖြစ်သွားတယ်။',
    },
    {
      en: 'Within minutes, black clouds swallowed the horizon. The wind rose with terrifying speed, and waves began crashing against the sides of the old ferry.',
      my: 'မိနစ်အနည်းငယ်အတွင်း တိမ်မည်းတွေက မိုးကုပ်စက်ဝိုင်းကို မျိုချသွားတယ်။ လေက ကြောက်စရာကောင်းတဲ့ အရှိန်နဲ့ ထန်လာပြီး လှိုင်းတွေက သင်္ဘောအိုရဲ့ ဘေးတွေကို ရိုက်ခတ်လာတယ်။',
    },
    {
      en: 'Passengers screamed as water poured onto the deck. While the crew struggled to secure the cargo, Captain Myo gripped the wheel with both hands, his eyes fixed on the faint outline of the shore.',
      my: 'ကုန်းပတ်ပေါ်ကို ရေ လျှံဝင်လာတဲ့အခါ ခရီးသည်တွေ အော်ကြတယ်။ သင်္ဘောသားတွေ ကုန်ပစ္စည်းတွေကို ခိုင်အောင် ကြိုးစားနေတုန်း ကပ္ပတိန် မျိုးက စတီယာရင်ကို လက်နှစ်ဖက်နဲ့ ဆုပ်ကိုင်ပြီး မျက်လုံးတွေကို ကမ်းခြေရဲ့ မှုန်ဝါးတဲ့ ပုံရိပ်ပေါ်မှာ စိုက်ထားတယ်။',
    },
    {
      en: 'For nearly an hour, the little ferry fought against the storm. Just when hope seemed lost, the wind suddenly weakened, as if the river had finally grown tired of its own fury.',
      my: 'နာရီဝက်နီးပါး သင်္ဘောငယ်လေးက မုန်တိုင်းကို တိုက်ခိုက်တယ်။ မျှော်လင့်ချက် ပျောက်လုနီးမှာ လေက ရုတ်တရက် အားနည်းသွားတယ်၊ မြစ်ကိုယ်တိုင် သူ့ဒေါသကို ပင်ပန်းသွားသလိုပါပဲ။',
    },
    {
      en: 'The ferry limped into a small fishing village, damaged but afloat. The villagers rushed to help, bringing blankets, hot soup, and dry clothes for the shaken passengers.',
      my: 'သင်္ဘောက ငါးဖမ်းရွာအသေးလေးကို ပျက်စီးပေမယ့် မနစ်ဘဲ ဝင်လာတယ်။ ရွာသားတွေ ကူညီဖို့ ပြေးလာကြပြီး တုန်လှုပ်နေတဲ့ ခရီးသည်တွေအတွက် စောင်၊ ဟင်းချိုပူပူနဲ့ ခြောက်သွေ့တဲ့ အဝတ်အစားတွေ ယူလာကြတယ်။',
    },
    {
      en: 'That night, Captain Myo sat quietly on the beach, watching the calm water. He understood then that experience matters, but humility matters more — the river always deserves respect, no matter how well you think you know it.',
      my: 'အဲဒီည ကပ္ပတိန် မျိုးက ကမ်းခြေမှာ တိတ်တိတ်ဆိတ်ဆိတ် ထိုင်ပြီး ငြိမ်သက်နေတဲ့ ရေကို ကြည့်နေတယ်။ အဲဒီအခါ သူ နားလည်သွားတယ် — အတွေ့အကြုံက အရေးကြီးပေမယ့် နှိမ့်ချမှုက ပိုအရေးကြီးတယ်။ မြစ်ကို ဘယ်လောက် ကောင်းကောင်း သိတယ်ထင်ထင် အမြဲ လေးစားရမယ်။',
    },
  ],
},
// key words: city, invisible, science, experiment, disappear, discover
{
  id: 'story-f14-b2-5',
  level: 'B2',
  titleEn: 'The Invisible City',
  titleMy: 'မမြင်ရတဲ့ မြို့',
  paragraphs: [
    {
      en: 'Dr. Lin was a physicist who had spent a decade studying light. Her laboratory, hidden in the basement of the university, contained an experiment that nobody else believed would work.',
      my: 'ဒေါက်တာ လင်းက အလင်းကို ဆယ်စုနှစ် တစ်ခုလုံး လေ့လာခဲ့တဲ့ ရူပဗေဒ ပညာရှင်ပါ။ တက္ကသိုလ်ရဲ့ မြေအောက်ခန်းမှာ ဝှက်ထားတဲ့ သူမဓာတ်ခွဲခန်းမှာ ဘယ်သူမှ အောင်မြင်မယ်လို့ မယုံကြည်တဲ့ စမ်းသပ်မှုတစ်ခု ရှိတယ်။',
    },
    {
      en: 'She had built a special material that could bend light around objects, making them appear to disappear. Although the scientific community laughed at her theories, she continued her research in secret.',
      my: 'သူမက အရာဝတ္ထုတွေပတ်လည်မှာ အလင်းကို ကွေးညွှတ်စေနိုင်တဲ့ အထူးပစ္စည်းတစ်ခု တည်ဆောက်ထားတယ်၊ အဲဒါက အရာတွေကို ပျောက်သွားသလို ထင်စေတယ်။ သိပ္ပံအသိုင်းအဝိုင်းက သူမသီအိုရီတွေကို ရယ်ပေမယ့် သူမ သုတေသနကို လျှို့ဝှက်စွာ ဆက်လုပ်တယ်။',
    },
    {
      en: 'One evening, while adjusting the device, something extraordinary happened. The walls of her laboratory faded away, and beyond them she could see an entire city that was not supposed to exist.',
      my: 'တစ်ညနေမှာ ကိရိယာကို ညှိနေတုန်း ထူးခြားတဲ့ အရာတစ်ခု ဖြစ်သွားတယ်။ သူမဓာတ်ခွဲခန်းရဲ့ နံရံတွေ မှိန်သွားပြီး အဲဒီအပြင်မှာ ရှိနေဖို့ မသင့်တဲ့ မြို့တစ်ခုလုံးကို သူမ မြင်ရတယ်။',
    },
    {
      en: 'The city shimmered like a reflection on water. Tall towers rose where there should have been empty fields, and tiny lights moved along streets that no map had ever recorded.',
      my: 'မြို့က ရေပေါ်က အရိပ်လိုမျိုး တောက်ပနေတယ်။ လယ်ကွင်းလွတ်တွေ ရှိနေသင့်တဲ့နေရာမှာ မျှော်စင်မြင့်တွေ တက်နေပြီး မြေပုံဘယ်တစ်ခုမှ မှတ်တမ်းမတင်ဖူးတဲ့ လမ်းတွေပေါ်မှာ မီးသေးသေးလေးတွေ ရွေ့လျားနေတယ်။',
    },
    {
      en: 'Dr. Lin realized with a racing heart that her device had not made things invisible — it had revealed a hidden layer of reality that had always been there, waiting for someone patient enough to look.',
      my: 'ဒေါက်တာ လင်းက နှလုံးခုန်မြန်စွာ သဘောပေါက်သွားတယ် — သူမကိရိယာက အရာတွေကို မမြင်ရအောင် လုပ်တာ မဟုတ်ဘဲ အမြဲ ရှိနေခဲ့ပြီး ကြည့်ဖို့ စိတ်ရှည်တဲ့သူကို စောင့်နေတဲ့ လက်တွေ့ဘဝရဲ့ ဝှက်ထားတဲ့ အလွှာကို ဖော်ထုတ်ပေးတာပါ။',
    },
    {
      en: 'She turned off the machine and sat in silence for a long time. Some discoveries, she decided, are too powerful to share immediately. The invisible city would wait — and so would she.',
      my: 'သူမ စက်ကို ပိတ်ပြီး အချိန်ကြာကြာ တိတ်ဆိတ်စွာ ထိုင်နေတယ်။ တချို့တွေ့ရှိမှုတွေက ချက်ချင်း မျှဝေဖို့ အရမ်း အားကြီးတယ်လို့ သူမ ဆုံးဖြတ်တယ်။ မမြင်ရတဲ့ မြို့က စောင့်နေမယ် — သူမလည်း စောင့်နေမယ်။',
    },
  ],
},
// key words: chef, apprentice, recipe, taste, patience, master
{
  id: 'story-f14-b2-6',
  level: 'B2',
  titleEn: "The Chef's Apprentice",
  titleMy: 'စားဖိုမှူးရဲ့ တပည့်',
  paragraphs: [
    {
      en: 'When eighteen-year-old Nanda knocked on the door of the famous restaurant, he carried nothing but a small bag and an enormous dream: to become a great chef.',
      my: 'အသက် ဆယ့်ရှစ်နှစ်အရွယ် နန္ဒာက နာမည်ကြီး စားသောက်ဆိုင်ရဲ့ တံခါးကို ခေါက်တဲ့အခါ အိတ်အသေးလေးတစ်လုံးနဲ့ ကြီးမားတဲ့ အိပ်မက်တစ်ခုပဲ ပါလာတယ် — ကြီးကျယ်တဲ့ စားဖိုမှူး ဖြစ်ဖို့ပါ။',
    },
    {
      en: 'The head chef, Daw May, was known throughout the country for her perfect curries. She looked at the nervous boy and gave him the hardest job in the kitchen: washing dishes.',
      my: 'စားဖိုမှူးချုပ် ဒေါ်မေက သူမရဲ့ ပြီးပြည့်စုံတဲ့ ဟင်းတွေကြောင့် နိုင်ငံတစ်ဝန်း နာမည်ကြီးတယ်။ သူမ စိုးရိမ်နေတဲ့ ကောင်လေးကို ကြည့်ပြီး မီးဖိုချောင်မှာ အခက်ဆုံးအလုပ် — ပန်းကန်ဆေးတာကို ပေးတယ်။',
    },
    {
      en: 'For six months, Nanda washed thousands of plates without complaint. While other apprentices grumbled, he watched everything: how Daw May chose her spices, how she tasted each sauce, how she never rushed.',
      my: 'ခြောက်လတာ နန္ဒာက ပန်းကန်ထောင်ချီကို ညည်းညူခြင်းမရှိဘဲ ဆေးတယ်။ တခြားတပည့်တွေ ညည်းနေတုန်း သူက အရာအားလုံး ကြည့်နေတယ် — ဒေါ်မေ သူမရဲ့ ဟင်းခတ်အမွှေးအကြိုင်တွေ ဘယ်လို ရွေးတယ်၊ ဆော့စ်တစ်ခုချင်းကို ဘယ်လို အရသာခံတယ်၊ ဘယ်တော့မှ အလျင်မလိုဘူးဆိုတာ။',
    },
    {
      en: 'One evening, Daw May fell ill just before an important dinner. The restaurant was full, and there was no one else who knew her secret recipes. She looked at Nanda and made a decision that surprised everyone.',
      my: 'တစ်ညနေမှာ အရေးကြီးတဲ့ ညစာမတိုင်ခင် ဒေါ်မေ နေမကောင်းဖြစ်သွားတယ်။ စားသောက်ဆိုင်က ပြည့်နေပြီး သူမရဲ့ လျှို့ဝှက်ချက်ပြုတ်နည်းတွေ သိတဲ့သူ ဘယ်သူမှ မရှိဘူး။ သူမ နန္ဒာကို ကြည့်ပြီး အားလုံးကို အံ့ဩစေတဲ့ ဆုံးဖြတ်ချက် ချတယ်။',
    },
    {
      en: '"You cook tonight," she whispered. Trembling, Nanda stepped up to the great stove. He remembered every detail he had observed, every flavor he had memorized, and he cooked as if his whole future depended on it.',
      my: '"ဒီည မင်း ချက်ပါ" လို့ သူမ တိုးတိုးပြောတယ်။ တုန်လှုပ်စွာ နန္ဒာက မီးဖိုကြီးနားကို တက်သွားတယ်။ သူ စောင့်ကြည့်ခဲ့တဲ့ အသေးစိတ်တိုင်း၊ မှတ်မိထားတဲ့ အရသာတိုင်းကို သတိရပြီး သူ့အနာဂတ်တစ်ခုလုံး ဒီအပေါ် မူတည်နေသလို ချက်တယ်။',
    },
    {
      en: 'The guests that night said it was the finest meal they had ever tasted. Daw May smiled from her sickbed when she heard the news, because she knew what Nanda was only beginning to understand: patience is the most important ingredient of all.',
      my: 'အဲဒီည ဧည့်သည်တွေက ဒါသူတို့ စားဖူးသမျှထဲမှာ အကောင်းဆုံး အစားအစာလို့ ပြောကြတယ်။ သတင်းကြားတဲ့အခါ ဒေါ်မေက သူမရဲ့ နေမကောင်းတဲ့ ကုတင်ကနေ ပြုံးတယ်၊ ဘာလို့လဲဆိုတော့ နန္ဒာ စတင် နားလည်နေတာကို သူမ သိတယ် — စိတ်ရှည်မှုက အရေးကြီးဆုံး ပါဝင်ပစ္စည်းပါပဲ။',
    },
  ],
},
];
