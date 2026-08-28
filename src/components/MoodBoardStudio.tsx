import React, { useState } from 'react';
import { 
  FolderHeart, 
  Plus, 
  Trash2, 
  Download, 
  Share2, 
  Sparkles, 
  Eye, 
  Layers, 
  LayoutGrid, 
  Palette, 
  ArrowLeft, 
  Check, 
  Copy,
  ExternalLink,
  FileJson
} from 'lucide-react';
import { MoodBoard, MediaItem } from '../types';
import { useVisualFlow } from '../context/VisualFlowContext';
import { MediaCard } from './MediaCard';

export const MoodBoardStudio: React.FC = () => {
  const { 
    moodboards, 
    createMoodBoard, 
    deleteMoodBoard, 
    removeFromMoodBoard, 
    setSelectedMedia 
  } = useVisualFlow();

  const [activeBoardId, setActiveBoardId] = useState<string | null>(null);
  const [layoutMode, setLayoutMode] = useState<'bento' | 'masonry' | 'collage'>('bento');
  const [isCreatingBoard, setIsCreatingBoard] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [copiedBoardPalette, setCopiedBoardPalette] = useState(false);
  const [exportedJson, setExportedJson] = useState(false);

  const activeBoard = moodboards.find(b => b.id === activeBoardId) || null;

  const handleCreateBoard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const created = createMoodBoard(newTitle, newDesc);
    setActiveBoardId(created.id);
    setNewTitle('');
    setNewDesc('');
    setIsCreatingBoard(false);
  };

  const handleCopyPalette = (palette: string[]) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(palette.join(', '));
      setCopiedBoardPalette(true);
      setTimeout(() => setCopiedBoardPalette(false), 2000);
    }
  };

  const handleExportJson = (board: MoodBoard) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(board, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `visualflow-moodboard-${board.title.toLowerCase().replace(/\s+/g, '-')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setExportedJson(true);
    setTimeout(() => setExportedJson(false), 2000);
  };

  return (
    <section id="moodboard-studio-section" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* If No Board Selected: Show Grid of Boards */}
      {!activeBoard ? (
        <div className="space-y-6">
          
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-800/80">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
                <FolderHeart className="w-7 h-7 text-purple-400" />
                <span>Mood Boards & Aesthetic Collections</span>
              </h2>
              <p className="text-sm text-zinc-400 mt-1">
                Curate personal visual mood boards, extract collective color palettes, and build creative direction concepts.
              </p>
            </div>

            <button
              onClick={() => setIsCreatingBoard(true)}
              className="px-4 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-600/20 flex items-center gap-2 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Create Mood Board</span>
            </button>
          </div>

          {/* Create Modal Form inline if active */}
          {isCreatingBoard && (
            <div className="p-6 bg-zinc-900/90 border border-purple-500/40 rounded-3xl shadow-xl max-w-lg mx-auto space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                New Mood Board Collection
              </h3>
              <form onSubmit={handleCreateBoard} className="space-y-3">
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Mood Board Title (e.g. Cyberpunk Interior)"
                  required
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500"
                />
                <input
                  type="text"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Concept notes, visual theme keywords..."
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCreatingBoard(false)}
                    className="flex-1 py-2 rounded-xl bg-zinc-800 text-zinc-400 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold shadow-md"
                  >
                    Create Board
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Boards Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {moodboards.map((board) => (
              <div
                key={board.id}
                onClick={() => setActiveBoardId(board.id)}
                className="group relative rounded-3xl bg-zinc-900/70 border border-zinc-800 hover:border-purple-500/50 p-4 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 cursor-pointer flex flex-col justify-between"
              >
                {/* Board Preview Collage */}
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 mb-4 grid grid-cols-3 gap-1 p-1">
                  {board.items.length > 0 ? (
                    board.items.slice(0, 3).map((item, i) => (
                      <div key={i} className={`relative h-full overflow-hidden rounded-lg ${i === 0 ? 'col-span-2' : 'col-span-1'}`}>
                        <img
                          src={item.previewUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))
                  ) : (
                    <div className="col-span-3 flex items-center justify-center text-zinc-600 text-xs font-medium">
                      Empty Board • Click to open & add visuals
                    </div>
                  )}
                </div>

                {/* Board Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors truncate">
                      {board.title}
                    </h3>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {board.items.length} items
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {board.description}
                  </p>

                  {/* Color Palette Strip */}
                  {board.colorPalette.length > 0 && (
                    <div className="flex items-center gap-1 pt-2">
                      {board.colorPalette.slice(0, 6).map((hex, i) => (
                        <div
                          key={i}
                          className="flex-1 h-3 rounded-full border border-white/10 shadow-inner"
                          style={{ backgroundColor: hex }}
                          title={hex}
                        />
                      ))}
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>

        </div>
      ) : (
        
        /* Active Board Detail View */
        <div className="space-y-6">
          
          {/* Top Bar with Back and Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveBoardId(null)}
                className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                title="Back to all boards"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">{activeBoard.title}</h2>
                <p className="text-xs text-zinc-400">{activeBoard.description} • {activeBoard.items.length} visuals</p>
              </div>
            </div>

            {/* Board Controls */}
            <div className="flex items-center gap-2">
              
              {/* Export JSON */}
              <button
                onClick={() => handleExportJson(activeBoard)}
                className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
                title="Export mood board data as JSON"
              >
                <FileJson className="w-3.5 h-3.5 text-purple-400" />
                <span>{exportedJson ? 'Exported!' : 'Export JSON'}</span>
              </button>

              {/* Copy Full Palette */}
              <button
                onClick={() => handleCopyPalette(activeBoard.colorPalette)}
                className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                {copiedBoardPalette ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Palette className="w-3.5 h-3.5 text-sky-400" />}
                <span>{copiedBoardPalette ? 'Palette Copied!' : 'Copy Palette'}</span>
              </button>

              {/* Delete Board */}
              <button
                onClick={() => {
                  if (confirm(`Delete mood board "${activeBoard.title}"?`)) {
                    deleteMoodBoard(activeBoard.id);
                    setActiveBoardId(null);
                  }
                }}
                className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                title="Delete Mood Board"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Aggregated Color Palette Banner */}
          <div className="p-4 bg-zinc-900/80 rounded-2xl border border-zinc-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-bold text-white">Aggregated Moodboard Color Swatches:</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {activeBoard.colorPalette.map((hex, idx) => (
                <div
                  key={idx}
                  className="px-2 py-1 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center gap-1.5 text-[11px] font-mono text-zinc-300 shadow-sm"
                >
                  <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: hex }} />
                  <span>{hex}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Items Gallery */}
          {activeBoard.items.length === 0 ? (
            <div className="py-16 text-center bg-zinc-900/30 rounded-3xl border border-zinc-850 p-6">
              <FolderHeart className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
              <h4 className="text-base font-bold text-white mb-1">Your mood board is empty</h4>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-4">
                Explore the gallery, hover over any photo or video, and click the bookmark icon to save it here.
              </p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 w-full">
              {activeBoard.items.map((item) => (
                <div key={item.id} className="relative group/board-item mb-4 break-inside-avoid">
                  <MediaCard item={item} onOpenDetail={setSelectedMedia} />
                  {/* Remove button on hover */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromMoodBoard(activeBoard.id, item.id);
                    }}
                    className="absolute top-3 right-12 z-30 p-2 rounded-full bg-red-950/80 border border-red-500/50 text-red-300 opacity-0 group-hover/board-item:opacity-100 transition-opacity hover:bg-red-900"
                    title="Remove from this board"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>
      )}

    </section>
  );
};
