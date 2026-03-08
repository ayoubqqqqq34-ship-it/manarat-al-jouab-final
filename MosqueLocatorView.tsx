/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, MapPin, ExternalLink } from 'lucide-react';
import JouabImage from './JouabImage';

const MosqueLocatorView = () => {
  const navigate = useNavigate();
  const [selectedMosque, setSelectedMosque] = useState<any>(null);

  const mosques = [
    {
      id: 'freedom',
      name: 'مسجد الحرية',
      lat: 36.2167,
      lng: 3.4167,
      // نستخدم الصورة التي برمجتها أنت في JouabImage
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=36.1444,3.4357' 
    }
  ];

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => navigate(-1)} className="p-3 glass rounded-2xl text-gold">
          <ChevronRight size={24} />
        </button>
        <h2 className="text-2xl font-bold text-gold">مواقع المساجد</h2>
        <div className="w-12" />
      </div>

      <div className="relative w-full aspect-square glass rounded-[40px] border-gold/20 overflow-hidden bg-royal-blue/30 backdrop-blur-sm">
        {/* تصميم خلفية الخريطة التجريدي */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            <path d="M0,50 Q25,45 50,50 T100,50" stroke="#FBBF24" strokeWidth="0.5" fill="none" />
            <path d="M50,0 Q45,25 50,50 T50,100" stroke="#FBBF24" strokeWidth="0.5" fill="none" />
            <circle cx="50" cy="50" r="30" stroke="#FBBF24" strokeWidth="0.2" fill="none" opacity="0.5" />
          </svg>
        </div>
        
        {mosques.map(mosque => (
          <button 
            key={mosque.id}
            onClick={() => setSelectedMosque(mosque)}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group z-10"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gold rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity animate-pulse" />
              <div className="relative bg-gold text-royal-blue p-3 rounded-full shadow-xl border-4 border-royal-blue transform group-hover:scale-110 transition-transform">
                <MapPin size={24} fill="currentColor" />
              </div>
            </div>
          </button>
        ))}

        <div className="absolute bottom-6 left-6 right-6 p-4 glass rounded-2xl border border-white/10 text-center bg-black/20">
          <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold">خريطة مدينة جواب التفاعلية</p>
        </div>
      </div>

      {selectedMosque ? (
        <div className="glass p-6 rounded-[32px] border-gold/30 animate-in fade-in slide-in-from-bottom-4 bg-gold/5">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border border-gold/20 shadow-inner">
              <JouabImage />
            </div>
            <div className="text-right">
              <h3 className="text-xl font-bold text-gold">{selectedMosque.name}</h3>
              <p className="text-xs text-white/40">بلدية جواب، ولاية المدية</p>
            </div>
          </div>
          <a 
            href={selectedMosque.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-4 bg-gold text-royal-blue font-bold rounded-2xl flex items-center justify-center gap-2 shadow-[0_10px_20px_rgba(251,191,36,0.2)] active:scale-95 transition-all"
          >
            <ExternalLink size={18} />
            فتح الموقع في خرائط جوجل
          </a>
        </div>
      ) : (
