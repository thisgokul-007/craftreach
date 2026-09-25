import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Wand2, Mic, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { Language, ViewMode, WorkspaceTab } from '../../types';

interface HowItWorksProps {
  onNavigate: (view: ViewMode, tab?: WorkspaceTab) => void;
  language: Language;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onNavigate, language }) => {
  const steps = [
    {
      num: '01',
      icon: Camera,
      tagEn: 'CAPTURE',
      tagTa: '1. புகைப்படம் எடுங்கள்',
      titleEn: 'Take a photo of your craft',
      titleTa: 'உங்கள் கைவினைப் பொருளை படம் பிடியுங்கள்',
      descEn: 'Simply use your phone camera or upload any raw photo of your product.',
      descTa: 'உங்கள் கைபேசி கேமரா மூலம் எளிதாக புகைப்படம் எடுங்கள் அல்லது அப்லோட் செய்யுங்கள்.',
      badgeBg: 'bg-[#C85A32]/10 text-[#C85A32]'
    },
    {
      num: '02',
      icon: Wand2,
      tagEn: 'ENHANCE',
      tagTa: '2. AI மெருகூட்டல்',
      titleEn: 'AI creates studio magic',
      titleTa: 'AI ஸ்டுடியோ பின்னணி உருவாக்கும்',
      descEn: 'AI removes background clutter, improves lighting & places item on professional backdrops while preserving authentic texture.',
      descTa: 'தேவையில்லாத பின்னணியை நீக்கி, ஸ்டுடியோ வெளிச்சத்தையும் நேர்த்தியான பின்னணியையும் AI அளிக்கிறது.',
      badgeBg: 'bg-[#D4AF37]/20 text-[#582C12]'
    },
    {
      num: '03',
      icon: Mic,
      tagEn: 'DESCRIBE',
      tagTa: '3. தமிழில் பேசுங்கள்',
      titleEn: 'Speak in Tamil or English',
      titleTa: 'இயல்பாக பேசுங்கள், AI விவரம் எழுதும்',
      descEn: 'Tell us about your craft in your native voice. AI converts speech into structured price, material & story details.',
      descTa: 'உங்கள் குரலில் விலையையும் கதையையும் கூறுங்கள். AI அதை தொழில்முறை இ-காமர்ஸ் விவரமாக மாற்றும்.',
      badgeBg: 'bg-[#582C12]/10 text-[#582C12]'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#FAF7F2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#D4AF37]/40 text-xs font-extrabold uppercase tracking-widest text-[#582C12] shadow-sm">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            {language === 'ta' ? 'எளிமையான 3 படிகள்' : '3 SIMPLE STEPS'}
          </div>

          <h2 className="font-serif-craft text-3xl sm:text-5xl font-extrabold text-[#1C1917]">
            {language === 'ta' ? (
              <>கையால் செய்யப்பட்டதிலிருந்து <span className="text-[#C85A32]">விற்பனைக்குத் தயார்</span>.</>
            ) : (
              <>From Handmade to <span className="text-[#C85A32]">Market-Ready.</span></>
            )}
          </h2>

          <p className="text-base sm:text-lg text-[#1C1917]/70">
            {language === 'ta'
              ? 'தொழில்நுட்ப அறிவு ஏதும் இன்றி உங்கள் பாரம்பரிய கைவினைப் பொருட்களை சில நிமிடங்களில் விற்பனைக்கு கொண்டு வாருங்கள்.'
              : 'No digital marketing or technical skills required. Just shoot, speak, and share!'}
          </p>
        </div>

        {/* 3 Steps Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="craft-card craft-card-hover p-8 rounded-3xl relative bg-white border border-[#D4AF37]/30 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-black tracking-widest uppercase ${step.badgeBg}`}>
                      {language === 'ta' ? step.tagTa : step.tagEn}
                    </span>
                    <span className="font-serif-craft text-3xl font-extrabold text-[#D4AF37]/30">
                      {step.num}
                    </span>
                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-[#FAF7F2] border border-[#D4AF37]/30 flex items-center justify-center text-[#C85A32] mb-6 shadow-sm">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-[#1C1917] mb-3">
                    {language === 'ta' ? step.titleTa : step.titleEn}
                  </h3>

                  <p className="text-sm text-[#1C1917]/70 leading-relaxed">
                    {language === 'ta' ? step.descTa : step.descEn}
                  </p>
                </div>

                {idx < 2 && (
                  <div className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-[#D4AF37]/40 shadow flex items-center justify-center text-[#C85A32]">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </motion.div>
            );
          })}

        </div>

        {/* Final Result Card: "Ready to Share" */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 bg-gradient-to-r from-[#582C12] via-[#C85A32] to-[#582C12] rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-amber-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              {language === 'ta' ? 'முடிவு' : 'RESULT'}
            </div>
            <h3 className="font-serif-craft text-2xl sm:text-4xl font-extrabold text-white">
              {language === 'ta' ? 'பகிர்வதற்கு தயார்.' : 'Ready to Share.'}
            </h3>
            <p className="text-white/80 text-sm sm:text-base">
              {language === 'ta'
                ? 'அழகான தயாரிப்பு கார்டு, வாட்ஸ்அப் விளம்பரம் மற்றும் பட்டியல்கள் நொடியில் தயார்.'
                : 'Your high-converting e-commerce listing card, WhatsApp promo link, and catalog are ready to share with buyers worldwide.'}
            </p>
          </div>

          <button
            onClick={() => onNavigate('workspace', 'enhancer')}
            className="px-8 py-4 rounded-2xl bg-white text-[#582C12] font-extrabold text-base shadow-lg hover:bg-amber-50 hover:scale-105 transition-all duration-300 flex items-center gap-3 shrink-0"
          >
            <Sparkles className="w-5 h-5 text-[#C85A32]" />
            {language === 'ta' ? 'இப்போதே பொருளை உருவாக்குங்கள்' : 'Create Product Now'}
          </button>
        </motion.div>

      </div>
    </section>
  );
};
