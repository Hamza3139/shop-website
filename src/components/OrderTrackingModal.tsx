import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CustomerOrder } from '../types';
import {
  X,
  Search,
  Truck,
  CheckCircle2,
  Clock,
  Package,
  ShieldCheck,
  Calendar,
  MapPin,
  Phone
} from 'lucide-react';

interface OrderTrackingModalProps {
  initialOrderId?: string;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({ initialOrderId = '' }) => {
  const {
    t,
    isTrackingModalOpen,
    setIsTrackingModalOpen,
    orders,
    formatSAR
  } = useApp();

  const [query, setQuery] = useState(initialOrderId || (orders.length > 0 ? orders[0].orderId : 'KSA-78291'));
  const [matchedOrder, setMatchedOrder] = useState<CustomerOrder | null>(
    orders.find(o => o.orderId.toLowerCase() === query.toLowerCase()) || (orders[0] || null)
  );
  const [searched, setSearched] = useState(false);

  if (!isTrackingModalOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const cleaned = query.trim().toLowerCase();
    const found = orders.find(
      o => o.orderId.toLowerCase() === cleaned || o.phone.includes(cleaned)
    );
    setMatchedOrder(found || null);
  };

  const steps = [
    {
      titleAr: 'استلام الطلب وتأكيد المقاسات',
      titleEn: 'Order Received & Sizes Verified',
      descAr: 'تم تسجيل تفاصيل العرض والارتفاع ولون القماش.',
      descEn: 'Dimensions, fabric color, and mechanism confirmed.',
      done: true
    },
    {
      titleAr: 'قص وتفصيل القماش بالمصنع',
      titleEn: 'Precision Laser Cutting & Assembly',
      descAr: 'جاري تجميع أنبوب الرول 38 مم وقفل الحواف الحرارية.',
      descEn: '38mm aluminum tube assembly & thermo-sealed hembar.',
      done: true
    },
    {
      titleAr: 'فحص جودة سلسلة السحب والمحرك',
      titleEn: 'Chain & Motor Fatigue Testing',
      descAr: 'اختبار الحركة الدورانية وسلاسة خرز السلسلة.',
      descEn: 'Testing smooth roll rotation and bead chain lock.',
      done: matchedOrder?.orderStatus !== 'received'
    },
    {
      titleAr: 'خرج مع فني التركيب المعتمد',
      titleEn: 'Out with Installation Technician',
      descAr: 'الفني في طريقه لعنوانك لتركيب الستائر وتشغيلها.',
      descEn: 'Technician on the way to install blinds at your villa.',
      done: matchedOrder?.orderStatus === 'technician_assigned' || matchedOrder?.orderStatus === 'delivered_and_installed'
    },
    {
      titleAr: 'تم التركيب وضمان 5 سنوات ساري',
      titleEn: 'Installed & 5-Year Warranty Active',
      descAr: 'استلام نهائي وتفعيل الضمان الإلكتروني المعتمد.',
      descEn: 'Final handover and certified electronic warranty active.',
      done: matchedOrder?.orderStatus === 'delivered_and_installed'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-emerald-700" />
            <h3 className="text-base font-bold text-neutral-900">
              {t('تتبع مسار تصنيع وتركيب الستائر', 'Live Blind Order & Installation Tracking')}
            </h3>
          </div>

          <button
            onClick={() => setIsTrackingModalOpen(false)}
            className="p-1.5 rounded-xl text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Search box */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute right-3 rtl:right-3 rtl:left-auto ltr:left-3 ltr:right-auto top-3" />
              <input
                type="text"
                placeholder={t('أدخل رقم الطلب (مثل KSA-78291) أو رقم الجوال', 'Enter Order ID (e.g. KSA-78291) or Phone')}
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full bg-white border border-neutral-300 rounded-xl px-10 py-2.5 text-xs font-mono font-bold text-neutral-900 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <button
              type="submit"
              className="py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs"
            >
              {t('بحث', 'Search')}
            </button>
          </form>

          {/* Results */}
          {matchedOrder ? (
            <div className="space-y-6">
              {/* Order summary box */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-emerald-800 font-bold block">{t('رقم الطلب', 'Order ID')}</span>
                  <span className="text-base font-black text-neutral-900 font-mono">{matchedOrder.orderId}</span>
                  <span className="text-xs text-neutral-500 block mt-0.5">
                    {matchedOrder.customerName} - {matchedOrder.city}
                  </span>
                </div>

                <div className="text-end">
                  <span className="text-[11px] text-emerald-800 font-bold block">{t('المبلغ الإجمالي', 'Total Amount')}</span>
                  <span className="text-base font-black text-emerald-900">{formatSAR(matchedOrder.total)}</span>
                  <span className="text-[10px] text-emerald-700 bg-white px-2 py-0.5 rounded-full inline-block mt-0.5 font-bold">
                    {matchedOrder.paymentStatus === 'paid' ? t('تم السداد بنجاح', 'Paid') : t('الدفع عند التركيب', 'COD')}
                  </span>
                </div>
              </div>

              {/* Progress Milestones */}
              <div className="space-y-4 relative pl-4 rtl:pl-0 rtl:pr-4">
                {steps.map((st, i) => (
                  <div key={i} className="flex items-start gap-3 relative">
                    {/* Circle icon */}
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold z-10 ${
                        st.done
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-neutral-200 text-neutral-500'
                      }`}
                    >
                      {st.done ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                    </div>

                    {/* Step details */}
                    <div>
                      <h5 className={`text-xs font-bold ${st.done ? 'text-neutral-900' : 'text-neutral-400'}`}>
                        {t(st.titleAr, st.titleEn)}
                      </h5>
                      <p className="text-[11px] text-neutral-500 mt-0.5">
                        {t(st.descAr, st.descEn)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : searched ? (
            <div className="text-center py-8 text-neutral-500 text-xs">
              {t('لم نتمكن من العثور على طلب بهذا الرقم. تأكد من إدخال الرمز بشكل صحيح (مثل KSA-78291)', 'No order found with this ID.')}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
