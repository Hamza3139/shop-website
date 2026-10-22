import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Clock, Copy, Check, ChevronRight, Zap } from 'lucide-react';

export const AdCampaignBanner: React.FC = () => {
  const { t, activeAdSource, couponCode, couponDiscountPercent, applyCoupon } = useApp();
  const [copied, setCopied] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 4,
    minutes: 42,
    seconds: 19
  });

  // Countdown timer for ad conversion urgency
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 6, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(couponCode);
    applyCoupon(couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white text-xs py-2.5 px-4 shadow-md border-b border-emerald-700/50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
        {/* Campaign Badge & Urgency message */}
        <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
          <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-neutral-950 font-black text-[11px] shadow-xs flex items-center gap-1">
            <Zap className="w-3 h-3 fill-current" />
            {t(activeAdSource.badgeAr, activeAdSource.badgeEn)}
          </span>

          <span className="font-semibold text-emerald-100">
            {t(activeAdSource.headlineAr, activeAdSource.headlineEn)}
          </span>
        </div>

        {/* Promo Code & Countdown */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Urgency countdown */}
          <div className="flex items-center gap-1.5 text-[11px] text-amber-200 bg-emerald-950/70 px-2.5 py-1 rounded-xl border border-emerald-700/60 font-mono">
            <Clock className="w-3.5 h-3.5 text-amber-300" />
            <span>
              {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>

          {/* Code pill */}
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 bg-white text-emerald-950 px-3 py-1 rounded-xl font-mono font-black text-xs hover:bg-emerald-100 transition active:scale-95 shadow-sm"
            title={t('انقر لنسخ وتطبيق كود الخصم', 'Click to copy and apply discount')}
          >
            <span>{couponCode}</span>
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
};
