import type { Topic, TopicId } from '../types';

export const topics: Topic[] = [
  { id: 'family', nameMy: 'မိသားစု', nameEn: 'Family', icon: '👨‍👩‍👧', color: '#ff6b6b' },
  { id: 'friends', nameMy: 'သူငယ်ချင်း', nameEn: 'Friends', icon: '👫', color: '#4dabf7' },
  { id: 'work', nameMy: 'အလုပ်', nameEn: 'Work', icon: '💼', color: '#ffa94d' },
  { id: 'shopping', nameMy: 'ဈေးဝယ်', nameEn: 'Shopping', icon: '🛒', color: '#da77f2' },
  { id: 'travel', nameMy: 'ခရီးသွား', nameEn: 'Travel', icon: '✈️', color: '#3bc9db' },
  { id: 'health', nameMy: 'ကျန်းမာရေး', nameEn: 'Health', icon: '🏥', color: '#69db7c' },
  { id: 'school', nameMy: 'ကျောင်း', nameEn: 'School', icon: '🎒', color: '#ffd43b' },
  { id: 'food', nameMy: 'အစားအစာ', nameEn: 'Food', icon: '🍚', color: '#ff8787' },
  { id: 'nature', nameMy: 'သဘာဝ', nameEn: 'Nature', icon: '🌳', color: '#8ce99a' },
  { id: 'sports', nameMy: 'အားကစား', nameEn: 'Sports', icon: '⚽', color: '#74c0fc' },
  { id: 'technology', nameMy: 'နည်းပညာ', nameEn: 'Technology', icon: '📱', color: '#b197fc' },
  { id: 'business', nameMy: 'စီးပွားရေး', nameEn: 'Business', icon: '💰', color: '#e599f7' },
  { id: 'emotions', nameMy: 'ခံစားချက်', nameEn: 'Emotions', icon: '😊', color: '#ffa8a8' },
  { id: 'daily-life', nameMy: 'နေ့စဉ်ဘဝ', nameEn: 'Daily Life', icon: '🏠', color: '#99e9f2' },
  { id: 'emergencies', nameMy: 'အရေးပေါ်', nameEn: 'Emergencies', icon: '🚨', color: '#ff8787' },
  { id: 'home', nameMy: 'အိမ်', nameEn: 'Home', icon: '🛋️', color: '#ffc078' },
  { id: 'clothing', nameMy: 'အဝတ်အစား', nameEn: 'Clothing', icon: '👕', color: '#a9e34b' },
  { id: 'animals', nameMy: 'တိရစ္ဆာန်', nameEn: 'Animals', icon: '🐘', color: '#ffd6a5' },
  { id: 'time', nameMy: 'အချိန်', nameEn: 'Time', icon: '⏰', color: '#d0bfff' },
  { id: 'weather', nameMy: 'ရာသီဥတု', nameEn: 'Weather', icon: '🌤️', color: '#a5d8ff' },
];

/** Backwards-compatible alias. */
export const TOPICS = topics;

export function topicById(id: string): Topic {
  return topics.find((t) => t.id === id) ?? topics[0];
}

export function topicMeta(id: TopicId): Topic {
  return topicById(id);
}
