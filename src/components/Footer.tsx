import React from 'react';
import { Sparkles, Heart, ExternalLink, Command, ArrowUp } from 'lucide-react';
import { useVisualFlow } from '../context/VisualFlowContext';
import { CATEGORIES } from '../data/curatedData';

export const Footer: React.FC = () => {
  const { updateFilter } = useVisualFlow();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="w-full bg-zinc-950 border-t border-zinc-800/80 text-zinc-400 text-xs py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-zinc-850">
          
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-sky-400 to-indigo-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                Visual<span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-teal-300">Flow</span>
              </span>
            </div>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              An interactive visual discovery engine merging the curatorial depth of Pexels, the board architecture of Pinterest, and the sleek typography of modern creative studios.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://www.pexels.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
              >
                <span>Photos & Videos provided by Pexels</span>
                <ExternalLink className="w-3 h-3 text-zinc-500" />
              </a>
            </div>
          </div>

          {/* Quick Channels */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Explore Themes</h4>
            <ul className="space-y-1.5">
              {CATEGORIES.slice(1, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      updateFilter('category', cat.id);
                      updateFilter('query', cat.query);
                      updateFilter('section', 'explore');
                      scrollToTop();
                    }}
                    className="hover:text-white transition-colors"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Shortcuts & Navigation */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Discovery Tools</h4>
            <ul className="space-y-1.5 text-zinc-400">
              <li>
                <button
                  onClick={() => {
                    updateFilter('section', 'moodboards');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors"
                >
                  Mood Board Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    updateFilter('section', 'analytics');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors"
                >
                  Visual Analytics & Trends
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    updateFilter('section', 'trending');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors"
                >
                  Trending Weekly Picks
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    updateFilter('mediaType', 'videos');
                    updateFilter('section', 'explore');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors"
                >
                  4K Cinematic Footage
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-[11px] text-zinc-400">
          <div>
            © {new Date().getFullYear()} VisualFlow • Powered by the Pexels API. All visuals belong to their respective creators.
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-300 font-mono text-[10px]">Esc</kbd> to close preview</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors flex items-center gap-1"
              title="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
