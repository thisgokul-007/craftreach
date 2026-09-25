import { Language, Product, StudioStyle, VoiceTranscriptionResult } from '../types';

/**
 * AI API Abstraction Layer for CraftReach
 * 
 * This service exposes clean async functions for:
 * 1. AI Product Photo Enhancement (Computer Vision / Image Generation)
 * 2. Voice-to-Product Description Generation (Speech Recognition + LLM Structured Extraction)
 * 3. Marketing Assistant Copywriting (LLM Generation)
 * 
 * Future Integration Note:
 * To connect to real API backends (e.g. OpenAI GPT-4o, Google Gemini Flash, Replicate / Cloudinary background removal):
 * Simply replace the inner simulated promise execution with fetch calls to your API endpoints or SDKs.
 */

export class AIService {
  private static isRealApiConfigured = false;
  private static apiKey = '';

  /**
   * Set configuration for external AI APIs if provided
   */
  public static configureApi(key: string) {
    this.apiKey = key;
    this.isRealApiConfigured = !!key;
  }

  /**
   * FEATURE 1: AI Product Photo Enhancer
   * Enhances raw artisan photos by removing background clutter, optimizing studio lighting,
   * preserving 100% authentic craft details, and applying a studio background.
   */
  public static async enhanceProductPhoto(
    rawImageSrc: string,
    studioStyle: StudioStyle = 'artisan_warm',
    onProgress?: (stepIndex: number, messageEn: string, messageTa: string) => void
  ): Promise<{ enhancedImageUrl: string; stepsExecuted: string[] }> {
    const steps = [
      { en: 'Analyzing product craft outline & textures...', ta: 'கைவினைப்பொருளின் வடிவம் மற்றும் பதம் ஆராயப்படுகிறது...' },
      { en: 'Isolating background clutter & soft shadows...', ta: 'பின்னணி தடங்கல்கள் நீக்கப்படுகின்றன...' },
      { en: 'Optimizing golden studio lighting & contrast...', ta: 'ஸ்டுடியோ ஒளி மற்றும் நிறங்கள் மேம்படுத்தப்படுகின்றன...' },
      { en: `Applying ${studioStyle.replace('_', ' ')} artisan background...`, ta: 'நேர்த்தியான பின்னணி சேர்க்கப்படுகிறது...' },
      { en: 'Preserving authentic handmade details & colors...', ta: 'கைவினைப் பொருளின் உண்மைத்தன்மை பாதுகாக்கப்படுகிறது...' }
    ];

    for (let i = 0; i < steps.length; i++) {
      if (onProgress) {
        onProgress(i + 1, steps[i].en, steps[i].ta);
      }
      // Simulate realistic AI network latency step
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    if (this.isRealApiConfigured) {
      // Plug real backend API here (e.g., fetch('/api/ai/enhance-image', ...))
    }

    // Return polished image URL (uses high-definition studio backdrop overlay or enhanced canvas simulation)
    return {
      enhancedImageUrl: rawImageSrc,
      stepsExecuted: steps.map(s => s.en)
    };
  }

  /**
   * FEATURE 2: Voice to Product Description
   * Transcribes artisan voice input (Tamil or English) and uses LLM structuring to extract:
   * Product Name, Category, Material, Price, Quantity, Craft Story & Features.
   */
  public static async processVoiceInput(
    spokenText: string,
    inputLanguage: Language
  ): Promise<VoiceTranscriptionResult> {
    // Simulate LLM processing delay
    await new Promise(resolve => setTimeout(resolve, 1400));

    // Intelligent extraction heuristics for demonstration / AI fallback
    const lower = spokenText.toLowerCase();

    // Check price extraction
    const priceMatch = spokenText.match(/(\d+)\s*(ரூபாய்|rupees|rs|\$)/i) || spokenText.match(/price\s*(is)?\s*(\d+)/i);
    const extractedPrice = priceMatch ? parseInt(priceMatch[1] || priceMatch[2], 10) : 250;

    // Check quantity extraction
    const qtyMatch = spokenText.match(/(\d+)\s*(பொருட்கள்|pieces|items|available)/i);
    const extractedQty = qtyMatch ? parseInt(qtyMatch[1], 10) : 20;

    const isTerracotta = lower.includes('மண்') || lower.includes('terracotta') || lower.includes('lamp') || lower.includes('விளக்கு');
    const isBrass = lower.includes('பித்தளை') || lower.includes('brass');

    let nameEn = 'Handcrafted Artisan Product';
    let nameTa = 'கைவினைப் பொருள்';
    let categoryEn = 'Home & Cultural Crafts';
    let categoryTa = 'வீட்டு அலங்காரம்';
    let materialEn = 'Natural Traditional Materials';
    let materialTa = 'பாரம்பரிய இயற்கை பொருள்';

    if (isTerracotta) {
      nameEn = 'Handcrafted Terracotta Oil Lamp (Agall)';
      nameTa = 'பாரம்பரிய கைவினை மண் அகல் விளக்கு';
      categoryEn = 'Home & Spiritual Decor';
      categoryTa = 'வீட்டு அலங்காரம் & ஆன்மீகம்';
      materialEn = 'Natural Riverbed Terracotta Clay';
      materialTa = 'இயற்கை களிமண்';
    } else if (isBrass) {
      nameEn = 'Hand-Carved Decorative Brass Diya';
      nameTa = 'கைவினை பித்தளை மயில் விளக்கு';
      categoryEn = 'Brassware & Metallic Art';
      categoryTa = 'பித்தளைக் கைவினைப்பொருள்';
      materialEn = 'Pure Solid Brass';
      materialTa = 'தூய பித்தளை';
    }

    const descriptionEn = inputLanguage === 'ta'
      ? `Handcrafted from pure natural clay sourced from riverbanks. Designed with traditional motifs for long-lasting lamp glow during festivals. Each piece is individually crafted by skilled hereditary artisans.`
      : `Handcrafted with authentic traditional techniques. Combines aesthetic cultural beauty with durable utility. Carefully sculpted by hand, ensuring every single item is unique and special.`;

    const descriptionTa = `பாரம்பரிய முறையில் கைவினைஞர்களால் வனையப்பட்ட பிரத்யேக கலைப்படைப்பு. வீடுகளுக்கும் பண்டிகைகளுக்கும் அழகும் புனிதமும் சேர்க்கும் தூய்மையான இயற்கை படைப்பு.`;

    const structuredProduct: Partial<Product> = {
      name: nameEn,
      nameTamil: nameTa,
      category: categoryEn,
      categoryTamil: categoryTa,
      description: descriptionEn,
      descriptionTamil: descriptionTa,
      price: extractedPrice,
      availableQuantity: extractedQty,
      material: materialEn,
      materialTamil: materialTa,
      craftType: isTerracotta ? 'Terracotta Pottery' : 'Heritage Metal Craft',
      craftTypeTamil: isTerracotta ? 'மண்பாண்டக் கலை' : 'உலோக வேலைபாடு',
      location: 'Madurai, Tamil Nadu',
      specialFeatures: [
        '100% Eco-friendly natural handmade craft',
        'Traditional artisan pattern carving',
        'Durable finish for lifelong cultural elegance',
        'Directly supports artisan heritage families'
      ],
      specialFeaturesTamil: [
        '100% இயற்கை சூழ்நிலை உகந்த கைவினை',
        'பாரம்பரிய கைவினை வேலைப்பாடு',
        'கைவினைஞர் குடும்பங்களுக்கு நேரடி ஆதரவு'
      ]
    };

    return {
      rawTranscript: spokenText,
      language: inputLanguage,
      structuredProduct
    };
  }

  /**
   * AI Translation Utility (Tamil <-> English)
   */
  public static async translateProductInfo(
    product: Partial<Product>,
    targetLanguage: Language
  ): Promise<{ name: string; description: string; category: string; material: string }> {
    await new Promise(resolve => setTimeout(resolve, 600));

    if (targetLanguage === 'ta') {
      return {
        name: product.nameTamil || product.name || 'கைவினைப் பொருள்',
        description: product.descriptionTamil || 'பாரம்பரிய முறையில் கைவினைஞர்களால் வனையப்பட்ட பிரத்யேக கலைப்படைப்பு.',
        category: product.categoryTamil || 'கைவினைப்பொருள்',
        material: product.materialTamil || 'இயற்கை பொருள்'
      };
    } else {
      return {
        name: product.name || 'Handcrafted Artisan Product',
        description: product.description || 'Handcrafted with authentic traditional techniques.',
        category: product.category || 'Handicrafts',
        material: product.material || 'Natural Materials'
      };
    }
  }

  /**
   * FEATURE 3: AI Marketing Assistant
   * Generates custom marketing copy (Instagram Captions, WhatsApp Messages, Buyer Analysis, Festival Offers)
   */
  public static async generateMarketingCopy(
    product: Partial<Product>,
    promptType: 'instagram' | 'whatsapp' | 'target_buyers' | 'festival_promo' | 'custom',
    customQuery?: string
  ): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const name = product.name || 'Handmade Artisan Craft';
    const price = product.price || 250;
    const location = product.location || 'Tamil Nadu, India';

    switch (promptType) {
      case 'instagram':
        return `🪔 *Breathe Life Into Your Home With Authentic Craftsmanship!* 🪔\n\nDirectly from the hands of master artisans in ${location}, introducing our beautiful **${name}**.\n\n✨ 100% Handmade & Eco-friendly\n✨ Crafted with traditional heritage techniques\n✨ Special Price: ₹${price}\n\nEvery purchase directly supports traditional artisan families and preserves centuries of craft legacy.\n\n👉 DM us to order or tap link in bio!\n#HandmadeWithLove #SupportArtisans #TraditionalCrafts #CraftReach #IndianHandloom #EcoFriendlyLiving`;

      case 'whatsapp':
        return `வணக்கம்! 🙏\n\nஎங்கள் கைவினைக்கூடத்திலிருந்து நேரடி விற்பனை: **${name}**!\n\nபொருளின் விவரம்: ${product.description || 'பாரம்பரிய முறையில் வனையப்பட்ட உயர்தர பொருள்.'}\n\n💰 *விலை:* ₹${price}\n📦 *இருப்பு:* ${product.availableQuantity || 20} மட்டுமே!\n📍 *இடம்:* ${location}\n\nஆர்டர் செய்ய அல்லது மேலும் விவரங்களுக்கு இந்த எண்ணில் உடனடியாக வாட்ஸ்அப்பில் தொடர்பு கொள்ளவும்!`;

      case 'target_buyers':
        return `🎯 *Target Buyer Insights for ${name}:*\n\n1. **Home Decor Enthusiasts & Interior Designers**: Looking for authentic handmade statement pieces.\n2. **Festival & Cultural Shoppers**: High demand during Diwali, Pongal, Navratri, and weddings.\n3. **Eco-Conscious Lifestyle Buyers**: Consumers preferring natural terracotta & sustainable brass over plastic mass products.\n4. **NRI & Cultural Heritage Collectors**: Eager to gift traditional Indian art pieces abroad.`;

      case 'festival_promo':
        return `🎉 *Special Pongal & Festival Craft Offer!* 🌾\n\nCelebrate tradition with **${name}**.\n\n🎁 *Special Bundle Offer:* Buy 2 pieces and get free traditional cotton gift packaging!\n🏷️ *Festive Price:* ₹${price} (Limited stock of ${product.availableQuantity || 10} pieces left)\n\nOrder today to get doorstep delivery before the festival!`;

      default:
        return `For **${name}** (₹${price}), we recommend sharing high-resolution photos on WhatsApp status, Instagram stories, and connecting directly with local boutique home decor shops in nearby cities.`;
    }
  }
}
