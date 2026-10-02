// FASE 14 — Grammar batch 3: structured C1→C2 grammar rules (Myanmar-first).
// Sigue el esquema de grammar-batch-2.ts: keys `english`/`myanmar` (NO `en`) para que el indexador las omita.
// Interfaz local con level: Extract<CEFR, 'C1' | 'C2'>.
import type { CEFR } from '../../types';

export interface GrammarExampleC1C2 {
  english: string;
  myanmar: string;
  myanmarTh?: string;
}

export interface GrammarDrillC1C2 {
  /** Sentence with a ___ blank. */
  prompt: string;
  answer: string;
  options?: string[];
}

export interface GrammarRuleC1C2 {
  id: string;
  level: Extract<CEFR, 'C1' | 'C2'>;
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
  examples: GrammarExampleC1C2[];
  drills: GrammarDrillC1C2[];
}

export const grammarRulesC1C2: GrammarRuleC1C2[] = [
  {
    id: 'f14-g-c1-001',
    level: 'C1',
    title: 'Inversion: Little / Only then / On no account',
    titleMyanmar: 'Little / Only then / On no account ပြောင်းပြန်ဝါကျ',
    titleMyanmarTh: 'ประโยคผกผันด้วย Little / Only then / On no account',
    explanationMyanmar:
      'Little (မသိ/နည်းနည်း), Only + အချိန်စကား (only then, only later), On no account (ဘယ်လိုအကြောင်းနဲ့မှ) နဲ့ ဝါကျစတဲ့အခါ ကြိယာအကူကို အကြောင်းအရာရှေ့ပြောင်းရတယ်။ Little did he know... (သူမသိခဲ့ဘူး), Only then did I understand, On no account must you open the door. Never/Rarely နဲ့အတူတူ အလေးပေးပုံစံဖြစ်တယ်။',
    explanationMyanmarTh: 'เมื่อขึ้นต้นประโยคด้วย Little (แทบไม่รู้ / แทบไม่มี) Only + คำบอกเวลา (only then only later) หรือ On no account (ไม่ว่าด้วยเหตุผลใดก็ตาม) ต้องสลับกริยาช่วยมาหน้าประธาน: Little did he know ... / Only then did I understand / On no account must you open the door เป็นรูปเน้นเช่นเดียวกับ Never / Rarely',
    examples: [
      { english: 'Little did she know that her life was about to change.', myanmar: 'သူမဘဝ ပြောင်းတော့မယ်ဆိုတာ သူမသိခဲ့ဘူး။', myanmarTh: 'เธอแทบไม่รู้เลยว่าชีวิตกำลังจะเปลี่ยน', },
      { english: 'Only then did I realise my mistake.', myanmar: 'အဲဒီအခါကျမှပဲ ငါ့အမှားကို သဘောပေါက်ခဲ့တယ်။', myanmarTh: 'ตอนนั้นเองผมถึงรู้ว่าผิด', },
      { english: 'On no account are you to reveal this secret.', myanmar: 'ဒီလျှို့ဝှက်ချက်ကို ဘယ်လိုအကြောင်းနဲ့မှ မဖော်ပြရဘူး။', myanmarTh: 'ไม่ว่าด้วยเหตุผลใดห้ามเปิดเผยความลับนี้', },
      { english: 'Little does he care about other people\'s opinions.', myanmar: 'သူများအမြင်တွေကို သူနည်းနည်းလေးမှ ဂရုမစိုက်ဘူး။', myanmarTh: 'เขาแทบไม่สนใจความเห็นคนอื่น', },
    ],
    drills: [
      { prompt: 'Little ___ I know the truth would hurt so much.', answer: 'did', options: ['did', 'do', 'have', 'had'] },
      { prompt: 'Only after the meeting ___ she leave.', answer: 'did', options: ['did', 'does', 'had', 'has'] },
      { prompt: 'On no account ___ you touch that wire.', answer: 'must', options: ['must', 'you must', 'do', 'will'] },
    ],
  },
  {
    id: 'f14-g-c1-002',
    level: 'C1',
    title: 'Inverted concession: Try as he might ...',
    titleMyanmar: 'Try as he might ... ပြောင်းပြန်အပေးအယူဝါကျ',
    titleMyanmarTh: 'การผกผันแสดงการยอมรับ: Try as he might ...',
    explanationMyanmar:
      'Verb + as + subject + modal / Adjective + as + subject + may ပုံစံနဲ့ "ဘယ်လောက်ပဲ...စေကာမူ" လို့ ပြောတယ်။ Try as he might = Although he tried hard၊ Be he rich or poor = Whether he is rich or poor၊ Strange as it may seem။ စာပေဆန်ပြီး တရားဝင်တဲ့ အပေးအယူပုံစံဖြစ်တယ်။',
    explanationMyanmarTh: 'โครงสร้าง กริยา + as + ประธาน + modal หรือ คำคุณศัพท์ + as + ประธาน + may แปลว่า ไม่ว่าจะ...แค่ไหนก็ตาม: Try as he might = Although he tried hard / Be he rich or poor = Whether he is rich or poor / Strange as it may seem เป็นรูปยอมรับเชิงวรรณศิลป์และทางการ',
    examples: [
      { english: 'Try as she might, she could not solve the puzzle.', myanmar: 'ဘယ်လောက်ပဲကြိုးစားစေကာမူ သူမပဟေဠိကို မဖြေနိုင်ခဲ့ဘူး။', myanmarTh: 'เธอพยายามแค่ไหนก็แก้ปริศนาไม่ได้', },
      { english: 'Be he friend or foe, he will be treated fairly.', myanmar: 'မိတ်ဆွေဖြစ်ဖြစ် ရန်သူဖြစ်ဖြစ် တရားမျှတစွာ ဆက်ဆံခံရမယ်။', myanmarTh: 'จะเป็นมิตรหรือศัตรู เขาจะได้รับการปฏิบัติอย่างเป็นธรรม', },
      { english: 'Much as I admire him, I cannot agree with his decision.', myanmar: 'သူ့ကို ဘယ်လောက်ပဲလေးစားစေကာမူ သူ့ဆုံးဖြတ်ချက်ကို သဘောမတူနိုင်ဘူး။', myanmarTh: 'ผมนับถือเขาแค่ไหนก็เห็นด้วยกับการตัดสินใจของเขาไม่ได้', },
      { english: 'Tired as they were, the team continued working.', myanmar: 'ဘယ်လောက်ပဲပင်ပန်းစေကာမူ အဖွဲ့က ဆက်လုပ်ခဲ့တယ်။', myanmarTh: 'ทีมเหนื่อยแค่ไหนก็ยังทำงานต่อ', },
    ],
    drills: [
      { prompt: '___ as he might, he couldn\'t lift the box.', answer: 'Try', options: ['Try', 'Tried', 'Trying', 'To try'] },
      { prompt: 'Be it ever so ___, there\'s no place like home.', answer: 'humble', options: ['humble', 'humbly', 'humbleness', 'humbler'] },
      { prompt: 'Much as I ___ her cooking, it\'s too salty today.', answer: 'like', options: ['like', 'liked', 'liking', 'to like'] },
    ],
  },
  {
    id: 'f14-g-c1-003',
    level: 'C1',
    title: 'Formulaic subjunctive: be that as it may, long live ...',
    titleMyanmar: 'ပုံသေစကားစု subjunctive ပုံစံများ',
    titleMyanmarTh: 'สำนวน subjunctive: be that as it may, long live ...',
    explanationMyanmar:
      'အချို့ပုံသေစကားစုတွေမှာ subjunctive (ကြိယာအခြေခံပုံစံ၊ -s မပါ) သုံးတယ်။ Be that as it may (= ဒါပေမဲ့/ထားပါတော့), God save the King, Long live the Queen, Suffice it to say (= အတိုချုပ်ပြောရရင်), Come what may (= ဘာဖြစ်ဖြစ်လာပါစေ)။ အလွတ်ကျက်ထားရမယ့်ပုံစံတွေ။',
    explanationMyanmarTh: 'สำนวนตายตัวบางสำนวนใช้ subjunctive (กริยารูปพื้นฐาน ไม่เติม -s): Be that as it may (= อย่างไรก็ตาม / ช่างเถอะ) God save the King Long live the Queen Suffice it to say (= พูดสั้นๆ ว่า) Come what may (= จะเกิดอะไรขึ้นก็ตาม) เป็นรูปที่ต้องจำ',
    examples: [
      { english: 'Be that as it may, we must finish by Friday.', myanmar: 'ဒါပေမဲ့ ငါတို့သောကြာနေ့ထိ ပြီးရမယ်။', myanmarTh: 'อย่างไรก็ตาม พวกเราต้องเสร็จภายในวันศุกร์', },
      { english: 'Long live the King!', myanmar: 'ဘုရင်သက်တော်ရှည်ပါစေ!', myanmarTh: 'ทรงพระเจริญ', },
      { english: 'Suffice it to say, the negotiations did not go as planned.', myanmar: 'အတိုချုပ်ပြောရရင် ညှိနှိုင်းမှုတွေ စီစဉ်ထားသလို ဖြစ်မလာခဲ့ဘူး။', myanmarTh: 'พูดสั้นๆ ว่า การเจรจาไม่เป็นไปตามแผน', },
      { english: 'Come what may, I will keep my promise.', myanmar: 'ဘာဖြစ်ဖြစ်လာပါစေ ငါ့ကတိကို တည်မယ်။', myanmarTh: 'จะเกิดอะไรขึ้นก็ตาม ผมจะรักษาสัญญา', },
    ],
    drills: [
      { prompt: '___ that as it may, we have to go.', answer: 'Be', options: ['Be', 'Is', 'Was', 'Being'] },
      { prompt: '___ live the bride and groom!', answer: 'Long', options: ['Long', 'Live', 'Longer', 'Length'] },
      { prompt: 'Suffice ___ to say, he was furious.', answer: 'it', options: ['it', 'that', 'this', 'so'] },
    ],
  },
  {
    id: 'f14-g-c1-004',
    level: 'C1',
    title: 'Unreal past: It\'s time you went / I\'d rather you did',
    titleMyanmar: 'It\'s time / I\'d rather နောက်က အတိတ်ပုံစံ (unreal past)',
    titleMyanmarTh: 'อดีตสมมติ: It is time you went / I would rather you did',
    explanationMyanmar:
      'It\'s (high/about) time + past simple ("It\'s time you left" = ထွက်သင့်ပြီ), I\'d rather + past simple ("I\'d rather you stayed" = နေစေချင်တယ်), Suppose + past ("Suppose we took a taxi")။ အတိတ်ပုံစံသုံးပေမဲ့ အဓိပ္ပာယ်က ပစ္စုပ္ပန်/အနာဂတ် — လက်ရှိအခြေအနေနဲ့ မကိုက်ညီတဲ့ဆန္ဒကို ပြတယ်။',
    explanationMyanmarTh: 'It is (high / about) time + อดีตกาล (It is time you left = ได้เวลาออกไปแล้ว) I would rather + อดีตกาล (I would rather you stayed = อยากให้อยู่ต่อ) Suppose + อดีตกาล (Suppose we took a taxi) ใช้รูปอดีตแต่ความหมายเป็นปัจจุบัน / อนาคต แสดงความปรารถนาที่ขัดกับความจริง',
    examples: [
      { english: 'It\'s high time you started studying seriously.', myanmar: 'မင်းအလေးအနက် စလေ့လာသင့်တာ ကြာပြီ။', myanmarTh: 'ได้เวลาตั้งใจเรียนจริงจังแล้ว', },
      { english: 'I\'d rather you didn\'t smoke in here.', myanmar: 'မင်းဒီမှာ ဆေးလိပ်မသောက်စေချင်ဘူး။', myanmarTh: 'ผมอยากให้คุณไม่สูบบุหรี่ตรงนี้', },
      { english: 'Suppose we took a taxi instead of walking.', myanmar: 'လမ်းလျှောက်မယ့်အစား တက္ကစီစီးရင် ကောင်းမလား။', myanmarTh: 'ถ้าพวกเรานั่งแท็กซี่แทนเดินล่ะ', },
      { english: 'It\'s about time they paid us what they owe.', myanmar: 'သူတို့ပေးစရာရှိတာ ပေးသင့်တာ ကြာပြီ။', myanmarTh: 'ได้เวลาที่พวกเขาจ่ายสิ่งที่ค้างพวกเราแล้ว', },
    ],
    drills: [
      { prompt: 'It\'s time you ___ to bed.', answer: 'went', options: ['went', 'go', 'going', 'have gone'] },
      { prompt: 'I\'d rather she ___ the truth.', answer: 'told', options: ['told', 'tell', 'tells', 'telling'] },
      { prompt: 'Suppose he ___ — what would we do?', answer: 'refused', options: ['refused', 'refuses', 'refuse', 'refusing'] },
    ],
  },
  {
    id: 'f14-g-c1-005',
    level: 'C1',
    title: '\'But for / If it weren\'t for\' counterfactuals',
    titleMyanmar: '\'But for\' နဲ့ အခြေအနေမှန်-ဆန့်ကျင်ဝါကျများ',
    titleMyanmarTh: 'ประโยคขัดแย้งกับความจริงด้วย But for / If it were not for',
    explanationMyanmar:
      'But for + noun = If it weren\'t / hadn\'t been for ("...မရှိခဲ့ရင်")။ ပစ္စုပ္ပန်ဆို If it weren\'t for + noun, would + V1 (If it weren\'t for the rain, we\'d be outside)။ အတိတ်ဆို If it hadn\'t been for + noun, would have + V3 (But for your help, I would have failed)။',
    explanationMyanmarTh: 'But for + คำนาม = If it were not / had not been for (ถ้าไม่มี...): ปัจจุบันใช้ If it were not for + คำนาม would + กริยารูปพื้นฐาน (If it were not for the rain we would be outside) อดีตใช้ If it had not been for + คำนาม would have + กริยาช่อง 3 (But for your help I would have failed)',
    examples: [
      { english: 'But for your advice, I would have made a terrible mistake.', myanmar: 'မင်းအကြံပေးချက် မရှိခဲ့ရင် ဆိုးရွားတဲ့အမှား လုပ်မိမှာပါ။', myanmarTh: 'ถ้าไม่มีคำแนะนำของคุณ ผมคงทำผิดพลาดร้ายแรง', },
      { english: 'If it weren\'t for the rain, we\'d be playing outside now.', myanmar: 'မိုးမရွာရင် အခု အပြင်မှာ ကစားနေမှာပါ။', myanmarTh: 'ถ้าไม่มีฝน พวกเราคงเล่นข้างนอกตอนนี้', },
      { english: 'If it hadn\'t been for her quick thinking, the child would have drowned.', myanmar: 'သူမလျင်မြန်တဲ့ အတွေးမရှိခဲ့ရင် ကလေးရေနစ်သေမှာပါ။', myanmarTh: 'ถ้าเธอไม่คิดเร็ว เด็กคงจมน้ำ', },
      { english: 'But for the delay, we would be home by now.', myanmar: 'နှောင့်နှေးမှု မရှိခဲ့ရင် အခု အိမ်ရောက်နေမှာပါ။', myanmarTh: 'ถ้าไม่ดีเลย์ พวกเราคงถึงบ้านแล้วตอนนี้', },
    ],
    drills: [
      { prompt: 'But ___ his courage, the mission would have failed.', answer: 'for', options: ['for', 'from', 'of', 'with'] },
      { prompt: 'If it ___ for you, I\'d be lost.', answer: 'weren\'t', options: ['weren\'t', 'wasn\'t', 'isn\'t', 'hadn\'t'] },
      { prompt: 'If it hadn\'t been ___ the storm, we\'d have sailed.', answer: 'for', options: ['for', 'from', 'of', 'by'] },
    ],
  },
  {
    id: 'f14-g-c1-006',
    level: 'C1',
    title: 'Nuanced conditionals: supposing, in case, as long as',
    titleMyanmar: 'Supposing / In case / As long as အခြေအနေဝါကျကွဲပြားချက်များ',
    titleMyanmarTh: 'ประโยคเงื่อนไขเชิงลึก: supposing / in case / as long as',
    explanationMyanmar:
      'Supposing (= what if — စိတ်ကူးယဉ်မေးတာ), In case (= ကြိုတင်ပြင်ဆင် — just in case), As/So long as (= ...သရွေ့ — စည်းကမ်းဆက်တိုက်), On condition that (= စည်းကမ်းနဲ့)။ If ရိုးရိုးနဲ့ အဓိပ္ပာယ်မတူဘူး — တစ်ခုချင်းရဲ့အရိပ်အမြွက်ကို သတိထား။',
    explanationMyanmarTh: 'Supposing (= what if — ถามเชิงสมมติ) In case (= เตรียมไว้ก่อน: just in case) As / So long as (= ตราบใดที่ — มีเงื่อนไขต่อเนื่อง) On condition that (= โดยมีเงื่อนไขว่า) แต่ละคำมีนัยต่างจาก if ธรรมดา ต้องระวัง',
    examples: [
      { english: 'Supposing he refuses — what\'s our backup plan?', myanmar: 'သူငြင်းရင်ဆိုပါစို့ — ငါတို့အရန်အစီအစဉ်က ဘာလဲ။', myanmarTh: 'ถ้าเขาปฏิเสธ แผนสำรองของพวกเราคืออะไร', },
      { english: 'Take an umbrella in case it rains.', myanmar: 'မိုးရွာရင်ရွာမယ်ဆိုပြီး ထီးယူသွား။', myanmarTh: 'เอาร่มไปเผื่อฝนตก', },
      { english: 'You can borrow my car as long as you fill the tank.', myanmar: 'ဆီဖြည့်ပေးသရွေ့ ငါ့ကားငှားလို့ရတယ်။', myanmarTh: 'คุณยืมรถผมได้ถ้าเติมน้ำมันเต็มถัง', },
      { english: 'I\'ll lend you the money on condition that you repay me by June.', myanmar: 'ဇွန်လထိ ပြန်ပေးမယ်ဆိုတဲ့စည်းကမ်းနဲ့ ပိုက်ဆံချေးမယ်။', myanmarTh: 'ผมจะให้คุณยืมเงินถ้าคุณคืนภายในมิถุนายน', },
    ],
    drills: [
      { prompt: '___ he says no, we\'ll try someone else.', answer: 'Supposing', options: ['Supposing', 'In case', 'As long as', 'Unless'] },
      { prompt: 'Bring a jacket ___ case the weather changes.', answer: 'in', options: ['in', 'on', 'at', 'for'] },
      { prompt: 'You may stay ___ long as you\'re quiet.', answer: 'as', options: ['as', 'so', 'if', 'when'] },
    ],
  },
  {
    id: 'f14-g-c1-007',
    level: 'C1',
    title: 'Mixed conditionals: past condition, present result',
    titleMyanmar: 'ရောနှောအခြေအနေဝါကျ — အတိတ်အကြောင်း၊ ပစ္စုပ္ပန်အကျိုး',
    titleMyanmarTh: 'ประโยคเงื่อนไขผสม: เงื่อนไขในอดีต ผลในปัจจุบัน',
    explanationMyanmar:
      'If + past perfect (အတိတ်အကြောင်း) + would + V1 (ပစ္စုပ္ပန်အကျိုး): If he had studied medicine, he would be a doctor now. ပြောင်းပြန်လည်း ရတယ် — If + past simple (ပစ္စုပ္ပန်အကြောင်း) + would have + V3 (အတိတ်အကျိုး): If I weren\'t shy, I would have spoken yesterday.',
    explanationMyanmarTh: 'If + past perfect (เงื่อนไขในอดีต) + would + กริยารูปพื้นฐาน (ผลในปัจจุบัน): If he had studied medicine he would be a doctor now กลับกันก็ได้: If + อดีตกาล (เงื่อนไขปัจจุบัน) + would have + กริยาช่อง 3 (ผลในอดีต): If I were not shy I would have spoken yesterday',
    examples: [
      { english: 'If she had taken the job, she would be living in London now.', myanmar: 'အလုပ်လက်ခံခဲ့ရင် အခု လန်ဒန်မှာ နေနေမှာပါ။', myanmarTh: 'ถ้าเธอรับงานนั้น เธอคงอยู่ลอนดอนตอนนี้', },
      { english: 'Had he worn a helmet, he wouldn\'t be in hospital today.', myanmar: 'ဦးထုပ်ဆောင်းခဲ့ရင် ဒီနေ့ဆေးရုံမှာ မနေရဘူး။', myanmarTh: 'ถ้าเขาใส่หมวกกันน็อก เขาคงไม่ต้องอยู่โรงพยาบาลวันนี้', },
      { english: 'If I weren\'t so shy, I would have introduced myself yesterday.', myanmar: 'ငါရှက်တတ်သူ မဟုတ်ရင် မနေ့က မိတ်ဆက်ခဲ့မှာပါ။', myanmarTh: 'ถ้าผมไม่ขี้อาย ผมคงแนะนำตัวเมื่อวานนี้', },
      { english: 'If they had invested earlier, they would own the company now.', myanmar: 'စောစောရင်းနှီးမြှုပ်နှံခဲ့ရင် အခု ကုမ္ပဏီပိုင်နေမှာပါ။', myanmarTh: 'ถ้าพวกเขาลงทุนเร็วกว่านี้ พวกเขาคงเป็นเจ้าของบริษัทแล้วตอนนี้', },
    ],
    drills: [
      { prompt: 'If he had left earlier, he ___ be stuck in traffic now.', answer: 'wouldn\'t', options: ['wouldn\'t', 'hadn\'t', 'isn\'t', 'won\'t'] },
      { prompt: 'If I ___ taller, I would have joined the basketball team.', answer: 'were', options: ['were', 'was', 'am', 'had been'] },
      { prompt: 'Had she saved money, she ___ afford the trip now.', answer: 'could', options: ['could', 'had', 'did', 'would have'] },
    ],
  },
  {
    id: 'f14-g-c1-008',
    level: 'C1',
    title: 'Impersonal passive: It is said that / He is said to ...',
    titleMyanmar: 'It is said that ... လူမသိပုံစံ passive',
    titleMyanmarTh: 'Passive แบบไม่ระบุผู้พูด: It is said that ...',
    explanationMyanmar:
      'သတင်းစကား/အထင်အမြင်ကို ပြောသူကိုမဖော်ဘဲ ပြောတယ်။ It is said/believed/reported that + clause၊ သို့မဟုတ် He is said/believed/reported to + infinitive. ဒုတိယပုံစံက ပိုတရားဝင်ပြီး သတင်းစာတွေမှာ အသုံးများတယ်။',
    explanationMyanmarTh: 'รายงานข่าวหรือความเห็นโดยไม่ระบุผู้พูด: It is said / believed / reported that + อนุประโยค หรือ He is said / believed / reported to + infinitive รูปหลังเป็นทางการกว่าและพบบ่อยในข่าว',
    examples: [
      { english: 'It is said that the temple is over 500 years old.', myanmar: 'ဒီဘုရားက နှစ်ပေါင်း ၅၀၀ ကျော်ပြီလို့ ဆိုကြတယ်။', myanmarTh: 'เขาว่ากันว่าวัดอายุเกิน 500 ปี', },
      { english: 'She is believed to be the richest woman in the country.', myanmar: 'သူမကို နိုင်ငံရဲ့အချမ်းသာဆုံး အမျိုးသမီးလို့ ယုံကြည်ကြတယ်။', myanmarTh: 'เขาว่ากันว่าเธอเป็นผู้หญิงที่รวยที่สุดในประเทศ', },
      { english: 'It was reported that the bridge had collapsed.', myanmar: 'တံတားပြိုကျသွားတယ်လို့ သတင်းထုတ်ပြန်ခဲ့တယ်။', myanmarTh: 'มีรายงานว่าสะพานถล่ม', },
      { english: 'The painting is thought to have been stolen during the war.', myanmar: 'ပန်းချီကားကို စစ်အတွင်း ခိုးယူခံရတယ်လို့ ထင်ကြတယ်။', myanmarTh: 'เขาว่ากันว่าภาพถูกขโมยช่วงสงคราม', },
    ],
    drills: [
      { prompt: 'It is ___ that he resigned yesterday.', answer: 'said', options: ['said', 'saying', 'say', 'says'] },
      { prompt: 'She is believed ___ left the country.', answer: 'to have', options: ['to have', 'have', 'to', 'having'] },
      { prompt: 'It ___ reported that prices would rise.', answer: 'was', options: ['was', 'is', 'has', 'were'] },
    ],
  },
  {
    id: 'f14-g-c1-009',
    level: 'C1',
    title: 'He is believed to have left (passive + perfect infinitive)',
    titleMyanmar: 'is believed to have + V3 — passive အတိတ်ခန့်မှန်းချက်',
    titleMyanmarTh: 'is believed to have + กริยาช่อง 3',
    explanationMyanmar:
      'is said/believed/thought/known/reported + to have + V3 — အတိတ်ဖြစ်ရပ်ကို passive နဲ့ ခန့်မှန်းပြောတာ။ He is believed to have left (= လူတွေက သူထွက်သွားပြီလို့ ယုံကြည်တယ်)။ to + V1 ဆို ပစ္စုပ္ပန်/အထွေထွေ အဓိပ္ပာယ်။',
    explanationMyanmarTh: 'is said / believed / thought / known / reported + to have + กริยาช่อง 3 คาดเดาเหตุการณ์ในอดีตแบบ passive: He is believed to have left (= เขาว่ากันว่าเขาออกไปแล้ว) ส่วน to + กริยารูปพื้นฐาน หมายถึงปัจจุบันหรือทั่วไป',
    examples: [
      { english: 'The thief is thought to have hidden the jewels nearby.', myanmar: 'သူခိုးက ရတနာတွေကို အနီးမှာ ဝှက်ထားတယ်လို့ ထင်ကြတယ်။', myanmarTh: 'เขาว่ากันว่าขโมยซ่อนเพชรไว้ใกล้ๆ', },
      { english: 'She is known to have donated millions to charity.', myanmar: 'သူမက ပရဟိတကို သန်းချီလှူခဲ့တယ်လို့ သိကြတယ်။', myanmarTh: 'เขาว่ากันว่าเธอบริจาคเงินหลายล้านให้การกุศล', },
      { english: 'They are reported to be planning a merger.', myanmar: 'သူတို့ ပေါင်းစည်းမှုစီစဉ်နေတယ်လို့ သတင်းရတယ်။', myanmarTh: 'มีรายงานว่าพวกเขากำลังวางแผนควบรวมกิจการ', },
      { english: 'He is said to have been the best student of his year.', myanmar: 'သူ့နှစ်ရဲ့ အကောင်းဆုံးကျောင်းသား ဖြစ်ခဲ့တယ်လို့ ဆိုကြတယ်။', myanmarTh: 'เขาว่ากันว่าเขาเป็นนักเรียนที่ดีที่สุดของรุ่น', },
    ],
    drills: [
      { prompt: 'He is believed ___ the money.', answer: 'to have stolen', options: ['to have stolen', 'to steal', 'stolen', 'having stolen'] },
      { prompt: 'They are said ___ a new factory.', answer: 'to be building', options: ['to be building', 'to have built', 'building', 'built'] },
      { prompt: 'She is thought ___ the exam.', answer: 'to have passed', options: ['to have passed', 'to pass', 'passing', 'passed'] },
    ],
  },
  {
    id: 'f14-g-c1-010',
    level: 'C1',
    title: 'Prepositional passive: She was laughed at',
    titleMyanmar: 'Preposition နဲ့တွဲတဲ့ passive — was laughed at',
    titleMyanmarTh: 'Passive กับบุพบท: was laughed at',
    explanationMyanmar:
      'Phrasal/prepositional verb တွေကို passive လုပ်တဲ့အခါ preposition ကျန်နေတယ်။ She was laughed at (သူမကို ရယ်မောခံရတယ်), The bed had been slept in, He was taken advantage of. Active မှာ preposition ရဲ့ object ဖြစ်ခဲ့သူက subject ဖြစ်သွားတယ်။',
    explanationMyanmarTh: 'กริยาวลีหรือกริยาที่คู่กับบุพบททำ passive โดยบุพบทคงอยู่: She was laughed at (เธอถูกหัวเราะเยาะ) The bed had been slept in He was taken advantage of ผู้ที่เคยเป็นกรรมของบุพบทในรูป active กลายมาเป็นประธาน',
    examples: [
      { english: 'The old traditions were done away with.', myanmar: 'ရိုးရာဓလေ့ဟောင်းတွေကို ဖျက်သိမ်းခံရတယ်။', myanmarTh: 'ประเพณีเก่าถูกยกเลิก', },
      { english: 'She felt she was being talked about.', myanmar: 'သူမအကြောင်း ပြောနေကြတယ်လို့ ခံစားရတယ်။', myanmarTh: 'เธอรู้สึกว่ามีคนพูดถึงเธอ', },
      { english: 'The proposal was voted down by the committee.', myanmar: 'အဆိုပြုချက်ကို ကော်မတီက ပယ်ချခဲ့တယ်။', myanmarTh: 'ข้อเสนอถูกคณะกรรมการโหวตคว่ำ', },
      { english: 'He was looked up to by all his students.', myanmar: 'သူ့ကျောင်းသားအားလုံးက သူ့ကို လေးစားကြတယ်။', myanmarTh: 'นักเรียนทุกคนยกย่องเขา', },
    ],
    drills: [
      { prompt: 'The problem was ___ into carefully.', answer: 'looked', options: ['looked', 'look', 'looking', 'looks'] },
      { prompt: 'She hates being ___ at.', answer: 'laughed', options: ['laughed', 'laugh', 'laughing', 'laughs'] },
      { prompt: 'The child is well ___ after by his aunt.', answer: 'looked', options: ['looked', 'look', 'looking', 'looks'] },
    ],
  },  {
    id: 'f14-g-c1-011',
    level: 'C1',
    title: 'Tough movement: hard to please, easy to solve',
    titleMyanmar: 'Tough movement — hard to solve ပုံစံ',
    titleMyanmarTh: 'Tough movement: hard to please',
    explanationMyanmar:
      'Adjective + to-infinitive မှာ logical object က subject နေရာရောက်နေတယ်။ This problem is hard to solve (= It is hard to solve this problem)။ သုံးလေ့ရှိတဲ့ adjective များ: hard, easy, difficult, tough, impossible, pleasant, interesting. "She is easy to talk to" လို preposition လည်း ကျန်နိုင်တယ်။',
    explanationMyanmarTh: 'โครงสร้าง คำคุณศัพท์ + to-infinitive ที่ประธานเชิงตรรกะ (logical object) มาอยู่ตำแหน่งประธาน: This problem is hard to solve (= It is hard to solve this problem) คำคุณศัพท์ที่ใช้บ่อย: hard easy difficult tough impossible pleasant interesting บางครั้งมีบุพบทค้างอยู่ด้วย เช่น She is easy to talk to',
    examples: [
      { english: 'This meat is tough to chew.', myanmar: 'ဒီအသားက ဝါးရခက်တယ်။', myanmarTh: 'เนื้อนี้เคี้ยวยาก', },
      { english: 'She is easy to talk to.', myanmar: 'သူမနဲ့ စကားပြောရလွယ်တယ်။', myanmarTh: 'เธอคุยด้วยง่าย', },
      { english: 'The instructions were difficult to follow.', myanmar: 'ညွှန်ကြားချက်တွေကို လိုက်နာရခက်ခဲ့တယ်။', myanmarTh: 'คำแนะนำทำตามยาก', },
      { english: 'He is pleasant to work with.', myanmar: 'သူနဲ့အလုပ်လုပ်ရတာ စိတ်ချမ်းသာစရာ ကောင်းတယ်။', myanmarTh: 'เขาทำงานด้วยแล้วสบายใจ', },
    ],
    drills: [
      { prompt: 'The box is too heavy ___ lift.', answer: 'to', options: ['to', 'for', 'of', 'at'] },
      { prompt: 'She is difficult ___.', answer: 'to please', options: ['to please', 'pleasing', 'please', 'to pleasing'] },
      { prompt: 'This novel is impossible to put ___.', answer: 'down', options: ['down', 'up', 'off', 'away'] },
    ],
  },
  {
    id: 'f14-g-c1-012',
    level: 'C1',
    title: 'Raising verbs: seem, appear, happen, turn out',
    titleMyanmar: 'Raising verbs — seem to / it seems that',
    titleMyanmarTh: 'กริยา raising: seem / appear / happen / turn out',
    explanationMyanmar:
      'Seem, appear, happen, prove, turn out + to-infinitive — subject က အောက်က clause ကနေ "တက်"လာတာ။ He seems to be tired = It seems that he is tired. Happen to (= မရည်ရွယ်ဘဲ ဖြစ်သွားတာ): I happened to meet her. Turn out (= အဆုံးမှာဖြစ်သွားတာ)။',
    explanationMyanmarTh: 'Seem appear happen prove turn out + to-infinitive ประธาน ยก มาจากอนุประโยคข้างล่าง: He seems to be tired = It seems that he is tired / Happen to (= เกิดขึ้นโดยไม่ตั้งใจ): I happened to meet her / Turn out (= ลงเอยกลายเป็น)',
    examples: [
      { english: 'They appear to have finished already.', myanmar: 'သူတို့ပြီးသွားပြီ လို့ထင်ရတယ်။', myanmarTh: 'ดูเหมือนพวกเขาทำเสร็จแล้ว', },
      { english: 'She happened to overhear our conversation.', myanmar: 'သူမ ငါတို့စကားကို ကြားသွားခဲ့တယ် (မရည်ရွယ်ဘဲ)။', myanmarTh: 'เธอบังเอิญได้ยินบทสนทนาของพวกเรา', },
      { english: 'The experiment turned out to be a great success.', myanmar: 'စမ်းသပ်မှုက ကြီးမားတဲ့ အောင်မြင်မှုဖြစ်သွားခဲ့တယ်။', myanmarTh: 'การทดลองลงเอยด้วยความสำเร็จอย่างยิ่งใหญ่', },
      { english: 'He proved to be an excellent leader.', myanmar: 'သူက ထူးချွန်တဲ့ခေါင်းဆောင် တစ်ယောက်ဖြစ်ကြောင်း သက်သေပြခဲ့တယ်။', myanmarTh: 'เขาพิสูจน์แล้วว่าเป็นผู้นำที่ยอดเยี่ยม', },
    ],
    drills: [
      { prompt: 'She ___ to know the answer.', answer: 'seems', options: ['seems', 'seem', 'seeming', 'is seem'] },
      { prompt: 'I happened ___ across an old photo.', answer: 'to come', options: ['to come', 'coming', 'come', 'to coming'] },
      { prompt: 'It ___ that they are married.', answer: 'turns out', options: ['turns out', 'turn out', 'turned to', 'is turn'] },
    ],
  },
  {
    id: 'f14-g-c1-013',
    level: 'C1',
    title: 'Perfect infinitive: claim to have seen',
    titleMyanmar: 'Perfect infinitive — to have + V3',
    titleMyanmarTh: 'Perfect infinitive: to have + กริยาช่อง 3',
    explanationMyanmar:
      'to have + V3 — အတိတ်ဖြစ်ရပ်ကို အဓိကကြိယာထက် စောဖြစ်ခဲ့တယ်လို့ ပြတယ်။ He claims to have met the president (= တွေ့ခဲ့တယ်လို့ ဆိုတယ်)။ seem, appear, believe, pretend, claim + to have + V3 ပုံစံနဲ့ သုံးတယ်။',
    explanationMyanmarTh: 'to have + กริยาช่อง 3 บอกว่าเหตุการณ์นั้นเกิดก่อนกริยาหลัก: He claims to have met the president (= เขาอ้างว่าเคยพบประธานาธิบดี) ใช้กับ seem appear believe pretend claim + to have + กริยาช่อง 3',
    examples: [
      { english: 'She claims to have read all of Shakespeare\'s plays.', myanmar: 'ရှိတ်စပီးယားပြဇာတ် အားလုံးဖတ်ဖူးတယ်လို့ သူမဆိုတယ်။', myanmarTh: 'เธออ้างว่าอ่านบทละครของเชกสเปียร์ทั้งหมด', },
      { english: 'They seem to have forgotten our appointment.', myanmar: 'သူတို့ငါတို့ချိန်းဆိုမှုကို မေ့သွားပုံရတယ်။', myanmarTh: 'ดูเหมือนพวกเขาลืมนัดของพวกเรา', },
      { english: 'He pretended not to have heard me.', myanmar: 'သူ ငါ့ကိုမကြားသလို ဟန်ဆောင်ခဲ့တယ်။', myanmarTh: 'เขาแกล้งทำเป็นไม่ได้ยินผม', },
      { english: 'I\'m sorry to have kept you waiting.', myanmar: 'စောင့်ခိုင်းမိတာ တောင်းပန်ပါတယ်။', myanmarTh: 'ขอโทษที่ทำให้คุณรอ', },
    ],
    drills: [
      { prompt: 'She appears ___ the news already.', answer: 'to have heard', options: ['to have heard', 'to hear', 'hearing', 'heard'] },
      { prompt: 'They claim ___ the thief.', answer: 'to have seen', options: ['to have seen', 'to see', 'seeing', 'seen'] },
      { prompt: 'I\'m happy ___ met you.', answer: 'to have', options: ['to have', 'to', 'having', 'have'] },
    ],
  },
  {
    id: 'f14-g-c1-014',
    level: 'C1',
    title: 'Perfect gerund: denied having taken',
    titleMyanmar: 'Perfect gerund — having + V3',
    titleMyanmarTh: 'Perfect gerund: having + กริยาช่อง 3',
    explanationMyanmar:
      'having + V3 — gerund ရဲ့အတိတ်ပုံစံ၊ အဓိကကြိယာထက် စောဖြစ်ခဲ့တဲ့လုပ်ရပ်ကို ပြတယ်။ He denied having taken the money. Admit, deny, regret, remember, apologize for + having + V3. အနုတ်ဆို not having + V3။',
    explanationMyanmarTh: 'having + กริยาช่อง 3 คือรูปอดีตของ gerund บอกการกระทำที่เกิดก่อนกริยาหลัก: He denied having taken the money ใช้กับ admit deny regret remember apologize for + having + กริยาช่อง 3 รูปปฏิเสธคือ not having + กริยาช่อง 3',
    examples: [
      { english: 'She admitted having lied about her age.', myanmar: 'သူမ အသက်နဲ့ပတ်သက်ပြီး လိမ်ခဲ့တာကို ဝန်ခံခဲ့တယ်။', myanmarTh: 'เธอยอมรับว่าโกหกเรื่องอายุ', },
      { english: 'He regretted having shouted at his mother.', myanmar: 'သူ့အမေကို အော်ခဲ့တာကို နောင်တရခဲ့တယ်။', myanmarTh: 'เขาเสียใจที่ตะโกนใส่แม่', },
      { english: 'They apologized for having arrived late.', myanmar: 'နောက်ကျခဲ့တာအတွက် တောင်းပန်ခဲ့တယ်။', myanmarTh: 'พวกเขาขอโทษที่มาสาย', },
      { english: 'I remember having seen this film before.', myanmar: 'ဒီရုပ်ရှင်ကို အရင်ကမြင်ဖူးတယ်လို့ မှတ်မိတယ်။', myanmarTh: 'ผมจำได้ว่าเคยดูหนังเรื่องนี้มาก่อน', },
    ],
    drills: [
      { prompt: 'He denied ___ the window.', answer: 'having broken', options: ['having broken', 'breaking', 'to break', 'broken'] },
      { prompt: 'She regrets having ___ so rude.', answer: 'been', options: ['been', 'be', 'being', 'to be'] },
      { prompt: 'They apologized for ___ forgotten the tickets.', answer: 'having', options: ['having', 'have', 'to have', 'had'] },
    ],
  },
  {
    id: 'f14-g-c1-015',
    level: 'C1',
    title: '\'Be to\' for formal plans and orders',
    titleMyanmar: '\'be to\' — တရားဝင်အစီအစဉ်/အမိန့်',
    titleMyanmarTh: 'be to สำหรับแผนและคำสั่งแบบเป็นทางการ',
    explanationMyanmar:
      'be + to-infinitive — တရားဝင်ညွှန်ကြားချက်/အစီအစဉ်။ You are to report at 8 a.m. (= သတင်းပို့ရမယ်)။ was/were to + V1 (= ဖြစ်ဖို့ရှိခဲ့တယ်): They were to meet at noon. was to have + V3 (= လုပ်ဖို့ရှိခဲ့ပေမဲ့ မလုပ်ခဲ့ဘူး): He was to have come, but he fell ill.',
    explanationMyanmarTh: 'be + to-infinitive ใช้สั่งหรือวางแผนแบบเป็นทางการ: You are to report at 8 a.m. (= ต้องมารายงานตัว) was / were to + กริยารูปพื้นฐาน (= เกือบจะได้ทำ): They were to meet at noon / was to have + กริยาช่อง 3 (= ควรจะได้ทำแต่ไม่ได้ทำ): He was to have come but he fell ill',
    examples: [
      { english: 'The students are to wear uniforms on Mondays.', myanmar: 'ကျောင်းသားတွေ တနင်္လာနေ့တွေမှာ ယူနီဖောင်းဝတ်ရမယ်။', myanmarTh: 'นักเรียนต้องใส่เครื่องแบบวันจันทร์', },
      { english: 'The president was to address the nation tonight.', myanmar: 'သမ္မတ ဒီည နိုင်ငံတော်ကို မိန့်ခွန်းပြောဖို့ ရှိခဲ့တယ်။', myanmarTh: 'ประธานาธิบดีจะแถลงต่อชาติคืนนี้', },
      { english: 'She was to have started the new job last week.', myanmar: 'ပြီးခဲ့တဲ့အပတ်က အလုပ်သစ်စဖို့ ရှိခဲ့ပေမဲ့ မစခဲ့ဘူး။', myanmarTh: 'เธอควรจะเริ่มงานใหม่สัปดาห์ที่แล้ว', },
      { english: 'No one is to leave the room during the exam.', myanmar: 'စာမေးပွဲအတွင်း ဘယ်သူမှ အခန်းကထွက်မသွားရဘူး။', myanmarTh: 'ห้ามใครออกจากห้องระหว่างสอบ', },
    ],
    drills: [
      { prompt: 'You are ___ remain silent.', answer: 'to', options: ['to', 'for', 'of', 'at'] },
      { prompt: 'They were ___ meet us at six.', answer: 'to', options: ['to', 'for', 'of', 'at'] },
      { prompt: 'He was to have ___, but he cancelled.', answer: 'come', options: ['come', 'came', 'coming', 'to come'] },
    ],
  },
  {
    id: 'f14-g-c1-016',
    level: 'C1',
    title: 'Sluicing: I know he left, but I don\'t know why',
    titleMyanmar: 'Sluicing — wh- တစ်ခုတည်းကျန်တဲ့ ဝါကျတိုပုံစံ',
    titleMyanmarTh: 'Sluicing: ประโยคย่อเหลือแค่ wh-',
    explanationMyanmar:
      'Wh- clause ရဲ့နောက်ပိုင်းကို ဖြုတ်ပြီး wh- စကားလုံးတစ်ခုတည်း ချန်တာ။ I know he bought something, but I don\'t know what. စကားပြောမှာ သဘာဝကျတဲ့ တိုတိုပုံစံ၊ ရှေ့ဝါကျက အဓိပ္ပာယ်ကို နားလည်ပြီးသားမို့ ထပ်မပြောဘူး။',
    explanationMyanmarTh: 'Sluicing คือการละส่วนหลังของอนุประโยค wh- เหลือแค่คำ wh-: I know he bought something but I do not know what เป็นรูปย่อที่เป็นธรรมชาติในภาษาพูด เพราะเข้าใจความหมายจากประโยคก่อนหน้าอยู่แล้ว',
    examples: [
      { english: 'She said she was upset, but she didn\'t say why.', myanmar: 'သူမစိတ်ဆိုးတယ်လို့ ပြောပေမဲ့ ဘာကြောင့်လဲ မပြောဘူး။', myanmarTh: 'เธอบอกว่าเธอเสียใจ แต่ไม่บอกว่าทำไม', },
      { english: 'He wants to go somewhere exotic, but he hasn\'t decided where.', myanmar: 'ထူးခြားတဲ့နေရာ သွားချင်ပေမဲ့ ဘယ်ကိုလဲ မဆုံးဖြတ်ရသေးဘူး။', myanmarTh: 'เขาอยากไปที่แปลกๆ แต่ยังไม่ตัดสินใจว่าที่ไหน', },
      { english: 'The meeting is tomorrow, but I don\'t remember when exactly.', myanmar: 'အစည်းအဝေးက မနက်ဖြန်ပေမဲ့ ဘယ်အချိန်လဲ အတိအကျ မမှတ်မိဘူး။', myanmarTh: 'การประชุมพรุ่งนี้ แต่ผมจำไม่ได้ว่าเมื่อไหร่แน่', },
      { english: 'Someone called, but I couldn\'t tell who.', myanmar: 'တစ်ယောက်ယောက် ဖုန်းဆက်ပေမဲ့ ဘယ်သူလဲ မသိနိုင်ခဲ့ဘူး။', myanmarTh: 'มีคนโทรหา แต่ผมบอกไม่ได้ว่าใคร', },
    ],
    drills: [
      { prompt: 'I heard they broke up, but I don\'t know ___.', answer: 'why', options: ['why', 'what', 'which', 'that'] },
      { prompt: 'He left early, but nobody knows ___.', answer: 'where', options: ['where', 'what', 'which', 'that'] },
      { prompt: 'She bought a gift, but she won\'t say ___ for.', answer: 'who', options: ['who', 'whom', 'whose', 'which'] },
    ],
  },
  {
    id: 'f14-g-c1-017',
    level: 'C1',
    title: 'Gapping: She likes tea and he coffee',
    titleMyanmar: 'Gapping — ကြိယာဖြုတ်တို ဝါကျ',
    titleMyanmarTh: 'Gapping: การละกริยาที่ซ้ำ',
    explanationMyanmar:
      'ဆက်စပ်ဝါကျမှာ ထပ်နေတဲ့ကြိယာကို ဖြုတ်တာ။ I ordered rice and she (ordered) noodles. He likes tea and she (likes) coffee. အရေးအသားတိုတိုမှာ သုံးတယ်၊ စာပေဆန်တယ်။ ဖြုတ်ထားတဲ့ကြိယာကို စာဖတ်သူက ဖြည့်တွေးရတယ်။',
    explanationMyanmarTh: 'Gapping คือการละกริยาที่ซ้ำในประโยคที่เชื่อมกัน: I ordered rice and she (ordered) noodles / He likes tea and she (likes) coffee ใช้ในงานเขียนกระชับเชิงวรรณศิลป์ ผู้อ่านต้องเติมกริยาที่ละไว้เอง',
    examples: [
      { english: 'My brother plays football and my sister tennis.', myanmar: 'ငါ့ညီ ဘောလုံးကစားတယ်၊ ငါ့ညီမက တင်းနစ် (ကစားတယ်)။', myanmarTh: 'พี่ชายผมเล่นฟุตบอล น้องสาวเล่นเทนนิส', },
      { english: 'She speaks English and he French.', myanmar: 'သူမ အင်္ဂလိပ်စကားပြောတယ်၊ သူက ပြင်သစ် (စကား)။', myanmarTh: 'เธอพูดภาษาอังกฤษ เขาพูดภาษาฝรั่งเศส', },
      { english: 'I wanted tea and my wife coffee.', myanmar: 'ငါ လက်ဖက်ရည်လိုချင်တယ်၊ ငါ့မိန်းမက ကော်ဖီ (လိုချင်တယ်)။', myanmarTh: 'ผมอยากดื่มชา ภรรยาผมอยากดื่มกาแฟ', },
      { english: 'The first train leaves at six and the second at seven.', myanmar: 'ပထမရထား ခြောက်နာရီထွက်တယ်၊ ဒုတိယရထားက ခုနစ်နာရီ (ထွက်တယ်)။', myanmarTh: 'รถไฟขบวนแรกออกหกโมง ขบวนที่สองออกเจ็ดโมง', },
    ],
    drills: [
      { prompt: 'He likes dogs and she ___. (likes → omitted)', answer: 'cats', options: ['cats', 'cat', 'the cats', 'a cat'] },
      { prompt: 'I bought apples and my brother ___. (bought → omitted)', answer: 'oranges', options: ['oranges', 'orange', 'an orange', 'the orange'] },
      { prompt: 'Mary can swim and John ___. (can → omitted)', answer: 'dive', options: ['dive', 'dives', 'diving', 'to dive'] },
    ],
  },
  {
    id: 'f14-g-c1-018',
    level: 'C1',
    title: 'Comparative ellipsis: taller than she is',
    titleMyanmar: 'နှိုင်းယှဉ်ဝါကျ တိုတိုပုံစံ — than she is',
    titleMyanmarTh: 'การละคำในประโยคเปรียบเทียบ: than she is',
    explanationMyanmar:
      'Than/as clause မှာ ထပ်နေတဲ့အပိုင်းကို ဖြုတ်တယ်။ He is taller than she is (= than she is tall)။ "than me" (စကားပြော) နဲ့ "than I" (တရားဝင်) ကွာခြားချက်။ More than I expected (= than I expected it to be)။',
    explanationMyanmarTh: 'ในอนุประโยค than / as ให้ละส่วนที่ซ้ำ: He is taller than she is (= than she is tall) ระวังความต่างระหว่าง than me (ภาษาพูด) กับ than I (ทางการ) และ More than I expected (= than I expected it to be)',
    examples: [
      { english: 'She earns more than I do.', myanmar: 'သူမ ငါ့ထက် ပိုဝင်ငွေရတယ်။', myanmarTh: 'เธอได้เงินมากกว่าผม', },
      { english: 'The results were better than we had hoped.', myanmar: 'ရလဒ်တွေက ငါတို့မျှော်လင့်ထားတာထက် ပိုကောင်းခဲ့တယ်။', myanmarTh: 'ผลลัพธ์ดีกว่าที่พวกเราหวัง', },
      { english: 'He is as tall as his father was at his age.', myanmar: 'သူက သူ့အဖေ အသက်အရွယ်တုန်းကလောက် အရပ်ရှည်တယ်။', myanmarTh: 'เขาสูงเท่าพ่อตอนอายุเท่ากัน', },
      { english: 'This is far more complicated than it looks.', myanmar: 'ဒါက ထင်ရတာထက် အများကြီး ပိုရှုပ်ထွေးတယ်။', myanmarTh: 'นี่ซับซ้อนกว่าที่เห็นมาก', },
    ],
    drills: [
      { prompt: 'She runs faster than ___.', answer: 'I do', options: ['I do', 'me do', 'I', 'mine'] },
      { prompt: 'It cost more than we ___.', answer: 'expected', options: ['expected', 'expect', 'expecting', 'expects'] },
      { prompt: 'He is older than ___.', answer: 'she is', options: ['she is', 'her is', 'she', 'hers'] },
    ],
  },
  {
    id: 'f14-g-c1-019',
    level: 'C1',
    title: 'Accuse of, blame for, praise for, charge with',
    titleMyanmar: 'accuse of / blame for / praise for — စွပ်စွဲ/ချီးမွမ်းပုံစံများ',
    titleMyanmarTh: 'accuse of / blame for / praise for / charge with',
    explanationMyanmar:
      'Accuse sb of doing, blame sb for doing, praise sb for doing, charge sb with doing, congratulate sb on doing, forgive sb for doing — preposition + gerund ပုံစံ။ Preposition မှားရင် အဓိပ္ပာယ်လွဲတတ်တယ်၊ တစ်ခုချင်းကို အတွဲနဲ့မှတ်ထား။',
    explanationMyanmarTh: 'accuse sb of doing blame sb for doing praise sb for doing charge sb with doing congratulate sb on doing forgive sb for doing — โครงสร้าง บุพบท + gerund ถ้าใช้บุพบทผิดความหมายจะเพี้ยน ต้องจำทีละคู่',
    examples: [
      { english: 'They accused him of stealing the documents.', myanmar: 'သူ့ကို စာရွက်စာတမ်းတွေ ခိုးတယ်လို့ စွပ်စွဲခဲ့တယ်။', myanmarTh: 'พวกเขากล่าวหาเขาว่าขโมยเอกสาร', },
      { english: 'She blamed the delay on heavy traffic.', myanmar: 'နှောင့်နှေးမှုကို ယာဉ်ကြောပိတ်ဆို့မှုအပေါ် အပြစ်တင်ခဲ့တယ်။', myanmarTh: 'เธอโทษความล่าช้าว่ารถติด', },
      { english: 'The police charged him with fraud.', myanmar: 'ရဲက သူ့ကို လိမ်လည်မှုနဲ့ တရားစွဲခဲ့တယ်။', myanmarTh: 'ตำรวจตั้งข้อหาเขาฉ้อโกง', },
      { english: 'We congratulated her on winning the prize.', myanmar: 'ဆုရတဲ့အတွက် သူမကို ဂုဏ်ပြုခဲ့တယ်။', myanmarTh: 'พวกเราแสดงความยินดีกับเธอที่ชนะรางวัล', },
    ],
    drills: [
      { prompt: 'He was accused ___ lying.', answer: 'of', options: ['of', 'for', 'with', 'about'] },
      { prompt: 'She blamed me ___ breaking the vase.', answer: 'for', options: ['for', 'of', 'on', 'at'] },
      { prompt: 'They praised him ___ his courage.', answer: 'for', options: ['for', 'of', 'on', 'about'] },
    ],
  },
  {
    id: 'f14-g-c1-020',
    level: 'C1',
    title: 'Advise / allow / persuade + object + to-infinitive',
    titleMyanmar: 'advise / persuade + sb + to do ပုံစံ',
    titleMyanmarTh: 'advise / persuade + กรรม + to-infinitive',
    explanationMyanmar:
      'အချို့ကြိယာတွေက object + to-infinitive လိုက်တယ်။ Advise, allow, persuade, order, encourage, warn, invite, remind, force, teach. "Advise doing" (အထွေထွေ) နဲ့ "advise sb to do" (လူတိတိကျကျ) ကွာတယ် — I advise resting vs She advised me to rest.',
    explanationMyanmarTh: 'กริยาบางตัวตามด้วย กรรม + to-infinitive: advise allow persuade order encourage warn invite remind force teach ระวัง Advise doing (ทั่วไป) ต่างกับ advise sb to do (ระบุคน): I advise resting กับ She advised me to rest',
    examples: [
      { english: 'The doctor advised him to rest for a week.', myanmar: 'ဆရာဝန်က သူ့ကို တစ်ပတ်နားဖို့ အကြံပေးခဲ့တယ်။', myanmarTh: 'หมอแนะนำให้เขาพักหนึ่งสัปดาห์', },
      { english: 'They persuaded me to join the trip.', myanmar: 'သူတို့ ငါ့ကို ခရီးစဉ်လိုက်ပါဖို့ ဆွယ်ခဲ့တယ်။', myanmarTh: 'พวกเขาชวนผมร่วมทริป', },
      { english: 'The teacher warned us not to be late.', myanmar: 'ဆရာက ငါတို့ကို နောက်မကျဖို့ သတိပေးခဲ့တယ်။', myanmarTh: 'ครูเตือนพวกเราไม่ให้สาย', },
      { english: 'Her parents encouraged her to apply abroad.', myanmar: 'သူမမိဘတွေက နိုင်ငံခြား လျှောက်ဖို့ အားပေးခဲ့တယ်။', myanmarTh: 'พ่อแม่ของเธอสนับสนุนให้เธอสมัครไปต่างประเทศ', },
    ],
    drills: [
      { prompt: 'She advised me ___ harder.', answer: 'to study', options: ['to study', 'study', 'studying', 'studied'] },
      { prompt: 'They invited us ___ dinner.', answer: 'to', options: ['to', 'for', 'at', 'on'] },
      { prompt: 'He reminded me ___ the door.', answer: 'to lock', options: ['to lock', 'lock', 'locking', 'locked'] },
    ],
  },
  {
    id: 'f14-g-c1-021',
    level: 'C1',
    title: 'Causative: make / let + bare infinitive',
    titleMyanmar: 'make / let + ကြိယာအခြေခံပုံစံ (to မပါ)',
    titleMyanmarTh: 'Causative: make / let + กริยาไม่เติม to',
    explanationMyanmar:
      'Make sb do (= ခိုင်းစေ/အတင်းပြုစေ), let sb do (= ခွင့်ပြု) — to မပါဘူး။ She made me wait. They let us leave early. သတိထား — passive မှာတော့ to ပြန်ပါတယ်: He was made to wait. (have/get + done ပုံစံနဲ့ မတူဘူး — ဒါက bare infinitive)။',
    explanationMyanmarTh: 'Make sb do (= บังคับ / ทำให้) let sb do (= อนุญาต) ไม่ต้องใส่ to: She made me wait / They let us leave early ระวังในรูป passive ต้องใส่ to กลับมา: He was made to wait (ต่างจากรูป have / get + done ที่ใช้กริยาช่อง 3)',
    examples: [
      { english: 'The funny story made us laugh.', myanmar: 'ရယ်စရာပုံပြင်က ငါတို့ကို ရယ်မောစေခဲ့တယ်။', myanmarTh: 'เรื่องตลกทำให้พวกเราหัวเราะ', },
      { english: 'My parents let me stay out late.', myanmar: 'ငါ့မိဘတွေက ညနောက်ကျထိ အပြင်နေခွင့်ပေးတယ်။', myanmarTh: 'พ่อแม่ให้ผมอยู่นอกบ้านดึกได้', },
      { english: 'The boss made everyone work overtime.', myanmar: 'သူဌေးက လူတိုင်းကို အချိန်ပိုလုပ်ခိုင်းခဲ့တယ်။', myanmarTh: 'เจ้านายให้ทุกคนทำโอที', },
      { english: 'Don\'t let him fool you.', myanmar: 'သူ မင်းကို လှည့်စားခွင့် မပေးနဲ့။', myanmarTh: 'อย่าปล่อยให้เขาหลอกคุณ', },
    ],
    drills: [
      { prompt: 'She made me ___ the letter again.', answer: 'rewrite', options: ['rewrite', 'to rewrite', 'rewriting', 'rewrote'] },
      { prompt: 'They let us ___ early.', answer: 'go', options: ['go', 'to go', 'going', 'gone'] },
      { prompt: 'The teacher made him ___.', answer: 'apologize', options: ['apologize', 'to apologize', 'apologizing', 'apologized'] },
    ],
  },
  {
    id: 'f14-g-c1-022',
    level: 'C1',
    title: 'Sentence adverbs: frankly, ideally, predictably',
    titleMyanmar: 'ဝါကျတစ်ခုလုံးဆိုင်ရာ ကြိယာဝိသေသန — frankly, ideally',
    titleMyanmarTh: 'กริยาวิเศษณ์ขยายทั้งประโยค: frankly / ideally',
    explanationMyanmar:
      'Frankly, honestly, ideally, predictably, understandably, fortunately, surprisingly — ဝါကျအစ/အလယ်မှာ ထားပြီး ပြောသူရဲ့သဘောထား ပြတယ်။ "Fortunately, nobody was hurt." Comma နဲ့ခွဲတယ်။ ကြိယာတစ်ခုတည်းကို ပြင်တာမဟုတ်ဘဲ ဝါကျတစ်ခုလုံးကို ပြင်တာ။',
    explanationMyanmarTh: 'Frankly honestly ideally predictably understandably fortunately surprisingly วางต้นหรือกลางประโยคเพื่อบอกทัศนะของผู้พูด: Fortunately nobody was hurt คั่นด้วยจุลภาค ไม่ได้ขยายแค่กริยาแต่ขยายทั้งประโยค',
    examples: [
      { english: 'Frankly, I don\'t think it will work.', myanmar: 'ပွင့်ပွင့်ပြောရရင် အလုပ်ဖြစ်မယ် မထင်ဘူး။', myanmarTh: 'พูดตรงๆ ผมไม่คิดว่ามันจะได้ผล', },
      { english: 'Ideally, we would finish by noon.', myanmar: 'အကောင်းဆုံးဆိုရင် နေ့လယ်ထိ ပြီးချင်တယ်။', myanmarTh: 'ถ้าเป็นไปได้ พวกเราน่าจะเสร็จก่อนเที่ยง', },
      { english: 'Predictably, he arrived late again.', myanmar: 'ခန့်မှန်းထားတဲ့အတိုင်း သူနောက်ကျပြန်ပြီ။', myanmarTh: 'เป็นไปตามคาด เขามาสายอีกแล้ว', },
      { english: 'Understandably, she was nervous before the interview.', myanmar: 'နားလည်နိုင်စရာပဲ၊ အင်တာဗျူးမတိုင်ခင် သူမစိုးရိမ်ခဲ့တယ်။', myanmarTh: 'เข้าใจได้ เธอประหม่าก่อนสัมภาษณ์', },
    ],
    drills: [
      { prompt: '___, the plan failed.', answer: 'Unfortunately', options: ['Unfortunately', 'Unfortunate', 'Unfortunates', 'Unfortunating'] },
      { prompt: '___, I\'d prefer to stay home.', answer: 'Honestly', options: ['Honestly', 'Honest', 'Honesty', 'Honesting'] },
      { prompt: '___, nobody believed him.', answer: 'Surprisingly', options: ['Surprisingly', 'Surprise', 'Surprised', 'Surprising'] },
    ],
  },
  {
    id: 'f14-g-c1-023',
    level: 'C1',
    title: 'Focusing adverbs: only, even, merely — position matters',
    titleMyanmar: 'only / even နေရာပြောင်းရင် အဓိပ္ပာယ်ပြောင်း',
    titleMyanmarTh: 'กริยาวิเศษณ์เน้นจุด: ตำแหน่งของ only / even เปลี่ยนความหมาย',
    explanationMyanmar:
      'Only, even, just, merely, simply — ဘယ်စကားလုံးရှေ့မှာ ထားလဲဆိုတာ အဓိပ္ပာယ်ပြောင်းတယ်။ "Only I saw him" (ငါတစ်ယောက်တည်း) vs "I only saw him" (မြင်ရုံပဲ) vs "I saw only him" (သူ့ကိုပဲ)။ စာမေးပွဲမှာ အထားနေရာမေးလေ့ရှိတယ်။',
    explanationMyanmarTh: 'Only even just merely simply วางหน้าคำไหนความหมายเปลี่ยนตาม: Only I saw him (มีแค่ผมที่เห็น) I only saw him (แค่เห็นเฉยๆ) I saw only him (เห็นแค่เขา) เป็นจุดที่ข้อสอบชอบถามเรื่องตำแหน่ง',
    examples: [
      { english: 'Even the teacher didn\'t know the answer.', myanmar: 'ဆရာတောင် အဖြေမသိဘူး။', myanmarTh: 'แม้แต่ครูก็ไม่รู้คำตอบ', },
      { english: 'She merely smiled and said nothing.', myanmar: 'သူမက ပြုံးရုံပဲပြုံးပြီး ဘာမှမပြောဘူး။', myanmarTh: 'เธอแค่ยิ้มแล้วไม่พูดอะไร', },
      { english: 'I have only just arrived.', myanmar: 'ငါအခုမှပဲ ရောက်တယ်။', myanmarTh: 'ผมเพิ่งมาถึง', },
      { english: 'He didn\'t even apologize.', myanmar: 'သူတောင်းပန်တောင် မတောင်းပန်ဘူး။', myanmarTh: 'เขาไม่ได้ขอโทษด้วยซ้ำ', },
    ],
    drills: [
      { prompt: '___ John passed the exam. (no one else did)', answer: 'Only', options: ['Only', 'Even', 'Merely', 'Just'] },
      { prompt: 'She ___ glanced at the menu.', answer: 'merely', options: ['merely', 'even', 'only', 'almost'] },
      { prompt: '___ my mother understands me. (surprisingly, she does)', answer: 'Even', options: ['Even', 'Only', 'Merely', 'Just'] },
    ],
  },
  {
    id: 'f14-g-c1-024',
    level: 'C1',
    title: '\'Not so much X as Y\' — comparison of reasons',
    titleMyanmar: '\'Not so much X as Y\' — နှိုင်းယှဉ်အကြောင်းပြချက်',
    titleMyanmarTh: 'Not so much X as Y: การเปรียบเทียบเหตุผล',
    explanationMyanmar:
      'Not so much + A + as + B (= A ထက် B က ပိုအကြောင်းရင်း): He\'s not so much angry as disappointed. As much + noun + as: It\'s as much your fault as mine. ယှဉ်တဲ့အရာ နှစ်ခုကို parallel (ပုံစံတူ) ထားရတယ်။',
    explanationMyanmarTh: 'Not so much + A + as + B (= ไม่ใช่ A เท่า B ที่เป็นเหตุผลมากกว่า): He is not so much angry as disappointed / As much + คำนาม + as: It is as much your fault as mine สิ่งที่เปรียบเทียบสองอย่างต้องขนานกัน (parallel)',
    examples: [
      { english: 'It wasn\'t so much the rain as the wind that caused damage.', myanmar: 'ပျက်စီးမှုဖြစ်စေတာက မိုးထက် လေပိုများတယ်။', myanmarTh: 'ไม่ใช่ฝนเท่าไหร่ แต่ลมต่างหากที่ทำให้เสียหาย', },
      { english: 'She is not so much a teacher as a mentor.', myanmar: 'သူမက ဆရာမထက် လမ်းညွှန်သူပိုဆန်တယ်။', myanmarTh: 'เธอไม่ใช่ครูเท่าไหร่ แต่เป็นที่ปรึกษามากกว่า', },
      { english: 'It\'s as much my responsibility as yours.', myanmar: 'ဒါက မင်းတာဝန်လောက် ငါ့တာဝန်လည်းဖြစ်တယ်။', myanmarTh: 'มันเป็นความรับผิดชอบของผมเท่ากับของคุณ', },
      { english: 'He left not so much from fear as from boredom.', myanmar: 'သူထွက်သွားတာက ကြောက်တာထက် ပျင်းတာပိုများတယ်။', myanmarTh: 'เขาออกไปไม่ใช่เพราะกลัวเท่าเพราะเบื่อ', },
    ],
    drills: [
      { prompt: 'It\'s not so much hot ___ humid.', answer: 'as', options: ['as', 'than', 'like', 'that'] },
      { prompt: 'She\'s as much a friend ___ a colleague.', answer: 'as', options: ['as', 'than', 'like', 'and'] },
      { prompt: 'He failed not so much ___ lack of effort as bad luck.', answer: 'from', options: ['from', 'for', 'of', 'by'] },
    ],
  },
  {
    id: 'f14-g-c1-025',
    level: 'C1',
    title: 'However hard / Strange as it may seem',
    titleMyanmar: 'However + adjective နဲ့ as + adjective + as အပေးအယူပုံစံ',
    titleMyanmarTh: 'However hard / Strange as it may seem',
    explanationMyanmar:
      'However + adjective/adverb + subject + verb (= ဘယ်လောက်ပဲ...စေကာမူ): However hard he tried. Adjective + as + subject + may/might: Strange as it may seem, ... May/might ကို ဖြုတ်လို့မရဘူး။ တရားဝင်အရေးအသားမှာ အသုံးများတယ်။',
    explanationMyanmarTh: 'However + คำคุณศัพท์ / กริยาวิเศษณ์ + ประธาน + กริยา (= ไม่ว่าจะ...แค่ไหนก็ตาม): However hard he tried / คำคุณศัพท์ + as + ประธาน + may / might: Strange as it may seem ... ห้ามละ may / might ใช้มากในงานเขียนทางการ',
    examples: [
      { english: 'However carefully you drive, accidents can happen.', myanmar: 'ဘယ်လောက်ပဲ ဂရုစိုက်မောင်းစေကာမူ မတော်တဆမှုဖြစ်နိုင်တယ်။', myanmarTh: 'คุณจะขับระวังแค่ไหน อุบัติเหตุก็เกิดได้', },
      { english: 'Strange as it may seem, I enjoy doing housework.', myanmar: 'ထူးဆန်းနေပေမဲ့ အိမ်မှုကိစ္စလုပ်ရတာကို ငါနှစ်သက်တယ်။', myanmarTh: 'ฟังดูแปลก แต่ผมชอบทำงานบ้าน', },
      { english: 'Difficult as the exam was, she passed with distinction.', myanmar: 'စာမေးပွဲ ဘယ်လောက်ပဲခက်စေကာမူ သူမ ဂုဏ်ထူးနဲ့အောင်ခဲ့တယ်။', myanmarTh: 'ข้อสอบยากแค่ไหน เธอก็สอบผ่านด้วยคะแนนดีเด่น', },
      { english: 'However much I earn, I never seem to save.', myanmar: 'ဘယ်လောက်ပဲ ဝင်ငွေရရ စုမိသလို မခံစားရဘူး။', myanmarTh: 'ผมจะหาเงินได้มากแค่ไหน ก็เก็บไม่ได้สักที', },
    ],
    drills: [
      { prompt: '___ rich he is, he\'s not happy.', answer: 'However', options: ['However', 'Whatever', 'Whenever', 'Wherever'] },
      { prompt: 'Tired ___ she was, she kept working.', answer: 'as', options: ['as', 'like', 'than', 'that'] },
      { prompt: '___ fast you run, you won\'t catch him.', answer: 'However', options: ['However', 'Whatever', 'How', 'What'] },
    ],
  },
  {
    id: 'f14-g-c1-026',
    level: 'C1',
    title: 'Apposition: My colleague, a talented engineer, resigned',
    titleMyanmar: 'Apposition — နာမ်ကို နာမ်နဲ့ထပ်ရှင်းတာ',
    titleMyanmarTh: 'Apposition: การขยายนามด้วยนาม',
    explanationMyanmar:
      'နာမ်တစ်ခုကို နာမ်စု/စကားစုနဲ့ ထပ်ရှင်းတာ။ My friend, the doctor, called. Comma နှစ်ခုကြားထားတယ်။ Non-restrictive (ဖြုတ်လို့ရ) နဲ့ restrictive (ဖြုတ်မရ — "My brother John" comma မပါ) ကွာတယ်။',
    explanationMyanmarTh: 'Apposition คือการใช้นามหรือวลีนามขยายคำนามอีกตัว: My friend the doctor called คั่นด้วยจุลภาคสองตัว แบบ non-restrictive (ละได้) ต่างกับแบบ restrictive (ละไม่ได้ เช่น My brother John ไม่ใส่จุลภาค)',
    examples: [
      { english: 'Mandalay, the last royal capital, attracts many tourists.', myanmar: 'မန္တလေး (နောက်ဆုံးမင်းနေပြည်တော်) က ခရီးသွားများစွာကို ဆွဲဆောင်တယ်။', myanmarTh: 'มัณฑะเลย์ เมืองหลวงราชวงศ์สุดท้าย ดึงดูดนักท่องเที่ยวมากมาย', },
      { english: 'Her husband, a quiet man, rarely speaks.', myanmar: 'သူ့ယောကျ်ား (တိတ်ဆိတ်တဲ့လူ) က ရှားရှားပါးပါးပဲ စကားပြောတယ်။', myanmarTh: 'สามีของเธอ ชายเงียบๆ แทบไม่พูด', },
      { english: 'We visited Bagan, an ancient city of temples.', myanmar: 'ငါတို့ပုဂံ (ရှေးဟောင်းဘုရားမြို့) ကို သွားလည်ခဲ့တယ်။', myanmarTh: 'พวกเราไปพุกาม เมืองโบราณแห่งวัด', },
      { english: 'The CEO, Ms. Aye, announced the merger.', myanmar: 'စီအီးအို (ဒေါ်အေး) က ပေါင်းစည်းမှုကို ကြေညာခဲ့တယ်။', myanmarTh: 'ซีอีโอ คุณเอ ประกาศควบรวมกิจการ', },
    ],
    drills: [
      { prompt: 'Yangon, the ___ city, is very crowded.', answer: 'largest', options: ['largest', 'larger', 'large', 'largely'] },
      { prompt: 'My teacher, ___ kind woman, helped me a lot.', answer: 'a', options: ['a', 'the', 'an', '—'] },
      { prompt: 'The Eiffel Tower, ___ iconic landmark, is in Paris.', answer: 'an', options: ['an', 'a', 'the', '—'] },
    ],
  },
  {
    id: 'f14-g-c1-027',
    level: 'C1',
    title: '\'Which\' referring to a whole clause',
    titleMyanmar: '\'which\' က ဝါကျတစ်ခုလုံးကို ရည်ညွှန်းတာ',
    titleMyanmarTh: 'which อ้างถึงอนุประโยคทั้งประโยค',
    explanationMyanmar:
      'He was late, which annoyed me — which က "he was late" ဆိုတဲ့ဖြစ်ရပ်တစ်ခုလုံးကို ရည်ညွှန်းတယ်။ Comma အမြဲပါတယ်။ "That" နဲ့ ဒီအသုံးမရဘူး။ Non-defining relative clause ရဲ့ အထူးပုံစံ။',
    explanationMyanmarTh: 'He was late which annoyed me — which อ้างถึงเหตุการณ์ทั้งประโยค (he was late) ไม่ใช่แค่นามตัวเดียว ต้องมีจุลภาคเสมอ และใช้ that แทนในความหมายนี้ไม่ได้ เป็นรูปพิเศษของ non-defining relative clause',
    examples: [
      { english: 'She forgot our anniversary, which really hurt him.', myanmar: 'သူမ ငါတို့နှစ်ပတ်လည်နေ့ကို မေ့သွားတယ်၊ ဒါက သူ့ကို တကယ်နာကျင်စေခဲ့တယ်။', myanmarTh: 'เธอลืมวันครบรอบของพวกเรา ซึ่งทำให้เขาเจ็บปวดมาก', },
      { english: 'It rained all day, which ruined our picnic.', myanmar: 'တစ်နေ့လုံး မိုးရွာတယ်၊ ဒါက ငါတို့ပျော်ပွဲစားထွက်တာကို ပျက်စီးစေခဲ့တယ်။', myanmarTh: 'ฝนตกทั้งวัน ซึ่งทำลายปิกนิกของพวกเรา', },
      { english: 'He speaks five languages, which is impressive.', myanmar: 'သူ ဘာသာစကားငါးမျိုး ပြောတယ်၊ ဒါက အံ့ဩစရာကောင်းတယ်။', myanmarTh: 'เขาพูดได้ห้าภาษา ซึ่งน่าประทับใจ', },
      { english: 'The train was cancelled, which meant we had to drive.', myanmar: 'ရထားဖျက်သိမ်းခံရတယ်၊ ဒါကြောင့် ငါတို့ကားမောင်းရတယ်။', myanmarTh: 'รถไฟถูกยกเลิก ซึ่งหมายความว่าพวกเราต้องขับรถไป', },
    ],
    drills: [
      { prompt: 'He lied to me, ___ I can\'t forgive.', answer: 'which', options: ['which', 'that', 'what', 'who'] },
      { prompt: 'She won first prize, ___ surprised everyone.', answer: 'which', options: ['which', 'that', 'what', 'whom'] },
      { prompt: 'The shop closed early, ___ disappointed us.', answer: 'which', options: ['which', 'that', 'what', 'whose'] },
    ],
  },
  {
    id: 'f14-g-c1-028',
    level: 'C1',
    title: 'Pied-piping: the person to whom I spoke',
    titleMyanmar: 'Preposition ကို relative pronoun ရှေ့ထား — to whom',
    titleMyanmarTh: 'Pied-piping: บุพบทหน้าคำสรรพนาม relative',
    explanationMyanmar:
      'တရားဝင်အရေးအသားမှာ preposition ကို relative pronoun ရှေ့ထားတယ် (pied-piping): the person to whom I spoke, the house in which I grew up. စကားပြောမှာတော့ နောက်ဆုံးထားတယ် (stranding): the person I spoke to. Whom + preposition ရှေ့ — who နဲ့မရဘူး။',
    explanationMyanmarTh: 'ในงานเขียนทางการให้ย้ายบุพบทมาหน้าคำสรรพนาม relative (pied-piping): the person to whom I spoke / the house in which I grew up ส่วนภาษาพูดวางบุพบทไว้ท้าย (stranding): the person I spoke to หลังบุพบทต้องใช้ whom เท่านั้น ใช้ who ไม่ได้',
    examples: [
      { english: 'The colleague with whom I share an office is very kind.', myanmar: 'ရုံးခန်းအတူသုံးတဲ့ လုပ်ဖော်ကိုင်ဖက်က အရမ်းသဘောကောင်းတယ်။', myanmarTh: 'เพื่อนร่วมงานที่ผมใช้ห้องทำงานด้วยใจดีมาก', },
      { english: 'This is the topic about which we disagree.', myanmar: 'ဒါက ငါတို့သဘောမတူတဲ့ အကြောင်းအရာပါ။', myanmarTh: 'นี่คือหัวข้อที่พวกเราไม่เห็นด้วย', },
      { english: 'The hotel at which we stayed was luxurious.', myanmar: 'ငါတို့တည်းခဲ့တဲ့ ဟိုတယ်က ဇိမ်ခံတယ်။', myanmarTh: 'โรงแรมที่พวกเราพักหรูหรา', },
      { english: 'She is someone on whom you can always rely.', myanmar: 'သူမက မင်းအမြဲ အားကိုးနိုင်တဲ့သူပါ။', myanmarTh: 'เธอคือคนที่พึ่งพาได้เสมอ', },
    ],
    drills: [
      { prompt: 'The friend ___ whom I travelled is here.', answer: 'with', options: ['with', 'to', 'for', 'by'] },
      { prompt: 'This is the issue ___ which we must decide.', answer: 'on', options: ['on', 'in', 'at', 'of'] },
      { prompt: 'The house ___ which he was born no longer exists.', answer: 'in', options: ['in', 'at', 'on', 'from'] },
    ],
  },
  {
    id: 'f14-g-c1-029',
    level: 'C1',
    title: '\'Dare\' and \'need\' as modal verbs',
    titleMyanmar: '\'dare / need\' ကို modal အနေနဲ့သုံးတာ',
    titleMyanmarTh: 'dare และ need ในฐานะกริยาช่วย',
    explanationMyanmar:
      'Dare (= ရဲရင့်) နဲ့ need ကို modal အနေနဲ့သုံးတဲ့အခါ to မပါ၊ -s မပါ၊ do-support မလိုဘူး။ He dare not go, Need I say more? အနုတ်နဲ့မေးခွန်းမှာ ပဲသုံးလေ့ရှိတယ်။ "Dares to" (lexical verb) နဲ့ကွာတယ်။',
    explanationMyanmarTh: 'Dare (= กล้า) และ need เมื่อใช้เป็นกริยาช่วยจะไม่ใส่ to ไม่เติม -s และไม่ต้องใช้ do ช่วย: He dare not go / Need I say more? มักใช้เฉพาะในประโยคปฏิเสธและคำถาม ต่างกับ dares to ที่เป็นกริยาปกติ',
    examples: [
      { english: 'How dare you speak to me like that!', myanmar: 'မင်း ငါ့ကို အဲလိုပြောရဲတယ်ပေါ့!', myanmarTh: 'คุณกล้าพูดกับผมแบบนี้ได้อย่างไร', },
      { english: 'You needn\'t worry about a thing.', myanmar: 'ဘာမှ စိတ်ပူစရာမလိုဘူး။', myanmarTh: 'คุณไม่ต้องกังวลอะไรเลย', },
      { english: 'Dare I ask what happened?', myanmar: 'ဘာဖြစ်ခဲ့လဲ မေးရဲရဲ့လား။', myanmarTh: 'ผมขอถามได้ไหมว่าเกิดอะไรขึ้น', },
      { english: 'He daren\'t tell his parents the truth.', myanmar: 'သူ့မိဘတွေကို အမှန်တိုင်း ပြောရဲဘူး။', myanmarTh: 'เขาไม่กล้าบอกความจริงกับพ่อแม่', },
    ],
    drills: [
      { prompt: 'She ___ not come to the party.', answer: 'dare', options: ['dare', 'dares', 'daring', 'to dare'] },
      { prompt: 'You ___ hurry; we have plenty of time.', answer: 'needn\'t', options: ['needn\'t', 'don\'t need', 'needn', 'need not to'] },
      { prompt: '___ I remind you of the deadline?', answer: 'Need', options: ['Need', 'Do', 'Does', 'Needs'] },
    ],
  },
  {
    id: 'f14-g-c1-030',
    level: 'C1',
    title: 'Exclamatory questions: What on earth ...? Whatever ...?',
    titleMyanmar: 'အံ့ဩမေးခွန်း — What on earth / Whatever',
    titleMyanmarTh: 'คำถามเชิงอุทาน: What on earth ...?',
    explanationMyanmar:
      'What on earth / in heaven\'s name + မေးခွန်း (= အံ့ဩ/ဒေါသ): What on earth are you doing? Wh- + ever (Whatever did he say? = သူဘာပြောခဲ့တာလဲ — အံ့ဩတာ)။ "Whatever" က "ဘာပဲဖြစ်ဖြစ်" လည်းဖြစ်နိုင်လို့ အသံနေအသံထားနဲ့ ကွာတယ်။',
    explanationMyanmarTh: 'What on earth / in heaven name + คำถาม (= ประหลาดใจ / โกรธ): What on earth are you doing? และ Wh- + ever (Whatever did he say? = เขาพูดอะไรเนี่ย — แสดงความประหลาดใจ) ระวัง whatever ยังแปลว่า ไม่ว่าจะอะไรก็ตาม ได้ด้วย ต้องดูน้ำเสียง',
    examples: [
      { english: 'What on earth were you thinking?', myanmar: 'မင်း ဘာတွေတွေးနေတာလဲ (အံ့ဩတာ)!', myanmarTh: 'คุณคิดอะไรอยู่เนี่ย', },
      { english: 'Wherever did you find that hat?', myanmar: 'အဲဒီဦးထုပ်ကို ဘယ်မှာတွေ့ခဲ့တာလဲ!', myanmarTh: 'คุณไปเจอหมวกใบนั้นที่ไหนมา', },
      { english: 'However did you manage to finish so quickly?', myanmar: 'ဘယ်လိုလုပ်ပြီး အဲလောက်မြန်မြန် ပြီးအောင်လုပ်နိုင်ခဲ့တာလဲ!', myanmarTh: 'คุณทำเสร็จเร็วขนาดนี้ได้อย่างไร', },
      { english: 'What in heaven\'s name is that noise?', myanmar: 'အဲဒီဆူညံသံက ဘာကြီးလဲ!', myanmarTh: 'เสียงนั่นมันอะไรกัน', },
    ],
    drills: [
      { prompt: 'What ___ earth happened here?', answer: 'on', options: ['on', 'in', 'at', 'of'] },
      { prompt: '___ did you get in?', answer: 'However', options: ['However', 'Whatever', 'Whenever', 'Wherever'] },
      { prompt: 'Where ___ have you been?', answer: 'on', options: ['on', 'in', 'at', 'to'] },
    ],
  },
  {
    id: 'f14-g-c2-001',
    level: 'C2',
    title: 'Reversed pseudo-cleft: What she wants is peace',
    titleMyanmar: 'ပြောင်းပြန် pseudo-cleft — What ... is ...',
    titleMyanmarTh: 'Pseudo-cleft แบบกลับ: What she wants is peace',
    explanationMyanmar:
      'ပုံမှန် "What she wants is peace" ကို ပြောင်းပြန်လှန်တာ။ Peace is what she wants. Running marathons is what he lives for. အလေးပေးချင်တဲ့အပိုင်းကို အစမှာထား၊ စာပေဆန်ပြီး မိန့်ခွန်းတွေမှာ အသုံးများတယ်။',
    explanationMyanmarTh: 'กลับด้าน pseudo-cleft: Peace is what she wants / Running marathons is what he lives for เอาส่วนที่ต้องการเน้นมาหน้าประโยค เป็นรูปเชิงวรรณศิลป์ ใช้มากในสุนทรพจน์',
    examples: [
      { english: 'A good night\'s sleep is what I need most.', myanmar: 'ကောင်းကောင်းအိပ်စက်ရတာက ငါအလိုအပ်ဆုံးပါ။', myanmarTh: 'การนอนหลับดีๆ คือสิ่งที่ผมต้องการที่สุด', },
      { english: 'Honesty is what matters in the end.', myanmar: 'အဆုံးမှာ အရေးကြီးတာက ရိုးသားမှုပါ။', myanmarTh: 'ความซื่อสัตย์คือสิ่งสำคัญในที่สุด', },
      { english: 'Spending time with family is what she enjoys.', myanmar: 'မိသားစုနဲ့ အချိန်ဖြုန်းရတာက သူမနှစ်သက်တာပါ။', myanmarTh: 'การใช้เวลากับครอบครัวคือสิ่งที่เธอชอบ', },
      { english: 'Winning the scholarship is what changed his life.', myanmar: 'ပညာသင်ဆုရတာက သူ့ဘဝကို ပြောင်းလဲစေခဲ့တာပါ။', myanmarTh: 'การชนะทุนการศึกษาคือสิ่งที่เปลี่ยนชีวิตเขา', },
    ],
    drills: [
      { prompt: '___ is what he fears most.', answer: 'Failure', options: ['Failure', 'Fail', 'Failing', 'Failed'] },
      { prompt: 'Helping others is ___ she lives for.', answer: 'what', options: ['what', 'that', 'which', 'this'] },
      { prompt: 'A quiet life is what ___ want.', answer: 'they', options: ['they', 'them', 'their', 'themselves'] },
    ],
  },
  {
    id: 'f14-g-c2-002',
    level: 'C2',
    title: 'Emphatic time clefts: It wasn\'t until ... that ...',
    titleMyanmar: 'It wasn\'t until ... that ... အချိန်အလေးပေးဝါကျ',
    titleMyanmarTh: 'ประโยคเน้นเวลา: It was not until ... that ...',
    explanationMyanmar:
      'It wasn\'t until + အချိန် + that + clause (= ...မှပဲ): It wasn\'t until midnight that he arrived. It was only when... that... အလေးပေးချင်တဲ့အချိန်ကို that နောက်မှာထား၊ "နောက်ကျမှ" ဆိုတဲ့ အရိပ်အမြွက်ပါတယ်။',
    explanationMyanmarTh: 'It was not until + เวลา + that + อนุประโยค (= ...ถึงได้...): It was not until midnight that he arrived / It was only when ... that ... เน้นช่วงเวลาที่ต้องการ มีนัยว่า ช้ากว่าที่ควร',
    examples: [
      { english: 'It wasn\'t until 2020 that she published her first novel.', myanmar: '၂၀၂၀ ရောက်မှပဲ သူမပထမဆုံး ဝတ္ထုထုတ်ဝေခဲ့တယ်။', myanmarTh: 'เธอตีพิมพ์นิยายเล่มแรกในปี 2020 นั่นเอง', },
      { english: 'It was only when the lights went out that we realised the storm\'s power.', myanmar: 'မီးတွေပိတ်သွားမှပဲ မုန်တိုင်းရဲ့အစွမ်းကို သဘောပေါက်ခဲ့တယ်။', myanmarTh: 'พอไฟดับพวกเราถึงรู้ว่าพายุรุนแรงแค่ไหน', },
      { english: 'It wasn\'t until he spoke that I recognised his voice.', myanmar: 'သူစကားပြောမှပဲ သူ့အသံကို မှတ်မိခဲ့တယ်။', myanmarTh: 'พอเขาพูดผมถึงจำเสียงเขาได้', },
      { english: 'It was not until the meeting ended that the decision was announced.', myanmar: 'အစည်းအဝေးပြီးမှပဲ ဆုံးဖြတ်ချက်ကို ကြေညာခဲ့တယ်။', myanmarTh: 'การตัดสินใจเพิ่งประกาศหลังการประชุมจบ', },
    ],
    drills: [
      { prompt: 'It wasn\'t ___ dawn that they found the lost child.', answer: 'until', options: ['until', 'up to', 'by', 'at'] },
      { prompt: 'It was only ___ she smiled that he relaxed.', answer: 'when', options: ['when', 'that', 'which', 'while'] },
      { prompt: 'It ___ until yesterday that I heard the news.', answer: 'wasn\'t', options: ['wasn\'t', 'isn\'t', 'hadn\'t', 'didn\'t'] },
    ],
  },
  {
    id: 'f14-g-c2-003',
    level: 'C2',
    title: 'Extraposition: It is vital that ... / To complain is pointless',
    titleMyanmar: 'Extraposition — It is ... that ... / To ... is ...',
    titleMyanmarTh: 'Extraposition: It is ... that ...',
    explanationMyanmar:
      'ရှည်တဲ့ subject clause ကို နောက်ရွှေ့ပြီး it ကို အစားထိုးထားတာ။ It is vital that you attend (= That you attend is vital)။ It seems clear that..., It is no use crying. To complain is pointless (to-infinitive ကို subject လုပ် — တရားဝင်)။',
    explanationMyanmarTh: 'Extraposition คือการย้ายอนุประโยคประธานที่ยาวไปไว้ท้าย แล้วใช้ it แทนที่: It is vital that you attend (= That you attend is vital) / It seems clear that ... / It is no use crying / To complain is pointless (ใช้ to-infinitive เป็นประธาน — ทางการ)',
    examples: [
      { english: 'It is essential that everyone arrives on time.', myanmar: 'လူတိုင်းအချိန်မှန် ရောက်ဖို့ မရှိမဖြစ်လိုအပ်တယ်။', myanmarTh: 'จำเป็นอย่างยิ่งที่ทุกคนมาตรงเวลา', },
      { english: 'It is no use regretting the past.', myanmar: 'အတိတ်ကို နောင်တရတာ အသုံးမဝင်ဘူး။', myanmarTh: 'เสียใจกับอดีตไปก็ไร้ประโยชน์', },
      { english: 'To hesitate is to lose the opportunity.', myanmar: 'တွေဝေနေတာက အခွင့်အရေး ဆုံးရှုံးတာပဲ။', myanmarTh: 'ลังเลก็เท่ากับเสียโอกาส', },
      { english: 'It seems unlikely that prices will fall soon.', myanmar: 'ဈေးနှုန်းတွေ မကြာခင်ကျမယ်လို့ မထင်ရဘူး။', myanmarTh: 'ดูไม่น่าว่าราคาจะลงในไม่ช้า', },
    ],
    drills: [
      { prompt: 'It is important ___ you be honest.', answer: 'that', options: ['that', 'for', 'to', 'of'] },
      { prompt: 'It is ___ use arguing with him.', answer: 'no', options: ['no', 'not', 'none', 'any'] },
      { prompt: '___ wait is to waste time.', answer: 'To', options: ['To', 'For', 'Of', 'At'] },
    ],
  },
  {
    id: 'f14-g-c2-004',
    level: 'C2',
    title: 'Advanced existential \'there\': There remains ...',
    titleMyanmar: '\'There\' အဆင့်မြင့်ပုံစံများ — There remains ...',
    titleMyanmarTh: 'There ขั้นสูง: There remains ...',
    explanationMyanmar:
      'There + remain/exist/come/arise/stand/lie + noun — တရားဝင်အရေးအသား။ There remains one problem. There comes a time when... There exists no evidence. Verb က noun နဲ့ သဘောတူညီရတယ် (There remains much / There remain many issues)။',
    explanationMyanmarTh: 'There + remain / exist / come / arise / stand / lie + คำนาม งานเขียนทางการ: There remains one problem / There comes a time when ... / There exists no evidence กริยาต้องสอดคล้องกับคำนาม (There remains much / There remain many issues)',
    examples: [
      { english: 'There remains much to be done before the deadline.', myanmar: 'သတ်မှတ်ရက် မတိုင်ခင် လုပ်စရာများစွာ ကျန်သေးတယ်။', myanmarTh: 'ยังเหลืออีกมากที่ต้องทำก่อนกำหนด', },
      { english: 'There comes a point in every career when change is needed.', myanmar: 'အသက်မွေးဝမ်းကျောင်း တိုင်းမှာ ပြောင်းလဲမှုလိုအပ်တဲ့ အချိန်ဆိုတာရှိတယ်။', myanmarTh: 'ทุกอาชีพมีจุดที่ต้องเปลี่ยนแปลง', },
      { english: 'There exists no simple solution to this problem.', myanmar: 'ဒီပြဿနာအတွက် ရိုးရှင်းတဲ့အဖြေ ဆိုတာမရှိဘူး။', myanmarTh: 'ปัญหานี้ไม่มีทางแก้ง่ายๆ', },
      { english: 'There stood an old temple at the top of the hill.', myanmar: 'တောင်ထိပ်မှာ ရှေးဟောင်းဘုရား တစ်ဆူရှိခဲ့တယ်။', myanmarTh: 'มีวัดเก่าอยู่บนยอดเขา', },
    ],
    drills: [
      { prompt: 'There ___ little hope left.', answer: 'remains', options: ['remains', 'remain', 'remaining', 'remained'] },
      { prompt: 'There ___ a time when I trusted him.', answer: 'came', options: ['came', 'comes', 'come', 'coming'] },
      { prompt: 'There ___ no doubt about it.', answer: 'is', options: ['is', 'are', 'be', 'being'] },
    ],
  },
  {
    id: 'f14-g-c2-005',
    level: 'C2',
    title: 'Control vs raising: promise to go / seem to know',
    titleMyanmar: 'promise (control) vs seem (raising) ကွာခြားချက်',
    titleMyanmarTh: 'Control กับ raising: promise to go / seem to know',
    explanationMyanmar:
      'Promise, decide, refuse, agree = control verbs (subject က ကိုယ်တိုင်လုပ်မယ့်သူ): I promised to help (= ငါကူညီမယ်)။ Seem, appear, happen = raising verbs (subject က အောက်က predicate ရဲ့အကြောင်းအရာ): He seems to be ill (= သူနေမကောင်းပုံရတယ် — seem ရဲ့ subject အစစ်မဟုတ်)။',
    explanationMyanmarTh: 'Promise decide refuse agree = control verbs (ประธานเป็นผู้ทำเอง): I promised to help (= ผมจะช่วยเอง) / Seem appear happen = raising verbs (ประธานไม่ใช่ผู้ทำจริง): He seems to be ill (= ดูเหมือนเขาจะป่วย — seem ไม่ได้มีประธานเป็นของตัวเอง)',
    examples: [
      { english: 'She refused to answer the question.', myanmar: 'သူမ မေးခွန်းကို ဖြေဖို့ ငြင်းခဲ့တယ်။', myanmarTh: 'เธอปฏิเสธตอบคำถาม', },
      { english: 'They appear to be satisfied with the result.', myanmar: 'သူတို့ ရလဒ်ကို ကျေနပ်ပုံရတယ်။', myanmarTh: 'ดูเหมือนพวกเขาพอใจกับผลลัพธ์', },
      { english: 'I agreed to lend him my notes.', myanmar: 'ငါ့မှတ်စုတွေ ငှားဖို့ သဘောတူခဲ့တယ်။', myanmarTh: 'ผมตกลงให้เขายืมโน้ต', },
      { english: 'The plan proved to be unrealistic.', myanmar: 'အစီအစဉ်က လက်တွေ့မကျဘူးဆိုတာ ထင်ရှားခဲ့တယ်။', myanmarTh: 'แผนพิสูจน์แล้วว่าไม่สมจริง', },
    ],
    drills: [
      { prompt: 'She decided ___ abroad.', answer: 'to study', options: ['to study', 'study', 'studying', 'studied'] },
      { prompt: 'He seems ___ the truth.', answer: 'to know', options: ['to know', 'know', 'knowing', 'known'] },
      { prompt: 'They promised ___ on time.', answer: 'to arrive', options: ['to arrive', 'arrive', 'arriving', 'arrived'] },
    ],
  },
  {
    id: 'f14-g-c2-006',
    level: 'C2',
    title: 'Absolute phrases: Weather permitting, all things considered',
    titleMyanmar: 'Absolute phrase — Weather permitting ...',
    titleMyanmarTh: 'วลีสัมบูรณ์: Weather permitting ...',
    explanationMyanmar:
      'Noun + participle (weather permitting, all things considered, the meeting (being) over, God willing) — ဝါကျတစ်ခုလုံးကို ပြင်ဆင်တယ်၊ သူ့ကိုယ်ပိုင် subject ရှိတယ်။ တရားဝင်အရေးအသားနဲ့ မိန့်ခွန်းတွေမှာ သုံးတယ်။',
    explanationMyanmarTh: 'Absolute phrase: คำนาม + participle (weather permitting all things considered the meeting (being) over God willing) ขยายทั้งประโยคและมีประธานของตัวเอง ใช้ในงานเขียนทางการและสุนทรพจน์',
    examples: [
      { english: 'Weather permitting, we\'ll have the ceremony outdoors.', myanmar: 'ရာသီဥတု သာယာရင် အခမ်းအနားကို အပြင်မှာကျင်းပမယ်။', myanmarTh: 'ถ้าอากาศดี พวกเราจะจัดพิธีข้างนอก', },
      { english: 'All things considered, it was a successful year.', myanmar: 'အားလုံးခြုံငုံ ကြည့်ရင် အောင်မြင်တဲ့နှစ် တစ်နှစ်ပါ။', myanmarTh: 'พิจารณาทุกอย่างแล้ว เป็นปีที่ประสบความสำเร็จ', },
      { english: 'The meeting over, everyone rushed to lunch.', myanmar: 'အစည်းအဝေးပြီးတော့ လူတိုင်း နေ့လည်စာစားဖို့ အလျင်အမြန်သွားကြတယ်။', myanmarTh: 'การประชุมจบ ทุกคนรีบไปกินข้าว', },
      { english: 'His homework done, he went out to play.', myanmar: 'အိမ်စာပြီးတော့ သူအပြင် ကစားဖို့ထွက်သွားတယ်။', myanmarTh: 'การบ้านเสร็จ เขาออกไปเล่น', },
    ],
    drills: [
      { prompt: '___ permitting, we\'ll go hiking.', answer: 'Weather', options: ['Weather', 'Weathers', 'The weather', 'A weather'] },
      { prompt: 'All things ___, the trip was worth it.', answer: 'considered', options: ['considered', 'consider', 'considering', 'considerate'] },
      { prompt: 'The work ___, she took a long rest.', answer: 'finished', options: ['finished', 'finish', 'finishing', 'finishes'] },
    ],
  },
  {
    id: 'f14-g-c2-007',
    level: 'C2',
    title: 'Perfect participle clauses: Having finished, ...',
    titleMyanmar: 'Having + V3 participle clause',
    titleMyanmarTh: 'อนุประโยค perfect participle: Having finished ...',
    explanationMyanmar:
      'Having + past participle — အဓိက clause ထက်စောဖြစ်ခဲ့တဲ့ လုပ်ရပ်ကိုပြတယ်။ Having finished dinner, we went for a walk. Having been delayed (= passive ပုံစံ)။ အနုတ်ဆို Not having + V3။',
    explanationMyanmarTh: 'Having + กริยาช่อง 3 บอกการกระทำที่เกิดก่อนอนุประโยคหลัก: Having finished dinner we went for a walk / Having been delayed (= รูป passive) รูปปฏิเสธคือ Not having + กริยาช่อง 3',
    examples: [
      { english: 'Having saved enough money, they bought a house.', myanmar: 'လုံလောက်တဲ့ငွေ စုမိတော့ သူတို့အိမ်ဝယ်ခဲ့တယ်။', myanmarTh: 'เก็บเงินพอแล้ว พวกเขาซื้อบ้าน', },
      { english: 'Having been bitten by a dog, the child was afraid of animals.', myanmar: 'ခွေးကိုက်ခံရ ဖူးတော့ ကလေး တိရစ္ဆာန်တွေကို ကြောက်တယ်။', myanmarTh: 'โดนหมากัด เด็กเลยกลัวสัตว์', },
      { english: 'Not having studied, he failed the exam.', myanmar: 'မလေ့လာခဲ့တော့ စာမေးပွဲကျခဲ့တယ်။', myanmarTh: 'ไม่ได้เรียน เขาสอบตก', },
      { english: 'Having lived abroad for ten years, she speaks fluent French.', myanmar: 'နိုင်ငံခြားမှာ ဆယ်နှစ်နေခဲ့တော့ သူမ ပြင်သစ်စကားကျွမ်းကျင်တယ်။', myanmarTh: 'อยู่ต่างประเทศสิบปี เธอพูดฝรั่งเศสคล่อง', },
    ],
    drills: [
      { prompt: '___ finished, she left the office.', answer: 'Having', options: ['Having', 'Have', 'Had', 'Has'] },
      { prompt: 'Having ___ robbed twice, he installed cameras.', answer: 'been', options: ['been', 'be', 'being', 'is'] },
      { prompt: 'Not ___ eaten, they were hungry.', answer: 'having', options: ['having', 'have', 'had', 'has'] },
    ],
  },
  {
    id: 'f14-g-c2-008',
    level: 'C2',
    title: 'Advanced discourse markers: notwithstanding, conversely ...',
    titleMyanmar: 'အဆင့်မြင့်ဆက်စပ်စကားလုံးများ — notwithstanding, conversely',
    titleMyanmarTh: 'คำเชื่อมวาทกรรมขั้นสูง: notwithstanding / conversely',
    explanationMyanmar:
      'Notwithstanding (= despite — နာမ်နောက်မှာလည်း ထားလို့ရ: the rain notwithstanding), Conversely (= ဆန့်ကျင်ဘက်အနေနဲ့), Subsequently (= နောက်ပိုင်း), Admittedly (= ဝန်ခံရရင်), Arguably (= ငြင်းလို့ရ)။ ပညာရပ်၊ ဥပဒေ၊ သတင်းအရေးအသားမှာ သုံးတယ်။',
    explanationMyanmarTh: 'Notwithstanding (= despite — วางหลังคำนามก็ได้: the rain notwithstanding) Conversely (= ในทางกลับกัน) Subsequently (= ต่อมา) Admittedly (= ยอมรับว่า) Arguably (= โต้แย้งได้ว่า) ใช้ในงานวิชาการ กฎหมาย และข่าว',
    examples: [
      { english: 'The project succeeded, notwithstanding the budget cuts.', myanmar: 'ဘတ်ဂျက်ဖြတ်တောက်မှုတွေ ရှိပေမဲ့ စီမံကိန်းအောင်မြင်ခဲ့တယ်။', myanmarTh: 'โครงการสำเร็จ แม้งบถูกตัด', },
      { english: 'Admittedly, the first attempt was a failure.', myanmar: 'ဝန်ခံရရင် ပထမကြိုးစားမှုက ကျရှုံးခဲ့တယ်။', myanmarTh: 'ยอมรับว่าครั้งแรกล้มเหลว', },
      { english: 'He was promoted; subsequently, his responsibilities doubled.', myanmar: 'သူ ရာထူးတိုးခဲ့တယ်၊ နောက်ပိုင်းမှာ သူ့တာဝန်တွေ နှစ်ဆဖြစ်သွားတယ်။', myanmarTh: 'เขาได้เลื่อนตำแหน่ง ต่อมาภาระงานเพิ่มเท่าตัว', },
      { english: 'Urban areas grew quickly; conversely, rural towns declined.', myanmar: 'မြို့ပြတွေ လျင်မြန်စွာ ကြီးထွားခဲ့တယ်၊ ဆန့်ကျင်ဘက်အနေနဲ့ ကျေးလက်မြို့တွေ ကျဆင်းခဲ့တယ်။', myanmarTh: 'เมืองเติบโตเร็ว ในทางกลับกันเมืองชนบทถดถอย', },
    ],
    drills: [
      { prompt: '___, the results were disappointing.', answer: 'Admittedly', options: ['Admittedly', 'Admitting', 'Admitted', 'Admit'] },
      { prompt: 'The delay ___, we arrived on time.', answer: 'notwithstanding', options: ['notwithstanding', 'withstanding', 'withstandingly', 'notwithstand'] },
      { prompt: 'She left; ___, he stayed.', answer: 'conversely', options: ['conversely', 'converse', 'conversed', 'conversing'] },
    ],
  },
  {
    id: 'f14-g-c2-009',
    level: 'C2',
    title: 'Advanced academic hedging',
    titleMyanmar: 'ပညာရပ်အရေးအသား hedging အဆင့်မြင့်',
    titleMyanmarTh: 'Hedging เชิงวิชาการขั้นสูง',
    explanationMyanmar:
      'It could be argued that..., There is a tendency to..., To the best of my knowledge, ..., It would appear that..., ...may suggest that... — တိကျမှုလျှော့ပြီး ယဉ်ကျေးစွာပြောတာ။ "This proves" ထက် "This suggests" က ပိုပညာရပ်ဆန်တယ်။ Essay နဲ့ report တွေမှာ မရှိမဖြစ်လိုတယ်။',
    explanationMyanmarTh: 'Hedging เชิงวิชาการ: It could be argued that ... / There is a tendency to ... / To the best of my knowledge ... / It would appear that ... / ... may suggest that ... ลดความเด็ดขาดและพูดอย่างสุภาพ This suggests น่าวิชาการกว่า This proves ใช้ใน essay และ report จำเป็นอย่างยิ่ง',
    examples: [
      { english: 'It could be argued that technology isolates people.', myanmar: 'နည်းပညာက လူတွေကို အထီးကျန်စေတယ်လို့ ဆိုနိုင်တယ်။', myanmarTh: 'อาจโต้แย้งได้ว่าเทคโนโลยีทำให้คนโดดเดี่ยว', },
      { english: 'To the best of my knowledge, no one has solved this problem.', myanmar: 'ငါသိသလောက်တော့ ဒီပြဿနာကို ဘယ်သူမှ မဖြေရှင်းနိုင်သေးဘူး။', myanmarTh: 'เท่าที่ผมรู้ ยังไม่มีใครแก้ปัญหานี้ได้', },
      { english: 'The data would seem to suggest a different conclusion.', myanmar: 'အချက်အလက်တွေက မတူတဲ့နိဂုံးကို ညွှန်းနေပုံရတယ်။', myanmarTh: 'ข้อมูลดูเหมือนชี้ข้อสรุปที่ต่างออกไป', },
      { english: 'There is a tendency for prices to rise in winter.', myanmar: 'ဆောင်းရာသီမှာ ဈေးနှုန်းတွေ တက်တတ်တယ်။', myanmarTh: 'ราคามีแนวโน้มขึ้นในหน้าหนาว', },
    ],
    drills: [
      { prompt: 'It could ___ argued that he is right.', answer: 'be', options: ['be', 'is', 'been', 'being'] },
      { prompt: '___ the best of my knowledge, she\'s innocent.', answer: 'To', options: ['To', 'At', 'In', 'For'] },
      { prompt: 'The results ___ to indicate a trend.', answer: 'seem', options: ['seem', 'seems', 'seeming', 'seemed'] },
    ],
  },
  {
    id: 'f14-g-c2-010',
    level: 'C2',
    title: 'Nominalisation for academic style',
    titleMyanmar: 'Nominalisation — ကြိယာကို နာမ်ပြောင်းပညာရပ်ပုံစံ',
    titleMyanmarTh: 'Nominalisation สำหรับสไตล์วิชาการ',
    explanationMyanmar:
      'Verb/adjective → noun (decide→decision, develop→development, important→importance) — ပညာရပ်အရေးအသားမှာ ကြိယာဝါကျထက် နာမ်စုပိုသုံးတယ်။ "They decided quickly" → "The rapidity of their decision..."။ Of-phrase နဲ့တွဲသုံးလေ့ရှိတယ်။',
    explanationMyanmarTh: 'Nominalisation: กริยา / คำคุณศัพท์ → คำนาม (decide → decision develop → development important → importance) งานเขียนวิชาการนิยมใช้วลีนามมากกว่าใช้กริยา: They decided quickly → The rapidity of their decision ... มักใช้คู่กับวลี of',
    examples: [
      { english: 'The implementation of the policy took two years.', myanmar: 'မူဝါဒ အကောင်အထည်ဖော်ဖို့ နှစ်နှစ်ကြာခဲ့တယ်။', myanmarTh: 'การใช้นโยบายใช้เวลาสองปี', },
      { english: 'His refusal to cooperate surprised everyone.', myanmar: 'ပူးပေါင်းဖို့ ငြင်းတာက လူတိုင်းကို အံ့ဩစေခဲ့တယ်။', myanmarTh: 'การที่เขาปฏิเสธร่วมมือทำให้ทุกคนประหลาดใจ', },
      { english: 'The destruction of the forest alarmed scientists.', myanmar: 'သစ်တောဖျက်ဆီး ခံရတာက သိပ္ပံပညာရှင်တွေကို စိုးရိမ်စေခဲ့တယ်။', myanmarTh: 'การทำลายป่าทำให้นักวิทยาศาสตร์ตื่นตระหนก', },
      { english: 'There was widespread criticism of the decision.', myanmar: 'ဆုံးဖြတ်ချက်ကို ဝေဖန်မှုကျယ်ကျယ် ပြန့်ပြန့်ရှိခဲ့တယ်။', myanmarTh: 'มีการวิจารณ์การตัดสินใจอย่างกว้างขวาง', },
    ],
    drills: [
      { prompt: 'The ___ of the new bridge cost millions.', answer: 'construction', options: ['construction', 'construct', 'constructing', 'constructed'] },
      { prompt: 'His ___ to answer was suspicious.', answer: 'failure', options: ['failure', 'fail', 'failing', 'failed'] },
      { prompt: 'The ___ of the plan impressed the board.', answer: 'simplicity', options: ['simplicity', 'simple', 'simply', 'simplify'] },
    ],
  },
  {
    id: 'f14-g-c2-011',
    level: 'C2',
    title: 'Free indirect style in narrative',
    titleMyanmar: 'Free indirect style — ဇာတ်လမ်းပြောပုံစံ',
    titleMyanmarTh: 'Free indirect style ในการเล่าเรื่อง',
    explanationMyanmar:
      'ဇာတ်လမ်းမှာ ဇာတ်ကောင်အတွေးကို "he said that" မပါဘဲ ပြောတာ။ She looked at the clock. It was already midnight. Why hadn\'t she left earlier? (သူမအတွေးကို တိုက်ရိုက်နီးနီးပြ)။ Past tense + backshift သုံးပေမဲ့ reporting clause မပါဘူး — ဝတ္ထုတွေမှာ အသုံးများတယ်။',
    explanationMyanmarTh: 'Free indirect style: เล่าความคิดตัวละครโดยไม่มี he said that: She looked at the clock. It was already midnight. Why had not she left earlier? (เล่าความคิดเธอแบบใกล้ชิด) ใช้ past tense + backshift แต่ไม่มีอนุประโยครายงาน พบบ่อยในนวนิยาย',
    examples: [
      { english: 'He stared at the letter. What could it mean? Who had sent it?', myanmar: 'သူစာကို စိုက်ကြည့်တယ်။ ဘာကိုဆိုလိုတာလဲ။ ဘယ်သူကပို့တာလဲ။', myanmarTh: 'เขาจ้องจดหมาย มันหมายความว่าอย่างไร ใครส่งมา', },
      { english: 'Tomorrow was the exam. She wasn\'t ready. How would she pass?', myanmar: 'မနက်ဖြန် စာမေးပွဲပဲ။ သူမအဆင်သင့် မဖြစ်ဘူး။ ဘယ်လိုအောင်မှာလဲ။', myanmarTh: 'พรุ่งนี้สอบ เธอยังไม่พร้อม เธอจะสอบผ่านได้อย่างไร', },
      { english: 'The door was open. Had someone broken in?', myanmar: 'တံခါးပွင့်နေတယ်။ တစ်ယောက်ယောက် ဖောက်ဝင်ခဲ့တာလား။', myanmarTh: 'ประตูเปิด มีคนงัดเข้ามาหรือ', },
      { english: 'It was her birthday. Surely they hadn\'t forgotten?', myanmar: 'သူမမွေးနေ့ပဲ။ သူတို့မေ့သွား တာတော့ မဖြစ်နိုင်ဘူး။', myanmarTh: 'วันเกิดเธอ พวกเขาคงไม่ลืมหรอกนะ', },
    ],
    drills: [
      { prompt: 'She checked her wallet. It was ___. Where had the money gone?', answer: 'empty', options: ['empty', 'emptied', 'emptiness', 'emptily'] },
      { prompt: 'He waited for hours. ___ would she ever come?', answer: 'Would', options: ['Would', 'Will', 'Shall', 'May'] },
      { prompt: 'The lights were off. Had everyone ___ already?', answer: 'left', options: ['left', 'leave', 'leaving', 'leaves'] },
    ],
  },
  {
    id: 'f14-g-c2-012',
    level: 'C2',
    title: 'Infinitive of result: only to discover ...',
    titleMyanmar: 'Infinitive of result — only to find ...',
    titleMyanmarTh: 'Infinitive แสดงผล: only to discover ...',
    explanationMyanmar:
      'only + to-infinitive — မျှော်လင့်မထားတဲ့ အဆုံး/ရလဒ်ဆိုးကိုပြတယ်။ He rushed home only to find it empty. "Was to + V1" လည်း ရလဒ်ပြနိုင်တယ် — He was to become famous later (နောက်ပိုင်း နာမည်ကြီးလာခဲ့တယ်)။',
    explanationMyanmarTh: 'only + to-infinitive บอกผลลัพธ์ที่ไม่คาดคิดและมักเป็นเรื่องร้าย: He rushed home only to find it empty / was to + กริยารูปพื้นฐาน ก็บอกผลได้: He was to become famous later (ต่อมาเขากลับมีชื่อเสียง)',
    examples: [
      { english: 'She saved for years only to lose everything in a scam.', myanmar: 'နှစ်ချီစုဆောင်း ခဲ့ပေမဲ့ လိမ်လည်မှုတစ်ခုမှာ အကုန်ဆုံးရှုံးခဲ့ရတယ်။', myanmarTh: 'เธอเก็บเงินหลายปี แต่สุดท้ายเสียหมดในกลโกง', },
      { english: 'He woke early only to discover the flight was cancelled.', myanmar: 'စောစောထခဲ့ပေမဲ့ လေယာဉ်ဖျက်သိမ်း ခံရတာကို တွေ့ခဲ့ရတယ်။', myanmarTh: 'เขาตื่นเช้า แต่สุดท้ายพบว่าเที่ยวบินถูกยกเลิก', },
      { english: 'They married young, only to divorce a year later.', myanmar: 'ငယ်ငယ်က လက်ထပ်ခဲ့ပေမဲ့ တစ်နှစ်အကြာမှာ ကွာရှင်းခဲ့တယ်။', myanmarTh: 'พวกเขาแต่งงานแต่เด็ก แต่หย่ากันปีต่อมา', },
      { english: 'The team trained hard, only to be defeated in the final.', myanmar: 'အသင်းက ကြိုးစားလေ့ကျင့် ခဲ့ပေမဲ့ ဗိုလ်လုပွဲမှာ ရှုံးခဲ့တယ်။', myanmarTh: 'ทีมซ้อมหนัก แต่สุดท้ายแพ้ในรอบชิง', },
    ],
    drills: [
      { prompt: 'He hurried ___ to find no one there.', answer: 'only', options: ['only', 'just', 'merely', 'simply'] },
      { prompt: 'She worked all night only ___ fail the test.', answer: 'to', options: ['to', 'for', 'of', 'at'] },
      { prompt: 'They arrived early only to ___ the doors locked.', answer: 'find', options: ['find', 'found', 'finding', 'to find'] },
    ],
  },
  {
    id: 'f14-g-c2-013',
    level: 'C2',
    title: 'Advanced too/enough: too great a risk to take',
    titleMyanmar: 'too + adjective + a + noun ပုံစံ',
    titleMyanmarTh: 'too / enough ขั้นสูง: too great a risk to take',
    explanationMyanmar:
      'Too + adjective + a/an + noun + to-infinitive: too great a risk to take, too good an opportunity to miss. Adjective + enough + a/an + noun: strange enough a story, brave enough a man. စကားလုံးအစီအစဉ် သတိထား — article က adjective နောက်မှာ။',
    explanationMyanmarTh: 'Too + คำคุณศัพท์ + a / an + คำนาม + to-infinitive: too great a risk to take / too good an opportunity to miss และ คำคุณศัพท์ + enough + a / an + คำนาม: strange enough a story / brave enough a man ระวังลำดับคำ: article อยู่หลังคำคุณศัพท์',
    examples: [
      { english: 'It was too good an offer to refuse.', myanmar: 'ငြင်းဖို့ခက်တဲ့ အရမ်းကောင်းတဲ့ ကမ်းလှမ်းချက်ပါ။', myanmarTh: 'เป็นข้อเสนอที่ดีเกินกว่าจะปฏิเสธ', },
      { english: 'He is too proud a man to admit his mistake.', myanmar: 'သူက အမှားဝန်ခံဖို့ မာနအရမ်းကြီးတဲ့ လူပါ။', myanmarTh: 'เขาเป็นคนหยิ่งเกินกว่าจะยอมรับผิด', },
      { english: 'That\'s a strange enough coincidence to be suspicious.', myanmar: 'သံသယဖြစ်စရာ ထူးဆန်းတဲ့ တိုက်ဆိုင်မှုပါ။', myanmarTh: 'เป็นเรื่องบังเอิญที่แปลกจนน่าสงสัย', },
      { english: 'She was fool enough to believe him.', myanmar: 'သူ့ကို ယုံလောက်အောင် မိုက်မဲခဲ့တယ်။', myanmarTh: 'เธอโง่พอที่จะเชื่อเขา', },
    ],
    drills: [
      { prompt: 'It was too ___ a chance to miss.', answer: 'good', options: ['good', 'well', 'better', 'best'] },
      { prompt: 'He\'s brave ___ to try again.', answer: 'enough', options: ['enough', 'too', 'so', 'very'] },
      { prompt: 'It was too difficult ___ problem to solve quickly.', answer: 'a', options: ['a', 'the', 'an', '—'] },
    ],
  },
  {
    id: 'f14-g-c2-014',
    level: 'C2',
    title: 'Catenative verbs: admit, deny, risk, postpone + gerund',
    titleMyanmar: 'Catenative verbs — gerund ဆက်တိုက်ပုံစံ',
    titleMyanmarTh: 'กริยา catenative: admit / deny / risk + gerund',
    explanationMyanmar:
      'အချို့ကြိယာတွေနောက် gerund ပဲလိုက်တယ်။ Admit, deny, risk, postpone, avoid, enjoy, finish, mind, practise, suggest, consider. "He narrowly avoided being hit" လို passive gerund chain တွေဖြစ်။ "Try doing" vs "try to do" လို အဓိပ္ပာယ်ကွာတာတွေ သတိထား။',
    explanationMyanmarTh: 'Catenative verbs คือกริยาที่ตามด้วย gerund เสมอ: admit deny risk postpone avoid enjoy finish mind practise suggest consider เกิดเป็นลูกโซ่ gerund ได้ เช่น He narrowly avoided being hit (passive gerund) ระวัง try doing กับ try to do ที่ความหมายต่างกัน',
    examples: [
      { english: 'She risked losing everything by investing in the startup.', myanmar: 'စတာ့တပ်မှာ ရင်းနှီးမြှုပ်နှံပြီး အကုန်ဆုံးရှုံးဖို့ စွန့်စားခဲ့တယ်။', myanmarTh: 'เธอเสี่ยงเสียทุกอย่างด้วยการลงทุนในสตาร์ทอัพ', },
      { english: 'They postponed signing the contract until Monday.', myanmar: 'စာချုပ်လက်မှတ်ထိုးတာကို တနင်္လာနေ့ထိ ရွှေ့ဆိုင်းခဲ့တယ်။', myanmarTh: 'พวกเขาเลื่อนเซ็นสัญญาไปวันจันทร์', },
      { english: 'He narrowly avoided being hit by the car.', myanmar: 'ကားတိုက်ခံရဖို့ နည်းနည်းလေး လွဲခဲ့တယ်။', myanmarTh: 'เขาเกือบโดนรถชน', },
      { english: 'Would you mind opening the window?', myanmar: 'ပြတင်းပေါက် ဖွင့်ပေးဖို့ စိတ်မဆိုးဘူးလား။', myanmarTh: 'คุณช่วยเปิดหน้าต่างได้ไหม', },
    ],
    drills: [
      { prompt: 'She denied ___ the keys.', answer: 'taking', options: ['taking', 'to take', 'take', 'taken'] },
      { prompt: 'They considered ___ abroad.', answer: 'moving', options: ['moving', 'to move', 'move', 'moved'] },
      { prompt: 'He finished ___ his essay.', answer: 'writing', options: ['writing', 'to write', 'write', 'written'] },
    ],
  },
  {
    id: 'f14-g-c2-015',
    level: 'C2',
    title: 'Each vs every vs all: subtle differences',
    titleMyanmar: 'each / every / all ကွာခြားချက်အသေးစိတ်',
    titleMyanmarTh: 'ความแตกต่างละเอียด: each / every / all',
    explanationMyanmar:
      'Each (= တစ်ခုချင်း — တစ်ဦးချင်းအာရုံစိုက်): Each student has a book. Every (= အားလုံးခြုံ — every + singular): Every student passed. All (= အားလုံးစုပေါင်း): All students passed. Each of / every one of + plural noun. "Almost every" မှန်တယ်၊ "almost each" မှားတယ်။',
    explanationMyanmarTh: 'Each (= ทีละหนึ่ง — เน้นรายตัว): Each student has a book / Every (= ทั้งหมดโดยรวม): Every student passed (every + เอกพจน์) / All (= ทั้งหมดรวมกัน): All students passed / Each of / every one of + คำนามพหูพจน์ / almost every ถูก แต่ almost each ผิด',
    examples: [
      { english: 'Each of the players received a medal.', myanmar: 'ကစားသမား တစ်ဦးချင်းစီ ဆုတံဆိပ်ရခဲ့တယ်။', myanmarTh: 'นักกีฬาแต่ละคนได้รับเหรียญ', },
      { english: 'Every cloud has a silver lining.', myanmar: 'တိမ်တိုင်းမှာ ငွေရောင်အနားရှိတယ် (ဒုက္ခတိုင်းမှာ ကောင်းကွက်ရှိတယ်)။', myanmarTh: 'ทุกเมฆมีด้านสว่าง', },
      { english: 'All of the food was eaten.', myanmar: 'အစားအစာ အားလုံး စားပြီးသွားတယ်။', myanmarTh: 'อาหารถูกกินหมด', },
      { english: 'The teacher gave each child a sticker.', myanmar: 'ဆရာက ကလေးတစ်ယောက်ချင်းစီကို စတစ်ကာပေးခဲ့တယ်။', myanmarTh: 'ครูให้สติกเกอร์เด็กแต่ละคน', },
    ],
    drills: [
      { prompt: '___ student must bring a pen.', answer: 'Each', options: ['Each', 'Every', 'All', 'Both'] },
      { prompt: '___ of them knows the truth.', answer: 'Every one', options: ['Every one', 'Each', 'All', 'Every'] },
      { prompt: '___ the water has evaporated.', answer: 'All', options: ['All', 'Each', 'Every', 'Both'] },
    ],
  },
  {
    id: 'f14-g-c2-016',
    level: 'C2',
    title: 'Generic reference: the rich, the unemployed',
    titleMyanmar: 'the + adjective — the rich, the poor',
    titleMyanmarTh: 'การอ้างถึงแบบทั่วไป: the rich / the unemployed',
    explanationMyanmar:
      'The + adjective (= လူအုပ်စု): the rich, the poor, the elderly, the unemployed — plural verb လိုက်တယ်။ Bare plural (= အထွေထွေ): Dogs are loyal. The + singular (= မျိုးစိတ်တစ်ခုလုံး — တရားဝင်): The tiger is endangered.',
    explanationMyanmarTh: 'The + คำคุณศัพท์ (= กลุ่มคน): the rich the poor the elderly the unemployed — ใช้กริยาพหูพจน์ / คำนามพหูพจน์เปล่า (= ทั่วไป): Dogs are loyal / The + เอกพจน์ (= ทั้งสปีชีส์ — ทางการ): The tiger is endangered',
    examples: [
      { english: 'The rich should help the poor.', myanmar: 'ချမ်းသာသူတွေက ဆင်းရဲသူတွေကို ကူညီသင့်တယ်။', myanmarTh: 'คนรวยควรช่วยคนจน', },
      { english: 'Tigers are becoming extinct.', myanmar: 'ကျားတွေ မျိုးသုဉ်းလုနီး ဖြစ်နေတယ်။', myanmarTh: 'เสือกำลังสูญพันธุ์', },
      { english: 'The government must protect the vulnerable.', myanmar: 'အစိုးရက ထိခိုက်လွယ်သူတွေကို ကာကွယ်ရမယ်။', myanmarTh: 'รัฐบาลต้องปกป้องผู้เปราะบาง', },
      { english: 'The dodo is extinct.', myanmar: 'ဒိုဒိုငှက်က မျိုးသုဉ်းသွားပြီ။', myanmarTh: 'นกโดโดสูญพันธุ์แล้ว', },
    ],
    drills: [
      { prompt: '___ young should respect the old.', answer: 'The', options: ['The', 'A', 'An', '—'] },
      { prompt: '___ are faithful animals.', answer: 'Dogs', options: ['Dogs', 'The dogs', 'A dog', 'Dog'] },
      { prompt: 'The ___ needs our support.', answer: 'homeless', options: ['homeless', 'homelessness', 'home', 'housing'] },
    ],
  },
  {
    id: 'f14-g-c2-017',
    level: 'C2',
    title: 'Formal articles: a most interesting book',
    titleMyanmar: '"a most ..." တရားဝင်အသုံးနဲ့ zero article',
    titleMyanmarTh: 'Article แบบเป็นทางการ: a most interesting book',
    explanationMyanmar:
      'A + most + adjective (= very — တရားဝင်): a most interesting story. Zero article + abstract noun: Love is blind; Honesty matters. A + ordinal (= နောက်ထပ်): He hired a second assistant. A first / a second = နောက်ထပ်တစ်ခု။',
    explanationMyanmarTh: 'A + most + คำคุณศัพท์ (= very — ทางการ): a most interesting story / คำนามนามธรรมไม่ใส่ article: Love is blind / Honesty matters / A + ลำดับที่ (= อีกหนึ่ง): He hired a second assistant (จ้างผู้ช่วยเพิ่มอีกคน)',
    examples: [
      { english: 'She told us a most amusing story.', myanmar: 'သူမ အရမ်းရယ်စရာ ကောင်းတဲ့ပုံပြင် တစ်ပုဒ်ပြောပြခဲ့တယ်။', myanmarTh: 'เธอเล่าเรื่องตลกมากให้พวกเราฟัง', },
      { english: 'Patience is a virtue.', myanmar: 'စိတ်ရှည်သည်းခံခြင်းက မွန်မြတ်တဲ့ဂုဏ်ပါ။', myanmarTh: 'ความอดทนเป็นคุณธรรม', },
      { english: 'They hired a second assistant.', myanmar: 'သူတို့ လက်ထောက် နောက်တစ်ယောက် ငှားခဲ့တယ်။', myanmarTh: 'พวกเขาจ้างผู้ช่วยเพิ่มอีกคน', },
      { english: 'Knowledge without experience is useless.', myanmar: 'အတွေ့အကြုံ မပါတဲ့အသိပညာက အသုံးမဝင်ဘူး။', myanmarTh: 'ความรู้ไร้ประสบการณ์ก็ไร้ประโยชน์', },
    ],
    drills: [
      { prompt: 'It was ___ most delightful evening.', answer: 'a', options: ['a', 'the', 'an', '—'] },
      { prompt: '___ is the best policy.', answer: 'Honesty', options: ['Honesty', 'The honesty', 'An honesty', 'A honesty'] },
      { prompt: 'He made ___ second attempt.', answer: 'a', options: ['a', 'the', 'an', '—'] },
    ],
  },
  {
    id: 'f14-g-c2-018',
    level: 'C2',
    title: 'Contact clauses: the man I met (omitted relative)',
    titleMyanmar: 'Relative pronoun ဖြုတ်ထားတဲ့ contact clause',
    titleMyanmarTh: 'Contact clause: การละคำสรรพนาม relative',
    explanationMyanmar:
      'Object relative pronoun ကို ဖြုတ်လို့ရတယ်။ The man (whom) I met, the book (that) I bought — "contact clause" လို့ခေါ်တယ်။ Subject relative ကို ဖြုတ်မရဘူး — the man who saw me ("who" ဖြုတ်မရ)။ Preposition + whom လည်း ဖြုတ်မရဘူး။',
    explanationMyanmarTh: 'Contact clause คือการละคำสรรพนาม relative ที่เป็นกรรม: The man (whom) I met / the book (that) I bought ส่วน relative ที่เป็นประธานละไม่ได้: the man who saw me (ละ who ไม่ได้) และบุพบท + whom ก็ละไม่ได้',
    examples: [
      { english: 'The movie we watched last night was brilliant.', myanmar: 'မနေ့က ငါတို့ကြည့်ခဲ့တဲ့ ရုပ်ရှင်က အရမ်းကောင်းတယ်။', myanmarTh: 'หนังที่พวกเราดูเมื่อคืนนี้ยอดเยี่ยม', },
      { english: 'The person you spoke to is my boss.', myanmar: 'မင်းစကားပြောခဲ့တဲ့သူက ငါ့သူဌေးပါ။', myanmarTh: 'คนที่คุณคุยด้วยคือเจ้านายผม', },
      { english: 'Everything she said was true.', myanmar: 'သူမပြောခဲ့သမျှ အမှန်တွေပါ။', myanmarTh: 'ทุกอย่างที่เธอพูดเป็นความจริง', },
      { english: 'The keys I lost have been found.', myanmar: 'ငါပျောက်ခဲ့တဲ့သော့တွေ တွေ့ပြီ။', myanmarTh: 'กุญแจที่ผมทำหายเจอแล้ว', },
    ],
    drills: [
      { prompt: 'The man I met was kind. (The relative pronoun here is ___)', answer: 'omitted', options: ['omitted', 'who', 'which'] },
      { prompt: 'The woman ___ called you is my sister. (subject → cannot omit)', answer: 'who', options: ['who', 'whom', 'that'] },
      { prompt: 'The keys ___ I lost are found. (object → can omit)', answer: 'that', options: ['that', 'who', 'whom'] },
    ],
  },
  {
    id: 'f14-g-c2-019',
    level: 'C2',
    title: 'Negative questions: Don\'t you agree? Haven\'t you finished?',
    titleMyanmar: 'အနုတ်မေးခွန်း — မျှော်လင့်ချက်ပါတဲ့ Don\'t you ...?',
    titleMyanmarTh: 'คำถามปฏิเสธ: Do not you agree?',
    explanationMyanmar:
      'Negative question (= အဖြေမှန်ကို မျှော်လင့်တာ): Don\'t you like it? (= ကြိုက်တယ်လို့ ထင်တယ်)။ Haven\'t you finished yet? (= ပြီးပြီလို့ ထင်တယ်)။ "Aren\'t you...?" = အံ့ဩတာ။ အဖြေပေးတဲ့အခါ Yes/No က အင်္ဂလိပ်ထုံးစံအတိုင်း (Yes = ဟုတ်တယ်/ကြိုက်တယ်)။',
    explanationMyanmarTh: 'คำถามปฏิเสธแฝงความคาดหวัง: Do not you like it? (= นึกว่าชอบ) / Have not you finished yet? (= นึกว่าเสร็จแล้ว) / Are not you ...? = แสดงความประหลาดใจ ตอบ Yes / No ตามธรรมเนียมอังกฤษ (Yes = ใช่ / ชอบ)',
    examples: [
      { english: 'Don\'t you remember me?', myanmar: 'ငါ့ကို မမှတ်မိဘူးလား (မှတ်မိမယ်လို့ ထင်တယ်)။', myanmarTh: 'คุณจำผมไม่ได้หรือ', },
      { english: 'Haven\'t you eaten yet? It\'s already noon!', myanmar: 'မစားရသေးဘူးလား၊ နေ့လယ်ဖြစ်နေပြီ!', myanmarTh: 'คุณยังไม่ได้กินข้าวหรือ เที่ยงแล้วนะ', },
      { english: 'Isn\'t she beautiful in that dress?', myanmar: 'အဲဒီအဝတ်နဲ့ သူမ မလှဘူးလား (လှတယ်လို့ ထင်တယ်)။', myanmarTh: 'เธอสวยในชุดนั้นใช่ไหม', },
      { english: 'Can\'t you hear that noise?', myanmar: 'အဲဒီဆူညံသံ မကြားဘူးလား။', myanmarTh: 'คุณไม่ได้ยินเสียงนั้นหรือ', },
    ],
    drills: [
      { prompt: '___ you coming with us? (surprised)', answer: 'Aren\'t', options: ['Aren\'t', 'Isn\'t', 'Don\'t', 'Won\'t'] },
      { prompt: '___ he told you the news? (expecting yes)', answer: 'Hasn\'t', options: ['Hasn\'t', 'Haven\'t', 'Didn\'t', 'Hadn\'t'] },
      { prompt: 'Don\'t you ___ coffee?', answer: 'like', options: ['like', 'likes', 'liking', 'to like'] },
    ],
  },
  {
    id: 'f14-g-c2-020',
    level: 'C2',
    title: 'Formal relatives: whereby, wherein, whereas',
    titleMyanmar: 'whereby / wherein / whereas တရားဝင်ဆက်စပ်စကား',
    titleMyanmarTh: 'คำ relative แบบเป็นทางการ: whereby / wherein / whereas',
    explanationMyanmar:
      'Whereby (= by which — နည်းလမ်း): the system whereby complaints are handled. Wherein (= in which): the document wherein the terms are listed. Whereas (= ဆန့်ကျင်ဘက် — while): He works hard, whereas his brother is lazy. ဥပဒေ/ပညာရပ် အရေးအသားမှာ သုံးတယ်။',
    explanationMyanmarTh: 'Whereby (= by which — บอกวิธี): the system whereby complaints are handled / Wherein (= in which): the document wherein the terms are listed / Whereas (= ในขณะที่ — แสดงความต่าง): He works hard whereas his brother is lazy ใช้ในงานกฎหมายและวิชาการ',
    examples: [
      { english: 'We need a system whereby complaints are handled fairly.', myanmar: 'တိုင်ကြားမှုတွေကို တရားမျှတစွာ ကိုင်တွယ်တဲ့ စနစ်လိုတယ်။', myanmarTh: 'พวกเราต้องการระบบที่จัดการข้อร้องเรียนอย่างเป็นธรรม', },
      { english: 'He works in finance, whereas his sister is a doctor.', myanmar: 'သူက ဘဏ္ဍာရေးမှာ လုပ်တယ်၊ သူ့ညီမက ဆရာဝန်ပါ။', myanmarTh: 'เขาทำงานการเงิน ส่วนน้องสาวเป็นหมอ', },
      { english: 'The contract, wherein the terms are listed, was signed.', myanmar: 'စည်းကမ်းချက်တွေ ပါတဲ့စာချုပ်ကို လက်မှတ်ထိုးခဲ့တယ်။', myanmarTh: 'สัญญาที่ระบุเงื่อนไขไว้ได้รับการเซ็น', },
      { english: 'This is the process whereby new members are chosen.', myanmar: 'ဒါက အဖွဲ့ဝင် အသစ်တွေ ရွေးချယ်တဲ့ လုပ်ငန်းစဉ်ပါ။', myanmarTh: 'นี่คือกระบวนการคัดเลือกสมาชิกใหม่', },
    ],
    drills: [
      { prompt: 'He is diligent, ___ his brother is lazy.', answer: 'whereas', options: ['whereas', 'whereby', 'wherein', 'where'] },
      { prompt: 'The method ___ we measure success must change.', answer: 'whereby', options: ['whereby', 'whereas', 'wherein', 'where'] },
      { prompt: 'The report, ___ the data is shown, is attached.', answer: 'wherein', options: ['wherein', 'whereby', 'whereas', 'where'] },
    ],
  },
];
