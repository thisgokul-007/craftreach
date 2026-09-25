import React from 'react';
import { Language, ViewMode, WorkspaceTab } from '../../types';
import { Sparkles, ShoppingBag, LayoutDashboard, BarChart3, PlusCircle, Globe, User } from 'lucide-react';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode, tab?: WorkspaceTab) => void;
  language: Language;
  onToggleLanguage: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  language,
  onToggleLanguage
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#D4AF37]/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => onNavigate('landing')} 
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#C85A32] to-[#582C12] flex items-center justify-center shadow-lg shadow-[#C85A32]/20 group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-6 h-6 text-[#FAF7F2] animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif-craft text-2xl font-bold tracking-tight text-[#1C1917]">
                  Craft<span className="text-[#C85A32]">Reach</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider bg-[#D4AF37]/20 text-[#582C12] px-2 py-0.5 rounded-full border border-[#D4AF37]/40">
                  AI
                </span>
              </div>
              <p className="text-xs text-[#1C1917]/60 font-medium hidden sm:block">
                {language === 'ta' ? 'கைவினைஞர்களுக்கான AI டிஜிட்டல் உதவியாளர்' : 'AI Assistant for Artisans'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#FFFFFF]/70 p-1.5 rounded-2xl border border-[#D4AF37]/20 shadow-sm">
            <button
              onClick={() => onNavigate('landing')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                currentView === 'landing'
                  ? 'bg-[#C85A32] text-white shadow-md shadow-[#C85A32]/20'
                  : 'text-[#1C1917]/70 hover:text-[#1C1917] hover:bg-[#FAF7F2]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              {language === 'ta' ? 'முகப்பு' : 'Overview'}
            </button>

            <button
              onClick={() => onNavigate('workspace', 'enhancer')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                currentView === 'workspace'
                  ? 'bg-[#C85A32] text-white shadow-md shadow-[#C85A32]/20'
                  : 'text-[#1C1917]/70 hover:text-[#1C1917] hover:bg-[#FAF7F2]'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              {language === 'ta' ? 'பொருள் உருவாக்க' : 'Create Product'}
            </button>

            <button
              onClick={() => onNavigate('products')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                currentView === 'products'
                  ? 'bg-[#C85A32] text-white shadow-md shadow-[#C85A32]/20'
                  : 'text-[#1C1917]/70 hover:text-[#1C1917] hover:bg-[#FAF7F2]'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              {language === 'ta' ? 'என் பொருட்கள்' : 'My Products'}
            </button>

            <button
              onClick={() => onNavigate('analytics')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                currentView === 'analytics'
                  ? 'bg-[#C85A32] text-white shadow-md shadow-[#C85A32]/20'
                  : 'text-[#1C1917]/70 hover:text-[#1C1917] hover:bg-[#FAF7F2]'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              {language === 'ta' ? 'புள்ளிவிவரம்' : 'Analytics'}
            </button>
          </nav>

          {/* Right Section: Language Switcher & Profile */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center bg-[#FFFFFF] rounded-xl border border-[#D4AF37]/30 p-1 shadow-sm">
              <Globe className="w-4 h-4 text-[#C85A32] ml-2 mr-1 hidden sm:block" />
              <button
                onClick={() => onToggleLanguage('ta')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                  language === 'ta'
                    ? 'bg-[#582C12] text-white shadow-sm'
                    : 'text-[#1C1917]/70 hover:text-[#1C1917]'
                }`}
              >
                தமிழ்
              </button>
              <button
                onClick={() => onToggleLanguage('en')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                  language === 'en'
                    ? 'bg-[#582C12] text-white shadow-sm'
                    : 'text-[#1C1917]/70 hover:text-[#1C1917]'
                }`}
              >
                English
              </button>
            </div>

            {/* Profile */}
            <div className="flex items-center gap-2 pl-2 border-l border-[#D4AF37]/20">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#C85A32] p-0.5 cursor-pointer shadow-md hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-full bg-[#FAF7F2] flex items-center justify-center overflow-hidden">
                  <User className="w-5 h-5 text-[#582C12]" />
                </div>
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-bold text-[#1C1917] leading-tight">Anitha M.</p>
                <p className="text-[10px] text-[#C85A32] font-semibold">Terracotta Artisan</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};
