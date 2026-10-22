import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Ruler,
  ShieldCheck,
  Truck,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Sun,
  Flame,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToSection }) => {
  const { t, setIsTechnicianModalOpen, activeAdSource, formatSAR } = useApp();

  return (
    <div id="hero" className="relative overflow-hidden bg-gradient-to-b from-neutral-100 via-emerald-50/30 to-white py-12 md:py-20 border-b border-neutral-200">
      {/* Subtle background graphic */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-start">
            {/* Top Tagline / Campaign Hook */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300/60 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>{t('المصنع السعودي الأول المتخصص في ستائر الرول الفاخرة', 'KSA #1 Specialized Roller & Motorized Blinds')}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 tracking-tight leading-tight">
              {t(
                'ستائر رول دقيقة بالسلسلة والمحرك الذكي عازلة لشمس وحرارة الصيف 100%',
                'Custom Roller Blinds with Precision Pull Chain & Smart Motor — 100% Sun & Heat Block'
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-neutral-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t(
                'تحكم بالرفع والتنزيل بسلاسة فائقة عبر سلسلة سحب متينة أو محرك ذكي بريموت كنترول. أقمشة ثلاثية الطبقات عازلة للحرارة والضوء تحمي أثاثك وتقلل فاتورة كهرباء التكييف، مع قياس وتركيب مجاني في منزلك.',
                'Effortless vertical roll control with heavy-duty bead pull chains or rechargeable smart motors. Triple-ply thermal fabric shields your home from Gulf sun and cuts AC bills, with free in-home measurement and installation.'
              )}
            </p>

            {/* Key Value Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800 bg-white/80 backdrop-blur-xs p-2.5 rounded-2xl border border-neutral-200 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t('ضمان 5 سنوات شامل', '5-Year Full Warranty')}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800 bg-white/80 backdrop-blur-xs p-2.5 rounded-2xl border border-neutral-200 shadow-xs">
                <Sun className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{t('عزل حرارة بنسبة 95%', '95% Thermal Block')}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800 bg-white/80 backdrop-blur-xs p-2.5 rounded-2xl border border-neutral-200 shadow-xs col-span-2 sm:col-span-1">
                <Truck className="w-4 h-4 text-sky-600 shrink-0" />
                <span>{t('تركيب مجاني بالرياض وجدة', 'Free KSA Installation')}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => onScrollToSection('calculator')}
                className="w-full sm:w-auto py-3.5 px-7 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xl shadow-emerald-700/25 flex items-center justify-center gap-2 transition active:scale-95"
              >
                <Ruler className="w-4 h-4" />
                <span>{t('احسب مقاسك وتسعيرتك فوراً', 'Instant Size & Price Calculator')}</span>
              </button>

              <button
                onClick={() => onScrollToSection('simulator')}
                className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-300 font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition active:scale-95"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>{t('جرّب محاكي سحب الستارة بالسلسلة', 'Try Live Cord Simulator')}</span>
              </button>

              <button
                onClick={() => setIsTechnicianModalOpen(true)}
                className="w-full sm:w-auto py-3.5 px-5 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-900 border border-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 transition"
              >
                <PhoneCall className="w-3.5 h-3.5 text-amber-600" />
                <span>{t('طلب زيارة فني للبيت', 'Book Free Home Visit')}</span>
              </button>
            </div>

            {/* Payment Trust Icons */}
            <div className="pt-4 border-t border-neutral-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-neutral-500">
              <span className="font-semibold text-neutral-700">{t('طرق دفع سعودية آمنة معتمدة:', 'Secure Saudi Payment Methods:')}</span>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 rounded-lg bg-white border border-neutral-200 font-bold text-emerald-800 text-[11px] shadow-xs">
                  مدى Mada
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white border border-neutral-200 font-bold text-neutral-900 text-[11px] shadow-xs">
                   Pay
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white border border-neutral-200 font-bold text-purple-700 text-[11px] shadow-xs">
                  stc pay
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white border border-neutral-200 font-bold text-amber-700 text-[11px] shadow-xs">
                  تمارا Tamara (4 دفعات)
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white border border-neutral-200 font-bold text-emerald-600 text-[11px] shadow-xs">
                  تابي Tabby
                </span>
              </div>
            </div>
          </div>

          {/* Right Visual Feature Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-neutral-950 group">
              <img
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80"
                alt="Luxury Saudi Roller Blinds"
                className="w-full h-96 object-cover opacity-90 group-hover:scale-105 transition duration-700"
              />

              {/* Floating feature badge on image */}
              <div className="absolute top-4 right-4 rtl:right-4 rtl:left-auto ltr:left-4 ltr:right-auto bg-neutral-900/85 backdrop-blur-md text-white p-3 rounded-2xl border border-neutral-700 max-w-xs shadow-lg">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t('آلية السحب الألمانية المتطورة', 'Advanced Precision Pull Chain')}</span>
                </div>
                <p className="text-[11px] text-neutral-300">
                  {t('سلسلة كروية من الستانلس ستيل خفيفة الحركة مع ثقالة ألمنيوم سفلية موزونة تمنع التطاير مع التكييف.', 'Smooth stainless bead chain weighted with aluminum hembar for silent stability against AC air.')}
                </p>
              </div>

              {/* Floating bottom pricing sticker */}
              <div className="absolute bottom-4 inset-x-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center justify-between border border-neutral-200">
                <div>
                  <span className="text-[10px] text-neutral-500 font-semibold uppercase block">
                    {t('يبدأ التفصيل المخصص من', 'Custom fabrication starts at')}
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-black text-emerald-800">
                      {formatSAR(120)}
                    </span>
                    <span className="text-xs text-neutral-400 font-normal">/ {t('متر مربع', 'sq meter')}</span>
                  </div>
                </div>

                <button
                  onClick={() => onScrollToSection('catalog')}
                  className="py-2 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition flex items-center gap-1 active:scale-95"
                >
                  <span>{t('تصفح الموديلات', 'View Blinds')}</span>
                  <ChevronLeft className="w-4 h-4 rtl:rotate-0 ltr:rotate-180" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
