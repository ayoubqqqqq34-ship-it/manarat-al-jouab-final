/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  ChevronLeft, 
  Settings, 
  Lock, 
  Clock, 
  BellRing, 
  ShieldCheck, 
  Zap, 
  Pill, 
  Stethoscope, 
  HandHelping, 
  Phone, 
  Check, 
  Heart, 
  Trash2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface CharityRequest {
  id: string;
  name: string;
  phone: string;
  need: string;
  category: 'medicines' | 'equipment' | 'aid';
  status: 'pending' | 'approved' | 'fulfilled';
  timestamp: number;
}

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

export const AdminLoginModal = ({ isOpen, onClose, onLogin }: { isOpen: boolean; onClose: () => void; onLogin: () => void }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = () => {
    if (password === '41Q52RQ87M2') {
      onLogin();
      onClose();
      setPassword('');
      setError('');
    } else {
      setError('رمز غير صحيح');
      setTimeout(() => setError(''), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-royal-blue/80 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-sm glass p-8 rounded-[40px] border-gold/20 shadow-2xl space-y-6"
          >
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center text-gold mx-auto">
                <Lock size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gold">دخول المسؤول</h3>
              <p className="text-white/50 text-xs">الرجاء إدخال الرمز السري للوصول</p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full glass rounded-2xl p-4 text-center text-white outline-none focus:border-gold transition-all font-mono tracking-widest"
                  placeholder="••••••••"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && handleConfirm()}
                />
                {error && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-6 left-0 right-0 text-center text-red-400 text-[10px] font-bold"
                  >
                    {error}
                  </motion.p>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  onClick={onClose}
                  className="flex-1 p-4 glass rounded-2xl text-white/50 font-bold hover:bg-white/5 transition-all"
                >
                  إلغاء
                </button>
                <button 
                  onClick={handleConfirm}
                  className="flex-[2] p-4 gold-gradient rounded-2xl text-royal-blue font-bold shadow-lg active:scale-95 transition-all"
                >
                  تأكيد الدخول
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const AdminDashboardView = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<CharityRequest[]>([]);
  const [athanSettings, setAthanSettings] = useState<AthanSettings>(() => {
    const saved = localStorage.getItem('athan_settings');
    return saved ? JSON.parse(saved) : DEFAULT_ATHAN_SETTINGS;
  });
  const [prayerTimes, setPrayerTimes] = useState<Record<string, string>>({
    fajr: '05:42 AM',
    dhuhr: '12:57 PM',
    asr: '04:16 PM',
    maghrib: '06:47 PM',
    isha: '08:08 PM'
  });
  const [isSaving, setIsSaving] = useState(false);
  
  useEffect(() => {
    const saved = localStorage.getItem('souq_requests');
    if (saved) setRequests(JSON.parse(saved));
    
    fetch('/api/prayer-times')
      .then(res => res.json())
      .then(setPrayerTimes)
      .catch(err => console.error('Failed to fetch prayer times', err));
  }, []);

  const savePrayerTimes = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/prayer-times', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ times: prayerTimes })
      });
      if (res.ok) {
        alert('تم تحديث مواقيت الصلاة بنجاح');
      }
    } catch (err) {
      alert('فشل في تحديث المواقيت');
    } finally {
      setIsSaving(false);
    }
  };

  const saveRequests = (newRequests: CharityRequest[]) => {
    setRequests(newRequests);
    localStorage.setItem('souq_requests', JSON.stringify(newRequests));
  };

  const saveAthanSettings = (settings: AthanSettings) => {
    setAthanSettings(settings);
    localStorage.setItem('athan_settings', JSON.stringify(settings));
  };

  const approveRequest = (id: string) => {
    const updated = requests.map(r => r.id === id ? { ...r, status: 'approved' as const } : r);
    saveRequests(updated);
  };

  const fulfillRequest = (id: string) => {
    const updated = requests.map(r => r.id === id ? { ...r, status: 'fulfilled' as const } : r);
    saveRequests(updated);
  };

  const deleteRequest = (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا الطلب؟")) {
      const updated = requests.filter(r => r.id !== id);
      saveRequests(updated);
    }
  };

  const categories = {
    medicines: { label: 'أدوية', icon: <Pill size={18} /> },
    equipment: { label: 'معدات طبية', icon: <Stethoscope size={18} /> },
    aid: { label: 'مساعدات', icon: <HandHelping size={18} /> }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => navigate('/')} className="p-3 glass rounded-2xl text-gold">
          <ChevronRight size={24} />
        </button>
        <h2 className="text-2xl font-bold text-gold">لوحة التحكم</h2>
        <div className="w-12" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass p-6 rounded-3xl border-gold/20 text-center">
          <p className="text-white/40 text-[10px] font-bold uppercase mb-1">إجمالي الطلبات</p>
          <h4 className="text-3xl font-bold text-gold font-mono">{requests.length}</h4>
        </div>
        <div className="glass p-6 rounded-3xl border-green-500/20 text-center">
          <p className="text-white/40 text-[10px] font-bold uppercase mb-1">بانتظار المراجعة</p>
          <h4 className="text-3xl font-bold text-green-400 font-mono">
            {requests.filter(r => r.status === 'pending').length}
          </h4>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-lg text-gold flex items-center gap-2">
          <Clock size={20} />
          <span>إدارة مواقيت الصلاة (جرس المسجد)</span>
        </h3>
        <div className="glass p-6 rounded-[32px] border border-gold/20 space-y-4">
          {Object.entries(prayerTimes).map(([name, time]) => (
            <div key={name} className="flex items-center justify-between gap-4">
              <span className="text-gold font-bold w-20 capitalize">{name === 'fajr' ? 'الفجر' : name === 'dhuhr' ? 'الظهر' : name === 'asr' ? 'العصر' : name === 'maghrib' ? 'المغرب' : 'العشاء'}</span>
              <input 
                type="text"
                value={time}
                onChange={(e) => setPrayerTimes({...prayerTimes, [name]: e.target.value})}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 text-center text-white outline-none focus:border-gold font-mono"
                placeholder="00:00 AM/PM"
              />
            </div>
          ))}
          <button 
            onClick={savePrayerTimes}
            disabled={isSaving}
            className="w-full p-4 gold-gradient rounded-2xl text-royal-blue font-bold shadow-lg active:scale-95 transition-all disabled:opacity-50"
          >
            {isSaving ? 'جاري الحفظ...' : 'حفظ المواقيت للجميع'}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-lg text-gold flex items-center gap-2">
          <Settings size={20} />
          <span>التحكم في مواقيت الصلاة</span>
        </h3>
        <button 
          onClick={() => navigate('/prayer-settings')}
          className="w-full p-6 glass rounded-3xl border border-gold/30 text-gold font-bold flex items-center justify-between hover:bg-gold/10 transition-all"
        >
          <div className="flex items-center gap-4">
            <Clock className="text-gold" />
            <span>تعديل مواقيت الصلاة يدوياً</span>
          </div>
          <ChevronLeft size={20} />
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-lg text-gold flex items-center gap-2">
          <BellRing size={20} />
          <span>إعدادات الأذان والتنبيهات</span>
        </h3>

        <div className="glass p-6 rounded-[32px] border border-gold/20 space-y-6">
          <div className="flex items-center justify-between">
            <div className="text-right">
              <p className="font-bold text-sm">تنبيهات حرجة (Critical Alerts)</p>
              <p className="text-[10px] text-white/40">تجاوز وضع السكون وتنبيه قوي</p>
            </div>
            <button 
              onClick={() => saveAthanSettings({...athanSettings, criticalAlerts: !athanSettings.criticalAlerts})}
              className={cn(
                "w-12 h-6 rounded-full transition-all relative",
                athanSettings.criticalAlerts ? "bg-gold" : "bg-white/10"
              )}
            >
              <div className={cn(
                "absolute top-1 w-4 h-4 rounded-full transition-all",
                athanSettings.criticalAlerts ? "right-1 bg-royal-blue" : "right-7 bg-white/30"
              )} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-right">
              <p className="font-bold text-sm">تجاوز وضع الصامت (Bypass Silence)</p>
              <p className="text-[10px] text-white/40">تشغيل الأذان حتى لو كان الهاتف صامتاً</p>
            </div>
            <button 
              onClick={() => saveAthanSettings({...athanSettings, bypassSilence: !athanSettings.bypassSilence})}
              className={cn(
                "w-12 h-6 rounded-full transition-all relative",
                athanSettings.bypassSilence ? "bg-gold" : "bg-white/10"
              )}
            >
              <div className={cn(
                "absolute top-1 w-4 h-4 rounded-full transition-all",
                athanSettings.bypassSilence ? "right-1 bg-royal-blue" : "right-7 bg-white/30"
              )} />
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gold">{Math.round(athanSettings.athanVolume * 100)}%</span>
              <p className="font-bold text-sm text-right">مستوى صوت الأذان</p>
            </div>
            <input 
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={athanSettings.athanVolume}
              onChange={(e) => saveAthanSettings({...athanSettings, athanVolume: parseFloat(e.target.value)})}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold"
            />
          </div>

          <div className="p-4 bg-gold/5 rounded-2xl border border-gold/10 flex items-center gap-3">
            <Zap size={16} className="text-gold" />
            <p className="text-[10px] text-white/50 leading-relaxed">
              ملاحظة: تتطلب هذه الميزات بقاء التطبيق مفتوحاً في الخلفية أو استخدامه كـ PWA.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-lg text-gold flex items-center gap-2">
          <ShieldCheck size={20} />
          <span>إدارة طلبات سوق الخير</span>
        </h3>

        {requests.length === 0 ? (
          <div className="glass p-12 rounded-[40px] text-center border-dashed border-white/10">
            <p className="text-white/30 italic">لا توجد طلبات حالياً</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.sort((a, b) => b.timestamp - a.timestamp).map(req => (
              <div key={req.id} className={cn(
                "glass p-6 rounded-[32px] border transition-all",
                req.status === 'pending' ? "border-yellow-500/30 bg-yellow-500/5" : 
                req.status === 'fulfilled' ? "border-green-500/30 bg-green-500/5 opacity-80" : "border-white/5"
              )}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center text-gold">
                      {categories[req.category].icon}
                    </div>
                    <div>
                      <h5 className="font-bold text-sm">{req.name}</h5>
                      <p className="text-[10px] text-white/30 font-mono">
                        {new Date(req.timestamp).toLocaleDateString('ar-SA', { numberingSystem: 'latn' })}
                      </p>
                    </div>
                  </div>
                  <div className={cn(
                    "px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest border",
                    req.status === 'pending' ? "bg-yellow-500/20 text-yellow-500 border-yellow-500/30" : 
                    req.status === 'fulfilled' ? "bg-green-500/20 text-green-500 border-green-500/30" : "bg-gold/20 text-gold border-gold/30"
                  )}>
                    {req.status === 'pending' ? 'بانتظار المراجعة' : req.status === 'fulfilled' ? 'تمت التلبية' : 'معتمد'}
                  </div>
                </div>
                
                <p className="text-sm text-white/80 leading-relaxed mb-4 text-right">{req.need}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <a href={`tel:${req.phone}`} className="flex items-center gap-2 text-gold font-bold text-xs">
                    <Phone size={14} />
                    <span className="font-mono">{req.phone}</span>
                  </a>
                  
                  <div className="flex gap-2">
                    {req.status === 'pending' && (
                      <button 
                        onClick={() => approveRequest(req.id)}
                        className="w-10 h-10 bg-green-500/20 text-green-400 rounded-xl flex items-center justify-center hover:bg-green-500/30 transition-all"
                        title="موافقة"
                      >
                        <Check size={18} />
                      </button>
                    )}
                    {req.status === 'approved' && (
                      <button 
                        onClick={() => fulfillRequest(req.id)}
                        className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center hover:bg-blue-500/30 transition-all"
                        title="تمت التلبية"
                      >
                        <Heart size={18} />
                      </button>
                    )}
                    <button 
                      onClick={() => deleteRequest(req.id)}
                      className="w-10 h-10 bg-red-500/20 text-red-400 rounded-xl flex items-center justify-center hover:bg-red-500/30 transition-all"
                      title="حذف"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
