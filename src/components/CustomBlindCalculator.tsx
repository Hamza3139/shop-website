import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BLINDS_PRODUCTS } from '../data/blindsData';
import { BlindProduct, BlindColor } from '../types';
import {
  Ruler,
  Check,
  ShoppingBag,
  Info,
  Layers,
  Settings2,
  Sparkles,
  ShieldCheck,
  Truck
} from 'lucide-react';

export const CustomBlindCalculator: React.FC = () => {
  const { t, addToCart, formatSAR, couponDiscountPercent } = useApp();

  const [selectedProduct, setSelectedProduct] = useState<BlindProduct>(BLINDS_PRODUCTS[0]);
  const [selectedColor, setSelectedColor] = useState<BlindColor>(BLINDS_PRODUCTS[0].colors[0]);
  const [widthCm, setWidthCm] = useState<number>(140);
  const [heightCm, setHeightCm] = useState<number>(180);
  const [mountType, setMountType] = useState<'inside_frame' | 'outside_wall'>('outside_wall');
  const [operationType, setOperationType] = useState<'manual_chain' | 'smart_motor'>('manual_chain');
  const [chainSide, setChainSide] = useState<'right' | 'left'>('right');
  const [motorType, setMotorType] = useState<'rechargeable_battery' | 'hardwired_somfy'>('rechargeable_battery');
  const [smartHubOption, setSmartHubOption] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [isAddedSuccess, setIsAddedSuccess] = useState<boolean>(false);

  // Standard window presets in Saudi villas & apartments
  const standardSizes = [
    { label: t('شباك حمام / مطبخ', 'Bathroom / Kitchen'), w: 80, h: 100 },
    { label: t('شباك غرفة نوم مفرد', 'Standard Bedroom'), w: 120, h: 160 },
    { label: t('شباك مجلس كبير', 'Large Majlis / Living'), w: 180, h: 200 },
    { label: t('واجهة زجاجية ممتدة', 'Floor-to-Ceiling'), w: 220, h: 260 }
  ];

  // Calculation logic
  // Area in square meters (standard minimum billing 1.0 m² per blind in Saudi market)
  const effectiveWidth = widthCm / 100;
  const effectiveHeight = heightCm / 100;
  const rawArea = effectiveWidth * effectiveHeight;
  const areaSqMeters = Math.max(1.0, Number(rawArea.toFixed(2)));

  // Fabric cost
  const fabricCost = selectedProduct.basePrice * areaSqMeters;

  // Motor / Chain cost
  let mechanismCost = 0;
  if (operationType === 'smart_motor') {
    mechanismCost += motorType === 'rechargeable_battery' ? 180 : 260;
    if (smartHubOption) {
      mechanismCost += 75;
    }
  }

  const unitBasePrice = Math.round(fabricCost + mechanismCost);
  const unitDiscountedPrice = Math.round(unitBasePrice * (1 - couponDiscountPercent / 100));
  const totalItemPrice = unitDiscountedPrice * quantity;

  const handleProductSelect = (prod: BlindProduct) => {
    setSelectedProduct(prod);
    setSelectedColor(prod.colors[0]);
    if (!prod.operationTypes.includes(operationType)) {
      setOperationType(prod.operationTypes[0]);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      product: selectedProduct,
      selectedColor: selectedColor,
      widthCm,
      heightCm,
      operationType,
      chainSide,
      mountType,
      motorDetails:
        operationType === 'smart_motor'
          ? `${t('محرك بطارية قابلة للشحن', 'Rechargeable Battery Motor')}${smartHubOption ? ' + ' + t('موزع واي فاي لأليكسا', 'WiFi Alexa Hub') : ''}`
          : undefined,
      quantity,
      unitPrice: unitDiscountedPrice,
      totalPrice: totalItemPrice
    });

    setIsAddedSuccess(true);
    setTimeout(() => setIsAddedSuccess(false), 2500);
  };

  return (
    <div id="custom-calculator" className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-neutral-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-2 border border-emerald-200">
            <Ruler className="w-3.5 h-3.5 text-emerald-600" />
            {t('تفصيل مخصص بالمليمتر حسب مقاس شباكك', 'Custom Millimeter Window Blind Fabrication')}
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight">
            {t('حاسبة المقاسات والتسعير الفوري للستائر', 'Instant Window Size & Price Calculator')}
          </h2>
          <p className="text-neutral-500 text-sm md:text-base mt-1">
            {t(
              'أدخل مقاسات شباكك واختر نوع الستارة وآلية السحب (سلسلة أو محرك ذكي) واحصل على السعر النهائي شامل الضريبة والتفصيل فوراً.',
              'Input your window dimensions, select fabric and operation (chain or smart motor), and get instant pricing with VAT and custom fabrication.'
            )}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-neutral-600 bg-neutral-50 px-3 py-2 rounded-2xl border border-neutral-200">
          <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{t('توصيل وتركيب مجاني في الرياض وجدة للمقاسات المخصصة', 'Free Delivery & Installation in Riyadh & Jeddah')}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Specifications */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Select Blind Model */}
          <div>
            <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-2.5">
              {t('الخطوة ١: اختر موديل الستارة الرول', 'Step 1: Select Roller Blind Model')}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {BLINDS_PRODUCTS.slice(0, 5).map(prod => {
                const isSelected = selectedProduct.id === prod.id;
                return (
                  <button
                    key={prod.id}
                    type="button"
                    onClick={() => handleProductSelect(prod)}
                    className={`p-3 rounded-2xl text-start border transition flex flex-col justify-between ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-600/20 text-neutral-900'
                        : 'border-neutral-200 hover:border-neutral-300 bg-white text-neutral-700'
                    }`}
                  >
                    <div>
                      <div className="w-full h-16 rounded-xl overflow-hidden mb-2 bg-neutral-100">
                        <img
                          src={prod.image}
                          alt={t(prod.titleAr, prod.titleEn)}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-xs font-bold line-clamp-1">{t(prod.titleAr, prod.titleEn)}</div>
                      <div className="text-[11px] text-neutral-500 mt-0.5">
                        {prod.category === 'blackout'
                          ? t('بلاك أوت 100%', '100% Blackout')
                          : prod.category === 'sunscreen'
                          ? t('صن سكرين 5%', '5% Sunscreen')
                          : prod.category === 'zebra'
                          ? t('زيبرا مزدوجة', 'Zebra Dual')
                          : t('محرك ذكي', 'Smart Motor')}
                      </div>
                    </div>
                    <div className="mt-2 text-xs font-extrabold text-emerald-700">
                      {formatSAR(prod.basePrice)} <span className="text-[10px] text-neutral-500 font-normal">/ م²</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Dimensions (Width & Height) */}
          <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                {t('الخطوة ٢: مقاسات الشباك بالسنتيمتر (سم)', 'Step 2: Window Dimensions (cm)')}
              </label>
              <span className="text-xs text-neutral-500">
                {t('المساحة الإجمالية: ', 'Total Area: ')}
                <strong className="text-neutral-900 font-mono">{areaSqMeters} م²</strong>
              </span>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              <span className="text-[11px] text-neutral-500 self-center">{t('مقاسات شائعة:', 'Quick sizes:')}</span>
              {standardSizes.map((sz, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setWidthCm(sz.w);
                    setHeightCm(sz.h);
                  }}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition ${
                    widthCm === sz.w && heightCm === sz.h
                      ? 'bg-neutral-900 text-white border-neutral-900'
                      : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-100'
                  }`}
                >
                  {sz.label} ({sz.w}×{sz.h} سم)
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-1">
                  {t('العرض (سم) [من 50 إلى 300 سم]', 'Width (cm) [50 - 300 cm]')}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="50"
                    max="300"
                    value={widthCm}
                    onChange={e => setWidthCm(Math.max(30, Math.min(350, Number(e.target.value))))}
                    className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-900 font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                  <span className="absolute left-3 rtl:right-auto rtl:left-3 ltr:left-auto ltr:right-3 top-2.5 text-xs text-neutral-400">
                    {t('سم', 'cm')}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-1">
                  {t('الارتفاع (سم) [من 50 إلى 350 سم]', 'Height (cm) [50 - 350 cm]')}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="50"
                    max="350"
                    value={heightCm}
                    onChange={e => setHeightCm(Math.max(30, Math.min(400, Number(e.target.value))))}
                    className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-900 font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                  <span className="absolute left-3 rtl:right-auto rtl:left-3 ltr:left-auto ltr:right-3 top-2.5 text-xs text-neutral-400">
                    {t('سم', 'cm')}
                  </span>
                </div>
              </div>
            </div>

            {/* Mount Style selection */}
            <div className="mt-4 pt-3 border-t border-neutral-200">
              <label className="block text-xs font-semibold text-neutral-600 mb-2">
                {t('طريقة التركيب:', 'Mounting Style:')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setMountType('outside_wall')}
                  className={`p-2.5 rounded-xl text-start border text-xs transition ${
                    mountType === 'outside_wall'
                      ? 'border-emerald-600 bg-white font-bold text-neutral-900 ring-1 ring-emerald-600'
                      : 'border-neutral-200 bg-white/70 text-neutral-600 hover:bg-white'
                  }`}
                >
                  <div>{t('خارج فتحة الشباك (على الجدار)', 'Outside Frame (Wall Mount)')}</div>
                  <div className="text-[10px] text-neutral-500 mt-0.5 font-normal">
                    {t('يمنع تسرب أي ضوء من الأطراف (موصى به)', 'Zero light leaks at edges (Recommended)')}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setMountType('inside_frame')}
                  className={`p-2.5 rounded-xl text-start border text-xs transition ${
                    mountType === 'inside_frame'
                      ? 'border-emerald-600 bg-white font-bold text-neutral-900 ring-1 ring-emerald-600'
                      : 'border-neutral-200 bg-white/70 text-neutral-600 hover:bg-white'
                  }`}
                >
                  <div>{t('داخل تجويف الشباك', 'Inside Window Recess')}</div>
                  <div className="text-[10px] text-neutral-500 mt-0.5 font-normal">
                    {t('مظهر مدمج داخل الإطار الخشبي/الألمنيوم', 'Sleek integrated flush profile')}
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Step 3: Color selection */}
          <div>
            <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-2">
              {t('الخطوة ٣: لون قماش الستارة', 'Step 3: Fabric Color')}
            </label>
            <div className="flex flex-wrap gap-2.5">
              {selectedProduct.colors.map(col => {
                const isSelected = selectedColor.id === col.id;
                return (
                  <button
                    key={col.id}
                    type="button"
                    onClick={() => setSelectedColor(col)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition ${
                      isSelected
                        ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm'
                        : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-black/20"
                      style={{ backgroundColor: col.hex }}
                    />
                    <span className="text-xs font-medium">{t(col.nameAr, col.nameEn)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: Pull Mechanism (Manual Cord/Chain vs Smart Motor) */}
          <div>
            <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-2">
              {t('الخطوة ٤: آلية التشغيل والرفع (السلسلة أو المحرك الذكي)', 'Step 4: Pull Mechanism (Chain or Smart Motor)')}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setOperationType('manual_chain')}
                className={`p-4 rounded-2xl text-start border transition ${
                  operationType === 'manual_chain'
                    ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-600/20 text-neutral-900'
                    : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-bold">{t('سلسلة سحب كروية معدنية', 'Manual Stainless Pull Chain')}</div>
                  <span className="text-xs text-emerald-700 font-semibold">{t('مشمولة (مجاناً)', 'Included')}</span>
                </div>
                <p className="text-xs text-neutral-500 mt-1">
                  {t(
                    'سلسلة سحب ناعمة للغاية مصنوعة من الستانلس ستيل المقاوم للصدأ ومجهزة بقفل أمان للأطفال.',
                    'Ultra smooth bead chain made from rust-free stainless steel with child safety guide bracket.'
                  )}
                </p>
              </button>

              <button
                type="button"
                onClick={() => setOperationType('smart_motor')}
                className={`p-4 rounded-2xl text-start border transition ${
                  operationType === 'smart_motor'
                    ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-600/20 text-neutral-900'
                    : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    {t('محرك ذكي بريموت كنترول', 'Smart Motor with Remote')}
                  </div>
                  <span className="text-xs text-emerald-700 font-bold">+180 {t('ر.س', 'SAR')}</span>
                </div>
                <p className="text-xs text-neutral-500 mt-1">
                  {t(
                    'محرك هادئ للغاية ببطارية قابلة لإعادة الشحن (بدون أسلاك) مع ريموت كنترول متعدد القنوات.',
                    'Whisper-quiet motor with rechargeable lithium battery (no wiring) and multi-channel remote.'
                  )}
                </p>
              </button>
            </div>

            {/* If manual chain: Chain side */}
            {operationType === 'manual_chain' && (
              <div className="mt-3 p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-700">{t('جهة سلسلة السحب:', 'Chain Side:')}</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setChainSide('right')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium border transition ${
                      chainSide === 'right' ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white text-neutral-700'
                    }`}
                  >
                    {t('يمين الشباك', 'Right Side')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setChainSide('left')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium border transition ${
                      chainSide === 'left' ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white text-neutral-700'
                    }`}
                  >
                    {t('يسار الشباك', 'Left Side')}
                  </button>
                </div>
              </div>
            )}

            {/* If motorized: Add-on WiFi Hub */}
            {operationType === 'smart_motor' && (
              <div className="mt-3 p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center justify-between">
                <div className="text-xs">
                  <span className="font-bold text-neutral-900 block">{t('إضافة موزع واي فاي للربط مع أليكسا وجوجل', 'Add Smart WiFi Hub for Alexa & Google')}</span>
                  <span className="text-neutral-500">{t('للتحكم الصوتي وعبر الجوال من خارج المنزل (+75 ر.س)', 'For voice and remote phone control (+75 SAR)')}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSmartHubOption(prev => !prev)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                    smartHubOption
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white text-neutral-700 border-neutral-300'
                  }`}
                >
                  {smartHubOption ? t('تمت الإضافة ✓', 'Added ✓') : t('إضافة (+75)', 'Add (+75)')}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Sticky Card: Live Price Summary & Order Action */}
        <div className="lg:col-span-5 bg-neutral-900 text-white rounded-3xl p-6 shadow-2xl border border-neutral-800 sticky top-24">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
            <div>
              <span className="text-xs text-emerald-400 font-semibold">{t('ملخص المقاس والتفصيل', 'Fabrication Summary')}</span>
              <h3 className="text-lg font-bold text-white mt-0.5">{t(selectedProduct.titleAr, selectedProduct.titleEn)}</h3>
            </div>
            <span
              className="w-5 h-5 rounded-full border border-neutral-700"
              style={{ backgroundColor: selectedColor.hex }}
              title={t(selectedColor.nameAr, selectedColor.nameEn)}
            />
          </div>

          <div className="py-4 space-y-2.5 text-xs text-neutral-300 border-b border-neutral-800">
            <div className="flex justify-between">
              <span className="text-neutral-400">{t('المقاس:', 'Dimensions:')}</span>
              <span className="font-mono text-white font-bold">{widthCm} × {heightCm} {t('سم', 'cm')} ({areaSqMeters} م²)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">{t('اللون المختار:', 'Chosen Color:')}</span>
              <span className="text-white font-medium">{t(selectedColor.nameAr, selectedColor.nameEn)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">{t('نوع التركيب:', 'Mounting:')}</span>
              <span className="text-white font-medium">
                {mountType === 'outside_wall' ? t('خارجي على الجدار', 'Outside on Wall') : t('داخلي بإطار الشباك', 'Inside Recess')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">{t('نظام التحكم:', 'Operation:')}</span>
              <span className="text-white font-medium">
                {operationType === 'manual_chain'
                  ? `${t('سلسلة سحب يدوية', 'Manual Chain')} (${chainSide === 'right' ? t('يمين', 'Right') : t('يسار', 'Left')})`
                  : t('محرك ذكي بريموت', 'Smart Motor')}
              </span>
            </div>
            {operationType === 'smart_motor' && smartHubOption && (
              <div className="flex justify-between text-emerald-400">
                <span>{t('موزع واي فاي ذكي:', 'Smart WiFi Hub:')}</span>
                <span>+75 {t('ر.س', 'SAR')}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-neutral-400">{t('الضمان:', 'Warranty:')}</span>
              <span className="text-emerald-400 font-bold">{t('5 سنوات شامل القماش والآلية', '5-Year Comprehensive Warranty')}</span>
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="py-4 space-y-2 text-xs border-b border-neutral-800">
            <div className="flex justify-between text-neutral-400">
              <span>{t('السعر الأساسي للستارة:', 'Base Blind Price:')}</span>
              <span className="line-through">{formatSAR(unitBasePrice * quantity)}</span>
            </div>
            {couponDiscountPercent > 0 && (
              <div className="flex justify-between text-emerald-400 font-semibold">
                <span>{t(`خصم العرض الترويجي (${couponDiscountPercent}%):`, `Campaign Discount (${couponDiscountPercent}%):`)}</span>
                <span>-{formatSAR((unitBasePrice - unitDiscountedPrice) * quantity)}</span>
              </div>
            )}
            <div className="flex justify-between text-neutral-400">
              <span>{t('ضريبة القيمة المضافة (15% مشمولة):', 'VAT (15% Included):')}</span>
              <span className="text-neutral-300 font-mono">
                {formatSAR(((unitDiscountedPrice * quantity) * 15) / 115)}
              </span>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>{t('الشحن والتركيب:', 'Shipping & Installation:')}</span>
              <span className="text-emerald-400 font-bold">{t('مجاناً لمدن المملكة الرئيسية', 'FREE in Major KSA Cities')}</span>
            </div>
          </div>

          {/* Quantity selector & Final Price */}
          <div className="py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-400">{t('العدد:', 'Qty:')}</span>
              <div className="flex items-center bg-neutral-800 rounded-xl border border-neutral-700">
                <button
                  type="button"
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="px-2.5 py-1 text-sm text-neutral-300 hover:text-white"
                >
                  -
                </button>
                <span className="px-2 text-xs font-mono font-bold text-white">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="px-2.5 py-1 text-sm text-neutral-300 hover:text-white"
                >
                  +
                </button>
              </div>
            </div>

            <div className="text-end">
              <span className="text-[11px] text-neutral-400 block">{t('الإجمالي النهائي:', 'Total:')}</span>
              <span className="text-2xl font-black text-white text-emerald-400">
                {formatSAR(totalItemPrice)}
              </span>
            </div>
          </div>

          {/* Add to Cart button */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-neutral-950 font-black text-sm shadow-xl shadow-emerald-950 flex items-center justify-center gap-2 transition active:scale-95"
          >
            {isAddedSuccess ? (
              <>
                <Check className="w-5 h-5 text-neutral-950" />
                <span>{t('تمت الإضافة للسلة بنجاح!', 'Added to Cart Successfully!')}</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-5 h-5" />
                <span>{t('إضافة للسلة وتفصيل هذا المقاس', 'Add Custom Blind to Cart')}</span>
              </>
            )}
          </button>

          <div className="mt-3 text-center">
            <p className="text-[11px] text-neutral-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              {t('دفع آمن عبر مدى، Apple Pay، أو أقساط تمارا 0% فوائد', 'Secure Checkout with Mada, Apple Pay, or Tamara 0% interest')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
