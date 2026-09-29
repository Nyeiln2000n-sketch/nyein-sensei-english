// FASE 14 Ola 3 — stories batch 2: 40 graded stories (22 B1 / 18 B2).
// Each story: 150-250 English words, paragraph-by-paragraph Myanmar translation.
// No overlap with stories-batch-1 or src/data/stories.ts.
// B1 = connectors and longer sentences | B2 = richer vocabulary, subordinate clauses.
import type { Story } from '../../types';

export const storiesBatch2: Story[] = [
// key words: interview, nervous, experience, confident, resume
{
  id: 'story-f14-b1-1',
  level: 'B1',
  titleEn: 'The Job Interview',
  titleMy: 'အလုပ်အင်တာဗျူး',
  paragraphs: [
    {
      en: 'Aung Min woke up early on Monday morning because he had a job interview at nine o\'clock. He had prepared for this interview for a whole week, and he felt both nervous and excited.',
      my: 'အောင်မင်းက တနင်္လာနေ့မနက် အစောကြီး နိုးထခဲ့တယ်၊ ဘာလို့လဲဆိုတော့ ကိုးနာရီမှာ အလုပ်အင်တာဗျူးရှိလို့ပါ။ ဒီအင်တာဗျူးအတွက် တစ်ပတ်လုံး ပြင်ဆင်ခဲ့ပြီး စိုးရိမ်စိတ်နဲ့ စိတ်လှုပ်ရှားမှုနှစ်ခုလုံး ခံစားရတယ်။',
    },
    {
      en: 'He chose his best shirt, printed his resume, and arrived at the office thirty minutes early. The receptionist smiled and asked him to wait in the meeting room.',
      my: 'သူက အကောင်းဆုံးအင်္ကျီကို ရွေးချယ်ပြီး ကိုယ်ရေးအကျဉ်းကို print ထုတ်ကာ ရုံးကို မိနစ်သုံးဆယ်အလို ရောက်ခဲ့တယ်။ ဧည့်ခံက ပြုံးပြီး အစည်းအဝေးခန်းမှာ စောင့်ဖို့ ပြောတယ်။',
    },
    {
      en: 'The interviewer asked about his experience, his strengths, and why he wanted the job. Aung Min answered calmly, giving clear examples from his previous work.',
      my: 'အင်တာဗျူးသူက သူ့အတွေ့အကြုံ၊ အားသာချက်တွေနဲ့ ဒီအလုပ်ကို ဘာကြောင့်လိုချင်လဲဆိုတာ မေးတယ်။ အောင်မင်းက စိတ်အေးအေးနဲ့ ဖြေပြီး အရင်အလုပ်က ရှင်းလင်းတဲ့ဥပမာတွေ ပေးတယ်။',
    },
    {
      en: 'When the interviewer asked about his weakness, he was honest. He said he used to be shy, but he had joined a speaking club to improve himself.',
      my: 'အင်တာဗျူးသူက သူ့အားနည်းချက်ကို မေးတဲ့အခါ သူက ရိုးသားခဲ့တယ်။ အရင်က ရှက်တတ်ပေမယ့် ကိုယ့်ကိုယ်ကို တိုးတက်ဖို့ စကားပြောကလပ်ဝင်ခဲ့တယ်လို့ ပြောတယ်။',
    },
    {
      en: 'Three days later, he received a phone call. He had got the job! He called his mother immediately to share the happy news.',
      my: 'သုံးရက်အကြာမှာ သူ ဖုန်းခေါ်ဆိုမှုတစ်ခု ရရှိခဲ့တယ်။ အလုပ်ရသွားပြီ။ သူက အမေကို ချက်ချင်းဖုန်းဆက်ပြီး ဝမ်းသာစရာသတင်းကို မျှဝေတယ်။',
    },
    {
      en: 'That evening, Aung Min celebrated with his friends at a small restaurant. He told them that thorough preparation had made all the difference, and he encouraged everyone to believe in themselves when opportunities come.',
      my: 'အဲဒီညနေမှာ အောင်မင်းက သူငယ်ချင်းတွေနဲ့ စားသောက်ဆိုင်သေးသေးလေးမှာ အောင်ပွဲခံတယ်။ သေချာပြင်ဆင်မှုက အရာအားလုံးကို ပြောင်းလဲစေခဲ့တယ်လို့ သူတို့ကို ပြောပြီး အခွင့်အလမ်းတွေ ရောက်လာတဲ့အခါ ကိုယ့်ကိုယ်ကို ယုံကြည်ဖို့ အားလုံးကို အားပေးတယ်။',
    },
  ],
},
// key words: customer, angry, calm, warranty, patience
{
  id: 'story-f14-b1-2',
  level: 'B1',
  titleEn: 'A Difficult Customer',
  titleMy: 'ခက်ခဲတဲ့ဖောက်သည်',
  paragraphs: [
    {
      en: 'May works at a mobile phone shop in downtown Yangon. She likes her job, but some days are harder than others because customers can be very demanding.',
      my: 'မေက ရန်ကုန်မြို့လယ်က မိုဘိုင်းဖုန်းဆိုင်မှာ အလုပ်လုပ်တယ်။ သူက အလုပ်ကို ကြိုက်ပေမယ့် တစ်ချို့နေ့တွေက ပိုခက်ခဲတယ်၊ ဘာလို့လဲဆိုတော့ ဖောက်သည်တွေက အရမ်းတောင်းဆိုတတ်လို့ပါ။',
    },
    {
      en: 'One afternoon, an angry man came in holding a phone box. He shouted that the phone had stopped working after only two days.',
      my: 'တစ်နေ့နေ့လည်မှာ ဒေါသထွက်နေတဲ့အမျိုးသားတစ်ယောက် ဖုန်းဘူးကိုင်ပြီး ဝင်လာတယ်။ ဖုန်းက နှစ်ရက်တည်းနဲ့ အလုပ်မလုပ်တော့ဘူးလို့ အော်တယ်။',
    },
    {
      en: 'May stayed calm and listened carefully. She checked the receipt and discovered that the phone was still under warranty.',
      my: 'မေက စိတ်အေးအေးထားပြီး သေချာနားထောင်တယ်။ ပြေစာကို စစ်ကြည့်တော့ ဖုန်းက အာမခံသက်တမ်းအတွင်းမှာ ရှိနေသေးတာကို တွေ့တယ်။',
    },
    {
      en: 'She explained the warranty policy politely and offered him a replacement phone. Slowly, the man\'s anger disappeared, and he apologized for shouting.',
      my: 'သူက အာမခံမူဝါဒကို ယဉ်ကျေးစွာ ရှင်းပြပြီး အစားထိုးဖုန်းတစ်လုံး ကမ်းလှမ်းတယ်။ ဖြည်းဖြည်းချင်း အမျိုးသားရဲ့ ဒေါသက ပျောက်သွားပြီး အော်ခဲ့တာအတွက် တောင်းပန်တယ်။',
    },
    {
      en: 'Her manager saw everything and praised her patience. May learned that staying calm can turn a difficult situation into a good one.',
      my: 'သူ့မန်နေဂျာက အရာအားလုံး မြင်ခဲ့ပြီး သူ့စိတ်ရှည်မှုကို ချီးကျူးတယ်။ စိတ်အေးအေးထားတာက ခက်ခဲတဲ့အခြေအနေကို ကောင်းတဲ့အခြေအနေအဖြစ် ပြောင်းနိုင်တယ်ဆိုတာ မေသင်ယူခဲ့တယ်။',
    },
    {
      en: 'From that day on, May became known as the most patient employee in the shop. Whenever a difficult customer arrived, her colleagues asked her for help, and she always smiled and handled every difficult situation with great grace.',
      my: 'အဲဒီနေ့ကစပြီး မေက ဆိုင်မှာ စိတ်အရှည်ဆုံးဝန်ထမ်းအဖြစ် လူသိများလာတယ်။ ခက်ခဲတဲ့ဖောက်သည် ရောက်လာတိုင်း လုပ်ဖော်ကိုင်ဖက်တွေက သူ့အကူအညီ တောင်းပြီး သူက အမြဲပြုံးကာ ကျက်သရေရှိရှိ ကိုင်တွယ်တယ်။',
    },
  ],
},
// key words: luggage, suitcase, worried, airline, relieved
{
  id: 'story-f14-b1-3',
  level: 'B1',
  titleEn: 'The Missing Luggage',
  titleMy: 'ပျောက်ဆုံးနေတဲ့ခရီးဆောင်အိတ်',
  paragraphs: [
    {
      en: 'Daw Hla flew from Yangon to Bangkok for a holiday. When she arrived, she waited at the luggage belt, but her suitcase never appeared.',
      my: 'ဒေါ်လှက အားလပ်ရက်အတွက် ရန်ကုန်ကနေ ဘန်ကောက်ကို လေယာဉ်စီးခဲ့တယ်။ ရောက်တဲ့အခါ ခရီးဆောင်အိတ်ကြိုးမှာ စောင့်ခဲ့ပေမယ့် သူ့အိတ်က ဘယ်တော့မှ ပေါ်မလာဘူး။',
    },
    {
      en: 'She felt worried because all her clothes and medicine were inside the suitcase. She went to the lost luggage counter to report the problem.',
      my: 'သူ စိုးရိမ်ခဲ့တယ်၊ ဘာလို့လဲဆိုတော့ အဝတ်အစားတွေနဲ့ ဆေးတွေအားလုံး အိတ်ထဲမှာ ရှိလို့ပါ။ ပြဿနာကို တိုင်ဖို့ ပျောက်ဆုံးအိတ်ကောင်တာကို သွားတယ်။',
    },
    {
      en: 'The officer was kind and helpful. He took her details, gave her a reference number, and promised to call as soon as they found the bag.',
      my: 'တာဝန်ရှိက စေတနာကောင်းပြီး အကူအညီဖြစ်တယ်။ သူ့အချက်အလက်တွေကို ယူပြီး ရည်ညွှန်းနံပါတ်ပေးကာ အိတ်တွေ့တာနဲ့ ဖုန်းဆက်မယ်လို့ ကတိပေးတယ်။',
    },
    {
      en: 'Daw Hla bought some basic clothes at the airport shop. That evening, the airline called: her suitcase had been found in Singapore!',
      my: 'ဒေါ်လှက လေဆိပ်ဆိုင်မှာ အခြေခံအဝတ်အစားတချို့ ဝယ်တယ်။ အဲဒီညနေမှာ လေကြောင်းလိုင်းက ဖုန်းဆက်တယ်။ သူ့အိတ်ကို စင်ကာပူမှာ တွေ့ပြီတဲ့။',
    },
    {
      en: 'The next morning, the suitcase was delivered to her hotel. She was so relieved that she almost cried with happiness.',
      my: 'နောက်တစ်နေ့မနက်မှာ အိတ်ကို သူ့ဟိုတယ်ကို ပို့ပေးတယ်။ သူ အရမ်းစိတ်သက်သာရာရလို့ ဝမ်းသာပြီး ငိုလုမတတ်ပဲ။',
    },
    {
      en: 'Daw Hla enjoyed the rest of her holiday without any more problems. When she returned home, she told her friends to always keep important medicine in their hand luggage, just in case. She also decided to label her suitcase clearly with her name and phone number for all future trips, so this would never happen again.',
      my: 'ဒေါ်လှက ကျန်တဲ့အားလပ်ရက်ကို ပြဿနာမရှိဘဲ ပျော်ရွှင်စွာ ကုန်ဆုံးတယ်။ အိမ်ပြန်ရောက်တဲ့အခါ အရေးကြီးတဲ့ဆေးတွေကို လက်ဆွဲအိတ်ထဲမှာ အမြဲထားဖို့ သူငယ်ချင်းတွေကို ပြောတယ်၊ ကြိုတင်ကာကွယ်တဲ့အနေနဲ့။ သူက နောင်ခရီးတိုင်းအတွက် ဒါမျိုး ထပ်မဖြစ်အောင် အိတ်မှာ နာမည်နဲ့ ဖုန်းနံပါတ်ကို ရှင်းရှင်းလင်းလင်း တံဆိပ်ကပ်ဖို့ ဆုံးဖြတ်တယ်။',
    },
  ],
},
// key words: hotel, reservation, manager, apologize, upgrade
{
  id: 'story-f14-b1-4',
  level: 'B1',
  titleEn: 'The Hotel Mix-up',
  titleMy: 'ဟိုတယ်အမှား',
  paragraphs: [
    {
      en: 'Ko Thet booked a hotel room online for his business trip to Mandalay. When he arrived late at night, the receptionist could not find his reservation.',
      my: 'ကိုသက်က မန္တလေးစီးပွားရေးခရီးအတွက် ဟိုတယ်အခန်းကို အွန်လိုင်းက booking လုပ်ခဲ့တယ်။ ညနက်မှ ရောက်တဲ့အခါ ဧည့်ခံက သူ့ booking ကို ရှာမတွေ့ဘူး။',
    },
    {
      en: 'He showed the confirmation email on his phone, but the hotel had no record of it. Ko Thet was tired and frustrated.',
      my: 'သူက ဖုန်းပေါ်က အတည်ပြုအီးမေးလ်ကို ပြပေမယ့် ဟိုတယ်မှာ မှတ်တမ်းမရှိဘူး။ ကိုသက်က ပင်ပန်းပြီး စိတ်ပျက်နေတယ်။',
    },
    {
      en: 'The manager came to help. After checking carefully, she discovered that the booking had been made for the wrong month.',
      my: 'မန်နေဂျာက ကူညီဖို့ ရောက်လာတယ်။ သေချာစစ်ကြည့်ပြီးနောက် booking က လ မှားပြီး လုပ်ထားတာကို တွေ့တယ်။',
    },
    {
      en: 'Instead of arguing, the manager apologized and upgraded him to a better room at no extra charge. Ko Thet was pleasantly surprised.',
      my: 'အငြင်းပွားမယ့်အစား မန်နေဂျာက တောင်းပန်ပြီး ပိုကောင်းတဲ့အခန်းကို အပိုအခကြေးငွေမယူဘဲ မြှင့်ပေးတယ်။ ကိုသက်က အံ့သြဝမ်းသာဖြစ်သွားတယ်။',
    },
    {
      en: 'The next morning, he left a five-star review online. He learned that mistakes happen, but good service can fix them.',
      my: 'နောက်တစ်နေ့မနက်မှာ သူက အွန်လိုင်းမှာ ကြယ်ငါးပွင့် review ရေးခဲ့တယ်။ အမှားတွေ ဖြစ်တတ်ပေမယ့် ဝန်ဆောင်မှုကောင်းက ပြင်နိုင်တယ်ဆိုတာ သင်ယူခဲ့တယ်။',
    },
    {
      en: 'Ko Thet slept wonderfully in the comfortable upgraded room. The next morning, he thanked the manager personally and promised to stay at the same hotel on every future trip to Mandalay. He told his business partners about the wonderful service, and two of them booked the same hotel for their next visit to the city.',
      my: 'ကိုသက်က သက်တောင့်သက်သာရှိတဲ့ မြှင့်ပေးထားတဲ့အခန်းမှာ အရမ်းကောင်းကောင်း အိပ်စက်တယ်။ နောက်တစ်နေ့မနက်မှာ မန်နေဂျာကို ကိုယ်တိုင်ကျေးဇူးတင်ပြီး နောင်မန္တလေးခရီးတိုင်းမှာ ဒီဟိုတယ်မှာပဲ တည်းမယ်လို့ ကတိပေးတယ်။ သူက စီးပွားဖက်တွေကို အံ့ဩစရာကောင်းတဲ့ ဝန်ဆောင်မှုအကြောင်း ပြောပြပြီး သူတို့ထဲက နှစ်ယောက်က မြို့ကို နောက်လာတဲ့အခါ ဒီဟိုတယ်မှာပဲ booking လုပ်တယ်။',
    },
  ],
},
// key words: conference, presentation, nervous, proud, abroad
{
  id: 'story-f14-b1-5',
  level: 'B1',
  titleEn: 'The Business Trip',
  titleMy: 'စီးပွားရေးခရီးစဉ်',
  paragraphs: [
    {
      en: 'Su Su had never traveled abroad for work before, so she was excited when her boss asked her to attend a conference in Singapore.',
      my: 'စုစုက အလုပ်အတွက် နိုင်ငံခြားတစ်ခါမှ မသွားဖူးဘူး၊ ဒါကြောင့် သူ့သူဌေးက စင်ကာပူကွန်ဖရင့်ကို တက်ဖို့ ပြောတဲ့အခါ စိတ်လှုပ်ရှားခဲ့တယ်။',
    },
    {
      en: 'She prepared her presentation for two weeks. She practiced in front of a mirror every evening until she felt confident.',
      my: 'သူက တင်ပြမှုကို နှစ်ပတ်ကြာ ပြင်ဆင်တယ်။ ယုံကြည်မှုရှိလာတဲ့အထိ ညနေတိုင်း မှန်ရှေ့မှာ လေ့ကျင့်တယ်။',
    },
    {
      en: 'At the conference, she met people from ten different countries. Although she was nervous at first, everyone was friendly and welcoming.',
      my: 'ကွန်ဖရင့်မှာ သူက နိုင်ငံဆယ်နိုင်ငံက လူတွေနဲ့ တွေ့တယ်။ အစမှာ စိုးရိမ်ပေမယ့် အားလုံးက ဖော်ရွေပြီး ကြိုဆိုကြတယ်။',
    },
    {
      en: 'Her presentation went very well. Several people asked questions, and one company even wanted to work with her team.',
      my: 'သူ့တင်ပြမှုက အရမ်းကောင်းသွားတယ်။ လူအများအပြားက မေးခွန်းတွေမေးပြီး ကုမ္ပဏီတစ်ခုကတောင် သူ့အဖွဲ့နဲ့ အလုပ်လုပ်ချင်တယ်။',
    },
    {
      en: 'On the flight home, Su Su felt proud. The trip had taught her that preparation and courage can open new doors.',
      my: 'အပြန်လေယာဉ်ပေါ်မှာ စုစုက ဂုဏ်ယူစိတ်ခံစားရတယ်။ ပြင်ဆင်မှုနဲ့ သတ္တိက တံခါးအသစ်တွေ ဖွင့်ပေးနိုင်တယ်ဆိုတာ ဒီခရီးက သင်ပေးခဲ့တယ်။',
    },
    {
      en: 'Back at the office, Su Su shared everything she had learned with her colleagues. Her boss was so impressed that he asked her to lead the next international project. She keeps the conference badge on her desk as a reminder that stepping outside her comfort zone was the best decision she ever made.',
      my: 'ရုံးပြန်ရောက်တဲ့အခါ စုစုက သင်ယူခဲ့သမျှကို လုပ်ဖော်ကိုင်ဖက်တွေနဲ့ မျှဝေတယ်။ သူ့သူဌေးက အရမ်းအထင်ကြီးလို့ နောက်နိုင်ငံတကာပရောဂျက်ကို ဦးဆောင်ဖို့ တောင်းဆိုတယ်။ သူက သက်တောင့်သက်သာဇုန်အပြင်ထွက်တာက သူလုပ်ဖူးသမျှထဲမှာ အကောင်းဆုံးဆုံးဖြတ်ချက်ဖြစ်တယ်ဆိုတာ သတိရဖို့ ကွန်ဖရင့်တံဆိပ်ကို စားပွဲပေါ် ထားတယ်။',
    },
  ],
},
// key words: doctor, healthy, exercise, advice, lifestyle
{
  id: 'story-f14-b1-6',
  level: 'B1',
  titleEn: 'The Doctor\'s Advice',
  titleMy: 'ဆရာဝန်ရဲ့အကြံဉာဏ်',
  paragraphs: [
    {
      en: 'U Ba is fifty-five years old and works long hours at his shop. Recently, he started feeling tired all the time, so he visited his doctor.',
      my: 'ဦးဘအသက် ငါးဆယ့်ငါးနှစ်ရှိပြီး သူ့ဆိုင်မှာ အချိန်ကြာကြာ အလုပ်လုပ်တယ်။ မကြာသေးခင်က အမြဲပင်ပန်းနေတယ်လို့ ခံစားရလို့ ဆရာဝန်ဆီ သွားတယ်။',
    },
    {
      en: 'The doctor checked his blood pressure and blood sugar. The results showed that U Ba needed to change his lifestyle.',
      my: 'ဆရာဝန်က သွေးပေါင်ချိန်နဲ့ သွေးတွင်းသကြားဓာတ်ကို စစ်တယ်။ ရလဒ်တွေက ဦးဘလူနေမှုပုံစံ ပြောင်းဖို့လိုတယ်ဆိုတာ ပြတယ်။',
    },
    {
      en: 'The doctor advised him to walk for thirty minutes every day, eat less fried food, and sleep at least seven hours each night.',
      my: 'ဆရာဝန်က နေ့တိုင်း မိနစ်သုံးဆယ် လမ်းလျှောက်ဖို့၊ ကြော်တဲ့အစားအစာ လျှော့စားဖို့၊ ညတိုင်း အနည်းဆုံး ခုနစ်နာရီ အိပ်ဖို့ အကြံပေးတယ်။',
    },
    {
      en: 'At first, U Ba found it difficult to change his habits. But his wife supported him, and they started walking together every morning.',
      my: 'အစမှာ ဦးဘအကျင့်တွေ ပြောင်းဖို့ ခက်ခဲတယ်။ ဒါပေမယ့် သူ့ဇနီးက ထောက်ပံ့ပြီး မနက်တိုင်း အတူတူ လမ်းလျှောက်ကြတယ်။',
    },
    {
      en: 'After three months, he felt much healthier and more energetic. He thanked his doctor for the advice that changed his life.',
      my: 'သုံးလအကြာမှာ သူ အများကြီးပိုကျန်းမာပြီး အားအင်ပြည့်လာတယ်။ ဘဝကို ပြောင်းလဲစေတဲ့ အကြံဉာဏ်အတွက် ဆရာဝန်ကို ကျေးဇူးတင်တယ်။',
    },
    {
      en: 'U Ba now walks every morning without fail, and he has even convinced two neighbors to join him. His doctor says his test results have improved remarkably. His grandchildren now join the morning walks during school holidays, and U Ba loves teaching them about healthy living.',
      my: 'ဦးဘက အခု မနက်တိုင်း မပျက်မကွက် လမ်းလျှောက်တယ်၊ အိမ်နီးချင်းနှစ်ယောက်ကိုတောင် အတူလိုက်ဖို့ စည်းရုံးနိုင်တယ်။ စစ်ဆေးမှုရလဒ်တွေ သိသိသာသာ တိုးတက်လာတယ်လို့ ဆရာဝန်က ပြောတယ်။ သူ့မြေးတွေက ကျောင်းပိတ်ရက်တွေမှာ မနက်လမ်းလျှောက်တာမှာ လိုက်ပါလာပြီး ကျန်းမာတဲ့လူနေမှုအကြောင်း သူတို့ကို သင်ပေးရတာ ဦးဘ ကြိုက်တယ်။',
    },
  ],
},
// key words: manager, listen, employee, leadership, profit
{
  id: 'story-f14-b1-7',
  level: 'B1',
  titleEn: 'The New Manager',
  titleMy: 'မန်နေဂျာအသစ်',
  paragraphs: [
    {
      en: 'When the new manager arrived at the small software company, the employees were worried. They had heard that she was very strict.',
      my: 'မန်နေဂျာအသစ်က ဆော့ဖ်ဝဲလ်ကုမ္ပဏီသေးသေးလေးကို ရောက်လာတဲ့အခါ ဝန်ထမ်းတွေ စိုးရိမ်ခဲ့ကြတယ်။ သူက အရမ်းတင်းကျပ်တယ်လို့ ကြားခဲ့ကြလို့ပါ။',
    },
    {
      en: 'On her first day, Daw Ei introduced herself with a warm smile. She said she wanted to listen before making any changes.',
      my: 'ပထမနေ့မှာ ဒေါ်အိက နွေးထွေးတဲ့အပြုံးနဲ့ ကိုယ့်ကိုယ်ကို မိတ်ဆက်တယ်။ အပြောင်းအလဲတွေ မလုပ်ခင် နားထောင်ချင်တယ်လို့ ပြောတယ်။',
    },
    {
      en: 'During the first week, she met every employee individually. She asked about their work, their problems, and their ideas.',
      my: 'ပထမတစ်ပတ်အတွင်း သူက ဝန်ထမ်းတိုင်းနဲ့ တစ်ယောက်ချင်း တွေ့တယ်။ သူတို့အလုပ်၊ ပြဿနာတွေ၊ အကြံဉာဏ်တွေအကြောင်း မေးတယ်။',
    },
    {
      en: 'The employees were surprised by her kindness. Soon, they started sharing ideas they had kept secret for years.',
      my: 'ဝန်ထမ်းတွေက သူ့စေတနာကို အံ့သြခဲ့ကြတယ်။ မကြာခင် နှစ်တွေနဲ့ချီပြီး လျှို့ဝှက်ထားတဲ့ အကြံဉာဏ်တွေကို မျှဝေလာကြတယ်။',
    },
    {
      en: 'Within six months, the company\'s profits doubled. Everyone learned that good leadership starts with listening.',
      my: 'ခြောက်လအတွင်း ကုမ္ပဏီအမြတ် နှစ်ဆတိုးလာတယ်။ ကောင်းတဲ့ခေါင်းဆောင်မှုက နားထောင်ခြင်းကနေ စတယ်ဆိုတာ အားလုံး သင်ယူခဲ့ကြတယ်။',
    },
    {
      en: 'Daw Ei still meets every new employee personally during their first week. She believes this small habit is the secret behind the company\'s continued success. New employees often say that this personal welcome made them feel valued from the very first day, and many stay with the company for years because of it, which makes everyone happy.',
      my: 'ဒေါ်အိက ဝန်ထမ်းအသစ်တိုင်းနဲ့ ပထမတစ်ပတ်မှာ ကိုယ်တိုင်တွေ့တုန်းပဲ။ ဒီအကျင့်သေးသေးလေးက ကုမ္ပဏီရဲ့ ဆက်လက်အောင်မြင်မှုနောက်က လျှို့ဝှက်ချက်လို့ သူ ယုံကြည်တယ်။ ဝန်ထမ်းအသစ်တွေက ဒီကိုယ်ပိုင်ကြိုဆိုမှုက ပထမနေ့ကတည်းက တန်ဖိုးထားခံရသလို ခံစားစေတယ်လို့ မကြာခဏ ပြောပြီး အများအပြားက ဒါကြောင့် ကုမ္ပဏီမှာ နှစ်တွေနဲ့ချီ နေကြတယ်။',
    },
  ],
},
// key words: deadline, team, plan, stress, campaign
{
  id: 'story-f14-b1-8',
  level: 'B1',
  titleEn: 'The Deadline',
  titleMy: 'နောက်ဆုံးရက်',
  paragraphs: [
    {
      en: 'The marketing team had only five days left to finish their campaign. Everyone was stressed because the deadline seemed impossible.',
      my: 'ဈေးကွက်အဖွဲ့မှာ ကမ်ပိန်းပြီးဖို့ ငါးရက်ပဲ ကျန်တော့တယ်။ နောက်ဆုံးရက်က မဖြစ်နိုင်သလို ထင်ရလို့ အားလုံး စိတ်ဖိစီးနေကြတယ်။',
    },
    {
      en: 'The team leader, Nanda, called an emergency meeting. Instead of panicking, he divided the work into small, clear tasks.',
      my: 'အဖွဲ့ခေါင်းဆောင် နန္ဒက အရေးပေါ်အစည်းအဝေး ခေါ်တယ်။ ထိတ်လန့်မယ့်အစား အလုပ်ကို သေးငယ်ရှင်းလင်းတဲ့ တာဝန်တွေ ခွဲတယ်။',
    },
    {
      en: 'Each person knew exactly what to do and when to finish. They worked late together, helping each other whenever someone got stuck.',
      my: 'လူတိုင်းက ဘာလုပ်ရမယ်၊ ဘယ်တော့ပြီးရမယ်ဆိုတာ အတိအကျသိတယ်။ သူတို့ အတူတူ နောက်ကျတဲ့အထိ အလုပ်လုပ်ပြီး တစ်ယောက်ယောက် ပိတ်မိတိုင်း ကူညီကြတယ်။',
    },
    {
      en: 'On the fourth day, everything was ready. They even had time to check the campaign twice before sending it to the client.',
      my: 'စတုတ္ထနေ့မှာ အရာအားလုံး အဆင်သင့်ဖြစ်သွားတယ်။ ဖောက်သည်ကို မပို့ခင် ကမ်ပိန်းကို နှစ်ကြိမ်တောင် စစ်ဖို့ အချိန်ရတယ်။',
    },
    {
      en: 'The client loved the campaign. Nanda told his team that clear planning beats worry every time.',
      my: 'ဖောက်သည်က ကမ်ပိန်းကို အရမ်းကြိုက်တယ်။ ရှင်းလင်းတဲ့စီစဉ်မှုက စိုးရိမ်မှုကို အမြဲအနိုင်ရတယ်လို့ နန္ဒက အဖွဲ့ကို ပြောတယ်။',
    },
    {
      en: 'After the successful campaign, the team celebrated with a big dinner. Nanda reminded them that the real victory was learning to work together under pressure. The client was so happy that they signed a bigger contract for the next campaign, giving the team an even greater challenge to look forward to.',
      my: 'အောင်မြင်တဲ့ကမ်ပိန်းအပြီး အဖွဲ့က ညစာကြီးနဲ့ အောင်ပွဲခံတယ်။ တကယ့်အောင်ပွဲက ဖိအားအောက်မှာ အတူတူအလုပ်လုပ်ဖို့ သင်ယူခဲ့တာပါပဲလို့ နန္ဒက သူတို့ကို သတိပေးတယ်။ ဖောက်သည်က အရမ်းပျော်လို့ နောက်ကမ်ပိန်းအတွက် ပိုကြီးတဲ့စာချုပ် ချုပ်တယ်၊ အဖွဲ့ကို မျှော်လင့်ဖို့ ပိုကြီးတဲ့စိန်ခေါ်မှု ပေးတယ်။',
    },
  ],
},
// key words: project, teamwork, discuss, website, prize
{
  id: 'story-f14-b1-9',
  level: 'B1',
  titleEn: 'The Team Project',
  titleMy: 'အဖွဲ့ပရောဂျက်',
  paragraphs: [
    {
      en: 'Four university students had to build a website together for their final project. At first, they argued about everything.',
      my: 'တက္ကသိုလ်ကျောင်းသားလေးယောက်က နောက်ဆုံးပရောဂျက်အတွက် ဝက်ဘ်ဆိုက်တစ်ခုကို အတူတူ တည်ဆောက်ရတယ်။ အစမှာ အရာအားလုံးနဲ့ ပတ်သက်ပြီး အငြင်းပွားကြတယ်။',
    },
    {
      en: 'Thiri wanted a blue design, while Zaw wanted green. Min wanted many pages, but Hla wanted it simple.',
      my: 'သီရိက အပြာရောင်ဒီဇိုင်း လိုချင်ပြီး ဇော်က အစိမ်းရောင် လိုချင်တယ်။ မင်းက စာမျက်နှာများများ လိုချင်ပေမယ့် လှက ရိုးရှင်းတာကို လိုချင်တယ်။',
    },
    {
      en: 'Their teacher suggested they vote on each decision and respect the majority. Slowly, the arguments turned into discussions.',
      my: 'သူတို့ဆရာက ဆုံးဖြတ်ချက်တိုင်းကို မဲပေးပြီး အများစုကို လေးစားဖို့ အကြံပေးတယ်။ ဖြည်းဖြည်းချင်း အငြင်းပွားမှုတွေက ဆွေးနွေးမှုတွေ ဖြစ်လာတယ်။',
    },
    {
      en: 'They divided the work according to their skills. Thiri designed, Zaw coded, Min wrote the content, and Hla tested everything.',
      my: 'သူတို့က အလုပ်ကို ကျွမ်းကျင်မှုအလိုက် ခွဲတယ်။ သီရိက ဒီဇိုင်းဆွဲ၊ ဇော်က ကုဒ်ရေး၊ မင်းက အကြောင်းအရာရေး၊ လှက အရာအားလုံး စမ်းသပ်တယ်။',
    },
    {
      en: 'Their website won first prize in the class. They learned that teamwork means listening as much as talking.',
      my: 'သူတို့ဝက်ဘ်ဆိုက်က အတန်းမှာ ပထမဆုရတယ်။ အဖွဲ့လိုက်လုပ်ဆောင်မှုဆိုတာ ပြောသလောက် နားထောင်ရတာပါပဲဆိုတာ သူတို့ သင်ယူခဲ့ကြတယ်။',
    },
    {
      en: 'The four students remained close friends after graduation. Whenever they meet, they laugh about their old arguments and agree those disagreements made their project stronger. Their teacher still uses their website as an example for new students, showing clearly what true cooperation and mutual respect can achieve together.',
      my: 'ကျောင်းသားလေးယောက် ဘွဲ့ရပြီးနောက် ရင်းနှီးတဲ့သူငယ်ချင်းတွေ အဖြစ် ဆက်ရှိနေတယ်။ တွေ့တိုင်း အရင်အငြင်းပွားမှုတွေကို ရယ်မောပြီး အဲဒီသဘောထားကွဲမှုတွေက ပရောဂျက်ကို ပိုအားကောင်းစေတယ်လို့ သဘောတူတယ်။ သူတို့ဆရာက သူတို့ဝက်ဘ်ဆိုက်ကို ကျောင်းသားအသစ်တွေအတွက် နမူနာအဖြစ် အခုထိ သုံးပြီး ပူးပေါင်းဆောင်ရွက်မှုနဲ့ လေးစားမှုက ဘာတွေ အောင်မြင်နိုင်လဲဆိုတာ ပြတယ်။',
    },
    {
      en: 'This experience taught everyone involved a valuable lesson that they would remember for the rest of their lives.',
      my: 'ဒီအတွေ့အကြုံက ပါဝင်သူတိုင်းကို ဘဝတစ်သက်လုံး မှတ်မိနေမယ့် အဖိုးတန်သင်ခန်းစာတစ်ခု သင်ပေးခဲ့တယ်။',
    },
  ],
},
// key words: promotion, accountant, confident, achieve, manager
{
  id: 'story-f14-b1-10',
  level: 'B1',
  titleEn: 'The Promotion',
  titleMy: 'ရာထူးတိုး',
  paragraphs: [
    {
      en: 'Hnin has worked as an accountant for four years. She always arrives early, helps her colleagues, and never complains.',
      my: 'နှင်းက စာရင်းကိုင်အဖြစ် လေးနှစ်ကြာ အလုပ်လုပ်ခဲ့တယ်။ သူက အမြဲအစောကြီးရောက်ပြီး လုပ်ဖော်ကိုင်ဖက်တွေကို ကူညီသလို ဘယ်တော့မှ မညည်းညူဘူး။',
    },
    {
      en: 'Last month, a senior position opened in her department. Three people applied, including Hnin.',
      my: 'ပြီးခဲ့တဲ့လက သူ့ဌာနမှာ အကြီးတန်းရာထူး ဖွင့်တယ်။ နှင်းအပါအဝင် လူသုံးယောက် လျှောက်တယ်။',
    },
    {
      en: 'During the interview, she spoke confidently about her achievements. She had saved the company money by finding errors in old reports.',
      my: 'အင်တာဗျူးမှာ သူက အောင်မြင်မှုတွေအကြောင်း ယုံကြည်မှုရှိရှိ ပြောတယ်။ အစီရင်ခံစာဟောင်းတွေက အမှားတွေကို ရှာတွေ့ပြီး ကုမ္ပဏီကို ငွေစုပေးခဲ့တယ်။',
    },
    {
      en: 'A week later, her manager called her into the office. With a big smile, he told her she had got the promotion.',
      my: 'တစ်ပတ်အကြာမှာ သူ့မန်နေဂျာက သူ့ကို ရုံးခန်းထဲ ခေါ်တယ်။ အပြုံးကြီးနဲ့ သူ ရာထူးတိုးရပြီလို့ ပြောတယ်။',
    },
    {
      en: 'Hnin thanked everyone who had supported her. She knew the promotion was not luck, but the result of years of hard work.',
      my: 'နှင်းက ထောက်ပံ့ခဲ့သူအားလုံးကို ကျေးဇူးတင်တယ်။ ရာထူးတိုးတာက ကံကြောင့်မဟုတ်ဘဲ နှစ်တွေနဲ့ချီတဲ့ ကြိုးစားမှုရဲ့ ရလဒ်ဆိုတာ သူ သိတယ်။',
    },
    {
      en: 'In her new role, Hnin mentors junior accountants just as her own manager once mentored her. She believes that sharing knowledge is the best way to grow together. Her story inspires many young women in the company who now see that dedication and honesty are always recognized and rewarded in the end.',
      my: 'ရာထူးအသစ်မှာ နှင်းက သူ့မန်နေဂျာတစ်ချိန်က သူ့ကို လမ်းညွှန်သလို ဂျူနီယာစာရင်းကိုင်တွေကို လမ်းညွှန်တယ်။ အသိပညာမျှဝေတာက အတူတူကြီးထွားဖို့ အကောင်းဆုံးနည်းလမ်းလို့ သူ ယုံကြည်တယ်။ သူ့ဇာတ်လမ်းက ကုမ္ပဏီက အမျိုးသမီးငယ်များစွာကို အားကျစေပြီး စိတ်အားထက်သန်မှုနဲ့ ရိုးသားမှုက အဆုံးမှာ အမြဲအသိအမှတ်ပြုခံရတယ်ဆိုတာ သူတို့ အခု မြင်တယ်။',
    },
  ],
},
// key words: night, hospital, nurse, advice, habit
{
  id: 'story-f14-b1-11',
  level: 'B1',
  titleEn: 'The Night Shift',
  titleMy: 'ညဆိုင်း',
  paragraphs: [
    {
      en: 'Kyaw works the night shift at a hospital as a nurse. While the city sleeps, he takes care of patients who need help.',
      my: 'ကျော်က ဆေးရုံမှာ သူနာပြုအဖြစ် ညဆိုင်း အလုပ်လုပ်တယ်။ မြို့အိပ်နေတုန်း အကူအညီလိုတဲ့ လူနာတွေကို ပြုစုတယ်။',
    },
    {
      en: 'At first, staying awake all night was very difficult. He drank too much coffee and felt terrible in the mornings.',
      my: 'အစမှာ တစ်ညလုံး နိုးနေရတာ အရမ်းခက်ခဲတယ်။ ကော်ဖီအများကြီးသောက်ပြီး မနက်တွေမှာ အရမ်းနေမကောင်းဘူး။',
    },
    {
      en: 'An older nurse gave him good advice: sleep in a dark, quiet room during the day, and eat healthy meals before the shift.',
      my: 'သူနာပြုအကြီးတစ်ယောက်က အကြံကောင်းပေးတယ်။ နေ့ဘက်မှာ မှောင်ပြီး တိတ်ဆိတ်တဲ့အခန်းမှာ အိပ်ပြီး ဆိုင်းမစခင် ကျန်းမာတဲ့အစားအစာ စားပါတဲ့။',
    },
    {
      en: 'Kyaw followed the advice, and soon his body adjusted. He even started to enjoy the quiet peace of the night hospital.',
      my: 'ကျော်က အကြံကို လိုက်နာပြီး မကြာခင် ခန္ဓာကိုယ်က အသားကျသွားတယ်။ ညဘက်ဆေးရုံရဲ့ တိတ်ဆိတ်ငြိမ်းချမ်းမှုကိုတောင် နှစ်သက်လာတယ်။',
    },
    {
      en: 'He realized that every job is difficult at first, but the right habits make it manageable.',
      my: 'အလုပ်တိုင်းက အစမှာ ခက်ခဲပေမယ့် မှန်ကန်တဲ့အကျင့်တွေက ကိုင်တွယ်နိုင်အောင် လုပ်ပေးတယ်ဆိုတာ သူ သဘောပေါက်တယ်။',
    },
    {
      en: 'Kyaw now trains new nurses for the night shift, sharing all the tips he learned. He tells them that every challenging job becomes easier with patience and good habits. His family is proud of his important work, and his mother tells everyone that her son helps save precious lives every single night.',
      my: 'ကျော်က အခု ညဆိုင်းအတွက် သူနာပြုအသစ်တွေကို သင်ပေးပြီး သင်ယူခဲ့တဲ့ အကြံတွေအားလုံး မျှဝေတယ်။ စိန်ခေါ်မှုရှိတဲ့အလုပ်တိုင်းက စိတ်ရှည်မှုနဲ့ အကျင့်ကောင်းတွေနဲ့ ပိုလွယ်ကူလာတယ်လို့ သူတို့ကို ပြောတယ်။ သူ့မိသားစုက သူ့အရေးကြီးတဲ့အလုပ်အတွက် ဂုဏ်ယူပြီး အမေက သားက ညတိုင်း အသက်တွေ ကယ်ဖို့ ကူညီတယ်လို့ အားလုံးကို ပြောတယ်။',
    },
  ],
},
// key words: conference, speech, courage, investor, career
{
  id: 'story-f14-b2-1',
  level: 'B2',
  titleEn: 'The Conference',
  titleMy: 'ကွန်ဖရင့်',
  paragraphs: [
    {
      en: 'When the invitation to speak at the international business conference arrived, Thuzar could hardly believe her eyes. She had only started her company eighteen months earlier, yet the organizers had noticed her innovative approach to online education.',
      my: 'နိုင်ငံတကာစီးပွားရေးကွန်ဖရင့်မှာ ပြောဖို့ ဖိတ်ကြားလွှာရောက်လာတဲ့အခါ သူဇာက မျက်လုံးကို မယုံနိုင်လုနီးပါးပဲ။ သူ့ကုမ္ပဏီကို စတင်တာ ဆယ့်ရှစ်လပဲ ရှိသေးပေမယ့် စီစဉ်သူတွေက အွန်လိုင်းပညာရေးနဲ့ ပတ်သက်တဲ့ သူ့ဆန်းသစ်တဲ့ချဉ်းကပ်မှုကို သတိထားမိခဲ့တယ်။',
    },
    {
      en: 'She spent three weeks preparing her speech, rehearsing in English even though it was not her first language. Her team helped her simplify complicated ideas into clear, memorable stories.',
      my: 'သူက မိန့်ခွန်းကို သုံးပတ်ကြာ ပြင်ဆင်တယ်၊ အင်္ဂလိပ်က မိခင်ဘာသာမဟုတ်ပေမယ့် အင်္ဂလိပ်လိုပဲ လေ့ကျင့်တယ်။ သူ့အဖွဲ့က ရှုပ်ထွေးတဲ့အကြံတွေကို ရှင်းလင်းမှတ်မိလွယ်တဲ့ ဇာတ်လမ်းတွေ ဖြစ်အောင် ရိုးရှင်းဖို့ ကူညီတယ်။',
    },
    {
      en: 'On the day of the conference, five hundred people filled the hall. Although her hands were shaking, her voice remained steady as she described how her platform had helped ten thousand students in rural areas.',
      my: 'ကွန်ဖရင့်နေ့မှာ လူငါးရာ ခန်းမကို ပြည့်သွားတယ်။ လက်တွေ တုန်နေပေမယ့် သူ့ပလက်ဖောင်းက ကျေးလက်ဒေသက ကျောင်းသားတစ်သောင်းကို ဘယ်လိုကူညီခဲ့လဲဆိုတာ ဖော်ပြတဲ့အခါ အသံက တည်ငြိမ်နေတယ်။',
    },
    {
      en: 'Afterwards, investors from three countries approached her with partnership offers. She realized that a single courageous step can change the direction of an entire career.',
      my: 'ပြီးနောက် နိုင်ငံသုံးနိုင်ငံက ရင်းနှီးမြှုပ်နှံသူတွေက ပူးပေါင်းဆောင်ရွက်မှု ကမ်းလှမ်းချက်တွေနဲ့ သူ့ဆီ ချဉ်းကပ်လာတယ်။ သတ္တိရှိတဲ့ ခြေလှမ်းတစ်ခုတည်းက အသက်မွေးဝမ်းကျောင်းတစ်ခုလုံးရဲ့ ဦးတည်ချက်ကို ပြောင်းနိုင်တယ်ဆိုတာ သူ သဘောပေါက်တယ်။',
    },
    {
      en: 'Thuzar now receives invitations to speak at conferences around the world. She always begins her talks by reminding the audience that she started with nothing but an idea and determination.',
      my: 'သူဇာက အခု ကမ္ဘာတစ်ဝှမ်း ကွန်ဖရင့်တွေမှာ ပြောဖို့ ဖိတ်ကြားလွှာတွေ ရတယ်။ စကားပြောတိုင်း အကြံတစ်ခုနဲ့ စိတ်ပိုင်းဖြတ်မှုကလွဲပြီး ဘာမှမရှိဘဲ စခဲ့တာကို ပရိသတ်ကို သတိပေးခြင်းနဲ့ အမြဲစတယ်။',
    },
  ],
},
// key words: startup, business, risk, farmer, income
{
  id: 'story-f14-b2-2',
  level: 'B2',
  titleEn: 'The Startup Dream',
  titleMy: 'startup အိပ်မက်',
  paragraphs: [
    {
      en: 'For years, Nay Chi worked as an engineer at a large corporation, but she secretly dreamed of starting her own business. Every evening, she sketched ideas for an app that would connect farmers directly with buyers.',
      my: 'နှစ်တွေနဲ့ချီပြီး နေခြည်က ကော်ပိုရေးရှင်းကြီးတစ်ခုမှာ အင်ဂျင်နီယာအဖြစ် အလုပ်လုပ်ခဲ့ပေမယ့် ကိုယ်ပိုင်စီးပွားရေး စတင်ဖို့ လျှို့ဝှက်အိပ်မက်မက်တယ်။ ညနေတိုင်း လယ်သမားတွေကို ဝယ်သူတွေနဲ့ တိုက်ရိုက်ချိတ်ဆက်ပေးမယ့် အက်ပ်အတွက် အကြံတွေကို ပုံကြမ်းဆွဲတယ်။',
    },
    {
      en: 'Her friends thought she was taking too big a risk, since she had a stable salary and a comfortable life. However, she had saved enough money to survive for one year without income.',
      my: 'တည်ငြိမ်တဲ့လစာနဲ့ သက်တောင့်သက်သာဘဝရှိလို့ အန္တရာယ်အရမ်းများတယ်လို့ သူ့သူငယ်ချင်းတွေက ထင်တယ်။ ဒါပေမယ့် ဝင်ငွေမရှိဘဲ တစ်နှစ်နေနိုင်လောက်အောင် ငွေစုထားပြီးပြီ။',
    },
    {
      en: 'The first six months were brutal: the app crashed constantly, and only twenty farmers signed up. Instead of giving up, she visited villages personally, listened to farmers\' complaints, and rebuilt the app based on their feedback.',
      my: 'ပထမခြောက်လက ရက်စက်တယ်။ အက်ပ်က အမြဲပြိုကျပြီး လယ်သမားနှစ်ဆယ်ပဲ စာရင်းသွင်းတယ်။ အရှုံးပေးမယ့်အစား သူက ကျေးရွာတွေကို ကိုယ်တိုင်သွားပြီး လယ်သမားတွေရဲ့ တိုင်ကြားမှုတွေကို နားထောင်ကာ သူတို့အကြံပြုချက်အပေါ် အခြေခံပြီး အက်ပ်ကို ပြန်တည်ဆောက်တယ်။',
    },
    {
      en: 'By the end of the year, five thousand farmers were using her platform, and their incomes had risen by thirty percent. Her former colleagues now ask her for business advice.',
      my: 'နှစ်အဆုံးမှာ လယ်သမားငါးထောင် သူ့ပလက်ဖောင်းကို သုံးနေပြီး သူတို့ဝင်ငွေတွေ သုံးဆယ်ရာခိုင်နှုန်း တက်လာတယ်။ အရင်လုပ်ဖော်ကိုင်ဖက်တွေက အခု စီးပွားရေးအကြံဉာဏ် သူ့ဆီ တောင်းကြတယ်။',
    },
    {
      en: 'Nay Chi\'s company now employs forty people, many of them young engineers who share her vision. She often tells them that the darkest months taught her the most valuable lessons.',
      my: 'နေခြည်ရဲ့ ကုမ္ပဏီမှာ အခု လူလေးဆယ် အလုပ်လုပ်နေပြီး အများစုက သူ့ရည်မှန်းချက်ကို မျှဝေတဲ့ အင်ဂျင်နီယာငယ်တွေ။ အမှောင်မိုက်ဆုံးလတွေက အဖိုးတန်ဆုံးသင်ခန်းစာတွေ သင်ပေးခဲ့တယ်လို့ သူတို့ကို မကြာခဏ ပြောတယ်။',
    },
  ],
},
// key words: phone, repair, compare, price, screen
{
  id: 'story-f14-b2-3',
  level: 'B2',
  titleEn: 'The Broken Phone',
  titleMy: 'ကွဲသွားတဲ့ဖုန်း',
  paragraphs: [
    {
      en: 'Zaw Htet dropped his phone on the concrete floor, and the screen shattered into a spiderweb of cracks. Since he depended on his phone for work, he felt a wave of panic.',
      my: 'ဇော်ထက်က ဖုန်းကို ကွန်ကရစ်ကြမ်းပြင်ပေါ် လွတ်ကျပြီး screen က ပင့်ကူအိမ်လို အက်ကွဲသွားတယ်။ အလုပ်အတွက် ဖုန်းကို အားကိုးနေရလို့ ထိတ်လန့်မှုလှိုင်း ခံစားရတယ်။',
    },
    {
      en: 'The repair shop quoted a price that was almost half the cost of a new phone. He had to decide whether repairing the old phone was worth it, or whether buying a new one made more sense.',
      my: 'ပြုပြင်တဲ့ဆိုင်က ဖုန်းအသစ်ဈေးရဲ့ ထက်ဝက်နီးပါး ဈေးပြောတယ်။ ဖုန်းအဟောင်းကို ပြင်တာ တန်သလား၊ ဒါမှမဟုတ် အသစ်ဝယ်တာ ပိုအဓိပ္ပာယ်ရှိသလား ဆုံးဖြတ်ရတယ်။',
    },
    {
      en: 'After comparing prices online, he discovered a certified repair shop that charged far less. He backed up all his data first, then handed over the phone with clear instructions.',
      my: 'အွန်လိုင်းမှာ ဈေးနှုန်းတွေ နှိုင်းယှဉ်ပြီးနောက် အများကြီးသက်သာတဲ့ အသိအမှတ်ပြုပြုပြင်ဆိုင်ကို တွေ့တယ်။ အချက်အလက်အားလုံးကို အရင် backup လုပ်ပြီး ရှင်းလင်းတဲ့ညွှန်ကြားချက်တွေနဲ့ ဖုန်းကို အပ်တယ်။',
    },
    {
      en: 'Two hours later, the phone looked brand new. Zaw Htet learned to compare options carefully instead of accepting the first price he hears.',
      my: 'နှစ်နာရီအကြာမှာ ဖုန်းက အသစ်အတိုင်း ဖြစ်သွားတယ်။ ကြားရတဲ့ ပထမဈေးကို လက်ခံမယ့်အစား ရွေးချယ်စရာတွေကို သေချာနှိုင်းယှဉ်ဖို့ ဇော်ထက် သင်ယူခဲ့တယ်။',
    },
    {
      en: 'Zaw Htet now buys a strong protective case for every new phone he owns. He jokes that the cracked screen taught him an expensive lesson about being careful. He now always backs up his data every week without fail.',
      my: 'ဇော်ထက်က အခု ဖုန်းအသစ်တိုင်းအတွက် ခိုင်ခံ့တဲ့ကာဗာဝယ်တယ်။ အက်ကွဲတဲ့ screen က သတိထားဖို့အကြောင်း ဈေးကြီးတဲ့သင်ခန်းစာ သင်ပေးခဲ့တယ်လို့ နောက်ပြောင်တယ်။ သူက အခု အချက်အလက်တွေကို အပတ်တိုင်း မပျက်မကွက် backup လုပ်တယ်။',
    },
  ],
},
// key words: order, online, delivery, bank, lesson
{
  id: 'story-f14-b2-4',
  level: 'B2',
  titleEn: 'The Online Order',
  titleMy: 'အွန်လိုင်းအမှာစာ',
  paragraphs: [
    {
      en: 'Thandar ordered a winter jacket from an international website because the price was unbelievably low. She paid immediately, imagining how warm she would feel during her trip to the mountains.',
      my: 'သန္ဒာက ဈေးက မယုံနိုင်လောက်အောင် သက်သာလို့ နိုင်ငံတကာဝက်ဘ်ဆိုက်ကနေ ဆောင်းအင်္ကျီတစ်ထည် မှာတယ်။ တောင်ခရီးမှာ ဘယ်လောက်နွေးမလဲဆိုတာ စိတ်ကူးပြီး ချက်ချင်းငွေပေးတယ်။',
    },
    {
      en: 'Three weeks passed with no delivery. When she contacted customer service, they replied with vague promises that the package was on its way.',
      my: 'သုံးပတ် ကုန်သွားပေမယ့် ပို့ဆောင်မှု မရှိဘူး။ ဖောက်သည်ဝန်ဆောင်မှုကို ဆက်သွယ်တဲ့အခါ ပစ္စည်းက လမ်းမှာ ရှိတယ်ဆိုတဲ့ မရေရာတဲ့ ကတိတွေနဲ့ ပြန်ဖြေတယ်။',
    },
    {
      en: 'Suspicious, she researched the website and found dozens of complaints from other buyers. She immediately contacted her bank to dispute the payment.',
      my: 'သံသယဖြစ်ပြီး ဝက်ဘ်ဆိုက်ကို သုတေသနလုပ်ကြည့်တော့ တခြားဝယ်သူတွေရဲ့ တိုင်ကြားမှုတွေ များစွာ တွေ့တယ်။ ငွေပေးချေမှုကို အငြင်းပွားဖို့ ဘဏ်ကို ချက်ချင်းဆက်သွယ်တယ်။',
    },
    {
      en: 'The bank reversed the charge within ten days. Thandar learned a valuable lesson: if a deal looks too good to be true, it probably is.',
      my: 'ဘဏ်က ဆယ်ရက်အတွင်း ငွေကို ပြန်လှည့်ပေးတယ်။ ကမ်းလှမ်းချက်က တကယ်ဖြစ်နိုင်တာထက် ကောင်းလွန်းနေရင် ဖြစ်နိုင်ခြေများတာက မဟုတ်ဘူးဆိုတဲ့ အဖိုးတန်သင်ခန်းစာ သန္ဒာ သင်ယူခဲ့တယ်။',
    },
    {
      en: 'Thandar now checks reviews carefully before buying anything online. She also tells her friends to use payment methods that offer buyer protection. Her friends now always ask her for wise advice before shopping online, and she happily shares everything she learned from the difficult experience.',
      my: 'သန္ဒာက အခု အွန်လိုင်းက တစ်ခုခုမဝယ်ခင် review တွေကို သေချာစစ်တယ်။ ဝယ်သူအကာအကွယ်ပေးတဲ့ ငွေပေးချေမှုနည်းတွေ သုံးဖို့ သူငယ်ချင်းတွေကိုလည်း ပြောတယ်။ သူ့သူငယ်ချင်းတွေက အခု အွန်လိုင်းဈေးမဝယ်ခင် သူ့အကြံကို တောင်းပြီး အတွေ့အကြုံက သင်ယူခဲ့သမျှကို သူ ဝမ်းသာအားရ မျှဝေတယ်။',
    },
    {
      en: 'This experience taught everyone involved a valuable lesson that they would remember for the rest of their lives.',
      my: 'ဒီအတွေ့အကြုံက ပါဝင်သူတိုင်းကို ဘဝတစ်သက်လုံး မှတ်မိနေမယ့် အဖိုးတန်သင်ခန်းစာတစ်ခု သင်ပေးခဲ့တယ်။',
    },
  ],
},
// key words: scam, message, bank, warn, social
{
  id: 'story-f14-b2-5',
  level: 'B2',
  titleEn: 'The Scam Message',
  titleMy: 'လိမ်လည်တဲ့မက်ဆေ့ချ်',
  paragraphs: [
    {
      en: 'One evening, Aye received a text message claiming she had won a large cash prize. All she had to do was click a link and enter her bank details.',
      my: 'တစ်ညမှာ အေးက ငွေသားဆုကြီး ပေါက်တယ်ဆိုတဲ့ စာတိုမက်ဆေ့ချ် ရတယ်။ လုပ်ရမှာက link တစ်ခုကို နှိပ်ပြီး ဘဏ်အချက်အလက်တွေ ထည့်ယုံပဲ။',
    },
    {
      en: 'Although the message looked official, with logos and formal language, something felt wrong. She remembered her brother\'s warning about online scams.',
      my: 'မက်ဆေ့ချ်က လိုဂိုတွေနဲ့ တရားဝင်ဘာသာစကားနဲ့ တရားဝင်ပုံရပေမယ့် တစ်ခုခု မှားနေသလို ခံစားရတယ်။ အွန်လိုင်းလိမ်လည်မှုတွေအကြောင်း အစ်ကိုရဲ့ သတိပေးချက်ကို သတိရတယ်။',
    },
    {
      en: 'Instead of clicking, she called the company\'s official hotline. The agent confirmed it was a scam and thanked her for reporting it.',
      my: 'နှိပ်မယ့်အစား သူက ကုမ္ပဏီရဲ့ တရားဝင်ဟော့လိုင်းကို ဖုန်းဆက်တယ်။ ဝန်ထမ်းက လိမ်လည်မှုဖြစ်ကြောင်း အတည်ပြုပြီး တိုင်ကြားတဲ့အတွက် ကျေးဇူးတင်တယ်။',
    },
    {
      en: 'Aye shared her experience on social media to warn others. Her post was shared thousands of times, possibly saving many people from losing money.',
      my: 'အေးက တခြားသူတွေကို သတိပေးဖို့ အတွေ့အကြုံကို ဆိုရှယ်မီဒီယာမှာ မျှဝေတယ်။ သူ့ပို့စ်ကို ထောင်ပေါင်းများစွာ မျှဝေကြပြီး လူများစွာ ငွေမဆုံးရှုံးအောင် ကယ်နိုင်တယ်။',
    },
    {
      en: 'The police later caught the criminals behind the scam messages. Aye felt proud that her small action had helped protect many strangers. She now volunteers at a community center, patiently teaching elderly people how to recognize dangerous scams and carefully protect their valuable personal information.',
      my: 'ရဲက နောက်ပိုင်း လိမ်လည်မက်ဆေ့ချ်နောက်က ရာဇဝတ်သားတွေကို ဖမ်းတယ်။ သူ့လုပ်ရပ်သေးသေးလေးက လူစိမ်းများစွာကို ကာကွယ်ဖို့ ကူညီခဲ့လို့ အေး ဂုဏ်ယူတယ်။ သူက အခု ရပ်ရွာစင်တာမှာ စေတနာ့ဝန်ထမ်းလုပ်ပြီး သက်ကြီးရွယ်အိုတွေကို လိမ်လည်မှုတွေ ဘယ်လိုသိမလဲ၊ ကိုယ်ပိုင်အချက်အလက်တွေ ဘယ်လိုကာကွယ်မလဲဆိုတာ သင်ပေးတယ်။',
    },
    {
      en: 'This experience taught everyone involved a valuable lesson that they would remember for the rest of their lives.',
      my: 'ဒီအတွေ့အကြုံက ပါဝင်သူတိုင်းကို ဘဝတစ်သက်လုံး မှတ်မိနေမယ့် အဖိုးတန်သင်ခန်းစာတစ်ခု သင်ပေးခဲ့တယ်။',
    },
  ],
},
// key words: video, call, technology, family, comfort
{
  id: 'story-f14-b2-6',
  level: 'B2',
  titleEn: 'The Video Call',
  titleMy: 'ဗီဒီယိုခေါ်ဆိုမှု',
  paragraphs: [
    {
      en: 'Daw Myint had not seen her son for two years because he worked in Japan. When he suggested a video call, she was nervous about the technology.',
      my: 'ဒေါ်မြင့်က သားက ဂျပန်မှာ အလုပ်လုပ်လို့ နှစ်နှစ်ရှိပြီ မတွေ့ရဘူး။ ဗီဒီယိုခေါ်ဖို့ သူက အကြံပေးတဲ့အခါ နည်းပညာအကြောင်း စိုးရိမ်တယ်။',
    },
    {
      en: 'Her granddaughter patiently taught her to use the app, showing her which button to press. After three practice calls, Daw Myint felt ready.',
      my: 'သူ့မြေးမလေးက စိတ်ရှည်ရှည်နဲ့ အက်ပ်သုံးဖို့ သင်ပေးပြီး ဘယ်ခလုတ်နှိပ်ရမလဲဆိုတာ ပြတယ်။ သုံးကြိမ် လေ့ကျင့်ခေါ်ပြီးနောက် ဒေါ်မြင့် အဆင်သင့်ဖြစ်သွားတယ်။',
    },
    {
      en: 'When her son\'s face appeared on the screen, tears of joy rolled down her cheeks. They talked for over an hour about his life in Tokyo.',
      my: 'သားရဲ့မျက်နှာက screen ပေါ် ပေါ်လာတဲ့အခါ ဝမ်းသာမျက်ရည်တွေ ပါးပြင်ပေါ် စီးကျလာတယ်။ တိုကျိုက သူ့ဘဝအကြောင်း တစ်နာရီကျော် စကားပြောကြတယ်။',
    },
    {
      en: 'Now they call every Sunday evening. Daw Myint tells her friends that technology, once frightening, has become her greatest comfort.',
      my: 'အခု တနင်္ဂနွေညနေတိုင်း ဖုန်းခေါ်ကြတယ်။ တစ်ချိန်က ကြောက်စရာကောင်းတဲ့ နည်းပညာက အခု အကြီးမားဆုံး နှစ်သိမ့်မှုဖြစ်လာပြီလို့ ဒေါ်မြင့်က သူငယ်ချင်းတွေကို ပြောတယ်။',
    },
    {
      en: 'Daw Myint\'s story inspired several elderly neighbors to learn video calling too. Now the whole street gathers online every festival to celebrate together. Her son calls more often now, knowing how much these conversations mean to his mother, and their loving bond has never been stronger than it is today.',
      my: 'ဒေါ်မြင့်ရဲ့ ဇာတ်လမ်းက သက်ကြီးအိမ်နီးချင်းတော်တော်များများကို ဗီဒီယိုခေါ်ဖို့ သင်ယူဖို့ အားကျစေတယ်။ အခု လမ်းတစ်ခုလုံး ပွဲတော်တိုင်း အွန်လိုင်းမှာ စုဝေးပြီး အတူတူ ကျင်းပတယ်။ သားက ဒီစကားဝိုင်းတွေက အမေအတွက် ဘယ်လောက်အဓိပ္ပာယ်ရှိလဲဆိုတာ သိလို့ အခု ပိုမကြာခဏ ဖုန်းခေါ်တယ်၊ သူတို့ရဲ့ နှောင်ကြိုးက ဘယ်တုန်းကမှ ဒီလောက်မခိုင်မာခဲ့ဘူး။',
    },
    {
      en: 'This experience taught everyone involved a valuable lesson that they would remember for the rest of their lives.',
      my: 'ဒီအတွေ့အကြုံက ပါဝင်သူတိုင်းကို ဘဝတစ်သက်လုံး မှတ်မိနေမယ့် အဖိုးတန်သင်ခန်းစာတစ်ခု သင်ပေးခဲ့တယ်။',
    },
  ],
},
// key words: password, email, forget, recover, identity
{
  id: 'story-f14-b2-7',
  level: 'B2',
  titleEn: 'The Lost Password',
  titleMy: 'ပျောက်ဆုံးသွားတဲ့စကားဝှက်',
  paragraphs: [
    {
      en: 'Min Khant could not access his email because he had forgotten the password, and the recovery phone number was an old one he no longer used.',
      my: 'မင်းခန့်က စကားဝှက်မေ့သွားလို့ အီးမေးလ် ဝင်မရဘူး၊ ပြန်လည်ရယူဖို့ ဖုန်းနံပါတ်ကလည်း မသုံးတော့တဲ့ အဟောင်းဖြစ်နေတယ်။',
    },
    {
      en: 'This was a serious problem because all his job applications and university documents were in that inbox. He felt helpless and frustrated.',
      my: 'အလုပ်လျှောက်လွှာတွေနဲ့ တက္ကသိုလ်စာရွက်စာတမ်းအားလုံး အဲဒီ inbox ထဲမှာ ရှိလို့ ပြဿနာကြီးတယ်။ သူ အကူအညီမဲ့ပြီး စိတ်ပျက်နေတယ်။',
    },
    {
      en: 'After searching online, he found the account recovery form and filled it in with as much detail as he could remember, including the year he created the account.',
      my: 'အွန်လိုင်းမှာ ရှာပြီးနောက် အကောင့်ပြန်လည်ရယူတဲ့ဖောင်ကို တွေ့ပြီး မှတ်မိသလောက် အသေးစိတ်ဖြည့်တယ်၊ အကောင့်စဖွင့်တဲ့နှစ်လည်း ပါဝင်တယ်။',
    },
    {
      en: 'Two days later, the company verified his identity and restored his access. He immediately set up two-factor authentication and wrote down his new password safely.',
      my: 'နှစ်ရက်အကြာမှာ ကုမ္ပဏီက သူ့အထောက်အထားကို အတည်ပြုပြီး ဝင်ရောက်ခွင့်ကို ပြန်ပေးတယ်။ ချက်ချင်း two-factor authentication သတ်မှတ်ပြီး စကားဝှက်အသစ်ကို လုံခြုံစွာ ရေးမှတ်ထားတယ်။',
    },
    {
      en: 'Min Khant now helps his friends secure their accounts, teaching them about strong passwords and backup codes. He says losing access once was enough to learn forever. He wrote a short guide for his classmates explaining each recovery step clearly, and his kind teacher warmly praised his generous helpful spirit.',
      my: 'မင်းခန့်က အခု သူငယ်ချင်းတွေကို အကောင့်တွေ လုံခြုံအောင် ကူညီပြီး ခိုင်ခံ့တဲ့စကားဝှက်တွေနဲ့ backup ကုဒ်တွေအကြောင်း သင်ပေးတယ်။ တစ်ကြိမ်ဝင်ရောက်ခွင့် ဆုံးရှုံးတာက ထာဝရသင်ယူဖို့ လုံလောက်ပြီလို့ ပြောတယ်။ သူက အတန်းဖော်တွေအတွက် ပြန်လည်ရယူတဲ့အဆင့်တိုင်းကို ရှင်းရှင်းလင်းလင်း ရှင်းပြတဲ့ လမ်းညွှန်တိုလေး ရေးပြီး ဆရာက သူ့အကူအညီပေးတဲ့စိတ်ကို ချီးကျူးတယ်။',
    },
  ],
},
// key words: flood, road, boat, village, community
{
  id: 'story-f14-b2-8',
  level: 'B2',
  titleEn: 'The Flooded Road',
  titleMy: 'ရေကြီးနေတဲ့လမ်း',
  paragraphs: [
    {
      en: 'After three days of heavy rain, the main road to Hla\'s village was completely flooded. No cars or motorbikes could pass through the deep water.',
      my: 'မိုးသည်းထန်စွာ သုံးရက်ရွာပြီးနောက် လှရဲ့ ရွာကို သွားတဲ့ အဓိကလမ်းက လုံးဝရေကြီးသွားတယ်။ ကားတွေ ဆိုင်ကယ်တွေ ရေနက်ထဲ ဖြတ်မရဘူး။',
    },
    {
      en: 'Hla needed to reach the town clinic because her grandmother\'s medicine had run out. Waiting for the water to go down was not an option.',
      my: 'အဖွားရဲ့ ဆေးကုန်သွားလို့ လှက မြို့ဆေးခန်းကို ရောက်ဖို့လိုတယ်။ ရေကျဖို့ စောင့်တာက ရွေးချယ်စရာ မဟုတ်ဘူး။',
    },
    {
      en: 'A neighbor offered his small wooden boat, and together they rowed through the flooded streets. The journey that usually took twenty minutes lasted two hours.',
      my: 'အိမ်နီးချင်းတစ်ယောက်က သစ်သားလှေသေးသေးလေး ပေးပြီး အတူတူ ရေကြီးနေတဲ့လမ်းတွေကို လှော်ခတ်ကြတယ်။ ပုံမှန်မိနစ်နှစ်ဆယ်ကြာတဲ့ ခရီးက နှစ်နာရီ ကြာသွားတယ်။',
    },
    {
      en: 'At the clinic, the doctor gave them extra medicine for the whole village. On the way back, Hla realized how strong community spirit can overcome any obstacle.',
      my: 'ဆေးခန်းမှာ ဆရာဝန်က ရွာတစ်ခုလုံးအတွက် ဆေးအပိုပေးတယ်။ အပြန်လမ်းမှာ ရပ်ရွာစိတ်ဓာတ်ခိုင်မာမှုက အတားအဆီးမှန်သမျှကို ကျော်လွှားနိုင်တယ်ဆိုတာ လှ သဘောပေါက်တယ်။',
    },
    {
      en: 'The village built a small bridge over the flooded area after that experience. Hla\'s grandmother recovered fully, and the whole village celebrated with a feast. Children in the village now learn about flood safety at school, so they will be fully prepared if the dangerous waters ever rise again.',
      my: 'အဲဒီအတွေ့အကြုံအပြီး ရွာက ရေကြီးတဲ့နေရာမှာ တံတားသေးသေးလေး ဆောက်တယ်။ လှရဲ့အဖွား လုံးဝပြန်ကောင်းသွားပြီး ရွာတစ်ခုလုံး ပွဲတော်နဲ့ အောင်ပွဲခံတယ်။ ရွာက ကလေးတွေက အခု ကျောင်းမှာ ရေဘေးကင်းလုံခြုံမှုအကြောင်း သင်ယူပြီး ရေပြန်တက်လာရင် အဆင်သင့်ဖြစ်မယ်။',
    },
  ],
},
// key words: mountain, trek, summit, guide, sunrise
{
  id: 'story-f14-b2-9',
  level: 'B2',
  titleEn: 'The Mountain Trek',
  titleMy: 'တောင်တက်ခရီး',
  paragraphs: [
    {
      en: 'For her thirtieth birthday, Chaw decided to do something unforgettable: trek to the summit of a mountain she had admired since childhood.',
      my: 'ချောက အသက်သုံးဆယ်ပြည့်မွေးနေ့အတွက် မမေ့နိုင်စရာတစ်ခုလုပ်ဖို့ ဆုံးဖြတ်တယ်။ ငယ်စဉ်ကတည်းက သဘောကျခဲ့တဲ့ တောင်ထိပ်ကို တက်ဖို့ပါ။',
    },
    {
      en: 'The first day was pleasant, with cool air and beautiful views. However, on the second day, the trail became steep, and her legs began to ache badly.',
      my: 'ပထမနေ့က လေအေးအေးနဲ့ ရှုခင်းလှလှနဲ့ သာယာတယ်။ ဒါပေမယ့် ဒုတိယနေ့မှာ လမ်းက မတ်စောက်လာပြီး ခြေထောက်တွေ အရမ်းနာလာတယ်။',
    },
    {
      en: 'Her guide encouraged her to take small steps and rest often. He told her that reaching the top slowly is better than giving up quickly.',
      my: 'သူ့ဧည့်လမ်းညွှန်က ခြေလှမ်းသေးသေးလေးတွေ လှမ်းပြီး မကြာခဏနားဖို့ အားပေးတယ်။ ဖြည်းဖြည်းချင်း ထိပ်ရောက်တာက မြန်မြန်အရှုံးပေးတာထက် ပိုကောင်းတယ်လို့ ပြောတယ်။',
    },
    {
      en: 'At sunrise on the third day, she stood at the summit, watching clouds drift below her feet. Every painful step had been worth it.',
      my: 'တတိယနေ့ နေထွက်ချိန်မှာ သူ ထိပ်မှာ ရပ်ပြီး ခြေဖဝါးအောက်မှာ တိမ်တွေ မျောနေတာ ကြည့်တယ်။ နာကျင်တဲ့ ခြေလှမ်းတိုင်းက တန်ခဲ့တယ်။',
    },
    {
      en: 'Chaw now leads a small hiking group every month, encouraging beginners to try mountain trails. She believes the mountain taught her that limits exist only in the mind. She framed a photo from the summit and hung it in her living room, where it reminds her daily that she is much stronger and braver than she ever imagined possible.',
      my: 'ချောက အခု လတိုင်း တောင်တက်အဖွဲ့သေးသေးလေး ဦးဆောင်ပြီး အစပြုသူတွေကို တောင်လမ်းတွေ စမ်းဖို့ အားပေးတယ်။ ကန့်သတ်ချက်တွေက စိတ်ထဲမှာပဲ ရှိတယ်ဆိုတာ တောင်က သူ့ကို သင်ပေးခဲ့တယ်လို့ ယုံကြည်တယ်။ သူက ထိပ်က ဓာတ်ပုံကို ဘောင်ခတ်ပြီး ဧည့်ခန်းမှာ ချိတ်တယ်၊ အဲဒါက သူ ထင်ထားတာထက် ပိုသန်မာတယ်ဆိုတာ နေ့တိုင်း သတိပေးတယ်။',
    },
  ],
},
// key words: river, boat, journey, village, festival
{
  id: 'story-f14-b1-12',
  level: 'B1',
  titleEn: 'The River Journey',
  titleMy: 'မြစ်ခရီးစဉ်',
  paragraphs: [
    {
      en: 'Every year during the water festival, Ko Aung travels by boat along the great river to visit his family. The journey takes two days.',
      my: 'ရေသဘင်ပွဲတိုင်း ကိုအောင်က မိသားစုကို သွားလည်ဖို့ မြစ်ကြီးတစ်လျှောက် လှေနဲ့ ခရီးသွားတယ်။ ခရီးက နှစ်ရက် ကြာတယ်။',
    },
    {
      en: 'This year, he invited his young son to join him. The boy had never been on a long boat trip, and his eyes were wide with excitement.',
      my: 'ဒီနှစ် သူက သားငယ်ကို အတူ လိုက်ဖို့ ဖိတ်တယ်။ ကောင်လေးက လှေခရီးရှည် တစ်ခါမှ မစီးဖူးဘူး၊ စိတ်လှုပ်ရှားမှုနဲ့ မျက်လုံးတွေ ပြူးနေတယ်။',
    },
    {
      en: 'During the trip, Ko Aung taught his son the names of the villages along the river. They ate fish curry cooked on the boat.',
      my: 'ခရီးအတွင်း ကိုအောင်က သားကို မြစ်ကမ်းက ရွာတွေရဲ့ နာမည်တွေ သင်ပေးတယ်။ လှေပေါ်မှာ ချက်တဲ့ ငါးဟင်းကို စားကြတယ်။',
    },
    {
      en: 'At night, they slept on the deck under the stars. The boy said it was the best night of his life.',
      my: 'ညဘက်မှာ ကြယ်တွေအောက် ကုန်းပတ်ပေါ်မှာ အိပ်ကြတယ်။ ကောင်လေးက သူ့ဘဝရဲ့ အကောင်းဆုံးညလို့ ပြောတယ်။',
    },
    {
      en: 'When they arrived, the whole family was waiting at the jetty. Ko Aung knew his son would remember this journey forever.',
      my: 'ရောက်တဲ့အခါ မိသားစုတစ်ခုလုံး ဆိပ်ကမ်းမှာ စောင့်နေတယ်။ ဒီခရီးကို သားက ထာဝရမှတ်မိနေမယ်ဆိုတာ ကိုအောင် သိတယ်။',
    },
    {
      en: 'Years later, the boy still talks about that boat journey with shining eyes. He says it taught him more about his country than any book ever could. The excited boy now truly wants to become a professional boat captain when he grows up one day.',
      my: 'နှစ်တွေကြာပြီးနောက် ကောင်လေးက အဲဒီလှေခရီးအကြောင်း မျက်လုံးတွေ တောက်ပစွာ ပြောတုန်းပဲ။ စာအုပ်တစ်အုပ်ကမှ မသင်ပေးနိုင်တဲ့ တိုင်းပြည်အကြောင်း သူ့ကို သင်ပေးခဲ့တယ်လို့ ပြောတယ်။ ကောင်လေးက အခု ကြီးလာရင် လှေကပ္ပတိန်ဖြစ်ချင်တယ်။',
    },
  ],
},
// key words: island, beach, holiday, seafood, family
{
  id: 'story-f14-b1-13',
  level: 'B1',
  titleEn: 'The Island Holiday',
  titleMy: 'ကျွန်းအားလပ်ရက်',
  paragraphs: [
    {
      en: 'After working hard for a whole year, the family decided to spend five days on a small tropical island.',
      my: 'တစ်နှစ်လုံး ကြိုးကြိုးစားစား အလုပ်လုပ်ပြီးနောက် မိသားစုက အပူပိုင်းကျွန်းသေးသေးလေးမှာ ငါးရက် အနားယူဖို့ ဆုံးဖြတ်တယ်။',
    },
    {
      en: 'The children ran to the beach as soon as they arrived. The sand was white, and the water was clear and warm.',
      my: 'ကလေးတွေက ရောက်တာနဲ့ ကမ်းခြေကို ပြေးသွားတယ်။ သဲက ဖြူပြီး ရေက ကြည်လင်နွေးထွေးတယ်။',
    },
    {
      en: 'On the second day, they took a boat to see colorful fish. The children wore masks and looked at the coral reefs.',
      my: 'ဒုတိယနေ့မှာ ရောင်စုံငါးတွေ ကြည့်ဖို့ လှေစီးတယ်။ ကလေးတွေက မျက်နှာဖုံးတွေဝတ်ပြီး သန္တာကျောက်တန်းတွေ ကြည့်တယ်။',
    },
    {
      en: 'In the evenings, they ate fresh seafood at a restaurant by the sea. The father said it was the best fish he had ever tasted.',
      my: 'ညနေတွေမှာ ပင်လယ်နားက စားသောက်ဆိုင်မှာ လတ်ဆတ်တဲ့ပင်လယ်စာ စားတယ်။ အဖေက သူစားဖူးသမျှထဲမှာ အကောင်းဆုံးငါးလို့ ပြောတယ်။',
    },
    {
      en: 'On the last day, nobody wanted to leave. The mother promised they would come back next year.',
      my: 'နောက်ဆုံးနေ့မှာ ဘယ်သူမှ မပြန်ချင်ဘူး။ အမေက နောက်နှစ် ပြန်လာမယ်လို့ ကတိပေးတယ်။',
    },
    {
      en: 'Back home, the children drew pictures of the island and hung them on their bedroom walls. The parents agreed it was the best money they had ever spent. The happy family looks at those colorful drawings every single day and smiles warmly together.',
      my: 'အိမ်ပြန်ရောက်တဲ့အခါ ကလေးတွေက ကျွန်းပုံတွေ ဆွဲပြီး အိပ်ခန်းနံရံတွေမှာ ချိတ်တယ်။ မိဘတွေက အဲဒါ သူတို့သုံးဖူးသမျှထဲမှာ အကောင်းဆုံးငွေသုံးစွဲမှုလို့ သဘောတူတယ်။ မိသားစုက အဲဒီပုံတွေကို နေ့တိုင်း ကြည့်ပြီး ပြုံးတယ်။',
    },
    {
      en: 'This experience taught everyone involved a valuable lesson that they would remember for the rest of their lives.',
      my: 'ဒီအတွေ့အကြုံက ပါဝင်သူတိုင်းကို ဘဝတစ်သက်လုံး မှတ်မိနေမယ့် အဖိုးတန်သင်ခန်းစာတစ်ခု သင်ပေးခဲ့တယ်။',
    },
  ],
},
// key words: train, journey, mountain, station, window
{
  id: 'story-f14-b1-14',
  level: 'B1',
  titleEn: 'The Train to the North',
  titleMy: 'မြောက်ဘက်ရထားခရီး',
  paragraphs: [
    {
      en: 'Mya decided to visit her aunt in the northern mountains. She bought a train ticket for the overnight journey.',
      my: 'မြက မြောက်ဘက်တောင်တန်းက အဒေါ်ကို သွားလည်ဖို့ ဆုံးဖြတ်တယ်။ ညအိပ်ရထားခရီးအတွက် လက်မှတ်ဝယ်တယ်။',
    },
    {
      en: 'The train left the station at eight in the evening. Mya found her seat by the window and watched the city lights disappear.',
      my: 'ရထားက ည ရှစ်နာရီမှာ ဘူတာကနေ ထွက်တယ်။ မြက ပြတင်းပေါက်နားက ထိုင်ခုံကို တွေ့ပြီး မြို့မီးတွေ ပျောက်ကွယ်သွားတာ ကြည့်တယ်။',
    },
    {
      en: 'An old woman sat across from her and shared homemade snacks. They talked for hours about their families and their lives.',
      my: 'အမျိုးသမီးကြီးတစ်ယောက် သူ့မျက်နှာချင်းဆိုင်မှာ ထိုင်ပြီး အိမ်လုပ်မုန့်တွေ မျှဝေတယ်။ မိသားစုတွေနဲ့ ဘဝတွေအကြောင်း နာရီပေါင်းများစွာ စကားပြောကြတယ်။',
    },
    {
      en: 'Mya fell asleep to the gentle rocking of the train. When she woke up, green mountains were visible through the window.',
      my: 'မြက ရထားရဲ့ ညင်သာတဲ့လှုပ်ခါမှုနဲ့ အိပ်ပျော်သွားတယ်။ နိုးလာတဲ့အခါ ပြတင်းပေါက်ကနေ စိမ်းလန်းတဲ့တောင်တွေ မြင်ရတယ်။',
    },
    {
      en: 'Her aunt was waiting at the small station with a warm hug. Mya decided that train journeys are the best way to travel.',
      my: 'အဒေါ်က ဘူတာသေးသေးလေးမှာ နွေးထွေးတဲ့ဖက်နဲ့ စောင့်နေတယ်။ ရထားခရီးတွေက ခရီးသွားဖို့ အကောင်းဆုံးနည်းလမ်းလို့ မြ ဆုံးဖြတ်တယ်။',
    },
    {
      en: 'Mya stayed with her aunt for a whole week, helping in the garden and learning traditional recipes. On the train home, she already missed the mountains. She warmly promised her dear aunt that she would happily return during the cool season together with her beloved brother.',
      my: 'မြက အဒေါ်နဲ့ တစ်ပတ်လုံး နေပြီး ဥယျာဉ်မှာ ကူညီရင်း ရိုးရာချက်ပြုတ်နည်းတွေ သင်ယူတယ်။ အပြန်ရထားပေါ်မှာ တောင်တွေကို လွမ်းနေပြီ။ သူက အအေးရာသီမှာ အစ်ကိုနဲ့ ပြန်လာမယ်လို့ အဒေါ်ကို ကတိပေးတယ်။',
    },
  ],
},
// key words: market, border, sell, snack, education
{
  id: 'story-f14-b1-15',
  level: 'B1',
  titleEn: 'The Border Market',
  titleMy: 'နယ်စပ်ဈေး',
  paragraphs: [
    {
      en: 'Once a month, traders from both sides of the border gather at the big market near the river. It is the most colorful place in the region.',
      my: 'တစ်လတစ်ကြိမ် နယ်စပ်နှစ်ဖက်က ကုန်သည်တွေ မြစ်နားက ဈေးကြီးမှာ စုဝေးကြတယ်။ အဲဒါက ဒေသထဲမှာ အရောင်အစုံဆုံးနေရာပါ။',
    },
    {
      en: 'Aye Aye sells traditional snacks there. She wakes up at four in the morning to prepare everything fresh.',
      my: 'အေးအေးက အဲဒီမှာ ရိုးရာမုန့်တွေ ရောင်းတယ်။ အရာအားလုံး လတ်ဆတ်အောင် ပြင်ဆင်ဖို့ မနက် လေးနာရီ နိုးတယ်။',
    },
    {
      en: 'By seven o\'clock, the market is full of people. Customers from far away come to buy clothes, fruits, and handmade goods.',
      my: 'ခုနစ်နာရီမှာ ဈေးက လူတွေနဲ့ ပြည့်နေပြီ။ ဝေးလံတဲ့နေရာက ဖောက်သည်တွေ အဝတ်အစား၊ သစ်သီး၊ လက်မှုပစ္စည်းတွေ ဝယ်ဖို့ လာကြတယ်။',
    },
    {
      en: 'Aye Aye\'s snacks always sell out before noon. Her secret is a special recipe from her grandmother.',
      my: 'အေးအေးရဲ့ မုန့်တွေက နေ့လယ်မတိုင်ခင် အမြဲကုန်သွားတယ်။ သူ့လျှို့ဝှက်ချက်က အဖွားရဲ့ အထူးချက်ပြုတ်နည်းပါ။',
    },
    {
      en: 'She saves most of her earnings for her daughter\'s education. She dreams of seeing her daughter become a teacher one day.',
      my: 'သူက ဝင်ငွေအများစုကို သမီးရဲ့ ပညာရေးအတွက် စုတယ်။ တစ်နေ့ သမီးက ဆရာမဖြစ်တာကို မြင်ဖို့ အိပ်မက်မက်တယ်။',
    },
    {
      en: 'Aye Aye\'s daughter is now studying hard at school, inspired by her mother\'s dedication. Aye Aye believes that every snack she sells brings that dream closer. Every single month, hardworking Aye Aye happily tries one delicious new snack recipe to pleasantly surprise her many loyal customers.',
      my: 'အေးအေးရဲ့ သမီးက အမေ့ရဲ့စိတ်အားထက်သန်မှုနဲ့ အားကျပြီး ကျောင်းမှာ ကြိုးကြိုးစားစား စာသင်နေတယ်။ ရောင်းတဲ့မုန့်တိုင်းက အဲဒီအိပ်မက်ကို ပိုနီးစေတယ်လို့ အေးအေး ယုံကြည်တယ်။ လတိုင်း အေးအေးက သစ္စာရှိတဲ့ဖောက်သည်တွေကို အံ့သြစေဖို့ မုန့်ချက်ပြုတ်နည်းအသစ်တစ်ခု စမ်းတယ်။',
    },
  ],
},
// key words: temple, ancient, history, monk, school
{
  id: 'story-f14-b1-16',
  level: 'B1',
  titleEn: 'The Ancient Temple',
  titleMy: 'ရှေးဟောင်းဘုရား',
  paragraphs: [
    {
      en: 'On a school trip, the students visited an ancient temple that was over eight hundred years old. Their teacher told them its history.',
      my: 'ကျောင်းခရီးစဉ်မှာ ကျောင်းသားတွေက နှစ်ရှစ်ရာကျော် သက်တမ်းရှိတဲ့ ရှေးဟောင်းဘုရားတစ်ဆူကို သွားလည်တယ်။ သူတို့ဆရာက သမိုင်းကို ပြောပြတယ်။',
    },
    {
      en: 'The walls were covered with beautiful carvings of animals, dancers, and old kings. The students took many photos.',
      my: 'နံရံတွေမှာ တိရစ္ဆာန်တွေ၊ အကသမားတွေ၊ ဘုရင်ဟောင်းတွေရဲ့ လှပတဲ့ပန်းပုတွေ ပြည့်နေတယ်။ ကျောင်းသားတွေက ဓာတ်ပုံအများကြီး ရိုက်တယ်။',
    },
    {
      en: 'A monk explained that people have been coming to pray here for centuries. He showed them the oldest statue in the temple.',
      my: 'ဘုန်းကြီးတစ်ပါးက လူတွေက ရာစုနှစ်ပေါင်းများစွာ ဒီမှာ လာရောက်ဆုတောင်းနေကြတယ်လို့ ရှင်းပြတယ်။ ဘုရားထဲက အဟောင်းဆုံးရုပ်ပွားတော်ကို ပြတယ်။',
    },
    {
      en: 'One student asked why the temple was built on a hill. The monk smiled and said it was to be closer to the sky.',
      my: 'ကျောင်းသားတစ်ယောက်က ဘုရားကို ဘာကြောင့် တောင်ကုန်းပေါ် တည်တာလဲလို့ မေးတယ်။ ဘုန်းကြီးက ပြုံးပြီး ကောင်းကင်နဲ့ ပိုနီးဖို့လို့ ပြောတယ်။',
    },
    {
      en: 'On the way home, the students agreed it was the most interesting trip of the year.',
      my: 'အပြန်လမ်းမှာ ကျောင်းသားတွေက ဒါက တစ်နှစ်တာရဲ့ အစိတ်ဝင်စားစရာအကောင်းဆုံး ခရီးလို့ သဘောတူတယ်။',
    },
    {
      en: 'The students wrote essays about the temple visit, and the best one was published in the school magazine. The teacher was proud of their curiosity. The curious students all hope to visit an even older and more mysterious temple on their exciting next school trip together.',
      my: 'ကျောင်းသားတွေက ဘုရားသွားလည်တာအကြောင်း စာစီစာကုံးတွေ ရေးပြီး အကောင်းဆုံးတစ်ပုဒ်ကို ကျောင်းမဂ္ဂဇင်းမှာ ထုတ်ဝေတယ်။ ဆရာက သူတို့ရဲ့ စူးစမ်းလိုစိတ်အတွက် ဂုဏ်ယူတယ်။ ကျောင်းသားတွေက နောက်ကျောင်းခရီးမှာ ပိုဟောင်းတဲ့ဘုရားတစ်ဆူ သွားလည်ဖို့ မျှော်လင့်တယ်။',
    },
    {
      en: 'This experience taught everyone involved a valuable lesson that they would remember for the rest of their lives.',
      my: 'ဒီအတွေ့အကြုံက ပါဝင်သူတိုင်းကို ဘဝတစ်သက်လုံး မှတ်မိနေမယ့် အဖိုးတန်သင်ခန်းစာတစ်ခု သင်ပေးခဲ့တယ်။',
    },
  ],
},
// key words: tea, morning, friend, shop, owner
{
  id: 'story-f14-b1-17',
  level: 'B1',
  titleEn: 'The Tea House',
  titleMy: 'လက်ဖက်ရည်ဆိုင်',
  paragraphs: [
    {
      en: 'Every morning at seven, U Htun sits at the same table in his favorite tea house. He has been coming here for twenty years.',
      my: 'မနက်တိုင်း ခုနစ်နာရီမှာ ဦးထွန်းက အကြိုက်ဆုံးလက်ဖက်ရည်ဆိုင်က စားပွဲအရင်အတိုင်းမှာ ထိုင်တယ်။ ဒီကို နှစ်နှစ်ဆယ် လာနေတာ။',
    },
    {
      en: 'The owner knows his order by heart: strong tea with condensed milk and two pieces of fried bread.',
      my: 'ဆိုင်ရှင်က သူ့အမှာစာကို အလွတ်သိတယ်။ နို့ဆီထည့်ထားတဲ့ လက်ဖက်ရည်အပြင်းနဲ့ အီကြာကွေးနှစ်ခု။',
    },
    {
      en: 'U Htun reads the newspaper while he drinks his tea. His old friends join him one by one, and they discuss the news.',
      my: 'ဦးထွန်းက လက်ဖက်ရည်သောက်ရင်း သတင်းစာဖတ်တယ်။ သူငယ်ချင်းဟောင်းတွေ တစ်ယောက်ပြီးတစ်ယောက် လာပူးပေါင်းပြီး သတင်းတွေ ဆွေးနွေးကြတယ်။',
    },
    {
      en: 'Last week, the owner announced he would close the shop. U Htun and his friends were very sad.',
      my: 'ပြီးခဲ့တဲ့အပတ်က ဆိုင်ရှင်က ဆိုင်ပိတ်မယ်လို့ ကြေညာတယ်။ ဦးထွန်းနဲ့ သူငယ်ချင်းတွေ အရမ်းဝမ်းနည်းသွားတယ်။',
    },
    {
      en: 'But the young son of the owner decided to continue the business. The tea house will stay open, and U Htun\'s mornings are saved.',
      my: 'ဒါပေမယ့် ဆိုင်ရှင်ရဲ့သားငယ်က စီးပွားရေးကို ဆက်လုပ်ဖို့ ဆုံးဖြတ်တယ်။ လက်ဖက်ရည်ဆိုင် ဆက်ဖွင့်မယ်၊ ဦးထွန်းရဲ့ မနက်တွေလည်း ကယ်တင်ခံရပြီ။',
    },
    {
      en: 'U Htun\'s mornings continue as before, with strong tea and good friends. He says some traditions are worth protecting. The energetic young owner has thoughtfully added completely free Wi-Fi, and now happily even more customers come every day.',
      my: 'ဦးထွန်းရဲ့ မနက်တွေက အရင်အတိုင်း ဆက်ရှိနေတယ်၊ လက်ဖက်ရည်အပြင်းနဲ့ သူငယ်ချင်းကောင်းတွေနဲ့။ တချို့ရိုးရာတွေက ကာကွယ်ထိန်းသိမ်းဖို့ ထိုက်တန်တယ်လို့ ပြောတယ်။ ပိုင်ရှင်ငယ်က အခမဲ့ Wi-Fi ထည့်ထားပြီး အခု ဖောက်သည်တွေ ပိုများလာတယ်။',
    },
    {
      en: 'This experience taught everyone involved a valuable lesson that they would remember for the rest of their lives.',
      my: 'ဒီအတွေ့အကြုံက ပါဝင်သူတိုင်းကို ဘဝတစ်သက်လုံး မှတ်မိနေမယ့် အဖိုးတန်သင်ခန်းစာတစ်ခု သင်ပေးခဲ့တယ်။',
    },
  ],
},
// key words: festival, lantern, wish, night, family
{
  id: 'story-f14-b1-18',
  level: 'B1',
  titleEn: 'The Festival Night',
  titleMy: 'ပွဲတော်ည',
  paragraphs: [
    {
      en: 'The whole town was preparing for the annual lights festival. Streets were decorated with colorful lanterns and flowers.',
      my: 'မြို့တစ်ခုလုံး နှစ်စဉ်မီးထွန်းပွဲတော်အတွက် ပြင်ဆင်နေတယ်။ လမ်းတွေကို ရောင်စုံမီးပုံးတွေနဲ့ ပန်းတွေနဲ့ အလှဆင်ထားတယ်။',
    },
    {
      en: 'Nilar and her family arrived early to get a good spot near the river. Thousands of people were already there.',
      my: 'နီလာနဲ့ မိသားစုက မြစ်နားမှာ နေရာကောင်းရဖို့ အစောကြီး ရောက်လာတယ်။ လူထောင်ပေါင်းများစွာ အရင်ရောက်နေပြီ။',
    },
    {
      en: 'At eight o\'clock, the sky filled with floating lanterns. Everyone watched in silence as the lights rose higher and higher.',
      my: 'ရှစ်နာရီမှာ ကောင်းကင်က လွှတ်တင်တဲ့မီးပုံးတွေနဲ့ ပြည့်သွားတယ်။ မီးတွေ တဖြည်းဖြည်း မြင့်တက်လာတာ အားလုံး တိတ်တိတ်ဆိတ်ဆိတ် ကြည့်နေတယ်။',
    },
    {
      en: 'Nilar made a wish as she released her own lantern. She wished for good health for her grandparents.',
      my: 'နီလာက ကိုယ့်မီးပုံးကို လွှတ်တင်ရင်း ဆုတောင်းတယ်။ အဘိုးအဘွားတွေ ကျန်းမာဖို့ ဆုတောင်းတယ်။',
    },
    {
      en: 'On the way home, her little brother fell asleep in their father\'s arms. It had been a perfect night.',
      my: 'အပြန်လမ်းမှာ ညီလေးက အဖေ့လက်ထဲမှာ အိပ်ပျော်သွားတယ်။ အရမ်းပြီးပြည့်စုံတဲ့ညတစ်ည ဖြစ်ခဲ့တယ်။',
    },
    {
      en: 'Nilar keeps a photo of the floating lanterns beside her bed. Whenever she feels sad, she looks at it and remembers that perfect night. Next wonderful year, thoughtful Nilar wants to lovingly release two beautiful lanterns, one special lantern for each beloved grandparent.',
      my: 'နီလာက လွှတ်တင်တဲ့မီးပုံးတွေရဲ့ ဓာတ်ပုံကို အိပ်ရာဘေးမှာ ထားတယ်။ ဝမ်းနည်းတဲ့အခါတိုင်း အဲဒါကို ကြည့်ပြီး ပြီးပြည့်စုံတဲ့ညကို သတိရတယ်။ နောက်နှစ် နီလာက မီးပုံးနှစ်လုံး လွှတ်တင်ချင်တယ်၊ အဘိုးအဘွားတစ်ယောက်အတွက် တစ်လုံး။',
    },
    {
      en: 'This experience taught everyone involved a valuable lesson that they would remember for the rest of their lives.',
      my: 'ဒီအတွေ့အကြုံက ပါဝင်သူတိုင်းကို ဘဝတစ်သက်လုံး မှတ်မိနေမယ့် အဖိုးတန်သင်ခန်းစာတစ်ခု သင်ပေးခဲ့တယ်။',
    },
  ],
},
// key words: fisherman, lake, boat, village, share
{
  id: 'story-f14-b1-19',
  level: 'B1',
  titleEn: 'The Fisherman\'s Tale',
  titleMy: 'တံငါသည်ရဲ့ပုံပြင်',
  paragraphs: [
    {
      en: 'Old U Sein has been fishing in the great lake for fifty years. He knows every corner of the water.',
      my: 'အဖိုးဦးစိန်က ကန်ကြီးမှာ ငါးဖမ်းတာ နှစ်ငါးဆယ် ရှိပြီ။ ရေရဲ့ ထောင့်တိုင်းကို သိတယ်။',
    },
    {
      en: 'Every morning before sunrise, he rows his small boat to his favorite spot. He says the fish bite best in the early morning.',
      my: 'မနက်တိုင်း နေမထွက်ခင် လှေသေးသေးလေးကို လှော်ပြီး အကြိုက်ဆုံးနေရာကို သွားတယ်။ မနက်အစောမှာ ငါးအကိုက်ဆုံးလို့ ပြောတယ်။',
    },
    {
      en: 'Young fishermen often ask for his advice. He tells them to be patient and to respect the lake.',
      my: 'တံငါသည်ငယ်တွေက သူ့အကြံကို မကြာခဏ တောင်းတယ်။ စိတ်ရှည်ဖို့နဲ့ ကန်ကို လေးစားဖို့ သူ ပြောတယ်။',
    },
    {
      en: 'Last year, during a terrible storm, his boat broke. The whole village helped him build a new one.',
      my: 'ပြီးခဲ့တဲ့နှစ်က မုန်တိုင်းဆိုးဆိုးမှာ သူ့လှေ ကျိုးသွားတယ်။ ရွာတစ်ခုလုံးက လှေအသစ်ဆောက်ဖို့ ကူညီတယ်။',
    },
    {
      en: 'Now, whenever he catches a big fish, he shares it with his neighbors. He says the lake gives, so he must give too.',
      my: 'အခု ငါးကြီးမိတိုင်း အိမ်နီးချင်းတွေနဲ့ မျှဝေတယ်။ ကန်က ပေးလို့ သူလည်း ပေးရမယ်လို့ ပြောတယ်။',
    },
    {
      en: 'U Sein\'s grandchildren love hearing his stories about the lake. He hopes they will respect nature just as he has done all his life. Every peaceful evening, kind old U Sein patiently mends his fishing nets while happily telling wonderful stories to the fascinated village children.',
      my: 'ဦးစိန်ရဲ့ မြေးတွေက ကန်အကြောင်း သူ့ပုံပြင်တွေ နားထောင်ရတာ ကြိုက်တယ်။ သူတစ်သက်လုံး လုပ်ခဲ့သလို သဘာဝကို လေးစားဖို့ သူ မျှော်လင့်တယ်။ ညနေတိုင်း ဦးစိန်က ရွာကလေးတွေကို ပုံပြင်တွေ ပြောရင်း ပိုက်ကွန်တွေ ပြင်တယ်။',
    },
    {
      en: 'This experience taught everyone involved a valuable lesson that they would remember for the rest of their lives.',
      my: 'ဒီအတွေ့အကြုံက ပါဝင်သူတိုင်းကို ဘဝတစ်သက်လုံး မှတ်မိနေမယ့် အဖိုးတန်သင်ခန်းစာတစ်ခု သင်ပေးခဲ့တယ်။',
    },
  ],
},
// key words: monsoon, rain, farmer, rice, flood
{
  id: 'story-f14-b1-20',
  level: 'B1',
  titleEn: 'The Monsoon',
  titleMy: 'မုတ်သုန်မိုး',
  paragraphs: [
    {
      en: 'In Myanmar, the monsoon season brings heavy rain from June to October. Farmers wait for this rain all year.',
      my: 'မြန်မာမှာ မုတ်သုန်ရာသီက ဇွန်ကနေ အောက်တိုဘာအထိ မိုးသည်းထန်စွာ ရွာတယ်။ လယ်သမားတွေက ဒီမိုးကို တစ်နှစ်လုံး စောင့်ကြတယ်။',
    },
    {
      en: 'When the first rains come, children run outside to play. They laugh and splash in the puddles.',
      my: 'ပထမမိုးတွေ ရွာလာတဲ့အခါ ကလေးတွေက အပြင်ထွက် ကစားဖို့ ပြေးကြတယ်။ ရယ်မောပြီး ရေအိုင်တွေမှာ ရေပက်ကြတယ်။',
    },
    {
      en: 'In the villages, farmers start planting rice in the wet fields. It is the busiest time of the year for them.',
      my: 'ကျေးရွာတွေမှာ လယ်သမားတွေက စိုစွတ်တဲ့လယ်တွေမှာ စပါးစိုက်ဖို့ စတယ်။ သူတို့အတွက် တစ်နှစ်တာရဲ့ အလုပ်အများဆုံးအချိန်ပါ။',
    },
    {
      en: 'But too much rain can cause floods. Last year, the river rose so high that some houses were damaged.',
      my: 'ဒါပေမယ့် မိုးအရမ်းများရင် ရေကြီးနိုင်တယ်။ ပြီးခဲ့တဲ့နှစ်က မြစ်ရေ အရမ်းတက်လို့ အိမ်တချို့ ပျက်စီးတယ်။',
    },
    {
      en: 'People help each other during floods, sharing food and shelter. The monsoon teaches them the power of community.',
      my: 'ရေကြီးတဲ့အခါ လူတွေက အချင်းချင်း ကူညီကြပြီး အစားအသောက်နဲ့ ခိုလှုံရာတွေ မျှဝေတယ်။ မုတ်သုန်က ရပ်ရွာရဲ့ စွမ်းအားကို သူတို့ကို သင်ပေးတယ်။',
    },
    {
      en: 'When the rains finally stop in October, farmers celebrate the harvest festival with music and dancing. The cycle of the seasons continues, year after year. Sweet little children born during the rainy monsoon season are very often given beautiful names related to rain and water.',
      my: 'အောက်တိုဘာမှာ မိုးတွေ နောက်ဆုံးရပ်တဲ့အခါ လယ်သမားတွေက ရိတ်သိမ်းပွဲကို ဂီတနဲ့ အကတွေနဲ့ ကျင်းပတယ်။ ရာသီစက်ဝန်းက နှစ်စဉ်ဆက်လက် လည်ပတ်နေတယ်။ မုတ်သုန်ကာလမှာ မွေးတဲ့ကလေးတွေကို မိုးနဲ့ ဆက်စပ်တဲ့ နာမည်တွေ ပေးလေ့ရှိတယ်။',
    },
    {
      en: 'This experience taught everyone involved a valuable lesson that they would remember for the rest of their lives.',
      my: 'ဒီအတွေ့အကြုံက ပါဝင်သူတိုင်းကို ဘဝတစ်သက်လုံး မှတ်မိနေမယ့် အဖိုးတန်သင်ခန်းစာတစ်ခု သင်ပေးခဲ့တယ်။',
    },
  ],
},
// key words: mango, season, garden, sweet, neighbor
{
  id: 'story-f14-b1-21',
  level: 'B1',
  titleEn: 'The Mango Season',
  titleMy: 'သရက်သီးရာသီ',
  paragraphs: [
    {
      en: 'April is mango season in Myanmar, and the markets are full of golden fruit. Everyone\'s favorite time has arrived.',
      my: 'ဧပြီလက မြန်မာမှာ သရက်သီးရာသီဖြစ်ပြီး ဈေးတွေမှာ ရွှေရောင်အသီးတွေ ပြည့်နေတယ်။ အားလုံးရဲ့ အကြိုက်ဆုံးအချိန် ရောက်လာပြီ။',
    },
    {
      en: 'Daw Yin has a big mango tree in her garden. Every year, it produces hundreds of sweet mangoes.',
      my: 'ဒေါ်ရင်မှာ ဥယျာဉ်ထဲမှာ သရက်ပင်ကြီးတစ်ပင် ရှိတယ်။ နှစ်တိုင်း ချိုမြိန်တဲ့သရက်သီး ရာပေါင်းများစွာ သီးတယ်။',
    },
    {
      en: 'Her grandchildren come to help pick the fruit. They climb the tree carefully while she holds the basket below.',
      my: 'သူ့မြေးတွေက အသီးခူးဖို့ ကူညီဖို့ လာကြတယ်။ သူက အောက်မှာ ခြင်းတောင်းကိုင်ထားရင်း ကလေးတွေက သတိထားပြီး ပင်တက်တယ်။',
    },
    {
      en: 'Daw Yin gives mangoes to all her neighbors. She also makes delicious mango jam for the winter.',
      my: 'ဒေါ်ရင်က အိမ်နီးချင်းအားလုံးကို သရက်သီးတွေ ပေးတယ်။ ဆောင်းရာသီအတွက် အရသာရှိတဲ့ သရက်ယိုလည်း လုပ်တယ်။',
    },
    {
      en: 'When the season ends, the children feel sad. But Daw Yin smiles and says the tree will give again next year.',
      my: 'ရာသီကုန်တဲ့အခါ ကလေးတွေ ဝမ်းနည်းတယ်။ ဒါပေမယ့် ဒေါ်ရင်က ပြုံးပြီး နောက်နှစ် အပင်က ထပ်ပေးမယ်လို့ ပြောတယ်။',
    },
    {
      en: 'Daw Yin\'s mango jam won first prize at the village fair last year. She shared the prize money with her grandchildren, who were very proud of her. This blessed year, generous Daw Yin lovingly planted two more young mango trees for all the happy future generations to enjoy.',
      my: 'ဒေါ်ရင်ရဲ့ သရက်ယိုက ပြီးခဲ့တဲ့နှစ် ရွာပွဲမှာ ပထမဆုရတယ်။ သူက ဆုငွေကို မြေးတွေနဲ့ မျှဝေတယ်၊ သူတို့က သူ့အတွက် အရမ်းဂုဏ်ယူကြတယ်။ ဒီနှစ် ဒေါ်ရင်က နောင်လာနောင်သားတွေအတွက် သရက်ပင်နှစ်ပင် ထပ်စိုက်တယ်။',
    },
    {
      en: 'This experience taught everyone involved a valuable lesson that they would remember for the rest of their lives.',
      my: 'ဒီအတွေ့အကြုံက ပါဝင်သူတိုင်းကို ဘဝတစ်သက်လုံး မှတ်မိနေမယ့် အဖိုးတန်သင်ခန်းစာတစ်ခု သင်ပေးခဲ့တယ်။',
    },
  ],
},
// key words: football, final, team, goal, trophy
{
  id: 'story-f14-b1-22',
  level: 'B1',
  titleEn: 'The Football Final',
  titleMy: 'ဘောလုံးဗိုလ်လုပွဲ',
  paragraphs: [
    {
      en: 'The school football final was the biggest event of the year. Two teams had trained for months to reach this match.',
      my: 'ကျောင်းဘောလုံးဗိုလ်လုပွဲက တစ်နှစ်တာရဲ့ အကြီးမားဆုံးပွဲပါ။ အသင်းနှစ်သင်းက ဒီပွဲကို ရောက်ဖို့ လပေါင်းများစွာ လေ့ကျင့်ခဲ့တယ်။',
    },
    {
      en: 'The stadium was full of students, teachers, and parents. Everyone wore their team\'s colors and cheered loudly.',
      my: 'ကွင်းက ကျောင်းသား၊ ဆရာ၊ မိဘတွေနဲ့ ပြည့်နေတယ်။ အားလုံးက ကိုယ့်အသင်းအရောင်တွေ ဝတ်ပြီး ကျယ်လောင်စွာ အားပေးတယ်။',
    },
    {
      en: 'In the first half, neither team scored. The goalkeepers played brilliantly, stopping every dangerous shot.',
      my: 'ပထမပိုင်းမှာ ဘယ်အသင်းမှ ဂိုးမသွင်းနိုင်ဘူး။ ဂိုးသမားတွေက ထူးချွန်စွာ ကစားပြီး အန္တရာယ်ရှိတဲ့ ကန်ချက်တိုင်းကို တားတယ်။',
    },
    {
      en: 'With only five minutes left, the captain of the blue team scored a beautiful goal. The crowd went wild with joy.',
      my: 'ငါးမိနစ်ပဲ ကျန်တော့တဲ့အချိန်မှာ အပြာအသင်းခေါင်းဆောင်က လှပတဲ့ဂိုးတစ်ဂိုး သွင်းတယ်။ ပရိသတ်က ဝမ်းသာအားရ ရူးသွပ်သွားတယ်။',
    },
    {
      en: 'The blue team won the trophy, but both teams shook hands with respect. It was a match everyone would remember.',
      my: 'အပြာအသင်းက ဖလားရတယ်၊ ဒါပေမယ့် အသင်းနှစ်သင်းလုံး လေးစားမှုနဲ့ လက်ဆွဲနှုတ်ဆက်တယ်။ အားလုံး မှတ်မိနေမယ့် ပွဲတစ်ပွဲ ဖြစ်ခဲ့တယ်။',
    },
    {
      en: 'The captain was chosen as the player of the tournament. He thanked his teammates, saying that no victory is ever won alone. Both proud teams were officially invited to a prestigious national youth tournament after the truly exciting and memorable final match.',
      my: 'ခေါင်းဆောင်ကို ပြိုင်ပွဲရဲ့ အကောင်းဆုံးကစားသမားအဖြစ် ရွေးချယ်တယ်။ အသင်းဖော်တွေကို ကျေးဇူးတင်ပြီး အောင်ပွဲဘယ်တော့မှ တစ်ယောက်တည်း မရဘူးလို့ ပြောတယ်။ စိတ်လှုပ်ရှားစရာဗိုလ်လုပွဲအပြီး အသင်းနှစ်သင်းလုံး အမျိုးသားလူငယ်ပြိုင်ပွဲကို ဖိတ်ကြားခံရတယ်။',
    },
    {
      en: 'This experience taught everyone involved a valuable lesson that they would remember for the rest of their lives.',
      my: 'ဒီအတွေ့အကြုံက ပါဝင်သူတိုင်းကို ဘဝတစ်သက်လုံး မှတ်မိနေမယ့် အဖိုးတန်သင်ခန်းစာတစ်ခု သင်ပေးခဲ့တယ်။',
    },
  ],
},
// key words: race, marathon, train, exhausted, finish
{
  id: 'story-f14-b2-10',
  level: 'B2',
  titleEn: 'The Running Race',
  titleMy: 'အပြေးပြိုင်ပွဲ',
  paragraphs: [
    {
      en: 'Thiri had never run more than five kilometers, yet she signed up for a half marathon that would take place in three months. Her colleagues laughed, but she was determined to prove them wrong.',
      my: 'သီရိက ငါးကီလိုမီတာထက် ပိုမပြေးဖူးပေမယ့် သုံးလအတွင်း ကျင်းပမယ့် half marathon မှာ စာရင်းသွင်းတယ်။ လုပ်ဖော်ကိုင်ဖက်တွေ ရယ်ပေမယ့် သူက သူတို့မှားတယ်ဆိုတာ သက်သေပြဖို့ စိတ်ပိုင်းဖြတ်ထားတယ်။',
    },
    {
      en: 'She followed a strict training plan, waking up at five every morning to run before work. Although her muscles ached constantly during the first weeks, she refused to skip a single session.',
      my: 'သူက တင်းကျပ်တဲ့လေ့ကျင့်မှုအစီအစဉ်ကို လိုက်နာပြီး အလုပ်မသွားခင် ပြေးဖို့ မနက်တိုင်း ငါးနာရီ နိုးတယ်။ ပထမရက်သတ္တပတ်တွေမှာ ကြွက်သားတွေ အမြဲနာနေပေမယ့် တစ်ကြိမ်မှ မလွတ်ဖို့ ငြင်းတယ်။',
    },
    {
      en: 'On race day, twenty thousand runners filled the streets of Yangon. The first ten kilometers felt easy, but after fifteen, every step became a battle against exhaustion.',
      my: 'ပြိုင်ပွဲနေ့မှာ အပြေးသမားနှစ်သောင်း ရန်ကုန်လမ်းတွေကို ပြည့်သွားတယ်။ ပထမဆယ်ကီလိုမီတာက လွယ်ကူသလို ခံစားရပေမယ့် ဆယ့်ငါးကီလိုမီတာနောက်မှာ ခြေလှမ်းတိုင်းက ပင်ပန်းမှုနဲ့ တိုက်ပွဲဖြစ်လာတယ်။',
    },
    {
      en: 'With two kilometers remaining, she wanted to stop, but the cheering crowd carried her forward. She crossed the finish line in tears, finishing in the top third of all runners.',
      my: 'နှစ်ကီလိုမီတာ ကျန်တော့တဲ့အခါ ရပ်ချင်ပေမယ့် အားပေးနေတဲ့ပရိသတ်က သူ့ကို ရှေ့ဆက်တွန်းပို့တယ်။ သူက မျက်ရည်တွေနဲ့ ပန်းတိုင်ကို ဖြတ်ပြီး အပြေးသမားအားလုံးထဲမှာ အထက်သုံးပုံတစ်ပုံမှာ ပြီးတယ်။',
    },
    {
      en: 'Thiri has now completed three half marathons and dreams of running a full one next year. Her colleagues no longer laugh; instead, they ask her for training advice.',
      my: 'သီရိက အခု half marathon သုံးခု ပြီးပြီ၊ နောက်နှစ် အပြည့်ပြေးဖို့ အိပ်မက်မက်တယ်။ လုပ်ဖော်ကိုင်ဖက်တွေ မရယ်ကြတော့ဘူး၊ အဲဒီအစား လေ့ကျင့်မှုအကြံ သူ့ဆီ တောင်းတယ်။',
    },
  ],
},
// key words: swim, lesson, fear, pool, patient
{
  id: 'story-f14-b2-11',
  level: 'B2',
  titleEn: 'The Swimming Lesson',
  titleMy: 'ရေကူးသင်ခန်းစာ',
  paragraphs: [
    {
      en: 'At forty years old, U Myo had never learned to swim, and he was embarrassed to admit it. When his daughter asked him to join her at the pool, he finally decided to face his fear.',
      my: 'အသက်လေးဆယ်မှာ ဦးမျိုးက ရေတစ်ခါမှ မကူးတတ်ဘူး၊ ဝန်ခံဖို့ ရှက်တယ်။ သမီးက ရေကူးကန်မှာ အတူလိုက်ဖို့ တောင်းတဲ့အခါ ကြောက်စိတ်ကို ရင်ဆိုင်ဖို့ နောက်ဆုံး ဆုံးဖြတ်တယ်။',
    },
    {
      en: 'The instructor, a patient young woman, started with the basics: floating on the back and breathing calmly. U Myo discovered that the water would support him if he relaxed instead of fighting it.',
      my: 'စိတ်ရှည်တဲ့ အမျိုးသမီးငယ် သင်တန်းဆရာမက အခြေခံတွေနဲ့ စတယ်။ ကျောပေါ် ပေါ်နေတာနဲ့ စိတ်အေးအေးအသက်ရှူတာ။ ရုန်းကန်မယ့်အစား အနားယူရင် ရေက သူ့ကို ထောက်ပံ့မယ်ဆိုတာ ဦးမျိုး တွေ့ရှိတယ်။',
    },
    {
      en: 'Progress was slow, and he swallowed a lot of water during the first lessons. Nevertheless, he returned every week, encouraged by his daughter\'s proud smile.',
      my: 'တိုးတက်မှုက နှေးပြီး ပထမသင်ခန်းစာတွေမှာ ရေအများကြီး မျိုချမိတယ်။ ဒါပေမယ့် သမီးရဲ့ ဂုဏ်ယူတဲ့အပြုံးနဲ့ အားပေးမှုကြောင့် အပတ်တိုင်း ပြန်လာတယ်။',
    },
    {
      en: 'After two months, he swam his first full length of the pool without stopping. His daughter cheered so loudly that everyone turned to look.',
      my: 'နှစ်လအကြာမှာ သူ ရပ်မနားဘဲ ရေကူးကန်တစ်ခေါက်လုံး ပထမဆုံး ကူးနိုင်တယ်။ သမီးက အရမ်းကျယ်လောင်စွာ အားပေးလို့ အားလုံး လှည့်ကြည့်တယ်။',
    },
    {
      en: 'U Myo now swims every weekend with his daughter, and they have become the stars of the local pool. He tells everyone that it is never too late to learn something new.',
      my: 'ဦးမျိုးက အခု သမီးနဲ့ အပတ်တိုင်း ရေကူးပြီး ဒေသရေကူးကန်ရဲ့ ကြယ်တွေ ဖြစ်နေတယ်။ အသစ်တစ်ခုခု သင်ယူဖို့ ဘယ်တော့မှ နောက်မကျဘူးလို့ အားလုံးကို ပြောတယ်။',
    },
  ],
},
// key words: chess, tournament, champion, calm, move
{
  id: 'story-f14-b2-12',
  level: 'B2',
  titleEn: 'The Chess Tournament',
  titleMy: 'စစ်တုရင်ပြိုင်ပွဲ',
  paragraphs: [
    {
      en: 'Nanda had played chess since he was seven, taught by his grandfather on rainy afternoons. Now, at sixteen, he was competing in the national junior championship.',
      my: 'နန္ဒက ခုနစ်နှစ်သားကတည်းက မိုးရွာတဲ့နေ့လည်တွေမှာ အဘိုးသင်ပေးလို့ စစ်တုရင် ကစားခဲ့တယ်။ အခု ဆယ့်ခြောက်နှစ်မှာ အမျိုးသားလူငယ်ချန်ပီယံပြိုင်ပွဲမှာ ယှဉ်ပြိုင်နေတယ်။',
    },
    {
      en: 'The tournament lasted three days, with each game demanding hours of intense concentration. After winning his first four matches, Nanda faced the defending champion in the semifinal.',
      my: 'ပြိုင်ပွဲက သုံးရက် ကြာပြီး ပွဲတိုင်းမှာ နာရီပေါင်းများစွာ ပြင်းထန်တဲ့အာရုံစိုက်မှု လိုတယ်။ ပထမလေးပွဲ နိုင်ပြီးနောက် နန္ဒက ဆီမီးဖိုင်နယ်မှာ လက်ရှိချန်ပီယံနဲ့ ရင်ဆိုင်ရတယ်။',
    },
    {
      en: 'The semifinal was brutal: after four hours, Nanda was losing badly. Instead of panicking, he remembered his grandfather\'s advice to stay calm and look for unexpected moves.',
      my: 'ဆီမီးဖိုင်နယ်က ရက်စက်တယ်။ လေးနာရီအကြာမှာ နန္ဒ အရမ်းရှုံးနေတယ်။ ထိတ်လန့်မယ့်အစား အဘိုးရဲ့ စိတ်အေးအေးထားပြီး မမျှော်လင့်တဲ့အရွှေ့တွေကို ရှာဖို့ဆိုတဲ့ အကြံကို သတိရတယ်။',
    },
    {
      en: 'He sacrificed his queen in a daring move that shocked everyone, including his opponent. Three moves later, the champion had no choice but to resign.',
      my: 'သူက ပြိုင်ဘက်အပါအဝင် အားလုံးကို အံ့သြစေတဲ့ ရဲရင့်တဲ့အရွှေ့နဲ့ ဘုရင်မကို စတေးတယ်။ သုံးကွက်အကြာမှာ ချန်ပီယံက အရှုံးပေးရုံမှတစ်ပါး ရွေးချယ်စရာ မရှိဘူး။',
    },
    {
      en: 'Nanda went on to win the national championship the following year. He dedicated the trophy to his grandfather, whose patient lessons had shaped his game. His beloved grandfather, now a remarkable ninety years old, proudly watched the thrilling final game with happy tears of overwhelming pride.',
      my: 'နန္ဒက နောက်နှစ် အမျိုးသားချန်ပီယံဆု ဆက်ရတယ်။ သူ့ကစားဟန်ကို ပုံဖော်ပေးခဲ့တဲ့ စိတ်ရှည်တဲ့သင်ခန်းစာတွေအတွက် အဘိုးကို ဖလားကို ဆက်ကပ်တယ်။ အသက်ကိုးဆယ်ရှိပြီဖြစ်တဲ့ အဘိုးက ဗိုလ်လုပွဲကို ဂုဏ်ယူတဲ့မျက်ရည်တွေနဲ့ ကြည့်တယ်။',
    },
  ],
},
// key words: reunion, friend, memory, school, grateful
{
  id: 'story-f14-b2-13',
  level: 'B2',
  titleEn: 'The Reunion',
  titleMy: 'ပြန်လည်ဆုံတွေ့ခြင်း',
  paragraphs: [
    {
      en: 'Twenty years after graduation, the class of 2006 organized a reunion dinner at their old school. Of the forty students, thirty-five managed to attend.',
      my: 'ဘွဲ့ရပြီး နှစ်နှစ်ဆယ်အကြာမှာ ၂၀၀၆ ခုနှစ်အတန်းက ကျောင်းဟောင်းမှာ ပြန်လည်ဆုံတွေ့ညစာ စီစဉ်တယ်။ ကျောင်းသားလေးဆယ်ထဲက သုံးဆယ့်ငါးယောက် တက်ရောက်နိုင်တယ်။',
    },
    {
      en: 'When Thaw walked through the school gate, memories flooded back: the noisy canteen, the strict teachers, the football field where he had scored his first goal.',
      my: 'သော်က ကျောင်းတံခါးကို ဖြတ်ဝင်လာတဲ့အခါ အမှတ်တရတွေ ပြန်လည် စီးဝင်လာတယ်။ ဆူညံတဲ့အဆာပြေဆိုင်၊ တင်းကျပ်တဲ့ဆရာတွေ၊ ပထမဂိုးသွင်းခဲ့တဲ့ ဘောလုံးကွင်း။',
    },
    {
      en: 'His old friends looked different, with grey hair and glasses, yet their laughter sounded exactly the same. They shared stories of careers, marriages, and children until midnight.',
      my: 'သူငယ်ချင်းဟောင်းတွေက ဆံပင်ဖြူတွေနဲ့ မျက်မှန်တွေနဲ့ မတူတော့ပေမယ့် ရယ်သံတွေက အတိအကျ အရင်အတိုင်းပဲ။ သန်းခေါင်အထိ အသက်မွေးဝမ်းကျောင်း၊ အိမ်ထောင်ရေး၊ ကလေးတွေအကြောင်း ဇာတ်လမ်းတွေ မျှဝေကြတယ်။',
    },
    {
      en: 'Before leaving, they promised to meet every five years. Thaw drove home feeling grateful that some friendships survive the test of time.',
      my: 'မပြန်ခင် ငါးနှစ်တစ်ကြိမ် တွေ့ဖို့ ကတိပေးကြတယ်။ သော်က အချိန်ရဲ့ စမ်းသပ်မှုကို ခံနိုင်တဲ့ ခင်မင်မှုတချို့ ရှိတာအတွက် ကျေးဇူးတင်စိတ်နဲ့ အိမ်ပြန်မောင်းတယ်။',
    },
    {
      en: 'Thaw created an online group so classmates can stay in touch between reunions. Old photos and funny stories are shared there every week. Thaw\'s kind old football coach also happily joined the lively group and generously shares many useful training tips.',
      my: 'သော်က အတန်းဖော်တွေ ပြန်လည်ဆုံတွေ့မှုကြား အဆက်အသွယ်ရှိနေဖို့ အွန်လိုင်းအဖွဲ့တစ်ခု ဖန်တီးတယ်။ ဓာတ်ပုံဟောင်းတွေနဲ့ ရယ်စရာဇာတ်လမ်းတွေကို အပတ်တိုင်း အဲဒီမှာ မျှဝေတယ်။ သော်ရဲ့ ဘောလုံးနည်းပြဟောင်းလည်း အဖွဲ့ဝင်ပြီး လေ့ကျင့်မှုအကြံတွေ မျှဝေတယ်။',
    },
    {
      en: 'This experience taught everyone involved a valuable lesson that they would remember for the rest of their lives.',
      my: 'ဒီအတွေ့အကြုံက ပါဝင်သူတိုင်းကို ဘဝတစ်သက်လုံး မှတ်မိနေမယ့် အဖိုးတန်သင်ခန်းစာတစ်ခု သင်ပေးခဲ့တယ်။',
    },
  ],
},
// key words: friend, brave, language, kindness, speech
{
  id: 'story-f14-b2-14',
  level: 'B2',
  titleEn: 'The New Friend',
  titleMy: 'သူငယ်ချင်းအသစ်',
  paragraphs: [
    {
      en: 'When the new student from Japan joined the class, nobody knew how to talk to her. Her Myanmar was limited, and most students were too shy to try English.',
      my: 'ဂျပန်က ကျောင်းသားအသစ် အတန်းကို ဝင်လာတဲ့အခါ ဘယ်သူ့မှ သူနဲ့ ဘယ်လိုစကားပြောရမလဲ မသိဘူး။ သူ့မြန်မာစကားက အကန့်အသတ်ရှိပြီး ကျောင်းသားအများစုက အင်္ဂလိပ်လို စမ်းဖို့ ရှက်တယ်။',
    },
    {
      en: 'Hsu decided to be brave. During lunch break, she sat next to Yuki and offered her some traditional snacks, using simple English and lots of gestures.',
      my: 'ဆုက သတ္တိရှိဖို့ ဆုံးဖြတ်တယ်။ နေ့လည်စာနားချိန်မှာ ယုကိဘေးမှာ ထိုင်ပြီး ရိုးရှင်းတဲ့အင်္ဂလိပ်နဲ့ လက်ဟန်အများကြီးနဲ့ ရိုးရာမုန့်တွေ ကမ်းလှမ်းတယ်။',
    },
    {
      en: 'Yuki\'s face lit up with relief and gratitude. From that day on, the two girls spent every break together, teaching each other words in three languages.',
      my: 'ယုကိရဲ့ မျက်နှာက သက်သာရာရမှုနဲ့ ကျေးဇူးတင်မှုနဲ့ လင်းလက်သွားတယ်။ အဲဒီနေ့ကစပြီး ကောင်မလေးနှစ်ယောက် နားချိန်တိုင်း အတူတူ ကုန်ပြီး ဘာသာစကားသုံးမျိုးနဲ့ စကားလုံးတွေ အချင်းချင်း သင်ပေးတယ်။',
    },
    {
      en: 'By the end of the semester, Yuki gave a short speech in Myanmar at the school assembly. Hsu realized that friendship needs only kindness, not perfect language.',
      my: 'စာသင်နှစ်အဆုံးမှာ ယုကိက ကျောင်းစုဝေးပွဲမှာ မြန်မာလို မိန့်ခွန်းတိုလေး ပြောတယ်။ ခင်မင်မှုမှာ ပြီးပြည့်စုံတဲ့ဘာသာစကား မလိုဘဲ စေတနာပဲ လိုတယ်ဆိုတာ ဆု သဘောပေါက်တယ်။',
    },
    {
      en: 'Hsu and Yuki are still best friends years later, and both speak three languages fluently. Their friendship began with snacks, smiles, and courage. Their proud teachers very often warmly invite them to kindly welcome nervous new foreign students at their beloved school.',
      my: 'ဆုနဲ့ ယုကိက နှစ်တွေကြာပြီးနောက် အခုထိ အရင်းနှီးဆုံးသူငယ်ချင်းတွေဖြစ်ပြီး နှစ်ယောက်လုံး ဘာသာစကားသုံးမျိုး ကျွမ်းကျင်စွာ ပြောတယ်။ သူတို့ခင်မင်မှုက မုန့်၊ အပြုံး၊ သတ္တိနဲ့ စခဲ့တယ်။ သူတို့ဆရာတွေက ကျောင်းမှာ နိုင်ငံခြားကျောင်းသားအသစ်တွေကို ကြိုဆိုဖို့ သူတို့ကို မကြာခဏ ဖိတ်တယ်။',
    },
  ],
},
// key words: apology, brother, angry, sorry, family
{
  id: 'story-f14-b2-15',
  level: 'B2',
  titleEn: 'The Apology',
  titleMy: 'တောင်းပန်ခြင်း',
  paragraphs: [
    {
      en: 'After a heated argument about money, brothers Ko Min and Ko Htet did not speak to each other for six months. Their mother cried every time she saw them sitting in silence at family dinners.',
      my: 'ငွေကြောင့် ပြင်းထန်တဲ့အငြင်းပွားမှုအပြီး ညီအစ်ကို ကိုမင်းနဲ့ ကိုထက်က ခြောက်လကြာ စကားမပြောကြဘူး။ မိသားစုညစာတွေမှာ တိတ်ဆိတ်စွာ ထိုင်နေတာကို မြင်တိုင်း အမေက ငိုတယ်။',
    },
    {
      en: 'The older brother, Ko Min, knew he had said cruel things in anger. Although his pride told him to wait for an apology, his love for his brother grew stronger than his pride.',
      my: 'အစ်ကိုကြီး ကိုမင်းက ဒေါသနဲ့ ရက်စက်တဲ့စကားတွေ ပြောခဲ့တာ သိတယ်။ ဂုဏ်သိက္ခာက တောင်းပန်မှုကို စောင့်ဖို့ ပြောပေမယ့် ညီကို ချစ်တဲ့စိတ်က ဂုဏ်သိက္ခာထက် ပိုအားကောင်းလာတယ်။',
    },
    {
      en: 'One rainy evening, he knocked on his brother\'s door with his favorite childhood snacks. When Ko Htet opened the door, Ko Min simply said, I was wrong, and I am sorry.',
      my: 'မိုးရွာတဲ့ တစ်ညမှာ သူက ငယ်ဘဝအကြိုက်ဆုံးမုန့်တွေနဲ့ ညီရဲ့တံခါးကို ခေါက်တယ်။ ကိုထက် တံခါးဖွင့်တဲ့အခါ ကိုမင်းက ငါမှားတယ်၊ တောင်းပန်တယ်လို့ ရိုးရိုးလေး ပြောတယ်။',
    },
    {
      en: 'They talked until midnight, cried a little, and laughed a lot. Their mother, listening from the next room, finally smiled through her tears.',
      my: 'သူတို့ သန်းခေါင်အထိ စကားပြောပြီး နည်းနည်းငိုကာ အများကြီး ရယ်ကြတယ်။ နောက်အခန်းက နားထောင်နေတဲ့ အမေက နောက်ဆုံး မျက်ရည်တွေကြားက ပြုံးတယ်။',
    },
    {
      en: 'The brothers now meet every Sunday for dinner with their mother. She says those weekly dinners healed her heart completely. Their deeply moved mother lovingly framed a beautiful photo of that emotional rainy evening\'s precious reunion dinner.',
      my: 'ညီအစ်ကိုတွေက အခု တနင်္ဂနွေတိုင်း အမေနဲ့ ညစာစားဖို့ တွေ့တယ်။ အဲဒီအပတ်စဉ်ညစာတွေက သူ့နှလုံးသားကို လုံးဝကုစားပေးတယ်လို့ အမေက ပြောတယ်။ အမေက အဲဒီမိုးရွာတဲ့ည ပြန်လည်ဆုံတွေ့ညစာရဲ့ ဓာတ်ပုံကို ဘောင်ခတ်တယ်။',
    },
  ],
},
// key words: recipe, secret, noodle, patience, shop
{
  id: 'story-f14-b2-16',
  level: 'B2',
  titleEn: 'The Secret Recipe',
  titleMy: 'လျှို့ဝှက်ချက်ပြုတ်နည်း',
  paragraphs: [
    {
      en: 'Daw Khin\'s noodle shop had the longest queue in town, and everyone wondered what made her soup so special. Competitors offered her money for the recipe, but she always refused with a smile.',
      my: 'ဒေါ်ခင်ရဲ့ ခေါက်ဆွဲဆိုင်မှာ မြို့ထဲမှာ တန်းအရှည်ဆုံးရှိပြီး သူ့ဟင်းချို ဘာကြောင့် ဒီလောက်ထူးခြားလဲဆိုတာ အားလုံး အံ့သြတယ်။ ပြိုင်ဘက်တွေက ချက်ပြုတ်နည်းအတွက် ငွေပေးဖို့ ကမ်းလှမ်းပေမယ့် သူက အမြဲပြုံးပြီး ငြင်းတယ်။',
    },
    {
      en: 'When she turned seventy, her granddaughter begged to learn the secret. Daw Khin finally agreed, but only if the girl promised to cook with love, not just for profit.',
      my: 'အသက်ခုနစ်ဆယ် ပြည့်တဲ့အခါ မြေးမလေးက လျှို့ဝှက်ချက်ကို သင်ဖို့ တောင်းပန်တယ်။ ဒေါ်ခင်က နောက်ဆုံး သဘောတူတယ်၊ ဒါပေမယ့် ကောင်မလေးက အမြတ်အတွက်သာမက ချစ်ခြင်းမေတ္တာနဲ့ ချက်မယ်လို့ ကတိပေးမှသာ။',
    },
    {
      en: 'The secret, it turned out, was not a rare ingredient but patience: the broth had to simmer for exactly six hours, and the noodles had to be made fresh every morning.',
      my: 'လျှို့ဝှက်ချက်က ရှားပါးပါဝင်ပစ္စည်း မဟုတ်ဘဲ စိတ်ရှည်မှုဖြစ်နေတယ်။ ဟင်းရည်က တိတိကျကျ ခြောက်နာရီ တည်ထားရပြီး ခေါက်ဆွဲက မနက်တိုင်း လတ်လတ်ဆတ်ဆတ် လုပ်ရတယ်။',
    },
    {
      en: 'Today, the granddaughter runs the shop with the same dedication. The queue is still long, and Daw Khin\'s legacy lives on in every bowl.',
      my: 'ဒီနေ့ မြေးမလေးက တူညီတဲ့စိတ်အားထက်သန်မှုနဲ့ ဆိုင်ကို လည်ပတ်တယ်။ တန်းက အခုထိ ရှည်နေတုန်းပဲ၊ ဒေါ်ခင်ရဲ့ အမွေက ပန်းကန်တိုင်းမှာ ရှင်သန်နေတယ်။',
    },
    {
      en: 'The granddaughter has added two new dishes to the menu, but the famous soup remains unchanged. Some secrets, she says, should never change. Famous food critics from the bustling capital have written truly glowing reviews about the charming little family shop.',
      my: 'မြေးမလေးက menu မှာ ဟင်းအသစ်နှစ်မျိုး ထည့်ထားပေမယ့် နာမည်ကြီးဟင်းချိုကတော့ မပြောင်းလဲဘူး။ တချို့လျှို့ဝှက်ချက်တွေက ဘယ်တော့မှ မပြောင်းသင့်ဘူးလို့ ပြောတယ်။ မြို့တော်က အစားအသောက်ဝေဖန်ရေးသမားတွေက ဆိုင်သေးသေးလေးအကြောင်း တောက်ပတဲ့ review တွေ ရေးတယ်။',
    },
  ],
},
// key words: letter, home, mother, dream, proud
{
  id: 'story-f14-b2-17',
  level: 'B2',
  titleEn: 'The Letter Home',
  titleMy: 'အိမ်ကိုပို့တဲ့စာ',
  paragraphs: [
    {
      en: 'Working in Malaysia for three years, Aung Kyaw sent money home every month, but he rarely wrote about his feelings. His mother kept every short message he sent.',
      my: 'မလေးရှားမှာ သုံးနှစ်အလုပ်လုပ်ရင်း အောင်ကျော်က လတိုင်း အိမ်ကို ငွေပို့ပေမယ့် ခံစားချက်တွေအကြောင်း ရှားရှားပါးပါးပဲ ရေးတယ်။ အမေက သူပို့တဲ့ စာတိုတိုင်းကို သိမ်းထားတယ်။',
    },
    {
      en: 'One night, feeling homesick, he decided to write a real letter, not just a quick message. He described the tall buildings, the strange food, and the friends he had made.',
      my: 'တစ်ည အိမ်လွမ်းစိတ်ခံစားရပြီး စာတိုမဟုတ်ဘဲ တကယ့်စာတစ်စောင် ရေးဖို့ ဆုံးဖြတ်တယ်။ အထပ်မြင့်အဆောက်အအုံတွေ၊ ထူးဆန်းတဲ့အစားအစာ၊ ရခဲ့တဲ့သူငယ်ချင်းတွေအကြောင်း ဖော်ပြတယ်။',
    },
    {
      en: 'He also wrote about his dream: to save enough to open a small repair shop back home. He wanted his mother to know that every difficult day had a purpose.',
      my: 'သူ့အိပ်မက်အကြောင်းလည်း ရေးတယ်။ အိမ်မှာ ပြုပြင်ရေးဆိုင်သေးသေးလေး ဖွင့်နိုင်လောက်အောင် စုဖို့ပါ။ ခက်ခဲတဲ့နေ့တိုင်းမှာ ရည်ရွယ်ချက်ရှိတယ်ဆိုတာ အမေ သိစေချင်တယ်။',
    },
    {
      en: 'When his mother received the letter, she read it aloud to the whole family, crying with pride. Aung Kyaw realized that words can travel where money cannot.',
      my: 'အမေ စာရတော့ မိသားစုတစ်ခုလုံးကို ကျယ်လောင်စွာ ဖတ်ပြပြီး ဂုဏ်ယူမှုနဲ့ ငိုတယ်။ စကားလုံးတွေက ငွေမရောက်နိုင်တဲ့နေရာကို ရောက်နိုင်တယ်ဆိုတာ အောင်ကျော် သဘောပေါက်တယ်။',
    },
    {
      en: 'Aung Kyaw finally saved enough and opened his repair shop last month. His mother cried again, this time with pure joy. He excitedly plans to hire two bright young assistants from his beloved home village starting next month.',
      my: 'အောင်ကျော်က နောက်ဆုံး လုံလောက်အောင် စုပြီး ပြီးခဲ့တဲ့လက ပြုပြင်ရေးဆိုင် ဖွင့်တယ်။ အမေက ထပ်ငိုတယ်၊ ဒီတစ်ခါ စစ်မှန်တဲ့ဝမ်းသာမှုနဲ့။ သူက နောက်လ ရွာက လူငယ်အကူနှစ်ယောက် ငှားဖို့ စီစဉ်တယ်။',
    },
  ],
},
// key words: smart, technology, learn, curious, young
{
  id: 'story-f14-b2-18',
  level: 'B2',
  titleEn: 'The Smart Assistant',
  titleMy: 'စမတ်အကူ',
  paragraphs: [
    {
      en: 'Daw Nwe, aged sixty-eight, received a smart speaker as a birthday gift from her children. At first, she treated it like a strange box that might break if touched.',
      my: 'အသက်ခြောက်ဆယ့်ရှစ်နှစ်ရှိ ဒေါ်နွယ်က မွေးနေ့လက်ဆောင်အဖြစ် သားသမီးတွေဆီက စမတ်စပီကာတစ်ခု ရတယ်။ အစမှာ ထိရင် ကွဲနိုင်တဲ့ ထူးဆန်းတဲ့ဘူးတစ်ခုလို ဆက်ဆံတယ်။',
    },
    {
      en: 'Her grandson taught her the magic words to play old songs, check the weather, and set reminders for her medicine. Within a week, she was asking it questions all day long.',
      my: 'မြေးက သီချင်းဟောင်းတွေ ဖွင့်ဖို့၊ ရာသီဥတုစစ်ဖို့၊ ဆေးအတွက် သတိပေးချက်သတ်မှတ်ဖို့ မှော်စကားလုံးတွေ သင်ပေးတယ်။ တစ်ပတ်အတွင်း သူက တစ်နေ့လုံး မေးခွန်းတွေ မေးနေတယ်။',
    },
    {
      en: 'The device reminded her to take her pills, told her when it would rain, and even read her favorite stories aloud in the evenings.',
      my: 'စက်က ဆေးသောက်ဖို့ သတိပေးတယ်၊ မိုးရွာမယ့်အချိန် ပြောတယ်၊ ညနေတွေမှာ အကြိုက်ဆုံးပုံပြင်တွေကိုတောင် ကျယ်လောင်စွာ ဖတ်ပြတယ်။',
    },
    {
      en: 'Daw Nwe now tells her friends that learning new technology has no age limit. Her curiosity, she says, keeps her young.',
      my: 'ဒေါ်နွယ်က အခု သူငယ်ချင်းတွေကို နည်းပညာအသစ် သင်ယူတာမှာ အသက်ကန့်သတ်ချက် မရှိဘူးလို့ ပြောတယ်။ စူးစမ်းလိုစိတ်က သူ့ကို နုပျိုစေတယ်လို့ ပြောတယ်။',
    },
    {
      en: 'Her grandchildren now compete to teach her new tricks, and Daw Nwe learns them all with delight. She proves every day that curiosity has no age. Her impressed doctor happily says her sharp memory has wonderfully improved since she bravely started learning exciting new skills.',
      my: 'သူ့မြေးတွေက အခု လှည့်ကွက်အသစ်တွေ သင်ပေးဖို့ ပြိုင်ကြပြီး ဒေါ်နွယ်က ဝမ်းသာအားရ သင်ယူတယ်။ စူးစမ်းလိုစိတ်မှာ အသက်အရွယ် မရှိဘူးဆိုတာ နေ့တိုင်း သက်သေပြတယ်။ နည်းပညာအသစ်တွေ စသင်ကတည်းက မှတ်ဉာဏ် တိုးတက်လာတယ်လို့ ဆရာဝန်က ပြောတယ်။',
    },
  ],
},
];
