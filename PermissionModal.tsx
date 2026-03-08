/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Bell, Target } from 'lucide-react';
import { motion } from 'framer-motion'; // التغيير لضمان التوافق مع المكتبة الأكثر شيوعاً

interface PermissionModalProps {
  onComplete: () => void;
}

const PermissionModal: React.FC<PermissionModalProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);

  const handleAllow = async () => {
    if (step === 1) {
      // محاولة طلب إذن التنبيهات برمجياً
      if ('Notification' in window) {
        await Notification.requestPermission();
      }
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
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-royal-blue/95 backdrop-blur-2xl">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="glass p-8 rounded-[40px] border-gold/30 max-w-sm w-full text-center space-y-6 shadow-2xl"
      >
        <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center text-gold mx-auto relative">
          <div className="absolute inset-0 bg-gold/5 rounded-full animate-ping" />
          {step === 1 ? <Bell size={48} /> : <Target size={48} />}
        </div>
        
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-gold font-amiri">
            {step === 1 ? "تفعيل التنبيهات" : "تحسين البطارية"}
          </h3>
          <p className="text-white/70 leading-relaxed text-sm px-2">
            {step === 1 
              ? "يرجى السماح بالتنبيهات لتلقي إشعارات مواقيت الصلاة والأذان في وقتها المحدد بمدينة جواب."
              : "لضمان عمل الأذان بدقة في الخلفية، يرجى استثناء تطبيق منارة جواب من تحسين استهلاك البطارية."}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-6">
          <button 
            onClick={handleDeny}
            className="p-4 glass rounded-2xl text-white/40 font-bold hover:bg-white/5 transition-colors text-sm"
          >
            تخطي الآن
          </button>
          <button 
            onClick={handleAllow}
            className="p-4 bg-gold text-royal-blue rounded-2xl font-bold shadow-xl shadow-gold/20 active:scale-95 transition-all text-sm"
          >
            {step === 1 ? "تفعيل الآن" : "فهمت، متابعة"}
          </button>
        </div>

        <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold pt-2">
          إعدادات النظام - منارة جواب
        </p>
      </motion.div>
    </div>
  );
};

export default PermissionModal;
