import React, { useState } from 'react';
import { Language, Product, StudioStyle, ViewMode, WorkspaceTab } from './types';
import { SAMPLE_PRODUCTS } from './services/sampleData';
import { Navbar } from './components/navbar/Navbar';
import { Hero } from './components/landing/Hero';
import { ProblemSection } from './components/landing/ProblemSection';
import { HowItWorks } from './components/landing/HowItWorks';
import { PhotoEnhancer } from './components/enhancer/PhotoEnhancer';
import { VoiceWorkspace } from './components/voice/VoiceWorkspace';
import { ProductPreview } from './components/preview/ProductPreview';
import { ProductCatalog } from './components/products/ProductCatalog';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { MarketingAssistant } from './components/ai-assistant/MarketingAssistant';
import { Footer } from './components/footer/Footer';
import { Camera, Mic, Sparkles, Eye, Wand2, ArrowLeft } from 'lucide-react';

export function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('landing');
  const [workspaceTab, setWorkspaceTab] = useState<WorkspaceTab>('enhancer');
  const [language, setLanguage] = useState<Language>('ta'); // Tamil default as requested for artisan focus
  const [productsList, setProductsList] = useState<Product[]>(SAMPLE_PRODUCTS);
  
  // Current active draft being created
  const [draftProduct, setDraftProduct] = useState<Partial<Product>>({
    rawImageUrl: SAMPLE_PRODUCTS[0].rawImageUrl,
    enhancedImageUrl: SAMPLE_PRODUCTS[0].enhancedImageUrl,
    name: SAMPLE_PRODUCTS[0].name,
    nameTamil: SAMPLE_PRODUCTS[0].nameTamil,
    category: SAMPLE_PRODUCTS[0].category,
    categoryTamil: SAMPLE_PRODUCTS[0].categoryTamil,
    description: SAMPLE_PRODUCTS[0].description,
    descriptionTamil: SAMPLE_PRODUCTS[0].descriptionTamil,
    price: SAMPLE_PRODUCTS[0].price,
    availableQuantity: SAMPLE_PRODUCTS[0].availableQuantity,
    material: SAMPLE_PRODUCTS[0].material,
    craftType: SAMPLE_PRODUCTS[0].craftType,
    location: SAMPLE_PRODUCTS[0].location,
    specialFeatures: SAMPLE_PRODUCTS[0].specialFeatures,
    specialFeaturesTamil: SAMPLE_PRODUCTS[0].specialFeaturesTamil
  });

  const handleNavigate = (view: ViewMode, tab: WorkspaceTab = 'enhancer') => {
    setCurrentView(view);
    setWorkspaceTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  // Image selected from Photo Enhancer
  const handleImageSelected = (enhancedUrl: string, rawUrl: string, style: StudioStyle) => {
    setDraftProduct(prev => ({
      ...prev,
      enhancedImageUrl: enhancedUrl,
      rawImageUrl: rawUrl,
      studioStyle: style
    }));
  };

  // Voice details parsed
  const handleSaveVoiceData = (partialInfo: Partial<Product>) => {
    setDraftProduct(prev => ({
      ...prev,
      ...partialInfo
    }));
  };

  // Finalize product save into main list
  const handleSaveProductToList = (finalProduct: Partial<Product>) => {
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: finalProduct.name || 'Handcrafted Product',
      nameTamil: finalProduct.nameTamil,
      category: finalProduct.category || 'Handicrafts',
      categoryTamil: finalProduct.categoryTamil,
      description: finalProduct.description || 'Handmade product.',
      descriptionTamil: finalProduct.descriptionTamil,
      price: finalProduct.price || 250,
      availableQuantity: finalProduct.availableQuantity || 10,
      material: finalProduct.material || 'Natural Clay',
      craftType: finalProduct.craftType || 'Artisan Pottery',
      location: finalProduct.location || 'Madurai, Tamil Nadu',
      specialFeatures: finalProduct.specialFeatures || [],
      specialFeaturesTamil: finalProduct.specialFeaturesTamil || [],
      rawImageUrl: finalProduct.rawImageUrl || SAMPLE_PRODUCTS[0].rawImageUrl,
      enhancedImageUrl: finalProduct.enhancedImageUrl || SAMPLE_PRODUCTS[0].enhancedImageUrl,
      studioStyle: finalProduct.studioStyle || 'artisan_warm',
      rating: 5.0,
      viewsCount: 1,
      enquiriesCount: 0,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      artisanName: 'Anitha M.',
      artisanLocation: 'Madurai, Tamil Nadu'
    };

    setProductsList(prev => [newProduct, ...prev]);
  };

  const handleDeleteProduct = (id: string) => {
    setProductsList(prev => prev.filter(p => p.id !== id));
  };

  const handleSelectProductPreview = (product: Product) => {
    setDraftProduct(product);
    setCurrentView('workspace');
    setWorkspaceTab('preview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1917] flex flex-col font-sans">
      
      {/* Top Header Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        language={language}
        onToggleLanguage={handleToggleLanguage}
      />

      {/* Main View Router */}
      <main className="flex-1">
        
        {/* VIEW 1: LANDING PAGE */}
        {currentView === 'landing' && (
          <div className="space-y-0">
            <Hero onNavigate={handleNavigate} language={language} />
            <ProblemSection language={language} />
            <HowItWorks onNavigate={handleNavigate} language={language} />
          </div>
        )}

        {/* VIEW 2: AI WORKSPACE (CREATION DASHBOARD) */}
        {currentView === 'workspace' && (
          <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            
            {/* Workspace Step Navigation Tabs */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-3 rounded-3xl border border-[#D4AF37]/30 shadow-md">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentView('landing')}
                  className="p-2 rounded-xl text-stone-600 hover:bg-stone-100 transition"
                  title="Back to Landing"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <span className="font-serif-craft font-bold text-lg text-[#1C1917] hidden md:block">
                  {language === 'ta' ? 'AI கைவினை உருவாக்கம்' : 'AI Craft Workspace'}
                </span>
              </div>

              {/* 3 Workspace Flow Tabs */}
              <div className="flex bg-[#FAF7F2] p-1.5 rounded-2xl border border-[#D4AF37]/20 w-full sm:w-auto">
                <button
                  onClick={() => setWorkspaceTab('enhancer')}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    workspaceTab === 'enhancer'
                      ? 'bg-[#C85A32] text-white shadow-md'
                      : 'text-[#1C1917]/70 hover:text-[#1C1917]'
                  }`}
                >
                  <Camera className="w-4 h-4" />
                  <span>1. {language === 'ta' ? 'புகைப்பட மெருகூட்டல்' : 'Photo Enhancer'}</span>
                </button>

                <button
                  onClick={() => setWorkspaceTab('voice')}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    workspaceTab === 'voice'
                      ? 'bg-[#C85A32] text-white shadow-md'
                      : 'text-[#1C1917]/70 hover:text-[#1C1917]'
                  }`}
                >
                  <Mic className="w-4 h-4" />
                  <span>2. {language === 'ta' ? 'குரல் விவரிப்பு' : 'Voice Description'}</span>
                </button>

                <button
                  onClick={() => setWorkspaceTab('preview')}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    workspaceTab === 'preview'
                      ? 'bg-[#C85A32] text-white shadow-md'
                      : 'text-[#1C1917]/70 hover:text-[#1C1917]'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  <span>3. {language === 'ta' ? 'தயாரிப்பு முன்னோட்டம்' : 'Product Listing'}</span>
                </button>
              </div>
            </div>

            {/* TAB 1: PHOTO ENHANCER */}
            {workspaceTab === 'enhancer' && (
              <PhotoEnhancer
                language={language}
                onImageSelected={handleImageSelected}
                onProceedToVoice={() => setWorkspaceTab('voice')}
              />
            )}

            {/* TAB 2: VOICE TO DESCRIPTION */}
            {workspaceTab === 'voice' && (
              <VoiceWorkspace
                language={language}
                enhancedImageUrl={draftProduct.enhancedImageUrl}
                onSaveProduct={handleSaveVoiceData}
                onProceedToPreview={() => {
                  handleSaveProductToList(draftProduct);
                  setWorkspaceTab('preview');
                }}
              />
            )}

            {/* TAB 3: PRODUCT PREVIEW */}
            {workspaceTab === 'preview' && (
              <ProductPreview
                product={draftProduct}
                language={language}
                onNavigateToCatalog={() => setCurrentView('products')}
              />
            )}

          </div>
        )}

        {/* VIEW 3: MY PRODUCTS CATALOG */}
        {currentView === 'products' && (
          <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProductCatalog
              products={productsList}
              language={language}
              onNavigate={handleNavigate}
              onDeleteProduct={handleDeleteProduct}
              onSelectProductPreview={handleSelectProductPreview}
            />
          </div>
        )}

        {/* VIEW 4: ANALYTICS */}
        {currentView === 'analytics' && (
          <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnalyticsView language={language} />
          </div>
        )}

      </main>

      {/* Floating AI Marketing Assistant Drawer */}
      <MarketingAssistant currentProduct={draftProduct} language={language} />

      {/* Footer */}
      <Footer language={language} />

    </div>
  );
}

export default App;
