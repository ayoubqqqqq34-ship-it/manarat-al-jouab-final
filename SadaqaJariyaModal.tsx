/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { Heart, Share2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const RAMADAN_QUOTES = [
  "الصوم جنة، فإذا كان يوم صوم أحدكم فلا يرفث ولا يصخب.",
  "من صام رمضان إيماناً واحتساباً غفر له ما تقدم من ذنب.",
  "تسحروا فإن في السحور بركة.",
  "للصائم فرحتان: فرحة عند فطره، وفرحة عند لقاء ربه.",
  "عمرة في رمضان تعدل حجة.",
  "من قام رمضان إيماناً واحتساباً غفر له ما تقدم من ذنب.",
  "كان رسول الله صلى الله عليه وسلم أجود الناس، وكان أجود ما يكون في رمضان.",
  "الصيام والقرآن يشفعان للعبد يوم القيامة.",
  "من لم يدع قول الزور والعمل به، فليس لله حاجة في أن يدع طعامه وشرابه.",
  "في الجنة باب يقال له الريان، يدخل منه الصائمون يوم القيامة.",
  "إذا جاء رمضان فتحت أبواب الجنة، وأغلقت أبواب النار.",
  "خلوف فم الصائم أطيب عند الله من ريح المسك.",
  "من فطر صائماً كان له مثل أجره، غير أنه لا ينقص من أجر الصائم شيئاً.",
  "إن لله في كل ليلة من رمضان عتقاء من النار.",
  "أفضل الصدقة صدقة في رمضان.",
  "من قام ليلة القدر إيماناً واحتساباً غفر له ما تقدم من ذنب.",
  "شهر رمضان الذي أنزل فيه القرآن هدى للناس وبينات من الهدى والفرقان.",
  "يا باغي الخير أقبل، ويا باغي الشر أقصر.",
  "الصوم نصف الصبر.",
  "رب صائم ليس له من صيامه إلا الجوع.",
  "استكثروا فيه من أربع خصال: خصلتان ترضون بهما ربكم، وخصلتان لا غنى بكم عنهما.",
  "إن في رمضان ليلة هي خير من ألف شهر.",
  "من أدرك رمضان فلم يغفر له فبعداً له.",
  "الصيام رياضة للروح وتهذيب للنفس.",
  "اجعل صيامك صياماً عن المحرمات قبل الطعام.",
  "رمضان فرصة للتغيير وبداية جديدة.",
  "القرآن ربيع القلوب في شهر الصيام.",
  "الدعاء عند الإفطار مستجاب فلا تنسونا من صالح دعائكم.",
  "العشر الأواخر هي ليالي العتق من النيران.",
  "عيدنا بتمام الصيام وقبول القيام."
];

export const SadaqaJariyaModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const hijriDay = useMemo(() => {
    const start = new Date('2026-02-18');
    const today = new Date();
    const diffTime = today.getTime() - start.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return Math.min(30, Math.max(1, diffDays));
  }, []);

  const quote = RAMADAN_QUOTES[hijriDay - 1] || RAMADAN_QUOTES[0];

  const handleShare = async () => {
    const shareData = {
      title: 'صدقة جارية - منارة مدينة جواب',
      text: `بطاقة اليوم ${hijriDay} رمضان: ${quote}`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      alert('تم نسخ النص للمشاركة: ' + quote);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-gradient-to-br from-gold via-yellow-400 to-gold p-8 rounded-[40px] shadow-[0_0_50px_rgba(251,191,36,0.4)] text-royal-blue text-center space-y-6"
          >
            <div className="w-20 h-20 bg-royal-blue/10 rounded-full flex items-center justify-center mx-auto">
              <Heart size={40} className="text-royal-blue" fill="currentColor" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold font-arabic">صدقة جارية</h3>
              <p className="text-xs font-bold uppercase tracking-widest opacity-60">بطاقة اليوم {hijriDay} رمضان</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-3xl border border-white/30">
              <p className="text-xl font-amiri leading-loose font-bold italic">"{quote}"</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleShare}
                className="flex-1 bg-royal-blue text-gold font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
              >
                <Share2 size={20} />
                مشاركة كصورة
              </button>
              <button 
                onClick={onClose}
                className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-royal-blue hover:bg-white/30 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
