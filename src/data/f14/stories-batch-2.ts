// FASE 14 Ola 3 — stories batch 2: 40 graded stories (22 B1 / 18 B2).
// Each story: 150-250 English words, paragraph-by-paragraph Myanmar translation.
// No overlap with stories-batch-1 or src/data/stories.ts.
// B1 = connectors and longer sentences | B2 = richer vocabulary, subordinate clauses.
import type { Story } from '../../types';

export const storiesBatch2: Story[] = [
// key words: interview, nervous, experience, confident, resume
{
  id: 'story-f14-b1-13',
  level: 'B1',
  titleEn: 'The Job Interview',
  titleMy: 'အလုပ်အင်တာဗျူး',
  titleTh: 'การสัมภาษณ์งาน',
  paragraphs: [
    {
      en: 'Aung Min woke up early on Monday morning because he had a job interview at nine o\'clock. He had prepared for this interview for a whole week, and he felt both nervous and excited.',
      my: 'အောင်မင်းက တနင်္လာနေ့မနက် အစောကြီး နိုးထခဲ့တယ်၊ ဘာလို့လဲဆိုတော့ ကိုးနာရီမှာ အလုပ်အင်တာဗျူးရှိလို့ပါ။ ဒီအင်တာဗျူးအတွက် တစ်ပတ်လုံး ပြင်ဆင်ခဲ့ပြီး စိုးရိမ်စိတ်နဲ့ စိတ်လှုပ်ရှားမှုနှစ်ခုလုံး ခံစားရတယ်။',
      th: 'อองมินตื่นเช้าวันจันทร์เพราะเขามีสัมภาษณ์งานตอนเก้าโมง เขาเตรียมตัวสำหรับการสัมภาษณ์นี้มาทั้งสัปดาห์ และรู้สึกทั้งประหม่าและตื่นเต้น',
    },
    {
      en: 'He chose his best shirt, printed his resume, and arrived at the office thirty minutes early. The receptionist smiled and asked him to wait in the meeting room.',
      my: 'သူက အကောင်းဆုံးအင်္ကျီကို ရွေးချယ်ပြီး ကိုယ်ရေးအကျဉ်းကို print ထုတ်ကာ ရုံးကို မိနစ်သုံးဆယ်အလို ရောက်ခဲ့တယ်။ ဧည့်ခံက ပြုံးပြီး အစည်းအဝေးခန်းမှာ စောင့်ဖို့ ပြောတယ်။',
      th: 'เขาเลือกเสื้อที่ดีที่สุด พิมพ์เรซูเม่ และมาถึงออฟฟิศก่อนเวลาสามสิบนาที พนักงานต้อนรับยิ้มและขอให้เขารอในห้องประชุม',
    },
    {
      en: 'The interviewer asked about his experience, his strengths, and why he wanted the job. Aung Min answered calmly, giving clear examples from his previous work.',
      my: 'အင်တာဗျူးသူက သူ့အတွေ့အကြုံ၊ အားသာချက်တွေနဲ့ ဒီအလုပ်ကို ဘာကြောင့်လိုချင်လဲဆိုတာ မေးတယ်။ အောင်မင်းက စိတ်အေးအေးနဲ့ ဖြေပြီး အရင်အလုပ်က ရှင်းလင်းတဲ့ဥပမာတွေ ပေးတယ်။',
      th: 'ผู้สัมภาษณ์ถามเรื่องประสบการณ์ จุดแข็ง และทำไมเขาอยากได้งาน อองมินตอบอย่างใจเย็น ให้ตัวอย่างชัดเจนจากงานก่อนหน้า',
    },
    {
      en: 'When the interviewer asked about his weakness, he was honest. He said he used to be shy, but he had joined a speaking club to improve himself.',
      my: 'အင်တာဗျူးသူက သူ့အားနည်းချက်ကို မေးတဲ့အခါ သူက ရိုးသားခဲ့တယ်။ အရင်က ရှက်တတ်ပေမယ့် ကိုယ့်ကိုယ်ကို တိုးတက်ဖို့ စကားပြောကလပ်ဝင်ခဲ့တယ်လို့ ပြောတယ်။',
      th: 'เมื่อผู้สัมภาษณ์ถามเรื่องจุดอ่อน เขาตอบอย่างซื่อสัตย์ เขาบอกว่าเคยขี้อาย แต่เขาเข้าร่วมชมรมพูดเพื่อพัฒนาตัวเอง',
    },
    {
      en: 'Three days later, he received a phone call. He had got the job! He called his mother immediately to share the happy news.',
      my: 'သုံးရက်အကြာမှာ သူ ဖုန်းခေါ်ဆိုမှုတစ်ခု ရရှိခဲ့တယ်။ အလုပ်ရသွားပြီ။ သူက အမေကို ချက်ချင်းဖုန်းဆက်ပြီး ဝမ်းသာစရာသတင်းကို မျှဝေတယ်။',
      th: 'สามวันต่อมา เขาได้รับโทรศัพท์ เขาได้งาน! เขาโทรหาแม่ทันทีเพื่อแบ่งปันข่าวดี',
    },
    {
      en: 'That evening, Aung Min celebrated with his friends at a small restaurant. He told them that thorough preparation had made all the difference, and he encouraged everyone to believe in themselves when opportunities come.',
      my: 'အဲဒီညနေမှာ အောင်မင်းက သူငယ်ချင်းတွေနဲ့ စားသောက်ဆိုင်သေးသေးလေးမှာ အောင်ပွဲခံတယ်။ သေချာပြင်ဆင်မှုက အရာအားလုံးကို ပြောင်းလဲစေခဲ့တယ်လို့ သူတို့ကို ပြောပြီး အခွင့်အလမ်းတွေ ရောက်လာတဲ့အခါ ကိုယ့်ကိုယ်ကို ယုံကြည်ဖို့ အားလုံးကို အားပေးတယ်။',
      th: 'เย็นวันนั้น อองมินฉลองกับเพื่อนที่ร้านอาหารเล็ก ๆ เขาบอกพวกเขาว่าการเตรียมตัวอย่างละเอียดทำให้เกิดความแตกต่าง และเขาให้กำลังใจทุกคนให้เชื่อมั่นในตัวเองเมื่อโอกาสมาถึง',
    },
  ],
},
// key words: customer, angry, calm, warranty, patience
{
  id: 'story-f14-b1-14',
  level: 'B1',
  titleEn: 'A Difficult Customer',
  titleMy: 'ခက်ခဲတဲ့ဖောက်သည်',
  titleTh: 'ลูกค้าที่ยากจะรับมือ',
  paragraphs: [
    {
      en: 'May works at a mobile phone shop in downtown Yangon. She likes her job, but some days are harder than others because customers can be very demanding.',
      my: 'မေက ရန်ကုန်မြို့လယ်က မိုဘိုင်းဖုန်းဆိုင်မှာ အလုပ်လုပ်တယ်။ သူက အလုပ်ကို ကြိုက်ပေမယ့် တစ်ချို့နေ့တွေက ပိုခက်ခဲတယ်၊ ဘာလို့လဲဆိုတော့ ဖောက်သည်တွေက အရမ်းတောင်းဆိုတတ်လို့ပါ။',
      th: 'เมย์ทำงานที่ร้านโทรศัพท์มือถือในใจกลางย่างกุ้ง เธอชอบงานของเธอ แต่บางวันก็ยากกว่าวันอื่นเพราะลูกค้าอาจเรียกร้องมาก',
    },
    {
      en: 'One afternoon, an angry man came in holding a phone box. He shouted that the phone had stopped working after only two days.',
      my: 'တစ်နေ့နေ့လည်မှာ ဒေါသထွက်နေတဲ့အမျိုးသားတစ်ယောက် ဖုန်းဘူးကိုင်ပြီး ဝင်လာတယ်။ ဖုန်းက နှစ်ရက်တည်းနဲ့ အလုပ်မလုပ်တော့ဘူးလို့ အော်တယ်။',
      th: 'บ่ายวันหนึ่ง ชายที่โกรธคนหนึ่งเดินเข้ามาพร้อมกล่องโทรศัพท์ เขาตะโกนว่าโทรศัพท์เสียหลังใช้แค่สองวัน',
    },
    {
      en: 'May stayed calm and listened carefully. She checked the receipt and discovered that the phone was still under warranty.',
      my: 'မေက စိတ်အေးအေးထားပြီး သေချာနားထောင်တယ်။ ပြေစာကို စစ်ကြည့်တော့ ဖုန်းက အာမခံသက်တမ်းအတွင်းမှာ ရှိနေသေးတာကို တွေ့တယ်။',
      th: 'เมย์ใจเย็นและฟังอย่างตั้งใจ เธอตรวจใบเสร็จและพบว่าโทรศัพท์ยังอยู่ในประกัน',
    },
    {
      en: 'She explained the warranty policy politely and offered him a replacement phone. Slowly, the man\'s anger disappeared, and he apologized for shouting.',
      my: 'သူက အာမခံမူဝါဒကို ယဉ်ကျေးစွာ ရှင်းပြပြီး အစားထိုးဖုန်းတစ်လုံး ကမ်းလှမ်းတယ်။ ဖြည်းဖြည်းချင်း အမျိုးသားရဲ့ ဒေါသက ပျောက်သွားပြီး အော်ခဲ့တာအတွက် တောင်းပန်တယ်။',
      th: 'เธออธิบายนโยบายประกันอย่างสุภาพและเสนอโทรศัพท์เครื่องใหม่ให้แทน ค่อย ๆ ความโกรธของชายคนนั้นก็หายไป และเขาขอโทษที่ตะโกน',
    },
    {
      en: 'Her manager saw everything and praised her patience. May learned that staying calm can turn a difficult situation into a good one.',
      my: 'သူ့မန်နေဂျာက အရာအားလုံး မြင်ခဲ့ပြီး သူ့စိတ်ရှည်မှုကို ချီးကျူးတယ်။ စိတ်အေးအေးထားတာက ခက်ခဲတဲ့အခြေအနေကို ကောင်းတဲ့အခြေအနေအဖြစ် ပြောင်းနိုင်တယ်ဆိုတာ မေသင်ယူခဲ့တယ်။',
      th: 'ผู้จัดการเห็นทุกอย่างและชมความอดทนของเธอ เมย์เรียนรู้ว่าความใจเย็นเปลี่ยนสถานการณ์ยากให้กลายเป็นดีได้',
    },
    {
      en: 'From that day on, May became known as the most patient employee in the shop. Whenever a difficult customer arrived, her colleagues asked her for help, and she always smiled and handled every difficult situation with great grace.',
      my: 'အဲဒီနေ့ကစပြီး မေက ဆိုင်မှာ စိတ်အရှည်ဆုံးဝန်ထမ်းအဖြစ် လူသိများလာတယ်။ ခက်ခဲတဲ့ဖောက်သည် ရောက်လာတိုင်း လုပ်ဖော်ကိုင်ဖက်တွေက သူ့အကူအညီ တောင်းပြီး သူက အမြဲပြုံးကာ ကျက်သရေရှိရှိ ကိုင်တွယ်တယ်။',
      th: 'ตั้งแต่วันนั้น เมย์เป็นที่รู้จักในฐานะพนักงานที่อดทนที่สุดในร้าน เมื่อใดมีลูกค้าที่ยาก เพื่อนร่วมงานก็ขอความช่วยเหลือจากเธอ และเธอยิ้มเสมอและจัดการทุกสถานการณ์ยากอย่างสง่างาม',
    },
  ],
},
// key words: luggage, suitcase, worried, airline, relieved
{
  id: 'story-f14-b1-15',
  level: 'B1',
  titleEn: 'The Missing Luggage',
  titleMy: 'ပျောက်ဆုံးနေတဲ့ခရီးဆောင်အိတ်',
  titleTh: 'กระเป๋าเดินทางที่หายไป',
  paragraphs: [
    {
      en: 'Daw Hla flew from Yangon to Bangkok for a holiday. When she arrived, she waited at the luggage belt, but her suitcase never appeared.',
      my: 'ဒေါ်လှက အားလပ်ရက်အတွက် ရန်ကုန်ကနေ ဘန်ကောက်ကို လေယာဉ်စီးခဲ့တယ်။ ရောက်တဲ့အခါ ခရီးဆောင်အိတ်ကြိုးမှာ စောင့်ခဲ့ပေမယ့် သူ့အိတ်က ဘယ်တော့မှ ပေါ်မလာဘူး။',
      th: 'ดอฮลาบินจากย่างกุ้งไปกรุงเทพเพื่อพักผ่อน เมื่อมาถึง เธอรอที่สายพานกระเป๋า แต่กระเป๋าของเธอไม่ปรากฏ',
    },
    {
      en: 'She felt worried because all her clothes and medicine were inside the suitcase. She went to the lost luggage counter to report the problem.',
      my: 'သူ စိုးရိမ်ခဲ့တယ်၊ ဘာလို့လဲဆိုတော့ အဝတ်အစားတွေနဲ့ ဆေးတွေအားလုံး အိတ်ထဲမှာ ရှိလို့ပါ။ ပြဿနာကို တိုင်ဖို့ ပျောက်ဆုံးအိတ်ကောင်တာကို သွားတယ်။',
      th: 'เธอรู้สึกกังวลเพราะเสื้อผ้าและยาทั้งหมดอยู่ในกระเป๋า เธอไปเคาน์เตอร์กระเป๋าหายเพื่อแจ้งปัญหา',
    },
    {
      en: 'The officer was kind and helpful. He took her details, gave her a reference number, and promised to call as soon as they found the bag.',
      my: 'တာဝန်ရှိက စေတနာကောင်းပြီး အကူအညီဖြစ်တယ်။ သူ့အချက်အလက်တွေကို ယူပြီး ရည်ညွှန်းနံပါတ်ပေးကာ အိတ်တွေ့တာနဲ့ ဖုန်းဆက်မယ်လို့ ကတိပေးတယ်။',
      th: 'เจ้าหน้าที่ใจดีและช่วยเหลือ เขารับรายละเอียดของเธอ ให้หมายเลขอ้างอิง และสัญญาว่าจะโทรทันทีเมื่อเจอกระเป๋า',
    },
    {
      en: 'Daw Hla bought some basic clothes at the airport shop. That evening, the airline called: her suitcase had been found in Singapore!',
      my: 'ဒေါ်လှက လေဆိပ်ဆိုင်မှာ အခြေခံအဝတ်အစားတချို့ ဝယ်တယ်။ အဲဒီညနေမှာ လေကြောင်းလိုင်းက ဖုန်းဆက်တယ်။ သူ့အိတ်ကို စင်ကာပူမှာ တွေ့ပြီတဲ့။',
      th: 'ดอฮลาซื้อเสื้อผ้าพื้นฐานที่ร้านในสนามบิน เย็นวันนั้น สายการบินโทรมาบอกว่าเจอกระเป๋าของเธอที่สิงคโปร์!',
    },
    {
      en: 'The next morning, the suitcase was delivered to her hotel. She was so relieved that she almost cried with happiness.',
      my: 'နောက်တစ်နေ့မနက်မှာ အိတ်ကို သူ့ဟိုတယ်ကို ပို့ပေးတယ်။ သူ အရမ်းစိတ်သက်သာရာရလို့ ဝမ်းသာပြီး ငိုလုမတတ်ပဲ။',
      th: 'เช้าวันรุ่งขึ้น กระเป๋าถูกส่งมาที่โรงแรมของเธอ เธอโล่งใจจนเกือบร้องไห้ด้วยความสุข',
    },
    {
      en: 'Daw Hla enjoyed the rest of her holiday without any more problems. When she returned home, she told her friends to always keep important medicine in their hand luggage, just in case. She also decided to label her suitcase clearly with her name and phone number for all future trips, so this would never happen again.',
      my: 'ဒေါ်လှက ကျန်တဲ့အားလပ်ရက်ကို ပြဿနာမရှိဘဲ ပျော်ရွှင်စွာ ကုန်ဆုံးတယ်။ အိမ်ပြန်ရောက်တဲ့အခါ အရေးကြီးတဲ့ဆေးတွေကို လက်ဆွဲအိတ်ထဲမှာ အမြဲထားဖို့ သူငယ်ချင်းတွေကို ပြောတယ်၊ ကြိုတင်ကာကွယ်တဲ့အနေနဲ့။ သူက နောင်ခရီးတိုင်းအတွက် ဒါမျိုး ထပ်မဖြစ်အောင် အိတ်မှာ နာမည်နဲ့ ဖုန်းနံပါတ်ကို ရှင်းရှင်းလင်းလင်း တံဆိပ်ကပ်ဖို့ ဆုံးဖြတ်တယ်။',
      th: 'ดอฮลาเพลิดเพลินกับวันหยุดที่เหลือโดยไม่มีปัญหาอีก เมื่อกลับบ้าน เธอบอกเพื่อนให้เก็บยาสำคัญในกระเป๋าถือเสมอ เผื่อไว้ เธอยังตัดสินใจติดป้ายกระเป๋าชัดเจนด้วยชื่อและเบอร์โทรสำหรับการเดินทางครั้งต่อ ๆ ไป เพื่อไม่ให้เกิดเหตุการณ์นี้อีก',
    },
  ],
},
// key words: hotel, reservation, manager, apologize, upgrade
{
  id: 'story-f14-b1-16',
  level: 'B1',
  titleEn: 'The Hotel Mix-up',
  titleMy: 'ဟိုတယ်အမှား',
  titleTh: 'ความผิดพลาดที่โรงแรม',
  paragraphs: [
    {
      en: 'Ko Thet booked a hotel room online for his business trip to Mandalay. When he arrived late at night, the receptionist could not find his reservation.',
      my: 'ကိုသက်က မန္တလေးစီးပွားရေးခရီးအတွက် ဟိုတယ်အခန်းကို အွန်လိုင်းက ဘိုကင်လုပ်ခဲ့တယ်။ ညနက်မှ ရောက်တဲ့အခါ ဧည့်ခံက သူ့ဘိုကင်ကို ရှာမတွေ့ဘူး။',
      th: 'โกเต็ตจองห้องพักโรงแรมออนไลน์สำหรับการเดินทางธุรกิจไปมัณฑะเลย์ เมื่อเขามาถึงดึก พนักงานต้อนรับหาการจองของเขาไม่เจอ',
    },
    {
      en: 'He showed the confirmation email on his phone, but the hotel had no record of it. Ko Thet was tired and frustrated.',
      my: 'သူက ဖုန်းပေါ်က အတည်ပြုအီးမေးလ်ကို ပြပေမယ့် ဟိုတယ်မှာ မှတ်တမ်းမရှိဘူး။ ကိုသက်က ပင်ပန်းပြီး စိတ်ပျက်နေတယ်။',
      th: 'เขาแสดงอีเมลยืนยันบนโทรศัพท์ แต่โรงแรมไม่มีบันทึก โกเต็ตเหนื่อยและหงุดหงิด',
    },
    {
      en: 'The manager came to help. After checking carefully, she discovered that the booking had been made for the wrong month.',
      my: 'မန်နေဂျာက ကူညီဖို့ ရောက်လာတယ်။ သေချာစစ်ကြည့်ပြီးနောက် booking က လ မှားပြီး လုပ်ထားတာကို တွေ့တယ်။',
      th: 'ผู้จัดการมาช่วย หลังตรวจอย่างละเอียด เธอพบว่าการจองทำผิดเดือน',
    },
    {
      en: 'Instead of arguing, the manager apologized and upgraded him to a better room at no extra charge. Ko Thet was pleasantly surprised.',
      my: 'အငြင်းပွားမယ့်အစား မန်နေဂျာက တောင်းပန်ပြီး ပိုကောင်းတဲ့အခန်းကို အပိုအခကြေးငွေမယူဘဲ မြှင့်ပေးတယ်။ ကိုသက်က အံ့သြဝမ်းသာဖြစ်သွားတယ်။',
      th: 'แทนที่จะโต้เถียง ผู้จัดการขอโทษและอัปเกรดเขาไปห้องที่ดีกว่าโดยไม่คิดเงินเพิ่ม โกเต็ตประหลาดใจอย่างยินดี',
    },
    {
      en: 'The next morning, he left a five-star review online. He learned that mistakes happen, but good service can fix them.',
      my: 'နောက်တစ်နေ့မနက်မှာ သူက အွန်လိုင်းမှာ ကြယ်ငါးပွင့် ရီဗျူးရေးခဲ့တယ်။ အမှားတွေ ဖြစ်တတ်ပေမယ့် ဝန်ဆောင်မှုကောင်းက ပြင်နိုင်တယ်ဆိုတာ သင်ယူခဲ့တယ်။',
      th: 'เช้าวันรุ่งขึ้น เขาเขียนรีวิวห้าดาวออนไลน์ เขาเรียนรู้ว่าความผิดพลาดเกิดขึ้นได้ แต่บริการที่ดีแก้ไขได้',
    },
    {
      en: 'Ko Thet slept wonderfully in the comfortable upgraded room. The next morning, he thanked the manager personally and promised to stay at the same hotel on every future trip to Mandalay. He told his business partners about the wonderful service, and two of them booked the same hotel for their next visit to the city.',
      my: 'ကိုသက်က သက်တောင့်သက်သာရှိတဲ့ မြှင့်ပေးထားတဲ့အခန်းမှာ အရမ်းကောင်းကောင်း အိပ်စက်တယ်။ နောက်တစ်နေ့မနက်မှာ မန်နေဂျာကို ကိုယ်တိုင်ကျေးဇူးတင်ပြီး နောင်မန္တလေးခရီးတိုင်းမှာ ဒီဟိုတယ်မှာပဲ တည်းမယ်လို့ ကတိပေးတယ်။ သူက စီးပွားဖက်တွေကို အံ့ဩစရာကောင်းတဲ့ ဝန်ဆောင်မှုအကြောင်း ပြောပြပြီး သူတို့ထဲက နှစ်ယောက်က မြို့ကို နောက်လာတဲ့အခါ ဒီဟိုတယ်မှာပဲ ဘိုကင်လုပ်တယ်။',
      th: 'โกเต็ตหลับสบายในห้องที่อัปเกรดอย่างสะดวกสบาย เช้าวันรุ่งขึ้น เขาขอบคุณผู้จัดการเป็นการส่วนตัวและสัญญาว่าจะพักโรงแรมเดิมทุกครั้งที่มามัณฑะเลย์ เขาบอกคู่ค้าธุรกิจเรื่องบริการยอดเยี่ยม และสองคนในนั้นจองโรงแรมเดียวกันสำหรับการมาเยือนเมืองครั้งหน้า',
    },
  ],
},
// key words: conference, presentation, nervous, proud, abroad
{
  id: 'story-f14-b1-17',
  level: 'B1',
  titleEn: 'The Business Trip',
  titleMy: 'စီးပွားရေးခရီးစဉ်',
  titleTh: 'การเดินทางธุรกิจ',
  paragraphs: [
    {
      en: 'Su Su had never traveled abroad for work before, so she was excited when her boss asked her to attend a conference in Singapore.',
      my: 'စုစုက အလုပ်အတွက် နိုင်ငံခြားတစ်ခါမှ မသွားဖူးဘူး၊ ဒါကြောင့် သူ့သူဌေးက စင်ကာပူကွန်ဖရင့်ကို တက်ဖို့ ပြောတဲ့အခါ စိတ်လှုပ်ရှားခဲ့တယ်။',
      th: 'ซูซูไม่เคยเดินทางไปต่างประเทศเพื่อทำงานมาก่อน เธอจึงตื่นเต้นเมื่อเจ้านายขอให้เธอเข้าร่วมการประชุมที่สิงคโปร์',
    },
    {
      en: 'She prepared her presentation for two weeks. She practiced in front of a mirror every evening until she felt confident.',
      my: 'သူက တင်ပြမှုကို နှစ်ပတ်ကြာ ပြင်ဆင်တယ်။ ယုံကြည်မှုရှိလာတဲ့အထိ ညနေတိုင်း မှန်ရှေ့မှာ လေ့ကျင့်တယ်။',
      th: 'เธอเตรียมงานนำเสนอสองสัปดาห์ เธอฝึกหน้ากระจกทุกเย็นจนรู้สึกมั่นใจ',
    },
    {
      en: 'At the conference, she met people from ten different countries. Although she was nervous at first, everyone was friendly and welcoming.',
      my: 'ကွန်ဖရင့်မှာ သူက နိုင်ငံဆယ်နိုင်ငံက လူတွေနဲ့ တွေ့တယ်။ အစမှာ စိုးရိမ်ပေမယ့် အားလုံးက ဖော်ရွေပြီး ကြိုဆိုကြတယ်။',
      th: 'ที่การประชุม เธอพบผู้คนจากสิบประเทศ แม้ตอนแรกจะประหม่า แต่ทุกคนเป็นมิตรและต้อนรับ',
    },
    {
      en: 'Her presentation went very well. Several people asked questions, and one company even wanted to work with her team.',
      my: 'သူ့တင်ပြမှုက အရမ်းကောင်းသွားတယ်။ လူအများအပြားက မေးခွန်းတွေမေးပြီး ကုမ္ပဏီတစ်ခုကတောင် သူ့အဖွဲ့နဲ့ အလုပ်လုပ်ချင်တယ်။',
      th: 'งานนำเสนอของเธอไปได้ดีมาก มีหลายคนถามคำถาม และบริษัทหนึ่งอยากทำงานกับทีมของเธอ',
    },
    {
      en: 'On the flight home, Su Su felt proud. The trip had taught her that preparation and courage can open new doors.',
      my: 'အပြန်လေယာဉ်ပေါ်မှာ စုစုက ဂုဏ်ယူစိတ်ခံစားရတယ်။ ပြင်ဆင်မှုနဲ့ သတ္တိက တံခါးအသစ်တွေ ဖွင့်ပေးနိုင်တယ်ဆိုတာ ဒီခရီးက သင်ပေးခဲ့တယ်။',
      th: 'บนเที่ยวบินกลับ ซูซูรู้สึกภูมิใจ การเดินทางสอนเธอว่าการเตรียมตัวและความกล้าเปิดประตูบานใหม่ได้',
    },
    {
      en: 'Back at the office, Su Su shared everything she had learned with her colleagues. Her boss was so impressed that he asked her to lead the next international project. She keeps the conference badge on her desk as a reminder that stepping outside her comfort zone was the best decision she ever made.',
      my: 'ရုံးပြန်ရောက်တဲ့အခါ စုစုက သင်ယူခဲ့သမျှကို လုပ်ဖော်ကိုင်ဖက်တွေနဲ့ မျှဝေတယ်။ သူ့သူဌေးက အရမ်းအထင်ကြီးလို့ နောက်နိုင်ငံတကာပရောဂျက်ကို ဦးဆောင်ဖို့ တောင်းဆိုတယ်။ သူက သက်တောင့်သက်သာဇုန်အပြင်ထွက်တာက သူလုပ်ဖူးသမျှထဲမှာ အကောင်းဆုံးဆုံးဖြတ်ချက်ဖြစ်တယ်ဆိုတာ သတိရဖို့ ကွန်ဖရင့်တံဆိပ်ကို စားပွဲပေါ် ထားတယ်။',
      th: 'กลับที่ออฟฟิศ ซูซูแบ่งปันทุกสิ่งที่เรียนรู้กับเพื่อนร่วมงาน เจ้านายประทับใจจนขอให้เธอนำโครงการระหว่างประเทศครั้งหน้า เธอเก็บบัตรประชุมไว้บนโต๊ะเพื่อเตือนว่าการก้าวออกจากคอมฟอร์ตโซนคือการตัดสินใจที่ดีที่สุดที่เธอเคยทำ',
    },
  ],
},
// key words: doctor, healthy, exercise, advice, lifestyle
{
  id: 'story-f14-b1-18',
  level: 'B1',
  titleEn: 'The Doctor\'s Advice',
  titleMy: 'ဆရာဝန်ရဲ့အကြံဉာဏ်',
  titleTh: 'คำแนะนำของหมอ',
  paragraphs: [
    {
      en: 'U Ba is fifty-five years old and works long hours at his shop. Recently, he started feeling tired all the time, so he visited his doctor.',
      my: 'ဦးဘအသက် ငါးဆယ့်ငါးနှစ်ရှိပြီး သူ့ဆိုင်မှာ အချိန်ကြာကြာ အလုပ်လုပ်တယ်။ မကြာသေးခင်က အမြဲပင်ပန်းနေတယ်လို့ ခံစားရလို့ ဆရာဝန်ဆီ သွားတယ်။',
      th: 'อูบาอายุห้าสิบห้าและทำงานนานที่ร้านของเขา ช่วงนี้ เขาเริ่มรู้สึกเหนื่อยตลอดเวลา เขาจึงไปหาหมอ',
    },
    {
      en: 'The doctor checked his blood pressure and blood sugar. The results showed that U Ba needed to change his lifestyle.',
      my: 'ဆရာဝန်က သွေးပေါင်ချိန်နဲ့ သွေးတွင်းသကြားဓာတ်ကို စစ်တယ်။ ရလဒ်တွေက ဦးဘလူနေမှုပုံစံ ပြောင်းဖို့လိုတယ်ဆိုတာ ပြတယ်။',
      th: 'หมอตรวจความดันโลหิตและน้ำตาลในเลือด ผลแสดงว่าอูบาต้องเปลี่ยนไลฟ์สไตล์',
    },
    {
      en: 'The doctor advised him to walk for thirty minutes every day, eat less fried food, and sleep at least seven hours each night.',
      my: 'ဆရာဝန်က နေ့တိုင်း မိနစ်သုံးဆယ် လမ်းလျှောက်ဖို့၊ ကြော်တဲ့အစားအစာ လျှော့စားဖို့၊ ညတိုင်း အနည်းဆုံး ခုနစ်နာရီ အိပ်ဖို့ အကြံပေးတယ်။',
      th: 'หมอแนะนำให้เขาเดินสามสิบนาทีทุกวัน กินของทอดน้อยลง และนอนอย่างน้อยเจ็ดชั่วโมงทุกคืน',
    },
    {
      en: 'At first, U Ba found it difficult to change his habits. But his wife supported him, and they started walking together every morning.',
      my: 'အစမှာ ဦးဘအကျင့်တွေ ပြောင်းဖို့ ခက်ခဲတယ်။ ဒါပေမယ့် သူ့ဇနီးက ထောက်ပံ့ပြီး မနက်တိုင်း အတူတူ လမ်းလျှောက်ကြတယ်။',
      th: 'ตอนแรก อูบารู้สึกยากที่จะเปลี่ยนนิสัย แต่ภรรยาสนับสนุนเขา และพวกเขาเริ่มเดินด้วยกันทุกเช้า',
    },
    {
      en: 'After three months, he felt much healthier and more energetic. He thanked his doctor for the advice that changed his life.',
      my: 'သုံးလအကြာမှာ သူ အများကြီးပိုကျန်းမာပြီး အားအင်ပြည့်လာတယ်။ ဘဝကို ပြောင်းလဲစေတဲ့ အကြံဉာဏ်အတွက် ဆရာဝန်ကို ကျေးဇူးတင်တယ်။',
      th: 'หลังสามเดือน เขารู้สึกสุขภาพดีและมีพลังมากขึ้นมาก เขาขอบคุณหมอสำหรับคำแนะนำที่เปลี่ยนชีวิตเขา',
    },
    {
      en: 'U Ba now walks every morning without fail, and he has even convinced two neighbors to join him. His doctor says his test results have improved remarkably. His grandchildren now join the morning walks during school holidays, and U Ba loves teaching them about healthy living.',
      my: 'ဦးဘက အခု မနက်တိုင်း မပျက်မကွက် လမ်းလျှောက်တယ်၊ အိမ်နီးချင်းနှစ်ယောက်ကိုတောင် အတူလိုက်ဖို့ စည်းရုံးနိုင်တယ်။ စစ်ဆေးမှုရလဒ်တွေ သိသိသာသာ တိုးတက်လာတယ်လို့ ဆရာဝန်က ပြောတယ်။ သူ့မြေးတွေက ကျောင်းပိတ်ရက်တွေမှာ မနက်လမ်းလျှောက်တာမှာ လိုက်ပါလာပြီး ကျန်းမာတဲ့လူနေမှုအကြောင်း သူတို့ကို သင်ပေးရတာ ဦးဘ ကြိုက်တယ်။',
      th: 'อูบาเดินทุกเช้าโดยไม่ขาด และเขายังชวนเพื่อนบ้านสองคนมาร่วมด้วย หมอบอกว่าผลตรวจของเขาดีขึ้นอย่างน่าทึ่ง หลาน ๆ มาร่วมเดินตอนเช้าช่วงปิดเทอม และอูบาชอบสอนพวกเขาเรื่องการใช้ชีวิตอย่างสุขภาพดี',
    },
  ],
},
// key words: manager, listen, employee, leadership, profit
{
  id: 'story-f14-b1-19',
  level: 'B1',
  titleEn: 'The New Manager',
  titleMy: 'မန်နေဂျာအသစ်',
  titleTh: 'ผู้จัดการคนใหม่',
  paragraphs: [
    {
      en: 'When the new manager arrived at the small software company, the employees were worried. They had heard that she was very strict.',
      my: 'မန်နေဂျာအသစ်က ဆော့ဖ်ဝဲလ်ကုမ္ပဏီသေးသေးလေးကို ရောက်လာတဲ့အခါ ဝန်ထမ်းတွေ စိုးရိမ်ခဲ့ကြတယ်။ သူက အရမ်းတင်းကျပ်တယ်လို့ ကြားခဲ့ကြလို့ပါ။',
      th: 'เมื่อผู้จัดการคนใหม่มาถึงบริษัทซอฟต์แวร์เล็ก พนักงานกังวล พวกเขาได้ยินว่าเธอเข้มงวดมาก',
    },
    {
      en: 'On her first day, Daw Ei introduced herself with a warm smile. She said she wanted to listen before making any changes.',
      my: 'ပထမနေ့မှာ ဒေါ်အိက နွေးထွေးတဲ့အပြုံးနဲ့ ကိုယ့်ကိုယ်ကို မိတ်ဆက်တယ်။ အပြောင်းအလဲတွေ မလုပ်ခင် နားထောင်ချင်တယ်လို့ ပြောတယ်။',
      th: 'วันแรก ดอเอแนะนำตัวด้วยรอยยิ้มอบอุ่น เธอบอกว่าอยากฟังก่อนที่จะเปลี่ยนแปลงอะไร',
    },
    {
      en: 'During the first week, she met every employee individually. She asked about their work, their problems, and their ideas.',
      my: 'ပထမတစ်ပတ်အတွင်း သူက ဝန်ထမ်းတိုင်းနဲ့ တစ်ယောက်ချင်း တွေ့တယ်။ သူတို့အလုပ်၊ ပြဿနာတွေ၊ အကြံဉာဏ်တွေအကြောင်း မေးတယ်။',
      th: 'สัปดาห์แรก เธอพบพนักงานทุกคนทีละคน เธอถามเรื่องงาน ปัญหา และความคิดของพวกเขา',
    },
    {
      en: 'The employees were surprised by her kindness. Soon, they started sharing ideas they had kept secret for years.',
      my: 'ဝန်ထမ်းတွေက သူ့စေတနာကို အံ့သြခဲ့ကြတယ်။ မကြာခင် နှစ်တွေနဲ့ချီပြီး လျှို့ဝှက်ထားတဲ့ အကြံဉာဏ်တွေကို မျှဝေလာကြတယ်။',
      th: 'พนักงานประหลาดใจในความใจดีของเธอ ไม่นาน พวกเขาเริ่มแบ่งปันความคิดที่เก็บเป็นความลับมาหลายปี',
    },
    {
      en: 'Within six months, the company\'s profits doubled. Everyone learned that good leadership starts with listening.',
      my: 'ခြောက်လအတွင်း ကုမ္ပဏီအမြတ် နှစ်ဆတိုးလာတယ်။ ကောင်းတဲ့ခေါင်းဆောင်မှုက နားထောင်ခြင်းကနေ စတယ်ဆိုတာ အားလုံး သင်ယူခဲ့ကြတယ်။',
      th: 'ภายในหกเดือน กำไรของบริษัทเพิ่มขึ้นสองเท่า ทุกคนเรียนรู้ว่าภาวะผู้นำที่ดีเริ่มจากการฟัง',
    },
    {
      en: 'Daw Ei still meets every new employee personally during their first week. She believes this small habit is the secret behind the company\'s continued success. New employees often say that this personal welcome made them feel valued from the very first day, and many stay with the company for years because of it, which makes everyone happy.',
      my: 'ဒေါ်အိက ဝန်ထမ်းအသစ်တိုင်းနဲ့ ပထမတစ်ပတ်မှာ ကိုယ်တိုင်တွေ့တုန်းပဲ။ ဒီအကျင့်သေးသေးလေးက ကုမ္ပဏီရဲ့ ဆက်လက်အောင်မြင်မှုနောက်က လျှို့ဝှက်ချက်လို့ သူ ယုံကြည်တယ်။ ဝန်ထမ်းအသစ်တွေက ဒီကိုယ်ပိုင်ကြိုဆိုမှုက ပထမနေ့ကတည်းက တန်ဖိုးထားခံရသလို ခံစားစေတယ်လို့ မကြာခဏ ပြောပြီး အများအပြားက ဒါကြောင့် ကုမ္ပဏီမှာ နှစ်တွေနဲ့ချီ နေကြတယ်။',
      th: 'ดอเอยังพบพนักงานใหม่ทุกคนเป็นการส่วนตัวในสัปดาห์แรก เธอเชื่อว่านิสัยเล็ก ๆ นี้คือความลับเบื้องหลังความสำเร็จต่อเนื่องของบริษัท พนักงานใหม่มักบอกว่าการต้อนรับส่วนตัวนี้ทำให้พวกเขารู้สึกมีค่าตั้งแต่วันแรก และหลายคนอยู่กับบริษัทมาหลายปีเพราะเหตุนี้ ซึ่งทำให้ทุกคนมีความสุข',
    },
  ],
},
// key words: deadline, team, plan, stress, campaign
{
  id: 'story-f14-b1-20',
  level: 'B1',
  titleEn: 'The Deadline',
  titleMy: 'နောက်ဆုံးရက်',
  titleTh: 'เส้นตาย',
  paragraphs: [
    {
      en: 'The marketing team had only five days left to finish their campaign. Everyone was stressed because the deadline seemed impossible.',
      my: 'ဈေးကွက်အဖွဲ့မှာ ကမ်ပိန်းပြီးဖို့ ငါးရက်ပဲ ကျန်တော့တယ်။ နောက်ဆုံးရက်က မဖြစ်နိုင်သလို ထင်ရလို့ အားလုံး စိတ်ဖိစီးနေကြတယ်။',
      th: 'ทีมการตลาดเหลือเวลาแค่ห้าวันในการทำแคมเปญให้เสร็จ ทุกคนเครียดเพราะเส้นตายดูเป็นไปไม่ได้',
    },
    {
      en: 'The team leader, Nanda, called an emergency meeting. Instead of panicking, he divided the work into small, clear tasks.',
      my: 'အဖွဲ့ခေါင်းဆောင် နန္ဒက အရေးပေါ်အစည်းအဝေး ခေါ်တယ်။ ထိတ်လန့်မယ့်အစား အလုပ်ကို သေးငယ်ရှင်းလင်းတဲ့ တာဝန်တွေ ခွဲတယ်။',
      th: 'หัวหน้าทีม นันทา เรียกประชุมฉุกเฉิน แทนที่จะตื่นตระหนก เขาแบ่งงานเป็นงานย่อยที่เล็กและชัดเจน',
    },
    {
      en: 'Each person knew exactly what to do and when to finish. They worked late together, helping each other whenever someone got stuck.',
      my: 'လူတိုင်းက ဘာလုပ်ရမယ်၊ ဘယ်တော့ပြီးရမယ်ဆိုတာ အတိအကျသိတယ်။ သူတို့ အတူတူ နောက်ကျတဲ့အထိ အလုပ်လုပ်ပြီး တစ်ယောက်ယောက် ပိတ်မိတိုင်း ကူညီကြတယ်။',
      th: 'แต่ละคนรู้แน่ชัดว่าต้องทำอะไรและเสร็จเมื่อไร พวกเขาทำงานดึกด้วยกัน ช่วยเหลือกันเมื่อใดมีคนติดขัด',
    },
    {
      en: 'On the fourth day, everything was ready. They even had time to check the campaign twice before sending it to the client.',
      my: 'စတုတ္ထနေ့မှာ အရာအားလုံး အဆင်သင့်ဖြစ်သွားတယ်။ ဖောက်သည်ကို မပို့ခင် ကမ်ပိန်းကို နှစ်ကြိမ်တောင် စစ်ဖို့ အချိန်ရတယ်။',
      th: 'วันที่สี่ ทุกอย่างพร้อม พวกเขายังมีเวลาตรวจแคมเปญสองรอบก่อนส่งให้ลูกค้า',
    },
    {
      en: 'The client loved the campaign. Nanda told his team that clear planning beats worry every time.',
      my: 'ဖောက်သည်က ကမ်ပိန်းကို အရမ်းကြိုက်တယ်။ ရှင်းလင်းတဲ့စီစဉ်မှုက စိုးရိမ်မှုကို အမြဲအနိုင်ရတယ်လို့ နန္ဒက အဖွဲ့ကို ပြောတယ်။',
      th: 'ลูกค้าชอบแคมเปญมาก นันทาบอกทีมว่าการวางแผนที่ชัดเจนชนะความกังวลเสมอ',
    },
    {
      en: 'After the successful campaign, the team celebrated with a big dinner. Nanda reminded them that the real victory was learning to work together under pressure. The client was so happy that they signed a bigger contract for the next campaign, giving the team an even greater challenge to look forward to.',
      my: 'အောင်မြင်တဲ့ကမ်ပိန်းအပြီး အဖွဲ့က ညစာကြီးနဲ့ အောင်ပွဲခံတယ်။ တကယ့်အောင်ပွဲက ဖိအားအောက်မှာ အတူတူအလုပ်လုပ်ဖို့ သင်ယူခဲ့တာပါပဲလို့ နန္ဒက သူတို့ကို သတိပေးတယ်။ ဖောက်သည်က အရမ်းပျော်လို့ နောက်ကမ်ပိန်းအတွက် ပိုကြီးတဲ့စာချုပ် ချုပ်တယ်၊ အဖွဲ့ကို မျှော်လင့်ဖို့ ပိုကြီးတဲ့စိန်ခေါ်မှု ပေးတယ်။',
      th: 'หลังแคมเปญที่สำเร็จ ทีมฉลองด้วยอาหารค่ำมื้อใหญ่ นันทาเตือนพวกเขาว่าชัยชนะที่แท้จริงคือการเรียนรู้ที่จะทำงานด้วยกันภายใต้ความกดดัน ลูกค้ามีความสุขจนเซ็นสัญญาที่ใหญ่กว่าสำหรับแคมเปญหน้า ทำให้ทีมมีความท้าทายที่ยิ่งใหญ่กว่ารออยู่',
    },
  ],
},
// key words: project, teamwork, discuss, website, prize
{
  id: 'story-f14-b1-21',
  level: 'B1',
  titleEn: 'The Team Project',
  titleMy: 'အဖွဲ့ပရောဂျက်',
  titleTh: 'โครงการของทีม',
  paragraphs: [
    {
      en: 'Four university students had to build a website together for their final project. At first, they argued about everything.',
      my: 'တက္ကသိုလ်ကျောင်းသားလေးယောက်က နောက်ဆုံးပရောဂျက်အတွက် ဝက်ဘ်ဆိုက်တစ်ခုကို အတူတူ တည်ဆောက်ရတယ်။ အစမှာ အရာအားလုံးနဲ့ ပတ်သက်ပြီး အငြင်းပွားကြတယ်။',
      th: 'นักศึกษามหาวิทยาลัยสี่คนต้องสร้างเว็บไซต์ด้วยกันสำหรับโครงการสุดท้าย ตอนแรก พวกเขาโต้เถียงกันทุกเรื่อง',
    },
    {
      en: 'Thiri wanted a blue design, while Zaw wanted green. Min wanted many pages, but Hla wanted it simple.',
      my: 'သီရိက အပြာရောင်ဒီဇိုင်း လိုချင်ပြီး ဇော်က အစိမ်းရောင် လိုချင်တယ်။ မင်းက စာမျက်နှာများများ လိုချင်ပေမယ့် လှက ရိုးရှင်းတာကို လိုချင်တယ်။',
      th: 'ทีรีอยากได้ดีไซน์สีฟ้า ขณะที่ซออยากได้สีเขียว มินอยากได้หลายหน้า แต่ฮลาอยากได้แบบเรียบง่าย',
    },
    {
      en: 'Their teacher suggested they vote on each decision and respect the majority. Slowly, the arguments turned into discussions.',
      my: 'သူတို့ဆရာက ဆုံးဖြတ်ချက်တိုင်းကို မဲပေးပြီး အများစုကို လေးစားဖို့ အကြံပေးတယ်။ ဖြည်းဖြည်းချင်း အငြင်းပွားမှုတွေက ဆွေးနွေးမှုတွေ ဖြစ်လာတယ်။',
      th: 'ครูแนะนำให้พวกเขาโหวตทุกการตัดสินใจและเคารพเสียงส่วนใหญ่ ค่อย ๆ การโต้เถียงกลายเป็นบทสนทนา',
    },
    {
      en: 'They divided the work according to their skills. Thiri designed, Zaw coded, Min wrote the content, and Hla tested everything.',
      my: 'သူတို့က အလုပ်ကို ကျွမ်းကျင်မှုအလိုက် ခွဲတယ်။ သီရိက ဒီဇိုင်းဆွဲ၊ ဇော်က ကုဒ်ရေး၊ မင်းက အကြောင်းအရာရေး၊ လှက အရာအားလုံး စမ်းသပ်တယ်။',
      th: 'พวกเขาแบ่งงานตามทักษะ ทีรีออกแบบ ซอเขียนโค้ด มินเขียนเนื้อหา และฮลาทดสอบทุกอย่าง',
    },
    {
      en: 'Their website won first prize in the class. They learned that teamwork means listening as much as talking.',
      my: 'သူတို့ဝက်ဘ်ဆိုက်က အတန်းမှာ ပထမဆုရတယ်။ အဖွဲ့လိုက်လုပ်ဆောင်မှုဆိုတာ ပြောသလောက် နားထောင်ရတာပါပဲဆိုတာ သူတို့ သင်ယူခဲ့ကြတယ်။',
      th: 'เว็บไซต์ของพวกเขาชนะรางวัลที่หนึ่งในชั้นเรียน พวกเขาเรียนรู้ว่าการทำงานเป็นทีมหมายถึงการฟังมากพอ ๆ กับการพูด',
    },
    {
      en: 'The four students remained close friends after graduation. Whenever they meet, they laugh about their old arguments and agree those disagreements made their project stronger. Their teacher still uses their website as an example for new students, showing clearly what true cooperation and mutual respect can achieve together.',
      my: 'ကျောင်းသားလေးယောက် ဘွဲ့ရပြီးနောက် ရင်းနှီးတဲ့သူငယ်ချင်းတွေ အဖြစ် ဆက်ရှိနေတယ်။ တွေ့တိုင်း အရင်အငြင်းပွားမှုတွေကို ရယ်မောပြီး အဲဒီသဘောထားကွဲမှုတွေက ပရောဂျက်ကို ပိုအားကောင်းစေတယ်လို့ သဘောတူတယ်။ သူတို့ဆရာက သူတို့ဝက်ဘ်ဆိုက်ကို ကျောင်းသားအသစ်တွေအတွက် နမူနာအဖြစ် အခုထိ သုံးပြီး ပူးပေါင်းဆောင်ရွက်မှုနဲ့ လေးစားမှုက ဘာတွေ အောင်မြင်နိုင်လဲဆိုတာ ပြတယ်။',
      th: 'นักศึกษาทั้งสี่ยังเป็นเพื่อนสนิทกันหลังจบการศึกษา เมื่อใดพบกัน พวกเขาหัวเราะเรื่องการโต้เถียงเก่า ๆ และเห็นพ้องว่าความเห็นต่างทำให้โครงการของพวกเขาแข็งแกร่งขึ้น ครูยังใช้เว็บไซต์ของพวกเขาเป็นตัวอย่างให้นักศึกษาใหม่ แสดงให้เห็นชัดเจนว่าความร่วมมือและความเคารพซึ่งกันและกันบรรลุอะไรได้บ้าง',
    },
    {
      en: 'In the end, they learned that a good team is not four people who always agree, but four people who know how to disagree well.',
      my: 'နောက်ဆုံးမှာ အဖွဲ့ကောင်းဆိုတာ အမြဲသဘောတူတဲ့ လူလေးယောက် မဟုတ်ဘဲ သဘောထားကွဲပြားတာကို ဘယ်လိုကိုင်တွယ်ရမယ် သိတဲ့ လူလေးယောက်ဆိုတာ သူတို့ သင်ယူခဲ့တယ်။',
      th: 'สุดท้าย พวกเขาเรียนรู้ว่าทีมที่ดีไม่ใช่สี่คนที่เห็นด้วยกันเสมอ แต่คือสี่คนที่รู้วิธีเห็นต่างกันอย่างดี',
    },
  ],
},
// key words: promotion, accountant, confident, achieve, manager
{
  id: 'story-f14-b1-22',
  level: 'B1',
  titleEn: 'The Promotion',
  titleMy: 'ရာထူးတိုး',
  titleTh: 'การเลื่อนตำแหน่ง',
  paragraphs: [
    {
      en: 'Hnin has worked as an accountant for four years. She always arrives early, helps her colleagues, and never complains.',
      my: 'နှင်းက စာရင်းကိုင်အဖြစ် လေးနှစ်ကြာ အလုပ်လုပ်ခဲ့တယ်။ သူက အမြဲအစောကြီးရောက်ပြီး လုပ်ဖော်ကိုင်ဖက်တွေကို ကူညီသလို ဘယ်တော့မှ မညည်းညူဘူး။',
      th: 'ฮนินทำงานเป็นนักบัญชีมาสี่ปี เธอมาถึงเช้าเสมอ ช่วยเพื่อนร่วมงาน และไม่เคยบ่น',
    },
    {
      en: 'Last month, a senior position opened in her department. Three people applied, including Hnin.',
      my: 'ပြီးခဲ့တဲ့လက သူ့ဌာနမှာ အကြီးတန်းရာထူး ဖွင့်တယ်။ နှင်းအပါအဝင် လူသုံးယောက် လျှောက်တယ်။',
      th: 'เดือนที่แล้ว ตำแหน่งอาวุโสเปิดในแผนกของเธอ มีสามคนสมัคร รวมถึงฮนิน',
    },
    {
      en: 'During the interview, she spoke confidently about her achievements. She had saved the company money by finding errors in old reports.',
      my: 'အင်တာဗျူးမှာ သူက အောင်မြင်မှုတွေအကြောင်း ယုံကြည်မှုရှိရှိ ပြောတယ်။ အစီရင်ခံစာဟောင်းတွေက အမှားတွေကို ရှာတွေ့ပြီး ကုမ္ပဏီကို ငွေစုပေးခဲ့တယ်။',
      th: 'ระหว่างสัมภาษณ์ เธอพูดเรื่องความสำเร็จของเธออย่างมั่นใจ เธอประหยัดเงินให้บริษัทโดยพบข้อผิดพลาดในรายงานเก่า',
    },
    {
      en: 'A week later, her manager called her into the office. With a big smile, he told her she had got the promotion.',
      my: 'တစ်ပတ်အကြာမှာ သူ့မန်နေဂျာက သူ့ကို ရုံးခန်းထဲ ခေါ်တယ်။ အပြုံးကြီးနဲ့ သူ ရာထူးတိုးရပြီလို့ ပြောတယ်။',
      th: 'หนึ่งสัปดาห์ต่อมา ผู้จัดการเรียกเธอเข้าออฟฟิศ ด้วยรอยยิ้มกว้าง เขาบอกว่าเธอได้เลื่อนตำแหน่ง',
    },
    {
      en: 'Hnin thanked everyone who had supported her. She knew the promotion was not luck, but the result of years of hard work.',
      my: 'နှင်းက ထောက်ပံ့ခဲ့သူအားလုံးကို ကျေးဇူးတင်တယ်။ ရာထူးတိုးတာက ကံကြောင့်မဟုတ်ဘဲ နှစ်တွေနဲ့ချီတဲ့ ကြိုးစားမှုရဲ့ ရလဒ်ဆိုတာ သူ သိတယ်။',
      th: 'ฮนินขอบคุณทุกคนที่สนับสนุนเธอ เธอรู้ว่าการเลื่อนตำแหน่งไม่ใช่โชค แต่คือผลของความพยายามมาหลายปี',
    },
    {
      en: 'In her new role, Hnin mentors junior accountants just as her own manager once mentored her. She believes that sharing knowledge is the best way to grow together. Her story inspires many young women in the company who now see that dedication and honesty are always recognized and rewarded in the end.',
      my: 'ရာထူးအသစ်မှာ နှင်းက သူ့မန်နေဂျာတစ်ချိန်က သူ့ကို လမ်းညွှန်သလို ဂျူနီယာစာရင်းကိုင်တွေကို လမ်းညွှန်တယ်။ အသိပညာမျှဝေတာက အတူတူကြီးထွားဖို့ အကောင်းဆုံးနည်းလမ်းလို့ သူ ယုံကြည်တယ်။ သူ့ဇာတ်လမ်းက ကုမ္ပဏီက အမျိုးသမီးငယ်များစွာကို အားကျစေပြီး စိတ်အားထက်သန်မှုနဲ့ ရိုးသားမှုက အဆုံးမှာ အမြဲအသိအမှတ်ပြုခံရတယ်ဆိုတာ သူတို့ အခု မြင်တယ်။',
      th: 'ในบทบาทใหม่ ฮนินเป็นพี่เลี้ยงให้นักบัญชีรุ่นน้องเหมือนที่ผู้จัดการของเธอเคยเป็นพี่เลี้ยงให้เธอ เธอเชื่อว่าการแบ่งปันความรู้คือวิธีเติบโตไปด้วยกันที่ดีที่สุด เรื่องราวของเธอเป็นแรงบันดาลใจให้หญิงสาวหลายคนในบริษัทที่ตอนนี้เห็นว่าความทุ่มเทและความซื่อสัตย์ได้รับการยอมรับและตอบแทนในที่สุดเสมอ',
    },
  ],
},
// key words: night, hospital, nurse, advice, habit
{
  id: 'story-f14-b1-23',
  level: 'B1',
  titleEn: 'The Night Shift',
  titleMy: 'ညဆိုင်း',
  titleTh: 'กะกลางคืน',
  paragraphs: [
    {
      en: 'Kyaw works the night shift at a hospital as a nurse. While the city sleeps, he takes care of patients who need help.',
      my: 'ကျော်က ဆေးရုံမှာ သူနာပြုအဖြစ် ညဆိုင်း အလုပ်လုပ်တယ်။ မြို့အိပ်နေတုန်း အကူအညီလိုတဲ့ လူနာတွေကို ပြုစုတယ်။',
      th: 'จอทำงานกะกลางคืนที่โรงพยาบาลในฐานะพยาบาล ขณะเมืองหลับ เขาดูแลผู้ป่วยที่ต้องการความช่วยเหลือ',
    },
    {
      en: 'At first, staying awake all night was very difficult. He drank too much coffee and felt terrible in the mornings.',
      my: 'အစမှာ တစ်ညလုံး နိုးနေရတာ အရမ်းခက်ခဲတယ်။ ကော်ဖီအများကြီးသောက်ပြီး မနက်တွေမှာ အရမ်းနေမကောင်းဘူး။',
      th: 'ตอนแรก การตื่นทั้งคืนยากมาก เขาดื่มกาแฟมากเกินไปและรู้สึกแย่ตอนเช้า',
    },
    {
      en: 'An older nurse gave him good advice: sleep in a dark, quiet room during the day, and eat healthy meals before the shift.',
      my: 'သူနာပြုအကြီးတစ်ယောက်က အကြံကောင်းပေးတယ်။ နေ့ဘက်မှာ မှောင်ပြီး တိတ်ဆိတ်တဲ့အခန်းမှာ အိပ်ပြီး ဆိုင်းမစခင် ကျန်းမာတဲ့အစားအစာ စားပါတဲ့။',
      th: 'พยาบาลอาวุโสให้คำแนะนำดี นอนในห้องมืดเงียบตอนกลางวัน และกินอาหารสุขภาพก่อนกะ',
    },
    {
      en: 'Kyaw followed the advice, and soon his body adjusted. He even started to enjoy the quiet peace of the night hospital.',
      my: 'ကျော်က အကြံကို လိုက်နာပြီး မကြာခင် ခန္ဓာကိုယ်က အသားကျသွားတယ်။ ညဘက်ဆေးရုံရဲ့ တိတ်ဆိတ်ငြိမ်းချမ်းမှုကိုတောင် နှစ်သက်လာတယ်။',
      th: 'จอทำตามคำแนะนำ และไม่นานร่างกายของเขาก็ปรับตัวได้ เขาเริ่มเพลิดเพลินกับความเงียบสงบของโรงพยาบาลกลางคืน',
    },
    {
      en: 'He realized that every job is difficult at first, but the right habits make it manageable.',
      my: 'အလုပ်တိုင်းက အစမှာ ခက်ခဲပေမယ့် မှန်ကန်တဲ့အကျင့်တွေက ကိုင်တွယ်နိုင်အောင် လုပ်ပေးတယ်ဆိုတာ သူ သဘောပေါက်တယ်။',
      th: 'เขาตระหนักว่าทุกงานยากตอนแรก แต่นิสัยที่ถูกต้องทำให้จัดการได้',
    },
    {
      en: 'Kyaw now trains new nurses for the night shift, sharing all the tips he learned. He tells them that every challenging job becomes easier with patience and good habits. His family is proud of his important work, and his mother tells everyone that her son helps save precious lives every single night.',
      my: 'ကျော်က အခု ညဆိုင်းအတွက် သူနာပြုအသစ်တွေကို သင်ပေးပြီး သင်ယူခဲ့တဲ့ အကြံတွေအားလုံး မျှဝေတယ်။ စိန်ခေါ်မှုရှိတဲ့အလုပ်တိုင်းက စိတ်ရှည်မှုနဲ့ အကျင့်ကောင်းတွေနဲ့ ပိုလွယ်ကူလာတယ်လို့ သူတို့ကို ပြောတယ်။ သူ့မိသားစုက သူ့အရေးကြီးတဲ့အလုပ်အတွက် ဂုဏ်ယူပြီး အမေက သားက ညတိုင်း အသက်တွေ ကယ်ဖို့ ကူညီတယ်လို့ အားလုံးကို ပြောတယ်။',
      th: 'จอฝึกพยาบาลใหม่สำหรับกะกลางคืน แบ่งปันเคล็ดลับทั้งหมดที่เรียนรู้ เขาบอกพวกเขาว่างานที่ท้าทายทุกงานง่ายขึ้นด้วยความอดทนและนิสัยที่ดี ครอบครัวภูมิใจในงานสำคัญของเขา และแม่บอกทุกคนว่าลูกชายของเธอช่วยชีวิตอันมีค่าทุกคืน',
    },
  ],
},
// key words: conference, speech, courage, investor, career
{
  id: 'story-f14-b2-7',
  level: 'B2',
  titleEn: 'The Conference',
  titleMy: 'ကွန်ဖရင့်',
  titleTh: 'การประชุม',
  paragraphs: [
    {
      en: 'When the invitation to speak at the international business conference arrived, Thuzar could hardly believe her eyes. She had only started her company eighteen months earlier, yet the organizers had noticed her innovative approach to online education.',
      my: 'နိုင်ငံတကာစီးပွားရေးကွန်ဖရင့်မှာ ပြောဖို့ ဖိတ်ကြားလွှာရောက်လာတဲ့အခါ သူဇာက မျက်လုံးကို မယုံနိုင်လုနီးပါးပဲ။ သူ့ကုမ္ပဏီကို စတင်တာ ဆယ့်ရှစ်လပဲ ရှိသေးပေမယ့် စီစဉ်သူတွေက အွန်လိုင်းပညာရေးနဲ့ ပတ်သက်တဲ့ သူ့ဆန်းသစ်တဲ့ချဉ်းကပ်မှုကို သတိထားမိခဲ့တယ်။',
      th: 'เมื่อคำเชิญให้พูดในการประชุมธุรกิจระหว่างประเทศมาถึง ตูซาร์แทบไม่เชื่อสายตาตัวเอง เธอเพิ่งเริ่มบริษัทเมื่อสิบแปดเดือนก่อน แต่ผู้จัดสังเกตเห็นแนวทางนวัตกรรมของเธอในการศึกษาออนไลน์',
    },
    {
      en: 'She spent three weeks preparing her speech, rehearsing in English even though it was not her first language. Her team helped her simplify complicated ideas into clear, memorable stories.',
      my: 'သူက မိန့်ခွန်းကို သုံးပတ်ကြာ ပြင်ဆင်တယ်၊ အင်္ဂလိပ်က မိခင်ဘာသာမဟုတ်ပေမယ့် အင်္ဂလိပ်လိုပဲ လေ့ကျင့်တယ်။ သူ့အဖွဲ့က ရှုပ်ထွေးတဲ့အကြံတွေကို ရှင်းလင်းမှတ်မိလွယ်တဲ့ ဇာတ်လမ်းတွေ ဖြစ်အောင် ရိုးရှင်းဖို့ ကူညီတယ်။',
      th: 'เธอใช้เวลาสามสัปดาห์เตรียมสุนทรพจน์ ฝึกซ้อมเป็นภาษาอังกฤษแม้มันไม่ใช่ภาษาแรกของเธอ ทีมของเธอช่วยเธอย่อยความคิดซับซ้อนให้เป็นเรื่องราวที่ชัดเจนและจดจำง่าย',
    },
    {
      en: 'On the day of the conference, five hundred people filled the hall. Although her hands were shaking, her voice remained steady as she described how her platform had helped ten thousand students in rural areas.',
      my: 'ကွန်ဖရင့်နေ့မှာ လူငါးရာ ခန်းမကို ပြည့်သွားတယ်။ လက်တွေ တုန်နေပေမယ့် သူ့ပလက်ဖောင်းက ကျေးလက်ဒေသက ကျောင်းသားတစ်သောင်းကို ဘယ်လိုကူညီခဲ့လဲဆိုတာ ဖော်ပြတဲ့အခါ အသံက တည်ငြိမ်နေတယ်။',
      th: 'วันประชุม ผู้คนห้าร้อยคนเต็มห้อง แม้มือของเธอจะสั่น แต่เสียงของเธอมั่นคงขณะที่เธอบรรยายว่าแพลตฟอร์มของเธอช่วยนักเรียนหนึ่งหมื่นคนในชนบทอย่างไร',
    },
    {
      en: 'Afterwards, investors from three countries approached her with partnership offers. She realized that a single courageous step can change the direction of an entire career.',
      my: 'ပြီးနောက် နိုင်ငံသုံးနိုင်ငံက ရင်းနှီးမြှုပ်နှံသူတွေက ပူးပေါင်းဆောင်ရွက်မှု ကမ်းလှမ်းချက်တွေနဲ့ သူ့ဆီ ချဉ်းကပ်လာတယ်။ သတ္တိရှိတဲ့ ခြေလှမ်းတစ်ခုတည်းက အသက်မွေးဝမ်းကျောင်းတစ်ခုလုံးရဲ့ ဦးတည်ချက်ကို ပြောင်းနိုင်တယ်ဆိုတာ သူ သဘောပေါက်တယ်။',
      th: 'หลังจากนั้น นักลงทุนจากสามประเทศเข้ามาหาเธอพร้อมข้อเสนอความร่วมมือ เธอตระหนักว่าก้าวที่กล้าหาญเพียงก้าวเดียวเปลี่ยนทิศทางของอาชีพทั้งหมดได้',
    },
    {
      en: 'Thuzar now receives invitations to speak at conferences around the world. She always begins her talks by reminding the audience that she started with nothing but an idea and determination.',
      my: 'သူဇာက အခု ကမ္ဘာတစ်ဝှမ်း ကွန်ဖရင့်တွေမှာ ပြောဖို့ ဖိတ်ကြားလွှာတွေ ရတယ်။ စကားပြောတိုင်း အကြံတစ်ခုနဲ့ စိတ်ပိုင်းဖြတ်မှုကလွဲပြီး ဘာမှမရှိဘဲ စခဲ့တာကို ပရိသတ်ကို သတိပေးခြင်းနဲ့ အမြဲစတယ်။',
      th: 'ตูซาร์ตอนนี้ได้รับคำเชิญให้พูดในการประชุมทั่วโลก เธอเริ่มการพูดทุกครั้งด้วยการเตือนผู้ฟังว่าเธอเริ่มจากไม่มีอะไรเลยนอกจากความคิดและความมุ่งมั่น',
    },
  ],
},
// key words: startup, business, risk, farmer, income
{
  id: 'story-f14-b2-8',
  level: 'B2',
  titleEn: 'The Startup Dream',
  titleMy: 'startup အိပ်မက်',
  titleTh: 'ความฝันสตาร์ทอัพ',
  paragraphs: [
    {
      en: 'For years, Nay Chi worked as an engineer at a large corporation, but she secretly dreamed of starting her own business. Every evening, she sketched ideas for an app that would connect farmers directly with buyers.',
      my: 'နှစ်တွေနဲ့ချီပြီး နေခြည်က ကော်ပိုရေးရှင်းကြီးတစ်ခုမှာ အင်ဂျင်နီယာအဖြစ် အလုပ်လုပ်ခဲ့ပေမယ့် ကိုယ်ပိုင်စီးပွားရေး စတင်ဖို့ လျှို့ဝှက်အိပ်မက်မက်တယ်။ ညနေတိုင်း လယ်သမားတွေကို ဝယ်သူတွေနဲ့ တိုက်ရိုက်ချိတ်ဆက်ပေးမယ့် အက်ပ်အတွက် အကြံတွေကို ပုံကြမ်းဆွဲတယ်။',
      th: 'หลายปี เนจีทำงานเป็นวิศวกรที่บริษัทใหญ่ แต่เธอแอบฝันอยากเริ่มธุรกิจของตัวเอง ทุกเย็น เธอร่างความคิดสำหรับแอปที่จะเชื่อมชาวนาโดยตรงกับผู้ซื้อ',
    },
    {
      en: 'Her friends thought she was taking too big a risk, since she had a stable salary and a comfortable life. However, she had saved enough money to survive for one year without income.',
      my: 'တည်ငြိမ်တဲ့လစာနဲ့ သက်တောင့်သက်သာဘဝရှိလို့ အန္တရာယ်အရမ်းများတယ်လို့ သူ့သူငယ်ချင်းတွေက ထင်တယ်။ ဒါပေမယ့် ဝင်ငွေမရှိဘဲ တစ်နှစ်နေနိုင်လောက်အောင် ငွေစုထားပြီးပြီ။',
      th: 'เพื่อนคิดว่าเธอเสี่ยงมากเกินไป เพราะเธอมีเงินเดือนมั่นคงและชีวิตที่สบาย แต่เธอเก็บเงินพอที่จะอยู่ได้หนึ่งปีโดยไม่มีรายได้',
    },
    {
      en: 'The first six months were brutal: the app crashed constantly, and only twenty farmers signed up. Instead of giving up, she visited villages personally, listened to farmers\' complaints, and rebuilt the app based on their feedback.',
      my: 'ပထမခြောက်လက ရက်စက်တယ်။ အက်ပ်က အမြဲပြိုကျပြီး လယ်သမားနှစ်ဆယ်ပဲ စာရင်းသွင်းတယ်။ အရှုံးပေးမယ့်အစား သူက ကျေးရွာတွေကို ကိုယ်တိုင်သွားပြီး လယ်သမားတွေရဲ့ တိုင်ကြားမှုတွေကို နားထောင်ကာ သူတို့အကြံပြုချက်အပေါ် အခြေခံပြီး အက်ပ်ကို ပြန်တည်ဆောက်တယ်။',
      th: 'หกเดือนแรกโหดร้าย แอปล่มตลอด และมีชาวนาแค่ยี่สิบคนสมัคร แทนที่จะยอมแพ้ เธอไปเยี่ยมหมู่บ้านด้วยตัวเอง ฟังข้อร้องเรียนของชาวนา และสร้างแอปใหม่ตามความคิดเห็นของพวกเขา',
    },
    {
      en: 'By the end of the year, five thousand farmers were using her platform, and their incomes had risen by thirty percent. Her former colleagues now ask her for business advice.',
      my: 'နှစ်အဆုံးမှာ လယ်သမားငါးထောင် သူ့ပလက်ဖောင်းကို သုံးနေပြီး သူတို့ဝင်ငွေတွေ သုံးဆယ်ရာခိုင်နှုန်း တက်လာတယ်။ အရင်လုပ်ဖော်ကိုင်ဖက်တွေက အခု စီးပွားရေးအကြံဉာဏ် သူ့ဆီ တောင်းကြတယ်။',
      th: 'ปลายปี ชาวนาห้าพันคนใช้แพลตฟอร์มของเธอ และรายได้ของพวกเขาเพิ่มขึ้นสามสิบเปอร์เซ็นต์ เพื่อนร่วมงานเก่าของเธอตอนนี้ขอคำแนะนำธุรกิจจากเธอ',
    },
    {
      en: 'Nay Chi\'s company now employs forty people, many of them young engineers who share her vision. She often tells them that the darkest months taught her the most valuable lessons.',
      my: 'နေခြည်ရဲ့ ကုမ္ပဏီမှာ အခု လူလေးဆယ် အလုပ်လုပ်နေပြီး အများစုက သူ့ရည်မှန်းချက်ကို မျှဝေတဲ့ အင်ဂျင်နီယာငယ်တွေ။ အမှောင်မိုက်ဆုံးလတွေက အဖိုးတန်ဆုံးသင်ခန်းစာတွေ သင်ပေးခဲ့တယ်လို့ သူတို့ကို မကြာခဏ ပြောတယ်။',
      th: 'บริษัทของเนจีตอนนี้จ้างคนสี่สิบคน ส่วนใหญ่เป็นวิศวกรหนุ่มสาวที่แบ่งปันวิสัยทัศน์ของเธอ เธอมักบอกพวกเขาว่าเดือนที่มืดมนที่สุดสอนบทเรียนที่มีค่าที่สุดให้เธอ',
    },
  ],
},
// key words: phone, repair, compare, price, screen
{
  id: 'story-f14-b2-9',
  level: 'B2',
  titleEn: 'The Broken Phone',
  titleMy: 'ကွဲသွားတဲ့ဖုန်း',
  titleTh: 'โทรศัพท์ที่แตก',
  paragraphs: [
    {
      en: 'Zaw Htet dropped his phone on the concrete floor, and the screen shattered into a spiderweb of cracks. Since he depended on his phone for work, he felt a wave of panic.',
      my: 'ဇော်ထက်က ဖုန်းကို ကွန်ကရစ်ကြမ်းပြင်ပေါ် လွတ်ကျပြီး screen က ပင့်ကူအိမ်လို အက်ကွဲသွားတယ်။ အလုပ်အတွက် ဖုန်းကို အားကိုးနေရလို့ ထိတ်လန့်မှုလှိုင်း ခံစားရတယ်။',
      th: 'ซอเท็ตทำโทรศัพท์ตกบนพื้นคอนกรีต และหน้าจอแตกเป็นใยแมงมุม เนื่องจากเขาพึ่งพาโทรศัพท์เพื่องาน เขารู้สึกตื่นตระหนก',
    },
    {
      en: 'The repair shop quoted a price that was almost half the cost of a new phone. He had to decide whether repairing the old phone was worth it, or whether buying a new one made more sense.',
      my: 'ပြုပြင်တဲ့ဆိုင်က ဖုန်းအသစ်ဈေးရဲ့ ထက်ဝက်နီးပါး ဈေးပြောတယ်။ ဖုန်းအဟောင်းကို ပြင်တာ တန်သလား၊ ဒါမှမဟုတ် အသစ်ဝယ်တာ ပိုအဓိပ္ပာယ်ရှိသလား ဆုံးဖြတ်ရတယ်။',
      th: 'ร้านซ่อมเสนอราคาที่เกือบครึ่งหนึ่งของราคาโทรศัพท์ใหม่ เขาต้องตัดสินใจว่าซ่อมโทรศัพท์เก่าคุ้มไหม หรือซื้อใหม่ดีกว่า',
    },
    {
      en: 'After comparing prices online, he discovered a certified repair shop that charged far less. He backed up all his data first, then handed over the phone with clear instructions.',
      my: 'အွန်လိုင်းမှာ ဈေးနှုန်းတွေ နှိုင်းယှဉ်ပြီးနောက် အများကြီးသက်သာတဲ့ အသိအမှတ်ပြုပြုပြင်ဆိုင်ကို တွေ့တယ်။ အချက်အလက်အားလုံးကို အရင် backup လုပ်ပြီး ရှင်းလင်းတဲ့ညွှန်ကြားချက်တွေနဲ့ ဖုန်းကို အပ်တယ်။',
      th: 'หลังเปรียบเทียบราคาออนไลน์ เขาพบร้านซ่อมที่ได้รับการรับรองที่คิดถูกกว่ามาก เขาสำรองข้อมูลทั้งหมดก่อน แล้วมอบโทรศัพท์พร้อมคำแนะนำที่ชัดเจน',
    },
    {
      en: 'Two hours later, the phone looked brand new. Zaw Htet learned to compare options carefully instead of accepting the first price he hears.',
      my: 'နှစ်နာရီအကြာမှာ ဖုန်းက အသစ်အတိုင်း ဖြစ်သွားတယ်။ ကြားရတဲ့ ပထမဈေးကို လက်ခံမယ့်အစား ရွေးချယ်စရာတွေကို သေချာနှိုင်းယှဉ်ဖို့ ဇော်ထက် သင်ယူခဲ့တယ်။',
      th: 'สองชั่วโมงต่อมา โทรศัพท์ดูเหมือนใหม่ ซอเท็ตเรียนรู้ที่จะเปรียบเทียบตัวเลือกอย่างรอบคอบแทนที่จะรับราคาแรกที่ได้ยิน',
    },
    {
      en: 'Zaw Htet now buys a strong protective case for every new phone he owns. He jokes that the cracked screen taught him an expensive lesson about being careful. He now always backs up his data every week without fail.',
      my: 'ဇော်ထက်က အခု ဖုန်းအသစ်တိုင်းအတွက် ခိုင်ခံ့တဲ့ကာဗာဝယ်တယ်။ အက်ကွဲတဲ့ screen က သတိထားဖို့အကြောင်း ဈေးကြီးတဲ့သင်ခန်းစာ သင်ပေးခဲ့တယ်လို့ နောက်ပြောင်တယ်။ သူက အခု အချက်အလက်တွေကို အပတ်တိုင်း မပျက်မကွက် backup လုပ်တယ်။',
      th: 'ซอเท็ตตอนนี้ซื้อเคสป้องกันที่แข็งแรงสำหรับโทรศัพท์ใหม่ทุกเครื่อง เขาล้อเล่นว่าหน้าจอที่แตกสอนบทเรียนราคาแพงเรื่องความระมัดระวังให้เขา ตอนนี้เขาสำรองข้อมูลทุกสัปดาห์โดยไม่ขาด',
    },
  ],
},
// key words: order, online, delivery, bank, lesson
{
  id: 'story-f14-b2-10',
  level: 'B2',
  titleEn: 'The Online Order',
  titleMy: 'အွန်လိုင်းအမှာစာ',
  titleTh: 'คำสั่งซื้อออนไลน์',
  paragraphs: [
    {
      en: 'Thandar ordered a winter jacket from an international website because the price was unbelievably low. She paid immediately, imagining how warm she would feel during her trip to the mountains.',
      my: 'သန္ဒာက ဈေးက မယုံနိုင်လောက်အောင် သက်သာလို့ နိုင်ငံတကာဝက်ဘ်ဆိုက်ကနေ ဆောင်းအင်္ကျီတစ်ထည် မှာတယ်။ တောင်ခရီးမှာ ဘယ်လောက်နွေးမလဲဆိုတာ စိတ်ကူးပြီး ချက်ချင်းငွေပေးတယ်။',
      th: 'ตันดาร์สั่งเสื้อแจ็กเก็ตหน้าหนาวจากเว็บไซต์ระหว่างประเทศเพราะราคาถูกอย่างไม่น่าเชื่อ เธอจ่ายเงินทันที จินตนาการว่าเธอจะอบอุ่นแค่ไหนระหว่างทริปไปภูเขา',
    },
    {
      en: 'Three weeks passed with no delivery. When she contacted customer service, they replied with vague promises that the package was on its way.',
      my: 'သုံးပတ် ကုန်သွားပေမယ့် ပို့ဆောင်မှု မရှိဘူး။ ဖောက်သည်ဝန်ဆောင်မှုကို ဆက်သွယ်တဲ့အခါ ပစ္စည်းက လမ်းမှာ ရှိတယ်ဆိုတဲ့ မရေရာတဲ့ ကတိတွေနဲ့ ပြန်ဖြေတယ်။',
      th: 'สามสัปดาห์ผ่านไปโดยไม่มีการจัดส่ง เมื่อเธอติดต่อฝ่ายบริการลูกค้า พวกเขาตอบด้วยสัญญาคลุมเครือว่าพัสดุกำลังมา',
    },
    {
      en: 'Suspicious, she researched the website and found dozens of complaints from other buyers. She immediately contacted her bank to dispute the payment.',
      my: 'သံသယဖြစ်ပြီး ဝက်ဘ်ဆိုက်ကို သုတေသနလုပ်ကြည့်တော့ တခြားဝယ်သူတွေရဲ့ တိုင်ကြားမှုတွေ များစွာ တွေ့တယ်။ ငွေပေးချေမှုကို အငြင်းပွားဖို့ ဘဏ်ကို ချက်ချင်းဆက်သွယ်တယ်။',
      th: 'สงสัย เธอค้นคว้าเว็บไซต์และพบข้อร้องเรียนหลายสิบจากผู้ซื้อคนอื่น เธอติดต่อธนาคารทันทีเพื่อโต้แย้งการชำระเงิน',
    },
    {
      en: 'The bank reversed the charge within ten days. Thandar learned a valuable lesson: if a deal looks too good to be true, it probably is.',
      my: 'ဘဏ်က ဆယ်ရက်အတွင်း ငွေကို ပြန်လှည့်ပေးတယ်။ ကမ်းလှမ်းချက်က တကယ်ဖြစ်နိုင်တာထက် ကောင်းလွန်းနေရင် ဖြစ်နိုင်ခြေများတာက မဟုတ်ဘူးဆိုတဲ့ အဖိုးတန်သင်ခန်းစာ သန္ဒာ သင်ယူခဲ့တယ်။',
      th: 'ธนาคารย้อนกลับการเรียกเก็บเงินภายในสิบวัน ตันดาร์เรียนรู้บทเรียนมีค่า ถ้าข้อเสนอดีเกินจริง มันอาจไม่จริง',
    },
    {
      en: 'Thandar now checks reviews carefully before buying anything online. She also tells her friends to use payment methods that offer buyer protection. Her friends now always ask her for wise advice before shopping online, and she happily shares everything she learned from the difficult experience.',
      my: 'သန္ဒာက အခု အွန်လိုင်းက တစ်ခုခုမဝယ်ခင် review တွေကို သေချာစစ်တယ်။ ဝယ်သူအကာအကွယ်ပေးတဲ့ ငွေပေးချေမှုနည်းတွေ သုံးဖို့ သူငယ်ချင်းတွေကိုလည်း ပြောတယ်။ သူ့သူငယ်ချင်းတွေက အခု အွန်လိုင်းဈေးမဝယ်ခင် သူ့အကြံကို တောင်းပြီး အတွေ့အကြုံက သင်ယူခဲ့သမျှကို သူ ဝမ်းသာအားရ မျှဝေတယ်။',
      th: 'ตันดาร์ตอนนี้ตรวจรีวิวอย่างละเอียดก่อนซื้ออะไรออนไลน์ เธอยังบอกเพื่อนให้ใช้วิธีชำระเงินที่มีการคุ้มครองผู้ซื้อ เพื่อนของเธอตอนนี้มักขอคำแนะนำที่ชาญฉลาดจากเธอก่อนช้อปปิ้งออนไลน์ และเธอแบ่งปันทุกสิ่งที่เรียนรู้จากประสบการณ์ยากอย่างยินดี',
    },
    {
      en: 'The lost weeks were frustrating, but the lesson was permanent: on the internet, patience is cheaper than regret.',
      my: 'ဆုံးရှုံးသွားတဲ့ အပတ်တွေက စိတ်ပျက်စရာဖြစ်ပေမယ့် ရခဲ့တဲ့သင်ခန်းစာက ထာဝရတည်တံ့တယ် — အွန်လိုင်းမှာ စိတ်ရှည်ခြင်းက နောင်တရခြင်းထက် ဈေးသက်သာတယ်ဆိုတာ သန္ဒာ သင်ယူခဲ့တယ်။',
      th: 'สัปดาห์ที่สูญเสียไปน่าหงุดหงิด แต่บทเรียนถาวร บนอินเทอร์เน็ต ความอดทนถูกกว่าความเสียใจ',
    },
  ],
},
// key words: scam, message, bank, warn, social
{
  id: 'story-f14-b2-11',
  level: 'B2',
  titleEn: 'The Scam Message',
  titleMy: 'လိမ်လည်တဲ့မက်ဆေ့ချ်',
  titleTh: 'ข้อความหลอกลวง',
  paragraphs: [
    {
      en: 'One evening, Aye received a text message claiming she had won a large cash prize. All she had to do was click a link and enter her bank details.',
      my: 'တစ်ညမှာ အေးက ငွေသားဆုကြီး ပေါက်တယ်ဆိုတဲ့ စာတိုမက်ဆေ့ချ် ရတယ်။ လုပ်ရမှာက link တစ်ခုကို နှိပ်ပြီး ဘဏ်အချက်အလက်တွေ ထည့်ယုံပဲ။',
      th: 'เย็นวันหนึ่ง เอได้รับข้อความอ้างว่าเธอถูกรางวัลเงินสดก้อนใหญ่ สิ่งที่เธอต้องทำคือคลิกลิงก์และกรอกรายละเอียดธนาคาร',
    },
    {
      en: 'Although the message looked official, with logos and formal language, something felt wrong. She remembered her brother\'s warning about online scams.',
      my: 'မက်ဆေ့ချ်က လိုဂိုတွေနဲ့ တရားဝင်ဘာသာစကားနဲ့ တရားဝင်ပုံရပေမယ့် တစ်ခုခု မှားနေသလို ခံစားရတယ်။ အွန်လိုင်းလိမ်လည်မှုတွေအကြောင်း အစ်ကိုရဲ့ သတိပေးချက်ကို သတိရတယ်။',
      th: 'แม้ข้อความดูเป็นทางการ มีโลโก้และภาษาทางการ แต่มีบางอย่างรู้สึกผิด เธอจำคำเตือนของพี่ชายเรื่องการหลอกลวงออนไลน์ได้',
    },
    {
      en: 'Instead of clicking, she called the company\'s official hotline. The agent confirmed it was a scam and thanked her for reporting it.',
      my: 'နှိပ်မယ့်အစား သူက ကုမ္ပဏီရဲ့ တရားဝင်ဟော့လိုင်းကို ဖုန်းဆက်တယ်။ ဝန်ထမ်းက လိမ်လည်မှုဖြစ်ကြောင်း အတည်ပြုပြီး တိုင်ကြားတဲ့အတွက် ကျေးဇူးတင်တယ်။',
      th: 'แทนที่จะคลิก เธอโทรไปที่สายด่วนทางการของบริษัท พนักงานยืนยันว่าเป็นการหลอกลวงและขอบคุณเธอที่รายงาน',
    },
    {
      en: 'Aye shared her experience on social media to warn others. Her post was shared thousands of times, possibly saving many people from losing money.',
      my: 'အေးက တခြားသူတွေကို သတိပေးဖို့ အတွေ့အကြုံကို ဆိုရှယ်မီဒီယာမှာ မျှဝေတယ်။ သူ့ပို့စ်ကို ထောင်ပေါင်းများစွာ မျှဝေကြပြီး လူများစွာ ငွေမဆုံးရှုံးအောင် ကယ်နိုင်တယ်။',
      th: 'เอแบ่งปันประสบการณ์บนโซเชียลมีเดียเพื่อเตือนคนอื่น โพสต์ของเธอถูกแชร์หลายพันครั้ง อาจช่วยหลายคนไม่ให้เสียเงิน',
    },
    {
      en: 'The police later caught the criminals behind the scam messages. Aye felt proud that her small action had helped protect many strangers. She now volunteers at a community center, patiently teaching elderly people how to recognize dangerous scams and carefully protect their valuable personal information.',
      my: 'ရဲက နောက်ပိုင်း လိမ်လည်မက်ဆေ့ချ်နောက်က ရာဇဝတ်သားတွေကို ဖမ်းတယ်။ သူ့လုပ်ရပ်သေးသေးလေးက လူစိမ်းများစွာကို ကာကွယ်ဖို့ ကူညီခဲ့လို့ အေး ဂုဏ်ယူတယ်။ သူက အခု ရပ်ရွာစင်တာမှာ စေတနာ့ဝန်ထမ်းလုပ်ပြီး သက်ကြီးရွယ်အိုတွေကို လိမ်လည်မှုတွေ ဘယ်လိုသိမလဲ၊ ကိုယ်ပိုင်အချက်အလက်တွေ ဘယ်လိုကာကွယ်မလဲဆိုတာ သင်ပေးတယ်။',
      th: 'ตำรวจจับอาชญากรเบื้องหลังข้อความหลอกลวงได้ในภายหลัง เอรู้สึกภูมิใจที่การกระทำเล็ก ๆ ของเธอช่วยปกป้องคนแปลกหน้าหลายคน ตอนนี้เธออาสาที่ศูนย์ชุมชน สอนผู้สูงอายุอย่างอดทนให้รู้จักการหลอกลวงอันตรายและปกป้องข้อมูลส่วนบุคคลที่มีค่าอย่างระมัดระวัง',
    },
    {
      en: 'One careful phone call had turned a trap into a triumph — proof that a moment of doubt is worth more than a lifetime of regret.',
      my: 'သတိထားပြီး ဖုန်းတစ်ခါဆက်လိုက်တာက ထောင်ချောက်ကို အောင်ပွဲအဖြစ် ပြောင်းလဲပေးခဲ့တယ် — သံသယတစ်ခဏတာက တစ်သက်တာနောင်တထက် တန်ဖိုးရှိတယ်ဆိုတဲ့ သက်သေပါပဲ။',
      th: 'โทรศัพท์ที่ระมัดระวังเพียงสายเดียวเปลี่ยนกับดักให้เป็นชัยชนะ — หลักฐานว่าความสงสัยชั่วขณะมีค่ามากกว่าความเสียใจตลอดชีวิต',
    },
  ],
},
// key words: video, call, technology, family, comfort
{
  id: 'story-f14-b2-12',
  level: 'B2',
  titleEn: 'The Video Call',
  titleMy: 'ဗီဒီယိုခေါ်ဆိုမှု',
  titleTh: 'การโทรแบบวิดีโอ',
  paragraphs: [
    {
      en: 'Daw Myint had not seen her son for two years because he worked in Japan. When he suggested a video call, she was nervous about the technology.',
      my: 'ဒေါ်မြင့်က သားက ဂျပန်မှာ အလုပ်လုပ်လို့ နှစ်နှစ်ရှိပြီ မတွေ့ရဘူး။ ဗီဒီယိုခေါ်ဖို့ သူက အကြံပေးတဲ့အခါ နည်းပညာအကြောင်း စိုးရိမ်တယ်။',
      th: 'ดอมิ้นท์ไม่ได้เห็นลูกชายมาสองปีเพราะเขาทำงานที่ญี่ปุ่น เมื่อเขาเสนอการโทรแบบวิดีโอ เธอกังวลเรื่องเทคโนโลยี',
    },
    {
      en: 'Her granddaughter patiently taught her to use the app, showing her which button to press. After three practice calls, Daw Myint felt ready.',
      my: 'သူ့မြေးမလေးက စိတ်ရှည်ရှည်နဲ့ အက်ပ်သုံးဖို့ သင်ပေးပြီး ဘယ်ခလုတ်နှိပ်ရမလဲဆိုတာ ပြတယ်။ သုံးကြိမ် လေ့ကျင့်ခေါ်ပြီးနောက် ဒေါ်မြင့် အဆင်သင့်ဖြစ်သွားတယ်။',
      th: 'หลานสาวสอนเธอใช้แอปอย่างอดทน แสดงว่าต้องกดปุ่มไหน หลังฝึกโทรสามครั้ง ดอมิ้นท์รู้สึกพร้อม',
    },
    {
      en: 'When her son\'s face appeared on the screen, tears of joy rolled down her cheeks. They talked for over an hour about his life in Tokyo.',
      my: 'သားရဲ့မျက်နှာက screen ပေါ် ပေါ်လာတဲ့အခါ ဝမ်းသာမျက်ရည်တွေ ပါးပြင်ပေါ် စီးကျလာတယ်။ တိုကျိုက သူ့ဘဝအကြောင်း တစ်နာရီကျော် စကားပြောကြတယ်။',
      th: 'เมื่อใบหน้าของลูกชายปรากฏบนหน้าจอ น้ำตาแห่งความสุขไหลลงแก้มของเธอ พวกเขาคุยกันกว่าหนึ่งชั่วโมงเรื่องชีวิตของเขาในโตเกียว',
    },
    {
      en: 'Now they call every Sunday evening. Daw Myint tells her friends that technology, once frightening, has become her greatest comfort.',
      my: 'အခု တနင်္ဂနွေညနေတိုင်း ဖုန်းခေါ်ကြတယ်။ တစ်ချိန်က ကြောက်စရာကောင်းတဲ့ နည်းပညာက အခု အကြီးမားဆုံး နှစ်သိမ့်မှုဖြစ်လာပြီလို့ ဒေါ်မြင့်က သူငယ်ချင်းတွေကို ပြောတယ်။',
      th: 'ตอนนี้พวกเขาโทรทุกเย็นวันอาทิตย์ ดอมิ้นท์บอกเพื่อนว่าเทคโนโลยีที่เคยน่ากลัว กลายเป็นความสบายใจที่ยิ่งใหญ่ที่สุดของเธอ',
    },
    {
      en: 'Daw Myint\'s story inspired several elderly neighbors to learn video calling too. Now the whole street gathers online every festival to celebrate together. Her son calls more often now, knowing how much these conversations mean to his mother, and their loving bond has never been stronger than it is today.',
      my: 'ဒေါ်မြင့်ရဲ့ ဇာတ်လမ်းက သက်ကြီးအိမ်နီးချင်းတော်တော်များများကို ဗီဒီယိုခေါ်ဖို့ သင်ယူဖို့ အားကျစေတယ်။ အခု လမ်းတစ်ခုလုံး ပွဲတော်တိုင်း အွန်လိုင်းမှာ စုဝေးပြီး အတူတူ ကျင်းပတယ်။ သားက ဒီစကားဝိုင်းတွေက အမေအတွက် ဘယ်လောက်အဓိပ္ပာယ်ရှိလဲဆိုတာ သိလို့ အခု ပိုမကြာခဏ ဖုန်းခေါ်တယ်၊ သူတို့ရဲ့ နှောင်ကြိုးက ဘယ်တုန်းကမှ ဒီလောက်မခိုင်မာခဲ့ဘူး။',
      th: 'เรื่องราวของดอมิ้นท์สร้างแรงบันดาลใจให้เพื่อนบ้านสูงอายุหลายคนเรียนรู้การโทรแบบวิดีโอด้วย ตอนนี้ทั้งถนนมารวมตัวกันออนไลน์ทุกเทศกาลเพื่อฉลองด้วยกัน ลูกชายของเธอโทรบ่อยขึ้นตอนนี้ รู้ว่าบทสนทนาเหล่านี้มีความหมายกับแม่แค่ไหน และสายสัมพันธ์อันอบอุ่นของพวกเขาไม่เคยแข็งแกร่งเท่าวันนี้',
    },
    {
      en: 'Distance had separated them for years, but a small screen now brought them together every Sunday — proof that love travels farther than any road.',
      my: 'အကွာအဝေးက သူတို့ကို နှစ်ပေါင်းများစွာ ခွဲထားခဲ့ပေမယ့် အခု စခရင်သေးသေးလေးက တနင်္ဂနွေတိုင်း သူတို့ကို ပြန်ဆုံစေတယ် — ချစ်ခြင်းမေတ္တာက ဘယ်လမ်းထက်မဆို ပိုဝေးဝေး ခရီးသွားနိုင်တယ်ဆိုတဲ့ သက်သေပါပဲ။',
      th: 'ระยะทางแยกพวกเขามาหลายปี แต่หน้าจอเล็ก ๆ ตอนนี้นำพวกเขามาอยู่ด้วยกันทุกวันอาทิตย์ — หลักฐานว่าความรักเดินทางไกลกว่าถนนใด ๆ',
    },
  ],
},
// key words: password, email, forget, recover, identity
{
  id: 'story-f14-b2-13',
  level: 'B2',
  titleEn: 'The Lost Password',
  titleMy: 'ပျောက်ဆုံးသွားတဲ့စကားဝှက်',
  titleTh: 'รหัสผ่านที่หายไป',
  paragraphs: [
    {
      en: 'Min Khant could not access his email because he had forgotten the password, and the recovery phone number was an old one he no longer used.',
      my: 'မင်းခန့်က စကားဝှက်မေ့သွားလို့ အီးမေးလ် ဝင်မရဘူး၊ ပြန်လည်ရယူဖို့ ဖုန်းနံပါတ်ကလည်း မသုံးတော့တဲ့ အဟောင်းဖြစ်နေတယ်။',
      th: 'มินคานต์เข้าใช้อีเมลไม่ได้เพราะลืมรหัสผ่าน และเบอร์โทรสำหรับกู้คืนเป็นเบอร์เก่าที่เขาไม่ใช้แล้ว',
    },
    {
      en: 'This was a serious problem because all his job applications and university documents were in that inbox. He felt helpless and frustrated.',
      my: 'အလုပ်လျှောက်လွှာတွေနဲ့ တက္ကသိုလ်စာရွက်စာတမ်းအားလုံး အဲဒီ inbox ထဲမှာ ရှိလို့ ပြဿနာကြီးတယ်။ သူ အကူအညီမဲ့ပြီး စိတ်ပျက်နေတယ်။',
      th: 'นี่เป็นปัญหาใหญ่เพราะใบสมัครงานและเอกสารมหาวิทยาลัยทั้งหมดอยู่ในกล่องจดหมายนั้น เขารู้สึกหมดหนทางและหงุดหงิด',
    },
    {
      en: 'After searching online, he found the account recovery form and filled it in with as much detail as he could remember, including the year he created the account.',
      my: 'အွန်လိုင်းမှာ ရှာပြီးနောက် အကောင့်ပြန်လည်ရယူတဲ့ဖောင်ကို တွေ့ပြီး မှတ်မိသလောက် အသေးစိတ်ဖြည့်တယ်၊ အကောင့်စဖွင့်တဲ့နှစ်လည်း ပါဝင်တယ်။',
      th: 'หลังค้นหาออนไลน์ เขาพบแบบฟอร์มกู้คืนบัญชีและกรอกอย่างละเอียดเท่าที่จำได้ รวมถึงปีที่เขาสร้างบัญชี',
    },
    {
      en: 'Two days later, the company verified his identity and restored his access. He immediately set up two-factor authentication and wrote down his new password safely.',
      my: 'နှစ်ရက်အကြာမှာ ကုမ္ပဏီက သူ့အထောက်အထားကို အတည်ပြုပြီး ဝင်ရောက်ခွင့်ကို ပြန်ပေးတယ်။ ချက်ချင်း two-factor authentication သတ်မှတ်ပြီး စကားဝှက်အသစ်ကို လုံခြုံစွာ ရေးမှတ်ထားတယ်။',
      th: 'สองวันต่อมา บริษัทยืนยันตัวตนของเขาและคืนการเข้าถึงให้เขา เขาตั้งค่าการยืนยันตัวตนสองชั้นทันทีและจดรหัสผ่านใหม่ไว้อย่างปลอดภัย',
    },
    {
      en: 'Min Khant now helps his friends secure their accounts, teaching them about strong passwords and backup codes. He says losing access once was enough to learn forever. He wrote a short guide for his classmates explaining each recovery step clearly, and his kind teacher warmly praised his generous helpful spirit.',
      my: 'မင်းခန့်က အခု သူငယ်ချင်းတွေကို အကောင့်တွေ လုံခြုံအောင် ကူညီပြီး ခိုင်ခံ့တဲ့စကားဝှက်တွေနဲ့ backup ကုဒ်တွေအကြောင်း သင်ပေးတယ်။ တစ်ကြိမ်ဝင်ရောက်ခွင့် ဆုံးရှုံးတာက ထာဝရသင်ယူဖို့ လုံလောက်ပြီလို့ ပြောတယ်။ သူက အတန်းဖော်တွေအတွက် ပြန်လည်ရယူတဲ့အဆင့်တိုင်းကို ရှင်းရှင်းလင်းလင်း ရှင်းပြတဲ့ လမ်းညွှန်တိုလေး ရေးပြီး ဆရာက သူ့အကူအညီပေးတဲ့စိတ်ကို ချီးကျူးတယ်။',
      th: 'มินคานต์ตอนนี้ช่วยเพื่อนรักษาความปลอดภัยบัญชี สอนพวกเขาเรื่องรหัสผ่านที่แข็งแรงและรหัสสำรอง เขาบอกว่าการเสียการเข้าถึงครั้งเดียวพอที่จะเรียนรู้ตลอดไป เขาเขียนคู่มือสั้น ๆ ให้เพื่อนร่วมชั้นอธิบายแต่ละขั้นตอนการกู้คืนอย่างชัดเจน และครูใจดีของเขาชมจิตวิญญาณช่วยเหลือที่เอื้อเฟื้อของเขา',
    },
  ],
},
// key words: flood, road, boat, village, community
{
  id: 'story-f14-b2-14',
  level: 'B2',
  titleEn: 'The Flooded Road',
  titleMy: 'ရေကြီးနေတဲ့လမ်း',
  titleTh: 'ถนนที่น้ำท่วม',
  paragraphs: [
    {
      en: 'After three days of heavy rain, the main road to Hla\'s village was completely flooded. No cars or motorbikes could pass through the deep water.',
      my: 'မိုးသည်းထန်စွာ သုံးရက်ရွာပြီးနောက် လှရဲ့ ရွာကို သွားတဲ့ အဓိကလမ်းက လုံးဝရေကြီးသွားတယ်။ ကားတွေ ဆိုင်ကယ်တွေ ရေနက်ထဲ ဖြတ်မရဘူး။',
      th: 'หลังฝนตกหนักสามวัน ถนนหลักไปหมู่บ้านของฮลาน้ำท่วมหมด รถยนต์หรือมอเตอร์ไซค์ผ่านน้ำลึกไม่ได้',
    },
    {
      en: 'Hla needed to reach the town clinic because her grandmother\'s medicine had run out. Waiting for the water to go down was not an option.',
      my: 'အဖွားရဲ့ ဆေးကုန်သွားလို့ လှက မြို့ဆေးခန်းကို ရောက်ဖို့လိုတယ်။ ရေကျဖို့ စောင့်တာက ရွေးချယ်စရာ မဟုတ်ဘူး။',
      th: 'ฮลาต้องไปคลินิกในเมืองเพราะยาของยายหมด การรอให้น้ำลดไม่ใช่ทางเลือก',
    },
    {
      en: 'A neighbor offered his small wooden boat, and together they rowed through the flooded streets. The journey that usually took twenty minutes lasted two hours.',
      my: 'အိမ်နီးချင်းတစ်ယောက်က သစ်သားလှေသေးသေးလေး ပေးပြီး အတူတူ ရေကြီးနေတဲ့လမ်းတွေကို လှော်ခတ်ကြတယ်။ ပုံမှန်မိနစ်နှစ်ဆယ်ကြာတဲ့ ခရီးက နှစ်နာရီ ကြာသွားတယ်။',
      th: 'เพื่อนบ้านเสนอเรือไม้เล็กของเขา และพวกเขาพายด้วยกันผ่านถนนที่น้ำท่วม การเดินทางที่ปกติใช้ยี่สิบนาทีใช้เวลาสองชั่วโมง',
    },
    {
      en: 'At the clinic, the doctor gave them extra medicine for the whole village. On the way back, Hla realized how strong community spirit can overcome any obstacle.',
      my: 'ဆေးခန်းမှာ ဆရာဝန်က ရွာတစ်ခုလုံးအတွက် ဆေးအပိုပေးတယ်။ အပြန်လမ်းမှာ ရပ်ရွာစိတ်ဓာတ်ခိုင်မာမှုက အတားအဆီးမှန်သမျှကို ကျော်လွှားနိုင်တယ်ဆိုတာ လှ သဘောပေါက်တယ်။',
      th: 'ที่คลินิก หมอให้ยาเพิ่มสำหรับทั้งหมู่บ้าน ระหว่างทางกลับ ฮลาตระหนักว่าจิตวิญญาณชุมชนที่แข็งแกร่งเอาชนะอุปสรรคใด ๆ ได้',
    },
    {
      en: 'The village built a small bridge over the flooded area after that experience. Hla\'s grandmother recovered fully, and the whole village celebrated with a feast. Children in the village now learn about flood safety at school, so they will be fully prepared if the dangerous waters ever rise again.',
      my: 'အဲဒီအတွေ့အကြုံအပြီး ရွာက ရေကြီးတဲ့နေရာမှာ တံတားသေးသေးလေး ဆောက်တယ်။ လှရဲ့အဖွား လုံးဝပြန်ကောင်းသွားပြီး ရွာတစ်ခုလုံး ပွဲတော်နဲ့ အောင်ပွဲခံတယ်။ ရွာက ကလေးတွေက အခု ကျောင်းမှာ ရေဘေးကင်းလုံခြုံမှုအကြောင်း သင်ယူပြီး ရေပြန်တက်လာရင် အဆင်သင့်ဖြစ်မယ်။',
      th: 'หมู่บ้านสร้างสะพานเล็กข้ามบริเวณที่น้ำท่วมหลังประสบการณ์นั้น ยายของฮลาหายดีสมบูรณ์ และทั้งหมู่บ้านฉลองด้วยงานเลี้ยง เด็ก ๆ ในหมู่บ้านตอนนี้เรียนรู้เรื่องความปลอดภัยน้ำท่วมที่โรงเรียน เพื่อพร้อมเต็มที่ถ้าน้ำอันตรายขึ้นอีก',
    },
  ],
},
// key words: mountain, trek, summit, guide, sunrise
{
  id: 'story-f14-b2-15',
  level: 'B2',
  titleEn: 'The Mountain Trek',
  titleMy: 'တောင်တက်ခရီး',
  titleTh: 'การเดินป่าขึ้นเขา',
  paragraphs: [
    {
      en: 'For her thirtieth birthday, Chaw decided to do something unforgettable: trek to the summit of a mountain she had admired since childhood.',
      my: 'ချောက အသက်သုံးဆယ်ပြည့်မွေးနေ့အတွက် မမေ့နိုင်စရာတစ်ခုလုပ်ဖို့ ဆုံးဖြတ်တယ်။ ငယ်စဉ်ကတည်းက သဘောကျခဲ့တဲ့ တောင်ထိပ်ကို တက်ဖို့ပါ။',
      th: 'สำหรับวันเกิดอายุสามสิบ ชอตัดสินใจทำสิ่งที่น่าจดจำ นั่นคือเดินป่าขึ้นยอดเขาที่เธอชื่นชมตั้งแต่เด็ก',
    },
    {
      en: 'The first day was pleasant, with cool air and beautiful views. However, on the second day, the trail became steep, and her legs began to ache badly.',
      my: 'ပထမနေ့က လေအေးအေးနဲ့ ရှုခင်းလှလှနဲ့ သာယာတယ်။ ဒါပေမယ့် ဒုတိယနေ့မှာ လမ်းက မတ်စောက်လာပြီး ခြေထောက်တွေ အရမ်းနာလာတယ်။',
      th: 'วันแรกน่ารื่นรมย์ มีอากาศเย็นและวิวสวย แต่ในวันที่สอง เส้นทางชัน และขาของเธอเริ่มปวดมาก',
    },
    {
      en: 'Her guide encouraged her to take small steps and rest often. He told her that reaching the top slowly is better than giving up quickly.',
      my: 'သူ့ဧည့်လမ်းညွှန်က ခြေလှမ်းသေးသေးလေးတွေ လှမ်းပြီး မကြာခဏနားဖို့ အားပေးတယ်။ ဖြည်းဖြည်းချင်း ထိပ်ရောက်တာက မြန်မြန်အရှုံးပေးတာထက် ပိုကောင်းတယ်လို့ ပြောတယ်။',
      th: 'ไกด์ของเธอให้กำลังใจให้เธอก้าวเล็ก ๆ และพักบ่อย ๆ เขาบอกเธอว่าการไปถึงยอดช้า ๆ ดีกว่ายอมแพ้เร็ว',
    },
    {
      en: 'At sunrise on the third day, she stood at the summit, watching clouds drift below her feet. Every painful step had been worth it.',
      my: 'တတိယနေ့ နေထွက်ချိန်မှာ သူ ထိပ်မှာ ရပ်ပြီး ခြေဖဝါးအောက်မှာ တိမ်တွေ မျောနေတာ ကြည့်တယ်။ နာကျင်တဲ့ ခြေလှမ်းတိုင်းက တန်ခဲ့တယ်။',
      th: 'ตอนพระอาทิตย์ขึ้นในวันที่สาม เธอยืนบนยอดเขา มองเมฆลอยใต้เท้าของเธอ ทุกก้าวที่เจ็บปวดคุ้มค่า',
    },
    {
      en: 'Chaw now leads a small hiking group every month, encouraging beginners to try mountain trails. She believes the mountain taught her that limits exist only in the mind. She framed a photo from the summit and hung it in her living room, where it reminds her daily that she is much stronger and braver than she ever imagined possible.',
      my: 'ချောက အခု လတိုင်း တောင်တက်အဖွဲ့သေးသေးလေး ဦးဆောင်ပြီး အစပြုသူတွေကို တောင်လမ်းတွေ စမ်းဖို့ အားပေးတယ်။ ကန့်သတ်ချက်တွေက စိတ်ထဲမှာပဲ ရှိတယ်ဆိုတာ တောင်က သူ့ကို သင်ပေးခဲ့တယ်လို့ ယုံကြည်တယ်။ သူက ထိပ်က ဓာတ်ပုံကို ဘောင်ခတ်ပြီး ဧည့်ခန်းမှာ ချိတ်တယ်၊ အဲဒါက သူ ထင်ထားတာထက် ပိုသန်မာတယ်ဆိုတာ နေ့တိုင်း သတိပေးတယ်။',
      th: 'ชอนำกลุ่มเดินป่าเล็กทุกเดือน ให้กำลังใจมือใหม่ให้ลองเส้นทางภูเขา เธอเชื่อว่าภูเขาสอนเธอว่าขีดจำกัดมีอยู่แค่ในใจ เธอใส่กรอบรูปจากยอดเขาและแขวนในห้องนั่งเล่น ซึ่งเตือนเธอทุกวันว่าเธอแข็งแกร่งและกล้าหาญกว่าที่เธอเคยจินตนาการ',
    },
  ],
},
// key words: river, boat, journey, village, festival
{
  id: 'story-f14-b1-24',
  level: 'B1',
  titleEn: 'The River Journey',
  titleMy: 'မြစ်ခရီးစဉ်',
  titleTh: 'การเดินทางทางแม่น้ำ',
  paragraphs: [
    {
      en: 'Every year during the water festival, Ko Aung travels by boat along the great river to visit his family. The journey takes two days.',
      my: 'ရေသဘင်ပွဲတိုင်း ကိုအောင်က မိသားစုကို သွားလည်ဖို့ မြစ်ကြီးတစ်လျှောက် လှေနဲ့ ခရီးသွားတယ်။ ခရီးက နှစ်ရက် ကြာတယ်။',
      th: 'ทุกปีในช่วงเทศกาลน้ำ โกอองเดินทางโดยเรือตามแม่น้ำใหญ่ไปเยี่ยมครอบครัว การเดินทางใช้เวลาสองวัน',
    },
    {
      en: 'This year, he invited his young son to join him. The boy had never been on a long boat trip, and his eyes were wide with excitement.',
      my: 'ဒီနှစ် သူက သားငယ်ကို အတူ လိုက်ဖို့ ဖိတ်တယ်။ ကောင်လေးက လှေခရီးရှည် တစ်ခါမှ မစီးဖူးဘူး၊ စိတ်လှုပ်ရှားမှုနဲ့ မျက်လုံးတွေ ပြူးနေတယ်။',
      th: 'ปีนี้ เขาชวนลูกชายหนุ่มมาร่วมด้วย เด็กชายไม่เคยเดินทางโดยเรือนาน และตาของเขาเบิกกว้างด้วยความตื่นเต้น',
    },
    {
      en: 'During the trip, Ko Aung taught his son the names of the villages along the river. They ate fish curry cooked on the boat.',
      my: 'ခရီးအတွင်း ကိုအောင်က သားကို မြစ်ကမ်းက ရွာတွေရဲ့ နာမည်တွေ သင်ပေးတယ်။ လှေပေါ်မှာ ချက်တဲ့ ငါးဟင်းကို စားကြတယ်။',
      th: 'ระหว่างทริป โกอองสอนลูกชายชื่อหมู่บ้านตามแม่น้ำ พวกเขากินแกงปลาที่ปรุงบนเรือ',
    },
    {
      en: 'At night, they slept on the deck under the stars. The boy said it was the best night of his life.',
      my: 'ညဘက်မှာ ကြယ်တွေအောက် ကုန်းပတ်ပေါ်မှာ အိပ်ကြတယ်။ ကောင်လေးက သူ့ဘဝရဲ့ အကောင်းဆုံးညလို့ ပြောတယ်။',
      th: 'ตอนกลางคืน พวกเขานอนบนดาดฟ้าใต้ดวงดาว เด็กชายบอกว่าเป็นคืนที่ดีที่สุดในชีวิตของเขา',
    },
    {
      en: 'When they arrived, the whole family was waiting at the jetty. Ko Aung knew his son would remember this journey forever.',
      my: 'ရောက်တဲ့အခါ မိသားစုတစ်ခုလုံး ဆိပ်ကမ်းမှာ စောင့်နေတယ်။ ဒီခရီးကို သားက ထာဝရမှတ်မိနေမယ်ဆိုတာ ကိုအောင် သိတယ်။',
      th: 'เมื่อมาถึง ครอบครัวทั้งหมดรออยู่ที่ท่าเรือ โกอองรู้ว่าลูกชายจะจำการเดินทางนี้ตลอดไป',
    },
    {
      en: 'Years later, the boy still talks about that boat journey with shining eyes. He says it taught him more about his country than any book ever could. The excited boy now truly wants to become a professional boat captain when he grows up one day.',
      my: 'နှစ်တွေကြာပြီးနောက် ကောင်လေးက အဲဒီလှေခရီးအကြောင်း မျက်လုံးတွေ တောက်ပစွာ ပြောတုန်းပဲ။ စာအုပ်တစ်အုပ်ကမှ မသင်ပေးနိုင်တဲ့ တိုင်းပြည်အကြောင်း သူ့ကို သင်ပေးခဲ့တယ်လို့ ပြောတယ်။ ကောင်လေးက အခု ကြီးလာရင် လှေကပ္ပတိန်ဖြစ်ချင်တယ်။',
      th: 'หลายปีต่อมา เด็กชายยังพูดถึงการเดินทางโดยเรือนั้นด้วยตาที่เป็นประกาย เขาบอกว่ามันสอนเขาเรื่องประเทศของเขามากกว่าหนังสือเล่มใด เด็กชายที่ตื่นเต้นตอนนี้อยากเป็นกัปตันเรือมืออาชีพเมื่อโตขึ้น',
    },
  ],
},
// key words: island, beach, holiday, seafood, family
{
  id: 'story-f14-b1-25',
  level: 'B1',
  titleEn: 'The Island Holiday',
  titleMy: 'ကျွန်းအားလပ်ရက်',
  titleTh: 'วันหยุดบนเกาะ',
  paragraphs: [
    {
      en: 'After working hard for a whole year, the family decided to spend five days on a small tropical island.',
      my: 'တစ်နှစ်လုံး ကြိုးကြိုးစားစား အလုပ်လုပ်ပြီးနောက် မိသားစုက အပူပိုင်းကျွန်းသေးသေးလေးမှာ ငါးရက် အနားယူဖို့ ဆုံးဖြတ်တယ်။',
      th: 'หลังทำงานหนักมาทั้งปี ครอบครัวตัดสินใจใช้เวลาห้าวันบนเกาะเขตร้อนเล็ก ๆ',
    },
    {
      en: 'The children ran to the beach as soon as they arrived. The sand was white, and the water was clear and warm.',
      my: 'ကလေးတွေက ရောက်တာနဲ့ ကမ်းခြေကို ပြေးသွားတယ်။ သဲက ဖြူပြီး ရေက ကြည်လင်နွေးထွေးတယ်။',
      th: 'เด็ก ๆ วิ่งไปที่ชายหาดทันทีที่มาถึง ทรายขาว และน้ำใสและอบอุ่น',
    },
    {
      en: 'On the second day, they took a boat to see colorful fish. The children wore masks and looked at the coral reefs.',
      my: 'ဒုတိယနေ့မှာ ရောင်စုံငါးတွေ ကြည့်ဖို့ လှေစီးတယ်။ ကလေးတွေက မျက်နှာဖုံးတွေဝတ်ပြီး သန္တာကျောက်တန်းတွေ ကြည့်တယ်။',
      th: 'วันที่สอง พวกเขานั่งเรือไปดูปลาสีสันสดใส เด็ก ๆ ใส่หน้ากากและดูแนวปะการัง',
    },
    {
      en: 'In the evenings, they ate fresh seafood at a restaurant by the sea. The father said it was the best fish he had ever tasted.',
      my: 'ညနေတွေမှာ ပင်လယ်နားက စားသောက်ဆိုင်မှာ လတ်ဆတ်တဲ့ပင်လယ်စာ စားတယ်။ အဖေက သူစားဖူးသမျှထဲမှာ အကောင်းဆုံးငါးလို့ ပြောတယ်။',
      th: 'ตอนเย็น พวกเขากินอาหารทะเลสดที่ร้านอาหารริมทะเล พ่อบอกว่าเป็นปลาที่อร่อยที่สุดที่เขาเคยกิน',
    },
    {
      en: 'On the last day, nobody wanted to leave. The mother promised they would come back next year.',
      my: 'နောက်ဆုံးနေ့မှာ ဘယ်သူမှ မပြန်ချင်ဘူး။ အမေက နောက်နှစ် ပြန်လာမယ်လို့ ကတိပေးတယ်။',
      th: 'วันสุดท้าย ไม่มีใครอยากจากไป แม่สัญญาว่าจะกลับมาปีหน้า',
    },
    {
      en: 'Back home, the children drew pictures of the island and hung them on their bedroom walls. The parents agreed it was the best money they had ever spent. The happy family looks at those colorful drawings every single day and smiles warmly together.',
      my: 'အိမ်ပြန်ရောက်တဲ့အခါ ကလေးတွေက ကျွန်းပုံတွေ ဆွဲပြီး အိပ်ခန်းနံရံတွေမှာ ချိတ်တယ်။ မိဘတွေက အဲဒါ သူတို့သုံးဖူးသမျှထဲမှာ အကောင်းဆုံးငွေသုံးစွဲမှုလို့ သဘောတူတယ်။ မိသားစုက အဲဒီပုံတွေကို နေ့တိုင်း ကြည့်ပြီး ပြုံးတယ်။',
      th: 'กลับบ้าน เด็ก ๆ วาดรูปเกาะและแขวนบนผนังห้องนอน พ่อแม่เห็นพ้องว่าเป็นเงินที่ใช้ดีที่สุดที่เคยใช้ ครอบครัวที่มีความสุขมองรูปวาดสีสันเหล่านั้นทุกวันและยิ้มอย่างอบอุ่นด้วยกัน',
    },
    {
      en: 'As the plane took off, the children waved at the island below. Some holidays end, but the happiest ones stay in your heart.',
      my: 'လေယာဉ် ထွက်ခွာသွားတဲ့အခါ ကလေးတွေက အောက်ကကျွန်းကို လက်ပြနှုတ်ဆက်တယ်။ အားလပ်ရက်တချို့က ပြီးဆုံးသွားပေမယ့် အပျော်ဆုံးအချိန်တွေက နှလုံးသားထဲမှာ ကျန်ရစ်တယ်။',
      th: 'ขณะที่เครื่องบินขึ้น เด็ก ๆ โบกมือให้เกาะด้านล่าง วันหยุดบางวันจบลง แต่วันที่มีความสุขที่สุดอยู่ในใจของคุณ',
    },
  ],
},
// key words: train, journey, mountain, station, window
{
  id: 'story-f14-b1-26',
  level: 'B1',
  titleEn: 'The Train to the North',
  titleMy: 'မြောက်ဘက်ရထားခရီး',
  titleTh: 'รถไฟไปทางเหนือ',
  paragraphs: [
    {
      en: 'Mya decided to visit her aunt in the northern mountains. She bought a train ticket for the overnight journey.',
      my: 'မြက မြောက်ဘက်တောင်တန်းက အဒေါ်ကို သွားလည်ဖို့ ဆုံးဖြတ်တယ်။ ညအိပ်ရထားခရီးအတွက် လက်မှတ်ဝယ်တယ်။',
      th: 'มยาตัดสินใจไปเยี่ยมป้าที่ภูเขาทางเหนือ เธอซื้อตั๋วรถไฟสำหรับการเดินทางค้างคืน',
    },
    {
      en: 'The train left the station at eight in the evening. Mya found her seat by the window and watched the city lights disappear.',
      my: 'ရထားက ည ရှစ်နာရီမှာ ဘူတာကနေ ထွက်တယ်။ မြက ပြတင်းပေါက်နားက ထိုင်ခုံကို တွေ့ပြီး မြို့မီးတွေ ပျောက်ကွယ်သွားတာ ကြည့်တယ်။',
      th: 'รถไฟออกจากสถานีตอนสองทุ่ม มยาหาที่นั่งใกล้หน้าต่างและมองแสงไฟเมืองหายไป',
    },
    {
      en: 'An old woman sat across from her and shared homemade snacks. They talked for hours about their families and their lives.',
      my: 'အမျိုးသမီးကြီးတစ်ယောက် သူ့မျက်နှာချင်းဆိုင်မှာ ထိုင်ပြီး အိမ်လုပ်မုန့်တွေ မျှဝေတယ်။ မိသားစုတွေနဲ့ ဘဝတွေအကြောင်း နာရီပေါင်းများစွာ စကားပြောကြတယ်။',
      th: 'หญิงชราคนหนึ่งนั่งตรงข้ามเธอและแบ่งขนมโฮมเมด พวกเขาคุยกันหลายชั่วโมงเรื่องครอบครัวและชีวิตของพวกเขา',
    },
    {
      en: 'Mya fell asleep to the gentle rocking of the train. When she woke up, green mountains were visible through the window.',
      my: 'မြက ရထားရဲ့ ညင်သာတဲ့လှုပ်ခါမှုနဲ့ အိပ်ပျော်သွားတယ်။ နိုးလာတဲ့အခါ ပြတင်းပေါက်ကနေ စိမ်းလန်းတဲ့တောင်တွေ မြင်ရတယ်။',
      th: 'มยาหลับไปกับจังหวะโยกเบา ๆ ของรถไฟ เมื่อเธอตื่น ภูเขาสีเขียวปรากฏผ่านหน้าต่าง',
    },
    {
      en: 'Her aunt was waiting at the small station with a warm hug. Mya decided that train journeys are the best way to travel.',
      my: 'အဒေါ်က ဘူတာသေးသေးလေးမှာ နွေးထွေးတဲ့ဖက်နဲ့ စောင့်နေတယ်။ ရထားခရီးတွေက ခရီးသွားဖို့ အကောင်းဆုံးနည်းလမ်းလို့ မြ ဆုံးဖြတ်တယ်။',
      th: 'ป้าของเธอรอที่สถานีเล็กด้วยกอดอันอบอุ่น มยาตัดสินใจว่าการเดินทางโดยรถไฟคือวิธีเดินทางที่ดีที่สุด',
    },
    {
      en: 'Mya stayed with her aunt for a whole week, helping in the garden and learning traditional recipes. On the train home, she already missed the mountains. She warmly promised her dear aunt that she would happily return during the cool season together with her beloved brother.',
      my: 'မြက အဒေါ်နဲ့ တစ်ပတ်လုံး နေပြီး ဥယျာဉ်မှာ ကူညီရင်း ရိုးရာချက်ပြုတ်နည်းတွေ သင်ယူတယ်။ အပြန်ရထားပေါ်မှာ တောင်တွေကို လွမ်းနေပြီ။ သူက အအေးရာသီမှာ အစ်ကိုနဲ့ ပြန်လာမယ်လို့ အဒေါ်ကို ကတိပေးတယ်။',
      th: 'มยาอยู่กับป้าหนึ่งสัปดาห์เต็ม ช่วยในสวนและเรียนรู้สูตรอาหารดั้งเดิม บนรถไฟกลับ เธอคิดถึงภูเขาแล้ว เธอสัญญากับป้าที่รักอย่างอบอุ่นว่าจะกลับมาอย่างมีความสุขในช่วงฤดูหนาวพร้อมพี่ชายที่รัก',
    },
  ],
},
// key words: market, border, sell, snack, education
{
  id: 'story-f14-b1-27',
  level: 'B1',
  titleEn: 'The Border Market',
  titleMy: 'နယ်စပ်ဈေး',
  titleTh: 'ตลาดชายแดน',
  paragraphs: [
    {
      en: 'Once a month, traders from both sides of the border gather at the big market near the river. It is the most colorful place in the region.',
      my: 'တစ်လတစ်ကြိမ် နယ်စပ်နှစ်ဖက်က ကုန်သည်တွေ မြစ်နားက ဈေးကြီးမှာ စုဝေးကြတယ်။ အဲဒါက ဒေသထဲမှာ အရောင်အစုံဆုံးနေရာပါ။',
      th: 'เดือนละครั้ง พ่อค้าจากทั้งสองฝั่งชายแดนมารวมตัวที่ตลาดใหญ่ใกล้แม่น้ำ เป็นที่ที่มีสีสันที่สุดในภูมิภาค',
    },
    {
      en: 'Aye Aye sells traditional snacks there. She wakes up at four in the morning to prepare everything fresh.',
      my: 'အေးအေးက အဲဒီမှာ ရိုးရာမုန့်တွေ ရောင်းတယ်။ အရာအားလုံး လတ်ဆတ်အောင် ပြင်ဆင်ဖို့ မနက် လေးနာရီ နိုးတယ်။',
      th: 'เอเอขายขนมดั้งเดิมที่นั่น เธอตื่นตอนตีสี่เพื่อเตรียมทุกอย่างให้สด',
    },
    {
      en: 'By seven o\'clock, the market is full of people. Customers from far away come to buy clothes, fruits, and handmade goods.',
      my: 'ခုနစ်နာရီမှာ ဈေးက လူတွေနဲ့ ပြည့်နေပြီ။ ဝေးလံတဲ့နေရာက ဖောက်သည်တွေ အဝတ်အစား၊ သစ်သီး၊ လက်မှုပစ္စည်းတွေ ဝယ်ဖို့ လာကြတယ်။',
      th: 'ตอนเจ็ดโมง ตลาดเต็มไปด้วยคน ลูกค้าจากที่ไกลมาซื้อเสื้อผ้า ผลไม้ และของทำมือ',
    },
    {
      en: 'Aye Aye\'s snacks always sell out before noon. Her secret is a special recipe from her grandmother.',
      my: 'အေးအေးရဲ့ မုန့်တွေက နေ့လယ်မတိုင်ခင် အမြဲကုန်သွားတယ်။ သူ့လျှို့ဝှက်ချက်က အဖွားရဲ့ အထူးချက်ပြုတ်နည်းပါ။',
      th: 'ขนมของเอเอขายหมดก่อนเที่ยงเสมอ ความลับของเธอคือสูตรพิเศษจากยายของเธอ',
    },
    {
      en: 'She saves most of her earnings for her daughter\'s education. She dreams of seeing her daughter become a teacher one day.',
      my: 'သူက ဝင်ငွေအများစုကို သမီးရဲ့ ပညာရေးအတွက် စုတယ်။ တစ်နေ့ သမီးက ဆရာမဖြစ်တာကို မြင်ဖို့ အိပ်မက်မက်တယ်။',
      th: 'เธอเก็บรายได้ส่วนใหญ่เพื่อการศึกษาของลูกสาว เธอฝันเห็นลูกสาวเป็นครูสักวัน',
    },
    {
      en: 'Aye Aye\'s daughter is now studying hard at school, inspired by her mother\'s dedication. Aye Aye believes that every snack she sells brings that dream closer. Every single month, hardworking Aye Aye happily tries one delicious new snack recipe to pleasantly surprise her many loyal customers.',
      my: 'အေးအေးရဲ့ သမီးက အမေ့ရဲ့စိတ်အားထက်သန်မှုနဲ့ အားကျပြီး ကျောင်းမှာ ကြိုးကြိုးစားစား စာသင်နေတယ်။ ရောင်းတဲ့မုန့်တိုင်းက အဲဒီအိပ်မက်ကို ပိုနီးစေတယ်လို့ အေးအေး ယုံကြည်တယ်။ လတိုင်း အေးအေးက သစ္စာရှိတဲ့ဖောက်သည်တွေကို အံ့သြစေဖို့ မုန့်ချက်ပြုတ်နည်းအသစ်တစ်ခု စမ်းတယ်။',
      th: 'ลูกสาวของเอเอตอนนี้เรียนหนักที่โรงเรียน ได้แรงบันดาลใจจากความทุ่มเทของแม่ เอเอเชื่อว่าขนมทุกชิ้นที่เธอขายนำความฝันนั้นใกล้ขึ้น ทุกเดือน เอเอที่ขยันขันแข็งลองสูตรขนมใหม่ที่อร่อยอย่างมีความสุขเพื่อทำให้ลูกค้าประจำมากมายของเธอประหลาดใจอย่างน่ายินดี',
    },
  ],
},
// key words: temple, ancient, history, monk, school
{
  id: 'story-f14-b1-28',
  level: 'B1',
  titleEn: 'The Ancient Temple',
  titleMy: 'ရှေးဟောင်းဘုရား',
  titleTh: 'วัดโบราณ',
  paragraphs: [
    {
      en: 'On a school trip, the students visited an ancient temple that was over eight hundred years old. Their teacher told them its history.',
      my: 'ကျောင်းခရီးစဉ်မှာ ကျောင်းသားတွေက နှစ်ရှစ်ရာကျော် သက်တမ်းရှိတဲ့ ရှေးဟောင်းဘုရားတစ်ဆူကို သွားလည်တယ်။ သူတို့ဆရာက သမိုင်းကို ပြောပြတယ်။',
      th: 'ในทัศนศึกษาของโรงเรียน นักเรียนไปเยี่ยมวัดโบราณที่มีอายุมากว่าแปดร้อยปี ครูเล่าประวัติให้พวกเขาฟัง',
    },
    {
      en: 'The walls were covered with beautiful carvings of animals, dancers, and old kings. The students took many photos.',
      my: 'နံရံတွေမှာ တိရစ္ဆာန်တွေ၊ အကသမားတွေ၊ ဘုရင်ဟောင်းတွေရဲ့ လှပတဲ့ပန်းပုတွေ ပြည့်နေတယ်။ ကျောင်းသားတွေက ဓာတ်ပုံအများကြီး ရိုက်တယ်။',
      th: 'ผนังเต็มไปด้วยภาพแกะสลักสวยงามของสัตว์ นักเต้น และกษัตริย์เก่า นักเรียนถ่ายรูปมากมาย',
    },
    {
      en: 'A monk explained that people have been coming to pray here for centuries. He showed them the oldest statue in the temple.',
      my: 'ဘုန်းကြီးတစ်ပါးက လူတွေက ရာစုနှစ်ပေါင်းများစွာ ဒီမှာ လာရောက်ဆုတောင်းနေကြတယ်လို့ ရှင်းပြတယ်။ ဘုရားထဲက အဟောင်းဆုံးရုပ်ပွားတော်ကို ပြတယ်။',
      th: 'พระภิกษุรูปหนึ่งอธิบายว่าผู้คนมาสวดมนต์ที่นี่มาหลายศตวรรษ เขาแสดงรูปปั้นที่เก่าแก่ที่สุดในวัดให้พวกเขาดู',
    },
    {
      en: 'One student asked why the temple was built on a hill. The monk smiled and said it was to be closer to the sky.',
      my: 'ကျောင်းသားတစ်ယောက်က ဘုရားကို ဘာကြောင့် တောင်ကုန်းပေါ် တည်တာလဲလို့ မေးတယ်။ ဘုန်းကြီးက ပြုံးပြီး ကောင်းကင်နဲ့ ပိုနီးဖို့လို့ ပြောတယ်။',
      th: 'นักเรียนคนหนึ่งถามว่าทำไมวัดสร้างบนเนินเขา พระยิ้มและบอกว่าเพื่อให้ใกล้ท้องฟ้ามากขึ้น',
    },
    {
      en: 'On the way home, the students agreed it was the most interesting trip of the year.',
      my: 'အပြန်လမ်းမှာ ကျောင်းသားတွေက ဒါက တစ်နှစ်တာရဲ့ အစိတ်ဝင်စားစရာအကောင်းဆုံး ခရီးလို့ သဘောတူတယ်။',
      th: 'ระหว่างทางกลับ นักเรียนเห็นพ้องว่าเป็นทริปที่น่าสนใจที่สุดของปี',
    },
    {
      en: 'The students wrote essays about the temple visit, and the best one was published in the school magazine. The teacher was proud of their curiosity. The curious students all hope to visit an even older and more mysterious temple on their exciting next school trip together.',
      my: 'ကျောင်းသားတွေက ဘုရားသွားလည်တာအကြောင်း စာစီစာကုံးတွေ ရေးပြီး အကောင်းဆုံးတစ်ပုဒ်ကို ကျောင်းမဂ္ဂဇင်းမှာ ထုတ်ဝေတယ်။ ဆရာက သူတို့ရဲ့ စူးစမ်းလိုစိတ်အတွက် ဂုဏ်ယူတယ်။ ကျောင်းသားတွေက နောက်ကျောင်းခရီးမှာ ပိုဟောင်းတဲ့ဘုရားတစ်ဆူ သွားလည်ဖို့ မျှော်လင့်တယ်။',
      th: 'นักเรียนเขียนเรียงความเรื่องการไปเยี่ยมวัด และเรื่องที่ดีที่สุดถูกตีพิมพ์ในนิตยสารโรงเรียน ครูภูมิใจในความอยากรู้อยากเห็นของพวกเขา นักเรียนที่อยากรู้อยากเห็นทุกคนหวังจะไปเยี่ยมวัดที่เก่ากว่าและลึกลับกว่าในทัศนศึกษาครั้งหน้าที่น่าตื่นเต้นด้วยกัน',
    },
    {
      en: 'Eight hundred years of history had spoken to them through stone and silence. The students went home with full notebooks and even fuller hearts.',
      my: 'နှစ်ရှစ်ရာသမိုင်းက ကျောက်တုံးတွေနဲ့ တိတ်ဆိတ်မှုကနေ သူတို့ကို စကားပြောခဲ့တယ်။ ကျောင်းသားတွေ အိမ်ပြန်သွားတဲ့အခါ မှတ်စုစာအုပ်တွေ ပြည့်ပြီး နှလုံးသားတွေက ပိုပြည့်နေတယ်။',
      th: 'ประวัติศาสตร์แปดร้อยปีพูดกับพวกเขาผ่านหินและความเงียบ นักเรียนกลับบ้านพร้อมสมุดบันทึกที่เต็มและหัวใจที่เต็มยิ่งกว่า',
    },
  ],
},
// key words: tea, morning, friend, shop, owner
{
  id: 'story-f14-b1-29',
  level: 'B1',
  titleEn: 'The Tea House',
  titleMy: 'လက်ဖက်ရည်ဆိုင်',
  titleTh: 'โรงน้ำชา',
  paragraphs: [
    {
      en: 'Every morning at seven, U Htun sits at the same table in his favorite tea house. He has been coming here for twenty years.',
      my: 'မနက်တိုင်း ခုနစ်နာရီမှာ ဦးထွန်းက အကြိုက်ဆုံးလက်ဖက်ရည်ဆိုင်က စားပွဲအရင်အတိုင်းမှာ ထိုင်တယ်။ ဒီကို နှစ်နှစ်ဆယ် လာနေတာ။',
      th: 'ทุกเช้าเจ็ดโมง อูทุนนั่งที่โต๊ะเดิมในโรงน้ำชาที่ชอบ เขามาที่นี่ยี่สิบปีแล้ว',
    },
    {
      en: 'The owner knows his order by heart: strong tea with condensed milk and two pieces of fried bread.',
      my: 'ဆိုင်ရှင်က သူ့အမှာစာကို အလွတ်သိတယ်။ နို့ဆီထည့်ထားတဲ့ လက်ဖက်ရည်အပြင်းနဲ့ အီကြာကွေးနှစ်ခု။',
      th: 'เจ้าของจำออเดอร์ของเขาได้ขึ้นใจ ชาเข้มใส่นมข้นและปาท่องโก๋สองชิ้น',
    },
    {
      en: 'U Htun reads the newspaper while he drinks his tea. His old friends join him one by one, and they discuss the news.',
      my: 'ဦးထွန်းက လက်ဖက်ရည်သောက်ရင်း သတင်းစာဖတ်တယ်။ သူငယ်ချင်းဟောင်းတွေ တစ်ယောက်ပြီးတစ်ယောက် လာပူးပေါင်းပြီး သတင်းတွေ ဆွေးနွေးကြတယ်။',
      th: 'อูทุนอ่านหนังสือพิมพ์ขณะดื่มชา เพื่อนเก่าของเขามาร่วมทีละคน และพวกเขาหารือข่าว',
    },
    {
      en: 'Last week, the owner announced he would close the shop. U Htun and his friends were very sad.',
      my: 'ပြီးခဲ့တဲ့အပတ်က ဆိုင်ရှင်က ဆိုင်ပိတ်မယ်လို့ ကြေညာတယ်။ ဦးထွန်းနဲ့ သူငယ်ချင်းတွေ အရမ်းဝမ်းနည်းသွားတယ်။',
      th: 'สัปดาห์ที่แล้ว เจ้าของประกาศว่าจะปิดร้าน อูทุนกับเพื่อนเศร้ามาก',
    },
    {
      en: 'But the young son of the owner decided to continue the business. The tea house will stay open, and U Htun\'s mornings are saved.',
      my: 'ဒါပေမယ့် ဆိုင်ရှင်ရဲ့သားငယ်က စီးပွားရေးကို ဆက်လုပ်ဖို့ ဆုံးဖြတ်တယ်။ လက်ဖက်ရည်ဆိုင် ဆက်ဖွင့်မယ်၊ ဦးထွန်းရဲ့ မနက်တွေလည်း ကယ်တင်ခံရပြီ။',
      th: 'แต่ลูกชายหนุ่มของเจ้าของตัดสินใจทำธุรกิจต่อ โรงน้ำชาจะเปิดต่อไป และเช้าของอูทุนรอดแล้ว',
    },
    {
      en: 'U Htun\'s mornings continue as before, with strong tea and good friends. He says some traditions are worth protecting. The energetic young owner has thoughtfully added completely free Wi-Fi, and now happily even more customers come every day.',
      my: 'ဦးထွန်းရဲ့ မနက်တွေက အရင်အတိုင်း ဆက်ရှိနေတယ်၊ လက်ဖက်ရည်အပြင်းနဲ့ သူငယ်ချင်းကောင်းတွေနဲ့။ တချို့ရိုးရာတွေက ကာကွယ်ထိန်းသိမ်းဖို့ ထိုက်တန်တယ်လို့ ပြောတယ်။ ပိုင်ရှင်ငယ်က အခမဲ့ Wi-Fi ထည့်ထားပြီး အခု ဖောက်သည်တွေ ပိုများလာတယ်။',
      th: 'เช้าของอูทุนดำเนินต่อไปเหมือนเดิม ด้วยชาเข้มและเพื่อนดี เขาบอกว่าประเพณีบางอย่างควรค่าแก่การปกป้อง เจ้าของหนุ่มที่กระตือรือร้นเพิ่ม Wi-Fi ฟรีอย่างใส่ใจ และตอนนี้ลูกค้ามากขึ้นทุกวันอย่างมีความสุข',
    },
    {
      en: 'The tea tasted exactly the same as always — and that was the whole point. Some mornings are worth keeping just as they are.',
      my: 'လက်ဖက်ရည်အရသာက အမြဲလိုပဲ အတိအကျရှိနေတယ် — အဲဒါပဲ အဓိကအချက်ပါ။ တချို့မနက်တွေက အရင်အတိုင်းပဲ ထိန်းသိမ်းထားဖို့ ထိုက်တန်တယ်။',
      th: 'ชารสชาติเหมือนเดิมทุกประการ — และนั่นคือประเด็นทั้งหมด เช้าบางเช้าควรค่าแก่การรักษาไว้อย่างที่เป็น',
    },
  ],
},
// key words: festival, lantern, wish, night, family
{
  id: 'story-f14-b1-30',
  level: 'B1',
  titleEn: 'The Festival Night',
  titleMy: 'ပွဲတော်ည',
  titleTh: 'คืนเทศกาล',
  paragraphs: [
    {
      en: 'The whole town was preparing for the annual lights festival. Streets were decorated with colorful lanterns and flowers.',
      my: 'မြို့တစ်ခုလုံး နှစ်စဉ်မီးထွန်းပွဲတော်အတွက် ပြင်ဆင်နေတယ်။ လမ်းတွေကို ရောင်စုံမီးပုံးတွေနဲ့ ပန်းတွေနဲ့ အလှဆင်ထားတယ်။',
      th: 'ทั้งเมืองกำลังเตรียมงานเทศกาลแสงไฟประจำปี ถนนตกแต่งด้วยโคมไฟสีสันและดอกไม้',
    },
    {
      en: 'Nilar and her family arrived early to get a good spot near the river. Thousands of people were already there.',
      my: 'နီလာနဲ့ မိသားစုက မြစ်နားမှာ နေရာကောင်းရဖို့ အစောကြီး ရောက်လာတယ်။ လူထောင်ပေါင်းများစွာ အရင်ရောက်နေပြီ။',
      th: 'นีลาร์กับครอบครัวมาถึงเช้าเพื่อได้ที่ดี้ริมแม่น้ำ ผู้คนหลายพันอยู่ที่นั่นแล้ว',
    },
    {
      en: 'At eight o\'clock, the sky filled with floating lanterns. Everyone watched in silence as the lights rose higher and higher.',
      my: 'ရှစ်နာရီမှာ ကောင်းကင်က လွှတ်တင်တဲ့မီးပုံးတွေနဲ့ ပြည့်သွားတယ်။ မီးတွေ တဖြည်းဖြည်း မြင့်တက်လာတာ အားလုံး တိတ်တိတ်ဆိတ်ဆိတ် ကြည့်နေတယ်။',
      th: 'ตอนสองทุ่ม ท้องฟ้าเต็มไปด้วยโคมไฟลอย ทุกคนดูเงียบ ๆ ขณะแสงไฟลอยสูงขึ้นเรื่อย ๆ',
    },
    {
      en: 'Nilar made a wish as she released her own lantern. She wished for good health for her grandparents.',
      my: 'နီလာက ကိုယ့်မီးပုံးကို လွှတ်တင်ရင်း ဆုတောင်းတယ်။ အဘိုးအဘွားတွေ ကျန်းမာဖို့ ဆုတောင်းတယ်။',
      th: 'นีลาร์อธิษฐานขณะที่ปล่อยโคมของเธอ เธออธิษฐานขอให้ปู่ย่าตายายสุขภาพดี',
    },
    {
      en: 'On the way home, her little brother fell asleep in their father\'s arms. It had been a perfect night.',
      my: 'အပြန်လမ်းမှာ ညီလေးက အဖေ့လက်ထဲမှာ အိပ်ပျော်သွားတယ်။ အရမ်းပြီးပြည့်စုံတဲ့ညတစ်ည ဖြစ်ခဲ့တယ်။',
      th: 'ระหว่างทางกลับ น้องชายตัวน้อยหลับในอ้อมแขนของพ่อ เป็นคืนที่สมบูรณ์แบบ',
    },
    {
      en: 'Nilar keeps a photo of the floating lanterns beside her bed. Whenever she feels sad, she looks at it and remembers that perfect night. Next wonderful year, thoughtful Nilar wants to lovingly release two beautiful lanterns, one special lantern for each beloved grandparent.',
      my: 'နီလာက လွှတ်တင်တဲ့မီးပုံးတွေရဲ့ ဓာတ်ပုံကို အိပ်ရာဘေးမှာ ထားတယ်။ ဝမ်းနည်းတဲ့အခါတိုင်း အဲဒါကို ကြည့်ပြီး ပြီးပြည့်စုံတဲ့ညကို သတိရတယ်။ နောက်နှစ် နီလာက မီးပုံးနှစ်လုံး လွှတ်တင်ချင်တယ်၊ အဘိုးအဘွားတစ်ယောက်အတွက် တစ်လုံး။',
      th: 'นีลาร์เก็บรูปโคมไฟลอยข้างเตียงของเธอ เมื่อใดรู้สึกเศร้า เธอมองมันและจำคืนที่สมบูรณ์แบบนั้น ปีหน้าที่ยอดเยี่ยม นีลาร์ที่ใส่ใจอยากปล่อยโคมสวยสองดวงอย่างรักใคร่ โคมพิเศษดวงหนึ่งสำหรับปู่ย่าตายายที่รักแต่ละคน',
    },
    {
      en: 'As the last lantern disappeared into the dark sky, Nilar smiled. Wishes made with love, she believed, always find their way.',
      my: 'နောက်ဆုံးမီးပုံးက မှောင်မိုက်တဲ့ကောင်းကင်ထဲ ပျောက်ကွယ်သွားတဲ့အခါ နီလာ ပြုံးလိုက်တယ်။ ချစ်ခြင်းမေတ္တာနဲ့ တောင်းတဲ့ဆုတွေက လမ်းမှန်ကို အမြဲရှာတွေ့တယ်လို့ သူ ယုံကြည်တယ်။',
      th: 'ขณะที่โคมดวงสุดท้ายหายไปในท้องฟ้ามืด นีลาร์ยิ้ม คำอธิษฐานที่ทำด้วยความรัก เธอเชื่อ จะหาทางของมันเจอเสมอ',
    },
  ],
},
// key words: fisherman, lake, boat, village, share
{
  id: 'story-f14-b1-31',
  level: 'B1',
  titleEn: 'The Fisherman\'s Tale',
  titleMy: 'တံငါသည်ရဲ့ပုံပြင်',
  titleTh: 'เรื่องเล่าของชาวประมง',
  paragraphs: [
    {
      en: 'Old U Sein has been fishing in the great lake for fifty years. He knows every corner of the water.',
      my: 'အဖိုးဦးစိန်က ကန်ကြီးမှာ ငါးဖမ်းတာ နှစ်ငါးဆယ် ရှိပြီ။ ရေရဲ့ ထောင့်တိုင်းကို သိတယ်။',
      th: 'อูเซนชราตกปลาในทะเลสาบใหญ่มานานห้าสิบปี เขารู้ทุกมุมของน้ำ',
    },
    {
      en: 'Every morning before sunrise, he rows his small boat to his favorite spot. He says the fish bite best in the early morning.',
      my: 'မနက်တိုင်း နေမထွက်ခင် လှေသေးသေးလေးကို လှော်ပြီး အကြိုက်ဆုံးနေရာကို သွားတယ်။ မနက်အစောမှာ ငါးအကိုက်ဆုံးလို့ ပြောတယ်။',
      th: 'ทุกเช้าก่อนพระอาทิตย์ขึ้น เขาพายเรือเล็กไปที่ที่ชอบ เขาบอกว่าปลากัดดีที่สุดตอนเช้าตรู่',
    },
    {
      en: 'Young fishermen often ask for his advice. He tells them to be patient and to respect the lake.',
      my: 'တံငါသည်ငယ်တွေက သူ့အကြံကို မကြာခဏ တောင်းတယ်။ စိတ်ရှည်ဖို့နဲ့ ကန်ကို လေးစားဖို့ သူ ပြောတယ်။',
      th: 'ชาวประมงหนุ่มมักขอคำแนะนำจากเขา เขาบอกพวกเขาให้อดทนและเคารพทะเลสาบ',
    },
    {
      en: 'Last year, during a terrible storm, his boat broke. The whole village helped him build a new one.',
      my: 'ပြီးခဲ့တဲ့နှစ်က မုန်တိုင်းဆိုးဆိုးမှာ သူ့လှေ ကျိုးသွားတယ်။ ရွာတစ်ခုလုံးက လှေအသစ်ဆောက်ဖို့ ကူညီတယ်။',
      th: 'ปีที่แล้ว ระหว่างพายุร้าย เรือของเขาแตก ทั้งหมู่บ้านช่วยเขาสร้างลำใหม่',
    },
    {
      en: 'Now, whenever he catches a big fish, he shares it with his neighbors. He says the lake gives, so he must give too.',
      my: 'အခု ငါးကြီးမိတိုင်း အိမ်နီးချင်းတွေနဲ့ မျှဝေတယ်။ ကန်က ပေးလို့ သူလည်း ပေးရမယ်လို့ ပြောတယ်။',
      th: 'ตอนนี้ เมื่อใดเขาจับปลาตัวใหญ่ได้ เขาแบ่งปันกับเพื่อนบ้าน เขาบอกว่าทะเลสาบให้ ดังนั้นเขาต้องให้ด้วย',
    },
    {
      en: 'U Sein\'s grandchildren love hearing his stories about the lake. He hopes they will respect nature just as he has done all his life. Every peaceful evening, kind old U Sein patiently mends his fishing nets while happily telling wonderful stories to the fascinated village children.',
      my: 'ဦးစိန်ရဲ့ မြေးတွေက ကန်အကြောင်း သူ့ပုံပြင်တွေ နားထောင်ရတာ ကြိုက်တယ်။ သူတစ်သက်လုံး လုပ်ခဲ့သလို သဘာဝကို လေးစားဖို့ သူ မျှော်လင့်တယ်။ ညနေတိုင်း ဦးစိန်က ရွာကလေးတွေကို ပုံပြင်တွေ ပြောရင်း ပိုက်ကွန်တွေ ပြင်တယ်။',
      th: 'หลาน ๆ ของอูเซนชอบฟังเรื่องราวของเขาเกี่ยวกับทะเลสาบ เขาหวังว่าพวกเขาจะเคารพธรรมชาติเหมือนที่เขาทำมาตลอดชีวิต ทุกเย็นที่สงบ อูเซนชราใจดีซ่อมอวนตกปลาอย่างอดทนขณะที่เล่าเรื่องมหัศจรรย์ให้เด็ก ๆ ในหมู่บ้านที่หลงใหลฟังอย่างมีความสุข',
    },
    {
      en: 'The lake had given U Sein fish for fifty years, and he had given back kindness. That, the village children understood, was the real catch.',
      my: 'ကန်က ဦးစိန်ကို နှစ်ငါးဆယ်တိုင်တိုင် ငါးပေးခဲ့ပြီး သူကလည်း ကြင်နာမှုကို ပြန်ပေးခဲ့တယ်။ အဲဒါပဲ တကယ့်အမြတ်ဆိုတာ ရွာကလေးတွေ နားလည်သွားတယ်။',
      th: 'ทะเลสาบให้ปลาอูเซนมานานห้าสิบปี และเขาให้ความกรุณาตอบแทน นั่น เด็ก ๆ ในหมู่บ้านเข้าใจ คือการจับที่แท้จริง',
    },
  ],
},
// key words: monsoon, rain, farmer, rice, flood
{
  id: 'story-f14-b1-32',
  level: 'B1',
  titleEn: 'The Monsoon',
  titleMy: 'မုတ်သုန်မိုး',
  titleTh: 'ฤดูมรสุม',
  paragraphs: [
    {
      en: 'In Myanmar, the monsoon season brings heavy rain from June to October. Farmers wait for this rain all year.',
      my: 'မြန်မာမှာ မုတ်သုန်ရာသီက ဇွန်ကနေ အောက်တိုဘာအထိ မိုးသည်းထန်စွာ ရွာတယ်။ လယ်သမားတွေက ဒီမိုးကို တစ်နှစ်လုံး စောင့်ကြတယ်။',
      th: 'ในเมียนมา ฤดูมรสุมนำฝนตกหนักตั้งแต่เดือนมิถุนายนถึงตุลาคม ชาวนารอฝนนี้ทั้งปี',
    },
    {
      en: 'When the first rains come, children run outside to play. They laugh and splash in the puddles.',
      my: 'ပထမမိုးတွေ ရွာလာတဲ့အခါ ကလေးတွေက အပြင်ထွက် ကစားဖို့ ပြေးကြတယ်။ ရယ်မောပြီး ရေအိုင်တွေမှာ ရေပက်ကြတယ်။',
      th: 'เมื่อฝนแรกมา เด็ก ๆ วิ่งออกไปเล่นข้างนอก พวกเขาหัวเราะและสาดน้ำในแอ่ง',
    },
    {
      en: 'In the villages, farmers start planting rice in the wet fields. It is the busiest time of the year for them.',
      my: 'ကျေးရွာတွေမှာ လယ်သမားတွေက စိုစွတ်တဲ့လယ်တွေမှာ စပါးစိုက်ဖို့ စတယ်။ သူတို့အတွက် တစ်နှစ်တာရဲ့ အလုပ်အများဆုံးအချိန်ပါ။',
      th: 'ในหมู่บ้าน ชาวนาเริ่มปลูกข้าวในทุ่งที่เปียก เป็นช่วงที่ยุ่งที่สุดของปีสำหรับพวกเขา',
    },
    {
      en: 'But too much rain can cause floods. Last year, the river rose so high that some houses were damaged.',
      my: 'ဒါပေမယ့် မိုးအရမ်းများရင် ရေကြီးနိုင်တယ်။ ပြီးခဲ့တဲ့နှစ်က မြစ်ရေ အရမ်းတက်လို့ အိမ်တချို့ ပျက်စီးတယ်။',
      th: 'แต่ฝนมากเกินไปทำให้น้ำท่วมได้ ปีที่แล้ว แม่น้ำขึ้นสูงจนบ้านบางหลังเสียหาย',
    },
    {
      en: 'People help each other during floods, sharing food and shelter. The monsoon teaches them the power of community.',
      my: 'ရေကြီးတဲ့အခါ လူတွေက အချင်းချင်း ကူညီကြပြီး အစားအသောက်နဲ့ ခိုလှုံရာတွေ မျှဝေတယ်။ မုတ်သုန်က ရပ်ရွာရဲ့ စွမ်းအားကို သူတို့ကို သင်ပေးတယ်။',
      th: 'ผู้คนช่วยเหลือกันระหว่างน้ำท่วม แบ่งปันอาหารและที่พัก มรสุมสอนพวกเขาถึงพลังของชุมชน',
    },
    {
      en: 'When the rains finally stop in October, farmers celebrate the harvest festival with music and dancing. The cycle of the seasons continues, year after year. Sweet little children born during the rainy monsoon season are very often given beautiful names related to rain and water.',
      my: 'အောက်တိုဘာမှာ မိုးတွေ နောက်ဆုံးရပ်တဲ့အခါ လယ်သမားတွေက ရိတ်သိမ်းပွဲကို ဂီတနဲ့ အကတွေနဲ့ ကျင်းပတယ်။ ရာသီစက်ဝန်းက နှစ်စဉ်ဆက်လက် လည်ပတ်နေတယ်။ မုတ်သုန်ကာလမှာ မွေးတဲ့ကလေးတွေကို မိုးနဲ့ ဆက်စပ်တဲ့ နာမည်တွေ ပေးလေ့ရှိတယ်။',
      th: 'เมื่อฝนหยุดในที่สุดในเดือนตุลาคม ชาวนาฉลองเทศกาลเก็บเกี่ยวด้วยดนตรีและการเต้นรำ วงจรของฤดูกาลดำเนินต่อไป ปีแล้วปีเล่า เด็กน้อยที่น่ารักที่เกิดในช่วงฤดูมรสุมมักได้ชื่อสวยที่เกี่ยวกับฝนและน้ำ',
    },
    {
      en: 'Rain or shine, the cycle continues — and the people of Myanmar face every season together, just as they always have.',
      my: 'မိုးရွာသည်ဖြစ်စေ နေသာသည်ဖြစ်စေ ရာသီစက်ဝန်းက ဆက်လည်ပတ်နေတယ် — မြန်မာပြည်သူတွေက အမြဲလိုပဲ ရာသီတိုင်းကို အတူတူ ရင်ဆိုင်ကြတယ်။',
      th: 'ฝนตกหรือแดดออก วงจรดำเนินต่อไป — และผู้คนเมียนมาเผชิญทุกฤดูกาลด้วยกัน เหมือนที่เคยทำมาตลอด',
    },
  ],
},
// key words: mango, season, garden, sweet, neighbor
{
  id: 'story-f14-b1-33',
  level: 'B1',
  titleEn: 'The Mango Season',
  titleMy: 'သရက်သီးရာသီ',
  titleTh: 'ฤดูมะม่วง',
  paragraphs: [
    {
      en: 'April is mango season in Myanmar, and the markets are full of golden fruit. Everyone\'s favorite time has arrived.',
      my: 'ဧပြီလက မြန်မာမှာ သရက်သီးရာသီဖြစ်ပြီး ဈေးတွေမှာ ရွှေရောင်အသီးတွေ ပြည့်နေတယ်။ အားလုံးရဲ့ အကြိုက်ဆုံးအချိန် ရောက်လာပြီ။',
      th: 'เมษายนคือฤดูมะม่วงในเมียนมา และตลาดเต็มไปด้วยผลไม้สีทอง เวลาที่ทุกคนชอบมาถึงแล้ว',
    },
    {
      en: 'Daw Yin has a big mango tree in her garden. Every year, it produces hundreds of sweet mangoes.',
      my: 'ဒေါ်ရင်မှာ ဥယျာဉ်ထဲမှာ သရက်ပင်ကြီးတစ်ပင် ရှိတယ်။ နှစ်တိုင်း ချိုမြိန်တဲ့သရက်သီး ရာပေါင်းများစွာ သီးတယ်။',
      th: 'ดอยินมีต้นมะม่วงใหญ่ในสวนของเธอ ทุกปี มันให้มะม่วงหวานหลายร้อยลูก',
    },
    {
      en: 'Her grandchildren come to help pick the fruit. They climb the tree carefully while she holds the basket below.',
      my: 'သူ့မြေးတွေက အသီးခူးဖို့ ကူညီဖို့ လာကြတယ်။ သူက အောက်မှာ ခြင်းတောင်းကိုင်ထားရင်း ကလေးတွေက သတိထားပြီး ပင်တက်တယ်။',
      th: 'หลาน ๆ ของเธอมาช่วยเก็บผลไม้ พวกเขาปีนต้นไม้อย่างระมัดระวังขณะที่เธอถือตะกร้าด้านล่าง',
    },
    {
      en: 'Daw Yin gives mangoes to all her neighbors. She also makes delicious mango jam for the winter.',
      my: 'ဒေါ်ရင်က အိမ်နီးချင်းအားလုံးကို သရက်သီးတွေ ပေးတယ်။ ဆောင်းရာသီအတွက် အရသာရှိတဲ့ သရက်ယိုလည်း လုပ်တယ်။',
      th: 'ดอยินให้มะม่วงกับเพื่อนบ้านทั้งหมด เธอยังทำแยมมะม่วงอร่อยสำหรับหน้าหนาว',
    },
    {
      en: 'When the season ends, the children feel sad. But Daw Yin smiles and says the tree will give again next year.',
      my: 'ရာသီကုန်တဲ့အခါ ကလေးတွေ ဝမ်းနည်းတယ်။ ဒါပေမယ့် ဒေါ်ရင်က ပြုံးပြီး နောက်နှစ် အပင်က ထပ်ပေးမယ်လို့ ပြောတယ်။',
      th: 'เมื่อฤดูจบ เด็ก ๆ รู้สึกเศร้า แต่ดอยินยิ้มและบอกว่าต้นไม้จะให้อีกปีหน้า',
    },
    {
      en: 'Daw Yin\'s mango jam won first prize at the village fair last year. She shared the prize money with her grandchildren, who were very proud of her. This blessed year, generous Daw Yin lovingly planted two more young mango trees for all the happy future generations to enjoy.',
      my: 'ဒေါ်ရင်ရဲ့ သရက်ယိုက ပြီးခဲ့တဲ့နှစ် ရွာပွဲမှာ ပထမဆုရတယ်။ သူက ဆုငွေကို မြေးတွေနဲ့ မျှဝေတယ်၊ သူတို့က သူ့အတွက် အရမ်းဂုဏ်ယူကြတယ်။ ဒီနှစ် ဒေါ်ရင်က နောင်လာနောင်သားတွေအတွက် သရက်ပင်နှစ်ပင် ထပ်စိုက်တယ်။',
      th: 'แยมมะม่วงของดอยินชนะรางวัลที่หนึ่งในงานวัดปีที่แล้ว เธอแบ่งเงินรางวัลกับหลาน ๆ ที่ภูมิใจในตัวเธอมาก ปีนี้ที่ได้รับพร ดอยินที่เอื้อเฟื้อปลูกต้นมะม่วงอ่อนสองต้นอย่างรักใคร่สำหรับคนรุ่นหลังที่มีความสุขทุกคนให้เพลิดเพลิน',
    },
    {
      en: 'Every spring the old tree would bloom again, sweet as ever. Some gifts, Daw Yin knew, keep growing long after they are given.',
      my: 'နွေဦးတိုင်း အပင်အိုက အမြဲလိုပဲ ချိုမြိန်စွာ ပွင့်လန်းလာမယ်။ တချို့လက်ဆောင်တွေက ပေးပြီးတဲ့နောက်မှာတောင် ဆက်လက်ကြီးထွားနေတယ်ဆိုတာ ဒေါ်ရင် သိတယ်။',
      th: 'ทุกฤดูใบไม้ผลิ ต้นไม้เก่าจะบานอีกครั้ง หวานเหมือนเดิม ดอยินรู้ว่าของขวัญบางอย่างเติบโตต่อไปนานหลังให้ไปแล้ว',
    },
  ],
},
// key words: football, final, team, goal, trophy
{
  id: 'story-f14-b1-34',
  level: 'B1',
  titleEn: 'The Football Final',
  titleMy: 'ဘောလုံးဗိုလ်လုပွဲ',
  titleTh: 'รอบชิงชนะเลิศฟุตบอล',
  paragraphs: [
    {
      en: 'The school football final was the biggest event of the year. Two teams had trained for months to reach this match.',
      my: 'ကျောင်းဘောလုံးဗိုလ်လုပွဲက တစ်နှစ်တာရဲ့ အကြီးမားဆုံးပွဲပါ။ အသင်းနှစ်သင်းက ဒီပွဲကို ရောက်ဖို့ လပေါင်းများစွာ လေ့ကျင့်ခဲ့တယ်။',
      th: 'รอบชิงชนะเลิศฟุตบอลโรงเรียนคืองานที่ใหญ่ที่สุดของปี สองทีมฝึกมาหลายเดือนเพื่อมาถึงนัดนี้',
    },
    {
      en: 'The stadium was full of students, teachers, and parents. Everyone wore their team\'s colors and cheered loudly.',
      my: 'ကွင်းက ကျောင်းသား၊ ဆရာ၊ မိဘတွေနဲ့ ပြည့်နေတယ်။ အားလုံးက ကိုယ့်အသင်းအရောင်တွေ ဝတ်ပြီး ကျယ်လောင်စွာ အားပေးတယ်။',
      th: 'สนามเต็มไปด้วยนักเรียน ครู และผู้ปกครอง ทุกคนใส่สีของทีมและเชียร์เสียงดัง',
    },
    {
      en: 'In the first half, neither team scored. The goalkeepers played brilliantly, stopping every dangerous shot.',
      my: 'ပထမပိုင်းမှာ ဘယ်အသင်းမှ ဂိုးမသွင်းနိုင်ဘူး။ ဂိုးသမားတွေက ထူးချွန်စွာ ကစားပြီး အန္တရာယ်ရှိတဲ့ ကန်ချက်တိုင်းကို တားတယ်။',
      th: 'ครึ่งแรก ไม่มีทีมใดทำประตูได้ ผู้รักษาประตูเล่นอย่างยอดเยี่ยม หยุดทุกการยิงอันตราย',
    },
    {
      en: 'With only five minutes left, the captain of the blue team scored a beautiful goal. The crowd went wild with joy.',
      my: 'ငါးမိနစ်ပဲ ကျန်တော့တဲ့အချိန်မှာ အပြာအသင်းခေါင်းဆောင်က လှပတဲ့ဂိုးတစ်ဂိုး သွင်းတယ်။ ပရိသတ်က ဝမ်းသာအားရ ရူးသွပ်သွားတယ်။',
      th: 'เหลือแค่ห้านาที กัปตันทีมสีฟ้ายิงประตูสวย ผู้ชมบ้าคลั่งด้วยความดีใจ',
    },
    {
      en: 'The blue team won the trophy, but both teams shook hands with respect. It was a match everyone would remember.',
      my: 'အပြာအသင်းက ဖလားရတယ်၊ ဒါပေမယ့် အသင်းနှစ်သင်းလုံး လေးစားမှုနဲ့ လက်ဆွဲနှုတ်ဆက်တယ်။ အားလုံး မှတ်မိနေမယ့် ပွဲတစ်ပွဲ ဖြစ်ခဲ့တယ်။',
      th: 'ทีมสีฟ้าชนะถ้วยรางวัล แต่ทั้งสองทีมจับมือกันด้วยความเคารพ เป็นนัดที่ทุกคนจะจำ',
    },
    {
      en: 'The captain was chosen as the player of the tournament. He thanked his teammates, saying that no victory is ever won alone. Both proud teams were officially invited to a prestigious national youth tournament after the truly exciting and memorable final match.',
      my: 'ခေါင်းဆောင်ကို ပြိုင်ပွဲရဲ့ အကောင်းဆုံးကစားသမားအဖြစ် ရွေးချယ်တယ်။ အသင်းဖော်တွေကို ကျေးဇူးတင်ပြီး အောင်ပွဲဘယ်တော့မှ တစ်ယောက်တည်း မရဘူးလို့ ပြောတယ်။ စိတ်လှုပ်ရှားစရာဗိုလ်လုပွဲအပြီး အသင်းနှစ်သင်းလုံး အမျိုးသားလူငယ်ပြိုင်ပွဲကို ဖိတ်ကြားခံရတယ်။',
      th: 'กัปตันถูกเลือกเป็นผู้เล่นยอดเยี่ยมของทัวร์นาเมนต์ เขาขอบคุณเพื่อนร่วมทีม บอกว่าไม่มีชัยชนะใดชนะได้คนเดียว หลังรอบชิงที่น่าตื่นเต้นและน่าจดจำ ทั้งสองทีมที่ภูมิใจได้รับเชิญอย่างเป็นทางการให้เข้าร่วมทัวร์นาเมนต์เยาวชนแห่งชาติอันทรงเกียรติ',
    },
    {
      en: 'The trophy would gather dust one day, but the respect between the two teams would last. That was the real victory.',
      my: 'ဖလားက တစ်နေ့ ဖုန်တက်သွားမှာဖြစ်ပေမယ့် အသင်းနှစ်သင်းကြားက လေးစားမှုက ကြာရှည်တည်တံ့မယ်။ အဲဒါပဲ တကယ့်အောင်ပွဲပါ။',
      th: 'ถ้วยรางวัลจะเก็บฝุ่นสักวัน แต่ความเคารพระหว่างสองทีมจะคงอยู่ นั่นคือชัยชนะที่แท้จริง',
    },
  ],
},
// key words: race, marathon, train, exhausted, finish
{
  id: 'story-f14-b2-16',
  level: 'B2',
  titleEn: 'The Running Race',
  titleMy: 'အပြေးပြိုင်ပွဲ',
  titleTh: 'การแข่งขันวิ่ง',
  paragraphs: [
    {
      en: 'Thiri had never run more than five kilometers, yet she signed up for a half marathon that would take place in three months. Her colleagues laughed, but she was determined to prove them wrong.',
      my: 'သီရိက ငါးကီလိုမီတာထက် ပိုမပြေးဖူးပေမယ့် သုံးလအတွင်း ကျင်းပမယ့် ဟက်ဖ် မာရသွန်မှာ စာရင်းသွင်းတယ်။ လုပ်ဖော်ကိုင်ဖက်တွေ ရယ်ပေမယ့် သူက သူတို့မှားတယ်ဆိုတာ သက်သေပြဖို့ စိတ်ပိုင်းဖြတ်ထားတယ်။',
      th: 'ทีรีไม่เคยวิ่งเกินห้ากิโลเมตร แต่เธอสมัครวิ่งฮาล์ฟมาราธอนที่จะจัดในสามเดือน เพื่อนร่วมงานหัวเราะ แต่เธอมุ่งมั่นจะพิสูจน์ว่าพวกเขาผิด',
    },
    {
      en: 'She followed a strict training plan, waking up at five every morning to run before work. Although her muscles ached constantly during the first weeks, she refused to skip a single session.',
      my: 'သူက တင်းကျပ်တဲ့လေ့ကျင့်မှုအစီအစဉ်ကို လိုက်နာပြီး အလုပ်မသွားခင် ပြေးဖို့ မနက်တိုင်း ငါးနာရီ နိုးတယ်။ ပထမရက်သတ္တပတ်တွေမှာ ကြွက်သားတွေ အမြဲနာနေပေမယ့် တစ်ကြိမ်မှ မလွတ်ဖို့ ငြင်းတယ်။',
      th: 'เธอทำตามแผนฝึกที่เข้มงวด ตื่นตอนตีห้าทุกเช้าเพื่อวิ่งก่อนงาน แม้กล้ามเนื้อจะปวดตลอดช่วงสัปดาห์แรก เธอปฏิเสธที่จะขาดแม้แต่ครั้งเดียว',
    },
    {
      en: 'On race day, twenty thousand runners filled the streets of Yangon. The first ten kilometers felt easy, but after fifteen, every step became a battle against exhaustion.',
      my: 'ပြိုင်ပွဲနေ့မှာ အပြေးသမားနှစ်သောင်း ရန်ကုန်လမ်းတွေကို ပြည့်သွားတယ်။ ပထမဆယ်ကီလိုမီတာက လွယ်ကူသလို ခံစားရပေမယ့် ဆယ့်ငါးကီလိုမီတာနောက်မှာ ခြေလှမ်းတိုင်းက ပင်ပန်းမှုနဲ့ တိုက်ပွဲဖြစ်လာတယ်။',
      th: 'วันแข่ง นักวิ่งสองหมื่นคนเต็มถนนย่างกุ้ง สิบกิโลเมตรแรกรู้สึกง่าย แต่หลังสิบห้า ทุกก้าวกลายเป็นการต่อสู้กับความเหนื่อยล้า',
    },
    {
      en: 'With two kilometers remaining, she wanted to stop, but the cheering crowd carried her forward. She crossed the finish line in tears, finishing in the top third of all runners.',
      my: 'နှစ်ကီလိုမီတာ ကျန်တော့တဲ့အခါ ရပ်ချင်ပေမယ့် အားပေးနေတဲ့ပရိသတ်က သူ့ကို ရှေ့ဆက်တွန်းပို့တယ်။ သူက မျက်ရည်တွေနဲ့ ပန်းတိုင်ကို ဖြတ်ပြီး အပြေးသမားအားလုံးထဲမှာ အထက်သုံးပုံတစ်ပုံမှာ ပြီးတယ်။',
      th: 'เหลือสองกิโลเมตร เธออยากหยุด แต่ฝูงชนที่เชียร์พาเธอไปข้างหน้า เธอข้ามเส้นชัยทั้งน้ำตา จบในสามอันดับแรกของนักวิ่งทั้งหมด',
    },
    {
      en: 'Thiri has now completed three half marathons and dreams of running a full one next year. Her colleagues no longer laugh; instead, they ask her for training advice.',
      my: 'သီရိက အခု ဟက်ဖ် မာရသွန် သုံးခု ပြီးပြီ၊ နောက်နှစ် အပြည့်ပြေးဖို့ အိပ်မက်မက်တယ်။ လုပ်ဖော်ကိုင်ဖက်တွေ မရယ်ကြတော့ဘူး၊ အဲဒီအစား လေ့ကျင့်မှုအကြံ သူ့ဆီ တောင်းတယ်။',
      th: 'ทีรีตอนนี้วิ่งฮาล์ฟมาราธอนครบสามครั้งและฝันจะวิ่งแบบเต็มปีหน้า เพื่อนร่วมงานไม่หัวเราะอีกต่อไป แต่ขอคำแนะนำการฝึกจากเธอแทน',
    },
  ],
},
// key words: swim, lesson, fear, pool, patient
{
  id: 'story-f14-b2-17',
  level: 'B2',
  titleEn: 'The Swimming Lesson',
  titleMy: 'ရေကူးသင်ခန်းစာ',
  titleTh: 'บทเรียนว่ายน้ำ',
  paragraphs: [
    {
      en: 'At forty years old, U Myo had never learned to swim, and he was embarrassed to admit it. When his daughter asked him to join her at the pool, he finally decided to face his fear.',
      my: 'အသက်လေးဆယ်မှာ ဦးမျိုးက ရေတစ်ခါမှ မကူးတတ်ဘူး၊ ဝန်ခံဖို့ ရှက်တယ်။ သမီးက ရေကူးကန်မှာ အတူလိုက်ဖို့ တောင်းတဲ့အခါ ကြောက်စိတ်ကို ရင်ဆိုင်ဖို့ နောက်ဆုံး ဆုံးဖြတ်တယ်။',
      th: 'อายุสี่สิบ อูมโยไม่เคยเรียนว่ายน้ำ และเขาอายที่จะยอมรับ เมื่อลูกสาวขอให้เขาร่วมที่สระ เขาตัดสินใจเผชิญหน้ากับความกลัวในที่สุด',
    },
    {
      en: 'The instructor, a patient young woman, started with the basics: floating on the back and breathing calmly. U Myo discovered that the water would support him if he relaxed instead of fighting it.',
      my: 'စိတ်ရှည်တဲ့ အမျိုးသမီးငယ် သင်တန်းဆရာမက အခြေခံတွေနဲ့ စတယ်။ ကျောပေါ် ပေါ်နေတာနဲ့ စိတ်အေးအေးအသက်ရှူတာ။ ရုန်းကန်မယ့်အစား အနားယူရင် ရေက သူ့ကို ထောက်ပံ့မယ်ဆိုတာ ဦးမျိုး တွေ့ရှိတယ်။',
      th: 'ครูฝึก หญิงสาวที่อดทน เริ่มจากพื้นฐาน การลอยบนหลังและการหายใจอย่างสงบ อูมโยค้นพบว่าน้ำจะพยุงเขาถ้าเขาผ่อนคลายแทนที่จะสู้',
    },
    {
      en: 'Progress was slow, and he swallowed a lot of water during the first lessons. Nevertheless, he returned every week, encouraged by his daughter\'s proud smile.',
      my: 'တိုးတက်မှုက နှေးပြီး ပထမသင်ခန်းစာတွေမှာ ရေအများကြီး မျိုချမိတယ်။ ဒါပေမယ့် သမီးရဲ့ ဂုဏ်ယူတဲ့အပြုံးနဲ့ အားပေးမှုကြောင့် အပတ်တိုင်း ပြန်လာတယ်။',
      th: 'ความก้าวหน้าช้า และเขากลืนน้ำมากในช่วงบทเรียนแรก แต่เขากลับมาทุกสัปดาห์ ได้กำลังใจจากรอยยิ้มภูมิใจของลูกสาว',
    },
    {
      en: 'After two months, he swam his first full length of the pool without stopping. His daughter cheered so loudly that everyone turned to look.',
      my: 'နှစ်လအကြာမှာ သူ ရပ်မနားဘဲ ရေကူးကန်တစ်ခေါက်လုံး ပထမဆုံး ကူးနိုင်တယ်။ သမီးက အရမ်းကျယ်လောင်စွာ အားပေးလို့ အားလုံး လှည့်ကြည့်တယ်။',
      th: 'หลังสองเดือน เขาว่ายเต็มความยาวสระครั้งแรกโดยไม่หยุด ลูกสาวเชียร์เสียงดังจนทุกคนหันมามอง',
    },
    {
      en: 'U Myo now swims every weekend with his daughter, and they have become the stars of the local pool. He tells everyone that it is never too late to learn something new.',
      my: 'ဦးမျိုးက အခု သမီးနဲ့ အပတ်တိုင်း ရေကူးပြီး ဒေသရေကူးကန်ရဲ့ ကြယ်တွေ ဖြစ်နေတယ်။ အသစ်တစ်ခုခု သင်ယူဖို့ ဘယ်တော့မှ နောက်မကျဘူးလို့ အားလုံးကို ပြောတယ်။',
      th: 'อูมโยตอนนี้ว่ายน้ำทุกสุดสัปดาห์กับลูกสาว และพวกเขากลายเป็นดาวของสระท้องถิ่น เขาบอกทุกคนว่าไม่เคยสายเกินไปที่จะเรียนรู้สิ่งใหม่',
    },
  ],
},
// key words: chess, tournament, champion, calm, move
{
  id: 'story-f14-b2-18',
  level: 'B2',
  titleEn: 'The Chess Tournament',
  titleMy: 'စစ်တုရင်ပြိုင်ပွဲ',
  titleTh: 'การแข่งขันหมากรุก',
  paragraphs: [
    {
      en: 'Nanda had played chess since he was seven, taught by his grandfather on rainy afternoons. Now, at sixteen, he was competing in the national junior championship.',
      my: 'နန္ဒက ခုနစ်နှစ်သားကတည်းက မိုးရွာတဲ့နေ့လည်တွေမှာ အဘိုးသင်ပေးလို့ စစ်တုရင် ကစားခဲ့တယ်။ အခု ဆယ့်ခြောက်နှစ်မှာ အမျိုးသားလူငယ်ချန်ပီယံပြိုင်ပွဲမှာ ယှဉ်ပြိုင်နေတယ်။',
      th: 'นันทาเล่นหมากรุกตั้งแต่อายุเจ็ด เรียนจากปู่ในบ่ายที่ฝนตก ตอนนี้ อายุสิบหก เขาแข่งในชิงแชมป์เยาวชนแห่งชาติ',
    },
    {
      en: 'The tournament lasted three days, with each game demanding hours of intense concentration. After winning his first four matches, Nanda faced the defending champion in the semifinal.',
      my: 'ပြိုင်ပွဲက သုံးရက် ကြာပြီး ပွဲတိုင်းမှာ နာရီပေါင်းများစွာ ပြင်းထန်တဲ့အာရုံစိုက်မှု လိုတယ်။ ပထမလေးပွဲ နိုင်ပြီးနောက် နန္ဒက ဆီမီးဖိုင်နယ်မှာ လက်ရှိချန်ပီယံနဲ့ ရင်ဆိုင်ရတယ်။',
      th: 'ทัวร์นาเมนต์ใช้เวลาสามวัน แต่ละเกมต้องการสมาธิเข้มข้นหลายชั่วโมง หลังชนะสี่นัดแรก นันทาเจอแชมป์เก่าในรอบรองชนะเลิศ',
    },
    {
      en: 'The semifinal was brutal: after four hours, Nanda was losing badly. Instead of panicking, he remembered his grandfather\'s advice to stay calm and look for unexpected moves.',
      my: 'ဆီမီးဖိုင်နယ်က ရက်စက်တယ်။ လေးနာရီအကြာမှာ နန္ဒ အရမ်းရှုံးနေတယ်။ ထိတ်လန့်မယ့်အစား အဘိုးရဲ့ စိတ်အေးအေးထားပြီး မမျှော်လင့်တဲ့အရွှေ့တွေကို ရှာဖို့ဆိုတဲ့ အကြံကို သတိရတယ်။',
      th: 'รอบรองโหดร้าย หลังสี่ชั่วโมง นันทากำลังแพ้ยับ แทนที่จะตื่นตระหนก เขาจำคำแนะนำของปู่ให้ใจเย็นและหาการเดินที่ไม่คาดคิด',
    },
    {
      en: 'He sacrificed his queen in a daring move that shocked everyone, including his opponent. Three moves later, the champion had no choice but to resign.',
      my: 'သူက ပြိုင်ဘက်အပါအဝင် အားလုံးကို အံ့သြစေတဲ့ ရဲရင့်တဲ့အရွှေ့နဲ့ ဘုရင်မကို စတေးတယ်။ သုံးကွက်အကြာမှာ ချန်ပီယံက အရှုံးပေးရုံမှတစ်ပါး ရွေးချယ်စရာ မရှိဘူး။',
      th: 'เขาสละราชินีในการเดินที่กล้าหาญที่ทำให้ทุกคนตกใจ รวมถึงคู่แข่ง สามตาเดินต่อมา แชมป์ไม่มีทางเลือกนอกจากยอมแพ้',
    },
    {
      en: 'Nanda went on to win the national championship the following year. He dedicated the trophy to his grandfather, whose patient lessons had shaped his game. His beloved grandfather, now a remarkable ninety years old, proudly watched the thrilling final game with happy tears of overwhelming pride.',
      my: 'နန္ဒက နောက်နှစ် အမျိုးသားချန်ပီယံဆု ဆက်ရတယ်။ သူ့ကစားဟန်ကို ပုံဖော်ပေးခဲ့တဲ့ စိတ်ရှည်တဲ့သင်ခန်းစာတွေအတွက် အဘိုးကို ဖလားကို ဆက်ကပ်တယ်။ အသက်ကိုးဆယ်ရှိပြီဖြစ်တဲ့ အဘိုးက ဗိုလ်လုပွဲကို ဂုဏ်ယူတဲ့မျက်ရည်တွေနဲ့ ကြည့်တယ်။',
      th: 'นันทาชนะแชมป์แห่งชาติในปีต่อมา เขาอุทิศถ้วยรางวัลให้ปู่ ผู้ที่บทเรียนอดทนหล่อหลอมเกมของเขา ปู่ที่รักของเขาซึ่งตอนนี้อายุเก้าสิบที่น่าทึ่ง ดูเกมรอบชิงที่น่าตื่นเต้นด้วยน้ำตาแห่งความภาคภูมิใจอย่างมีความสุข',
    },
  ],
},
// key words: reunion, friend, memory, school, grateful
{
  id: 'story-f14-b2-19',
  level: 'B2',
  titleEn: 'The Reunion',
  titleMy: 'ပြန်လည်ဆုံတွေ့ခြင်း',
  titleTh: 'การพบกันอีกครั้ง',
  paragraphs: [
    {
      en: 'Twenty years after graduation, the class of 2006 organized a reunion dinner at their old school. Of the forty students, thirty-five managed to attend.',
      my: 'ဘွဲ့ရပြီး နှစ်နှစ်ဆယ်အကြာမှာ ၂၀၀၆ ခုနှစ်အတန်းက ကျောင်းဟောင်းမှာ ပြန်လည်ဆုံတွေ့ညစာ စီစဉ်တယ်။ ကျောင်းသားလေးဆယ်ထဲက သုံးဆယ့်ငါးယောက် တက်ရောက်နိုင်တယ်။',
      th: 'ยี่สิบปีหลังจบการศึกษา ชั้นปี 2006 จัดงานเลี้ยงพบกันอีกครั้งที่โรงเรียนเก่า จากนักเรียนสี่สิบคน สามสิบห้าคนมาร่วมได้',
    },
    {
      en: 'When Thaw walked through the school gate, memories flooded back: the noisy canteen, the strict teachers, the football field where he had scored his first goal.',
      my: 'သော်က ကျောင်းတံခါးကို ဖြတ်ဝင်လာတဲ့အခါ အမှတ်တရတွေ ပြန်လည် စီးဝင်လာတယ်။ ဆူညံတဲ့အဆာပြေဆိုင်၊ တင်းကျပ်တဲ့ဆရာတွေ၊ ပထမဂိုးသွင်းခဲ့တဲ့ ဘောလုံးကွင်း။',
      th: 'เมื่อทอเดินผ่านประตูโรงเรียน ความทรงจำไหลกลับมา โรงอาหารที่เสียงดัง ครูที่เข้มงวด สนามฟุตบอลที่เขายิงประตูแรก',
    },
    {
      en: 'His old friends looked different, with grey hair and glasses, yet their laughter sounded exactly the same. They shared stories of careers, marriages, and children until midnight.',
      my: 'သူငယ်ချင်းဟောင်းတွေက ဆံပင်ဖြူတွေနဲ့ မျက်မှန်တွေနဲ့ မတူတော့ပေမယ့် ရယ်သံတွေက အတိအကျ အရင်အတိုင်းပဲ။ သန်းခေါင်အထိ အသက်မွေးဝမ်းကျောင်း၊ အိမ်ထောင်ရေး၊ ကလေးတွေအကြောင်း ဇာတ်လမ်းတွေ မျှဝေကြတယ်။',
      th: 'เพื่อนเก่าของเขาดูต่างไป มีผมหงอกและแว่นตา แต่เสียงหัวเราะของพวกเขาฟังเหมือนเดิมทุกประการ พวกเขาแบ่งปันเรื่องราวอาชีพ การแต่งงาน และลูก ๆ จนถึงเที่ยงคืน',
    },
    {
      en: 'Before leaving, they promised to meet every five years. Thaw drove home feeling grateful that some friendships survive the test of time.',
      my: 'မပြန်ခင် ငါးနှစ်တစ်ကြိမ် တွေ့ဖို့ ကတိပေးကြတယ်။ သော်က အချိန်ရဲ့ စမ်းသပ်မှုကို ခံနိုင်တဲ့ ခင်မင်မှုတချို့ ရှိတာအတွက် ကျေးဇူးတင်စိတ်နဲ့ အိမ်ပြန်မောင်းတယ်။',
      th: 'ก่อนจากไป พวกเขาสัญญาจะพบกันทุกห้าปี ทอขับรถกลับบ้านรู้สึกขอบคุณที่มิตรภาพบางอย่างรอดการทดสอบของเวลา',
    },
    {
      en: 'Thaw created an online group so classmates can stay in touch between reunions. Old photos and funny stories are shared there every week. Thaw\'s kind old football coach also happily joined the lively group and generously shares many useful training tips.',
      my: 'သော်က အတန်းဖော်တွေ ပြန်လည်ဆုံတွေ့မှုကြား အဆက်အသွယ်ရှိနေဖို့ အွန်လိုင်းအဖွဲ့တစ်ခု ဖန်တီးတယ်။ ဓာတ်ပုံဟောင်းတွေနဲ့ ရယ်စရာဇာတ်လမ်းတွေကို အပတ်တိုင်း အဲဒီမှာ မျှဝေတယ်။ သော်ရဲ့ ဘောလုံးနည်းပြဟောင်းလည်း အဖွဲ့ဝင်ပြီး လေ့ကျင့်မှုအကြံတွေ မျှဝေတယ်။',
      th: 'ทอสร้างกลุ่มออนไลน์เพื่อให้เพื่อนร่วมชั้นติดต่อกันระหว่างการพบกัน รูปเก่าและเรื่องตลกถูกแชร์ที่นั่นทุกสัปดาห์ โค้ชฟุตบอลชราคนใจดีของทอก็ร่วมกลุ่มที่มีชีวิตชีวาอย่างมีความสุขและแบ่งปันเคล็ดลับการฝึกที่มีประโยชน์มากมายอย่างเอื้อเฟื้อ',
    },
    {
      en: 'Twenty years had changed their faces, but not their friendship. Some bonds, Thaw realized, only grow stronger with time.',
      my: 'နှစ်နှစ်ဆယ်က သူတို့မျက်နှာတွေကို ပြောင်းလဲစေခဲ့ပေမယ့် ခင်မင်မှုကို မပြောင်းလဲနိုင်ခဲ့ဘူး။ တချို့နှောင်ကြိုးတွေက အချိန်ကြာလေ ပိုခိုင်မာလာလေဆိုတာ သော် သဘောပေါက်သွားတယ်။',
      th: 'ยี่สิบปีเปลี่ยนใบหน้าของพวกเขา แต่ไม่เปลี่ยนมิตรภาพ ทอตระหนักว่าสายสัมพันธ์บางอย่างแข็งแกร่งขึ้นกับเวลาเท่านั้น',
    },
  ],
},
// key words: friend, brave, language, kindness, speech
{
  id: 'story-f14-b2-20',
  level: 'B2',
  titleEn: 'The New Friend',
  titleMy: 'သူငယ်ချင်းအသစ်',
  titleTh: 'เพื่อนใหม่',
  paragraphs: [
    {
      en: 'When the new student from Japan joined the class, nobody knew how to talk to her. Her Myanmar was limited, and most students were too shy to try English.',
      my: 'ဂျပန်က ကျောင်းသားအသစ် အတန်းကို ဝင်လာတဲ့အခါ ဘယ်သူ့မှ သူနဲ့ ဘယ်လိုစကားပြောရမလဲ မသိဘူး။ သူ့မြန်မာစကားက အကန့်အသတ်ရှိပြီး ကျောင်းသားအများစုက အင်္ဂလိပ်လို စမ်းဖို့ ရှက်တယ်။',
      th: 'เมื่อนักเรียนใหม่จากญี่ปุ่นเข้าชั้น ไม่มีใครรู้วิธีพูดกับเธอ ภาษาเมียนมาของเธอจำกัด และนักเรียนส่วนใหญ่ขี้อายเกินกว่าจะลองภาษาอังกฤษ',
    },
    {
      en: 'Hsu decided to be brave. During lunch break, she sat next to Yuki and offered her some traditional snacks, using simple English and lots of gestures.',
      my: 'ဆုက သတ္တိရှိဖို့ ဆုံးဖြတ်တယ်။ နေ့လည်စာနားချိန်မှာ ယုကိဘေးမှာ ထိုင်ပြီး ရိုးရှင်းတဲ့အင်္ဂလိပ်နဲ့ လက်ဟန်အများကြီးနဲ့ ရိုးရာမုန့်တွေ ကမ်းလှမ်းတယ်။',
      th: 'ซูตัดสินใจกล้าหาญ ช่วงพักกลางวัน เธอนั่งข้างยูกิและเสนอขนมดั้งเดิม ใช้ภาษาอังกฤษง่าย ๆ และท่าทางมากมาย',
    },
    {
      en: 'Yuki\'s face lit up with relief and gratitude. From that day on, the two girls spent every break together, teaching each other words in three languages.',
      my: 'ယုကိရဲ့ မျက်နှာက သက်သာရာရမှုနဲ့ ကျေးဇူးတင်မှုနဲ့ လင်းလက်သွားတယ်။ အဲဒီနေ့ကစပြီး ကောင်မလေးနှစ်ယောက် နားချိန်တိုင်း အတူတူ ကုန်ပြီး ဘာသာစကားသုံးမျိုးနဲ့ စကားလုံးတွေ အချင်းချင်း သင်ပေးတယ်။',
      th: 'ใบหน้าของยูกิสว่างขึ้นด้วยความโล่งใจและความขอบคุณ ตั้งแต่วันนั้น เด็กหญิงสองคนใช้ทุกพักด้วยกัน สอนคำศัพท์กันในสามภาษา',
    },
    {
      en: 'By the end of the semester, Yuki gave a short speech in Myanmar at the school assembly. Hsu realized that friendship needs only kindness, not perfect language.',
      my: 'စာသင်နှစ်အဆုံးမှာ ယုကိက ကျောင်းစုဝေးပွဲမှာ မြန်မာလို မိန့်ခွန်းတိုလေး ပြောတယ်။ ခင်မင်မှုမှာ ပြီးပြည့်စုံတဲ့ဘာသာစကား မလိုဘဲ စေတနာပဲ လိုတယ်ဆိုတာ ဆု သဘောပေါက်တယ်။',
      th: 'ปลายภาค ยูกิพูดสุนทรพจน์สั้นเป็นภาษาเมียนมาในที่ประชุมโรงเรียน ซูตระหนักว่ามิตรภาพต้องการแค่ความกรุณา ไม่ใช่ภาษาที่สมบูรณ์แบบ',
    },
    {
      en: 'Hsu and Yuki are still best friends years later, and both speak three languages fluently. Their friendship began with snacks, smiles, and courage. Their proud teachers often invite them to welcome nervous new foreign students at their beloved school.',
      my: 'ဆုနဲ့ ယုကိက နှစ်တွေကြာပြီးနောက် အခုထိ အရင်းနှီးဆုံးသူငယ်ချင်းတွေဖြစ်ပြီး နှစ်ယောက်လုံး ဘာသာစကားသုံးမျိုး ကျွမ်းကျင်စွာ ပြောတယ်။ သူတို့ခင်မင်မှုက မုန့်၊ အပြုံး၊ သတ္တိနဲ့ စခဲ့တယ်။ သူတို့ဆရာတွေက ကျောင်းမှာ နိုင်ငံခြားကျောင်းသားအသစ်တွေကို ကြိုဆိုဖို့ သူတို့ကို မကြာခဏ ဖိတ်တယ်။',
      th: 'ซูกับยูกิยังเป็นเพื่อนสนิทกันหลายปีต่อมา และทั้งคู่พูดสามภาษาคล่อง มิตรภาพของพวกเขาเริ่มด้วยขนม รอยยิ้ม และความกล้า ครูที่ภูมิใจของพวกเธอมักเชิญพวกเธอต้อนรับนักเรียนต่างชาติใหม่ที่ประหม่าในโรงเรียนที่รักของพวกเขา',
    },
  ],
},
// key words: apology, brother, angry, sorry, family
{
  id: 'story-f14-b2-21',
  level: 'B2',
  titleEn: 'The Apology',
  titleMy: 'တောင်းပန်ခြင်း',
  titleTh: 'การขอโทษ',
  paragraphs: [
    {
      en: 'After a heated argument about money, brothers Ko Min and Ko Htet did not speak to each other for six months. Their mother cried every time she saw them sitting in silence at family dinners.',
      my: 'ငွေကြောင့် ပြင်းထန်တဲ့အငြင်းပွားမှုအပြီး ညီအစ်ကို ကိုမင်းနဲ့ ကိုထက်က ခြောက်လကြာ စကားမပြောကြဘူး။ မိသားစုညစာတွေမှာ တိတ်ဆိတ်စွာ ထိုင်နေတာကို မြင်တိုင်း အမေက ငိုတယ်။',
      th: 'หลังการโต้เถียงรุนแรงเรื่องเงิน พี่น้องโกมินกับโกเท็ตไม่พูดกันหกเดือน แม่ของพวกเขาร้องไห้ทุกครั้งที่เห็นพวกเขานั่งเงียบที่อาหารค่ำครอบครัว',
    },
    {
      en: 'The older brother, Ko Min, knew he had said cruel things in anger. Although his pride told him to wait for an apology, his love for his brother grew stronger than his pride.',
      my: 'အစ်ကိုကြီး ကိုမင်းက ဒေါသနဲ့ ရက်စက်တဲ့စကားတွေ ပြောခဲ့တာ သိတယ်။ ဂုဏ်သိက္ခာက တောင်းပန်မှုကို စောင့်ဖို့ ပြောပေမယ့် ညီကို ချစ်တဲ့စိတ်က ဂုဏ်သိက္ခာထက် ပိုအားကောင်းလာတယ်။',
      th: 'พี่ชายคนโต โกมิน รู้ว่าเขาพูดคำโหดร้ายด้วยความโกรธ แม้ความภาคภูมิใจบอกให้เขารอคำขอโทษ แต่ความรักที่มีต่อน้องแข็งแกร่งกว่าความภาคภูมิใจ',
    },
    {
      en: 'One rainy evening, he knocked on his brother\'s door with his favorite childhood snacks. When Ko Htet opened the door, Ko Min simply said, I was wrong, and I am sorry.',
      my: 'မိုးရွာတဲ့ တစ်ညမှာ သူက ငယ်ဘဝအကြိုက်ဆုံးမုန့်တွေနဲ့ ညီရဲ့တံခါးကို ခေါက်တယ်။ ကိုထက် တံခါးဖွင့်တဲ့အခါ ကိုမင်းက ငါမှားတယ်၊ တောင်းပန်တယ်လို့ ရိုးရိုးလေး ပြောတယ်။',
      th: 'เย็นวันฝนตกวันหนึ่ง เขาเคาะประตูบ้านน้องพร้อมขนมโปรดวัยเด็ก เมื่อโกเท็ตเปิดประตู โกมินเพียงพูดว่า ฉันผิด และฉันขอโทษ',
    },
    {
      en: 'They talked until midnight, cried a little, and laughed a lot. Their mother, listening from the next room, finally smiled through her tears.',
      my: 'သူတို့ သန်းခေါင်အထိ စကားပြောပြီး နည်းနည်းငိုကာ အများကြီး ရယ်ကြတယ်။ နောက်အခန်းက နားထောင်နေတဲ့ အမေက နောက်ဆုံး မျက်ရည်တွေကြားက ပြုံးတယ်။',
      th: 'พวกเขาคุยกันจนถึงเที่ยงคืน ร้องไห้นิดหน่อย และหัวเราะมาก แม่ของพวกเขา ฟังจากห้องข้าง ๆ ในที่สุดก็ยิ้มผ่านน้ำตา',
    },
    {
      en: 'The brothers now meet every Sunday for dinner with their mother. She says those weekly dinners healed her heart completely. Their deeply moved mother lovingly framed a beautiful photo of that emotional rainy evening\'s precious reunion dinner.',
      my: 'ညီအစ်ကိုတွေက အခု တနင်္ဂနွေတိုင်း အမေနဲ့ ညစာစားဖို့ တွေ့တယ်။ အဲဒီအပတ်စဉ်ညစာတွေက သူ့နှလုံးသားကို လုံးဝကုစားပေးတယ်လို့ အမေက ပြောတယ်။ အမေက အဲဒီမိုးရွာတဲ့ည ပြန်လည်ဆုံတွေ့ညစာရဲ့ ဓာတ်ပုံကို ဘောင်ခတ်တယ်။',
      th: 'พี่น้องตอนนี้พบกันทุกวันอาทิตย์เพื่ออาหารค่ำกับแม่ เธอบอกว่าอาหารค่ำรายสัปดาห์เหล่านั้นรักษาหัวใจของเธอจนหายสมบูรณ์ แม่ที่ซาบซึ้งอย่างลึกซึ้งใส่กรอบรูปสวยของอาหารค่ำการพบกันอันมีค่าของเย็นวันฝนตกที่ซาบซึ้งนั้นอย่างรักใคร่',
    },
  ],
},
// key words: recipe, secret, noodle, patience, shop
{
  id: 'story-f14-b2-22',
  level: 'B2',
  titleEn: 'The Secret Recipe',
  titleMy: 'လျှို့ဝှက်ချက်ပြုတ်နည်း',
  titleTh: 'สูตรลับ',
  paragraphs: [
    {
      en: 'Daw Khin\'s noodle shop had the longest queue in town, and everyone wondered what made her soup so special. Competitors offered her money for the recipe, but she always refused with a smile.',
      my: 'ဒေါ်ခင်ရဲ့ ခေါက်ဆွဲဆိုင်မှာ မြို့ထဲမှာ တန်းအရှည်ဆုံးရှိပြီး သူ့ဟင်းချို ဘာကြောင့် ဒီလောက်ထူးခြားလဲဆိုတာ အားလုံး အံ့သြတယ်။ ပြိုင်ဘက်တွေက ချက်ပြုတ်နည်းအတွက် ငွေပေးဖို့ ကမ်းလှမ်းပေမယ့် သူက အမြဲပြုံးပြီး ငြင်းတယ်။',
      th: 'ร้านก๋วยเตี๋ยวของดอคินมีคิวยาวที่สุดในเมือง และทุกคนสงสัยว่าอะไรทำให้น้ำซุปของเธอพิเศษ คู่แข่งเสนอเงินซื้อสูตร แต่เธอปฏิเสธด้วยรอยยิ้มเสมอ',
    },
    {
      en: 'When she turned seventy, her granddaughter begged to learn the secret. Daw Khin finally agreed, but only if the girl promised to cook with love, not just for profit.',
      my: 'အသက်ခုနစ်ဆယ် ပြည့်တဲ့အခါ မြေးမလေးက လျှို့ဝှက်ချက်ကို သင်ဖို့ တောင်းပန်တယ်။ ဒေါ်ခင်က နောက်ဆုံး သဘောတူတယ်၊ ဒါပေမယ့် ကောင်မလေးက အမြတ်အတွက်သာမက ချစ်ခြင်းမေတ္တာနဲ့ ချက်မယ်လို့ ကတိပေးမှသာ။',
      th: 'เมื่อเธออายุเจ็ดสิบ หลานสาวอ้อนวอนขอเรียนความลับ ดอคินตกลงในที่สุด แต่เฉพาะถ้าเด็กหญิงสัญญาจะทำอาหารด้วยความรัก ไม่ใช่แค่เพื่อกำไร',
    },
    {
      en: 'The secret, it turned out, was not a rare ingredient but patience: the broth had to simmer for exactly six hours, and the noodles had to be made fresh every morning.',
      my: 'လျှို့ဝှက်ချက်က ရှားပါးပါဝင်ပစ္စည်း မဟုတ်ဘဲ စိတ်ရှည်မှုဖြစ်နေတယ်။ ဟင်းရည်က တိတိကျကျ ခြောက်နာရီ တည်ထားရပြီး ခေါက်ဆွဲက မနက်တိုင်း လတ်လတ်ဆတ်ဆတ် လုပ်ရတယ်။',
      th: 'ความลับ ปรากฏว่า ไม่ใช่วัตถุดิบหายากแต่คือความอดทน น้ำซุปต้องเคี่ยวพอดีหกชั่วโมง และเส้นต้องทำสดทุกเช้า',
    },
    {
      en: 'Today, the granddaughter runs the shop with the same dedication. The queue is still long, and Daw Khin\'s legacy lives on in every bowl.',
      my: 'ဒီနေ့ မြေးမလေးက တူညီတဲ့စိတ်အားထက်သန်မှုနဲ့ ဆိုင်ကို လည်ပတ်တယ်။ တန်းက အခုထိ ရှည်နေတုန်းပဲ၊ ဒေါ်ခင်ရဲ့ အမွေက ပန်းကန်တိုင်းမှာ ရှင်သန်နေတယ်။',
      th: 'วันนี้ หลานสาวบริหารร้านด้วยความทุ่มเทเดียวกัน คิวยังยาว และมรดกของดอคินมีชีวิตในทุกชาม',
    },
    {
      en: 'The granddaughter has added two new dishes to the menu, but the famous soup remains unchanged. Some secrets, she says, should never change. Famous food critics from the bustling capital have written truly glowing reviews about the charming little family shop.',
      my: 'မြေးမလေးက menu မှာ ဟင်းအသစ်နှစ်မျိုး ထည့်ထားပေမယ့် နာမည်ကြီးဟင်းချိုကတော့ မပြောင်းလဲဘူး။ တချို့လျှို့ဝှက်ချက်တွေက ဘယ်တော့မှ မပြောင်းသင့်ဘူးလို့ ပြောတယ်။ မြို့တော်က အစားအသောက်ဝေဖန်ရေးသမားတွေက ဆိုင်သေးသေးလေးအကြောင်း တောက်ပတဲ့ review တွေ ရေးတယ်။',
      th: 'หลานสาวเพิ่มอาหารใหม่สองอย่างในเมนู แต่น้ำซุปชื่อดังไม่เปลี่ยน เธอบอกว่าความลับบางอย่างไม่ควรเปลี่ยน นักวิจารณ์อาหารชื่อดังจากเมืองหลวงที่คึกคักเขียนรีวิวเรืองรองอย่างแท้จริงเกี่ยวกับร้านครอบครัวเล็กที่มีเสน่ห์',
    },
  ],
},
// key words: letter, home, mother, dream, proud
{
  id: 'story-f14-b2-23',
  level: 'B2',
  titleEn: 'The Letter Home',
  titleMy: 'အိမ်ကိုပို့တဲ့စာ',
  titleTh: 'จดหมายถึงบ้าน',
  paragraphs: [
    {
      en: 'Working in Malaysia for three years, Aung Kyaw sent money home every month, but he rarely wrote about his feelings. His mother kept every short message he sent.',
      my: 'မလေးရှားမှာ သုံးနှစ်အလုပ်လုပ်ရင်း အောင်ကျော်က လတိုင်း အိမ်ကို ငွေပို့ပေမယ့် ခံစားချက်တွေအကြောင်း ရှားရှားပါးပါးပဲ ရေးတယ်။ အမေက သူပို့တဲ့ စာတိုတိုင်းကို သိမ်းထားတယ်။',
      th: 'ทำงานในมาเลเซียสามปี อองจอส่งเงินกลับบ้านทุกเดือน แต่เขาแทบไม่เขียนเรื่องความรู้สึก แม่ของเขาเก็บข้อความสั้นทุกข้อความที่เขาส่ง',
    },
    {
      en: 'One night, feeling homesick, he decided to write a real letter, not just a quick message. He described the tall buildings, the strange food, and the friends he had made.',
      my: 'တစ်ည အိမ်လွမ်းစိတ်ခံစားရပြီး စာတိုမဟုတ်ဘဲ တကယ့်စာတစ်စောင် ရေးဖို့ ဆုံးဖြတ်တယ်။ အထပ်မြင့်အဆောက်အအုံတွေ၊ ထူးဆန်းတဲ့အစားအစာ၊ ရခဲ့တဲ့သူငယ်ချင်းတွေအကြောင်း ဖော်ပြတယ်။',
      th: 'คืนหนึ่ง รู้สึกคิดถึงบ้าน เขาตัดสินใจเขียนจดหมายจริง ไม่ใช่แค่ข้อความด่วน เขาบรรยายตึกสูง อาหารแปลก และเพื่อนที่เขาพบ',
    },
    {
      en: 'He also wrote about his dream: to save enough to open a small repair shop back home. He wanted his mother to know that every difficult day had a purpose.',
      my: 'သူ့အိပ်မက်အကြောင်းလည်း ရေးတယ်။ အိမ်မှာ ပြုပြင်ရေးဆိုင်သေးသေးလေး ဖွင့်နိုင်လောက်အောင် စုဖို့ပါ။ ခက်ခဲတဲ့နေ့တိုင်းမှာ ရည်ရွယ်ချက်ရှိတယ်ဆိုတာ အမေ သိစေချင်တယ်။',
      th: 'เขาเขียนเรื่องความฝันด้วย นั่นคือเก็บเงินพอเพื่อเปิดร้านซ่อมเล็ก ๆ ที่บ้าน เขาอยากให้แม่รู้ว่าทุกวันที่ยากมีจุดมุ่งหมาย',
    },
    {
      en: 'When his mother received the letter, she read it aloud to the whole family, crying with pride. Aung Kyaw realized that words can travel where money cannot.',
      my: 'အမေ စာရတော့ မိသားစုတစ်ခုလုံးကို ကျယ်လောင်စွာ ဖတ်ပြပြီး ဂုဏ်ယူမှုနဲ့ ငိုတယ်။ စကားလုံးတွေက ငွေမရောက်နိုင်တဲ့နေရာကို ရောက်နိုင်တယ်ဆိုတာ အောင်ကျော် သဘောပေါက်တယ်။',
      th: 'เมื่อแม่ได้รับจดหมาย เธออ่านออกเสียงให้ทั้งครอบครัวฟัง ร้องไห้ด้วยความภาคภูมิใจ อองจอตระหนักว่าคำพูดเดินทางไปที่ที่เงินไปไม่ถึงได้',
    },
    {
      en: 'Aung Kyaw finally saved enough and opened his repair shop last month. His mother cried again, this time with pure joy. He excitedly plans to hire two bright young assistants from his beloved home village starting next month.',
      my: 'အောင်ကျော်က နောက်ဆုံး လုံလောက်အောင် စုပြီး ပြီးခဲ့တဲ့လက ပြုပြင်ရေးဆိုင် ဖွင့်တယ်။ အမေက ထပ်ငိုတယ်၊ ဒီတစ်ခါ စစ်မှန်တဲ့ဝမ်းသာမှုနဲ့။ သူက နောက်လ ရွာက လူငယ်အကူနှစ်ယောက် ငှားဖို့ စီစဉ်တယ်။',
      th: 'อองจอในที่สุดเก็บเงินพอและเปิดร้านซ่อมเมื่อเดือนที่แล้ว แม่ของเขาร้องไห้อีกครั้ง คราวนี้ด้วยความสุขบริสุทธิ์ เขาวางแผนอย่างตื่นเต้นจะจ้างผู้ช่วยหนุ่มสาวที่ฉลาดสองคนจากหมู่บ้านบ้านเกิดที่รักเริ่มเดือนหน้า',
    },
  ],
},
// key words: smart, technology, learn, curious, young
{
  id: 'story-f14-b2-24',
  level: 'B2',
  titleEn: 'The Smart Assistant',
  titleMy: 'စမတ်အကူ',
  titleTh: 'ผู้ช่วยอัจฉริยะ',
  paragraphs: [
    {
      en: 'Daw Nwe, aged sixty-eight, received a smart speaker as a birthday gift from her children. At first, she treated it like a strange box that might break if touched.',
      my: 'အသက်ခြောက်ဆယ့်ရှစ်နှစ်ရှိ ဒေါ်နွယ်က မွေးနေ့လက်ဆောင်အဖြစ် သားသမီးတွေဆီက စမတ်စပီကာတစ်ခု ရတယ်။ အစမှာ ထိရင် ကွဲနိုင်တဲ့ ထူးဆန်းတဲ့ဘူးတစ်ခုလို ဆက်ဆံတယ်။',
      th: 'ดอนเว อายุหกสิบแปด ได้รับลำโพงอัจฉริยะเป็นของขวัญวันเกิดจากลูก ๆ ตอนแรก เธอปฏิบัติกับมันเหมือนกล่องแปลกที่อาจแตกถ้าสัมผัส',
    },
    {
      en: 'Her grandson taught her the magic words to play old songs, check the weather, and set reminders for her medicine. Within a week, she was asking it questions all day long.',
      my: 'မြေးက သီချင်းဟောင်းတွေ ဖွင့်ဖို့၊ ရာသီဥတုစစ်ဖို့၊ ဆေးအတွက် သတိပေးချက်သတ်မှတ်ဖို့ မှော်စကားလုံးတွေ သင်ပေးတယ်။ တစ်ပတ်အတွင်း သူက တစ်နေ့လုံး မေးခွန်းတွေ မေးနေတယ်။',
      th: 'หลานชายสอนเธอคำวิเศษเพื่อเล่นเพลงเก่า ตรวจอากาศ และตั้งเตือนยา ภายในหนึ่งสัปดาห์ เธอถามคำถามมันทั้งวัน',
    },
    {
      en: 'The device reminded her to take her pills, told her when it would rain, and even read her favorite stories aloud in the evenings.',
      my: 'စက်က ဆေးသောက်ဖို့ သတိပေးတယ်၊ မိုးရွာမယ့်အချိန် ပြောတယ်၊ ညနေတွေမှာ အကြိုက်ဆုံးပုံပြင်တွေကိုတောင် ကျယ်လောင်စွာ ဖတ်ပြတယ်။',
      th: 'อุปกรณ์เตือนเธอให้กินยา บอกเธอเมื่อฝนจะตก และยังอ่านเรื่องโปรดของเธอออกเสียงตอนเย็น',
    },
    {
      en: 'Daw Nwe now tells her friends that learning new technology has no age limit. Her curiosity, she says, keeps her young.',
      my: 'ဒေါ်နွယ်က အခု သူငယ်ချင်းတွေကို နည်းပညာအသစ် သင်ယူတာမှာ အသက်ကန့်သတ်ချက် မရှိဘူးလို့ ပြောတယ်။ စူးစမ်းလိုစိတ်က သူ့ကို နုပျိုစေတယ်လို့ ပြောတယ်။',
      th: 'ดอนเวตอนนี้บอกเพื่อนว่าการเรียนเทคโนโลยีใหม่ไม่มีขีดจำกัดอายุ ความอยากรู้อยากเห็นของเธอ เธอบอก ทำให้เธอเด็กลง',
    },
    {
      en: 'Her grandchildren now compete to teach her new tricks, and Daw Nwe learns them all with delight. She proves every day that curiosity has no age. Her impressed doctor happily says her sharp memory has wonderfully improved since she bravely started learning exciting new skills.',
      my: 'သူ့မြေးတွေက အခု လှည့်ကွက်အသစ်တွေ သင်ပေးဖို့ ပြိုင်ကြပြီး ဒေါ်နွယ်က ဝမ်းသာအားရ သင်ယူတယ်။ စူးစမ်းလိုစိတ်မှာ အသက်အရွယ် မရှိဘူးဆိုတာ နေ့တိုင်း သက်သေပြတယ်။ နည်းပညာအသစ်တွေ စသင်ကတည်းက မှတ်ဉာဏ် တိုးတက်လာတယ်လို့ ဆရာဝန်က ပြောတယ်။',
      th: 'หลาน ๆ ของเธอตอนนี้แข่งกันสอนทริคใหม่ให้เธอ และดอนเวเรียนทั้งหมดด้วยความยินดี เธอพิสูจน์ทุกวันว่าความอยากรู้อยากเห็นไม่มีอายุ หมอที่ประทับใจของเธอพูดอย่างมีความสุขว่าความจำที่เฉียบแหลมของเธอดีขึ้นอย่างน่าอัศจรรย์ตั้งแต่เธอเริ่มเรียนทักษะใหม่ที่น่าตื่นเต้นอย่างกล้าหาญ',
    },
  ],
},
];
