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
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from './utils';

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
  const [athanSettings, setAthanSettings] = useState<AthanSettings>(() =>
