// FASE 14 — Grammar batch 2: structured B2→C1 grammar rules (Myanmar-first).
// Follows the exact schema of grammar-batch-1.ts: keys `english`/`prompt`
// (not `en`) so the vectorize indexer skips these entries.
// Local interface with level: Extract<CEFR, 'B2' | 'C1'>.
import type { CEFR } from '../../types';

export interface GrammarExampleB2C1 {
  english: string;
  myanmar: string;
  myanmarTh?: string;
}

export interface GrammarDrillB2C1 {
  /** Sentence with a ___ blank. */
  prompt: string;
  answer: string;
  options?: string[];
}

export interface GrammarRuleB2C1 {
  id: string;
  level: Extract<CEFR, 'B2' | 'C1'>;
  /** English title (for reference). */
  title: string;
  /** Myanmar title (primary). */
  titleMyanmar: string;
  /** Thai title (optional, OLA 4c). */
  titleMyanmarTh?: string;
  /** The rule explained in Myanmar. */
  explanationMyanmar: string;
  /** The rule explained in Thai (optional, OLA 4c). */
  explanationMyanmarTh?: string;
  examples: GrammarExampleB2C1[];
  drills: GrammarDrillB2C1[];
}

export const grammarRulesB2C1: GrammarRuleB2C1[] = [
  {
    id: 'gr-inversion-never',
    level: 'B2',
    title: 'Inversion: Never / Rarely / Seldom',
    titleMyanmar: 'Never / Rarely / Seldom နဲ့စတဲ့ဝါကျပြောင်းပြန်',
    titleMyanmarTh: 'การผกผันประโยคด้วย Never / Rarely / Seldom',
    explanationMyanmar:
      'Never, Rarely, Seldom, Hardly, Barely စတဲ့ အနုတ်စကားလုံးနဲ့ ဝါကျစတဲ့အခါ အကြောင်းအရာနဲ့ကြိယာအကူနေရာပြောင်းရတယ်။ ဥပမာ Never have I seen... (ငါဘယ်တော့မှမမြင်ဖူးဘူး)။ ဒါက စာပေဆန်ပြီး အလေးပေးတဲ့ပုံစံ၊ အထူးသဖြင့် အရေးအသားနဲ့ မိန့်ခွန်းတွေမှာသုံးတယ်။',
    explanationMyanmarTh: 'เมื่อขึ้นต้นประโยคด้วยคำปฏิเสธเช่น Never Rarely Seldom Hardly Barely ต้องสลับตำแหน่งประธานกับกริยาช่วย เช่น Never have I seen ... เป็นโครงสร้างเชิงวรรณศิลป์ใช้เน้นความ มักพบในงานเขียนและสุนทรพจน์',
    examples: [
      { english: 'Never have I seen such a beautiful sunset.', myanmar: 'အဲဒီလောက်လှတဲ့ညနေဆည်းဆာကို ငါဘယ်တော့မှမမြင်ဖူးဘူး။', myanmarTh: 'ผมไม่เคยเห็นพระอาทิตย์ตกสวยขนาดนี้มาก่อน', },
      { english: 'Rarely does she arrive late for meetings.', myanmar: 'သူမ အစည်းအဝေးတွေကို နောက်ကျတယ်ဆိုတာ ရှားပါတယ်။', myanmarTh: 'เธอแทบไม่เคยมาสายในการประชุม', },
      { english: 'Seldom have we received such generous support.', myanmar: 'အဲဒီလောက်ရက်ရောတဲ့ထောက်ပံ့မှုကို ငါတို့ရှားရှားပါးပါးပဲရဖူးတယ်။', myanmarTh: 'พวกเราแทบไม่เคยได้รับการสนับสนุนใจกว้างขนาดนี้', },
      { english: 'Hardly had the concert begun when the lights went out.', myanmar: 'ကပွဲစပြီးမကြာဘူး မီးတွေပိတ်သွားတယ်။', myanmarTh: 'คอนเสิร์ตแทบยังไม่เริ่ม ไฟก็ดับ', },
    ],
    drills: [
      { prompt: 'Never ___ I met someone so kind.', answer: 'have', options: ['have', 'I have', 'do', 'did'] },
      { prompt: 'Rarely ___ he forget his keys.', answer: 'does', options: ['does', 'he does', 'is', 'has'] },
      { prompt: 'Seldom ___ we seen such courage.', answer: 'have', options: ['have', 'we have', 'do', 'are'] },
    ],
  },
  {
    id: 'gr-inversion-not-only',
    level: 'B2',
    title: 'Inversion: Not only ... but also',
    titleMyanmar: 'Not only ... but also ပြောင်းပြန်ဝါကျ',
    titleMyanmarTh: 'การผกผันประโยคด้วย Not only ... but also',
    explanationMyanmar:
      'Not only နဲ့ဝါကျစတဲ့အခါ ကြိယာအကူကို အကြောင်းအရာရှေ့ပြောင်းရတယ် — Not only did he win, but he also broke the record. Not only... but (also) က "တစ်ခုတည်းမဟုတ်ဘူး၊ နောက်တစ်ခုပါပါသေးတယ်" လို့အလေးပေးပြောတာဖြစ်တယ်။',
    explanationMyanmarTh: 'เมื่อขึ้นต้นด้วย Not only ต้องสลับกริยาช่วยมาหน้าประธาน: Not only did he win but he also broke the record โครงสร้าง Not only ... but (also) ใช้เน้นว่าไม่ใช่แค่อย่างเดียวแต่มีอีกอย่างด้วย',
    examples: [
      { english: 'Not only did she pass the exam, but she also got the highest score.', myanmar: 'သူမ စာမေးပွဲအောင်တာတစ်ခုတည်းမဟုတ်ဘူး၊ အမြင့်ဆုံးအမှတ်ပါရခဲ့တယ်။', myanmarTh: 'เธอไม่เพียงสอบผ่าน แต่ยังได้คะแนนสูงสุดด้วย', },
      { english: 'Not only is he a doctor, but he is also a talented musician.', myanmar: 'သူက ဆရာဝန်တစ်ခုတည်းမဟုတ်ဘူး၊ ထူးချွန်တဲ့ဂီတပညာရှင်တစ်ယောက်ပါပဲ။', myanmarTh: 'เขาไม่เพียงเป็นหมอ แต่ยังเป็นนักดนตรีเก่งด้วย', },
      { english: 'Not only did the storm destroy houses, but it also cut off electricity.', myanmar: 'မုန်တိုင်းက အိမ်တွေဖျက်ဆီးတာတစ်ခုတည်းမဟုတ်ဘူး၊ လျှပ်စစ်မီးပါပြတ်သွားစေခဲ့တယ်။', myanmarTh: 'พายุไม่เพียงทำลายบ้าน แต่ยังตัดไฟด้วย', },
    ],
    drills: [
      { prompt: 'Not only ___ they help us, but they also stayed all night.', answer: 'did', options: ['did', 'do', 'they did', 'have'] },
      { prompt: 'Not only ___ expensive, but it is also unreliable.', answer: 'is it', options: ['is it', 'it is', 'does it', 'it does'] },
      { prompt: 'Not only ___ English, but she also speaks French.', answer: 'does she speak', options: ['does she speak', 'she speaks', 'speaks she', 'she does speak'] },
    ],
  },
  {
    id: 'gr-inversion-conditionals',
    level: 'B2',
    title: 'Inversion in conditionals: Had I known ...',
    titleMyanmar: 'if မပါဘဲ ပြောင်းပြန်အခြေအနေဝါကျများ',
    titleMyanmarTh: 'การผกผันในประโยคเงื่อนไข',
    explanationMyanmar:
      'if ကို ဖြုတ်ပြီး ကြိယာအကူကို အကြောင်းအရာရှေ့ပြောင်းတဲ့ တရားဝင်ပုံစံ။ Had I known = If I had known၊ Were he here = If he were here၊ Should you need help = If you need help။ အရေးအသားတရားဝင်တဲ့အခါသုံးတယ်။',
    explanationMyanmarTh: 'ละ if แล้วสลับกริยาช่วยมาหน้าประธาน เป็นรูปทางการ: Had I known = If I had known / Were he here = If he were here / Should you need help = If you need help ใช้ในงานเขียนทางการ',
    examples: [
      { english: 'Had I known about the traffic, I would have left earlier.', myanmar: 'ယာဉ်ကြောပိတ်ဆို့မှုအကြောင်းသိခဲ့ရင် ပိုစောထွက်ခဲ့မှာပါ။', myanmarTh: 'ถ้าผมรู้เรื่องรถติด ผมคงออกเร็วกว่านี้', },
      { english: 'Were she here, she would know what to do.', myanmar: 'သူမဒီမှာရှိရင် ဘာလုပ်ရမယ်ဆိုတာသိမှာပါ။', myanmarTh: 'ถ้าเธออยู่ที่นี่ เธอคงรู้ว่าต้องทำอย่างไร', },
      { english: 'Should you need any help, please call me.', myanmar: 'အကူအညီလိုရင် ကျေးဇူးပြုပြီးဖုန်းဆက်ပါ။', myanmarTh: 'ถ้าคุณต้องการความช่วยเหลือ กรุณาโทรหาผม', },
      { english: 'Had they arrived on time, they would have met the manager.', myanmar: 'သူတို့အချိန်မှန်ရောက်ခဲ့ရင် မန်နေဂျာနဲ့တွေ့ခဲ့ရမှာပါ။', myanmarTh: 'ถ้าพวกเขามาตรงเวลา พวกเขาคงได้พบผู้จัดการ', },
    ],
    drills: [
      { prompt: '___ I known, I would have helped. (= If I had known)', answer: 'Had', options: ['Had', 'If', 'Have', 'Would'] },
      { prompt: '___ he taller, he could join the team. (= If he were taller)', answer: 'Were', options: ['Were', 'Was', 'Is', 'Had'] },
      { prompt: '___ you see him, tell him to call me. (= If you see him)', answer: 'Should', options: ['Should', 'Would', 'Had', 'Do'] },
    ],
  },
  {
    id: 'gr-inversion-such-so',
    level: 'B2',
    title: 'Inversion: So ... that / Such ... that',
    titleMyanmar: 'So / Such နဲ့စတဲ့အလေးပေးပြောင်းပြန်ဝါကျ',
    titleMyanmarTh: 'การผกผันด้วย So / Such',
    explanationMyanmar:
      'So + နာမဝိသေသန / Such + နာမ်နဲ့ဝါကျစတဲ့အခါ ကြိယာအကူကိုအကြောင်းအရာရှေ့ပြောင်းတယ်။ So tired was she that she fell asleep. Such was the storm that trees fell. စာပေဆန်တဲ့အလေးပေးပုံစံဖြစ်တယ်။',
    explanationMyanmarTh: 'เมื่อขึ้นต้นด้วย So + คำคุณศัพท์ หรือ Such + คำนาม ต้องสลับกริยาช่วยมาหน้าประธาน: So tired was she that she fell asleep / Such was the storm that trees fell เป็นรูปเน้นเชิงวรรณศิลป์',
    examples: [
      { english: 'So tired was she that she fell asleep at the table.', myanmar: 'သူမ အရမ်းပင်ပန်းတာကြောင့် စားပွဲမှာပဲ အိပ်ပျော်သွားတယ်။', myanmarTh: 'เธอเหนื่อยจนหลับที่โต๊ะ', },
      { english: 'Such was the noise that we could not hear each other.', myanmar: 'ဆူညံသံက အရမ်းပြင်းထန်တာကြောင့် ငါတို့တစ်ယောက်နဲ့တစ်ယောက်မကြားရဘူး။', myanmarTh: 'เสียงดังจนพวกเราไม่ได้ยินกัน', },
      { english: 'So quickly did he run that nobody could catch him.', myanmar: 'သူ အရမ်းမြန်မြန်ပြေးတာကြောင့် ဘယ်သူမှလိုက်မမီဘူး။', myanmarTh: 'เขาวิ่งเร็วจนไม่มีใครตามทัน', },
    ],
    drills: [
      { prompt: 'So hungry ___ they that they ate everything.', answer: 'were', options: ['were', 'they were', 'are', 'they are'] },
      { prompt: 'Such ___ the crowd that the doors closed early.', answer: 'was', options: ['was', 'is', 'were', 'the'] },
      { prompt: 'So loudly ___ she sing that everyone turned around.', answer: 'did', options: ['did', 'does', 'she', 'sang'] },
    ],
  },
  {
    id: 'gr-cleft-it-is',
    level: 'B2',
    title: 'It-cleft sentences: It is ... that ...',
    titleMyanmar: 'It is ... that ... အလေးပေးဝါကျ',
    titleMyanmarTh: 'ประโยคเน้นด้วย It is ... that ...',
    explanationMyanmar:
      'ဝါကျရဲ့အစိတ်အပိုင်းတစ်ခုကို အလေးပေးဖို့ It is/was ... that/who သုံးတယ်။ It was MY SISTER who called. (ဖုန်းဆက်တာက အစ်မပါ)။ အလေးပေးချင်တဲ့အပိုင်းကို It is/was နောက်မှာထားတယ်။',
    explanationMyanmarTh: 'เน้นส่วนใดของประโยคด้วย It is / was ... that / who ... เช่น It was MY SISTER who called (คนที่โทรคือพี่สาว) ส่วนที่ต้องการเน้นวางหลัง It is / was',
    examples: [
      { english: 'It was my brother who broke the window, not me.', myanmar: 'ပြတင်းပေါက်ခွဲခဲ့တာက ငါ့ညီပါ၊ ငါမဟုတ်ဘူး။', myanmarTh: 'คนที่ทำหน้าต่างแตกคือพี่ชายผม ไม่ใช่ผม', },
      { english: 'It is in Mandalay that the festival takes place.', myanmar: 'ပွဲတော်ကျင်းပတာက မန္တလေးမှာပါ။', myanmarTh: 'เทศกาลจัดที่มัณฑะเลย์', },
      { english: 'It was only yesterday that I heard the news.', myanmar: 'သတင်းကြားခဲ့တာက မနေ့ကမှပါ။', myanmarTh: 'ผมเพิ่งได้ข่าวเมื่อวานนี้เอง', },
      { english: 'It is hard work that brings success, not luck.', myanmar: 'အောင်မြင်မှုရစေတာက ကြိုးစားမှုပါ၊ ကံကြမ္မာမဟုတ်ဘူး။', myanmarTh: 'สิ่งที่นำความสำเร็จคือความขยัน ไม่ใช่โชค', },
    ],
    drills: [
      { prompt: 'It was ___ who helped me. (emphasize: John)', answer: 'John', options: ['John', 'that John', 'John that', 'to John'] },
      { prompt: 'It ___ last week that we moved house.', answer: 'was', options: ['was', 'is', 'were', 'has'] },
      { prompt: 'It is patience ___ matters most.', answer: 'that', options: ['that', 'who', 'which', 'what'] },
    ],
  },
  {
    id: 'gr-cleft-what',
    level: 'B2',
    title: 'What-cleft (pseudo-cleft): What ... is ...',
    titleMyanmar: 'What ... is ... အလေးပေးဝါကျ',
    titleMyanmarTh: 'ประโยคเน้นด้วย What ... is ...',
    explanationMyanmar:
      'What + အကြောင်းအရာပုဒ်နဲ့ ဝါကျစပြီး အလေးပေးချင်တဲ့အရာကို နောက်ဆုံးထားတယ်။ What I need is a good night\'s sleep. (ငါလိုတာက ကောင်းကောင်းအိပ်စက်ခြင်းပါ)။ စကားပြောမှာ အလွန်အသုံးများတယ်။',
    explanationMyanmarTh: 'ขึ้นต้นด้วย What + อนุประโยค แล้ววางสิ่งที่ต้องการเน้นไว้ท้ายประโยค: What I need is a good night sleep (สิ่งที่ผมต้องการคือนอนหลับพักผ่อนดีๆ) ใช้บ่อยในภาษาพูด',
    examples: [
      { english: 'What I really need is some peace and quiet.', myanmar: 'ငါတကယ်လိုတာက တိတ်ဆိတ်ငြိမ်သက်မှုပါ။', myanmarTh: 'สิ่งที่ผมต้องการจริงๆ คือความสงบ', },
      { english: 'What surprised everyone was his sudden resignation.', myanmar: 'လူတိုင်းကိုအံ့အားသင့်စေခဲ့တာက သူ့ရဲ့ရုတ်တရက်နှုတ်ထွက်မှုပါ။', myanmarTh: 'สิ่งที่ทำให้ทุกคนประหลาดใจคือการลาออกกะทันหันของเขา', },
      { english: 'What she did was call the police immediately.', myanmar: 'သူမလုပ်ခဲ့တာက ရဲကိုချက်ချင်းဖုန်းဆက်တာပါ။', myanmarTh: 'สิ่งที่เธอทำคือโทรหาตำรวจทันที', },
      { english: 'What matters most is your health.', myanmar: 'အရေးအကြီးဆုံးက မင်းရဲ့ကျန်းမာရေးပါ။', myanmarTh: 'สิ่งที่สำคัญที่สุดคือสุขภาพของคุณ', },
    ],
    drills: [
      { prompt: 'What I want ___ a new laptop.', answer: 'is', options: ['is', 'are', 'be', 'being'] },
      { prompt: 'What they did was ___ the truth. (tell)', answer: 'tell', options: ['tell', 'told', 'telling', 'to telling'] },
      { prompt: 'What ___ me most was her kindness. (impress)', answer: 'impressed', options: ['impressed', 'impresses', 'impressing', 'impress'] },
    ],
  },
  {
    id: 'gr-cleft-all',
    level: 'B2',
    title: 'All-cleft and reason clefts',
    titleMyanmar: 'All ... is ... နှင့် အကြောင်းပြချက်အလေးပေးဝါကျ',
    titleMyanmarTh: 'ประโยคเน้นด้วย All ... is ... และการเน้นเหตุผล',
    explanationMyanmar:
      'All (I want) is ... ပုံစံနဲ့ The reason ... is (that) ... ပုံစံ။ All I need is your support. The reason he left is that he was tired. အကြောင်းရင်းကို အလေးပေးတဲ့အခါသုံးတယ်။',
    explanationMyanmarTh: 'โครงสร้าง All (I want) is ... และ The reason ... is (that) ... เช่น All I need is your support / The reason he left is that he was tired ใช้เน้นเหตุผล',
    examples: [
      { english: 'All I want is a chance to prove myself.', myanmar: 'ငါလိုချင်တာအားလုံးက ကိုယ့်ကိုယ်ကိုသက်သေပြဖို့အခွင့်အရေးတစ်ခုပါ။', myanmarTh: 'สิ่งที่ผมต้องการคือโอกาสพิสูจน์ตัวเอง', },
      { english: 'The reason she cried is that she missed her family.', myanmar: 'သူမငိုခဲ့ရတဲ့အကြောင်းရင်းက မိသားစုကိုလွမ်းလို့ပါ။', myanmarTh: 'เหตุผลที่เธอร้องไห้คือเธอคิดถึงครอบครัว', },
      { english: 'All they did was wait for three hours.', myanmar: 'သူတို့လုပ်ခဲ့တာအားလုံးက သုံးနာရီကြာစောင့်တာပါ။', myanmarTh: 'สิ่งที่พวกเขาทำคือรอสามชั่วโมง', },
      { english: 'The reason prices rose is that demand increased.', myanmar: 'ဈေးနှုန်းတွေတက်ရတဲ့အကြောင်းရင်းက ဝယ်လိုအားတိုးလို့ပါ။', myanmarTh: 'เหตุผลที่ราคาขึ้นคือความต้องการเพิ่ม', },
    ],
    drills: [
      { prompt: 'All I need ___ some rest.', answer: 'is', options: ['is', 'are', 'am', 'be'] },
      { prompt: 'The reason he failed ___ that he never studied.', answer: 'is', options: ['is', 'was because', 'are', 'were'] },
      { prompt: 'All she did was ___. (smile)', answer: 'smile', options: ['smile', 'smiled', 'smiling', 'to smile'] },
    ],
  },
  {
    id: 'gr-subjunctive',
    level: 'B2',
    title: 'Subjunctive: I suggest (that) he go',
    titleMyanmar: 'Subjunctive — suggest / demand နောက် ကြိယာအခြေခံပုံစံ',
    titleMyanmarTh: 'Subjunctive หลัง suggest / demand',
    explanationMyanmar:
      'suggest, demand, insist, require, recommend, request နောက်မှာ (that) + အကြောင်းအရာ + ကြိယာအခြေခံပုံစံ (V1) သုံးတယ်၊ -s မထည့်ရဘူး။ I suggest he go (သူ့သွားဖို့အကြံပြုတယ်)။ တရားဝင်အရေးအသား၊ အီးမေးလ်တွေမှာသုံးတယ်။',
    explanationMyanmarTh: 'หลัง suggest demand insist require recommend request ให้ใช้ (that) + ประธาน + กริยารูปพื้นฐาน (ไม่เติม -s) เช่น I suggest he go ใช้ในงานเขียนและอีเมลทางการ',
    examples: [
      { english: 'I suggest that he arrive on time.', myanmar: 'သူ အချိန်မှန်ရောက်ဖို့ အကြံပြုပါတယ်။', myanmarTh: 'ผมแนะนำให้เขามาตรงเวลา', },
      { english: 'The manager demanded that she finish the report today.', myanmar: 'မန်နေဂျာက သူမကို ဒီနေ့ အစီရင်ခံစာ အပြီးသတ်ဖို့ အမိန့်ပေးခဲ့တယ်။', myanmarTh: 'ผู้จัดการสั่งให้เธอทำรายงานเสร็จวันนี้', },
      { english: 'It is essential that every student be present.', myanmar: 'ကျောင်းသားတိုင်း တက်ရောက်ဖို့ မရှိမဖြစ်လိုအပ်ပါတယ်။', myanmarTh: 'จำเป็นอย่างยิ่งที่นักเรียนทุกคนต้องอยู่', },
      { english: 'They insisted that we stay for dinner.', myanmar: 'သူတို့ ငါတို့ညစာစားဖို့ အတင်းတောင်းဆိုခဲ့ကြတယ်။', myanmarTh: 'พวกเขายืนยันให้พวกเราอยู่กินมื้อเย็น', },
    ],
    drills: [
      { prompt: 'I suggest that she ___ harder. (study)', answer: 'study', options: ['study', 'studies', 'studied', 'studying'] },
      { prompt: 'The rule requires that he ___ a uniform. (wear)', answer: 'wear', options: ['wear', 'wears', 'wore', 'wearing'] },
      { prompt: 'It is vital that she ___ informed. (be)', answer: 'be', options: ['be', 'is', 'was', 'being'] },
    ],
  },
  {
    id: 'gr-mixed-conditionals',
    level: 'B2',
    title: 'Mixed conditionals',
    titleMyanmar: 'ရောစပ်အခြေအနေဝါကျများ',
    titleMyanmarTh: 'ประโยคเงื่อนไขแบบผสม',
    explanationMyanmar:
      'အတိတ်အခြေအနေနဲ့ ပစ္စုပ္ပန်ရလဒ် (သို့) ပစ္စုပ္ပန်အခြေအနေနဲ့ အတိတ်ရလဒ်ကို ရောစပ်သုံးတယ်။ If I had studied harder, I would have a better job now. (အတိတ်မှာ ပိုကြိုးစားခဲ့ရင် အခုအလုပ်ကောင်းရမှာ)။',
    explanationMyanmarTh: 'ผสมเงื่อนไขอดีตกับผลปัจจุบัน หรือเงื่อนไขปัจจุบันกับผลอดีต: If I had studied harder I would have a better job now (ถ้าอดีตขยันกว่านี้ ตอนนี้คงมีงานดีกว่านี้)',
    examples: [
      { english: 'If I had saved money, I would be rich now.', myanmar: 'ပိုက်ဆံစုခဲ့ရင် အခုချမ်းသာနေမှာ။', myanmarTh: 'ถ้าผมเก็บเงิน ผมคงรวยตอนนี้', },
      { english: 'If she were more careful, she would not have broken the vase.', myanmar: 'သူမပိုသတိထားခဲ့ရင် ပန်းအိုးခွဲမိမှာမဟုတ်ဘူး။', myanmarTh: 'ถ้าเธอระวังกว่านี้ เธอคงไม่ทำแจกันแตก', },
      { english: 'If he had taken the job, he would be living in Singapore now.', myanmar: 'သူ အဲဒီအလုပ်ယူခဲ့ရင် အခုစင်ကာပူမှာနေနေရမှာ။', myanmarTh: 'ถ้าเขารับงานนั้น เขาคงอยู่สิงคโปร์ตอนนี้', },
      { english: 'If I were not afraid of flying, I would have visited you last year.', myanmar: 'လေယာဉ်စီးရမှာမကြောက်ခဲ့ရင် မနှစ်က မင်းဆီလာလည်ခဲ့မှာ။', myanmarTh: 'ถ้าผมไม่กลัวเครื่องบิน ผมคงไปเยี่ยมคุณปีที่แล้ว', },
    ],
    drills: [
      { prompt: 'If I had learned English earlier, I ___ a better job now. (have)', answer: 'would have', options: ['would have', 'would had', 'will have', 'have'] },
      { prompt: 'If she ___ taller, she could have reached the shelf. (be)', answer: 'were', options: ['were', 'had been', 'is', 'was being'] },
      { prompt: 'If he had not been lazy, he ___ failed. (not / fail)', answer: 'would not have', options: ['would not have', 'will not have', 'would not', 'did not'] },
    ],
  },
  {
    id: 'gr-wish-past',
    level: 'B2',
    title: 'Wish / If only + past perfect (regrets)',
    titleMyanmar: 'Wish / If only နဲ့ အတိတ်နောင်တများ',
    titleMyanmarTh: 'Wish / If only กับความเสียใจในอดีต',
    explanationMyanmar:
      'အတိတ်မှာ မဖြစ်ခဲ့တဲ့အရာကို နောင်တရတဲ့အခါ wish / if only + past perfect (had + V3) သုံးတယ်။ I wish I had studied harder. If only she had listened. if only က ပိုပြင်းထန်တယ်။',
    explanationMyanmarTh: 'เสียใจกับสิ่งที่ไม่เกิดในอดีตใช้ wish / if only + past perfect (had + กริยาช่อง 3): I wish I had studied harder / If only she had listened โดย if only ให้ความรู้สึกแรงกว่า',
    examples: [
      { english: 'I wish I had accepted that job offer.', myanmar: 'အဲဒီအလုပ်ကမ်းလှမ်းမှုကို လက်ခံခဲ့ရင် ကောင်းမှာပဲ။', myanmarTh: 'ผมอยากจะรับข้อเสนองานนั้น', },
      { english: 'If only she had told me the truth earlier.', myanmar: 'သူမ အမှန်ကို ပိုစောပြောခဲ့ရင် ကောင်းမှာပဲ။', myanmarTh: 'ถ้าเธอบอกความจริงกับผมเร็วกว่านี้ก็ดี', },
      { english: 'He wishes he had not spent all his money.', myanmar: 'သူ ပိုက်ဆံအကုန်မသုံးခဲ့ရင် ကောင်းမှာလို့ နောင်တရတယ်။', myanmarTh: 'เขาอยากจะไม่ได้ใช้เงินหมด', },
      { english: 'I wish we had met years ago.', myanmar: 'ငါတို့ နှစ်တွေအရင်က ဆုံခဲ့ရင် ကောင်းမှာပဲ။', myanmarTh: 'ผมอยากว่าเราเจอกันหลายปีก่อน', },
    ],
    drills: [
      { prompt: 'I wish I ___ harder for the exam. (study)', answer: 'had studied', options: ['had studied', 'studied', 'have studied', 'study'] },
      { prompt: 'If only he ___ his passport. (not / forget)', answer: 'had not forgotten', options: ['had not forgotten', 'did not forget', 'has not forgotten', 'not forgot'] },
      { prompt: 'She wishes she ___ that message. (not / send)', answer: 'had not sent', options: ['had not sent', 'did not send', 'has not sent', 'not sent'] },
    ],
  },
  {
    id: 'gr-wish-would',
    level: 'B2',
    title: 'Wish + would (complaints and desires)',
    titleMyanmar: 'Wish + would — မကျေနပ်ချက်နဲ့ဆန္ဒများ',
    titleMyanmarTh: 'Wish + would (ความไม่พอใจและความปรารถนา)',
    explanationMyanmar:
      'တစ်ယောက်ယောက်ရဲ့အပြုအမူကို ပြောင်းစေချင်တဲ့အခါ၊ မကျေနပ်တဲ့အခါ wish + would + V1 သုံးတယ်။ I wish he would stop smoking. ကိုယ့်ကိုယ်ကိုအတွက်ဆို would သုံးလို့မရဘူး (I wish I would go ❌)။',
    explanationMyanmarTh: 'อยากให้พฤติกรรมของคนอื่นเปลี่ยน หรือแสดงความไม่พอใจ ใช้ wish + would + กริยารูปพื้นฐาน: I wish he would stop smoking ห้ามใช้ would กับตัวเอง (I wish I would go ผิด)',
    examples: [
      { english: 'I wish he would stop complaining all the time.', myanmar: 'သူ အမြဲညည်းညူတာရပ်စေချင်တယ်။', myanmarTh: 'ผมอยากให้เขาเลิกบ่นสักที', },
      { english: 'I wish it would stop raining.', myanmar: 'မိုးရွာတာရပ်စေချင်တယ်။', myanmarTh: 'ผมอยากให้ฝนหยุดตก', },
      { english: 'She wishes her neighbours would be quieter.', myanmar: 'သူမ အိမ်နီးချင်းတွေ ပိုတိတ်ဆိတ်စေချင်တယ်။', myanmarTh: 'เธออยากให้เพื่อนบ้านเงียบกว่านี้', },
      { english: 'I wish you would listen to me for once.', myanmar: 'မင်း တစ်ခါလောက် ငါ့စကားနားထောင်စေချင်တယ်။', myanmarTh: 'ผมอยากให้คุณฟังผมสักครั้ง', },
    ],
    drills: [
      { prompt: 'I wish they ___ making noise. (stop)', answer: 'would stop', options: ['would stop', 'stopped', 'will stop', 'stop'] },
      { prompt: 'She wishes her boss ___ her more respect. (show)', answer: 'would show', options: ['would show', 'showed', 'shows', 'showing'] },
      { prompt: 'I wish the bus ___ come soon. (come)', answer: 'would come', options: ['would come', 'came', 'comes', 'coming'] },
    ],
  },
  {
    id: 'gr-reported-speech-advanced',
    level: 'B2',
    title: 'Advanced reported speech',
    titleMyanmar: 'အဆင့်မြင့်တိုက်ရိုက်မဟုတ်သောစကား',
    titleMyanmarTh: 'การพูดแบบอ้อมขั้นสูง',
    explanationMyanmar:
      'အခြေခံ backshift အပြင်: အမြဲမှန်တဲ့အမှန်တရားတွေက tense မပြောင်းဘူး (He said the Earth moves around the sun)။ reporting verb အမျိုးမျိုး — admit, deny, complain, warn, promise — နဲ့ that-clause (သို့) to-infinitive သုံးတယ်။',
    explanationMyanmarTh: 'นอกจากการเลื่อนกาล (backshift) ความจริงทั่วไปไม่ต้องเปลี่ยนกาล (He said the Earth moves around the sun) กริยารายงานหลากหลายเช่น admit deny complain warn promise ใช้กับ that-clause หรือ to-infinitive',
    examples: [
      { english: 'She admitted that she had made a mistake.', myanmar: 'သူမ အမှားလုပ်ခဲ့မိတယ်လို့ ဝန်ခံခဲ့တယ်။', myanmarTh: 'เธอยอมรับว่าเธอทำผิด', },
      { english: 'He denied taking the money.', myanmar: 'သူ ပိုက်ဆံယူခဲ့တာကို ငြင်းဆိုခဲ့တယ်။', myanmarTh: 'เขาปฏิเสธว่าเอาเงินไป', },
      { english: 'The teacher warned us not to cheat.', myanmar: 'ဆရာက ငါတို့ကို မလိမ်ဖို့ သတိပေးခဲ့တယ်။', myanmarTh: 'ครูเตือนพวกเราไม่ให้โกง', },
      { english: 'He said that water boils at 100 degrees.', myanmar: 'ရေက ၁၀၀ ဒီဂရီမှာ ဆူတယ်လို့ သူပြောခဲ့တယ်။', myanmarTh: 'เขาบอกว่าน้ำเดือดที่ 100 องศา', },
    ],
    drills: [
      { prompt: 'She promised ___ me with the project. (help)', answer: 'to help', options: ['to help', 'helping', 'help', 'that help'] },
      { prompt: 'He complained that the room ___ too cold. (be)', answer: 'was', options: ['was', 'is', 'has been', 'were'] },
      { prompt: 'They warned us ___ the ice. (not / touch)', answer: 'not to touch', options: ['not to touch', 'not touch', 'do not touch', 'to not touching'] },
    ],
  },
  {
    id: 'gr-reported-questions',
    level: 'B2',
    title: 'Reported questions with reporting verbs',
    titleMyanmar: 'မေးခွန်းတွေကို တိုက်ရိုက်မဟုတ်ဘဲပြောနည်း',
    titleMyanmarTh: 'การรายงานคำถาม',
    explanationMyanmar:
      'မေးခွန်းကို ပြန်ပြောတဲ့အခါ မေးခွန်းပုံစံမသုံးဘဲ အတည်ပြုဝါကျပုံစံသုံးတယ်။ She asked me where I lived. (do/does/did ပျောက်သွားတယ်)။ ask, wonder, want to know တို့နဲ့သုံးတယ်။',
    explanationMyanmarTh: 'รายงานคำถามให้ใช้รูปประโยคบอกเล่า ไม่ใช่รูปคำถาม: She asked me where I lived (do / does / did หายไป) ใช้กับ ask wonder want to know',
    examples: [
      { english: 'She asked me where I was going.', myanmar: 'သူမ ငါဘယ်သွားမလဲလို့ မေးခဲ့တယ်။', myanmarTh: 'เธอถามผมว่าผมกำลังไปไหน', },
      { english: 'He wondered whether the shop was open.', myanmar: 'ဆိုင်ဖွင့်လားဆိုတာ သူစဉ်းစားနေခဲ့တယ်။', myanmarTh: 'เขาสงสัยว่าร้านเปิดไหม', },
      { english: 'They asked what time the train leaves.', myanmar: 'သူတို့ ရထားဘယ်အချိန်ထွက်လဲလို့ မေးခဲ့ကြတယ်။', myanmarTh: 'พวกเขาถามว่ารถไฟออกกี่โมง', },
      { english: 'I wanted to know if she could swim.', myanmar: 'သူမ ရေကူးတတ်လားဆိုတာ ငါသိချင်ခဲ့တယ်။', myanmarTh: 'ผมอยากรู้ว่าเธอว่ายน้ำได้ไหม', },
    ],
    drills: [
      { prompt: 'He asked me ___ I liked coffee. (do → ___)', answer: 'if', options: ['if', 'do', 'that', 'whether do'] },
      { prompt: 'She asked where ___. (you live → ___)', answer: 'I lived', options: ['I lived', 'did I live', 'I live', 'do I live'] },
      { prompt: 'They wondered what time ___ . (the film starts → ___)', answer: 'the film started', options: ['the film started', 'did the film start', 'the film starts', 'does the film start'] },
    ],
  },
  {
    id: 'gr-participle-clauses',
    level: 'B2',
    title: 'Participle clauses',
    titleMyanmar: 'Participle ပုဒ်စုများ',
    titleMyanmarTh: 'อนุประโยค participle',
    explanationMyanmar:
      'V-ing / V3 / having + V3 နဲ့ ပုဒ်စုတိုတိုလုပ်ပြီး အကြောင်းရင်း၊ အချိန်၊ အခြေအနေပြတယ်။ Having finished dinner, we went out. (ညစာစားပြီးတော့ ငါတို့အပြင်ထွက်ခဲ့ကြတယ်)။ အရေးအသားမှာ အလွန်အသုံးဝင်တယ်။',
    explanationMyanmarTh: 'ใช้ V-ing / V3 / having + V3 ทำเป็นวลีสั้นๆ บอกเหตุผล เวลา หรือสถานการณ์: Having finished dinner we went out (กินข้าวเสร็จแล้วพวกเราก็ออกไปข้างนอก) มีประโยชน์มากในงานเขียน',
    examples: [
      { english: 'Having finished her work, she went home early.', myanmar: 'အလုပ်ပြီးတော့ သူမ စောစောအိမ်ပြန်ခဲ့တယ်။', myanmarTh: 'ทำงานเสร็จแล้ว เธอกลับบ้านแต่เช้า', },
      { english: 'Tired after the long flight, he slept for ten hours.', myanmar: 'ခရီးရှည်ပျံသန်းပြီးပင်ပန်းတာကြောင့် သူ ဆယ်နာရီကြာအိပ်ခဲ့တယ်။', myanmarTh: 'เหนื่อยหลังเที่ยวบินยาว เขานอนสิบชั่วโมง', },
      { english: 'Walking through the park, I met an old friend.', myanmar: 'ပန်းခြံထဲလမ်းလျှောက်ရင်း သူငယ်ချင်းဟောင်းတစ်ယောက်နဲ့တွေ့ခဲ့တယ်။', myanmarTh: 'เดินผ่านสวน ผมเจอเพื่อนเก่า', },
      { english: 'Built in 1905, the temple attracts thousands of visitors.', myanmar: '၁၉၀၅ မှာတည်ဆောက်ခဲ့တဲ့ဘုရားက ဧည့်သည်ထောင်ချီကိုဆွဲဆောင်တယ်။', myanmarTh: 'สร้างในปี 1905 วัดดึงดูดนักท่องเที่ยวหลายพันคน', },
    ],
    drills: [
      { prompt: '___ the letter, she posted it immediately. (write → ___)', answer: 'Having written', options: ['Having written', 'Written', 'Writing', 'To write'] },
      { prompt: '___ in Yangon, he knows the city well. (grow up → ___)', answer: 'Having grown up', options: ['Having grown up', 'Grown up', 'Growing up', 'To grow up'] },
      { prompt: '___ by the news, she could not speak. (shock → ___)', answer: 'Shocked', options: ['Shocked', 'Shocking', 'Having shocked', 'To shock'] },
    ],
  },
  {
    id: 'gr-reduced-relatives',
    level: 'B2',
    title: 'Reduced relative clauses',
    titleMyanmar: 'အတိုချုပ်ဆွေမျိုးဝါကျများ',
    titleMyanmarTh: 'ประโยค relative แบบย่อ',
    explanationMyanmar:
      'who/which/that + be ကို ဖြုတ်ပြီး participle ပဲထားတယ်။ The man (who was) standing there is my uncle. The books (which were) written in 1990 are rare. အရေးအသားကို တိုတိုရှင်းရှင်းဖြစ်စေတယ်။',
    explanationMyanmarTh: 'ละ who / which / that + be เหลือแค่ participle: The man (who was) standing there is my uncle / The books (which were) written in 1990 are rare ทำให้งานเขียนกระชับ',
    examples: [
      { english: 'The students waiting outside are from Class 10.', myanmar: 'အပြင်မှာစောင့်နေတဲ့ကျောင်းသားတွေက အတန်း ၁၀ ကပါ။', myanmarTh: 'นักเรียนที่รอข้างนอกมาจากชั้น 10', },
      { english: 'The report submitted yesterday needs revision.', myanmar: 'မနေ့ကတင်ခဲ့တဲ့အစီရင်ခံစာကို ပြန်ပြင်ဖို့လိုတယ်။', myanmarTh: 'รายงานที่ส่งเมื่อวานนี้ต้องแก้ไข', },
      { english: 'Anyone wishing to join must register first.', myanmar: 'ပါဝင်လိုသူတိုင်း အရင်စာရင်းသွင်းရမယ်။', myanmarTh: 'ใครอยากร่วมต้องลงทะเบียนก่อน', },
      { english: 'The documents kept in this drawer are confidential.', myanmar: 'ဒီအံဆွဲထဲသိမ်းထားတဲ့စာရွက်စာတမ်းတွေက လျှို့ဝှက်ထားရမယ့်ဟာတွေပါ။', myanmarTh: 'เอกสารที่เก็บในลิ้นชักนี้เป็นความลับ', },
    ],
    drills: [
      { prompt: 'The girl ___ the red dress is my cousin. (wear → ___)', answer: 'wearing', options: ['wearing', 'worn', 'to wear', 'wears'] },
      { prompt: 'The car ___ in Japan is very reliable. (make → ___)', answer: 'made', options: ['made', 'making', 'to make', 'makes'] },
      { prompt: 'Passengers ___ to board should go to Gate 5. (wish → ___)', answer: 'wishing', options: ['wishing', 'wished', 'to wish', 'wish'] },
    ],
  },
  {
    id: 'gr-nominalisation',
    level: 'B2',
    title: 'Nominalisation',
    titleMyanmar: 'ကြိယာကို နာမ်အဖြစ်ပြောင်းနည်း',
    titleMyanmarTh: 'การทำกริยาให้เป็นคำนาม',
    explanationMyanmar:
      'ကြိယာ/နာမဝိသေသနကို နာမ်အဖြစ်ပြောင်းပြီး တရားဝင်အရေးအသားလုပ်တယ်။ decide → decision, develop → development, important → importance။ The development of the project took two years. (decide ရှည်ရှည်ရေးတာထက် တိုပြီးတရားဝင်တယ်)။',
    explanationMyanmarTh: 'เปลี่ยนกริยา / คำคุณศัพท์ให้เป็นคำนามเพื่อให้งานเขียนเป็นทางการ: decide → decision develop → development important → importance เช่น The development of the project took two years กระชับและเป็นทางการกว่าการเขียนยาวๆ',
    examples: [
      { english: 'The government announced the construction of a new bridge.', myanmar: 'အစိုးရက တံတားအသစ်တည်ဆောက်မှုကို ကြေညာခဲ့တယ်။', myanmarTh: 'รัฐบาลประกาศสร้างสะพานใหม่', },
      { english: 'His failure to arrive on time caused problems.', myanmar: 'သူ အချိန်မှန် မရောက်ရှိမှုက ပြဿနာတွေ ဖြစ်စေခဲ့တယ်။', myanmarTh: 'การที่เขามาสายทำให้เกิดปัญหา', },
      { english: 'The discovery of oil changed the country\'s economy.', myanmar: 'ရေနံတွေ့ရှိမှုက နိုင်ငံရဲ့စီးပွားရေးကို ပြောင်းလဲစေခဲ့တယ်။', myanmarTh: 'การค้นพบน้ำมันเปลี่ยนเศรษฐกิจของประเทศ', },
      { english: 'Regular exercise leads to an improvement in health.', myanmar: 'ပုံမှန်လေ့ကျင့်ခန်းက ကျန်းမာရေးတိုးတက်မှုကို ဖြစ်စေတယ်။', myanmarTh: 'การออกกำลังกายสม่ำเสมอนำไปสู่สุขภาพที่ดีขึ้น', },
    ],
    drills: [
      { prompt: 'The ___ of the new policy surprised everyone. (decide → ___)', answer: 'decision', options: ['decision', 'deciding', 'decided', 'decisive'] },
      { prompt: 'We need ___ in customer service. (improve → ___)', answer: 'improvement', options: ['improvement', 'improving', 'improved', 'improvable'] },
      { prompt: 'His ___ was completely unexpected. (arrive → ___)', answer: 'arrival', options: ['arrival', 'arriving', 'arrived', 'arrive'] },
    ],
  },
  {
    id: 'gr-hedging',
    level: 'B2',
    title: 'Hedging language',
    titleMyanmar: 'သတိထားပြောဆိုနည်း (hedging)',
    titleMyanmarTh: 'ภาษาเลี่ยงความเด็ดขาด (hedging)',
    explanationMyanmar:
      'ပညာရပ်ဆိုင်ရာ၊ စီးပွားရေးအရေးအသားမှာ တိတိကျကျမပြောဘဲ သတိထားပြောတယ်။ tend to, seem to, appear to, may, might, possibly, arguably သုံးတယ်။ This suggests that... / It appears that...။',
    explanationMyanmarTh: 'งานเขียนวิชาการและธุรกิจไม่ควรพูดเด็ดขาดเกินไป ให้ใช้ tend to seem to appear to may might possibly arguably เช่น This suggests that ... / It appears that ...',
    examples: [
      { english: 'The results suggest that the treatment may be effective.', myanmar: 'ရလဒ်တွေက ကုသမှုထိရောက်နိုင်တယ်လို့ ညွှန်ပြတယ်။', myanmarTh: 'ผลลัพธ์ชี้ว่าการรักษาอาจได้ผล', },
      { english: 'Smoking tends to increase the risk of heart disease.', myanmar: 'ဆေးလိပ်သောက်တာက နှလုံးရောဂါဖြစ်နိုင်ခြေကို တိုးစေတတ်တယ်။', myanmarTh: 'การสูบบุหรี่มักเพิ่มความเสี่ยงโรคหัวใจ', },
      { english: 'It appears that prices will continue to rise.', myanmar: 'ဈေးနှုန်းတွေ ဆက်တက်နေမယ်လို့ ထင်ရတယ်။', myanmarTh: 'ดูเหมือนราคาจะขึ้นต่อไป', },
      { english: 'This policy could arguably benefit small businesses.', myanmar: 'ဒီမူဝါဒက အသေးစားစီးပွားရေးလုပ်ငန်းတွေကို အကျိုးပြုနိုင်တယ်လို့ ဆိုနိုင်တယ်။', myanmarTh: 'นโยบายนี้อาจเป็นประโยชน์ต่อธุรกิจเล็กๆ ได้', },
    ],
    drills: [
      { prompt: 'The data ___ that more research is needed. (suggest → ___)', answer: 'suggests', options: ['suggests', 'suggest', 'suggesting', 'suggested'] },
      { prompt: 'Prices ___ to fall during the rainy season. (tend → ___)', answer: 'tend', options: ['tend', 'tends', 'tending', 'tended'] },
      { prompt: 'It ___ that he will accept the offer. (seem → ___)', answer: 'seems', options: ['seems', 'seem', 'seeming', 'seemed'] },
    ],
  },
  {
    id: 'gr-discourse-markers-formal',
    level: 'B2',
    title: 'Formal discourse markers',
    titleMyanmar: 'တရားဝင်စကားဆက်စကားလုံးများ',
    titleMyanmarTh: 'คำเชื่อมวาทกรรมแบบเป็นทางการ',
    explanationMyanmar:
      'အရေးအသား၊ မိန့်ခွန်းတရားဝင်တဲ့အခါ အတွေးဆက်နွယ်မှုပြတဲ့စကားလုံးများ။ Furthermore, Moreover (ထပ်ပေါင်းပြီး)၊ Nevertheless, However (ဆန့်ကျင်ဘက်)၊ Consequently, Therefore (ရလဒ်)၊ In contrast (နှိုင်းယှဉ်ချက်)။',
    explanationMyanmarTh: 'คำเชื่อมความคิดในงานเขียนและสุนทรพจน์ทางการ: Furthermore Moreover (เพิ่มเติม) Nevertheless However (ขัดแย้ง) Consequently Therefore (ผลลัพธ์) In contrast (เปรียบเทียบ)',
    examples: [
      { english: 'The plan is expensive. Furthermore, it will take years to complete.', myanmar: 'အစီအစဉ်က ဈေးကြီးတယ်။ ဒါ့အပြင် ပြီးဖို့နှစ်တွေကြာမယ်။', myanmarTh: 'แผนแพง นอกจากนี้ยังใช้เวลาหลายปีกว่าจะเสร็จ', },
      { english: 'It was raining heavily. Nevertheless, the match continued.', myanmar: 'မိုးသည်းထန်စွာရွာနေခဲ့တယ်။ ဒါပေမဲ့ ပွဲကဆက်လက်ကျင်းပခဲ့တယ်။', myanmarTh: 'ฝนตกหนัก อย่างไรก็ตามการแข่งขันดำเนินต่อ', },
      { english: 'He studied hard. Consequently, he passed with distinction.', myanmar: 'သူ ကြိုးစားလေ့လာခဲ့တယ်။ ရလဒ်အနေနဲ့ ထူးချွန်စွာအောင်ခဲ့တယ်။', myanmarTh: 'เขาตั้งใจเรียน ดังนั้นเขาสอบผ่านด้วยคะแนนดีเด่น', },
      { english: 'In contrast to Yangon, Mandalay is much drier.', myanmar: 'ရန်ကုန်နဲ့နှိုင်းယှဉ်ရင် မန္တလေးက အများကြီးခြောက်သွေ့တယ်။', myanmarTh: 'ต่างจากย่างกุ้ง มัณฑะเลย์แห้งกว่ามาก', },
    ],
    drills: [
      { prompt: 'She is talented. ___, she works very hard. (addition)', answer: 'Moreover', options: ['Moreover', 'However', 'Therefore', 'Otherwise'] },
      { prompt: 'He was tired. ___, he finished the race. (contrast)', answer: 'Nevertheless', options: ['Nevertheless', 'Furthermore', 'Consequently', 'Instead'] },
      { prompt: 'Sales fell sharply. ___, the company cut costs. (result)', answer: 'Consequently', options: ['Consequently', 'However', 'Moreover', 'In contrast'] },
    ],
  },
  {
    id: 'gr-ellipsis',
    level: 'B2',
    title: 'Ellipsis',
    titleMyanmar: 'ထပ်နေတဲ့စကားလုံးတွေဖြုတ်နည်း',
    titleMyanmarTh: 'การละคำ (ellipsis)',
    explanationMyanmar:
      'ထပ်နေတဲ့၊ နားလည်ပြီးသားစကားလုံးတွေကို ဖြုတ်ရေးတယ်။ She can play piano, and he can too. (too နောက်မှာ play piano ဖြုတ်ထားတယ်)။ စကားပြောနဲ့အရေးအသားကို သဘာဝကျ၊ တိုစေတယ်။',
    explanationMyanmarTh: 'ละคำที่ซ้ำหรือเข้าใจได้อยู่แล้ว: She can play piano and he can too (ละ play piano หลัง too) ทำให้ภาษาพูดและงานเขียนเป็นธรรมชาติและกระชับ',
    examples: [
      { english: 'I wanted to go, but I couldn\'t.', myanmar: 'ငါသွားချင်ခဲ့တယ်၊ ဒါပေမဲ့ မသွားနိုင်ခဲ့ဘူး။', myanmarTh: 'ผมอยากไป แต่ไปไม่ได้', },
      { english: 'She speaks three languages, and her brother does too.', myanmar: 'သူမ ဘာသာစကားသုံးမျိုးပြောတတ်တယ်၊ သူ့ညီလည်းပဲ။', myanmarTh: 'เธอพูดได้สามภาษา และพี่ชายเธอก็พูดได้เหมือนกัน', },
      { english: 'Have you finished? — I have.', myanmar: 'ပြီးပြီလား။ — ပြီးပြီ။', myanmarTh: 'คุณเสร็จหรือยัง — เสร็จแล้ว', },
      { english: 'Some people like tea, others prefer coffee.', myanmar: 'တချို့လူတွေက လက်ဖက်ရည်ကြိုက်တယ်၊ တချို့က ကော်ဖီကိုပိုကြိုက်တယ်။', myanmarTh: 'บางคนชอบชา บางคนชอบกาแฟ', },
    ],
    drills: [
      { prompt: 'I have never been to Japan, but she ___.', answer: 'has', options: ['has', 'has been', 'is', 'does'] },
      { prompt: 'You should study, and your sister ___ too.', answer: 'should', options: ['should', 'should study', 'does', 'is'] },
      { prompt: 'Did he call? — Yes, he ___.', answer: 'did', options: ['did', 'called', 'does', 'has'] },
    ],
  },
  {
    id: 'gr-emphatic-do',
    level: 'B2',
    title: 'Emphatic structures: do / does / did',
    titleMyanmar: 'အလေးပေးတဲ့ do / does / did',
    titleMyanmarTh: 'โครงสร้างเน้นด้วย do / does / did',
    explanationMyanmar:
      'ကြိယာရှေ့မှာ do/does/did ထည့်ပြီး အလေးပေးတယ်။ I DO like coffee! (ငါကော်ဖီကြိုက်တာအမှန်ပဲ)။ ငြင်းဆိုမှု၊ သံသယကို ဖြေရှင်းတဲ့အခါ၊ စိတ်အားထက်သန်မှုပြတဲ့အခါသုံးတယ်။',
    explanationMyanmarTh: 'ใส่ do / does / did หน้ากริยาเพื่อเน้น: I DO like coffee! (ผมชอบกาแฟจริงๆ นะ) ใช้ตอบข้อโต้แย้งหรือข้อสงสัย หรือแสดงความกระตือรือร้น',
    examples: [
      { english: 'I do believe you are right.', myanmar: 'မင်းမှန်တယ်ဆိုတာ ငါတကယ်ယုံကြည်တယ်။', myanmarTh: 'ผมเชื่อว่าคุณพูดถูกจริงๆ', },
      { english: 'She does work hard, even if nobody notices.', myanmar: 'ဘယ်သူမှသတိမထားပေမဲ့ သူမတကယ်ကြိုးစားတယ်။', myanmarTh: 'เธอทำงานหนักจริงๆ แม้ไม่มีใครสังเกต', },
      { english: 'He did finish the project on time.', myanmar: 'သူ ပရောဂျက်ကို အချိန်မှန်တကယ်ပြီးခဲ့တယ်။', myanmarTh: 'เขาทำโครงการเสร็จตรงเวลาจริงๆ', },
      { english: 'Do sit down and make yourself comfortable.', myanmar: 'ထိုင်ပါဦး၊ သက်တောင့်သက်သာနေပါ။', myanmarTh: 'เชิญนั่งตามสบาย', },
    ],
    drills: [
      { prompt: 'I ___ enjoy classical music.', answer: 'do', options: ['do', 'does', 'did', 'am'] },
      { prompt: 'She ___ look tired today.', answer: 'does', options: ['does', 'do', 'did', 'is'] },
      { prompt: 'They ___ complete the task yesterday.', answer: 'did', options: ['did', 'do', 'does', 'have'] },
    ],
  },
  {
    id: 'gr-future-perfect-continuous',
    level: 'B2',
    title: 'Future Perfect Continuous in use',
    titleMyanmar: 'Future Perfect Continuous လက်တွေ့သုံး',
    titleMyanmarTh: 'Future Perfect Continuous',
    explanationMyanmar:
      'အနာဂတ်အချိန်တစ်ခုမှာ ကြာမြင့်နေပြီးဖြစ်မယ့်လုပ်ဆောင်ချက်အတွက် will have been + V-ing သုံးတယ်။ By next year, I will have been working here for ten years. ကြာချိန်ကို အလေးပေးတယ်။',
    explanationMyanmarTh: 'การกระทำที่จะดำเนินมานานจนถึงจุดหนึ่งในอนาคตใช้ will have been + กริยาเติม -ing: By next year I will have been working here for ten years เน้นระยะเวลา',
    examples: [
      { english: 'By December, she will have been teaching for twenty years.', myanmar: 'ဒီဇင်ဘာလဆိုရင် သူမ သင်ကြားတာ နှစ်ဆယ်ကြာပြီးဖြစ်မယ်။', myanmarTh: 'ถึงเดือนธันวาคม เธอจะสอนมาครบยี่สิบปี', },
      { english: 'Next month, we will have been living here for a decade.', myanmar: 'နောက်လဆိုရင် ငါတို့ဒီမှာနေတာ ဆယ်စုနှစ်တစ်ခုကြာပြီးဖြစ်မယ်။', myanmarTh: 'เดือนหน้า พวกเราจะอยู่ที่นี่ครบสิบปี', },
      { english: 'By the time you arrive, I will have been waiting for two hours.', myanmar: 'မင်းရောက်တဲ့အချိန်ဆိုရင် ငါစောင့်နေတာ နှစ်နာရီကြာပြီးဖြစ်မယ်။', myanmarTh: 'ตอนคุณมาถึง ผมจะรอมาสองชั่วโมงแล้ว', },
      { english: 'In June, they will have been married for 25 years.', myanmar: 'ဇွန်လဆိုရင် သူတို့လက်ထပ်တာ ၂၅ နှစ်ကြာပြီးဖြစ်မယ်။', myanmarTh: 'ในเดือนมิถุนายน พวกเขาจะแต่งงานครบ 25 ปี', },
    ],
    drills: [
      { prompt: 'By 2030, I ___ here for fifteen years. (work)', answer: 'will have been working', options: ['will have been working', 'will have worked', 'will be working', 'have been working'] },
      { prompt: 'By next week, she ___ for a month. (study)', answer: 'will have been studying', options: ['will have been studying', 'will have studied', 'will study', 'has been studying'] },
      { prompt: 'By the time he retires, he ___ for 40 years. (teach)', answer: 'will have been teaching', options: ['will have been teaching', 'will have taught', 'will teach', 'has taught'] },
    ],
  },
  {
    id: 'gr-modal-perfects-deduction',
    level: 'B2',
    title: 'Modal perfects: must have / can\'t have (deduction)',
    titleMyanmar: 'must have / can\'t have — အတိတ်ခန့်မှန်းချက်',
    titleMyanmarTh: 'must have / cannot have (การคาดเดาเหตุการณ์ในอดีต)',
    explanationMyanmar:
      'အတိတ်အကြောင်းကို ခန့်မှန်းတဲ့အခါ must have + V3 (သေချာပေါက်...ခဲ့မှာ)၊ can\'t/couldn\'t have + V3 (မဖြစ်နိုင်ဘူး...ခဲ့မှာ) သုံးတယ်။ He must have forgotten. She can\'t have said that!။',
    explanationMyanmarTh: 'คาดเดาเหตุการณ์ในอดีต: must have + กริยาช่อง 3 (คงจะ...แน่ๆ) cannot / could not have + กริยาช่อง 3 (คงจะไม่ได้...แน่ๆ): He must have forgotten / She cannot have said that!',
    examples: [
      { english: 'He must have missed the bus; he is always late.', myanmar: 'သူ ဘတ်စ်ကားလွတ်ခဲ့မှာ သေချာတယ်၊ သူအမြဲနောက်ကျတတ်တယ်။', myanmarTh: 'เขาคงพลาดรถเมล์ เขาสายเสมอ', },
      { english: 'She can\'t have finished already — the exam just started!', myanmar: 'သူမ ပြီးသွားတာမဖြစ်နိုင်ဘူး — စာမေးပွဲက အခုမှစတာပါ။', myanmarTh: 'เธอคงยังทำไม่เสร็จหรอก ข้อสอบเพิ่งเริ่มเอง', },
      { english: 'They must have left early to avoid the traffic.', myanmar: 'သူတို့ ယာဉ်ကြောရှောင်ဖို့ စောစောထွက်သွားခဲ့ကြမှာ။', myanmarTh: 'พวกเขาคงออกแต่เช้าเพื่อเลี่ยงรถติด', },
      { english: 'You couldn\'t have seen him; he was abroad.', myanmar: 'မင်း သူ့ကိုတွေ့ခဲ့တာမဖြစ်နိုင်ဘူး၊ သူနိုင်ငံခြားမှာရှိခဲ့တယ်။', myanmarTh: 'คุณคงไม่ได้เห็นเขา เขาอยู่ต่างประเทศ', },
    ],
    drills: [
      { prompt: 'She ___ the keys at home; they are on the table. (leave)', answer: 'must have left', options: ['must have left', 'must left', 'must have leave', 'must leaves'] },
      { prompt: 'He ___ the message; his phone was off. (not / receive)', answer: 'can\'t have received', options: ['can\'t have received', 'can\'t received', 'couldn\'t receives', 'must not received'] },
      { prompt: 'They ___ about the meeting. (forget)', answer: 'must have forgotten', options: ['must have forgotten', 'must forgot', 'must have forget', 'must forgets'] },
    ],
  },
  {
    id: 'gr-modal-perfects-regret',
    level: 'B2',
    title: 'Modal perfects: should have (regret and criticism)',
    titleMyanmar: 'should have — နောင်တနဲ့ဝေဖန်ချက်',
    titleMyanmarTh: 'should have (ความเสียใจและการตำหนิ)',
    explanationMyanmar:
      'အတိတ်မှာ လုပ်သင့်တာမလုပ်ခဲ့တာ၊ မလုပ်သင့်တာလုပ်ခဲ့တာအတွက် should have + V3 / shouldn\'t have + V3 သုံးတယ်။ You should have called. (ဖုန်းဆက်သင့်ခဲ့တယ်)။ နောင်တ၊ ဝေဖန်ချက်၊ အကြံပြုချက်တွေမှာသုံးတယ်။',
    explanationMyanmarTh: 'เสียใจหรือตำหนิสิ่งที่เกิดในอดีต: should have + กริยาช่อง 3 / should not have + กริยาช่อง 3 (ควรจะ...แต่ไม่ได้ทำ / ไม่ควรจะ...แต่ทำ): You should have called (น่าจะโทรมาบ้าง)',
    examples: [
      { english: 'You should have told me you were sick.', myanmar: 'မင်းနေမကောင်းတာကို ငါ့ကိုပြောသင့်ခဲ့တယ်။', myanmarTh: 'คุณน่าจะบอกผมว่าคุณป่วย', },
      { english: 'I shouldn\'t have eaten so much cake.', myanmar: 'ငါ ကိတ်မုန့်အဲလောက်အများကြီးမစားသင့်ခဲ့ဘူး။', myanmarTh: 'ผมไม่น่ากินเค้กมากขนาดนั้น', },
      { english: 'She should have studied medicine, not law.', myanmar: 'သူမ ဥပဒေမဟုတ်ဘဲ ဆေးပညာသင်သင့်ခဲ့တယ်။', myanmarTh: 'เธอน่าจะเรียนหมอ ไม่ใช่กฎหมาย', },
      { english: 'We shouldn\'t have trusted him.', myanmar: 'ငါတို့ သူ့ကိုမယုံကြည်သင့်ခဲ့ဘူး။', myanmarTh: 'พวกเราไม่น่าไว้ใจเขา', },
    ],
    drills: [
      { prompt: 'You ___ me earlier. (warn)', answer: 'should have warned', options: ['should have warned', 'should warned', 'should have warn', 'should warns'] },
      { prompt: 'He ___ all his money. (not / spend)', answer: 'shouldn\'t have spent', options: ['shouldn\'t have spent', 'shouldn\'t spent', 'should not spend', 'shouldn\'t have spend'] },
      { prompt: 'They ___ for directions. (ask)', answer: 'should have asked', options: ['should have asked', 'should asked', 'should have ask', 'should asks'] },
    ],
  },
  {
    id: 'gr-modal-perfects-hypothetical',
    level: 'B2',
    title: 'Modal perfects: could have / would have',
    titleMyanmar: 'could have / would have — လွဲချော်ခဲ့တဲ့အခွင့်အရေးများ',
    titleMyanmarTh: 'could have / would have (เหตุการณ์ที่เกือบเกิด)',
    explanationMyanmar:
      'ဖြစ်နိုင်ခဲ့ပေမယ့် မဖြစ်ခဲ့တဲ့အရာတွေအတွက် could have + V3 (လုပ်နိုင်ခဲ့တယ်)၊ would have + V3 (လုပ်ခဲ့မှာပါ) သုံးတယ်။ I could have won. I would have helped, but I was busy.။',
    explanationMyanmarTh: 'สิ่งที่เกือบจะเกิดแต่ไม่เกิด: could have + กริยาช่อง 3 (เกือบทำได้) would have + กริยาช่อง 3 (คงจะทำ): I could have won / I would have helped but I was busy',
    examples: [
      { english: 'I could have bought that house, but I hesitated.', myanmar: 'ငါ အဲဒီအိမ်ဝယ်နိုင်ခဲ့တယ်၊ ဒါပေမဲ့ တွန့်ဆုတ်နေခဲ့တယ်။', myanmarTh: 'ผมเกือบซื้อบ้านหลังนั้น แต่ลังเล', },
      { english: 'She would have come, but she was ill.', myanmar: 'သူမ လာခဲ့မှာပါ၊ ဒါပေမဲ့ နေမကောင်းဖြစ်နေခဲ့တယ်။', myanmarTh: 'เธอคงมา แต่เธอป่วย', },
      { english: 'We could have avoided this problem.', myanmar: 'ငါတို့ ဒီပြဿနာကို ရှောင်နိုင်ခဲ့တယ်။', myanmarTh: 'พวกเราน่าจะหลีกเลี่ยงปัญหานี้ได้', },
      { english: 'He would have succeeded with a little more luck.', myanmar: 'ကံနည်းနည်းပိုကောင်းရင် သူအောင်မြင်ခဲ့မှာပါ။', myanmarTh: 'เขาคงสำเร็จถ้ามีโชคมากกว่านี้หน่อย', },
    ],
    drills: [
      { prompt: 'I ___ the exam if I had studied. (pass)', answer: 'could have passed', options: ['could have passed', 'could passed', 'could have pass', 'can have passed'] },
      { prompt: 'She ___ earlier, but the traffic was bad. (leave)', answer: 'would have left', options: ['would have left', 'would left', 'would have leave', 'will have left'] },
      { prompt: 'They ___ us, but nobody asked. (help)', answer: 'could have helped', options: ['could have helped', 'could helped', 'could have help', 'can have helped'] },
    ],
  },
  {
    id: 'gr-causative-have',
    level: 'B2',
    title: 'Causative: have / get something done',
    titleMyanmar: 'have / get ... done — သူများကိုခိုင်းစေနည်း',
    titleMyanmarTh: 'Causative: have / get something done',
    explanationMyanmar:
      'သူများကိုအလုပ်ခိုင်းတဲ့အခါ have + အရာ + V3 (I had my hair cut)၊ get + အရာ + V3 (I got my car fixed) သုံးတယ်။ ကိုယ်တိုင်မလုပ်ဘဲ ဝန်ဆောင်မှုရယူတဲ့အခါသုံးတယ်။',
    explanationMyanmarTh: 'จ้างหรือให้คนอื่นทำงานให้: have + กรรม + กริยาช่อง 3 (I had my hair cut) get + กรรม + กริยาช่อง 3 (I got my car fixed) ใช้เมื่อตัวเองไม่ได้ทำเองแต่ใช้บริการ',
    examples: [
      { english: 'I had my hair cut yesterday.', myanmar: 'ငါ မနေ့က ဆံပင်ညှပ်ခဲ့တယ်။ (ဆရာကိုညှပ်ခိုင်းတာ)', myanmarTh: 'ผมตัดผมเมื่อวานนี้', },
      { english: 'She got her house painted last month.', myanmar: 'သူမ ပြီးခဲ့တဲ့လက အိမ်ဆေးသုတ်ခိုင်းခဲ့တယ်။', myanmarTh: 'เธอทาสีบ้านเดือนที่แล้ว', },
      { english: 'We need to have the car serviced.', myanmar: 'ငါတို့ ကားကို ပြုပြင်ထိန်းသိမ်းခိုင်းဖို့လိုတယ်။', myanmarTh: 'พวกเราต้องเอารถเข้าศูนย์', },
      { english: 'He got his passport renewed.', myanmar: 'သူ ပတ်စ်ပို့ကို သက်တမ်းတိုးခိုင်းခဲ့တယ်။', myanmarTh: 'เขาต่อพาสปอร์ต', },
    ],
    drills: [
      { prompt: 'I had my phone ___. (repair)', answer: 'repaired', options: ['repaired', 'repair', 'repairing', 'to repair'] },
      { prompt: 'She got the documents ___. (translate)', answer: 'translated', options: ['translated', 'translate', 'translating', 'to translate'] },
      { prompt: 'We will have the roof ___. (fix)', answer: 'fixed', options: ['fixed', 'fix', 'fixing', 'to fix'] },
    ],
  },
  {
    id: 'gr-need-gerund',
    level: 'B2',
    title: 'Need + gerund (passive meaning)',
    titleMyanmar: 'need + V-ing — လိုအပ်တဲ့ပြုပြင်မှု',
    titleMyanmarTh: 'need + gerund (ความหมายเชิงถูกกระทำ)',
    explanationMyanmar:
      'need + V-ing က "လုပ်ဖို့လိုတယ်" လို့ passive အဓိပ္ပာယ်ရတယ်။ The car needs washing (= needs to be washed)။ need + to be + V3 နဲ့အတူတူပဲ၊ ဒါပေမဲ့ ပိုတိုပြီးသဘာဝကျတယ်။',
    explanationMyanmarTh: 'need + กริยาเติม -ing มีความหมายเชิงถูกกระทำว่า ต้องการให้ทำ: The car needs washing (= needs to be washed) ความหมายเดียวกับ need + to be + กริยาช่อง 3 แต่สั้นและเป็นธรรมชาติกว่า',
    examples: [
      { english: 'Your shoes need cleaning.', myanmar: 'မင်းဖိနပ်တွေ သန့်ရှင်းရေးလုပ်ဖို့လိုတယ်။', myanmarTh: 'รองเท้าของคุณต้องทำความสะอาด', },
      { english: 'The garden needs watering.', myanmar: 'ဥယျာဉ်ကို ရေလောင်းဖို့လိုတယ်။', myanmarTh: 'สวนต้องรดน้ำ', },
      { english: 'This report needs checking before we send it.', myanmar: 'ဒီအစီရင်ခံစာကို မပို့ခင် စစ်ဆေးဖို့လိုတယ်။', myanmarTh: 'รายงานนี้ต้องตรวจก่อนส่ง', },
      { english: 'The house needs painting.', myanmar: 'အိမ်ကို ဆေးသုတ်ဖို့လိုတယ်။', myanmarTh: 'บ้านต้องทาสี', },
    ],
    drills: [
      { prompt: 'The windows need ___. (wash)', answer: 'washing', options: ['washing', 'washed', 'to washed', 'wash'] },
      { prompt: 'My bike needs ___. (repair)', answer: 'repairing', options: ['repairing', 'repaired', 'to repaired', 'repair'] },
      { prompt: 'The grass needs ___. (cut)', answer: 'cutting', options: ['cutting', 'cutted', 'to cutted', 'cut'] },
    ],
  },
  {
    id: 'gr-concessive-advanced',
    level: 'B2',
    title: 'Advanced concessive clauses',
    titleMyanmar: 'ဆန့်ကျင်ဘက်အကြောင်းပြပုဒ်စုအဆင့်မြင့်',
    titleMyanmarTh: 'อนุประโยคแสดงความขัดแย้งขั้นสูง',
    explanationMyanmar:
      'although/even though အပြင်: despite/in spite of + နာမ်/V-ing၊ however + နာမဝိသေသန (However difficult it is...)၊ much as, while/whereas တို့နဲ့ ဆန့်ကျင်ဘက်အကြောင်းပြချက်ပေးတယ်။',
    explanationMyanmarTh: 'นอกจาก although / even though ยังมี: despite / in spite of + คำนาม / กริยาเติม -ing however + คำคุณศัพท์ (However difficult it is ...) much as while / whereas ใช้บอกเหตุผลที่ขัดแย้งกัน',
    examples: [
      { english: 'Despite the rain, the event was a success.', myanmar: 'မိုးရွာနေပေမဲ့ ပွဲကအောင်မြင်ခဲ့တယ်။', myanmarTh: 'แม้ฝนตก งานก็ประสบความสำเร็จ', },
      { english: 'However tired he was, he kept working.', myanmar: 'သူဘယ်လောက်ပင်ပန်းပင်ပန်း ဆက်အလုပ်လုပ်နေခဲ့တယ်။', myanmarTh: 'เขาเหนื่อยแค่ไหนก็ยังทำงานต่อ', },
      { english: 'Much as I respect him, I cannot agree.', myanmar: 'သူ့ကိုဘယ်လောက်လေးစားလေးစား သဘောမတူနိုင်ဘူး။', myanmarTh: 'ผมนับถือเขาแค่ไหนก็เห็นด้วยไม่ได้', },
      { english: 'While I understand your concern, we must proceed.', myanmar: 'မင်းရဲ့စိုးရိမ်မှုကို ငါနားလည်ပေမဲ့ ငါတို့ဆက်လုပ်ရမယ်။', myanmarTh: 'ผมเข้าใจความกังวลของคุณ แต่พวกเราต้องดำเนินการต่อ', },
    ],
    drills: [
      { prompt: '___ the delay, we arrived on time. (despite → ___)', answer: 'Despite', options: ['Despite', 'Although', 'However', 'Even'] },
      { prompt: '___ rich he is, he is not happy. (however → ___)', answer: 'However', options: ['However', 'Despite', 'Although', 'Much'] },
      { prompt: '___ I admire her, I disagree with this decision. (much as → ___)', answer: 'Much as', options: ['Much as', 'Despite', 'However', 'While as'] },
    ],
  },
  {
    id: 'gr-purpose-advanced',
    level: 'B2',
    title: 'Advanced purpose clauses',
    titleMyanmar: 'ရည်ရွယ်ချက်ပုဒ်စုအဆင့်မြင့်',
    titleMyanmarTh: 'อนุประโยคแสดงจุดประสงค์ขั้นสูง',
    explanationMyanmar:
      'to + V1 အပြင် တရားဝင်ပုံစံများ: in order to, so as to (အနုတ် — so as not to)၊ so that / in order that + can/will (သို့) could/would။ She left early so that she could catch the train.။',
    explanationMyanmarTh: 'นอกจาก to + กริยา รูปทางการมี: in order to so as to (รูปปฏิเสธ: so as not to) so that / in order that + can / will (หรือ could / would): She left early so that she could catch the train',
    examples: [
      { english: 'He saved money in order to buy a house.', myanmar: 'သူ အိမ်ဝယ်ဖို့ ပိုက်ဆံစုခဲ့တယ်။', myanmarTh: 'เขาเก็บเงินเพื่อซื้อบ้าน', },
      { english: 'She whispered so as not to wake the baby.', myanmar: 'သူမ ကလေးမနိုးအောင် တိုးတိုးပြောခဲ့တယ်။', myanmarTh: 'เธอกระซิบเพื่อไม่ให้ทารกตื่น', },
      { english: 'We hurried so that we would not miss the flight.', myanmar: 'ငါတို့ လေယာဉ်မလွတ်အောင် အမြန်သွားခဲ့ကြတယ်။', myanmarTh: 'พวกเรารีบเพื่อไม่ให้พลาดเที่ยวบิน', },
      { english: 'He took notes in order that he might remember everything.', myanmar: 'သူ အရာအားလုံးမှတ်မိနိုင်အောင် မှတ်စုယူခဲ့တယ်။', myanmarTh: 'เขาจดโน้ตเพื่อจะได้จำทุกอย่าง', },
    ],
    drills: [
      { prompt: 'She studied hard ___ pass the exam. (purpose → ___)', answer: 'in order to', options: ['in order to', 'so that to', 'for to', 'to for'] },
      { prompt: 'He spoke quietly ___ wake the children. (negative purpose → ___)', answer: 'so as not to', options: ['so as not to', 'so not to', 'not to so as', 'in order not'] },
      { prompt: 'They left early ___ they could get good seats.', answer: 'so that', options: ['so that', 'so as to', 'in order', 'for'] },
    ],
  },
  {
    id: 'gr-would-rather',
    level: 'B2',
    title: 'Would rather / prefer / sooner',
    titleMyanmar: 'would rather / prefer သုံးနည်း',
    titleMyanmarTh: 'วิธีใช้ would rather / prefer',
    explanationMyanmar:
      'နှစ်ခုထဲကတစ်ခုကို ရွေးချယ်တဲ့အခါ would rather + V1 (than + V1) သုံးတယ်။ I\'d rather stay home than go out. prefer + V-ing to V-ing (I prefer reading to watching TV)။ သူများအတွက်ဆို would rather + အကြောင်းအရာ + past tense။',
    explanationMyanmarTh: 'เลือกระหว่างสองสิ่งใช้ would rather + กริยารูปพื้นฐาน (than + กริยารูปพื้นฐาน): I would rather stay home than go out / prefer + กริยาเติม -ing to กริยาเติม -ing (I prefer reading to watching TV) ถ้าเป็นคนอื่นใช้ would rather + ประธาน + อดีตกาล',
    examples: [
      { english: 'I would rather drink tea than coffee.', myanmar: 'ငါ ကော်ဖီထက် လက်ဖက်ရည်သောက်ရတာပိုကြိုက်တယ်။', myanmarTh: 'ผมอยากดื่มชามากกว่ากาแฟ', },
      { english: 'She prefers walking to driving.', myanmar: 'သူမ ကားမောင်းတာထက် လမ်းလျှောက်ရတာပိုကြိုက်တယ်။', myanmarTh: 'เธอชอบเดินมากกว่าขับรถ', },
      { english: 'I would rather you came tomorrow.', myanmar: 'မင်း မနက်ဖြန်လာစေချင်တယ်။', myanmarTh: 'ผมอยากให้คุณมาพรุ่งนี้', },
      { english: 'He would sooner resign than admit he was wrong.', myanmar: 'သူ မှားတယ်လို့ဝန်ခံတာထက် အလုပ်ထွက်ရတာပိုကြိုက်တယ်။', myanmarTh: 'เขายอมลาออกดีกว่ายอมรับว่าผิด', },
    ],
    drills: [
      { prompt: 'I would rather ___ at home. (stay)', answer: 'stay', options: ['stay', 'stayed', 'staying', 'to stay'] },
      { prompt: 'She prefers tea ___ coffee. (to → ___)', answer: 'to', options: ['to', 'than', 'over', 'from'] },
      { prompt: 'I would rather you ___ the truth. (tell → past)', answer: 'told', options: ['told', 'tell', 'tells', 'telling'] },
    ],
  },
  {
    id: 'gr-question-tags-advanced',
    level: 'B2',
    title: 'Advanced question tags',
    titleMyanmar: 'အဆင့်မြင့် question tag များ',
    titleMyanmarTh: 'Question tag ขั้นสูง',
    explanationMyanmar:
      'အခြေခံ tag အပြင်: imperative tag (Open the door, will you?)၊ nobody/everybody tag (Nobody called, did they?)၊ Let\'s tag (Let\'s go, shall we?)၊ အတည်ပြုဝါကျမှာ အနုတ် tag၊ အနုတ်ဝါကျမှာ အတည် tag။',
    explanationMyanmarTh: 'นอกจาก tag พื้นฐาน: tag หลังประโยคคำสั่ง (Open the door will you?) tag กับ nobody / everybody (Nobody called did they?) tag หลัง Let us (Let us go shall we?) ประโยคบอกเล่าใช้ tag ปฏิเสธ ประโยคปฏิเสธใช้ tag บอกเล่า',
    examples: [
      { english: 'Close the window, will you?', myanmar: 'ပြတင်းပေါက်ပိတ်ပေးပါ့လား။', myanmarTh: 'ปิดหน้าต่างหน่อยได้ไหม', },
      { english: 'Nobody answered, did they?', myanmar: 'ဘယ်သူမှမဖြေခဲ့ဘူး၊ ဟုတ်လား။', myanmarTh: 'ไม่มีใครตอบใช่ไหม', },
      { english: 'Let\'s have lunch together, shall we?', myanmar: 'အတူတူနေ့လည်စာစားကြရအောင်၊ ဟုတ်လား။', myanmarTh: 'ไปกินข้าวเที่ยงด้วยกันเถอะนะ', },
      { english: 'Everybody enjoyed the show, didn\'t they?', myanmar: 'လူတိုင်းပွဲကိုပျော်ခဲ့ကြတယ်၊ ဟုတ်လား။', myanmarTh: 'ทุกคนสนุกกับการแสดงใช่ไหม', },
    ],
    drills: [
      { prompt: 'Sit down, ___ you?', answer: 'will', options: ['will', 'won\'t', 'do', 'shall'] },
      { prompt: 'Nobody was hurt, ___ they?', answer: 'were', options: ['were', 'was', 'did', 'weren\'t'] },
      { prompt: 'Let\'s start, ___ we?', answer: 'shall', options: ['shall', 'will', 'do', 'can'] },
    ],
  },
  {
    id: 'gr-subjunctive-formal',
    level: 'C1',
    title: 'Formal subjunctive: be it ... / were to ...',
    titleMyanmar: 'တရားဝင်ဆန်သော subjunctive',
    titleMyanmarTh: 'Subjunctive แบบเป็นทางการ',
    explanationMyanmar:
      'C1 အဆင့် တရားဝင်အရေးအသား: Be it resolved that... (ဆုံးဖြတ်ချက်ချမှတ်တယ်)၊ If he were to resign... (သူထွက်ခဲ့ရင် — စိတ်ကူးယဉ်အနာဂတ်)၊ come what may, suffice it to say။ ဥပဒေ၊ တရားဝင်စာတွေမှာတွေ့ရတယ်။',
    explanationMyanmarTh: 'Subjunctive ทางการระดับ C1: Be it resolved that ... (มีมติว่า) If he were to resign ... (ถ้าเขาจะลาออก — อนาคตสมมติ) come what may suffice it to say พบในกฎหมายและเอกสารทางการ',
    examples: [
      { english: 'Be it enacted that all citizens have equal rights.', myanmar: 'နိုင်ငံသားတိုင်း တန်းတူအခွင့်အရေးရှိစေဖို့ ပြဋ္ဌာန်းလိုက်တယ်။', myanmarTh: 'มีมติให้พลเมืองทุกคนมีสิทธิเท่าเทียมกัน', },
      { english: 'If he were to win the election, policies would change.', myanmar: 'သူရွေးကောက်ပွဲအနိုင်ရခဲ့ရင် မူဝါဒတွေပြောင်းမှာပါ။', myanmarTh: 'ถ้าเขาจะชนะการเลือกตั้ง นโยบายจะเปลี่ยน', },
      { english: 'Come what may, we will finish this project.', myanmar: 'ဘာပဲဖြစ်ဖြစ် ငါတို့ဒီပရောဂျက်ကို ပြီးအောင်လုပ်မယ်။', myanmarTh: 'จะเกิดอะไรขึ้นก็ตาม พวกเราจะทำโครงการนี้ให้เสร็จ', },
      { english: 'Suffice it to say, the meeting was a disaster.', myanmar: 'ပြောရရင် အစည်းအဝေးက ဆိုးရွားခဲ့တာပါ။', myanmarTh: 'พูดสั้นๆ ว่า การประชุมเป็นหายนะ', },
    ],
    drills: [
      { prompt: '___ it known that the office is closed. (be → ___)', answer: 'Be', options: ['Be', 'Is', 'Being', 'To be'] },
      { prompt: 'If she ___ to refuse, we would need a new plan. (were → ___)', answer: 'were', options: ['were', 'was', 'is', 'be'] },
      { prompt: '___ what may, I will support you.', answer: 'Come', options: ['Come', 'Comes', 'Coming', 'To come'] },
    ],
  },
  {
    id: 'gr-fronting',
    level: 'C1',
    title: 'Fronting for emphasis',
    titleMyanmar: 'အလေးပေးဖို့ စကားလုံးရှေ့ထုတ်နည်း',
    titleMyanmarTh: 'การย้ายส่วนประโยคมาข้างหน้าเพื่อเน้น',
    explanationMyanmar:
      'အလေးပေးချင်တဲ့အပိုင်း (object, complement, adverbial) ကို ဝါကျအစပို့တယ်။ Most of all I remember her smile. Terrible was the storm. Rare books does he collect. စာပေ၊ မိန့်ခွန်းမှာ အကျိုးသက်ရောက်မှုကြီးတယ်။',
    explanationMyanmarTh: 'ย้ายส่วนที่ต้องการเน้น (กรรม ส่วนเติมเต็ม หรือวลีกริยาวิเศษณ์) มาหน้าประโยค: Most of all I remember her smile / Terrible was the storm / Rare books does he collect ให้ผลรุนแรงในงานวรรณศิลป์และสุนทรพจน์',
    examples: [
      { english: 'Never will I forget that day.', myanmar: 'အဲဒီနေ့ကို ငါဘယ်တော့မှမေ့မှာမဟုတ်ဘူး။', myanmarTh: 'ผมจะไม่มีวันลืมวันนั้น', },
      { english: 'Most of all, I remember my grandmother\'s stories.', myanmar: 'အရာအားလုံးထဲမှာ အဖွားရဲ့ပုံပြင်တွေကို အမှတ်ရဆုံးပါ။', myanmarTh: 'สิ่งที่ผมจำได้มากที่สุดคือเรื่องเล่าของยาย', },
      { english: 'Down came the rain in torrents.', myanmar: 'မိုးသည်းထန်စွာရွာချလိုက်တယ်။', myanmarTh: 'ฝนเทลงมาอย่างหนัก', },
      { english: 'Such talent have I rarely seen.', myanmar: 'အဲဒီလောက်ထူးချွန်တဲ့အရည်အချင်းကို ငါရှားရှားပါးပါးပဲတွေ့ဖူးတယ်။', myanmarTh: 'ผมแทบไม่เคยเห็นพรสวรรค์ขนาดนี้', },
    ],
    drills: [
      { prompt: '___ did the audience applaud. (object fronting: "The performance" → ___)', answer: 'The performance', options: ['The performance', 'Applauded', 'Loudly', 'It'] },
      { prompt: 'Up ___ the balloons into the sky. (verb fronting)', answer: 'went', options: ['went', 'go', 'going', 'to go'] },
      { prompt: 'Only then ___ the truth. (did → "did I learn")', answer: 'did I learn', options: ['did I learn', 'I learned', 'learned I', 'I did learn'] },
    ],
  },
  {
    id: 'gr-inversion-scarcely',
    level: 'C1',
    title: 'Inversion: Scarcely / No sooner ... than',
    titleMyanmar: 'Scarcely / No sooner ပြောင်းပြန်ဝါကျ',
    titleMyanmarTh: 'การผกผันด้วย Scarcely / No sooner',
    explanationMyanmar:
      'Scarcely/Hardly ... when... နဲ့ No sooner ... than... — "တစ်ခုပြီးတာနဲ့ နောက်တစ်ခုဖြစ်တယ်"။ Scarcely had I sat down when the phone rang. No sooner had she arrived than it started raining. စာပေဆန်တဲ့ပုံစံ။',
    explanationMyanmarTh: 'Scarcely / Hardly ... when ... และ No sooner ... than ... แปลว่า พอ...ก็...: Scarcely had I sat down when the phone rang / No sooner had she arrived than it started raining เป็นรูปเชิงวรรณศิลป์',
    examples: [
      { english: 'Scarcely had I closed my eyes when the alarm rang.', myanmar: 'ငါမျက်လုံးမှိတ်ပြီးတာနဲ့ နှိုးစက်မြည်လာတယ်။', myanmarTh: 'ผมแทบยังไม่ทันหลับตา นาฬิกาปลุกก็ดัง', },
      { english: 'No sooner had we left than the storm began.', myanmar: 'ငါတို့ထွက်ပြီးတာနဲ့ မုန်တိုင်းစလာတယ်။', myanmarTh: 'พวกเราเพิ่งออกมา พายุก็เริ่ม', },
      { english: 'Hardly had the meeting ended when reporters rushed in.', myanmar: 'အစည်းအဝေးပြီးတာနဲ့ သတင်းထောက်တွေအလျင်အမြန်ဝင်လာခဲ့ကြတယ်။', myanmarTh: 'การประชุมแทบยังไม่ทันจบ นักข่าวก็กรูเข้ามา', },
      { english: 'No sooner does he arrive than he starts complaining.', myanmar: 'သူရောက်ပြီးတာနဲ့ ညည်းညူစပြုတယ်။', myanmarTh: 'เขาเพิ่งมาถึงก็เริ่มบ่น', },
    ],
    drills: [
      { prompt: 'Scarcely ___ I finished when he called. (have → ___)', answer: 'had', options: ['had', 'have', 'has', 'did'] },
      { prompt: 'No sooner had she spoken ___ everyone laughed. (than → ___)', answer: 'than', options: ['than', 'when', 'then', 'that'] },
      { prompt: 'Hardly had they left ___ the rain started. (when → ___)', answer: 'when', options: ['when', 'than', 'then', 'that'] },
    ],
  },
  {
    id: 'gr-absolute-participle',
    level: 'C1',
    title: 'Absolute participle clauses',
    titleMyanmar: 'ကိုယ်ပိုင်အကြောင်းအရာပါတဲ့ participle ပုဒ်စု',
    titleMyanmarTh: 'อนุประโยค participle แบบสัมบูรณ์',
    explanationMyanmar:
      'ပုဒ်စုမှာ ကိုယ်ပိုင်အကြောင်းအရာပါတဲ့ participle ပုံစံ။ The meeting (being) over, we left. (= The meeting was over, so we left)။ Weather permitting, we will go hiking. တရားဝင်အရေးအသားမှာသုံးတယ်။',
    explanationMyanmarTh: 'วลี participle ที่มีประธานของตัวเอง: The meeting (being) over we left (= The meeting was over so we left) / Weather permitting we will go hiking ใช้ในงานเขียนทางการ',
    examples: [
      { english: 'The concert being over, the crowd slowly left.', myanmar: 'ကပွဲပြီးသွားတာကြောင့် လူအုပ်ကြီးဖြည်းဖြည်းချင်းပြန်သွားတယ်။', myanmarTh: 'คอนเสิร์ตจบแล้ว ฝูงชนค่อยๆ ออกไป', },
      { english: 'Weather permitting, we will hold the ceremony outdoors.', myanmar: 'ရာသီဥတုသာယာရင် အခမ်းအနားကို အပြင်မှာကျင်းပမယ်။', myanmarTh: 'ถ้าอากาศดี พวกเราจะจัดพิธีข้างนอก', },
      { english: 'All things considered, it was a wise decision.', myanmar: 'အရာအားလုံးစဉ်းစားကြည့်ရင် ဒါကပညာရှိတဲ့ဆုံးဖြတ်ချက်ပါ။', myanmarTh: 'พิจารณาทุกอย่างแล้ว เป็นการตัดสินใจที่ฉลาด', },
      { english: 'Her homework done, she went out to play.', myanmar: 'အိမ်စာပြီးသွားတာကြောင့် သူမအပြင်ဆော့ထွက်သွားတယ်။', myanmarTh: 'การบ้านเสร็จแล้ว เธอออกไปเล่น', },
    ],
    drills: [
      { prompt: '___ permitting, the match will continue. (weather → ___)', answer: 'Weather', options: ['Weather', 'The weather', 'Weather is', 'If weather'] },
      { prompt: 'The report ___, we submitted it. (finish → "being finished" → ___)', answer: 'being finished', options: ['being finished', 'finished', 'finishing', 'to finish'] },
      { prompt: '___ considered, the plan is reasonable. (all things → ___)', answer: 'All things', options: ['All things', 'All thing', 'Things all', 'Every thing'] },
    ],
  },
  {
    id: 'gr-cohesion',
    level: 'C1',
    title: 'Cohesive devices: substitution and reference',
    titleMyanmar: 'စာသားဆက်နွယ်မှုကိရိယာများ',
    titleMyanmarTh: 'เครื่องมือเชื่อมโยงข้อความ',
    explanationMyanmar:
      'စာပိုဒ်တွေကို ဆက်နွယ်စေတဲ့နည်းလမ်းများ: substitution (one, ones, so, do so — I want the red one)၊ reference (this, that, such — Such behaviour is unacceptable)၊ ellipsis။ ပညာရပ်ဆိုင်ရာအရေးအသားမှာ မရှိမဖြစ်လိုအပ်တယ်။',
    explanationMyanmarTh: 'เครื่องมือเชื่อมย่อหน้า: substitution (one ones so do so: I want the red one) reference (this that such: Such behaviour is unacceptable) ellipsis จำเป็นอย่างยิ่งในงานเขียนวิชาการ',
    examples: [
      { english: 'I need a new laptop; this one is too slow.', myanmar: 'ငါလက်ပ်တော့အသစ်လိုတယ်၊ ဒီတစ်ခုက အရမ်းနှေးတယ်။', myanmarTh: 'ผมต้องการแล็ปท็อปใหม่ เครื่องนี้ช้าเกินไป', },
      { english: 'He promised to help, and he did so immediately.', myanmar: 'သူကူညီမယ်လို့ကတိပေးခဲ့တယ်၊ ပြီးတော့ ချက်ချင်းပဲလုပ်ပေးခဲ့တယ်။', myanmarTh: 'เขาสัญญาว่าจะช่วย และเขาก็ทำทันที', },
      { english: 'Such measures are necessary to protect public health.', myanmar: 'အဲဒီလိုအစီအမံတွေက ပြည်သူ့ကျန်းမာရေးကာကွယ်ဖို့လိုအပ်တယ်။', myanmarTh: 'มาตรการเช่นนี้จำเป็นเพื่อปกป้องสุขภาพประชาชน', },
      { english: 'The first experiment failed; the second one succeeded.', myanmar: 'ပထမစမ်းသပ်မှုကျရှုံးခဲ့တယ်၊ ဒုတိယတစ်ခုကအောင်မြင်ခဲ့တယ်။', myanmarTh: 'การทดลองแรกล้มเหลว การทดลองที่สองสำเร็จ', },
    ],
    drills: [
      { prompt: 'I like these shoes; those ___ are cheaper. (one → ___)', answer: 'ones', options: ['ones', 'one', 'once', 'one\'s'] },
      { prompt: 'She said she would call, and she did ___.', answer: 'so', options: ['so', 'it', 'that', 'such'] },
      { prompt: '___ policies have proven effective. (such → ___)', answer: 'Such', options: ['Such', 'So', 'This', 'That'] },
    ],
  },
  {
    id: 'gr-nominal-relatives',
    level: 'C1',
    title: 'Nominal relative clauses: whatever, whoever, whichever',
    titleMyanmar: 'whatever / whoever / whichever ပုဒ်စုများ',
    titleMyanmarTh: 'อนุประโยค relative แบบนาม: whatever / whoever',
    explanationMyanmar:
      'whatever (= anything that), whoever (= anyone who), whichever, wherever, however တို့နဲ့ ပုဒ်စုလုပ်တယ်။ Whatever you decide is fine. (မင်းဘာဆုံးဖြတ်ဖြတ် အဆင်ပြေတယ်)။ တရားဝင်စကားပြော၊ အရေးအသားမှာသုံးတယ်။',
    explanationMyanmarTh: 'whatever (= anything that) whoever (= anyone who) whichever wherever however ทำเป็นอนุประโยค: Whatever you decide is fine (คุณจะตัดสินใจอย่างไรก็ได้) ใช้ในภาษาพูดและงานเขียนทางการ',
    examples: [
      { english: 'Whatever you choose, I will support you.', myanmar: 'မင်းဘာရွေးရွေး ငါထောက်ခံမယ်။', myanmarTh: 'คุณจะเลือกอะไรผมก็สนับสนุน', },
      { english: 'Whoever arrives first should start the meeting.', myanmar: 'အရင်ရောက်တဲ့သူက အစည်းအဝေးစသင့်တယ်။', myanmarTh: 'ใครมาก่อนควรเริ่มการประชุม', },
      { english: 'Take whichever seat you prefer.', myanmar: 'မင်းကြိုက်တဲ့ခုံကို ယူထိုင်ပါ။', myanmarTh: 'เลือกที่นั่งที่คุณชอบ', },
      { english: 'However hard you try, some things cannot change.', myanmar: 'မင်းဘယ်လောက်ကြိုးစားကြိုးစား တချို့အရာတွေက ပြောင်းလဲလို့မရဘူး။', myanmarTh: 'คุณจะพยายามแค่ไหน บางสิ่งก็เปลี่ยนไม่ได้', },
    ],
    drills: [
      { prompt: '___ happens, stay calm.', answer: 'Whatever', options: ['Whatever', 'Whenever', 'Wherever', 'However'] },
      { prompt: '___ told you that was lying.', answer: 'Whoever', options: ['Whoever', 'Whatever', 'Whichever', 'Whenever'] },
      { prompt: 'Choose ___ colour you like best.', answer: 'whichever', options: ['whichever', 'whatever', 'whoever', 'however'] },
    ],
  },
  {
    id: 'gr-conditional-advanced',
    level: 'C1',
    title: 'Advanced conditionals: unless, even if, provided that',
    titleMyanmar: 'အဆင့်မြင့်အခြေအနေဝါကျများ',
    titleMyanmarTh: 'ประโยคเงื่อนไขขั้นสูง: unless / even if / provided that',
    explanationMyanmar:
      'if အပြင်: unless (= if ... not — You won\'t pass unless you study)၊ even if (ဖြစ်ရင်တောင်)၊ provided/providing (that) (ဆိုရင်...လို့အခြေအနေပေး)၊ as long as။ အဓိပ္ပာယ်ကွာခြားချက်ကို သတိထားရမယ်။',
    explanationMyanmarTh: 'นอกจาก if ยังมี: unless (= if ... not: You will not pass unless you study) even if (แม้ว่า) provided / providing (that) (ถ้า...โดยมีเงื่อนไข) as long as ต้องระวังความหมายที่ต่างกันของแต่ละคำ',
    examples: [
      { english: 'You cannot enter unless you show your ID.', myanmar: 'မှတ်ပုံတင်မပြရင် ဝင်လို့မရဘူး။', myanmarTh: 'คุณเข้าไม่ได้ถ้าไม่แสดงบัตร', },
      { english: 'Even if it rains, the match will go ahead.', myanmar: 'မိုးရွာရင်တောင် ပွဲကဆက်ကျင်းပမှာပါ။', myanmarTh: 'แม้ฝนตก การแข่งขันก็ดำเนินต่อ', },
      { english: 'You can borrow the car provided that you return it by six.', myanmar: 'ညနေ ၆ နာရီအရောက်ပြန်ပေးရင် ကားကိုငှားနိုင်တယ်။', myanmarTh: 'คุณยืมรถได้ถ้าคืนก่อนหกโมง', },
      { english: 'As long as you try your best, nobody will blame you.', myanmar: 'မင်းအကောင်းဆုံးကြိုးစားသရွေ့ ဘယ်သူမှအပြစ်မတင်ဘူး။', myanmarTh: 'ตราบใดที่คุณพยายามเต็มที่ ไม่มีใครตำหนิคุณ', },
    ],
    drills: [
      { prompt: '___ you hurry, you will miss the train. (= if you do not hurry)', answer: 'Unless', options: ['Unless', 'If', 'Even if', 'Provided'] },
      { prompt: '___ he apologizes, I will forgive him. (= on condition that)', answer: 'Provided that', options: ['Provided that', 'Unless', 'Even if', 'If not'] },
      { prompt: 'I will go ___ it snows. (= despite the snow)', answer: 'even if', options: ['even if', 'unless', 'provided that', 'as if'] },
    ],
  },
  {
    id: 'gr-future-in-past',
    level: 'C1',
    title: 'Future in the past',
    titleMyanmar: 'အတိတ်ထဲကအနာဂတ်',
    titleMyanmarTh: 'อนาคตในอดีต',
    explanationMyanmar:
      'အတိတ်အချိန်ကနေ အနာဂတ်ကိုပြောတဲ့အခါ: was/were going to (I was going to call, but...)၊ would (She said she would come)၊ was about to (I was about to leave when he arrived)။ ဇာတ်လမ်းပြောတဲ့အခါ အလွန်အသုံးဝင်တယ်။',
    explanationMyanmarTh: 'พูดถึงอนาคตจากมุมมองในอดีต: was / were going to (I was going to call but ...) would (She said she would come) was about to (I was about to leave when he arrived) มีประโยชน์มากในการเล่าเรื่อง',
    examples: [
      { english: 'I was going to visit you, but I got sick.', myanmar: 'ငါမင်းဆီလာလည်ဖို့စီစဉ်ခဲ့တယ်၊ ဒါပေမဲ့ နေမကောင်းဖြစ်သွားတယ်။', myanmarTh: 'ผมกำลังจะไปเยี่ยมคุณ แต่ผมป่วย', },
      { english: 'She knew the train would be late.', myanmar: 'သူမ ရထားနောက်ကျမယ်ဆိုတာ သိခဲ့တယ်။', myanmarTh: 'เธอรู้ว่ารถไฟจะสาย', },
      { english: 'We were about to board when the flight was cancelled.', myanmar: 'ငါတို့လေယာဉ်တက်ဖို့လုပ်နေတုန်း ခရီးစဉ်ဖျက်သိမ်းလိုက်တယ်။', myanmarTh: 'พวกเรากำลังจะขึ้นเครื่องตอนเที่ยวบินถูกยกเลิก', },
      { english: 'He promised he would write every week.', myanmar: 'သူ အပတ်တိုင်းစာရေးမယ်လို့ ကတိပေးခဲ့တယ်။', myanmarTh: 'เขาสัญญาว่าจะเขียนมาทุกสัปดาห์', },
    ],
    drills: [
      { prompt: 'I ___ call you, but my phone died. (was going to → ___)', answer: 'was going to', options: ['was going to', 'will', 'would', 'am going to'] },
      { prompt: 'They said the show ___ start at eight. (would → ___)', answer: 'would', options: ['would', 'will', 'shall', 'is'] },
      { prompt: 'She ___ leave when I stopped her. (was about to → ___)', answer: 'was about to', options: ['was about to', 'is about to', 'will', 'would'] },
    ],
  },
  {
    id: 'gr-infinitive-advanced',
    level: 'C1',
    title: 'Advanced infinitive constructions: seem to, happen to',
    titleMyanmar: 'seem to / happen to အဆင့်မြင့်ပုံစံများ',
    titleMyanmarTh: 'โครงสร้าง infinitive ขั้นสูง: seem to / happen to',
    explanationMyanmar:
      'seem/appear/tend/happen + to-infinitive (She seems to know everything)၊ perfect infinitive — seem to have + V3 (He seems to have forgotten)၊ too/enough + to-infinitive အဆင့်မြင့်သုံး။ သတင်းအရေးအသား၊ ပညာရပ်ဆိုင်ရာမှာသုံးတယ်။',
    explanationMyanmarTh: 'seem / appear / tend / happen + to-infinitive (She seems to know everything) perfect infinitive: seem to have + กริยาช่อง 3 (He seems to have forgotten) และการใช้ too / enough + to-infinitive ขั้นสูง ใช้ในงานข่าวและงานวิชาการ',
    examples: [
      { english: 'He seems to have misunderstood the instructions.', myanmar: 'သူ ညွှန်ကြားချက်တွေကို နားလည်မှုလွဲခဲ့ပုံရတယ်။', myanmarTh: 'ดูเหมือนเขาเข้าใจคำแนะนำผิด', },
      { english: 'She happened to be there when it happened.', myanmar: 'သူမ အဲဒီအချိန်မှာ တိုက်တိုက်ဆိုင်ဆိုင်အဲမှာရှိနေခဲ့တယ်။', myanmarTh: 'เธอบังเอิญอยู่ตรงนั้นตอนเกิดเหตุ', },
      { english: 'The problem is too complex to solve quickly.', myanmar: 'ပြဿနာက မြန်မြန်ဖြေရှင်းဖို့ အရမ်းရှုပ်ထွေးတယ်။', myanmarTh: 'ปัญหาซับซ้อนเกินกว่าจะแก้เร็วๆ', },
      { english: 'He is old enough to make his own decisions.', myanmar: 'သူ ကိုယ့်ဆုံးဖြတ်ချက်ကိုယ်ချဖို့ အသက်လုံလောက်ပြီ။', myanmarTh: 'เขาโตพอที่จะตัดสินใจเอง', },
    ],
    drills: [
      { prompt: 'They seem ___ the truth. (to have hidden → ___)', answer: 'to have hidden', options: ['to have hidden', 'to hidden', 'having hidden', 'to hide'] },
      { prompt: 'I happened ___ your brother yesterday. (to meet → ___)', answer: 'to meet', options: ['to meet', 'meeting', 'met', 'to meeting'] },
      { prompt: 'The box is too heavy ___. (to lift → ___)', answer: 'to lift', options: ['to lift', 'lifting', 'lift', 'to lifting'] },
    ],
  },
  {
    id: 'gr-comparison-advanced',
    level: 'C1',
    title: 'Advanced comparison: the more ... the more',
    titleMyanmar: 'အဆင့်မြင့်နှိုင်းယှဉ်ချက်',
    titleMyanmarTh: 'การเปรียบเทียบขั้นสูง',
    explanationMyanmar:
      'The + comparative ..., the + comparative ... (The more you practise, the better you become)။ as ... as နဲ့ not as ... as ကွာခြားချက်၊ the same ... as၊ prefer A to B။ နှိုင်းယှဉ်ချက်ကို ဆန်းသစ်အောင်ပြောနည်း။',
    explanationMyanmarTh: 'The + ขั้นกว่า ... the + ขั้นกว่า ... (The more you practise the better you become) ความต่างของ as ... as กับ not as ... as the same ... as prefer A to B วิธีพูดเปรียบเทียบให้สละสลวย',
    examples: [
      { english: 'The earlier you start, the more you will achieve.', myanmar: 'ပိုစောစလေ ပိုအောင်မြင်လေပါ။', myanmarTh: 'ยิ่งเริ่มเร็ว ยิ่งสำเร็จมาก', },
      { english: 'The more expensive the hotel, the better the service.', myanmar: 'ဟိုတယ်ပိုဈေးကြီးလေ ဝန်ဆောင်မှုပိုကောင်းလေပါ။', myanmarTh: 'โรงแรมยิ่งแพง บริการยิ่งดี', },
      { english: 'Her English is not as fluent as her sister\'s.', myanmar: 'သူမရဲ့အင်္ဂလိပ်စကားက အစ်မရဲ့လောက် မကျွမ်းကျင်ဘူး။', myanmarTh: 'ภาษาอังกฤษของเธอไม่คล่องเท่าพี่สาว', },
      { english: 'I prefer working from home to commuting.', myanmar: 'ငါ အလုပ်သွားလာတာထက် အိမ်ကနေအလုပ်လုပ်ရတာပိုကြိုက်တယ်။', myanmarTh: 'ผมชอบทำงานที่บ้านมากกว่าการเดินทาง', },
    ],
    drills: [
      { prompt: '___ you study, ___ you will learn. (the more → ___)', answer: 'The more / the more', options: ['The more / the more', 'More / more', 'The most / the most', 'As more / as more'] },
      { prompt: 'This book is not as interesting ___ that one.', answer: 'as', options: ['as', 'than', 'like', 'to'] },
      { prompt: 'The harder you work, ___ luckier you get.', answer: 'the', options: ['the', 'a', 'more', 'so'] },
    ],
  },
  {
    id: 'gr-passive-advanced',
    level: 'C1',
    title: 'Advanced passive: get-passive and modal passives',
    titleMyanmar: 'အဆင့်မြင့် passive ပုံစံများ',
    titleMyanmarTh: 'Passive ขั้นสูง: get-passive และ modal passive',
    explanationMyanmar:
      'get + V3 (He got promoted — မမျှော်လင့်တဲ့ဖြစ်ရပ်၊ စကားပြော)၊ modal + be + V3 (The bridge must be repaired)၊ reporting passive (He is said to be rich = လူတွေကသူချမ်းသာတယ်လို့ပြောကြတယ်)။',
    explanationMyanmarTh: 'get + กริยาช่อง 3 (He got promoted — เหตุการณ์ไม่คาดคิด ภาษาพูด) modal + be + กริยาช่อง 3 (The bridge must be repaired) passive แบบรายงาน (He is said to be rich = เขาว่ากันว่าเขารวย)',
    examples: [
      { english: 'He got fired for being late too often.', myanmar: 'သူ မကြာခဏနောက်ကျလို့ အလုပ်ဖြုတ်ခံခဲ့ရတယ်။', myanmarTh: 'เขาโดนไล่ออกเพราะสายบ่อย', },
      { english: 'The documents must be signed by Friday.', myanmar: 'စာရွက်စာတမ်းတွေကို သောကြာနေ့အရောက် လက်မှတ်ထိုးရမယ်။', myanmarTh: 'เอกสารต้องเซ็นก่อนวันศุกร์', },
      { english: 'She is believed to be the best surgeon in the country.', myanmar: 'သူမကို နိုင်ငံရဲ့အကောင်းဆုံးခွဲစိတ်ဆရာဝန်လို့ ယုံကြည်ကြတယ်။', myanmarTh: 'เขาว่ากันว่าเธอเป็นศัลยแพทย์ที่ดีที่สุดในประเทศ', },
      { english: 'My bike got stolen last night.', myanmar: 'ငါ့စက်ဘီး မနေ့ညက အခိုးခံခဲ့ရတယ်။', myanmarTh: 'จักรยานของผมโดนขโมยเมื่อคืนนี้', },
    ],
    drills: [
      { prompt: 'He ___ promoted last year. (get → ___)', answer: 'got', options: ['got', 'gets', 'getting', 'getted'] },
      { prompt: 'The rules must ___ followed. (be → ___)', answer: 'be', options: ['be', 'is', 'are', 'being'] },
      { prompt: 'They are ___ to have left the country. (say → ___)', answer: 'said', options: ['said', 'saying', 'says', 'say'] },
    ],
  },
  {
    id: 'gr-relative-advanced',
    level: 'C1',
    title: 'Advanced relative clauses: whom, whose, prepositions',
    titleMyanmar: 'အဆင့်မြင့်ဆွေမျိုးဝါကျများ',
    titleMyanmarTh: 'ประโยค relative ขั้นสูง: whom / whose',
    explanationMyanmar:
      'whom (The person whom I met)၊ whose (The writer whose book won)၊ preposition + which/whom (The house in which I grew up)၊ of which/whose + နာမ်။ တရားဝင်အရေးအသားမှာ who/that အစား သုံးတယ်။',
    explanationMyanmarTh: 'whom (The person whom I met) whose (The writer whose book won) บุพบท + which / whom (The house in which I grew up) of which / whose + คำนาม ใช้แทน who / that ในงานเขียนทางการ',
    examples: [
      { english: 'The colleague with whom I work is very kind.', myanmar: 'ငါအတူအလုပ်လုပ်တဲ့လုပ်ဖော်ကိုင်ဖက်က အရမ်းသဘောကောင်းတယ်။', myanmarTh: 'เพื่อนร่วมงานที่ผมใช้ห้องทำงานด้วยใจดีมาก', },
      { english: 'She married a man whose family owns a factory.', myanmar: 'သူမ စက်ရုံပိုင်တဲ့မိသားစုကယောက်ျားနဲ့ လက်ထပ်ခဲ့တယ်။', myanmarTh: 'เธอแต่งงานกับชายที่ครอบครัวเป็นเจ้าของโรงงาน', },
      { english: 'This is the topic about which we argued.', myanmar: 'ဒါက ငါတို့ငြင်းခုံခဲ့တဲ့အကြောင်းအရာပါ။', myanmarTh: 'นี่คือหัวข้อที่พวกเราโต้เถียงกัน', },
      { english: 'The city, the population of which is two million, is growing fast.', myanmar: 'လူဦးရေနှစ်သန်းရှိတဲ့မြို့က လျင်မြန်စွာကြီးထွားနေတယ်။', myanmarTh: 'เมืองที่มีประชากรสองล้านคนกำลังเติบโตเร็ว', },
    ],
    drills: [
      { prompt: 'The friend ___ I travelled is from Mandalay. (with whom → ___)', answer: 'with whom', options: ['with whom', 'with who', 'whom with', 'with that'] },
      { prompt: 'The artist ___ paintings are famous lives here. (whose → ___)', answer: 'whose', options: ['whose', 'who\'s', 'whom', 'which'] },
      { prompt: 'The room ___ we met was small. (in which → ___)', answer: 'in which', options: ['in which', 'which in', 'in that', 'where in'] },
    ],
  },
  {
    id: 'gr-emphasis-neither',
    level: 'C1',
    title: 'Emphatic addition: neither / nor and not ... either',
    titleMyanmar: 'Neither / Nor အလေးပေးထပ်ပေါင်းနည်း',
    titleMyanmarTh: 'การเน้นเพิ่มเติมด้วย neither / nor',
    explanationMyanmar:
      'အနုတ်ဝါကျမှာ ထပ်ပေါင်းတဲ့အခါ inversion သုံးတယ်။ He doesn\'t smoke, and neither do I. (ငါလည်းမသောက်ဘူး)။ Nor did she complain. စကားပြောမှာ သဘာဝကျတဲ့အလေးပေးနည်း။',
    explanationMyanmarTh: 'ในประโยคปฏิเสธเมื่อต้องการเพิ่มเติมให้ใช้การผกผัน: He does not smoke and neither do I (ผมก็ไม่สูบเหมือนกัน) / Nor did she complain เป็นวิธีเน้นที่เป็นธรรมชาติในภาษาพูด',
    examples: [
      { english: 'She cannot swim, and neither can her brother.', myanmar: 'သူမ ရေမကူးတတ်ဘူး၊ သူ့ညီလည်းမကူးတတ်ဘူး။', myanmarTh: 'เธอว่ายน้ำไม่ได้ และพี่ชายเธอก็ว่ายไม่ได้เหมือนกัน', },
      { english: 'I have never been to China, nor do I plan to go.', myanmar: 'ငါတရုတ်ကိုဘယ်တော့မှမရောက်ဖူးဘူး၊ သွားဖို့လည်းအစီအစဉ်မရှိဘူး။', myanmarTh: 'ผมไม่เคยไปจีน และก็ไม่ได้วางแผนจะไป', },
      { english: 'He did not apologize, nor did he explain.', myanmar: 'သူတောင်းပန်လည်းမတောင်းပန်ဘူး၊ ရှင်းပြလည်းမရှင်းပြဘူး။', myanmarTh: 'เขาไม่ได้ขอโทษ และก็ไม่ได้อธิบาย', },
      { english: 'They won\'t attend, and neither will we.', myanmar: 'သူတို့တက်မှာမဟုတ်ဘူး၊ ငါတို့လည်းတက်မှာမဟုတ်ဘူး။', myanmarTh: 'พวกเขาจะไม่มา และพวกเราก็จะไม่มาเหมือนกัน', },
    ],
    drills: [
      { prompt: 'He doesn\'t like tea, and ___ do I. (neither → ___)', answer: 'neither', options: ['neither', 'either', 'nor I', 'too'] },
      { prompt: 'She wasn\'t invited, ___ was I. (nor → ___)', answer: 'nor', options: ['nor', 'neither', 'either', 'not'] },
      { prompt: 'They can\'t come, and neither ___ we. (can → ___)', answer: 'can', options: ['can', 'do', 'will', 'are'] },
    ],
  },
  {
    id: 'gr-modal-perfects-speculation',
    level: 'C1',
    title: 'Modal perfects: may/might have, needn\'t have',
    titleMyanmar: 'may have / needn\'t have — ခန့်မှန်းချက်နဲ့မလိုအပ်ခဲ့တာ',
    titleMyanmarTh: 'may / might have และ need not have',
    explanationMyanmar:
      'may/might have + V3 (ဖြစ်နိုင်တယ်...ခဲ့မှာ — သေချာမှုနည်းတယ်)၊ could have (အလားအလာ)၊ needn\'t have + V3 (လုပ်ခဲ့ပေမယ့် မလိုအပ်ခဲ့ဘူး — You needn\'t have waited!)။ didn\'t need to (မလုပ်ခဲ့ဘူး) နဲ့ကွာတယ်။',
    explanationMyanmarTh: 'may / might have + กริยาช่อง 3 (อาจจะ... — ไม่แน่ใจ) could have (มีความเป็นไปได้) need not have + กริยาช่อง 3 (ทำไปแล้วแต่ไม่จำเป็น: You need not have waited!) ต่างกับ did not need to (ไม่ได้ทำ)',
    examples: [
      { english: 'He may have forgotten our appointment.', myanmar: 'သူ ငါတို့ချိန်းဆိုမှုကို မေ့သွားခဲ့တာဖြစ်နိုင်တယ်။', myanmarTh: 'เขาอาจลืมนัดของพวกเรา', },
      { english: 'She might have taken the wrong bus.', myanmar: 'သူမ ဘတ်စ်ကားမှားစီးခဲ့တာဖြစ်နိုင်တယ်။', myanmarTh: 'เธออาจขึ้นรถเมล์ผิดคัน', },
      { english: 'You needn\'t have cooked so much food!', myanmar: 'မင်း အစားအစာအဲလောက်အများကြီးချက်စရာမလိုခဲ့ဘူး။ (ချက်ပြီးသွားပြီ)', myanmarTh: 'คุณไม่จำเป็นต้องทำอาหารเยอะขนาดนั้นเลย', },
      { english: 'They could have won if the referee had been fair.', myanmar: 'ဒိုင်လူကြီးတရားမျှတခဲ့ရင် သူတို့အနိုင်ရနိုင်ခဲ့တယ်။', myanmarTh: 'พวกเขาน่าจะชนะถ้ากรรมการยุติธรรม', },
    ],
    drills: [
      { prompt: 'She ___ the train; she is not here. (may → "may have missed")', answer: 'may have missed', options: ['may have missed', 'may missed', 'may miss', 'may has missed'] },
      { prompt: 'You ___ all that money! (needn\'t → "needn\'t have spent")', answer: 'needn\'t have spent', options: ['needn\'t have spent', 'needn\'t spent', 'didn\'t need spent', 'needn\'t spend'] },
      { prompt: 'He ___ the keys somewhere. (might → "might have lost")', answer: 'might have lost', options: ['might have lost', 'might lost', 'might lose', 'might has lost'] },
    ],
  },
  {
    id: 'gr-subordination-advanced',
    level: 'C1',
    title: 'Advanced subordinators: inasmuch as, insofar as',
    titleMyanmar: 'တရားဝင်ဆက်စပ်စကားလုံးများ',
    titleMyanmarTh: 'คำเชื่อมอนุประโยคขั้นสูง',
    explanationMyanmar:
      'C1 အဆင့် တရားဝင်ဆက်စပ်စကားများ: inasmuch as (= since, because — အကြောင်းရင်း)၊ insofar as (= to the extent that — အတိုင်းအတာ)၊ lest (= for fear that)၊ albeit (= although — တိုတိုအလေးပေး)။ ပညာရပ်၊ ဥပဒေအရေးအသားမှာသုံးတယ်။',
    explanationMyanmarTh: 'คำเชื่อมอนุประโยคทางการระดับ C1: inasmuch as (= since because — บอกเหตุผล) insofar as (= to the extent that — บอกขอบเขต) lest (= for fear that) albeit (= although — สั้นและเน้น) ใช้ในงานวิชาการและกฎหมาย',
    examples: [
      { english: 'Inasmuch as you are the eldest, you should set an example.', myanmar: 'မင်းအကြီးဆုံးဖြစ်တာကြောင့် စံနမူနာပြသင့်တယ်။', myanmarTh: 'ในเมื่อคุณเป็นพี่คนโต คุณควรเป็นแบบอย่าง', },
      { english: 'We will help insofar as our resources allow.', myanmar: 'ငါတို့အရင်းအမြစ်တွေခွင့်ပြုသလောက် ကူညီမယ်။', myanmarTh: 'พวกเราจะช่วยเท่าที่ทรัพยากรอำนวย', },
      { english: 'He left early lest he miss the last train.', myanmar: 'နောက်ဆုံးရထားမလွတ်အောင် သူစောစောထွက်သွားခဲ့တယ်။', myanmarTh: 'เขาออกแต่เช้าเพราะกลัวพลาดรถไฟเที่ยวสุดท้าย', },
      { english: 'The task, albeit difficult, was completed on time.', myanmar: 'အလုပ်က ခက်ခဲပေမဲ့ အချိန်မှန်ပြီးခဲ့တယ်။', myanmarTh: 'งานยาก แต่ก็เสร็จตรงเวลา', },
    ],
    drills: [
      { prompt: '___ you are tired, you may rest. (= since → ___)', answer: 'Inasmuch as', options: ['Inasmuch as', 'Insofar as', 'Lest', 'Albeit'] },
      { prompt: 'I agree ___ the plan needs more work. (= to the extent that → ___)', answer: 'insofar as', options: ['insofar as', 'inasmuch as', 'lest', 'albeit'] },
      { prompt: 'She hurried ___ be late. (= for fear that → ___)', answer: 'lest she', options: ['lest she', 'lest she will', 'lest to', 'lest that she'] },
    ],
  },
];
