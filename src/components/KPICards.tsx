import React from 'react';
import { OverallKPIs } from '../types';
import { TrendingUp, DollarSign, Mail, ShoppingBag, ArrowUpRight, ArrowDownRight, Target } from 'lucide-react';

interface KPICardsProps {
  kpis: OverallKPIs;
}

export const KPICards: React.FC<KPICardsProps> = ({ kpis }) => {
  const cards = [
    {
      title: 'ROAS (Окупність реклами)',
      current: `${kpis.roasCurrent}x`,
      target: `${kpis.roasTarget}x`,
      change: '+50.0%',
      isPositive: true,
      icon: TrendingUp,
      accent: 'from-emerald-500/20 to-emerald-600/5 text-emerald-400 border-emerald-500/30',
      progress: (kpis.roasCurrent / kpis.roasTarget) * 100,
      description: 'Мета: мета-креативи + PMax A/B тестування'
    },
    {
      title: 'CAC (Вартість залучення)',
      current: `$${kpis.cacCurrent.toFixed(2)}`,
      target: `$${kpis.cacTarget.toFixed(2)}`,
      change: '-20.0%',
      isPositive: true, // CAC reduction is positive
      icon: DollarSign,
      accent: 'from-sky-500/20 to-sky-600/5 text-sky-400 border-sky-500/30',
      progress: 80,
      description: 'Мета: виключення вигорання + ретаргетинг'
    },
    {
      title: 'Email Repeat Rate',
      current: `${kpis.emailRepeatRateCurrent}%`,
      target: `>${kpis.emailRepeatRateTarget}%`,
      change: '+116%',
      isPositive: true,
      icon: Mail,
      accent: 'from-purple-500/20 to-purple-600/5 text-purple-400 border-purple-500/30',
      progress: (kpis.emailRepeatRateCurrent / kpis.emailRepeatRateTarget) * 100,
      description: 'Мета: тригерні розсилки по покинутому кошику'
    },
    {
      title: 'AOV (Середній чек)',
      current: `${kpis.aovCurrent} грн`,
      target: `${kpis.aovTarget} грн`,
      change: '+12.0%',
      isPositive: true,
      icon: ShoppingBag,
      accent: 'from-amber-500/20 to-amber-600/5 text-amber-400 border-amber-500/30',
      progress: (kpis.aovCurrent / kpis.aovTarget) * 100,
      description: 'Мета: Lookbook Bundles та Cross-Sell'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="relative overflow-hidden rounded-2xl bg-zinc-900/90 border border-zinc-800/80 p-5 hover:border-zinc-700 transition-all duration-300 shadow-lg group"
          >
            {/* Background gradient blur */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${card.accent} rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-opacity`} />

            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-400 tracking-wide uppercase">{card.title}</span>
              <div className={`p-2 rounded-xl bg-zinc-800/90 border border-zinc-700/60 ${card.accent.split(' ')[2]}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>

            <div className="mt-4 flex items-baseline justify-between">
              <div>
                <span className="text-2xl font-bold text-white font-mono tracking-tight">{card.current}</span>
                <span className="ml-2 text-xs text-zinc-400 font-mono">→ Ціль: {card.target}</span>
              </div>
              <span className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${
                card.isPositive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400'
              }`}>
                {card.isPositive ? <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
                {card.change}
              </span>
            </div>

            {/* Target progress bar */}
            <div className="mt-4">
              <div className="flex justify-between text-[10px] text-zinc-400 mb-1 font-mono">
                <span>Прогрес виконання цілі</span>
                <span>{Math.round(card.progress)}%</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-sky-500 to-emerald-400 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(15, card.progress))}%` }}
                />
              </div>
            </div>

            <p className="mt-3 text-[11px] text-zinc-400 flex items-center">
              <Target className="w-3 h-3 mr-1 text-sky-400 flex-shrink-0" />
              {card.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};
