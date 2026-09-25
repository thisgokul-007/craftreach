import React from 'react';
import { Eye, MessageSquare, TrendingUp, DollarSign, Award, MapPin, Sparkles } from 'lucide-react';
import { Language } from '../../types';

interface AnalyticsViewProps {
  language: Language;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ language }) => {
  const stats = [
    {
      titleEn: 'Total Product Views',
      titleTa: 'மொத்த பார்வையாளர்கள்',
      value: '2,556',
      change: '+24% this week',
      icon: Eye,
      color: 'bg-[#C85A32]'
    },
    {
      titleEn: 'WhatsApp Enquiries',
      titleTa: 'வாட்ஸ்அப் விசாரணைகள்',
      value: '213',
      change: '+18 new leads',
      icon: MessageSquare,
      color: 'bg-[#25D366]'
    },
    {
      titleEn: 'Craft Revenue',
      titleTa: 'விற்பனை வருவாய்',
      value: '₹42,800',
      change: '+32% growth',
      icon: DollarSign,
      color: 'bg-[#582C12]'
    },
    {
      titleEn: 'Top Craft Category',
      titleTa: 'முன்னணி கைவினை',
      value: 'Terracotta Lamp',
      change: '4.9 Star Rating',
      icon: Award,
      color: 'bg-[#D4AF37]'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="pb-6 border-b border-[#D4AF37]/20">
        <h2 className="font-serif-craft text-3xl sm:text-4xl font-extrabold text-[#1C1917]">
          {language === 'ta' ? 'விற்பனை & பார்வையாளர் புள்ளிவிவரம்' : 'Craft Analytics & Market Reach'}
        </h2>
        <p className="text-sm text-[#1C1917]/70 mt-1">
          {language === 'ta'
            ? 'உங்கள் கைவினைப் பொருட்களின் வெற்றி மற்றும் வாங்குபவர்களின் விவரங்களை அறியவும்.'
            : 'Track how buyers engage with your digital brand listings across WhatsApp & Instagram.'}
        </p>
      </div>

      {/* Top 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="craft-card p-6 rounded-3xl bg-white border border-[#D4AF37]/30 space-y-4 shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-2xl ${stat.color} text-white flex items-center justify-center shadow`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  {stat.change}
                </span>
              </div>

              <div>
                <p className="text-xs font-bold text-[#582C12] uppercase tracking-wider">
                  {language === 'ta' ? stat.titleTa : stat.titleEn}
                </p>
                <h3 className="text-3xl font-extrabold text-[#1C1917] mt-1">
                  {stat.value}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Regional Reach & Engagement Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Engagement Trend Chart Simulation */}
        <div className="lg:col-span-8 craft-card p-8 rounded-3xl bg-white border border-[#D4AF37]/30 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif-craft font-bold text-xl text-[#1C1917]">
              {language === 'ta' ? 'மாதாந்திர பார்வையாளர்கள் வளர்ச்சி' : 'Monthly Buyer Engagement Trend'}
            </h3>
            <span className="text-xs text-[#C85A32] font-bold flex items-center gap-1">
              <TrendingUp className="w-4 h-4" /> +42% YoY
            </span>
          </div>

          {/* Bar Chart Simulation */}
          <div className="h-64 flex items-end justify-between gap-2 pt-8 px-2 border-b border-gray-100">
            {[
              { month: 'Apr', height: '40%' },
              { month: 'May', height: '55%' },
              { month: 'Jun', height: '45%' },
              { month: 'Jul', height: '70%' },
              { month: 'Aug', height: '60%' },
              { month: 'Sep', height: '95%' }
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div 
                  className="w-full max-w-[48px] rounded-t-xl bg-gradient-to-t from-[#582C12] via-[#C85A32] to-[#D4AF37] hover:opacity-90 transition cursor-pointer shadow-md"
                  style={{ height: bar.height }}
                />
                <span className="text-xs font-bold text-stone-600">{bar.month}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-stone-500 italic">
            {language === 'ta' ? '* தீபாவளி மற்றும் பொங்கல் பண்டிகைக் காலங்களில் தேவைகள் 80% அதிகரிக்கும்.' : '* Product demand spikes by 80% during festival seasons (Diwali, Pongal & Navratri).'}
          </p>
        </div>

        {/* Regional Buyer Demographics */}
        <div className="lg:col-span-4 craft-card p-8 rounded-3xl bg-white border border-[#D4AF37]/30 space-y-6">
          <h3 className="font-serif-craft font-bold text-xl text-[#1C1917]">
            {language === 'ta' ? 'வாங்குபவர்களின் பகுதிகள்' : 'Regional Buyer Breakdown'}
          </h3>

          <div className="space-y-4 text-xs font-bold text-[#1C1917]">
            {[
              { region: 'Tamil Nadu (Chennai, Madurai, Kovai)', pct: '48%', color: 'bg-[#C85A32]' },
              { region: 'Karnataka & Kerala', pct: '22%', color: 'bg-[#582C12]' },
              { region: 'Rest of India (Mumbai, Delhi)', pct: '18%', color: 'bg-[#D4AF37]' },
              { region: 'NRI & International Export', pct: '12%', color: 'bg-emerald-600' }
            ].map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between">
                  <span>{item.region}</span>
                  <span className="text-[#C85A32]">{item.pct}</span>
                </div>
                <div className="h-2 rounded-full bg-stone-100 overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: item.pct }} />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#D4AF37]/30 flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-[#C85A32] shrink-0" />
            <p className="text-xs text-stone-700">
              {language === 'ta' ? 'உங்களின் விளம்பரங்கள் NRI வாடிக்கையாளர்களை கவர்கின்றன.' : 'Your Tamil & English product stories are reaching high-value buyers worldwide!'}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
