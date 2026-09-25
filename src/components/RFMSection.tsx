import React, { useState } from 'react';
import { RFMSegmentSummary, CustomerProfile, RFMSegmentType } from '../types';
import { analyzeCustomerStrategy } from '../services/geminiService';
import { Users, AlertTriangle, Sparkles, Filter, CheckCircle2, ChevronRight, Loader2, Info } from 'lucide-react';

interface RFMSectionProps {
  summaries: RFMSegmentSummary[];
  customers: CustomerProfile[];
}

export const RFMSection: React.FC<RFMSectionProps> = ({ summaries, customers }) => {
  const [selectedSegment, setSelectedSegment] = useState<RFMSegmentType | 'ALL'>('ALL');
  const [activeCustomer, setActiveCustomer] = useState<CustomerProfile | null>(null);
  const [aiInsight, setAiInsight] = useState<string>('');
  const [loadingAi, setLoadingAi] = useState<boolean>(false);

  const filteredCustomers = selectedSegment === 'ALL'
    ? customers
    : customers.filter(c => c.rfmSegment === selectedSegment);

  const handleAnalyzeCustomer = async (cust: CustomerProfile) => {
    setActiveCustomer(cust);
    setLoadingAi(true);
    setAiInsight('');
    const insight = await analyzeCustomerStrategy(cust);
    setAiInsight(insight);
    setLoadingAi(false);
  };

  const getSegmentBadgeColor = (segment: RFMSegmentType) => {
    switch (segment) {
      case 'VIP': return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Active': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'At-Risk': return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'Sleeping': return 'bg-zinc-700/30 text-zinc-400 border-zinc-700/50';
      case 'Newbie': return 'bg-sky-500/10 text-sky-400 border-sky-500/30';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 p-6 rounded-2xl border border-zinc-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-sky-400" />
            RFM Сегментація Клієнтської Бази
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Аналіз за датою останньої покупки (Recency), частотою (Frequency) та чеком (Monetary) для точного таргетингу.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono bg-zinc-800/80 px-3 py-1.5 rounded-lg border border-zinc-700 text-zinc-300">
          <span>Всього аналізовано:</span>
          <span className="font-bold text-sky-400">2,502 клієнти</span>
        </div>
      </div>

      {/* Segment Summaries Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {summaries.map((sum) => {
          const isSelected = selectedSegment === sum.segment;
          return (
            <div
              key={sum.segment}
              onClick={() => setSelectedSegment(sum.segment)}
              className={`cursor-pointer rounded-xl p-4 border transition-all duration-200 ${
                isSelected
                  ? 'bg-zinc-900 border-sky-500 shadow-md shadow-sky-500/10 ring-1 ring-sky-500/50'
                  : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${getSegmentBadgeColor(sum.segment)}`}>
                  {sum.segment}
                </span>
                <span className="text-xs font-mono font-bold text-zinc-300">{sum.count} клієнтів</span>
              </div>
              
              <div className="space-y-1 text-[11px] text-zinc-400 font-mono mt-3">
                <div className="flex justify-between">
                  <span>Recency (днів):</span>
                  <span className="text-zinc-200">{sum.avgRecency}d</span>
                </div>
                <div className="flex justify-between">
                  <span>Orders (сер):</span>
                  <span className="text-zinc-200">{sum.avgFrequency}x</span>
                </div>
                <div className="flex justify-between">
                  <span>Spend (сер):</span>
                  <span className="text-zinc-200">{sum.avgMonetary.toLocaleString()} ₴</span>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-zinc-800/80 text-[10px] text-zinc-400 line-clamp-2">
                🎯 {sum.targetGoal}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Split View: Customer Table & AI Advisor */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Customer Profiles List */}
        <div className="lg:col-span-2 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
              <Filter className="w-4 h-4 text-sky-400" />
              Профілі Клієнтів ({filteredCustomers.length})
            </h3>
            <div className="flex space-x-1">
              <button
                onClick={() => setSelectedSegment('ALL')}
                className={`px-2.5 py-1 rounded text-xs font-medium ${
                  selectedSegment === 'ALL' ? 'bg-sky-500 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Всі
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-950 text-zinc-400 uppercase font-mono text-[10px] border-b border-zinc-800">
                <tr>
                  <th className="py-2.5 px-3">Клієнт</th>
                  <th className="py-2.5 px-3">Сегмент</th>
                  <th className="py-2.5 px-3">Остання покупка</th>
                  <th className="py-2.5 px-3">Замовлень</th>
                  <th className="py-2.5 px-3">Сума ₴</th>
                  <th className="py-2.5 px-3">Churn Risk</th>
                  <th className="py-2.5 px-3 text-right">Дія AI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 font-mono">
                {filteredCustomers.map((c) => (
                  <tr
                    key={c.id}
                    className={`hover:bg-zinc-800/40 transition-colors ${
                      activeCustomer?.id === c.id ? 'bg-sky-500/10' : ''
                    }`}
                  >
                    <td className="py-3 px-3 font-sans">
                      <div className="font-medium text-white">{c.name}</div>
                      <div className="text-[10px] text-zinc-400">{c.email}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] border ${getSegmentBadgeColor(c.rfmSegment)}`}>
                        {c.rfmSegment}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-zinc-300">{c.recencyDays} днів тому</td>
                    <td className="py-3 px-3 text-zinc-300">{c.frequencyOrders}x</td>
                    <td className="py-3 px-3 text-emerald-400 font-semibold">{c.monetarySpend.toLocaleString()} ₴</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center space-x-1.5">
                        <div className="w-12 bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              c.churnProbability > 60 ? 'bg-rose-500' : c.churnProbability > 30 ? 'bg-amber-500' : 'bg-emerald-400'
                            }`}
                            style={{ width: `${c.churnProbability}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-zinc-400">{c.churnProbability}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => handleAnalyzeCustomer(c)}
                        className="inline-flex items-center px-2 py-1 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 rounded text-[10px] transition-colors"
                      >
                        <Sparkles className="w-3 h-3 mr-1" />
                        AI Аналіз
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Retention Assistant Box */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 pb-3 border-b border-zinc-800">
              <Sparkles className="w-5 h-5 text-sky-400 animate-pulse" />
              <h3 className="text-sm font-semibold text-white">Gemini Retention Copilot</h3>
            </div>

            {activeCustomer ? (
              <div className="mt-4 space-y-3">
                <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                  <div className="text-xs font-bold text-white">{activeCustomer.name}</div>
                  <div className="text-[11px] text-zinc-400 flex justify-between mt-1">
                    <span>Сегмент: <strong className="text-sky-400">{activeCustomer.rfmSegment}</strong></span>
                    <span>Категорія: <strong>{activeCustomer.lastCategory}</strong></span>
                  </div>
                </div>

                {loadingAi ? (
                  <div className="flex flex-col items-center justify-center py-8 text-zinc-400 space-y-2">
                    <Loader2 className="w-6 h-6 animate-spin text-sky-400" />
                    <span className="text-xs font-mono">Генерація AI ретеншн-стратегії...</span>
                  </div>
                ) : (
                  <div className="bg-sky-950/20 border border-sky-500/30 rounded-xl p-4 text-xs text-zinc-200 leading-relaxed space-y-2">
                    <div className="font-semibold text-sky-300 flex items-center">
                      <Info className="w-4 h-4 mr-1" />
                      Персоналізована AI Рекомендація:
                    </div>
                    <p className="whitespace-pre-line text-zinc-300 font-sans">{aiInsight}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-12 text-center text-zinc-500 text-xs">
                Оберіть клієнта з таблиці ліворуч та натисніть <strong className="text-sky-400">"AI Аналіз"</strong> для формування персональної стратегії ретеншну.
              </div>
            )}
          </div>

          <div className="mt-6 pt-3 border-t border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between">
            <span>Powered by Gemini 2.0 Flash</span>
            <span className="text-emerald-400 flex items-center">
              <CheckCircle2 className="w-3 h-3 mr-1" /> Active
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
