import React, { useState } from 'react';
import { FunnelEmailStep, RFMSegmentType } from '../types';
import { sampleAbandonedCartFunnel } from '../data/mockData';
import { generateAIFunnelStep } from '../services/geminiService';
import { Mail, MessageSquare, Sparkles, Plus, Clock, Gift, Send, Copy, Check, Loader2 } from 'lucide-react';

export const FunnelGenerator: React.FC = () => {
  const [funnelSteps, setFunnelSteps] = useState<FunnelEmailStep[]>(sampleAbandonedCartFunnel);
  const [targetSegment, setTargetSegment] = useState<RFMSegmentType>('At-Risk');
  const [selectedChannel, setSelectedChannel] = useState<'Email' | 'SMS'>('Email');
  const [customGoal, setCustomGoal] = useState<string>('Нагадування через 60 днів після покупки з пропозицією оновлення гардероба');
  const [generating, setGenerating] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleGenerateStep = async () => {
    setGenerating(true);
    const nextStepNum = funnelSteps.length + 1;
    const newStep = await generateAIFunnelStep(targetSegment, selectedChannel, nextStepNum, customGoal);
    setFunnelSteps(prev => [...prev, newStep]);
    setGenerating(false);
  };

  const handleCopyCode = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 p-6 rounded-2xl border border-zinc-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Mail className="w-5 h-5 text-sky-400" />
            AI Автоворонки & Тригерні Серії
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Автоматична генерація гіперперсоналізованих email/SMS ланцюжків для Klaviyo та SMS-воркерів на основі Gemini AI.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-lg border border-emerald-500/20">
          <span>Очікуване зростання повторних продажів:</span>
          <span className="font-bold">&gt; 30%</span>
        </div>
      </div>

      {/* Generator Control Panel */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-sky-400" />
          Згенерувати новий крок воронки з Gemini AI
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Цільовий RFM Сегмент</label>
            <select
              value={targetSegment}
              onChange={(e) => setTargetSegment(e.target.value as RFMSegmentType)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500 font-mono"
            >
              <option value="VIP">VIP (Постійні клієнти)</option>
              <option value="Active">Active (Активні)</option>
              <option value="At-Risk">At-Risk (Під загрозою відтоку)</option>
              <option value="Sleeping">Sleeping (Сплячі)</option>
              <option value="Newbie">Newbie (Новачки)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Канал зв'язку</label>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setSelectedChannel('Email')}
                className={`flex-1 py-2 rounded-lg text-xs font-medium flex items-center justify-center space-x-1.5 border transition-all ${
                  selectedChannel === 'Email' ? 'bg-sky-500/20 text-sky-400 border-sky-500' : 'bg-zinc-950 text-zinc-400 border-zinc-800'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email (Klaviyo)</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedChannel('SMS')}
                className={`flex-1 py-2 rounded-lg text-xs font-medium flex items-center justify-center space-x-1.5 border transition-all ${
                  selectedChannel === 'SMS' ? 'bg-purple-500/20 text-purple-400 border-purple-500' : 'bg-zinc-950 text-zinc-400 border-zinc-800'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>SMS / Viber</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Мета кроку</label>
            <input
              type="text"
              value={customGoal}
              onChange={(e) => setCustomGoal(e.target.value)}
              placeholder="напр., Знижка -15% на 2-ге замовлення"
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500 font-sans"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleGenerateStep}
            disabled={generating}
            className="px-4 py-2 bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-zinc-950 font-bold rounded-xl text-xs flex items-center space-x-2 shadow-lg shadow-sky-500/20 transition-all disabled:opacity-50"
          >
            {generating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Генерація AI тексту...</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Додати AI крок у воронку</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Visual Timeline of Funnel Steps */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-300">Послідовність Ланцюжка ({funnelSteps.length} кроків)</h3>

        <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-zinc-800">
          {funnelSteps.map((step, idx) => (
            <div key={step.id} className="relative group">
              {/* Timeline marker node */}
              <div className="absolute -left-6 top-4 w-6 h-6 rounded-full bg-zinc-950 border-2 border-sky-400 flex items-center justify-center text-[10px] font-bold text-sky-400 font-mono">
                {idx + 1}
              </div>

              <div className="bg-zinc-900 border border-zinc-800 group-hover:border-zinc-700 rounded-xl p-5 shadow-lg transition-all space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-3">
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      step.channel === 'Email' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30' : 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                    }`}>
                      {step.channel}
                    </span>
                    <span className="text-xs text-zinc-400 font-mono flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1 text-zinc-400" />
                      Затримка: +{step.delayHours} год.
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center">
                      <Gift className="w-3 h-3 mr-1" />
                      {step.dynamicOffer}
                    </span>
                    <button
                      onClick={() => handleCopyCode(step.id, step.bodySnippet)}
                      className="p-1.5 rounded bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                      title="Копіювати вміст розсилки"
                    >
                      {copiedId === step.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs text-zinc-400 font-mono">Тема розсилки:</div>
                  <div className="text-sm font-semibold text-white">{step.subject}</div>
                  <div className="text-xs text-zinc-400">{step.preheader}</div>
                </div>

                <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800 text-xs text-zinc-300 font-sans leading-relaxed">
                  "{step.bodySnippet}"
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
