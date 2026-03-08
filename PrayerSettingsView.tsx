/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Save, RotateCcw, Clock } from 'lucide-react';
import { getPrayerTimes, formatTime } from '../services/prayerService';

export const PrayerSettingsView = () => {
  const navigate = useNavigate();
  const [offsets, setOffsets] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('prayer_offsets');
    return saved ? JSON.parse(saved) : { fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 };
  });

  const [baseTimes, setBaseTimes] = useState<Record<string, Date>>({});

  useEffect(() => {
    const now = new Date();
    setBaseTimes(getPrayerTimes(30.0444, 31.2357, now));
  }, []);

  const saveOffsets = () => {
    localStorage.setItem('prayer_offsets', JSON.stringify(offsets));
    alert('تم حفظ التعديلات بنجاح');
    window.location.reload();
  };

  const resetOffsets = () => {
    const defaultOffsets = { fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 };
    setOffsets(defaultOffsets);
    localStorage.setItem('prayer_offsets', JSON.stringify(defaultOffsets));
    alert('تمت إعادة الضبط للمواقيت الافتراضية');
    window.location.reload();
  };

  const prayerNames: Record<string, string> = {
    fajr: "الفجر",
    dhuhr: "الظهر",
    asr: "العصر",
    maghrib: "المغرب",
    isha: "العشاء"
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => navigate(-1)} className="p-3 glass rounded-2xl text-gold">
          <ChevronRight size={24} />
        </button>
        <h2 className="text-2xl font-bold text-gold">إعدادات المواقيت</h2>
        <div className="w-12" />
      </div>

      <div className="glass p-8 rounded-[40px] border-gold/20 space-y-8">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center text-gold mx-auto">
            <Clock size={32} />
          </div>
          <h3 className="text-xl font-bold">معايرة أوقات الأذان</h3>
          <p className="text-white/50 text-xs">يمكنك إضافة أو إنقاص دقائق لكل صلاة</p>
        </div>

        <div className="space-y-4">
          {Object.entries(prayerNames).map(([id, name]) => (
            <div key={id} className="glass p-4 rounded-2xl border border-white/5 flex items-center justify-between">
              <div className="text-right">
                <p className="font-bold text-gold">{name}</p>
                <p className="text-[10px] text-white/30 font-mono">
                  الأصلي: {baseTimes[id] ? formatTime(baseTimes[id]) : '--:--'}
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setOffsets(prev => ({ ...prev, [id]: prev[id] - 1 }))}
                  className="w-10 h-10 glass rounded-xl flex items-center justify-center text-gold hover:bg-gold hover:text-royal-blue transition-all"
                >
                  -
                </button>
                <div className="w-12 text-center">
                  <span className={cn(
                    "font-bold font-mono text-lg",
                    offsets[id] > 0 ? "text-green-400" : offsets[id] < 0 ? "text-red-400" : "text-white"
                  )}>
                    {offsets[id] > 0 ? `+${offsets[id]}` : offsets[id]}
                  </span>
                </div>
                <button 
                  onClick={() => setOffsets(prev => ({ ...prev, [id]: prev[id] + 1 }))}
                  className="w-10 h-10 glass rounded-xl flex items-center justify-center text-gold hover:bg-gold hover:text-royal-blue transition-all"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 pt-4">
          <button 
            onClick={resetOffsets}
            className="flex-1 p-4 glass rounded-2xl text-white/50 font-bold hover:bg-white/5 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw size={18} />
            إعادة ضبط
          </button>
          <button 
            onClick={saveOffsets}
            className="flex-[2] p-4 gold-gradient rounded-2xl text-royal-blue font-bold shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Save size={18} />
            حفظ التعديلات
          </button>
        </div>
      </div>
    </div>
  );
};

const cn = (...inputs: any[]) => {
  return inputs.filter(Boolean).join(' ');
};
