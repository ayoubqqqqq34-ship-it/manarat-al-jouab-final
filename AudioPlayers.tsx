/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Music, Pause, Play, Square, Volume2, VolumeX } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { getPrayerTimes } from '../services/prayerService';

interface AthanSettings {
  criticalAlerts: boolean;
  bypassSilence: boolean;
  athanVolume: number;
  athanVoice: string;
}

const DEFAULT_ATHAN_SETTINGS: AthanSettings = {
  criticalAlerts: true,
  bypassSilence: true,
  athanVolume: 1.0,
  athanVoice: 'azan1'
};

export const AudioPlayer = ({ url, title, onEnd }: { url: string; title: string; onEnd?: () => void }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const updateMediaSession = (state: 'playing' | 'paused' | 'none') => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = state;
      if (state !== 'none') {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: title,
          artist: 'منارة مدينة جواب',
          album: 'القرآن الكريم',
          artwork: [
            { src: 'https://picsum.photos/seed/islamic/512/512', sizes: '512x512', type: 'image/png' }
          ]
        });

        navigator.mediaSession.setActionHandler('play', () => {
          audioRef.current?.play();
          setIsPlaying(true);
          updateMediaSession('playing');
        });
        navigator.mediaSession.setActionHandler('pause', () => {
          audioRef.current?.pause();
          setIsPlaying(false);
          updateMediaSession('paused');
        });
        navigator.mediaSession.setActionHandler('stop', () => {
          handleStop();
        });
      } else {
        navigator.mediaSession.metadata = null;
      }
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        updateMediaSession('playing');
      }).catch(() => {
        setIsPlaying(false);
        updateMediaSession('none');
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current.load();
      }
      updateMediaSession('none');
    };
  }, [url]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        updateMediaSession('paused');
      } else {
        audioRef.current.play();
        setIsPlaying(true);
        updateMediaSession('playing');
      }
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = '';
      audioRef.current.load();
    }
    setIsPlaying(false);
    updateMediaSession('none');
    onEnd?.();
  };

  return (
    <div className="fixed bottom-20 left-4 right-4 glass rounded-2xl p-4 flex items-center justify-between z-50 shadow-2xl border-gold/30">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center animate-pulse">
          <Music className="text-royal-blue w-5 h-5" />
        </div>
        <div>
          <p className="text-xs text-gold font-bold">جاري التشغيل</p>
          <p className="text-sm font-medium truncate max-w-[150px]">{title}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={togglePlay} className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-royal-blue hover:scale-110 transition-transform">
          {isPlaying ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}
        </button>
        <button onClick={handleStop} className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center text-red-500 border border-red-500/30 hover:bg-red-500/30 transition-colors">
          <Square size={16} fill="currentColor" />
        </button>
      </div>
      <audio ref={audioRef} onEnded={handleStop} />
    </div>
  );
};

export const AdhanPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [settings, setSettings] = useState<AthanSettings>(() => {
    const saved = localStorage.getItem('athan_settings');
    return saved ? JSON.parse(saved) : DEFAULT_ATHAN_SETTINGS;
  });
  const location = useLocation();

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('athan_settings');
      if (saved) setSettings(JSON.parse(saved));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = settings.athanVolume;
    }
  }, [settings.athanVolume]);

  useEffect(() => {
    let wakeLock: any = null;
    const requestWakeLock = async () => {
      if ('wakeLock' in navigator) {
        try {
          wakeLock = await (navigator as any).wakeLock.request('screen');
        } catch (err) {}
      }
    };

    const checkPrayerTime = () => {
      const now = new Date();
      const pTimes = getPrayerTimes(36.1444, 3.4357, now);
      const currentTime = now.getHours() * 60 + now.getMinutes();
      
      const prayerTimesInMinutes = [
        { name: 'Fajr', time: pTimes.fajr },
        { name: 'Dhuhr', time: pTimes.dhuhr },
        { name: 'Asr', time: pTimes.asr },
        { name: 'Maghrib', time: pTimes.maghrib },
        { name: 'Isha', time: pTimes.isha }
      ].map(p => {
        return { name: p.name, minutes: p.time.getHours() * 60 + p.time.getMinutes() };
      });

      const currentPrayer = prayerTimesInMinutes.find(p => p.minutes === currentTime);
      
      if (currentPrayer && !isPlaying) {
        triggerAthan(currentPrayer.name);
      }
    };

    const triggerAthan = async (prayerName: string) => {
      if (settings.criticalAlerts) {
        if ('vibrate' in navigator) {
          navigator.vibrate([500, 200, 500, 200, 500]);
        }
        
        if (Notification.permission === 'granted') {
          new Notification(`حان وقت صلاة ${prayerName}`, {
            body: `الله أكبر، الله أكبر... حان وقت صلاة ${prayerName} في مدينة جواب`,
            icon: '/favicon.ico',
            requireInteraction: true,
            silent: !settings.bypassSilence
          });
        }
        
        // Schedule via SW for backup
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage({
            type: 'SCHEDULE_NOTIFICATION',
            title: `حان وقت صلاة ${prayerName}`,
            body: `الله أكبر، الله أكبر... حان وقت صلاة ${prayerName} في مدينة جواب`,
            delay: 0
          });
        }
      }

      if (audioRef.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (err) {
          console.error("Audio playback failed:", err);
        }
      }
    };

    requestWakeLock();
    const interval = setInterval(checkPrayerTime, 60000);

    return () => {
      clearInterval(interval);
      if (wakeLock) wakeLock.release();
    };
  }, [settings, isPlaying]);

  const toggleAdhan = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (location.pathname !== '/') {
    return (
      <audio 
        ref={audioRef} 
        src="https://www.islamcan.com/audio/adhan/azan1.mp3" 
        onEnded={() => setIsPlaying(false)}
      />
    );
  }

  return (
    <div className="glass p-6 rounded-3xl border-gold/20 flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <div className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors shadow-lg",
          isPlaying ? "bg-royal-blue text-gold animate-pulse" : "bg-royal-blue/20 text-gold"
        )}>
          <Volume2 size={24} />
        </div>
        <div>
          <h4 className="font-bold text-lg">الأذان الشرعي</h4>
          <p className="text-xs text-white/40">استمع للأذان بصوت ندي</p>
        </div>
      </div>
      <button 
        onClick={toggleAdhan}
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all active:scale-90",
          isPlaying ? "bg-red-500 text-white" : "bg-royal-blue text-gold border border-gold/30"
        )}
      >
        {isPlaying ? <VolumeX size={28} /> : <Volume2 size={28} />}
      </button>
      <audio 
        ref={audioRef} 
        src="https://www.islamcan.com/audio/adhan/azan1.mp3" 
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
};
