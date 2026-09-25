import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Camera, Sparkles, Wand2, RefreshCw, CheckCircle2, ArrowRight, ShieldCheck, Image as ImageIcon } from 'lucide-react';
import { Language, StudioStyle } from '../../types';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { AIService } from '../../services/aiService';
import { SAMPLE_PRODUCTS } from '../../services/sampleData';

interface PhotoEnhancerProps {
  language: Language;
  onImageSelected: (enhancedUrl: string, rawUrl: string, style: StudioStyle) => void;
  onProceedToVoice: () => void;
}

export const PhotoEnhancer: React.FC<PhotoEnhancerProps> = ({
  language,
  onImageSelected,
  onProceedToVoice
}) => {
  const [selectedRawImage, setSelectedRawImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<StudioStyle>('artisan_warm');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepMessage, setStepMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection from computer or camera
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const rawUrl = event.target?.result as string;
        setSelectedRawImage(rawUrl);
        runAiEnhancement(rawUrl, selectedStyle);
      };
      reader.readAsDataURL(file);
    }
  };

  // Run AI enhancement sequence using AI Abstraction Layer
  const runAiEnhancement = async (rawUrl: string, style: StudioStyle) => {
    setIsProcessing(true);
    setEnhancedImage(null);
    setCurrentStep(1);

    const result = await AIService.enhanceProductPhoto(
      rawUrl,
      style,
      (stepIdx, msgEn, msgTa) => {
        setCurrentStep(stepIdx);
        setStepMessage(language === 'ta' ? msgTa : msgEn);
      }
    );

    setEnhancedImage(result.enhancedImageUrl);
    setIsProcessing(false);
    onImageSelected(result.enhancedImageUrl, rawUrl, style);
  };

  // Select sample artisan craft for instant trial
  const handleSelectSample = (sampleUrl: string) => {
    setSelectedRawImage(sampleUrl);
    runAiEnhancement(sampleUrl, selectedStyle);
  };

  const handleStyleChange = (style: StudioStyle) => {
    setSelectedStyle(style);
    if (selectedRawImage) {
      runAiEnhancement(selectedRawImage, style);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      
      {/* Workspace Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFFFF] border border-[#D4AF37]/30 text-xs font-extrabold uppercase tracking-widest text-[#C85A32] shadow-sm">
          <Wand2 className="w-4 h-4 text-[#C85A32]" />
          {language === 'ta' ? 'அம்சம் 1: AI புகைப்பட மெருகூட்டல்' : 'FEATURE 1: AI PRODUCT PHOTO ENHANCER'}
        </div>

        <h2 className="font-serif-craft text-3xl sm:text-5xl font-extrabold text-[#1C1917]">
          {language === 'ta' ? (
            <>உங்கள் கைவினைப் பொருளை <span className="text-[#C85A32]">அழகாக மாற்றுங்கள்</span></>
          ) : (
            <>Make Your Craft <span className="text-[#C85A32]">Look Its Best.</span></>
          )}
        </h2>

        <p className="text-base sm:text-lg text-[#1C1917]/75 max-w-2xl mx-auto">
          {language === 'ta'
            ? 'புகைப்படத்தைப் பதிவேற்றுங்கள். AI உங்களுக்காக தொழில்முறை ஸ்டுடியோ பின்னணியை உருவாக்கும்.'
            : 'Upload a photo. Let AI create a clean, professional studio product image in seconds.'}
        </p>
      </div>

      {/* Main Upload / Enhancement Card */}
      {!selectedRawImage ? (
        <div className="craft-card rounded-3xl p-8 sm:p-12 border-2 border-dashed border-[#D4AF37]/50 bg-white text-center space-y-8 hover:border-[#C85A32] transition-colors shadow-xl">
          
          <div className="w-20 h-20 rounded-3xl bg-[#FAF7F2] border border-[#D4AF37]/30 flex items-center justify-center text-[#C85A32] mx-auto shadow-inner">
            <Upload className="w-10 h-10 animate-bounce" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-[#1C1917]">
              {language === 'ta' ? 'உங்கள் கைவினைப் புகைப்படத்தை இங்கே பதிவேற்றவும்' : 'Drop your product photo here'}
            </h3>
            <p className="text-sm text-[#1C1917]/60">
              {language === 'ta' ? 'ஆதரவு வடிவங்கள்: JPG, PNG, WEBP (அதிகபட்சம் 10MB)' : 'Supports JPG, PNG, WEBP (Mobile camera friendly)'}
            </p>
          </div>

          {/* Upload & Camera Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#C85A32] to-[#582C12] text-white font-bold text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-3"
            >
              <Upload className="w-5 h-5" />
              {language === 'ta' ? 'புகைப்படம் பதிவேற்ற' : 'Upload Photo'}
            </button>

            <button
              onClick={() => cameraInputRef.current?.click()}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#FAF7F2] border-2 border-[#D4AF37]/40 text-[#582C12] font-bold text-base hover:border-[#C85A32] hover:bg-white transition-all flex items-center justify-center gap-3 shadow-sm"
            >
              <Camera className="w-5 h-5 text-[#C85A32]" />
              {language === 'ta' ? 'கேமரா மூலம் எடுக்க' : 'Take Photo'}
            </button>
          </div>

          {/* Hidden File Inputs */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
          />
          <input
            type="file"
            ref={cameraInputRef}
            onChange={handleFileChange}
            accept="image/*"
            capture="environment"
            className="hidden"
          />

          {/* Preset Sample Craft Selection for Instant Testing */}
          <div className="pt-8 border-t border-gray-100">
            <p className="text-xs font-bold uppercase tracking-wider text-[#582C12] mb-4">
              {language === 'ta' ? 'அல்லது மாதிரி கைவினைப் பொருளைத் தேர்ந்தெடுக்கவும்:' : 'Or try with a sample artisan craft photo:'}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {SAMPLE_PRODUCTS.map(sample => (
                <button
                  key={sample.id}
                  onClick={() => handleSelectSample(sample.rawImageUrl)}
                  className="group relative rounded-2xl overflow-hidden border border-[#D4AF37]/30 hover:border-[#C85A32] shadow-sm hover:shadow-md transition-all text-left bg-stone-50"
                >
                  <img
                    src={sample.rawImageUrl}
                    alt={sample.name}
                    className="w-full h-24 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="p-2 bg-white">
                    <p className="text-xs font-bold text-[#1C1917] truncate">
                      {language === 'ta' ? sample.nameTamil : sample.name}
                    </p>
                    <p className="text-[10px] text-[#C85A32] font-semibold">
                      ₹{sample.price}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>
      ) : (
        /* Image Enhanced View & Control Suite */
        <div className="space-y-8">
          
          {/* Studio Background Selector */}
          <div className="craft-card p-4 sm:p-6 rounded-2xl bg-white border border-[#D4AF37]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#C85A32]" />
              <span className="text-sm font-bold text-[#1C1917]">
                {language === 'ta' ? 'ஸ்டுடியோ பின்னணி பாணி:' : 'AI Studio Theme:'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full sm:w-auto">
              {[
                { id: 'artisan_warm', labelEn: 'Warm Artisan', labelTa: 'பாரம்பரிய மண்' },
                { id: 'marble_pedestal', labelEn: 'Marble Studio', labelTa: 'பளிங்கு ஸ்டுடியோ' },
                { id: 'velvet_luxury', labelEn: 'Velvet Luxury', labelTa: 'அடர்ந்த கம்பளம்' },
                { id: 'natural_sunlight', labelEn: 'Natural Light', labelTa: 'இயற்கை ஒளி' }
              ].map(style => (
                <button
                  key={style.id}
                  onClick={() => handleStyleChange(style.id as StudioStyle)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedStyle === style.id
                      ? 'bg-[#C85A32] text-white shadow-md'
                      : 'bg-[#FAF7F2] text-[#1C1917]/70 hover:bg-stone-200'
                  }`}
                >
                  {language === 'ta' ? style.labelTa : style.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Before/After Visual or Loading Beam */}
          {isProcessing ? (
            <div className="craft-card rounded-3xl p-12 bg-stone-900 text-white text-center space-y-6 relative overflow-hidden h-[400px] flex flex-col items-center justify-center border-2 border-[#D4AF37]">
              
              {/* Laser Beam Scanner */}
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_20px_#D4AF37] animate-laser-scan top-0 z-20" />

              <div className="w-16 h-16 rounded-full bg-[#C85A32]/30 border border-[#D4AF37] flex items-center justify-center animate-spin">
                <Wand2 className="w-8 h-8 text-[#D4AF37]" />
              </div>

              <div className="space-y-2 relative z-10 max-w-md">
                <span className="text-xs font-extrabold tracking-widest text-[#D4AF37] uppercase">
                  AI PROCESSING — STEP {currentStep} / 5
                </span>
                <h3 className="text-xl font-bold text-white">
                  {stepMessage || (language === 'ta' ? 'புகைப்படம் பகுப்பாய்வு செய்யப்படுகிறது...' : 'Analyzing product craftsmanship...')}
                </h3>
              </div>

              {/* Step Progress Dots */}
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(step => (
                  <div
                    key={step}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      step <= currentStep ? 'w-8 bg-[#C85A32]' : 'w-2 bg-stone-700'
                    }`}
                  />
                ))}
              </div>

            </div>
          ) : (
            enhancedImage && (
              <BeforeAfterSlider
                originalImage={selectedRawImage}
                enhancedImage={enhancedImage}
                language={language}
              />
            )
          )}

          {/* Preservation Guarantee Note */}
          <div className="bg-[#FFFFFF] p-4 rounded-2xl border border-[#D4AF37]/30 flex items-center justify-center gap-3 text-xs font-semibold text-[#582C12] shadow-sm">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              {language === 'ta'
                ? '100% உண்மைத்தன்மை உத்தரவாதம்: உங்கள் கைவினைப் பொருளின் வடிவம் மற்றும் பதம் சிறிதும் மாறாமல் பாதுகாக்கப்படுகிறது.'
                : '100% Authentic Preservation: Original handmade product geometry and material textures are preserved without synthetic distortion.'}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#D4AF37]/20">
            <button
              onClick={() => {
                setSelectedRawImage(null);
                setEnhancedImage(null);
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white border border-gray-300 text-[#1C1917] font-bold text-sm hover:bg-stone-100 transition flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              {language === 'ta' ? 'வேறொரு புகைப்படம்' : 'Try Another Photo'}
            </button>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => selectedRawImage && runAiEnhancement(selectedRawImage, selectedStyle)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#FAF7F2] border border-[#D4AF37]/40 text-[#582C12] font-bold text-sm hover:border-[#C85A32] transition flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#C85A32]" />
                {language === 'ta' ? 'மீண்டும் உருவாக்கு' : 'Regenerate'}
              </button>

              <button
                onClick={onProceedToVoice}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#C85A32] to-[#582C12] text-white font-extrabold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                {language === 'ta' ? 'இந்த படத்தைப் பயன்படுத்துக (அடுத்த படி)' : 'Use This Image (Next Step)'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
