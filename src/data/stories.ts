import type { Story } from '../types';

// Graded mini-stories — ပုံပြင်တိုများ (12 stories: 4 x A1, 4 x A2, 4 x B1)
// Each story reuses 3-5 key words from the app vocabulary list (noted above each story).

export const stories: Story[] = [
// key words: cat, pet, cute, milk, happy
{
  id: 'story-a1-1',
  level: 'A1',
  titleEn: 'My Cat Mimi',
  titleMy: 'ငါ့ကြောင် မီမီ',
  titleTh: 'แมวของฉัน มีมี่',
  paragraphs: [
    {
      en: 'I have a cat. Her name is Mimi.',
      my: 'ကျွန်မမှာ ကြောင်တစ်ကောင်ရှိတယ်။ သူ့နာမည်က မီမီပါ။',
      th: 'ฉันมีแมวตัวหนึ่ง เธอชื่อมีมี่',
    },
    {
      en: 'Mimi is white and very cute. She likes milk.',
      my: 'မီမီဟာ အဖြူရောင်လေးနဲ့ အရမ်းချစ်စရာကောင်းတယ်။ သူမ နို့ကို ကြိုက်တယ်။',
      th: 'มีมี่มีขนสีขาวและน่ารักมาก เธอชอบดื่มนม',
    },
    {
      en: 'She sleeps in the morning. She plays in the evening.',
      my: 'သူမက မနက်ပိုင်းမှာ အိပ်တယ်။ ညနေပိုင်းမှာ ဆော့ကစားတယ်။',
      th: 'เธอหลับตอนเช้า และเล่นตอนเย็น',
    },
    {
      en: 'I love my cat. Mimi makes me happy.',
      my: 'ကျွန်မ ငါ့ကြောင်ကို ချစ်တယ်။ မီမီက ကျွန်မကို ပျော်ရွှင်စေတယ်။',
      th: 'ฉันรักแมวของฉัน มีมี่ทำให้ฉันมีความสุข',
    },
  ],
},
// key words: family, father, mother, brother, together, love
{
  id: 'story-a1-2',
  level: 'A1',
  titleEn: 'My Family',
  titleMy: 'ငါ့မိသားစု',
  titleTh: 'ครอบครัวของฉัน',
  paragraphs: [
    {
      en: 'My family is small. There are four people.',
      my: 'ငါ့မိသားစုက သေးတယ်။ လူလေးယောက်ရှိတယ်။',
      th: 'ครอบครัวของฉันเล็ก มีกันสี่คน',
    },
    {
      en: 'My father is a teacher. My mother is a nurse.',
      my: 'ငါ့အဖေက ဆရာတစ်ယောက်ပါ။ ငါ့အမေက သူနာပြုတစ်ယောက်ပါ။',
      th: 'พ่อของฉันเป็นครู แม่ของฉันเป็นพยาบาล',
    },
    {
      en: 'My brother is young. He is ten years old.',
      my: 'ငါ့အစ်ကိုက ငယ်သေးတယ်။ သူ အသက် ဆယ်နှစ်ရှိပြီ။',
      th: 'พี่ชายของฉันยังเด็ก เขาอายุสิบปี',
    },
    {
      en: 'We eat dinner together every night. I love my family.',
      my: 'ကျွန်မတို့ ညတိုင်း ညစာကို အတူတူစားကြတယ်။ ကျွန်မ ငါ့မိသားစုကို ချစ်တယ်။',
      th: 'พวกเรากินข้าวเย็นด้วยกันทุกคืน ฉันรักครอบครัวของฉัน',
    },
  ],
},
// key words: morning, wake up, brush, breakfast, school
{
  id: 'story-a1-3',
  level: 'A1',
  titleEn: 'My Morning Routine',
  titleMy: 'ငါ့မနက်ခင်းလုပ်ရိုးလုပ်စဉ်',
  titleTh: 'กิจวัตรยามเช้าของฉัน',
  paragraphs: [
    {
      en: 'I wake up at six in the morning. I get up fast.',
      my: 'ကျွန်မ မနက် ခြောက်နာရီမှာ အိပ်ရာကနိုးတယ်။ အမြန်ထတယ်။',
      th: 'ฉันตื่นนอนตอนหกโมงเช้า ฉันลุกขึ้นอย่างรวดเร็ว',
    },
    {
      en: 'I wash my face. I brush my teeth.',
      my: 'ကျွန်မ မျက်နှာသစ်တယ်။ သွားတိုက်တယ်။',
      th: 'ฉันล้างหน้า ฉันแปรงฟัน',
    },
    {
      en: 'I eat breakfast with my mother. We eat rice and eggs.',
      my: 'ကျွန်မ အမေနဲ့အတူ မနက်စာစားတယ်။ ကျွန်မတို့ ထမင်းနဲ့ ကြက်ဥစားကြတယ်။',
      th: 'ฉันกินอาหารเช้ากับแม่ พวกเรากินข้าวกับไข่',
    },
    {
      en: 'Then I go to school. I like my morning routine.',
      my: 'ပြီးတော့ ကျွန်မ ကျောင်းသွားတယ်။ ကျွန်မ ငါ့မနက်ခင်းလုပ်ရိုးလုပ်စဉ်ကို ကြိုက်တယ်။',
      th: 'แล้วฉันก็ไปโรงเรียน ฉันชอบกิจวัตรยามเช้าของฉัน',
    },
  ],
},
// key words: market, fresh, fruit, vegetable, buy, cheap
{
  id: 'story-a1-4',
  level: 'A1',
  titleEn: 'A Trip to the Market',
  titleMy: 'ဈေးသွားခြင်း',
  titleTh: 'ไปตลาด',
  paragraphs: [
    {
      en: 'On Sunday I go to the market. The market is near my home.',
      my: 'တနင်္ဂနွေနေ့မှာ ကျွန်မ ဈေးသွားတယ်။ ဈေးက ငါ့အိမ်နားမှာရှိတယ်။',
      th: 'วันอาทิตย์ฉันไปตลาด ตลาดอยู่ใกล้บ้านของฉัน',
    },
    {
      en: 'I buy fresh fruit. I buy apples and bananas.',
      my: 'ကျွန်မ လတ်ဆတ်တဲ့အသီးတွေ ဝယ်တယ်။ ပန်းသီးနဲ့ ငှက်ပျောသီးဝယ်တယ်။',
      th: 'ฉันซื้อผลไม้สด ฉันซื้อแอปเปิลกับกล้วย',
    },
    {
      en: 'I buy green vegetables too. They are cheap today.',
      my: 'အစိမ်းရောင် ဟင်းသီးဟင်းရွက်တွေလည်း ဝယ်တယ်။ ဒီနေ့ သူတို့ ဈေးချိုတယ်။',
      th: 'ฉันซื้อผักสีเขียวด้วย วันนี้ราคาถูก',
    },
    {
      en: 'The vendor is kind. I am happy to go home.',
      my: 'ဈေးသည်က သဘောကောင်းတယ်။ အိမ်ပြန်ရတာ ကျွန်မ ပျော်တယ်။',
      th: 'แม่ค้าใจดี ฉันกลับบ้านอย่างมีความสุข',
    },
  ],
},
// key words: beach, trip, swim, happy, sun
{
  id: 'story-a2-1',
  level: 'A2',
  titleEn: 'A Trip to the Beach',
  titleMy: 'ကမ်းခြေခရီးစဉ်',
  titleTh: 'ทริปเที่ยวชายหาด',
  paragraphs: [
    {
      en: 'Last month my family went to the beach. We took a bus early in the morning.',
      my: 'ပြီးခဲ့တဲ့လက ငါ့မိသားစု ကမ်းခြေကို သွားခဲ့တယ်။ ကျွန်မတို့ မနက်စောစော ဘတ်စ်ကားစီးခဲ့တယ်။',
      th: 'เดือนที่แล้วครอบครัวของฉันไปชายหาด พวกเราขึ้นรถบัสแต่เช้าตรู่',
    },
    {
      en: 'The sun was warm and the water was blue. My brother and I swam all afternoon.',
      my: 'နေက နွေးထွေးပြီး ရေက အပြာရောင်ဖြစ်နေတယ်။ ငါ့အစ်ကိုနဲ့ ကျွန်မ နေ့လည်လုံးလုံး ရေကူးခဲ့ကြတယ်။',
      th: 'แดดอบอุ่นและน้ำทะเลสีฟ้า ฉันกับพี่ชายว่ายน้ำกันทั้งบ่าย',
    },
    {
      en: 'We ate fresh fish at a small shop near the sea. It was very tasty.',
      my: 'ကျွန်မတို့ ပင်လယ်နားက ဆိုင်သေးသေးလေးမှာ လတ်ဆတ်တဲ့ငါးစားခဲ့ကြတယ်။ အရမ်းအရသာရှိတယ်။',
      th: 'พวกเรากินปลาสดที่ร้านเล็ก ๆ ริมทะเล อร่อยมาก',
    },
    {
      en: 'It was the best trip of the year. I will never forget that happy day.',
      my: 'အဲဒါ ဒီနှစ်ရဲ့ အကောင်းဆုံးခရီးစဉ်ဖြစ်ခဲ့တယ်။ အဲဒီပျော်စရာနေ့ကို ကျွန်မ ဘယ်တော့မှ မေ့မှာမဟုတ်ဘူး။',
      th: 'เป็นทริปที่ดีที่สุดของปี ฉันจะไม่มีวันลืมวันแห่งความสุขนั้น',
    },
  ],
},
// key words: phone, lose, friend, help, call
{
  id: 'story-a2-2',
  level: 'A2',
  titleEn: 'The Lost Phone',
  titleMy: 'ပျောက်သွားတဲ့ဖုန်း',
  titleTh: 'โทรศัพท์ที่หายไป',
  paragraphs: [
    {
      en: 'Yesterday I lost my phone at the park. I was very worried.',
      my: 'မနေ့က ကျွန်မ ဖုန်းကို ပန်းခြံမှာ ပျောက်ခဲ့တယ်။ ကျွန်မ အရမ်းစိတ်ပူခဲ့တယ်။',
      th: 'เมื่อวานฉันทำโทรศัพท์หายที่สวนสาธารณะ ฉันกังวลมาก',
    },
    {
      en: 'My friend Aung helped me look for it. We walked around the park twice.',
      my: 'ငါ့သူငယ်ချင်း အောင်က ကျွန်မကို ရှာဖို့ ကူညီခဲ့တယ်။ ကျွန်မတို့ ပန်းခြံပတ်ပတ်လည် နှစ်ပတ်လျှောက်ခဲ့ကြတယ်။',
      th: 'เพื่อนของฉันชื่ออองช่วยฉันหา พวกเราเดินรอบสวนสองรอบ',
    },
    {
      en: 'Then Aung called my number. We heard a sound under the bench.',
      my: 'ပြီးတော့ အောင်က ငါ့ဖုန်းနံပါတ်ကို ခေါ်ခဲ့တယ်။ ခုံအောက်က အသံတစ်ခု ကျွန်မတို့ ကြားခဲ့တယ်။',
      th: 'แล้วอองก็โทรเข้าหมายเลขของฉัน พวกเราได้ยินเสียงดังมาจากใต้ม้านั่ง',
    },
    {
      en: 'My phone was there! I thanked Aung many times. Good friends always help.',
      my: 'ငါ့ဖုန်း အဲဒီမှာရှိနေတယ်။ ကျွန်မ အောင်ကို အကြိမ်ကြိမ် ကျေးဇူးတင်ခဲ့တယ်။ သူငယ်ချင်းကောင်းတွေက အမြဲကူညီကြတယ်။',
      th: 'โทรศัพท์ของฉันอยู่ตรงนั้น! ฉันขอบคุณอองหลายครั้ง เพื่อนที่ดีช่วยเหลือกันเสมอ',
    },
  ],
},
// key words: rain, umbrella, wet, kind, smile
{
  id: 'story-a2-3',
  level: 'A2',
  titleEn: 'The Rainy Day',
  titleMy: 'မိုးရွာတဲ့နေ့',
  titleTh: 'วันที่ฝนตก',
  paragraphs: [
    {
      en: 'It rained hard on my way home from school. I did not have an umbrella.',
      my: 'ကျောင်းကနေ အိမ်ပြန်လမ်းမှာ မိုးသည်းထန်စွာ ရွာခဲ့တယ်။ ကျွန်မမှာ ထီးမပါခဲ့ဘူး။',
      th: 'ฝนตกหนักระหว่างทางกลับบ้านจากโรงเรียน ฉันไม่ได้เอาร่มมา',
    },
    {
      en: 'My clothes were wet and I felt cold. Then an old woman stopped near me.',
      my: 'ငါ့အဝတ်အစားတွေ စိုရွှဲနေပြီး ကျွန်မ ချမ်းနေတယ်။ အဲဒီအခါ အဖွားအိုတစ်ယောက် ကျွန်မနားမှာ ရပ်ခဲ့တယ်။',
      th: 'เสื้อผ้าของฉันเปียกและฉันรู้สึกหนาว แล้วหญิงชราคนหนึ่งก็หยุดอยู่ใกล้ ๆ ฉัน',
    },
    {
      en: 'She shared her big umbrella with me. She walked with me to the bus stop.',
      my: 'သူမက သူ့ထီးကြီးကို ကျွန်မနဲ့ မျှသုံးခဲ့တယ်။ သူမ ကျွန်မနဲ့အတူ ဘတ်စ်ကားမှတ်တိုင်အထိ လျှောက်ခဲ့တယ်။',
      th: 'เธอแบ่งร่มคันใหญ่ให้ฉัน เธอเดินไปกับฉันจนถึงป้ายรถเมล์',
    },
    {
      en: 'I smiled and said thank you. A small kindness can warm a rainy day.',
      my: 'ကျွန်မ ပြုံးပြီး ကျေးဇူးတင်ပါတယ်လို့ ပြောခဲ့တယ်။ ကြင်နာမှုသေးသေးလေးက မိုးရွာတဲ့နေ့ကို နွေးထွေးစေနိုင်တယ်။',
      th: 'ฉันยิ้มแล้วพูดขอบคุณ ความกรุณาเล็ก ๆ สามารถทำให้วันที่ฝนตกอบอุ่นขึ้นได้',
    },
  ],
},
// key words: friend, sick, help, food, visit
{
  id: 'story-a2-4',
  level: 'A2',
  titleEn: 'Helping a Friend',
  titleMy: 'သူငယ်ချင်းကို ကူညီခြင်း',
  titleTh: 'การช่วยเหลือเพื่อน',
  paragraphs: [
    {
      en: 'My best friend May was sick last week. She stayed at home for three days.',
      my: 'ငါ့သူငယ်ချင်းအရင်းဆုံး မေက ပြီးခဲ့တဲ့အပတ်က နေမကောင်းဖြစ်ခဲ့တယ်။ သူမ သုံးရက် အိမ်မှာနေခဲ့ရတယ်။',
      th: 'เพื่อนสนิทของฉันชื่อเมย์ป่วยเมื่อสัปดาห์ที่แล้ว เธออยู่บ้านสามวัน',
    },
    {
      en: 'I visited her after school. I brought soup and some fruit.',
      my: 'ကျွန်မ ကျောင်းပြီးတော့ သူ့ဆီ သွားလည်ခဲ့တယ်။ စွပ်ပြုတ်နဲ့ အသီးအချို့ ယူသွားခဲ့တယ်။',
      th: 'ฉันไปเยี่ยมเธอหลังเลิกเรียน ฉันเอาซุปกับผลไม้ไปฝาก',
    },
    {
      en: 'We talked and laughed together. She said my visit made her feel better.',
      my: 'ကျွန်မတို့ စကားပြောပြီး အတူတူရယ်ခဲ့ကြတယ်။ ကျွန်မလာလည်တာက သူ့ကို သက်သာစေတယ်လို့ သူမပြောခဲ့တယ်။',
      th: 'พวกเราคุยกันและหัวเราะด้วยกัน เธอบอกว่าการมาเยี่ยมของฉันทำให้เธอรู้สึกดีขึ้น',
    },
    {
      en: 'Now May is healthy again. Helping a friend is the best feeling in the world.',
      my: 'အခု မေ ကျန်းမာလာပြီ။ သူငယ်ချင်းကို ကူညီရတာက ကမ္ဘာပေါ်မှာ အကောင်းဆုံးခံစားချက်ပဲ။',
      th: 'ตอนนี้เมย์หายดีแล้ว การช่วยเหลือเพื่อนคือความรู้สึกที่ดีที่สุดในโลก',
    },
  ],
},
// key words: job, interview, nervous, confident, question
{
  id: 'story-b1-1',
  level: 'B1',
  titleEn: 'My First Job Interview',
  titleMy: 'ငါ့ပထမဆုံး အလုပ်အင်တာဗျူး',
  titleTh: 'การสัมภาษณ์งานครั้งแรกของฉัน',
  paragraphs: [
    {
      en: 'Last year I had my first job interview at a small company. I was very nervous that morning.',
      my: 'ပြီးခဲ့တဲ့နှစ်က ကုမ္ပဏီသေးသေးလေးတစ်ခုမှာ ငါ့ပထမဆုံး အလုပ်အင်တာဗျူးရှိခဲ့တယ်။ အဲဒီမနက်က ကျွန်မ အရမ်းရင်ခုန်နေခဲ့တယ်။',
      th: 'ปีที่แล้วฉันมีสัมภาษณ์งานครั้งแรกที่บริษัทเล็กแห่งหนึ่ง เช้าวันนั้นฉันตื่นเต้นมาก',
    },
    {
      en: 'The manager asked me many questions about my skills and my plans. I answered slowly but honestly.',
      my: 'မန်နေဂျာက ငါ့ကျွမ်းကျင်မှုတွေနဲ့ ငါ့အစီအစဉ်တွေအကြောင်း မေးခွန်းအများကြီး မေးခဲ့တယ်။ ကျွန်မ နှေးနှေးပဲ ဖြေခဲ့ပေမယ့် ရိုးရိုးသားသား ဖြေခဲ့တယ်။',
      th: 'ผู้จัดการถามฉันหลายคำถามเกี่ยวกับทักษะและแผนของฉัน ฉันตอบช้า ๆ แต่ตอบอย่างซื่อสัตย์',
    },
    {
      en: 'When I did not know an answer, I said so. The manager smiled and said honesty is important.',
      my: 'အဖြေမသိတဲ့အခါ မသိဘူးလို့ ပြောခဲ့တယ်။ မန်နေဂျာက ပြုံးပြီး ရိုးသားမှုက အရေးကြီးတယ်လို့ ပြောခဲ့တယ်။',
      th: 'เมื่อฉันไม่รู้คำตอบ ฉันก็บอกตรง ๆ ผู้จัดการยิ้มแล้วบอกว่าความซื่อสัตย์สำคัญ',
    },
    {
      en: 'Two days later they called me. I got the job. Being confident and honest really works.',
      my: 'နှစ်ရက်အကြာမှာ သူတို့ ကျွန်မကို ဖုန်းခေါ်ခဲ့တယ်။ ကျွန်မ အလုပ်ရခဲ့တယ်။ ယုံကြည်မှုရှိပြီး ရိုးသားတာက တကယ်အလုပ်ဖြစ်တယ်။',
      th: 'สองวันต่อมาพวกเขาโทรหาฉัน ฉันได้งาน ความมั่นใจและความซื่อสัตย์ได้ผลจริง',
    },
    {
      en: 'That interview taught me a lesson: preparation is good, but sincerity wins hearts.',
      my: 'အဲဒီအင်တာဗျူးက ကျွန်မကို သင်ခန်းစာတစ်ခုပေးခဲ့တယ်။ ကြိုတင်ပြင်ဆင်တာက ကောင်းပေမယ့် စိတ်ရင်းမှန်တာက လူတွေရဲ့နှလုံးသားကို အနိုင်ရတယ်။',
      th: 'การสัมภาษณ์ครั้งนั้นสอนบทเรียนให้ฉันว่า การเตรียมตัวนั้นดี แต่ความจริงใจชนะใจคน',
    },
  ],
},
// key words: decision, job, city, family, brave
{
  id: 'story-b1-2',
  level: 'B1',
  titleEn: 'A Difficult Decision',
  titleMy: 'ခက်ခဲတဲ့ ဆုံးဖြတ်ချက်တစ်ခု',
  titleTh: 'การตัดสินใจที่ยากลำบาก',
  paragraphs: [
    {
      en: 'Two years ago I received two job offers at the same time. One was in my city, near my family.',
      my: 'နှစ်နှစ်အကြာက ကျွန်မ အလုပ်ကမ်းလှမ်းချက် နှစ်ခု တစ်ချိန်တည်းမှာ ရခဲ့တယ်။ တစ်ခုက ငါ့မြို့မှာ၊ ငါ့မိသားစုနားမှာ။',
      th: 'สองปีก่อนฉันได้รับข้อเสนองานสองที่ในเวลาเดียวกัน ที่หนึ่งอยู่ในเมืองของฉัน ใกล้ครอบครัว',
    },
    {
      en: 'The other was in a big city far away, with a higher salary but longer hours.',
      my: 'နောက်တစ်ခုက ဝေးလံတဲ့မြို့ကြီးမှာ၊ လစာပိုများပေမယ့် အလုပ်ချိန်ပိုရှည်တယ်။',
      th: 'อีกที่เป็นเมืองใหญ่ที่อยู่ไกล เงินเดือนสูงกว่าแต่ชั่วโมงทำงานนานกว่า',
    },
    {
      en: 'I talked to my parents for many nights. I wrote down the good and bad points of each choice.',
      my: 'ကျွန်မ မိဘတွေနဲ့ ညပေါင်းများစွာ ဆွေးနွေးခဲ့တယ်။ ရွေးချယ်မှုတစ်ခုစီရဲ့ ကောင်းကျိုးဆိုးကျိုးတွေကို ချရေးခဲ့တယ်။',
      th: 'ฉันคุยกับพ่อแม่หลายคืน ฉันเขียนข้อดีข้อเสียของแต่ละทางเลือก',
    },
    {
      en: 'In the end I chose the job near my family. Money is useful, but time with loved ones is priceless.',
      my: 'နောက်ဆုံးမှာ ငါ့မိသားစုနားက အလုပ်ကို ရွေးခဲ့တယ်။ ပိုက်ဆံက အသုံးဝင်ပေမယ့် ချစ်ရသူတွေနဲ့ အချိန်က တန်ဖိုးဖြတ်မရဘူး။',
      th: 'สุดท้ายฉันเลือกงานที่ใกล้ครอบครัว เงินมีประโยชน์ แต่เวลากับคนที่รักประเมินค่าไม่ได้',
    },
  ],
},
// key words: fail, mistake, learn, try, success
{
  id: 'story-b1-3',
  level: 'B1',
  titleEn: 'Learning from Failure',
  titleMy: 'ကျရှုံးမှုကနေ သင်ယူခြင်း',
  titleTh: 'เรียนรู้จากความล้มเหลว',
  paragraphs: [
    {
      en: 'When I started my small food shop, I made many mistakes. I bought too much food and it went bad.',
      my: 'ကျွန်မ အစားအသောက်ဆိုင်သေးသေးလေး စဖွင့်တုန်းက အမှားအများကြီး လုပ်ခဲ့တယ်။ အစားအသောက်တွေ အများကြီး ဝယ်မိပြီး ပုပ်ကုန်တယ်။',
      th: 'ตอนที่ฉันเริ่มเปิดร้านอาหารเล็ก ๆ ฉันทำผิดพลาดมากมาย ฉันซื้ออาหารมามากเกินไปและมันก็เสีย',
    },
    {
      en: 'After three months I almost closed the shop. I felt sad and wanted to give up.',
      my: 'သုံးလအကြာမှာ ဆိုင်ကို ပိတ်လုနီးပါး ဖြစ်ခဲ့တယ်။ ကျွန်မ ဝမ်းနည်းပြီး လက်လျှော့ချင်ခဲ့တယ်။',
      th: 'หลังสามเดือนฉันเกือบปิดร้าน ฉันรู้สึกเศร้าและอยากยอมแพ้',
    },
    {
      en: 'But a friend told me: every mistake is a lesson. I started to plan better and waste less.',
      my: 'ဒါပေမယ့် သူငယ်ချင်းတစ်ယောက်က ကျွန်မကို ပြောခဲ့တယ်။ အမှားတိုင်းက သင်ခန်းစာတစ်ခုပဲတဲ့။ ကျွန်မ ပိုကောင်းအောင် စီစဉ်ပြီး အလေအလွှ နည်းအောင် လုပ်ခဲ့တယ်။',
      th: 'แต่เพื่อนคนหนึ่งบอกฉันว่า ทุกความผิดพลาดคือบทเรียน ฉันเริ่มวางแผนให้ดีขึ้นและทิ้งขว้างน้อยลง',
    },
    {
      en: 'Slowly the shop grew. Now it is doing well, and I am grateful for every failure that taught me.',
      my: 'ဖြည်းဖြည်းချင်း ဆိုင် ကြီးထွားလာခဲ့တယ်။ အခု အဆင်ပြေနေပြီ၊ ကျွန်မကို သင်ပေးခဲ့တဲ့ ကျရှုံးမှုတိုင်းအတွက် ကျေးဇူးတင်တယ်။',
      th: 'ร้านค่อย ๆ เติบโต ตอนนี้ไปได้ดี และฉันขอบคุณทุกความล้มเหลวที่สอนฉัน',
    },
  ],
},
// key words: stranger, kind, help, wallet, grateful
{
  id: 'story-b1-4',
  level: 'B1',
  titleEn: 'A Kind Stranger',
  titleMy: 'ကြင်နာတတ်တဲ့ သူစိမ်းတစ်ယောက်',
  titleTh: 'คนแปลกหน้าที่ใจดี',
  paragraphs: [
    {
      en: 'One evening I was rushing to catch the last bus. At the station I realized my wallet was gone.',
      my: 'တစ်ညနေမှာ ကျွန်မ နောက်ဆုံးဘတ်စ်ကားကို မီဖို့ အပြေးအလွှားသွားနေခဲ့တယ်။ ဘူတာမှာ ငါ့ပိုက်ဆံအိတ် ပျောက်နေတာကို သတိထားမိခဲ့တယ်။',
      th: 'เย็นวันหนึ่งฉันรีบไปให้ทันรถบัสคันสุดท้าย ที่สถานีฉันเพิ่งรู้ว่ากระเป๋าสตางค์หายไป',
    },
    {
      en: 'I had no money for the ticket and no phone battery left. I sat down and felt helpless.',
      my: 'လက်မှတ်အတွက် ပိုက်ဆံမရှိဘူး၊ ဖုန်းအားလည်း ကုန်နေပြီ။ ကျွန်မ ထိုင်ချလိုက်ပြီး အကူအညီမဲ့သလို ခံစားခဲ့ရတယ်။',
      th: 'ฉันไม่มีเงินซื้อตั๋วและแบตโทรศัพท์ก็หมด ฉันนั่งลงและรู้สึกหมดหนทาง',
    },
    {
      en: 'A stranger saw my worried face. Without asking many questions, he bought me a ticket.',
      my: 'သူစိမ်းတစ်ယောက်က ကျွန်မရဲ့ စိုးရိမ်နေတဲ့မျက်နှာကို မြင်ခဲ့တယ်။ မေးခွန်းအများကြီး မမေးဘဲ သူ ကျွန်မအတွက် လက်မှတ်တစ်စောင် ဝယ်ပေးခဲ့တယ်။',
      th: 'คนแปลกหน้าคนหนึ่งเห็นใบหน้ากังวลของฉัน เขาไม่ถามอะไรมาก ซื้อตั๋วให้ฉัน',
    },
    {
      en: 'I thanked him with tears in my eyes. He only smiled and said: pass the kindness on.',
      my: 'ကျွန်မ မျက်ရည်တွေနဲ့ သူ့ကို ကျေးဇူးတင်ခဲ့တယ်။ သူက ပြုံးရုံပဲပြုံးပြီး ပြောခဲ့တယ်။ ဒီကြင်နာမှုကို ဆက်လက်မျှဝေပါတဲ့။',
      th: 'ฉันขอบคุณเขาทั้งน้ำตา เขายิ้มแล้วพูดว่า ส่งต่อความกรุณานี้ต่อไปนะ',
    },
    {
      en: 'Since that day, I help strangers whenever I can. Kindness travels further than we think.',
      my: 'အဲဒီနေ့ကစပြီး တတ်နိုင်သမျှ သူစိမ်းတွေကို ကူညီတယ်။ ကြင်နာမှုက ကျွန်မတို့ ထင်တာထက် ပိုဝေးဝေးရောက်တယ်။',
      th: 'ตั้งแต่วันนั้น ฉันช่วยเหลือคนแปลกหน้าเท่าที่ทำได้ ความกรุณาเดินทางได้ไกลกว่าที่เราคิด',
    },
  ],
},
];
