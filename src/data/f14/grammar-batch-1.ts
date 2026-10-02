// FASE 14 — Grammar batch 1: structured A1→B1 grammar rules (Myanmar-first).
// Each rule: CEFR level, Myanmar explanation, natural EN/MM example pairs, drills.
// Example/drill keys intentionally use `english`/`prompt` (not `en`) so the
// vectorize indexer (which only fingerprints `{ en: ... }` entries) skips them.
import type { CEFR } from '../../types';

export interface GrammarExample {
  english: string;
  myanmar: string;
  /** Thai translation of the Myanmar example (OLA 4c). Optional, additive. */
  myanmarTh?: string;
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
  /** Thai title (OLA 4c). Optional, additive. */
  titleMyanmarTh?: string;
  /** The rule explained in Myanmar. */
  explanationMyanmar: string;
  /** The rule explained in Thai (OLA 4c). Optional, additive. */
  explanationMyanmarTh?: string;
  examples: GrammarExample[];
  drills: GrammarDrill[];
}

export const grammarRules: GrammarRule[] = [
  {
    id: 'gr-present-simple-be',
    level: 'A1',
    title: 'Present Simple: am / is / are',
    titleMyanmar: 'am / is / are သုံးနည်း',
    titleMyanmarTh: 'วิธีใช้ am / is / are',
    explanationMyanmar:
      'ပစ္စုပ္ပန်ကာလမှာ တစ်စုံတစ်ယောက်ရဲ့အခြေအနေ၊ အလုပ်၊ နိုင်ငံ၊ တည်နေရာစတာတွေပြောတဲ့အခါ am / is / are သုံးတယ်။ I နဲ့ am တွဲတယ်၊ he/she/it (တစ်ဦးတည်း) နဲ့ is တွဲတယ်၊ you/we/they နဲ့ are တွဲတယ်။',
    explanationMyanmarTh: 'เมื่อต้องการพูดถึงสภาพ อาชีพ ประเทศ หรือที่อยู่ของบุคคลในปัจจุบัน ให้ใช้ am / is / are ประธาน I คู่กับ am ประธานเอกพจน์บุรุษที่สาม he / she / it คู่กับ is และประธาน you / we / they คู่กับ are',
    examples: [
      { english: 'I am a teacher.', myanmar: 'ကျွန်တော် ဆရာတစ်ယောက်ပါ။', myanmarTh: 'ผมเป็นครู', },
      { english: 'She is happy today.', myanmar: 'သူမ ဒီနေ့ ပျော်နေတယ်။', myanmarTh: 'เธอมีความสุขวันนี้', },
      { english: 'They are from Myanmar.', myanmar: 'သူတို့ မြန်မာနိုင်ငံကပါ။', myanmarTh: 'พวกเขามาจากเมียนมา', },
      { english: 'The cat is under the table.', myanmar: 'ကြောင်က စားပွဲအောက်မှာရှိတယ်။', myanmarTh: 'แมวอยู่ใต้โต๊ะ', },
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
    titleMyanmarTh: 'กิจวัตรประจำวัน',
    explanationMyanmar:
      'နေ့တိုင်းလုပ်တဲ့အလေ့အထ၊ ပုံမှန်လုပ်ရိုးလုပ်စဉ်တွေပြောတဲ့အခါ ကြိယာရဲ့အခြေခံပုံစံ (V1) ကိုသုံးတယ်။ I/you/we/they နဲ့တွဲရင် ကြိယာမပြောင်းဘူး။',
    explanationMyanmarTh: 'เมื่อพูดถึงกิจวัตรหรือนิสัยที่ทำเป็นประจำ ให้ใช้กริยารูปพื้นฐาน (V1) ประธาน I / you / we / they ไม่ต้องเปลี่ยนรูปกริยา',
    examples: [
      { english: 'I drink tea every morning.', myanmar: 'ကျွန်တော် မနက်တိုင်း လက်ဖက်ရည်သောက်တယ်။', myanmarTh: 'ผมดื่มชาทุกเช้า', },
      { english: 'They play football on Sundays.', myanmar: 'သူတို့ တနင်္ဂနွေနေ့တိုင်း ဘောလုံးကန်ကြတယ်။', myanmarTh: 'พวกเขาเล่นฟุตบอลทุกวันอาทิตย์', },
      { english: 'We go to school by bus.', myanmar: 'ငါတို့ ကျောင်းကို ဘတ်စ်ကားနဲ့သွားတယ်။', myanmarTh: 'พวกเราไปโรงเรียนโดยรถเมล์', },
      { english: 'You work very hard.', myanmar: 'မင်း အလုပ်အရမ်းကြိုးစားတယ်။', myanmarTh: 'คุณทำงานหนักมาก', },
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
    titleMyanmarTh: 'การเติม -s หลังกริยากับประธานเอกพจน์บุรุษที่สาม',
    explanationMyanmar:
      'he/she/it (တစ်ဦးတည်း) နဲ့တွဲတဲ့အခါ ကြိယာနောက်မှာ -s (သို့) -es ထည့်ရတယ်။ ဥပမာ work → works, watch → watches, study → studies။',
    explanationMyanmarTh: 'เมื่อประธานเป็นเอกพจน์บุรุษที่สาม he / she / it ต้องเติม -s หรือ -es ท้ายกริยา เช่น work → works watch → watches study → studies',
    examples: [
      { english: 'He reads books every night.', myanmar: 'သူ ညတိုင်း စာအုပ်ဖတ်တယ်။', myanmarTh: 'เขาอ่านหนังสือทุกคืน', },
      { english: 'My mother cooks delicious food.', myanmar: 'အမေက အရသာရှိတဲ့အစားအစာချက်တယ်။', myanmarTh: 'แม่ของผมทำอาหารอร่อย', },
      { english: 'The dog barks at night.', myanmar: 'ခွေးက ညမှာ ဟောင်တယ်။', myanmarTh: 'หมาเห่าตอนกลางคืน', },
      { english: 'It rains a lot in July.', myanmar: 'ဇူလိုင်လမှာ မိုးအရမ်းရွာတယ်။', myanmarTh: 'ฝนตกมากในเดือนกรกฎาคม', },
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
    titleMyanmarTh: 'กริยาวิเศษณ์บอกความถี่',
    explanationMyanmar:
      'always (အမြဲ), usually (အများအားဖြင့်), often (မကြာခဏ), sometimes (တစ်ခါတစ်ရံ), never (ဘယ်တော့မှ) စတာတွေက ဘယ်လောက်မကြာခဏလုပ်လဲပြတယ်။ ကြိယာအဓိကရဲ့ရှေ့မှာထားတယ်၊ ဒါပေမဲ့ am/is/are ရဲ့နောက်မှာထားတယ်။',
    explanationMyanmarTh: 'คำว่า always (เสมอ) usually (โดยปกติ) often (บ่อยๆ) sometimes (บางครั้ง) never (ไม่เคย) ใช้บอกความถี่ของการกระทำ วางไว้หน้ากริยาหลัก แต่ไว้หลังกริยา am / is / are',
    examples: [
      { english: 'I always brush my teeth.', myanmar: 'ကျွန်တော် သွားအမြဲတိုက်တယ်။', myanmarTh: 'ผมแปรงฟันเสมอ', },
      { english: 'She usually walks to work.', myanmar: 'သူမ အလုပ်ကို ခြေလျင်အများအားဖြင့်သွားတယ်။', myanmarTh: 'เธอมักเดินไปทำงาน', },
      { english: 'They are never late.', myanmar: 'သူတို့ ဘယ်တော့မှ နောက်မကျဘူး။', myanmarTh: 'พวกเขาไม่เคยสาย', },
      { english: 'We sometimes watch movies.', myanmar: 'ငါတို့ တစ်ခါတစ်ရံ ရုပ်ရှင်ကြည့်တယ်။', myanmarTh: 'พวกเราดูหนังบางครั้ง', },
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
    titleMyanmarTh: 'กาลปัจจุบันกำลังดำเนินอยู่',
    explanationMyanmar:
      'အခုလုပ်နေတဲ့အရာ၊ အခုဖြစ်နေတဲ့အရာပြောတဲ့အခါ am/is/are + ကြိယာ-ing သုံးတယ်။ ဥပမာ I am eating, she is sleeping။',
    explanationMyanmarTh: 'เมื่อพูดถึงสิ่งที่กำลังทำหรือกำลังเกิดขึ้นในขณะนี้ ให้ใช้ am / is / are + กริยาเติม -ing เช่น I am eating she is sleeping',
    examples: [
      { english: 'I am cooking dinner now.', myanmar: 'ကျွန်တော် အခု ညစာချက်နေတယ်။', myanmarTh: 'ผมกำลังทำอาหารเย็น', },
      { english: 'She is reading a book.', myanmar: 'သူမ စာအုပ်ဖတ်နေတယ်။', myanmarTh: 'เธอกำลังอ่านหนังสือ', },
      { english: 'The children are playing outside.', myanmar: 'ကလေးတွေ အပြင်မှာ ဆော့နေကြတယ်။', myanmarTh: 'เด็กๆ กำลังเล่นข้างนอก', },
      { english: 'It is raining.', myanmar: 'မိုးရွာနေတယ်။', myanmarTh: 'ฝนกำลังตก', },
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
    titleMyanmarTh: 'was / were ในอดีตกาล',
    explanationMyanmar:
      'အတိတ်ကာလအခြေအနေ၊ တည်နေရာပြောတဲ့အခါ was/were သုံးတယ်။ I/he/she/it နဲ့ was တွဲတယ်၊ you/we/they နဲ့ were တွဲတယ်။',
    explanationMyanmarTh: 'เมื่อพูดถึงสภาพหรือที่อยู่ในอดีต ให้ใช้ was / were ประธาน I / he / she / it คู่กับ was ประธาน you / we / they คู่กับ were',
    examples: [
      { english: 'I was tired yesterday.', myanmar: 'ကျွန်တော် မနေ့က ပင်ပန်းနေခဲ့တယ်။', myanmarTh: 'ผมเหนื่อยเมื่อวานนี้', },
      { english: 'They were at home last night.', myanmar: 'သူတို့ မနေ့ညက အိမ်မှာရှိခဲ့ကြတယ်။', myanmarTh: 'พวกเขาอยู่บ้านเมื่อคืนนี้', },
      { english: 'The weather was cold.', myanmar: 'ရာသီဥတုက အေးခဲ့တယ်။', myanmarTh: 'อากาศหนาว', },
      { english: 'We were students in 2020.', myanmar: 'ငါတို့ ၂၀၂၀ မှာ ကျောင်းသားတွေဖြစ်ခဲ့ကြတယ်။', myanmarTh: 'พวกเราเป็นนักเรียนในปี 2020', },
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
    titleMyanmarTh: 'รูปอดีตของกริยาปกติ',
    explanationMyanmar:
      'ပုံမှန်ကြိယာတွေရဲ့အတိတ်ပုံစံလုပ်ဖို့ နောက်မှာ -ed ထည့်တယ်။ ဥပမာ play → played, watch → watched, stop → stopped (အက္ခရာနှစ်ထပ်)။',
    explanationMyanmarTh: 'กริยาปกติทำรูปอดีตโดยเติม -ed ท้ายกริยา เช่น play → played watch → watched stop → stopped (ตัวสะกดซ้ำ)',
    examples: [
      { english: 'I watched a movie last night.', myanmar: 'ကျွန်တော် မနေ့ညက ရုပ်ရှင်ကြည့်ခဲ့တယ်။', myanmarTh: 'ผมดูหนังเมื่อคืนนี้', },
      { english: 'She cleaned her room.', myanmar: 'သူမ သူ့အခန်းသန့်ရှင်းရေးလုပ်ခဲ့တယ်။', myanmarTh: 'เธอทำความสะอาดห้อง', },
      { english: 'We played chess yesterday.', myanmar: 'ငါတို့ မနေ့က စစ်တုရင်ကစားခဲ့ကြတယ်။', myanmarTh: 'พวกเราเล่นหมากรุกเมื่อวานนี้', },
      { english: 'He stopped the car.', myanmar: 'သူ ကားရပ်ခဲ့တယ်။', myanmarTh: 'เขาหยุดรถ', },
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
    titleMyanmarTh: 'รูปอดีตของกริยาอปกติ',
    explanationMyanmar:
      'မမှန်ကြိယာတွေက -ed မထည့်ဘူး၊ ပုံစံလုံးဝပြောင်းသွားတယ်။ go → went, eat → ate, buy → bought, see → saw စတာတွေကို အလွတ်မှတ်ထားရမယ်။',
    explanationMyanmarTh: 'กริยาอปกติไม่เติม -ed แต่เปลี่ยนรูปไปเลย เช่น go → went eat → ate buy → bought see → saw ต้องจำรูปเหล่านี้ให้ได้',
    examples: [
      { english: 'I went to the market.', myanmar: 'ကျွန်တော် ဈေးသွားခဲ့တယ်။', myanmarTh: 'ผมไปตลาด', },
      { english: 'She ate noodles for lunch.', myanmar: 'သူမ နေ့လည်စာကို ခေါက်ဆွဲစားခဲ့တယ်။', myanmarTh: 'เธอกินก๋วยเตี๋ยวตอนเที่ยง', },
      { english: 'They bought new shoes.', myanmar: 'သူတို့ ဖိနပ်အသစ်ဝယ်ခဲ့ကြတယ်။', myanmarTh: 'พวกเขาซื้อรองเท้าใหม่', },
      { english: 'He wrote a letter.', myanmar: 'သူ စာတစ်စောင်ရေးခဲ့တယ်။', myanmarTh: 'เขาเขียนจดหมาย', },
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
    titleMyanmarTh: 'วิธีใช้ a / an',
    explanationMyanmar:
      'ရေတွက်လို့ရတဲ့တစ်ခုတည်းနာမ်ရဲ့ရှေ့မှာ a သို့ an သုံးတယ်။ ဗျည်းသံနဲ့စရင် a (a book), သရသံနဲ့စရင် an (an apple)။ အရင်ကမပြောဖူးတဲ့အရာအသစ်မိတ်ဆက်တဲ့အခါသုံးတယ်။',
    explanationMyanmarTh: 'หน้าคำนามนับได้เอกพจน์ให้ใช้ a หรือ an ขึ้นต้นด้วยเสียงพยัญชนะใช้ a (a book) ขึ้นต้นด้วยเสียงสระใช้ an (an apple) ใช้เมื่อกล่าวถึงสิ่งนั้นเป็นครั้งแรก',
    examples: [
      { english: 'I saw a dog.', myanmar: 'ကျွန်တော် ခွေးတစ်ကောင်တွေ့ခဲ့တယ်။', myanmarTh: 'ผมเห็นหมาตัวหนึ่ง', },
      { english: 'She is an engineer.', myanmar: 'သူမ အင်ဂျင်နီယာတစ်ယောက်ပါ။', myanmarTh: 'เธอเป็นวิศวกร', },
      { english: 'He bought an apple.', myanmar: 'သူ ပန်းသီးတစ်လုံးဝယ်ခဲ့တယ်။', myanmarTh: 'เขาซื้อแอปเปิลลูกหนึ่ง', },
      { english: 'We need a taxi.', myanmar: 'ငါတို့ တက္ကစီတစ်စီးလိုတယ်။', myanmarTh: 'พวกเราต้องการแท็กซี่', },
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
    titleMyanmarTh: 'การทำคำนามให้เป็นพหูพจน์',
    explanationMyanmar:
      'တစ်ခုထက်ပိုရင် နာမ်နောက်မှာ -s ထည့်တယ် (cats)။ s/sh/ch/x နဲ့ဆုံးရင် -es (boxes)၊ ဗျည်း + y နဲ့ဆုံးရင် y ကို i ပြောင်း + es (baby → babies)။',
    explanationMyanmarTh: 'เมื่อมีมากกว่าหนึ่งให้เติม -s ท้ายคำนาม (cats) ลงท้ายด้วย s / sh / ch / x เติม -es (boxes) ลงท้ายด้วยพยัญชนะ + y เปลี่ยน y เป็น i แล้วเติม -es (baby → babies)',
    examples: [
      { english: 'Two cats are sleeping.', myanmar: 'ကြောင်နှစ်ကောင် အိပ်နေကြတယ်။', myanmarTh: 'แมวสองตัวกำลังนอน', },
      { english: 'I have three boxes.', myanmar: 'ကျွန်တော့်မှာ သေတ္တာသုံးလုံးရှိတယ်။', myanmarTh: 'ผมมีกล่องสามใบ', },
      { english: 'The babies are crying.', myanmar: 'ကလေးငယ်တွေ ငိုနေကြတယ်။', myanmarTh: 'ทารกกำลังร้องไห้', },
      { english: 'She bought five mangoes.', myanmar: 'သူမ သရက်သီးငါးလုံးဝယ်ခဲ့တယ်။', myanmarTh: 'เธอซื้อมะม่วงห้าลูก', },
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
    titleMyanmarTh: 'วิธีใช้ can / cannot',
    explanationMyanmar:
      'လုပ်နိုင်စွမ်း၊ ခွင့်ပြုချက်ပြောတဲ့အခါ can + ကြိယာအခြေခံပုံစံသုံးတယ်။ အနုတ်က can\'t (cannot)။ can နောက်မှာ to မထည့်ရဘူး။',
    explanationMyanmarTh: 'เมื่อพูดถึงความสามารถหรือการอนุญาต ให้ใช้ can + กริยารูปพื้นฐาน รูปปฏิเสธคือ cannot (ย่อว่า can not) หลัง can ห้ามใส่ to',
    examples: [
      { english: 'I can swim.', myanmar: 'ကျွန်တော် ရေကူးတတ်တယ်။', myanmarTh: 'ผมว่ายน้ำได้', },
      { english: 'She can\'t drive.', myanmar: 'သူမ ကားမောင်းတတ်ဘူး။', myanmarTh: 'เธอขับรถไม่ได้', },
      { english: 'Can you help me?', myanmar: 'မင်း ငါ့ကိုကူညီနိုင်မလား။', myanmarTh: 'คุณช่วยผมได้ไหม', },
      { english: 'They can speak English.', myanmar: 'သူတို့ အင်္ဂလိပ်စကားပြောတတ်ကြတယ်။', myanmarTh: 'พวกเขาพูดภาษาอังกฤษได้', },
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
    titleMyanmarTh: 'บุพบทบอกเวลา in / on / at',
    explanationMyanmar:
      'in = လ၊ နှစ်၊ ရာသီ (in July, in 2025)၊ on = ရက်၊ နေ့ (on Monday, on May 1st)၊ at = အချိန်အတိအကျ (at 7 o\'clock, at night)။',
    explanationMyanmarTh: 'in ใช้กับเดือน ปี ฤดูกาล (in July in 2025) on ใช้กับวันและวันที่ (on Monday on May 1st) at ใช้กับเวลาที่เจาะจง (at 7 o clock at night)',
    examples: [
      { english: 'My birthday is in June.', myanmar: 'ကျွန်တော့်မွေးနေ့က ဇွန်လမှာပါ။', myanmarTh: 'วันเกิดของผมอยู่ในเดือนมิถุนายน', },
      { english: 'We meet on Friday.', myanmar: 'ငါတို့ သောကြာနေ့မှာ တွေ့ကြမယ်။', myanmarTh: 'พวกเราเจอกันวันศุกร์', },
      { english: 'The class starts at 9 am.', myanmar: 'အတန်းက မနက် ၉ နာရီမှာစတယ်။', myanmarTh: 'ชั้นเรียนเริ่มตอนเก้าโมงเช้า', },
      { english: 'She was born on March 3rd.', myanmar: 'သူမ မတ် ၃ ရက်နေ့မှာ မွေးခဲ့တယ်။', myanmarTh: 'เธอเกิดวันที่ 3 มีนาคม', },
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
    titleMyanmarTh: 'บุพบทบอกสถานที่ in / on / at',
    explanationMyanmar:
      'in = အထဲ၊ ဧရိယာအကြီး (in the box, in Yangon)၊ on = မျက်နှာပြင်ပေါ် (on the table)၊ at = နေရာအတိအကျ (at the bus stop)။',
    explanationMyanmarTh: 'in ใช้กับข้างในหรือพื้นที่ใหญ่ (in the box in Yangon) on ใช้กับพื้นผิว (on the table) at ใช้กับจุดที่เจาะจง (at the bus station)',
    examples: [
      { english: 'The keys are in my bag.', myanmar: 'သော့တွေက ကျွန်တော့်အိတ်ထဲမှာပါ။', myanmarTh: 'กุญแจอยู่ในกระเป๋าของผม', },
      { english: 'The book is on the desk.', myanmar: 'စာအုပ်က စားပွဲပေါ်မှာပါ။', myanmarTh: 'หนังสืออยู่บนโต๊ะ', },
      { english: 'He is waiting at the station.', myanmar: 'သူ ဘူတာမှာ စောင့်နေတယ်။', myanmarTh: 'เขากำลังรอที่สถานี', },
      { english: 'They live in Mandalay.', myanmar: 'သူတို့ မန္တလေးမှာနေကြတယ်။', myanmarTh: 'พวกเขาอาศัยในมัณฑะเลย์', },
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
    titleMyanmarTh: 'คำถาม Wh-',
    explanationMyanmar:
      'what, where, when, who, why, how စတာတွေနဲ့ မေးခွန်းစတယ်။ ပစ္စုပ္ပန်မေးခွန်းမှာ do/does ကို အကြောင်းအရာနောက်မှာထည့်တယ် (Where do you live?)။',
    explanationMyanmarTh: 'คำถามที่ขึ้นต้นด้วย what where when who why how ในคำถามปัจจุบันกาลให้ใส่ do / does หลังประธาน เช่น Where do you live?',
    examples: [
      { english: 'What is your name?', myanmar: 'မင်းနာမည်က ဘာလဲ။', myanmarTh: 'คุณชื่ออะไร', },
      { english: 'Where do you live?', myanmar: 'မင်း ဘယ်မှာနေလဲ။', myanmarTh: 'คุณอยู่ที่ไหน', },
      { english: 'When does the shop open?', myanmar: 'ဆိုင်က ဘယ်အချိန်ဖွင့်လဲ။', myanmarTh: 'ร้านเปิดเมื่อไหร่', },
      { english: 'Why are you crying?', myanmar: 'မင်း ဘာလို့ငိုနေတာလဲ။', myanmarTh: 'ทำไมคุณร้องไห้', },
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
    titleMyanmarTh: 'คำถาม Yes / No และการตอบสั้นๆ',
    explanationMyanmar:
      'Do/Does/Did, Am/Is/Are, Can တို့နဲ့ မေးခွန်းစပြီး Yes/No နဲ့ဖြေတယ်။ အဖြေတိုမှာ ကြိယာအကူကို ထပ်သုံးရတယ် (Yes, I do. / No, she isn\'t.)။',
    explanationMyanmarTh: 'คำถามที่ขึ้นต้นด้วย Do / Does / Did Am / Is / Are Can ตอบด้วย Yes / No ในการตอบสั้นๆ ให้ใช้กริยาช่วยซ้ำ เช่น Yes I do / No she is not',
    examples: [
      { english: 'Do you like coffee? — Yes, I do.', myanmar: 'မင်း ကော်ဖီကြိုက်လား။ — ကြိုက်တယ်။', myanmarTh: 'คุณชอบกาแฟไหม — ชอบ', },
      { english: 'Is she a doctor? — No, she isn\'t.', myanmar: 'သူမ ဆရာဝန်လား။ — မဟုတ်ဘူး။', myanmarTh: 'เธอเป็นหมอใช่ไหม — ไม่ใช่', },
      { english: 'Did it rain? — Yes, it did.', myanmar: 'မိုးရွာခဲ့လား။ — ရွာခဲ့တယ်။', myanmarTh: 'ฝนตกไหม — ตก', },
      { english: 'Can they swim? — No, they can\'t.', myanmar: 'သူတို့ ရေကူးတတ်လား။ — မတတ်ဘူး။', myanmarTh: 'พวกเขาว่ายน้ำได้ไหม — ไม่ได้', },
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
    titleMyanmarTh: 'ประโยคปฏิเสธ',
    explanationMyanmar:
      'ကြိယာအကူ (do/does/did/am/is/are/can) နောက်မှာ not ထည့်တယ်။ အတိုကောက်ပုံစံတွေ သုံးလေ့ရှိတယ် — don\'t, doesn\'t, didn\'t, isn\'t, can\'t။',
    explanationMyanmarTh: 'ทำประโยคปฏิเสธโดยใส่ not หลังกริยาช่วย (do / does / did / am / is / are / can) นิยมใช้รูปย่อ เช่น do not does not did not is not can not',
    examples: [
      { english: 'I don\'t eat meat.', myanmar: 'ကျွန်တော် အသားမစားဘူး။', myanmarTh: 'ผมไม่กินเนื้อ', },
      { english: 'She doesn\'t watch TV.', myanmar: 'သူမ တီဗွီမကြည့်ဘူး။', myanmarTh: 'เธอไม่ดูทีวี', },
      { english: 'They didn\'t come.', myanmar: 'သူတို့ မလာခဲ့ကြဘူး။', myanmarTh: 'พวกเขาไม่ได้มา', },
      { english: 'He isn\'t busy.', myanmar: 'သူ အလုပ်မရှုပ်ဘူး။', myanmarTh: 'เขาไม่ยุ่ง', },
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
    titleMyanmarTh: 'There is / There are',
    explanationMyanmar:
      'တစ်နေရာမှာ တစ်ခုခုရှိတယ်ပြောတဲ့အခါ there is (တစ်ခုတည်း) / there are (အများအပြား) သုံးတယ်။ အနုတ်က there isn\'t / there aren\'t။',
    explanationMyanmarTh: 'เมื่อต้องการบอกว่ามีสิ่งใดอยู่ที่ใด ให้ใช้ there is (เอกพจน์) / there are (พหูพจน์) รูปปฏิเสธคือ there is not / there are not',
    examples: [
      { english: 'There is a book on the table.', myanmar: 'စားပွဲပေါ်မှာ စာအုပ်တစ်အုပ်ရှိတယ်။', myanmarTh: 'มีหนังสือบนโต๊ะ', },
      { english: 'There are many people here.', myanmar: 'ဒီမှာ လူအများကြီးရှိတယ်။', myanmarTh: 'มีคนมากมายที่นี่', },
      { english: 'There isn\'t any milk.', myanmar: 'နို့မရှိဘူး။', myanmarTh: 'ไม่มีนม', },
      { english: 'Are there any shops nearby?', myanmar: 'အနီးမှာ ဆိုင်တွေရှိလား။', myanmarTh: 'มีร้านค้าใกล้ๆ ไหม', },
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
    titleMyanmarTh: 'การแสดงความเป็นเจ้าของ (s ต่อท้าย)',
    explanationMyanmar:
      'ပိုင်ဆိုင်မှုပြဖို့ နာမ်နောက်မှာ \'s ထည့်တယ် (the girl\'s bag = မိန်းကလေးရဲ့အိတ်)။ အများကိန်းနာမ်ဆိုရင် \' ပဲထည့်တယ် (the boys\' room)။',
    explanationMyanmarTh: 'แสดงความเป็นเจ้าของโดยเติม s ต่อท้ายคำนาม (the girl s bag = กระเป๋าของเด็กผู้หญิง) คำนามพหูพจน์เติมแค่ (the boys room)',
    examples: [
      { english: 'This is Aung\'s pen.', myanmar: 'ဒါက အောင်ရဲ့ဘောပင်ပါ။', myanmarTh: 'นี่คือปากกาของออง', },
      { english: 'The cat\'s tail is long.', myanmar: 'ကြောင်ရဲ့အမြီးက ရှည်တယ်။', myanmarTh: 'หางแมวยาว', },
      { english: 'My parents\' house is big.', myanmar: 'အဖေအမေတို့ရဲ့အိမ်က ကြီးတယ်။', myanmarTh: 'บ้านของพ่อแม่ผมใหญ่', },
      { english: 'The students\' books are new.', myanmar: 'ကျောင်းသားတွေရဲ့စာအုပ်တွေက အသစ်တွေပါ။', myanmarTh: 'หนังสือของนักเรียนใหม่', },
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
    titleMyanmarTh: 'คำคุณศัพท์และคำสรรพนามแสดงความเป็นเจ้าของ',
    explanationMyanmar:
      'my/your/his/her/its/our/their က နာမ်ရဲ့ရှေ့မှာသုံး (my book)။ mine/yours/his/hers/ours/theirs က နာမ်မပါဘဲ တစ်ယောက်တည်းသုံး (The book is mine.)။',
    explanationMyanmarTh: 'my / your / his / her / its / our / their ใช้หน้าคำนาม (my book) ส่วน mine / yours / his / hers / ours / theirs ใช้โดดๆ ไม่ต้องมีคำนามตาม (The book is mine)',
    examples: [
      { english: 'This is my phone.', myanmar: 'ဒါက ကျွန်တော့်ဖုန်းပါ။', myanmarTh: 'นี่คือโทรศัพท์ของผม', },
      { english: 'The red bag is hers.', myanmar: 'အနီရောင်အိတ်က သူမရဲ့ဟာပါ။', myanmarTh: 'กระเป๋าสีแดงเป็นของเธอ', },
      { english: 'Our house is near the river.', myanmar: 'ငါတို့အိမ်က မြစ်နားမှာပါ။', myanmarTh: 'บ้านของพวกเราอยู่ใกล้แม่น้ำ', },
      { english: 'Is this pen yours?', myanmar: 'ဒီဘောပင်က မင်းရဲ့ဟာလား။', myanmarTh: 'ปากกานี้เป็นของคุณใช่ไหม', },
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
    titleMyanmarTh: 'คำสรรพนามชี้เฉพาะ',
    explanationMyanmar:
      'this/these = အနီးက (တစ်ခုတည်း/အများအပြား)၊ that/those = အဝေးက (တစ်ခုတည်း/အများအပြား)။',
    explanationMyanmarTh: 'this / these ใช้กับสิ่งที่อยู่ใกล้ (เอกพจน์ / พหูพจน์) that / those ใช้กับสิ่งที่อยู่ไกล (เอกพจน์ / พหูพจน์)',
    examples: [
      { english: 'This mango is sweet.', myanmar: 'ဒီသရက်သီးက ချိုတယ်။', myanmarTh: 'มะม่วงลูกนี้หวาน', },
      { english: 'That building is a hospital.', myanmar: 'ဟိုအဆောက်အအုံက ဆေးရုံပါ။', myanmarTh: 'ตึกนั้นคือโรงพยาบาล', },
      { english: 'These shoes are new.', myanmar: 'ဒီဖိနပ်တွေက အသစ်တွေပါ။', myanmarTh: 'รองเท้าเหล่านี้ใหม่', },
      { english: 'Those birds are beautiful.', myanmar: 'ဟိုငှက်တွေက လှတယ်။', myanmarTh: 'นกเหล่านั้นสวย', },
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
    titleMyanmarTh: 'ประโยคคำสั่ง',
    explanationMyanmar:
      'အမိန့်၊ ညွှန်ကြားချက်၊ တောင်းဆိုချက်ပေးတဲ့အခါ ကြိယာအခြေခံပုံစံနဲ့စတယ်။ အနုတ်က Don\'t + ကြိယာသုံးတယ်။',
    explanationMyanmarTh: 'ประโยคคำสั่ง คำแนะนำ คำขอร้อง ให้ขึ้นต้นด้วยกริยารูปพื้นฐาน รูปปฏิเสธใช้ Do not + กริยา',
    examples: [
      { english: 'Open the door, please.', myanmar: 'တံခါးဖွင့်ပေးပါ။', myanmarTh: 'กรุณาเปิดประตู', },
      { english: 'Sit down.', myanmar: 'ထိုင်ပါ။', myanmarTh: 'นั่งลง', },
      { english: 'Don\'t touch that.', myanmar: 'ဟိုဟာကို မထိနဲ့။', myanmarTh: 'อย่าแตะต้องสิ่งนั้น', },
      { english: 'Please be quiet.', myanmar: 'တိတ်တိတ်နေပေးပါ။', myanmarTh: 'กรุณาเงียบ', },
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
    titleMyanmarTh: 'วิธีใช้ some / any',
    explanationMyanmar:
      'some က အတည်ပြုဝါကျတွေမှာသုံး (I have some apples.)၊ any က အနုတ်နဲ့မေးခွန်းတွေမှာသုံး (I don\'t have any apples. / Do you have any apples?)။',
    explanationMyanmarTh: 'some ใช้ในประโยคบอกเล่า (I have some apples) any ใช้ในประโยคปฏิเสธและคำถาม (I do not have any apples / Do you have any apples?)',
    examples: [
      { english: 'I have some friends in Japan.', myanmar: 'ကျွန်တော့်မှာ ဂျပန်မှာ သူငယ်ချင်းတွေရှိတယ်။', myanmarTh: 'ผมมีเพื่อนบางคนในญี่ปุ่น', },
      { english: 'She doesn\'t have any money.', myanmar: 'သူမမှာ ပိုက်ဆံမရှိဘူး။', myanmarTh: 'เธอไม่มีเงิน', },
      { english: 'Do you want some tea?', myanmar: 'လက်ဖက်ရည်သောက်ချင်လား။', myanmarTh: 'คุณต้องการชาไหม', },
      { english: 'There aren\'t any eggs.', myanmar: 'ကြက်ဥမရှိဘူး။', myanmarTh: 'ไม่มีไข่', },
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
    titleMyanmarTh: 'บุพบทพื้นฐาน to / from / with / for',
    explanationMyanmar:
      'to = ...ဆီသို့၊ from = ...မှ/ဆီက၊ with = ...နှင့်အတူ၊ for = ...အတွက်။',
    explanationMyanmarTh: 'to = ไปยัง from = จาก with = กับ for = สำหรับ',
    examples: [
      { english: 'She goes to school by bus.', myanmar: 'သူမ ကျောင်းကို ဘတ်စ်ကားနဲ့သွားတယ်။', myanmarTh: 'เธอไปโรงเรียนโดยรถเมล์', },
      { english: 'This gift is from my sister.', myanmar: 'ဒီလက်ဆောင်က အစ်မဆီကပါ။', myanmarTh: 'ของขวัญนี้จากพี่สาวของผม', },
      { english: 'I went with my friend.', myanmar: 'ကျွန်တော် သူငယ်ချင်းနဲ့အတူသွားခဲ့တယ်။', myanmarTh: 'ผมไปกับเพื่อน', },
      { english: 'This cake is for you.', myanmar: 'ဒီကိတ်မုန့်က မင်းအတွက်ပါ။', myanmarTh: 'เค้กนี้สำหรับคุณ', },
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
    titleMyanmarTh: 'like / love / hate ตามด้วยกริยาเติม -ing',
    explanationMyanmar:
      'like, love, hate, enjoy နောက်မှာ ကြိယာ-ing ပုံစံလိုက်ရတယ်။ ဥပမာ I like swimming (ရေကူးရတာကြိုက်တယ်)။',
    explanationMyanmarTh: 'หลัง like love hate enjoy ต้องตามด้วยกริยาเติม -ing เช่น I like swimming (ผมชอบว่ายน้ำ)',
    examples: [
      { english: 'I like reading novels.', myanmar: 'ကျွန်တော် ဝတ္ထုဖတ်ရတာကြိုက်တယ်။', myanmarTh: 'ผมชอบอ่านนิยาย', },
      { english: 'She loves dancing.', myanmar: 'သူမ အကရတာကြိုက်တယ်။', myanmarTh: 'เธอชอบเต้นรำ', },
      { english: 'They hate waiting.', myanmar: 'သူတို့ စောင့်ရတာမုန်းကြတယ်။', myanmarTh: 'พวกเขาเกลียดการรอคอย', },
      { english: 'We enjoy cooking together.', myanmar: 'ငါတို့ အတူတူချက်ပြုတ်ရတာပျော်တယ်။', myanmarTh: 'พวกเราชอบทำอาหารด้วยกัน', },
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
    titleMyanmarTh: 'คำสรรพนามที่เป็นกรรม',
    explanationMyanmar:
      'ကြိယာ (သို့) ဝိဘတ်နောက်မှာ me/you/him/her/it/us/them သုံးတယ်။ I → me, he → him, she → her, they → them စသဖြင့် ပြောင်းတယ်။',
    explanationMyanmarTh: 'หลังกริยาหรือบุพบทให้ใช้ me / you / him / her / it / us / them โดยเปลี่ยนรูปจากประธาน เช่น I → me he → him she → her they → them',
    examples: [
      { english: 'Please help me.', myanmar: 'ကျွန်တော့်ကို ကူညီပေးပါ။', myanmarTh: 'กรุณาช่วยผม', },
      { english: 'I saw him yesterday.', myanmar: 'ကျွန်တော် သူ့ကို မနေ့ကတွေ့ခဲ့တယ်။', myanmarTh: 'ผมเห็นเขาเมื่อวานนี้', },
      { english: 'She loves them very much.', myanmar: 'သူမ သူတို့ကို အရမ်းချစ်တယ်။', myanmarTh: 'เธอรักพวกเขามาก', },
      { english: 'Give it to us.', myanmar: 'အဲဒါကို ငါတို့ပေးပါ။', myanmarTh: 'ให้มันแก่พวกเรา', },
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
    titleMyanmarTh: 'Present Continuous สำหรับแผนในอนาคต',
    explanationMyanmar:
      'စီစဉ်ပြီးသား၊ သေချာပြီးသားအနာဂတ်အစီအစဉ်တွေအတွက် am/is/are + V-ing သုံးတယ်။ အချိန်စကားလုံး (tomorrow, tonight, next week) ပါလေ့ရှိတယ်။',
    explanationMyanmarTh: 'แผนในอนาคตที่วางไว้แน่นอนแล้วให้ใช้ am / is / are + กริยาเติม -ing มักมีคำบอกเวลากำกับ เช่น tomorrow tonight next week',
    examples: [
      { english: 'I am meeting my friend tomorrow.', myanmar: 'ကျွန်တော် မနက်ဖြန် သူငယ်ချင်းနဲ့တွေ့မယ်။', myanmarTh: 'ผมจะพบเพื่อนพรุ่งนี้', },
      { english: 'She is flying to Bangkok on Monday.', myanmar: 'သူမ တနင်္လာနေ့ ဘန်ကောက်ကို ပျံသန်းမယ်။', myanmarTh: 'เธอกำลังจะบินไปกรุงเทพฯ วันจันทร์', },
      { english: 'We are having a party tonight.', myanmar: 'ငါတို့ ဒီည ပါတီလုပ်မယ်။', myanmarTh: 'พวกเราจะจัดงานเลี้ยงคืนนี้', },
      { english: 'They are moving to a new house next week.', myanmar: 'သူတို့ နောက်အပတ် အိမ်အသစ်ပြောင်းမယ်။', myanmarTh: 'พวกเขาจะย้ายบ้านใหม่สัปดาห์หน้า', },
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
    titleMyanmarTh: 'อดีตกาลกำลังดำเนินอยู่',
    explanationMyanmar:
      'အတိတ်မှာ လုပ်နေဆဲဖြစ်တဲ့အရာအတွက် was/were + V-ing သုံးတယ်။ တစ်ခုခုဖြစ်နေတုန်း နောက်တစ်ခုဝင်လာတဲ့အခါ၊ နောက်ခံအခြေအနေပြောတဲ့အခါ သုံးတယ်။',
    explanationMyanmarTh: 'สิ่งที่กำลังดำเนินอยู่ในอดีตให้ใช้ was / were + กริยาเติม -ing ใช้เล่าเหตุการณ์ที่เกิดค้างอยู่เมื่อมีอีกเหตุการณ์แทรกเข้ามา หรือเล่าฉากหลังของเรื่อง',
    examples: [
      { english: 'I was sleeping at 10 pm.', myanmar: 'ကျွန်တော် ည ၁၀ နာရီမှာ အိပ်နေခဲ့တယ်။', myanmarTh: 'ผมนอนตอนสี่ทุ่ม', },
      { english: 'They were playing when it rained.', myanmar: 'မိုးရွာတုန်းက သူတို့ ဆော့နေခဲ့ကြတယ်။', myanmarTh: 'พวกเขากำลังเล่นตอนฝนตก', },
      { english: 'She was cooking while he was reading.', myanmar: 'သူစာဖတ်နေတုန်း သူမချက်ပြုတ်နေခဲ့တယ်။', myanmarTh: 'เธอกำลังทำอาหารขณะที่เขากำลังอ่านหนังสือ', },
      { english: 'We were waiting for the bus.', myanmar: 'ငါတို့ ဘတ်စ်ကားစောင့်နေခဲ့ကြတယ်။', myanmarTh: 'พวกเรากำลังรอรถเมล์', },
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
    titleMyanmarTh: 'Present Perfect เบื้องต้น',
    explanationMyanmar:
      'အတိတ်မှာဖြစ်ခဲ့ပေမယ့် အခုနဲ့ဆက်စပ်နေတဲ့အရာ၊ အတွေ့အကြုံ၊ အခုပဲပြီးတဲ့အရာတွေအတွက် have/has + V3 သုံးတယ်။',
    explanationMyanmarTh: 'เหตุการณ์ในอดีตที่ยังเชื่อมโยงกับปัจจุบัน ประสบการณ์ หรือสิ่งที่เพิ่งเสร็จให้ใช้ have / has + กริยาช่อง 3',
    examples: [
      { english: 'I have finished my work.', myanmar: 'ကျွန်တော် အလုပ်ပြီးပြီ။', myanmarTh: 'ผมทำงานเสร็จแล้ว', },
      { english: 'She has visited Japan twice.', myanmar: 'သူမ ဂျပန်ကို နှစ်ခါသွားဖူးတယ်။', myanmarTh: 'เธอเคยไปญี่ปุ่นสองครั้ง', },
      { english: 'We have just arrived.', myanmar: 'ငါတို့ အခုပဲရောက်တယ်။', myanmarTh: 'พวกเราเพิ่งมาถึง', },
      { english: 'He has lost his keys.', myanmar: 'သူ သော့ပျောက်သွားပြီ။', myanmarTh: 'เขาทำกุญแจหาย', },
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
    titleMyanmarTh: 'อนาคตกาลด้วย will',
    explanationMyanmar:
      'စကားပြောနေတုန်းမှ ဆုံးဖြတ်တဲ့အရာ၊ ကတိ၊ ခန့်မှန်းချက်တွေအတွက် will + V1 သုံးတယ်။ အနုတ်က won\'t (will not)။',
    explanationMyanmarTh: 'การตัดสินใจในขณะพูด คำสัญญา การคาดการณ์ ให้ใช้ will + กริยารูปพื้นฐาน รูปปฏิเสธคือ will not (ย่อว่า wo not)',
    examples: [
      { english: 'I will help you.', myanmar: 'ကျွန်တော် မင်းကိုကူညီမယ်။', myanmarTh: 'ผมจะช่วยคุณ', },
      { english: 'It will rain tomorrow.', myanmar: 'မနက်ဖြန် မိုးရွာမယ်။', myanmarTh: 'พรุ่งนี้ฝนจะตก', },
      { english: 'She will be twenty next year.', myanmar: 'သူမ နောက်နှစ် အသက် ၂၀ ပြည့်မယ်။', myanmarTh: 'ปีหน้าเธออายุยี่สิบ', },
      { english: 'We won\'t be late.', myanmar: 'ငါတို့ နောက်ကျမှာမဟုတ်ဘူး။', myanmarTh: 'พวกเราจะไม่สาย', },
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
    titleMyanmarTh: 'อนาคตกาลด้วย going to',
    explanationMyanmar:
      'ကြိုတင်စီစဉ်ထားတဲ့အစီအစဉ်၊ မျက်မြင်လက္ခဏာပေါ်အခြေခံတဲ့ခန့်မှန်းချက်အတွက် be + going to + V1 သုံးတယ်။',
    explanationMyanmarTh: 'แผนที่วางไว้ล่วงหน้า และการคาดการณ์จากสิ่งที่เห็น ให้ใช้ be + going to + กริยารูปพื้นฐาน',
    examples: [
      { english: 'I am going to study tonight.', myanmar: 'ကျွန်တော် ဒီည စာကျက်မယ်။', myanmarTh: 'ผมจะเรียนคืนนี้', },
      { english: 'Look at those clouds! It is going to rain.', myanmar: 'တိမ်တွေကြည့်။ မိုးရွာတော့မယ်။', myanmarTh: 'ดูเมฆนั่นสิ ฝนกำลังจะตก', },
      { english: 'They are going to buy a car.', myanmar: 'သူတို့ ကားဝယ်တော့မယ်။', myanmarTh: 'พวกเขาจะซื้อรถ', },
      { english: 'She is going to be a doctor.', myanmar: 'သူမ ဆရာဝန်ဖြစ်တော့မယ်။', myanmarTh: 'เธอจะเป็นหมอ', },
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
    titleMyanmarTh: 'วิธีใช้ the',
    explanationMyanmar:
      'နှစ်ဦးစလုံးသိတဲ့အရာ၊ အရင်ကပြောပြီးသားအရာ၊ ကမ္ဘာမှာတစ်ခုတည်းရှိတဲ့အရာ (the sun, the moon) တို့ရဲ့ရှေ့မှာ the သုံးတယ်။',
    explanationMyanmarTh: 'หน้าสิ่งที่ทั้งผู้พูดและผู้ฟังรู้จัก สิ่งที่กล่าวถึงแล้ว หรือสิ่งที่มีหนึ่งเดียวในโลก (the sun the moon) ให้ใช้ the',
    examples: [
      { english: 'The book on the table is mine.', myanmar: 'စားပွဲပေါ်ကစာအုပ်က ကျွန်တော့်ဟာပါ။', myanmarTh: 'หนังสือบนโต๊ะเป็นของผม', },
      { english: 'I saw a dog. The dog was big.', myanmar: 'ခွေးတစ်ကောင်တွေ့ခဲ့တယ်။ အဲဒီခွေးက ကြီးတယ်။', myanmarTh: 'ผมเห็นหมา หมาตัวนั้นตัวใหญ่', },
      { english: 'The sun is hot.', myanmar: 'နေက ပူတယ်။', myanmarTh: 'พระอาทิตย์ร้อน', },
      { english: 'She went to the market.', myanmar: 'သူမ ဈေးသွားခဲ့တယ်။', myanmarTh: 'เธอไปตลาด', },
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
    titleMyanmarTh: 'คำนามนับได้และคำนามนับไม่ได้',
    explanationMyanmar:
      'ရေတွက်ရတဲ့နာမ် (apple → apples) က အများကိန်းလုပ်လို့ရတယ်။ ရေတွက်မရတဲ့နာမ် (water, rice, money, information) က အမြဲတစ်ခုတည်းပုံစံပဲသုံး၊ a/an မထည့်ရဘူး။',
    explanationMyanmarTh: 'คำนามนับได้ (apple → apples) ทำเป็นพหูพจน์ได้ คำนามนับไม่ได้ (water rice money information) ใช้รูปเอกพจน์เสมอ ห้ามใส่ a / an',
    examples: [
      { english: 'I bought three apples.', myanmar: 'ကျွန်တော် ပန်းသီးသုံးလုံးဝယ်ခဲ့တယ်။', myanmarTh: 'ผมซื้อแอปเปิลสามลูก', },
      { english: 'There is some rice on the plate.', myanmar: 'ပန်းကန်ထဲမှာ ထမင်းနည်းနည်းရှိတယ်။', myanmarTh: 'มีข้าวบนจาน', },
      { english: 'She drinks a lot of water.', myanmar: 'သူမ ရေအများကြီးသောက်တယ်။', myanmarTh: 'เธอดื่มน้ำมาก', },
      { english: 'Money doesn\'t grow on trees.', myanmar: 'ပိုက်ဆံက သစ်ပင်ပေါ်မပေါက်ဘူး။', myanmarTh: 'เงินไม่ได้งอกบนต้นไม้', },
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
    titleMyanmarTh: 'much / many / a lot of',
    explanationMyanmar:
      'many = ရေတွက်ရတဲ့နာမ်အများနဲ့သုံး (many books)၊ much = ရေတွက်မရတဲ့နာမ်နဲ့သုံး (much time) — နှစ်ခုလုံး အနုတ်နဲ့မေးခွန်းမှာသုံးလေ့ရှိ။ a lot of = နှစ်မျိုးလုံးနဲ့ရတယ်။',
    explanationMyanmarTh: 'many ใช้กับคำนามนับได้พหูพจน์ (many books) much ใช้กับคำนามนับไม่ได้ (much time) ทั้งคู่มักใช้ในประโยคปฏิเสธและคำถาม ส่วน a lot of ใช้ได้กับทั้งสองแบบ',
    examples: [
      { english: 'I don\'t have much time.', myanmar: 'ကျွန်တော့်မှာ အချိန်အများကြီးမရှိဘူး။', myanmarTh: 'ผมไม่มีเวลามาก', },
      { english: 'Are there many people?', myanmar: 'လူအများကြီးရှိလား။', myanmarTh: 'มีคนมากไหม', },
      { english: 'She has a lot of friends.', myanmar: 'သူမမှာ သူငယ်ချင်းအများကြီးရှိတယ်။', myanmarTh: 'เธอมีเพื่อนมากมาย', },
      { english: 'We ate a lot of rice.', myanmar: 'ငါတို့ ထမင်းအများကြီးစားခဲ့ကြတယ်။', myanmarTh: 'พวกเรากินข้าวมาก', },
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
    titleMyanmarTh: 'วิธีใช้ could',
    explanationMyanmar:
      'အတိတ်ကလုပ်နိုင်ခဲ့တဲ့စွမ်းရည်၊ ခွင့်ပြုချက်အတွက် could + ကြိယာအခြေခံပုံစံသုံးတယ်။ အနုတ်က couldn\'t။',
    explanationMyanmarTh: 'ความสามารถหรือการอนุญาตในอดีตให้ใช้ could + กริยารูปพื้นฐาน รูปปฏิเสธคือ could not',
    examples: [
      { english: 'I could swim when I was five.', myanmar: 'ကျွန်တော် ငါးနှစ်သားတုန်းက ရေကူးတတ်ခဲ့တယ်။', myanmarTh: 'ผมว่ายน้ำได้ตอนอายุห้าขวบ', },
      { english: 'She couldn\'t come yesterday.', myanmar: 'သူမ မနေ့က မလာနိုင်ခဲ့ဘူး။', myanmarTh: 'เธอมาไม่ได้เมื่อวานนี้', },
      { english: 'Could you speak English then?', myanmar: 'အဲဒီတုန်းက မင်း အင်္ဂလိပ်စကားပြောတတ်ခဲ့လား။', myanmarTh: 'ตอนนั้นคุณพูดภาษาอังกฤษได้ไหม', },
      { english: 'They could see the mountains.', myanmar: 'သူတို့ တောင်တွေကိုမြင်နိုင်ခဲ့တယ်။', myanmarTh: 'พวกเขามองเห็นภูเขา', },
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
    titleMyanmarTh: 'วิธีใช้ must / must not',
    explanationMyanmar:
      'မဖြစ်မနေလုပ်ရမယ့်အရာ (must) နဲ့ လုံးဝမလုပ်ရတဲ့အရာ (mustn\'t) အတွက်သုံးတယ်။ must နောက်မှာ to မထည့်ရဘူး။',
    explanationMyanmarTh: 'must ใช้กับสิ่งที่จำเป็นต้องทำ must not ใช้กับสิ่งที่ห้ามทำเด็ดขาด หลัง must ห้ามใส่ to',
    examples: [
      { english: 'You must wear a helmet.', myanmar: 'မင်း ဆိုင်ကယ်ဦးထုပ်ဆောင်းရမယ်။', myanmarTh: 'คุณต้องใส่หมวกกันน็อก', },
      { english: 'We must finish today.', myanmar: 'ငါတို့ ဒီနေ့ ပြီးရမယ်။', myanmarTh: 'พวกเราต้องเสร็จวันนี้', },
      { english: 'You mustn\'t smoke here.', myanmar: 'ဒီမှာ ဆေးလိပ်မသောက်ရဘူး။', myanmarTh: 'ห้ามสูบบุหรี่ที่นี่', },
      { english: 'Students mustn\'t cheat.', myanmar: 'ကျောင်းသားတွေ စာမေးပွဲမှာ မလိမ်ရဘူး။', myanmarTh: 'นักเรียนห้ามโกงข้อสอบ', },
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
    titleMyanmarTh: 'การให้คำแนะนำด้วย should / should not',
    explanationMyanmar:
      'အကြံပေးတဲ့အခါ should + ကြိယာအခြေခံပုံစံသုံးတယ်။ မလုပ်သင့်တဲ့အရာအတွက် shouldn\'t သုံးတယ်။',
    explanationMyanmarTh: 'การให้คำแนะนำให้ใช้ should + กริยารูปพื้นฐาน สิ่งที่ไม่ควรทำใช้ should not',
    examples: [
      { english: 'You should see a doctor.', myanmar: 'မင်း ဆရာဝန်နဲ့ပြသင့်တယ်။', myanmarTh: 'คุณควรไปหาหมอ', },
      { english: 'We should leave early.', myanmar: 'ငါတို့ စောစောထွက်သင့်တယ်။', myanmarTh: 'พวกเราควรออกแต่เช้า', },
      { english: 'You shouldn\'t eat too much sugar.', myanmar: 'မင်း သကြားအများကြီးမစားသင့်ဘူး။', myanmarTh: 'คุณไม่ควรกินน้ำตาลมากเกินไป', },
      { english: 'Should I call her?', myanmar: 'ငါ သူမကို ဖုန်းဆက်သင့်လား။', myanmarTh: 'ผมควรโทรหาเธอไหม', },
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
    titleMyanmarTh: 'คำถาม How much / How many',
    explanationMyanmar:
      'How much = ရေတွက်မရတဲ့နာမ် (သို့) ဈေးနှုန်းမေးတဲ့အခါ (How much is it?)၊ How many = ရေတွက်ရတဲ့နာမ်မေးတဲ့အခါ (How many apples?)။',
    explanationMyanmarTh: 'How much ใช้ถามคำนามนับไม่ได้หรือราคา (How much is it?) How many ใช้ถามคำนามนับได้ (How many apples?)',
    examples: [
      { english: 'How much is this shirt?', myanmar: 'ဒီအင်္ကျီ ဘယ်လောက်လဲ။', myanmarTh: 'เสื้อตัวนี้เท่าไหร่', },
      { english: 'How many brothers do you have?', myanmar: 'မင်းမှာ မောင်နှမ ဘယ်နှယောက်ရှိလဲ။', myanmarTh: 'คุณมีพี่น้องกี่คน', },
      { english: 'How much sugar do you want?', myanmar: 'မင်း သကြားဘယ်လောက်လိုချင်လဲ။', myanmarTh: 'คุณต้องการน้ำตาลเท่าไหร่', },
      { english: 'How many days are there in March?', myanmar: 'မတ်လမှာ ရက်ဘယ်နှရက်ရှိလဲ။', myanmarTh: 'เดือนมีนาคมมีกี่วัน', },
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
    titleMyanmarTh: 'กริยาวิเศษณ์บอกลักษณะอาการ',
    explanationMyanmar:
      'ဘယ်လိုလုပ်လဲပြဖို့ နာမဝိသေသန + -ly သုံးတယ် (quick → quickly, careful → carefully)။ ကြိယာနောက်မှာထားတယ်။',
    explanationMyanmarTh: 'บอกว่าทำอย่างไรโดยเติม -ly ท้ายคำคุณศัพท์ (quick → quickly careful → carefully) วางไว้หลังกริยา',
    examples: [
      { english: 'She sings beautifully.', myanmar: 'သူမ သီချင်းကောင်းကောင်းဆိုတယ်။', myanmarTh: 'เธอร้องเพลงไพเราะ', },
      { english: 'He drives carefully.', myanmar: 'သူ ကားဂရုတစိုက်မောင်းတယ်။', myanmarTh: 'เขาขับรถระวัง', },
      { english: 'The baby sleeps quietly.', myanmar: 'ကလေးက တိတ်တိတ်လေးအိပ်တယ်။', myanmarTh: 'ทารกนอนเงียบๆ', },
      { english: 'Please speak slowly.', myanmar: 'ဖြည်းဖြည်းပြောပေးပါ။', myanmarTh: 'กรุณาพูดช้าๆ', },
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
    titleMyanmarTh: 'ขั้นกว่า',
    explanationMyanmar:
      'နှစ်ခုနှိုင်းယှဉ်တဲ့အခါ နာမဝိသေသနတို + -er (taller)၊ ရှည်တဲ့နာမဝိသေသနဆို more + နာမဝိသေသန (more beautiful)၊ နောက်မှာ than လိုက်တယ်။',
    explanationMyanmarTh: 'เปรียบเทียบสองสิ่ง: คำคุณศัพท์สั้นเติม -er (taller) คำคุณศัพท์ยาวใช้ more นำหน้า (more beautiful) แล้วตามด้วย than',
    examples: [
      { english: 'My brother is taller than me.', myanmar: 'အစ်ကိုက ကျွန်တော့်ထက် အရပ်ရှည်တယ်။', myanmarTh: 'พี่ชายของผมสูงกว่าผม', },
      { english: 'This book is more interesting than that one.', myanmar: 'ဒီစာအုပ်က ဟိုစာအုပ်ထက် စိတ်ဝင်စားစရာကောင်းတယ်။', myanmarTh: 'หนังสือเล่มนี้น่าสนใจกว่าเล่มนั้น', },
      { english: 'Yangon is bigger than Mandalay.', myanmar: 'ရန်ကုန်က မန္တလေးထက် ကြီးတယ်။', myanmarTh: 'ย่างกุ้งใหญ่กว่ามัณฑะเลย์', },
      { english: 'Tea is cheaper than coffee.', myanmar: 'လက်ဖက်ရည်က ကော်ဖီထက် ဈေးသက်သာတယ်။', myanmarTh: 'ชาถูกกว่ากาแฟ', },
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
    titleMyanmarTh: 'ขั้นสูงสุด',
    explanationMyanmar:
      'အမြင့်ဆုံးအဆင့်ပြဖို့ the + -est (the tallest) သို့ the most + နာမဝိသေသန (the most beautiful) သုံးတယ်။',
    explanationMyanmarTh: 'ขั้นสูงสุดใช้ the + คำคุณศัพท์เติม -est (the tallest) หรือ the most + คำคุณศัพท์ (the most beautiful)',
    examples: [
      { english: 'She is the tallest in her class.', myanmar: 'သူမ သူ့အတန်းထဲမှာ အရပ်အရှည်ဆုံးပါ။', myanmarTh: 'เธอสูงที่สุดในห้อง', },
      { english: 'This is the most expensive phone.', myanmar: 'ဒါက ဈေးအကြီးဆုံးဖုန်းပါ။', myanmarTh: 'นี่คือโทรศัพท์ที่แพงที่สุด', },
      { english: 'Mount Everest is the highest mountain.', myanmar: 'ဧဝရတ်တောင်က အမြင့်ဆုံးတောင်ပါ။', myanmarTh: 'เอเวอเรสต์เป็นภูเขาที่สูงที่สุด', },
      { english: 'He is the best student.', myanmar: 'သူက အတော်ဆုံးကျောင်းသားပါ။', myanmarTh: 'เขาเป็นนักเรียนที่ดีที่สุด', },
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
    titleMyanmarTh: 'คำสรรพนามสะท้อน',
    explanationMyanmar:
      'ကိုယ့်ကိုယ်ကိုယ်လုပ်တဲ့အခါ၊ အလေးပေးပြောတဲ့အခါ myself/yourself/himself/herself/itself/ourselves/yourselves/themselves သုံးတယ်။',
    explanationMyanmarTh: 'เมื่อประธานกระทำต่อตนเอง หรือต้องการเน้นประธาน ให้ใช้ myself / yourself / himself / herself / itself / ourselves / yourselves / themselves',
    examples: [
      { english: 'I hurt myself.', myanmar: 'ကျွန်တော် ကိုယ့်ကိုယ်ကိုယ် ထိခိုက်မိတယ်။', myanmarTh: 'ผมทำร้ายตัวเอง', },
      { english: 'She taught herself English.', myanmar: 'သူမ ကိုယ့်ဘာသာ အင်္ဂလိပ်စာသင်ခဲ့တယ်။', myanmarTh: 'เธอสอนภาษาอังกฤษตัวเอง', },
      { english: 'They enjoyed themselves.', myanmar: 'သူတို့ ပျော်ရွှင်ခဲ့ကြတယ်။', myanmarTh: 'พวกเขาสนุกกันเอง', },
      { english: 'Be careful! Don\'t hurt yourself.', myanmar: 'သတိထား။ ကိုယ့်ကိုယ်ကိုယ် မထိခိုက်စေနဲ့။', myanmarTh: 'ระวัง อย่าทำร้ายตัวเอง', },
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
    titleMyanmarTh: 'Present Simple สำหรับตารางเวลา',
    explanationMyanmar:
      'အချိန်ဇယားအတိုင်းဖြစ်တဲ့အရာ — ရထား၊ လေယာဉ်၊ ရုပ်ရှင်၊ အတန်းချိန်တွေအတွက် ပစ္စုပ္ပန်ရိုးရိုးကာလသုံးတယ် (အနာဂတ်အဓိပ္ပာယ်နဲ့)။',
    explanationMyanmarTh: 'สิ่งที่เกิดตามตารางเวลา เช่น รถไฟ เครื่องบิน หนัง ชั้นเรียน ให้ใช้ปัจจุบันกาลธรรมดาแม้ความหมายเป็นอนาคต',
    examples: [
      { english: 'The train leaves at 6 pm.', myanmar: 'ရထားက ည ၆ နာရီမှာ ထွက်တယ်။', myanmarTh: 'รถไฟออกตอนหกโมงเย็น', },
      { english: 'Our class starts tomorrow at 8.', myanmar: 'ငါတို့အတန်းက မနက်ဖြန် ၈ နာရီမှာ စတယ်။', myanmarTh: 'ชั้นเรียนของพวกเราเริ่มพรุ่งนี้แปดโมง', },
      { english: 'The movie ends at midnight.', myanmar: 'ရုပ်ရှင်က သန်းခေါင်မှာ ပြီးတယ်။', myanmarTh: 'หนังจบตอนเที่ยงคืน', },
      { english: 'The shop opens at 9 am.', myanmar: 'ဆိုင်က မနက် ၉ နာရီမှာ ဖွင့်တယ်။', myanmarTh: 'ร้านเปิดตอนเก้าโมงเช้า', },
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
    titleMyanmarTh: 'การเสนอแนะ',
    explanationMyanmar:
      'အကြံပြုတဲ့အခါ Let\'s + ကြိယာအခြေခံပုံစံ၊ Shall we + V1၊ Why don\'t we + V1 သုံးတယ်။',
    explanationMyanmarTh: 'การเสนอแนะใช้ Let us + กริยารูปพื้นฐาน Shall we + กริยารูปพื้นฐาน หรือ Why do not we + กริยารูปพื้นฐาน',
    examples: [
      { english: 'Let\'s go to the beach.', myanmar: 'ကမ်းခြေသွားကြရအောင်။', myanmarTh: 'ไปชายหาดกันเถอะ', },
      { english: 'Shall we eat out tonight?', myanmar: 'ဒီည အပြင်မှာ စားကြရအောင်လား။', myanmarTh: 'คืนนี้ออกไปกินข้าวข้างนอกกันไหม', },
      { english: 'Why don\'t we watch a movie?', myanmar: 'ရုပ်ရှင်ကြည့်ကြရအောင်လေ။', myanmarTh: 'ทำไมพวกเราไม่ดูหนังกัน', },
      { english: 'Let\'s study together.', myanmar: 'အတူတူ စာကျက်ကြရအောင်။', myanmarTh: 'มาเรียนด้วยกันเถอะ', },
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
    titleMyanmarTh: 'คำถามและประโยคปฏิเสธในอดีตกาล',
    explanationMyanmar:
      'အတိတ်ကာလမေးခွန်း/အနုတ်မှာ Did + အကြောင်းအရာ + ကြိယာအခြေခံပုံစံ သုံးတယ်။ ကြိယာကို -ed/V2 ပုံစံ ပြန်မသုံးရဘူး။',
    explanationMyanmarTh: 'คำถามและประโยคปฏิเสธในอดีตกาลใช้ Did + ประธาน + กริยารูปพื้นฐาน ห้ามใช้รูป -ed หรือกริยาช่อง 2 ซ้ำ',
    examples: [
      { english: 'Did you see the game?', myanmar: 'မင်း ပွဲစဉ်ကို ကြည့်ခဲ့လား။', myanmarTh: 'คุณดูเกมไหม', },
      { english: 'Where did she go?', myanmar: 'သူမ ဘယ်သွားခဲ့လဲ။', myanmarTh: 'เธอไปไหน', },
      { english: 'I didn\'t eat breakfast.', myanmar: 'ကျွန်တော် မနက်စာ မစားခဲ့ဘူး။', myanmarTh: 'ผมไม่ได้กินอาหารเช้า', },
      { english: 'They didn\'t watch the news.', myanmar: 'သူတို့ သတင်းမကြည့်ခဲ့ကြဘူး။', myanmarTh: 'พวกเขาไม่ได้ดูข่าว', },
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
    titleMyanmarTh: 'คำเชื่อม so / because',
    explanationMyanmar:
      'because = အကြောင်းပြချက် (ဝါကျအလယ်မှာထား)၊ so = ရလဒ် (နောက်ဝါကျအစမှာထား)။',
    explanationMyanmarTh: 'because บอกเหตุผล (วางกลางประโยค) so บอกผลลัพธ์ (วางต้นประโยคถัดไป)',
    examples: [
      { english: 'I was hungry, so I ate noodles.', myanmar: 'ကျွန်တော် ဗိုက်ဆာလို့ ခေါက်ဆွဲစားခဲ့တယ်။', myanmarTh: 'ผมหิว ผมเลยกินก๋วยเตี๋ยว', },
      { english: 'She stayed home because she was sick.', myanmar: 'သူမ နေမကောင်းလို့ အိမ်မှာနေခဲ့တယ်။', myanmarTh: 'เธออยู่บ้านเพราะเธอป่วย', },
      { english: 'It rained, so we stayed inside.', myanmar: 'မိုးရွာလို့ ငါတို့ အထဲမှာနေခဲ့ကြတယ်။', myanmarTh: 'ฝนตก พวกเราเลยอยู่ในบ้าน', },
      { english: 'He studied hard because he wanted to pass.', myanmar: 'သူ အောင်ချင်လို့ ကြိုးကြိုးစားစားစာကျက်ခဲ့တယ်။', myanmarTh: 'เขาตั้งใจเรียนเพราะอยากสอบผ่าน', },
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
    titleMyanmarTh: 'ความแตกต่างระหว่าง Past Simple กับ Past Continuous',
    explanationMyanmar:
      'အတိတ်မှာ ဖြစ်နေဆဲအရာ (was/were + V-ing) ကို နောက်ခံထား၊ ပြီးဆုံးတဲ့အရာ (V2) က ဝင်လာတဲ့ပုံစံ။ when/while နဲ့တွဲသုံးလေ့ရှိ။',
    explanationMyanmarTh: 'เหตุการณ์ที่กำลังดำเนินอยู่ในอดีต (was / were + กริยาเติม -ing) เป็นฉากหลัง ส่วนเหตุการณ์ที่เสร็จสมบูรณ์ (กริยาช่อง 2) แทรกเข้ามา มักใช้คู่กับ when / while',
    examples: [
      { english: 'I was cooking when he arrived.', myanmar: 'သူရောက်လာတုန်းက ကျွန်တော် ချက်ပြုတ်နေခဲ့တယ်။', myanmarTh: 'ผมกำลังทำอาหารตอนเขามาถึง', },
      { english: 'While she was reading, the phone rang.', myanmar: 'သူမစာဖတ်နေတုန်း ဖုန်းမြည်ခဲ့တယ်။', myanmarTh: 'ขณะที่เธอกำลังอ่านหนังสือ โทรศัพท์ดัง', },
      { english: 'They were walking home when it started to rain.', myanmar: 'မိုးစရွာတုန်းက သူတို့ အိမ်ပြန်လျှောက်နေခဲ့ကြတယ်။', myanmarTh: 'พวกเขากำลังเดินกลับบ้านตอนฝนเริ่มตก', },
      { english: 'He broke his leg while he was playing football.', myanmar: 'ဘောလုံးကန်နေတုန်း သူ့ခြေထောက်ကျိုးခဲ့တယ်။', myanmarTh: 'เขาขาหักขณะที่กำลังเล่นฟุตบอล', },
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
    titleMyanmarTh: 'วิธีใช้ just / already / yet',
    explanationMyanmar:
      'just = အခုပဲ၊ already = ပြီးနှင့်ပြီ (အတည်ပြုဝါကျမှာ)၊ yet = မသေးဘူး (အနုတ်နဲ့မေးခွန်းမှာ)။ have/has နောက်မှာ (yet က ဝါကျအဆုံးမှာ) ထားတယ်။',
    explanationMyanmarTh: 'just = เพิ่งจะ already = เรียบร้อยแล้ว (ประโยคบอกเล่า) yet = ยังไม่ (ประโยคปฏิเสธและคำถาม) วางหลัง have / has (yet วางท้ายประโยค)',
    examples: [
      { english: 'I have just eaten.', myanmar: 'ကျွန်တော် အခုပဲ စားပြီးပြီ။', myanmarTh: 'ผมเพิ่งกินเสร็จ', },
      { english: 'She has already finished.', myanmar: 'သူမ ပြီးနှင့်ပြီးပြီ။', myanmarTh: 'เธอเสร็จเรียบร้อยแล้ว', },
      { english: 'Have you finished yet?', myanmar: 'မင်း ပြီးပြီလား။', myanmarTh: 'คุณเสร็จหรือยัง', },
      { english: 'They haven\'t arrived yet.', myanmar: 'သူတို့ မရောက်သေးဘူး။', myanmarTh: 'พวกเขายังไม่มาถึง', },
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
    titleMyanmarTh: 'ความแตกต่างระหว่าง Present Perfect กับ Past Simple',
    explanationMyanmar:
      'အချိန်အတိအကျပါရင် Past Simple သုံး (I saw him yesterday)၊ အချိန်မပါဘဲ အခုနဲ့ဆက်စပ်ရင် Present Perfect သုံး (I have seen him.)။',
    explanationMyanmarTh: 'ถ้าระบุเวลาชัดเจนในอดีตใช้ Past Simple (I saw him yesterday) ถ้าไม่ระบุเวลาและยังโยงกับปัจจุบันใช้ Present Perfect (I have seen him)',
    examples: [
      { english: 'She visited Bagan in 2020.', myanmar: 'သူမ ၂၀၂၀ မှာ ပုဂံသွားလည်ခဲ့တယ်။', myanmarTh: 'เธอไปพุกามในปี 2020', },
      { english: 'She has visited Bagan three times.', myanmar: 'သူမ ပုဂံကို သုံးခါသွားဖူးတယ်။', myanmarTh: 'เธอเคยไปพุกามสามครั้ง', },
      { english: 'We ate dinner an hour ago.', myanmar: 'ငါတို့ တစ်နာရီက ညစာစားခဲ့တယ်။', myanmarTh: 'พวกเรากินมื้อเย็นเมื่อชั่วโมงที่แล้ว', },
      { english: 'We have already eaten dinner.', myanmar: 'ငါတို့ ညစာစားပြီးနှင့်ပြီးပြီ။', myanmarTh: 'พวกเรากินมื้อเย็นเรียบร้อยแล้ว', },
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
    titleMyanmarTh: 'ความแตกต่างระหว่าง will กับ going to',
    explanationMyanmar:
      'will = စကားပြောနေတုန်းမှ ဆုံးဖြတ်ချက်၊ ကတိ၊ ထင်မြင်ချက်။ going to = ကြိုစီစဉ်ထားတဲ့အစီအစဉ်၊ မျက်မြင်လက္ခဏာပေါ်ကခန့်မှန်းချက်။',
    explanationMyanmarTh: 'will = การตัดสินใจขณะพูด คำสัญญา ความเห็น ส่วน going to = แผนที่วางไว้ล่วงหน้า การคาดการณ์จากสิ่งที่เห็น',
    examples: [
      { english: 'I will open the window.', myanmar: 'ကျွန်တော် ပြတင်းပေါက်ဖွင့်မယ်။', myanmarTh: 'ผมจะเปิดหน้าต่าง', },
      { english: 'I am going to open a shop next year.', myanmar: 'ကျွန်တော် နောက်နှစ် ဆိုင်ဖွင့်မယ်။', myanmarTh: 'ปีหน้าผมจะเปิดร้าน', },
      { english: 'Look! He is going to fall!', myanmar: 'ကြည့်။ သူ လဲကျတော့မယ်။', myanmarTh: 'ดูสิ เขากำลังจะล้ม', },
      { english: 'I promise I will call you.', myanmar: 'မင်းကို ဖုန်းဆက်မယ်လို့ ကတိပေးတယ်။', myanmarTh: 'ผมสัญญาว่าจะโทรหาคุณ', },
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
    titleMyanmarTh: 'กรณีที่ไม่ใช้ article',
    explanationMyanmar:
      'ယေဘုယျအများကိန်း/ရေတွက်မရတဲ့နာမ်၊ အစားအစာအမည်၊ ဘာသာစကား၊ အားကစား၊ လူ့အမည်တို့ရဲ့ရှေ့မှာ article လုံးဝမထည့်ဘူး။',
    explanationMyanmarTh: 'หน้าคำนามพหูพจน์หรือนับไม่ได้ที่พูดทั่วไป ชื่ออาหาร ชื่อภาษา ชื่อกีฬา ชื่อคน ไม่ต้องใส่ article',
    examples: [
      { english: 'I like music.', myanmar: 'ကျွန်တော် ဂီတကြိုက်တယ်။', myanmarTh: 'ผมชอบดนตรี', },
      { english: 'She speaks English and Thai.', myanmar: 'သူမ အင်္ဂလိပ်နဲ့ ထိုင်းစကားပြောတယ်။', myanmarTh: 'เธอพูดภาษาอังกฤษและภาษาไทย', },
      { english: 'Breakfast is ready.', myanmar: 'မနက်စာ အဆင်သင့်ဖြစ်ပြီ။', myanmarTh: 'อาหารเช้าพร้อมแล้ว', },
      { english: 'Dogs are loyal animals.', myanmar: 'ခွေးတွေက သစ္စာရှိတဲ့တိရစ္ဆာန်တွေပါ။', myanmarTh: 'หมาซื่อสัตย์', },
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
    titleMyanmarTh: 'a few / a little',
    explanationMyanmar:
      'a few = ရေတွက်ရတဲ့နာမ်နည်းနည်း (a few apples)၊ a little = ရေတွက်မရတဲ့နာမ်နည်းနည်း (a little sugar)။ နှစ်ခုလုံး အပြုသဘောဆောင် (လုံလောက်တဲ့ပမာဏရှိ)။',
    explanationMyanmarTh: 'a few = เล็กน้อย (คำนามนับได้: a few apples) a little = เล็กน้อย (คำนามนับไม่ได้: a little sugar) ทั้งคู่มีความหมายเชิงบวกคือมีพอใช้',
    examples: [
      { english: 'I have a few friends here.', myanmar: 'ကျွန်တော့်မှာ ဒီမှာ သူငယ်ချင်းအနည်းငယ်ရှိတယ်။', myanmarTh: 'ผมมีเพื่อนสองสามคนที่นี่', },
      { english: 'She added a little salt.', myanmar: 'သူမ ဆားနည်းနည်းထည့်ခဲ့တယ်။', myanmarTh: 'เธอใส่เกลือเล็กน้อย', },
      { english: 'We have a few minutes left.', myanmar: 'ငါတို့မှာ မိနစ်အနည်းငယ်ကျန်သေးတယ်။', myanmarTh: 'พวกเรามีเวลาเหลือไม่กี่นาที', },
      { english: 'Can I have a little water?', myanmar: 'ရေနည်းနည်း ရနိုင်မလား။', myanmarTh: 'ขอน้ำหน่อยได้ไหม', },
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
    titleMyanmarTh: 'have to (ภาระหน้าที่)',
    explanationMyanmar:
      'ပြင်ပစည်းမျဉ်း၊ အခြေအနေကြောင့်လုပ်ရမယ့်အရာအတွက် have to / has to သုံးတယ်။ အတိတ်ကာလမှာ had to သုံးတယ်။ မေးခွန်းမှာ Do you have to...?။',
    explanationMyanmarTh: 'สิ่งที่ต้องทำเพราะกฎหรือสถานการณ์ภายนอกใช้ have to / has to อดีตใช้ had to คำถามใช้ Do you have to ...?',
    examples: [
      { english: 'I have to wear a uniform.', myanmar: 'ကျွန်တော် ယူနီဖောင်းဝတ်ရတယ်။', myanmarTh: 'ผมต้องใส่เครื่องแบบ', },
      { english: 'She has to work on Saturdays.', myanmar: 'သူမ စနေနေ့တွေမှာ အလုပ်လုပ်ရတယ်။', myanmarTh: 'เธอต้องทำงานวันเสาร์', },
      { english: 'We had to leave early.', myanmar: 'ငါတို့ စောစောထွက်ခဲ့ရတယ်။', myanmarTh: 'พวกเราต้องออกแต่เช้า', },
      { english: 'Do you have to go now?', myanmar: 'မင်း အခု သွားရမှာလား။', myanmarTh: 'คุณต้องไปตอนนี้เลยไหม', },
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
    titleMyanmarTh: 'may / might (ความเป็นไปได้)',
    explanationMyanmar:
      'ဖြစ်နိုင်ခြေပြောတဲ့အခါ may/might + ကြိယာအခြေခံပုံစံသုံးတယ်။ might က may ထက် သေချာမှုနည်းတယ်။',
    explanationMyanmarTh: 'พูดถึงความเป็นไปได้ใช้ may / might + กริยารูปพื้นฐาน might มีความแน่นอนน้อยกว่า may',
    examples: [
      { english: 'It may rain this evening.', myanmar: 'ဒီည မိုးရွာနိုင်တယ်။', myanmarTh: 'เย็นนี้ฝนอาจตก', },
      { english: 'She might come to the party.', myanmar: 'သူမ ပါတီကို လာနိုင်တယ်။', myanmarTh: 'เธออาจมางานเลี้ยง', },
      { english: 'You may sit here.', myanmar: 'မင်း ဒီမှာ ထိုင်နိုင်တယ်။', myanmarTh: 'คุณนั่งตรงนี้ได้', },
      { english: 'They might be late.', myanmar: 'သူတို့ နောက်ကျနိုင်တယ်။', myanmarTh: 'พวกเขาอาจสาย', },
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
    titleMyanmarTh: 'would like (การขอร้องอย่างสุภาพ)',
    explanationMyanmar:
      'ယဉ်ကျေးစွာတောင်းဆို၊ ဖိတ်ခေါ်တဲ့အခါ would like + to + ကြိယာ (သို့) would like + နာမ် သုံးတယ်။ want ထက် ယဉ်ကျေးတယ်။',
    explanationMyanmarTh: 'การขอร้องหรือเชิญอย่างสุภาพใช้ would like + to + กริยา หรือ would like + คำนาม สุภาพกว่า want',
    examples: [
      { english: 'I would like a cup of tea.', myanmar: 'လက်ဖက်ရည်တစ်ခွက် သောက်ချင်ပါတယ်။', myanmarTh: 'ผมขอชาสักถ้วย', },
      { english: 'Would you like some help?', myanmar: 'အကူအညီလိုချင်ပါသလား။', myanmarTh: 'คุณต้องการความช่วยเหลือไหม', },
      { english: 'She would like to visit Paris.', myanmar: 'သူမ ပါရီကို သွားလည်ချင်တယ်။', myanmarTh: 'เธออยากไปปารีส', },
      { english: 'We would like to book a room.', myanmar: 'အခန်းတစ်ခန်း ကြိုတင်ယူချင်ပါတယ်။', myanmarTh: 'พวกเราอยากจองห้อง', },
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
    titleMyanmarTh: 'ประโยคเงื่อนไข (Zero / First)',
    explanationMyanmar:
      'Zero conditional = အမြဲမှန်တဲ့အချက်၊ သဘာဝနိယာမ (If + Present Simple, Present Simple)။ First conditional = အနာဂတ်ဖြစ်နိုင်ခြေ (If + Present Simple, will + V1)။',
    explanationMyanmarTh: 'Zero conditional = ความจริงทั่วไปหรือกฎธรรมชาติ (If + Present Simple Present Simple) First conditional = ความเป็นไปได้ในอนาคต (If + Present Simple will + กริยารูปพื้นฐาน)',
    examples: [
      { english: 'If you heat ice, it melts.', myanmar: 'ရေခဲကို အပူပေးရင် အရည်ပျော်တယ်။', myanmarTh: 'ถ้าคุณทำให้น้ำแข็งร้อน มันจะละลาย', },
      { english: 'If it rains, we will stay home.', myanmar: 'မိုးရွာရင် ငါတို့ အိမ်မှာနေမယ်။', myanmarTh: 'ถ้าฝนตก พวกเราจะอยู่บ้าน', },
      { english: 'If she studies hard, she will pass.', myanmar: 'သူမ ကြိုးစားစာကျက်ရင် အောင်မယ်။', myanmarTh: 'ถ้าเธอตั้งใจเรียน เธอจะสอบผ่าน', },
      { english: 'Plants die if they don\'t get water.', myanmar: 'အပင်တွေကို ရေမရရင် သေတယ်။', myanmarTh: 'พืชตายถ้าไม่ได้รับน้ำ', },
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
    titleMyanmarTh: 'Passive voice เบื้องต้น',
    explanationMyanmar:
      'လုပ်သူကို အလေးမပေးဘဲ ခံရသူကို အလေးပေးတဲ့အခါ be + V3 (past participle) သုံးတယ်။ ဥပမာ The cake was made by my mother။',
    explanationMyanmarTh: 'เมื่อต้องการเน้นผู้ถูกกระทำมากกว่าผู้กระทำ ให้ใช้ be + กริยาช่อง 3 เช่น The cake was made by my mother',
    examples: [
      { english: 'The bridge was built in 1990.', myanmar: 'တံတားကို ၁၉၉၀ မှာ ဆောက်လုပ်ခဲ့တယ်။', myanmarTh: 'สะพานสร้างในปี 1990', },
      { english: 'English is spoken here.', myanmar: 'ဒီမှာ အင်္ဂလိပ်စကားပြောကြတယ်။', myanmarTh: 'ที่นี่พูดภาษาอังกฤษ', },
      { english: 'The windows were cleaned yesterday.', myanmar: 'ပြတင်းပေါက်တွေကို မနေ့က သန့်ရှင်းရေးလုပ်ခဲ့တယ်။', myanmarTh: 'หน้าต่างถูกทำความสะอาดเมื่อวานนี้', },
      { english: 'This phone was made in Vietnam.', myanmar: 'ဒီဖုန်းကို ဗီယက်နမ်မှာ ထုတ်လုပ်ခဲ့တယ်။', myanmarTh: 'โทรศัพท์นี้ผลิตในเวียดนาม', },
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
    titleMyanmarTh: 'used to (ความเคยชินในอดีต)',
    explanationMyanmar:
      'အတိတ်ကလုပ်ခဲ့တဲ့အလေ့အထ (အခုမလုပ်တော့တဲ့အရာ) အတွက် used to + ကြိယာအခြေခံပုံစံသုံးတယ်။ မေးခွန်းမှာ Did you use to...?။',
    explanationMyanmarTh: 'ความเคยชินในอดีตที่ปัจจุบันไม่ทำแล้วใช้ used to + กริยารูปพื้นฐาน คำถามใช้ Did you use to ...?',
    examples: [
      { english: 'I used to play football.', myanmar: 'ကျွန်တော် အရင်က ဘောလုံးကန်ခဲ့ဖူးတယ်။', myanmarTh: 'ผมเคยเล่นฟุตบอล', },
      { english: 'She used to live in Yangon.', myanmar: 'သူမ အရင်က ရန်ကုန်မှာ နေခဲ့ဖူးတယ်။', myanmarTh: 'เธอเคยอยู่ย่างกุ้ง', },
      { english: 'They used to be neighbours.', myanmar: 'သူတို့ အရင်က အိမ်နီးချင်းတွေဖြစ်ခဲ့ကြတယ်။', myanmarTh: 'พวกเขาเคยเป็นเพื่อนบ้านกัน', },
      { english: 'Did you use to smoke?', myanmar: 'မင်း အရင်က ဆေးလိပ်သောက်ခဲ့ဖူးလား။', myanmarTh: 'คุณเคยสูบบุหรี่ไหม', },
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
    titleMyanmarTh: 'ความแตกต่างระหว่าง to-infinitive กับ gerund',
    explanationMyanmar:
      'အချို့ကြိယာတွေနောက်မှာ to + ကြိယာ လိုက်တယ် (want to go, decide to stay, plan to travel)၊ အချို့နောက်မှာ ကြိယာ-ing လိုက်တယ် (enjoy swimming, finish eating, avoid driving)။',
    explanationMyanmarTh: 'กริยาบางตัวตามด้วย to + กริยา (want to go decide to stay plan to travel) บางตัวตามด้วยกริยาเติม -ing (enjoy swimming finish eating avoid driving)',
    examples: [
      { english: 'I want to learn English.', myanmar: 'ကျွန်တော် အင်္ဂလိပ်စာသင်ချင်တယ်။', myanmarTh: 'ผมอยากเรียนภาษาอังกฤษ', },
      { english: 'She decided to stay home.', myanmar: 'သူမ အိမ်မှာနေဖို့ ဆုံးဖြတ်ခဲ့တယ်။', myanmarTh: 'เธอตัดสินใจอยู่บ้าน', },
      { english: 'We enjoy travelling together.', myanmar: 'ငါတို့ အတူတူခရီးသွားရတာ ပျော်တယ်။', myanmarTh: 'พวกเราชอบเที่ยวด้วยกัน', },
      { english: 'He finished doing his homework.', myanmar: 'သူ အိမ်စာလုပ်ပြီးသွားပြီ။', myanmarTh: 'เขาทำการบ้านเสร็จแล้ว', },
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
    titleMyanmarTh: 'วิธีใช้ who / which / that',
    explanationMyanmar:
      'လူကို who၊ အရာ/တိရစ္ဆာန်ကို which၊ နှစ်မျိုးလုံးကို that သုံးပြီး နာမ်ကို ထပ်ရှင်းပြတယ်။',
    explanationMyanmarTh: 'ขยายคำนามที่เป็นคนใช้ who เป็นสิ่งของหรือสัตว์ใช้ which ใช้ได้ทั้งสองแบบใช้ that',
    examples: [
      { english: 'The woman who called is my aunt.', myanmar: 'ဖုန်းဆက်ခဲ့တဲ့အမျိုးသမီးက ကျွန်တော့်အဒေါ်ပါ။', myanmarTh: 'ผู้หญิงที่โทรคือป้าของผม', },
      { english: 'The book that I bought is interesting.', myanmar: 'ကျွန်တော်ဝယ်ခဲ့တဲ့စာအုပ်က စိတ်ဝင်စားစရာကောင်းတယ်။', myanmarTh: 'หนังสือที่ผมซื้อน่าสนใจ', },
      { english: 'This is the restaurant which serves Thai food.', myanmar: 'ဒါက ထိုင်းအစားအစာရောင်းတဲ့စားသောက်ဆိုင်ပါ။', myanmarTh: 'นี่คือร้านอาหารที่เสิร์ฟอาหารไทย', },
      { english: 'People who exercise stay healthy.', myanmar: 'လေ့ကျင့်ခန်းလုပ်တဲ့သူတွေက ကျန်းမာရေးကောင်းတယ်။', myanmarTh: 'คนที่ออกกำลังกายสุขภาพดี', },
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
    titleMyanmarTh: 'too / enough',
    explanationMyanmar:
      'too + နာမဝိသေသန = အလွန်အကျွံ (အနုတ်သဘောဆောင် — too hot = သောက်မရလောက်အောင်ပူ)၊ နာမဝိသေသန + enough = လုံလောက်တယ် (old enough = လုံလောက်အောင်အသက်ကြီး)။',
    explanationMyanmarTh: 'too + คำคุณศัพท์ = มากเกินไป (ความหมายเชิงลบ: too hot = ร้อนจนดื่มไม่ได้) คำคุณศัพท์ + enough = เพียงพอ (old enough = อายุมากพอ)',
    examples: [
      { english: 'This coffee is too hot.', myanmar: 'ဒီကော်ဖီက အရမ်းပူတယ်။', myanmarTh: 'กาแฟร้อนเกินไป', },
      { english: 'She is old enough to drive.', myanmar: 'သူမက ကားမောင်းနိုင်လောက်အောင် အသက်ကြီးပြီ။', myanmarTh: 'เธออายุมากพอที่จะขับรถ', },
      { english: 'The bag is too heavy.', myanmar: 'အိတ်က အရမ်းလေးတယ်။', myanmarTh: 'กระเป๋าหนักเกินไป', },
      { english: 'He isn\'t tall enough for basketball.', myanmar: 'သူက ဘတ်စကက်ဘောကစားဖို့ အရပ်မလုံလောက်ဘူး။', myanmarTh: 'เขาไม่สูงพอสำหรับบาสเกตบอล', },
    ],
    drills: [
      { prompt: 'It is ___ cold to swim.', answer: 'too', options: ['too', 'enough', 'so', 'very'] },
      { prompt: 'She is brave ___ to try.', answer: 'enough', options: ['enough', 'too', 'so', 'very'] },
      { prompt: 'The soup is ___ salty.', answer: 'too', options: ['too', 'enough', 'so', 'very'] },
    ],
  },
];
