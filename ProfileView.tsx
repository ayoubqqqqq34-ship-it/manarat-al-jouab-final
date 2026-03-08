/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  User, 
  Trophy, 
  Heart, 
  BookOpen, 
  Zap, 
  ChevronLeft, 
  Star, 
  Award, 
  Share2 
} from 'lucide-react';
import { cn } from './utils'; // تصحيح المسار المباشر

const ProfileView = () => {
  const [stats, setStats] = useState({
    totalTasbih: 0,
    khatmaProgress: 0,
    pagesRead: 0,
    favoritesCount: 0,
    lastQuizDate: null
  });

  useEffect(() => {
    // جلب البيانات من localStorage لضمان استمرارية الإنجازات
    const saved = localStorage.getItem('user_stats');
    if (saved) {
      setStats(JSON.parse(saved));
    } else {
      // إعدادات افتراضية لأول مرة
      const defaultStats = { totalTasbih: 0, khatmaProgress: 0, pagesRead: 0, favoritesCount: 0, lastQuizDate: null };
      localStorage.setItem('user_stats', JSON.stringify(defaultStats));
    }
  }, []);

  const achievements = [
    { id: 1, title: 'مسبح مبتدئ', desc: 'أكملت ١٠٠ تسبيحة', icon: <Zap size={20} />, unlocked: stats.totalTasbih >= 100 },
    { id: 2, title: 'قارئ مجتهد', desc: 'قرأت ١٠ صفحات', icon: <BookOpen size={20} />, unlocked: stats.pagesRead >= 10 },
    { id: 3, title: 'محب للخير', desc: 'أضفت أول طلب في سوق الخير', icon: <Heart size={20} />, unlocked: stats.favoritesCount >= 1 },
    { id: 4, title: 'مسبح محترف', desc: 'أكملت ١٠٠٠ تسبيحة', icon: <Trophy size={20} />, unlocked: stats.totalTasbih >= 1000 },
  ];

  return (
    <div className="space-y-8 pb-24 px-1">
      {/* رأس الصفحة مع الهوية البصرية */}
      <div className="flex flex-col items-center gap-6 pt-10">
        <div className="relative">
          <div className="w-36 h-36 bg-gold rounded-[48px] flex items-center justify-center text-royal-blue shadow-[0_20px_50px_rgba(212,168,67,0.3)] relative z-10 overflow-hidden group border-4 border-white/10">
            <User size={72} fill="currentColor" className="group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white border-4 border-royal-blue z-20 shadow-xl">
            <Star size={24} fill="currentColor" />
          </div>
          <div className="absolute inset-0 bg-gold/30 blur-[60px] rounded-full -z-10 animate-pulse" />
        </div>
        
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-gold font-amiri tracking-tight">مستخدم منارة جواب</h2>
          <div className="bg-gold/10 px-4 py-1 rounded-full border border-gold/20 inline-block">
            <p className="text-gold/80 text-[10px] font-bold uppercase tracking-[0.2em]">عضو منذ رمضان ١٤٤٧ هـ</p>
          </div>
        </div>
      </div>

      {/* الإحصائيات السريعة */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'إجمالي التسبيح', value: stats.totalTasbih, icon: <Zap size={22} /> },
          { label: 'صفحات مقروءة', value: stats.pagesRead, icon: <BookOpen size={22} /> }
        ].map((item, idx) => (
          <div key={idx} className="glass p-6 rounded-[32px] border-gold/10 text-center space-y-3 group hover:bg-gold/10 transition-all duration-300">
            <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mx-auto group-hover:bg-gold group-hover:text-royal-blue transition-all shadow-inner">
              {item.icon}
            </div>
            <div>
              <p className="
