/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, 
  Clock, 
  Sunrise, 
  Sun, 
  CloudSun, 
  Sunset, 
  Moon, 
  Volume2 
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { getPrayerTimes, getNextPrayer, getPreviousPrayer, formatTime } from '../services/prayerService';

export const PrayerSection = () => {
  const [times, setTimes] = useState<Record<string, Date>>({});
  const [next, setNext] = useState<{ name: string; time: Date } | null>(null);
  const [prev, setPrev] = useState<{ name: string; time: Date } | null>(null);
  const [countdown, setCountdown] = useState("");
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const now = new Date();
    const pTimes = getPrayerTimes(36.1444, 3.4357, now);
    setTimes(pTimes);
    
    const updateTimes = () => {
      const nowTime = new Date();
      const n = getNextPrayer(pTimes, nowTime);
      const p = getPreviousPrayer(pTimes, nowTime);
      setNext(n);
      setPrev(p);
    };

    updateTimes();

    const handleRefresh = () => {
      const refreshedTimes = getPrayerTimes(36.1444, 3.4357, new Date());
      setTimes(refreshedTimes);
      const n = getNextPrayer(refreshedTimes, new Date());
      const p = getPreviousPrayer(refreshedTimes, new Date());
      setNext(n);
      setPrev(p);
    };
    window.addEventListener('prayer-times-refreshed', handleRefresh);

    const timer = setInterval(() => {
      const nowTime = new Date();
      setCurrentTime(nowTime);
      if (next && prev) {
        const total = next.time.getTime() - prev.time.getTime();
        const elapsed = nowTime.getTime() - prev.time.getTime();
        const currentProgress = Math.max(0, Math.min(100, (elapsed / total) * 100));
        setProgress(currentProgress);

        const diff = next.time.getTime() - nowTime.getTime();
        if (diff <= 0) {
          updateTimes();
          return;
        }
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        setCountdown(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      window.removeEventListener('prayer-times-refreshed', handleRefresh);
    };
  }, [next?.name, prev?.name]);

  const prayerNames: Record<string, string> = {
    fajr: "الفجر",
    dhuhr: "الظهر",
    asr: "العصر",
    maghrib: "المغرب",
    isha: "العشاء"
  };

  const prayerIcons: Record<string, React.ReactNode> = {
    fajr: <Sunrise size={20} />,
    dhuhr: <Sun size={20} />,
    asr: <CloudSun size={20} />,
    maghrib: <Sunset size={20} />,
    isha: <Moon size={20} />
  };

  return (
    <div className="space-y-6">
      <div className="royal-gradient rounded-3xl p-8 text-center border border-gold/20 shadow-xl relative overflow-hidden flex flex-col items-center">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full -mr-16 -mt-16 blur-3xl" />
        <div className="absolute top-4 left-4">
          <button 
            onClick={() => navigate('/prayer-settings')}
            className="p-2 glass rounded-xl text-gold hover:bg-gold/20 transition-colors"
          >
            <Settings size={20} />
          </button>
        </div>

        <div className="mb-8 mt-2">
          <p className="text-white/40 font-bold mb-1 tracking-widest uppercase text-[10px]">الوقت الآن</p>
          <h1 className="text-5xl font-bold font-mono text-white drop-shadow-lg tracking-tighter">
            {formatTime(currentTime)}
          </h1>
        </div>
        
        <div className="relative w-48 h-48 mb-6 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90 transform">
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-white/10"
            />
            <motion.circle
              cx="96"
              cy="96"
              r="88"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={552.92}
              animate={{ strokeDashoffset: 552.92 - (552.92 * progress) / 100 }}
              className="text-gold"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-gold font-bold mb-1 tracking-widest uppercase text-[10px]">الوقت المتبقي</p>
            <h2 className="text-4xl font-bold font-mono tracking-tighter text-gold drop-shadow-lg">{countdown}</h2>
            <div className="flex items-center justify-center gap-2 text-gold/80 mt-1">
              {next && prayerIcons[next.name]}
              <span className="text-xs font-bold">{next ? prayerNames[next.name] : '...'}</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <button 
            onClick={() => {
              const adhanUrl = 'https://www.islamcan.com/audio/adhan/azan1.mp3';
              const event = new CustomEvent('toggle-audio', { detail: { url: adhanUrl, title: 'الأذان' } });
              window.dispatchEvent(event);
            }}
            className="flex items-center gap-3 bg-gold text-royal-blue px-8 py-4 rounded-2xl font-bold shadow-[0_0_20px_rgba(212,168,67,0.4)] active:scale-95 transition-all group"
          >
            <div className="w-8 h-8 bg-royal-blue/10 rounded-lg flex items-center justify-center group-hover:bg-royal-blue/20 transition-colors">
              <Volume2 size={20} fill="currentColor" />
            </div>
            <span>تشغيل/إيقاف الأذان</span>
          </button>
        </div>
        
        <div className="flex items-center justify-center gap-2 text-gold/80">
          <Clock className="w-4 h-4" />
          <span className="text-sm">أذان {next ? prayerNames[next.name] : '...'} في {next ? formatTime(next.time) : '...'}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {Object.entries(times).map(([id, time]) => (
          <div key={id} className={cn(
            "glass p-4 rounded-2xl flex flex-col items-center justify-center gap-2 border transition-all duration-300",
            next?.name === id ? "border-gold bg-gold/10 scale-105" : "border-white/10"
          )}>
            <div className="flex items-center gap-2 text-gold/60">
              {prayerIcons[id]}
              <span className="text-xs font-bold">{prayerNames[id]}</span>
            </div>
            <span className="text-xl font-bold">{formatTime(time as Date)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
