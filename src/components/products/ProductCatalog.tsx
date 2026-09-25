import React, { useState } from 'react';
import { Eye, MessageSquare, Edit3, Share2, Trash2, PlusCircle, Search, Filter, Sparkles } from 'lucide-react';
import { Language, Product, ViewMode, WorkspaceTab } from '../../types';

interface ProductCatalogProps {
  products: Product[];
  language: Language;
  onNavigate: (view: ViewMode, tab?: WorkspaceTab) => void;
  onDeleteProduct: (id: string) => void;
  onSelectProductPreview: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  language,
  onNavigate,
  onDeleteProduct,
  onSelectProductPreview
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'draft'>('all');

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (p.nameTamil && p.nameTamil.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = selectedFilter === 'all' || p.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      
      {/* Page Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#D4AF37]/20">
        <div>
          <h2 className="font-serif-craft text-3xl sm:text-4xl font-extrabold text-[#1C1917]">
            {language === 'ta' ? 'என் கைவினைப் பொருட்கள்' : 'My Craft Products'}
          </h2>
          <p className="text-sm text-[#1C1917]/70 mt-1">
            {language === 'ta'
              ? 'உங்கள் தயாரிப்புகளின் பார்வையாளர்கள், விசாரணைகள் மற்றும் இருப்பை நிர்வகிக்கவும்.'
              : 'Manage your live e-commerce products, track buyer enquiries & views.'}
          </p>
        </div>

        <button
          onClick={() => onNavigate('workspace', 'enhancer')}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#C85A32] to-[#582C12] text-white font-extrabold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition flex items-center gap-2"
        >
          <PlusCircle className="w-5 h-5" />
          {language === 'ta' ? 'புதிய பொருள் உருவாக்க' : 'Create New Product'}
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        
        {/* Search input */}
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={language === 'ta' ? 'பொருளின் பெயர் தேட...' : 'Search product name...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#D4AF37]/30 text-sm focus:outline-none focus:border-[#C85A32]"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-[#D4AF37]/30">
          <Filter className="w-4 h-4 text-[#C85A32] ml-2 mr-1" />
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              selectedFilter === 'all' ? 'bg-[#582C12] text-white' : 'text-stone-600 hover:text-black'
            }`}
          >
            {language === 'ta' ? 'அனைத்தும்' : 'All'} ({products.length})
          </button>
          <button
            onClick={() => setSelectedFilter('active')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              selectedFilter === 'active' ? 'bg-[#582C12] text-white' : 'text-stone-600 hover:text-black'
            }`}
          >
            {language === 'ta' ? 'செயலில் உள்ளவை' : 'Active'} ({products.filter(p => p.status === 'active').length})
          </button>
        </div>

      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="craft-card rounded-3xl p-12 text-center bg-white border border-[#D4AF37]/30 space-y-4">
          <Sparkles className="w-12 h-12 text-[#C85A32] mx-auto opacity-50" />
          <h3 className="text-xl font-bold text-[#1C1917]">
            {language === 'ta' ? 'தயாரிப்புகள் எதுவும் கிடைக்கவில்லை' : 'No products found'}
          </h3>
          <p className="text-sm text-gray-500">
            {language === 'ta' ? 'உங்கள் முதல் கைவினைப் பொருளை உடனே உருவாக்குங்கள்!' : 'Start creating your digital brand listing in minutes.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => {
            const name = (language === 'ta' && product.nameTamil) ? product.nameTamil : product.name;
            return (
              <div
                key={product.id}
                className="craft-card craft-card-hover rounded-3xl overflow-hidden bg-white border border-[#D4AF37]/30 shadow-md flex flex-col justify-between"
              >
                <div>
                  {/* Card Image Banner */}
                  <div className="relative h-56 bg-stone-900 overflow-hidden cursor-pointer" onClick={() => onSelectProductPreview(product)}>
                    <img
                      src={product.enhancedImageUrl || product.rawImageUrl}
                      alt={name}
                      className="w-full h-full object-cover filter brightness-105 hover:scale-105 transition duration-500"
                    />

                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                        product.status === 'active'
                          ? 'bg-emerald-800 text-white shadow'
                          : 'bg-amber-800 text-white shadow'
                      }`}>
                        {product.status}
                      </span>
                    </div>

                    {/* Price Overlay */}
                    <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-white font-extrabold text-sm border border-white/20">
                      ₹{product.price}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-4 text-left">
                    <div>
                      <span className="text-[10px] font-extrabold text-[#C85A32] uppercase tracking-wider">
                        {product.category}
                      </span>
                      <h3 
                        onClick={() => onSelectProductPreview(product)}
                        className="font-serif-craft font-bold text-lg text-[#1C1917] hover:text-[#C85A32] transition cursor-pointer line-clamp-1"
                      >
                        {name}
                      </h3>
                      <p className="text-xs text-gray-500 font-medium">
                        {product.availableQuantity} {language === 'ta' ? 'பொருட்கள் இருப்பில் உள்ளன' : 'available in stock'}
                      </p>
                    </div>

                    {/* Stats Pill Row */}
                    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100 text-xs font-bold text-[#582C12]">
                      <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#D4AF37]/20 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5 text-[#C85A32]" />
                          {language === 'ta' ? 'பார்வைகள்' : 'Views'}
                        </span>
                        <span className="text-[#C85A32] font-black">{product.viewsCount}</span>
                      </div>

                      <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#D4AF37]/20 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <MessageSquare className="w-3.5 h-3.5 text-[#C85A32]" />
                          {language === 'ta' ? 'விசாரணை' : 'Enquiries'}
                        </span>
                        <span className="text-[#C85A32] font-black">{product.enquiriesCount}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-gray-100 gap-2">
                  <button
                    onClick={() => onSelectProductPreview(product)}
                    className="flex-1 py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#582C12] hover:text-white text-[#582C12] font-bold text-xs transition flex items-center justify-center gap-1.5 border border-[#D4AF37]/30"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    {language === 'ta' ? 'திருத்து / பார்' : 'Edit / View'}
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(window.location.href);
                      alert(language === 'ta' ? 'தயாரிப்பு இணைப்பு நகலெடுக்கப்பட்டது!' : 'Product Link Copied!');
                    }}
                    className="p-2.5 rounded-xl bg-gray-100 hover:bg-amber-100 text-stone-700 transition"
                    title="Share"
                  >
                    <Share2 className="w-4 h-4 text-[#C85A32]" />
                  </button>

                  <button
                    onClick={() => onDeleteProduct(product.id)}
                    className="p-2.5 rounded-xl bg-gray-100 hover:bg-rose-100 text-rose-600 transition"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
