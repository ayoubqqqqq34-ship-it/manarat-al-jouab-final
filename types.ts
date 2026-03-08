// ... (Verse و Surah يبقاو كيما راهم، راهم 10/10)

export interface UserStats {
  totalTasbih: number;
  khatmaProgress: number; 
  pagesRead: number;
  favoritesCount: number;
  lastQuizDate: string | null; 
  quizAttemptsThisWeek: number; // ركيزة لمتابعة شرط "مرة في الأسبوع"
  streak: number;
  lastActiveDate: string | null; 
}

export interface Dhikr {
  id: number;
  text: string;
  count: number;
  target: number;
  category: 'sabah' | 'masa' | 'after_prayer' | 'general'; // لتنظيم الواجهة
  description?: string; // فضل الذكر
}

export interface PrayerTime {
  id: string;
  name: string;
  time: string;
  date: Date;
  isNext?: boolean; // لتغيير لون الصلاة القادمة في الواجهة
}

// إضافة ركيزة للكويز (Quiz) بما أنك مهتم بيه
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string; // "المنارة" لازم تعلم الناس معلومة جديدة
}

