import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SAUDI_CITIES } from '../data/citiesData';
import { PaymentMethod, CustomerOrder } from '../types';
import {
  X,
  ShieldCheck,
  CreditCard,
  Smartphone,
  Lock,
  CheckCircle2,
  AlertCircle,
  Truck,
  Building,
  User,
  Phone,
  MapPin,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Sparkles
} from 'lucide-react';

interface CheckoutModalProps {
  onOrderSuccess: (order: CustomerOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ onOrderSuccess }) => {
  const {
    t,
    dir,
    cart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    cartSubtotal,
    cartDiscount,
    deliveryFee,
    cartTotal,
    vatAmount,
    formatSAR,
    submitOrder
  } = useApp();

  const [step, setStep] = useState<'details' | 'payment' | 'processing' | 'otp'>('details');

  // Customer Form State
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('05');
  const [email, setEmail] = useState('');
  const [selectedCity, setSelectedCity] = useState(SAUDI_CITIES[0].nameAr);
  const [district, setDistrict] = useState(SAUDI_CITIES[0].popularDistrictsAr[0]);
  const [address, setAddress] = useState('');
  const [includeInstallation, setIncludeInstallation] = useState(true);

  // Payment Form State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mada');
  const [cardNumber, setCardNumber] = useState('4847 9200 ');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('08/28');
  const [cvv, setCvv] = useState('883');
  const [stcPhone, setStcPhone] = useState('05');
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutOpen) return null;

  // Split calculations for Tamara (4 interest-free payments)
  const tamaraInstallment = Math.round((cartTotal / 4) * 100) / 100;

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || phone.length < 9) {
      alert(t('يرجى كتابة الاسم ورقم الجوال السعودي بشكل صحيح', 'Please provide a valid name and Saudi mobile number'));
      return;
    }
    setStep('payment');
  };

  const handleStartPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setStep('processing');

    setTimeout(() => {
      setIsProcessing(false);
      // For Mada and STC Pay, simulate authentic Saudi 3D-Secure SMS OTP flow!
      if (paymentMethod === 'mada' || paymentMethod === 'stc_pay' || paymentMethod === 'visa') {
        setStep('otp');
      } else {
        // Apple Pay, Tamara, COD complete directly
        completeFinalOrder();
      }
    }, 1200);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length < 4) {
      setOtpError(true);
      return;
    }
    setOtpError(false);
    completeFinalOrder();
  };

  const completeFinalOrder = () => {
    const createdOrder = submitOrder({
      customerName,
      phone,
      email: email || `${phone}@customer.sa`,
      city: selectedCity,
      district,
      address: address || `${t('الفيلا / الشقة', 'Villa / Apt')}, ${district}`,
      items: cart,
      subtotal: cartSubtotal,
      discount: cartDiscount,
      deliveryFee,
      installationFee: 0,
      vatAmount,
      total: cartTotal,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending_cod' : 'paid',
      orderStatus: 'manufacturing'
    });

    setIsCheckoutOpen(false);
    onOrderSuccess(createdOrder);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            <div>
              <h3 className="text-base font-bold text-neutral-900">
                {t('بوابة الدفع الآمنة المعتمدة بالمملكة', 'Secure Saudi Payment Gateway')}
              </h3>
              <p className="text-[11px] text-neutral-500">
                {t('مشفرة بأعلى معايير الأمان 256-bit SSL', '256-bit SSL Bank-Grade Encryption')}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 rounded-xl text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Indicator */}
        <div className="px-6 py-3 bg-neutral-100/70 border-b border-neutral-200 flex items-center justify-center gap-6 text-xs font-bold">
          <div className={`flex items-center gap-1.5 ${step === 'details' ? 'text-emerald-800' : 'text-neutral-500'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step === 'details' ? 'bg-emerald-800 text-white' : 'bg-neutral-300 text-neutral-700'}`}>
              1
            </span>
            <span>{t('بيانات التوصيل والعنوان', 'Shipping Details')}</span>
          </div>

          <div className="w-8 h-0.5 bg-neutral-300" />

          <div className={`flex items-center gap-1.5 ${step === 'payment' || step === 'otp' || step === 'processing' ? 'text-emerald-800' : 'text-neutral-500'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step !== 'details' ? 'bg-emerald-800 text-white' : 'bg-neutral-300 text-neutral-700'}`}>
              2
            </span>
            <span>{t('طريقة الدفع بالريال', 'SAR Payment')}</span>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* STEP 1: SHIPPING & CONTACT */}
          {step === 'details' && (
            <form onSubmit={handleNextToPayment} className="space-y-4">
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                <span className="font-semibold">{t('إجمالي قيمة الطلب شامل الضريبة 15%:', 'Order Total with 15% VAT:')}</span>
                <span className="text-base font-black text-emerald-800">{formatSAR(cartTotal)}</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                  {t('الاسم الكريم (العميل)', 'Full Name')} *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute right-3 rtl:right-3 rtl:left-auto ltr:left-3 ltr:right-auto top-3" />
                  <input
                    type="text"
                    required
                    placeholder={t('مثال: محمد بن سعد العتيبي', 'e.g. Mohammed Al-Otaibi')}
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded-xl px-10 py-2.5 text-sm text-neutral-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    {t('رقم الجوال السعودي (للتواصل والتركيب)', 'Saudi Mobile Number')} *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-neutral-400 absolute right-3 rtl:right-3 rtl:left-auto ltr:left-3 ltr:right-auto top-3" />
                    <input
                      type="tel"
                      dir="ltr"
                      required
                      placeholder="05X XXX XXXX"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full bg-white border border-neutral-300 rounded-xl px-10 py-2.5 text-sm font-mono text-neutral-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    {t('البريد الإلكتروني (اختياري للفاتورة الضريبية)', 'Email (Optional for VAT Invoice)')}
                  </label>
                  <input
                    type="email"
                    dir="ltr"
                    placeholder="name@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-sm text-neutral-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* City and District */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    {t('المدينة بالمملكة', 'City in Saudi Arabia')} *
                  </label>
                  <select
                    value={selectedCity}
                    onChange={e => {
                      setSelectedCity(e.target.value);
                      const cityObj = SAUDI_CITIES.find(c => c.nameAr === e.target.value);
                      if (cityObj && cityObj.popularDistrictsAr.length > 0) {
                        setDistrict(cityObj.popularDistrictsAr[0]);
                      }
                    }}
                    className="w-full bg-white border border-neutral-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-neutral-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  >
                    {SAUDI_CITIES.map(c => (
                      <option key={c.id} value={c.nameAr}>
                        {t(c.nameAr, c.nameEn)} {c.freeInstallationAvailable ? `(${t('تركيب فوري متاح', 'Installation Available')})` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    {t('الحي / المنطقة', 'District / Neighborhood')} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t('مثال: حي النرجس / حي الروضة', 'e.g. Al-Narjis / Al-Rawdah')}
                    value={district}
                    onChange={e => setDistrict(e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-sm text-neutral-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                  {t('تفاصيل العنوان والشارع (رقم الفيلا / العمارة)', 'Street Address / Villa Number')}
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-neutral-400 absolute right-3 rtl:right-3 rtl:left-auto ltr:left-3 ltr:right-auto top-3" />
                  <input
                    type="text"
                    placeholder={t('مثال: شارع أنس بن مالك، فيلا رقم 14', 'e.g. Anas Ibn Malik Street, Villa #14')}
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded-xl px-10 py-2.5 text-sm text-neutral-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Free Installation Checkbox */}
              <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="install-check"
                  checked={includeInstallation}
                  onChange={e => setIncludeInstallation(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded-sm mt-0.5 accent-emerald-600 cursor-pointer"
                />
                <label htmlFor="install-check" className="text-xs cursor-pointer">
                  <strong className="text-neutral-900 block">
                    {t('نعم، أرغب في حضور فني متخصص لتركيب الستائر مجاناً', 'Yes, I want a professional technician to install the blinds for FREE')}
                  </strong>
                  <span className="text-neutral-500">
                    {t('يتواصل معك المنسق هاتفياً بعد إتمام الطلب لتحديد الموعد المناسب لزيارتك.', 'Our coordinator will call you to schedule a convenient installation appointment.')}
                  </span>
                </label>
              </div>

              {/* Submit to Step 2 */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xl shadow-emerald-700/20 flex items-center justify-center gap-2 transition active:scale-95"
              >
                <span>{t('المتابعة لاختيار طريقة الدفع', 'Continue to Payment Method')}</span>
                {dir === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          )}

          {/* STEP 2: PAYMENT METHOD */}
          {step === 'payment' && (
            <form onSubmit={handleStartPayment} className="space-y-5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                  {t('اختر وسيلة الدفع بالريال السعودي:', 'Select Saudi Payment Method:')}
                </h4>
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="text-xs text-emerald-700 font-semibold hover:underline"
                >
                  {t('← تعديل بيانات التوصيل', '← Edit Shipping')}
                </button>
              </div>

              {/* Payment Methods Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {/* Mada */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('mada')}
                  className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1 ${
                    paymentMethod === 'mada'
                      ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-600/20'
                      : 'border-neutral-200 bg-white hover:bg-neutral-50'
                  }`}
                >
                  <span className="font-black text-emerald-800 text-sm tracking-wide">مدى mada</span>
                  <span className="text-[10px] text-neutral-500">{t('بطاقات الصراف السعودية', 'Saudi Debit Cards')}</span>
                </button>

                {/* Apple Pay */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple_pay')}
                  className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1 ${
                    paymentMethod === 'apple_pay'
                      ? 'border-neutral-900 bg-neutral-900 text-white ring-2 ring-neutral-900/20'
                      : 'border-neutral-200 bg-white hover:bg-neutral-50'
                  }`}
                >
                  <span className="font-bold text-sm tracking-wide"> Pay</span>
                  <span className={`text-[10px] ${paymentMethod === 'apple_pay' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    {t('دفع فوري بلمسة واحدة', 'One-touch checkout')}
                  </span>
                </button>

                {/* Tamara */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('tamara')}
                  className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1 ${
                    paymentMethod === 'tamara'
                      ? 'border-amber-600 bg-amber-50/70 ring-2 ring-amber-600/20'
                      : 'border-neutral-200 bg-white hover:bg-neutral-50'
                  }`}
                >
                  <span className="font-black text-amber-800 text-sm">تمارا tamara</span>
                  <span className="text-[10px] text-neutral-500">{t('قسمها على 4 دفعات 0%', '4 Split Payments 0%')}</span>
                </button>

                {/* STC Pay */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('stc_pay')}
                  className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1 ${
                    paymentMethod === 'stc_pay'
                      ? 'border-purple-600 bg-purple-50/70 ring-2 ring-purple-600/20'
                      : 'border-neutral-200 bg-white hover:bg-neutral-50'
                  }`}
                >
                  <span className="font-black text-purple-800 text-sm">stc pay</span>
                  <span className="text-[10px] text-neutral-500">{t('محفظة إس تي سي باي', 'STC Digital Wallet')}</span>
                </button>

                {/* Visa / Master */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('visa')}
                  className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1 ${
                    paymentMethod === 'visa'
                      ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-600/20'
                      : 'border-neutral-200 bg-white hover:bg-neutral-50'
                  }`}
                >
                  <span className="font-black text-blue-900 text-sm">VISA / MasterCard</span>
                  <span className="text-[10px] text-neutral-500">{t('البطاقات الائتمانية', 'Credit Cards')}</span>
                </button>

                {/* Pay on Delivery / Installation */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1 ${
                    paymentMethod === 'cod'
                      ? 'border-neutral-700 bg-neutral-100 ring-2 ring-neutral-700/20'
                      : 'border-neutral-200 bg-white hover:bg-neutral-50'
                  }`}
                >
                  <span className="font-bold text-neutral-900 text-sm">{t('الدفع بعد التركيب', 'Pay on Install')}</span>
                  <span className="text-[10px] text-neutral-500">{t('نقداً أو شبكة للفني', 'Cash or Card POS')}</span>
                </button>
              </div>

              {/* Dynamic Payment Interface */}
              {/* IF MADA OR VISA */}
              {(paymentMethod === 'mada' || paymentMethod === 'visa') && (
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-neutral-700">
                    <span>{paymentMethod === 'mada' ? t('بيانات بطاقة مدى (Mada)', 'Mada Debit Card Details') : t('بيانات البطاقة الائتمانية', 'Credit Card Details')}</span>
                    <span className="text-[10px] text-emerald-700 font-mono">3D-SECURE 2.0</span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-600 mb-1">{t('رقم البطاقة (16 رقم)', 'Card Number')}</label>
                    <input
                      type="text"
                      dir="ltr"
                      value={cardNumber}
                      onChange={e => setCardNumber(e.target.value)}
                      placeholder="5888 1234 5678 9012"
                      className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2 font-mono text-sm text-neutral-900 focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-600 mb-1">{t('تاريخ الانتهاء', 'Expiry Date')}</label>
                      <input
                        type="text"
                        dir="ltr"
                        value={expiry}
                        onChange={e => setExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2 font-mono text-sm text-neutral-900 focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-600 mb-1">{t('رمز الأمان (CVV)', 'Security Code (CVV)')}</label>
                      <input
                        type="password"
                        dir="ltr"
                        maxLength={4}
                        value={cvv}
                        onChange={e => setCvv(e.target.value)}
                        placeholder="123"
                        className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2 font-mono text-sm text-neutral-900 focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* IF APPLE PAY */}
              {paymentMethod === 'apple_pay' && (
                <div className="p-5 rounded-2xl bg-neutral-900 text-white text-center space-y-3">
                  <div className="text-2xl font-black"> Pay</div>
                  <p className="text-xs text-neutral-300">
                    {t(
                      'اضغط على الزر أدناه للدفع الفوري عبر المحفظة مع التحقق بالبصمة أو Face ID.',
                      'Tap the button below to authorize payment instantly with Face ID or Touch ID.'
                    )}
                  </p>
                  <div className="text-base font-bold text-emerald-400">
                    {formatSAR(cartTotal)}
                  </div>
                </div>
              )}

              {/* IF TAMARA */}
              {paymentMethod === 'tamara' && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-900 text-sm">تمارا - قسمها على 4 دفعات بدون فوائد</span>
                    <span className="text-xs font-bold text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded">0% رسوم</span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    <div className="p-2 bg-white rounded-xl border border-amber-200">
                      <div className="text-[10px] text-neutral-500">{t('اليوم', 'Today')}</div>
                      <div className="font-bold text-neutral-900">{tamaraInstallment} {t('ر.س', 'SAR')}</div>
                    </div>
                    <div className="p-2 bg-white rounded-xl border border-amber-200">
                      <div className="text-[10px] text-neutral-500">{t('الشهر 1', 'Month 1')}</div>
                      <div className="font-bold text-neutral-900">{tamaraInstallment} {t('ر.س', 'SAR')}</div>
                    </div>
                    <div className="p-2 bg-white rounded-xl border border-amber-200">
                      <div className="text-[10px] text-neutral-500">{t('الشهر 2', 'Month 2')}</div>
                      <div className="font-bold text-neutral-900">{tamaraInstallment} {t('ر.س', 'SAR')}</div>
                    </div>
                    <div className="p-2 bg-white rounded-xl border border-amber-200">
                      <div className="text-[10px] text-neutral-500">{t('الشهر 3', 'Month 3')}</div>
                      <div className="font-bold text-neutral-900">{tamaraInstallment} {t('ر.س', 'SAR')}</div>
                    </div>
                  </div>
                  <p className="text-[11px] text-amber-900">
                    {t('متوافقة مع أحكام الشريعة الإسلامية وبدون أي رسوم تأخير.', 'Sharia-compliant with zero interest or hidden fees.')}
                  </p>
                </div>
              )}

              {/* IF STC PAY */}
              {paymentMethod === 'stc_pay' && (
                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-900 text-sm">stc pay - الدفع المباشر برقم الجوال</span>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-700 mb-1">{t('رقم جوال حساب STC Pay المسجل', 'Registered STC Mobile')}</label>
                    <input
                      type="tel"
                      dir="ltr"
                      value={stcPhone}
                      onChange={e => setStcPhone(e.target.value)}
                      placeholder="05X XXX XXXX"
                      className="w-full bg-white border border-purple-300 rounded-xl px-4 py-2 font-mono text-sm text-neutral-900 focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              )}

              {/* IF CASH / CARD ON INSTALLATION */}
              {paymentMethod === 'cod' && (
                <div className="p-4 rounded-2xl bg-neutral-100 border border-neutral-300 space-y-2">
                  <span className="font-bold text-neutral-900 text-sm block">{t('الدفع عند الاستلام وبعد التركيب', 'Pay on Delivery / Installation')}</span>
                  <p className="text-xs text-neutral-600">
                    {t(
                      'سيتصل بك المنسق لتأكيد المقاسات وتحديد موعد حضور الفني. يمكنك الدفع نقداً أو عبر جهاز الشبكة (مدى) مع الفني بعد معاينة الستائر وتركيبها ورضاك التام عنها.',
                      'Our coordinator will contact you to confirm dimensions and schedule visit. You can pay cash or with Mada card POS machine upon final installation.'
                    )}
                  </p>
                </div>
              )}

              {/* Summary and Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className={`w-full py-4 px-6 rounded-2xl font-black text-sm shadow-xl flex items-center justify-center gap-2 transition active:scale-95 ${
                    paymentMethod === 'apple_pay'
                      ? 'bg-neutral-950 hover:bg-neutral-900 text-white'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-700/20'
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {paymentMethod === 'apple_pay'
                      ? t(`دفع عبر  Pay بمبلغ ${formatSAR(cartTotal)}`, `Pay with  Pay ${formatSAR(cartTotal)}`)
                      : t(`تأكيد ودفع ${formatSAR(cartTotal)} بأمان`, `Confirm & Pay ${formatSAR(cartTotal)} Securely`)}
                  </span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: PROCESSING */}
          {step === 'processing' && (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin mx-auto" />
              <h4 className="text-lg font-bold text-neutral-900">
                {t('جاري الاتصال الآمن مع البنك المركزي...', 'Connecting securely to payment network...')}
              </h4>
              <p className="text-xs text-neutral-500">
                {t('يرجى عدم إغلاق الصفحة أو الضغط على زر الرجوع.', 'Please do not refresh or close this window.')}
              </p>
            </div>
          )}

          {/* STEP 4: 3D SECURE OTP SIMULATION (AUTHENTIC SAUDI MADA / STC EXPERIENCE) */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="p-4 sm:p-6 rounded-2xl bg-neutral-50 border border-neutral-300 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                <div className="flex items-center gap-2">
                  <span className="font-black text-emerald-800 text-sm">مدى mada</span>
                  <span className="text-xs text-neutral-400">|</span>
                  <span className="text-xs font-bold text-neutral-800">{t('التحقق الآمن (رمز OTP)', 'Verified by 3D-Secure')}</span>
                </div>
                <span className="text-xs font-mono font-bold text-neutral-600">{formatSAR(cartTotal)}</span>
              </div>

              <div className="text-xs text-neutral-600 leading-relaxed">
                {t(
                  `تم إرسال رمز التحقق عبر رسالة نصية قصيرة SMS إلى جوالك المنتهي بـ (**${phone.slice(-4) || '5678'}) لإتمام عملية الشراء لمتجر سديل لستائر الرول.`,
                  `An SMS verification code has been sent to your mobile ending in (**${phone.slice(-4) || '5678'}) to authorize this purchase with Sadeel Blinds.`
                )}
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
                💡 {t('كود التحقق التجريبي هو: 1234 (أو أي 4 أرقام)', 'Demo OTP code: 1234 (or any 4 digits)')}
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1.5">{t('أدخل رمز التحقق (4 أرقام):', 'Enter OTP Code (4 Digits):')}</label>
                <input
                  type="text"
                  maxLength={6}
                  dir="ltr"
                  autoFocus
                  placeholder="1234"
                  value={otpCode}
                  onChange={e => setOtpCode(e.target.value)}
                  className="w-full text-center text-xl font-mono tracking-widest bg-white border border-neutral-300 rounded-xl py-2.5 font-black text-neutral-900 focus:ring-2 focus:ring-emerald-600"
                />
                {otpError && (
                  <p className="text-xs text-red-600 mt-1">{t('يرجى إدخال 4 أرقام على الأقل', 'Please enter at least 4 digits')}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition active:scale-95"
              >
                {t('تأكيد الدفع وإصدار الفاتورة الضريبية', 'Verify Payment & Issue Tax Invoice')}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
