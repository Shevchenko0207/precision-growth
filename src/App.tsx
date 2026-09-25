import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { KPICards } from './components/KPICards';
import { RFMSection } from './components/RFMSection';
import { FunnelGenerator } from './components/FunnelGenerator';
import { AdStudio } from './components/AdStudio';
import { CopilotChat } from './components/CopilotChat';
import { initialKPIs, rfmSegmentSummaries, sampleCustomers } from './data/mockData';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, Cell } from 'recharts';
import { TrendingUp, Users, Mail, Sparkles, ArrowRight, Zap, Award } from 'lucide-react';

// Monthly ROAS trend chart data
const roasTrendData = [
  { month: 'Травень', roas: 2.4, target: 4.2 },
  { month: 'Червень', roas: 2.6, target: 4.2 },
  { month: 'Липень', roas: 2.8, target: 4.2 },
  { month: 'Серпень', roas: 3.4, target: 4.2 },
  { month: 'Вересень (AI)', roas: 4.2, target: 4.2 },
];

const segmentRevenueData = [
  { name: 'VIP', spend: 14200, color: '#f59e0b' },
  { name: 'Active', spend: 5800, color: '#10b981' },
  { name: 'At-Risk', spend: 4100, color: '#f43f5e' },
  { name: 'Sleeping', spend: 1900, color: '#71717a' },
  { name: 'Newbie', spend: 1650, color: '#0284c7' },
];

export function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 font-sans">
      
      {/* Navigation Header */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* KPI Cards section shown across view */}
        <KPICards kpis={initialKPIs} />

        {/* Tab 1: Executive Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Visual Analytics Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* ROAS Growth Forecast Chart */}
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      Динаміка ROAS (зростання з 2.8x до 4.2x)
                    </h3>
                    <p className="text-xs text-zinc-400">Прогноз окупності рекламного бюджету при впровадженні AI-воронок</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                    +50.0% ROAS
                  </span>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={roasTrendData}>
                      <defs>
                        <linearGradient id="colorRoas" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" stroke="#71717a" fontSize={11} tickLine={false} />
                      <YAxis stroke="#71717a" fontSize={11} domain={[2.0, 4.5]} tickLine={false} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '8px', fontSize: '12px' }}
                        formatter={(val: any) => [`${val}x`, 'ROAS']}
                      />
                      <Area type="monotone" dataKey="roas" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRoas)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* RFM Monetary Distribution Bar Chart */}
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Users className="w-4 h-4 text-sky-400" />
                      Середній чек (Monetary) по RFM-сегментах
                    </h3>
                    <p className="text-xs text-zinc-400">Порівняння середньої вартості покупок клієнтів (грн)</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded border border-sky-500/20">
                    VIP 14,200 ₴
                  </span>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={segmentRevenueData}>
                      <XAxis dataKey="name" stroke="#71717a" fontSize={11} tickLine={false} />
                      <YAxis stroke="#71717a" fontSize={11} tickLine={false} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '8px', fontSize: '12px' }}
                        formatter={(val: any) => [`${val.toLocaleString()} ₴`, 'Сер. чек']}
                      />
                      <Bar dataKey="spend" radius={[6, 6, 0, 0]}>
                        {segmentRevenueData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

            {/* Quick Action Navigation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                onClick={() => setActiveTab('rfm')}
                className="cursor-pointer bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 hover:border-sky-500/50 rounded-2xl p-6 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-base">RFM Сегментатор</h4>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  Переглянути 5 автоматичних груп клієнтів та сформувати AI-стратегію ретеншну проти Churn Risk.
                </p>
                <div className="mt-4 flex items-center text-xs font-semibold text-sky-400 group-hover:translate-x-1 transition-transform">
                  <span>До аналізу клієнтів</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>

              <div
                onClick={() => setActiveTab('funnel')}
                className="cursor-pointer bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 hover:border-purple-500/50 rounded-2xl p-6 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-base">AI Воронки (Klaviyo/SMS)</h4>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  Згенерувати тригерні серії (покинутий кошик, нагадувалка про оновлення гардеробу 60 днів).
                </p>
                <div className="mt-4 flex items-center text-xs font-semibold text-purple-400 group-hover:translate-x-1 transition-transform">
                  <span>До конструктора воронки</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>

              <div
                onClick={() => setActiveTab('ads')}
                className="cursor-pointer bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 hover:border-emerald-500/50 rounded-2xl p-6 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-base">Ad Copy Studio (Meta/PMax)</h4>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  Створити 10+ рекламних текстів та візуальних концепцій для тестування з орієнтиром на ROAS 4.2x.
                </p>
                <div className="mt-4 flex items-center text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
                  <span>Генерувати креативи</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: RFM Segmentation */}
        {activeTab === 'rfm' && (
          <RFMSection summaries={rfmSegmentSummaries} customers={sampleCustomers} />
        )}

        {/* Tab 3: AI Funnel Builder */}
        {activeTab === 'funnel' && (
          <FunnelGenerator />
        )}

        {/* Tab 4: Ad Copy Studio */}
        {activeTab === 'ads' && (
          <AdStudio />
        )}

        {/* Tab 5: Gemini Copilot Chat */}
        {activeTab === 'copilot' && (
          <CopilotChat />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 bg-zinc-950 py-6 mt-12 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <Award className="w-4 h-4 text-sky-400" />
            <span>Precision Growth • Розроблено для хакатону <strong>Build With AI: Basics</strong> (Devpost)</span>
          </div>
          <div className="font-mono text-[11px] text-zinc-400">
            Powered by Gemini 2.0 API &amp; Google AI SDK
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
