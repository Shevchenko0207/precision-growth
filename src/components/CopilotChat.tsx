import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { askCopilot } from '../services/geminiService';
import { MessageSquare, Send, Sparkles, Loader2, Bot, User } from 'lucide-react';

export const CopilotChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: 'Вітаю! Я ваш Gemini Performance Marketing Copilot 🚀. Запитайте мене, як знизити CAC на 20%, оптимізувати LTV через воронки або налаштувати A/B тестування креативів.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    'Як знизити CAC на 20%?',
    'Які сценарії листів найефективніші для At-Risk?',
    'Як підвищити ROAS до 4.2x у Meta Ads?',
    'Скільки часу розсилати покинутий кошик?'
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    const history = messages.map(m => m.text);
    const reply = await askCopilot(text, history);

    const botMsg: ChatMessage = {
      id: `b-${Date.now()}`,
      sender: 'assistant',
      text: reply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, botMsg]);
    setLoading(false);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col h-[650px] shadow-2xl">
      
      {/* Chat Header */}
      <div className="bg-zinc-950 p-4 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Gemini Marketing Copilot</h3>
            <p className="text-[11px] text-zinc-400">Вільний діалог з AI про стратегії, CAC, LTV та ROAS</p>
          </div>
        </div>
        <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20">
          Online
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-xs">
        {messages.map((m) => {
          const isUser = m.sender === 'user';
          return (
            <div
              key={m.id}
              className={`flex items-start space-x-2.5 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs flex-shrink-0 ${
                isUser ? 'bg-sky-500 text-zinc-950 font-bold' : 'bg-zinc-800 text-sky-400 border border-zinc-700'
              }`}>
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-[80%] rounded-2xl p-3.5 leading-relaxed ${
                isUser
                  ? 'bg-sky-600 text-white rounded-tr-none'
                  : 'bg-zinc-950 text-zinc-200 border border-zinc-800 rounded-tl-none'
              }`}>
                <p className="whitespace-pre-line">{m.text}</p>
                <div className={`text-[10px] mt-1 font-mono ${isUser ? 'text-sky-200' : 'text-zinc-500'}`}>
                  {m.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center space-x-2 text-zinc-400 bg-zinc-950 border border-zinc-800 rounded-xl p-3 w-fit">
            <Loader2 className="w-4 h-4 animate-spin text-sky-400" />
            <span className="text-xs font-mono">Gemini обробляє запит...</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Quick Prompts */}
      <div className="p-3 bg-zinc-950/60 border-t border-zinc-800/80 overflow-x-auto flex space-x-2">
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="whitespace-nowrap text-[11px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1 rounded-full border border-zinc-700 transition-colors"
          >
            💡 {q}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-zinc-950 border-t border-zinc-800 flex items-center space-x-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Поставити питання про маркетинг, CAC чи воронки..."
          className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-sky-500"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="p-2.5 bg-sky-500 hover:bg-sky-400 text-zinc-950 rounded-xl font-bold transition-all disabled:opacity-40"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
