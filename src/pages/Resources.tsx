import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Relevance');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [bookmarked, setBookmarked] = useState<Set<number>>(new Set());

  const toggleBookmark = (i: number) => {
    setBookmarked(prev => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; });
  };

  const categories = ['All', 'System Design', 'DSA', 'Core CS', 'Behavioral', 'Company-Specific'];

  const featuredCards = [
    { title: 'Designing a Global Rate Limiter', type: 'SYSTEM DESIGN', time: '14 min read', color: 'from-secondary/20 to-secondary/5', icon: 'speed', difficulty: 'Advanced' },
    { title: 'Deconstructing Kafka Partitions', type: 'CORE CS', time: '22 min watch', color: 'from-tertiary/20 to-tertiary/5', icon: 'linear_scale', difficulty: 'Advanced' },
    { title: 'Mastering the Sliding Window Pattern', type: 'DSA PATTERN', time: '8 min read', color: 'from-primary/20 to-primary/5', icon: 'code_blocks', difficulty: 'Intermediate' },
    { title: 'Amazon LP: Deliver Results', type: 'BEHAVIORAL', time: '10 min read', color: 'from-quaternary/20 to-quaternary/5', icon: 'groups', difficulty: 'Beginner' }
  ];

  const allResources = [
    { title: 'CAP Theorem in Practice', type: 'Core CS', icon: 'account_tree', desc: 'Real-world examples of AP vs CP systems.', tags: ['Distributed', 'Databases'], time: '12 min read', views: '1.2k', progress: 40, iconColor: 'text-tertiary' },
    { title: 'Trie Data Structure', type: 'DSA', icon: 'account_tree', desc: 'Build an autocomplete system from scratch.', tags: ['Trees', 'Strings'], time: '8 min read', views: '3.4k', progress: 0, iconColor: 'text-secondary' },
    { title: 'Scale to 10M Users', type: 'System Design', icon: 'rocket_launch', desc: 'A step-by-step unrolling of back-of-envelope math.', tags: ['Math', 'Scale'], time: '18 min read', views: '8.9k', progress: 100, iconColor: 'text-primary' },
    { title: 'Graph Dijkstra vs A*', type: 'DSA', icon: 'route', desc: 'When to use which algorithm for shortest paths.', tags: ['Graphs', 'Shortest Path'], time: '15 min read', views: '2.1k', progress: 0, iconColor: 'text-secondary' },
    { title: 'Tell me about yourself', type: 'Behavioral', icon: 'person_search', desc: 'The perfect template for the 2-minute intro.', tags: ['HR', 'Intro'], time: '5 min read', views: '12k', progress: 0, iconColor: 'text-error' },
    { title: 'DB Indexing Deep Dive', type: 'Core CS', icon: 'database', desc: 'B-Trees vs Hash Indexes under the hood.', tags: ['Databases', 'Performance'], time: '20 min read', views: '4.5k', progress: 0, iconColor: 'text-tertiary' }
  ];

  let filtered = activeCategory === 'All' ? allResources : allResources.filter(r => r.type === activeCategory);
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(r => r.title.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q) || r.tags.some(t => t.toLowerCase().includes(q)));
  }
  if (sortBy === 'Views') filtered = [...filtered].sort((a, b) => parseFloat(b.views) - parseFloat(a.views));
  else if (sortBy === 'Name A-Z') filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      {/* Hero */}
      <div className="bg-surface-container-low rounded-[40px] p-12 mb-12 relative overflow-hidden shadow-ambient border border-outline-variant/10">
        <div className="absolute top-0 right-0 bottom-0 w-1/2 bg-gradient-to-l from-primary-container/20 to-transparent pointer-events-none"></div>
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono tracking-widest uppercase rounded mb-6">AI-Curated Collection</div>
          <h1 className="text-5xl font-extrabold tracking-tight mb-6 text-on-surface">The Architectural <br /><span className="text-gradient">Intelligence Vault.</span></h1>
          <p className="text-lg text-on-surface-variant font-medium leading-relaxed mb-10">Master elite engineering concepts through our editorial-first tutorials and high-fidelity system design blueprints.</p>
          <div className="flex gap-4">
            <Link to="/roadmap" className="bg-primary-container text-on-primary-container px-8 py-3 rounded-xl font-bold shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:scale-105 transition-transform flex items-center gap-2 w-fit">
              <span className="material-symbols-outlined text-[20px]">play_arrow</span> Start Learning
            </Link>
            <button onClick={() => alert(`You have ${bookmarked.size} bookmarked resources.`)} className="bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/20 text-on-surface px-6 py-3 rounded-xl font-bold transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">bookmark</span> Bookmarks ({bookmarked.size})
            </button>
          </div>
        </div>
      </div>

      {/* Filter & Sort Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10 pb-6 border-b border-outline-variant/10">
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${activeCategory === cat ? 'bg-surface-container-highest text-primary shadow-ambient' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'}`}>
              {cat}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <span className="material-symbols-outlined absolute left-3 top-2 text-on-surface-variant text-[20px]">search</span>
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search the vault" className="w-full bg-surface-container-highest text-on-surface rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all font-medium border-none" />
          </div>
          <div className="relative">
            <button onClick={() => setShowSortDropdown(!showSortDropdown)} className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 shrink-0">
              Sort: <span className="font-bold text-on-surface">{sortBy}</span> <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
            </button>
            {showSortDropdown && (
              <div className="absolute top-full right-0 mt-2 bg-surface-container rounded-xl shadow-ambient border border-outline-variant/10 overflow-hidden z-50 w-40">
                {['Relevance', 'Views', 'Name A-Z'].map(opt => (
                  <button key={opt} onClick={() => { setSortBy(opt); setShowSortDropdown(false); }} className={`w-full text-left px-4 py-3 text-sm hover:bg-surface-container-high transition-colors ${sortBy === opt ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>{opt}</button>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-1 bg-surface-container p-1 rounded-lg border border-outline-variant/10 shrink-0">
            <button onClick={() => setViewMode('grid')} className={`w-8 h-8 rounded shrink-0 flex items-center justify-center ${viewMode === 'grid' ? 'bg-surface-container-high text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}><span className="material-symbols-outlined text-[18px]">grid_view</span></button>
            <button onClick={() => setViewMode('list')} className={`w-8 h-8 rounded shrink-0 flex items-center justify-center ${viewMode === 'list' ? 'bg-surface-container-high text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}><span className="material-symbols-outlined text-[18px]">view_list</span></button>
          </div>
        </div>
      </div>

      {/* Featured Horizontal Scroll */}
      <div className="mb-14">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><span className="material-symbols-outlined text-tertiary">star</span> Featured Blueprints</h2>
        <div className="flex gap-6 overflow-x-auto pb-6 -mx-8 px-8 snap-x">
          {featuredCards.map((card, ci) => (
            <div key={card.title} onClick={() => alert(`Opening: ${card.title}\n\nThis would navigate to a full article reader view.`)} className="min-w-[320px] h-[400px] bg-surface-container rounded-[24px] shadow-ambient overflow-hidden relative flex flex-col group cursor-pointer snap-start border border-outline-variant/10 hover:border-outline-variant/30 transition-colors">
              <div className={`h-32 bg-gradient-to-b ${card.color} relative overflow-hidden`}>
                <span className="material-symbols-outlined absolute -right-6 -bottom-6 text-[120px] opacity-10 mix-blend-overlay text-white transform group-hover:scale-110 transition-transform duration-700">{card.icon}</span>
              </div>
              <div className="p-6 flex flex-col flex-1 relative z-10 bg-surface-container-low -mt-6 rounded-t-[24px] border-t border-outline-variant/10">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-surface-container-highest px-3 py-1 rounded text-[10px] font-mono tracking-widest uppercase text-on-surface-variant font-bold border border-outline-variant/10">{card.type}</span>
                  <button onClick={e => { e.stopPropagation(); toggleBookmark(100 + ci); }} className="text-on-surface-variant hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">{bookmarked.has(100 + ci) ? 'bookmark_added' : 'bookmark_add'}</span>
                  </button>
                </div>
                <h3 className="text-2xl font-extrabold mb-3 leading-tight">{card.title}</h3>
                <div className="text-sm font-mono text-on-surface-variant mt-auto">{card.time}</div>
                <div className="mt-4">
                  <span className={`px-2 py-1 text-[10px] uppercase font-bold tracking-widest rounded bg-surface-container-highest ${card.difficulty === 'Advanced' ? 'text-tertiary' : card.difficulty === 'Intermediate' ? 'text-secondary' : 'text-primary'}`}>{card.difficulty}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><span className="material-symbols-outlined text-primary">apps</span> Deep Dives & Tutorials</h2>
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-on-surface-variant">
          <span className="material-symbols-outlined text-[48px] mb-4 block opacity-30">search_off</span>
          <p className="text-lg font-bold">No resources match your filter.</p>
          <p className="text-sm mt-2">Try adjusting your search or category.</p>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12' : 'flex flex-col gap-4 mb-12'}>
          {filtered.map((r, i) => (
            <div key={i} onClick={() => alert(`Opening: ${r.title}\n\n${r.desc}\n\nThis would navigate to the full tutorial reader.`)}
              className={`bg-surface-container-low shadow-ambient border border-outline-variant/10 flex group hover:border-primary/30 hover:bg-surface-container transition-all cursor-pointer relative overflow-hidden ${viewMode === 'grid' ? 'rounded-[24px] p-6 flex-col' : 'rounded-xl p-4 items-center gap-4'}`}>
              <div className={`flex justify-between items-start ${viewMode === 'grid' ? 'mb-4' : ''}`}>
                <div className="flex items-center gap-2 bg-surface-container-highest px-3 py-1.5 rounded-lg border border-outline-variant/10">
                  <span className={`material-symbols-outlined text-[16px] ${r.iconColor}`}>{r.icon}</span>
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-on-surface-variant">{r.type}</span>
                </div>
                {viewMode === 'grid' && (
                  <button onClick={e => { e.stopPropagation(); toggleBookmark(i); }} className="text-on-surface-variant hover:text-primary transition-colors z-10 relative">
                    <span className="material-symbols-outlined text-[20px]">{bookmarked.has(i) ? 'bookmark_added' : 'bookmark_add'}</span>
                  </button>
                )}
              </div>
              <div className={viewMode === 'grid' ? '' : 'flex-1'}>
                <h3 className={`font-bold text-on-surface group-hover:text-primary transition-colors leading-snug ${viewMode === 'grid' ? 'text-lg mb-2' : 'text-base'}`}>{r.title}</h3>
                {viewMode === 'grid' && <p className="text-sm text-on-surface-variant font-medium leading-relaxed mb-4 line-clamp-2">{r.desc}</p>}
              </div>
              {viewMode === 'grid' && (
                <>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {r.tags.map(tag => <span key={tag} className="bg-surface-container text-[10px] font-label uppercase px-2 py-1 rounded text-on-surface-variant border border-surface-container-highest">{tag}</span>)}
                  </div>
                  <div className="mt-auto flex justify-between items-center text-[10px] font-mono text-on-surface-variant pt-4 border-t border-outline-variant/10">
                    <span><span className="material-symbols-outlined text-[14px] align-bottom mr-1">schedule</span> {r.time}</span>
                    <span><span className="material-symbols-outlined text-[14px] align-bottom mr-1">visibility</span> {r.views} views</span>
                  </div>
                  {r.progress > 0 && (
                    <div className="absolute bottom-0 left-0 w-full h-[3px] bg-surface-container-highest">
                      <div className={`h-full opacity-80 ${r.progress === 100 ? 'bg-secondary' : 'bg-primary'}`} style={{width: `${r.progress}%`}}></div>
                    </div>
                  )}
                </>
              )}
              {viewMode === 'list' && (
                <>
                  <span className="text-[10px] font-mono text-on-surface-variant shrink-0">{r.time}</span>
                  <button onClick={e => { e.stopPropagation(); toggleBookmark(i); }} className={`shrink-0 ${bookmarked.has(i) ? 'text-primary' : 'text-on-surface-variant hover:text-primary'} transition-colors`}>
                    <span className="material-symbols-outlined text-[20px]">{bookmarked.has(i) ? 'bookmark_added' : 'bookmark_add'}</span>
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
