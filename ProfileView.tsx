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
import { cn } from '../lib/utils';

export const ProfileView = () => {
  const [stats, setStats] = useState({
    totalTasbih: 0,
    khatmaProgress: 0,
    pagesRead: 0,
    favoritesCount: 0,
    lastQuizDate: null
  });

  useEffect(() => {
    const saved = localStorage.getItem('user_stats');
    if (saved) setStats(JSON.parse(saved));
  }, []);

  const achievements = [
    { id: 1, title: 'مسبح مبتدئ', desc: 'أكملت ١٠٠ تسبيحة', icon: <Zap size={20} />, unlocked: stats.totalTasbih >= 100 },
    { id: 2, title: 'قارئ مجتهد', desc: 'قرأت ١٠ صفحات', icon: <BookOpen size={20} />, unlocked: stats.pagesRead >= 10 },
    { id: 3, title: 'محب للخير', desc: 'أضفت أول طلب في سوق الخير', icon: <Heart size={20} />, unlocked: stats.favoritesCount >= 1 },
    { id: 4, title: 'مسبح محترف', desc: 'أكملت ١٠٠٠ تسبيحة', icon: <Trophy size={20} />, unlocked: stats.totalTasbih >= 1000 },
  ];

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col items-center gap-6 pt-8">
        <div className="relative">
          <div className="w-32 h-32 bg-gold rounded-[40px] flex items-center justify-center text-royal-blue shadow-2xl relative z-10 overflow-hidden group">
            <User size={64} fill="currentColor" className="group-hover:scale-110 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center text-white border-4 border-royal-blue z-20 shadow-lg">
            <Star size={20} fill="currentColor" />
          </div>
          <div className="absolute inset-0 bg-gold/20 blur-3xl rounded-full -z-10 animate-pulse" />
        </div>
        
        <div className="text-center space-y-1">
          <h2 className="text-3xl font-bold text-gold">مستخدم منارة جواب</h2>
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest">عضو منذ رمضان ١٤٤٧ هـ</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass p-6 rounded-[32px] border-gold/20 text-center space-y-2 group hover:bg-gold/5 transition-colors">
          <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mx-auto group-hover:bg-gold group-hover:text-royal-blue transition-all">
            <Zap size={24} />
          </div>
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">إجمالي التسبيح</p>
          <h4 className="text-3xl font-bold font-mono tracking-tighter">{stats.totalTasbih.toLocaleString('en-US')}</h4>
        </div>

        <div className="glass p-6 rounded-[32px] border-gold/20 text-center space-y-2 group hover:bg-gold/5 transition-colors">
          <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mx-auto group-hover:bg-gold group-hover:text-royal-blue transition-all">
            <BookOpen size={24} />
          </div>
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">صفحات مقروءة</p>
          <h4 className="text-3xl font-bold font-mono tracking-tighter">{stats.pagesRead.toLocaleString('en-US')}</h4>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-lg text-gold flex items-center gap-2 px-2">
          <Award size={20} />
          <span>الأوسمة والإنجازات</span>
        </h3>
        
        <div className="grid gap-3">
          {achievements.map(achievement => (
            <div 
              key={achievement.id}
              className={cn(
                "glass p-5 rounded-3xl flex items-center justify-between border transition-all",
                achievement.unlocked ? "border-gold/30 bg-gold/5" : "border-white/5 opacity-40 grayscale"
              )}
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg",
                  achievement.unlocked ? "bg-gold text-royal-blue" : "bg-white/10 text-white/30"
                )}>
                  {achievement.icon}
                </div>
                <div className="text-right">
                  <h4 className="font-bold text-sm">{achievement.title}</h4>
                  <p className="text-[10px] text-white/40">{achievement.desc}</p>
                </div>
              </div>
              {achievement.unlocked ? (
                <div className="w-8 h-8 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center border border-emerald-500/30">
                  <Star size={14} fill="currentColor" />
                </div>
              ) : (
                <div className="w-8 h-8 bg-white/5 text-white/20 rounded-full flex items-center justify-center border border-white/10">
                  <Zap size={14} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <button className="w-full glass p-6 rounded-3xl flex items-center justify-between border border-white/5 hover:border-gold/30 transition-all group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-royal-blue transition-colors">
              <Share2 size={24} />
            </div>
            <div className="text-right">
              <h3 className="font-bold text-lg">شارك إنجازاتك</h3>
              <p className="text-xs text-white/30">انشر الخير مع أصدقائك</p>
            </div>
          </div>
          <ChevronLeft className="text-gold/50" />
        </button>
      </div>
    </div>
  );
};
