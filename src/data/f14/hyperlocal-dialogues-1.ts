// FASE 14 — hyperlocal dialogues 1: everyday Myanmar life (market bargaining, temple etiquette), A1
import type { Dialogue } from '../../types';

export const hyperlocalDialogues1: Dialogue[] = [
  {
    id: 'hl-d-001',
    topic: 'market',
    titleMy: 'ဈေးမှာ ဈေးဆစ်ခြင်း',
    titleTh: 'การต่อรองราคาที่ตลาด',
    titleEn: 'Bargaining at the Market',
    level: 1,
    situationMy: 'ဝယ်သူက ဈေးသည်နဲ့ သရက်သီးဈေး ဆစ်နေတယ်',
    situationTh: 'ผู้ซื้อกำลังต่อรองราคามะม่วงกับแม่ค้า',
    turns: [
      { speaker: 'ဝယ်သူ', speakerTh: 'ผู้ซื้อ', en: 'Good morning! How much are the mangoes today?', my: 'မင်္ဂလာပါ။ ဒီနေ့ သရက်သီးက ဘယ်လောက်လဲ။', th: 'สวัสดีตอนเช้าค่ะ วันนี้มะม่วงกิโลละเท่าไหร่คะ' },
      { speaker: 'ဈေးသည်', speakerTh: 'ผู้ขาย', en: "Good morning! Six thousand kyat a kilo. They're very sweet today.", my: 'မင်္ဂလာပါ။ တစ်ကီလို ခြောက်ထောင်ကျပ်။ ဒီနေ့ အရမ်းချိုတယ်။', th: 'สวัสดีตอนเช้าค่ะ กิโลละหกพันจ๊าต วันนี้หวานมากค่ะ' },
      { speaker: 'ဝယ်သူ', speakerTh: 'ผู้ซื้อ', en: "That's a little expensive. Can you make it cheaper?", my: 'နည်းနည်း ဈေးကြီးတယ်။ ဈေးလျှော့ပေးနိုင်မလား။', th: 'แพงไปหน่อยค่ะ ลดให้หน่อยได้ไหมคะ' },
      { speaker: 'ဈေးသည်', speakerTh: 'ผู้ขาย', en: 'These are the best ones, fresh from the farm this morning. How about five thousand five hundred?', my: 'ဒါတွေက အကောင်းဆုံးတွေ၊ ဒီမနက် လယ်ကွင်းကနေ တိုက်ရိုက်ရောက်တာ။ ငါးထောင့်ငါးရာ ဆိုရင်ရော။', th: 'นี่ของดีที่สุดค่ะ สดจากสวนเมื่อเช้านี้เอง ห้าพันห้าร้อยเอาไหมคะ' },
      { speaker: 'ဝယ်သူ', speakerTh: 'ผู้ซื้อ', en: 'How about five thousand kyat, okay?', my: 'ငါးထောင်ကျပ်ဆိုရင်ရော၊ ရလား။', th: 'ห้าพันจ๊าตได้ไหมคะ ตกลงไหมคะ' },
      { speaker: 'ဈေးသည်', speakerTh: 'ผู้ขาย', en: "Hmm... for you, okay, five thousand. How many kilos do you want?", my: 'ဟမ်း... ခင်ဗျားအတွက်ဆို ရပါတယ်၊ ငါးထောင်။ ဘယ်နှစ်ကီလို ယူမလဲ။', th: 'อืม... สำหรับคุณตกลงค่ะ ห้าพัน เอากี่กิโลคะ' },
      { speaker: 'ဝယ်သူ', speakerTh: 'ผู้ซื้อ', en: "I'll take two kilos, please.", my: 'နှစ်ကီလို ယူမယ်။', th: 'เอาสองกิโลค่ะ' },
      { speaker: 'ဈေးသည်', speakerTh: 'ผู้ขาย', en: 'Two kilos... that will be ten thousand kyat.', my: 'နှစ်ကီလိုဆိုရင်... တစ်သောင်းကျပ် ဖြစ်မယ်။', th: 'สองกิโล... รวมหนึ่งหมื่นจ๊าตค่ะ' },
      { speaker: 'ဝယ်သူ', speakerTh: 'ผู้ซื้อ', en: 'Here you go. Thank you very much!', my: 'ဒီမှာ။ ကျေးဇူးအများကြီး တင်ပါတယ်။', th: 'นี่ค่ะ ขอบคุณมากนะคะ' },
      { speaker: 'ဈေးသည်', speakerTh: 'ผู้ขาย', en: 'Thank you! Please come again!', my: 'ကျေးဇူးတင်ပါတယ်။ နောက်လည်း လာခဲ့ပါဦး။', th: 'ขอบคุณค่ะ คราวหน้ามาอีกนะคะ' },
    ],
  },
  {
    id: 'hl-d-002',
    topic: 'daily-life',
    titleMy: 'ဘုရားဖူးခြင်း',
    titleTh: 'การไปวัด',
    titleEn: 'Visiting the Temple',
    level: 1,
    situationMy: 'ဧည့်သည်တစ်ဦးက ဘုန်းကြီးထံမှာ ဘုရားဖူးနည်းကို မေးနေတယ်',
    situationTh: 'ผู้เยี่ยมชมกำลังถามพระภิกษุเกี่ยวกับมารยาทในการไปวัด',
    turns: [
      { speaker: 'ဧည့်သည်', speakerTh: 'ผู้เยี่ยมชม', en: 'Good morning. May I go inside the temple?', my: 'မင်္ဂလာပါ။ ဘုရားထဲ ဝင်လို့ရလား။', th: 'สวัสดีตอนเช้าค่ะ ขอเข้าไปในวัดได้ไหมคะ' },
      { speaker: 'ဘုန်းကြီး', speakerTh: 'พระภิกษุ', en: 'Welcome. First, please take off your shoes here.', my: 'ကြိုဆိုပါတယ်။ အရင်ဆုံး ဒီမှာ ဖိနပ်ချွတ်ပေးပါ။', th: 'ยินดีต้อนรับครับ ก่อนอื่นกรุณาถอดรองเท้าตรงนี้ครับ' },
      { speaker: 'ဧည့်သည်', speakerTh: 'ผู้เยี่ยมชม', en: 'Oh, of course! Where should I put them?', my: 'အော်၊ ဟုတ်ကဲ့။ ဘယ်မှာ ထားရမလဲ။', th: 'โอ้ ได้เลยค่ะ ควรวางไว้ตรงไหนคะ' },
      { speaker: 'ဘုန်းကြီး', speakerTh: 'พระภิกษุ', en: 'On the shelf over there. And please cover your shoulders; we ask visitors to dress modestly.', my: 'ဟိုဘက်က စင်ပေါ်မှာ ထားပါ။ ပြီးတော့ ပခုံးကို ဖုံးထားပေးပါ၊ ဘုရားဖူးတွေကို သင့်တော်တဲ့အဝတ်အစား ဝတ်ဖို့ မေတ္တာရပ်ခံပါတယ်။', th: 'วางบนชั้นตรงนั้นครับ และกรุณาคลุมไหล่ด้วยครับ เราขอให้ผู้มาเยือนแต่งกายสุภาพ' },
      { speaker: 'ဧည့်သည်', speakerTh: 'ผู้เยี่ยมชม', en: 'I see. I have a scarf in my bag. Is this okay?', my: 'ဟုတ်ကဲ့။ အိတ်ထဲမှာ ပဝါရှိတယ်။ ဒါဆို ရလား။', th: 'เข้าใจแล้วค่ะ ดิฉันมีผ้าคลุมในกระเป๋า แบบนี้ได้ไหมคะ' },
      { speaker: 'ဘုန်းကြီး', speakerTh: 'พระภิกษุ', en: "That's perfect. One more thing: please don't point your feet at the Buddha.", my: 'အဲဒါဆို အဆင်ပြေတယ်။ နောက်တစ်ခုက ဘုရားကို ခြေထောက်နဲ့ မညွှန်ပါနဲ့။', th: 'ดีมากครับ อีกอย่างหนึ่ง กรุณาอย่าชี้เท้าไปทางพระพุทธรูปนะครับ' },
      { speaker: 'ဧည့်သည်', speakerTh: 'ผู้เยี่ยมชม', en: "I didn't know that. Should I sit with my legs to the side?", my: 'အဲဒါ မသိခဲ့ဘူး။ ခြေထောက်ကို ဘေးကို ကွေးပြီး ထိုင်ရမလား။', th: 'ดิฉันไม่ทราบเลยค่ะ ควรนั่งพับขาไปด้านข้างใช่ไหมคะ' },
      { speaker: 'ဘုန်းကြီး', speakerTh: 'พระภิกษุ', en: 'Exactly, just like the local people do. Would you like to make an offering?', my: 'ဟုတ်တယ်၊ ဒေသခံတွေလိုပဲ ထိုင်ပါ။ ဆွမ်းကပ်ချင်လား။', th: 'ถูกต้องครับ นั่งเหมือนคนท้องถิ่นครับ สนใจถวายของไหมครับ' },
      { speaker: 'ဧည့်သည်', speakerTh: 'ผู้เยี่ยมชม', en: 'Yes, please. May I take photos inside the hall?', my: 'ဟုတ်ကဲ့၊ ကပ်ချင်ပါတယ်။ ခန်းမထဲမှာ ဓာတ်ပုံရိုက်လို့ရလား။', th: 'ค่ะ สนใจค่ะ ขอถ่ายรูปในวิหารได้ไหมคะ' },
      { speaker: 'ဘုန်းကြီး', speakerTh: 'พระภิกษุ', en: "Photos are fine, but please don't use the flash. Enjoy your visit.", my: 'ဓာတ်ပုံရိုက်လို့ ရပါတယ်၊ ဒါပေမယ့် ဖလက်ရှ်မီးတော့ မသုံးပါနဲ့။ ဘုရားဖူးတာ အဆင်ပြေပါစေ။', th: 'ถ่ายรูปได้ครับ แต่กรุณาอย่าใช้แฟลชครับ ขอให้เที่ยวชมอย่างมีความสุขนะครับ' },
    ],
  },
];
