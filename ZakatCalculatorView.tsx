/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  Calculator, 
  Minus, 
  Plus, 
  Info, 
  Coins, 
  Scale,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ZakatCalculatorView = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState<number>(1);

  // القيم المعتمدة بناءً على تصحيحك: 170 دج للفرد تعادل 2 كغ
  const ZAKAT_PER_PERSON_CASH = 170; 
  const ZAKAT_PER_PERSON_WEIGHT = 2; 

  const cashAmount = members * ZAKAT_PER_PERSON_CASH;
  const weightAmount = members * ZAKAT_PER_PERSON_WEIGHT;

  const handleMemberChange = (val: string) => {
    const num = parseInt(val);
    if (isNaN(num) || num < 0) {
      setMembers(0);
    } else {
      setMembers(num);
    }
  };

  return (
    <div className="space-y-8 pb-24 px-2">
      {/* الرأس */}
      <div className="flex items-center justify-between pt-4">
        <button 
          onClick={() => navigate(-1)} 
          className="p-3 glass rounded-2xl text-gold active:scale-90 transition-transform shadow-lg border border-white/5"
        >
          <ChevronRight size={24} />
        </button>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gold font-amiri">حاسبة زكاة الفطر</h2>
          <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest font-sans">Ramadan 2026</p>
        </div>
        <div className="w-12" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-8 rounded-[48px] border-gold/20 space-y-10 relative overflow-hidden shadow-2xl"
      >
        <div className="text-center space-y-4">
          <div className="w-24 h-24 bg-gradient-to-br from-gold/20 to-gold/5 rounded-full flex items-center justify-center text-gold mx-auto border border-gold/10 shadow-inner">
            <Calculator size={48} />
          </div>
          <h3 className="text-2xl font-bold text-white font-amiri">احسب زكاتك لعام 2026</h3>
        </div>

        {/* إدخال عدد أفراد الأسرة */}
        <div className="space-y-4">
          <label className="block text-sm text-white/50 text-right font-bold pr-2 font-amiri">عدد أفراد الأسرة</label>
          <div className="flex items-center gap-4 bg-white/5 p-3 rounded-[28px] border border-white/10 shadow-inner">
            <button 
              onClick={() => setMembers(prev => Math.max(0, prev - 1))}
              className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-gold hover:bg-gold hover:text-royal-blue transition-all active:scale-90 shadow-lg border border-gold/20"
            >
              <Minus size={24} />
            </button>
            <input 
              type="number" 
              value={members === 0 ? '' : members}
              placeholder="0"
              onChange={(e) => handleMemberChange(e.target.value)}
              className="flex-1 bg-transparent text-center text-4xl font-bold text-white outline-none font-sans"
            />
            <button 
              onClick={() => setMembers(prev => prev + 1)}
              className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-gold hover:bg-gold hover:text-royal-blue transition-all active:scale-90 shadow-lg border border-gold/20"
            >
              <Plus size={24} />
            </button>
          </div>
        </div>

        {/* عرض النتائج بناءً على الحسبة الجديدة */}
        <div className="grid grid-cols-1 gap-5">
          {/* المبلغ النقدي */}
          <div className="royal-gradient p-8 rounded-[35px] border border-gold/30 text-center shadow-xl relative overflow-hidden group">
            <Coins className="absolute top-4 right-4 text-white/5" size={40} />
            <p className="text-white/50 text-[10px] mb-2 font-bold uppercase tracking-[0.2em]">المقدار نقداً (170 دج للفرد)</p>
            <h4 className="text-5xl font-bold text-gold font-sans tracking-tighter">
              {cashAmount.toLocaleString('en-US')} <span className="text-lg font-amiri opacity-60">دج</span>
            </h4>
          </div>

          {/* المقدار عيناً */}
          <div className="glass p-8 rounded-[35px] border border-white/5 text-center relative">
            <Scale className="absolute top-4 right-4 text-white/5" size={32} />
            <p className="text-white/40 text-[10px] mb-2 font-bold uppercase tracking-[0.2em]">المقدار عيناً (2 كغ للفرد)</p>
            <h4 className="text-3xl font-bold text-white font-sans tracking-tight">
              {weightAmount.toLocaleString('en-US')} <span className="text-sm font-amiri opacity-40 mr-1">كيلوغرام</span>
            </h4>
            <div className="mt-4 flex justify-center gap-2">
              <span className="bg-white/5 px-4 py-1 rounded-full text-gold/60 text-[10px] border border-white/5">قمح / شعير / تمر</span>
            </div>
          </div>
        </div>

        {/* تنبيه رسمي */}
        <div className="p-5 bg-gold/5 rounded-3xl border border-gold/10 flex gap-4 items-start">
          <Info className="text-gold shrink-0 mt-1" size={18} />
          <p className="text-[11px] text-white/40 leading-relaxed text-right font-amiri">
            بناءً على التقديرات الرسمية لعام 2026: تم تحديد قيمة الفرد الواحد بـ <span className="text-gold/80 font-bold">170 دينار جزائري</span> والتي تقابل صاعاً من قوت أهل البلد بوزن <span className="text-gold/80 font-bold">2 كيلوغرام</span>.
          </p>
        </div>
      </motion.div>

      <div className="flex items-center justify-center gap-2 opacity-20 py-4">
        <CheckCircle2 size={12} className="text-gold" />
        <p className="text-[8px] font-bold uppercase tracking-[0.4em]">Manarat Jouab Verified Logic</p>
      </div>
    </div>
  );
};

export default ZakatCalculatorView;

