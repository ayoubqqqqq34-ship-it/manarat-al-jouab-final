/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export const SebhaView = () => {
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(() => {
    const saved = localStorage.getItem('user_stats');
    return saved ? JSON.parse(saved).totalTasbih : 0;
  });
  const navigate = useNavigate();

  const dhikrs = ['سبحان الله', 'الحمد لله', 'الله أكبر'];
  const effectiveCount = count > 0 ? count - 1 : 0;
  const currentDhikrIndex = Math.floor((effectiveCount % 99) / 33);
  const currentDhikr = dhikrs[currentDhikrIndex];
  const progress = count === 0 ? 0 : ((count - 1) % 33 + 1) / 33;

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    const newTotal = total + 1;
    setTotal(newTotal);
    
    const saved = localStorage.getItem('user_stats');
    const stats = saved ? JSON.parse(saved) : { totalTasbih: 0, khatmaProgress: 0, pagesRead: 0, favoritesCount: 0, lastQuizDate: null };
    const newStats = { ...stats, totalTasbih: newTotal };
    localStorage.setItem('user_stats', JSON.stringify(newStats));
    
    if (window.navigator.vibrate) {
      window.navigator.vibrate(20);
    }
  };

  const reset = () => {
    setCount(0);
    if (window.navigator.vibrate) window.navigator.vibrate([10, 30, 10]);
  };

  return (
    <motion.div 
      initial={{ y: '100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '100%', opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 bg-royal-blue z-50 flex flex-col p-6"
    >
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => navigate('/')} 
          className="p-4 bg-gold text-royal-blue rounded-2xl hover:bg-gold/80 transition-all active:scale-90 border border-gold/20 shadow-lg shadow-gold/20 flex items-center gap-2 font-bold"
          title="خروج"
        >
          <X size={28} />
          <span>خروج</span>
        </button>
        <h2 className="text-2xl font-bold text-gold">السبحة الإلكترونية</h2>
        <button 
          onClick={reset} 
          className="p-4 bg-white/5 text-gold rounded-2xl hover:bg-white/10 transition-all active:scale-90 border border-white/10"
          title="إعادة ضبط"
        >
          <RotateCcw size={28} />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-10">
        <div className="text-center">
          <p className="text-gold/60 text-xs uppercase tracking-[0.2em] mb-1">إجمالي التسبيح</p>
          <p className="text-4xl font-bold font-sans text-white">{total.toLocaleString('en-US')}</p>
        </div>

        <div className="relative group">
          <div className={cn(
            "absolute inset-0 bg-gold/20 blur-[60px] rounded-full transition-all duration-500",
            count > 0 ? "opacity-100 scale-110" : "opacity-0 scale-100"
          )} />
          
          <button 
            onClick={increment}
            className="w-72 h-72 rounded-full flex items-center justify-center relative active:scale-95 transition-transform bg-royal-blue/40 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden"
          >
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="144"
                cy="144"
                r="130"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                className="text-white/5"
              />
              <motion.circle
                cx="144"
                cy="144"
                r="130"
                fill="none"
                stroke="url(#goldGradient)"
                strokeWidth="8"
                strokeDasharray="816.8"
                animate={{ strokeDashoffset: 816.8 * (1 - progress) }}
                strokeLinecap="round"
                className="drop-shadow-[0_0_8px_rgba(212,168,67,0.5)]"
              />
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4A843" />
                  <stop offset="100%" stopColor="#F3D081" />
                </linearGradient>
              </defs>
            </svg>

            <div className="text-center z-10">
              <motion.p 
                key={currentDhikr}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-3xl font-amiri text-gold mb-4 h-10"
              >
                {currentDhikr}
              </motion.p>
              <p className="text-7xl font-bold font-sans text-white tracking-tighter">
                {count % 33 === 0 && count !== 0 ? 33 : count % 33}
              </p>
              <div className="mt-4 flex gap-1 justify-center">
                {[0, 1, 2].map(i => (
                  <div 
                    key={i} 
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300",
                      currentDhikrIndex === i ? "bg-gold w-6" : "bg-white/10"
                    )} 
                  />
                ))}
              </div>
            </div>
          </button>
        </div>

        <div className="text-center space-y-4">
          <div className="glass px-6 py-3 rounded-2xl border-gold/20 inline-block">
            <p className="text-sm text-gold/80">الدورة الحالية: {Math.floor(count / 99) + 1}</p>
          </div>
          <p className="text-xl font-amiri text-gold/90 italic leading-relaxed">
            "فَسَبِّحْ بِحَمْدِ رَبِّكَ وَكُن مِّنَ السَّاجِدِينَ"
          </p>
        </div>
      </div>
    </motion.div>
  );
};
