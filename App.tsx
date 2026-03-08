/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Routes, 
  Route, 
  useLocation, 
  useNavigate 
} from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { 
  Home as HomeIcon, 
  BookOpen, 
  Heart, 
  User, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';

// Components
import { HomeView } from './components/HomeView';
import { QuranView, SurahDetail } from './components/QuranView';
import { AthkarView } from './components/AthkarView';
import { QiblaView } from './components/QiblaView';
import { SebhaView } from './components/SebhaView';
import { SouqAlKhairView } from './components/SouqAlKhairView';
import { MosqueLocatorView } from './components/MosqueLocatorView';
import { ZakatCalculatorView } from './components/ZakatCalculatorView';
import { LibraryView } from './components/LibraryView';
import { CityInfoView } from './components/CityInfoView';
import { ProfileView } from './components/ProfileView';
import { ImsakiaView } from './components/ImsakiaView';
import { AdminDashboardView } from './components/AdminDashboard';
import { PrayerSettingsView } from './components/PrayerSettingsView';
import { NavigationDrawer } from './components/NavigationDrawer';
import { AudioPlayer, AdhanPlayer } from './components/AudioPlayers';
import { PermissionModal } from './components/PermissionModal';
import { SadaqaJariyaModal } from './components/SadaqaJariyaModal';

// Utils
import { cn } from './lib/utils';

const SupplicationsWebView = () => {
  const navigate = useNavigate();
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => navigate(-1)} className="p-3 glass rounded-2xl text-gold">
          <ChevronRight size={24} />
        </button>
        <h2 className="text-2xl font-bold text-gold">أدعية مختارة</h2>
        <div className="w-12" />
      </div>
      <div className="flex-1 glass rounded-[40px] border-gold/20 overflow-hidden relative">
        <iframe 
          src="https://www.duaandazkar.com/" 
          className="w-full h-full border-none"
          title="Supplications"
        />
        <div className="absolute bottom-4 left-4 right-4 flex justify-center">
          <a 
            href="https://www.duaandazkar.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gold text-royal-blue px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-xl"
          >
            <ExternalLink size={18} />
            فتح في المتصفح
          </a>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: 'home', path: '/', icon: <HomeIcon size={24} />, label: 'الرئيسية' },
    { id: 'quran', path: '/quran', icon: <BookOpen size={24} />, label: 'القرآن' },
    { id: 'athkar', path: '/athkar', icon: <Heart size={24} />, label: 'الأذكار' },
    { id: 'profile', path: '/profile', icon: <User size={24} />, label: 'حسابي' },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-royal-blue/80 backdrop-blur-xl border-t border-gold/20 px-6 py-3 z-40">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={cn(
              "flex flex-col items-center gap-1 transition-all",
              location.pathname === item.path ? "text-gold scale-110" : "text-white/40 hover:text-white/60"
            )}
          >
            <div className={cn(
              "p-2 rounded-xl transition-all",
              location.pathname === item.path ? "bg-gold/10 shadow-[0_0_15px_rgba(251,191,36,0.2)]" : ""
            )}>
              {item.icon}
            </div>
            <span className="text-[10px] font-bold">{item.label}</span>
          </button>
        ))}
      </div>
      <div className="text-center mt-2">
        <p className="text-[8px] text-white/20 font-bold uppercase tracking-widest">
          برمجة المهندس دين نصر الدين - مدينة جواب
        </p>
      </div>
    </footer>
  );
};

const App = () => {
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('is_admin') === 'true');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPermissions, setShowPermissions] = useState(() => !localStorage.getItem('permissions_granted'));
  const [showSadaqa, setShowSadaqa] = useState(false);
  const [audioState, setAudioState] = useState<{ url: string; title: string } | null>(null);
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('is_admin', isAdmin.toString());
  }, [isAdmin]);

  useEffect(() => {
    const handleToggleAudio = (e: any) => {
      if (audioState?.url === e.detail.url) {
        setAudioState(null);
      } else {
        setAudioState(e.detail);
      }
    };
    window.addEventListener('toggle-audio', handleToggleAudio);
    return () => window.removeEventListener('toggle-audio', handleToggleAudio);
  }, [audioState]);

  // Show Sadaqa Jariya modal every 5 minutes if on home
  useEffect(() => {
    if (location.pathname === '/') {
      const timer = setTimeout(() => setShowSadaqa(true), 300000);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-royal-blue text-white font-sans selection:bg-gold selection:text-royal-blue overflow-x-hidden" dir="rtl">
      <div className="max-w-md mx-auto px-6 pt-8 pb-32 min-h-screen relative">
        
        <AnimatePresence mode="wait">
          <Routes location={location}>
            <Route path="/" element={<HomeView isAdmin={isAdmin} setIsAdmin={setIsAdmin} onMenuClick={() => setIsMenuOpen(true)} />} />
            <Route path="/quran" element={<QuranView onPlay={(url, title) => setAudioState({ url, title })} />} />
            <Route path="/quran/:id" element={<SurahDetail />} />
            <Route path="/athkar" element={<AthkarView />} />
            <Route path="/qibla" element={<QiblaView />} />
            <Route path="/sebha" element={<SebhaView />} />
            <Route path="/souq" element={<SouqAlKhairView />} />
            <Route path="/mosques" element={<MosqueLocatorView />} />
            <Route path="/zakat" element={<ZakatCalculatorView />} />
            <Route path="/library" element={<LibraryView />} />
            <Route path="/city-info" element={<CityInfoView />} />
            <Route path="/profile" element={<ProfileView />} />
            <Route path="/imsakia" element={<ImsakiaView />} />
            <Route path="/supplications" element={<SupplicationsWebView />} />
            <Route path="/admin" element={<AdminDashboardView />} />
            <Route path="/admin-dashboard" element={<AdminDashboardView />} />
            <Route path="/prayer-settings" element={<PrayerSettingsView />} />
          </Routes>
        </AnimatePresence>

        <Footer />
        
        <NavigationDrawer 
          isOpen={isMenuOpen} 
          onClose={() => setIsMenuOpen(false)} 
          onAdminClick={() => {
            setIsMenuOpen(false);
            window.dispatchEvent(new CustomEvent('open-admin-login'));
          }}
        />

        {audioState && (
          <AudioPlayer 
            url={audioState.url} 
            title={audioState.title} 
            onEnd={() => setAudioState(null)} 
          />
        )}

        <AdhanPlayer />

        {showPermissions && (
          <PermissionModal onComplete={() => {
            localStorage.setItem('permissions_granted', 'true');
            setShowPermissions(false);
          }} />
        )}

        <SadaqaJariyaModal 
          isOpen={showSadaqa} 
          onClose={() => setShowSadaqa(false)} 
        />
      </div>
    </div>
  );
};

export default App;
