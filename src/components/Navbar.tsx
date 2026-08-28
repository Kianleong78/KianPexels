import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Search, 
  Heart, 
  FolderHeart, 
  BarChart3, 
  Key, 
  Flame, 
  Compass, 
  Image as ImageIcon, 
  Video, 
  X,
  SlidersHorizontal,
  ExternalLink
} from 'lucide-react';
import { useVisualFlow } from '../context/VisualFlowContext';
import { SectionTab, MediaType } from '../types';

export const Navbar: React.FC = () => {
  const { 
    filters, 
    updateFilter, 
    favorites, 
    moodboards, 
    apiStatus, 
    setIsApiKeyModalOpen 
  } = useVisualFlow();
  
  const [searchInput, setSearchInput] = useState(filters.query);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setSearchInput(filters.query);
  }, [filters.query]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilter('query', searchInput);
    if (filters.section !== 'explore') {
      updateFilter('section', 'explore');
    }
  };

  const handleClearSearch = () => {
    setSearchInput('');
    updateFilter('query', '');
  };

  const handleNavClick = (section: SectionTab, mediaType?: MediaType) => {
    updateFilter('section', section);
    if (mediaType) {
      updateFilter('mediaType', mediaType);
    }
    setMobileMenuOpen(false);
  };

  const totalBoardItems = moodboards.reduce((acc, b) => acc + b.items.length, 0);

  return (
    <header 
      id="main-navbar"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 shadow-lg shadow-black/20 py-2.5' 
          : 'bg-zinc-950/60 backdrop-blur-sm border-b border-zinc-800/40 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <button 
            id="nav-brand-btn"
            onClick={() => {
              updateFilter('section', 'explore');
              updateFilter('category', 'all');
              updateFilter('query', '');
            }}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-sky-500 to-teal-400 p-0.5 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-sky-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                Visual<span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-teal-300">Flow</span>
              </span>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-zinc-400 block -mt-1">
                Powered by Pexels
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
            <button
              id="nav-photos-tab"
              onClick={() => handleNavClick('explore', 'photos')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                filters.section === 'explore' && filters.mediaType === 'photos'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-sky-400" />
              Photos
            </button>

            <button
              id="nav-videos-tab"
              onClick={() => handleNavClick('explore', 'videos')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                filters.section === 'explore' && filters.mediaType === 'videos'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
              }`}
            >
              <Video className="w-4 h-4 text-emerald-400" />
              Videos
            </button>

            <button
              id="nav-trending-tab"
              onClick={() => handleNavClick('trending')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                filters.section === 'trending'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
              }`}
            >
              <Flame className="w-4 h-4 text-amber-400" />
              Trending
            </button>

            <button
              id="nav-discover-tab"
              onClick={() => handleNavClick('discover')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                filters.section === 'discover'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
              }`}
            >
              <Compass className="w-4 h-4 text-indigo-400" />
              Discover
            </button>
          </nav>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-lg hidden md:block">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 pointer-events-none" />
              <input
                id="navbar-search-input"
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={filters.mediaType === 'videos' ? "Search 4K videos, drone footage, motion..." : "Search high-res photos, nature, architecture, neon..."}
                className="w-full bg-zinc-900/90 border border-zinc-700/80 rounded-full pl-10 pr-20 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all shadow-inner"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-12 text-zinc-400 hover:text-zinc-200 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-1.5 px-3 py-1 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-semibold rounded-full shadow-sm transition-all"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Actions & Utilities */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Moodboards Link */}
          <button
            id="nav-moodboards-btn"
            onClick={() => handleNavClick('moodboards')}
            className={`p-2 sm:px-3 sm:py-2 rounded-xl flex items-center gap-2 text-xs font-medium border transition-all ${
              filters.section === 'moodboards'
                ? 'bg-indigo-950/80 border-indigo-500/60 text-indigo-200'
                : 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white'
            }`}
            title="Mood Boards & Collections"
          >
            <FolderHeart className="w-4 h-4 text-indigo-400" />
            <span className="hidden sm:inline">Mood Boards</span>
            <span className="bg-indigo-500/20 text-indigo-300 text-[11px] px-1.5 py-0.2 rounded-full font-semibold border border-indigo-500/30">
              {moodboards.length}
            </span>
          </button>

          {/* Favorites Heart */}
          <button
            id="nav-favorites-btn"
            onClick={() => handleNavClick('curated')}
            className={`p-2 sm:px-3 sm:py-2 rounded-xl flex items-center gap-1.5 text-xs font-medium border transition-all ${
              filters.section === 'curated'
                ? 'bg-rose-950/70 border-rose-500/60 text-rose-200'
                : 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white'
            }`}
            title="Saved Favorites"
          >
            <Heart className={`w-4 h-4 ${favorites.length > 0 ? 'text-rose-500 fill-rose-500' : 'text-zinc-400'}`} />
            <span className="hidden sm:inline">Favorites</span>
            {favorites.length > 0 && (
              <span className="bg-rose-500/20 text-rose-300 text-[11px] px-1.5 py-0.2 rounded-full font-semibold border border-rose-500/30">
                {favorites.length}
              </span>
            )}
          </button>

          {/* Analytics Visual Insights */}
          <button
            id="nav-analytics-btn"
            onClick={() => handleNavClick('analytics')}
            className={`p-2 rounded-xl border transition-all ${
              filters.section === 'analytics'
                ? 'bg-teal-950/70 border-teal-500/60 text-teal-200'
                : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
            }`}
            title="Visual Trends & Discovery Analytics"
          >
            <BarChart3 className="w-4 h-4 text-teal-400" />
          </button>

          {/* API Key Status Pill */}
          <button
            id="nav-api-key-btn"
            onClick={() => setIsApiKeyModalOpen(true)}
            className={`px-2.5 py-1.5 rounded-xl border flex items-center gap-1.5 text-[11px] font-medium transition-all ${
              apiStatus.hasKey
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60'
                : 'bg-amber-950/40 border-amber-500/30 text-amber-300 hover:bg-amber-900/50'
            }`}
            title={apiStatus.message}
          >
            <Key className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">{apiStatus.hasKey ? 'Pexels Live' : 'Pexels Curated'}</span>
            <span className={`w-2 h-2 rounded-full ${apiStatus.hasKey ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
          </button>

          {/* Mobile menu toggle */}
          <button
            id="nav-mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-800 bg-zinc-950 px-4 py-4 mt-2 space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search photos or videos..."
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl pl-10 pr-4 py-2 text-sm text-white"
            />
          </form>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <button
              onClick={() => handleNavClick('explore', 'photos')}
              className={`p-2.5 rounded-lg flex items-center gap-2 ${filters.mediaType === 'photos' ? 'bg-zinc-800 text-white' : 'text-zinc-400'}`}
            >
              <ImageIcon className="w-4 h-4 text-sky-400" />
              Photos
            </button>
            <button
              onClick={() => handleNavClick('explore', 'videos')}
              className={`p-2.5 rounded-lg flex items-center gap-2 ${filters.mediaType === 'videos' ? 'bg-zinc-800 text-white' : 'text-zinc-400'}`}
            >
              <Video className="w-4 h-4 text-emerald-400" />
              Videos
            </button>
            <button
              onClick={() => handleNavClick('trending')}
              className="p-2.5 rounded-lg flex items-center gap-2 text-zinc-400 hover:text-white"
            >
              <Flame className="w-4 h-4 text-amber-400" />
              Trending
            </button>
            <button
              onClick={() => handleNavClick('discover')}
              className="p-2.5 rounded-lg flex items-center gap-2 text-zinc-400 hover:text-white"
            >
              <Compass className="w-4 h-4 text-indigo-400" />
              Discover
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
