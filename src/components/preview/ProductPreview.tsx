import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, MessageCircle, Share2, Download, CheckCircle2, ShieldCheck, Heart, Sparkles, ShoppingCart } from 'lucide-react';
import { Language, Product } from '../../types';
import confetti from 'canvas-confetti';

interface ProductPreviewProps {
  product: Partial<Product>;
  language: Language;
  onNavigateToCatalog: () => void;
}

export const ProductPreview: React.FC<ProductPreviewProps> = ({
  product,
  language,
  onNavigateToCatalog
}) => {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  const displayImage = product.enhancedImageUrl || product.rawImageUrl || 'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?q=80&w=800&auto=format&fit=crop';
  const name = (language === 'ta' && product.nameTamil) ? product.nameTamil : (product.name || 'Handcrafted Artisan Product');
  const description = (language === 'ta' && product.descriptionTamil) ? product.descriptionTamil : (product.description || 'Handmade with traditional authentic craftsmanship.');
  const price = product.price || 250;
  const stock = product.availableQuantity || 20;
  const location = product.location || 'Madurai, Tamil Nadu';
  const artisanName = product.artisanName || 'Anitha & Craft Artisans';

  const handleShare = () => {
    setCopied(true);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    navigator.clipboard?.writeText(window.location.href);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppContact = () => {
    const text = encodeURIComponent(`Hello ${artisanName}! I am interested in purchasing your product: "${name}" priced at ₹${price}. Please share ordering details.`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleDownloadCatalog = () => {
    confetti({ particleCount: 80, spread: 80, origin: { y: 0.7 } });
    alert(language === 'ta' ? 'தயாரிப்பு அட்டவணை பதிவிறக்கம் செய்யப்படுகிறது!' : 'Downloading Product Catalog Card!');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      
      {/* Success Notification Bar */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-4 rounded-2xl flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-700/50 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-emerald-300" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm">
              {language === 'ta' ? 'தயாரிப்பு பட்டியல் உருவாக்கப்பட்டது!' : 'E-Commerce Product Listing Created!'}
            </h4>
            <p className="text-xs text-emerald-100">
              {language === 'ta' ? 'உங்கள் பொருள் உலகம் முழுவதும் வாங்குபவர்களுக்கு பகிரத் தயார்.' : 'Your product is ready to present to global shoppers and local buyers.'}
            </p>
          </div>
        </div>

        <button
          onClick={onNavigateToCatalog}
          className="px-4 py-2 bg-white text-emerald-950 font-bold rounded-xl text-xs hover:bg-emerald-50 transition shrink-0 shadow"
        >
          {language === 'ta' ? 'என் பட்டியலில் பார்க்க' : 'View in Catalog'}
        </button>
      </div>

      {/* Main E-Commerce Product Detail Card Container */}
      <div className="craft-card rounded-3xl overflow-hidden bg-white border-2 border-[#D4AF37]/30 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Visual Column */}
          <div className="lg:col-span-6 relative bg-stone-950 flex items-center justify-center p-6 min-h-[420px]">
            <img
              src={displayImage}
              alt={name}
              className="w-full h-full object-cover rounded-2xl shadow-xl filter brightness-105"
            />

            {/* Like Floating Heart Button */}
            <button
              onClick={() => setLiked(!liked)}
              className="absolute top-10 right-10 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg transition transform hover:scale-110"
            >
              <Heart className={`w-6 h-6 ${liked ? 'fill-rose-500 text-rose-500' : 'text-stone-700'}`} />
            </button>

            {/* Handmade Origin Badge */}
            <div className="absolute bottom-10 left-10 bg-black/75 backdrop-blur-md px-4 py-2 rounded-xl text-white text-xs font-semibold flex items-center gap-2 border border-white/20">
              <MapPin className="w-4 h-4 text-[#D4AF37]" />
              <span>Made in {location}</span>
            </div>
          </div>

          {/* Right Product Details Column */}
          <div className="lg:col-span-6 p-8 sm:p-10 space-y-6 flex flex-col justify-between text-left">
            
            <div className="space-y-4">
              {/* Category & Rating Header */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider bg-[#C85A32]/10 text-[#C85A32] px-3 py-1 rounded-full">
                  {product.category || 'Handicraft'}
                </span>

                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  <div className="flex text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                  </div>
                  <span>4.9 (48)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="font-serif-craft text-2xl sm:text-3xl font-extrabold text-[#1C1917] leading-tight">
                {name}
              </h2>

              {/* Artisan Creator Badge */}
              <div className="flex items-center gap-3 pt-1">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#C85A32] to-[#582C12] text-white flex items-center justify-center font-bold text-xs">
                  {artisanName.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1C1917]">{artisanName}</p>
                  <p className="text-[10px] text-gray-500">{location}</p>
                </div>
              </div>

              {/* Price & Availability */}
              <div className="flex items-baseline gap-4 py-3 border-y border-gray-100">
                <span className="text-3xl font-extrabold text-[#C85A32]">
                  ₹{price}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  {stock} {language === 'ta' ? 'இருப்பில் உள்ளது' : 'Available in stock'}
                </span>
              </div>

              {/* Story Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold text-[#582C12] uppercase tracking-wider">
                  {language === 'ta' ? 'கைவினை வரலாறு & விவரம்:' : 'ARTISAN STORY & DESCRIPTION:'}
                </h4>
                <p className="text-sm text-[#1C1917]/80 leading-relaxed font-normal">
                  {description}
                </p>
              </div>

              {/* Material Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="bg-[#FAF7F2] text-[#582C12] px-3 py-1 rounded-lg text-xs font-semibold border border-[#D4AF37]/30">
                  {language === 'ta' ? 'பொருள்:' : 'Material:'} {product.material || 'Natural Terracotta'}
                </span>
                <span className="bg-[#FAF7F2] text-[#582C12] px-3 py-1 rounded-lg text-xs font-semibold border border-[#D4AF37]/30">
                  {language === 'ta' ? 'கலை வகை:' : 'Craft:'} {product.craftType || 'Pottery'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-6 border-t border-gray-100">
              
              {/* WhatsApp Contact Artisan Button */}
              <button
                onClick={handleWhatsAppContact}
                className="w-full py-4 rounded-2xl bg-[#25D366] hover:bg-emerald-600 text-white font-extrabold text-base shadow-lg transition flex items-center justify-center gap-3"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                {language === 'ta' ? 'கைவினைஞரை வாட்ஸ்அப்பில் தொடர்பு கொள்ள' : 'Contact Artisan on WhatsApp'}
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleShare}
                  className="py-3.5 rounded-xl bg-[#FAF7F2] border border-[#D4AF37]/40 text-[#582C12] font-bold text-xs hover:bg-stone-200 transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <Share2 className="w-4 h-4 text-[#C85A32]" />
                  {copied ? (language === 'ta' ? 'இணைப்பு நகலெடுக்கப்பட்டது!' : 'Link Copied!') : (language === 'ta' ? 'பகிருங்கள்' : 'Share Listing')}
                </button>

                <button
                  onClick={handleDownloadCatalog}
                  className="py-3.5 rounded-xl bg-white border border-stone-300 text-stone-800 font-bold text-xs hover:bg-stone-100 transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <Download className="w-4 h-4 text-[#C85A32]" />
                  {language === 'ta' ? 'அட்டவணை பதிவிறக்கம்' : 'Download Catalogue'}
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
