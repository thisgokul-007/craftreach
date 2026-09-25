# 🪔 CraftReach — AI-Powered Digital Marketing Assistant for Artisans

> **“Your Craft. Your Story. Your Digital Presence.”**

CraftReach is a modern, high-aesthetic web application designed to empower traditional Indian artisans and craftspeople. It allows artisans to transform raw workshop photos and spoken native descriptions (Tamil & English) into professional, high-converting digital e-commerce listings with zero digital marketing or technical skills required.

---

## ✨ Key Features

### 1. 📸 AI Product Photo Enhancer
- **Drag & Drop / Camera Capture**: Direct upload supporting JPG, PNG, WEBP and mobile device cameras.
- **Studio Lighting & Background AI**: Removes distracting workshop clutter, enhances natural contrast, and mounts products onto studio pedestals while strictly preserving authentic handmade geometry and textures.
- **Interactive Before / After Split Slider**: Draggable handle allowing instant comparison between the raw camera photo and the enhanced studio version.
- **5-Step AI Processing Pipeline**: Realistic progress stages with animated laser beam scanning effects.
- **Theme Selection**: Warm Artisan, Marble Pedestal, Velvet Luxury, Natural Light.

### 2. 🎙️ AI Voice-to-Product Description (Tamil & English Native)
- **First-Class Tamil Support**: Native voice transcription for regional craft clusters (`"இது கையால் செய்யப்பட்ட மண் விளக்கு..."`).
- **Live Waveform Visualizer**: Pulsing audio frequency feedback during speech.
- **LLM Structured Attribute Extraction**: Automatically parses unstructured speech into Product Name, Category, Material, Price (₹), Stock Quantity, Location, Story Narrative, and Special Highlights.
- **One-Click Translation**: Seamlessly converts between Tamil and English descriptions.

### 3. 🛍️ E-Commerce Product Listing & Catalog
- **Market-Ready Product Card**: Star ratings, craft origin badges (*Made in Madurai, Tamil Nadu*), one-click **Contact Artisan on WhatsApp**, catalog download, and shareable link generator.
- **Artisan Product Management**: Catalog view tracking live page views, WhatsApp buyer inquiries, inventory levels, and status indicators.

### 4. 📊 Artisan Analytics & Market Reach
- Comprehensive metrics tracking buyer engagement, WhatsApp inquiries, revenue generated, and regional interest breakdown across India and international export markets.

### 5. 🤖 Floating AI Marketing Assistant (“Ask CraftReach AI”)
- Context-aware marketing copywriter capable of instantly generating:
  - High-converting Instagram captions with relevant hashtags
  - Formatted WhatsApp broadcast messages
  - Target buyer audience analysis
  - Seasonal festival promotional campaigns (Pongal, Diwali, Navratri)

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS v4, Custom Artisanal Theme
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Voice / Speech**: Web Speech API (`SpeechRecognition` / `webkitSpeechRecognition`) with offline fallback support
- **Confetti**: Canvas-Confetti
- **Build Tool**: Vite 6

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/thisgokul-007/craftreach.git

# Navigate into the project directory
cd craftreach

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Building for Production

```bash
npm run build
```

The production assets will be generated in the `dist/` directory.

---

## 🏛️ Architecture & AI Abstraction

The project features a modular AI abstraction layer (`src/services/aiService.ts`) with clear interfaces:
- `enhanceProductPhoto(...)`
- `processVoiceInput(...)`
- `translateProductInfo(...)`
- `generateMarketingCopy(...)`

This architecture allows developers to easily plug in live API keys for OpenAI, Google Gemini, or Cloudinary/Replicate without changing the UI components.

---

## 📜 License

MIT License — Crafted with ❤️ for traditional artisans.
