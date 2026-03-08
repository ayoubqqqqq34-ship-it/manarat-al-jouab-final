/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Calculator, Minus, Plus } from 'lucide-react';

export const ZakatCalculatorView = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState<number>(1);

  const cashAmount = members * 170;
  const weightAmount = members * 2.0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => navigate(-1)} className="p-3 glass rounded-2xl text-gold">
          <ChevronRight size={24} />
        </button>
        <h2 className="text-2xl font-bold text-gold">حاسبة زكاة الفطر</h2>
        <div className="w-12" />
      </div>

      <div className="glass p-8 rounded-[40px] border-gold/20 space-y-8">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center text-gold mx-auto">
            <Calculator size={40} />
          </div>
          <h3 className="text-xl font-bold">احسب زكاتك لعام 2026</h3>
        </div>

        <div className="space-y-4">
          <label className="block text-sm text-white/50 text-right font-bold">عدد أفراد الأسرة</label>
          <div className="flex items-center gap-4 bg-royal-blue/50 p-2 rounded-2xl border border-white/10">
            <button 
              onClick={() => setMembers(prev => Math.max(0, prev - 1))}
              className="w-12 h-12 glass rounded-xl flex items-center justify-center text-gold hover:bg-gold hover:text-royal-blue transition-all"
            >
              <Minus size={20} />
            </button>
            <input 
              type="number" 
              value={members === 0 ? '' : members}
              placeholder="0"
              onChange={(e) => {
                const val = e.target.value;
                if (val === '') {
                  setMembers(0);
                } else {
                  setMembers(Math.max(0, parseInt(val) || 0));
                }
              }}
              className="flex-1 bg-transparent text-center text-2xl font-bold text-white outline-none font-mono"
            />
            <button 
              onClick={() => setMembers(prev => prev + 1)}
              className="w-12 h-12 glass rounded-xl flex items-center justify-center text-gold hover:bg-gold hover:text-royal-blue transition-all"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 mt-8">
          <div className="royal-gradient p-6 rounded-3xl border border-gold/30 text-center shadow-xl">
            <p className="text-white/50 text-xs mb-2 font-bold">المقدار نقداً</p>
            <h4 className="text-4xl font-bold text-gold font-mono tracking-tighter">
              {cashAmount.toLocaleString('en-US')} <span className="text-sm">دج</span>
            </h4>
          </div>

          <div className="glass p-6 rounded-3xl border border-white/5 text-center">
            <p className="text-white/50 text-xs mb-2 font-bold">المقدار كيلاً</p>
            <h4 className="text-2xl font-bold text-white font-mono">
              {weightAmount.toLocaleString('en-US', { minimumFractionDigits: 1 })} <span className="text-sm">كغ</span>
            </h4>
            <p className="text-[10px] text-gold/60 mt-2">زبيب / تمر / قمح</p>
          </div>
        </div>

        <div className="p-4 bg-gold/5 rounded-2xl border border-gold/10">
          <p className="text-[10px] text-white/40 leading-relaxed text-center">
            بناءً على بيان وزارة الشؤون الدينية لعام 2026
          </p>
        </div>
      </div>
    </div>
  );
};
