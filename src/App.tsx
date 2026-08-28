import React, { useState, useEffect, useCallback } from 'react';
import { VisualFlowProvider, useVisualFlow } from './context/VisualFlowContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FilterBar } from './components/FilterBar';
import { MasonryGrid } from './components/MasonryGrid';
import { MediaDetailModal } from './components/MediaDetailModal';
import { MoodBoardModal } from './components/MoodBoardModal';
import { MoodBoardStudio } from './components/MoodBoardStudio';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { ApiKeyModal } from './components/ApiKeyModal';
import { Footer } from './components/Footer';
import { MediaItem } from './types';
import { fetchPexelsMedia } from './services/pexelsApi';

const MainApp: React.FC = () => {
  const { 
    filters, 
    updateFilter, 
    favorites, 
    selectedMedia, 
    setSelectedMedia, 
    moodBoardSelectorItem, 
    setMoodBoardSelectorItem,
    recordDiscovery 
  } = useVisualFlow();

  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  // Fetch media when filter parameters change
  const loadMedia = useCallback(async (isPageAppend = false, targetPage = 1) => {
    if (!isPageAppend) {
      setLoading(true);
    }

    try {
      // If Section is 'curated' and no search query, show user's favorites first plus curated visuals
      if (filters.section === 'curated' && !filters.query) {
        const res = await fetchPexelsMedia({ ...filters, page: targetPage });
        const merged = targetPage === 1 ? [...favorites, ...res.items.filter(i => !favorites.some(f => f.id === i.id))] : res.items;
        
        if (isPageAppend) {
          setItems(prev => [...prev, ...merged]);
        } else {
          setItems(merged);
        }
        setIsLive(res.isLive);
        setTotalResults(res.totalResults);
        setHasMore(res.items.length > 0);
        recordDiscovery(merged.length, merged, filters.query);
        setLoading(false);
        return;
      }

      const res = await fetchPexelsMedia({ ...filters, page: targetPage });

      if (isPageAppend) {
        setItems(prev => [...prev, ...res.items]);
      } else {
        setItems(res.items);
      }

      setIsLive(res.isLive);
      setTotalResults(res.totalResults);
      setHasMore(res.items.length > 0);
      recordDiscovery(res.items.length, res.items, filters.query);
    } catch (err) {
      console.warn('Error loading media:', err);
    } finally {
      setLoading(false);
    }
  }, [filters, favorites, recordDiscovery]);

  useEffect(() => {
    loadMedia(false, 1);
  }, [
    filters.query,
    filters.category,
    filters.mediaType,
    filters.orientation,
    filters.size,
    filters.color,
    filters.section,
    loadMedia
  ]);

  const handleLoadMore = () => {
    const nextPage = filters.page + 1;
    updateFilter('page', nextPage);
    loadMedia(true, nextPage);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-sky-500 selection:text-white font-sans antialiased">
      
      {/* Top Navigation */}
      <Navbar />

      {/* Hero Header on Explore/Curated/Trending/Discover views */}
      {filters.section !== 'moodboards' && filters.section !== 'analytics' && (
        <Hero />
      )}

      {/* Sticky Interactive Filter Bar */}
      <FilterBar />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {filters.section === 'moodboards' ? (
          <MoodBoardStudio />
        ) : filters.section === 'analytics' ? (
          <AnalyticsDashboard />
        ) : (
          <MasonryGrid
            items={items}
            loading={loading}
            hasMore={hasMore}
            onLoadMore={handleLoadMore}
            onOpenDetail={(item) => setSelectedMedia(item)}
            isLive={isLive}
            totalResults={totalResults}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Media Detail Full Modal */}
      {selectedMedia && (
        <MediaDetailModal
          item={selectedMedia}
          onClose={() => setSelectedMedia(null)}
          onSelectRelated={(related) => setSelectedMedia(related)}
        />
      )}

      {/* Add to Mood Board Modal */}
      {moodBoardSelectorItem && (
        <MoodBoardModal
          item={moodBoardSelectorItem}
          onClose={() => setMoodBoardSelectorItem(null)}
        />
      )}

      {/* Pexels API Key & Connectivity Modal */}
      <ApiKeyModal />

    </div>
  );
};

export default function App() {
  return (
    <VisualFlowProvider>
      <MainApp />
    </VisualFlowProvider>
  );
}
