/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Info, 
  ChevronLeft, 
  Coins, 
  Settings, 
  Menu as MenuIcon,
  LayoutDashboard
} from 'lucide-react';
import { cn } from './utils';

interface HomeViewProps {
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  onMenuClick: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ isAdmin, setIsAdmin, onMenuClick }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={onMenuClick}
          className="p-3 glass rounded-2xl text-gold hover:bg-gold/10 transition-all"
        >
          <MenuIcon size={24} />
        </button>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gold">منارة مدينة جواب</h1>
          <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em]">Jouab Lighthouse</p>
        </div>
        {isAdmin ? (
          <button 
            onClick={() => navigate('/admin')}
            className="p-3 glass rounded-2xl text-gold border-gold/50 border animate-pulse"
          >
            <LayoutDashboard size={24} />
          </button>
        ) : (
          <div className="w-12" />
        )}
      </div>

      {/* Main Grid Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => navigate('/zakat')}
          className="glass p-6 rounded-[32px] border-gold/10 flex flex-col items-center justify-center gap-4 hover:border-gold/40 transition-all group"
        >
          <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
            <Coins size={32} />
          </div>
          <div className="text-center">
            <h3 className="font-bold text-lg">زكاة الفطر</h3>
            <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest">حاسبة الزكاة ٢٠٢٦</p>
          </div>
        </button>

        <button 
          onClick={() => navigate('/prayer-settings')}
          className="glass p-6 rounded-[32px] border-white/5 flex flex-col items-center justify-center gap-4 hover:border-gold/40 transition-all group"
        >
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-white/60 group-hover:text-gold transition-colors">
            <Settings size={32} />
          </div>
          <div className="text-center">
            <h3 className="font-bold text-lg">الإعدادات</h3>
            <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest">مواقيت الصلاة</p>
          </div>
        </button>
      </div>

      {/* City Info & Heritage */}
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

        {/* الدعاء البركة */}
        <div className="text-center py-8">
          <p className="text-gold/60 font-amiri text-xl italic drop-shadow-sm">
            ادعو لوالد ووالدة دين نصر الدين بالخير ❤️
          </p>
          <p className="text-[10px] text-white/20 mt-2 tracking-widest uppercase">
            Sadaqa Jariya Project - Jouab 2026
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
