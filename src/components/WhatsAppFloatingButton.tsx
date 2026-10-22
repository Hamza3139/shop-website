import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Phone, MessageCircle, X, ChevronUp, Sparkles, Send } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const { t, setIsTechnicianModalOpen } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const defaultMsg = encodeURIComponent(
    'السلام عليكم، أرغب في استفسار عن تفصيل ستائر الرول بالسلسلة والمحرك وعروض التخفيض الحالية.'
  );

  const sendDirectMessage = (text: string) => {
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/966501234567?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed bottom-5 right-5 rtl:right-auto rtl:left-5 z-40">
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden text-neutral-900 animate-in fade-in slide-in-from-bottom-3 duration-200">
          {/* Header */}
          <div className="p-4 bg-emerald-700 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-xs font-bold leading-tight">
                  {t('خدمة عملاء ستائر سديل', 'Sadeel Blinds Customer Care')}
                </h4>
                <span className="text-[10px] text-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  {t('متواجدون لخدمتكم الآن بالمملكة', 'Online & Ready to Help in KSA')}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Chat Options */}
          <div className="p-4 space-y-2 bg-neutral-50 text-xs">
            <p className="text-[11px] text-neutral-600 mb-2">
              {t('اختر موضوع استفسارك للتحدث المباشر مع أخصائي الستائر:', 'Select an inquiry to chat directly with our specialist:')}
            </p>

            <button
              onClick={() => sendDirectMessage('السلام عليكم، أرغب في تسعير ستائر رول بلاك أوت لشباك بمقاس تقريبي')}
              className="w-full text-start p-2.5 rounded-xl bg-white border border-neutral-200 hover:border-emerald-500 font-medium transition text-[11px] flex items-center justify-between group"
            >
              <span>{t('📏 استفسار عن مقاسات وأسعار الستائر', 'Inquire about custom sizes & prices')}</span>
              <Send className="w-3 h-3 text-neutral-400 group-hover:text-emerald-600 transition" />
            </button>

            <button
              onClick={() => sendDirectMessage('السلام عليكم، أريد إرسال صور شبابيك الفيلا لاقتراح أفضل نوع ستائر رول')}
              className="w-full text-start p-2.5 rounded-xl bg-white border border-neutral-200 hover:border-emerald-500 font-medium transition text-[11px] flex items-center justify-between group"
            >
              <span>{t('📸 إرسال صور الشبابيك للاستشارة الديكورية', 'Send window photos for recommendation')}</span>
              <Send className="w-3 h-3 text-neutral-400 group-hover:text-emerald-600 transition" />
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                setIsTechnicianModalOpen(true);
              }}
              className="w-full text-start p-2.5 rounded-xl bg-amber-500/15 border border-amber-300 text-amber-950 font-bold hover:bg-amber-500/25 transition text-[11px] flex items-center justify-between"
            >
              <span>{t('🏡 طلب زيارة فني لأخذ المقاسات مجاناً بالمنزل', 'Book Free Home Measurement Visit')}</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            </button>
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="flex items-center gap-2.5 py-3 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xl shadow-emerald-900/30 transition active:scale-95 border-2 border-white/50 group"
      >
        <div className="w-6 h-6 flex items-center justify-center">
          <MessageCircle className="w-6 h-6 fill-current" />
        </div>
        <span className="font-bold text-xs">
          {t('محادثة واتساب فورية', 'Instant WhatsApp Chat')}
        </span>
      </button>
    </div>
  );
};
