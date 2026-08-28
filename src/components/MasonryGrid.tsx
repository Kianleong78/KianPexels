import React, { useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Loader2, 
  Search, 
  ImageOff, 
  Layers, 
  ArrowDownCircle, 
  FilterX,
  ExternalLink
} from 'lucide-react';
import { MediaItem } from '../types';
import { MediaCard } from './MediaCard';
import { useVisualFlow } from '../context/VisualFlowContext';

interface MasonryGridProps {
  items: MediaItem[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onOpenDetail: (item: MediaItem) => void;
  isLive: boolean;
  totalResults: number;
}

export const MasonryGrid: React.FC<MasonryGridProps> = ({
  items,
  loading,
  hasMore,
  onLoadMore,
  onOpenDetail,
  isLive,
  totalResults
}) => {
  const { filters, resetFilters } = useVisualFlow();
  const observerTarget = useRef<HTMLDivElement>(null);

  // Infinite scrolling observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMore && !loading) {
          onLoadMore();
        }
      },
      { threshold: 0.2, rootMargin: '200px' }
    );

    const current = observerTarget.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [hasMore, loading, onLoadMore]);

  return (
    <section id="explore-gallery-section" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Gallery Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-zinc-800/60">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            {filters.section === 'curated' && <span>Curated & Favourites</span>}
            {filters.section === 'popular' && <span>Popular Visuals</span>}
            {filters.section === 'trending' && <span>Trending This Week</span>}
            {filters.section === 'discover' && <span>Discover Inspiration</span>}
            {filters.section === 'explore' && (
              <span>{filters.query ? `Results for "${filters.query}"` : 'Curated Gallery'}</span>
            )}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
            Showing {items.length} {filters.mediaType === 'videos' ? 'videos' : 'photos'}
            {isLive ? ' • Live from Pexels API' : ' • High-resolution curated collection'}
          </p>
        </div>

        {/* Status badges */}
        <div className="flex items-center gap-2">
          {filters.color && (
            <span className="px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-xs text-zinc-300 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
              <span>Color: {filters.color}</span>
            </span>
          )}
          {filters.orientation !== 'all' && (
            <span className="px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-xs text-zinc-300 capitalize">
              {filters.orientation}
            </span>
          )}
        </div>
      </div>

      {/* Empty State */}
      {items.length === 0 && !loading && (
        <div className="py-20 text-center bg-zinc-900/40 rounded-3xl border border-zinc-800/80 p-8 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center mx-auto text-zinc-400 mb-4">
            <Search className="w-8 h-8 text-zinc-500" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">No Visuals Found</h3>
          <p className="text-sm text-zinc-400 mb-6">
            We couldn't find any {filters.mediaType} matching your current search parameters. Try adjusting keywords, orientation or color tones.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-xs font-semibold shadow-md hover:brightness-110 flex items-center gap-2 mx-auto"
          >
            <FilterX className="w-4 h-4" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}

      {/* Dynamic Masonry Columns Layout */}
      {items.length > 0 && (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 w-full">
          {items.map((item) => (
            <MediaCard
              key={item.id}
              item={item}
              onOpenDetail={onOpenDetail}
            />
          ))}
        </div>
      )}

      {/* Loading Skeletons */}
      {loading && (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 w-full mt-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="mb-4 break-inside-avoid rounded-2xl bg-zinc-900/80 border border-zinc-800/60 animate-pulse overflow-hidden"
              style={{ height: `${220 + (i % 3) * 80}px` }}
            >
              <div className="w-full h-full bg-gradient-to-b from-zinc-800/40 to-zinc-900/60 flex items-end p-4">
                <div className="w-2/3 h-4 bg-zinc-800 rounded" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Infinite Scroll Sentinel & Load More Trigger */}
      {items.length > 0 && hasMore && (
        <div ref={observerTarget} className="mt-12 text-center py-6">
          <button
            id="load-more-btn"
            onClick={onLoadMore}
            disabled={loading}
            className="px-6 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-200 text-sm font-semibold shadow-lg hover:border-sky-500 transition-all flex items-center gap-2.5 mx-auto active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 text-sky-400 animate-spin" />
                <span>Loading more Pexels visuals...</span>
              </>
            ) : (
              <>
                <ArrowDownCircle className="w-4 h-4 text-sky-400" />
                <span>Load More Inspiration</span>
              </>
            )}
          </button>
        </div>
      )}

    </section>
  );
};
