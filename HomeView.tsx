/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, 
  Menu, 
  Bell, 
  Star, 
  BookOpen, 
  Library, 
  Heart, 
  Compass, 
  HandHelping, 
  MapIcon, 
  Calculator, 
  Info, 
  ChevronLeft,
  BellRing
} from 'lucide-react';
import { AdminLoginModal } from './AdminDashboard';
import { PrayerSection } from './PrayerSection';

const VERSES = [
  { text: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", ref: "الشرح: 6" },
  { text: "وَقُل رَّبِّ زِدْنِي عِلْمًا", ref: "طه: 114" },
  { text: "فَاذْكُرُونِي أَذْكُرْكُمْ", ref: "البقرة: 152" },
  { text: "لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ", ref: "إبراهيم: 7" },
  { text: "وَاللَّهُ مَعَ الصَّابِرِينَ", ref: "البقرة: 249" }
];

export const HomeView = ({ isAdmin, setIsAdmin, onMenuClick }: { isAdmin: boolean; setIsAdmin: (val: boolean) => void; onMenuClick: () => void }) => {
  const navigate = useNavigate();
  const [showAdminModal, setShowAdminModal] = useState(false);

  useEffect(() => {
    const handleOpenAdmin = () => setShowAdminModal(true);
    window.addEventListener('open-admin-login', handleOpenAdmin);
    return () => window.removeEventListener('open-admin-login', handleOpenAdmin);
  }, []);

  const verseOfDay = useMemo(() => {
    return VERSES[Math.floor(Math.random() * VERSES.length)];
  }, []);

  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateString = today.toLocaleDateString('ar-SA', { ...options, numberingSystem: 'latn' });

  const handleAdminAction = () => {
    if (isAdmin) {
      navigate('/admin-dashboard');
    } else {
      setShowAdminModal(true);
    }
  };

  return (
    <div className="space-y-8 pb-20 relative">
      <AdminLoginModal 
        isOpen={showAdminModal} 
        onClose={() => setShowAdminModal(false)} 
        onLogin={() => {
          setIsAdmin(true);
          navigate('/admin-dashboard');
        }} 
      />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gold">Manarat Jouab</h1>
          <p className="text-white/50 text-sm">{dateString}</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/admin')}
            className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-gold border border-gold/30 hover:scale-105 transition-all"
            title="جرس المسجد"
          >
            <BellRing size={24} />
          </button>
          <button 
            onClick={handleAdminAction}
            className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-gold border border-gold/30 hover:scale-105 transition-all"
            title="الإدارة"
          >
            <Settings size={24} />
          </button>
          <button 
            onClick={onMenuClick}
            className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-gold border border-gold/30 shadow-[0_0_15px_rgba(251,191,36,0.2)] hover:scale-105 transition-all"
            title="القائمة"
          >
            <Menu size={24} />
          </button>
          <button className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-gold relative">
            <Bell size={24} />
            <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-royal-blue" />
          </button>
        </div>
      </div>

      <PrayerSection />

      <div className="glass p-6 rounded-3xl border-gold/20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-24 h-24 bg-gold/5 rounded-full -ml-12 -mt-12 blur-2xl" />
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gold rounded-2xl flex items-center justify-center text-royal-blue shadow-lg">
            <Star size={32} fill="currentColor" />
          </div>
          <div>
            <h4 className="font-bold text-xl">آية اليوم</h4>
            <p className="text-sm text-gold/80 font-amiri">"{verseOfDay.text}"</p>
            <p className="text-[10px] text-white/30">{verseOfDay.ref}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button onClick={() => navigate('/quran')} className="glass p-6 rounded-[32px] text-right border-white/5 hover:border-gold/30 transition-all group relative overflow-hidden">
          <div className="absolute top-0 left-0 w-24 h-24 bg-gold/5 rounded-full -ml-12 -mt-12 blur-2xl group-hover:bg-gold/10 transition-colors" />
          <div className="w-14 h-14 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mb-4 group-hover:bg-gold group-hover:text-royal-blue transition-all shadow-lg">
            <BookOpen size={28} />
          </div>
          <h3 className="font-bold text-lg">القرآن الكريم</h3>
          <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest">١١٤ سورة كاملة</p>
        </button>

        <button onClick={() => navigate('/library')} className="glass p-6 rounded-[32px] text-right border-white/5 hover:border-gold/30 transition-all group relative overflow-hidden">
          <div className="absolute top-0 left-0 w-24 h-24 bg-gold/5 rounded-full -ml-12 -mt-12 blur-2xl group-hover:bg-gold/10 transition-colors" />
          <div className="w-14 h-14 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mb-4 group-hover:bg-gold group-hover:text-royal-blue transition-all shadow-lg">
            <Library size={28} />
          </div>
          <h3 className="font-bold text-lg">المكتبة الإسلامية</h3>
          <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest">كتب ومصادر موثوقة</p>
        </button>

        <button onClick={() => navigate('/athkar')} className="glass p-6 rounded-[32px] text-right border-white/5 hover:border-gold/30 transition-all group relative overflow-hidden">
          <div className="absolute top-0 left-0 w-24 h-24 bg-gold/5 rounded-full -ml-12 -mt-12 blur-2xl group-hover:bg-gold/10 transition-colors" />
          <div className="w-14 h-14 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mb-4 group-hover:bg-gold group-hover:text-royal-blue transition-all shadow-lg">
            <Heart size={28} fill="currentColor" />
          </div>
          <h3 className="font-bold text-lg">الأذكار</h3>
          <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest">حصن المسلم اليومي</p>
        </button>

        <button onClick={() => navigate('/qibla')} className="glass p-6 rounded-[32px] text-right border-white/5 hover:border-gold/30 transition-all group relative overflow-hidden">
          <div className="absolute top-0 left-0 w-24 h-24 bg-gold/5 rounded-full -ml-12 -mt-12 blur-2xl group-hover:bg-gold/10 transition-colors" />
          <div className="w-14 h-14 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mb-4 group-hover:bg-gold group-hover:text-royal-blue transition-all shadow-lg">
            <Compass size={28} />
          </div>
          <h3 className="font-bold text-lg">القبلة</h3>
          <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest">بوصلة دقيقة للقبلة</p>
        </button>

        <button onClick={() => navigate('/souq')} className="glass p-6 rounded-[32px] text-right border-white/5 hover:border-gold/30 transition-all group relative overflow-hidden">
          <div className="absolute top-0 left-0 w-24 h-24 bg-gold/5 rounded-full -ml-12 -mt-12 blur-2xl group-hover:bg-gold/10 transition-colors" />
          <div className="w-14 h-14 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mb-4 group-hover:bg-gold group-hover:text-royal-blue transition-all shadow-lg">
            <HandHelping size={28} />
          </div>
          <h3 className="font-bold text-lg">سوق الخير</h3>
          <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest">تكافل وتعاون اجتماعي</p>
        </button>

        <button onClick={() => navigate('/mosques')} className="glass p-6 rounded-[32px] text-right border-white/5 hover:border-gold/30 transition-all group relative overflow-hidden">
          <div className="absolute top-0 left-0 w-24 h-24 bg-gold/5 rounded-full -ml-12 -mt-12 blur-2xl group-hover:bg-gold/10 transition-colors" />
          <div className="w-14 h-14 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mb-4 group-hover:bg-gold group-hover:text-royal-blue transition-all shadow-lg">
            <MapIcon size={28} />
          </div>
          <h3 className="font-bold text-lg">مواقع المساجد</h3>
          <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest">خريطة مساجد جواب</p>
        </button>

        <button onClick={() => navigate('/zakat')} className="glass p-6 rounded-[32px] text-right border-white/5 hover:border-gold/30 transition-all group relative overflow-hidden">
          <div className="absolute top-0 left-0 w-24 h-24 bg-gold/5 rounded-full -ml-12 -mt-12 blur-2xl group-hover:bg-gold/10 transition-colors" />
          <div className="w-14 h-14 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mb-4 group-hover:bg-gold group-hover:text-royal-blue transition-all shadow-lg">
            <Calculator size={28} />
          </div>
          <h3 className="font-bold text-lg">زكاة الفطر</h3>
          <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest">حاسبة الزكاة ٢٠٢٦</p>
        </button>
      </div>

      <div className="space-y-4">
        <button 
          onClick={() => navigate('/city-info')}
          className="w-full glass p-6 rounded-3xl flex items-center justify-between border border-white/5 hover:border-gold/30 transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-royal-blue transition-colors">
              <Info />
            </div>
            <div className="text-right">
              <h3 className="font-bold text-lg">كل ما يخص مدينة جواب</h3>
              <p className="text-xs text-white/30">تراث ومعلومات</p>
            </div>
          </div>
          <ChevronLeft className="text-gold/50" />
        </button>

        <div className="text-center py-4">
          <p className="text-gold/60 font-amiri text-lg">ادعو لوالد ووالدة دين نصر الدين بالخير ❤️</p>
        </div>
      </div>
    </div>
  );
};
