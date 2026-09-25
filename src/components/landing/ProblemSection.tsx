import React from 'react';
import { motion } from 'framer-motion';
import { MousePointerClick, ImageOff, Languages, HelpCircle } from 'lucide-react';
import { Language } from '../../types';

interface ProblemSectionProps {
  language: Language;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ language }) => {
  const cards = [
    {
      number: '01',
      icon: MousePointerClick,
      titleEn: 'Limited Digital Skills',
      titleTa: 'டிஜிட்டல் தொழில்நுட்ப அறிவு குறைபாடு',
      descEn: 'Traditional artisans excel with their hands but often struggle with complex online portals, software tools, and photo editing software.',
      descTa: 'பாரம்பரிய கைவினைஞர்கள் சிறந்த படைப்புகளை உருவாக்குகிறார்கள், ஆனால் சிக்கலான மென்பொருட்கள் மற்றும் வலைதளங்களை இயக்க சிரமப்படுகிறார்கள்.',
      accentColor: 'border-amber-400'
    },
    {
      number: '02',
      icon: ImageOff,
      titleEn: 'Product Presentation Challenges',
      titleTa: 'பொருட்களின் தோற்ற சவால்கள்',
      descEn: 'Sub-optimal studio lighting, background clutter, and simple phone cameras fail to capture the true artistic value of handmade items.',
      descTa: 'வெளிச்சம் குறைவான புகைப்படங்கள் மற்றும் தேவையில்லாத பின்னணிகளால் கைவினைப் பொருட்களின் உண்மையான மதிப்பு வெளிப்படுவதில்லை.',
      accentColor: 'border-[#C85A32]'
    },
    {
      number: '03',
      icon: Languages,
      titleEn: 'Language & Content Barriers',
      titleTa: 'மொழி மற்றும் உள்ளடக்கத் தடைகள்',
      descEn: 'Artisans can explain their craft fluently in Tamil or local dialects, but writing formal e-commerce product descriptions in English is a barrier.',
      descTa: 'கைவினைஞர்கள் தங்களின் பொருட்களை தமிழில் அழகாக விளக்குவார்கள், ஆனால் ஆங்கிலத்தில் இ-காமர்ஸ் விவரங்களை எழுத தயங்குகிறார்கள்.',
      accentColor: 'border-[#582C12]'
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF7F2] border border-[#D4AF37]/30 text-xs font-extrabold uppercase tracking-widest text-[#C85A32]">
            <HelpCircle className="w-4 h-4 text-[#C85A32]" />
            {language === 'ta' ? 'நாம் தீர்க்கும் பிரச்சனை' : 'THE REAL CHALLENGE'}
          </div>

          <h2 className="font-serif-craft text-3xl sm:text-5xl font-extrabold text-[#1C1917] tracking-tight">
            {language === 'ta' ? (
              <>சிறந்த கைவினைக்கு <span className="text-[#C85A32]">சிறந்த அங்கீகாரம்</span> தேவை.</>
            ) : (
              <>Great Craft Deserves <span className="text-[#C85A32]">Great Visibility.</span></>
            )}
          </h2>

          <p className="text-base sm:text-lg text-[#1C1917]/75 leading-relaxed">
            {language === 'ta'
              ? 'பல கைவினைஞர்களிடம் விதிவிலக்கான பொருட்கள் உள்ளன, ஆனால் அவற்றை இணையத்தில் திறம்பட வெளிப்படுத்தவும், விவரிக்கவும், விளம்பரப்படுத்தவும் சிரமப்படுகிறார்கள்.'
              : 'Many artisans have exceptional products but struggle to present, describe and promote them effectively online.'}
          </p>
        </div>

        {/* 3 Large Animated Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => {
            const IconComp = card.icon;
            return (
              <motion.div
                key={card.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className={`craft-card craft-card-hover p-8 rounded-3xl relative flex flex-col justify-between border-t-4 ${card.accentColor}`}
              >
                <div>
                  {/* Top Row: Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif-craft text-4xl font-black text-[#D4AF37]/40 tracking-wider">
                      {card.number}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#D4AF37]/20 flex items-center justify-center text-[#C85A32]">
                      <IconComp className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#1C1917] mb-3">
                    {language === 'ta' ? card.titleTa : card.titleEn}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#1C1917]/70 leading-relaxed">
                    {language === 'ta' ? card.descTa : card.descEn}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs font-bold text-[#C85A32]">
                  <span>{language === 'ta' ? 'CraftReach AI தீர்வு தருகிறது' : 'CraftReach AI Solves This'}</span>
                  <span>→</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
