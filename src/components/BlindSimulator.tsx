import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sun, Moon, ArrowDown, ArrowUp, Sparkles, Check, ShieldCheck, Ruler } from 'lucide-react';

interface BlindSimulatorProps {
  onOpenCalculator?: () => void;
}

export const BlindSimulator: React.FC<BlindSimulatorProps> = ({ onOpenCalculator }) => {
  const { t, formatSAR } = useApp();
  const [blindHeightPercent, setBlindHeightPercent] = useState<number>(65); // 0 = fully closed (down), 100 = fully open (up)
  const [isDayTime, setIsDayTime] = useState<boolean>(true);
  const [selectedFabric, setSelectedFabric] = useState<'blackout' | 'sunscreen' | 'zebra'>('blackout');
  const [selectedColorHex, setSelectedColorHex] = useState<string>('#E7DFD5'); // Warm Desert Beige
  const [chainSide, setChainSide] = useState<'right' | 'left'>('right');

  // Adjust blind height
  const pullDown = () => {
    setBlindHeightPercent(prev => Math.max(0, prev - 20));
  };

  const pullUp = () => {
    setBlindHeightPercent(prev => Math.min(100, prev + 20));
  };

  // Convert blindHeightPercent:
  // When blindHeightPercent is 0%: Blind is ALL THE WAY DOWN (covering 100% of window)
  // When blindHeightPercent is 100%: Blind is ALL THE WAY UP (covering 0% of window, rolled up)
  const coveragePercent = 100 - blindHeightPercent;

  return (
    <div className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-emerald-950 text-white rounded-3xl p-6 md:p-10 shadow-2xl border border-neutral-800 relative overflow-hidden">
      {/* Glow decorative effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2 border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            {t('محاكي السلسلة والرفع التفاعلي الحي', 'Live Interactive Roller & Pull-Cord Simulator')}
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            {t('جرّب سحب الستارة بالسلسلة (أعلى وأسفل)', 'Experience Pulling the Blind with Chain (Up & Down)')}
          </h2>
          <p className="text-neutral-400 text-sm md:text-base mt-1 max-w-xl">
            {t(
              'اختبر جودة وسلاسة آلية السحب بالسلسلة وشاهد قدرة القماش على عزل أشعة شمس المملكة وحماية خصوصية منزلك في الحال.',
              'Test the smoothness of the precision bead pull chain and visualize how the fabric blocks intense Saudi sun and secures privacy.'
            )}
          </p>
        </div>

        {/* Quick controls: Day / Night mode */}
        <div className="flex items-center gap-2 self-start md:self-auto bg-neutral-800/80 p-1.5 rounded-2xl border border-neutral-700">
          <button
            onClick={() => setIsDayTime(true)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              isDayTime
                ? 'bg-amber-500 text-neutral-950 shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Sun className="w-4 h-4" />
            {t('شمس نهار الرياض (45°C)', 'Daylight Sun (45°C)')}
          </button>
          <button
            onClick={() => setIsDayTime(false)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              !isDayTime
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Moon className="w-4 h-4" />
            {t('أجواء ليلية هادئة', 'Night Ambience')}
          </button>
        </div>
      </div>

      {/* Simulator Main Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* The Window Frame Visualizer */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full max-w-md bg-neutral-950 rounded-2xl p-4 shadow-inner border border-neutral-800">
            {/* Top cassette / roller tube header */}
            <div className="w-full bg-gradient-to-r from-neutral-300 via-neutral-100 to-neutral-400 h-8 rounded-t-lg shadow flex items-center justify-between px-4 border-b border-neutral-400">
              <span className="text-[10px] font-bold text-neutral-700 uppercase tracking-widest">
                Sadeel Pro-Roller 38mm
              </span>
              <span className="text-[10px] text-neutral-600 font-mono">
                {coveragePercent === 100
                  ? t('مغلقة بالكامل 100%', 'Closed 100%')
                  : coveragePercent === 0
                  ? t('مرفوعة للأعلى 0%', 'Open 0%')
                  : t(`مغطاة بنسبة ${coveragePercent}%`, `${coveragePercent}% Closed`)}
              </span>
            </div>

            {/* Window glass and background scenery */}
            <div
              className={`relative h-72 md:h-80 w-full rounded-b-lg overflow-hidden border-2 border-t-0 border-neutral-700 transition-colors duration-700 flex items-center justify-center ${
                isDayTime
                  ? 'bg-gradient-to-b from-sky-400 via-amber-200 to-emerald-200'
                  : 'bg-gradient-to-b from-slate-900 via-indigo-950 to-neutral-900'
              }`}
            >
              {/* Window Landscape / Room view outside */}
              <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none select-none">
                <div className="flex justify-between items-start">
                  {isDayTime ? (
                    <div className="w-16 h-16 rounded-full bg-amber-300 blur-sm shadow-2xl shadow-amber-400 animate-pulse" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-slate-200 shadow-lg shadow-indigo-400/50 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-slate-100" />
                    </div>
                  )}
                  <div className="text-right">
                    <p className="text-[11px] font-bold text-neutral-800/80 bg-white/40 backdrop-blur-xs px-2 py-0.5 rounded">
                      {isDayTime ? t('إطلالة الحديقة الخارجية', 'Garden Outside View') : t('سماء المدينة ليلاً', 'Night City Skyline')}
                    </p>
                  </div>
                </div>

                {/* Window Mullions / Cross Frame */}
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none">
                  <div className="border-r border-b border-white/25" />
                  <div className="border-b border-white/25" />
                  <div className="border-r border-white/25" />
                  <div />
                </div>

                {/* Outside silhouettes (palm tree & architectural modern home) */}
                <div className="text-xs text-neutral-800/60 font-semibold self-center">
                  🌴 {t('واجهة زجاجية عازلة', 'Double Glazed Window')}
                </div>
              </div>

              {/* THE ROLLER BLIND FABRIC SHEET */}
              <div
                className="absolute top-0 left-0 right-0 transition-all duration-300 ease-out shadow-2xl flex flex-col justify-end"
                style={{
                  height: `${coveragePercent}%`,
                  backgroundColor: selectedColorHex,
                  opacity:
                    selectedFabric === 'blackout'
                      ? 0.99
                      : selectedFabric === 'sunscreen'
                      ? 0.75
                      : 0.92,
                  backgroundImage:
                    selectedFabric === 'zebra'
                      ? 'repeating-linear-gradient(0deg, transparent, transparent 18px, rgba(0,0,0,0.3) 18px, rgba(0,0,0,0.3) 36px)'
                      : selectedFabric === 'sunscreen'
                      ? 'radial-gradient(circle, rgba(0,0,0,0.2) 1px, transparent 1px)'
                      : 'none',
                  backgroundSize: selectedFabric === 'sunscreen' ? '6px 6px' : 'auto'
                }}
              >
                {/* Bottom weight bar (ثقالة ألمنيوم سفلية) */}
                <div className="w-full h-4 bg-gradient-to-r from-neutral-400 via-neutral-100 to-neutral-400 border-t border-neutral-500 shadow-md flex items-center justify-center">
                  <div className="w-12 h-1 bg-neutral-400 rounded-full" />
                </div>
              </div>

              {/* THE PULL CORD / BEAD CHAIN (دوري / سلسلة السحب) */}
              <div
                className={`absolute top-0 ${
                  chainSide === 'right' ? 'right-3' : 'left-3'
                } z-20 flex flex-col items-center cursor-pointer group`}
                onClick={() => (coveragePercent > 50 ? pullUp() : pullDown())}
                title={t('انقر لسحب السلسلة', 'Click to pull chain')}
              >
                {/* Upper chain link */}
                <div className="w-1 bg-neutral-300/80 rounded-full h-44 flex flex-col justify-between items-center py-1 group-hover:bg-amber-300 transition-colors">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-gradient-to-br from-neutral-200 to-neutral-500 shadow-xs border border-neutral-400 group-hover:scale-110 transition-transform"
                    />
                  ))}
                </div>

                {/* Safety bottom pull tassel / weight */}
                <div className="w-4 h-7 bg-gradient-to-b from-neutral-300 to-neutral-600 rounded-md shadow-lg border border-neutral-400 -mt-1 group-hover:bg-amber-500 transition-all flex items-center justify-center">
                  <div className="w-1.5 h-3 bg-neutral-700/40 rounded-xs" />
                </div>

                <div className="mt-1 bg-neutral-900/90 text-amber-300 text-[10px] px-1.5 py-0.5 rounded font-mono border border-neutral-700 group-hover:scale-105 transition">
                  {t('سلسلة السحب', 'Pull Chain')}
                </div>
              </div>

              {/* Blackout status indicator */}
              <div className="absolute bottom-2 left-2 z-10">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-neutral-900/80 text-white backdrop-blur-xs border border-neutral-700 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  {selectedFabric === 'blackout'
                    ? t('عزل ضوء 100% بلاك أوت', '100% Blackout')
                    : selectedFabric === 'sunscreen'
                    ? t('حجب وهج 95% صن سكرين', '95% Glare Block')
                    : t('تحكم مزدوج زيبرا ليل/نهار', 'Zebra Dual Control')}
                </span>
              </div>
            </div>

            {/* Slider / cord pull controls */}
            <div className="mt-4 flex items-center justify-between gap-3">
              <button
                onClick={pullDown}
                disabled={coveragePercent >= 100}
                className="flex-1 py-2 px-3 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition active:scale-95 border border-neutral-700"
              >
                <ArrowDown className="w-4 h-4 text-emerald-400" />
                {t('إنزال الستارة (عتمة)', 'Pull Down (Darken)')}
              </button>

              <button
                onClick={pullUp}
                disabled={coveragePercent <= 0}
                className="flex-1 py-2 px-3 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition active:scale-95 border border-neutral-700"
              >
                <ArrowUp className="w-4 h-4 text-amber-400" />
                {t('رفع الستارة (إضاءة)', 'Pull Up (Light)')}
              </button>
            </div>

            {/* Range slider for smooth dragging */}
            <div className="mt-3 px-1">
              <div className="flex justify-between text-[11px] text-neutral-400 mb-1">
                <span>{t('مرفوعة بالكامل (مفتوحة)', 'Fully Open')}</span>
                <span>{t('مغلقة بالكامل (معتمة)', 'Fully Closed')}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={coveragePercent}
                onChange={e => setBlindHeightPercent(100 - Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-neutral-800 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Interactive Customization Controls */}
        <div className="lg:col-span-5 space-y-5">
          {/* Fabric Type Selector */}
          <div>
            <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-2">
              {t('١. نوع القماش والعزل:', '1. Choose Fabric & Insulation:')}
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setSelectedFabric('blackout')}
                className={`p-3 rounded-2xl text-start border transition ${
                  selectedFabric === 'blackout'
                    ? 'border-emerald-500 bg-emerald-500/10 text-white font-bold'
                    : 'border-neutral-800 bg-neutral-800/50 text-neutral-400 hover:border-neutral-700'
                }`}
              >
                <div className="text-sm font-semibold">{t('بلاك أوت 100%', 'Blackout 100%')}</div>
                <div className="text-[11px] text-emerald-400 mt-0.5">{t('عتمة وحرارة الصيف', 'Max Heat Block')}</div>
              </button>

              <button
                onClick={() => setSelectedFabric('sunscreen')}
                className={`p-3 rounded-2xl text-start border transition ${
                  selectedFabric === 'sunscreen'
                    ? 'border-emerald-500 bg-emerald-500/10 text-white font-bold'
                    : 'border-neutral-800 bg-neutral-800/50 text-neutral-400 hover:border-neutral-700'
                }`}
              >
                <div className="text-sm font-semibold">{t('صن سكرين 5%', 'Sunscreen 5%')}</div>
                <div className="text-[11px] text-amber-400 mt-0.5">{t('رؤية نهارية للحديقة', 'View Outside')}</div>
              </button>

              <button
                onClick={() => setSelectedFabric('zebra')}
                className={`p-3 rounded-2xl text-start border transition ${
                  selectedFabric === 'zebra'
                    ? 'border-emerald-500 bg-emerald-500/10 text-white font-bold'
                    : 'border-neutral-800 bg-neutral-800/50 text-neutral-400 hover:border-neutral-700'
                }`}
              >
                <div className="text-sm font-semibold">{t('زيبرا مزدوج', 'Zebra Dual')}</div>
                <div className="text-[11px] text-sky-400 mt-0.5">{t('خطوط ليل ونهار', 'Day & Night')}</div>
              </button>
            </div>
          </div>

          {/* Color Swatches */}
          <div>
            <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-2">
              {t('٢. اختر لون القماش المناسب لديكورك:', '2. Select Fabric Color:')}
            </label>
            <div className="flex flex-wrap items-center gap-3">
              {[
                { name: t('بيج دافئ', 'Warm Beige'), hex: '#E7DFD5' },
                { name: t('أبيض ناصع', 'Pure White'), hex: '#F8F9FA' },
                { name: t('رمادي دخاني', 'Smoke Grey'), hex: '#7D848C' },
                { name: t('فحمي داكن', 'Charcoal'), hex: '#26292B' },
                { name: t('كتان موكا', 'Mocha Linen'), hex: '#B5A89B' },
                { name: t('كحلي فاخر', 'Deep Navy'), hex: '#1C2833' }
              ].map(c => (
                <button
                  key={c.hex}
                  onClick={() => setSelectedColorHex(c.hex)}
                  className={`group relative flex items-center gap-2 p-1.5 rounded-xl border transition ${
                    selectedColorHex === c.hex
                      ? 'border-emerald-400 bg-neutral-800 shadow-md'
                      : 'border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <span
                    className="w-6 h-6 rounded-lg shadow-inner border border-black/20 flex items-center justify-center"
                    style={{ backgroundColor: c.hex }}
                  >
                    {selectedColorHex === c.hex && (
                      <Check
                        className={`w-3.5 h-3.5 ${
                          c.hex === '#F8F9FA' || c.hex === '#E7DFD5'
                            ? 'text-neutral-900'
                            : 'text-white'
                        }`}
                      />
                    )}
                  </span>
                  <span className="text-xs text-neutral-300 pr-1">{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Chain Pull Direction & Motor */}
          <div>
            <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-2">
              {t('٣. جهة سلسلة السحب (الدوري):', '3. Pull Chain Side:')}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setChainSide('right')}
                className={`py-2 px-3 rounded-xl text-xs font-medium border transition ${
                  chainSide === 'right'
                    ? 'border-emerald-500 bg-emerald-500/20 text-white font-bold'
                    : 'border-neutral-800 text-neutral-400 hover:border-neutral-700'
                }`}
              >
                {t('سلسلة على اليمين', 'Right Side Chain')}
              </button>
              <button
                onClick={() => setChainSide('left')}
                className={`py-2 px-3 rounded-xl text-xs font-medium border transition ${
                  chainSide === 'left'
                    ? 'border-emerald-500 bg-emerald-500/20 text-white font-bold'
                    : 'border-neutral-800 text-neutral-400 hover:border-neutral-700'
                }`}
              >
                {t('سلسلة على اليسار', 'Left Side Chain')}
              </button>
            </div>
          </div>

          {/* Value props summary */}
          <div className="p-4 rounded-2xl bg-neutral-800/40 border border-neutral-700/60 text-xs text-neutral-300 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{t('سلسلة سحب معدنية خالية من الصدأ مع أمان للأطفال', 'Anti-rust stainless bead chain with child safety bracket')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>{t('إمكانية الترقية لمحرك ذكي يعمل بالريموت والجوال', 'Can be upgraded to smart Somfy rechargeable motor anytime')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>{t('ضمان 5 سنوات معتمد في السعودية', '5-Year certified warranty in Saudi Arabia')}</span>
            </div>
          </div>

          {/* CTA Action button to open size calculator */}
          <button
            onClick={onOpenCalculator}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-sm shadow-xl shadow-emerald-950/50 flex items-center justify-center gap-2 transition active:scale-95"
          >
            <Ruler className="w-4 h-4" />
            {t('احسب سعر شباكك بالمقاس واطلب الآن', 'Calculate Your Window Size & Order Now')}
          </button>
        </div>
      </div>
    </div>
  );
};
