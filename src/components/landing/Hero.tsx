import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Camera, Mic, ArrowRight, CheckCircle2, Wand2, Star, ShieldCheck, Play } from 'lucide-react';
import { Language, ViewMode, WorkspaceTab } from '../../types';

interface HeroProps {
  onNavigate: (view: ViewMode, tab?: WorkspaceTab) => void;
  language: Language;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, language }) => {
  const [animState, setAnimState] = useState<'raw' | 'scanning' | 'enhanced' | 'listing'>('raw');
  const [sliderPos, setSliderPos] = useState(50);

  // Cycle demo transformation state automatically to showcase AI power
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimState(prev => {
        if (prev === 'raw') return 'scanning';
        if (prev === 'scanning') return 'enhanced';
        if (prev === 'enhanced') return 'listing';
        return 'raw';
      });
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden py-12 md:py-24 bg-gradient-to-b from-[#FAF7F2] via-[#FAF7F2] to-[#F5EFE6]">
      {/* Decorative Warm Artisan Background Motifs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C85A32]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT SIDE: Hero Text & Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-6 space-y-8 text-left"
          >
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFFFFF] border border-[#D4AF37]/40 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C85A32] animate-ping" />
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#582C12]">
                {language === 'ta' ? 'கைவினைஞர்களுக்கான AI' : 'AI FOR ARTISANS'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif-craft text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#1C1917] leading-[1.1]">
              {language === 'ta' ? (
                <>
                  உங்கள் கைவினை.<br />
                  <span className="text-[#C85A32]">டிஜிட்டல் பிராண்டாக</span> மாறட்டும்.
                </>
              ) : (
                <>
                  Turn Your Craft <br />
                  <span className="text-[#C85A32]">Into a Digital Brand.</span>
                </>
              )}
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-[#1C1917]/80 max-w-2xl font-normal leading-relaxed">
              {language === 'ta'
                ? 'உங்கள் கேமரா மற்றும் குரல் மட்டுமே போதும். சில நிமிடங்களில் தொழில்முறை புகைப்படங்கள் மற்றும் கவர்ச்சிகரமான தயாரிப்பு விவரங்களை உருவாக்குங்கள்.'
                : 'Create professional product photos and compelling product descriptions in minutes — simply using your camera and your voice.'}
            </p>

            {/* Feature Bullet Badges */}
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 bg-[#FFFFFF]/80 px-3.5 py-2 rounded-xl border border-[#D4AF37]/20 text-xs font-bold text-[#582C12]">
                <Camera className="w-4 h-4 text-[#C85A32]" />
                {language === 'ta' ? 'AI புகைப்பட மெருகூட்டல்' : 'AI Studio Photo Enhancer'}
              </div>
              <div className="flex items-center gap-2 bg-[#FFFFFF]/80 px-3.5 py-2 rounded-xl border border-[#D4AF37]/20 text-xs font-bold text-[#582C12]">
                <Mic className="w-4 h-4 text-[#C85A32]" />
                {language === 'ta' ? 'தமிழ் & ஆங்கில குரல் பதிவு' : 'Tamil & English Voice-to-Text'}
              </div>
              <div className="flex items-center gap-2 bg-[#FFFFFF]/80 px-3.5 py-2 rounded-xl border border-[#D4AF37]/20 text-xs font-bold text-[#582C12]">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                {language === 'ta' ? '100% உண்மைத்தன்மை' : 'Authentic Detail Preserved'}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => onNavigate('workspace', 'enhancer')}
                className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-[#C85A32] to-[#582C12] text-white font-bold text-lg shadow-xl shadow-[#C85A32]/25 hover:shadow-2xl hover:shadow-[#C85A32]/40 transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {language === 'ta' ? 'இப்போதே தொடங்குக' : 'Start Creating'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>

              <a
                href="#how-it-works"
                className="px-8 py-4 rounded-2xl bg-white border-2 border-[#D4AF37]/40 text-[#1C1917] font-bold text-lg hover:border-[#C85A32] hover:bg-[#FAF7F2] transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
              >
                <Play className="w-4 h-4 text-[#C85A32] fill-[#C85A32]" />
                {language === 'ta' ? 'எப்படி செயல்படுகிறது?' : 'Explore How It Works'}
              </a>
            </div>

            {/* Social Trust Line */}
            <div className="flex items-center gap-4 pt-4 border-t border-[#D4AF37]/20 text-xs text-[#1C1917]/70 font-medium">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#C85A32] text-white flex items-center justify-center text-xs font-bold border-2 border-white">M</div>
                <div className="w-8 h-8 rounded-full bg-[#582C12] text-white flex items-center justify-center text-xs font-bold border-2 border-white">A</div>
                <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-white flex items-center justify-center text-xs font-bold border-2 border-white">S</div>
              </div>
              <p>
                {language === 'ta' ? '500+ பாரம்பரிய கைவினைஞர்களால் நம்பப்படுகிறது' : 'Trusted by 500+ traditional Indian artisans & craft clusters'}
              </p>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Interactive Transformation Animation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            {/* Background Glow Box */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#C85A32]/20 via-[#D4AF37]/15 to-transparent rounded-3xl blur-2xl transform rotate-1 scale-105" />

            <div className="relative craft-card rounded-3xl p-4 sm:p-6 border-2 border-[#D4AF37]/30 shadow-2xl bg-white">
              
              {/* Animation Header Toggle Indicator */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#D4AF37]/20">
                <div className="flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-[#C85A32]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#582C12]">
                    {language === 'ta' ? 'AI நேரடி உருமாற்றம்' : 'LIVE AI TRANSFORMATION'}
                  </span>
                </div>
                
                {/* Step Indicator Pills */}
                <div className="flex gap-1.5 text-[10px] font-bold">
                  <span className={`px-2.5 py-1 rounded-full transition-colors ${animState === 'raw' ? 'bg-[#1C1917] text-white' : 'bg-gray-100 text-gray-500'}`}>
                    1. RAW
                  </span>
                  <span className={`px-2.5 py-1 rounded-full transition-colors ${animState === 'scanning' ? 'bg-[#C85A32] text-white' : 'bg-gray-100 text-gray-500'}`}>
                    2. ENHANCE
                  </span>
                  <span className={`px-2.5 py-1 rounded-full transition-colors ${animState === 'listing' ? 'bg-[#582C12] text-white' : 'bg-gray-100 text-gray-500'}`}>
                    3. LISTING
                  </span>
                </div>
              </div>

              {/* Transformation Visual Canvas */}
              <div className="relative h-[380px] sm:h-[420px] rounded-2xl overflow-hidden bg-stone-900 shadow-inner flex items-center justify-center">
                
                {/* Image 1: Raw Photo (Background) */}
                <img
                  src="https://images.unsplash.com/photo-1606293926075-69a00dbfde81?q=80&w=800&auto=format&fit=crop"
                  alt="Raw Terracotta Lamp"
                  className="absolute inset-0 w-full h-full object-cover filter brightness-75 contrast-90"
                />

                {/* AI Laser Scanning Beam Overlay */}
                <AnimatePresence>
                  {(animState === 'scanning' || animState === 'enhanced') && (
                    <>
                      {/* Studio Lighting Polish Overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/40 to-amber-950/20 mix-blend-overlay"
                      />
                      
                      {/* Laser Beam */}
                      <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_15px_#D4AF37] animate-laser-scan z-20" />
                    </>
                  )}
                </AnimatePresence>

                {/* Floating AI Particles */}
                <div className="absolute inset-0 pointer-events-none z-20">
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-[#D4AF37] blur-[1px] animate-float-particle" />
                  <div className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-[#C85A32] blur-[1px] animate-float-particle" style={{ animationDelay: '1.5s' }} />
                  <div className="absolute bottom-1/4 right-1/3 w-2.5 h-2.5 rounded-full bg-amber-300 blur-[1px] animate-float-particle" style={{ animationDelay: '2.8s' }} />
                </div>

                {/* Status Overlay Badge */}
                <div className="absolute top-4 left-4 z-30 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-white text-xs font-semibold flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  {animState === 'raw' && (language === 'ta' ? 'மூல புகைப்படம்' : 'Raw Phone Camera Photo')}
                  {animState === 'scanning' && (language === 'ta' ? 'AI பகுப்பாய்வு...' : 'AI Studio Polish Scanning...')}
                  {(animState === 'enhanced' || animState === 'listing') && (language === 'ta' ? 'AI ஸ்டுடியோ படம்' : 'AI Studio Enhanced')}
                </div>

                {/* Final Product Listing Card Overlay */}
                <AnimatePresence>
                  {animState === 'listing' && (
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-x-4 bottom-4 z-30 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#D4AF37]/30 shadow-xl text-left"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-[#C85A32]/10 text-[#C85A32] px-2 py-0.5 rounded-md">
                          {language === 'ta' ? 'தயாரான பொருள்' : 'Market Ready Listing'}
                        </span>
                        <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          4.9 (18 {language === 'ta' ? 'விசாரணைகள்' : 'enquiries'})
                        </div>
                      </div>

                      <h4 className="font-serif-craft font-bold text-base text-[#1C1917]">
                        {language === 'ta' ? 'பாரம்பரிய கைவினை மண் அகல் விளக்கு' : 'Handcrafted Terracotta Oil Lamp'}
                      </h4>

                      <p className="text-xs text-[#1C1917]/70 line-clamp-1 mt-0.5">
                        {language === 'ta' ? 'மதுரை ஆற்றுப் படுகையின் தூய்மையான களிமண்ணால் வனையப்பட்ட விளக்கு.' : 'Handmade from natural terracotta clay with traditional floral motifs.'}
                      </p>

                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                        <div>
                          <span className="text-xs text-gray-500 font-medium">{language === 'ta' ? 'விலை:' : 'Price:'} </span>
                          <span className="text-base font-extrabold text-[#C85A32]">₹250</span>
                        </div>

                        <button 
                          onClick={() => onNavigate('workspace', 'enhancer')}
                          className="px-3 py-1.5 bg-[#582C12] hover:bg-[#C85A32] text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1 shadow"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {language === 'ta' ? 'முன்னோட்டம்' : 'View Listing'}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom Interactive Trigger Banner */}
              <div className="mt-4 pt-3 flex items-center justify-between text-xs text-[#582C12] font-semibold">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#C85A32]" />
                  {language === 'ta' ? 'தானியங்கி உருமாற்ற நிலை:' : 'Live transformation state:'} <strong className="text-[#C85A32] uppercase">{animState}</strong>
                </span>

                <button 
                  onClick={() => setAnimState(prev => prev === 'raw' ? 'scanning' : prev === 'scanning' ? 'enhanced' : prev === 'enhanced' ? 'listing' : 'raw')}
                  className="text-xs text-[#C85A32] underline font-bold hover:text-[#582C12]"
                >
                  {language === 'ta' ? 'அடுத்த நிலை பார்க்க' : 'Step Forward →'}
                </button>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
