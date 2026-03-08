import { Surah, Verse } from '../types';

const BASE_URL = 'https://api.alquran.cloud/v1';

// إضافة Cache بسيط لتسريع التطبيق
const surahCache = new Map<number, { surah: Surah; verses: Verse[] }>();

export const fetchSurahs = async (): Promise<Surah[]> => {
  try {
    const response = await fetch(`${BASE_URL}/surah`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching Surahs:", error);
    return [];
  }
};

export const fetchSurahDetail = async (surahNumber: number): Promise<{ surah: Surah; verses: Verse[] }> => {
  // إذا كانت السورة محملة من قبل، نرجعوها مباشرة
  if (surahCache.has(surahNumber)) {
    return surahCache.get(surahNumber)!;
  }

  const response = await fetch(`${BASE_URL}/surah/${surahNumber}/ar.alafasy`);
  const data = await response.json();
  
  const result = {
    surah: data.data,
    verses: data.data.ayahs,
  };
  
  // حفظ في الـ Cache
  surahCache.set(surahNumber, result);
  return result;
};

// رابط صوتي مباشر بجودة عالية (128kbps)
export const getAudioUrl = (surahNumber: number) => {
  return `https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${surahNumber}.mp3`;
};
