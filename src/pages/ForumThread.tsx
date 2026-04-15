import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const forumData: Record<string, { name: string; logo: string; posts: { author: string; text: string; time: string; upvotes: number }[] }> = {
  google: {
    name: 'Google L5 Prep', logo: 'G',
    posts: [
      { author: 'Anonymous Fox', text: 'Just had my Phone Screen for L5 SWE. They asked a medium-hard graph problem (BFS on a grid). Make sure you clarify edge cases before coding!', time: '2 hours ago', upvotes: 45 },
      { author: 'Anonymous Bear', text: 'System Design round: I got "Design Google Maps Routing". Focus on graph partitioning and real-time traffic data ingestion.', time: '5 hours ago', upvotes: 82 },
      { author: 'Anonymous Wolf', text: 'Does anyone know the current timeline from recruiter screen to onsite? Mine has been 3 weeks so far.', time: '1 day ago', upvotes: 23 },
      { author: 'Anonymous Owl', text: 'Behavioral tip: They really care about "Googleyness". Prepare stories about collaboration and handling ambiguity.', time: '2 days ago', upvotes: 67 },
    ]
  },
  meta: {
    name: 'Meta E4 Squad', logo: 'M',
    posts: [
      { author: 'Anonymous Hawk', text: 'E4 coding round was 2 medium LeetCode problems in 40 minutes. Practice speed over perfection.', time: '3 hours ago', upvotes: 56 },
      { author: 'Anonymous Deer', text: 'System Design: "Design Instagram Stories". Think about CDN caching and real-time fanout.', time: '8 hours ago', upvotes: 91 },
      { author: 'Anonymous Eagle', text: 'Got my offer! TC came in at $220k. Happy to answer questions about the process.', time: '1 day ago', upvotes: 145 },
    ]
  },
  stripe: {
    name: 'Stripe Integration', logo: 'S',
    posts: [
      { author: 'Anonymous Cat', text: 'The take-home assignment took me about 6 hours. Focus on clean code architecture and good test coverage.', time: '1 day ago', upvotes: 34 },
      { author: 'Anonymous Dog', text: 'API Design round: They asked about idempotency keys and webhook retry strategies. Very practical.', time: '2 days ago', upvotes: 52 },
    ]
  },
  amazon: {
    name: 'Amazon SDE II', logo: 'A',
    posts: [
      { author: 'Anonymous Panda', text: 'LP stories are EVERYTHING at Amazon. Prepare at least 8-10 solid stories using the STAR method.', time: '4 hours ago', upvotes: 78 },
      { author: 'Anonymous Tiger', text: 'OOD round: "Design a parking lot system". Standard patterns but they dig into extensibility.', time: '1 day ago', upvotes: 41 },
    ]
  }
};

export default function ForumThread() {
  const { id } = useParams<{ id: string }>();
  const forum = forumData[id || 'google'] || forumData.google;
  const [replyText, setReplyText] = useState('');
  const [posts, setPosts] = useState(forum.posts);
  const [votedPosts, setVotedPosts] = useState<Set<number>>(new Set());

  const handleReply = () => {
    if (!replyText.trim()) return;
    setPosts(prev => [{ author: 'You', text: replyText, time: 'Just now', upvotes: 0 }, ...prev]);
    setReplyText('');
  };

  const handleVote = (idx: number) => {
    setVotedPosts(prev => {
      const next = new Set(prev);
      if (next.has(idx)) { next.delete(idx); } else { next.add(idx); }
      return next;
    });
  };

  return (
    <div className="p-8 max-w-[900px] mx-auto">
      <Link to="/collaborate" className="text-sm font-bold text-primary hover:text-primary-container mb-6 inline-flex items-center gap-1">
        <span className="material-symbols-outlined text-[18px]">arrow_back</span> Back to The Hive
      </Link>

      <div className="flex items-center gap-4 mb-10 mt-4">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-surface font-extrabold text-3xl shadow-lg">{forum.logo}</div>
        <div>
          <h1 className="text-3xl font-extrabold">{forum.name}</h1>
          <p className="text-on-surface-variant text-sm font-mono">{posts.length} discussions</p>
        </div>
      </div>

      {/* Reply Composer */}
      <div className="bg-surface-container-low rounded-[24px] p-6 shadow-ambient border border-outline-variant/10 mb-8">
        <textarea
          value={replyText}
          onChange={e => setReplyText(e.target.value)}
          placeholder="Share your experience or ask a question..."
          className="w-full h-24 bg-surface-container-highest rounded-xl p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 text-on-surface placeholder:text-on-surface-variant/50 mb-4"
        />
        <div className="flex justify-end">
          <button onClick={handleReply} className="bg-primary-container text-on-primary-container px-6 py-2 rounded-xl text-sm font-bold shadow-ambient hover:scale-105 transition-transform disabled:opacity-40" disabled={!replyText.trim()}>
            Post Reply
          </button>
        </div>
      </div>

      {/* Posts */}
      <div className="flex flex-col gap-6">
        {posts.map((post, i) => (
          <div key={i} className="bg-surface-container-low rounded-[24px] p-6 shadow-ambient border border-outline-variant/10 flex gap-6">
            <div className="flex flex-col items-center gap-1 shrink-0">
              <button onClick={() => handleVote(i)} className={`material-symbols-outlined text-[24px] transition-colors ${votedPosts.has(i) ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`}>
                expand_less
              </button>
              <span className={`font-mono font-bold text-sm ${votedPosts.has(i) ? 'text-primary' : 'text-secondary'}`}>{post.upvotes + (votedPosts.has(i) ? 1 : 0)}</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-bold text-on-surface">{post.author}</span>
                <span className="text-[10px] text-on-surface-variant font-mono">{post.time}</span>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed font-medium">{post.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
