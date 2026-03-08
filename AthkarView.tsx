/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';

const ATHKAR = [
  { id: 1, text: "سبحان الله", target: 33 },
  { id: 2, text: "الحمد لله", target: 33 },
  { id: 3, text: "الله أكبر", target: 33 },
  { id: 4, text: "لا إله إلا الله", target: 100 },
  { id: 5, text: "أستغفر الله", target: 100 },
];

export const AthkarView = () => {
  const [counters, setCounters] = useState<Record<number, number>>(() => {
    const saved = localStorage.getItem('athkar_counts');
    return saved ? JSON.parse(saved) : {};
  });

  const increment = (id: number) => {
    const newCounts = { ...counters, [id]: (counters[id] || 0) + 1 };
    setCounters(newCounts);
    localStorage.setItem('athkar_counts', JSON.stringify(newCounts));
    if (window.navigator.vibrate) window.navigator.vibrate(50);
  };

  const reset = (id: number) => {
    const newCounts = { ...counters, [id]: 0 };
    setCounters(newCounts);
    localStorage.setItem('athkar_counts', JSON.stringify(newCounts));
  };

  return (
    <div className="space-y-4">
      {ATHKAR.map(dhikr => (
        <div key={dhikr.id} className="glass p-6 rounded-3xl border-white/5 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold font-amiri text-gold">{dhikr.text}</h3>
            <button onClick={() => reset(dhikr.id)} className="p-2 text-white/30 hover:text-gold"><RotateCcw size={18} /></button>
          </div>
          <div 
            onClick={() => increment(dhikr.id)}
            className="w-full h-32 bg-white/5 rounded-2xl flex items-center justify-center cursor-pointer active:scale-95 transition-transform border border-white/10"
          >
            <span className="text-5xl font-bold font-mono text-gold">{counters[dhikr.id] || 0}</span>
          </div>
          <div className="mt-4 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full gold-gradient transition-all duration-500" 
              style={{ width: `${Math.min(((counters[dhikr.id] || 0) / dhikr.target) * 100, 100)}%` }}
            />
          </div>
          <p className="text-center text-[10px] text-white/30 mt-2 font-bold tracking-widest uppercase">الهدف: {dhikr.target}</p>
        </div>
      ))}
    </div>
  );
};
