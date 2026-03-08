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
import { motion } from 'framer-motion'; // تأكد من استخدام framer-motion أو تغييرها لـ motion/react
import { cn } from './utils'; // تصحيح المسار المباشر
import { getPrayerTimes, getNextPrayer, getPreviousPrayer, formatTime } from './services/prayerService';

const PrayerSection = () => {
  const [times, setTimes] = useState<Record<string, Date>>({});
  const [next, setNext] = useState<{ name: string; time: Date } | null>(null);
  const [prev, setPrev] = useState<{ name: string; time: Date } | null>(null);
  const [countdown, setCountdown] = useState("00:00:00");
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  // إحداثيات بلدية جواب الدقيقة لضمان دقة الأذان
  const JOUAB_LAT = 36.1444;
  const JOUAB_LNG = 3.4357;

  useEffect(() => {
    const updateAll = () => {
      const now = new Date();
      setCurrentTime(now);
      const pTimes = getPrayerTimes(JOUAB_LAT, JOUAB_LNG, now);
      setTimes(pTimes);
      
      const n = getNextPrayer(pTimes, now);
      const p = getPreviousPrayer(pTimes, now);
      setNext(n);
      setPrev(p);
    };

    updateAll();

    const handleRefresh = () => updateAll();
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
          updateAll();
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
      <div className="glass rounded-[40px] p-8 text-center border border-gold/20 shadow-2xl relative overflow-hidden flex flex-col items-center bg-gradient-to-b from-royal-blue/40 to-royal-blue/60">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none" />
        
        <div className="absolute top-6 left-6">
          <button 
            onClick={() => navigate('/prayer-settings')}
            className="p-3 glass rounded-2xl text-gold hover:bg-gold/20 transition-all active:scale-90"
          >
            <Settings size={20} />
          </button>
        </div>

        <div className="mb-6 mt-4">
          <p className="text-white/30 font-bold mb-1 tracking-widest uppercase text-[10px]">توقيت بلدية جواب الآن</p>
          <h1 className="text-5xl font-bold font-mono text-white drop-shadow-lg tracking-tighter">
            {formatTime(currentTime)}
          </h1>
        </div>
        
        <div className="relative w-52 h-52 mb-8 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90 transform">
            <circle
              cx="104" cy="104" r="94"
              stroke="currentColor" strokeWidth="6" fill="transparent"
              className="text-white/5"
            />
            <motion.circle
              cx="104" cy="104" r="94"
              stroke="currentColor" strokeWidth="8" fill="transparent"
              strokeDasharray={590.6}
              animate={{ strokeDashoffset: 590.6 - (590.6 * progress) / 100 }}
              className="text-gold"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-gold/60 font-bold mb-1 tracking-widest uppercase text-[10px]">باقي للأذان</p>
            <h2 className="text-4xl font-bold font-mono tracking-tighter text-white drop-shadow-md">{countdown}</h2>
            <div className="flex items-center justify-center gap-2 text-gold mt-2 bg-gold/10 px-3 py-1 rounded-full">
              {next && prayerIcons[next.name]}
              <span className="text-xs font-bold">{next ? prayerNames[next.name] : '...'}</span>
            </div>
          </div>
        </div>

        <button 
          onClick={() => {
            const adhanUrl = 'https://www.islamcan.com/audio/adhan/azan1.mp3';
            const event = new CustomEvent('toggle-audio', { detail: { url: adhanUrl, title: 'الأذان الشرعي' } });
            window.dispatchEvent(event);
          }}
          className="w-full max-w-xs flex items-center justify-center gap-3 bg-gold text-royal-blue py-5 rounded-[24px] font-bold shadow-[0_15px_30px_rgba(212,168,67,0.25)] active:scale-95 transition-all group mb-6"
        >
          <Volume2 size={24} className="group-hover:animate-bounce" />
          <span className="text-lg">استماع للأذان الآن</span>
        </button>
        
        <div className="flex items-center justify-center gap-2 text-gold/50">
          <Clock className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">
             {next ? prayerNames[next.name] : '...'} في {next ? formatTime(next.time) : '...'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pb-4">
        {Object.entries(times).map(([id, time]) => (
          <div key={id} className={cn(
            "glass p-5 rounded-[28px] flex flex-col items-center justify-center gap-3 border transition-all duration-500",
            next?.name === id ? "border-gold bg-gold/10 scale-[1.02] shadow-lg" : "border-white/5 opacity-60"
          )}>
            <div className={cn("p-2 rounded-xl", next?.name === id ? "bg-gold text-royal-blue" : "text-gold/40")}>
              {prayerIcons[id]}
            </div>
            <div className="text-center">
              <p className="text-[10px] font-bold text-white/40 uppercase mb-1">{prayerNames[id]}</p>
              <span className="text-2xl font-bold text-white font-mono">{formatTime(time as Date)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrayerSection;

