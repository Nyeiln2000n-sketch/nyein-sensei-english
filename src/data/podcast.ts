// Podcast "English with Aung and May" — metadata de episodios.
// Los MP3 viven en Supabase Storage (bucket público `podcast-episodes`).
// Subida inicial: scripts/upload-podcast-episodes.sh
// Episodios nuevos: el cron english-episode-every-6h los sube vía /api/upload-podcast
// y se añaden aquí (o se sirven desde el manifest del generador).

const STORAGE_BASE =
  'https://zkedykbauxblzikwyfjc.supabase.co/storage/v1/object/public/podcast-episodes';

export interface PodcastEpisode {
  /** Número de episodio (1-150). */
  n: number;
  /** Slug usado como nombre de archivo en Storage. */
  slug: string;
  /** Título en birmano (primero, regla de Nyein). */
  titleMy: string;
  /** Título original (tailandés/inglés). */
  titleOrig: string;
  /** Descripción en birmano. */
  descMy: string;
  /** Frases clave en inglés que enseña el episodio. */
  phrases: string[];
  /** Duración en segundos. */
  durationSecs: number;
  /** Portada cuadrada del episodio (ruta en /public). */
  cover: string;
}

/** Portada por defecto según número de episodio. */
export function episodeCover(n: number): string {
  return `/podcast-covers/ep-${n}.webp`;
}

export function episodeUrl(ep: PodcastEpisode): string {
  return `${STORAGE_BASE}/${encodeURIComponent(ep.slug)}.mp3`;
}

/** Episodios ordenados del más nuevo al más viejo (como Spotify). */
export const PODCAST_EPISODES: PodcastEpisode[] = [
  {
    n: 18,
    slug: 'english-with-aung-and-may-ep-18-ordinal-numbers-and-dates-2026-10-02',
    titleMy: 'ရက်စွဲများ — နေ့ရက်ပြောနည်း',
    titleOrig: 'วันที่ — Ordinal Numbers and Dates',
    descMy: 'အင်္ဂလိပ်လို first, second, third နဲ့ ရက်စွဲမေးဖြေနည်း။ "What is the date today?" / "It is the fifth of June." / "My birthday is on the twenty-first of December."',
    phrases: ['What is the date today?', 'It is the fifth of June.', 'My birthday is on the twenty-first of December.', 'First, second, third.', 'It is the third of September.'],
    durationSecs: 674,
    cover: '/podcast-covers/ep-18.jpg',
  },
  {
    n: 17,
    slug: 'english-with-aung-and-may-ep-17-months-of-the-year-2026-10-01',
    titleMy: 'လများ — တစ်နှစ်ရဲ့ ၁၂ လ',
    titleOrig: 'เดือนทั้ง 12 — Months of the Year',
    descMy: 'အင်္ဂလိပ်လို ၁၂ လအပြင် မွေးနေ့မေးဖြေနည်း။ "My birthday is in July." / "When is your birthday?" / "Christmas is in December." / "See you in June."',
    phrases: ['January, February, March, April, May, June, July, August, September, October, November, December.', 'My birthday is in July.', 'When is your birthday?', 'It is in May.', 'Christmas is in December.', 'See you in June.'],
    durationSecs: 644,
    cover: '/podcast-covers/ep-17.webp',
  },
  {
    n: 16,
    slug: 'english-with-aung-and-may-ep-16-days-of-the-week-2026-10-01',
    titleMy: 'ရက်ပြောနည်း — တစ်ပတ်ရဲ့ ၇ ရက်',
    titleOrig: 'วันในสัปดาห์ — Days of the Week',
    descMy: 'အင်္ဂလိပ်လို ရက်သတ္တပတ် ရက်များနဲ့ မေးဖြေနည်း။ "What day is it today?" / "It is Thursday." / "See you on Friday." / "I want to go to the market on Saturday."',
    phrases: ['Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday.', 'What day is it today?', 'It is Thursday.', 'See you on Friday.', 'I want to go to the market on Saturday.'],
    durationSecs: 598,
    cover: '/podcast-covers/ep-16.webp',
  },
  {
    n: 15,
    slug: 'english-with-aung-and-may-ep-15-telling-time-minutes-2026-10-01',
    titleMy: 'အချိန်ပြောနည်း — မိနစ်ပိုင်း',
    titleOrig: 'บอกเวลานาที — Telling Time: Minutes',
    descMy: 'အင်္ဂလိပ်လို မိနစ်ပိုင်းနဲ့ အချိန်ပြောနည်း။ \"It is half past four.\" / \"It is a quarter past two.\" / \"It is a quarter to six.\" / \"It is ten past nine.\"',
    phrases: ['It is half past four.', 'It is a quarter past two.', 'It is a quarter to six.', 'It is ten past nine.'],
    durationSecs: 523,
    cover: '/podcast-covers/ep-15.webp',
  },
  {
    n: 14,
    slug: 'english-with-aung-and-may-ep-14-telling-time-hours-2026-10-01',
    titleMy: 'အချိန်ပြောနည်း — နာရီပိုင်း',
    titleOrig: 'บอกเวลาชั่วโมง — Telling Time: Hours',
    descMy: 'အင်္ဂလိပ်လို အချိန်မေးပြီး နာရီအတိအကျ ဖြေနည်း။ "What time is it?" / "It is three o\'clock." / "It is noon." / "It is midnight."',
    phrases: ['What time is it?', "It is three o'clock.", 'It is noon.', 'It is midnight.'],
    durationSecs: 466,
    cover: '/podcast-covers/ep-14.webp',
  },
  {
    n: 13,
    slug: 'ep-13-phone-numbers-2026-09-30',
    titleMy: 'ဖုန်းနံပါတ်များ',
    titleOrig: 'เบอร์โทรศัพท์ — Phone Numbers',
    descMy: 'အင်္ဂလိပ်လို ဖုန်းနံပါတ်ပြောနည်း။ "What is your phone number?" လို့ မေးပြီး "My number is..." လို့ ဖြေမယ်။',
    phrases: ['What is your phone number?', 'My number is...', 'Double five'],
    durationSecs: 479,
    cover: '/podcast-covers/ep-13.webp',
  },
  {
    n: 12,
    slug: 'ep-12-11-100-2026-09-30',
    titleMy: 'ဂဏန်း ၁၁ မှ ၁၀၀',
    titleOrig: 'เลข 11-100 — Numbers Eleven to One Hundred',
    descMy: '၁၁ ကနေ ၁၀၀ အထိ အင်္ဂလိပ်လို ရေတွက်နည်း။ ဈေးဝယ်တဲ့အခါ ဈေးနှုန်းမေးဖို့ အရေးကြီးတယ်။',
    phrases: ['Eleven', 'Twelve', 'Twenty', 'One hundred'],
    durationSecs: 588,
    cover: '/podcast-covers/ep-12.webp',
  },
  {
    n: 11,
    slug: 'ep-11-numbers-one-to-ten-2026-09-30',
    titleMy: 'ဂဏန်း ၁ မှ ၁၀',
    titleOrig: 'Numbers One to Ten — How many?',
    descMy: '၁ ကနေ ၁၀ အထိ ရေတွက်ပြီး "How many?" လို့ မေးတတ်မယ်။',
    phrases: ['One, two, three...', 'How many?'],
    durationSecs: 586,
    cover: '/podcast-covers/ep-11.webp',
  },
  {
    n: 10,
    slug: 'english-with-aung-and-may-ep-10-review-all-verbs-mega-challenge-2026-09-30',
    titleMy: 'ကြိယာ ၉ ခု ပြန်လည်သုံးသပ်ခြင်း',
    titleOrig: 'ทบทวนรวมกริยาสู้ชีวิตจริง — Mega Verb Review',
    descMy: 'Module 1 ရဲ့ ကြိယာ ၉ ခုလုံးကို ဈေး၊ စားသောက်ဆိုင်၊ တက္ကစီ ဆိုတဲ့ အခြေအနေအမှန်တွေမှာ ပြန်လည်လေ့ကျင့်မယ်။',
    phrases: ['I want...', 'I like...', 'Can you...?', 'How much?'],
    durationSecs: 628,
    cover: '/podcast-covers/ep-10.webp',
  },
  {
    n: 9,
    slug: 'english-with-aung-and-may-ep-9-do-2026-09-29',
    titleMy: 'လုပ်သည် — Do',
    titleOrig: 'ทำ — Do (ชีวิตประจำวัน)',
    descMy: '"Do" ကြိယာနဲ့ အလုပ်အကိုင်၊ နေ့စဉ်ဘဝ၊ ဒီနေ့ဘာလုပ်မလဲဆိုတာ ပြောတတ်မယ်။',
    phrases: ['What do you do?', 'I work in an office.', 'What do you want to do today?'],
    durationSecs: 551,
    cover: '/podcast-covers/ep-9.webp',
  },
  {
    n: 8,
    slug: 'english-with-aung-and-may-ep-8-can-2026-09-29',
    titleMy: 'နိုင်သည် / ရသည် — Can',
    titleOrig: 'สามารถ — Can (ขอความช่วยเหลือ)',
    descMy: 'အကူအညီတောင်းတဲ့အခါ "Can you help me?" လို့ ပြောတတ်မယ်။',
    phrases: ['Can you help me?', 'I can speak a little English.', "I can't find my hotel."],
    durationSecs: 668,
    cover: '/podcast-covers/ep-8.webp',
  },
  {
    n: 7,
    slug: 'english-with-aung-and-may-ep-7-have-asking-for-things-hotel-shop-2026-09-29',
    titleMy: 'ရှိသည် — Have',
    titleOrig: 'มี — Have (ขอของและถามหา)',
    descMy: 'ဟိုတယ်၊ ဆိုင်တွေမှာ လိုတဲ့ပစ္စည်း "Do you have...?" လို့ မေးတတ်မယ်။',
    phrases: ['Do you have a map?', 'I have a question.', "I don't have cash."],
    durationSecs: 566,
    cover: '/podcast-covers/ep-7.webp',
  },
  {
    n: 6,
    slug: 'english-with-aung-and-may-ep-6-buy-how-much-shopping-market-2026-09-29',
    titleMy: 'ဈေးဝယ်ခြင်း — Buy',
    titleOrig: 'ซื้อของในตลาด — Buy and Bargain',
    descMy: 'ညဈေးမှာ ဈေးမေး၊ ဈေးဆစ်၊ ဝယ်မယ်။ "How much is this?"',
    phrases: ['How much is this?', 'It is too expensive.', 'I will take it.'],
    durationSecs: 692,
    cover: '/podcast-covers/ep-6.webp',
  },
  {
    n: 5,
    slug: 'eat-drink-2026-09-28',
    titleMy: 'စားသောက်ခြင်း — Eat / Drink',
    titleOrig: 'กิน ดื่ม — Eat / Drink',
    descMy: 'စားသောက်ဆိုင်မှာ အစားအသောက်မှာမယ်၊ ဘေလ်တောင်းမယ်။',
    phrases: ['I want to eat noodles.', 'The bill, please.', 'It is delicious!'],
    durationSecs: 647,
    cover: '/podcast-covers/ep-5.webp',
  },
  {
    n: 4,
    slug: 'go-come-2026-09-28',
    titleMy: 'သွားခြင်း လာခြင်း — Go / Come',
    titleOrig: 'ไป มา — Go / Come',
    descMy: 'လမ်းမေး၊ တက္ကစီစီးတဲ့အခါ "I want to go to..." လို့ ပြောတတ်မယ်။',
    phrases: ['Where do you want to go?', 'I want to go to the market.', "Let's go!"],
    durationSecs: 503,
    cover: '/podcast-covers/ep-4.webp',
  },
  {
    n: 3,
    slug: 'i-like-i-dont-like-2026-09-28',
    titleMy: 'ကြိုက်ခြင်း မကြိုက်ခြင်း — Like',
    titleOrig: 'ชอบ ไม่ชอบ — I like / I don\'t like',
    descMy: 'ကြိုက်တာ မကြိုက်တာ အင်္ဂလိပ်လို ပြောတတ်မယ်။',
    phrases: ['I like rice.', "I don't like spicy food.", 'Do you like coffee?'],
    durationSecs: 448,
    cover: '/podcast-covers/ep-3.webp',
  },
  {
    n: 2,
    slug: 'i-want-i-need-2026-09-28',
    titleMy: 'လိုချင်ခြင်း လိုအပ်ခြင်း — Want / Need',
    titleOrig: 'อยากได้ ต้องการ — I want / I need',
    descMy: 'အင်္ဂလိပ်မှာ အသုံးအဝင်ဆုံး ကြိယာ ၂ ခု။',
    phrases: ['I want coffee.', 'I need help.', 'Do you want tea?'],
    durationSecs: 591,
    cover: '/podcast-covers/ep-2.webp',
  },
  {
    n: 1,
    slug: 'english-with-aung-and-may-ep-1-thai-greetings-2026-09-27',
    titleMy: 'နှုတ်ဆက်ခြင်း — Greetings',
    titleOrig: 'การทักทาย — Greetings',
    descMy: 'ပထမဆုံး အပိုင်း။ နှုတ်ဆက်ပြီး ကိုယ့်ကိုယ်ကို မိတ်ဆက်မယ်။',
    phrases: ['Hello.', 'Good morning.', 'My name is Nyein.'],
    durationSecs: 212,
    cover: '/podcast-covers/ep-1.webp',
  },
];
