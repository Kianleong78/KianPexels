import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Image as ImageIcon, Video, ArrowRight, Flame, Compass, RefreshCw, Layers } from 'lucide-react';
import { useVisualFlow } from '../context/VisualFlowContext';
import { CURATED_HERO_SLIDES } from '../data/curatedData';
import { MediaType } from '../types';

const TRENDING_TOPICS = [
  { label: 'Nature', query: 'nature mountains forest landscape', color: 'from-emerald-500/20 to-teal-500/10 text-emerald-300 border-emerald-500/30' },
  { label: 'Technology', query: 'technology futuristic workspace coding', color: 'from-sky-500/20 to-blue-500/10 text-sky-300 border-sky-500/30' },
  { label: 'Cyberpunk', query: 'cyberpunk neon city night tokyo', color: 'from-fuchsia-500/20 to-purple-500/10 text-fuchsia-300 border-fuchsia-500/30' },
  { label: 'Architecture', query: 'modern architecture interior minimalist', color: 'from-amber-500/20 to-orange-500/10 text-amber-300 border-amber-500/30' },
  { label: 'Travel', query: 'travel wanderlust ocean tropical adventure', color: 'from-cyan-500/20 to-teal-500/10 text-cyan-300 border-cyan-500/30' },
  { label: 'Business', query: 'business creative office startup', color: 'from-indigo-500/20 to-violet-500/10 text-indigo-300 border-indigo-500/30' },
  { label: 'Food', query: 'gourmet food artisan coffee culinary', color: 'from-rose-500/20 to-red-500/10 text-rose-300 border-rose-500/30' },
  { label: 'People', query: 'people portrait emotion lifestyle', color: 'from-pink-500/20 to-rose-500/10 text-pink-300 border-pink-500/30' },
  { label: 'Drone 4K', query: 'aerial drone ocean coast 4k', color: 'from-teal-500/20 to-emerald-500/10 text-teal-300 border-teal-500/30' },
];

export const Hero: React.FC = () => {
  const { filters, updateFilter, analytics } = useVisualFlow();
  const [slideIndex, setSlideIndex] = useState(0);
  const [localQuery, setLocalQuery] = useState(filters.query);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Auto-cycle hero image every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % CURATED_HERO_SLIDES.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = CURATED_HERO_SLIDES[slideIndex];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localQuery.trim()) {
      updateFilter('query', localQuery.trim());
      updateFilter('section', 'explore');
      updateFilter('category', 'all');
      // Smooth scroll to gallery
      const gallery = document.getElementById('explore-gallery-section');
      if (gallery) {
        gallery.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleTopicClick = (query: string) => {
    setLocalQuery(query);
    updateFilter('query', query);
    updateFilter('section', 'explore');
    updateFilter('category', 'all');
    const gallery = document.getElementById('explore-gallery-section');
    if (gallery) {
      gallery.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMediaTypeChange = (type: MediaType) => {
    updateFilter('mediaType', type);
  };

  return (
    <section id="hero-section" className="relative w-full overflow-hidden bg-zinc-950 text-white min-h-[480px] sm:min-h-[540px] flex items-center">
      
      {/* Background Image Carousel with Smooth Transitions */}
      {CURATED_HERO_SLIDES.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === slideIndex ? 'opacity-40 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          }`}
          style={{
            backgroundImage: `url(${slide.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'opacity 1s ease-in-out, transform 8s ease-out'
          }}
        />
      ))}

      {/* Aesthetic Multi-layer Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/40" />
      <div className="absolute inset-0 bg-radial from-transparent via-zinc-950/50 to-zinc-950" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center w-full z-10">
        
        {/* Badge & Switcher Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-700/60 backdrop-blur-md text-xs font-medium text-zinc-300 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            <span>Discover Visual Inspiration</span>
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <span className="text-zinc-400 font-mono text-[11px]">{analytics.discoveredCount.toLocaleString()}+ Discovered</span>
          </div>

          {/* Quick Photo/Video Hero Toggle */}
          <div className="inline-flex p-1 bg-zinc-900/90 border border-zinc-700/80 rounded-full backdrop-blur-md">
            <button
              id="hero-photos-toggle"
              onClick={() => handleMediaTypeChange('photos')}
              className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                filters.mediaType === 'photos'
                  ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              Photos
            </button>
            <button
              id="hero-videos-toggle"
              onClick={() => handleMediaTypeChange('videos')}
              className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                filters.mediaType === 'videos'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              Videos (4K)
            </button>
          </div>
        </div>

        {/* Dynamic Display Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15] drop-shadow-sm">
          Unleash Visual Harmony in{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300">
            Endless Flow
          </span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Search over 3 million live high-resolution Pexels photos, 4K footage, and extract rich color palettes into custom mood boards.
        </p>

        {/* Central Search Form */}
        <div className="mt-8 max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="relative">
            <div className={`relative flex items-center rounded-2xl sm:rounded-full bg-zinc-900/90 border transition-all duration-300 shadow-2xl backdrop-blur-xl p-1.5 ${
              isSearchFocused 
                ? 'border-sky-500 ring-4 ring-sky-500/20 shadow-sky-500/10' 
                : 'border-zinc-700/80 hover:border-zinc-600'
            }`}>
              <div className="pl-4 pr-2 text-zinc-400 flex items-center">
                <Search className="w-5 h-5 text-sky-400" />
              </div>
              <input
                id="hero-search-input"
                type="text"
                value={localQuery}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                onChange={(e) => setLocalQuery(e.target.value)}
                placeholder={
                  filters.mediaType === 'videos'
                    ? "Search 4K cinematic video clips, drone landscapes, motion..."
                    : "Search free high-resolution photos, architecture, cyberpunk..."
                }
                className="w-full bg-transparent py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-zinc-500 focus:outline-none"
              />
              <button
                id="hero-search-submit"
                type="submit"
                className="px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs sm:text-sm font-semibold rounded-xl sm:rounded-full shadow-lg shadow-sky-500/25 flex items-center gap-2 transition-all shrink-0 active:scale-95"
              >
                <span>Explore</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Trending Search Topics */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <div className="flex items-center gap-1 text-xs font-semibold text-zinc-400 mr-1">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Trending:</span>
          </div>
          {TRENDING_TOPICS.map((topic, i) => (
            <button
              key={i}
              id={`hero-topic-${topic.label.toLowerCase()}`}
              onClick={() => handleTopicClick(topic.query)}
              className={`px-3 py-1 rounded-full text-xs font-medium border bg-gradient-to-r ${topic.color} hover:brightness-125 transition-all shadow-sm active:scale-95`}
            >
              {topic.label}
            </button>
          ))}
        </div>

        {/* Hero Slide Attribution & Cycle Indicator */}
        <div className="mt-8 flex items-center justify-between text-xs text-zinc-400 max-w-xl mx-auto pt-2 border-t border-zinc-800/40">
          <div className="flex items-center gap-2">
            <span>Photo by</span>
            <a
              href={currentSlide.photographerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 font-medium hover:text-sky-300 underline underline-offset-2 transition-colors"
            >
              {currentSlide.photographer}
            </a>
            <span className="text-zinc-600">on Pexels</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              {CURATED_HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlideIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === slideIndex ? 'w-5 bg-sky-400' : 'bg-zinc-700 hover:bg-zinc-500'
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setSlideIndex((prev) => (prev + 1) % CURATED_HERO_SLIDES.length)}
              className="p-1 rounded text-zinc-500 hover:text-zinc-300 transition-colors"
              title="Next Background"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
