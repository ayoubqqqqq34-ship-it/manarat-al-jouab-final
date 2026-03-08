/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.tsx';
import './index.css'; // التأكد من تحميل التنسيقات الذهبية
import { initPrayerTimes } from './prayerService';

// وظيفة لإزالة شاشة التحميل الأولية من الـ HTML
const removeLoader = () => {
  const loader = document.getElementById('initial-loader');
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => loader.remove(), 500);
  }
};

// تهيئة مواقيت الصلاة لمدينة جواب قبل تشغيل الواجهة
initPrayerTimes().then(() => {
  const rootElement = document.getElementById('root');
  
  if (rootElement) {
    createRoot(rootElement).render(
      <StrictMode>
        <Router>
          <App />
        </Router>
      </StrictMode>
    );
    
    // إخفاء اللودر بمجرد بدء الريندر
    removeLoader();
  }
});

/**
 * تسجيل الـ Service Worker (PWA)
 * لضمان عمل التطبيق في المناطق التي تضعف فيها التغطية في جواب
 */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('✅ Manarat Jouab SW registered: ', registration.scope);
      })
      .catch(error => {
        console.log('❌ SW registration failed: ', error);
      });
  });
}
