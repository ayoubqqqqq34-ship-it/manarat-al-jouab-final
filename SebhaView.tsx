/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, RotateCcw, Fingerprint } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from './utils';

const SebhaView = () => {
  const navigate = useNavigate();
  
  // تحميل الإحصائيات الأولية
  const [total, setTotal] = useState(() => {
    const saved = localStorage.getItem('user_stats');
    return saved ? JSON.parse(saved).totalTasbih : 0;
  });

  const [count, setCount] = useState(0);
  
  const dhikrs = ['سبحان الله', 'الحمد لله', 'الله أكبر'];
  const currentDhikrIndex = Math.floor((count % 99) / 33);
  const currentDhikr = dhikrs[currentDhikrIndex];
  const progress = (count % 33) / 33;

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    
    // تحديث الإجمالي في الذاكرة وفي التخزين المحلي فوراً
    const newTotal = total + 1;
    setTotal(newTotal);
    
    const saved = localStorage.getItem('user_stats');
    const stats = saved ? JSON.parse(saved) : { totalTasbih: 0, pagesRead: 0, favoritesCount: 0 };
    localStorage.setItem('user_stats', JSON.stringify({ ...stats, totalTasbih: newTotal }));

    // نظام الاهتزاز التفاعلي (Haptic Feedback)
    if (window.navigator.vibrate) {
      if (newCount % 33 === 0) {
        window.navigator.vibrate([50, 30, 50]); // اهتزاز قوي عند إنهاء الدورة
      } else {
        window.navigator.vibrate(15); // اهتزاز خفيف جداً لكل تسبيحة
      }
    }
  };

  const reset = () => {
    if (confirm('هل تريد تصغير العداد الحالي؟')) {
      setCount(0);
      if (window.navigator.vibrate) window.navigator.vibrate(30);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-royal-blue z-[100] flex flex-col p-6 overflow-hidden"
    >
      {/* تأثيرات خلفية فنية */}
      <div className="absolute top-[-10%] left-[-20%] w-[80%] h-[40%] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-20%] w-[80%] h-[40%] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      {/* الرأس */}
      <div className="flex items-center justify-between mb-8 z-10">
        <button 
          onClick={() => navigate(-1)} 
          className="p-4 glass rounded-2xl text-gold active:scale-90 transition-all border border-white/5"
        >
          <X size={24} />
        </button>
        <div className="text-center">
          <h2 className="text-xl font-bold text-gold font-amiri">السبحة الإلكترونية</h2>
          <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">منارة جواب</p>
        </div>
        <button 
          onClick={reset} 
          className="p-4 glass text-white/40 rounded-2xl active:scale-90 transition-all border border-white/5"
        >
          <RotateCcw size={24} />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-12 z-10">
        {/* إحصائيات الإجمالي */}
        <div className="text-center space-y-1">
          <p className="text-gold/40 text-[10px] font-bold uppercase tracking-[0.3em]">مجموع التسبيحات</p>
          <motion.p 
            key={total}
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl font-bold font-sans text-white tracking-tighter"
          >
            {total.toLocaleString('en-US')}
          </motion.p>
        </div>

        {/* زر التسبيح الكبير */}
        <div className="relative group">
          <div className={cn(
            "absolute inset-0 bg-gold/20 blur-[80px] rounded-full transition-all duration

