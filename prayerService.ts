import { Coordinates, CalculationMethod, PrayerTimes, Qibla } from 'adhan';

// إحداثيات جواب الدقيقة
const JOUAB_COORDS = new Coordinates(36.1306, 3.4144);

export const getPrayerTimes = (date: Date) => {
  // استخدام طريقة "معهد المسح الجيولوجي المصري" وهي الأقرب للجزائر
  const params = CalculationMethod.Egyptian();
  params.fajrAngle = 18; // الضبط المعمول به في الجزائر غالباً
  params.ishaAngle = 17;

  const prayerTimes = new PrayerTimes(JOUAB_COORDS, date, params);

  // جلب المعايرة اليدوية من localStorage (إذا حب المستخدم يزيد أو ينقص دقائق)
  const savedCalibration = localStorage.getItem('prayer_calibration');
  const cal = savedCalibration ? JSON.parse(savedCalibration) : {
    fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0
  };

  // دالة لإضافة الدقائق يدوياً
  const adjust = (time: Date, minutes: number) => {
    return new Date(time.getTime() + minutes * 60000);
  };

  return {
    fajr: adjust(prayerTimes.fajr, cal.fajr),
    dhuhr: adjust(prayerTimes.dhuhr, cal.dhuhr),
    asr: adjust(prayerTimes.asr, cal.asr),
    maghrib: adjust(prayerTimes.maghrib, cal.maghrib),
    isha: adjust(prayerTimes.isha, cal.isha),
  };
};

// حساب القبلة لجواب
export const getJouabQibla = () => {
  return Qibla(JOUAB_COORDS);
};
