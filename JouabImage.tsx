/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

const JouabImage = () => {
  return (
    <div className="w-full h-full overflow-hidden relative group">
      {/* طبقة تظليل خفيفة لتحسين قراءة النصوص فوق الصورة إذا لزم الأمر */}
      <div className="absolute inset-0 bg-gradient-to-t from-royal-blue/40 to-transparent z-10 opacity-60" />
      
      <img 
        src="https://ais-pre-cfpoge7ywncq3a4aeymyx2-551760400821.europe-west2.run.app/input_file_0.png" 
        alt="مسجد مدينة جواب" 
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        referrerPolicy="no-referrer"
        loading="lazy"
      />
      
      {/* إطار داخلي ناعم يتماشى مع تصميم التطبيق */}
      <div className="absolute inset-0 border border-white/10 z-20 pointer-events-none rounded-[inherit]" />
    </div>
  );
};

export default JouabImage;
