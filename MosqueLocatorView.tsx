/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, MapPin, ExternalLink } from 'lucide-react';
import JouabImage from './JouabImage';

export const MosqueLocatorView = () => {
  const navigate = useNavigate();
  const [selectedMosque, setSelectedMosque] = useState<any>(null);

  const mosques = [
    {
      id: 'freedom',
      name: 'مسجد الحرية',
      lat: 36.2167,
      lng: 3.4167,
      image: 'https://ais-pre-cfpoge7ywncq3a4aeymyx2-551760400821.europe-west2.run.app/input_file_0.png',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=مسجد+الحرية+جواب'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => navigate(-1)} className="p-3 glass rounded-2xl text-gold">
          <ChevronRight size={24} />
        </button>
        <h2 className="text-2xl font-bold text-gold">مواقع المساجد</h2>
        <div className="w-12" />
      </div>

      <div className="relative w-full aspect-square glass rounded-[40px] border-gold/20 overflow-hidden bg-royal-blue/50">
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            <path d="M0,50 Q25,45 50,50 T100,50" stroke="currentColor" fill="none" className="text-gold" />
            <path d="M50,0 Q45,25 50,50 T50,100" stroke="currentColor" fill="none" className="text-gold" />
          </svg>
        </div>
        
        {mosques.map(mosque => (
          <button 
            key={mosque.id}
            onClick={() => setSelectedMosque(mosque)}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gold rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity animate-pulse" />
              <div className="relative bg-gold text-royal-blue p-3 rounded-full shadow-xl border-4 border-royal-blue">
                <MapPin size={24} fill="currentColor" />
              </div>
            </div>
          </button>
        ))}

        <div className="absolute bottom-6 left-6 right-6 p-4 glass rounded-2xl border border-white/10 text-center">
          <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold">خريطة مدينة جواب التفاعلية</p>
        </div>
      </div>

      {selectedMosque && (
        <div className="glass p-6 rounded-[32px] border-gold/30 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border border-gold/20">
              <JouabImage />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gold">{selectedMosque.name}</h3>
              <p className="text-xs text-white/50">بلدية جواب، ولاية المدية</p>
            </div>
          </div>
          <a 
            href={selectedMosque.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-4 bg-gold text-royal-blue font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
          >
            <ExternalLink size={18} />
            فتح في خرائط جوجل
          </a>
        </div>
      )}
    </div>
  );
};
