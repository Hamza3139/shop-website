import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Truck,
  Ruler,
  Clock,
  Sparkles,
  Heart
} from 'lucide-react';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToSection }) => {
  const { t, setIsTechnicianModalOpen, setIsTrackingModalOpen } = useApp();

  return (
    <footer className="bg-neutral-950 text-neutral-300 border-t border-neutral-800 text-xs">
      {/* Top Banner with Saudi delivery coverage */}
      <div className="bg-neutral-900 border-b border-neutral-800 py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🇸🇦</span>
            <div>
              <h4 className="text-white font-bold text-sm">
                {t('توصيل وتركيب لكافة مدن المملكة العربية السعودية', 'Delivery & Installation Across All Saudi Arabia Cities')}
              </h4>
              <p className="text-neutral-400 text-xs">
                {t('الرياض • جدة • الدمام • مكة المكرمة • المدينة المنورة • الخبر • الأحساء • القصيم • أبها • تبوك', 'Riyadh • Jeddah • Dammam • Makkah • Madinah • Khobar • Al-Ahsa • Qassim • Abha • Tabuk')}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsTechnicianModalOpen(true)}
            className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-xs transition"
          >
            {t('طلب زيارة فني لأخذ المقاسات مجاناً', 'Book Free Home Measurement Visit')}
          </button>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold">
              س
            </div>
            <span className="text-base font-black text-white">
              {t('سديل لستائر الرول الفاخرة', 'Sadeel Blinds KSA')}
            </span>
          </div>

          <p className="text-neutral-400 text-xs leading-relaxed">
            {t(
              'المتجر والمصنع السعودي الرائد في تفصيل ستائر الرول بالسلسلة اليدوية والمحركات الذكية العازلة للحرارة والشمس بنسبة 100%. منتجات مطابقة للمواصفات السعودية بضمان 5 سنوات.',
              'The premier Saudi store specializing in bespoke roller blinds with precision pull chain and smart motors engineered for Gulf heat. 5-Year full warranty.'
            )}
          </p>

          <div className="text-[11px] text-neutral-400 space-y-1 pt-1 font-mono">
            <div>{t('السجل التجاري: 1010892019', 'Commercial Reg: 1010892019')}</div>
            <div>{t('الرقم الضريبي (ZATCA): 310294829100003', 'VAT Number: 310294829100003')}</div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="text-white font-bold text-sm mb-3">
            {t('روابط سريعة وتفصيل', 'Quick Navigation')}
          </h5>
          <ul className="space-y-2 text-neutral-400">
            <li>
              <button onClick={() => onScrollToSection('catalog')} className="hover:text-emerald-400 transition">
                {t('كتالوج ستائر الرول الفاخرة', 'Luxury Blinds Catalog')}
              </button>
            </li>
            <li>
              <button onClick={() => onScrollToSection('simulator')} className="hover:text-emerald-400 transition">
                {t('محاكي السلسلة والرفع الحي', 'Pull-Cord Simulator')}
              </button>
            </li>
            <li>
              <button onClick={() => onScrollToSection('calculator')} className="hover:text-emerald-400 transition">
                {t('حاسبة المقاسات والتسعير الفوري', 'Size & Price Calculator')}
              </button>
            </li>
            <li>
              <button onClick={() => setIsTrackingModalOpen(true)} className="hover:text-emerald-400 transition">
                {t('تتبع حالة ومسار الطلب', 'Track Order Status')}
              </button>
            </li>
            <li>
              <button onClick={() => onScrollToSection('reviews')} className="hover:text-emerald-400 transition">
                {t('آراء وتجارب العملاء بالمملكة', 'Customer Reviews & Photos')}
              </button>
            </li>
          </ul>
        </div>

        {/* Blinds Categories */}
        <div>
          <h5 className="text-white font-bold text-sm mb-3">
            {t('أنواع ستائر الرول', 'Roller Blind Types')}
          </h5>
          <ul className="space-y-2 text-neutral-400">
            <li>{t('ستائر رول بلاك أوت 100% عازلة للحرارة', '100% Thermal Blackout Blinds')}</li>
            <li>{t('ستائر رول صن سكرين 5% كاشفة للمنظر', 'Solar Sunscreen 5% Blinds')}</li>
            <li>{t('ستائر رول زيبرا مزدوجة (تحكم ليل ونهار)', 'Zebra Dual Day & Night Blinds')}</li>
            <li>{t('ستائر رول ذكية بمحرك سومفي وريموت', 'Somfy Smart Motorized Blinds')}</li>
            <li>{t('ستائر مكاتب وشركات مقاومة للحريق', 'Commercial Fire-Retardant Blinds')}</li>
          </ul>
        </div>

        {/* Contact info & Working hours */}
        <div className="space-y-3">
          <h5 className="text-white font-bold text-sm mb-3">
            {t('تواصل معنا وخدمة العملاء', 'Contact & Customer Care')}
          </h5>

          <div className="flex items-center gap-2 text-neutral-400">
            <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
            <span dir="ltr">+966 50 123 4567</span>
          </div>

          <div className="flex items-center gap-2 text-neutral-400">
            <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>sales@sadeelblinds.sa</span>
          </div>

          <div className="flex items-start gap-2 text-neutral-400">
            <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>{t('طريق الملك فهد، حي الصحافة، الرياض، المملكة العربية السعودية', 'King Fahd Road, Al-Sahafa, Riyadh, KSA')}</span>
          </div>

          <div className="flex items-center gap-2 text-neutral-400">
            <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{t('السبت - الخميس: 9:00 ص - 10:00 م', 'Sat - Thu: 9:00 AM - 10:00 PM')}</span>
          </div>
        </div>
      </div>

      {/* Saudi Payment Gateways and Copyright */}
      <div className="border-t border-neutral-900 py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-neutral-500 text-[11px] text-center md:text-start">
            © {new Date().getFullYear()} {t('سديل لستائر الرول بالمملكة العربية السعودية. جميع الحقوق محفوظة.', 'Sadeel Roller Blinds Saudi Arabia. All Rights Reserved.')}
          </div>

          {/* Payment Badges */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-[10px] font-bold text-emerald-400">
              مدى Mada
            </span>
            <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-[10px] font-bold text-white">
               Pay
            </span>
            <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-[10px] font-bold text-purple-400">
              stc pay
            </span>
            <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-[10px] font-bold text-amber-400">
              تمارا Tamara
            </span>
            <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-[10px] font-bold text-emerald-300">
              تابي Tabby
            </span>
            <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-[10px] font-bold text-blue-400">
              VISA
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
