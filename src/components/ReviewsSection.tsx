import React from 'react';
import { useApp } from '../context/AppContext';
import { CUSTOMER_REVIEWS } from '../data/reviewsData';
import { Star, ShieldCheck, CheckCircle2, ThumbsUp, Sparkles } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { t } = useApp();

  return (
    <section id="reviews" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto border-t border-neutral-200">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-3">
          <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
          <span>{t('تقييم 4.9 من 5 بناءً على 870+ عميل بالمملكة', 'Rated 4.9/5 by 870+ Verified KSA Customers')}</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight">
          {t('تجارب حقيقية لعملائنا في الرياض وجدة ومدن المملكة', 'Real Experiences from Our Customers Across KSA')}
        </h2>
        <p className="text-neutral-600 text-sm md:text-base mt-2">
          {t(
            'شاهد كيف ساعدت ستائر الرول بسلسلتها المتينة وعزلها الحراري في تغيير أجواء الفلل والمنازل السعودية.',
            'Discover how our heavy-duty pull chain roller blinds and thermal insulation transform Saudi homes.'
          )}
        </p>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CUSTOMER_REVIEWS.map(rev => (
          <div
            key={rev.id}
            className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
          >
            <div>
              {/* Top author row */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatarUrl}
                    alt={t(rev.authorNameAr, rev.authorNameEn)}
                    className="w-11 h-11 rounded-full object-cover border border-neutral-200"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-neutral-900">
                        {t(rev.authorNameAr, rev.authorNameEn)}
                      </h4>
                      <span title={t('مشتري موثق', 'Verified Buyer')}>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      </span>
                    </div>
                    <span className="text-[11px] text-neutral-500">{t(rev.cityAr, rev.cityEn)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                "{t(rev.commentAr, rev.commentEn)}"
              </p>
            </div>

            {/* Bottom product pill */}
            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px]">
              <span className="text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-1 rounded-lg">
                {t(rev.productTitleAr, rev.productTitleEn)}
              </span>
              <span className="text-neutral-400">{t(rev.dateAr, rev.dateEn)}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
