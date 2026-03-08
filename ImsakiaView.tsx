/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const ImsakiaView = () => {
  const navigate = useNavigate();
  const imsakiaData = [
    { day: 16, date: '06 مارس', imsak: '05:12', fajr: '05:22', shuruk: '06:54', dhuhr: '12:52', asr: '16:10', maghrib: '18:48', isha: '20:06' },
    { day: 17, date: '07 مارس', imsak: '05:10', fajr: '05:20', shuruk: '06:52', dhuhr: '12:52', asr: '16:11', maghrib: '18:49', isha: '20:07' },
    { day: 18, date: '08 مارس', imsak: '05:09', fajr: '05:19', shuruk: '06:51', dhuhr: '12:51', asr: '16:11', maghrib: '18:50', isha: '20:08' },
    { day: 19, date: '09 مارس', imsak: '05:07', fajr: '05:17', shuruk: '06:49', dhuhr: '12:51', asr: '16:12', maghrib: '18:51', isha: '20:09' },
    { day: 20, date: '10 مارس', imsak: '05:06', fajr: '05:16', shuruk: '06:48', dhuhr: '12:51', asr: '16:12', maghrib: '18:52', isha: '20:10' },
    { day: 21, date: '11 مارس', imsak: '05:04', fajr: '05:14', shuruk: '06:46', dhuhr: '12:51', asr: '16:13', maghrib: '18:53', isha: '20:11' },
    { day: 22, date: '12 مارس', imsak: '05:03', fajr: '05:13', shuruk: '06:45', dhuhr: '12:50', asr: '16:13', maghrib: '18:54', isha: '20:12' },
    { day: 23, date: '13 مارس', imsak: '05:01', fajr: '05:11', shuruk: '06:43', dhuhr: '12:50', asr: '16:14', maghrib: '18:55', isha: '20:13' },
    { day: 24, date: '14 مارس', imsak: '05:00', fajr: '05:10', shuruk: '06:42', dhuhr: '12:50', asr: '16:14', maghrib: '18:56', isha: '20:14' },
    { day: 25, date: '15 مارس', imsak: '04:58', fajr: '05:08', shuruk: '06:40', dhuhr: '12:50', asr: '16:15', maghrib: '18:57', isha: '20:15' },
    { day: 26, date: '16 مارس', imsak: '04:57', fajr: '05:07', shuruk: '06:39', dhuhr: '12:49', asr: '16:15', maghrib: '18:58', isha: '20:16' },
    { day: 27, date: '17 مارس', imsak: '04:55', fajr: '05:05', shuruk: '06:37', dhuhr: '12:49', asr: '16:16', maghrib: '18:59', isha: '20:17' },
    { day: 28, date: '18 مارس', imsak: '04:54', fajr: '05:04', shuruk: '06:36', dhuhr: '12:49', asr: '16:16', maghrib: '19:00', isha: '20:18' },
    { day: 29, date: '19 مارس', imsak: '04:52', fajr: '05:02', shuruk: '06:34', dhuhr: '12:48', asr: '16:17', maghrib: '19:01', isha: '20:19' },
    { day: 30, date: '20 مارس', imsak: '04:51', fajr: '05:01', shuruk: '06:33', dhuhr: '12:48', asr: '16:17', maghrib: '19:02', isha: '20:20' },
  ];

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => navigate(-1)} className="p-3 glass rounded-2xl text-gold">
          <ChevronRight size={24} />
        </button>
        <h2 className="text-2xl font-bold text-gold">إمساكية رمضان</h2>
        <div className="w-12" />
      </div>

      <div className="glass rounded-[40px] border-gold/20 overflow-hidden">
        <div className="bg-gold p-6 text-royal-blue text-center">
          <h3 className="text-xl font-bold">بلدية جواب - ولاية المدية</h3>
          <p className="text-sm font-bold opacity-70">رمضان 1447 هـ / 2026 م</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-white/5 text-gold font-bold">
              <tr>
                <th className="p-4">رمضان</th>
                <th className="p-4">التاريخ</th>
                <th className="p-4">الإمساك</th>
                <th className="p-4">الفجر</th>
                <th className="p-4">المغرب</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {imsakiaData.map((row) => (
                <tr key={row.day} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-mono text-gold">{row.day}</td>
                  <td className="p-4">{row.date}</td>
                  <td className="p-4 font-mono">{row.imsak}</td>
                  <td className="p-4 font-mono">{row.fajr}</td>
                  <td className="p-4 font-mono text-gold font-bold">{row.maghrib}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="p-6 glass rounded-3xl border-white/5 text-center space-y-2">
        <p className="text-xs text-white/50">ملاحظة: هذه المواقيت تقريبية لمركز بلدية جواب</p>
        <p className="text-[10px] text-gold/40">"اللهم بارك لنا في رمضان وتقبل منا الصيام والقيام"</p>
      </div>
    </div>
  );
};
