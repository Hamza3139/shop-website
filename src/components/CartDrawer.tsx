import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Check,
  Tag,
  ShieldCheck,
  Truck
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    t,
    dir,
    cart,
    removeFromCart,
    updateCartQuantity,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    cartSubtotal,
    cartDiscount,
    deliveryFee,
    cartTotal,
    vatAmount,
    couponCode,
    couponDiscountPercent,
    applyCoupon,
    formatSAR
  } = useApp();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; error: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const success = applyCoupon(inputCoupon);
    if (success) {
      setCouponMsg({ text: t('تم تفعيل كود الخصم بنجاح!', 'Coupon applied successfully!'), error: false });
    } else {
      setCouponMsg({ text: t('كود الخصم غير صالح أو منتهي الصلاحية', 'Invalid coupon code'), error: true });
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Cart Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-700" />
            <h3 className="text-base font-bold text-neutral-900">
              {t('سلة المشتريات والستائر المفصلة', 'Shopping Cart')}
            </h3>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
              {cart.reduce((sum, i) => sum + i.quantity, 0)}
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-xl text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Tracker */}
        <div className="px-5 py-2.5 bg-emerald-50 border-b border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
          <Truck className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>
            {deliveryFee === 0
              ? t('تهانينا! طلبيتك مؤهلة للشحن والتركيب المجاني بالمملكة', 'Congratulations! Free shipping & installation applied.')
              : t('أضف ستائر أخرى للحصول على شحن مجاني لكافة مناطق المملكة', 'Add more items for free shipping across KSA.')}
          </span>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-neutral-800">{t('سلتك فارغة حالياً', 'Your cart is empty')}</h4>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                {t(
                  'استخدم حاسبة المقاسات لتفصيل ستارة رول بمقاس شباكك بالضبط وإضافتها للسلة.',
                  'Use our calculator to customize roller blinds to your window dimensions.'
                )}
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 py-2 px-4 rounded-xl bg-neutral-900 text-white text-xs font-bold"
              >
                {t('تصفح الكتالوج والموديلات', 'Explore Blinds')}
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div
                key={item.cartItemId}
                className="p-3.5 rounded-2xl bg-white border border-neutral-200 shadow-xs flex gap-3 relative group"
              >
                {/* Thumb */}
                <div className="w-20 h-24 rounded-xl overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200">
                  <img
                    src={item.product.image}
                    alt={t(item.product.titleAr, item.product.titleEn)}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs font-bold text-neutral-900 line-clamp-1">
                        {t(item.product.titleAr, item.product.titleEn)}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-neutral-400 hover:text-red-600 transition p-0.5"
                        title={t('حذف', 'Remove')}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Specs Pills */}
                    <div className="text-[11px] text-neutral-500 mt-1 space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-semibold text-neutral-800">
                          {item.widthCm}×{item.heightCm} {t('سم', 'cm')}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full inline-block border border-black/20"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span>{t(item.selectedColor.nameAr, item.selectedColor.nameEn)}</span>
                        </span>
                      </div>

                      <div className="text-[10px] text-emerald-800 font-medium">
                        {item.operationType === 'smart_motor'
                          ? `⚡ ${t('محرك ذكي بريموت', 'Smart Motor')}`
                          : `⛓️ ${t('سلسلة يدوية', 'Manual Chain')} (${item.chainSide === 'right' ? t('يمين', 'Right') : t('يسار', 'Left')})`}
                      </div>
                    </div>
                  </div>

                  {/* Quantity and Item Total */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-100">
                    <div className="flex items-center border border-neutral-200 rounded-lg bg-neutral-50">
                      <button
                        onClick={() => updateCartQuantity(item.cartItemId, -1)}
                        className="px-2 py-0.5 text-neutral-600 hover:text-neutral-900 text-xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-mono font-bold text-neutral-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.cartItemId, 1)}
                        className="px-2 py-0.5 text-neutral-600 hover:text-neutral-900 text-xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-end">
                      <span className="text-xs font-extrabold text-neutral-900">
                        {formatSAR(item.totalPrice)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Bottom Checkout Panel */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-neutral-50 border-t border-neutral-200 space-y-3">
            {/* Coupon Code Input */}
            <form onSubmit={handleApply} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder={t('كود الخصم (مثال: KSA30)', 'Discount code (e.g. KSA30)')}
                  value={inputCoupon}
                  onChange={e => setInputCoupon(e.target.value)}
                  className="w-full uppercase text-xs font-mono font-bold bg-white border border-neutral-300 rounded-xl px-3 py-2 text-neutral-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition active:scale-95"
              >
                {t('تطبيق', 'Apply')}
              </button>
            </form>

            {couponMsg && (
              <p className={`text-[11px] ${couponMsg.error ? 'text-red-600' : 'text-emerald-700 font-semibold'}`}>
                {couponMsg.text}
              </p>
            )}

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-neutral-600 pt-1">
              <div className="flex justify-between">
                <span>{t('المجموع الفرعي:', 'Subtotal:')}</span>
                <span className="font-mono text-neutral-800">{formatSAR(cartSubtotal)}</span>
              </div>

              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>{t(`خصم الكوبون (${couponDiscountPercent}%):`, `Discount (${couponDiscountPercent}%):`)}</span>
                  <span className="font-mono">-{formatSAR(cartDiscount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>{t('الشحن والتركيب:', 'Shipping & Installation:')}</span>
                <span className="text-emerald-700 font-bold">
                  {deliveryFee === 0 ? t('مجاناً', 'FREE') : formatSAR(deliveryFee)}
                </span>
              </div>

              <div className="flex justify-between text-[11px] text-neutral-400">
                <span>{t('مشمول ضريبة القيمة المضافة (15%):', 'VAT (15% Included):')}</span>
                <span className="font-mono">{formatSAR(vatAmount)}</span>
              </div>

              <div className="flex justify-between text-sm font-black text-neutral-900 pt-2 border-t border-neutral-200">
                <span>{t('الإجمالي النهائي:', 'Final Total:')}</span>
                <span className="text-emerald-800 text-base">{formatSAR(cartTotal)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xl shadow-emerald-700/20 flex items-center justify-center gap-2 transition active:scale-95"
            >
              <span>{t('متابعة الدفع الآمن (مدى / Apple Pay)', 'Proceed to Secure Payment')}</span>
              {dir === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-500 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t('دفع سعودي محلي آمن 100% مشفر بمعايير البنك المركزي', '100% Secure Saudi Payment Gateway')}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
