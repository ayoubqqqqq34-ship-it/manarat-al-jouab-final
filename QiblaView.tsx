/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Target, Compass } from 'lucide-react';
import { motion } from 'framer-motion'; // تأكد من التوافق مع مكتبتك
import { calculateQibla } from './services/prayerService'; // تصحيح المسار

const QiblaView = () => {
  const [heading, setHeading] = useState(0);
  const [qiblaDir, setQiblaDir] = useState(0);
  const [hasPermission, setHasPermission] = useState(false);

  // إحداثيات بلدية جواب لضبط اتجاه القبلة بدقة
  const JOUAB_LAT = 36.1444;
  const JOUAB_LNG = 3.4357;

  useEffect(() => {
    // حساب اتجاه القبلة بناءً على موقع جواب
    const q = calculateQibla(JOUAB_LAT, JOUAB_LNG);
    setQiblaDir(q);

    const handleOrientation = (e: any) => {
      // التعامل مع نظام iOS (webkit) والأندرويد (alpha)
      const compassHeading = e.webkitCompassHeading || (360 - e.alpha);
      if (compassHeading) {
        setHeading(compassHeading);
      }
    };

    if (hasPermission) {
      window.addEventListener('deviceorientation', handleOrientation);
    }
    
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [hasPermission]);

  const requestPermission = async () => {
    // طلب إذن الوصول للمستشعرات (ضروري للآيفون)
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const response = await (DeviceOrientationEvent as any).requestPermission();
        if (response === 'granted') setHasPermission(true);
      } catch (e) {
        console.error("Permission denied");
      }
    } else {
      // للأندرويد والمتصفحات العادية
      setHasPermission(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-12 px-6">
      {!hasPermission ? (
        <div className="glass p-8 rounded-[40px] border-gold/20 text-center space-y-6">
          <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center text-gold mx-auto animate-bounce">
            <Compass size={40} />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gold font-amiri">تفعيل البوصلة</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              نحتاج للوصول إلى مستشعرات الهاتف لتحديد اتجاه القبلة بدقة في مكانك.
            </p>
          </div>
          <button 
            onClick={requestPermission}
            className="w-full p-4 bg-gold text-royal-blue font-bold rounded-2xl shadow-lg active:scale-95 transition-all"
          >
            تفعيل الآن
          </button>
        </div>
      ) : (
        <>
          <div className="relative w-80 h-80">
            {/* الدوائر الزخرفية */}
            <div className="absolute inset-0 border-[6px] border-gold/5 rounded-full" />
            <div className="absolute inset-4 border border-gold/20 rounded-full shadow-[0_0_30px_rgba(212,168,67,0.1)]" />
            
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: -heading }}
              transition={{ type: 'spring', damping: 20, stiffness: 60 }}
            >
              <div className="w-full h-full relative">
                {/* الاتجاهات الأربعة */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 text-gold font-bold text-lg">N</div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/20 font-bold">S</div>
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 font-bold">W</div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 font-bold">E</div>
                
                {/* سهم القبلة الذهبي */}
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ rotate: qiblaDir }}
                >
