import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CAMPAIGN_PRESETS } from '../data/blindsData';
import { Radio, ExternalLink, Copy, Check, ChevronDown, ChevronUp, Share2, Target } from 'lucide-react';

export const AdCampaignTester: React.FC = () => {
  const { t, activeAdSource, setAdSourceByPreset, isAdTesterOpen, setIsAdTesterOpen } = useApp();
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const getAdUrl = (source: string) => {
    const origin = window.location.origin + window.location.pathname;
    return `${origin}?utm_source=${source}&utm_campaign=${source}_ksa_promo`;
  };

  const handleCopyAdUrl = (source: string) => {
    const url = getAdUrl(source);
    navigator.clipboard.writeText(url);
    setCopiedUrl(source);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  if (!isAdTesterOpen) {
    return (
      <div className="fixed bottom-20 left-4 rtl:left-auto rtl:right-4 z-40">
        <button
          onClick={() => setIsAdTesterOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-bold shadow-2xl border border-neutral-700 hover:bg-neutral-800 transition active:scale-95 group"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <Target className="w-4 h-4 text-emerald-400" />
          <span>{t('محاكي روابط الإعلانات (Snapchat / TikTok)', 'Ad Campaigns Link Generator')}</span>
          <ChevronUp className="w-3.5 h-3.5 text-neutral-400 group-hover:-translate-y-0.5 transition" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-20 left-4 rtl:left-auto rtl:right-4 z-40 w-96 max-w-[calc(100vw-2rem)] bg-neutral-900 text-white rounded-3xl p-5 shadow-2xl border border-neutral-700">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-emerald-400" />
          <h4 className="text-xs font-black uppercase tracking-wider text-emerald-300">
            {t('أداة إعلانات المنصات (روابط الحملات)', 'Ad Campaign Traffic Setup')}
          </h4>
        </div>
        <button
          onClick={() => setIsAdTesterOpen(false)}
          className="text-neutral-400 hover:text-white p-1 rounded-lg"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      <p className="text-[11px] text-neutral-400 my-3">
        {t(
          'انسخ أي من الروابط التالية وضعها في مدير إعلانات سناب شات أو تيك توك لجلب الزوار مباشرة بعروض مخصصة وكوبون مفعل:',
          'Copy and paste these tracking URLs into Snapchat or TikTok Ads Manager to automatically show custom landing offers:'
        )}
      </p>

      {/* Preset channels */}
      <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
        {CAMPAIGN_PRESETS.map(preset => {
          const isActive = activeAdSource.source === preset.source;
          return (
            <div
              key={preset.id}
              className={`p-2.5 rounded-2xl border transition ${
                isActive
                  ? 'border-emerald-500 bg-emerald-950/40'
                  : 'border-neutral-800 bg-neutral-800/40 hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <button
                  type="button"
                  onClick={() => setAdSourceByPreset(preset.id)}
                  className="flex items-center gap-2 text-xs font-bold text-start text-white hover:text-emerald-400"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>{t(preset.badgeAr, preset.badgeEn)}</span>
                  {isActive && (
                    <span className="text-[10px] text-emerald-400 bg-emerald-900/60 px-1.5 py-0.2 rounded font-mono">
                      {t('مفعل حالياً', 'Active')}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleCopyAdUrl(preset.source)}
                  className="flex items-center gap-1 text-[11px] bg-neutral-800 hover:bg-neutral-700 text-neutral-300 px-2 py-1 rounded-lg transition active:scale-95"
                >
                  {copiedUrl === preset.source ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">{t('تم النسخ', 'Copied')}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>{t('نسخ الرابط للإعلان', 'Copy Ad URL')}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-[10px] text-neutral-400 font-mono truncate bg-neutral-950/80 p-1.5 rounded-lg">
                {getAdUrl(preset.source)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
