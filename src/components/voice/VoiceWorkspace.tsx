import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, Sparkles, Edit3, RefreshCw, Save, Globe, CheckCircle2, ArrowRight, Layers, Tag, DollarSign, Package } from 'lucide-react';
import { Language, Product } from '../../types';
import { AudioWaveform } from './AudioWaveform';
import { AIService } from '../../services/aiService';
import { SAMPLE_AUDIO_PROMPTS } from '../../services/sampleData';

interface VoiceWorkspaceProps {
  language: Language;
  enhancedImageUrl?: string;
  onSaveProduct: (product: Partial<Product>) => void;
  onProceedToPreview: () => void;
}

export const VoiceWorkspace: React.FC<VoiceWorkspaceProps> = ({
  language,
  enhancedImageUrl,
  onSaveProduct,
  onProceedToPreview
}) => {
  const [selectedVoiceLang, setSelectedVoiceLang] = useState<Language>(language);
  const [isRecording, setIsRecording] = useState(false);
  const [transcriptText, setTranscriptText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<string>('');
  const [structuredProduct, setStructuredProduct] = useState<Partial<Product> | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [displayLanguage, setDisplayLanguage] = useState<Language>(language);

  // Sync selected voice language when global language changes
  useEffect(() => {
    setSelectedVoiceLang(language);
    setDisplayLanguage(language);
  }, [language]);

  // Web Speech API initialization with safe fallback
  const startRecording = () => {
    setIsRecording(true);
    setTranscriptText('');

    // Check window speech recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = selectedVoiceLang === 'ta' ? 'ta-IN' : 'en-US';
        recognition.interimResults = true;
        recognition.continuous = true;

        recognition.onresult = (event: any) => {
          let current = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            current += event.results[i][0].transcript;
          }
          setTranscriptText(current);
        };

        recognition.onerror = () => {
          // Gracefully fallback to sample prompt
          fallbackSampleVoice();
        };

        recognition.start();
        (window as any).currentRecognition = recognition;
      } catch (e) {
        fallbackSampleVoice();
      }
    } else {
      fallbackSampleVoice();
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if ((window as any).currentRecognition) {
      try {
        (window as any).currentRecognition.stop();
      } catch (e) {}
    }

    if (!transcriptText) {
      fallbackSampleVoice();
    } else {
      processTranscript(transcriptText);
    }
  };

  const fallbackSampleVoice = () => {
    const defaultSample = SAMPLE_AUDIO_PROMPTS.find(s => s.language === selectedVoiceLang) || SAMPLE_AUDIO_PROMPTS[0];
    setTranscriptText(defaultSample.text);
    processTranscript(defaultSample.text);
  };

  const handleSelectSamplePrompt = (promptText: string, lang: Language) => {
    setSelectedVoiceLang(lang);
    setTranscriptText(promptText);
    processTranscript(promptText);
  };

  const processTranscript = async (text: string) => {
    setIsProcessing(true);
    setProcessingStatus(language === 'ta' ? 'குரல் எழுத்துமாற்றம் செய்யப்படுகிறது...' : 'TRANSCRIBING VOICE...');

    await new Promise(r => setTimeout(r, 800));

    setProcessingStatus(language === 'ta' ? 'தயாரிப்பு விவரங்களை AI உருவாக்குகிறது...' : 'GENERATING PRODUCT DESCRIPTION...');

    const result = await AIService.processVoiceInput(text, selectedVoiceLang);
    setStructuredProduct(result.structuredProduct);
    setIsProcessing(false);
    onSaveProduct(result.structuredProduct);
  };

  const handleToggleTranslation = async () => {
    if (!structuredProduct) return;
    const targetLang = displayLanguage === 'ta' ? 'en' : 'ta';
    setDisplayLanguage(targetLang);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      
      {/* Workspace Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFFFF] border border-[#D4AF37]/30 text-xs font-extrabold uppercase tracking-widest text-[#C85A32] shadow-sm">
          <Mic className="w-4 h-4 text-[#C85A32]" />
          {language === 'ta' ? 'அம்சம் 2: குரல் வழி தயாரிப்பு விவரம்' : 'FEATURE 2: VOICE-TO-PRODUCT DESCRIPTION'}
        </div>

        <h2 className="font-serif-craft text-3xl sm:text-5xl font-extrabold text-[#1C1917]">
          {language === 'ta' ? (
            <>உங்கள் கைவினை பற்றி <span className="text-[#C85A32]">பேசுங்கள்</span></>
          ) : (
            <>Tell Us About <span className="text-[#C85A32]">Your Craft.</span></>
          )}
        </h2>

        <p className="text-base sm:text-lg text-[#1C1917]/75 max-w-2xl mx-auto">
          {language === 'ta'
            ? 'நீங்கள் பேசுங்கள். AI உங்களுக்காக தொழில்முறை தயாரிப்பு விவரிப்பு மற்றும் விலைப் பட்டியலை உருவாக்கும்.'
            : 'You speak. AI writes compelling marketing text, categories, price & story details automatically.'}
        </p>
      </div>

      {/* Voice Input Controls Card */}
      <div className="craft-card rounded-3xl p-8 sm:p-12 bg-white border-2 border-[#D4AF37]/30 shadow-xl space-y-8 text-center">
        
        {/* Language Selection Pills */}
        <div className="flex items-center justify-center gap-3">
          <span className="text-xs font-bold text-[#582C12] uppercase tracking-wider">
            {language === 'ta' ? 'பேசும் மொழி:' : 'Speaking Language:'}
          </span>
          
          <div className="flex bg-[#FAF7F2] p-1 rounded-xl border border-[#D4AF37]/30">
            <button
              onClick={() => setSelectedVoiceLang('ta')}
              className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-all ${
                selectedVoiceLang === 'ta'
                  ? 'bg-[#582C12] text-white shadow-sm'
                  : 'text-[#1C1917]/70 hover:text-[#1C1917]'
              }`}
            >
              தமிழ் (Tamil)
            </button>
            <button
              onClick={() => setSelectedVoiceLang('en')}
              className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-all ${
                selectedVoiceLang === 'en'
                  ? 'bg-[#582C12] text-white shadow-sm'
                  : 'text-[#1C1917]/70 hover:text-[#1C1917]'
              }`}
            >
              English
            </button>
          </div>
        </div>

        {/* Pulsing Microphone Interface */}
        <div className="py-4 space-y-6">
          <div className="relative inline-block">
            {isRecording && (
              <div className="absolute inset-0 rounded-full bg-[#C85A32] opacity-40 animate-ping" />
            )}
            
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`relative z-10 w-28 h-28 sm:w-36 sm:h-36 rounded-full flex flex-col items-center justify-center gap-2 shadow-2xl transition-all duration-300 transform active:scale-95 ${
                isRecording
                  ? 'bg-gradient-to-tr from-[#C85A32] to-rose-600 text-white shadow-[#C85A32]/50 scale-105'
                  : 'bg-gradient-to-tr from-[#C85A32] via-[#582C12] to-[#1C1917] text-white shadow-[#582C12]/30 hover:scale-105'
              }`}
            >
              {isRecording ? (
                <MicOff className="w-12 h-12 text-white animate-bounce" />
              ) : (
                <Mic className="w-12 h-12 text-white" />
              )}
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-200">
                {isRecording
                  ? (language === 'ta' ? 'நிறுத்த தட்டவும்' : 'Tap to Stop')
                  : (language === 'ta' ? 'பேச தட்டவும்' : 'Tap to Speak')}
              </span>
            </button>
          </div>

          <p className="text-sm font-semibold text-[#1C1917]/70">
            {isRecording
              ? (language === 'ta' ? 'கேட்கப்படுகிறது... உங்கள் பொருளின் விவரங்களைக் கூறுங்கள்.' : 'Listening... Speak naturally about product, price & quantity.')
              : (language === 'ta' ? 'பொத்தானைத் தட்டி உங்கள் பொருளைப் பற்றிக் கூறுங்கள்' : 'Tap the microphone and describe your product.')}
          </p>

          {/* Waveform Animation during recording */}
          <AudioWaveform isRecording={isRecording} />

          {/* Manual Recording Control Buttons */}
          {isRecording && (
            <div className="flex justify-center gap-4 pt-2">
              <button
                onClick={stopRecording}
                className="px-6 py-2.5 rounded-xl bg-[#C85A32] text-white font-bold text-xs shadow hover:bg-[#582C12] transition"
              >
                {language === 'ta' ? 'பதிவை நிறுத்து' : 'Stop Recording'}
              </button>
              <button
                onClick={startRecording}
                className="px-6 py-2.5 rounded-xl bg-gray-200 text-stone-700 font-bold text-xs hover:bg-gray-300 transition"
              >
                {language === 'ta' ? 'மீண்டும் பதிவிடு' : 'Record Again'}
              </button>
            </div>
          )}
        </div>

        {/* Live Transcript Display Box */}
        {transcriptText && (
          <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#D4AF37]/30 text-left max-w-2xl mx-auto space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-[#C85A32]">
              <Volume2 className="w-4 h-4" />
              <span>{language === 'ta' ? 'பதிவு செய்யப்பட்ட உரை:' : 'Recorded Voice Transcript:'}</span>
            </div>
            <p className="text-sm font-medium text-[#1C1917] italic">
              "{transcriptText}"
            </p>
          </div>
        )}

        {/* Sample Voice Prompts Demo Chips */}
        <div className="pt-6 border-t border-gray-100 text-left">
          <p className="text-xs font-bold uppercase tracking-wider text-[#582C12] mb-3">
            {language === 'ta' ? 'மாதிரி குரல் உரையை சோதிக்க:' : 'Or tap a sample voice prompt to try:'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SAMPLE_AUDIO_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectSamplePrompt(prompt.text, prompt.language as Language)}
                className="p-3 rounded-xl bg-[#FAF7F2] border border-[#D4AF37]/20 hover:border-[#C85A32] transition text-left space-y-1 shadow-sm group"
              >
                <div className="flex items-center justify-between text-xs font-bold text-[#C85A32]">
                  <span className="group-hover:underline">{prompt.title}</span>
                  <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-gray-200">{prompt.language.toUpperCase()}</span>
                </div>
                <p className="text-xs text-[#1C1917]/70 line-clamp-2 italic">
                  "{prompt.text}"
                </p>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Loading AI Processing Status */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="craft-card p-8 rounded-3xl bg-[#582C12] text-white text-center space-y-4 shadow-2xl"
          >
            <div className="w-12 h-12 rounded-full bg-[#C85A32] text-white mx-auto flex items-center justify-center animate-spin">
              <Sparkles className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h3 className="font-serif-craft text-xl font-bold tracking-widest text-[#D4AF37] uppercase">
              {processingStatus}
            </h3>
            <p className="text-xs text-white/80">
              {language === 'ta' ? 'குரல் குறிப்புகள் பகுப்பாய்வு செய்யப்பட்டு பொருள் அட்டவணை உருவாக்கப்படுகிறது...' : 'Parsing material, pricing, availability & craftsmanship story...'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Generated Structured Product Information Card */}
      {structuredProduct && !isProcessing && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="craft-card rounded-3xl p-6 sm:p-10 bg-white border-2 border-[#D4AF37]/40 shadow-2xl space-y-8"
        >
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold mb-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {language === 'ta' ? 'AI உருவாக்கிய தயாரிப்பு விவரம்' : 'AI STRUCTURED PRODUCT INFO'}
              </div>
              <h3 className="font-serif-craft text-2xl sm:text-3xl font-bold text-[#1C1917]">
                {displayLanguage === 'ta'
                  ? (structuredProduct.nameTamil || structuredProduct.name)
                  : structuredProduct.name}
              </h3>
            </div>

            {/* Translation Toggle & Edit Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleTranslation}
                className="px-4 py-2 rounded-xl bg-[#FAF7F2] border border-[#D4AF37]/40 text-[#582C12] font-bold text-xs hover:bg-stone-200 transition flex items-center gap-1.5 shadow-sm"
              >
                <Globe className="w-4 h-4 text-[#C85A32]" />
                {displayLanguage === 'ta' ? 'Generate English Version' : 'தமிழில் மாற்றுக'}
              </button>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 rounded-xl bg-white border border-gray-300 text-stone-700 font-bold text-xs hover:bg-stone-100 transition flex items-center gap-1.5 shadow-sm"
              >
                <Edit3 className="w-4 h-4" />
                {isEditing ? (language === 'ta' ? 'சேமிக்கவும்' : 'Done Editing') : (language === 'ta' ? 'திருத்து' : 'Edit')}
              </button>
            </div>
          </div>

          {/* Grid Layout of Structured Fields */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Left Column: Key Metadata Chips */}
            <div className="md:col-span-4 space-y-4">
              
              {/* Category */}
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#D4AF37]/20">
                <div className="flex items-center gap-2 text-xs font-bold text-[#582C12] mb-1">
                  <Tag className="w-4 h-4 text-[#C85A32]" />
                  {language === 'ta' ? 'பிரிவு (Category)' : 'CATEGORY'}
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    value={structuredProduct.category || ''}
                    onChange={(e) => setStructuredProduct({ ...structuredProduct, category: e.target.value })}
                    className="w-full p-2 text-sm border rounded-lg bg-white"
                  />
                ) : (
                  <p className="text-sm font-bold text-[#1C1917]">
                    {displayLanguage === 'ta' ? (structuredProduct.categoryTamil || structuredProduct.category) : structuredProduct.category}
                  </p>
                )}
              </div>

              {/* Price */}
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#D4AF37]/20">
                <div className="flex items-center gap-2 text-xs font-bold text-[#582C12] mb-1">
                  <DollarSign className="w-4 h-4 text-[#C85A32]" />
                  {language === 'ta' ? 'விலை (Price)' : 'PRICE'}
                </div>
                {isEditing ? (
                  <input
                    type="number"
                    value={structuredProduct.price || 0}
                    onChange={(e) => setStructuredProduct({ ...structuredProduct, price: parseFloat(e.target.value) })}
                    className="w-full p-2 text-sm border rounded-lg bg-white"
                  />
                ) : (
                  <p className="text-2xl font-extrabold text-[#C85A32]">
                    ₹{structuredProduct.price}
                  </p>
                )}
              </div>

              {/* Available Stock */}
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#D4AF37]/20">
                <div className="flex items-center gap-2 text-xs font-bold text-[#582C12] mb-1">
                  <Package className="w-4 h-4 text-[#C85A32]" />
                  {language === 'ta' ? 'இருப்பு (Stock Available)' : 'AVAILABLE QUANTITY'}
                </div>
                {isEditing ? (
                  <input
                    type="number"
                    value={structuredProduct.availableQuantity || 0}
                    onChange={(e) => setStructuredProduct({ ...structuredProduct, availableQuantity: parseInt(e.target.value, 10) })}
                    className="w-full p-2 text-sm border rounded-lg bg-white"
                  />
                ) : (
                  <p className="text-sm font-bold text-[#1C1917]">
                    {structuredProduct.availableQuantity} {language === 'ta' ? 'பொருட்கள்' : 'pieces available'}
                  </p>
                )}
              </div>

              {/* Material & Craft */}
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#D4AF37]/20">
                <div className="flex items-center gap-2 text-xs font-bold text-[#582C12] mb-1">
                  <Layers className="w-4 h-4 text-[#C85A32]" />
                  {language === 'ta' ? 'பொருள் & கலைவகை' : 'MATERIAL & CRAFT'}
                </div>
                <p className="text-xs font-bold text-[#1C1917]">
                  {displayLanguage === 'ta' ? (structuredProduct.materialTamil || structuredProduct.material) : structuredProduct.material}
                </p>
              </div>

            </div>

            {/* Right Column: Full Story Description */}
            <div className="md:col-span-8 space-y-6 flex flex-col justify-between">
              
              <div className="space-y-3 bg-[#FAF7F2] p-6 rounded-2xl border border-[#D4AF37]/20">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#582C12]">
                  {language === 'ta' ? 'தயாரிப்பு கதை & விளக்கம் (Story Description)' : 'PRODUCT STORY & DESCRIPTION'}
                </h4>

                {isEditing ? (
                  <textarea
                    rows={5}
                    value={structuredProduct.description || ''}
                    onChange={(e) => setStructuredProduct({ ...structuredProduct, description: e.target.value })}
                    className="w-full p-3 text-sm border rounded-xl bg-white"
                  />
                ) : (
                  <p className="text-base text-[#1C1917]/85 leading-relaxed font-normal">
                    "{displayLanguage === 'ta'
                      ? (structuredProduct.descriptionTamil || structuredProduct.description)
                      : structuredProduct.description}"
                  </p>
                )}
              </div>

              {/* Special Craft Features Bullet Points */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#582C12]">
                  {language === 'ta' ? 'சிறப்பு அம்சங்கள்:' : 'SPECIAL HIGHLIGHTS:'}
                </h4>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#1C1917]/80 font-medium">
                  {(displayLanguage === 'ta' && structuredProduct.specialFeaturesTamil
                    ? structuredProduct.specialFeaturesTamil
                    : (structuredProduct.specialFeatures || [])
                  ).map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C85A32]" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  onClick={() => transcriptText && processTranscript(transcriptText)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#FAF7F2] border border-[#D4AF37]/40 text-[#582C12] font-bold text-xs hover:border-[#C85A32] transition flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4 text-[#C85A32]" />
                  {language === 'ta' ? 'மீண்டும் விவரிப்பு உருவாக்கு' : 'Regenerate'}
                </button>

                <button
                  onClick={() => {
                    onSaveProduct(structuredProduct);
                    onProceedToPreview();
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#C85A32] to-[#582C12] text-white font-extrabold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {language === 'ta' ? 'சேமித்து அட்டை பார்க்க' : 'Save Product & Preview'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </motion.div>
      )}

    </div>
  );
};
