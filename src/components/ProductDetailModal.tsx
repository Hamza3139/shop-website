import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BlindProduct } from '../types';
import {
  X,
  Star,
  ShieldCheck,
  Sun,
  Flame,
  CheckCircle2,
  Ruler,
  Truck,
  Sparkles,
  Layers,
  Zap
} from 'lucide-react';

interface ProductDetailModalProps {
  onCustomize: (product: BlindProduct) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ onCustomize }) => {
  const { t, selectedProductForDetail, setSelectedProductForDetail, formatSAR } = useApp();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!selectedProductForDetail) return null;
  const product = selectedProductForDetail;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header with close */}
        <div className="p-4 sm:p-6 border-b border-neutral-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              {product.category === 'blackout'
                ? t('ستارة رول بلاك أوت', 'Blackout Roller Blind')
                : product.category === 'sunscreen'
                ? t('ستارة رول صن سكرين', 'Sunscreen Roller Blind')
                : product.category === 'zebra'
                ? t('ستارة رول زيبرا مزدوجة', 'Zebra Day & Night Blind')
                : t('ستارة رول ذكية بمحرك', 'Smart Motorized Blind')}
            </span>
            <span className="text-xs text-neutral-500">• {t('كود الموديل: ', 'Model: ')}{product.id}</span>
          </div>

          <button
            onClick={() => setSelectedProductForDetail(null)}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Gallery Images */}
            <div className="md:col-span-6 space-y-3">
              <div className="w-full h-80 rounded-2xl overflow-hidden bg-neutral-100 shadow-inner border border-neutral-200">
                <img
                  src={product.gallery[activeImageIndex] || product.image}
                  alt={t(product.titleAr, product.titleEn)}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              {product.gallery.length > 1 && (
                <div className="flex gap-2">
                  {product.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition ${
                        activeImageIndex === idx
                          ? 'border-emerald-600 ring-2 ring-emerald-600/30'
                          : 'border-neutral-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info and Specs */}
            <div className="md:col-span-6 space-y-5">
              <div>
                <div className="flex items-center gap-1.5 text-amber-500 text-xs font-bold mb-2">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-neutral-900 text-sm">{product.rating}</span>
                  <span className="text-neutral-400 font-normal">({product.reviewsCount} {t('تقييم معتمد من عملاء السعودية', 'verified KSA reviews')})</span>
                </div>

                <h2 className="text-2xl font-black text-neutral-900 leading-snug">
                  {t(product.titleAr, product.titleEn)}
                </h2>

                <div className="flex items-baseline gap-3 mt-3">
                  <span className="text-3xl font-black text-emerald-800">
                    {formatSAR(product.basePrice)}
                  </span>
                  <span className="text-xs text-neutral-500">{t('لكل متر مربع (شامل التفصيل والضريبة)', 'per m² (including custom cut & VAT)')}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-neutral-600 leading-relaxed">
                {t(product.descriptionAr, product.descriptionEn)}
              </p>

              {/* Key Features List */}
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2.5">
                <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                  {t('المواصفات الفنية المعتمدة بالمملكة:', 'Certified Technical Specifications:')}
                </h4>
                {product.featuresAr.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-neutral-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{t(feat, product.featuresEn[i])}</span>
                  </div>
                ))}
              </div>

              {/* Color swatches */}
              <div>
                <span className="text-xs font-bold text-neutral-700 block mb-2">
                  {t('خيارات ألوان القماش المتاحة:', 'Available Fabric Colors:')}
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(c => (
                    <div
                      key={c.id}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-neutral-200 text-xs text-neutral-700 shadow-xs"
                    >
                      <span className="w-4 h-4 rounded-full border border-black/20" style={{ backgroundColor: c.hex }} />
                      <span>{t(c.nameAr, c.nameEn)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  setSelectedProductForDetail(null);
                  onCustomize(product);
                }}
                className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xl shadow-emerald-700/25 flex items-center justify-center gap-2 transition active:scale-95"
              >
                <Ruler className="w-5 h-5" />
                <span>{t('أدخل مقاس شباكك واطلب هذه الستارة', 'Enter Window Size & Order This Blind')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
