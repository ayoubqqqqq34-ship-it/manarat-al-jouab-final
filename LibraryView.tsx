/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Library, CheckCircle2, ExternalLink, ChevronRight } from 'lucide-react';

const LIBRARY_RESOURCES = [
  {
    id: 1,
    title: "حصن المسلم",
    description: "من أذكار الكتاب والسنة",
    url: "https://www.hisnmuslim.com/",
    icon: <BookOpen className="text-gold" />
  },
  {
    id: 2,
    title: "تفسير السعدي",
    description: "تيسير الكريم الرحمن في تفسير كلام المنان",
    url: "https://quran.ksu.edu.sa/tafseer/saadi/sura1-aya1.html",
    icon: <Library className="text-gold" />
  },
  {
    id: 3,
    title: "صحيح البخاري",
    description: "الجامع المسند الصحيح المختصر",
    url: "https://sunnah.com/bukhari",
    icon: <CheckCircle2 className="text-gold" />
  }
];

const LibraryView = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => navigate(-1)} className="p-3 glass rounded-2xl text-gold">
          <ChevronRight size={24} />
        </button>
        <h2 className="text-2xl font-bold text-gold">المكتبة</h2>
        <div className="w-12" />
      </div>

      <div className="glass p-6 rounded-[32px] border-gold/20 mb-6 bg-gold/5">
        <h3 className="text-xl font-bold text-gold mb-2 font-amiri text-right">المكتبة الإسلامية</h3>
        <p className="text-sm text-white/50 leading-relaxed text-right">
          مجموعة مختارة من المصادر الإسلامية الموثوقة للقراءة والتعلم.
        </p>
      </div>
      
      <div className="grid gap-4">
        {LIBRARY_RESOURCES.map(resource => (
          <a 
            key={resource.id}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass p-6 rounded-3xl flex items-center justify-between border border-white/5 hover:border-gold/30 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center group-hover:bg-gold group-hover:text-royal-blue transition-colors">
                {resource.icon}
              </div>
              <div className="text-right">
                <h4 className="font-bold text-lg">{resource.title}</h4>
                <p className="text-[10px] text-white/40">{resource.description}</p>
              </div>
            </div>
            <ExternalLink size={18} className="text-gold/50" />
          </a>
        ))}
      </div>

      <div className="text-center mt-8 p-4 opacity-30">
        <p className="text-[10px] font-bold uppercase tracking-widest">المكتبة الرقمية - منارة مدينة جواب</p>
      </div>
    </div>
  );
};

export default LibraryView;
