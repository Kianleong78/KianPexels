import { FilterOptions, MediaItem, PexelsPhoto, PexelsVideo, MediaType } from '../types';
import { SEED_MEDIA_ITEMS } from '../data/curatedData';

const CUSTOM_KEY_STORAGE = 'visualflow_custom_pexels_key';

export function getStoredPexelsKey(): string {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(CUSTOM_KEY_STORAGE);
    if (stored !== null && stored !== undefined) return stored;
    return 'qxnOrKjHBf8dGB042C2BjFsK3xJHQJ4zvNca0JdLRMNwvJY2dZChqMdl';
  }
  return 'qxnOrKjHBf8dGB042C2BjFsK3xJHQJ4zvNca0JdLRMNwvJY2dZChqMdl';
}

export function setStoredPexelsKey(key: string): void {
  if (typeof window !== 'undefined') {
    if (key) {
      localStorage.setItem(CUSTOM_KEY_STORAGE, key.trim());
    } else {
      localStorage.removeItem(CUSTOM_KEY_STORAGE);
    }
  }
}

// Generate pleasing secondary palette colors from base hex
function generateColorPalette(avgColor: string = '#475569'): string[] {
  try {
    const base = avgColor.startsWith('#') ? avgColor : `#${avgColor}`;
    // Simple color variation math
    const num = parseInt(base.replace('#', ''), 16);
    if (isNaN(num)) return ['#1e293b', '#334155', '#64748b', '#94a3b8', '#cbd5e1', '#0f172a'];
    
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;

    const rgbToHex = (cr: number, cg: number, cb: number) => {
      const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
      return `#${((1 << 24) + (clamp(cr) << 16) + (clamp(cg) << 8) + clamp(cb)).toString(16).slice(1)}`;
    };

    return [
      base,
      rgbToHex(r * 0.4, g * 0.4, b * 0.4),
      rgbToHex(r * 0.7, g * 0.7, b * 0.7),
      rgbToHex(r + (255 - r) * 0.3, g + (255 - g) * 0.3, b + (255 - b) * 0.3),
      rgbToHex(r + (255 - r) * 0.6, g + (255 - g) * 0.6, b + (255 - b) * 0.6),
      rgbToHex(b, r, g)
    ];
  } catch {
    return ['#0f172a', '#1e293b', '#3b82f6', '#64748b', '#94a3b8', '#e2e8f0'];
  }
}

export function transformPexelsPhoto(photo: PexelsPhoto): MediaItem {
  const width = photo.width || 4000;
  const height = photo.height || 3000;
  const aspectRatio = width / (height || 1);
  const avgColor = photo.avg_color || '#475569';

  return {
    id: `photo-${photo.id}`,
    numericId: photo.id,
    type: 'photos',
    title: photo.alt ? photo.alt.charAt(0).toUpperCase() + photo.alt.slice(1) : `Visual by ${photo.photographer}`,
    description: photo.alt || `Stunning high-resolution photography captured by ${photo.photographer}.`,
    width,
    height,
    aspectRatio,
    avgColor,
    colorPalette: generateColorPalette(avgColor),
    photographer: {
      name: photo.photographer || 'Pexels Creator',
      url: photo.photographer_url || 'https://www.pexels.com',
      id: photo.photographer_id || photo.id
    },
    previewUrl: photo.src?.large || photo.src?.medium || photo.src?.original,
    highResUrl: photo.src?.large2x || photo.src?.original,
    downloadUrls: {
      original: photo.src?.original,
      large: photo.src?.large2x || photo.src?.large,
      medium: photo.src?.medium,
      small: photo.src?.small,
    },
    sourceUrl: photo.url || `https://www.pexels.com/photo/${photo.id}/`,
    tags: (photo.alt || 'photo,pexels,visual').toLowerCase().split(/[\s,]+/).filter(t => t.length > 2).slice(0, 8),
    views: Math.floor(15000 + (photo.id % 85000)),
    likes: Math.floor(1200 + (photo.id % 7800)),
    createdAt: 'Recent'
  };
}

export function transformPexelsVideo(video: PexelsVideo): MediaItem {
  const width = video.width || 1920;
  const height = video.height || 1080;
  const aspectRatio = width / (height || 1);
  const bestFile = video.video_files?.find(f => f.quality === 'hd' || f.quality === 'uhd') || video.video_files?.[0];
  const origFile = video.video_files?.find(f => f.quality === 'uhd') || bestFile;
  const previewPic = video.image || video.video_pictures?.[0]?.picture || '';
  const avgColor = video.avg_color || '#1e293b';

  return {
    id: `video-${video.id}`,
    numericId: video.id,
    type: 'videos',
    title: video.alt || `Cinematic Footage by ${video.user?.name || 'Creator'}`,
    description: `Dynamic 4K/HD video clip with ${video.duration || 15}s duration.`,
    width,
    height,
    aspectRatio,
    avgColor,
    colorPalette: generateColorPalette(avgColor),
    photographer: {
      name: video.user?.name || 'Pexels Filmmaker',
      url: video.user?.url || 'https://www.pexels.com',
      id: video.user?.id || video.id
    },
    previewUrl: previewPic,
    highResUrl: previewPic,
    downloadUrls: {
      original: origFile?.link || bestFile?.link || '',
      large: bestFile?.link || '',
      medium: bestFile?.link || '',
      small: bestFile?.link || '',
    },
    videoData: {
      duration: video.duration || 15,
      videoFiles: video.video_files || [],
      thumbnailUrl: previewPic
    },
    sourceUrl: video.url || `https://www.pexels.com/video/${video.id}/`,
    tags: ['cinematic', 'video', 'footage', '4k', 'motion'],
    views: Math.floor(25000 + (video.id % 95000)),
    likes: Math.floor(2400 + (video.id % 8900)),
    createdAt: 'Recent'
  };
}

export interface FetchResult {
  items: MediaItem[];
  page: number;
  perPage: number;
  totalResults: number;
  isLive: boolean;
  source: string;
}

export async function fetchPexelsMedia(options: FilterOptions): Promise<FetchResult> {
  const { query, category, mediaType, orientation, size, color, section, page, perPage } = options;
  const storedKey = getStoredPexelsKey();

  // Combine query and category if both or either are present
  let effectiveQuery = query.trim();
  if (!effectiveQuery && category && category !== 'all') {
    effectiveQuery = category;
  }

  // If Section is 'discover' or 'trending' and no query was given, inject an engaging discovery search
  if (!effectiveQuery && section === 'trending') {
    effectiveQuery = 'trending aesthetic cinematic';
  } else if (!effectiveQuery && section === 'discover') {
    effectiveQuery = 'surreal drone abstract landscape';
  } else if (!effectiveQuery && section === 'popular') {
    effectiveQuery = 'popular wallpaper 4k';
  }

  const headers: HeadersInit = {};
  if (storedKey) {
    headers['x-pexels-api-key'] = storedKey;
  }

  try {
    if (mediaType === 'videos') {
      let endpoint = '';
      const params = new URLSearchParams();
      params.append('page', String(page));
      params.append('per_page', String(perPage));

      if (effectiveQuery) {
        endpoint = `/api/pexels/videos/search`;
        params.append('query', effectiveQuery);
        if (orientation && orientation !== 'all') params.append('orientation', orientation);
        if (size && size !== 'all') params.append('size', size);
      } else {
        endpoint = `/api/pexels/videos/popular`;
      }

      let res = await fetch(`${endpoint}?${params.toString()}`, { headers }).catch(() => null);
      
      // If /api proxy is not available (e.g. static host) and user provided key, try direct Pexels API
      if ((!res || !res.ok) && storedKey) {
        const directUrl = effectiveQuery 
          ? `https://api.pexels.com/videos/search?${params.toString()}`
          : `https://api.pexels.com/videos/popular?${params.toString()}`;
        res = await fetch(directUrl, {
          headers: { 'Authorization': storedKey }
        }).catch(() => null);
      }

      if (res && res.ok) {
        const data = await res.json();
        if (data.videos && Array.isArray(data.videos) && data.videos.length > 0) {
          const items = data.videos.map(transformPexelsVideo);
          return {
            items,
            page: data.page || page,
            perPage: data.per_page || perPage,
            totalResults: data.total_results || 100,
            isLive: true,
            source: 'pexels_live_videos'
          };
        }
      }
    } else {
      // Photos
      let endpoint = '';
      const params = new URLSearchParams();
      params.append('page', String(page));
      params.append('per_page', String(perPage));

      if (effectiveQuery) {
        endpoint = `/api/pexels/search`;
        params.append('query', effectiveQuery);
        if (orientation && orientation !== 'all') params.append('orientation', orientation);
        if (size && size !== 'all') params.append('size', size);
        if (color && color !== 'all') params.append('color', color);
      } else {
        endpoint = `/api/pexels/curated`;
      }

      let res = await fetch(`${endpoint}?${params.toString()}`, { headers }).catch(() => null);

      // If /api proxy is not available (e.g. static host) and user provided key, try direct Pexels API
      if ((!res || !res.ok) && storedKey) {
        const directUrl = effectiveQuery 
          ? `https://api.pexels.com/v1/search?${params.toString()}`
          : `https://api.pexels.com/v1/curated?${params.toString()}`;
        res = await fetch(directUrl, {
          headers: { 'Authorization': storedKey }
        }).catch(() => null);
      }

      if (res && res.ok) {
        const data = await res.json();
        if (data.photos && Array.isArray(data.photos) && data.photos.length > 0) {
          const items = data.photos.map(transformPexelsPhoto);
          return {
            items,
            page: data.page || page,
            perPage: data.per_page || perPage,
            totalResults: data.total_results || 500,
            isLive: true,
            source: 'pexels_live_photos'
          };
        }
      }
    }
  } catch (err) {
    console.warn('Live Pexels fetch encountered fallback trigger:', err);
  }

  // Graceful curated fallback
  let filtered = [...SEED_MEDIA_ITEMS];

  // Filter media type
  if (mediaType === 'videos') {
    filtered = filtered.filter(item => item.type === 'videos');
  } else {
    filtered = filtered.filter(item => item.type === 'photos');
  }

  // Filter query or category
  if (effectiveQuery) {
    const qLower = effectiveQuery.toLowerCase();
    const matches = filtered.filter(item => 
      item.title.toLowerCase().includes(qLower) ||
      item.tags.some(t => t.includes(qLower) || qLower.includes(t)) ||
      item.photographer.name.toLowerCase().includes(qLower)
    );
    if (matches.length > 0) {
      filtered = matches;
    }
  }

  // Filter orientation
  if (orientation && orientation !== 'all') {
    if (orientation === 'landscape') {
      filtered = filtered.filter(i => i.aspectRatio > 1.1);
    } else if (orientation === 'portrait') {
      filtered = filtered.filter(i => i.aspectRatio < 0.9);
    } else if (orientation === 'square') {
      filtered = filtered.filter(i => i.aspectRatio >= 0.9 && i.aspectRatio <= 1.1);
    }
  }

  // Mock pagination for seed
  const startIndex = (page - 1) * perPage;
  const pageItems = filtered.slice(startIndex, startIndex + perPage);

  // If page exceeds seed, loop through seed items with unique IDs to allow smooth infinite scrolling
  const finalItems = pageItems.length > 0 ? pageItems : filtered.map((item, idx) => ({
    ...item,
    id: `${item.id}-p${page}-${idx}`,
    numericId: item.numericId + page * 1000 + idx
  }));

  return {
    items: finalItems,
    page,
    perPage,
    totalResults: Math.max(filtered.length * 5, 60),
    isLive: false,
    source: 'curated_seed'
  };
}

export async function fetchRelatedMedia(targetItem: MediaItem, mediaType: MediaType = 'photos'): Promise<MediaItem[]> {
  const query = targetItem.tags[0] || targetItem.title.split(' ')[0] || 'visual';
  try {
    const res = await fetchPexelsMedia({
      query,
      category: '',
      mediaType,
      orientation: 'all',
      size: 'all',
      color: '',
      section: 'explore',
      page: 1,
      perPage: 8
    });
    return res.items.filter(i => i.id !== targetItem.id).slice(0, 6);
  } catch {
    return SEED_MEDIA_ITEMS.filter(i => i.id !== targetItem.id).slice(0, 6);
  }
}

export async function checkApiStatus(): Promise<{ hasKey: boolean; keyMasked: string; status: string; message: string }> {
  try {
    const storedKey = getStoredPexelsKey();
    const headers: HeadersInit = {};
    if (storedKey) headers['x-pexels-api-key'] = storedKey;

    const res = await fetch('/api/pexels/status', { headers });
    if (res.ok) {
      const data = await res.json();
      if (storedKey && storedKey.length > 5) {
        return {
          hasKey: true,
          keyMasked: `${storedKey.substring(0, 4)}...${storedKey.substring(storedKey.length - 4)}`,
          status: 'connected',
          message: 'Active Pexels Key Configured (Client override)'
        };
      }
      return data;
    }
  } catch (e) {
    console.error(e);
  }
  return {
    hasKey: false,
    keyMasked: '',
    status: 'unconfigured_fallback_active',
    message: 'Curated High-Resolution Mode'
  };
}
