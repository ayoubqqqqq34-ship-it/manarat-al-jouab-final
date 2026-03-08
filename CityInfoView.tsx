/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Info } from 'lucide-react';

const CityInfoView = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => navigate(-1)} className="p-3 glass rounded-2xl text-gold">
          <ChevronRight size={24} />
        </button>
        <h2 className="text-2xl font-bold text-gold">مدينة جواب</h2>
        <div className="w-12" />
      </div>

      <div className="glass p-12 rounded-[40px] border-gold/20 flex flex-col items-center justify-center gap-6 min-h-[50vh]">
        <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center text-gold animate-pulse">
          <Info size={48} />
        </div>
        <h3 className="text-3xl font-bold text-gold">يفتح قريباً</h3>
        <p className="text-white/50 text-center leading-relaxed font-sans">
          نحن نعمل على جمع كافة المعلومات التاريخية والتراثية الخاصة بمدينة جواب العريقة. ترقبوا التحديث القادم!
        </p>
      </div>
      
      <div className="text-center mt-4">
        <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">
          قسم التراث - منارة مدينة جواب
        </p>
      </div>
    </div>
  );
};

export default CityInfoView; // التصدير الافتراضي لضمان عمل الاستيراد في App.tsx
