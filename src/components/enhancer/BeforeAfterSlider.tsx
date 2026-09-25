import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, MoveHorizontal } from 'lucide-react';
import { Language } from '../../types';

interface BeforeAfterSliderProps {
  originalImage: string;
  enhancedImage: string;
  language: Language;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  originalImage,
  enhancedImage,
  language
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  }, [handleMove]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  return (
    <div 
      ref={containerRef}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="relative w-full h-[400px] sm:h-[500px] rounded-3xl overflow-hidden select-none cursor-ew-resize craft-card border-2 border-[#D4AF37]/30 shadow-2xl bg-stone-900"
    >
      {/* Enhanced Image (Right Side - Full Base) */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-stone-950 via-stone-900 to-amber-950/40 flex items-center justify-center">
        <img
          src={enhancedImage}
          alt="AI Enhanced Studio Product"
          className="w-full h-full object-cover filter brightness-105 contrast-105"
        />
        
        {/* Studio Lighting Glow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-amber-950/20 pointer-events-none" />

        {/* Enhanced Badge */}
        <div className="absolute top-4 right-4 bg-[#C85A32] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg border border-white/20">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          {language === 'ta' ? 'AI மெருகூட்டப்பட்ட ஸ்டுடியோ' : 'AI Enhanced Studio'}
        </div>
      </div>

      {/* Original Image (Left Side - Clipped by Slider) */}
      <div 
        className="absolute inset-y-0 left-0 overflow-hidden bg-stone-800"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={originalImage}
          alt="Original Raw Product"
          className="absolute inset-0 w-full h-full object-cover filter brightness-85 contrast-95"
          style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
        />
        
        {/* Original Badge */}
        <div className="absolute top-4 left-4 bg-stone-900/90 backdrop-blur-md text-stone-200 px-3.5 py-1.5 rounded-xl text-xs font-bold border border-stone-700 shadow-md">
          {language === 'ta' ? 'அசல் (Original)' : 'Original Raw Photo'}
        </div>
      </div>

      {/* Draggable Divider Line & Handle */}
      <div 
        className="absolute inset-y-0 z-30 flex items-center justify-center pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Vertical Line */}
        <div className="w-1 h-full bg-gradient-to-b from-[#FAF7F2] via-[#D4AF37] to-[#C85A32] shadow-[0_0_10px_rgba(212,175,55,0.8)]" />

        {/* Center Drag Button */}
        <div className="absolute w-12 h-12 rounded-full bg-white text-[#C85A32] border-2 border-[#D4AF37] shadow-xl flex items-center justify-center pointer-events-auto cursor-ew-resize hover:scale-110 active:scale-95 transition-transform">
          <MoveHorizontal className="w-6 h-6" />
        </div>
      </div>

      {/* Touch Instruction Tip */}
      <div className="absolute bottom-4 inset-x-0 text-center pointer-events-none z-20">
        <span className="bg-black/60 backdrop-blur-md text-white/90 text-xs px-4 py-1.5 rounded-full font-medium border border-white/10 shadow-lg">
          {language === 'ta' ? 'இடது/வலது நகர்த்தி ஒப்பிடுங்கள்' : 'Drag slider left or right to compare before & after'}
        </span>
      </div>
    </div>
  );
};
