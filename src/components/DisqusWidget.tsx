import React from 'react';
import { CommentCount, DiscussionEmbed } from 'disqus-react';
import { MessageSquare, MessageCircle } from 'lucide-react';
import { MediaItem } from '../types';

const DISQUS_SHORTNAME = 'home-4s75rmqfw8';

interface DisqusCountBadgeProps {
  item: MediaItem;
  className?: string;
}

export const DisqusCountBadge: React.FC<DisqusCountBadgeProps> = ({ item, className = '' }) => {
  const disqusConfig = {
    url: item.sourceUrl || `https://visualflow.app/media/${item.numericId}`,
    identifier: String(item.numericId),
    title: item.title,
  };

  return (
    <div className={`inline-flex items-center gap-1.5 text-zinc-300 ${className}`}>
      <MessageSquare className="w-3.5 h-3.5 text-sky-400 shrink-0" />
      <span className="text-[11px] font-medium font-mono text-zinc-300">
        <CommentCount
          shortname={DISQUS_SHORTNAME}
          config={disqusConfig}
        >
          Comments
        </CommentCount>
      </span>
    </div>
  );
};

interface DisqusDiscussionProps {
  item: MediaItem;
}

export const DisqusDiscussion: React.FC<DisqusDiscussionProps> = ({ item }) => {
  const disqusConfig = {
    url: item.sourceUrl || `https://visualflow.app/media/${item.numericId}`,
    identifier: String(item.numericId),
    title: item.title,
    language: 'en',
  };

  return (
    <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-sky-400" />
          <h4 className="text-sm font-bold text-white">Community Discussion & Critiques</h4>
        </div>
        <div className="px-2.5 py-1 rounded-full bg-zinc-800/80 border border-zinc-700 text-xs text-zinc-300 flex items-center gap-1.5">
          <CommentCount
            shortname={DISQUS_SHORTNAME}
            config={disqusConfig}
          >
            0 Comments
          </CommentCount>
        </div>
      </div>

      <div className="disqus-container min-h-[160px] bg-zinc-950/70 rounded-xl p-4 border border-zinc-850">
        <DiscussionEmbed
          shortname={DISQUS_SHORTNAME}
          config={disqusConfig}
        />
      </div>
    </div>
  );
};
