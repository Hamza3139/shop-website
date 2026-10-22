import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShoppingBag,
  Phone,
  Ruler,
  Truck,
  ShieldCheck,
  Search,
  Globe,
  Menu,
  X,
  Compass,
  FileText
} from 'lucide-react';

interface HeaderProps {
  onScrollToSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onScrollToSection }) => {
  const {
    language,
    setLanguage,
    t,
    cart,
    setIsCartOpen,
    setIsTechnicianModalOpen,
    setIsTrackingModalOpen
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onScrollToSection(sectionId);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 transition-shadow duration-300">
      {/* Top Micro Utility Bar */}
      <div className="bg-neutral-900 text-neutral-300 text-[11px] py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-neutral-200">
              <span className="text-sm">🇸🇦</span>
              <strong className="text-white">{t('المملكة العربية السعودية', 'Saudi Arabia')}</strong>
              <span className="text-neutral-500 hidden sm:inline">|</span>
              <span className="hidden sm:inline text-neutral-400">
                {t('خدمة التوصيل والتركيب في كافة مدن المملكة', 'Delivery & Installation across all KSA cities')}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Direct Phone / WhatsApp */}
            <a
              href="https://wa.me/966501234567"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition"
            >
              <Phone className="w-3 h-3" />
              <span dir="ltr">+966 50 123 4567</span>
            </a>

            {/* Language switch */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-neutral-300 hover:text-white px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700 transition"
              title="Toggle Language"
            >
              <Globe className="w-3 h-3 text-emerald-400" />
              <span>{language === 'ar' ? 'English' : 'العربية'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-800 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-900/20 group-hover:scale-105 transition">
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="4" rx="1" />
              <path d="M5 7v13a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7" />
              <line x1="9" y1="11" x2="15" y2="11" />
              <line x1="9" y1="15" x2="15" y2="15" />
              <circle cx="19" cy="9" r="1.5" fill="currentColor" />
              <line x1="19" y1="10.5" x2="19" y2="17" strokeDasharray="1 1" />
            </svg>
          </div>

          <div>
            <div className="text-xl font-black text-neutral-900 tracking-tight flex items-center gap-1.5">
              <span>{t('سديل لستائر الرول', 'Sadeel Blinds')}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold">
                KSA
              </span>
            </div>
            <p className="text-[10px] text-neutral-500 font-medium">
              {t('تفصيل ستائر الرول بالسلسلة والمحرك الذكي', 'Custom Roller & Motorized Blinds')}
            </p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-neutral-700">
          <button
            onClick={() => handleNavClick('catalog')}
            className="hover:text-emerald-700 transition"
          >
            {t('تشكيلة الستائر', 'Blinds Catalog')}
          </button>
          <button
            onClick={() => handleNavClick('simulator')}
            className="hover:text-emerald-700 transition flex items-center gap-1"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            {t('محاكي السلسلة الحي', 'Pull-Cord Simulator')}
          </button>
          <button
            onClick={() => handleNavClick('calculator')}
            className="hover:text-emerald-700 transition"
          >
            {t('حاسبة المقاسات', 'Size Calculator')}
          </button>
          <button
            onClick={() => handleNavClick('why-us')}
            className="hover:text-emerald-700 transition"
          >
            {t('لماذا سديل؟', 'Why Choose Us')}
          </button>
          <button
            onClick={() => handleNavClick('reviews')}
            className="hover:text-emerald-700 transition"
          >
            {t('تقييمات عملائنا', 'Reviews')}
          </button>
          <button
            onClick={() => setIsTrackingModalOpen(true)}
            className="text-neutral-500 hover:text-neutral-900 transition flex items-center gap-1 text-xs"
          >
            <FileText className="w-3.5 h-3.5" />
            {t('تتبع طلبك', 'Track Order')}
          </button>
        </nav>

        {/* Action Buttons: Book Tech + Cart */}
        <div className="flex items-center gap-3">
          {/* Free Home Visit Button */}
          <button
            onClick={() => setIsTechnicianModalOpen(true)}
            className="hidden sm:flex items-center gap-2 py-2 px-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-xs shadow-sm transition active:scale-95"
          >
            <Ruler className="w-4 h-4" />
            <span>{t('طلب معاينة فني مجاناً', 'Book Free Visit')}</span>
          </button>

          {/* Cart Icon Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition active:scale-95"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 rtl:-left-1.5 rtl:right-auto w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shadow-md animate-pulse">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="p-2 rounded-xl text-neutral-700 hover:bg-neutral-100 lg:hidden"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-white px-4 py-4 space-y-3 shadow-xl">
          <button
            onClick={() => handleNavClick('catalog')}
            className="w-full text-start py-2 font-semibold text-neutral-800 hover:text-emerald-700"
          >
            {t('تشكيلة الستائر الرول', 'Blinds Catalog')}
          </button>
          <button
            onClick={() => handleNavClick('simulator')}
            className="w-full text-start py-2 font-semibold text-neutral-800 hover:text-emerald-700 flex items-center justify-between"
          >
            <span>{t('محاكي السلسلة التفاعلي', 'Interactive Pull-Cord Simulator')}</span>
            <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">حي</span>
          </button>
          <button
            onClick={() => handleNavClick('calculator')}
            className="w-full text-start py-2 font-semibold text-neutral-800 hover:text-emerald-700"
          >
            {t('حاسبة المقاسات والتسعير الفوري', 'Size & Price Calculator')}
          </button>
          <button
            onClick={() => handleNavClick('why-us')}
            className="w-full text-start py-2 font-semibold text-neutral-800 hover:text-emerald-700"
          >
            {t('مميزات ستائرنا بالمملكة', 'Why Sadeel Blinds KSA')}
          </button>
          <button
            onClick={() => handleNavClick('reviews')}
            className="w-full text-start py-2 font-semibold text-neutral-800 hover:text-emerald-700"
          >
            {t('تقييمات وصور العملاء', 'Customer Reviews')}
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setIsTrackingModalOpen(true);
            }}
            className="w-full text-start py-2 font-semibold text-neutral-600 hover:text-neutral-900"
          >
            {t('تتبع حالة الطلب', 'Track Order Status')}
          </button>

          <div className="pt-2 border-t border-neutral-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsTechnicianModalOpen(true);
              }}
              className="w-full py-2.5 rounded-xl bg-amber-500 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2"
            >
              <Ruler className="w-4 h-4" />
              {t('طلب زيارة فني لأخذ المقاسات مجاناً', 'Book Free Home Measurement Visit')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
