/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  PlusCircle, 
  X, 
  Pill, 
  Stethoscope, 
  HandHelping, 
  User, 
  Phone,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { cn } from './utils';
import JouabImage from './JouabImage';

interface CharityRequest {
  id: string;
  name: string;
  phone: string;
  need: string;
  category: 'medicines' | 'equipment' | 'aid';
  status: 'pending' | 'approved' | 'fulfilled';
  timestamp: number;
}

const SouqAlKhairView = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<CharityRequest[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', need: '', category: 'medicines' as const });

  useEffect(() => {
    const saved = localStorage.getItem('souq_requests');
    if (saved) {
      try {
        setRequests(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing requests");
      }
    }
  }, []);

  const saveRequests = (newRequests: CharityRequest[]) => {
    setRequests(newRequests);
    localStorage.setItem('souq_requests', JSON.stringify(newRequests));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReq: CharityRequest = {
      id: Math.random().toString(36).substring(2, 9),
      ...formData,
      status: 'approved', // جعلناها 'approved' تلقائياً للتجربة، في الواقع تحتاج مراجعة
      timestamp: Date.now()
    };
    saveRequests([...requests, newReq]);
    
    // تحديث إحصائيات المستخدم (إضافة وسام محب الخير)
    const savedStats = localStorage.getItem('user_stats');
    if (savedStats) {
      const stats = JSON.parse(savedStats);
      localStorage.setItem('user_stats', JSON.stringify({ ...stats, favoritesCount: (stats.favoritesCount || 0) + 1 }));
    }

    setFormData({ name: '', phone: '', need: '', category: 'medicines' });
    setShowForm(false);
    alert('تم إرسال طلبك بنجاح. شكراً لمساهمتك في خير مدينة جواب.');
  };

  const categories = {
    medicines: { label: 'أدوية', icon: <Pill size={20} />, color: 'text-rose-400' },
    equipment: { label: 'معدات طبية', icon: <Stethoscope size={20} />, color: 'text-sky-400' },
    aid: { label: 'مساعدات', icon: <HandHelping size={20} />, color: 'text-emerald-400' }
  };

  const approvedRequests = requests.filter(r => r.status === 'approved' || r.status === 'fulfilled');

  return (
    <div className="space-y-8 pb-24 px-1">
      {/* رأس الصفحة */}
      <div className="flex items-center justify-between pt-4">
        <button onClick={() => navigate(-1)} className="p-3 glass rounded-2xl text-gold active:scale-90 transition-transform shadow-lg">
          <ChevronRight size={24} />
        </button>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gold font-amiri">سوق الخير</h2>
          <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">التكافل الاجتماعي بجواب</p>
        </div>
        <div className="w-12" />
      </div>

      {/* بطاقة الواجهة الفنية */}
      <div className="relative h-56 rounded-[48px] overflow-hidden border-2 border-gold/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] group">
        <JouabImage />
        <div className="absolute inset-0 bg-gradient-to-t from-royal-blue via-royal-blue/40 to-transparent" />
        <div className="absolute bottom-8 right-8 left-8 text-right space-y-2">
          <div className="bg-gold/20 backdrop-blur-md px-3 py-1 rounded-full border border-gold/30 inline-block">
            <span className="text-gold text-[10px] font-bold uppercase tracking-widest">مبادرة محلية</span>
          </div>
          <h3 className="text-3xl font-bold text-white font-amiri drop-shadow-xl">تراحموا تصحوا</h3>
          <p className="text-white/60 text-xs leading-relaxed max-w-[80%]">منصة مخصصة لأهلنا في مدينة جواب لطلب المساعدات الطبية أو عرض المساهمات الخيرية.</p>
        </div>
      </div>

      {!showForm ? (
        <button 
          onClick={() => setShowForm(true)}
          className="w-full p-6 bg-gradient-to-r from-gold to-yellow-600 rounded-[32px] text-royal-blue font-bold flex items-center justify-center gap-4 shadow-2xl hover
