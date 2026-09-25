import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { Language } from '../../types';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  return (
    <footer className="bg-[#1C1917] text-white py-16 border-t border-[#D4AF37]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Logo & Tagline */}
          <div className="space-y-3 max-w-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C85A32] to-[#D4AF37] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-serif-craft text-2xl font-bold text-white tracking-tight">
                Craft<span className="text-[#C85A32]">Reach</span>
              </span>
            </div>
            
            <p className="font-serif-craft text-lg font-bold text-[#D4AF37]">
              “Your Craft. Your Story. Your Digital Presence.”
            </p>

            <p className="text-xs text-stone-400 leading-relaxed">
              {language === 'ta'
                ? 'பாரம்பரிய கைவினைஞர்களின் படைப்புகளை டிஜிட்டல் பிராண்டுகளாக மாற்ற உதவும் AI தளமும் உதவியாளரும்.'
                : 'Empowering traditional Indian artisans to build high-converting e-commerce listings with photo AI & voice stories.'}
            </p>
          </div>

          {/* Quick Info & Craft Heritage Badge */}
          <div className="flex flex-col sm:flex-row gap-6 text-xs text-stone-300">
            <div className="bg-stone-900 p-4 rounded-2xl border border-stone-800 space-y-1">
              <p className="font-bold text-[#D4AF37]">Tamil & English Native</p>
              <p className="text-stone-400">First-class voice recognition for South Asian craft clusters.</p>
            </div>
            <div className="bg-stone-900 p-4 rounded-2xl border border-stone-800 space-y-1">
              <p className="font-bold text-[#C85A32]">Authentic Preservation</p>
              <p className="text-stone-400">100% preservation of handmade craft geometry and textures.</p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 CraftReach AI. Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500" /> for Artisans.</p>
          <div className="flex gap-6">
            <span className="hover:text-stone-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-stone-300 cursor-pointer">Artisan Terms</span>
            <span className="hover:text-stone-300 cursor-pointer">AI Ethics Charter</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
