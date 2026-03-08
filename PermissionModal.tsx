/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Bell, Target } from 'lucide-react';
import { motion } from 'motion/react';

export const PermissionModal = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(1);

  const handleAllow = () => {
    if (step === 1) {
      setStep(2);
    } else {
      onComplete();
    }
  };

  const handleDeny = () => {
    if (step === 1) {
      setStep(2);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-royal-blue/90 backdrop-blur-xl">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass p-8 rounded-[40px] border-gold/20 max-w-sm w-full text-center space-y-6"
      >
        <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center text-gold mx-auto">
          {step === 1 ? <Bell size={40} /> : <Target size={40} />}
        </div>
        
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-gold">
            {step === 1 ? "تفعيل التنبيهات" : "تحسين البطارية"}
          </h3>
          <p className="text-white/70 leading-relaxed">
            {step === 1 
              ? "يرجى السماح بالتنبيهات لتلقي إشعارات مواقيت الصلاة في وقتها المحدد."
              : "لضمان عمل تنبيهات الصلاة بدقة في الخلفية، يرجى استثناء التطبيق من تحسين استهلاك البطارية."}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4">
          <button 
            onClick={handleDeny}
            className="p-4 glass rounded-2xl text-white/50 font-bold hover:bg-white/5 transition-colors"
          >
            رفض
          </button>
          <button 
            onClick={handleAllow}
            className="p-4 bg-gold text-royal-blue rounded-2xl font-bold shadow-lg shadow-gold/20 active:scale-95 transition-transform"
          >
            سماح
          </button>
        </div>
      </motion.div>
    </div>
  );
};
