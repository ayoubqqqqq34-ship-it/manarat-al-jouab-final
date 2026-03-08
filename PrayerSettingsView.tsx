/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Save, RotateCcw, Clock } from 'lucide-react';
import { getPrayerTimes, formatTime } from './services/prayerService'; // تصحيح المسار
import { cn } from './utils'; // استخدام utils الموحد

const PrayerSettingsView = () => {
  const navigate = useNavigate();
  
  // إحداثيات بلدية جواب لضمان دقة الحساب الأساسي
  const JOUAB_LAT = 36.1444;
  const JOUAB_LNG = 3.4357;

  const [offsets, setOffsets] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('prayer_offsets');
    return saved ? JSON.parse(saved) : { fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 };
  });

  const [baseTimes, setBaseTimes] = useState<Record<string, Date>>({});

  useEffect(() => {
    const now = new Date();
    // جلب المواقيت الأصلية لبلدية جواب
    setBaseTimes(getPrayerTimes(JOUAB_LAT, JOUAB_LNG, now));
  }, []);

  const saveOffsets = () => {
    localStorage.setItem('prayer_offsets', JSON.stringify(offsets));
    // إطلاق حدث لتحديث المواقيت في كامل التطبيق فوراً
    window.dispatchEvent(new CustomEvent('prayer-times-refreshed'));
    
    // تجربة مستخدم أفضل بدل الـ alert التقليدي
    const timer = setTimeout(() => navigate(-1), 1000);
    return () => clearTimeout(timer);
  };

  const resetOffsets = () => {
    const defaultOffsets = { fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 };
    setOffsets(defaultOffsets);
    localStorage.setItem('prayer_offsets', JSON.stringify(defaultOffsets));
    window.dispatchEvent(new CustomEvent('prayer-times-refreshed'));
  };

  const prayerNames: Record<string, string> = {
    fajr: "الفجر",
    dhuhr: "الظهر",
    asr: "العصر",
    maghrib: "المغرب",
    isha: "العشاء"
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => navigate(-1)} className="p-3 glass rounded-2xl text-gold active:scale-90 transition-transform">
          <ChevronRight size={24} />
        </button>
        <h2 className="text-2xl font-bold text-gold font-amiri">إعدادات المواقيت</h2>
        <div className="w-12" />
      </div>

      <div className="glass p-8 rounded-[40px] border-gold/20 space-y-8 shadow-2xl bg-royal-blue/30">
        <div className="text-center space-y-3">
          <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center text-gold mx-auto border border-gold/20 shadow-inner">
            <Clock size={36} className="animate-pulse" />
          </div>
          <h3 className="text-2xl font-bold text-white font-amiri">معايرة أوقات الأذان</h3>
          <p className="text-white/40 text-xs px-4 leading-relaxed">
            يمكنك إضافة أو إنقاص دقائق لتتوافق مواقيت التطبيق مع أذان المسجد في جواب.
          </p>
        </div>

        <div className="space-y-4">
          {Object.entries(prayerNames).map(([id, name]) => (
            <div key={id} className="glass p-5 rounded-3xl border border-white/5 flex items-center justify-between hover:bg-white/5 transition-colors">
              <div className="text-right">
                <p className="font-bold text-gold text-lg">{name}</p>
                <p className="text-[10px] text-white/30 font-mono tracking-tighter">
                  الافتراضي: {baseTimes[id] ? formatTime(baseTimes[id]) : '--:--'}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setOffsets(prev => ({ ...prev, [id]: prev[id] - 1 }))}
                  className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-gold hover:bg-gold hover:text-royal-blue active:scale-90 transition-all font-bold text-2xl"
                >
                  -
                </button>
                <div className="w-14 text-center">
                  <span className={cn(
                    "font-bold font-mono text-xl",
                    offsets[id] > 0 ? "text-emerald-400" : offsets[id] < 0 ? "text-rose-400" : "text-white/80"
                  )}>
                    {offsets[id] > 0 ? `+${offsets[id]}` : offsets[id]}
                  </span>
                  <p className="text-[8px] uppercase text-white/20 font-bold">دقيقة</p>
                </div>
                <button 
                  onClick={() => setOffsets(prev => ({ ...prev, [id]: prev[id] + 1 }))}
                  className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-gold hover:bg-gold hover:text-royal-blue active:scale-90 transition-all font-bold text-2xl"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 pt-4">
          <button 
            onClick={saveOffsets}
            className="w-full p-5 bg-gold text-royal-blue rounded-3xl font-bold shadow-xl shadow-gold/20 active:scale-95 transition-all flex items-center justify-center gap-2 text-lg"
          >
            <Save size={20} />
            حفظ التعديلات للكل
          </button>
          <button 
            onClick={resetOffsets}
            className="w-full p-4 glass rounded-3xl text-white/30 font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-sm"
          >
            <RotateCcw size={16} />
            إعادة المواقيت الأصلية
          </button>
        </div>
      </div>

      <p className="text-center text-[10px] text-white/20 uppercase tracking-[0.3em] font-bold">
        Precision Control - Jouab 2026
      </p>
    </div>
  );
};

export default PrayerSettingsView;
