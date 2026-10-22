import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BLINDS_PRODUCTS } from '../data/blindsData';
import { BlindProduct, BlindCategory } from '../types';
import {
  Star,
  ShieldCheck,
  Sun,
  Flame,
  Ruler,
  Eye,
  Check,
  Sparkles,
  ShoppingBag
} from 'lucide-react';

interface ProductCatalogProps {
  onCustomizeProduct: (product: BlindProduct) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ onCustomizeProduct }) => {
  const { t, formatSAR, setSelectedProductForDetail } = useApp();
  const [activeCategory, setActiveCategory] = useState<BlindCategory>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price_asc' | 'price_desc'>('popular');

  const categories = [
    { id: 'all', labelAr: 'جميع ستائر الرول', labelEn: 'All Roller Blinds' },
    { id: 'blackout', labelAr: 'ستائر بلاك أوت 100%', labelEn: 'Blackout 100%' },
    { id: 'sunscreen', labelAr: 'ستائر صن سكرين 5%', labelEn: 'Sunscreen 5%' },
    { id: 'zebra', labelAr: 'ستائر زيبرا (ليل ونهار)', labelEn: 'Zebra Dual Day/Night' },
    { id: 'motorized', labelAr: 'ستائر ذكية بمحرك', labelEn: 'Smart Motorized' },
    { id: 'office', labelAr: 'ستائر مكاتب وشركات', labelEn: 'Commercial & Office' }
  ];

  const filteredProducts = BLINDS_PRODUCTS.filter(item => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  }).sort((a, b) => {
    if (sortBy === 'price_asc') return a.basePrice - b.basePrice;
    if (sortBy === 'price_desc') return b.basePrice - a.basePrice;
    return b.rating - a.rating;
  });

  return (
    <section id="catalog" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            {t('كتالوج الستائر الأكثر طلباً بالمملكة', 'Most Popular Blinds in Saudi Arabia')}
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight">
            {t('اختر نوع الستارة الرول المناسبة لغرفتك', 'Select the Perfect Roller Blind for Your Room')}
          </h2>
          <p className="text-neutral-600 text-sm md:text-base mt-1 max-w-2xl">
            {t(
              'أقمشة عالية الجودة مصممة لتحمل حرارة الخليج العربي مع سلاسل سحب سلسة ومحركات ذكية معتمدة وضمان 5 سنوات.',
              'Premium heat-resistant fabrics built for Gulf climate with smooth chain mechanisms and certified 5-year warranty.'
            )}
          </p>
        </div>

        {/* Sort Filter */}
        <div className="flex items-center gap-2 self-start md:self-auto text-xs">
          <span className="text-neutral-500 font-medium">{t('ترتيب حسب:', 'Sort by:')}</span>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="bg-white border border-neutral-300 rounded-xl px-3 py-1.5 text-neutral-800 font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
          >
            <option value="popular">{t('الأكثر مبيعاً وتقييماً', 'Top Rated & Best Selling')}</option>
            <option value="price_asc">{t('السعر: من الأقل للأعلى', 'Price: Low to High')}</option>
            <option value="price_desc">{t('السعر: من الأعلى للأقل', 'Price: High to Low')}</option>
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {categories.map(cat => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition shrink-0 ${
                isActive
                  ? 'bg-neutral-900 text-white shadow-md'
                  : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100 hover:text-neutral-900'
              }`}
            >
              {t(cat.labelAr, cat.labelEn)}
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map(product => {
          return (
            <div
              key={product.id}
              className="bg-white rounded-3xl overflow-hidden border border-neutral-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Product Image and Badges */}
              <div>
                <div className="relative h-64 overflow-hidden bg-neutral-100 cursor-pointer" onClick={() => setSelectedProductForDetail(product)}>
                  <img
                    src={product.image}
                    alt={t(product.titleAr, product.titleEn)}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3 right-3 rtl:right-3 rtl:left-auto ltr:left-3 ltr:right-auto flex flex-col gap-1.5">
                    {product.isBestSeller && (
                      <span className="px-2.5 py-1 rounded-xl bg-amber-500 text-neutral-950 font-black text-[11px] shadow-sm">
                        {t('الأكثر طلباً بالمملكة ★', 'Best Seller KSA ★')}
                      </span>
                    )}
                    {product.discountPercent > 0 && (
                      <span className="px-2.5 py-1 rounded-xl bg-red-600 text-white font-black text-[11px] shadow-sm">
                        {t(`خصم ${product.discountPercent}%`, `${product.discountPercent}% OFF`)}
                      </span>
                    )}
                  </div>

                  {/* Thermal / Light Block indicator */}
                  <div className="absolute bottom-3 inset-x-3 flex items-center justify-between pointer-events-none">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-neutral-900/85 text-white backdrop-blur-xs flex items-center gap-1 border border-neutral-700">
                      <Sun className="w-3.5 h-3.5 text-amber-400" />
                      <span>{t(`عزل ضوء ${product.lightBlockingPercent}%`, `${product.lightBlockingPercent}% Blockout`)}</span>
                    </span>

                    <span className="text-[11px] font-bold px-2 py-1 rounded-xl bg-white/90 text-neutral-900 backdrop-blur-xs flex items-center gap-1 shadow-sm">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{t('ضمان 5 سنوات', '5-Yr Warranty')}</span>
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  {/* Rating & Reviews */}
                  <div className="flex items-center justify-between text-xs mb-2">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-bold text-neutral-900">{product.rating}</span>
                      <span className="text-neutral-400">({product.reviewsCount} {t('تقييم', 'reviews')})</span>
                    </div>

                    <span className="text-emerald-700 font-semibold text-[11px] bg-emerald-50 px-2 py-0.5 rounded-md">
                      {product.thermalInsulation}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => setSelectedProductForDetail(product)}
                    className="font-bold text-neutral-900 text-base line-clamp-1 hover:text-emerald-700 cursor-pointer transition mb-2"
                  >
                    {t(product.titleAr, product.titleEn)}
                  </h3>

                  {/* Short description */}
                  <p className="text-xs text-neutral-500 line-clamp-2 mb-4 leading-relaxed">
                    {t(product.descriptionAr, product.descriptionEn)}
                  </p>

                  {/* Color swatches */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-[11px] text-neutral-500 mb-1.5">
                      <span>{t('الألوان المتوفرة:', 'Available Colors:')}</span>
                      <span className="font-medium text-neutral-700">{product.colors.length} {t('خيارات ألوان', 'colors')}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {product.colors.map(col => (
                        <span
                          key={col.id}
                          className="w-5 h-5 rounded-full border border-neutral-300 shadow-xs"
                          style={{ backgroundColor: col.hex }}
                          title={t(col.nameAr, col.nameEn)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Pull mechanism tag */}
                  <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-700 flex items-center justify-between">
                    <span className="font-medium text-[11px] text-neutral-500">{t('طريقة التشغيل:', 'Mechanism:')}</span>
                    <span className="font-bold text-emerald-800 text-[11px]">
                      {product.operationTypes.includes('smart_motor') && product.operationTypes.includes('manual_chain')
                        ? t('سلسلة يدوية أو محرك ذكي', 'Manual Chain or Smart Motor')
                        : product.operationTypes.includes('smart_motor')
                        ? t('محرك ذكي بريموت كنترول', 'Smart Motor with Remote')
                        : t('سلسلة سحب معدنية متينة', 'Heavy-Duty Pull Chain')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Price & Actions */}
              <div className="p-5 pt-0 border-t border-neutral-100 mt-2">
                <div className="flex items-baseline justify-between mb-4 pt-3">
                  <div>
                    <span className="text-[10px] text-neutral-500 block">{t('السعر يبدأ من (لكل متر مربع):', 'Starts from (per sq m):')}</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-neutral-900">
                        {formatSAR(product.basePrice)}
                      </span>
                      {product.originalPrice > product.basePrice && (
                        <span className="text-xs text-neutral-400 line-through">
                          {formatSAR(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-1 rounded-lg">
                    {t('شامل الضريبة 15%', '15% VAT Included')}
                  </span>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedProductForDetail(product)}
                    className="py-2.5 px-3 rounded-xl border border-neutral-300 hover:bg-neutral-50 text-neutral-800 font-bold text-xs flex items-center justify-center gap-1 transition"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{t('تفاصيل الستارة', 'Details')}</span>
                  </button>

                  <button
                    onClick={() => onCustomizeProduct(product)}
                    className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-700/20 transition active:scale-95"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>{t('تفصيل بمقاسك', 'Customize Size')}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
