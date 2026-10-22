import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SAUDI_CITIES } from '../data/citiesData';
import {
  X,
  Ruler,
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Truck
} from 'lucide-react';

export const TechnicianBookingModal: React.FC = () => {
  const {
    t,
    isTechnicianModalOpen,
    setIsTechnicianModalOpen,
    bookTechnician
  } = useApp();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('05');
  const [city, setCity] = useState(SAUDI_CITIES[0].nameAr);
  const [district, setDistrict] = useState(SAUDI_CITIES[0].popularDistrictsAr[0]);
  const [preferredDate, setPreferredDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [preferredTime, setPreferredTime] = useState('evening');
  const [windowCount, setWindowCount] = useState(4);
  const [notes, setNotes] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState('');

  if (!isTechnicianModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || phone.length < 9) {
      alert(t('يرجى كتابة الاسم ورقم الجوال السعودي', 'Please enter your name and phone'));
      return;
    }

    const req = bookTechnician({
      customerName,
      phone,
      city,
      district,
      preferredDate,
      preferredTime: preferredTime === 'evening' ? t('الفترة المسائية (بعد العصر 4-9 م)', 'Evening (4-9 PM)') : t('الفترة الصباحية (9 ص - 1 م)', 'Morning (9 AM - 1 PM)'),
      windowCount,
      notes
    });

    setBookingId(req.id);
    setBookingConfirmed(true);
  };

  const handleClose = () => {
    setIsTechnicianModalOpen(false);
    setBookingConfirmed(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-amber-500/10">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-amber-600" />
            <div>
              <h3 className="text-base font-bold text-neutral-900">
                {t('طلب زيارة فني لأخذ المقاسات مجاناً بالمنزل', 'Book Free Home Measurement Visit')}
              </h3>
              <p className="text-[11px] text-amber-800">
                {t('يصلك الفني بكتالوج عينات الأقمشة الحقيقية حتى باب بيتك', 'Our technician brings physical fabric swatches to your door')}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-xl text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          {bookingConfirmed ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full font-bold">
                  {t('رقم حجز الموعد: ', 'Booking ID: ')}{bookingId}
                </span>
                <h4 className="text-xl font-black text-neutral-900 mt-2">
                  {t('تم تسجيل طلب الزيارة بنجاح!', 'Measurement Visit Booked Successfully!')}
                </h4>
                <p className="text-xs text-neutral-600 mt-1 max-w-sm mx-auto leading-relaxed">
                  {t(
                    `أهلاً بك يا ${customerName}! سيتصل بك منسق المواعيد في ${city} لتأكيد الساعة المناسبة وتزويدك ببيانات الفني الزائر. الزيارة مجانية 100% وبدون أي التزام بالشراء.`,
                    `Welcome ${customerName}! Our coordinator in ${city} will call you shortly to confirm the appointment. The visit is 100% free with zero purchase obligation.`
                  )}
                </p>
              </div>

              <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200 text-xs text-neutral-700 text-start space-y-1">
                <div><strong>{t('المدينة والحي:', 'Location:')}</strong> {city} - {district}</div>
                <div><strong>{t('التاريخ المفضل:', 'Date:')}</strong> {preferredDate}</div>
                <div><strong>{t('عدد الشبابيك التقديري:', 'Windows:')}</strong> {windowCount} {t('شبابيك', 'windows')}</div>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-3 px-4 rounded-xl bg-neutral-900 text-white font-bold text-xs"
              >
                {t('تم، إغلاق', 'Done, Close')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Promo Perks Banner */}
              <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200 text-xs text-neutral-700 space-y-1.5">
                <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t('ماذا تشمل الزيارة المجانية؟', 'What does the free visit include?')}</span>
                </div>
                <ul className="text-[11px] text-neutral-600 space-y-1 list-disc list-inside">
                  <li>{t('أخذ مقاسات الشبابيك بالليزر بدقة المليمتر', 'Laser precision window measurement')}</li>
                  <li>{t('إحضار كتالوج عينات الأقمشة (بلاك أوت، صن سكرين، زيبرا)', 'Full physical fabric swatch sample books')}</li>
                  <li>{t('استشارة ديكور مجانية واختيار أفضل جهة للسلسلة أو المحرك', 'Free interior advice on chain placement & smart motors')}</li>
                </ul>
              </div>

              {/* Name & Phone */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">{t('الاسم الكريم', 'Full Name')} *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute right-3 rtl:right-3 rtl:left-auto ltr:left-3 ltr:right-auto top-3" />
                  <input
                    type="text"
                    required
                    placeholder={t('مثال: أحمد الدوسري', 'e.g. Ahmed Al-Dosari')}
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded-xl px-10 py-2.5 text-sm text-neutral-900 focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">{t('رقم الجوال للتنسيق', 'Saudi Mobile Number')} *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-400 absolute right-3 rtl:right-3 rtl:left-auto ltr:left-3 ltr:right-auto top-3" />
                  <input
                    type="tel"
                    dir="ltr"
                    required
                    placeholder="05X XXX XXXX"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded-xl px-10 py-2.5 text-sm font-mono text-neutral-900 focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* City and District */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">{t('المدينة', 'City')}</label>
                  <select
                    value={city}
                    onChange={e => {
                      setCity(e.target.value);
                      const cityObj = SAUDI_CITIES.find(c => c.nameAr === e.target.value);
                      if (cityObj && cityObj.popularDistrictsAr.length > 0) {
                        setDistrict(cityObj.popularDistrictsAr[0]);
                      }
                    }}
                    className="w-full bg-white border border-neutral-300 rounded-xl px-3 py-2 text-xs font-bold text-neutral-900 focus:ring-2 focus:ring-amber-500"
                  >
                    {SAUDI_CITIES.map(c => (
                      <option key={c.id} value={c.nameAr}>{t(c.nameAr, c.nameEn)}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">{t('الحي', 'District')}</label>
                  <input
                    type="text"
                    required
                    value={district}
                    onChange={e => setDistrict(e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded-xl px-3 py-2 text-xs text-neutral-900 focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">{t('التاريخ المفضل', 'Date')}</label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={e => setPreferredDate(e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded-xl px-3 py-2 text-xs font-mono text-neutral-900 focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">{t('الوقت المفضل', 'Time')}</label>
                  <select
                    value={preferredTime}
                    onChange={e => setPreferredTime(e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded-xl px-3 py-2 text-xs font-bold text-neutral-900 focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="evening">{t('مسائي (4 - 9 مساءً)', 'Evening (4-9 PM)')}</option>
                    <option value="morning">{t('صباحي (9 ص - 1 ظهراً)', 'Morning (9 AM-1 PM)')}</option>
                  </select>
                </div>
              </div>

              {/* Windows count */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  {t('العدد التقريبي للشبابيك المطلوب تفصيلها:', 'Estimated Windows:')}
                </label>
                <div className="flex gap-2">
                  {[2, 4, 6, 8, 12].map(num => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setWindowCount(num)}
                      className={`flex-1 py-1.5 rounded-xl border text-xs font-bold transition ${
                        windowCount === num
                          ? 'bg-neutral-900 text-white border-neutral-900'
                          : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50'
                      }`}
                    >
                      {num === 12 ? '10+' : num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-neutral-950 font-black text-sm shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition active:scale-95"
              >
                <Ruler className="w-4 h-4" />
                <span>{t('تأكيد حجز الزيارة المجانية', 'Confirm Free Home Visit')}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
