import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Sun,
  Flame,
  Ruler,
  Truck,
  Sparkles,
  Award,
  Zap,
  CreditCard,
  CheckCircle2
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const { t } = useApp();

  const features = [
    {
      icon: <Sparkles className="w-6 h-6 text-amber-500" />,
      titleAr: 'سلسلة سحب ناعمة غير قابلة للتعطل',
      titleEn: 'Zero-Jam Stainless Pull Chain',
      descAr: 'خرز معدني عالي المتانة مجرب لأكثر من 10,000 حركة سحب لأعلى ولأسفل، مع قفل تثبيت أمان يحمي الأطفال والحيوانات الأليفة.',
      descEn: 'Engineered stainless steel bead chain tested for 10,000+ smooth roll cycles with child safety tension clip.'
    },
    {
      icon: <Sun className="w-6 h-6 text-emerald-600" />,
      titleAr: 'عازل حراري مصمم لصيف السعودية',
      titleEn: 'Built for 50°C Saudi Summers',
      descAr: 'نسيج ثلاثي الطبقات يمنع نفاذ الأشعة تحت الحمراء وفوق البنفسجية ويخفض حرارة الغرفة حتى 8 درجات ويوفر 35% من استهلاك التكييف.',
      descEn: 'Triple-layer blackout barrier rejects 99% UV rays and reduces room temperature by up to 8°C, lowering electricity costs.'
    },
    {
      icon: <Ruler className="w-6 h-6 text-sky-600" />,
      titleAr: 'زيارة معاينة وقياس مجانية بالليزر',
      titleEn: 'Free Laser Measuring Visit',
      descAr: 'يصلك فني متخصص إلى فيلتك أو شقتك ومعه عينات الأقمشة الحقيقية لأخذ المقاسات الدقيقة بدون أي رسوم أو التزام بالشراء.',
      descEn: 'Our skilled technician visits your residence with physical swatch samples and laser measures every window free of charge.'
    },
    {
      icon: <Award className="w-6 h-6 text-purple-600" />,
      titleAr: 'معايير الجودة السعودية (SASO)',
      titleEn: 'SASO Certified Safety Standards',
      descAr: 'أقمشة معالجة ضد الاشتعال، مقاومة لتراكم ذرات الغبار، وسهلة التنظيف بالمسح دون الحاجة للفك والتركيب المتعب.',
      descEn: 'Fire-retardant materials compliant with Saudi civil defense specifications, dust-repellent and effortlessly wiped clean.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-700" />,
      titleAr: 'ضمان ذهبي 5 سنوات شامل',
      titleEn: '5-Year Full Replacement Warranty',
      descAr: 'ضمان رسمي يشمل القماش، آلية الرول، السلسلة، والمحرك الكهربائي. صيانة مجانية سريعة بضغطة زر.',
      descEn: 'Official 5-year replacement guarantee covering fabric integrity, roller gears, pull chain, and motorized components.'
    },
    {
      icon: <CreditCard className="w-6 h-6 text-amber-600" />,
      titleAr: 'دفع محلي آمن وأقساط ميسرة (تمارا)',
      titleEn: 'Saudi Payments & 0% Installments',
      descAr: 'ادفع ببطاقة مدى، أو Apple Pay، أو قسّم فاتورتك على 4 دفعات شهرية مريحة بدون أي فوائد عبر تمارا أو تابي.',
      descEn: 'Checkout smoothly with Mada, Apple Pay, or split your payment into 4 interest-free monthly installments via Tamara.'
    }
  ];

  return (
    <section id="why-us" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>{t('معايير الجودة والخدمة السعودية', 'Saudi Quality & Engineering Standards')}</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight">
          {t('لماذا يفضل عملاء المملكة ستائر سديل؟', 'Why Homeowners Across KSA Choose Sadeel')}
        </h2>
        <p className="text-neutral-600 text-sm md:text-base mt-2">
          {t(
            'نجمع بين دقة التصنيع الوطنية، وقوة السلسلة التي لا تتعطل، وخدمة المعاينة والتركيب المنزلية الاحترافية.',
            'We combine local manufacturing precision, unbreakable pull mechanisms, and turnkey home installation.'
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feat, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-xs hover:shadow-md transition space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center">
              {feat.icon}
            </div>
            <h3 className="text-base font-bold text-neutral-900">
              {t(feat.titleAr, feat.titleEn)}
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              {t(feat.descAr, feat.descEn)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
