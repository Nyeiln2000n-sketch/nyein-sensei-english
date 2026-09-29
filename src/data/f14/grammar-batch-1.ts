// FASE 14 — Grammar batch 1: structured A1→B1 grammar rules (Myanmar-first).
// Each rule: CEFR level, Myanmar explanation, natural EN/MM example pairs, drills.
// Example/drill keys intentionally use `english`/`prompt` (not `en`) so the
// vectorize indexer (which only fingerprints `{ en: ... }` entries) skips them.
import type { CEFR } from '../../types';

export interface GrammarExample {
  english: string;
  myanmar: string;
}

export interface GrammarDrill {
  /** Sentence with a ___ blank. */
  prompt: string;
  answer: string;
  options?: string[];
}

export interface GrammarRule {
  id: string;
  level: Extract<CEFR, 'A1' | 'A2' | 'B1'>;
  /** English title (for reference). */
  title: string;
  /** Myanmar title (primary). */
  titleMyanmar: string;
  /** The rule explained in Myanmar. */
  explanationMyanmar: string;
  examples: GrammarExample[];
  drills: GrammarDrill[];
}

export const grammarRules: GrammarRule[] = [
  {
    id: 'gr-present-simple-be',
    level: 'A1',
    title: 'Present Simple: am / is / are',
    titleMyanmar: 'am / is / are သုံးနည်း',
    explanationMyanmar:
      'ပစ္စုပ္ပန်ကာလမှာ တစ်စုံတစ်ယောက်ရဲ့အခြေအနေ၊ အလုပ်၊ နိုင်ငံ၊ တည်နေရာစတာတွေပြောတဲ့အခါ am / is / are သုံးတယ်။ I နဲ့ am တွဲတယ်၊ he/she/it (တစ်ဦးတည်း) နဲ့ is တွဲတယ်၊ you/we/they နဲ့ are တွဲတယ်။',
    examples: [
      { english: 'I am a teacher.', myanmar: 'ကျွန်တော် ဆရာတစ်ယောက်ပါ။' },
      { english: 'She is happy today.', myanmar: 'သူမ ဒီနေ့ ပျော်နေတယ်။' },
      { english: 'They are from Myanmar.', myanmar: 'သူတို့ မြန်မာနိုင်ငံကပါ။' },
      { english: 'The cat is under the table.', myanmar: 'ကြောင်က စားပွဲအောက်မှာရှိတယ်။' },
    ],
    drills: [
      { prompt: 'I ___ a student.', answer: 'am', options: ['am', 'is', 'are', 'be'] },
      { prompt: 'He ___ my brother.', answer: 'is', options: ['is', 'are', 'am', 'be'] },
      { prompt: 'We ___ good friends.', answer: 'are', options: ['are', 'is', 'am', 'be'] },
    ],
  },
  {
    id: 'gr-present-simple-form',
    level: 'A1',
    title: 'Present Simple: everyday actions',
    titleMyanmar: 'နေ့တိုင်းလုပ်တဲ့အလေ့အထများ',
    explanationMyanmar:
      'နေ့တိုင်းလုပ်တဲ့အလေ့အထ၊ ပုံမှန်လုပ်ရိုးလုပ်စဉ်တွေပြောတဲ့အခါ ကြိယာရဲ့အခြေခံပုံစံ (V1) ကိုသုံးတယ်။ I/you/we/they နဲ့တွဲရင် ကြိယာမပြောင်းဘူး။',
    examples: [
      { english: 'I drink tea every morning.', myanmar: 'ကျွန်တော် မနက်တိုင်း လက်ဖက်ရည်သောက်တယ်။' },
      { english: 'They play football on Sundays.', myanmar: 'သူတို့ တနင်္ဂနွေနေ့တိုင်း ဘောလုံးကန်ကြတယ်။' },
      { english: 'We go to school by bus.', myanmar: 'ငါတို့ ကျောင်းကို ဘတ်စ်ကားနဲ့သွားတယ်။' },
      { english: 'You work very hard.', myanmar: 'မင်း အလုပ်အရမ်းကြိုးစားတယ်။' },
    ],
    drills: [
      { prompt: 'I ___ rice for lunch.', answer: 'eat', options: ['eat', 'eats', 'eating', 'ate'] },
      { prompt: 'They ___ TV in the evening.', answer: 'watch', options: ['watch', 'watches', 'watching', 'watched'] },
      { prompt: 'We ___ to work together.', answer: 'walk', options: ['walk', 'walks', 'walking', 'walked'] },
    ],
  },
  {
    id: 'gr-present-simple-third-person',
    level: 'A1',
    title: 'Present Simple: he / she / it + verb-s',
    titleMyanmar: 'တတိယပုဂ္ဂိုလ်နဲ့ ကြိယာနောက် -s ထည့်နည်း',
    explanationMyanmar:
      'he/she/it (တစ်ဦးတည်း) နဲ့တွဲတဲ့အခါ ကြိယာနောက်မှာ -s (သို့) -es ထည့်ရတယ်။ ဥပမာ work → works, watch → watches, study → studies။',
    examples: [
      { english: 'He reads books every night.', myanmar: 'သူ ညတိုင်း စာအုပ်ဖတ်တယ်။' },
      { english: 'My mother cooks delicious food.', myanmar: 'အမေက အရသာရှိတဲ့အစားအစာချက်တယ်။' },
      { english: 'The dog barks at night.', myanmar: 'ခွေးက ညမှာ ဟောင်တယ်။' },
      { english: 'It rains a lot in July.', myanmar: 'ဇူလိုင်လမှာ မိုးအရမ်းရွာတယ်။' },
    ],
    drills: [
      { prompt: 'She ___ in an office.', answer: 'works', options: ['work', 'works', 'working', 'worked'] },
      { prompt: 'He ___ his homework daily.', answer: 'does', options: ['do', 'does', 'doing', 'did'] },
      { prompt: 'The baby ___.', answer: 'cries', options: ['cry', 'cries', 'crying', 'cried'] },
    ],
  },
  {
    id: 'gr-adverbs-of-frequency',
    level: 'A1',
    title: 'Adverbs of frequency',
    titleMyanmar: 'ကြိမ်နှုန်းပြကြိယာဝိသေသနများ',
    explanationMyanmar:
      'always (အမြဲ), usually (အများအားဖြင့်), often (မကြာခဏ), sometimes (တစ်ခါတစ်ရံ), never (ဘယ်တော့မှ) စတာတွေက ဘယ်လောက်မကြာခဏလုပ်လဲပြတယ်။ ကြိယာအဓိကရဲ့ရှေ့မှာထားတယ်၊ ဒါပေမဲ့ am/is/are ရဲ့နောက်မှာထားတယ်။',
    examples: [
      { english: 'I always brush my teeth.', myanmar: 'ကျွန်တော် သွားအမြဲတိုက်တယ်။' },
      { english: 'She usually walks to work.', myanmar: 'သူမ အလုပ်ကို ခြေလျင်အများအားဖြင့်သွားတယ်။' },
      { english: 'They are never late.', myanmar: 'သူတို့ ဘယ်တော့မှ နောက်မကျဘူး။' },
      { english: 'We sometimes watch movies.', myanmar: 'ငါတို့ တစ်ခါတစ်ရံ ရုပ်ရှင်ကြည့်တယ်။' },
    ],
    drills: [
      { prompt: 'He ___ eats breakfast.', answer: 'always', options: ['always', 'ever', 'neverly', 'sometimesly'] },
      { prompt: 'She is ___ on time.', answer: 'usually', options: ['usually', 'usual', 'use', 'oftenly'] },
      { prompt: 'I ___ drink coffee.', answer: 'never', options: ['never', 'ever', 'always not', 'no'] },
    ],
  },
  {
    id: 'gr-present-continuous',
    level: 'A1',
    title: 'Present Continuous: happening now',
    titleMyanmar: 'အခုလုပ်နေဆဲကာလ',
    explanationMyanmar:
      'အခုလုပ်နေတဲ့အရာ၊ အခုဖြစ်နေတဲ့အရာပြောတဲ့အခါ am/is/are + ကြိယာ-ing သုံးတယ်။ ဥပမာ I am eating, she is sleeping။',
    examples: [
      { english: 'I am cooking dinner now.', myanmar: 'ကျွန်တော် အခု ညစာချက်နေတယ်။' },
      { english: 'She is reading a book.', myanmar: 'သူမ စာအုပ်ဖတ်နေတယ်။' },
      { english: 'The children are playing outside.', myanmar: 'ကလေးတွေ အပြင်မှာ ဆော့နေကြတယ်။' },
      { english: 'It is raining.', myanmar: 'မိုးရွာနေတယ်။' },
    ],
    drills: [
      { prompt: 'I ___ watching TV.', answer: 'am', options: ['am', 'is', 'are', 'be'] },
      { prompt: 'She ___ cooking now.', answer: 'is', options: ['is', 'are', 'am', 'be'] },
      { prompt: 'They ___ playing football.', answer: 'are', options: ['are', 'is', 'am', 'be'] },
    ],
  },
  {
    id: 'gr-past-simple-be',
    level: 'A1',
    title: 'Past Simple: was / were',
    titleMyanmar: 'အတိတ်ကာလ was / were',
    explanationMyanmar:
      'အတိတ်ကာလအခြေအနေ၊ တည်နေရာပြောတဲ့အခါ was/were သုံးတယ်။ I/he/she/it နဲ့ was တွဲတယ်၊ you/we/they နဲ့ were တွဲတယ်။',
    examples: [
      { english: 'I was tired yesterday.', myanmar: 'ကျွန်တော် မနေ့က ပင်ပန်းနေခဲ့တယ်။' },
      { english: 'They were at home last night.', myanmar: 'သူတို့ မနေ့ညက အိမ်မှာရှိခဲ့ကြတယ်။' },
      { english: 'The weather was cold.', myanmar: 'ရာသီဥတုက အေးခဲ့တယ်။' },
      { english: 'We were students in 2020.', myanmar: 'ငါတို့ ၂၀၂၀ မှာ ကျောင်းသားတွေဖြစ်ခဲ့ကြတယ်။' },
    ],
    drills: [
      { prompt: 'I ___ sick last week.', answer: 'was', options: ['was', 'were', 'am', 'is'] },
      { prompt: 'You ___ late yesterday.', answer: 'were', options: ['were', 'was', 'are', 'is'] },
      { prompt: 'She ___ at school.', answer: 'was', options: ['was', 'were', 'is', 'are'] },
    ],
  },
  {
    id: 'gr-past-simple-regular',
    level: 'A1',
    title: 'Past Simple: regular verbs',
    titleMyanmar: 'ပုံမှန်ကြိယာတွေရဲ့အတိတ်ပုံစံ',
    explanationMyanmar:
      'ပုံမှန်ကြိယာတွေရဲ့အတိတ်ပုံစံလုပ်ဖို့ နောက်မှာ -ed ထည့်တယ်။ ဥပမာ play → played, watch → watched, stop → stopped (အက္ခရာနှစ်ထပ်)။',
    examples: [
      { english: 'I watched a movie last night.', myanmar: 'ကျွန်တော် မနေ့ညက ရုပ်ရှင်ကြည့်ခဲ့တယ်။' },
      { english: 'She cleaned her room.', myanmar: 'သူမ သူ့အခန်းသန့်ရှင်းရေးလုပ်ခဲ့တယ်။' },
      { english: 'We played chess yesterday.', myanmar: 'ငါတို့ မနေ့က စစ်တုရင်ကစားခဲ့ကြတယ်။' },
      { english: 'He stopped the car.', myanmar: 'သူ ကားရပ်ခဲ့တယ်။' },
    ],
    drills: [
      { prompt: 'We ___ football yesterday.', answer: 'played', options: ['played', 'play', 'plays', 'playing'] },
      { prompt: 'She ___ her hands.', answer: 'washed', options: ['washed', 'wash', 'washes', 'washing'] },
      { prompt: 'They ___ the door.', answer: 'closed', options: ['closed', 'close', 'closes', 'closing'] },
    ],
  },
  {
    id: 'gr-past-simple-irregular',
    level: 'A1',
    title: 'Past Simple: irregular verbs',
    titleMyanmar: 'မမှန်ကြိယာတွေရဲ့အတိတ်ပုံစံ',
    explanationMyanmar:
      'မမှန်ကြိယာတွေက -ed မထည့်ဘူး၊ ပုံစံလုံးဝပြောင်းသွားတယ်။ go → went, eat → ate, buy → bought, see → saw စတာတွေကို အလွတ်မှတ်ထားရမယ်။',
    examples: [
      { english: 'I went to the market.', myanmar: 'ကျွန်တော် ဈေးသွားခဲ့တယ်။' },
      { english: 'She ate noodles for lunch.', myanmar: 'သူမ နေ့လည်စာကို ခေါက်ဆွဲစားခဲ့တယ်။' },
      { english: 'They bought new shoes.', myanmar: 'သူတို့ ဖိနပ်အသစ်ဝယ်ခဲ့ကြတယ်။' },
      { english: 'He wrote a letter.', myanmar: 'သူ စာတစ်စောင်ရေးခဲ့တယ်။' },
    ],
    drills: [
      { prompt: 'I ___ to school yesterday.', answer: 'went', options: ['went', 'goed', 'go', 'going'] },
      { prompt: 'She ___ an apple.', answer: 'ate', options: ['ate', 'eated', 'eat', 'eating'] },
      { prompt: 'We ___ a good film.', answer: 'saw', options: ['saw', 'seed', 'see', 'seen'] },
    ],
  },
  {
    id: 'gr-articles-a-an',
    level: 'A1',
    title: 'Articles: a / an',
    titleMyanmar: 'a / an သုံးနည်း',
    explanationMyanmar:
      'ရေတွက်လို့ရတဲ့တစ်ခုတည်းနာမ်ရဲ့ရှေ့မှာ a သို့ an သုံးတယ်။ ဗျည်းသံနဲ့စရင် a (a book), သရသံနဲ့စရင် an (an apple)။ အရင်ကမပြောဖူးတဲ့အရာအသစ်မိတ်ဆက်တဲ့အခါသုံးတယ်။',
    examples: [
      { english: 'I saw a dog.', myanmar: 'ကျွန်တော် ခွေးတစ်ကောင်တွေ့ခဲ့တယ်။' },
      { english: 'She is an engineer.', myanmar: 'သူမ အင်ဂျင်နီယာတစ်ယောက်ပါ။' },
      { english: 'He bought an apple.', myanmar: 'သူ ပန်းသီးတစ်လုံးဝယ်ခဲ့တယ်။' },
      { english: 'We need a taxi.', myanmar: 'ငါတို့ တက္ကစီတစ်စီးလိုတယ်။' },
    ],
    drills: [
      { prompt: 'I have ___ cat.', answer: 'a', options: ['a', 'an', 'the', 'some'] },
      { prompt: 'She is ___ honest person.', answer: 'an', options: ['an', 'a', 'the', 'any'] },
      { prompt: 'He ate ___ orange.', answer: 'an', options: ['an', 'a', 'the', 'one'] },
    ],
  },
  {
    id: 'gr-plurals',
    level: 'A1',
    title: 'Plural nouns',
    titleMyanmar: 'နာမ်အများကိန်းလုပ်နည်း',
    explanationMyanmar:
      'တစ်ခုထက်ပိုရင် နာမ်နောက်မှာ -s ထည့်တယ် (cats)။ s/sh/ch/x နဲ့ဆုံးရင် -es (boxes)၊ ဗျည်း + y နဲ့ဆုံးရင် y ကို i ပြောင်း + es (baby → babies)။',
    examples: [
      { english: 'Two cats are sleeping.', myanmar: 'ကြောင်နှစ်ကောင် အိပ်နေကြတယ်။' },
      { english: 'I have three boxes.', myanmar: 'ကျွန်တော့်မှာ သေတ္တာသုံးလုံးရှိတယ်။' },
      { english: 'The babies are crying.', myanmar: 'ကလေးငယ်တွေ ငိုနေကြတယ်။' },
      { english: 'She bought five mangoes.', myanmar: 'သူမ သရက်သီးငါးလုံးဝယ်ခဲ့တယ်။' },
    ],
    drills: [
      { prompt: 'One bus, two ___.', answer: 'buses', options: ['buses', 'bus', 'buss', 'busies'] },
      { prompt: 'One baby, three ___.', answer: 'babies', options: ['babies', 'babys', 'babyes', 'baby'] },
      { prompt: 'One dish, four ___.', answer: 'dishes', options: ['dishes', 'dishs', 'dish', 'dishies'] },
    ],
  },
  {
    id: 'gr-can-cant',
    level: 'A1',
    title: 'Can / Can\'t: ability',
    titleMyanmar: 'can / can\'t သုံးနည်း',
    explanationMyanmar:
      'လုပ်နိုင်စွမ်း၊ ခွင့်ပြုချက်ပြောတဲ့အခါ can + ကြိယာအခြေခံပုံစံသုံးတယ်။ အနုတ်က can\'t (cannot)။ can နောက်မှာ to မထည့်ရဘူး။',
    examples: [
      { english: 'I can swim.', myanmar: 'ကျွန်တော် ရေကူးတတ်တယ်။' },
      { english: 'She can\'t drive.', myanmar: 'သူမ ကားမောင်းတတ်ဘူး။' },
      { english: 'Can you help me?', myanmar: 'မင်း ငါ့ကိုကူညီနိုင်မလား။' },
      { english: 'They can speak English.', myanmar: 'သူတို့ အင်္ဂလိပ်စကားပြောတတ်ကြတယ်။' },
    ],
    drills: [
      { prompt: 'I ___ ride a bike.', answer: 'can', options: ['can', 'cans', 'to can', 'canning'] },
      { prompt: 'She ___ cook well.', answer: 'can\'t', options: ['can\'t', 'cans not', 'don\'t can', 'not can'] },
      { prompt: '___ you play chess?', answer: 'Can', options: ['Can', 'Do', 'Are', 'Is'] },
    ],
  },
  {
    id: 'gr-prepositions-time',
    level: 'A1',
    title: 'Prepositions of time: in / on / at',
    titleMyanmar: 'အချိန်ပြဝိဘတ်များ in / on / at',
    explanationMyanmar:
      'in = လ၊ နှစ်၊ ရာသီ (in July, in 2025)၊ on = ရက်၊ နေ့ (on Monday, on May 1st)၊ at = အချိန်အတိအကျ (at 7 o\'clock, at night)။',
    examples: [
      { english: 'My birthday is in June.', myanmar: 'ကျွန်တော့်မွေးနေ့က ဇွန်လမှာပါ။' },
      { english: 'We meet on Friday.', myanmar: 'ငါတို့ သောကြာနေ့မှာ တွေ့ကြမယ်။' },
      { english: 'The class starts at 9 am.', myanmar: 'အတန်းက မနက် ၉ နာရီမှာစတယ်။' },
      { english: 'She was born on March 3rd.', myanmar: 'သူမ မတ် ၃ ရက်နေ့မှာ မွေးခဲ့တယ်။' },
    ],
    drills: [
      { prompt: 'The party is ___ Saturday.', answer: 'on', options: ['on', 'in', 'at', 'to'] },
      { prompt: 'I wake up ___ 6 o\'clock.', answer: 'at', options: ['at', 'on', 'in', 'by'] },
      { prompt: 'It is cold ___ winter.', answer: 'in', options: ['in', 'on', 'at', 'to'] },
    ],
  },
  {
    id: 'gr-prepositions-place',
    level: 'A1',
    title: 'Prepositions of place: in / on / at',
    titleMyanmar: 'နေရာပြဝိဘတ်များ in / on / at',
    explanationMyanmar:
      'in = အထဲ၊ ဧရိယာအကြီး (in the box, in Yangon)၊ on = မျက်နှာပြင်ပေါ် (on the table)၊ at = နေရာအတိအကျ (at the bus stop)။',
    examples: [
      { english: 'The keys are in my bag.', myanmar: 'သော့တွေက ကျွန်တော့်အိတ်ထဲမှာပါ။' },
      { english: 'The book is on the desk.', myanmar: 'စာအုပ်က စားပွဲပေါ်မှာပါ။' },
      { english: 'He is waiting at the station.', myanmar: 'သူ ဘူတာမှာ စောင့်နေတယ်။' },
      { english: 'They live in Mandalay.', myanmar: 'သူတို့ မန္တလေးမှာနေကြတယ်။' },
    ],
    drills: [
      { prompt: 'The cat is ___ the box.', answer: 'in', options: ['in', 'on', 'at', 'to'] },
      { prompt: 'Put the cup ___ the table.', answer: 'on', options: ['on', 'in', 'at', 'under to'] },
      { prompt: 'She is ___ the bus stop.', answer: 'at', options: ['at', 'in', 'on', 'to'] },
    ],
  },
  {
    id: 'gr-wh-questions',
    level: 'A1',
    title: 'Wh- questions',
    titleMyanmar: 'wh- မေးခွန်းများ',
    explanationMyanmar:
      'what, where, when, who, why, how စတာတွေနဲ့ မေးခွန်းစတယ်။ ပစ္စုပ္ပန်မေးခွန်းမှာ do/does ကို အကြောင်းအရာနောက်မှာထည့်တယ် (Where do you live?)။',
    examples: [
      { english: 'What is your name?', myanmar: 'မင်းနာမည်က ဘာလဲ။' },
      { english: 'Where do you live?', myanmar: 'မင်း ဘယ်မှာနေလဲ။' },
      { english: 'When does the shop open?', myanmar: 'ဆိုင်က ဘယ်အချိန်ဖွင့်လဲ။' },
      { english: 'Why are you crying?', myanmar: 'မင်း ဘာလို့ငိုနေတာလဲ။' },
    ],
    drills: [
      { prompt: '___ do you go to school?', answer: 'How', options: ['How', 'What', 'Who', 'Why not'] },
      { prompt: '___ is your teacher?', answer: 'Who', options: ['Who', 'What', 'Where', 'How'] },
      { prompt: '___ does she work?', answer: 'Where', options: ['Where', 'What', 'When', 'Who'] },
    ],
  },
  {
    id: 'gr-yes-no-questions',
    level: 'A1',
    title: 'Yes / No questions + short answers',
    titleMyanmar: 'Yes/No မေးခွန်းနှင့် အဖြေတိုများ',
    explanationMyanmar:
      'Do/Does/Did, Am/Is/Are, Can တို့နဲ့ မေးခွန်းစပြီး Yes/No နဲ့ဖြေတယ်။ အဖြေတိုမှာ ကြိယာအကူကို ထပ်သုံးရတယ် (Yes, I do. / No, she isn\'t.)။',
    examples: [
      { english: 'Do you like coffee? — Yes, I do.', myanmar: 'မင်း ကော်ဖီကြိုက်လား။ — ကြိုက်တယ်။' },
      { english: 'Is she a doctor? — No, she isn\'t.', myanmar: 'သူမ ဆရာဝန်လား။ — မဟုတ်ဘူး။' },
      { english: 'Did it rain? — Yes, it did.', myanmar: 'မိုးရွာခဲ့လား။ — ရွာခဲ့တယ်။' },
      { english: 'Can they swim? — No, they can\'t.', myanmar: 'သူတို့ ရေကူးတတ်လား။ — မတတ်ဘူး။' },
    ],
    drills: [
      { prompt: 'Do you like tea? — Yes, ___.', answer: 'I do', options: ['I do', 'I like', 'I am', 'me do'] },
      { prompt: 'Is he busy? — No, ___.', answer: 'he isn\'t', options: ['he isn\'t', 'he doesn\'t', 'he not', 'he no'] },
      { prompt: 'Did you eat? — Yes, ___.', answer: 'I did', options: ['I did', 'I ate', 'I do', 'I eat'] },
    ],
  },
  {
    id: 'gr-negatives',
    level: 'A1',
    title: 'Negative sentences',
    titleMyanmar: 'အနုတ်ဝါကျများ',
    explanationMyanmar:
      'ကြိယာအကူ (do/does/did/am/is/are/can) နောက်မှာ not ထည့်တယ်။ အတိုကောက်ပုံစံတွေ သုံးလေ့ရှိတယ် — don\'t, doesn\'t, didn\'t, isn\'t, can\'t။',
    examples: [
      { english: 'I don\'t eat meat.', myanmar: 'ကျွန်တော် အသားမစားဘူး။' },
      { english: 'She doesn\'t watch TV.', myanmar: 'သူမ တီဗွီမကြည့်ဘူး။' },
      { english: 'They didn\'t come.', myanmar: 'သူတို့ မလာခဲ့ကြဘူး။' },
      { english: 'He isn\'t busy.', myanmar: 'သူ အလုပ်မရှုပ်ဘူး။' },
    ],
    drills: [
      { prompt: 'I ___ like spicy food.', answer: 'don\'t', options: ['don\'t', 'doesn\'t', 'not', 'isn\'t'] },
      { prompt: 'She ___ go to school today.', answer: 'didn\'t', options: ['didn\'t', 'doesn\'t', 'don\'t', 'isn\'t'] },
      { prompt: 'We ___ tired.', answer: 'aren\'t', options: ['aren\'t', 'don\'t', 'isn\'t', 'not'] },
    ],
  },
  {
    id: 'gr-there-is-are',
    level: 'A1',
    title: 'There is / There are',
    titleMyanmar: 'There is / There are',
    explanationMyanmar:
      'တစ်နေရာမှာ တစ်ခုခုရှိတယ်ပြောတဲ့အခါ there is (တစ်ခုတည်း) / there are (အများအပြား) သုံးတယ်။ အနုတ်က there isn\'t / there aren\'t။',
    examples: [
      { english: 'There is a book on the table.', myanmar: 'စားပွဲပေါ်မှာ စာအုပ်တစ်အုပ်ရှိတယ်။' },
      { english: 'There are many people here.', myanmar: 'ဒီမှာ လူအများကြီးရှိတယ်။' },
      { english: 'There isn\'t any milk.', myanmar: 'နို့မရှိဘူး။' },
      { english: 'Are there any shops nearby?', myanmar: 'အနီးမှာ ဆိုင်တွေရှိလား။' },
    ],
    drills: [
      { prompt: '___ a park near my house.', answer: 'There is', options: ['There is', 'There are', 'It is', 'There'] },
      { prompt: '___ many stars tonight.', answer: 'There are', options: ['There are', 'There is', 'They are', 'It are'] },
      { prompt: '___ a pen in your bag?', answer: 'Is there', options: ['Is there', 'Are there', 'There is', 'Does there'] },
    ],
  },
  {
    id: 'gr-possessive-s',
    level: 'A1',
    title: 'Possessive \'s',
    titleMyanmar: 'ပိုင်ဆိုင်မှုပြ \'s',
    explanationMyanmar:
      'ပိုင်ဆိုင်မှုပြဖို့ နာမ်နောက်မှာ \'s ထည့်တယ် (the girl\'s bag = မိန်းကလေးရဲ့အိတ်)။ အများကိန်းနာမ်ဆိုရင် \' ပဲထည့်တယ် (the boys\' room)။',
    examples: [
      { english: 'This is Aung\'s pen.', myanmar: 'ဒါက အောင်ရဲ့ဘောပင်ပါ။' },
      { english: 'The cat\'s tail is long.', myanmar: 'ကြောင်ရဲ့အမြီးက ရှည်တယ်။' },
      { english: 'My parents\' house is big.', myanmar: 'အဖေအမေတို့ရဲ့အိမ်က ကြီးတယ်။' },
      { english: 'The students\' books are new.', myanmar: 'ကျောင်းသားတွေရဲ့စာအုပ်တွေက အသစ်တွေပါ။' },
    ],
    drills: [
      { prompt: 'This is ___ bag. (May)', answer: 'May\'s', options: ['May\'s', 'Mays', 'May', 'of May\'s'] },
      { prompt: 'The ___ toys are here. (boys)', answer: 'boys\'', options: ['boys\'', 'boy\'s', 'boys\'s', 'boy'] },
      { prompt: 'That is my ___ car. (father)', answer: 'father\'s', options: ['father\'s', 'fathers', 'father', 'fathers\''] },
    ],
  },
  {
    id: 'gr-possessive-adjectives',
    level: 'A1',
    title: 'Possessive adjectives & pronouns',
    titleMyanmar: 'ပိုင်ဆိုင်မှုပြနာမဝိသေသနနှင့် နာမ်စားများ',
    explanationMyanmar:
      'my/your/his/her/its/our/their က နာမ်ရဲ့ရှေ့မှာသုံး (my book)။ mine/yours/his/hers/ours/theirs က နာမ်မပါဘဲ တစ်ယောက်တည်းသုံး (The book is mine.)။',
    examples: [
      { english: 'This is my phone.', myanmar: 'ဒါက ကျွန်တော့်ဖုန်းပါ။' },
      { english: 'The red bag is hers.', myanmar: 'အနီရောင်အိတ်က သူမရဲ့ဟာပါ။' },
      { english: 'Our house is near the river.', myanmar: 'ငါတို့အိမ်က မြစ်နားမှာပါ။' },
      { english: 'Is this pen yours?', myanmar: 'ဒီဘောပင်က မင်းရဲ့ဟာလား။' },
    ],
    drills: [
      { prompt: 'She lost ___ keys.', answer: 'her', options: ['her', 'hers', 'she', 'her\'s'] },
      { prompt: 'This book is ___. (I)', answer: 'mine', options: ['mine', 'my', 'me', 'I\'s'] },
      { prompt: 'They washed ___ car.', answer: 'their', options: ['their', 'theirs', 'them', 'they\'s'] },
    ],
  },
  {
    id: 'gr-demonstratives',
    level: 'A1',
    title: 'This / That / These / Those',
    titleMyanmar: 'ညွှန်ပြနာမ်စားများ',
    explanationMyanmar:
      'this/these = အနီးက (တစ်ခုတည်း/အများအပြား)၊ that/those = အဝေးက (တစ်ခုတည်း/အများအပြား)။',
    examples: [
      { english: 'This mango is sweet.', myanmar: 'ဒီသရက်သီးက ချိုတယ်။' },
      { english: 'That building is a hospital.', myanmar: 'ဟိုအဆောက်အအုံက ဆေးရုံပါ။' },
      { english: 'These shoes are new.', myanmar: 'ဒီဖိနပ်တွေက အသစ်တွေပါ။' },
      { english: 'Those birds are beautiful.', myanmar: 'ဟိုငှက်တွေက လှတယ်။' },
    ],
    drills: [
      { prompt: '___ is my bag. (near)', answer: 'This', options: ['This', 'That', 'These', 'Those'] },
      { prompt: '___ flowers are pretty. (near, many)', answer: 'These', options: ['These', 'This', 'That', 'Those'] },
      { prompt: '___ house is big. (far)', answer: 'That', options: ['That', 'This', 'These', 'Those'] },
    ],
  },
  {
    id: 'gr-imperatives',
    level: 'A1',
    title: 'Imperatives',
    titleMyanmar: 'အမိန့်ပေးဝါကျများ',
    explanationMyanmar:
      'အမိန့်၊ ညွှန်ကြားချက်၊ တောင်းဆိုချက်ပေးတဲ့အခါ ကြိယာအခြေခံပုံစံနဲ့စတယ်။ အနုတ်က Don\'t + ကြိယာသုံးတယ်။',
    examples: [
      { english: 'Open the door, please.', myanmar: 'တံခါးဖွင့်ပေးပါ။' },
      { english: 'Sit down.', myanmar: 'ထိုင်ပါ။' },
      { english: 'Don\'t touch that.', myanmar: 'ဟိုဟာကို မထိနဲ့။' },
      { english: 'Please be quiet.', myanmar: 'တိတ်တိတ်နေပေးပါ။' },
    ],
    drills: [
      { prompt: '___ your books.', answer: 'Open', options: ['Open', 'Opens', 'Opening', 'Opened'] },
      { prompt: '___ late! (not)', answer: 'Don\'t be', options: ['Don\'t be', 'Not be', 'Don\'t is', 'Be not'] },
      { prompt: '___ me your name.', answer: 'Tell', options: ['Tell', 'Tells', 'Telling', 'Told'] },
    ],
  },
  {
    id: 'gr-some-any-basic',
    level: 'A1',
    title: 'Some / Any',
    titleMyanmar: 'some / any သုံးနည်း',
    explanationMyanmar:
      'some က အတည်ပြုဝါကျတွေမှာသုံး (I have some apples.)၊ any က အနုတ်နဲ့မေးခွန်းတွေမှာသုံး (I don\'t have any apples. / Do you have any apples?)။',
    examples: [
      { english: 'I have some friends in Japan.', myanmar: 'ကျွန်တော့်မှာ ဂျပန်မှာ သူငယ်ချင်းတွေရှိတယ်။' },
      { english: 'She doesn\'t have any money.', myanmar: 'သူမမှာ ပိုက်ဆံမရှိဘူး။' },
      { english: 'Do you want some tea?', myanmar: 'လက်ဖက်ရည်သောက်ချင်လား။' },
      { english: 'There aren\'t any eggs.', myanmar: 'ကြက်ဥမရှိဘူး။' },
    ],
    drills: [
      { prompt: 'I have ___ good news.', answer: 'some', options: ['some', 'any', 'a', 'an'] },
      { prompt: 'She doesn\'t have ___ brothers.', answer: 'any', options: ['any', 'some', 'a', 'an'] },
      { prompt: 'Are there ___ bananas?', answer: 'any', options: ['any', 'some', 'a', 'an'] },
    ],
  },
  {
    id: 'gr-prepositions-to-from',
    level: 'A1',
    title: 'Basic prepositions: to / from / with / for',
    titleMyanmar: 'အခြေခံဝိဘတ်များ to / from / with / for',
    explanationMyanmar:
      'to = ...ဆီသို့၊ from = ...မှ/ဆီက၊ with = ...နှင့်အတူ၊ for = ...အတွက်။',
    examples: [
      { english: 'She goes to school by bus.', myanmar: 'သူမ ကျောင်းကို ဘတ်စ်ကားနဲ့သွားတယ်။' },
      { english: 'This gift is from my sister.', myanmar: 'ဒီလက်ဆောင်က အစ်မဆီကပါ။' },
      { english: 'I went with my friend.', myanmar: 'ကျွန်တော် သူငယ်ချင်းနဲ့အတူသွားခဲ့တယ်။' },
      { english: 'This cake is for you.', myanmar: 'ဒီကိတ်မုန့်က မင်းအတွက်ပါ။' },
    ],
    drills: [
      { prompt: 'He walked ___ the shop.', answer: 'to', options: ['to', 'from', 'with', 'for'] },
      { prompt: 'I got a letter ___ my uncle.', answer: 'from', options: ['from', 'to', 'with', 'for'] },
      { prompt: 'She came ___ her mother.', answer: 'with', options: ['with', 'to', 'from', 'for'] },
    ],
  },
  {
    id: 'gr-like-ing',
    level: 'A1',
    title: 'Like / love / hate + -ing',
    titleMyanmar: 'like / love / hate နောက် -ing',
    explanationMyanmar:
      'like, love, hate, enjoy နောက်မှာ ကြိယာ-ing ပုံစံလိုက်ရတယ်။ ဥပမာ I like swimming (ရေကူးရတာကြိုက်တယ်)။',
    examples: [
      { english: 'I like reading novels.', myanmar: 'ကျွန်တော် ဝတ္ထုဖတ်ရတာကြိုက်တယ်။' },
      { english: 'She loves dancing.', myanmar: 'သူမ အကရတာကြိုက်တယ်။' },
      { english: 'They hate waiting.', myanmar: 'သူတို့ စောင့်ရတာမုန်းကြတယ်။' },
      { english: 'We enjoy cooking together.', myanmar: 'ငါတို့ အတူတူချက်ပြုတ်ရတာပျော်တယ်။' },
    ],
    drills: [
      { prompt: 'I like ___. (swim)', answer: 'swimming', options: ['swimming', 'swim', 'to swim', 'swims'] },
      { prompt: 'She hates ___. (wait)', answer: 'waiting', options: ['waiting', 'wait', 'to wait', 'waits'] },
      { prompt: 'We enjoy ___. (travel)', answer: 'travelling', options: ['travelling', 'travel', 'to travel', 'travels'] },
    ],
  },
  {
    id: 'gr-object-pronouns',
    level: 'A1',
    title: 'Object pronouns',
    titleMyanmar: 'ကံပုဒ်နာမ်စားများ',
    explanationMyanmar:
      'ကြိယာ (သို့) ဝိဘတ်နောက်မှာ me/you/him/her/it/us/them သုံးတယ်။ I → me, he → him, she → her, they → them စသဖြင့် ပြောင်းတယ်။',
    examples: [
      { english: 'Please help me.', myanmar: 'ကျွန်တော့်ကို ကူညီပေးပါ။' },
      { english: 'I saw him yesterday.', myanmar: 'ကျွန်တော် သူ့ကို မနေ့ကတွေ့ခဲ့တယ်။' },
      { english: 'She loves them very much.', myanmar: 'သူမ သူတို့ကို အရမ်းချစ်တယ်။' },
      { english: 'Give it to us.', myanmar: 'အဲဒါကို ငါတို့ပေးပါ။' },
    ],
    drills: [
      { prompt: 'Call ___ later. (I)', answer: 'me', options: ['me', 'I', 'my', 'mine'] },
      { prompt: 'I like ___. (she)', answer: 'her', options: ['her', 'she', 'hers', 'her\'s'] },
      { prompt: 'We met ___ at the park. (they)', answer: 'them', options: ['them', 'they', 'their', 'theirs'] },
    ],
  },
  {
    id: 'gr-present-continuous-future',
    level: 'A2',
    title: 'Present Continuous for future plans',
    titleMyanmar: 'အနာဂတ်အစီအစဉ်အတွက် Present Continuous',
    explanationMyanmar:
      'စီစဉ်ပြီးသား၊ သေချာပြီးသားအနာဂတ်အစီအစဉ်တွေအတွက် am/is/are + V-ing သုံးတယ်။ အချိန်စကားလုံး (tomorrow, tonight, next week) ပါလေ့ရှိတယ်။',
    examples: [
      { english: 'I am meeting my friend tomorrow.', myanmar: 'ကျွန်တော် မနက်ဖြန် သူငယ်ချင်းနဲ့တွေ့မယ်။' },
      { english: 'She is flying to Bangkok on Monday.', myanmar: 'သူမ တနင်္လာနေ့ ဘန်ကောက်ကို ပျံသန်းမယ်။' },
      { english: 'We are having a party tonight.', myanmar: 'ငါတို့ ဒီည ပါတီလုပ်မယ်။' },
      { english: 'They are moving to a new house next week.', myanmar: 'သူတို့ နောက်အပတ် အိမ်အသစ်ပြောင်းမယ်။' },
    ],
    drills: [
      { prompt: 'I ___ dinner with my boss tonight.', answer: 'am having', options: ['am having', 'have', 'will have', 'has'] },
      { prompt: 'She ___ to Mandalay tomorrow.', answer: 'is going', options: ['is going', 'go', 'goes', 'going'] },
      { prompt: 'We ___ a test next Monday.', answer: 'are having', options: ['are having', 'have', 'has', 'having'] },
    ],
  },
  {
    id: 'gr-past-continuous',
    level: 'A2',
    title: 'Past Continuous',
    titleMyanmar: 'ဆက်လက်အတိတ်ကာလ',
    explanationMyanmar:
      'အတိတ်မှာ လုပ်နေဆဲဖြစ်တဲ့အရာအတွက် was/were + V-ing သုံးတယ်။ တစ်ခုခုဖြစ်နေတုန်း နောက်တစ်ခုဝင်လာတဲ့အခါ၊ နောက်ခံအခြေအနေပြောတဲ့အခါ သုံးတယ်။',
    examples: [
      { english: 'I was sleeping at 10 pm.', myanmar: 'ကျွန်တော် ည ၁၀ နာရီမှာ အိပ်နေခဲ့တယ်။' },
      { english: 'They were playing when it rained.', myanmar: 'မိုးရွာတုန်းက သူတို့ ဆော့နေခဲ့ကြတယ်။' },
      { english: 'She was cooking while he was reading.', myanmar: 'သူစာဖတ်နေတုန်း သူမချက်ပြုတ်နေခဲ့တယ်။' },
      { english: 'We were waiting for the bus.', myanmar: 'ငါတို့ ဘတ်စ်ကားစောင့်နေခဲ့ကြတယ်။' },
    ],
    drills: [
      { prompt: 'I ___ TV at 8 pm.', answer: 'was watching', options: ['was watching', 'watched', 'watch', 'am watching'] },
      { prompt: 'They ___ football when I arrived.', answer: 'were playing', options: ['were playing', 'played', 'play', 'are playing'] },
      { prompt: 'She ___ while he talked.', answer: 'was listening', options: ['was listening', 'listened', 'listens', 'is listening'] },
    ],
  },
  {
    id: 'gr-present-perfect-intro',
    level: 'A2',
    title: 'Present Perfect: introduction',
    titleMyanmar: 'Present Perfect အခြေခံ',
    explanationMyanmar:
      'အတိတ်မှာဖြစ်ခဲ့ပေမယ့် အခုနဲ့ဆက်စပ်နေတဲ့အရာ၊ အတွေ့အကြုံ၊ အခုပဲပြီးတဲ့အရာတွေအတွက် have/has + V3 သုံးတယ်။',
    examples: [
      { english: 'I have finished my work.', myanmar: 'ကျွန်တော် အလုပ်ပြီးပြီ။' },
      { english: 'She has visited Japan twice.', myanmar: 'သူမ ဂျပန်ကို နှစ်ခါသွားဖူးတယ်။' },
      { english: 'We have just arrived.', myanmar: 'ငါတို့ အခုပဲရောက်တယ်။' },
      { english: 'He has lost his keys.', myanmar: 'သူ သော့ပျောက်သွားပြီ။' },
    ],
    drills: [
      { prompt: 'I ___ my homework.', answer: 'have finished', options: ['have finished', 'finished', 'finish', 'finishing'] },
      { prompt: 'She ___ to Thailand.', answer: 'has been', options: ['has been', 'was', 'is', 'have been'] },
      { prompt: 'They ___ the house.', answer: 'have sold', options: ['have sold', 'sold', 'sell', 'selling'] },
    ],
  },
  {
    id: 'gr-will-future',
    level: 'A2',
    title: 'Future: will',
    titleMyanmar: 'အနာဂတ် will',
    explanationMyanmar:
      'စကားပြောနေတုန်းမှ ဆုံးဖြတ်တဲ့အရာ၊ ကတိ၊ ခန့်မှန်းချက်တွေအတွက် will + V1 သုံးတယ်။ အနုတ်က won\'t (will not)။',
    examples: [
      { english: 'I will help you.', myanmar: 'ကျွန်တော် မင်းကိုကူညီမယ်။' },
      { english: 'It will rain tomorrow.', myanmar: 'မနက်ဖြန် မိုးရွာမယ်။' },
      { english: 'She will be twenty next year.', myanmar: 'သူမ နောက်နှစ် အသက် ၂၀ ပြည့်မယ်။' },
      { english: 'We won\'t be late.', myanmar: 'ငါတို့ နောက်ကျမှာမဟုတ်ဘူး။' },
    ],
    drills: [
      { prompt: 'I ___ call you tonight.', answer: 'will', options: ['will', 'am', 'go to', 'would'] },
      { prompt: 'She ___ be here soon.', answer: 'will', options: ['will', 'is', 'does', 'has'] },
      { prompt: 'They ___ come tomorrow.', answer: 'won\'t', options: ['won\'t', 'don\'t', 'isn\'t', 'not'] },
    ],
  },
  {
    id: 'gr-going-to',
    level: 'A2',
    title: 'Future: going to',
    titleMyanmar: 'အနာဂတ် going to',
    explanationMyanmar:
      'ကြိုတင်စီစဉ်ထားတဲ့အစီအစဉ်၊ မျက်မြင်လက္ခဏာပေါ်အခြေခံတဲ့ခန့်မှန်းချက်အတွက် be + going to + V1 သုံးတယ်။',
    examples: [
      { english: 'I am going to study tonight.', myanmar: 'ကျွန်တော် ဒီည စာကျက်မယ်။' },
      { english: 'Look at those clouds! It is going to rain.', myanmar: 'တိမ်တွေကြည့်။ မိုးရွာတော့မယ်။' },
      { english: 'They are going to buy a car.', myanmar: 'သူတို့ ကားဝယ်တော့မယ်။' },
      { english: 'She is going to be a doctor.', myanmar: 'သူမ ဆရာဝန်ဖြစ်တော့မယ်။' },
    ],
    drills: [
      { prompt: 'I ___ visit my uncle.', answer: 'am going to', options: ['am going to', 'go to', 'will to', 'going'] },
      { prompt: 'Watch out! You ___ fall!', answer: 'are going to', options: ['are going to', 'will to', 'go to', 'going to'] },
      { prompt: 'He ___ start a new job.', answer: 'is going to', options: ['is going to', 'will to', 'goes to', 'going'] },
    ],
  },
  {
    id: 'gr-articles-the',
    level: 'A2',
    title: 'Article: the',
    titleMyanmar: 'the သုံးနည်း',
    explanationMyanmar:
      'နှစ်ဦးစလုံးသိတဲ့အရာ၊ အရင်ကပြောပြီးသားအရာ၊ ကမ္ဘာမှာတစ်ခုတည်းရှိတဲ့အရာ (the sun, the moon) တို့ရဲ့ရှေ့မှာ the သုံးတယ်။',
    examples: [
      { english: 'The book on the table is mine.', myanmar: 'စားပွဲပေါ်ကစာအုပ်က ကျွန်တော့်ဟာပါ။' },
      { english: 'I saw a dog. The dog was big.', myanmar: 'ခွေးတစ်ကောင်တွေ့ခဲ့တယ်။ အဲဒီခွေးက ကြီးတယ်။' },
      { english: 'The sun is hot.', myanmar: 'နေက ပူတယ်။' },
      { english: 'She went to the market.', myanmar: 'သူမ ဈေးသွားခဲ့တယ်။' },
    ],
    drills: [
      { prompt: '___ moon is bright tonight.', answer: 'The', options: ['The', 'A', 'An', 'Some'] },
      { prompt: 'I bought a pen. ___ pen is blue.', answer: 'The', options: ['The', 'A', 'An', 'That a'] },
      { prompt: 'He plays ___ guitar well.', answer: 'the', options: ['the', 'a', 'an', 'some'] },
    ],
  },
  {
    id: 'gr-countable-uncountable',
    level: 'A2',
    title: 'Countable and uncountable nouns',
    titleMyanmar: 'ရေတွက်ရသောနာမ်နှင့် ရေတွက်မရသောနာမ်များ',
    explanationMyanmar:
      'ရေတွက်ရတဲ့နာမ် (apple → apples) က အများကိန်းလုပ်လို့ရတယ်။ ရေတွက်မရတဲ့နာမ် (water, rice, money, information) က အမြဲတစ်ခုတည်းပုံစံပဲသုံး၊ a/an မထည့်ရဘူး။',
    examples: [
      { english: 'I bought three apples.', myanmar: 'ကျွန်တော် ပန်းသီးသုံးလုံးဝယ်ခဲ့တယ်။' },
      { english: 'There is some rice on the plate.', myanmar: 'ပန်းကန်ထဲမှာ ထမင်းနည်းနည်းရှိတယ်။' },
      { english: 'She drinks a lot of water.', myanmar: 'သူမ ရေအများကြီးသောက်တယ်။' },
      { english: 'Money doesn\'t grow on trees.', myanmar: 'ပိုက်ဆံက သစ်ပင်ပေါ်မပေါက်ဘူး။' },
    ],
    drills: [
      { prompt: 'I need some ___. (information)', answer: 'information', options: ['information', 'informations', 'an information', 'informationses'] },
      { prompt: 'She bought two ___. (bread → loaves)', answer: 'loaves of bread', options: ['loaves of bread', 'breads', 'bread', 'a bread'] },
      { prompt: 'There are three ___ on the table. (cup)', answer: 'cups', options: ['cups', 'cup', 'cupes', 'a cup'] },
    ],
  },
  {
    id: 'gr-much-many',
    level: 'A2',
    title: 'Much / Many / A lot of',
    titleMyanmar: 'much / many / a lot of',
    explanationMyanmar:
      'many = ရေတွက်ရတဲ့နာမ်အများနဲ့သုံး (many books)၊ much = ရေတွက်မရတဲ့နာမ်နဲ့သုံး (much time) — နှစ်ခုလုံး အနုတ်နဲ့မေးခွန်းမှာသုံးလေ့ရှိ။ a lot of = နှစ်မျိုးလုံးနဲ့ရတယ်။',
    examples: [
      { english: 'I don\'t have much time.', myanmar: 'ကျွန်တော့်မှာ အချိန်အများကြီးမရှိဘူး။' },
      { english: 'Are there many people?', myanmar: 'လူအများကြီးရှိလား။' },
      { english: 'She has a lot of friends.', myanmar: 'သူမမှာ သူငယ်ချင်းအများကြီးရှိတယ်။' },
      { english: 'We ate a lot of rice.', myanmar: 'ငါတို့ ထမင်းအများကြီးစားခဲ့ကြတယ်။' },
    ],
    drills: [
      { prompt: 'I don\'t have ___ money.', answer: 'much', options: ['much', 'many', 'a lot', 'few'] },
      { prompt: 'How ___ apples are there?', answer: 'many', options: ['many', 'much', 'a lot', 'little'] },
      { prompt: 'She has ___ of books.', answer: 'a lot', options: ['a lot', 'much', 'many', 'few'] },
    ],
  },
  {
    id: 'gr-could',
    level: 'A2',
    title: 'Could: past ability',
    titleMyanmar: 'could သုံးနည်း',
    explanationMyanmar:
      'အတိတ်ကလုပ်နိုင်ခဲ့တဲ့စွမ်းရည်၊ ခွင့်ပြုချက်အတွက် could + ကြိယာအခြေခံပုံစံသုံးတယ်။ အနုတ်က couldn\'t။',
    examples: [
      { english: 'I could swim when I was five.', myanmar: 'ကျွန်တော် ငါးနှစ်သားတုန်းက ရေကူးတတ်ခဲ့တယ်။' },
      { english: 'She couldn\'t come yesterday.', myanmar: 'သူမ မနေ့က မလာနိုင်ခဲ့ဘူး။' },
      { english: 'Could you speak English then?', myanmar: 'အဲဒီတုန်းက မင်း အင်္ဂလိပ်စကားပြောတတ်ခဲ့လား။' },
      { english: 'They could see the mountains.', myanmar: 'သူတို့ တောင်တွေကိုမြင်နိုင်ခဲ့တယ်။' },
    ],
    drills: [
      { prompt: 'He ___ read at six.', answer: 'could', options: ['could', 'cans', 'can', 'coulds'] },
      { prompt: 'We ___ hear the music.', answer: 'couldn\'t', options: ['couldn\'t', 'can\'t', 'don\'t', 'not could'] },
      { prompt: '___ she drive last year?', answer: 'Could', options: ['Could', 'Can', 'Does', 'Did'] },
    ],
  },
  {
    id: 'gr-must-mustnt',
    level: 'A2',
    title: 'Must / Mustn\'t',
    titleMyanmar: 'must / mustn\'t',
    explanationMyanmar:
      'မဖြစ်မနေလုပ်ရမယ့်အရာ (must) နဲ့ လုံးဝမလုပ်ရတဲ့အရာ (mustn\'t) အတွက်သုံးတယ်။ must နောက်မှာ to မထည့်ရဘူး။',
    examples: [
      { english: 'You must wear a helmet.', myanmar: 'မင်း ဆိုင်ကယ်ဦးထုပ်ဆောင်းရမယ်။' },
      { english: 'We must finish today.', myanmar: 'ငါတို့ ဒီနေ့ ပြီးရမယ်။' },
      { english: 'You mustn\'t smoke here.', myanmar: 'ဒီမှာ ဆေးလိပ်မသောက်ရဘူး။' },
      { english: 'Students mustn\'t cheat.', myanmar: 'ကျောင်းသားတွေ စာမေးပွဲမှာ မလိမ်ရဘူး။' },
    ],
    drills: [
      { prompt: 'You ___ be quiet in the library.', answer: 'must', options: ['must', 'must to', 'have', 'should to'] },
      { prompt: 'You ___ park here.', answer: 'mustn\'t', options: ['mustn\'t', 'don\'t must', 'must not to', 'not must'] },
      { prompt: 'We ___ wear uniforms.', answer: 'must', options: ['must', 'musts', 'to must', 'musting'] },
    ],
  },
  {
    id: 'gr-should',
    level: 'A2',
    title: 'Should / Shouldn\'t: advice',
    titleMyanmar: 'အကြံပေးခြင်း should / shouldn\'t',
    explanationMyanmar:
      'အကြံပေးတဲ့အခါ should + ကြိယာအခြေခံပုံစံသုံးတယ်။ မလုပ်သင့်တဲ့အရာအတွက် shouldn\'t သုံးတယ်။',
    examples: [
      { english: 'You should see a doctor.', myanmar: 'မင်း ဆရာဝန်နဲ့ပြသင့်တယ်။' },
      { english: 'We should leave early.', myanmar: 'ငါတို့ စောစောထွက်သင့်တယ်။' },
      { english: 'You shouldn\'t eat too much sugar.', myanmar: 'မင်း သကြားအများကြီးမစားသင့်ဘူး။' },
      { english: 'Should I call her?', myanmar: 'ငါ သူမကို ဖုန်းဆက်သင့်လား။' },
    ],
    drills: [
      { prompt: 'You ___ drink more water.', answer: 'should', options: ['should', 'should to', 'shoulds', 'to should'] },
      { prompt: 'He ___ stay up late.', answer: 'shouldn\'t', options: ['shouldn\'t', 'doesn\'t should', 'not should', 'should not to'] },
      { prompt: '___ we take a taxi?', answer: 'Should', options: ['Should', 'Do', 'Shall', 'Must'] },
    ],
  },
  {
    id: 'gr-how-much-many',
    level: 'A2',
    title: 'How much / How many',
    titleMyanmar: 'How much / How many မေးခွန်းများ',
    explanationMyanmar:
      'How much = ရေတွက်မရတဲ့နာမ် (သို့) ဈေးနှုန်းမေးတဲ့အခါ (How much is it?)၊ How many = ရေတွက်ရတဲ့နာမ်မေးတဲ့အခါ (How many apples?)။',
    examples: [
      { english: 'How much is this shirt?', myanmar: 'ဒီအင်္ကျီ ဘယ်လောက်လဲ။' },
      { english: 'How many brothers do you have?', myanmar: 'မင်းမှာ မောင်နှမ ဘယ်နှယောက်ရှိလဲ။' },
      { english: 'How much sugar do you want?', myanmar: 'မင်း သကြားဘယ်လောက်လိုချင်လဲ။' },
      { english: 'How many days are there in March?', myanmar: 'မတ်လမှာ ရက်ဘယ်နှရက်ရှိလဲ။' },
    ],
    drills: [
      { prompt: '___ money do you need?', answer: 'How much', options: ['How much', 'How many', 'How long', 'How'] },
      { prompt: '___ students are there?', answer: 'How many', options: ['How many', 'How much', 'How long', 'How'] },
      { prompt: '___ is the bus ticket?', answer: 'How much', options: ['How much', 'How many', 'How often', 'How'] },
    ],
  },
  {
    id: 'gr-adverbs-of-manner',
    level: 'A2',
    title: 'Adverbs of manner',
    titleMyanmar: 'ပြုမူပုံပြကြိယာဝိသေသနများ',
    explanationMyanmar:
      'ဘယ်လိုလုပ်လဲပြဖို့ နာမဝိသေသန + -ly သုံးတယ် (quick → quickly, careful → carefully)။ ကြိယာနောက်မှာထားတယ်။',
    examples: [
      { english: 'She sings beautifully.', myanmar: 'သူမ သီချင်းကောင်းကောင်းဆိုတယ်။' },
      { english: 'He drives carefully.', myanmar: 'သူ ကားဂရုတစိုက်မောင်းတယ်။' },
      { english: 'The baby sleeps quietly.', myanmar: 'ကလေးက တိတ်တိတ်လေးအိပ်တယ်။' },
      { english: 'Please speak slowly.', myanmar: 'ဖြည်းဖြည်းပြောပေးပါ။' },
    ],
    drills: [
      { prompt: 'He runs ___. (quick)', answer: 'quickly', options: ['quickly', 'quick', 'quicker', 'quickest'] },
      { prompt: 'She speaks ___. (soft)', answer: 'softly', options: ['softly', 'soft', 'softer', 'softest'] },
      { prompt: 'Please listen ___. (careful)', answer: 'carefully', options: ['carefully', 'careful', 'care', 'caring'] },
    ],
  },
  {
    id: 'gr-comparatives',
    level: 'A2',
    title: 'Comparatives',
    titleMyanmar: 'နှိုင်းယှဉ်အဆင့်',
    explanationMyanmar:
      'နှစ်ခုနှိုင်းယှဉ်တဲ့အခါ နာမဝိသေသနတို + -er (taller)၊ ရှည်တဲ့နာမဝိသေသနဆို more + နာမဝိသေသန (more beautiful)၊ နောက်မှာ than လိုက်တယ်။',
    examples: [
      { english: 'My brother is taller than me.', myanmar: 'အစ်ကိုက ကျွန်တော့်ထက် အရပ်ရှည်တယ်။' },
      { english: 'This book is more interesting than that one.', myanmar: 'ဒီစာအုပ်က ဟိုစာအုပ်ထက် စိတ်ဝင်စားစရာကောင်းတယ်။' },
      { english: 'Yangon is bigger than Mandalay.', myanmar: 'ရန်ကုန်က မန္တလေးထက် ကြီးတယ်။' },
      { english: 'Tea is cheaper than coffee.', myanmar: 'လက်ဖက်ရည်က ကော်ဖီထက် ဈေးသက်သာတယ်။' },
    ],
    drills: [
      { prompt: 'She is ___ than me. (tall)', answer: 'taller', options: ['taller', 'tall', 'tallest', 'more tall'] },
      { prompt: 'This is ___ than that. (expensive)', answer: 'more expensive', options: ['more expensive', 'expensiver', 'most expensive', 'expensive'] },
      { prompt: 'A car is ___ than a bike. (fast)', answer: 'faster', options: ['faster', 'fast', 'fastest', 'more fast'] },
    ],
  },
  {
    id: 'gr-superlatives',
    level: 'A2',
    title: 'Superlatives',
    titleMyanmar: 'အမြင့်ဆုံးအဆင့်',
    explanationMyanmar:
      'အမြင့်ဆုံးအဆင့်ပြဖို့ the + -est (the tallest) သို့ the most + နာမဝိသေသန (the most beautiful) သုံးတယ်။',
    examples: [
      { english: 'She is the tallest in her class.', myanmar: 'သူမ သူ့အတန်းထဲမှာ အရပ်အရှည်ဆုံးပါ။' },
      { english: 'This is the most expensive phone.', myanmar: 'ဒါက ဈေးအကြီးဆုံးဖုန်းပါ။' },
      { english: 'Mount Everest is the highest mountain.', myanmar: 'ဧဝရတ်တောင်က အမြင့်ဆုံးတောင်ပါ။' },
      { english: 'He is the best student.', myanmar: 'သူက အတော်ဆုံးကျောင်းသားပါ။' },
    ],
    drills: [
      { prompt: 'She is ___ girl here. (tall)', answer: 'the tallest', options: ['the tallest', 'taller', 'tallest', 'most tall'] },
      { prompt: 'This is ___ day of my life. (happy)', answer: 'the happiest', options: ['the happiest', 'happier', 'happiest', 'most happy'] },
      { prompt: 'It is ___ film I know. (good)', answer: 'the best', options: ['the best', 'better', 'best', 'most good'] },
    ],
  },
  {
    id: 'gr-reflexive-pronouns',
    level: 'A2',
    title: 'Reflexive pronouns',
    titleMyanmar: 'ကိုယ့်ကိုယ်ကိုယ်ညွှန်နာမ်စားများ',
    explanationMyanmar:
      'ကိုယ့်ကိုယ်ကိုယ်လုပ်တဲ့အခါ၊ အလေးပေးပြောတဲ့အခါ myself/yourself/himself/herself/itself/ourselves/yourselves/themselves သုံးတယ်။',
    examples: [
      { english: 'I hurt myself.', myanmar: 'ကျွန်တော် ကိုယ့်ကိုယ်ကိုယ် ထိခိုက်မိတယ်။' },
      { english: 'She taught herself English.', myanmar: 'သူမ ကိုယ့်ဘာသာ အင်္ဂလိပ်စာသင်ခဲ့တယ်။' },
      { english: 'They enjoyed themselves.', myanmar: 'သူတို့ ပျော်ရွှင်ခဲ့ကြတယ်။' },
      { english: 'Be careful! Don\'t hurt yourself.', myanmar: 'သတိထား။ ကိုယ့်ကိုယ်ကိုယ် မထိခိုက်စေနဲ့။' },
    ],
    drills: [
      { prompt: 'I did it ___.', answer: 'myself', options: ['myself', 'me', 'I', 'my'] },
      { prompt: 'She looked at ___ in the mirror.', answer: 'herself', options: ['herself', 'her', 'she', 'hers'] },
      { prompt: 'They built the house ___.', answer: 'themselves', options: ['themselves', 'them', 'they', 'theirs'] },
    ],
  },
  {
    id: 'gr-present-simple-timetables',
    level: 'A2',
    title: 'Present Simple for timetables',
    titleMyanmar: 'အချိန်ဇယားအတွက် Present Simple',
    explanationMyanmar:
      'အချိန်ဇယားအတိုင်းဖြစ်တဲ့အရာ — ရထား၊ လေယာဉ်၊ ရုပ်ရှင်၊ အတန်းချိန်တွေအတွက် ပစ္စုပ္ပန်ရိုးရိုးကာလသုံးတယ် (အနာဂတ်အဓိပ္ပာယ်နဲ့)။',
    examples: [
      { english: 'The train leaves at 6 pm.', myanmar: 'ရထားက ည ၆ နာရီမှာ ထွက်တယ်။' },
      { english: 'Our class starts tomorrow at 8.', myanmar: 'ငါတို့အတန်းက မနက်ဖြန် ၈ နာရီမှာ စတယ်။' },
      { english: 'The movie ends at midnight.', myanmar: 'ရုပ်ရှင်က သန်းခေါင်မှာ ပြီးတယ်။' },
      { english: 'The shop opens at 9 am.', myanmar: 'ဆိုင်က မနက် ၉ နာရီမှာ ဖွင့်တယ်။' },
    ],
    drills: [
      { prompt: 'The bus ___ at 7:30.', answer: 'leaves', options: ['leaves', 'leave', 'leaving', 'left'] },
      { prompt: 'The flight ___ tomorrow morning.', answer: 'arrives', options: ['arrives', 'arrive', 'arriving', 'arrived'] },
      { prompt: 'School ___ on Monday.', answer: 'starts', options: ['starts', 'start', 'starting', 'started'] },
    ],
  },
  {
    id: 'gr-suggestions',
    level: 'A2',
    title: 'Making suggestions',
    titleMyanmar: 'အကြံပြုစကားပြောနည်း',
    explanationMyanmar:
      'အကြံပြုတဲ့အခါ Let\'s + ကြိယာအခြေခံပုံစံ၊ Shall we + V1၊ Why don\'t we + V1 သုံးတယ်။',
    examples: [
      { english: 'Let\'s go to the beach.', myanmar: 'ကမ်းခြေသွားကြရအောင်။' },
      { english: 'Shall we eat out tonight?', myanmar: 'ဒီည အပြင်မှာ စားကြရအောင်လား။' },
      { english: 'Why don\'t we watch a movie?', myanmar: 'ရုပ်ရှင်ကြည့်ကြရအောင်လေ။' },
      { english: 'Let\'s study together.', myanmar: 'အတူတူ စာကျက်ကြရအောင်။' },
    ],
    drills: [
      { prompt: '___ play football!', answer: 'Let\'s', options: ['Let\'s', 'Shall', 'Why', 'Lets'] },
      { prompt: '___ we go for a walk?', answer: 'Shall', options: ['Shall', 'Do', 'Will', 'Can'] },
      { prompt: 'Why ___ we stay home?', answer: 'don\'t', options: ['don\'t', 'not', 'doesn\'t', 'aren\'t'] },
    ],
  },
  {
    id: 'gr-past-questions-negatives',
    level: 'A2',
    title: 'Past Simple: questions and negatives',
    titleMyanmar: 'အတိတ်ကာလ မေးခွန်းနှင့် အနုတ်',
    explanationMyanmar:
      'အတိတ်ကာလမေးခွန်း/အနုတ်မှာ Did + အကြောင်းအရာ + ကြိယာအခြေခံပုံစံ သုံးတယ်။ ကြိယာကို -ed/V2 ပုံစံ ပြန်မသုံးရဘူး။',
    examples: [
      { english: 'Did you see the game?', myanmar: 'မင်း ပွဲစဉ်ကို ကြည့်ခဲ့လား။' },
      { english: 'Where did she go?', myanmar: 'သူမ ဘယ်သွားခဲ့လဲ။' },
      { english: 'I didn\'t eat breakfast.', myanmar: 'ကျွန်တော် မနက်စာ မစားခဲ့ဘူး။' },
      { english: 'They didn\'t watch the news.', myanmar: 'သူတို့ သတင်းမကြည့်ခဲ့ကြဘူး။' },
    ],
    drills: [
      { prompt: '___ you go out last night?', answer: 'Did', options: ['Did', 'Do', 'Does', 'Are'] },
      { prompt: 'She ___ come to class.', answer: 'didn\'t', options: ['didn\'t', 'doesn\'t', 'don\'t', 'not'] },
      { prompt: 'Where ___ they live in 2010?', answer: 'did', options: ['did', 'do', 'does', 'were'] },
    ],
  },
  {
    id: 'gr-linkers-so-because',
    level: 'A2',
    title: 'Linkers: so / because',
    titleMyanmar: 'ဆက်စပ်စကားလုံး so / because',
    explanationMyanmar:
      'because = အကြောင်းပြချက် (ဝါကျအလယ်မှာထား)၊ so = ရလဒ် (နောက်ဝါကျအစမှာထား)။',
    examples: [
      { english: 'I was hungry, so I ate noodles.', myanmar: 'ကျွန်တော် ဗိုက်ဆာလို့ ခေါက်ဆွဲစားခဲ့တယ်။' },
      { english: 'She stayed home because she was sick.', myanmar: 'သူမ နေမကောင်းလို့ အိမ်မှာနေခဲ့တယ်။' },
      { english: 'It rained, so we stayed inside.', myanmar: 'မိုးရွာလို့ ငါတို့ အထဲမှာနေခဲ့ကြတယ်။' },
      { english: 'He studied hard because he wanted to pass.', myanmar: 'သူ အောင်ချင်လို့ ကြိုးကြိုးစားစားစာကျက်ခဲ့တယ်။' },
    ],
    drills: [
      { prompt: 'I was tired, ___ I went to bed.', answer: 'so', options: ['so', 'because', 'but', 'and'] },
      { prompt: 'She cried ___ she was sad.', answer: 'because', options: ['because', 'so', 'but', 'or'] },
      { prompt: 'It was late, ___ we ran.', answer: 'so', options: ['so', 'because', 'although', 'if'] },
    ],
  },
  {
    id: 'gr-past-simple-vs-continuous',
    level: 'B1',
    title: 'Past Simple vs Past Continuous',
    titleMyanmar: 'Past Simple နှင့် Past Continuous ခွဲခြားနည်း',
    explanationMyanmar:
      'အတိတ်မှာ ဖြစ်နေဆဲအရာ (was/were + V-ing) ကို နောက်ခံထား၊ ပြီးဆုံးတဲ့အရာ (V2) က ဝင်လာတဲ့ပုံစံ။ when/while နဲ့တွဲသုံးလေ့ရှိ။',
    examples: [
      { english: 'I was cooking when he arrived.', myanmar: 'သူရောက်လာတုန်းက ကျွန်တော် ချက်ပြုတ်နေခဲ့တယ်။' },
      { english: 'While she was reading, the phone rang.', myanmar: 'သူမစာဖတ်နေတုန်း ဖုန်းမြည်ခဲ့တယ်။' },
      { english: 'They were walking home when it started to rain.', myanmar: 'မိုးစရွာတုန်းက သူတို့ အိမ်ပြန်လျှောက်နေခဲ့ကြတယ်။' },
      { english: 'He broke his leg while he was playing football.', myanmar: 'ဘောလုံးကန်နေတုန်း သူ့ခြေထောက်ကျိုးခဲ့တယ်။' },
    ],
    drills: [
      { prompt: 'I ___ when you called.', answer: 'was sleeping', options: ['was sleeping', 'slept', 'sleep', 'am sleeping'] },
      { prompt: 'While they ___, it got dark.', answer: 'were walking', options: ['were walking', 'walked', 'walk', 'are walking'] },
      { prompt: 'She ___ the vase while cleaning.', answer: 'broke', options: ['broke', 'was breaking', 'breaks', 'break'] },
    ],
  },
  {
    id: 'gr-present-perfect-adverbs',
    level: 'B1',
    title: 'Present Perfect: just / already / yet',
    titleMyanmar: 'just / already / yet သုံးနည်း',
    explanationMyanmar:
      'just = အခုပဲ၊ already = ပြီးနှင့်ပြီ (အတည်ပြုဝါကျမှာ)၊ yet = မသေးဘူး (အနုတ်နဲ့မေးခွန်းမှာ)။ have/has နောက်မှာ (yet က ဝါကျအဆုံးမှာ) ထားတယ်။',
    examples: [
      { english: 'I have just eaten.', myanmar: 'ကျွန်တော် အခုပဲ စားပြီးပြီ။' },
      { english: 'She has already finished.', myanmar: 'သူမ ပြီးနှင့်ပြီးပြီ။' },
      { english: 'Have you finished yet?', myanmar: 'မင်း ပြီးပြီလား။' },
      { english: 'They haven\'t arrived yet.', myanmar: 'သူတို့ မရောက်သေးဘူး။' },
    ],
    drills: [
      { prompt: 'I have ___ done it.', answer: 'just', options: ['just', 'yet', 'already not', 'ever'] },
      { prompt: 'She has ___ left.', answer: 'already', options: ['already', 'yet', 'just not', 'ever'] },
      { prompt: 'Have you eaten ___?', answer: 'yet', options: ['yet', 'already', 'just', 'ever'] },
    ],
  },
  {
    id: 'gr-present-perfect-vs-past',
    level: 'B1',
    title: 'Present Perfect vs Past Simple',
    titleMyanmar: 'Present Perfect နှင့် Past Simple ခွဲခြားနည်း',
    explanationMyanmar:
      'အချိန်အတိအကျပါရင် Past Simple သုံး (I saw him yesterday)၊ အချိန်မပါဘဲ အခုနဲ့ဆက်စပ်ရင် Present Perfect သုံး (I have seen him.)။',
    examples: [
      { english: 'She visited Bagan in 2020.', myanmar: 'သူမ ၂၀၂၀ မှာ ပုဂံသွားလည်ခဲ့တယ်။' },
      { english: 'She has visited Bagan three times.', myanmar: 'သူမ ပုဂံကို သုံးခါသွားဖူးတယ်။' },
      { english: 'We ate dinner an hour ago.', myanmar: 'ငါတို့ တစ်နာရီက ညစာစားခဲ့တယ်။' },
      { english: 'We have already eaten dinner.', myanmar: 'ငါတို့ ညစာစားပြီးနှင့်ပြီးပြီ။' },
    ],
    drills: [
      { prompt: 'I ___ him yesterday.', answer: 'saw', options: ['saw', 'have seen', 'see', 'seeing'] },
      { prompt: 'I ___ this film before.', answer: 'have seen', options: ['have seen', 'saw', 'see', 'seeing'] },
      { prompt: 'She ___ to Japan in 2019.', answer: 'went', options: ['went', 'has gone', 'go', 'going'] },
    ],
  },
  {
    id: 'gr-will-vs-going-to',
    level: 'B1',
    title: 'Will vs Going to',
    titleMyanmar: 'will နှင့် going to ခွဲခြားနည်း',
    explanationMyanmar:
      'will = စကားပြောနေတုန်းမှ ဆုံးဖြတ်ချက်၊ ကတိ၊ ထင်မြင်ချက်။ going to = ကြိုစီစဉ်ထားတဲ့အစီအစဉ်၊ မျက်မြင်လက္ခဏာပေါ်ကခန့်မှန်းချက်။',
    examples: [
      { english: 'I will open the window.', myanmar: 'ကျွန်တော် ပြတင်းပေါက်ဖွင့်မယ်။' },
      { english: 'I am going to open a shop next year.', myanmar: 'ကျွန်တော် နောက်နှစ် ဆိုင်ဖွင့်မယ်။' },
      { english: 'Look! He is going to fall!', myanmar: 'ကြည့်။ သူ လဲကျတော့မယ်။' },
      { english: 'I promise I will call you.', myanmar: 'မင်းကို ဖုန်းဆက်မယ်လို့ ကတိပေးတယ်။' },
    ],
    drills: [
      { prompt: 'I\'ve decided. I ___ study medicine.', answer: 'am going to', options: ['am going to', 'will', 'go to', 'shall'] },
      { prompt: 'It\'s heavy. I ___ carry it. (deciding now)', answer: 'will', options: ['will', 'am going to', 'go to', 'shall'] },
      { prompt: 'Look at the sky! It ___.', answer: 'is going to rain', options: ['is going to rain', 'will rain to', 'rains', 'rain'] },
    ],
  },
  {
    id: 'gr-zero-article',
    level: 'B1',
    title: 'Zero article',
    titleMyanmar: 'article မထည့်ရသောအခြေအနေများ',
    explanationMyanmar:
      'ယေဘုယျအများကိန်း/ရေတွက်မရတဲ့နာမ်၊ အစားအစာအမည်၊ ဘာသာစကား၊ အားကစား၊ လူ့အမည်တို့ရဲ့ရှေ့မှာ article လုံးဝမထည့်ဘူး။',
    examples: [
      { english: 'I like music.', myanmar: 'ကျွန်တော် ဂီတကြိုက်တယ်။' },
      { english: 'She speaks English and Thai.', myanmar: 'သူမ အင်္ဂလိပ်နဲ့ ထိုင်းစကားပြောတယ်။' },
      { english: 'Breakfast is ready.', myanmar: 'မနက်စာ အဆင်သင့်ဖြစ်ပြီ။' },
      { english: 'Dogs are loyal animals.', myanmar: 'ခွေးတွေက သစ္စာရှိတဲ့တိရစ္ဆာန်တွေပါ။' },
    ],
    drills: [
      { prompt: '___ honesty is important.', answer: '— (no article)', options: ['— (no article)', 'The', 'A', 'An'] },
      { prompt: 'She plays ___ football.', answer: '— (no article)', options: ['— (no article)', 'the', 'a', 'an'] },
      { prompt: '___ water is cold.', answer: 'The', options: ['The', '— (no article)', 'A', 'An'] },
    ],
  },
  {
    id: 'gr-a-few-little',
    level: 'B1',
    title: 'A few / A little',
    titleMyanmar: 'a few / a little',
    explanationMyanmar:
      'a few = ရေတွက်ရတဲ့နာမ်နည်းနည်း (a few apples)၊ a little = ရေတွက်မရတဲ့နာမ်နည်းနည်း (a little sugar)။ နှစ်ခုလုံး အပြုသဘောဆောင် (လုံလောက်တဲ့ပမာဏရှိ)။',
    examples: [
      { english: 'I have a few friends here.', myanmar: 'ကျွန်တော့်မှာ ဒီမှာ သူငယ်ချင်းအနည်းငယ်ရှိတယ်။' },
      { english: 'She added a little salt.', myanmar: 'သူမ ဆားနည်းနည်းထည့်ခဲ့တယ်။' },
      { english: 'We have a few minutes left.', myanmar: 'ငါတို့မှာ မိနစ်အနည်းငယ်ကျန်သေးတယ်။' },
      { english: 'Can I have a little water?', myanmar: 'ရေနည်းနည်း ရနိုင်မလား။' },
    ],
    drills: [
      { prompt: 'I have ___ apples.', answer: 'a few', options: ['a few', 'a little', 'few', 'little'] },
      { prompt: 'She needs ___ help.', answer: 'a little', options: ['a little', 'a few', 'few', 'many'] },
      { prompt: 'We saw ___ birds.', answer: 'a few', options: ['a few', 'a little', 'much', 'little'] },
    ],
  },
  {
    id: 'gr-have-to',
    level: 'B1',
    title: 'Have to: obligation',
    titleMyanmar: 'have to (လုပ်ရမည့်တာဝန်)',
    explanationMyanmar:
      'ပြင်ပစည်းမျဉ်း၊ အခြေအနေကြောင့်လုပ်ရမယ့်အရာအတွက် have to / has to သုံးတယ်။ အတိတ်ကာလမှာ had to သုံးတယ်။ မေးခွန်းမှာ Do you have to...?။',
    examples: [
      { english: 'I have to wear a uniform.', myanmar: 'ကျွန်တော် ယူနီဖောင်းဝတ်ရတယ်။' },
      { english: 'She has to work on Saturdays.', myanmar: 'သူမ စနေနေ့တွေမှာ အလုပ်လုပ်ရတယ်။' },
      { english: 'We had to leave early.', myanmar: 'ငါတို့ စောစောထွက်ခဲ့ရတယ်။' },
      { english: 'Do you have to go now?', myanmar: 'မင်း အခု သွားရမှာလား။' },
    ],
    drills: [
      { prompt: 'I ___ get up early.', answer: 'have to', options: ['have to', 'has to', 'must to', 'having to'] },
      { prompt: 'She ___ wear glasses.', answer: 'has to', options: ['has to', 'have to', 'musts', 'having to'] },
      { prompt: 'We ___ wait long yesterday.', answer: 'had to', options: ['had to', 'have to', 'has to', 'must'] },
    ],
  },
  {
    id: 'gr-may-might',
    level: 'B1',
    title: 'May / Might: possibility',
    titleMyanmar: 'may / might (ဖြစ်နိုင်ခြေ)',
    explanationMyanmar:
      'ဖြစ်နိုင်ခြေပြောတဲ့အခါ may/might + ကြိယာအခြေခံပုံစံသုံးတယ်။ might က may ထက် သေချာမှုနည်းတယ်။',
    examples: [
      { english: 'It may rain this evening.', myanmar: 'ဒီည မိုးရွာနိုင်တယ်။' },
      { english: 'She might come to the party.', myanmar: 'သူမ ပါတီကို လာနိုင်တယ်။' },
      { english: 'You may sit here.', myanmar: 'မင်း ဒီမှာ ထိုင်နိုင်တယ်။' },
      { english: 'They might be late.', myanmar: 'သူတို့ နောက်ကျနိုင်တယ်။' },
    ],
    drills: [
      { prompt: 'It ___ be cold tonight.', answer: 'might', options: ['might', 'mights', 'to might', 'might to'] },
      { prompt: 'She ___ know the answer.', answer: 'may', options: ['may', 'mays', 'to may', 'may to'] },
      { prompt: 'They ___ come, I\'m not sure.', answer: 'might', options: ['might', 'must', 'should', 'will'] },
    ],
  },
  {
    id: 'gr-would-like',
    level: 'B1',
    title: 'Would like: polite requests',
    titleMyanmar: 'would like (ယဉ်ကျေးစွာတောင်းဆိုခြင်း)',
    explanationMyanmar:
      'ယဉ်ကျေးစွာတောင်းဆို၊ ဖိတ်ခေါ်တဲ့အခါ would like + to + ကြိယာ (သို့) would like + နာမ် သုံးတယ်။ want ထက် ယဉ်ကျေးတယ်။',
    examples: [
      { english: 'I would like a cup of tea.', myanmar: 'လက်ဖက်ရည်တစ်ခွက် သောက်ချင်ပါတယ်။' },
      { english: 'Would you like some help?', myanmar: 'အကူအညီလိုချင်ပါသလား။' },
      { english: 'She would like to visit Paris.', myanmar: 'သူမ ပါရီကို သွားလည်ချင်တယ်။' },
      { english: 'We would like to book a room.', myanmar: 'အခန်းတစ်ခန်း ကြိုတင်ယူချင်ပါတယ်။' },
    ],
    drills: [
      { prompt: 'I would like ___ coffee.', answer: 'some', options: ['some', 'a', 'any', 'much'] },
      { prompt: 'Would you like ___ with us?', answer: 'to come', options: ['to come', 'come', 'coming', 'came'] },
      { prompt: 'She would like ___ a doctor.', answer: 'to be', options: ['to be', 'be', 'being', 'is'] },
    ],
  },
  {
    id: 'gr-conditionals',
    level: 'B1',
    title: 'Conditionals: Zero and First',
    titleMyanmar: 'အခြေအနေပြဝါကျများ (Zero / First)',
    explanationMyanmar:
      'Zero conditional = အမြဲမှန်တဲ့အချက်၊ သဘာဝနိယာမ (If + Present Simple, Present Simple)။ First conditional = အနာဂတ်ဖြစ်နိုင်ခြေ (If + Present Simple, will + V1)။',
    examples: [
      { english: 'If you heat ice, it melts.', myanmar: 'ရေခဲကို အပူပေးရင် အရည်ပျော်တယ်။' },
      { english: 'If it rains, we will stay home.', myanmar: 'မိုးရွာရင် ငါတို့ အိမ်မှာနေမယ်။' },
      { english: 'If she studies hard, she will pass.', myanmar: 'သူမ ကြိုးစားစာကျက်ရင် အောင်မယ်။' },
      { english: 'Plants die if they don\'t get water.', myanmar: 'အပင်တွေကို ရေမရရင် သေတယ်။' },
    ],
    drills: [
      { prompt: 'If you mix red and blue, you ___ purple.', answer: 'get', options: ['get', 'will get', 'got', 'getting'] },
      { prompt: 'If it ___ tomorrow, we will cancel.', answer: 'rains', options: ['rains', 'will rain', 'rained', 'rain'] },
      { prompt: 'If she ___, she will be late.', answer: 'hurries', options: ['hurries', 'will hurry', 'hurry', 'hurried'] },
    ],
  },
  {
    id: 'gr-passive-intro',
    level: 'B1',
    title: 'Passive voice: introduction',
    titleMyanmar: 'Passive voice အခြေခံ',
    explanationMyanmar:
      'လုပ်သူကို အလေးမပေးဘဲ ခံရသူကို အလေးပေးတဲ့အခါ be + V3 (past participle) သုံးတယ်။ ဥပမာ The cake was made by my mother။',
    examples: [
      { english: 'The bridge was built in 1990.', myanmar: 'တံတားကို ၁၉၉၀ မှာ ဆောက်လုပ်ခဲ့တယ်။' },
      { english: 'English is spoken here.', myanmar: 'ဒီမှာ အင်္ဂလိပ်စကားပြောကြတယ်။' },
      { english: 'The windows were cleaned yesterday.', myanmar: 'ပြတင်းပေါက်တွေကို မနေ့က သန့်ရှင်းရေးလုပ်ခဲ့တယ်။' },
      { english: 'This phone was made in Vietnam.', myanmar: 'ဒီဖုန်းကို ဗီယက်နမ်မှာ ထုတ်လုပ်ခဲ့တယ်။' },
    ],
    drills: [
      { prompt: 'The room ___ every day.', answer: 'is cleaned', options: ['is cleaned', 'cleans', 'cleaned', 'is clean'] },
      { prompt: 'The letter ___ yesterday.', answer: 'was sent', options: ['was sent', 'sent', 'is sent', 'sends'] },
      { prompt: 'Rice ___ in Myanmar.', answer: 'is grown', options: ['is grown', 'grows', 'grew', 'is grow'] },
    ],
  },
  {
    id: 'gr-used-to',
    level: 'B1',
    title: 'Used to: past habits',
    titleMyanmar: 'used to (အတိတ်ကအလေ့အထ)',
    explanationMyanmar:
      'အတိတ်ကလုပ်ခဲ့တဲ့အလေ့အထ (အခုမလုပ်တော့တဲ့အရာ) အတွက် used to + ကြိယာအခြေခံပုံစံသုံးတယ်။ မေးခွန်းမှာ Did you use to...?။',
    examples: [
      { english: 'I used to play football.', myanmar: 'ကျွန်တော် အရင်က ဘောလုံးကန်ခဲ့ဖူးတယ်။' },
      { english: 'She used to live in Yangon.', myanmar: 'သူမ အရင်က ရန်ကုန်မှာ နေခဲ့ဖူးတယ်။' },
      { english: 'They used to be neighbours.', myanmar: 'သူတို့ အရင်က အိမ်နီးချင်းတွေဖြစ်ခဲ့ကြတယ်။' },
      { english: 'Did you use to smoke?', myanmar: 'မင်း အရင်က ဆေးလိပ်သောက်ခဲ့ဖူးလား။' },
    ],
    drills: [
      { prompt: 'I used to ___ in a village.', answer: 'live', options: ['live', 'living', 'lived', 'lives'] },
      { prompt: 'She ___ to drink coffee.', answer: 'used', options: ['used', 'use', 'uses', 'using'] },
      { prompt: 'Did he ___ to play chess?', answer: 'use', options: ['use', 'used', 'uses', 'using'] },
    ],
  },
  {
    id: 'gr-infinitive-gerund',
    level: 'B1',
    title: 'Infinitive vs Gerund',
    titleMyanmar: 'to + ကြိယာနှင့် ကြိယာ-ing ခွဲခြားနည်း',
    explanationMyanmar:
      'အချို့ကြိယာတွေနောက်မှာ to + ကြိယာ လိုက်တယ် (want to go, decide to stay, plan to travel)၊ အချို့နောက်မှာ ကြိယာ-ing လိုက်တယ် (enjoy swimming, finish eating, avoid driving)။',
    examples: [
      { english: 'I want to learn English.', myanmar: 'ကျွန်တော် အင်္ဂလိပ်စာသင်ချင်တယ်။' },
      { english: 'She decided to stay home.', myanmar: 'သူမ အိမ်မှာနေဖို့ ဆုံးဖြတ်ခဲ့တယ်။' },
      { english: 'We enjoy travelling together.', myanmar: 'ငါတို့ အတူတူခရီးသွားရတာ ပျော်တယ်။' },
      { english: 'He finished doing his homework.', myanmar: 'သူ အိမ်စာလုပ်ပြီးသွားပြီ။' },
    ],
    drills: [
      { prompt: 'I want ___ a new bike.', answer: 'to buy', options: ['to buy', 'buying', 'buy', 'bought'] },
      { prompt: 'They enjoy ___ football.', answer: 'playing', options: ['playing', 'to play', 'play', 'played'] },
      { prompt: 'She decided ___ early.', answer: 'to leave', options: ['to leave', 'leaving', 'leave', 'left'] },
    ],
  },
  {
    id: 'gr-relative-clauses',
    level: 'B1',
    title: 'Relative clauses: who / which / that',
    titleMyanmar: 'who / which / that သုံးနည်း',
    explanationMyanmar:
      'လူကို who၊ အရာ/တိရစ္ဆာန်ကို which၊ နှစ်မျိုးလုံးကို that သုံးပြီး နာမ်ကို ထပ်ရှင်းပြတယ်။',
    examples: [
      { english: 'The woman who called is my aunt.', myanmar: 'ဖုန်းဆက်ခဲ့တဲ့အမျိုးသမီးက ကျွန်တော့်အဒေါ်ပါ။' },
      { english: 'The book that I bought is interesting.', myanmar: 'ကျွန်တော်ဝယ်ခဲ့တဲ့စာအုပ်က စိတ်ဝင်စားစရာကောင်းတယ်။' },
      { english: 'This is the restaurant which serves Thai food.', myanmar: 'ဒါက ထိုင်းအစားအစာရောင်းတဲ့စားသောက်ဆိုင်ပါ။' },
      { english: 'People who exercise stay healthy.', myanmar: 'လေ့ကျင့်ခန်းလုပ်တဲ့သူတွေက ကျန်းမာရေးကောင်းတယ်။' },
    ],
    drills: [
      { prompt: 'The man ___ lives here is kind.', answer: 'who', options: ['who', 'which', 'whose', 'whom'] },
      { prompt: 'The car ___ I bought is red.', answer: 'that', options: ['that', 'who', 'whose', 'whom'] },
      { prompt: 'This is the shop ___ sells flowers.', answer: 'which', options: ['which', 'who', 'whose', 'whom'] },
    ],
  },
  {
    id: 'gr-too-enough',
    level: 'B1',
    title: 'Too / Enough',
    titleMyanmar: 'too / enough',
    explanationMyanmar:
      'too + နာမဝိသေသန = အလွန်အကျွံ (အနုတ်သဘောဆောင် — too hot = သောက်မရလောက်အောင်ပူ)၊ နာမဝိသေသန + enough = လုံလောက်တယ် (old enough = လုံလောက်အောင်အသက်ကြီး)။',
    examples: [
      { english: 'This coffee is too hot.', myanmar: 'ဒီကော်ဖီက အရမ်းပူတယ်။' },
      { english: 'She is old enough to drive.', myanmar: 'သူမက ကားမောင်းနိုင်လောက်အောင် အသက်ကြီးပြီ။' },
      { english: 'The bag is too heavy.', myanmar: 'အိတ်က အရမ်းလေးတယ်။' },
      { english: 'He isn\'t tall enough for basketball.', myanmar: 'သူက ဘတ်စကက်ဘောကစားဖို့ အရပ်မလုံလောက်ဘူး။' },
    ],
    drills: [
      { prompt: 'It is ___ cold to swim.', answer: 'too', options: ['too', 'enough', 'so', 'very'] },
      { prompt: 'She is brave ___ to try.', answer: 'enough', options: ['enough', 'too', 'so', 'very'] },
      { prompt: 'The soup is ___ salty.', answer: 'too', options: ['too', 'enough', 'so', 'very'] },
    ],
  },
];
