import React, { useState } from 'react';
import { 
  Sparkles, 
  Trees, 
  Cpu, 
  Building2, 
  Briefcase, 
  UtensilsCrossed, 
  Compass, 
  Users, 
  Square, 
  Moon, 
  Layers, 
  PawPrint, 
  Shirt, 
  Image as ImageIcon, 
  Video, 
  SlidersHorizontal, 
  RotateCcw, 
  Flame, 
  Check, 
  ChevronRight, 
  FolderHeart, 
  BarChart3,
  Palette
} from 'lucide-react';
import { useVisualFlow } from '../context/VisualFlowContext';
import { CATEGORIES, COLOR_PALETTE_FILTERS } from '../data/curatedData';
import { SectionTab, MediaType, OrientationFilter, SizeFilter } from '../types';

const ICON_MAP: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-4 h-4" />,
  Trees: <Trees className="w-4 h-4" />,
  Cpu: <Cpu className="w-4 h-4" />,
  Building2: <Building2 className="w-4 h-4" />,
  Briefcase: <Briefcase className="w-4 h-4" />,
  UtensilsCrossed: <UtensilsCrossed className="w-4 h-4" />,
  Compass: <Compass className="w-4 h-4" />,
  Users: <Users className="w-4 h-4" />,
  Square: <Square className="w-4 h-4" />,
  Moon: <Moon className="w-4 h-4" />,
  Layers: <Layers className="w-4 h-4" />,
  PawPrint: <PawPrint className="w-4 h-4" />,
  Shirt: <Shirt className="w-4 h-4" />,
};

export const FilterBar: React.FC = () => {
  const { filters, updateFilter, resetFilters } = useVisualFlow();
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const handleCategoryClick = (catId: string) => {
    if (catId === 'all') {
      updateFilter('category', 'all');
      updateFilter('query', '');
    } else {
      const selected = CATEGORIES.find(c => c.id === catId);
      updateFilter('category', catId);
      updateFilter('query', selected ? selected.query : catId);
    }
    if (filters.section !== 'explore' && filters.section !== 'popular' && filters.section !== 'trending' && filters.section !== 'discover') {
      updateFilter('section', 'explore');
    }
  };

  const handleSectionClick = (sec: SectionTab) => {
    updateFilter('section', sec);
  };

  const isFiltered = 
    filters.query !== '' || 
    filters.category !== 'all' || 
    filters.orientation !== 'all' || 
    filters.size !== 'all' || 
    filters.color !== '';

  return (
    <div id="filter-bar-container" className="w-full bg-zinc-950/95 border-b border-zinc-800/80 sticky top-[60px] z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-3">
        
        {/* Row 1: Section Navigation & Media Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          {/* Main Sections Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <button
              id="filter-sec-explore"
              onClick={() => handleSectionClick('explore')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                filters.section === 'explore'
                  ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Explore All
            </button>

            <button
              id="filter-sec-curated"
              onClick={() => handleSectionClick('curated')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                filters.section === 'curated'
                  ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Curated & Favourites
            </button>

            <button
              id="filter-sec-popular"
              onClick={() => handleSectionClick('popular')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                filters.section === 'popular'
                  ? 'bg-amber-500 text-zinc-950 font-bold shadow-sm shadow-amber-500/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              Popular
            </button>

            <button
              id="filter-sec-trending"
              onClick={() => handleSectionClick('trending')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                filters.section === 'trending'
                  ? 'bg-indigo-500 text-white shadow-sm shadow-indigo-500/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              Trending
            </button>

            <button
              id="filter-sec-discover"
              onClick={() => handleSectionClick('discover')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                filters.section === 'discover'
                  ? 'bg-teal-500 text-zinc-950 font-bold shadow-sm shadow-teal-500/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              Discover
            </button>

            <button
              id="filter-sec-moodboards"
              onClick={() => handleSectionClick('moodboards')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                filters.section === 'moodboards'
                  ? 'bg-purple-600 text-white shadow-sm shadow-purple-600/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <FolderHeart className="w-3.5 h-3.5" />
              Mood Boards
            </button>

            <button
              id="filter-sec-analytics"
              onClick={() => handleSectionClick('analytics')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                filters.section === 'analytics'
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Visual Analytics
            </button>
          </div>

          {/* Right Controls: Photos/Videos Switch & Filter Toggle */}
          <div className="flex items-center gap-2">
            
            {/* Photos vs Videos Toggle */}
            <div className="flex items-center p-1 bg-zinc-900 border border-zinc-800 rounded-xl">
              <button
                id="filter-media-photos"
                onClick={() => updateFilter('mediaType', 'photos')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  filters.mediaType === 'photos'
                    ? 'bg-zinc-800 text-sky-400 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                Photos
              </button>
              <button
                id="filter-media-videos"
                onClick={() => updateFilter('mediaType', 'videos')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  filters.mediaType === 'videos'
                    ? 'bg-zinc-800 text-emerald-400 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                Videos
              </button>
            </div>

            {/* Advanced Filters Expand Toggle */}
            <button
              id="filter-advanced-toggle"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all ${
                showAdvancedFilters || filters.orientation !== 'all' || filters.size !== 'all' || filters.color !== ''
                  ? 'bg-sky-950/60 border-sky-500/50 text-sky-300'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {(filters.orientation !== 'all' || filters.size !== 'all' || filters.color !== '') && (
                <span className="w-2 h-2 rounded-full bg-sky-400" />
              )}
            </button>

            {/* Reset Filter Button */}
            {isFiltered && (
              <button
                id="filter-reset-btn"
                onClick={resetFilters}
                className="p-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-rose-400 transition-colors"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Row 2: Category Scrollable Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 pt-0.5">
          {CATEGORIES.map((cat) => {
            const isSelected = filters.category === cat.id;
            return (
              <button
                key={cat.id}
                id={`cat-btn-${cat.id}`}
                onClick={() => handleCategoryClick(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap border flex items-center gap-2 transition-all ${
                  isSelected
                    ? 'bg-zinc-800 border-sky-500 text-white shadow-md shadow-sky-500/10'
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 hover:border-zinc-700'
                }`}
              >
                <span style={{ color: isSelected ? '#38bdf8' : cat.color }}>
                  {ICON_MAP[cat.iconName] || <Sparkles className="w-3.5 h-3.5" />}
                </span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Expandable Advanced Filter Panel: Orientation, Size, Color */}
        {showAdvancedFilters && (
          <div className="pt-3 pb-1 border-t border-zinc-850 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
            
            {/* Orientation Filter */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
                Orientation
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {(['all', 'landscape', 'portrait', 'square'] as OrientationFilter[]).map((orient) => (
                  <button
                    key={orient}
                    id={`filter-orient-${orient}`}
                    onClick={() => updateFilter('orientation', orient)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-medium capitalize border transition-all text-center ${
                      filters.orientation === orient
                        ? 'bg-zinc-800 border-sky-500 text-white'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {orient}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
                Size / Resolution
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {(['all', 'large', 'medium', 'small'] as SizeFilter[]).map((sz) => (
                  <button
                    key={sz}
                    id={`filter-size-${sz}`}
                    onClick={() => updateFilter('size', sz)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-medium capitalize border transition-all text-center ${
                      filters.size === sz
                        ? 'bg-zinc-800 border-sky-500 text-white'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {sz === 'large' ? '4K / Large' : sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette Filter */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                  <Palette className="w-3 h-3 text-sky-400" />
                  Color Tone
                </label>
                {filters.color && (
                  <button 
                    onClick={() => updateFilter('color', '')}
                    className="text-[10px] text-sky-400 hover:underline"
                  >
                    Clear color ({filters.color})
                  </button>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {COLOR_PALETTE_FILTERS.map((col) => {
                  const isSelected = filters.color === col.hex;
                  return (
                    <button
                      key={col.name}
                      id={`filter-color-${col.name.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => updateFilter('color', col.hex)}
                      className={`w-6 h-6 rounded-full transition-transform flex items-center justify-center ${col.class} ${
                        isSelected ? 'ring-2 ring-sky-400 scale-110 shadow-md' : 'hover:scale-110 opacity-90'
                      }`}
                      title={col.name}
                    >
                      {isSelected && <Check className="w-3 h-3 text-white drop-shadow" />}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
