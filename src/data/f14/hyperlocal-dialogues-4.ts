import type { Dialogue } from '../../types';

/**
 * Hyperlocal dialogues 4/4 — hotel check-in and emergency help.
 * Additive only: guest/staff and bystander scenarios with full `th` fields.
 */
export const hyperlocalDialogues4: Dialogue[] = [
  {
    id: 'hl-d-007',
    topic: 'travel',
    titleMy: 'ဟိုတယ်မှာ အခန်းယူခြင်း',
    titleTh: 'การเช็กอินโรงแรม',
    titleEn: 'Hotel Check-In',
    level: 1,
    situationMy: 'ဧည့်သည်က ဟိုတယ် reception မှာ အခန်းယူနေတယ်',
    situationTh: 'แขกกำลังเช็กอินที่แผนกต้อนรับของโรงแรม',
    turns: [
      { speaker: 'ဧည့်သည်', speakerTh: 'แขก', en: 'Good evening. I have a reservation under the name Nyein.', my: 'မင်္ဂလာညချမ်းပါ။ Nyein နာမည်နဲ့ အခန်း ကြိုယူထားတယ်။', th: 'สวัสดีตอนเย็นค่ะ ฉันจองห้องพักไว้ในชื่อ Nyein ค่ะ' },
      { speaker: 'ဟိုတယ်ဝန်ထမ်း', speakerTh: 'พนักงานโรงแรม', en: 'Welcome to our hotel! May I see your passport, please?', my: 'ကျွန်မတို့ ဟိုတယ်ကနေ ကြိုဆိုပါတယ်။ ပတ်စပို့စ် ခဏ ပြပေးနိုင်မလား။', th: 'ยินดีต้อนรับสู่โรงแรมของเราครับ ขอดูพาสปอร์ตหน่อยได้ไหมครับ' },
      { speaker: 'ဧည့်သည်', speakerTh: 'แขก', en: 'Of course. Here it is.', my: 'ရပါတယ်။ ဒီမှာပါ။', th: 'ได้เลยค่ะ นี่ค่ะ' },
      { speaker: 'ဟိုတယ်ဝန်ထမ်း', speakerTh: 'พนักงานโรงแรม', en: 'Thank you, Ms. Nyein. You are in room twelve oh eight, on the twelfth floor.', my: 'ကျေးဇူးတင်ပါတယ် ဒေါ်ညိန်။ သင်က အခန်း ၁၂၀၈၊ ၁၂ ထပ်မှာ ဖြစ်ပါတယ်။', th: 'ขอบคุณครับ คุณ Nyein ห้องของคุณคือห้อง 1208 ชั้นสิบสองครับ' },
      { speaker: 'ဧည့်သည်', speakerTh: 'แขก', en: 'Great. Is breakfast included in my reservation?', my: 'အရမ်းကောင်းတယ်။ ကြိုယူထားတဲ့အခန်းထဲမှာ မနက်စာ ပါပြီးသားလား။', th: 'ดีเลยค่ะ การจองของฉันรวมอาหารเช้าแล้วใช่ไหมคะ' },
      { speaker: 'ဟိုတယ်ဝန်ထမ်း', speakerTh: 'พนักงานโรงแรม', en: 'Yes, it is. Breakfast is served from six thirty to ten in the morning.', my: 'ဟုတ်ကဲ့ ပါတယ်။ မနက်စာက မနက် ၆ နာရီခွဲကနေ ၁၀ နာရီအထိ ကျွေးပါတယ်။', th: 'ใช่ครับ รวมแล้ว อาหารเช้าเสิร์ฟตั้งแต่หกโมงครึ่งถึงสิบโมงเช้าครับ' },
      { speaker: 'ဧည့်သည်', speakerTh: 'แขก', en: 'Perfect. What time is check-out?', my: 'စိတ်ကြိုက်ပါပဲ။ Check-out က ဘယ်အချိန်လဲ။', th: 'เยี่ยมเลยค่ะ แล้วเช็กเอาต์กี่โมงคะ' },
      { speaker: 'ဟိုတယ်ဝန်ထမ်း', speakerTh: 'พนักงานโรงแรม', en: 'Check-out is at twelve noon. If you need more time, please let us know.', my: 'Check-out က နေ့လည် ၁၂ နာရီပါ။ နောက်ထပ် အချိန် လိုရင် ပြောပေးပါ။', th: 'เช็กเอาต์เที่ยงวันครับ ถ้าต้องการเวลาเพิ่มแจ้งได้เลยนะครับ' },
      { speaker: 'ဧည့်သည်', speakerTh: 'แขก', en: 'Thank you. And what is the Wi-Fi password?', my: 'ကျေးဇူးတင်ပါတယ်။ Wi-Fi စကားဝှက်က ဘာလဲ။', th: 'ขอบคุณค่ะ แล้วรหัสผ่าน Wi-Fi คืออะไรคะ' },
      { speaker: 'ဟိုတယ်ဝန်ထမ်း', speakerTh: 'พนักงานโรงแรม', en: 'The network is Grand Hotel, and the password is welcome123. Enjoy your stay!', my: 'Wi-Fi နာမည်က Grand Hotel ပါ၊ စကားဝှက်က welcome123 ပါ။ သာယာတဲ့အချိန်ပိုင်းဖြစ်ပါစေ။', th: 'ชื่อเครือข่าย Wi-Fi คือ Grand Hotel รหัสผ่านคือ welcome123 ขอให้พักผ่อนอย่างมีความสุขนะครับ' },
    ],
  },
  {
    id: 'hl-d-008',
    topic: 'emergencies',
    titleMy: 'အရေးပေါ်အခြေအနေမှာ အကူအညီတောင်းခြင်း',
    titleTh: 'การขอความช่วยเหลือในเหตุฉุกเฉิน',
    titleEn: 'Asking for Help in an Emergency',
    level: 2,
    situationMy: 'လူတစ်ယောက်က အရေးပေါ်အခြေအနေမှာ လမ်းသွားသူကို အကူအညီတောင်းနေတယ်',
    situationTh: 'คนคนหนึ่งขอความช่วยเหลือจากคนเดินถนนเมื่อเกิดเหตุฉุกเฉิน',
    turns: [
      { speaker: 'လူ', speakerTh: 'คน', en: 'Help! Please, help me!', my: 'ကူညီပါ။ ကူညီပေးပါ။', th: 'ช่วยด้วยค่ะ ช่วยหน่อยได้ไหมคะ' },
      { speaker: 'လမ်းသွားသူ', speakerTh: 'คนเดินถนน', en: 'What happened? Are you okay?', my: 'ဘာဖြစ်တာလဲ။ အဆင်ပြေရဲ့လား။', th: 'เกิดอะไรขึ้นครับ คุณไม่เป็นอะไรใช่ไหมครับ' },
      { speaker: 'လူ', speakerTh: 'คน', en: 'My friend fell down. He is not moving. Please call an ambulance!', my: 'ကျွန်မရဲ့ သူငယ်ချင်း လဲကျသွားတယ်။ မလှုပ်တော့ဘူး။ လူနာတင်ယာဉ် ခေါ်ပေးပါ။', th: 'เพื่อนของฉันล้มลงค่ะ เขาไม่ขยับตัวเลย เรียกรถพยาบาลให้หน่อยค่ะ' },
      { speaker: 'လမ်းသွားသူ', speakerTh: 'คนเดินถนน', en: 'Okay, stay calm. I am calling now.', my: 'ဟုတ်ပြီ၊ စိတ်အေးအေးထားပါ။ အခု ခေါ်နေပြီ။', th: 'โอเคครับ ใจเย็นๆ ไว้นะครับ ผมกำลังโทรเลยครับ' },
      { speaker: 'လူ', speakerTh: 'คน', en: 'We are on River Road, in front of the big supermarket.', my: 'ကျွန်မတို့က River Road မှာ၊ စူပါမားကတ် အကြီးကြီးရှေ့မှာ ဖြစ်ပါတယ်။', th: 'เราอยู่บนถนน River Road หน้าซูเปอร์มาร์เก็ตใหญ่ค่ะ' },
      { speaker: 'လမ်းသွားသူ', speakerTh: 'คนเดินถนน', en: 'Hello? I need an ambulance, please. A man has fallen down on River Road, in front of the big supermarket.', my: 'ဟယ်လို။ လူနာတင်ယာဉ် တစ်စီး လိုအပ်ပါတယ်။ လူတစ်ယောက် River Road မှာ၊ စူပါမားကတ် အကြီးကြီးရှေ့မှာ လဲကျသွားပါတယ်။', th: 'ฮัลโหลครับ ขอรถพยาบาลด่วนครับ มีคนล้มอยู่บนถนน River Road หน้าซูเปอร์มาร์เก็ตใหญ่ครับ' },
      { speaker: 'လူ', speakerTh: 'คน', en: 'Thank you. Is help on the way?', my: 'ကျေးဇူးတင်ပါတယ်။ အကူအညီ လာနေပြီလား။', th: 'ขอบคุณค่ะ ความช่วยเหลือกำลังมาใช่ไหมคะ' },
      { speaker: 'လမ်းသွားသူ', speakerTh: 'คนเดินถนน', en: 'Yes. They are on the way. Please do not move him.', my: 'ဟုတ်တယ်။ လာနေပြီ။ သူ့ကို မရွှေ့ပါနဲ့။', th: 'ใช่ครับ กำลังมาครับ อย่าขยับตัวเขานะครับ' },
      { speaker: 'လူ', speakerTh: 'คน', en: 'Okay. I will stay with him.', my: 'ဟုတ်ကဲ့။ သူ့ဘေးမှာ ရှိနေပါ့မယ်။', th: 'ค่ะ ฉันจะอยู่ข้างเขาเองค่ะ' },
      { speaker: 'လမ်းသွားသူ', speakerTh: 'คนเดินถนน', en: 'Good. Help is coming soon. Everything will be okay.', my: 'ကောင်းတယ်။ အကူအညီ မကြာခင် ရောက်လာမှာပါ။ အားလုံး အဆင်ပြေမှာပါ။', th: 'ดีแล้วครับ ความช่วยเหลือใกล้ถึงแล้ว ทุกอย่างจะเรียบร้อยครับ' },
    ],
  },
];
