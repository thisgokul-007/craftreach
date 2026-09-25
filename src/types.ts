export type Language = 'ta' | 'en';

export type ViewMode = 'landing' | 'workspace' | 'products' | 'analytics';

export type WorkspaceTab = 'enhancer' | 'voice' | 'preview';

export type StudioStyle = 'artisan_warm' | 'marble_pedestal' | 'velvet_luxury' | 'natural_sunlight';

export interface Product {
  id: string;
  name: string;
  nameTamil?: string;
  category: string;
  categoryTamil?: string;
  description: string;
  descriptionTamil?: string;
  price: number;
  availableQuantity: number;
  material: string;
  materialTamil?: string;
  craftType: string;
  craftTypeTamil?: string;
  location: string;
  specialFeatures: string[];
  specialFeaturesTamil?: string[];
  rawImageUrl: string;
  enhancedImageUrl: string;
  studioStyle: StudioStyle;
  rating?: number;
  viewsCount: number;
  enquiriesCount: number;
  status: 'active' | 'draft';
  createdAt: string;
  artisanName: string;
  artisanLocation: string;
}

export interface EnhancementProcessStep {
  id: string;
  messageEn: string;
  messageTa: string;
  progress: number;
}

export interface VoiceTranscriptionResult {
  rawTranscript: string;
  language: Language;
  structuredProduct: Partial<Product>;
}

export interface MarketingSuggestion {
  id: string;
  titleEn: string;
  titleTa: string;
  icon: string;
  promptText: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  copyable?: boolean;
}
