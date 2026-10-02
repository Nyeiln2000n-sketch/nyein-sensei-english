// FASE 14 Ola 1 — verbs batch 1: 100 irregular verbs (A–M)
import type { Verb } from '../../types';

export const verbsBatch1: Verb[] = [
  {
    base: 'arise', past: 'arose', participle: 'arisen', present3s: 'arises', gerund: 'arising',
    my: 'ပေါ်ထွက်လာသည်', th: 'เกิดขึ้น; ปรากฏขึ้น', phonetic: 'uh-RAIZ', cefr: 'A2',
    examples: {
      present: { en: 'Problems arise when we do not plan.', my: 'စီစဉ်မထားရင် ပြဿနာတွေပေါ်လာတယ်။', th: 'ปัญหาจะเกิดขึ้นเมื่อเราไม่วางแผน' },
      past: { en: 'A new idea arose during the meeting.', my: 'အစည်းအဝေးမှာ အတွေးအသစ်တစ်ခုပေါ်ထွက်လာခဲ့တယ်။', th: 'ความคิดใหม่เกิดขึ้นระหว่างการประชุม' },
      future: { en: 'More questions will arise tomorrow.', my: 'မနက်ဖြန် မေးခွန်းတွေပိုထွက်လာမယ်။', th: 'พรุ่งนี้จะมีคำถามเกิดขึ้นอีกมากมาย' },
    },
  },
  {
    base: 'awake', past: 'awoke', participle: 'awoken', present3s: 'awakes', gerund: 'awaking',
    my: 'နိုးကြားသည်', th: 'ตื่นขึ้น', phonetic: 'uh-WAYK', cefr: 'A2',
    examples: {
      present: { en: 'She awakes early every morning.', my: 'သူမ မနက်တိုင်း စောစောနိုးတယ်။', th: 'เธอตื่นเช้าทุกเช้า' },
      past: { en: 'I awoke at six today.', my: 'ကျွန်တော် ဒီနေ့ ခြောက်နာရီမှာနိုးခဲ့တယ်။', th: 'ผมตื่นตอนหกโมงวันนี้' },
      future: { en: 'We will awake before sunrise.', my: 'ငါတို့ နေထွက်ခင်နိုးမယ်။', th: 'พวกเราจะตื่นก่อนพระอาทิตย์ขึ้น' },
    },
  },
  {
    base: 'be', past: 'was/were', participle: 'been', present3s: 'is', gerund: 'being',
    my: 'ဖြစ်သည်', th: 'เป็น; อยู่; คือ', phonetic: 'bee', cefr: 'A1',
    examples: {
      present: { en: 'I am a student.', my: 'ကျွန်တော် ကျောင်းသားတစ်ယောက်ပါ။', th: 'ผมเป็นนักเรียน' },
      past: { en: 'She was tired yesterday.', my: 'သူမ မနေ့က ပင်ပန်းနေခဲ့တယ်။', th: 'เธอเหนื่อยเมื่อวานนี้' },
      future: { en: 'They will be happy.', my: 'သူတို့ ပျော်ရွှင်ကြမယ်။', th: 'พวกเขาจะมีความสุข' },
    },
  },
  {
    base: 'bear', past: 'bore', participle: 'borne', present3s: 'bears', gerund: 'bearing',
    my: 'သယ်ဆောင်သည်', th: 'แบกรับ; อดทน', phonetic: 'bair', cefr: 'A2',
    examples: {
      present: { en: 'Camels bear heavy loads.', my: 'ကုလားအုပ်တွေက ဝန်လေးတွေသယ်တယ်။', th: 'อูฐแบกของหนัก' },
      past: { en: 'He bore the pain bravely.', my: 'သူ နာကျင်မှုကို ရဲရဲဝံ့ဝံ့ခံစားခဲ့တယ်။', th: 'เขาอดทนต่อความเจ็บปวดอย่างกล้าหาญ' },
      future: { en: 'She will bear the responsibility.', my: 'သူမ တာဝန်ကို ထမ်းဆောင်မယ်။', th: 'เธอจะรับผิดชอบหน้าที่นี้' },
    },
  },
  {
    base: 'beget', past: 'begot', participle: 'begotten', present3s: 'begets', gerund: 'begetting',
    my: 'ဖြစ်ပေါ်စေသည်', th: 'ก่อให้เกิด', phonetic: 'bih-GET', cefr: 'A2',
    examples: {
      present: { en: 'Violence begets more violence.', my: 'အကြမ်းဖက်မှုက အကြမ်းဖက်မှုပိုဖြစ်စေတယ်။', th: 'ความรุนแรงก่อให้เกิดความรุนแรงมากขึ้น' },
      past: { en: 'His laziness begot failure.', my: 'သူ့ရဲ့ပျင်းရိမှုက ကျရှုံးမှုဖြစ်စေခဲ့တယ်။', th: 'ความเกียจคร้านของเขาก่อให้เกิดความล้มเหลว' },
      future: { en: 'Kindness will beget kindness.', my: 'ကြင်နာမှုက ကြင်နာမှုဖြစ်စေမယ်။', th: 'ความเมตตาจะก่อให้เกิดความเมตตา' },
    },
  },
  {
    base: 'become', past: 'became', participle: 'become', present3s: 'becomes', gerund: 'becoming',
    my: 'ဖြစ်လာသည်', th: 'กลายเป็น', phonetic: 'bih-KUM', cefr: 'A1',
    examples: {
      present: { en: 'She becomes angry easily.', my: 'သူမ လွယ်လွယ်နဲ့ဒေါသထွက်လာတယ်။', th: 'เธอโกรธง่าย' },
      past: { en: 'He became a doctor in 2020.', my: 'သူ ၂၀၂၀ မှာ ဆရာဝန်ဖြစ်ခဲ့တယ်။', th: 'เขาเป็นหมอในปี 2020' },
      future: { en: 'You will become stronger.', my: 'မင်း ပိုသန်မာလာမယ်။', th: 'คุณจะแข็งแกร่งขึ้น' },
    },
  },
  {
    base: 'begin', past: 'began', participle: 'begun', present3s: 'begins', gerund: 'beginning',
    my: 'စတင်သည်', th: 'เริ่มต้น', phonetic: 'bih-GIN', cefr: 'A1',
    examples: {
      present: { en: 'Class begins at nine.', my: 'အတန်း ကိုးနာရီမှာစတယ်။', th: 'ชั้นเรียนเริ่มตอนเก้าโมง' },
      past: { en: 'We began the project last week.', my: 'ငါတို့ ပြီးခဲ့တဲ့အပတ်က စီမံကိန်းစခဲ့တယ်။', th: 'พวกเราเริ่มโครงการเมื่อสัปดาห์ที่แล้ว' },
      future: { en: 'The show will begin soon.', my: 'ပွဲ မကြာခင်စမယ်။', th: 'การแสดงจะเริ่มในไม่ช้า' },
    },
  },
  {
    base: 'bend', past: 'bent', participle: 'bent', present3s: 'bends', gerund: 'bending',
    my: 'ကွေးညွှတ်သည်', th: 'งอ; โค้ง', phonetic: 'bend', cefr: 'A2',
    examples: {
      present: { en: 'He bends the wire with pliers.', my: 'သူ ဝါယာကြိုးကို ပလာယာနဲ့ကွေးတယ်။', th: 'เขาดัดลวดด้วยคีม' },
      past: { en: 'The tree bent in the storm.', my: 'သစ်ပင်က မုန်တိုင်းထဲမှာ ကိုင်းညွှတ်ခဲ့တယ်။', th: 'ต้นไม้โค้งงอในพายุ' },
      future: { en: 'The road will bend to the left.', my: 'လမ်းက ဘယ်ဘက်ကိုကွေ့သွားမယ်။', th: 'ถนนจะโค้งไปทางซ้าย' },
    },
  },
  {
    base: 'beset', past: 'beset', participle: 'beset', present3s: 'besets', gerund: 'besetting',
    my: 'ဝိုင်းရံဖိစီးသည်', th: 'รุมเร้า', phonetic: 'bih-SET', cefr: 'A2',
    examples: {
      present: { en: 'Doubts beset my mind.', my: 'သံသယတွေက ငါ့စိတ်ကို ဝိုင်းရံဖိစီးနေတယ်။', th: 'ความสงสัยรุมเร้าจิตใจของผม' },
      past: { en: 'Problems beset the team all year.', my: 'ပြဿနာတွေက တစ်နှစ်လုံး အသင်းကို ဖိစီးခဲ့တယ်။', th: 'ปัญหาต่างๆ รุมเร้าทีมตลอดทั้งปี' },
      future: { en: 'Challenges will beset the new project.', my: 'စိန်ခေါ်မှုတွေက စီမံကိန်းအသစ်ကို ဖိစီးမယ်။', th: 'ความท้าทายจะรุมเร้าโครงการใหม่' },
    },
  },
  {
    base: 'bet', past: 'bet', participle: 'bet', present3s: 'bets', gerund: 'betting',
    my: 'အလောင်းအစားပြုသည်', th: 'พนัน', phonetic: 'bet', cefr: 'A2',
    examples: {
      present: { en: 'I bet on the red horse.', my: 'ကျွန်တော် မြင်းနီပေါ် လောင်းတယ်။', th: 'ผมพนันม้าตัวสีแดง' },
      past: { en: 'He bet all his money and lost.', my: 'သူ ပိုက်ဆံအကုန်လုံးလောင်းပြီး ရှုံးခဲ့တယ်။', th: 'เขาพนันเงินทั้งหมดแล้วแพ้' },
      future: { en: 'I will bet that she wins.', my: 'သူမ နိုင်မယ်လို့ ကျွန်တော်လောင်းမယ်။', th: 'ผมจะพนันว่าเธอชนะ' },
    },
  },
  {
    base: 'betake', past: 'betook', participle: 'betaken', present3s: 'betakes', gerund: 'betaking',
    my: 'ခရီးထွက်သွားသည်', th: 'มุ่งหน้าไป', phonetic: 'bih-TAYK', cefr: 'A2',
    examples: {
      present: { en: 'They betake themselves to the hills.', my: 'သူတို့ တောင်ကုန်းတွေဆီ ခရီးထွက်ကြတယ်။', th: 'พวกเขามุ่งหน้าไปยังเนินเขา' },
      past: { en: 'She betook herself to Yangon.', my: 'သူမ ရန်ကုန်ကို ထွက်ခွာသွားခဲ့တယ်။', th: 'เธอมุ่งหน้าไปย่างกุ้ง' },
      future: { en: 'We will betake ourselves to the countryside.', my: 'ငါတို့ ကျေးလက်ကို ထွက်သွားကြမယ်။', th: 'พวกเราจะมุ่งหน้าไปยังชนบท' },
    },
  },
  {
    base: 'bid', past: 'bid', participle: 'bid', present3s: 'bids', gerund: 'bidding',
    my: 'လေလံတင်သည်', th: 'ประมูล; เสนอราคา', phonetic: 'bid', cefr: 'A2',
    examples: {
      present: { en: 'They bid for the old painting.', my: 'သူတို့ ပန်းချီဟောင်းကို လေလံတင်ကြတယ်။', th: 'พวกเขาประมูลภาพวาดเก่า' },
      past: { en: 'She bid twice at the auction.', my: 'သူမ လေလံပွဲမှာ နှစ်ကြိမ်တင်ခဲ့တယ်။', th: 'เธอประมูลสองครั้งในการขายทอดตลาด' },
      future: { en: 'I will bid on that house.', my: 'ကျွန်တော် အဲဒီအိမ်ကို လေလံတင်မယ်။', th: 'ผมจะประมูลบ้านหลังนั้น' },
    },
  },
  {
    base: 'bind', past: 'bound', participle: 'bound', present3s: 'binds', gerund: 'binding',
    my: 'ချည်နှောင်သည်', th: 'ผูกมัด', phonetic: 'bynd', cefr: 'A2',
    examples: {
      present: { en: 'This contract binds both sides.', my: 'ဒီစာချုပ်က နှစ်ဖက်လုံးကို ချည်နှောင်ထားတယ်။', th: 'สัญญานี้ผูกมัดทั้งสองฝ่าย' },
      past: { en: 'They bound the books with string.', my: 'သူတို့ စာအုပ်တွေကို ကြိုးနဲ့ချည်ခဲ့တယ်။', th: 'พวกเขาผูกหนังสือด้วยเชือก' },
      future: { en: 'The promise will bind us together.', my: 'ကတိက ငါတို့ကို ချည်နှောင်ထားမယ်။', th: 'คำสัญญาจะผูกมัดเราไว้ด้วยกัน' },
    },
  },
  {
    base: 'bite', past: 'bit', participle: 'bitten', present3s: 'bites', gerund: 'biting',
    my: 'ကိုက်သည်', th: 'กัด', phonetic: 'byt', cefr: 'A2',
    examples: {
      present: { en: 'This dog bites strangers.', my: 'ဒီခွေးက လူစိမ်းတွေကို ကိုက်တယ်။', th: 'หมาตัวนี้กัดคนแปลกหน้า' },
      past: { en: 'A mosquito bit me last night.', my: 'မနေ့ညက ခြင်ကိုက်ခဲ့တယ်။', th: 'ยุงกัดผมเมื่อคืนนี้' },
      future: { en: 'Be careful, it will bite!', my: 'သတိထား၊ ကိုက်လိမ့်မယ်။', th: 'ระวัง มันจะกัดนะ' },
    },
  },
  {
    base: 'bleed', past: 'bled', participle: 'bled', present3s: 'bleeds', gerund: 'bleeding',
    my: 'သွေးထွက်သည်', th: 'มีเลือดออก', phonetic: 'bleed', cefr: 'A2',
    examples: {
      present: { en: 'His nose bleeds often.', my: 'သူ့နှာခေါင်း မကြာခဏသွေးထွက်တယ်။', th: 'จมูกของเขาเลือดออกบ่อย' },
      past: { en: 'The cut bled a lot.', my: 'အနာက သွေးအများကြီးထွက်ခဲ့တယ်။', th: 'แผลเลือดออกมาก' },
      future: { en: 'Press it or it will bleed more.', my: 'ဖိထား၊ မဟုတ်ရင် ပိုသွေးထွက်မယ်။', th: 'กดไว้ไม่งั้นเลือดจะออกมากขึ้น' },
    },
  },
  {
    base: 'blow', past: 'blew', participle: 'blown', present3s: 'blows', gerund: 'blowing',
    my: 'မှုတ်သည်', th: 'เป่า; พัด', phonetic: 'bloh', cefr: 'A2',
    examples: {
      present: { en: 'The wind blows hard in March.', my: 'မတ်လမှာ လေပြင်းတိုက်တယ်။', th: 'ลมพัดแรงในเดือนมีนาคม' },
      past: { en: 'She blew out the candles.', my: 'သူမ ဖယောင်းတိုင်တွေ မှုတ်ငြှိမ်းခဲ့တယ်။', th: 'เธอเป่าเทียนดับ' },
      future: { en: 'The wind will blow tonight.', my: 'ဒီည လေတိုက်မယ်။', th: 'ลมจะพัดคืนนี้' },
    },
  },
  {
    base: 'break', past: 'broke', participle: 'broken', present3s: 'breaks', gerund: 'breaking',
    my: 'ချိုးဖဲ့သည်', th: 'แตก; หัก; ทำลาย', phonetic: 'brayk', cefr: 'A1',
    examples: {
      present: { en: 'Glass breaks easily.', my: 'ဖန်က လွယ်လွယ်ကွဲတယ်။', th: 'กระจกแตกง่าย' },
      past: { en: 'He broke his arm yesterday.', my: 'သူ မနေ့က လက်ကျိုးခဲ့တယ်။', th: 'เขาแขนหักเมื่อวานนี้' },
      future: { en: 'Do not drop it or it will break.', my: 'မချပစ်နဲ့၊ ကွဲသွားမယ်။', th: 'อย่าทำตกไม่งั้นมันจะแตก' },
    },
  },
  {
    base: 'breed', past: 'bred', participle: 'bred', present3s: 'breeds', gerund: 'breeding',
    my: 'မွေးမြူသည်', th: 'เพาะพันธุ์', phonetic: 'breed', cefr: 'A2',
    examples: {
      present: { en: 'They breed fish in this pond.', my: 'သူတို့ ဒီကန်မှာ ငါးမွေးတယ်။', th: 'พวกเขาเพาะพันธุ์ปลาในบ่อนี้' },
      past: { en: 'He bred dogs for ten years.', my: 'သူ ဆယ်နှစ်ကြာ ခွေးမွေးခဲ့တယ်။', th: 'เขาเพาะพันธุ์สุนัขมาสิบปี' },
      future: { en: 'We will breed chickens next year.', my: 'ငါတို့ နောက်နှစ် ကြက်မွေးမယ်။', th: 'พวกเราจะเพาะพันธุ์ไก่ปีหน้า' },
    },
  },
  {
    base: 'bring', past: 'brought', participle: 'brought', present3s: 'brings', gerund: 'bringing',
    my: 'ယူဆောင်လာသည်', th: 'นำมา', phonetic: 'bring', cefr: 'A1',
    examples: {
      present: { en: 'She brings lunch every day.', my: 'သူမ နေ့တိုင်း နေ့လည်စာယူလာတယ်။', th: 'เธอนำอาหารกลางวันมาทุกวัน' },
      past: { en: 'He brought me a gift.', my: 'သူ ကျွန်တော့်ကို လက်ဆောင်ယူလာခဲ့တယ်။', th: 'เขานำของขวัญมาให้ผม' },
      future: { en: 'Please bring your book tomorrow.', my: 'မနက်ဖြန် မင်းစာအုပ်ယူလာပါ။', th: 'กรุณานำหนังสือมาพรุ่งนี้' },
    },
  },
  {
    base: 'broadcast', past: 'broadcast', participle: 'broadcast', present3s: 'broadcasts', gerund: 'broadcasting',
    my: 'ထုတ်လွှင့်သည်', th: 'ออกอากาศ', phonetic: 'BRAWD-kast', cefr: 'A2',
    examples: {
      present: { en: 'The station broadcasts news hourly.', my: 'ဒီဌာနက နာရီတိုင်း သတင်းထုတ်လွှင့်တယ်။', th: 'สถานีออกอากาศข่าวทุกชั่วโมง' },
      past: { en: 'They broadcast the match live.', my: 'သူတို့ ပွဲကို တိုက်ရိုက်ထုတ်လွှင့်ခဲ့တယ်။', th: 'พวกเขาถ่ายทอดสดการแข่งขัน' },
      future: { en: 'We will broadcast the concert.', my: 'ငါတို့ ဖျော်ဖြေပွဲကို ထုတ်လွှင့်မယ်။', th: 'พวกเราจะออกอากาศคอนเสิร์ต' },
    },
  },
  {
    base: 'build', past: 'built', participle: 'built', present3s: 'builds', gerund: 'building',
    my: 'တည်ဆောက်သည်', th: 'สร้าง', phonetic: 'bild', cefr: 'A1',
    examples: {
      present: { en: 'They build houses in this area.', my: 'သူတို့ ဒီနေရာမှာ အိမ်တွေဆောက်တယ်။', th: 'พวกเขาสร้างบ้านในย่านนี้' },
      past: { en: 'My father built this house.', my: 'ကျွန်တော့်အဖေက ဒီအိမ်ကို ဆောက်ခဲ့တယ်။', th: 'พ่อของผมสร้างบ้านหลังนี้' },
      future: { en: 'We will build a new school.', my: 'ငါတို့ ကျောင်းအသစ်ဆောက်မယ်။', th: 'พวกเราจะสร้างโรงเรียนใหม่' },
    },
  },
  {
    base: 'burn', past: 'burnt', participle: 'burnt', present3s: 'burns', gerund: 'burning',
    my: 'လောင်ကျွမ်းသည်', th: 'เผา; ไหม้', phonetic: 'bern', cefr: 'A2',
    examples: {
      present: { en: 'Wood burns quickly.', my: 'သစ်သားက မြန်မြန်လောင်တယ်။', th: 'ไม้ไหม้เร็ว' },
      past: { en: 'The fire burnt all night.', my: 'မီးက တစ်ညလုံးလောင်ကျွမ်းခဲ့တယ်။', th: 'ไฟไหม้ตลอดคืน' },
      future: { en: 'The sun will burn your skin.', my: 'နေက မင်းအရေပြားကို လောင်စေမယ်။', th: 'แดดจะเผาผิวของคุณ' },
    },
  },
  {
    base: 'burst', past: 'burst', participle: 'burst', present3s: 'bursts', gerund: 'bursting',
    my: 'ပေါက်ကွဲသည်', th: 'แตกออก; ระเบิด', phonetic: 'berst', cefr: 'A2',
    examples: {
      present: { en: 'Balloons burst with a loud pop.', my: 'ပူဖောင်းတွေက အသံကျယ်နဲ့ပေါက်ကွဲတယ်။', th: 'ลูกโป่งแตกเสียงดัง' },
      past: { en: 'The pipe burst last winter.', my: 'ပြီးခဲ့တဲ့ဆောင်းက ပိုက်ပေါက်ကွဲခဲ့တယ်။', th: 'ท่อแตกเมื่อหน้าหนาวที่แล้ว' },
      future: { en: 'Too much pressure will burst it.', my: 'ဖိအားများရင် ပေါက်ကွဲသွားမယ်။', th: 'แรงดันมากเกินไปจะทำให้มันแตก' },
    },
  },
  {
    base: 'buy', past: 'bought', participle: 'bought', present3s: 'buys', gerund: 'buying',
    my: 'ဝယ်ယူသည်', th: 'ซื้อ', phonetic: 'by', cefr: 'A1',
    examples: {
      present: { en: 'She buys fruit at the market.', my: 'သူမ ဈေးမှာ သစ်သီးဝယ်တယ်။', th: 'เธอซื้อผลไม้ที่ตลาด' },
      past: { en: 'I bought a new phone yesterday.', my: 'ကျွန်တော် မနေ့က ဖုန်းအသစ်ဝယ်ခဲ့တယ်။', th: 'ผมซื้อโทรศัพท์ใหม่เมื่อวานนี้' },
      future: { en: 'We will buy a car next year.', my: 'ငါတို့ နောက်နှစ် ကားဝယ်မယ်။', th: 'พวกเราจะซื้อรถปีหน้า' },
    },
  },
  {
    base: 'cast', past: 'cast', participle: 'cast', present3s: 'casts', gerund: 'casting',
    my: 'ပစ်ချသည်', th: 'โยน; ทอด(แห)', phonetic: 'kast', cefr: 'A2',
    examples: {
      present: { en: 'He casts his net into the river.', my: 'သူ မြစ်ထဲကို ပိုက်ချတယ်။', th: 'เขาทอดแหในแม่น้ำ' },
      past: { en: 'She cast a stone into the lake.', my: 'သူမ ရေကန်ထဲကို ကျောက်ခဲပစ်ချခဲ့တယ်။', th: 'เธอโยนก้อนหินลงในทะเลสาบ' },
      future: { en: 'The director will cast new actors.', my: 'ဒါရိုက်တာက သရုပ်ဆောင်အသစ်တွေ ရွေးချယ်မယ်။', th: 'ผู้กำกับจะคัดนักแสดงใหม่' },
    },
  },
  {
    base: 'catch', past: 'caught', participle: 'caught', present3s: 'catches', gerund: 'catching',
    my: 'ဖမ်းမိသည်', th: 'จับ; ติด(หวัด)', phonetic: 'kach', cefr: 'A1',
    examples: {
      present: { en: 'Cats catch mice.', my: 'ကြောင်တွေက ကြွက်ဖမ်းတယ်။', th: 'แมวจับหนู' },
      past: { en: 'I caught the bus just in time.', my: 'ကျွန်တော် ဘတ်စ်ကားကို အချိန်မီဖမ်းမိခဲ့တယ်။', th: 'ผมขึ้นรถเมล์ได้ทันเวลาพอดี' },
      future: { en: 'Hurry or you will catch a cold.', my: 'မြန်မြန်လုပ်၊ မဟုတ်ရင် အအေးမိမယ်။', th: 'รีบหน่อยไม่งั้นคุณจะเป็นหวัด' },
    },
  },
  {
    base: 'choose', past: 'chose', participle: 'chosen', present3s: 'chooses', gerund: 'choosing',
    my: 'ရွေးချယ်သည်', th: 'เลือก', phonetic: 'chooz', cefr: 'A1',
    examples: {
      present: { en: 'She always chooses the blue one.', my: 'သူမ အမြဲ အပြာရောင်ကိုရွေးတယ်။', th: 'เธอเลือกสีฟ้าเสมอ' },
      past: { en: 'They chose me as captain.', my: 'သူတို့ ကျွန်တော့်ကို အသင်းခေါင်းဆောင်ရွေးခဲ့တယ်။', th: 'พวกเขาเลือกผมเป็นกัปตัน' },
      future: { en: 'You will choose your own path.', my: 'မင်း ကိုယ့်လမ်းကိုယ်ရွေးရမယ်။', th: 'คุณจะเลือกเส้นทางของตัวเอง' },
    },
  },
  {
    base: 'cling', past: 'clung', participle: 'clung', present3s: 'clings', gerund: 'clinging',
    my: 'တွယ်ကပ်သည်', th: 'เกาะติด', phonetic: 'kling', cefr: 'A2',
    examples: {
      present: { en: 'The baby clings to her mother.', my: 'ကလေးက အမေ့ကို တွယ်ကပ်နေတယ်။', th: 'ทารกเกาะติดแม่' },
      past: { en: 'He clung to the rope tightly.', my: 'သူ ကြိုးကို တင်းတင်းဆုပ်ကိုင်ခဲ့တယ်။', th: 'เขาจับเชือกแน่น' },
      future: { en: 'She will cling to hope.', my: 'သူမ မျှော်လင့်ချက်ကို ဆုပ်ကိုင်ထားမယ်။', th: 'เธอจะยึดมั่นในความหวัง' },
    },
  },
  {
    base: 'clothe', past: 'clothed', participle: 'clothed', present3s: 'clothes', gerund: 'clothing',
    my: 'အဝတ်ဝတ်ဆင်ပေးသည်', th: 'สวมเสื้อผ้าให้', phonetic: 'klohth', cefr: 'A2',
    examples: {
      present: { en: 'The charity clothes poor children.', my: 'ဒီအဖွဲ့က ဆင်းရဲတဲ့ကလေးတွေကို အဝတ်ပေးဝတ်တယ်။', th: 'มูลนิธิสวมเสื้อผ้าให้เด็กยากจน' },
      past: { en: 'She clothed the baby warmly.', my: 'သူမ ကလေးကို နွေးနွေးထွေးထွေးဝတ်ပေးခဲ့တယ်။', th: 'เธอสวมเสื้อผ้าอุ่นๆ ให้ทารก' },
      future: { en: 'We will clothe the refugees.', my: 'ငါတို့ ဒုက္ခသည်တွေကို အဝတ်ပေးဝတ်မယ်။', th: 'พวกเราจะสวมเสื้อผ้าให้ผู้ลี้ภัย' },
    },
  },
  {
    base: 'come', past: 'came', participle: 'come', present3s: 'comes', gerund: 'coming',
    my: 'လာသည်', th: 'มา', phonetic: 'kum', cefr: 'A1',
    examples: {
      present: { en: 'She comes home at six.', my: 'သူမ ခြောက်နာရီမှာ အိမ်ပြန်လာတယ်။', th: 'เธอกลับบ้านตอนหกโมง' },
      past: { en: 'They came to visit us.', my: 'သူတို့ ငါတို့ကို လာလည်ခဲ့တယ်။', th: 'พวกเขามาเยี่ยมพวกเรา' },
      future: { en: 'I will come tomorrow.', my: 'ကျွန်တော် မနက်ဖြန်လာမယ်။', th: 'ผมจะมาพรุ่งนี้' },
    },
  },
  {
    base: 'cost', past: 'cost', participle: 'cost', present3s: 'costs', gerund: 'costing',
    my: 'ကုန်ကျသည်', th: 'มีราคา; ทำให้เสีย', phonetic: 'kawst', cefr: 'A1',
    examples: {
      present: { en: 'This bag costs fifty dollars.', my: 'ဒီအိတ်က ဒေါ်လာငါးဆယ်ကျတယ်။', th: 'กระเป๋าใบนี้ราคาห้าสิบดอลลาร์' },
      past: { en: 'The repairs cost a fortune.', my: 'ပြုပြင်စရိတ်က အများကြီးကျခဲ့တယ်။', th: 'ค่าซ่อมแพงมาก' },
      future: { en: 'It will cost too much.', my: 'အဲဒါ ဈေးအရမ်းကြီးမယ်။', th: 'มันจะแพงเกินไป' },
    },
  },
  {
    base: 'creep', past: 'crept', participle: 'crept', present3s: 'creeps', gerund: 'creeping',
    my: 'တွားသွားသည်', th: 'คลาน; คืบคลาน', phonetic: 'kreep', cefr: 'A2',
    examples: {
      present: { en: 'The cat creeps toward the bird.', my: 'ကြောင်က ငှက်ဆီကို တွားသွားနေတယ်။', th: 'แมวย่องเข้าหานก' },
      past: { en: 'He crept upstairs quietly.', my: 'သူ အပေါ်ထပ်ကို တိတ်တိတ်လေးတက်ခဲ့တယ်။', th: 'เขาย่องขึ้นบันไดอย่างเงียบๆ' },
      future: { en: 'Fear will creep into your heart.', my: 'ကြောက်စိတ်က မင်းနှလုံးသားထဲ ဝင်လာမယ်။', th: 'ความกลัวจะคืบคลานเข้าสู่หัวใจของคุณ' },
    },
  },
  {
    base: 'cut', past: 'cut', participle: 'cut', present3s: 'cuts', gerund: 'cutting',
    my: 'ဖြတ်တောက်သည်', th: 'ตัด', phonetic: 'kut', cefr: 'A2',
    examples: {
      present: { en: 'She cuts vegetables for dinner.', my: 'သူမ ညစာအတွက် ဟင်းသီးဟင်းရွက်လှီးတယ်။', th: 'เธอหั่นผักสำหรับมื้อเย็น' },
      past: { en: 'He cut his finger yesterday.', my: 'သူ မနေ့က လက်ချောင်းကို လှီးမိခဲ့တယ်။', th: 'เขาบาดนิ้วเมื่อวานนี้' },
      future: { en: 'I will cut the cake.', my: 'ကျွန်တော် ကိတ်မုန့်လှီးမယ်။', th: 'ผมจะตัดเค้ก' },
    },
  },
  {
    base: 'deal', past: 'dealt', participle: 'dealt', present3s: 'deals', gerund: 'dealing',
    my: 'ကိုင်တွယ်ဖြေရှင်းသည်', th: 'จัดการ; แจก(ไพ่)', phonetic: 'deel', cefr: 'A2',
    examples: {
      present: { en: 'She deals with customers politely.', my: 'သူမ ဖောက်သည်တွေကို ယဉ်ယဉ်ကျေးကျေးဆက်ဆံတယ်။', th: 'เธอรับมือลูกค้าอย่างสุภาพ' },
      past: { en: 'We dealt with the problem quickly.', my: 'ငါတို့ ပြဿနာကို မြန်မြန်ဖြေရှင်းခဲ့တယ်။', th: 'พวกเราจัดการปัญหาอย่างรวดเร็ว' },
      future: { en: 'I will deal with it tomorrow.', my: 'ကျွန်တော် မနက်ဖြန် ဖြေရှင်းမယ်။', th: 'ผมจะจัดการเรื่องนี้พรุ่งนี้' },
    },
  },
  {
    base: 'dig', past: 'dug', participle: 'dug', present3s: 'digs', gerund: 'digging',
    my: 'တူးဆွသည်', th: 'ขุด', phonetic: 'dig', cefr: 'A2',
    examples: {
      present: { en: 'They dig wells in the village.', my: 'သူတို့ ရွာမှာ ရေတွင်းတူးတယ်။', th: 'พวกเขาขุดบ่อในหมู่บ้าน' },
      past: { en: 'He dug a hole in the garden.', my: 'သူ ဥယျာဉ်မှာ ကျင်းတူးခဲ့တယ်။', th: 'เขาขุดหลุมในสวน' },
      future: { en: 'We will dig a pond here.', my: 'ငါတို့ ဒီမှာ ကန်တူးမယ်။', th: 'พวกเราจะขุดบ่อตรงนี้' },
    },
  },
  {
    base: 'dive', past: 'dove/dived', participle: 'dived', present3s: 'dives', gerund: 'diving',
    my: 'ငုပ်လျှိုးသည်', th: 'ดำน้ำ', phonetic: 'dyv', cefr: 'A2',
    examples: {
      present: { en: 'He dives into the pool.', my: 'သူ ရေကူးကန်ထဲ ခုန်ချတယ်။', th: 'เขากระโดดลงสระ' },
      past: { en: 'She dove off the cliff.', my: 'သူမ ချောက်ကမ်းပါးကနေ ခုန်ချခဲ့တယ်။', th: 'เธอกระโดดหน้าผา' },
      future: { en: 'They will dive for pearls.', my: 'သူတို့ ပုလဲငုပ်မယ်။', th: 'พวกเขาจะดำน้ำหาไข่มุก' },
    },
  },
  {
    base: 'do', past: 'did', participle: 'done', present3s: 'does', gerund: 'doing',
    my: 'လုပ်ဆောင်သည်', th: 'ทำ', phonetic: 'doo', cefr: 'A1',
    examples: {
      present: { en: 'I do my homework every night.', my: 'ကျွန်တော် ညတိုင်း အိမ်စာလုပ်တယ်။', th: 'ผมทำการบ้านทุกคืน' },
      past: { en: 'She did a great job.', my: 'သူမ အလုပ်ကို အရမ်းကောင်းကောင်းလုပ်ခဲ့တယ်။', th: 'เธอทำงานได้ดีมาก' },
      future: { en: 'We will do our best.', my: 'ငါတို့ အကောင်းဆုံးကြိုးစားမယ်။', th: 'พวกเราจะทำให้ดีที่สุด' },
    },
  },
  {
    base: 'draw', past: 'drew', participle: 'drawn', present3s: 'draws', gerund: 'drawing',
    my: 'ဆွဲသည်', th: 'วาด; ลาก; ดึง', phonetic: 'draw', cefr: 'A1',
    examples: {
      present: { en: 'She draws beautiful pictures.', my: 'သူမ လှပတဲ့ပုံတွေဆွဲတယ်။', th: 'เธอวาดรูปสวย' },
      past: { en: 'He drew a map for us.', my: 'သူ ငါတို့အတွက် မြေပုံဆွဲပေးခဲ့တယ်။', th: 'เขาวาดแผนที่ให้พวกเรา' },
      future: { en: 'I will draw your portrait.', my: 'ကျွန်တော် မင်းပုံတူဆွဲပေးမယ်။', th: 'ผมจะวาดภาพของคุณ' },
    },
  },
  {
    base: 'dream', past: 'dreamt', participle: 'dreamt', present3s: 'dreams', gerund: 'dreaming',
    my: 'အိပ်မက်မက်သည်', th: 'ฝัน', phonetic: 'dreem', cefr: 'A2',
    examples: {
      present: { en: 'I often dream about flying.', my: 'ကျွန်တော် ပျံသန်းတာကို မကြာခဏအိပ်မက်မက်တယ်။', th: 'ผมมักฝันว่าบินได้' },
      past: { en: 'She dreamt of her grandmother.', my: 'သူမ အဖွားကို အိပ်မက်မက်ခဲ့တယ်။', th: 'เธอฝันถึงยาย' },
      future: { en: 'You will dream sweet dreams.', my: 'မင်း အိပ်မက်လှလှမက်မယ်။', th: 'คุณจะฝันดี' },
    },
  },
  {
    base: 'drink', past: 'drank', participle: 'drunk', present3s: 'drinks', gerund: 'drinking',
    my: 'သောက်သည်', th: 'ดื่ม', phonetic: 'dringk', cefr: 'A1',
    examples: {
      present: { en: 'He drinks tea every morning.', my: 'သူ မနက်တိုင်း လက်ဖက်ရည်သောက်တယ်။', th: 'เขาดื่มชาทุกเช้า' },
      past: { en: 'We drank coconut juice at the beach.', my: 'ငါတို့ ကမ်းခြေမှာ အုန်းရည်သောက်ခဲ့တယ်။', th: 'พวกเราดื่มน้ำมะพร้าวที่ชายหาด' },
      future: { en: 'I will drink some water.', my: 'ကျွန်တော် ရေနည်းနည်းသောက်မယ်။', th: 'ผมจะดื่มน้ำสักหน่อย' },
    },
  },
  {
    base: 'drive', past: 'drove', participle: 'driven', present3s: 'drives', gerund: 'driving',
    my: 'မောင်းနှင်သည်', th: 'ขับ(รถ)', phonetic: 'dryv', cefr: 'A1',
    examples: {
      present: { en: 'She drives to work daily.', my: 'သူမ နေ့တိုင်း အလုပ်ကို ကားမောင်းသွားတယ်။', th: 'เธอขับรถไปทำงานทุกวัน' },
      past: { en: 'He drove us to the airport.', my: 'သူ ငါတို့ကို လေဆိပ်လိုက်ပို့ခဲ့တယ်။', th: 'เขาขับรถพาพวกเราไปสนามบิน' },
      future: { en: 'I will drive you home.', my: 'ကျွန်တော် မင်းကို အိမ်လိုက်ပို့မယ်။', th: 'ผมจะขับรถไปส่งคุณที่บ้าน' },
    },
  },
  {
    base: 'dwell', past: 'dwelt', participle: 'dwelt', present3s: 'dwells', gerund: 'dwelling',
    my: 'နေထိုင်သည်', th: 'อาศัยอยู่', phonetic: 'dwel', cefr: 'A2',
    examples: {
      present: { en: 'They dwell in a small hut.', my: 'သူတို့ တဲအိမ်လေးမှာ နေထိုင်ကြတယ်။', th: 'พวกเขาอาศัยในกระท่อมเล็กๆ' },
      past: { en: 'We dwelt in Mandalay for years.', my: 'ငါတို့ မန္တလေးမှာ နှစ်အတော်ကြာနေခဲ့တယ်။', th: 'พวกเราอาศัยในมัณฑะเลย์หลายปี' },
      future: { en: 'She will dwell with her aunt.', my: 'သူမ အဒေါ်နဲ့အတူနေမယ်။', th: 'เธอจะอาศัยกับป้า' },
    },
  },
  {
    base: 'eat', past: 'ate', participle: 'eaten', present3s: 'eats', gerund: 'eating',
    my: 'စားသည်', th: 'กิน', phonetic: 'eet', cefr: 'A1',
    examples: {
      present: { en: 'We eat rice three times a day.', my: 'ငါတို့ တစ်နေ့ သုံးကြိမ် ထမင်းစားတယ်။', th: 'พวกเรากินข้าววันละสามมื้อ' },
      past: { en: 'I ate noodles for lunch.', my: 'ကျွန်တော် နေ့လည်စာကို ခေါက်ဆွဲစားခဲ့တယ်။', th: 'ผมกินก๋วยเตี๋ยวตอนเที่ยง' },
      future: { en: 'They will eat at seven.', my: 'သူတို့ ခုနစ်နာရီမှာ ထမင်းစားမယ်။', th: 'พวกเขาจะกินตอนหนึ่งทุ่ม' },
    },
  },
  {
    base: 'fall', past: 'fell', participle: 'fallen', present3s: 'falls', gerund: 'falling',
    my: 'ကျသည်', th: 'ตก; ล้ม', phonetic: 'fawl', cefr: 'A1',
    examples: {
      present: { en: 'Leaves fall in autumn.', my: 'ဆောင်းဦးမှာ သစ်ရွက်တွေကြွေတယ်။', th: 'ใบไม้ร่วงในฤดูใบไม้ร่วง' },
      past: { en: 'He fell off his bike.', my: 'သူ စက်ဘီးပေါ်က ပြုတ်ကျခဲ့တယ်။', th: 'เขาตกจากจักรยาน' },
      future: { en: 'Be careful or you will fall.', my: 'သတိထား၊ မဟုတ်ရင် ပြုတ်ကျမယ်။', th: 'ระวังไม่งั้นคุณจะล้ม' },
    },
  },
  {
    base: 'feed', past: 'fed', participle: 'fed', present3s: 'feeds', gerund: 'feeding',
    my: 'အစာကျွေးသည်', th: 'ให้อาหาร', phonetic: 'feed', cefr: 'A2',
    examples: {
      present: { en: 'She feeds the chickens daily.', my: 'သူမ နေ့တိုင်း ကြက်တွေကို အစာကျွေးတယ်။', th: 'เธอให้อาหารไก่ทุกวัน' },
      past: { en: 'He fed the baby at noon.', my: 'သူ နေ့လည်က ကလေးကို အစာကျွေးခဲ့တယ်။', th: 'เขาให้อาหารทารกตอนเที่ยง' },
      future: { en: 'I will feed the dog.', my: 'ကျွန်တော် ခွေးကို အစာကျွေးမယ်။', th: 'ผมจะให้อาหารหมา' },
    },
  },
  {
    base: 'feel', past: 'felt', participle: 'felt', present3s: 'feels', gerund: 'feeling',
    my: 'ခံစားရသည်', th: 'รู้สึก', phonetic: 'feel', cefr: 'A1',
    examples: {
      present: { en: 'I feel happy today.', my: 'ကျွန်တော် ဒီနေ့ ပျော်နေတယ်။', th: 'ผมรู้สึกมีความสุขวันนี้' },
      past: { en: 'She felt sick yesterday.', my: 'သူမ မနေ့က နေမကောင်းဖြစ်ခဲ့တယ်။', th: 'เธอรู้สึกไม่สบายเมื่อวานนี้' },
      future: { en: 'You will feel better soon.', my: 'မင်း မကြာခင် သက်သာလာမယ်။', th: 'คุณจะรู้สึกดีขึ้นในไม่ช้า' },
    },
  },
  {
    base: 'fight', past: 'fought', participle: 'fought', present3s: 'fights', gerund: 'fighting',
    my: 'တိုက်ခိုက်သည်', th: 'ต่อสู้', phonetic: 'fyt', cefr: 'A2',
    examples: {
      present: { en: 'They fight for their rights.', my: 'သူတို့ အခွင့်အရေးအတွက် တိုက်ပွဲဝင်ကြတယ်။', th: 'พวกเขาต่อสู้เพื่อสิทธิของตน' },
      past: { en: 'He fought bravely in the war.', my: 'သူ စစ်ပွဲမှာ ရဲရဲဝံ့ဝံ့တိုက်ခိုက်ခဲ့တယ်။', th: 'เขาต่อสู้อย่างกล้าหาญในสงคราม' },
      future: { en: 'We will fight to the end.', my: 'ငါတို့ အဆုံးထိတိုက်မယ်။', th: 'พวกเราจะสู้จนถึงที่สุด' },
    },
  },
  {
    base: 'find', past: 'found', participle: 'found', present3s: 'finds', gerund: 'finding',
    my: 'ရှာတွေ့သည်', th: 'พบ; หาเจอ', phonetic: 'fynd', cefr: 'A1',
    examples: {
      present: { en: 'I cannot find my keys.', my: 'ကျွန်တော် သော့ရှာမတွေ့ဘူး။', th: 'ผมหากุญแจไม่เจอ' },
      past: { en: 'She found a wallet on the street.', my: 'သူမ လမ်းပေါ်မှာ ပိုက်ဆံအိတ်တွေ့ခဲ့တယ်။', th: 'เธอพบกระเป๋าสตางค์บนถนน' },
      future: { en: 'You will find a good job.', my: 'မင်း အလုပ်ကောင်းရလိမ့်မယ်။', th: 'คุณจะได้งานดี' },
    },
  },
  {
    base: 'flee', past: 'fled', participle: 'fled', present3s: 'flees', gerund: 'fleeing',
    my: 'ထွက်ပြေးသည်', th: 'หนี', phonetic: 'flee', cefr: 'A2',
    examples: {
      present: { en: 'People flee from the flood.', my: 'လူတွေ ရေဘေးကနေ ထွက်ပြေးကြတယ်။', th: 'ผู้คนหนีจากน้ำท่วม' },
      past: { en: 'They fled the city at night.', my: 'သူတို့ ညမှာ မြို့ကနေ ထွက်ပြေးခဲ့တယ်။', th: 'พวกเขาหนีออกจากเมืองตอนกลางคืน' },
      future: { en: 'The thief will flee the country.', my: 'သူခိုးက နိုင်ငံကနေ ထွက်ပြေးမယ်။', th: 'ขโมยจะหนีออกนอกประเทศ' },
    },
  },
  {
    base: 'fling', past: 'flung', participle: 'flung', present3s: 'flings', gerund: 'flinging',
    my: 'ပစ်လွှတ်သည်', th: 'ขว้าง', phonetic: 'fling', cefr: 'A2',
    examples: {
      present: { en: 'He flings the ball far.', my: 'သူ ဘောလုံးကို ဝေးဝေးပစ်တယ်။', th: 'เขาขว้างลูกบอลไกล' },
      past: { en: 'She flung the door open.', my: 'သူမ တံခါးကို တွန်းဖွင့်ခဲ့တယ်။', th: 'เธอผลักประตูเปิดออก' },
      future: { en: 'Do not fling your clothes around.', my: 'အဝတ်တွေ ဟိုဒီမပစ်နဲ့။', th: 'อย่าโยนเสื้อผ้าไปทั่ว' },
    },
  },
  {
    base: 'fly', past: 'flew', participle: 'flown', present3s: 'flies', gerund: 'flying',
    my: 'ပျံသန်းသည်', th: 'บิน', phonetic: 'fly', cefr: 'A1',
    examples: {
      present: { en: 'Birds fly south in winter.', my: 'ငှက်တွေ ဆောင်းရာသီမှာ တောင်ဘက်ပျံသွားတယ်။', th: 'นกบินไปทางใต้ในฤดูหนาว' },
      past: { en: 'We flew to Bangkok last month.', my: 'ငါတို့ ပြီးခဲ့တဲ့လက ဘန်ကောက်ကို လေယာဉ်စီးခဲ့တယ်။', th: 'พวกเราบินไปกรุงเทพฯ เดือนที่แล้ว' },
      future: { en: 'I will fly home for New Year.', my: 'ကျွန်တော် နှစ်သစ်ကူးမှာ အိမ်ပြန်လေယာဉ်စီးမယ်။', th: 'ผมจะบินกลับบ้านช่วงปีใหม่' },
    },
  },
  {
    base: 'forbear', past: 'forbore', participle: 'forborne', present3s: 'forbears', gerund: 'forbearing',
    my: 'ရှောင်ကြဉ်သည်', th: 'อดกลั้น', phonetic: 'for-BAIR', cefr: 'A2',
    examples: {
      present: { en: 'She forbears from anger.', my: 'သူမ ဒေါသကို ရှောင်ကြဉ်တယ်။', th: 'เธอละเว้นจากความโกรธ' },
      past: { en: 'He forbore comment on the matter.', my: 'သူ ဒီကိစ္စမှာ မှတ်ချက်မပေးဘဲ ရှောင်ခဲ့တယ်။', th: 'เขาไม่ออกความเห็นในเรื่องนี้' },
      future: { en: 'I will forbear judging them.', my: 'ကျွန်တော် သူတို့ကို ဝေဖန်တာရှောင်မယ်။', th: 'ผมจะไม่ตัดสินพวกเขา' },
    },
  },
  {
    base: 'forbid', past: 'forbade', participle: 'forbidden', present3s: 'forbids', gerund: 'forbidding',
    my: 'တားမြစ်သည်', th: 'ห้าม', phonetic: 'for-BID', cefr: 'A2',
    examples: {
      present: { en: 'The law forbids smoking here.', my: 'ဥပဒေက ဒီမှာ ဆေးလိပ်သောက်တာတားမြစ်ထားတယ်။', th: 'กฎหมายห้ามสูบบุหรี่ที่นี่' },
      past: { en: 'Her parents forbade the trip.', my: 'သူ့မိဘတွေက ခရီးကို တားမြစ်ခဲ့တယ်။', th: 'พ่อแม่ของเธอห้ามไม่ให้ไปเที่ยว' },
      future: { en: 'The doctor will forbid alcohol.', my: 'ဆရာဝန်က အရက်တားမြစ်မယ်။', th: 'หมอจะห้ามดื่มแอลกอฮอล์' },
    },
  },
  {
    base: 'forecast', past: 'forecast', participle: 'forecast', present3s: 'forecasts', gerund: 'forecasting',
    my: 'ကြိုတင်ခန့်မှန်းသည်', th: 'พยากรณ์', phonetic: 'FOR-kast', cefr: 'A2',
    examples: {
      present: { en: 'Experts forecast heavy rain.', my: 'ကျွမ်းကျင်သူတွေက မိုးသည်းမယ်လို့ ခန့်မှန်းတယ်။', th: 'ผู้เชี่ยวชาญพยากรณ์ฝนตกหนัก' },
      past: { en: 'They forecast a storm yesterday.', my: 'သူတို့ မနေ့က မုန်တိုင်းလာမယ်လို့ ခန့်မှန်းခဲ့တယ်။', th: 'พวกเขาพยากรณ์พายุเมื่อวานนี้' },
      future: { en: 'We will forecast the sales.', my: 'ငါတို့ အရောင်းကို ခန့်မှန်းမယ်။', th: 'พวกเราจะพยากรณ์ยอดขาย' },
    },
  },
  {
    base: 'foretell', past: 'foretold', participle: 'foretold', present3s: 'foretells', gerund: 'foretelling',
    my: 'ကြိုဟောကိန်းထုတ်သည်', th: 'ทำนาย', phonetic: 'for-TEL', cefr: 'A2',
    examples: {
      present: { en: 'Dreams foretell the future, they say.', my: 'အိပ်မက်တွေက အနာဂတ်ကို ကြိုဟောတယ်လို့ ဆိုကြတယ်။', th: 'เขาว่ากันว่าความฝันทำนายอนาคต' },
      past: { en: 'He foretold the flood.', my: 'သူ ရေဘေးကို ကြိုဟောခဲ့တယ်။', th: 'เขาทำนายน้ำท่วมไว้' },
      future: { en: 'No one can foretell tomorrow.', my: 'မနက်ဖြန်ကို ဘယ်သူမှ ကြိုဟောနိုင်မှာ မဟုတ်ဘူး။', th: 'ไม่มีใครทำนายพรุ่งนี้ได้' },
    },
  },
  {
    base: 'forget', past: 'forgot', participle: 'forgotten', present3s: 'forgets', gerund: 'forgetting',
    my: 'မေ့လျော့သည်', th: 'ลืม', phonetic: 'for-GET', cefr: 'A1',
    examples: {
      present: { en: 'I always forget his name.', my: 'ကျွန်တော် သူ့နာမည်ကို အမြဲမေ့တယ်။', th: 'ผมลืมชื่อเขาตลอด' },
      past: { en: 'She forgot her umbrella.', my: 'သူမ ထီးမေ့ကျန်ခဲ့တယ်။', th: 'เธอลืมร่ม' },
      future: { en: 'Do not forget to call me.', my: 'ငါ့ကို ဖုန်းဆက်ဖို့ မမေ့နဲ့။', th: 'อย่าลืมโทรหาผมนะ' },
    },
  },
  {
    base: 'forgive', past: 'forgave', participle: 'forgiven', present3s: 'forgives', gerund: 'forgiving',
    my: 'ခွင့်လွှတ်သည်', th: 'ให้อภัย', phonetic: 'for-GIV', cefr: 'A2',
    examples: {
      present: { en: 'I forgive you this time.', my: 'ဒီတစ်ခါ မင်းကို ခွင့်လွှတ်တယ်။', th: 'ผมให้อภัยคุณครั้งนี้' },
      past: { en: 'She forgave him at last.', my: 'သူမ နောက်ဆုံးမှာ သူ့ကို ခွင့်လွှတ်ခဲ့တယ်။', th: 'ในที่สุดเธอก็ให้อภัยเขา' },
      future: { en: 'Time will forgive everything.', my: 'အချိန်က အရာအားလုံးကို ခွင့်လွှတ်မယ်။', th: 'เวลาจะให้อภัยทุกสิ่ง' },
    },
  },
  {
    base: 'forswear', past: 'forswore', participle: 'forsworn', present3s: 'forswears', gerund: 'forswearing',
    my: 'စွန့်လွှတ်ကြောင်းကျိန်ဆိုသည်', th: 'สาบานว่าจะเลิก', phonetic: 'for-SWAIR', cefr: 'A2',
    examples: {
      present: { en: 'He forswears smoking.', my: 'သူ ဆေးလိပ်ဖြတ်မယ်လို့ ကျိန်ဆိုတယ်။', th: 'เขาสาบานว่าจะเลิกสูบบุหรี่' },
      past: { en: 'She forswore her old habits.', my: 'သူမ အကျင့်ဟောင်းတွေကို စွန့်မယ်လို့ ကျိန်ဆိုခဲ့တယ်။', th: 'เธอเลิกนิสัยเก่าๆ' },
      future: { en: 'I will forswear anger.', my: 'ကျွန်တော် ဒေါသကို စွန့်မယ်လို့ ကျိန်ဆိုမယ်။', th: 'ผมจะสาบานว่าจะเลิกโกรธ' },
    },
  },
  {
    base: 'freeze', past: 'froze', participle: 'frozen', present3s: 'freezes', gerund: 'freezing',
    my: 'အေးခဲသည်', th: 'แช่แข็ง', phonetic: 'freez', cefr: 'A2',
    examples: {
      present: { en: 'Water freezes at zero degrees.', my: 'ရေက သုညဒီဂရီမှာ ခဲတယ်။', th: 'น้ำแข็งตัวที่ศูนย์องศา' },
      past: { en: 'The lake froze last winter.', my: 'ပြီးခဲ့တဲ့ဆောင်းက ရေကန်ခဲခဲ့တယ်။', th: 'ทะเลสาบแข็งเมื่อหน้าหนาวที่แล้ว' },
      future: { en: 'It will freeze tonight.', my: 'ဒီည အေးခဲမယ်။', th: 'คืนนี้อากาศจะหนาวจัด' },
    },
  },
  {
    base: 'get', past: 'got', participle: 'got', present3s: 'gets', gerund: 'getting',
    my: 'ရရှိသည်', th: 'ได้รับ; เอา', phonetic: 'get', cefr: 'A1',
    examples: {
      present: { en: 'I get up at six.', my: 'ကျွန်တော် ခြောက်နာရီမှာ ထတယ်။', th: 'ผมตื่นหกโมง' },
      past: { en: 'She got a prize last week.', my: 'သူမ ပြီးခဲ့တဲ့အပတ်က ဆုရခဲ့တယ်။', th: 'เธอได้รางวัลเมื่อสัปดาห์ที่แล้ว' },
      future: { en: 'We will get there on time.', my: 'ငါတို့ အချိန်မီရောက်မယ်။', th: 'พวกเราจะไปถึงตรงเวลา' },
    },
  },
  {
    base: 'give', past: 'gave', participle: 'given', present3s: 'gives', gerund: 'giving',
    my: 'ပေးသည်', th: 'ให้', phonetic: 'giv', cefr: 'A1',
    examples: {
      present: { en: 'He gives me good advice.', my: 'သူ ကျွန်တော့်ကို အကြံဉာဏ်ကောင်းပေးတယ်။', th: 'เขาให้คำแนะนำดีๆ กับผม' },
      past: { en: 'They gave us warm food.', my: 'သူတို့ ငါတို့ကို ပူနွေးတဲ့အစားအစာပေးခဲ့တယ်။', th: 'พวกเขาให้อาหารอุ่นๆ กับพวกเรา' },
      future: { en: 'I will give you an answer soon.', my: 'ကျွန်တော် မကြာခင် မင်းကို အဖြေပေးမယ်။', th: 'ผมจะให้คำตอบคุณในไม่ช้า' },
    },
  },
  {
    base: 'go', past: 'went', participle: 'gone', present3s: 'goes', gerund: 'going',
    my: 'သွားသည်', th: 'ไป', phonetic: 'goh', cefr: 'A1',
    examples: {
      present: { en: 'I go to school every day.', my: 'ကျွန်တော် နေ့တိုင်းကျောင်းသွားတယ်။', th: 'ผมไปโรงเรียนทุกวัน' },
      past: { en: 'She went to Yangon yesterday.', my: 'သူမ မနေ့က ရန်ကုန်သွားခဲ့တယ်။', th: 'เธอไปย่างกุ้งเมื่อวานนี้' },
      future: { en: 'We will go to the beach tomorrow.', my: 'မနက်ဖြန် ငါတို့ ကမ်းခြေသွားမယ်။', th: 'พวกเราจะไปชายหาดพรุ่งนี้' },
    },
  },
  {
    base: 'grind', past: 'ground', participle: 'ground', present3s: 'grinds', gerund: 'grinding',
    my: 'ကြိတ်သည်', th: 'บด', phonetic: 'grynd', cefr: 'A2',
    examples: {
      present: { en: 'She grinds coffee beans fresh.', my: 'သူမ ကော်ဖီစေ့ကို လတ်လတ်ဆတ်ဆတ်ကြိတ်တယ်။', th: 'เธอบดเมล็ดกาแฟสดๆ' },
      past: { en: 'He ground the rice into flour.', my: 'သူ ဆန်ကို ကြိတ်ပြီး ဂျုံမှုန့်လုပ်ခဲ့တယ်။', th: 'เขาบดข้าวเป็นแป้ง' },
      future: { en: 'We will grind the spices.', my: 'ငါတို့ ဟင်းခတ်အမွှေးအကြိုင်ကြိတ်မယ်။', th: 'พวกเราจะบดเครื่องเทศ' },
    },
  },
  {
    base: 'grow', past: 'grew', participle: 'grown', present3s: 'grows', gerund: 'growing',
    my: 'ကြီးထွားသည်', th: 'เติบโต; ปลูก', phonetic: 'groh', cefr: 'A1',
    examples: {
      present: { en: 'Rice grows well here.', my: 'ဒီမှာ စပါးကောင်းကောင်းဖြစ်ထွန်းတယ်။', th: 'ข้าวงอกงามดีที่นี่' },
      past: { en: 'She grew up in Mandalay.', my: 'သူမ မန္တလေးမှာ ကြီးပြင်းခဲ့တယ်။', th: 'เธอเติบโตในมัณฑะเลย์' },
      future: { en: 'Our business will grow fast.', my: 'ငါတို့လုပ်ငန်း မြန်မြန်ကြီးထွားမယ်။', th: 'ธุรกิจของพวกเราจะเติบโตเร็ว' },
    },
  },
  {
    base: 'hang', past: 'hung', participle: 'hung', present3s: 'hangs', gerund: 'hanging',
    my: 'ချိတ်ဆွဲသည်', th: 'แขวน', phonetic: 'hang', cefr: 'A2',
    examples: {
      present: { en: 'She hangs the clothes outside.', my: 'သူမ အဝတ်တွေကို အပြင်မှာ လှန်းတယ်။', th: 'เธอตากผ้าข้างนอก' },
      past: { en: 'He hung the picture on the wall.', my: 'သူ ပုံကို နံရံမှာ ချိတ်ခဲ့တယ်။', th: 'เขาแขวนรูปบนผนัง' },
      future: { en: 'I will hang the lamp here.', my: 'ကျွန်တော် မီးသီးကို ဒီမှာချိတ်မယ်။', th: 'ผมจะแขวนโคมไฟตรงนี้' },
    },
  },
  {
    base: 'have', past: 'had', participle: 'had', present3s: 'has', gerund: 'having',
    my: 'ရှိသည်', th: 'มี', phonetic: 'hav', cefr: 'A1',
    examples: {
      present: { en: 'I have two brothers.', my: 'ကျွန်တော့်မှာ အစ်ကိုနှစ်ယောက်ရှိတယ်။', th: 'ผมมีน้องชายสองคน' },
      past: { en: 'She had a headache yesterday.', my: 'သူမ မနေ့က ခေါင်းကိုက်ခဲ့တယ်။', th: 'เธอปวดหัวเมื่อวานนี้' },
      future: { en: 'We will have dinner together.', my: 'ငါတို့ အတူတူညစာစားမယ်။', th: 'พวกเราจะกินมื้อเย็นด้วยกัน' },
    },
  },
  {
    base: 'hear', past: 'heard', participle: 'heard', present3s: 'hears', gerund: 'hearing',
    my: 'ကြားသည်', th: 'ได้ยิน', phonetic: 'heer', cefr: 'A1',
    examples: {
      present: { en: 'I hear music from next door.', my: 'ကျွန်တော် အိမ်နီးချင်းကနေ သီချင်းသံကြားတယ်။', th: 'ผมได้ยินเสียงเพลงจากข้างบ้าน' },
      past: { en: 'She heard the good news.', my: 'သူမ သတင်းကောင်းကြားခဲ့တယ်။', th: 'เธอได้ยินข่าวดี' },
      future: { en: 'You will hear from me soon.', my: 'မင်း ကျွန်တော့်ဆီက မကြာခင် ကြားရမယ်။', th: 'คุณจะได้ข่าวจากผมในไม่ช้า' },
    },
  },
  {
    base: 'heave', past: 'hove', participle: 'hove', present3s: 'heaves', gerund: 'heaving',
    my: 'အားစိုက်ဆွဲတင်သည်', th: 'ยก; โยน', phonetic: 'heev', cefr: 'A2',
    examples: {
      present: { en: 'The sailors heave the anchor.', my: 'သင်္ဘောသားတွေ ကျောက်ဆူးကို ဆွဲတင်ကြတယ်။', th: 'กะลาสีดึงสมอขึ้น' },
      past: { en: 'They hove the rope with effort.', my: 'သူတို့ ကြိုးကို အားစိုက်ဆွဲခဲ့တယ်။', th: 'พวกเขาดึงเชือกอย่างแรง' },
      future: { en: 'We will heave the boat ashore.', my: 'ငါတို့ လှေကို ကမ်းပေါ်ဆွဲတင်မယ်။', th: 'พวกเราจะลากเรือขึ้นฝั่ง' },
    },
  },
  {
    base: 'hew', past: 'hewed', participle: 'hewn', present3s: 'hews', gerund: 'hewing',
    my: 'ခုတ်ထစ်သည်', th: 'ฟัน; ถาก', phonetic: 'hyoo', cefr: 'A2',
    examples: {
      present: { en: 'He hews wood for the fire.', my: 'သူ မီးအတွက် ထင်းခုတ်တယ်။', th: 'เขาฟืนไม้สำหรับก่อไฟ' },
      past: { en: 'They hewed stone for the temple.', my: 'သူတို့ ဘုရားအတွက် ကျောက်ခုတ်ခဲ့တယ်။', th: 'พวกเขาสกัดหินสำหรับวัด' },
      future: { en: 'I will hew the logs tomorrow.', my: 'ကျွန်တော် မနက်ဖြန် သစ်တုံးတွေခုတ်မယ်။', th: 'ผมจะฟืนท่อนไม้พรุ่งนี้' },
    },
  },
  {
    base: 'hide', past: 'hid', participle: 'hidden', present3s: 'hides', gerund: 'hiding',
    my: 'ပုန်းအောင်းသည်', th: 'ซ่อน', phonetic: 'hyd', cefr: 'A2',
    examples: {
      present: { en: 'The child hides behind the door.', my: 'ကလေးက တံခါးနောက်မှာ ပုန်းနေတယ်။', th: 'เด็กซ่อนหลังประตู' },
      past: { en: 'She hid the letter in a drawer.', my: 'သူမ စာကို အံဆွဲထဲမှာ ဝှက်ခဲ့တယ်။', th: 'เธอซ่อนจดหมายในลิ้นชัก' },
      future: { en: 'The sun will hide behind clouds.', my: 'နေက တိမ်နောက်မှာ ကွယ်သွားမယ်။', th: 'พระอาทิตย์จะซ่อนหลังเมฆ' },
    },
  },
  {
    base: 'hit', past: 'hit', participle: 'hit', present3s: 'hits', gerund: 'hitting',
    my: 'ထိမှန်သည်', th: 'ตี; ชน', phonetic: 'hit', cefr: 'A1',
    examples: {
      present: { en: 'The ball hits the window.', my: 'ဘောလုံးက ပြတင်းပေါက်ကို ထိတယ်။', th: 'ลูกบอลชนหน้าต่าง' },
      past: { en: 'He hit the target.', my: 'သူ ပစ်မှတ်ကို ထိမှန်ခဲ့တယ်။', th: 'เขายิงถูกเป้า' },
      future: { en: 'The storm will hit tonight.', my: 'မုန်တိုင်းက ဒီည ဝင်ရောက်မယ်။', th: 'พายุจะเข้าคืนนี้' },
    },
  },
  {
    base: 'hold', past: 'held', participle: 'held', present3s: 'holds', gerund: 'holding',
    my: 'ကိုင်ထားသည်', th: 'ถือ; จับไว้', phonetic: 'hohld', cefr: 'A1',
    examples: {
      present: { en: 'She holds my hand.', my: 'သူမ ကျွန်တော့်လက်ကို ကိုင်ထားတယ်။', th: 'เธอจับมือผม' },
      past: { en: 'He held the door for me.', my: 'သူ ကျွန်တော့်အတွက် တံခါးဖွင့်ပေးခဲ့တယ်။', th: 'เขาจับประตูให้ผม' },
      future: { en: 'We will hold a meeting.', my: 'ငါတို့ အစည်းအဝေးလုပ်မယ်။', th: 'พวกเราจะจัดการประชุม' },
    },
  },
  {
    base: 'hurt', past: 'hurt', participle: 'hurt', present3s: 'hurts', gerund: 'hurting',
    my: 'နာကျင်စေသည်', th: 'ทำร้าย; เจ็บ', phonetic: 'hert', cefr: 'A2',
    examples: {
      present: { en: 'My leg hurts.', my: 'ကျွန်တော့်ခြေထောက် နာနေတယ်။', th: 'ขาของผมเจ็บ' },
      past: { en: 'The fall hurt his knee.', my: 'ပြုတ်ကျတာက သူ့ဒူးကို နာစေခဲ့တယ်။', th: 'การล้มทำให้เข่าเขาเจ็บ' },
      future: { en: 'Do not worry, it will not hurt.', my: 'စိတ်မပူနဲ့၊ နာမှာ မဟုတ်ဘူး။', th: 'ไม่ต้องห่วง มันจะไม่เจ็บ' },
    },
  },
  {
    base: 'inbreed', past: 'inbred', participle: 'inbred', present3s: 'inbreeds', gerund: 'inbreeding',
    my: 'မျိုးရင်းအချင်းချင်းသားဖောက်သည်', th: 'ผสมพันธุ์ในสายเลือดเดียวกัน', phonetic: 'IN-breed', cefr: 'A2',
    examples: {
      present: { en: 'Some farms inbreed cattle.', my: 'ခြံတချို့က နွားတွေကို မျိုးရင်းသားဖောက်တယ်။', th: 'ฟาร์มบางแห่งผสมพันธุ์วัวในสายเลือดเดียวกัน' },
      past: { en: 'They inbred the dogs for years.', my: 'သူတို့ နှစ်အတော်ကြာ ခွေးတွေကို မျိုးရင်းသားဖောက်ခဲ့တယ်။', th: 'พวกเขาผสมพันธุ์สุนัขในสายเลือดเดียวกันมาหลายปี' },
      future: { en: 'We will not inbreed the stock.', my: 'ငါတို့ တိရစ္ဆာန်တွေကို မျိုးရင်းသားဖောက်မှာ မဟုတ်ဘူး။', th: 'พวกเราจะไม่ผสมพันธุ์ปศุสัตว์ในสายเลือดเดียวกัน' },
    },
  },
  {
    base: 'keep', past: 'kept', participle: 'kept', present3s: 'keeps', gerund: 'keeping',
    my: 'ထားရှိသည်', th: 'เก็บรักษา', phonetic: 'keep', cefr: 'A1',
    examples: {
      present: { en: 'She keeps her room clean.', my: 'သူမ အခန်းကို သန့်သန့်ရှင်းရှင်းထားတယ်။', th: 'เธอรักษาห้องให้สะอาด' },
      past: { en: 'He kept his promise.', my: 'သူ ကတိတည်ခဲ့တယ်။', th: 'เขารักษาสัญญา' },
      future: { en: 'I will keep your secret.', my: 'ကျွန်တော် မင်းလျှို့ဝှက်ချက်ကို ထိန်းသိမ်းမယ်။', th: 'ผมจะเก็บความลับของคุณ' },
    },
  },
  {
    base: 'kneel', past: 'knelt', participle: 'knelt', present3s: 'kneels', gerund: 'kneeling',
    my: 'ဒူးထောက်သည်', th: 'คุกเข่า', phonetic: 'neel', cefr: 'A2',
    examples: {
      present: { en: 'She kneels to pray.', my: 'သူမ ဆုတောင်းဖို့ ဒူးထောက်တယ်။', th: 'เธอคุกเข่าสวดมนต์' },
      past: { en: 'He knelt before the king.', my: 'သူ ဘုရင်ရှေ့မှာ ဒူးထောက်ခဲ့တယ်။', th: 'เขาคุกเข่าต่อหน้ากษัตริย์' },
      future: { en: 'They will kneel in respect.', my: 'သူတို့ လေးစားမှုနဲ့ ဒူးထောက်ကြမယ်။', th: 'พวกเขาจะคุกเข่าแสดงความเคารพ' },
    },
  },
  {
    base: 'knit', past: 'knitted', participle: 'knitted', present3s: 'knits', gerund: 'knitting',
    my: 'ချည်ထိုးသည်', th: 'ถัก', phonetic: 'nit', cefr: 'A2',
    examples: {
      present: { en: 'Grandma knits sweaters.', my: 'အဖွားက ဆွယ်တာချည်ထိုးတယ်။', th: 'คุณยายถักเสื้อกันหนาว' },
      past: { en: 'She knitted a scarf for me.', my: 'သူမ ကျွန်တော့်အတွက် လည်စည်းချည်ထိုးပေးခဲ့တယ်။', th: 'เธอถักผ้าพันคอให้ผม' },
      future: { en: 'I will knit a blanket.', my: 'ကျွန်တော် စောင်ချည်ထိုးမယ်။', th: 'ผมจะถักผ้าห่ม' },
    },
  },
  {
    base: 'know', past: 'knew', participle: 'known', present3s: 'knows', gerund: 'knowing',
    my: 'သိသည်', th: 'รู้', phonetic: 'noh', cefr: 'A1',
    examples: {
      present: { en: 'I know the answer.', my: 'ကျွန်တော် အဖြေသိတယ်။', th: 'ผมรู้คำตอบ' },
      past: { en: 'She knew him well.', my: 'သူမ သူ့ကို ကောင်းကောင်းသိခဲ့တယ်။', th: 'เธอรู้จักเขาดี' },
      future: { en: 'You will know soon.', my: 'မင်း မကြာခင် သိလာမယ်။', th: 'คุณจะรู้ในไม่ช้า' },
    },
  },
  {
    base: 'lay', past: 'laid', participle: 'laid', present3s: 'lays', gerund: 'laying',
    my: 'ချထားသည်', th: 'วาง', phonetic: 'lay', cefr: 'A2',
    examples: {
      present: { en: 'She lays the table for dinner.', my: 'သူမ ညစာအတွက် စားပွဲခင်းတယ်။', th: 'เธอจัดโต๊ะสำหรับมื้อเย็น' },
      past: { en: 'He laid the bricks carefully.', my: 'သူ အုတ်တွေကို ဂရုတစိုက်စီခဲ့တယ်။', th: 'เขาวางอิฐอย่างระมัดระวัง' },
      future: { en: 'They will lay the foundation.', my: 'သူတို့ အခြေခံအုတ်မြစ်ချမယ်။', th: 'พวกเขาจะวางรากฐาน' },
    },
  },
  {
    base: 'lead', past: 'led', participle: 'led', present3s: 'leads', gerund: 'leading',
    my: 'ဦးဆောင်သည်', th: 'นำ', phonetic: 'leed', cefr: 'A2',
    examples: {
      present: { en: 'She leads the team.', my: 'သူမ အသင်းကို ဦးဆောင်တယ်။', th: 'เธอนำทีม' },
      past: { en: 'He led us to safety.', my: 'သူ ငါတို့ကို ဘေးကင်းရာကို ဦးဆောင်ခဲ့တယ်။', th: 'เขานำพวกเราไปสู่ที่ปลอดภัย' },
      future: { en: 'This road will lead you home.', my: 'ဒီလမ်းက မင်းကို အိမ်ရောက်စေမယ်။', th: 'ถนนสายนี้จะพาคุณกลับบ้าน' },
    },
  },
  {
    base: 'leap', past: 'leapt', participle: 'leapt', present3s: 'leaps', gerund: 'leaping',
    my: 'ခုန်သည်', th: 'กระโดด', phonetic: 'leep', cefr: 'A2',
    examples: {
      present: { en: 'The deer leaps over the fence.', my: 'သမင်က ခြံစည်းရိုးကို ခုန်ကျော်တယ်။', th: 'กวางกระโดดข้ามรั้ว' },
      past: { en: 'He leapt across the stream.', my: 'သူ ချောင်းကို ခုန်ကျော်ခဲ့တယ်။', th: 'เขากระโดดข้ามลำธาร' },
      future: { en: 'She will leap at the chance.', my: 'သူမ အခွင့်အရေးကို ခုန်ယူမယ်။', th: 'เธอจะคว้าโอกาสนี้' },
    },
  },
  {
    base: 'learn', past: 'learnt', participle: 'learnt', present3s: 'learns', gerund: 'learning',
    my: 'သင်ယူသည်', th: 'เรียนรู้', phonetic: 'lern', cefr: 'A1',
    examples: {
      present: { en: 'She learns English every day.', my: 'သူမ နေ့တိုင်း အင်္ဂလိပ်စာသင်တယ်။', th: 'เธอเรียนภาษาอังกฤษทุกวัน' },
      past: { en: 'I learnt to swim last summer.', my: 'ကျွန်တော် ပြီးခဲ့တဲ့နွေက ရေကူးသင်ခဲ့တယ်။', th: 'ผมหัดว่ายน้ำเมื่อฤดูร้อนที่แล้ว' },
      future: { en: 'We will learn together.', my: 'ငါတို့ အတူတူသင်ယူကြမယ်။', th: 'พวกเราจะเรียนรู้ไปด้วยกัน' },
    },
  },
  {
    base: 'leave', past: 'left', participle: 'left', present3s: 'leaves', gerund: 'leaving',
    my: 'ထွက်ခွာသည်', th: 'ออกจาก; ทิ้งไว้', phonetic: 'leev', cefr: 'A1',
    examples: {
      present: { en: 'The bus leaves at eight.', my: 'ဘတ်စ်ကား ရှစ်နာရီမှာ ထွက်တယ်။', th: 'รถเมล์ออกตอนแปดโมง' },
      past: { en: 'She left her bag at home.', my: 'သူမ အိတ်ကို အိမ်မှာ ကျန်ခဲ့တယ်။', th: 'เธอลืมกระเป๋าไว้ที่บ้าน' },
      future: { en: 'We will leave early tomorrow.', my: 'ငါတို့ မနက်ဖြန် စောစောထွက်မယ်။', th: 'พวกเราจะออกแต่เช้าพรุ่งนี้' },
    },
  },
  {
    base: 'lend', past: 'lent', participle: 'lent', present3s: 'lends', gerund: 'lending',
    my: 'ချေးငှားသည်', th: 'ให้ยืม', phonetic: 'lend', cefr: 'A1',
    examples: {
      present: { en: 'He lends me his bike.', my: 'သူ ကျွန်တော့်ကို စက်ဘီးချေးတယ်။', th: 'เขาให้ผมยืมจักรยาน' },
      past: { en: 'She lent me fifty dollars.', my: 'သူမ ကျွန်တော့်ကို ဒေါ်လာငါးဆယ်ချေးခဲ့တယ်။', th: 'เธอให้ผมยืมเงินห้าสิบดอลลาร์' },
      future: { en: 'I will lend you my book.', my: 'ကျွန်တော် မင်းကို စာအုပ်ချေးမယ်။', th: 'ผมจะให้คุณยืมหนังสือ' },
    },
  },
  {
    base: 'let', past: 'let', participle: 'let', present3s: 'lets', gerund: 'letting',
    my: 'ခွင့်ပြုသည်', th: 'อนุญาต; ให้เช่า', phonetic: 'let', cefr: 'A1',
    examples: {
      present: { en: 'My parents let me go out.', my: 'ကျွန်တော့်မိဘတွေက အပြင်ထွက်ခွင့်ပေးတယ်။', th: 'พ่อแม่ให้ผมออกไปข้างนอก' },
      past: { en: 'She let me use her phone.', my: 'သူမ ကျွန်တော့်ကို ဖုန်းသုံးခွင့်ပေးခဲ့တယ်။', th: 'เธอให้ผมใช้โทรศัพท์ของเธอ' },
      future: { en: 'I will let you know.', my: 'ကျွန်တော် မင်းကို အကြောင်းကြားမယ်။', th: 'ผมจะบอกให้คุณรู้' },
    },
  },
  {
    base: 'lie', past: 'lay', participle: 'lain', present3s: 'lies', gerund: 'lying',
    my: 'လှဲလျောင်းသည်', th: 'นอนลง; โกหก', phonetic: 'ly', cefr: 'A2',
    examples: {
      present: { en: 'She lies down to rest.', my: 'သူမ အနားယူဖို့ လှဲတယ်။', th: 'เธอนอนลงพักผ่อน' },
      past: { en: 'He lay on the grass.', my: 'သူ မြက်ခင်းပေါ်မှာ လှဲနေခဲ့တယ်။', th: 'เขานอนบนหญ้า' },
      future: { en: 'The cat will lie in the sun.', my: 'ကြောင်က နေပူမှာ လှဲနေမယ်။', th: 'แมวจะนอนอาบแดด' },
    },
  },
  {
    base: 'light', past: 'lit', participle: 'lit', present3s: 'lights', gerund: 'lighting',
    my: 'မီးထွန်းသည်', th: 'จุดไฟ; ส่องสว่าง', phonetic: 'lyt', cefr: 'A1',
    examples: {
      present: { en: 'She lights a candle.', my: 'သူမ ဖယောင်းတိုင်ထွန်းတယ်။', th: 'เธอจุดเทียน' },
      past: { en: 'He lit the fire.', my: 'သူ မီးမွှေးခဲ့တယ်။', th: 'เขาจุดไฟ' },
      future: { en: 'They will light the lamps.', my: 'သူတို့ မီးအိမ်တွေထွန်းမယ်။', th: 'พวกเขาจะจุดตะเกียง' },
    },
  },
  {
    base: 'lose', past: 'lost', participle: 'lost', present3s: 'loses', gerund: 'losing',
    my: 'ဆုံးရှုံးသည်', th: 'ทำหาย; แพ้', phonetic: 'looz', cefr: 'A1',
    examples: {
      present: { en: 'I always lose my pen.', my: 'ကျွန်တော် ဘောပင်အမြဲပျောက်တယ်။', th: 'ผมทำปากกาหายตลอด' },
      past: { en: 'Our team lost the match.', my: 'ငါတို့အသင်း ပွဲရှုံးခဲ့တယ်။', th: 'ทีมของพวกเราแพ้การแข่งขัน' },
      future: { en: 'Do not lose hope.', my: 'မျှော်လင့်ချက်မပျောက်စေနဲ့။', th: 'อย่าสิ้นหวัง' },
    },
  },
  {
    base: 'make', past: 'made', participle: 'made', present3s: 'makes', gerund: 'making',
    my: 'ပြုလုပ်သည်', th: 'ทำ; สร้าง', phonetic: 'mayk', cefr: 'A1',
    examples: {
      present: { en: 'She makes delicious curry.', my: 'သူမ ဟင်းအရသာရှိရှိချက်တယ်။', th: 'เธอทำแกงอร่อย' },
      past: { en: 'He made a chair yesterday.', my: 'သူ မနေ့က ကုလားထိုင်လုပ်ခဲ့တယ်။', th: 'เขาทำเก้าอี้เมื่อวานนี้' },
      future: { en: 'We will make a plan.', my: 'ငါတို့ အစီအစဉ်ဆွဲမယ်။', th: 'พวกเราจะวางแผน' },
    },
  },
  {
    base: 'mean', past: 'meant', participle: 'meant', present3s: 'means', gerund: 'meaning',
    my: 'ဆိုလိုသည်', th: 'หมายความว่า', phonetic: 'meen', cefr: 'A1',
    examples: {
      present: { en: 'What does this word mean?', my: 'ဒီစာလုံးက ဘာကိုဆိုလိုတာလဲ။', th: 'คำนี้หมายความว่าอย่างไร' },
      past: { en: 'I meant no harm.', my: 'ကျွန်တော် ထိခိုက်စေလိုစိတ်မရှိခဲ့ပါဘူး။', th: 'ผมไม่ได้ตั้งใจทำร้าย' },
      future: { en: 'This will mean a lot to her.', my: 'ဒါက သူမအတွက် အရေးကြီးမယ်။', th: 'นี่จะมีความหมายมากสำหรับเธอ' },
    },
  },
  {
    base: 'meet', past: 'met', participle: 'met', present3s: 'meets', gerund: 'meeting',
    my: 'တွေ့ဆုံသည်', th: 'พบ', phonetic: 'meet', cefr: 'A1',
    examples: {
      present: { en: 'We meet every Friday.', my: 'ငါတို့ သောကြာတိုင်း တွေ့ဆုံကြတယ်။', th: 'พวกเราเจอกันทุกวันศุกร์' },
      past: { en: 'I met her at school.', my: 'ကျွန်တော် သူမကို ကျောင်းမှာတွေ့ခဲ့တယ်။', th: 'ผมเจอเธอที่โรงเรียน' },
      future: { en: 'Let us meet at five.', my: 'ငါးနာရီမှာ တွေ့ကြစို့။', th: 'มาเจอกันตอนห้าโมงนะ' },
    },
  },
  {
    base: 'misdeal', past: 'misdealt', participle: 'misdealt', present3s: 'misdeals', gerund: 'misdealing',
    my: 'မှားယွင်းဝေငှသည်', th: 'แจกไพ่ผิด', phonetic: 'mis-DEEL', cefr: 'A2',
    examples: {
      present: { en: 'He often misdeals the cards.', my: 'သူ ဖဲချပ်တွေကို မကြာခဏမှားဝေတယ်။', th: 'เขาแจกไพ่ผิดบ่อย' },
      past: { en: 'She misdealt twice last night.', my: 'သူမ မနေ့ညက နှစ်ကြိမ်မှားဝေခဲ့တယ်။', th: 'เธอแจกไพ่ผิดสองครั้งเมื่อคืนนี้' },
      future: { en: 'I will not misdeal again.', my: 'ကျွန်တော် နောက်တစ်ခါ မှားဝေမှာ မဟုတ်ဘူး။', th: 'ผมจะไม่แจกไพ่ผิดอีก' },
    },
  },
  {
    base: 'misgive', past: 'misgave', participle: 'misgiven', present3s: 'misgives', gerund: 'misgiving',
    my: 'စိုးရိမ်ပူပန်စေသည်', th: 'ทำให้รู้สึกไม่ดี; ทำให้สงสัย', phonetic: 'mis-GIV', cefr: 'A2',
    examples: {
      present: { en: 'My heart misgives me.', my: 'ငါ့နှလုံးသားက စိုးရိမ်နေတယ်။', th: 'ใจของผมรู้สึกไม่ดี' },
      past: { en: 'His silence misgave her.', my: 'သူ့ရဲ့တိတ်ဆိတ်မှုက သူမကို စိုးရိမ်စေခဲ့တယ်။', th: 'ความเงียบของเขาทำให้เธอรู้สึกไม่สบายใจ' },
      future: { en: 'The news will misgive them.', my: 'သတင်းက သူတို့ကို စိုးရိမ်စေမယ်။', th: 'ข่าวจะทำให้พวกเขารู้สึกไม่ดี' },
    },
  },
  {
    base: 'mishit', past: 'mishit', participle: 'mishit', present3s: 'mishits', gerund: 'mishitting',
    my: 'မှားယွင်းရိုက်သည်', th: 'ตีพลาด', phonetic: 'mis-HIT', cefr: 'A2',
    examples: {
      present: { en: 'He sometimes mishits the ball.', my: 'သူ တခါတရံ ဘောလုံးကို မှားရိုက်တယ်။', th: 'บางครั้งเขาตีลูกพลาด' },
      past: { en: 'She mishit the shot.', my: 'သူမ ကန်ချက်ကို မှားရိုက်ခဲ့တယ်။', th: 'เธอตีลูกพลาด' },
      future: { en: 'I will not mishit this time.', my: 'ဒီတစ်ခါ မှားရိုက်မှာ မဟုတ်ဘူး။', th: 'ครั้งนี้ผมจะไม่ตีพลาด' },
    },
  },
  {
    base: 'mislay', past: 'mislaid', participle: 'mislaid', present3s: 'mislays', gerund: 'mislaying',
    my: 'နေရာမှားချထားသည်', th: 'วางผิดที่', phonetic: 'mis-LAY', cefr: 'A2',
    examples: {
      present: { en: 'I often mislay my glasses.', my: 'ကျွန်တော် မျက်မှန်ကို မကြာခဏနေရာမှားချထားမိတယ်။', th: 'ผมวางแว่นผิดที่บ่อย' },
      past: { en: 'He mislaid the keys.', my: 'သူ သော့တွေကို နေရာမှားချခဲ့တယ်။', th: 'เขาวางกุญแจผิดที่' },
      future: { en: 'Keep it safe or you will mislay it.', my: 'ဂရုစိုက်သိမ်း၊ မဟုတ်ရင် ပျောက်သွားမယ်။', th: 'เก็บให้ดีไม่งั้นคุณจะวางผิดที่' },
    },
  },
  {
    base: 'mislead', past: 'misled', participle: 'misled', present3s: 'misleads', gerund: 'misleading',
    my: 'လမ်းမှားညွှန်ပြသည်', th: 'ชักนำให้เข้าใจผิด', phonetic: 'mis-LEED', cefr: 'A2',
    examples: {
      present: { en: 'Ads often mislead buyers.', my: 'ကြော်ငြာတွေက ဝယ်သူတွေကို မကြာခဏလမ်းမှားစေတယ်။', th: 'โฆษณามักชักนำผู้ซื้อให้เข้าใจผิด' },
      past: { en: 'He misled us with false data.', my: 'သူ အချက်အလက်အမှားတွေနဲ့ ငါတို့ကို လမ်းမှားစေခဲ့တယ်။', th: 'เขาหลอกพวกเราด้วยข้อมูลเท็จ' },
      future: { en: 'Do not let rumors mislead you.', my: 'ကောလာဟလတွေက မင်းကို လမ်းမှားမစေနဲ့။', th: 'อย่าปล่อยให้ข่าวลือหลอกคุณ' },
    },
  },
  {
    base: 'misspeak', past: 'misspoke', participle: 'misspoken', present3s: 'misspeaks', gerund: 'misspeaking',
    my: 'မှားယွင်းပြောဆိုသည်', th: 'พูดผิด', phonetic: 'mis-SPEEK', cefr: 'A2',
    examples: {
      present: { en: 'She sometimes misspeaks when nervous.', my: 'သူမ စိတ်လှုပ်ရှားတဲ့အခါ တခါတရံမှားပြောတယ်။', th: 'บางครั้งเธอพูดผิดเวลาประหม่า' },
      past: { en: 'He misspoke during the speech.', my: 'သူ မိန့်ခွန်းမှာ မှားပြောခဲ့တယ်။', th: 'เขาพูดผิดระหว่างกล่าวสุนทรพจน์' },
      future: { en: 'I hope I will not misspeak.', my: 'ကျွန်တော် မှားပြောမှာမဟုတ်ဘူးလို့ မျှော်လင့်တယ်။', th: 'ผมหวังว่าจะไม่พูดผิด' },
    },
  },
  {
    base: 'misspell', past: 'misspelt', participle: 'misspelt', present3s: 'misspells', gerund: 'misspelling',
    my: 'စာလုံးပေါင်းမှားသည်', th: 'สะกดผิด', phonetic: 'mis-SPEL', cefr: 'A2',
    examples: {
      present: { en: 'Students often misspell this word.', my: 'ကျောင်းသားတွေ ဒီစာလုံးကို မကြာခဏပေါင်းမှားတယ်။', th: 'นักเรียนมักสะกดคำนี้ผิด' },
      past: { en: 'I misspelt her name.', my: 'ကျွန်တော် သူ့နာမည်ကို ပေါင်းမှားခဲ့တယ်။', th: 'ผมสะกดชื่อเธอผิด' },
      future: { en: 'Check it or you will misspell it.', my: 'စစ်ကြည့်၊ မဟုတ်ရင် ပေါင်းမှားမယ်။', th: 'ตรวจดูไม่งั้นคุณจะสะกดผิด' },
    },
  },
  {
    base: 'mistake', past: 'mistook', participle: 'mistaken', present3s: 'mistakes', gerund: 'mistaking',
    my: 'မှားယွင်းသည်', th: 'เข้าใจผิด', phonetic: 'mis-TAYK', cefr: 'A2',
    examples: {
      present: { en: 'People mistake him for his twin.', my: 'လူတွေက သူ့ကို အမွှာနဲ့မှားကြတယ်။', th: 'คนจำเขาผิดว่าเป็นฝาแฝด' },
      past: { en: 'I mistook the time.', my: 'ကျွန်တော် အချိန်မှားခဲ့တယ်။', th: 'ผมจำเวลาผิด' },
      future: { en: 'Do not mistake kindness for weakness.', my: 'ကြင်နာမှုကို အားနည်းချက်နဲ့ မမှားစေနဲ့။', th: 'อย่าเข้าใจความเมตตาผิดว่าเป็นความอ่อนแอ' },
    },
  },
  {
    base: 'mow', past: 'mowed', participle: 'mown', present3s: 'mows', gerund: 'mowing',
    my: 'မြက်ရိတ်သည်', th: 'ตัดหญ้า', phonetic: 'moh', cefr: 'A2',
    examples: {
      present: { en: 'He mows the lawn weekly.', my: 'သူ အပတ်တိုင်း မြက်ရိတ်တယ်။', th: 'เขาตัดหญ้าทุกสัปดาห์' },
      past: { en: 'They mowed the field yesterday.', my: 'သူတို့ မနေ့က လယ်ကွင်းမှာ မြက်ရိတ်ခဲ့တယ်။', th: 'พวกเขาตัดหญ้าในทุ่งเมื่อวานนี้' },
      future: { en: 'I will mow the grass tomorrow.', my: 'ကျွန်တော် မနက်ဖြန် မြက်ရိတ်မယ်။', th: 'ผมจะตัดหญ้าพรุ่งนี้' },
    },
  },
];
