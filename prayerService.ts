/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Coordinates, Qibla } from 'adhan';
import { io } from 'socket.io-client';

// Base date: March 7th, 2026
const BASE_DATE = new Date('2026-03-07T00:00:00');

// Base times for March 7th, 2026 (Djouab Precise)
let BASE_TIMES = {
  fajr: { h: 5, m: 42 },
  dhuhr: { h: 12, m: 57 },
  asr: { h: 16, m: 16 },
  maghrib: { h: 18, m: 47 },
  isha: { h: 20, m: 8 },
};

// Daily offsets in minutes
const DAILY_OFFSETS = {
  fajr: -1,
  dhuhr: 0,
  asr: 1,
  maghrib: 1,
  isha: 1,
};

// Real-time sync
const socket = io();

const parseTimeStr = (timeStr: string) => {
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  if (modifier === 'PM' && hours < 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;
  return { h: hours, m: minutes };
};

export const initPrayerTimes = async () => {
  try {
    const response = await fetch('/api/prayer-times');
    const times = await response.json();
    Object.entries(times).forEach(([name, timeStr]) => {
      (BASE_TIMES as any)[name] = parseTimeStr(timeStr as string);
    });
  } catch (err) {
    console.error('Failed to fetch prayer times', err);
  }
};

socket.on('prayer-times-updated', (times) => {
  Object.entries(times).forEach(([name, timeStr]) => {
    (BASE_TIMES as any)[name] = parseTimeStr(timeStr as string);
  });
  // Trigger a refresh event
  window.dispatchEvent(new CustomEvent('prayer-times-refreshed'));
});

export const getPrayerTimes = (latitude: number, longitude: number, date: Date) => {
  const diffTime = date.getTime() - BASE_DATE.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // Get user calibration from localStorage
  const savedCalibration = localStorage.getItem('prayer_calibration');
  const calibration = savedCalibration ? JSON.parse(savedCalibration) : {
    fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0
  };

  const calculateTime = (base: { h: number, m: number }, offset: number, userCal: number) => {
    const d = new Date(date);
    d.setHours(base.h, base.m + (offset * diffDays) + userCal, 0, 0);
    return d;
  };

  return {
    fajr: calculateTime(BASE_TIMES.fajr, DAILY_OFFSETS.fajr, calibration.fajr),
    dhuhr: calculateTime(BASE_TIMES.dhuhr, DAILY_OFFSETS.dhuhr, calibration.dhuhr),
    asr: calculateTime(BASE_TIMES.asr, DAILY_OFFSETS.asr, calibration.asr),
    maghrib: calculateTime(BASE_TIMES.maghrib, DAILY_OFFSETS.maghrib, calibration.maghrib),
    isha: calculateTime(BASE_TIMES.isha, DAILY_OFFSETS.isha, calibration.isha),
  };
};

export const getNextPrayer = (times: Record<string, Date>, now: Date) => {
  const entries = Object.entries(times).sort((a, b) => a[1].getTime() - b[1].getTime());
  
  for (const [name, time] of entries) {
    if (time > now) {
      return { name, time };
    }
  }
  
  // If all prayers today have passed, the next one is Fajr tomorrow
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowTimes = getPrayerTimes(0, 0, tomorrow); // Coords don't matter for our manual logic
  
  return { name: 'fajr', time: tomorrowTimes.fajr };
};

export const getPreviousPrayer = (times: Record<string, Date>, now: Date) => {
  const entries = Object.entries(times).sort((a, b) => b[1].getTime() - a[1].getTime());
  
  for (const [name, time] of entries) {
    if (time <= now) {
      return { name, time };
    }
  }
  
  // If no prayer today has passed yet, the previous one was Isha yesterday
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayTimes = getPrayerTimes(0, 0, yesterday);
  
  return { name: 'isha', time: yesterdayTimes.isha };
};

export const calculateQibla = (latitude: number, longitude: number) => {
  const coordinates = new Coordinates(latitude, longitude);
  return Qibla(coordinates);
};

export const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};
