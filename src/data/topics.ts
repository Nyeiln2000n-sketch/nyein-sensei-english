import type { Topic, TopicId } from '../types';

export const topics: Topic[] = [
  { id: 'family', nameMy: 'မိသားစု', nameTh: 'ครอบครัว', nameEn: 'Family', icon: '👨‍👩‍👧', color: '#ff6b6b' },
  { id: 'friends', nameMy: 'သူငယ်ချင်း', nameTh: 'เพื่อนฝูง', nameEn: 'Friends', icon: '👫', color: '#4dabf7' },
  { id: 'work', nameMy: 'အလုပ်', nameTh: 'การงาน', nameEn: 'Work', icon: '💼', color: '#ffa94d' },
  { id: 'shopping', nameMy: 'ဈေးဝယ်', nameTh: 'การช้อปปิ้ง', nameEn: 'Shopping', icon: '🛒', color: '#da77f2' },
  { id: 'travel', nameMy: 'ခရီးသွား', nameTh: 'การเดินทาง', nameEn: 'Travel', icon: '✈️', color: '#3bc9db' },
  { id: 'health', nameMy: 'ကျန်းမာရေး', nameTh: 'สุขภาพ', nameEn: 'Health', icon: '🏥', color: '#69db7c' },
  { id: 'school', nameMy: 'ကျောင်း', nameTh: 'โรงเรียน', nameEn: 'School', icon: '🎒', color: '#ffd43b' },
  { id: 'food', nameMy: 'အစားအစာ', nameTh: 'อาหาร', nameEn: 'Food', icon: '🍚', color: '#ff8787' },
  { id: 'nature', nameMy: 'သဘာဝ', nameTh: 'ธรรมชาติ', nameEn: 'Nature', icon: '🌳', color: '#8ce99a' },
  { id: 'sports', nameMy: 'အားကစား', nameTh: 'กีฬา', nameEn: 'Sports', icon: '⚽', color: '#74c0fc' },
  { id: 'technology', nameMy: 'နည်းပညာ', nameTh: 'เทคโนโลยี', nameEn: 'Technology', icon: '📱', color: '#b197fc' },
  { id: 'business', nameMy: 'စီးပွားရေး', nameTh: 'ธุรกิจ', nameEn: 'Business', icon: '💰', color: '#e599f7' },
  { id: 'emotions', nameMy: 'ခံစားချက်', nameTh: 'อารมณ์ความรู้สึก', nameEn: 'Emotions', icon: '😊', color: '#ffa8a8' },
  { id: 'daily-life', nameMy: 'နေ့စဉ်ဘဝ', nameTh: 'ชีวิตประจำวัน', nameEn: 'Daily Life', icon: '🏠', color: '#99e9f2' },
  { id: 'emergencies', nameMy: 'အရေးပေါ်', nameTh: 'เหตุฉุกเฉิน', nameEn: 'Emergencies', icon: '🚨', color: '#ff8787' },
  { id: 'home', nameMy: 'အိမ်', nameTh: 'บ้าน', nameEn: 'Home', icon: '🛋️', color: '#ffc078' },
  { id: 'clothing', nameMy: 'အဝတ်အစား', nameTh: 'เสื้อผ้า', nameEn: 'Clothing', icon: '👕', color: '#a9e34b' },
  { id: 'animals', nameMy: 'တိရစ္ဆာန်', nameTh: 'สัตว์', nameEn: 'Animals', icon: '🐘', color: '#ffd6a5' },
  { id: 'time', nameMy: 'အချိန်', nameTh: 'เวลา', nameEn: 'Time', icon: '⏰', color: '#d0bfff' },
  { id: 'weather', nameMy: 'ရာသီဥတု', nameTh: 'สภาพอากาศ', nameEn: 'Weather', icon: '🌤️', color: '#a5d8ff' },
  { id: 'restaurant', nameMy: 'စားသောက်ဆိုင်', nameTh: 'ร้านอาหาร', nameEn: 'Restaurant', icon: '🍽️', color: '#e8590c' },
  { id: 'airport', nameMy: 'လေဆိပ်နှင့် ဟိုတယ်', nameTh: 'สนามบินและโรงแรม', nameEn: 'Airport & Hotel', icon: '🛫', color: '#1971c2' },
  { id: 'office', nameMy: 'ရုံးလုပ်ငန်း', nameTh: 'สำนักงานและการประชุม', nameEn: 'Office & Meetings', icon: '🏢', color: '#5f3dc4' },
  { id: 'doctor', nameMy: 'ဆရာဝန်နှင့် ဆေးဆိုင်', nameTh: 'หมอและร้านขายยา', nameEn: 'Doctor & Pharmacy', icon: '🩺', color: '#0c8599' },
  { id: 'computer', nameMy: 'ကွန်ပျူတာနှင့် အင်တာနက်', nameTh: 'คอมพิวเตอร์และอินเทอร์เน็ต', nameEn: 'Computers & Internet', icon: '💻', color: '#7048e8' },
  { id: 'market', nameMy: 'ဈေးနှင့်ဈေးဆစ်ခြင်း', nameTh: 'ตลาดและการต่อรอง', nameEn: 'Market & Bargaining', icon: '🏪', color: '#d6336c' },
  { id: 'seasons', nameMy: 'ရာသီများ', nameTh: 'ฤดูกาลและภูมิอากาศ', nameEn: 'Seasons & Climate', icon: '🍂', color: '#2f9e44' },
  { id: 'personality', nameMy: 'စရိုက်လက္ခဏာ', nameTh: 'บุคลิกภาพ', nameEn: 'Personality', icon: '🌟', color: '#f08c00' },
  { id: 'science', nameMy: 'သိပ္ပံ', nameTh: 'วิทยาศาสตร์', nameEn: 'Science', icon: '🔬', color: '#228be6' },
  { id: 'law', nameMy: 'ဥပဒေ', nameTh: 'กฎหมาย', nameEn: 'Law', icon: '⚖️', color: '#5f3dc4' },
  { id: 'medicine', nameMy: 'ဆေးပညာ', nameTh: 'แพทยศาสตร์', nameEn: 'Medicine', icon: '💊', color: '#0c8599' },
  { id: 'art', nameMy: 'အနုပညာ', nameTh: 'ศิลปะ', nameEn: 'Art', icon: '🎨', color: '#e64980' },
  { id: 'philosophy', nameMy: 'ဒဿနိကဗေဒ', nameTh: 'ปรัชญา', nameEn: 'Philosophy', icon: '💭', color: '#7048e8' },
  { id: 'environment', nameMy: 'သဘာဝပတ်ဝန်းကျင်', nameTh: 'สิ่งแวดล้อม', nameEn: 'Environment', icon: '🌍', color: '#2f9e44' },
  { id: 'academia', nameMy: 'ပညာရပ်ဆိုင်ရာ', nameTh: 'วิชาการ', nameEn: 'Academia', icon: '🎓', color: '#1c7ed6' },
  { id: 'literature', nameMy: 'စာပေ', nameTh: 'วรรณกรรม', nameEn: 'Literature', icon: '📚', color: '#9c36b5' },
  { id: 'diplomacy', nameMy: 'သံတမန်ရေး', nameTh: 'การทูต', nameEn: 'Diplomacy', icon: '🤝', color: '#0c8599' },
  { id: 'rhetoric', nameMy: 'စကားပြောအနုပညာ', nameTh: 'วาทศิลป์และการพูด', nameEn: 'Rhetoric & Speech', icon: '🎤', color: '#e67700' },
  { id: 'frontier-science', nameMy: 'ခေတ်သစ်သိပ္ပံ', nameTh: 'วิทยาศาสตร์แนวหน้า', nameEn: 'Frontier Science', icon: '🚀', color: '#3b5bdb' },
];

/** Backwards-compatible alias. */
export const TOPICS = topics;

export function topicById(id: string): Topic {
  return topics.find((t) => t.id === id) ?? topics[0];
}

export function topicMeta(id: TopicId): Topic {
  return topicById(id);
}
