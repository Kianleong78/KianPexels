import React, { useState, useEffect } from 'react';
import { 
  X, 
  Heart, 
  Bookmark, 
  Download, 
  ExternalLink, 
  Share2, 
  Copy, 
  Check, 
  Palette, 
  Info, 
  Sparkles, 
  Play, 
  Maximize2,
  Calendar,
  Layers,
  ChevronDown
} from 'lucide-react';
import { MediaItem } from '../types';
import { useVisualFlow } from '../context/VisualFlowContext';
import { fetchRelatedMedia } from '../services/pexelsApi';
import { CommentCount, DiscussionEmbed } from 'disqus-react';
import { MessageSquare, MessageCircle } from 'lucide-react';

interface MediaDetailModalProps {
  item: MediaItem | null;
  onClose: () => void;
  onSelectRelated: (item: MediaItem) => void;
}

export const MediaDetailModal: React.FC<MediaDetailModalProps> = ({
  item,
  onClose,
  onSelectRelated,
}) => {
  const { 
    isFavorite, 
    toggleFavorite, 
    setMoodBoardSelectorItem 
  } = useVisualFlow();

  const [relatedItems, setRelatedItems] = useState<MediaItem[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(false);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [downloadMenuOpen, setDownloadMenuOpen] = useState(false);

  useEffect(() => {
    if (item) {
      setLoadingRelated(true);
      fetchRelatedMedia(item, item.type).then((res) => {
        setRelatedItems(res);
        setLoadingRelated(false);
      });
    }
  }, [item]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const favorited = isFavorite(item.id) || isFavorite(item.numericId);

  const handleCopyColor = (hex: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(hex);
      setCopiedHex(hex);
      setTimeout(() => setCopiedHex(null), 1800);
    }
  };

  const handleShareLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(item.sourceUrl || window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleDirectDownload = (url: string, label: string) => {
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
      id="media-detail-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/80 bg-zinc-900/60">
          
          {/* Photographer Profile */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-600 flex items-center justify-center font-bold text-white shadow-md">
              {item.photographer.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <a
                  href={item.photographer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-white hover:text-sky-300 transition-colors flex items-center gap-1"
                >
                  <span>{item.photographer.name}</span>
                  <ExternalLink className="w-3 h-3 text-zinc-400" />
                </a>
              </div>
              <p className="text-xs text-zinc-400">Verified Pexels Contributor</p>
            </div>
          </div>

          {/* Actions & Close Button */}
          <div className="flex items-center gap-2">
            
            {/* Save to Moodboard */}
            <button
              onClick={() => setMoodBoardSelectorItem(item)}
              className="px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 text-zinc-300 hover:text-purple-300 text-xs font-medium flex items-center gap-1.5 transition-all"
            >
              <Bookmark className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden sm:inline">Add to Board</span>
            </button>

            {/* Favorite Heart */}
            <button
              onClick={() => toggleFavorite(item)}
              className={`p-2 rounded-full border transition-all ${
                favorited
                  ? 'bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/20'
                  : 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-rose-400 hover:bg-zinc-800'
              }`}
              title="Save to Favourites"
            >
              <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
            </button>

            {/* Share */}
            <button
              onClick={handleShareLink}
              className="p-2 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
              title="Share Link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Close */}
            <button
              id="modal-close-btn"
              onClick={onClose}
              className="p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Main Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
          
          {/* Main Visual Display */}
          <div className="w-full flex items-center justify-center bg-zinc-900/50 rounded-2xl p-2 border border-zinc-850">
            {item.type === 'videos' ? (
              <div className="w-full aspect-video rounded-xl overflow-hidden bg-black shadow-2xl">
                <video
                  src={item.videoData?.videoFiles?.[0]?.link || item.downloadUrls.original}
                  controls
                  autoPlay
                  loop
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="max-h-[60vh] flex items-center justify-center">
                <img
                  src={item.highResUrl || item.previewUrl}
                  alt={item.title}
                  className="max-h-[58vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
                />
              </div>
            )}
          </div>

          {/* Details & Palette Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-zinc-900/60 rounded-2xl p-5 border border-zinc-800/80">
            
            {/* Visual Info & Title */}
            <div className="md:col-span-2 space-y-3">
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{item.description}</p>
              
              {/* Tags Cloud */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {item.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-400 font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Specs & Download Dropdown */}
            <div className="space-y-4 md:border-l md:border-zinc-800 md:pl-6 flex flex-col justify-between">
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Resolution</span>
                  <span className="text-white font-mono">{item.width} × {item.height}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Type</span>
                  <span className="text-white capitalize">{item.type}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Orientation</span>
                  <span className="text-white capitalize">
                    {item.aspectRatio > 1.1 ? 'Landscape' : item.aspectRatio < 0.9 ? 'Portrait' : 'Square'}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Est. Views</span>
                  <span className="text-white font-mono">{item.views?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Discussion</span>
                  <span className="text-sky-300 font-mono flex items-center gap-1">
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
                  </span>
                </div>
              </div>

              {/* Multi-Resolution Download Button */}
              <div className="relative">
                <button
                  onClick={() => setDownloadMenuOpen(!downloadMenuOpen)}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Visual</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {downloadMenuOpen && (
                  <div className="absolute left-0 right-0 bottom-full mb-2 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl p-1.5 z-30 space-y-1 text-xs">
                    <button
                      onClick={() => handleDirectDownload(item.downloadUrls.original || item.highResUrl, 'Original')}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-zinc-800 text-white flex justify-between items-center"
                    >
                      <span>Original ({item.width}×{item.height})</span>
                      <span className="text-zinc-400 text-[10px]">UHD</span>
                    </button>
                    <button
                      onClick={() => handleDirectDownload(item.downloadUrls.large || item.highResUrl, 'Large')}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-zinc-800 text-zinc-200 flex justify-between items-center"
                    >
                      <span>Large (1600px)</span>
                      <span className="text-zinc-400 text-[10px]">HD</span>
                    </button>
                    <button
                      onClick={() => handleDirectDownload(item.downloadUrls.medium || item.previewUrl, 'Medium')}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-zinc-800 text-zinc-300 flex justify-between items-center"
                    >
                      <span>Medium (800px)</span>
                      <span className="text-zinc-400 text-[10px]">Web</span>
                    </button>
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* Color Palette Swatches */}
          <div className="bg-zinc-900/40 rounded-2xl p-5 border border-zinc-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <Palette className="w-4 h-4 text-sky-400" />
                Extracted Color Harmonization Palette
              </h4>
              <span className="text-[11px] text-zinc-500">Click any swatch to copy HEX code</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {item.colorPalette.map((hex, i) => {
                const isCopied = copiedHex === hex;
                return (
                  <button
                    key={i}
                    onClick={() => handleCopyColor(hex)}
                    className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-all text-left group"
                  >
                    <div
                      className="w-full h-10 rounded-lg mb-2 shadow-inner border border-white/10"
                      style={{ backgroundColor: hex }}
                    />
                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-300">
                      <span>{hex}</span>
                      {isCopied ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3 text-zinc-500 group-hover:text-zinc-300" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Disqus Comments & Community Discussion Thread */}
          <div className="bg-zinc-900/40 rounded-2xl p-5 border border-zinc-800/80 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-sky-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  Creator Feedback & Community Comments
                </h4>
              </div>
              
              {/* Disqus Comment Count Badge */}
              <div className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-750 text-xs text-sky-300 font-mono flex items-center gap-1.5 shadow-sm">
                <MessageSquare className="w-3.5 h-3.5 text-sky-400" />
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
            </div>

            {/* Disqus Discussion Embed */}
            <div className="p-4 bg-zinc-950/80 rounded-xl border border-zinc-850 min-h-[180px]">
              <DiscussionEmbed
                shortname="home-4s75rmqfw8"
                config={{
                  url: item.sourceUrl || `https://visualflow.app/media/${item.numericId}`,
                  identifier: String(item.numericId),
                  title: item.title,
                  language: 'en',
                }}
              />
            </div>
          </div>

          {/* Related Images Discovery Section */}
          <div className="space-y-4 pt-4 border-t border-zinc-800">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-400" />
                <span>Related Visual Inspiration</span>
              </h4>
              <span className="text-xs text-zinc-400">Continuous discovery</span>
            </div>

            {loadingRelated ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="aspect-[4/3] rounded-xl bg-zinc-900 animate-pulse border border-zinc-800" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {relatedItems.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelated(rel)}
                    className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 cursor-pointer hover:border-sky-500 transition-all"
                  >
                    <img
                      src={rel.previewUrl}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2 flex items-end">
                      <span className="text-[10px] text-white font-medium truncate">{rel.photographer.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
