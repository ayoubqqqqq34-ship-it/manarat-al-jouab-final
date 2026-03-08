/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Music, Pause, Play, Square, Volume2, VolumeX } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { cn } from './utils'; // تصحيح المسار
import { getPrayerTimes } from './prayerService'; // تصحيح المسار

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
