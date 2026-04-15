import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Collaborate() {
  const [composerText, setComposerText] = useState('');
  const [anon, setAnon] = useState(true);
  const [published, setPublished] = useState(false);
  const [joinedGroups, setJoinedGroups] = useState<Set<number>>(new Set());
  const [upvoted, setUpvoted] = useState<Set<number>>(new Set());
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  const handlePublish = () => {
    if (!composerText.trim()) { alert('Please write something before publishing.'); return; }
    setPublished(true);
    setComposerText('');
    setTimeout(() => setPublished(false), 3000);
  };

  const toggleGroup = (i: number) => {
    setJoinedGroups(prev => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; });
  };

  const toggleUpvote = (i: number) => {
    setUpvoted(prev => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; });
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => { const n = new Set(prev); n.has(tag) ? n.delete(tag) : n.add(tag); return n; });
  };

  const forums = [
    { name: 'Google L5 Prep', msgs: 342, logo: 'G', id: 'google', previews: ['"Sys Design for Maps?"', '"APM interview timeline..."', '"Current hiring freeze info"'] },
    { name: 'Meta E4 Squad', msgs: 821, logo: 'M', id: 'meta', previews: ['"Does Meta still ask DP?"', '"E4 Behavioral signals"', '"Recent offer numbers"'] },
    { name: 'Stripe Integration', msgs: 156, logo: 'S', id: 'stripe', previews: ['"They asked about Idempotency"', '"API Design round tips"', '"Take home assignment length"'] },
    { name: 'Amazon SDE II', msgs: 419, logo: 'A', id: 'amazon', previews: ['"LP stories formulation"', '"OOD round experience"', '"Bar raiser question..."'] },
  ];

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      <div className="mb-12 border-l-[6px] border-primary pl-6 py-2">
        <h1 className="text-5xl font-extrabold text-on-surface tracking-tight mb-4 drop-shadow-xl">
          The Hive <span className="text-primary text-shadow-glow">Intelligence.</span>
        </h1>
        <p className="text-on-surface-variant text-lg font-medium max-w-3xl leading-relaxed">
          Collaborate with peers targeting top-tier engineering roles. Share insights, review mock sessions, and dominate the technical interview together.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Company Forums */}
        <div className="col-span-12 lg:col-span-8 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-primary rounded-full shadow-[0_0_10px_rgba(195,192,255,0.5)]"></div>
              <h2 className="text-2xl font-bold">Trending Company Forums</h2>
            </div>
            <Link to="/companies" className="text-[11px] font-mono uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">View All Companies →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {forums.map(forum => (
              <Link to={`/forum/${forum.id}`} key={forum.name} className="bg-surface-container-low hover:bg-surface-container transition-colors rounded-[24px] p-6 shadow-ambient border border-outline-variant/10 relative overflow-hidden group cursor-pointer block">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 group-hover:scale-150 transition-all duration-700 pointer-events-none"></div>
                <div className="flex justify-between items-start mb-5 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-surface font-extrabold text-xl shadow-lg">{forum.logo}</div>
                    <h3 className="font-bold text-lg">{forum.name}</h3>
                  </div>
                  <span className="font-mono text-secondary text-xs bg-secondary-container/10 px-2 py-1 rounded border border-secondary/20">{forum.msgs} active</span>
                </div>
                <div className="space-y-3 mb-6 relative z-10 border-l-2 border-outline-variant/20 pl-3">
                  {forum.previews.map((p, i) => (<p key={i} className="text-sm text-on-surface-variant truncate font-medium">{p}</p>))}
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-outline-variant/10 relative z-10">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-surface-container-highest border border-surface-container-low flex items-center justify-center text-[8px]">👤</div>)}
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold group-hover:translate-x-1 transition-transform">Join Discussion →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Study Groups */}
        <div className="col-span-12 lg:col-span-4">
          <h2 className="text-2xl font-bold mb-6">Active Study Groups</h2>
          <div className="flex flex-col gap-4">
            {[
              { name: 'System Design Mockers', next: 'Today, 8 PM' },
              { name: 'Blind 75 Speedrun', next: 'Tomorrow, 9 AM' },
              { name: 'FAANG Behavioral', next: 'Wed, 7 PM' },
              { name: 'Frontend Arch Club', next: 'Thu, 6 PM' },
              { name: 'Graph Algo Geeks', next: 'Sat, 10 AM' }
            ].map((grp, i) => (
              <div key={grp.name} className="bg-surface-container rounded-[24px] p-5 shadow-ambient border border-outline-variant/5 flex items-center gap-4 hover:border-primary/30 transition-colors">
                <div className="flex flex-col gap-1.5 flex-1 w-full">
                  <h3 className="font-bold text-[15px] truncate">{grp.name}</h3>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex -space-x-1.5">
                      {[1,2,3].map(j => <img key={j} className="w-5 h-5 rounded-full border border-surface-container grayscale opacity-80" src={`https://api.dicebear.com/7.x/notionists/svg?seed=${grp.name}${j}&backgroundColor=e2e8f0`} alt="" />)}
                      <div className="w-5 h-5 rounded-full bg-surface-container-highest border border-surface-container flex items-center justify-center text-[8px] font-bold text-on-surface-variant">+4</div>
                    </div>
                    <span className="text-[9px] font-mono uppercase bg-tertiary-container/30 text-tertiary px-2 py-0.5 rounded border border-tertiary/20">{grp.next}</span>
                  </div>
                </div>
                <button onClick={() => toggleGroup(i)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${joinedGroups.has(i) ? 'bg-secondary/20 text-secondary border border-secondary/30' : 'bg-primary-container text-on-primary-container hover:scale-105 shadow-[0_0_10px_rgba(79,70,229,0.3)]'}`}>
                  {joinedGroups.has(i) ? 'Joined ✓' : 'Join'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Post Experience */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-low rounded-[32px] p-8 shadow-ambient mt-2 border border-outline-variant/10">
          <h2 className="text-xl font-bold mb-6">Share Your Experience</h2>
          {published && (
            <div className="bg-secondary/10 border border-secondary/30 text-secondary rounded-xl p-3 mb-4 text-sm font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">check_circle</span> Your experience has been published successfully!
            </div>
          )}
          <div className="flex flex-col gap-4">
            <textarea placeholder="Share an interview experience, tip, or resource... Markdown supported." value={composerText} onChange={e => setComposerText(e.target.value)}
              className="w-full h-32 bg-surface-container-highest rounded-2xl p-5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 text-on-surface placeholder:text-on-surface-variant/50 resize-none" />
            <div className="flex flex-wrap gap-2 mb-2">
              {['Google', 'Meta', 'Amazon', 'Stripe', 'System Design', 'DSA', 'Behavioral'].map(tag => (
                <button key={tag} onClick={() => toggleTag(tag)} className={`px-3 py-1 rounded-lg text-[11px] font-bold border transition-colors ${selectedTags.has(tag) ? 'bg-primary-container/20 border-primary/50 text-primary' : 'bg-surface-container-high border-transparent text-on-surface-variant hover:border-outline-variant/30'}`}>
                  {tag}
                </button>
              ))}
            </div>
            <div className="flex justify-between items-center border-t border-outline-variant/10 pt-4">
              <div className="flex gap-2">
                <button onClick={() => alert('File picker would open here.')} className="bg-surface-container-high px-3 py-1.5 rounded-lg text-[11px] font-mono flex items-center gap-1.5 text-on-surface-variant hover:text-on-surface"><span className="material-symbols-outlined text-[14px]">sell</span> Add Tag</button>
                <button onClick={() => alert('Attachment picker would open here.')} className="bg-surface-container-high px-3 py-1.5 rounded-lg text-[11px] font-mono flex items-center gap-1.5 text-on-surface-variant hover:text-on-surface"><span className="material-symbols-outlined text-[14px]">attach_file</span> Attach</button>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <span className="text-xs font-bold text-on-surface-variant">Anonymous</span>
                  <div className={`w-10 h-6 rounded-full p-1 transition-colors relative ${anon ? 'bg-primary-container shadow-[0_0_10px_rgba(79,70,229,0.3)]' : 'bg-surface-container-highest'}`} onClick={() => setAnon(!anon)}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${anon ? 'translate-x-4' : 'translate-x-0'}`}></div>
                  </div>
                </label>
                <button onClick={handlePublish} disabled={!composerText.trim()} className="bg-primary hover:bg-primary-container text-on-primary hover:text-on-primary-container px-6 py-2 rounded-xl text-sm font-bold shadow-ambient transition-all disabled:opacity-40 disabled:hover:scale-100">Publish</button>
              </div>
            </div>
          </div>
        </div>

        {/* Trending Insights */}
        <div className="col-span-12 lg:col-span-4 mt-2">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-outline-variant/10 pb-4">
            <span className="material-symbols-outlined text-tertiary">local_fire_department</span> Hot Insights
          </h2>
          <div className="flex flex-col gap-6">
            {[
              { title: 'Google L4 Interview debrief (Pass)', tag: 'Google', up: 245, time: '2h ago', id: 'google' },
              { title: 'Why I failed Microsoft Sys Design', tag: 'Microsoft', up: 189, time: '4h ago', id: 'google' },
              { title: 'Amazon Leadership Principles cheat sheet', tag: 'Amazon', up: 412, time: '1d ago', id: 'amazon' },
              { title: 'Stripe takehome: Stripe Connect clone', tag: 'Stripe', up: 120, time: '1d ago', id: 'stripe' }
            ].map((insight, i) => (
              <div key={i} className="flex gap-4 group cursor-pointer border border-transparent hover:border-outline-variant/20 p-2 -mx-2 rounded-xl transition-colors">
                <div className="flex flex-col items-center bg-surface-container-low rounded-lg p-2 min-w-[50px] shrink-0 shadow-ambient border border-outline-variant/5 group-hover:border-primary/30 transition-colors">
                  <button onClick={() => toggleUpvote(i)} className={`material-symbols-outlined text-[18px] transition-colors ${upvoted.has(i) ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary'}`}>expand_less</button>
                  <span className={`font-mono font-bold text-sm ${upvoted.has(i) ? 'text-primary' : 'text-secondary'}`}>{insight.up + (upvoted.has(i) ? 1 : 0)}</span>
                </div>
                <Link to={`/forum/${insight.id}`} className="flex flex-col justify-center">
                  <h4 className="text-sm font-semibold truncate max-w-[260px] group-hover:text-primary transition-colors">{insight.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="bg-surface-container-highest px-1.5 py-0.5 rounded text-[9px] font-label uppercase text-on-surface-variant">{insight.tag}</span>
                    <span className="text-[10px] text-on-surface-variant/50">{insight.time}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
