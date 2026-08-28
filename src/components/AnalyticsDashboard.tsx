import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Sparkles, 
  Heart, 
  FolderHeart, 
  Eye, 
  Palette, 
  ArrowUpRight, 
  Search, 
  Compass, 
  Layers
} from 'lucide-react';
import { useVisualFlow } from '../context/VisualFlowContext';
import { SEARCH_TRENDS, CATEGORIES } from '../data/curatedData';

export const AnalyticsDashboard: React.FC = () => {
  const { analytics, favorites, moodboards, updateFilter } = useVisualFlow();

  const totalBoardItems = moodboards.reduce((acc, b) => acc + b.items.length, 0);

  const handleSearchTrend = (query: string) => {
    updateFilter('query', query);
    updateFilter('section', 'explore');
    updateFilter('category', 'all');
  };

  const handleCategorySelect = (catId: string, query: string) => {
    updateFilter('category', catId);
    updateFilter('query', query);
    updateFilter('section', 'explore');
  };

  return (
    <section id="analytics-dashboard-section" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="pb-4 border-b border-zinc-800/80">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
          <BarChart3 className="w-7 h-7 text-teal-400" />
          <span>Visual Trends & Discovery Telemetry</span>
        </h2>
        <p className="text-sm text-zinc-400 mt-1">
          Real-time insights into visual search patterns, color temperature metrics, and community engagement.
        </p>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Total Discovered */}
        <div className="p-5 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 relative overflow-hidden">
          <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center mb-3">
            <Eye className="w-4 h-4" />
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono block">
            {analytics.discoveredCount.toLocaleString()}
          </span>
          <span className="text-xs text-zinc-400 font-medium">Visuals Discovered</span>
          <div className="absolute right-3 bottom-3 text-sky-500/10 pointer-events-none">
            <Sparkles className="w-16 h-16" />
          </div>
        </div>

        {/* Saved in Favorites */}
        <div className="p-5 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 relative overflow-hidden">
          <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-3">
            <Heart className="w-4 h-4" />
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono block">
            {favorites.length}
          </span>
          <span className="text-xs text-zinc-400 font-medium">Saved to Favourites</span>
        </div>

        {/* Active Moodboards */}
        <div className="p-5 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 relative overflow-hidden">
          <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3">
            <FolderHeart className="w-4 h-4" />
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono block">
            {moodboards.length}
          </span>
          <span className="text-xs text-zinc-400 font-medium">Mood Boards Created</span>
        </div>

        {/* Moodboard Items */}
        <div className="p-5 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 relative overflow-hidden">
          <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center mb-3">
            <Layers className="w-4 h-4" />
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono block">
            {totalBoardItems}
          </span>
          <span className="text-xs text-zinc-400 font-medium">Total Visuals Curated</span>
        </div>

      </div>

      {/* Two Column Layout: Search Trends & Color Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Real-time Search Trends Cloud */}
        <div className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800/80 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span>Surging Visual Search Topics</span>
            </h3>
            <span className="text-[11px] text-zinc-500 font-mono">Pexels Weekly Index</span>
          </div>

          <div className="space-y-2.5">
            {SEARCH_TRENDS.map((trend, i) => (
              <div
                key={i}
                onClick={() => handleSearchTrend(trend.query)}
                className="p-3 rounded-2xl bg-zinc-950/60 border border-zinc-800/60 hover:border-sky-500/50 hover:bg-zinc-900/60 transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-zinc-500">0{i + 1}</span>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors">
                      {trend.query}
                    </h4>
                    <span className="text-[10px] text-zinc-400">{trend.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono text-zinc-400">{trend.count.toLocaleString()} searches</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                    {trend.growth}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-sky-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Color Spectrum Breakdown */}
        <div className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800/80 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Palette className="w-4 h-4 text-sky-400" />
                <span>Dominant Color Hue Telemetry</span>
              </h3>
              <span className="text-[11px] text-zinc-500 font-mono">Live Extraction</span>
            </div>

            <p className="text-xs text-zinc-400 mb-4">
              Distribution of primary color temperatures detected across currently rendered and indexed media items.
            </p>

            {/* Visual Color Bars */}
            <div className="space-y-3">
              {Object.entries(analytics.colorDistribution).slice(0, 6).map(([color, val], i) => {
                const percentage = Math.min(100, Math.round((val / 80) * 100));
                return (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: color }} />
                        <span className="text-zinc-300">{color}</span>
                      </div>
                      <span className="text-zinc-400">{percentage}% frequency</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-zinc-950 overflow-hidden border border-zinc-800">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: color
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Filter by Category Action List */}
          <div className="pt-4 border-t border-zinc-850">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">
              Popular Category Channels
            </span>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.slice(1, 8).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id, cat.query)}
                  className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-zinc-600 text-zinc-300 text-xs font-medium transition-colors"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
