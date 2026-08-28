import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { MediaItem, MoodBoard, FilterOptions, SectionTab, MediaType, OrientationFilter, SizeFilter } from '../types';
import { INITIAL_MOODBOARDS, SEARCH_TRENDS } from '../data/curatedData';
import { checkApiStatus, setStoredPexelsKey, getStoredPexelsKey } from '../services/pexelsApi';

interface AnalyticsData {
  discoveredCount: number;
  searchHistory: { query: string; timestamp: number }[];
  colorDistribution: Record<string, number>;
  categoryHits: Record<string, number>;
}

interface VisualFlowContextType {
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  updateFilter: <K extends keyof FilterOptions>(key: K, value: FilterOptions[K]) => void;
  resetFilters: () => void;
  
  // Favorites
  favorites: MediaItem[];
  toggleFavorite: (item: MediaItem) => boolean;
  isFavorite: (id: string | number) => boolean;
  clearFavorites: () => void;

  // Moodboards
  moodboards: MoodBoard[];
  createMoodBoard: (title: string, description: string, initialItem?: MediaItem) => MoodBoard;
  deleteMoodBoard: (id: string) => void;
  addToMoodBoard: (boardId: string, item: MediaItem) => void;
  removeFromMoodBoard: (boardId: string, itemId: string) => void;

  // Modals & Active states
  selectedMedia: MediaItem | null;
  setSelectedMedia: (item: MediaItem | null) => void;
  moodBoardSelectorItem: MediaItem | null;
  setMoodBoardSelectorItem: (item: MediaItem | null) => void;
  isApiKeyModalOpen: boolean;
  setIsApiKeyModalOpen: (open: boolean) => void;

  // API Status & Key
  apiStatus: { hasKey: boolean; keyMasked: string; status: string; message: string };
  refreshApiStatus: () => Promise<void>;
  saveCustomApiKey: (key: string) => Promise<boolean>;

  // Analytics
  analytics: AnalyticsData;
  recordDiscovery: (count: number, items: MediaItem[], query?: string) => void;
}

const DEFAULT_FILTERS: FilterOptions = {
  query: '',
  category: 'all',
  mediaType: 'photos',
  orientation: 'all',
  size: 'all',
  color: '',
  section: 'explore',
  page: 1,
  perPage: 24,
};

const VisualFlowContext = createContext<VisualFlowContextType | undefined>(undefined);

const FAVORITES_STORAGE = 'visualflow_favorites_v2';
const MOODBOARDS_STORAGE = 'visualflow_moodboards_v2';
const ANALYTICS_STORAGE = 'visualflow_analytics_v2';

export const VisualFlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<FilterOptions>(DEFAULT_FILTERS);
  const [favorites, setFavorites] = useState<MediaItem[]>([]);
  const [moodboards, setMoodboards] = useState<MoodBoard[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [moodBoardSelectorItem, setMoodBoardSelectorItem] = useState<MediaItem | null>(null);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [apiStatus, setApiStatus] = useState<{ hasKey: boolean; keyMasked: string; status: string; message: string }>({
    hasKey: false,
    keyMasked: '',
    status: 'unconfigured_fallback_active',
    message: 'Checking...'
  });

  const [analytics, setAnalytics] = useState<AnalyticsData>({
    discoveredCount: 1420,
    searchHistory: SEARCH_TRENDS.slice(0, 5).map(s => ({ query: s.query, timestamp: Date.now() - Math.random() * 86400000 })),
    colorDistribution: {
      '#1e293b': 24,
      '#0891b2': 18,
      '#10b981': 15,
      '#f59e0b': 12,
      '#ec4899': 10,
      '#8b5cf6': 9,
    },
    categoryHits: {
      'Nature & Landscapes': 45,
      'Technology & Cyber': 38,
      'Architecture & Design': 30,
      'Travel & Adventure': 28,
      'Food & Culinary': 22,
      'People & Portraits': 19,
    }
  });

  // Load from local storage
  useEffect(() => {
    try {
      const storedFavs = localStorage.getItem(FAVORITES_STORAGE);
      if (storedFavs) {
        setFavorites(JSON.parse(storedFavs));
      }
      const storedBoards = localStorage.getItem(MOODBOARDS_STORAGE);
      if (storedBoards) {
        setMoodboards(JSON.parse(storedBoards));
      } else {
        const initial = Object.values(INITIAL_MOODBOARDS);
        setMoodboards(initial);
        localStorage.setItem(MOODBOARDS_STORAGE, JSON.stringify(initial));
      }
      const storedAnalytics = localStorage.getItem(ANALYTICS_STORAGE);
      if (storedAnalytics) {
        setAnalytics(JSON.parse(storedAnalytics));
      }
    } catch (e) {
      console.warn('Error loading localStorage state:', e);
    }
    refreshApiStatus();
  }, []);

  const refreshApiStatus = useCallback(async () => {
    const status = await checkApiStatus();
    setApiStatus(status);
  }, []);

  const saveCustomApiKey = useCallback(async (key: string): Promise<boolean> => {
    setStoredPexelsKey(key);
    try {
      await fetch('/api/pexels/set-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: key })
      });
    } catch (e) {
      console.warn(e);
    }
    await refreshApiStatus();
    return true;
  }, [refreshApiStatus]);

  const updateFilter = useCallback(<K extends keyof FilterOptions>(key: K, value: FilterOptions[K]) => {
    setFilters(prev => {
      const next = { ...prev, [key]: value };
      if (key !== 'page') {
        next.page = 1; // reset page when filters change
      }
      return next;
    });
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  // Favorites management
  const toggleFavorite = useCallback((item: MediaItem): boolean => {
    let isNowFavorited = false;
    setFavorites(prev => {
      const exists = prev.some(f => f.id === item.id || f.numericId === item.numericId);
      let updated: MediaItem[];
      if (exists) {
        updated = prev.filter(f => f.id !== item.id && f.numericId !== item.numericId);
        isNowFavorited = false;
      } else {
        updated = [item, ...prev];
        isNowFavorited = true;
      }
      localStorage.setItem(FAVORITES_STORAGE, JSON.stringify(updated));
      return updated;
    });
    return isNowFavorited;
  }, []);

  const isFavorite = useCallback((id: string | number): boolean => {
    return favorites.some(f => f.id === id || f.numericId === id);
  }, [favorites]);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
    localStorage.removeItem(FAVORITES_STORAGE);
  }, []);

  // Moodboards management
  const createMoodBoard = useCallback((title: string, description: string, initialItem?: MediaItem): MoodBoard => {
    const newBoard: MoodBoard = {
      id: `board-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      title: title.trim() || 'Untitled Mood Board',
      description: description.trim() || 'Curated aesthetic collection in VisualFlow.',
      coverImage: initialItem?.previewUrl || 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=800',
      colorPalette: initialItem?.colorPalette || ['#1e293b', '#6366f1', '#14b8a6', '#f59e0b'],
      items: initialItem ? [initialItem] : [],
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    setMoodboards(prev => {
      const updated = [newBoard, ...prev];
      localStorage.setItem(MOODBOARDS_STORAGE, JSON.stringify(updated));
      return updated;
    });

    return newBoard;
  }, []);

  const deleteMoodBoard = useCallback((id: string) => {
    setMoodboards(prev => {
      const updated = prev.filter(b => b.id !== id);
      localStorage.setItem(MOODBOARDS_STORAGE, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const addToMoodBoard = useCallback((boardId: string, item: MediaItem) => {
    setMoodboards(prev => {
      const updated = prev.map(board => {
        if (board.id === boardId) {
          const exists = board.items.some(i => i.id === item.id || i.numericId === item.numericId);
          if (exists) return board;
          
          const newItems = [item, ...board.items];
          // Collect aggregated colors
          const aggregatedColors = Array.from(new Set([...board.colorPalette, ...item.colorPalette])).slice(0, 8);

          return {
            ...board,
            items: newItems,
            coverImage: newItems[0]?.previewUrl || board.coverImage,
            colorPalette: aggregatedColors,
            updatedAt: Date.now()
          };
        }
        return board;
      });
      localStorage.setItem(MOODBOARDS_STORAGE, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeFromMoodBoard = useCallback((boardId: string, itemId: string) => {
    setMoodboards(prev => {
      const updated = prev.map(board => {
        if (board.id === boardId) {
          const newItems = board.items.filter(i => i.id !== itemId);
          return {
            ...board,
            items: newItems,
            coverImage: newItems[0]?.previewUrl || board.coverImage,
            updatedAt: Date.now()
          };
        }
        return board;
      });
      localStorage.setItem(MOODBOARDS_STORAGE, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Analytics tracking
  const recordDiscovery = useCallback((count: number, items: MediaItem[], query?: string) => {
    setAnalytics(prev => {
      const updatedDiscovery = prev.discoveredCount + count;
      const updatedHistory = query && query.trim().length > 1
        ? [{ query: query.trim(), timestamp: Date.now() }, ...prev.searchHistory.filter(h => h.query.toLowerCase() !== query.toLowerCase()).slice(0, 19)]
        : prev.searchHistory;

      const newColors = { ...prev.colorDistribution };
      items.forEach(item => {
        if (item.avgColor) {
          newColors[item.avgColor] = (newColors[item.avgColor] || 0) + 1;
        }
      });

      const updated = {
        ...prev,
        discoveredCount: updatedDiscovery,
        searchHistory: updatedHistory,
        colorDistribution: newColors
      };

      try {
        localStorage.setItem(ANALYTICS_STORAGE, JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
  }, []);

  return (
    <VisualFlowContext.Provider
      value={{
        filters,
        setFilters,
        updateFilter,
        resetFilters,
        favorites,
        toggleFavorite,
        isFavorite,
        clearFavorites,
        moodboards,
        createMoodBoard,
        deleteMoodBoard,
        addToMoodBoard,
        removeFromMoodBoard,
        selectedMedia,
        setSelectedMedia,
        moodBoardSelectorItem,
        setMoodBoardSelectorItem,
        isApiKeyModalOpen,
        setIsApiKeyModalOpen,
        apiStatus,
        refreshApiStatus,
        saveCustomApiKey,
        analytics,
        recordDiscovery
      }}
    >
      {children}
    </VisualFlowContext.Provider>
  );
};

export const useVisualFlow = (): VisualFlowContextType => {
  const context = useContext(VisualFlowContext);
  if (!context) {
    throw new Error('useVisualFlow must be used within a VisualFlowProvider');
  }
  return context;
};
