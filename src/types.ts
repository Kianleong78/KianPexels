export interface PexelsPhotoSrc {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
}

export interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: PexelsPhotoSrc;
  liked: boolean;
  alt: string;
}

export interface PexelsVideoFile {
  id: number;
  quality: 'hd' | 'sd' | 'uhd';
  file_type: string;
  width: number;
  height: number;
  fps: number;
  link: string;
}

export interface PexelsVideoPicture {
  id: number;
  picture: string;
  nr: number;
}

export interface PexelsVideo {
  id: number;
  width: number;
  height: number;
  url: string;
  image: string;
  duration: number;
  user: {
    id: number;
    name: string;
    url: string;
  };
  video_files: PexelsVideoFile[];
  video_pictures: PexelsVideoPicture[];
  avg_color?: string;
  alt?: string;
}

export type MediaType = 'photos' | 'videos';
export type OrientationFilter = 'all' | 'landscape' | 'portrait' | 'square';
export type SizeFilter = 'all' | 'small' | 'medium' | 'large';
export type SectionTab = 'explore' | 'curated' | 'popular' | 'trending' | 'discover' | 'moodboards' | 'analytics';

export interface MediaItem {
  id: string; // e.g. "photo-1234" or "video-5678"
  numericId: number;
  type: MediaType;
  title: string;
  description?: string;
  width: number;
  height: number;
  aspectRatio: number;
  avgColor: string;
  colorPalette: string[];
  photographer: {
    name: string;
    url: string;
    id: number;
  };
  previewUrl: string;
  highResUrl: string;
  downloadUrls: {
    original: string;
    large: string;
    medium: string;
    small: string;
  };
  videoData?: {
    duration: number;
    videoFiles: PexelsVideoFile[];
    thumbnailUrl: string;
  };
  sourceUrl: string;
  tags: string[];
  views?: number;
  likes?: number;
  createdAt?: string;
}

export interface FilterOptions {
  query: string;
  category: string;
  mediaType: MediaType;
  orientation: OrientationFilter;
  size: SizeFilter;
  color: string;
  section: SectionTab;
  page: number;
  perPage: number;
}

export interface MoodBoard {
  id: string;
  title: string;
  description: string;
  coverImage?: string;
  colorPalette: string[];
  items: MediaItem[];
  createdAt: number;
  updatedAt: number;
}

export interface SearchTrend {
  query: string;
  count: number;
  category: string;
  growth: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  iconName: string;
  query: string;
  featuredImg: string;
  color: string;
}
