import React from 'react';
import { TrendingUp, Users, Mail, Sparkles, MessageSquare, ShieldCheck, Zap } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', label: '📊 Дашборд KPI', icon: TrendingUp },
    { id: 'rfm', label: '👥 RFM Сегментація', icon: Users },
    { id: 'funnel', label: '✉️ AI Автоворонки', icon: Mail },
    { id: 'ads', label: '🎯 Ad Copy Studio', icon: Sparkles },
    { id: 'copilot', label: '💬 AI Copilot', icon: MessageSquare },
  ];

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Hackathon Badge */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-sky-500/20">
              <Zap className="w-5 h-5 text-zinc-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-white tracking-tight">Precision Growth</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 font-mono">
                  v1.0 MVP
                </span>
              </div>
              <p className="text-xs text-zinc-400 hidden sm:block">
                Build With AI: Basics Hackathon • Performance Copilot
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-zinc-800 text-sky-400 border border-zinc-700 shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-zinc-400'}`} />
                  <span className="hidden md:inline">{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Gemini Status Indicator */}
          <div className="hidden lg:flex items-center space-x-2 text-xs bg-zinc-900 border border-zinc-800 rounded-full px-3 py-1 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-mono text-zinc-300">Gemini 2.0 AI Engine Active</span>
          </div>

        </div>
      </div>
    </header>
  );
};
