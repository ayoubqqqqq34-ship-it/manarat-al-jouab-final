/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Surah, Verse } from '../types';

const BASE_URL = 'https://api.alquran.cloud/v1';

export const fetchSurahs = async (): Promise<Surah[]> => {
  const response = await fetch(`${BASE_URL}/surah`);
  const data = await response.json();
  return data.data;
};

export const fetchSurahDetail = async (surahNumber: number): Promise<{ surah: Surah; verses: Verse[] }> => {
  const response = await fetch(`${BASE_URL}/surah/${surahNumber}/ar.alafasy`);
  const data = await response.json();
  return {
    surah: data.data,
    verses: data.data.ayahs,
  };
};

export const fetchHizb = async (hizbNumber: number): Promise<Verse[]> => {
  const response = await fetch(`${BASE_URL}/hizb/${hizbNumber}/ar.alafasy`);
  const data = await response.json();
  return data.data.ayahs;
};

export const getSurahAudioUrl = (surahNumber: number) => {
  // Using Alafasy as default
  return `https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${surahNumber}.mp3`;
};

export const getVerseAudioUrl = (verseNumber: number) => {
  return `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${verseNumber}.mp3`;
};
