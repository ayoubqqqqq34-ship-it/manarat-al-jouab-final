/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  BookOpen, 
  Play, 
  ChevronRight, 
  Plus, 
  Minus, 
  Search,
  Volume2
} from 'lucide-react';
import { Surah, Verse } from '../types';
import { fetchSurahs, fetchSurahDetail, getSurahAudioUrl } from '../services/quranService';

export const QuranView = ({ onPlay }: { onPlay: (url: string, title: string) => void }) => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchSurahs().then(setSurahs);
  }, []);

  const filtered = surahs.filter(s => 
    s.name.includes(search) || 
    s.englishName.toLowerCase().includes(search.toLowerCase()) ||
    s.number.toString().includes(search)
  );

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gold">القرآن الكريم</h2>
        <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center text-gold">
          <BookOpen size={24} />
        </div>
      </div>

      <div className="relative">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gold/50" size={20} />
        <input 
          type="text"
          placeholder="ابحث عن سورة..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pr-12 pl-4 text-white outline-none focus:border-gold/50 transition-all text-right"
        />
      </div>

      <div className="grid gap-3">
        {filtered.map(surah => (
          <div 
            key={surah.number} 
            onClick={() => navigate(`/quran/${surah.number}`)}
            className="glass p-4 rounded-2xl flex items-center justify-between hover:bg-white/5 cursor-pointer transition-all border border-white/5 hover:border-gold/30 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center text-gold font-bold border border-gold/20 group-hover:bg-gold group-hover:text-royal-blue transition-colors">
                {surah.number}
              </div>
              <div>
                <h3 className="font-bold text-lg">{surah.name}</h3>
                <p className="text-xs text-gold/60">{surah.englishName} • {surah.numberOfAyahs} آية</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a 
                href={`https://quran.com/${surah.number}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="px-4 py-2 bg-royal-blue border border-gold/30 rounded-xl text-gold text-xs font-bold hover:bg-gold hover:text-royal-blue transition-all flex items-center gap-2"
              >
                <BookOpen size={14} />
                <span>قراءة</span>
              </a>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onPlay(getSurahAudioUrl(surah.number), `سورة ${surah.name}`);
                }}
                className="w-12 h-12 rounded-xl flex items-center justify-center bg-royal-blue text-gold border border-gold/30 hover:bg-gold hover:text-royal-blue transition-all shadow-lg shadow-gold/10 group/btn"
                title="استماع"
              >
                <Volume2 className="w-6 h-6 group-hover/btn:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SurahDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState<{ surah: Surah; verses: Verse[] } | null>(null);
  const [fontSize, setFontSize] = useState(24);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchSurahDetail(Number(id)).then(setData);
    }
  }, [id]);

  useEffect(() => {
    if (data) {
      const maxPage = Math.max(...data.verses.map(v => v.page));
      const saved = localStorage.getItem('user_stats');
      const stats = saved ? JSON.parse(saved) : { totalTasbih: 0, khatmaProgress: 0, pagesRead: 0, favoritesCount: 0, lastQuizDate: null };
      
      if (maxPage > stats.pagesRead) {
        const newStats = { ...stats, pagesRead: maxPage };
        localStorage.setItem('user_stats', JSON.stringify(newStats));
      }
    }
  }, [data]);

  if (!data) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6 pb-32">
      <div className="flex items-center justify-between sticky top-0 bg-royal-blue/80 backdrop-blur-lg py-4 z-10">
        <button onClick={() => navigate(-1)} className="p-2 glass rounded-xl text-gold"><ChevronRight /></button>
        <h2 className="text-2xl font-bold font-amiri text-gold">{data.surah.name}</h2>
        <div className="flex gap-2">
          <button onClick={() => setFontSize(s => Math.min(s + 2, 40))} className="p-2 glass rounded-xl text-gold"><Plus size={18} /></button>
          <button onClick={() => setFontSize(s => Math.max(s - 2, 16))} className="p-2 glass rounded-xl text-gold"><Minus size={18} /></button>
        </div>
      </div>

      <div className="text-center p-8 glass rounded-3xl border-gold/20">
        <p className="text-3xl font-amiri text-gold">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
      </div>

      <div className="space-y-4">
        {data.verses.map(verse => (
          <div key={verse.number} className="bg-white p-6 rounded-2xl shadow-lg border-r-4 border-gold">
            <p 
              className="text-royal-blue font-amiri leading-loose text-right" 
              style={{ fontSize: `${fontSize}px` }}
            >
              {verse.text}
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-gold/30 text-gold text-sm font-bold mr-3 font-sans">
                {verse.numberInSurah}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
