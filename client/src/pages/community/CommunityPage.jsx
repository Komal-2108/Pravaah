import React, { useState } from 'react';
import { useNotification } from '../../context/NotificationContext';
import { 
  Users, 
  MessageSquare, 
  ThumbsUp, 
  Plus, 
  Award, 
  Share2, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const CommunityPage = () => {
  const { addToast } = useNotification();
  const [activeTab, setActiveTab] = useState('all');
  const [likes, setLikes] = useState({ 1: 24, 2: 12 });
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [newPostText, setNewPostText] = useState('');

  const handleLike = (id) => {
    setLikes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostText.trim()) return;
    addToast({
      title: 'Post Published to Community',
      message: 'Your doubt/discussion is now live for peer learners.',
      type: 'success'
    });
    setNewPostText('');
    setIsPostModalOpen(false);
  };

  const topContributors = [
    { rank: 1, name: 'Priya Sharma', answers: 128, avatar: 'PS' },
    { rank: 2, name: 'Arjun Mehta', answers: 96, avatar: 'AM' },
    { rank: 3, name: 'Ramesh Kumar', answers: 84, avatar: 'RK' }
  ];

  return (
    <div className="space-y-6 text-left">
      
      {/* 1. Header & Create Post */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-clay-forest">
            Community
          </h1>
          <p className="text-xs sm:text-sm text-clay-olive font-display font-semibold mt-0.5">
            Learn together. Share experiences. Grow together.
          </p>
        </div>

        <button
          onClick={() => setIsPostModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-clay-olive hover:bg-clay-olive-hover text-white font-display font-bold text-sm shadow-warm-pill flex items-center gap-1.5 transition self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Create Post</span>
        </button>
      </div>

      {/* 2. Tabs */}
      <div className="flex items-center gap-2 border-b border-clay-sand/40 pb-2 font-display font-bold text-sm flex-wrap">
        {[
          { id: 'all', label: 'All Posts' },
          { id: 'discussions', label: 'Discussions' },
          { id: 'doubts', label: 'Doubts' },
          { id: 'success', label: 'Success Stories' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 rounded-full transition ${
              activeTab === tab.id
                ? 'bg-clay-olive text-white shadow-warm-pill font-extrabold'
                : 'text-clay-forest hover:bg-clay-cream'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. Main Row: Feed Left (8 cols) + Top Contributors Right (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Feed Posts (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Post 1: Ramesh Kumar */}
          <div className="bg-white rounded-3xl p-6 border border-clay-sand/40 shadow-warm-card space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E5ECE6] text-clay-forest font-display font-bold text-sm flex items-center justify-center">
                  RK
                </div>
                <div>
                  <div className="font-display font-black text-sm text-clay-forest flex items-center gap-2">
                    <span>Ramesh Kumar</span>
                    <span className="text-[10px] text-clay-olive font-normal font-sans">
                      Junior PACS Accountant · 2 days ago
                    </span>
                  </div>
                  <span className="text-[10px] font-display font-bold text-clay-olive">
                    Anand Cooperative Academy
                  </span>
                </div>
              </div>

              {/* Tag */}
              <span className="px-3 py-0.5 rounded-full bg-[#FFF6EB] text-clay-copper font-display font-bold text-xs">
                Doubt
              </span>
            </div>

            <p className="text-sm font-sans text-clay-forest leading-relaxed">
              This course really helped me understand GST for our cooperative society. Sharing my notes for anyone who needs them!
            </p>

            {/* Post Actions */}
            <div className="flex items-center gap-5 pt-3 border-t border-clay-sand/30 text-xs font-display font-bold text-clay-olive">
              <button
                onClick={() => handleLike(1)}
                className="flex items-center gap-1.5 hover:text-clay-forest transition"
              >
                <ThumbsUp size={15} />
                <span>Like ({likes[1]})</span>
              </button>

              <button className="flex items-center gap-1.5 hover:text-clay-forest transition">
                <MessageSquare size={15} />
                <span>Comment (6)</span>
              </button>
            </div>
          </div>

          {/* Post 2: Neha Singh */}
          <div className="bg-white rounded-3xl p-6 border border-clay-sand/40 shadow-warm-card space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F7EFE6] text-clay-copper font-display font-bold text-sm flex items-center justify-center">
                  NS
                </div>
                <div>
                  <div className="font-display font-black text-sm text-clay-forest flex items-center gap-2">
                    <span>Neha Singh</span>
                    <span className="text-[10px] text-clay-olive font-normal font-sans">
                      3 days ago
                    </span>
                  </div>
                  <span className="text-[10px] font-display font-bold text-clay-olive">
                    Kheda Rural Training Wing
                  </span>
                </div>
              </div>

              {/* Tag */}
              <span className="px-3 py-0.5 rounded-full bg-[#FFF6EB] text-clay-copper font-display font-bold text-xs">
                Doubt
              </span>
            </div>

            <p className="text-sm font-sans text-clay-forest leading-relaxed">
              Can someone explain the difference between debit and credit with an example?
            </p>

            {/* Post Actions */}
            <div className="flex items-center gap-5 pt-3 border-t border-clay-sand/30 text-xs font-display font-bold text-clay-olive">
              <button
                onClick={() => handleLike(2)}
                className="flex items-center gap-1.5 hover:text-clay-forest transition"
              >
                <ThumbsUp size={15} />
                <span>Like ({likes[2]})</span>
              </button>

              <button className="flex items-center gap-1.5 hover:text-clay-forest transition">
                <MessageSquare size={15} />
                <span>Comment (4)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Top Contributors Leaderboard (4 cols) */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-3xl p-6 border border-clay-sand/40 shadow-warm-card space-y-4">
            <div className="border-b border-clay-sand/30 pb-3">
              <h3 className="font-display font-black text-base text-clay-forest">
                Top Contributors
              </h3>
              <span className="text-[11px] font-display text-clay-olive">
                This Month
              </span>
            </div>

            <div className="space-y-3">
              {topContributors.map((c) => (
                <div
                  key={c.rank}
                  className="flex items-center justify-between p-3 rounded-2xl bg-clay-cream hover:bg-[#EFE9DC] transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-display font-black text-sm text-clay-olive w-4 text-center">
                      {c.rank}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white text-clay-forest font-display font-bold text-xs flex items-center justify-center shadow-sm">
                      {c.avatar}
                    </div>
                    <div>
                      <div className="font-display font-bold text-xs text-clay-forest">
                        {c.name}
                      </div>
                      <div className="text-[10px] text-clay-olive font-display">
                        {c.answers} helpful answers
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      {isPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-clay-forest/50 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-warm-floating border border-clay-sand/40 space-y-4 text-left">
            <h3 className="font-display font-black text-lg text-clay-forest">
              Create Community Post
            </h3>
            <textarea
              rows={4}
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              placeholder="Ask a doubt, share study notes or post a win..."
              className="w-full p-4 rounded-2xl bg-clay-cream text-clay-forest font-sans text-sm focus:outline-none focus:ring-2 focus:ring-clay-olive"
            />
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setIsPostModalOpen(false)}
                className="px-5 py-2 rounded-full font-display font-bold text-xs text-clay-olive hover:bg-clay-cream"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePost}
                className="px-6 py-2.5 rounded-full bg-clay-olive text-white font-display font-bold text-xs shadow-warm-pill"
              >
                Publish Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
