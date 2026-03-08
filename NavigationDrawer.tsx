/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { X, Zap, HandHelping, Facebook, Info, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const DUAS_OF_THE_DAY = [
  "اللهم اهدنا فيمن هديت، وعافنا فيمن عافيت",
  "اللهم إني أسألك الهدى والتقى والعفاف والغنى",
  "اللهم اغفر لي ولوالدي وللمؤمنين والمؤمنات",
  "ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار",
  "اللهم إني أعوذ بك من زوال نعمتك، وتحول عافيتك",
  "اللهم يا مقلب القلوب ثبت قلبي على دينك",
  "اللهم إني أسألك الجنة وما قرب إليها من قول أو عمل",
  "اللهم إني أعوذ بك من النار وما قرب إليها من قول أو عمل",
  "اللهم اغفر لي ذنبي كله، دقه وجله، وأوله وآخره",
  "اللهم إني أسألك من خير ما سألك منه نبيك محمد",
  "اللهم إني أعوذ بك من شر ما استعاذ منه نبيك محمد",
  "اللهم إني أسألك حبك وحب من يحبك",
  "اللهم اجعل في قلبي نوراً، وفي بصري نوراً",
  "اللهم إني أعوذ بك من الهم والحزن، والعجز والكسل",
  "اللهم بارك لنا في رجب وشعبان وبلغنا رمضان",
  "اللهم تقبل منا صيامنا وقيامنا وصالح أعمالنا",
  "اللهم اجعلنا من عتقائك من النار في هذا الشهر الكريم",
  "اللهم إنك عفو تحب العفو فاعف عنا",
  "اللهم ارزقنا ليلة القدر واجعلنا فيها من المقبولين",
  "اللهم إني أسألك العافية في الدنيا والآخرة",
  "اللهم استر عوراتنا وآمن روعاتنا",
  "اللهم احفظنا من بين أيدينا ومن خلفنا",
  "اللهم إني أعوذ بك من الفتن ما ظهر منها وما بطن",
  "اللهم اغفر لجميع موتى المسلمين الذين شهدوا لك بالوحدانية",
  "اللهم اشف مرضانا ومرضى المسلمين",
  "اللهم فرج هم المهمومين من المسلمين",
  "اللهم اقض الدين عن المدينين",
  "اللهم انصر إخواننا المستضعفين في كل مكان",
  "اللهم أصلح لنا ديننا الذي هو عصمة أمرنا",
  "اللهم اجعل خير عمري آخره، وخير عملي خواتمه"
];

const WallClock = () => {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center space-y-2">
      <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">الوقت الحالي</p>
      <p className="text-4xl font-mono text-gold font-bold">
        {time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </p>
    </div>
  );
};

export const NavigationDrawer = ({ isOpen, onClose, onAdminClick }: { isOpen: boolean; onClose: () => void; onAdminClick: () => void }) => {
  const [activeTab, setActiveTab] = useState<'duas' | 'activities'>('duas');

  const currentDua = useMemo(() => {
    const today = new Date();
    const start = new Date('2026-03-01');
    const diffTime = today.getTime() - start.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return DUAS_OF_THE_DAY[diffDays % 30];
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={{ left: 0, right: 0.5 }}
            onDragEnd={(_, info) => {
              if (info.offset.x > 100) {
                onClose();
              }
            }}
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-[#064e3b] z-[101] shadow-2xl flex flex-col"
          >
            <div className="p-6 flex items-center justify-between border-b border-white/10">
              <h2 className="text-2xl font-bold text-gold font-arabic">القائمة الرئيسية</h2>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold hover:bg-gold/20 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <div className="flex bg-white/5 p-1 rounded-xl">
                {[
                  { id: 'duas', label: 'دعاء اليوم لك' },
                  { id: 'activities', label: 'أنشطة البطحة' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={cn(
                      "flex-1 py-3 text-sm rounded-lg transition-all",
                      activeTab === tab.id ? "bg-gold text-royal-blue font-bold" : "text-white/60"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {activeTab === 'duas' && (
                  <div className="bg-gold/10 border border-gold/30 rounded-3xl p-8 text-center space-y-6 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-24 h-24 bg-gold/5 rounded-full -ml-12 -mt-12 blur-2xl" />
                    <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto text-royal-blue shadow-[0_0_30px_rgba(212,168,67,0.4)]">
                      <Zap size={40} fill="currentColor" className="animate-pulse" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-bold text-gold">دعاء اليوم لك</h4>
                      <p className="text-sm text-white/50">تغير تلقائي كل ٢٤ ساعة</p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                      <p className="text-xl font-amiri leading-loose text-white italic">"{currentDua}"</p>
                    </div>
                  </div>
                )}

                {activeTab === 'activities' && (
                  <div className="bg-emerald-900/50 border border-emerald-500/30 rounded-3xl p-8 space-y-6">
                    <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400">
                      <HandHelping size={32} />
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-xl font-bold text-emerald-400">أنشطة البطحة الجوابية</h4>
                      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <p className="text-lg font-arabic leading-relaxed text-white">
                          البطحة تقوم بجمع ملابس العيد لأيتام مدينة جواب.. كن عوناً لهم. التفاصيل في صفحة البطحة الجوابية.
                        </p>
                      </div>
                      <button 
                        onClick={() => window.open('https://www.facebook.com/profile.php?id=100063619934440', '_blank')}
                        className="w-full bg-emerald-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
                      >
                        <Facebook size={20} />
                        صفحة البطحة الجوابية
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <WallClock />
            </div>

            <div className="p-6 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold uppercase tracking-widest">
                <Info size={14} />
                <span>إصدار 2.5.0 - جواب</span>
              </div>
              <button 
                onClick={onAdminClick}
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/20 hover:text-gold hover:bg-white/10 transition-all"
              >
                <Settings size={20} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
