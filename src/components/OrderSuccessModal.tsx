import React from 'react';
import { useApp } from '../context/AppContext';
import { CustomerOrder } from '../types';
import {
  CheckCircle2,
  X,
  Printer,
  Share2,
  Truck,
  ShieldCheck,
  Calendar,
  FileText,
  Phone,
  QrCode
} from 'lucide-react';

interface OrderSuccessModalProps {
  order: CustomerOrder | null;
  onClose: () => void;
  onTrackOrder: (orderId: string) => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  onTrackOrder
}) => {
  const { t, formatSAR } = useApp();

  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const whatsappMessage = encodeURIComponent(
    `السلام عليكم، تم تأكيد طلبي لستائر الرول برقم (${order.orderId}) بمبلغ ${order.total} ريال. الاسم: ${order.customerName} - المدينة: ${order.city}`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-emerald-50">
          <div className="flex items-center gap-2 text-emerald-900">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            <div>
              <h3 className="text-base font-black">
                {t('تم تأكيد طلبك بنجاح!', 'Order Confirmed Successfully!')}
              </h3>
              <p className="text-[11px] text-emerald-700">
                {t(`رقم الطلب: ${order.orderId}`, `Order ID: ${order.orderId}`)}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Printable Invoice Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Status Banner */}
          <div className="p-4 rounded-2xl bg-neutral-900 text-white flex items-center justify-between gap-4">
            <div>
              <span className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider block">
                {t('حالة الطلب الحالية', 'Current Order Status')}
              </span>
              <h4 className="text-sm font-bold mt-0.5">
                {t('تم استلام الطلب وجاري بدء التفصيل بالمصنع', 'Order Received & Sent to Custom Fabrication')}
              </h4>
              <p className="text-xs text-neutral-400 mt-1">
                {t('سيتواصل معك فني التركيب خلال 24 ساعة لتحديد موعد الزيارة.', 'Our installation technician will call within 24h to set visit time.')}
              </p>
            </div>

            <div className="text-end shrink-0">
              <span className="text-[10px] text-neutral-400 block">{t('رقم التتبع', 'Tracking #')}</span>
              <span className="text-xs font-mono font-bold text-amber-300">{order.trackingNumber}</span>
            </div>
          </div>

          {/* ZATCA Tax Invoice Header */}
          <div className="p-5 rounded-2xl border border-neutral-300 bg-neutral-50/50 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-200">
              <div>
                <div className="text-base font-black text-neutral-900">
                  {t('فاتورة ضريبية مبسطة (هيئة الزكاة والضريبة والجمارك)', 'Simplified Tax Invoice (ZATCA KSA)')}
                </div>
                <div className="text-xs text-neutral-500 font-mono mt-0.5">
                  {t('الرقم الضريبي: 310294829100003 | س.ت: 1010892019', 'VAT ID: 310294829100003 | CR: 1010892019')}
                </div>
              </div>

              {/* ZATCA QR Code Simulation */}
              <div className="p-2 bg-white rounded-xl border border-neutral-300 self-start sm:self-auto flex items-center gap-2">
                <div className="w-12 h-12 bg-neutral-900 text-white flex items-center justify-center rounded-lg p-1">
                  <QrCode className="w-full h-full" />
                </div>
                <div className="text-[9px] text-neutral-500 leading-tight">
                  <span className="font-bold block text-neutral-800">{t('رمز التحقق الإلكتروني', 'ZATCA QR')}</span>
                  <span>{t('معتمد ضريبياً', 'Tax Approved')}</span>
                </div>
              </div>
            </div>

            {/* Customer & Delivery metadata */}
            <div className="grid grid-cols-2 gap-3 text-xs text-neutral-700">
              <div>
                <span className="text-neutral-400 block">{t('اسم العميل:', 'Customer:')}</span>
                <strong className="text-neutral-900">{order.customerName}</strong>
              </div>
              <div>
                <span className="text-neutral-400 block">{t('رقم الجوال:', 'Mobile:')}</span>
                <span className="font-mono text-neutral-900" dir="ltr">{order.phone}</span>
              </div>
              <div>
                <span className="text-neutral-400 block">{t('عنوان التركيب:', 'Delivery Address:')}</span>
                <span className="text-neutral-900">{order.city} - {order.district}</span>
              </div>
              <div>
                <span className="text-neutral-400 block">{t('وسيلة الدفع:', 'Payment Method:')}</span>
                <span className="font-bold text-emerald-800 uppercase">{order.paymentMethod} ({order.paymentStatus === 'paid' ? t('مدفوع', 'Paid') : t('دفع عند التركيب', 'COD')})</span>
              </div>
            </div>

            {/* Items Summary Table */}
            <div className="border-t border-neutral-200 pt-3">
              <span className="text-xs font-bold text-neutral-800 block mb-2">{t('الستائر المفصلة في هذا الطلب:', 'Ordered Custom Blinds:')}</span>
              <div className="space-y-2">
                {order.items.map((it, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-xl bg-white border border-neutral-200">
                    <div>
                      <strong className="text-neutral-900 block">{t(it.product.titleAr, it.product.titleEn)}</strong>
                      <span className="text-[11px] text-neutral-500 font-mono">
                        {it.widthCm}×{it.heightCm} سم | {t(it.selectedColor.nameAr, it.selectedColor.nameEn)} | {it.operationType === 'smart_motor' ? t('محرك ذكي', 'Motorized') : t('سلسلة يدوية', 'Chain')}
                      </span>
                    </div>
                    <div className="text-end font-mono">
                      <span className="text-neutral-500 text-[11px] block">{it.quantity} × {formatSAR(it.unitPrice)}</span>
                      <strong className="text-neutral-900">{formatSAR(it.totalPrice)}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals & VAT breakdown */}
            <div className="border-t border-neutral-200 pt-3 space-y-1.5 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span>{t('المجموع غير شامل الضريبة:', 'Subtotal excl. VAT:')}</span>
                <span className="font-mono text-neutral-800">{formatSAR(order.total - order.vatAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('ضريبة القيمة المضافة 15% (VAT):', '15% VAT:')}</span>
                <span className="font-mono text-neutral-800">{formatSAR(order.vatAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('الشحن والتركيب:', 'Delivery & Installation:')}</span>
                <span className="font-bold text-emerald-700">{order.deliveryFee === 0 ? t('مجاني', 'FREE') : formatSAR(order.deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-neutral-900 pt-2 border-t border-neutral-300">
                <span>{t('المبلغ الإجمالي المدفوع:', 'Total Amount:')}</span>
                <span className="text-emerald-800 text-base">{formatSAR(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* WhatsApp notification */}
            <a
              href={`https://wa.me/966501234567?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition"
            >
              <Phone className="w-4 h-4" />
              <span>{t('تأكيد الموعد عبر الواتساب', 'Confirm via WhatsApp')}</span>
            </a>

            {/* Track order */}
            <button
              onClick={() => {
                onClose();
                onTrackOrder(order.orderId);
              }}
              className="flex-1 py-3 px-4 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition"
            >
              <Truck className="w-4 h-4" />
              <span>{t('تتبع مسار الطلب', 'Track Order')}</span>
            </button>

            {/* Print Invoice */}
            <button
              onClick={handlePrint}
              className="py-3 px-4 rounded-2xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs flex items-center justify-center gap-1.5 transition"
            >
              <Printer className="w-4 h-4" />
              <span>{t('طباعة الفاتورة', 'Print')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
