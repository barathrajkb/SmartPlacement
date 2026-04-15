import { useState } from 'react';
import { Link } from 'react-router-dom';

const allCompanies = [
  { name: 'Google', tier: 'FAANG+', match: 87, loc: 'Mountain View', team: '10k+', pay: '$180k-$320k', diff: 5, role: 'Engineering' },
  { name: 'Swiggy', tier: 'Top Product', match: 92, loc: 'Bangalore', team: '1k-5k', pay: '₹30L-₹60L', diff: 4, role: 'Engineering' },
  { name: 'Stripe', tier: 'Unicorn', match: 78, loc: 'San Francisco', team: '5k+', pay: '$200k+', diff: 5, role: 'Engineering' },
  { name: 'Microsoft', tier: 'FAANG+', match: 85, loc: 'Redmond', team: '10k+', pay: '$150k-$280k', diff: 4, role: 'Engineering' },
  { name: 'Figma', tier: 'Product', match: 70, loc: 'San Francisco', team: '1k-5k', pay: '$170k+', diff: 3, role: 'Design' },
  { name: 'Airbnb', tier: 'Unicorn', match: 65, loc: 'San Francisco', team: '5k+', pay: '$190k+', diff: 4, role: 'Product' },
];

export default function CompanyIntelligence() {
  const [selectedCompany, setSelectedCompany] = useState<string>('Google');
  const [activeRole, setActiveRole] = useState('All Roles');
  const [sortBy, setSortBy] = useState('Match Score');
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const toggleBookmark = (name: string) => {
    setBookmarks(prev => { const n = new Set(prev); n.has(name) ? n.delete(name) : n.add(name); return n; });
  };

  const roles = ['All Roles', 'Engineering', 'Product', 'Design', 'Data Science'];
  const sortOptions = ['Match Score', 'Difficulty', 'Name A-Z', 'Salary'];

  let filtered = activeRole === 'All Roles' ? allCompanies : allCompanies.filter(c => c.role === activeRole);
  if (sortBy === 'Match Score') filtered = [...filtered].sort((a, b) => b.match - a.match);
  else if (sortBy === 'Difficulty') filtered = [...filtered].sort((a, b) => b.diff - a.diff);
  else if (sortBy === 'Name A-Z') filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  const sel = allCompanies.find(c => c.name === selectedCompany) || allCompanies[0];

  return (
    <div className="flex w-full min-h-[calc(100vh-4rem)]">
      <div className="flex-1 p-8 pr-[432px] overflow-y-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-on-surface mb-2">Target Intelligence</h1>
          <p className="text-on-surface-variant font-medium mb-8">Curated signals from 150+ top-tier tech ecosystems.</p>
          <div className="flex justify-between items-center bg-surface-container/50 p-2 rounded-2xl border border-outline-variant/10">
            <div className="flex gap-2">
              {roles.map(role => (
                <button key={role} onClick={() => setActiveRole(role)} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeRole === role ? 'bg-surface-container-highest text-primary shadow-ambient' : 'text-on-surface-variant hover:text-on-surface'}`}>
                  {role}
                </button>
              ))}
            </div>
            <div className="relative">
              <button onClick={() => setShowSortDropdown(!showSortDropdown)} className="flex items-center gap-2 px-4 py-2 text-sm text-on-surface hover:text-primary transition-colors">
                <span className="font-medium text-on-surface-variant">Sort by:</span> {sortBy}
                <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
              </button>
              {showSortDropdown && (
                <div className="absolute top-full right-0 mt-2 bg-surface-container rounded-xl shadow-ambient border border-outline-variant/10 overflow-hidden z-50 w-48">
                  {sortOptions.map(opt => (
                    <button key={opt} onClick={() => { setSortBy(opt); setShowSortDropdown(false); }} className={`w-full text-left px-4 py-3 text-sm hover:bg-surface-container-high transition-colors ${sortBy === opt ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filtered.map(c => (
            <div key={c.name} onClick={() => setSelectedCompany(c.name)}
              className={`bg-surface-container rounded-[24px] p-6 shadow-ambient transition-all cursor-pointer border ${selectedCompany === c.name ? 'border-primary/50 bg-surface-container-low shadow-[0_0_20px_rgba(79,70,229,0.15)] scale-[1.01]' : 'border-outline-variant/10 hover:border-primary/30'} flex flex-col group`}>
              <div className="flex gap-4 items-start mb-6">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg text-surface font-extrabold text-2xl shrink-0">{c.name[0]}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-on-surface">{c.name}</h3>
                  <div className="inline-block mt-1 bg-surface-container-highest px-2 py-0.5 rounded font-mono text-[10px] uppercase text-on-surface-variant tracking-wider">{c.tier}</div>
                </div>
                <button onClick={e => { e.stopPropagation(); toggleBookmark(c.name); }} className={`transition-colors ${bookmarks.has(c.name) ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`}>
                  <span className="material-symbols-outlined">{bookmarks.has(c.name) ? 'bookmark_added' : 'bookmark_add'}</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-4 font-mono text-[11px] text-on-surface-variant mb-6 bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/10">
                <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px]">location_on</span>{c.loc}</div>
                <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px]">people</span>{c.team}</div>
                <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px]">payments</span>{c.pay}</div>
              </div>
              <div className="mb-6">
                <div className="flex justify-between text-xs font-bold mb-2"><span>Your Match</span><span className="text-secondary">{c.match}%</span></div>
                <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-secondary" style={{width: `${c.match}%`}}></div>
                </div>
              </div>
              <div className="mt-auto pt-4 border-t border-outline-variant/10 flex justify-between items-center">
                <div className="flex gap-2">
                  <span className="bg-surface-container-highest text-on-surface-variant text-[10px] px-2 py-1 rounded-md font-mono uppercase">DSA ×3</span>
                  <span className="bg-surface-container-highest text-on-surface-variant text-[10px] px-2 py-1 rounded-md font-mono uppercase">SysDes ×1</span>
                </div>
                <div className="flex gap-1">{[1,2,3,4,5].map(dot => <div key={dot} className={`w-2 h-2 rounded-full ${dot <= c.diff ? 'bg-tertiary' : 'bg-surface-container-highest'}`}></div>)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Intelligence Panel */}
      <div className="w-[400px] fixed top-16 right-0 bottom-0 bg-surface-container shadow-[-20px_0_40px_rgba(6,14,32,0.4)] border-l border-outline-variant/10 overflow-y-auto p-6 z-10 hidden lg:block">
        <div className="flex flex-col items-center text-center mt-6 mb-12">
          <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-lg text-surface font-extrabold text-4xl mb-4">{sel.name[0]}</div>
          <h2 className="text-2xl font-extrabold mb-3">{sel.name}</h2>
          <div className="px-3 py-1 bg-secondary-container/20 border border-secondary/30 rounded-full text-secondary font-bold text-xs uppercase tracking-wider flex items-center gap-1 shadow-[0_0_15px_rgba(78,222,163,0.1)]">
            <span className="material-symbols-outlined text-[14px]">psychology</span> AI Confidence: 94%
          </div>
        </div>
        <div className="flex flex-col gap-12">
          <section>
            <h3 className="text-sm font-label uppercase tracking-widest text-on-surface-variant mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">data_array</span> Top Concepts</h3>
            <div className="flex flex-wrap gap-2">
              {['Graph BFS/DFS', 'Dynamic Programming', 'Distributed Caching', 'Consistent Hashing', 'Load Balancing'].map(tag => (
                <Link to="/resources" key={tag} className="bg-surface-container-high text-on-surface text-xs px-3 py-1.5 rounded-lg border border-outline-variant/20 hover:border-primary/50 transition-colors">{tag}</Link>
              ))}
            </div>
          </section>
          <section>
            <h3 className="text-sm font-label uppercase tracking-widest text-on-surface-variant mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">format_list_numbered</span> Interview Pattern</h3>
            <div className="flex flex-col gap-3">
              {[
                { title: 'Phone Screen', desc: '1 hr • Basic DSA & LP', icon: 'call' },
                { title: 'Onsite Coding I & II', desc: '45m each • Hard LC, Graphs', icon: 'code' },
                { title: 'System Design', desc: '1 hr • High-level scalable design', icon: 'architecture' },
                { title: 'Behavioral', desc: '45m • Past conflicts, impact', icon: 'groups' }
              ].map((round, i) => (
                <div key={i} className="flex gap-4 cursor-pointer hover:bg-surface-container-high rounded-lg p-2 -mx-2 transition-colors" onClick={() => alert(`${round.title}: ${round.desc}\n\nPrepare via the Mock Interview module!`)}>
                  <div className="mt-0.5 w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[12px] text-primary">{round.icon}</span>
                  </div>
                  <div><div className="font-bold text-sm text-on-surface">{round.title}</div><div className="text-xs text-on-surface-variant">{round.desc}</div></div>
                </div>
              ))}
            </div>
          </section>
          <section className="bg-primary-container/10 border border-primary/20 rounded-2xl p-5 shadow-ambient relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-primary/20 blur-xl rounded-full"></div>
            <h3 className="text-primary font-bold text-sm mb-3 flex items-center gap-2"><span className="material-symbols-outlined text-[18px] text-shadow-glow">psychology</span> AI Preparation Tips</h3>
            <ul className="text-sm text-on-surface-variant space-y-2 list-disc list-outside ml-4 font-medium">
              <li>Focus heavily on scalable microservices.</li>
              <li>Don't jump into code; they assess clarifying questions precisely.</li>
              <li>Your current System Design match is high enough to pass. Focus on DP.</li>
            </ul>
          </section>
          <Link to="/mock-interview" className="w-full py-4 rounded-xl bg-primary-container text-on-primary-container font-bold shadow-ambient hover:scale-105 transition-transform flex items-center justify-center gap-2 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity"></div>
            Start Targeted Prep <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
