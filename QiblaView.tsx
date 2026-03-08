/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Target } from 'lucide-react';
import { motion } from 'motion/react';
import { calculateQibla } from '../services/prayerService';

export const QiblaView = () => {
  const [heading, setHeading] = useState(0);
  const [qiblaDir, setQiblaDir] = useState(0);

  useEffect(() => {
    const q = calculateQibla(30.0444, 31.2357); // Cairo
    setQiblaDir(q);

    const handleOrientation = (e: any) => {
      if (e.webkitCompassHeading) {
        setHeading(e.webkitCompassHeading);
      } else if (e.alpha) {
        setHeading(360 - e.alpha);
      }
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-12">
      <div className="relative w-72 h-72">
        <div className="absolute inset-0 border-4 border-gold/20 rounded-full" />
        <div className="absolute inset-4 border border-gold/10 rounded-full" />
        
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: -heading }}
          transition={{ type: 'spring', stiffness: 50 }}
        >
          <div className="w-full h-full relative">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-gold font-bold">N</div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white/30 font-bold">S</div>
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-white/30 font-bold">W</div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-white/30 font-bold">E</div>
            
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: qiblaDir }}
            >
              <div className="w-1 h-32 bg-gold relative rounded-full">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-gold">
                  <Target size={24} />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-gold rounded-full shadow-[0_0_20px_rgba(212,168,67,0.5)]" />
        </div>
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-gold">اتجاه القبلة</h3>
        <p className="text-white/50">قم بتدوير هاتفك حتى يشير السهم الذهبي للأعلى</p>
      </div>
    </div>
  );
};
