/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { Heart, Share2, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion'; // تأكد من التوافق مع مكتبة التحريك لديك

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

interface SadaqaJariyaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SadaqaJariyaModal: React.FC<SadaqaJariyaModalProps> = ({ isOpen, onClose }) => {
  // حساب اليوم الهجري بناءً على تاريخ بداية رمضان المتوقع في 2026
  const hijriDay = useMemo(() => {
    const start = new Date('2026-02-18');
    const today = new Date();
    const diffTime = today.getTime() - start.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return Math.min(30, Math.max(1, diffDays));
  }, []);

  const quote = RAMADAN_QUOTES[hijriDay - 1] || RAMADAN_QUOTES[0];

  const handleShare = async () => {
    const textToShare = `🌙 بطاقة اليوم ${hijriDay} رمضان من تطبيق منارة جواب:\n\n"${quote}"\n\nتقبل الله منا ومنكم الصالحات.`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'صدقة جارية - منارة مدينة جواب',
          text: textToShare,
          url: window.location.href
        });
      } catch (err) {
        console.log('Sharing failed', err);
      }
    } else {
      // نسخ للنص في حال عدم دعم المتصفح للمشاركة المباشرة
      navigator.clipboard.writeText(textToShare);
      alert('تم نسخ نص البطاقة، يمكنك مشاركته الآن!');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 overflow-hidden">
          {/* طبقة التعتيم الخلفية */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-royal-blue/90 backdrop-blur-xl"
          />

          {/* محتوى النافذة المنبثقة */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            className="relative w-full max-w-sm bg-gradient-to-br from-gold via-[#FDE68A] to-gold p-8 rounded-[48px] shadow-[0_25px_60px_rgba(212,168,67,0.4)] text-royal-blue text-center space-y-6 overflow-hidden border-4 border-white/20"
          >
            {/* زخرفة خلفية خفيفة */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="w-24 h-24 bg-royal-blue/10 rounded-full flex items-center justify-center mx-auto shadow-inner relative">
              <Sparkles size={24} className="absolute -top-2 -right-2 text-royal-blue animate-pulse" />
              <Heart size={48} className="text-royal-blue" fill="currentColor" />
            </div>

            <div className="space-y-2">
              <h3 className="text-3xl font-bold font-amiri tracking-tight">صدقة جارية</h3>
              <div className="bg-royal-blue/5 px-4 py-1 rounded-full inline-block border border-royal-blue/10">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-royal-blue/60">
                  بطاقة اليوم {hijriDay} رمضان ١٤٤٧ هـ
                </p>
              </div>
            </div>

            <div className="bg-white/30 backdrop-blur-md p-8 rounded-[32px] border border-white/40 shadow-sm relative group">
               <p className="text-2xl font-amiri leading-[1.8] font-bold italic text-royal-blue drop-shadow-sm">
                "{quote}"
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <button 
                onClick={handleShare}
                className="w-full bg-royal-blue text-gold font-bold py-5 rounded-[24px] flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all text-lg group"
              >
                <Share2 size={22} className="group-hover:rotate-12 transition-transform" />
                انشر الخير الآن
              </button>
              
              <button 
                onClick={onClose}
                className="text-royal-blue/40 font-bold text-sm hover:text-royal-blue transition-colors py-2"
              >
                إغلاق النافذة
              </button>
            </div>

            {/* إطار جمالي سفلي */}
            <p className="text-[9px] font-bold uppercase tracking-widest opacity-20 pt-2">
              Manara Jouab - Sadaqa System
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SadaqaJariyaModal;

