import React, { useState, useRef } from 'react';
import { 
  Heart, 
  Download, 
  Bookmark, 
  ExternalLink, 
  Eye, 
  Play, 
  Maximize2, 
  Sparkles, 
  Check, 
  Copy,
  ChevronDown
} from 'lucide-react';
import { MediaItem } from '../types';
import { useVisualFlow } from '../context/VisualFlowContext';
import { CommentCount } from 'disqus-react';
import { MessageSquare } from 'lucide-react';

interface MediaCardProps {
  item: MediaItem;
  onOpenDetail: (item: MediaItem) => void;
}

export const MediaCard: React.FC<MediaCardProps> = ({ item, onOpenDetail }) => {
  const { 
    isFavorite, 
    toggleFavorite, 
    setMoodBoardSelectorItem 
  } = useVisualFlow();

  const [isHovered, setIsHovered] = useState(false);
  const [downloadMenuOpen, setDownloadMenuOpen] = useState(false);
  const [copiedColor, setCopiedColor] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const favorited = isFavorite(item.id) || isFavorite(item.numericId);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (item.type === 'videos' && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setDownloadMenuOpen(false);
    if (item.type === 'videos' && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(item);
  };

  const handleSaveToBoardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMoodBoardSelectorItem(item);
  };

  const handleCopyColor = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard && item.avgColor) {
      navigator.clipboard.writeText(item.avgColor);
      setCopiedColor(true);
      setTimeout(() => setCopiedColor(false), 1800);
    }
  };

  const handleDirectDownload = (e: React.MouseEvent, url: string, label: string) => {
    e.stopPropagation();
    setDownloadMenuOpen(false);
    const link = document.createElement('a');
    link.href = url;
    link.download = `visualflow-${item.type}-${item.numericId}-${label.toLowerCase()}.${item.type === 'videos' ? 'mp4' : 'jpg'}`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      id={`media-card-${item.id}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpenDetail(item)}
      className="group relative mb-4 break-inside-avoid rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/80 shadow-md hover:shadow-2xl hover:shadow-black/60 transition-all duration-300 cursor-pointer"
      style={{
        backgroundColor: item.avgColor ? `${item.avgColor}30` : '#18181b',
      }}
    >
      {/* Media Content: Photo Image or Video Container */}
      <div className="relative w-full overflow-hidden">
        {item.type === 'videos' ? (
          <div className="relative w-full aspect-video bg-zinc-950">
            {/* Poster Thumbnail */}
            <img
              src={item.previewUrl}
              alt={item.title}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                isHovered ? 'opacity-0' : 'opacity-100'
              }`}
            />
            {/* Video preview element */}
            {item.videoData?.videoFiles?.[0]?.link && (
              <video
                ref={videoRef}
                src={item.videoData.videoFiles[0].link}
                muted
                loop
                playsInline
                preload="none"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
              />
            )}
            {/* Video duration pill */}
            <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[11px] font-mono font-semibold text-white flex items-center gap-1 z-10">
              <Play className="w-3 h-3 fill-current text-emerald-400" />
              <span>{item.videoData?.duration || 15}s</span>
            </div>
            {/* 4K/HD badge */}
            <div className="absolute top-3 left-3 px-1.5 py-0.5 rounded bg-emerald-500/90 text-[10px] font-bold text-zinc-950 uppercase tracking-wider z-10">
              4K Footage
            </div>
          </div>
        ) : (
          <div className="relative w-full">
            <img
              src={item.previewUrl}
              alt={item.title}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
            {!imageLoaded && (
              <div 
                className="w-full aspect-[3/4] animate-pulse flex items-center justify-center text-zinc-600"
                style={{ backgroundColor: item.avgColor || '#27272a' }}
              />
            )}
          </div>
        )}

        {/* Hover Overlay with Full Suite of Requested Features */}
        <div className={`absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/30 to-zinc-950/60 p-3.5 flex flex-col justify-between transition-opacity duration-200 z-20 ${
          isHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}>
          
          {/* Top Bar: Photographer & Action Pills */}
          <div className="flex items-center justify-between gap-2">
            
            {/* Photographer Link */}
            <a
              href={item.photographer.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/70 backdrop-blur-md text-white text-xs font-medium max-w-[65%] truncate transition-colors shadow-sm"
              title={`View ${item.photographer.name} on Pexels`}
            >
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-[10px] font-bold text-white uppercase shrink-0">
                {item.photographer.name.charAt(0)}
              </div>
              <span className="truncate">{item.photographer.name}</span>
            </a>

            {/* Quick Actions: Favorite & Moodboard */}
            <div className="flex items-center gap-1.5">
              
              {/* Moodboard button */}
              <button
                id={`card-board-btn-${item.numericId}`}
                onClick={handleSaveToBoardClick}
                className="p-2 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/70 text-zinc-300 hover:text-purple-300 backdrop-blur-md shadow-sm transition-all active:scale-95"
                title="Save to Mood Board"
              >
                <Bookmark className="w-4 h-4" />
              </button>

              {/* Favourite Heart button */}
              <button
                id={`card-fav-btn-${item.numericId}`}
                onClick={handleFavoriteClick}
                className={`p-2 rounded-full border backdrop-blur-md shadow-sm transition-all active:scale-90 ${
                  favorited
                    ? 'bg-rose-500/90 border-rose-400 text-white shadow-rose-500/30'
                    : 'bg-zinc-900/90 hover:bg-zinc-800 border-zinc-700/70 text-zinc-300 hover:text-rose-400'
                }`}
                title={favorited ? 'Remove from Favourites' : 'Add to Favourites'}
              >
                <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Center Quick View Trigger */}
          <div className="flex items-center justify-center my-auto">
            <button
              onClick={() => onOpenDetail(item)}
              className="px-4 py-2 rounded-full bg-zinc-900/80 hover:bg-white hover:text-zinc-950 border border-white/20 text-white text-xs font-semibold backdrop-blur-md flex items-center gap-2 shadow-lg transform -translate-y-1 group-hover:translate-y-0 transition-all duration-300"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quick Preview</span>
            </button>
          </div>

          {/* Bottom Bar: Dimensions, Dominant Color & Download Menu */}
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-zinc-700/40">
            
            {/* Dimensions Pill, Dominant Color & Disqus Comment Count */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-2 py-0.5 rounded-md bg-black/60 border border-white/10 text-[10px] font-mono text-zinc-300">
                {item.width} × {item.height}
              </span>

              {/* Disqus Comment Count */}
              <div 
                className="px-2 py-0.5 rounded-md bg-black/60 border border-white/10 text-[10px] font-mono text-sky-300 flex items-center gap-1 hover:text-white"
                title="Disqus Comments"
              >
                <MessageSquare className="w-3 h-3 text-sky-400" />
                <CommentCount
                  shortname="home-4s75rmqfw8"
                  config={{
                    url: item.sourceUrl || `https://visualflow.app/media/${item.numericId}`,
                    identifier: String(item.numericId),
                    title: item.title,
                  }}
                >
                  Comments
                </CommentCount>
              </div>

              {/* Dominant Color Copy */}
              {item.avgColor && (
                <button
                  onClick={handleCopyColor}
                  className="p-1 rounded-md bg-black/60 border border-white/10 flex items-center gap-1 text-[10px] font-mono text-zinc-300 hover:text-white"
                  title="Click to copy HEX color"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-white/20"
                    style={{ backgroundColor: item.avgColor }}
                  />
                  <span>{copiedColor ? 'Copied!' : item.avgColor}</span>
                </button>
              )}
            </div>

            {/* View/Download Options */}
            <div className="relative">
              <div className="flex items-center rounded-lg bg-white hover:bg-zinc-100 text-zinc-950 text-xs font-bold shadow-md transition-all">
                <button
                  id={`card-download-btn-${item.numericId}`}
                  onClick={(e) => handleDirectDownload(e, item.downloadUrls.original || item.highResUrl, 'Original')}
                  className="px-2.5 py-1.5 flex items-center gap-1 border-r border-zinc-200"
                  title="Direct Download Original"
                >
                  <Download className="w-3.5 h-3.5 text-zinc-900" />
                  <span>Download</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDownloadMenuOpen(!downloadMenuOpen);
                  }}
                  className="p-1.5 hover:bg-zinc-200 rounded-r-lg"
                  title="Download resolution options"
                >
                  <ChevronDown className="w-3 h-3 text-zinc-700" />
                </button>
              </div>

              {/* Download Resolutions Dropdown */}
              {downloadMenuOpen && (
                <div 
                  onClick={(e) => e.stopPropagation()}
                  className="absolute right-0 bottom-full mb-2 w-48 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl p-1.5 z-30 space-y-1 text-xs animate-in fade-in zoom-in-95 duration-150"
                >
                  <div className="px-2 py-1 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                    Select Resolution
                  </div>
                  <button
                    onClick={(e) => handleDirectDownload(e, item.downloadUrls.original || item.highResUrl, 'Original')}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-zinc-800 text-white flex items-center justify-between"
                  >
                    <span>Original</span>
                    <span className="text-[10px] text-zinc-400 font-mono">{item.width}×{item.height}</span>
                  </button>
                  <button
                    onClick={(e) => handleDirectDownload(e, item.downloadUrls.large || item.highResUrl, 'Large')}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-zinc-800 text-zinc-200 flex items-center justify-between"
                  >
                    <span>Large (1600px)</span>
                    <span className="text-[10px] text-zinc-400 font-mono">HD</span>
                  </button>
                  <button
                    onClick={(e) => handleDirectDownload(e, item.downloadUrls.medium || item.previewUrl, 'Medium')}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-zinc-800 text-zinc-300 flex items-center justify-between"
                  >
                    <span>Medium (800px)</span>
                    <span className="text-[10px] text-zinc-400 font-mono">Web</span>
                  </button>
                  <button
                    onClick={(e) => handleDirectDownload(e, item.downloadUrls.small || item.previewUrl, 'Small')}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-zinc-800 text-zinc-300 flex items-center justify-between"
                  >
                    <span>Small (400px)</span>
                    <span className="text-[10px] text-zinc-400 font-mono">Thumb</span>
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
