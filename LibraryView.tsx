/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, Library, CheckCircle2, ExternalLink } from 'lucide-react';

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

export const LibraryView = () => {
  return (
    <div className="space-y-4">
      <div className="glass p-6 rounded-3xl border-gold/20 mb-6">
        <h3 className="text-xl font-bold text-gold mb-2">المكتبة الإسلامية الموثوقة</h3>
        <p className="text-sm text-white/50">مجموعة مختارة من الكتب والمصادر الإسلامية الموثوقة للقراءة والتحميل.</p>
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
              <div>
                <h4 className="font-bold text-lg">{resource.title}</h4>
                <p className="text-xs text-white/40">{resource.description}</p>
              </div>
            </div>
            <ExternalLink size={18} className="text-gold/50" />
          </a>
        ))}
      </div>
    </div>
  );
};
