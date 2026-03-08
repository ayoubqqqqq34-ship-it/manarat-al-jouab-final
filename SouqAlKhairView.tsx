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
  Phone 
} from 'lucide-react';
import { cn } from '../lib/utils';
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

export const SouqAlKhairView = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<CharityRequest[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', need: '', category: 'medicines' as const });

  useEffect(() => {
    const saved = localStorage.getItem('souq_requests');
    if (saved) setRequests(JSON.parse(saved));
  }, []);

  const saveRequests = (newRequests: CharityRequest[]) => {
    setRequests(newRequests);
    localStorage.setItem('souq_requests', JSON.stringify(newRequests));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReq: CharityRequest = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      status: 'pending',
      timestamp: Date.now()
    };
    saveRequests([...requests, newReq]);
    setFormData({ name: '', phone: '', need: '', category: 'medicines' });
    setShowForm(false);
    alert('تم إرسال طلبك بنجاح. سيظهر بعد مراجعة الإدارة.');
  };

  const categories = {
    medicines: { label: 'أدوية', icon: <Pill size={20} /> },
    equipment: { label: 'معدات طبية', icon: <Stethoscope size={20} /> },
    aid: { label: 'مساعدات', icon: <HandHelping size={20} /> }
  };

  const approvedRequests = requests.filter(r => r.status === 'approved' || r.status === 'fulfilled');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => navigate(-1)} className="p-3 glass rounded-2xl text-gold">
          <ChevronRight size={24} />
        </button>
        <h2 className="text-2xl font-bold text-gold">سوق الخير</h2>
        <div className="w-12" />
      </div>

      <div className="relative h-48 rounded-[40px] overflow-hidden border border-gold/20 shadow-2xl">
        <JouabImage />
        <div className="absolute inset-0 bg-gradient-to-t from-royal-blue via-transparent to-transparent" />
        <div className="absolute bottom-6 right-6 left-6 text-center">
          <h3 className="text-2xl font-bold text-white drop-shadow-lg">سوق الخير بمدينة جواب</h3>
          <p className="text-gold/80 text-[10px] mt-1 uppercase tracking-widest font-bold">منصة للتكافل والتعاون الاجتماعي</p>
        </div>
      </div>

      {!showForm && (
        <button 
          onClick={() => setShowForm(true)}
          className="w-full p-6 royal-gradient rounded-3xl border border-gold/30 text-white font-bold flex items-center justify-center gap-3 shadow-xl hover:scale-[1.02] transition-all"
        >
          <PlusCircle size={20} />
          <span>طلب مساعدة أو عرض مساهمة</span>
        </button>
      )}

      {showForm && (
        <div className="glass p-8 rounded-[40px] border-gold/20 space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xl text-gold">إضافة طلب جديد</h3>
            <button onClick={() => setShowForm(false)} className="text-white/30"><X /></button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-[10px] text-white/50 text-right uppercase font-bold tracking-widest">الاسم الكامل</label>
              <input 
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-royal-blue/50 border border-white/10 p-4 rounded-2xl text-white text-right outline-none focus:border-gold/50"
                placeholder="أدخل اسمك"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] text-white/50 text-right uppercase font-bold tracking-widest">رقم الهاتف</label>
              <input 
                required
                type="tel"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-royal-blue/50 border border-white/10 p-4 rounded-2xl text-white text-right outline-none focus:border-gold/50 font-mono"
                placeholder="0XXXXXXXXX"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] text-white/50 text-right uppercase font-bold tracking-widest">التصنيف</label>
              <select 
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value as any})}
                className="w-full bg-royal-blue/50 border border-white/10 p-4 rounded-2xl text-white text-right outline-none focus:border-gold/50 appearance-none"
              >
                <option value="medicines">أدوية</option>
                <option value="equipment">معدات طبية</option>
                <option value="aid">مساعدات</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] text-white/50 text-right uppercase font-bold tracking-widest">ما الذي تحتاجه؟</label>
              <textarea 
                required
                value={formData.need}
                onChange={e => setFormData({...formData, need: e.target.value})}
                className="w-full bg-royal-blue/50 border border-white/10 p-4 rounded-2xl text-white text-right outline-none focus:border-gold/50 min-h-[100px]"
                placeholder="اشرح حاجتك بالتفصيل..."
              />
            </div>
            <button type="submit" className="w-full p-4 bg-gold text-royal-blue font-bold rounded-2xl shadow-lg hover:bg-gold/90 transition-all">
              إرسال الطلب
            </button>
          </form>
        </div>
      )}

      <div className="space-y-6">
        {Object.entries(categories).map(([key, cat]) => {
          const catRequests = approvedRequests.filter(r => r.category === key);
          if (catRequests.length === 0) return null;

          return (
            <div key={key} className="space-y-4">
              <div className="flex items-center gap-2 text-gold/60">
                {cat.icon}
                <h3 className="font-bold">{cat.label}</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {catRequests.map(req => (
                  <div key={req.id} className={cn(
                    "glass p-6 rounded-3xl border transition-all",
                    req.status === 'fulfilled' ? "border-green-500/30 bg-green-500/5 opacity-70" : "border-white/5 hover:border-gold/20"
                  )}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center text-gold">
                          <User size={18} />
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-sm">{req.name}</p>
                          <p className="text-[10px] text-white/30 font-mono">{new Date(req.timestamp).toLocaleDateString('ar-SA', { numberingSystem: 'latn' })}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {req.status === 'fulfilled' && (
                          <div className="bg-green-500/20 text-green-400 text-[8px] font-bold px-2 py-1 rounded-full border border-green-500/30 uppercase tracking-widest">
                            تمت التلبية
                          </div>
                        )}
                        <a href={`tel:${req.phone}`} className="p-3 glass rounded-xl text-gold hover:bg-gold/20 transition-all">
                          <Phone size={18} />
                        </a>
                      </div>
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed text-right">{req.need}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {approvedRequests.length === 0 && !showForm && (
          <div className="glass p-12 rounded-[40px] border-white/5 text-center space-y-4">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-white/20 mx-auto">
              <HandHelping size={32} />
            </div>
            <p className="text-white/30 text-sm">لا توجد طلبات معتمدة حالياً</p>
          </div>
        )}
      </div>
    </div>
  );
};
