import React, { useState } from 'react';
import { X, Plus, FolderHeart, Check, Sparkles, Image as ImageIcon } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MediaItem } from '../types';
import { useVisualFlow } from '../context/VisualFlowContext';

interface MoodBoardModalProps {
  item: MediaItem | null;
  onClose: () => void;
}

export const MoodBoardModal: React.FC<MoodBoardModalProps> = ({ item, onClose }) => {
  const { moodboards, createMoodBoard, addToMoodBoard } = useVisualFlow();
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [addedBoardId, setAddedBoardId] = useState<string | null>(null);

  if (!item) return null;

  const handleSelectBoard = (boardId: string) => {
    addToMoodBoard(boardId, item);
    setAddedBoardId(boardId);
    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // Confetti fallback
    }
    setTimeout(() => {
      onClose();
    }, 900);
  };

  const handleCreateNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const board = createMoodBoard(newTitle, newDesc, item);
    setAddedBoardId(board.id);
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 }
      });
    } catch {
      // Confetti fallback
    }
    setTimeout(() => {
      onClose();
    }, 900);
  };

  return (
    <div
      id="moodboard-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden p-6 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <FolderHeart className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Save to Mood Board</h3>
              <p className="text-xs text-zinc-400">Add this visual to your collections</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-zinc-900 text-zinc-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Selected Item Mini Preview */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800">
          <img
            src={item.previewUrl}
            alt={item.title}
            className="w-14 h-14 rounded-xl object-cover"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-semibold text-white truncate">{item.title}</h4>
            <p className="text-[11px] text-zinc-400">By {item.photographer.name}</p>
            <span className="text-[10px] text-purple-400 font-mono">
              {item.width} × {item.height} • {item.type}
            </span>
          </div>
        </div>

        {/* Existing Mood Boards List */}
        <div className="space-y-2 max-h-56 overflow-y-auto no-scrollbar">
          <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
            Your Boards ({moodboards.length})
          </label>
          
          {moodboards.map((board) => {
            const alreadyIn = board.items.some(i => i.id === item.id || i.numericId === item.numericId);
            const isJustAdded = addedBoardId === board.id;
            return (
              <button
                key={board.id}
                onClick={() => handleSelectBoard(board.id)}
                className={`w-full p-3 rounded-2xl border flex items-center justify-between text-left transition-all ${
                  isJustAdded
                    ? 'bg-purple-900/50 border-purple-500 text-white ring-2 ring-purple-500/30'
                    : alreadyIn
                    ? 'bg-zinc-900/80 border-zinc-700 text-zinc-300'
                    : 'bg-zinc-900/40 border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 text-zinc-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-zinc-800 border border-zinc-700 shrink-0">
                    {board.coverImage ? (
                      <img src={board.coverImage} alt={board.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-600">
                        <ImageIcon className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">{board.title}</h5>
                    <p className="text-[11px] text-zinc-400">{board.items.length} items</p>
                  </div>
                </div>

                <div>
                  {isJustAdded || alreadyIn ? (
                    <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Saved
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-400 text-[10px] font-medium group-hover:text-white">
                      Select
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Create New Board Accordion */}
        <div className="pt-2 border-t border-zinc-850">
          {!isCreating ? (
            <button
              onClick={() => setIsCreating(true)}
              className="w-full py-2.5 px-4 rounded-xl border border-dashed border-zinc-700 hover:border-purple-500 text-zinc-400 hover:text-purple-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Mood Board</span>
            </button>
          ) : (
            <form onSubmit={handleCreateNew} className="space-y-3 animate-in fade-in duration-150">
              <div>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Nordic Architecture & Warm Light"
                  autoFocus
                  required
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Optional notes or theme description..."
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="flex-1 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md"
                >
                  Create & Save
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
