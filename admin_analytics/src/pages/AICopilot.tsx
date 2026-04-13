import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, User } from 'lucide-react';

export default function AICopilot({ data }: { data: any }) {
  const { copilot } = data;
  const [messages, setMessages] = useState(copilot.filter((m: any) => m.role !== 'system'));
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMsg = { role: 'user', content: inputValue };
    setMessages((prev: any) => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      setMessages((prev: any) => [...prev, { 
        role: 'assistant', 
        content: "I'm analyzing the latest data pipeline for that query. Currently, this is a simulated response, but in production, I would query the ML feature store directly to answer this." 
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-w-4xl mx-auto glass-card rounded-2xl overflow-hidden border border-gold-500/20">
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-luxury-800/50 flex items-center gap-3">
        <div className="p-2 bg-gold-500/20 rounded-lg">
          <Sparkles className="text-gold-400" size={20} />
        </div>
        <div>
          <h3 className="font-serif text-lg text-white">Aura Copilot</h3>
          <p className="text-xs text-cream-200/50">Powered by your raw ecommerce data</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        <AnimatePresence initial={false}>
          {messages.map((msg: any, idx: number) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-luxury-600' : 'bg-gold-500/20 text-gold-400'}`}>
                {msg.role === 'user' ? <User size={16} /> : <Sparkles size={16} />}
              </div>
              <div className={`max-w-[80%] rounded-2xl p-4 ${msg.role === 'user' ? 'bg-luxury-600 text-white rounded-tr-none' : 'bg-white/5 text-cream-100 border border-white/10 rounded-tl-none'}`}>
                {/* Simple markdown bold parsing for the mock data */}
                <div className="text-sm leading-relaxed whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center">
                <Sparkles size={16} />
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none p-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-gold-500/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gold-500/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gold-500/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/10 bg-luxury-800/30">
        <form onSubmit={handleSend} className="relative flex items-center">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask Aura about your profit margins, inventory, or conversion rates..." 
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white placeholder:text-cream-200/40 focus:outline-none focus:border-gold-500/50 transition-colors"
          />
          <button 
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="absolute right-2 p-2 text-gold-400 hover:text-gold-300 disabled:opacity-50 disabled:hover:text-gold-400 transition-colors"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
