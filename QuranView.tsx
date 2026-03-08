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
  Volume2,
  Headphones
} from 'lucide-react';
import { cn } from './utils';

// واجهات البيانات للتعامل مع الـ 60 حزباً
interface Surah {
  number: number;
  name: string;
  englishName: string;
  numberOfAyahs: number;
  revelationType: string;
}

interface Verse {
  number: number;
  numberInSurah: number;
  text: string;
  page: number;
}

export const QuranView = ({ onPlay }: { onPlay: (url: string, title: string) => void }) => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://api.alquran.cloud/v1/surah')
      .then(res => res.json())
      .then(data => {
        setSurahs(data.data);
        setLoading(false);
      });
  }, []);

  const filtered = surahs.filter(s => 
    s.name.includes(search) || 
    s.englishName.toLowerCase().includes(search.toLowerCase()) ||
    s.number.toString().includes(search)
  );

  return (
    <div className="space-y-6 pb-24">
      <div className="flex items-center justify-between pt-4">
        <h2 className="text-3xl font-bold text-gold font-amiri">المصحف الشريف</h2>
        <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold border border-gold/20 shadow-inner">
          <BookOpen size={28} />
        </div>
      </div>

      <div className="relative group">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gold/40 group-focus-within:text-gold transition-colors" size={20} />
        <input 
          type="text"
          placeholder="ابحث عن سورة (مثلاً: الكهف)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-[20px] py-5 pr-14 pl-6 text-white outline-none focus:border-gold/50 focus:bg-white/10 transition-all text-right font-amiri text-lg shadow-xl"
        />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-12 h-12 border-4 border-gold/20 border-t-gold rounded-full animate-spin" />
          <p className="text-gold/50 font-bold animate-pulse">جاري تحميل السور...</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map(surah => (
            <div 
              key={surah.number} 
              onClick={() => navigate(`/quran/${surah.number}`)}
              className="glass p-5 rounded-[28px] flex items-center justify-between hover:bg-gold/5 cursor-pointer transition-all border border-white/5 hover:border-gold/30 group shadow-lg"
            >
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold font-bold border border-gold/20 group-hover:bg-gold group-hover:text-royal-blue transition-all duration-500 font-mono text-lg">
                  {surah.number}
                </div>
                <div className="text-right">
                  <h3 className="font-bold text-xl text-white font-amiri">{surah.name}</h3>
                  <p className="text-[10px] text-gold/40 font-bold uppercase tracking-widest">
                    {surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'} • {surah.numberOfAyahs} آية
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    // استخدام صوت الشيخ محمود خليل الحصري للجودة والوضوح
                    const audioUrl = `https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${surah.number}.mp3`;
                    onPlay(audioUrl, `سورة ${surah.name}`);
                  }}
                  className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gold/10 text-gold border border-gold/20 hover:bg-gold hover:text-royal-blue transition-all active:scale-90"
                  title="استماع بصوت العفاسي"
                >
                  <Headphones size={22} />
                </button>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white/20 group-hover:text-gold transition-colors">
                  <ChevronRight className="rotate-180" size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const SurahDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState<{ surah: Surah; verses: Verse[] } | null>(null);
  const [fontSize, setFontSize] = useState(26);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // جلب السورة كاملة بآياتها
      fetch(`https://api.alquran.cloud/v1/surah/${id}`)
        .then(res => res.json())
        .then(resData => {
          setData({
            surah: resData.data,
            verses: resData.data.ayahs
          });

          // تحديث إحصائيات القراءة في الملف الشخصي
          const saved = localStorage.getItem('user_stats');
          if (saved) {
            const stats = JSON.parse(saved);
            const newStats = { ...stats, pagesRead: stats.pagesRead + 1 };
            localStorage.setItem('user_stats', JSON.stringify(newStats));
          }
        });
    }
  }, [id]);

  if (!data) return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <div className="w-12 h-12 border-4 border-gold/10 border-t-gold rounded-full animate-spin" />
      <span className="text-gold font-bold">فتح المصحف...</span>
    </div>
  );

  return (
    <div className="space-y-6 pb-32 px-1">
      <div className="flex items-center justify-between sticky top-0 bg-royal-blue/90 backdrop-blur-xl py-6 z-50 border-b border-white/5 px-2">
        <button onClick={() => navigate(-1)} className="p-3 glass rounded-2xl text-gold active:scale-90 transition-transform">
          <ChevronRight size={24} />
        </button>
        <div className="text-center">
          <h2 className="text-2xl font-bold font-amiri text-gold">{data.surah.name}</h2>
          <p className="text-[10px] text-white/30 font-bold uppercase">سورة {data.surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setFontSize(s => Math.min(s + 2, 44))} className="w-10 h-10 glass rounded-xl text-gold flex items-center justify-center font-bold">+</button>
          <button onClick={() => setFontSize(s => Math.max(s - 2, 18))} className="w-10 h-10 glass rounded-xl text-gold flex items-center justify-center font-bold">-</button>
        </div>
      </div>

      {data.surah.number !== 1 && data.surah.number !== 9 && (
        <div className="text-center py-10 glass rounded-[40px] border-gold/10 shadow-2xl mx-2">
          <p className="text-4xl font-amiri text-gold drop-shadow-md">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
        </div>
      )}

      <div className="space-y-4 px-2">
        <div className="bg-white/95 p-8 rounded-[35px] shadow-2xl border-r-[10px] border-gold relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-gold/5 rounded-full -ml-16 -mt-16 blur-2xl" />
          <p 
            className="text-royal-blue font-amiri leading-[2.2] text-right dir-rtl" 
            style={{ fontSize: `${fontSize}px` }}
          >
            {data.verses.map(verse => (
              <React.Fragment key={verse.number}>
                {verse.text.replace('بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ', '')}
                <span className="inline-flex items-center justify-center w-10 h-10 mx-2 translate-y-1">
                  <span className="absolute text-[12px] font-bold font-sans text-gold/80">{verse.numberInSurah}</span>
                  <svg viewBox="0 0 100 100" className="w-full h-full text-gold/20 fill-current">
                    <path d="M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z" />
                  </svg>
                </span>
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>

      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-auto">
        <div className="glass px-6 py-3 rounded-full border border-gold/30 flex items-center gap-3 shadow-2xl">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
          <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">يتم الآن تسجيل أجر القراءة</span>
        </div>
      </div>
    </div>
  );
};
