import React, { useState } from 'react';
import { AdCreativeVariant, RFMSegmentType } from '../types';
import { sampleAdCreatives } from '../data/mockData';
import { generateAIAdVariant } from '../services/geminiService';
import { Sparkles, Target, Layers, Copy, Check, Loader2, Video, TrendingUp } from 'lucide-react';

export const AdStudio: React.FC = () => {
  const [adVariants, setAdVariants] = useState<AdCreativeVariant[]>(sampleAdCreatives);
  const [platform, setPlatform] = useState<'Meta Ads' | 'Google PMax' | 'TikTok Ads'>('Meta Ads');
  const [segmentTarget, setSegmentTarget] = useState<RFMSegmentType>('VIP');
  const [loading, setLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleGenerateAd = async () => {
    setLoading(true);
    const newVariant = await generateAIAdVariant(segmentTarget, platform);
    setAdVariants(prev => [newVariant, ...prev]);
    setLoading(false);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 p-6 rounded-2xl border border-zinc-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-sky-400" />
            Ad Copy Studio (Meta Ads & Google PMax A/B)
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Генератор 10+ форматів рекламних креативів (статична інфографіка, UGC-відео, розпаковки) під кожен RFM-сегмент.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono bg-sky-500/10 text-sky-400 px-3 py-1.5 rounded-lg border border-sky-500/20">
          <span>Цільовий ROAS:</span>
          <span className="font-bold text-emerald-400">4.2x</span>
        </div>
      </div>

      {/* Control Studio Bar */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Рекламна платформа</label>
            <div className="flex space-x-2">
              {(['Meta Ads', 'Google PMax', 'TikTok Ads'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPlatform(p)}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-all ${
                    platform === p ? 'bg-sky-500/20 text-sky-400 border-sky-500' : 'bg-zinc-950 text-zinc-400 border-zinc-800'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Цільова аудиторія (RFM Сегмент)</label>
            <select
              value={segmentTarget}
              onChange={(e) => setSegmentTarget(e.target.value as RFMSegmentType)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500 font-mono"
            >
              <option value="VIP">VIP (High LTV / Repeat Buyers)</option>
              <option value="Active">Active (Середній чек)</option>
              <option value="At-Risk">At-Risk (Під загрозою відтоку)</option>
              <option value="Sleeping">Sleeping (Реактивація)</option>
              <option value="Newbie">Newbie (Конверсія в 2-гу покупку)</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleGenerateAd}
            disabled={loading}
            className="px-4 py-2 bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-zinc-950 font-bold rounded-xl text-xs flex items-center space-x-2 shadow-lg shadow-sky-500/20 transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Генерація A/B Креативу...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Згенерувати A/B Варіант</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Grid of Generated Ad Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {adVariants.map((ad) => (
          <div
            key={ad.id}
            className="bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-lg transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                  {ad.platform}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Сегмент: {ad.segmentTarget}
                </span>
              </div>

              <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 space-y-2">
                <div className="text-xs font-bold text-white font-sans">{ad.headline}</div>
                <div className="text-xs text-zinc-300 font-sans leading-relaxed">{ad.primaryText}</div>
                <div className="pt-2">
                  <span className="inline-block bg-sky-500/20 text-sky-400 px-2.5 py-1 rounded text-[11px] font-bold border border-sky-500/30">
                    CTA: {ad.ctaText}
                  </span>
                </div>
              </div>

              <div className="bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/80 text-[11px] text-zinc-400 flex items-start space-x-2">
                <Video className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-zinc-300 font-semibold block">Візуальний концепт:</span>
                  <span>{ad.visualConcept}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
              <div className="text-xs font-mono text-emerald-400 flex items-center">
                <TrendingUp className="w-3.5 h-3.5 mr-1" />
                Ціль ROAS: {ad.targetROAS}x
              </div>
              <button
                onClick={() => handleCopy(ad.id, `${ad.headline}\n\n${ad.primaryText}\n\nCTA: ${ad.ctaText}`)}
                className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs flex items-center space-x-1 transition-colors"
              >
                {copiedId === ad.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === ad.id ? 'Скопійовано' : 'Копіювати'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
