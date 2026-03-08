/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Verse {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
  audio?: string;
  audioSecondary?: string[];
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface ProphetStory {
  id: number;
  name: string;
  location: string;
  time: string;
  summary: string;
  fullStory: string;
  audioUrl?: string;
}

export interface PrayerTime {
  id: string;
  name: string;
  time: string;
  date: Date;
}

export interface UserStats {
  totalTasbih: number;
  khatmaProgress: number; // 0 to 100
  pagesRead: number;
  favoritesCount: number;
  lastQuizDate: string | null; // ISO string
  streak: number;
  lastActiveDate: string | null; // ISO string
}

export interface Dhikr {
  id: number;
  text: string;
  count: number;
  target: number;
}

export interface Story {
  id: number;
  title: string;
  narrator: string;
  duration: string;
  audioUrl: string;
  thumbnail: string;
}
