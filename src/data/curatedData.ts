import { MediaItem, CategoryItem, SearchTrend } from '../types';

export const CATEGORIES: CategoryItem[] = [
  { id: 'all', name: 'All Inspiration', iconName: 'Sparkles', query: '', featuredImg: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=800', color: '#6366f1' },
  { id: 'nature', name: 'Nature & Landscapes', iconName: 'Trees', query: 'nature landscapes mountains forest', featuredImg: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=800', color: '#10b981' },
  { id: 'technology', name: 'Technology & Cyber', iconName: 'Cpu', query: 'technology modern tech workspace futuristic', featuredImg: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800', color: '#0ea5e9' },
  { id: 'architecture', name: 'Architecture & Design', iconName: 'Building2', query: 'modern architecture building interior minimalist', featuredImg: 'https://images.pexels.com/photos/1838640/pexels-photo-1838640.jpeg?auto=compress&cs=tinysrgb&w=800', color: '#f59e0b' },
  { id: 'business', name: 'Business & Office', iconName: 'Briefcase', query: 'business teamwork office creative meeting', featuredImg: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800', color: '#8b5cf6' },
  { id: 'food', name: 'Food & Culinary', iconName: 'UtensilsCrossed', query: 'food culinary coffee gourmet kitchen', featuredImg: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800', color: '#ef4444' },
  { id: 'travel', name: 'Travel & Adventure', iconName: 'Compass', query: 'travel adventure wanderlust tropical ocean', featuredImg: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=800', color: '#14b8a6' },
  { id: 'people', name: 'People & Portraits', iconName: 'Users', query: 'people portrait emotion lifestyle creative', featuredImg: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800', color: '#ec4899' },
  { id: 'minimalism', name: 'Minimalist & Clean', iconName: 'Square', query: 'minimalist white aesthetic simple clean geometry', featuredImg: 'https://images.pexels.com/photos/2088203/pexels-photo-2088203.jpeg?auto=compress&cs=tinysrgb&w=800', color: '#64748b' },
  { id: 'nightlife', name: 'Night & Neon', iconName: 'Moon', query: 'night city lights neon cyberpunk glow', featuredImg: 'https://images.pexels.com/photos/3178818/pexels-photo-3178818.jpeg?auto=compress&cs=tinysrgb&w=800', color: '#a855f7' },
  { id: 'abstract', name: 'Abstract & 3D', iconName: 'Layers', query: 'abstract textures vibrant gradients liquid 3d', featuredImg: 'https://images.pexels.com/photos/2110951/pexels-photo-2110951.jpeg?auto=compress&cs=tinysrgb&w=800', color: '#f43f5e' },
  { id: 'animals', name: 'Wildlife & Animals', iconName: 'PawPrint', query: 'animals wildlife birds safari pets', featuredImg: 'https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&w=800', color: '#eab308' },
  { id: 'fashion', name: 'Fashion & Editorial', iconName: 'Shirt', query: 'fashion style editorial model outfit', featuredImg: 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&w=800', color: '#d946ef' },
];

export const COLOR_PALETTE_FILTERS = [
  { name: 'All Colors', hex: '', class: 'bg-gradient-to-tr from-rose-500 via-amber-400 to-cyan-500' },
  { name: 'Red', hex: 'red', class: 'bg-red-500' },
  { name: 'Orange', hex: 'orange', class: 'bg-orange-500' },
  { name: 'Yellow', hex: 'yellow', class: 'bg-yellow-400' },
  { name: 'Green', hex: 'green', class: 'bg-emerald-500' },
  { name: 'Turquoise', hex: 'turquoise', class: 'bg-teal-400' },
  { name: 'Blue', hex: 'blue', class: 'bg-blue-500' },
  { name: 'Violet', hex: 'violet', class: 'bg-purple-500' },
  { name: 'Pink', hex: 'pink', class: 'bg-pink-500' },
  { name: 'Brown', hex: 'brown', class: 'bg-amber-800' },
  { name: 'Black', hex: 'black', class: 'bg-zinc-900' },
  { name: 'White', hex: 'white', class: 'bg-zinc-100 border border-zinc-300' },
];

export const SEARCH_TRENDS: SearchTrend[] = [
  { query: 'Nordic Minimalism', count: 18420, category: 'Architecture', growth: '+34%' },
  { query: 'Cyberpunk Tokyo', count: 24900, category: 'Night Life', growth: '+58%' },
  { query: 'Golden Hour Coast', count: 31200, category: 'Nature', growth: '+21%' },
  { query: 'AI Workspace Studio', count: 19850, category: 'Technology', growth: '+89%' },
  { query: 'Specialty Coffee Pour', count: 14200, category: 'Food', growth: '+15%' },
  { query: 'Editorial Streetwear', count: 22100, category: 'Fashion', growth: '+42%' },
  { query: 'Alpine Mist Forest', count: 28400, category: 'Travel', growth: '+27%' },
  { query: 'Liquid Glass Texture', count: 16700, category: 'Abstract', growth: '+64%' },
];

export const CURATED_HERO_SLIDES = [
  {
    title: 'Visual Flow & Endless Inspiration',
    subtitle: 'High-resolution photography, 4K cinematic footage, and curated mood boards powered by Pexels.',
    imageUrl: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=1920',
    photographer: 'Eberhard Grossgasteiger',
    photographerUrl: 'https://www.pexels.com/@eberhardgross',
    color: '#1e293b',
    tag: 'Nature'
  },
  {
    title: 'Neon Nights & Urban Horizons',
    subtitle: 'Explore vivid metropolitan aesthetics, futuristic glow, and cinematic nightscapes.',
    imageUrl: 'https://images.pexels.com/photos/3178818/pexels-photo-3178818.jpeg?auto=compress&cs=tinysrgb&w=1920',
    photographer: 'Aleksandar Pasaric',
    photographerUrl: 'https://www.pexels.com/@pasaric',
    color: '#0f172a',
    tag: 'Cyberpunk'
  },
  {
    title: 'Modern Architecture & Clean Geometry',
    subtitle: 'Brutalist curves, sunlit atriums, and scandinavian interior aesthetics for creatives.',
    imageUrl: 'https://images.pexels.com/photos/1838640/pexels-photo-1838640.jpeg?auto=compress&cs=tinysrgb&w=1920',
    photographer: 'Simone Hutsch',
    photographerUrl: 'https://www.pexels.com/@heysupersimi',
    color: '#334155',
    tag: 'Design'
  }
];

// Rich curated baseline photo library for instant loading & fallback
export const SEED_MEDIA_ITEMS: MediaItem[] = [
  {
    id: 'photo-1287145',
    numericId: 1287145,
    type: 'photos',
    title: 'Dramatic Alpine Mountain Peak with Blue Mist',
    description: 'Breathtaking high-altitude mountain ridgeline surrounded by atmospheric fog and evening clouds in the Dolomites.',
    width: 4000,
    height: 6000,
    aspectRatio: 0.667,
    avgColor: '#364758',
    colorPalette: ['#1e293b', '#364758', '#64748b', '#94a3b8', '#cbd5e1', '#0f172a'],
    photographer: {
      name: 'Eberhard Grossgasteiger',
      url: 'https://www.pexels.com/@eberhardgross',
      id: 119854
    },
    previewUrl: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=800',
    highResUrl: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=1600',
    downloadUrls: {
      original: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg',
      large: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=1600',
      medium: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=800',
      small: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    sourceUrl: 'https://www.pexels.com/photo/1287145/',
    tags: ['nature', 'mountains', 'mist', 'landscape', 'dolomites', 'adventure'],
    views: 48290,
    likes: 3120,
    createdAt: '2024-05-12'
  },
  {
    id: 'photo-3178818',
    numericId: 3178818,
    type: 'photos',
    title: 'Neon Cyberpunk Shibuya Crossing Tokyo',
    description: 'Vibrant rain-soaked street reflecting pink and cyan neon billboards in downtown Tokyo at midnight.',
    width: 3840,
    height: 2560,
    aspectRatio: 1.5,
    avgColor: '#2b1b3d',
    colorPalette: ['#1e1035', '#581c87', '#ec4899', '#06b6d4', '#0f172a', '#f43f5e'],
    photographer: {
      name: 'Aleksandar Pasaric',
      url: 'https://www.pexels.com/@pasaric',
      id: 98124
    },
    previewUrl: 'https://images.pexels.com/photos/3178818/pexels-photo-3178818.jpeg?auto=compress&cs=tinysrgb&w=800',
    highResUrl: 'https://images.pexels.com/photos/3178818/pexels-photo-3178818.jpeg?auto=compress&cs=tinysrgb&w=1600',
    downloadUrls: {
      original: 'https://images.pexels.com/photos/3178818/pexels-photo-3178818.jpeg',
      large: 'https://images.pexels.com/photos/3178818/pexels-photo-3178818.jpeg?auto=compress&cs=tinysrgb&w=1600',
      medium: 'https://images.pexels.com/photos/3178818/pexels-photo-3178818.jpeg?auto=compress&cs=tinysrgb&w=800',
      small: 'https://images.pexels.com/photos/3178818/pexels-photo-3178818.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    sourceUrl: 'https://www.pexels.com/photo/3178818/',
    tags: ['technology', 'tokyo', 'neon', 'nightlife', 'cyberpunk', 'city'],
    views: 89400,
    likes: 7420,
    createdAt: '2024-06-20'
  },
  {
    id: 'photo-3861969',
    numericId: 3861969,
    type: 'photos',
    title: 'Developer Coding on Ultrawide Clean Setup',
    description: 'Clean dark modern software developer workstation with mechanical keyboard, ambient backlighting, and code on screen.',
    width: 4200,
    height: 2800,
    aspectRatio: 1.5,
    avgColor: '#1c2230',
    colorPalette: ['#0f172a', '#1e293b', '#38bdf8', '#6366f1', '#94a3b8', '#e2e8f0'],
    photographer: {
      name: 'ThisIsEngineering',
      url: 'https://www.pexels.com/@thisisengineering',
      id: 77201
    },
    previewUrl: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
    highResUrl: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1600',
    downloadUrls: {
      original: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
      large: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1600',
      medium: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
      small: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    sourceUrl: 'https://www.pexels.com/photo/3861969/',
    tags: ['technology', 'workspace', 'coding', 'developer', 'minimalist', 'business'],
    views: 63100,
    likes: 4890,
    createdAt: '2024-04-18'
  },
  {
    id: 'photo-1838640',
    numericId: 1838640,
    type: 'photos',
    title: 'Surreal Pastel Architectural Facade Geometry',
    description: 'Minimalist clean geometric building facade with sky blue shadows and pastel pink balcony accents.',
    width: 3200,
    height: 4800,
    aspectRatio: 0.667,
    avgColor: '#e0c8b1',
    colorPalette: ['#fef3c7', '#fcd34d', '#38bdf8', '#fb7185', '#64748b', '#f1f5f9'],
    photographer: {
      name: 'Simone Hutsch',
      url: 'https://www.pexels.com/@heysupersimi',
      id: 61834
    },
    previewUrl: 'https://images.pexels.com/photos/1838640/pexels-photo-1838640.jpeg?auto=compress&cs=tinysrgb&w=800',
    highResUrl: 'https://images.pexels.com/photos/1838640/pexels-photo-1838640.jpeg?auto=compress&cs=tinysrgb&w=1600',
    downloadUrls: {
      original: 'https://images.pexels.com/photos/1838640/pexels-photo-1838640.jpeg',
      large: 'https://images.pexels.com/photos/1838640/pexels-photo-1838640.jpeg?auto=compress&cs=tinysrgb&w=1600',
      medium: 'https://images.pexels.com/photos/1838640/pexels-photo-1838640.jpeg?auto=compress&cs=tinysrgb&w=800',
      small: 'https://images.pexels.com/photos/1838640/pexels-photo-1838640.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    sourceUrl: 'https://www.pexels.com/photo/1838640/',
    tags: ['architecture', 'design', 'minimalism', 'building', 'geometry', 'pastel'],
    views: 41200,
    likes: 3820,
    createdAt: '2024-03-10'
  },
  {
    id: 'photo-1640777',
    numericId: 1640777,
    type: 'photos',
    title: 'Gourmet Artisan Flatlay with Fresh Herbs & Rustic Dishes',
    description: 'Vibrant Mediterranean culinary flatlay with roasted vegetables, olive oil, figs, and sourdough bread.',
    width: 4500,
    height: 3000,
    aspectRatio: 1.5,
    avgColor: '#8a4b27',
    colorPalette: ['#78350f', '#b45309', '#15803d', '#dc2626', '#fef3c7', '#451a03'],
    photographer: {
      name: 'Ella Olsson',
      url: 'https://www.pexels.com/@ella-olsson-572949',
      id: 572949
    },
    previewUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    highResUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1600',
    downloadUrls: {
      original: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      large: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1600',
      medium: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      small: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    sourceUrl: 'https://www.pexels.com/photo/1640777/',
    tags: ['food', 'culinary', 'healthy', 'rustic', 'cooking', 'gourmet'],
    views: 52000,
    likes: 4190,
    createdAt: '2024-05-02'
  },
  {
    id: 'photo-1371360',
    numericId: 1371360,
    type: 'photos',
    title: 'Tropical Turquoise Ocean Maldives Overwater Villas',
    description: 'Aerial vista of crystal clear turquoise lagoon waters, coral reefs, and luxury overwater wooden walkways.',
    width: 4800,
    height: 3200,
    aspectRatio: 1.5,
    avgColor: '#1d828f',
    colorPalette: ['#0891b2', '#06b6d4', '#67e8f9', '#14b8a6', '#f8fafc', '#0e7490'],
    photographer: {
      name: 'Mohamed Almari',
      url: 'https://www.pexels.com/@almari',
      id: 49201
    },
    previewUrl: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=800',
    highResUrl: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=1600',
    downloadUrls: {
      original: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg',
      large: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=1600',
      medium: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=800',
      small: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    sourceUrl: 'https://www.pexels.com/photo/1371360/',
    tags: ['travel', 'ocean', 'maldives', 'tropical', 'turquoise', 'resort'],
    views: 74500,
    likes: 6200,
    createdAt: '2024-02-14'
  },
  {
    id: 'photo-1239291',
    numericId: 1239291,
    type: 'photos',
    title: 'Sunlit Natural Portrait in Golden Meadow',
    description: 'Cinematic portrait of a young woman with curly hair glowing in warm afternoon backlight with bokeh particles.',
    width: 3400,
    height: 5100,
    aspectRatio: 0.667,
    avgColor: '#8a653c',
    colorPalette: ['#d97706', '#f59e0b', '#78350f', '#fef3c7', '#3b2512', '#ea580c'],
    photographer: {
      name: 'Daniel Xavier',
      url: 'https://www.pexels.com/@daniel-xavier-1102341',
      id: 1102341
    },
    previewUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800',
    highResUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1600',
    downloadUrls: {
      original: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      large: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1600',
      medium: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800',
      small: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    sourceUrl: 'https://www.pexels.com/photo/1239291/',
    tags: ['people', 'portrait', 'golden hour', 'sunlight', 'lifestyle', 'emotion'],
    views: 92100,
    likes: 8300,
    createdAt: '2024-07-04'
  },
  {
    id: 'photo-3408744',
    numericId: 3408744,
    type: 'photos',
    title: 'Emerald Green Pine Forest in Alpine Dawn',
    description: 'Layered evergreen forest shrouded in morning mist in the Pacific Northwest with sunlight piercing the canopy.',
    width: 3600,
    height: 5400,
    aspectRatio: 0.667,
    avgColor: '#20392c',
    colorPalette: ['#064e3b', '#047857', '#10b981', '#34d399', '#022c22', '#a7f3d0'],
    photographer: {
      name: 'Tomáš Malík',
      url: 'https://www.pexels.com/@maliktomas',
      id: 120491
    },
    previewUrl: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=800',
    highResUrl: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=1600',
    downloadUrls: {
      original: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg',
      large: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=1600',
      medium: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=800',
      small: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    sourceUrl: 'https://www.pexels.com/photo/3408744/',
    tags: ['nature', 'forest', 'trees', 'mist', 'green', 'pine'],
    views: 67800,
    likes: 5420,
    createdAt: '2024-06-11'
  },
  {
    id: 'photo-2110951',
    numericId: 2110951,
    type: 'photos',
    title: 'Hypnotic Fluid Gradient Holographic Waves',
    description: 'Modern abstract fluid art with iridescent oil rainbow reflections and silk metallic textures.',
    width: 4000,
    height: 4000,
    aspectRatio: 1.0,
    avgColor: '#582b6b',
    colorPalette: ['#a855f7', '#ec4899', '#3b82f6', '#14b8a6', '#4c1d95', '#f43f5e'],
    photographer: {
      name: 'David Bartus',
      url: 'https://www.pexels.com/@david-bartus-43782',
      id: 43782
    },
    previewUrl: 'https://images.pexels.com/photos/2110951/pexels-photo-2110951.jpeg?auto=compress&cs=tinysrgb&w=800',
    highResUrl: 'https://images.pexels.com/photos/2110951/pexels-photo-2110951.jpeg?auto=compress&cs=tinysrgb&w=1600',
    downloadUrls: {
      original: 'https://images.pexels.com/photos/2110951/pexels-photo-2110951.jpeg',
      large: 'https://images.pexels.com/photos/2110951/pexels-photo-2110951.jpeg?auto=compress&cs=tinysrgb&w=1600',
      medium: 'https://images.pexels.com/photos/2110951/pexels-photo-2110951.jpeg?auto=compress&cs=tinysrgb&w=800',
      small: 'https://images.pexels.com/photos/2110951/pexels-photo-2110951.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    sourceUrl: 'https://www.pexels.com/photo/2110951/',
    tags: ['abstract', 'gradient', 'waves', '3d', 'holographic', 'texture'],
    views: 38900,
    likes: 3100,
    createdAt: '2024-01-29'
  },
  {
    id: 'photo-3183150',
    numericId: 3183150,
    type: 'photos',
    title: 'Creative Strategy Team Brainstorming in Loft Studio',
    description: 'Designers and founders collaborating on sticky notes, wireframes, and design systems around an oak conference table.',
    width: 4600,
    height: 3000,
    aspectRatio: 1.533,
    avgColor: '#938475',
    colorPalette: ['#475569', '#64748b', '#cbd5e1', '#f59e0b', '#1e293b', '#f8fafc'],
    photographer: {
      name: 'Fauxels',
      url: 'https://www.pexels.com/@fauxels',
      id: 88219
    },
    previewUrl: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
    highResUrl: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1600',
    downloadUrls: {
      original: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
      large: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1600',
      medium: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
      small: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    sourceUrl: 'https://www.pexels.com/photo/3183150/',
    tags: ['business', 'teamwork', 'office', 'strategy', 'collaboration', 'people'],
    views: 45600,
    likes: 3410,
    createdAt: '2024-03-24'
  },
  {
    id: 'photo-1661179',
    numericId: 1661179,
    type: 'photos',
    title: 'Exotic Red-Eyed Tree Frog on Vivid Rainforest Leaf',
    description: 'Macro close-up of a brightly colored green and orange tree frog clinging to a dew-covered tropical monstera leaf.',
    width: 3200,
    height: 4800,
    aspectRatio: 0.667,
    avgColor: '#2b5420',
    colorPalette: ['#15803d', '#22c55e', '#ef4444', '#f97316', '#14532d', '#86efac'],
    photographer: {
      name: 'David Clode',
      url: 'https://www.pexels.com/@davidclode',
      id: 38291
    },
    previewUrl: 'https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&w=800',
    highResUrl: 'https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&w=1600',
    downloadUrls: {
      original: 'https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg',
      large: 'https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&w=1600',
      medium: 'https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&w=800',
      small: 'https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    sourceUrl: 'https://www.pexels.com/photo/1661179/',
    tags: ['animals', 'wildlife', 'frog', 'nature', 'macro', 'rainforest'],
    views: 71000,
    likes: 6790,
    createdAt: '2024-04-09'
  },
  {
    id: 'photo-2983464',
    numericId: 2983464,
    type: 'photos',
    title: 'Avant-Garde High Fashion Editorial in Paris Studio',
    description: 'Striking monochrome and warm terracotta fashion portrait featuring sharp sculptural tailoring.',
    width: 3600,
    height: 5400,
    aspectRatio: 0.667,
    avgColor: '#6f5042',
    colorPalette: ['#7c2d12', '#ea580c', '#fdba74', '#1c1917', '#78716c', '#fff7ed'],
    photographer: {
      name: 'Cottonbro Studio',
      url: 'https://www.pexels.com/@cottonbro',
      id: 28941
    },
    previewUrl: 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&w=800',
    highResUrl: 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&w=1600',
    downloadUrls: {
      original: 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg',
      large: 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&w=1600',
      medium: 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&w=800',
      small: 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    sourceUrl: 'https://www.pexels.com/photo/2983464/',
    tags: ['fashion', 'editorial', 'style', 'model', 'portrait', 'terracotta'],
    views: 59300,
    likes: 4980,
    createdAt: '2024-05-30'
  },
  // High quality Pexels curated videos
  {
    id: 'video-854132',
    numericId: 854132,
    type: 'videos',
    title: 'Aerial Turquoise Ocean Waves Crashing on White Sand',
    description: 'Smooth slow-motion 4K drone sweep of rhythmic turquoise ocean surf curling onto pristine golden shores.',
    width: 3840,
    height: 2160,
    aspectRatio: 1.777,
    avgColor: '#1a757f',
    colorPalette: ['#0891b2', '#06b6d4', '#22d3ee', '#155e75', '#f0fdfa', '#0f766e'],
    photographer: {
      name: 'Ruvim Miksanskiy',
      url: 'https://www.pexels.com/@ruvim',
      id: 39120
    },
    previewUrl: 'https://images.pexels.com/videos/854132/pictures/preview-0.jpg',
    highResUrl: 'https://images.pexels.com/videos/854132/pictures/preview-0.jpg',
    downloadUrls: {
      original: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      large: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      medium: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      small: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
    videoData: {
      duration: 18,
      videoFiles: [
        {
          id: 1,
          quality: 'uhd',
          file_type: 'video/mp4',
          width: 3840,
          height: 2160,
          fps: 60,
          link: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-waves-in-the-ocean-1298-large.mp4'
        },
        {
          id: 2,
          quality: 'hd',
          file_type: 'video/mp4',
          width: 1920,
          height: 1080,
          fps: 30,
          link: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-waves-in-the-ocean-1298-large.mp4'
        }
      ],
      thumbnailUrl: 'https://images.pexels.com/videos/854132/pictures/preview-0.jpg'
    },
    sourceUrl: 'https://www.pexels.com/video/854132/',
    tags: ['travel', 'ocean', 'waves', 'beach', 'drone', '4k'],
    views: 112000,
    likes: 9800,
    createdAt: '2024-03-01'
  },
  {
    id: 'video-2278095',
    numericId: 2278095,
    type: 'videos',
    title: 'Cyberpunk Neon Traffic Bokeh in Rainy City Night',
    description: 'Cinematic 4K anamorphic lens flares and glowing light trails through a rain-flecked windshield.',
    width: 3840,
    height: 2160,
    aspectRatio: 1.777,
    avgColor: '#2b103c',
    colorPalette: ['#581c87', '#ec4899', '#3b82f6', '#f43f5e', '#0f172a', '#a855f7'],
    photographer: {
      name: 'Kelly Lacy',
      url: 'https://www.pexels.com/@kelly-lacy-1179532',
      id: 1179532
    },
    previewUrl: 'https://images.pexels.com/videos/2278095/pictures/preview-0.jpg',
    highResUrl: 'https://images.pexels.com/videos/2278095/pictures/preview-0.jpg',
    downloadUrls: {
      original: 'https://assets.mixkit.co/videos/preview/mixkit-city-traffic-at-night-with-light-trails-41584-large.mp4',
      large: 'https://assets.mixkit.co/videos/preview/mixkit-city-traffic-at-night-with-light-trails-41584-large.mp4',
      medium: 'https://assets.mixkit.co/videos/preview/mixkit-city-traffic-at-night-with-light-trails-41584-large.mp4',
      small: 'https://assets.mixkit.co/videos/preview/mixkit-city-traffic-at-night-with-light-trails-41584-large.mp4',
    },
    videoData: {
      duration: 14,
      videoFiles: [
        {
          id: 3,
          quality: 'hd',
          file_type: 'video/mp4',
          width: 1920,
          height: 1080,
          fps: 60,
          link: 'https://assets.mixkit.co/videos/preview/mixkit-city-traffic-at-night-with-light-trails-41584-large.mp4'
        }
      ],
      thumbnailUrl: 'https://images.pexels.com/videos/2278095/pictures/preview-0.jpg'
    },
    sourceUrl: 'https://www.pexels.com/video/2278095/',
    tags: ['nightlife', 'neon', 'city', 'cyberpunk', 'rain', 'technology'],
    views: 84000,
    likes: 6700,
    createdAt: '2024-04-15'
  },
  {
    id: 'video-3045163',
    numericId: 3045163,
    type: 'videos',
    title: 'Slow Drip Espresso Pouring into Glass Cup',
    description: 'Macro 4K slow motion creamy golden crema espresso extraction in modern artisan coffee shop.',
    width: 3840,
    height: 2160,
    aspectRatio: 1.777,
    avgColor: '#452614',
    colorPalette: ['#78350f', '#92400e', '#b45309', '#fef3c7', '#291307', '#d97706'],
    photographer: {
      name: 'Roman Odintsov',
      url: 'https://www.pexels.com/@roman-odintsov',
      id: 88721
    },
    previewUrl: 'https://images.pexels.com/videos/3045163/pictures/preview-0.jpg',
    highResUrl: 'https://images.pexels.com/videos/3045163/pictures/preview-0.jpg',
    downloadUrls: {
      original: 'https://assets.mixkit.co/videos/preview/mixkit-barista-pouring-coffee-into-a-cup-32860-large.mp4',
      large: 'https://assets.mixkit.co/videos/preview/mixkit-barista-pouring-coffee-into-a-cup-32860-large.mp4',
      medium: 'https://assets.mixkit.co/videos/preview/mixkit-barista-pouring-coffee-into-a-cup-32860-large.mp4',
      small: 'https://assets.mixkit.co/videos/preview/mixkit-barista-pouring-coffee-into-a-cup-32860-large.mp4',
    },
    videoData: {
      duration: 12,
      videoFiles: [
        {
          id: 4,
          quality: 'hd',
          file_type: 'video/mp4',
          width: 1920,
          height: 1080,
          fps: 60,
          link: 'https://assets.mixkit.co/videos/preview/mixkit-barista-pouring-coffee-into-a-cup-32860-large.mp4'
        }
      ],
      thumbnailUrl: 'https://images.pexels.com/videos/3045163/pictures/preview-0.jpg'
    },
    sourceUrl: 'https://www.pexels.com/video/3045163/',
    tags: ['food', 'coffee', 'espresso', 'barista', 'slow motion', 'morning'],
    views: 62000,
    likes: 5120,
    createdAt: '2024-05-19'
  }
];

export const INITIAL_MOODBOARDS: { [key: string]: { id: string; title: string; description: string; coverImage: string; items: MediaItem[]; colorPalette: string[]; createdAt: number; updatedAt: number } } = {
  'nordic-zen': {
    id: 'nordic-zen',
    title: 'Nordic Zen & Quiet Architecture',
    description: 'Clean lines, warm woods, soft neutral palettes and natural daylight inspiration.',
    coverImage: 'https://images.pexels.com/photos/1838640/pexels-photo-1838640.jpeg?auto=compress&cs=tinysrgb&w=800',
    colorPalette: ['#f8fafc', '#e2e8f0', '#94a3b8', '#64748b', '#e0c8b1', '#1e293b'],
    items: [SEED_MEDIA_ITEMS[3], SEED_MEDIA_ITEMS[0], SEED_MEDIA_ITEMS[7]],
    createdAt: Date.now() - 86400000 * 5,
    updatedAt: Date.now() - 86400000 * 2
  },
  'cyber-glow': {
    id: 'cyber-glow',
    title: 'Cyberpunk & Night Glitch',
    description: 'Tokyo neon reflections, high-tech dark interfaces, and midnight vaporwave glow.',
    coverImage: 'https://images.pexels.com/photos/3178818/pexels-photo-3178818.jpeg?auto=compress&cs=tinysrgb&w=800',
    colorPalette: ['#0f172a', '#581c87', '#ec4899', '#06b6d4', '#3b82f6', '#f43f5e'],
    items: [SEED_MEDIA_ITEMS[1], SEED_MEDIA_ITEMS[2], SEED_MEDIA_ITEMS[8]],
    createdAt: Date.now() - 86400000 * 3,
    updatedAt: Date.now() - 86400000 * 1
  }
};
