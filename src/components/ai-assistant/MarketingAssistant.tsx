import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Copy, Check, Bot, User, Wand2 } from 'lucide-react';
import { ChatMessage, Language, Product } from '../../types';
import { AIService } from '../../services/aiService';

interface MarketingAssistantProps {
  currentProduct?: Partial<Product> | null;
  language: Language;
}

export const MarketingAssistant: React.FC<MarketingAssistantProps> = ({
  currentProduct,
  language
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: language === 'ta'
        ? `வணக்கம்! நான் CraftReach AI டிஜிட்டல் உதவியாளர். உங்கள் கைவினைப் பொருளை இன்ஸ்டாகிராம், வாட்ஸ்அப்பில் எவ்வாறு பிரபலப்படுத்துவது என்று என்னிடம் கேளுங்கள்!`
        : `Hello! I'm your CraftReach AI Marketing Assistant. Tap any topic below or ask me how to promote your craft on Instagram, WhatsApp & Google!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const presetPrompts = [
    { type: 'instagram', labelEn: 'Create Instagram Caption', labelTa: 'இன்ஸ்டாகிராம் தலைப்பு' },
    { type: 'whatsapp', labelEn: 'Write WhatsApp Message', labelTa: 'வாட்ஸ்அப் செய்தி எழுத' },
    { type: 'target_buyers', labelEn: 'Who will buy this?', labelTa: 'யார் வாங்குவார்கள்?' },
    { type: 'festival_promo', labelEn: 'Create Festival Offer', labelTa: 'பண்டிகை கால சலுகை' }
  ];

  const handleSelectPrompt = async (promptType: string, label: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: label,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    const replyText = await AIService.generateMarketingCopy(
      currentProduct || {},
      promptType as any
    );

    const assistantMsg: ChatMessage = {
      id: `msg-${Date.now() + 1}`,
      sender: 'assistant',
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      copyable: true
    };

    setMessages(prev => [...prev, assistantMsg]);
    setIsTyping(false);
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    setInputMessage('');

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    const replyText = await AIService.generateMarketingCopy(
      currentProduct || {},
      'custom',
      userText
    );

    const assistantMsg: ChatMessage = {
      id: `msg-${Date.now() + 1}`,
      sender: 'assistant',
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      copyable: true
    };

    setMessages(prev => [...prev, assistantMsg]);
    setIsTyping(false);
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      {/* Floating Assistant Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center gap-3 px-5 py-3.5 rounded-full bg-gradient-to-r from-[#C85A32] via-[#582C12] to-[#1C1917] text-white font-extrabold text-sm shadow-2xl shadow-[#C85A32]/40 hover:scale-105 transition-all duration-300 border-2 border-[#D4AF37]/50"
        >
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          </div>
          <span>Ask CraftReach AI</span>
        </button>
      </div>

      {/* Slide-out Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] h-[580px] craft-card rounded-3xl bg-white border-2 border-[#D4AF37]/40 shadow-2xl flex flex-col justify-between overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-[#582C12] to-[#C85A32] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-amber-200" />
                </div>
                <div>
                  <h4 className="font-serif-craft font-bold text-base leading-tight">
                    CraftReach AI
                  </h4>
                  <p className="text-[10px] text-amber-200">
                    {currentProduct?.name ? `Context: ${currentProduct.name}` : 'Digital Marketing Assistant'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Conversation Scroll View */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#FAF7F2]">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed space-y-2 relative shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-[#C85A32] text-white rounded-br-none'
                        : 'bg-white text-[#1C1917] border border-[#D4AF37]/30 rounded-bl-none'
                    }`}
                  >
                    <p className="whitespace-pre-line font-medium">{msg.text}</p>

                    {msg.copyable && (
                      <button
                        onClick={() => copyToClipboard(msg.id, msg.text)}
                        className="mt-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FAF7F2] border border-gray-200 text-[10px] font-bold text-[#582C12] hover:bg-amber-100 transition"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-[#C85A32]" />
                            <span>Copy Copy text</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                  <span className="text-[9px] text-gray-400 mt-1 px-1">{msg.timestamp}</span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-[#582C12] font-bold bg-white p-3 rounded-2xl w-fit border">
                  <Wand2 className="w-4 h-4 text-[#C85A32] animate-spin" />
                  <span>CraftReach AI is writing marketing copy...</span>
                </div>
              )}
            </div>

            {/* Preset Prompt Buttons */}
            <div className="p-3 bg-white border-t border-gray-100 space-y-2">
              <div className="flex flex-wrap gap-1.5">
                {presetPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectPrompt(p.type, language === 'ta' ? p.labelTa : p.labelEn)}
                    className="px-2.5 py-1 rounded-lg bg-[#FAF7F2] hover:bg-[#C85A32] hover:text-white border border-[#D4AF37]/30 text-[10px] font-bold text-[#582C12] transition"
                  >
                    + {language === 'ta' ? p.labelTa : p.labelEn}
                  </button>
                ))}
              </div>

              {/* Chat Input Form */}
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  placeholder={language === 'ta' ? 'கேள்வி கேட்கவும்...' : 'Ask CraftReach AI anything...'}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#C85A32]"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-xl bg-[#582C12] text-white hover:bg-[#C85A32] transition"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
