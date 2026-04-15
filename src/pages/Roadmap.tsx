import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Roadmap() {
  const { userData } = useAuth();
  const [showBanner, setShowBanner] = useState(true);
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set(['w3-0', 'w3-1']));

  const toggleTask = (id: string) => {
    setCompletedTasks(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const domains = userData?.domains || ['Backend', 'DSA'];
  const timeline = userData?.preferences?.timeline || '90 Days';

  const weeks = useMemo(() => {
    const pool = {
      'Frontend': [
        { week: 3, title: 'Advanced React & Performance', days: [
          { id: 'fe-3-0', day: 'MON', title: 'Virtual DOM & Reconciliation Deep Dive', tag: 'Frontend', time: '2.5 hrs' },
          { id: 'fe-3-1', day: 'TUE', title: 'Custom Hooks & State Machines', tag: 'Architecture', time: '3.0 hrs' }
        ]},
        { week: 4, title: 'Web Vitals & Browser API', days: [
          { id: 'fe-4-0', day: 'WED', title: 'LCP/FID Optimization Patterns', tag: 'Performance', time: '4.0 hrs' },
          { id: 'fe-4-1', day: 'THU', title: 'Web Workers & Off-main-thread', tag: 'Advanced', time: '1.5 hrs' }
        ]}
      ],
      'Backend': [
        { week: 3, title: 'System Design Deep Dive', days: [
          { id: 'be-3-0', day: 'MON', title: 'Consistent Hashing & Load Balancing', tag: 'Distributed Systems', time: '2.5 hrs' },
          { id: 'be-3-1', day: 'TUE', title: 'Database Sharding & Replication', tag: 'Data Layer', time: '3.0 hrs' }
        ]},
        { week: 4, title: 'Message Queues & Event Driven', days: [
          { id: 'be-4-0', day: 'WED', title: 'Kafka Deep Dive: Partitions & Offsets', tag: 'Infrastructure', time: '4.0 hrs' },
          { id: 'be-4-1', day: 'THU', title: 'Mock Interview: URL Shortener', tag: 'Practice', time: '1.5 hrs' }
        ]}
      ],
      'DSA': [
        { week: 5, title: 'Advanced Algorithms Sprint', days: [
          { id: 'dsa-5-0', day: 'MON', title: 'Dynamic Programming Patterns 1', tag: 'Algorithms', time: '3.0 hrs' },
          { id: 'dsa-5-1', day: 'TUE', title: 'Graph Traversal (BFS/DFS)', tag: 'Algorithms', time: '2.5 hrs' }
        ]}
      ]
    };

    const combined = [];
    // @ts-ignore
    if (domains.includes('Frontend')) combined.push(...pool['Frontend']);
    // @ts-ignore
    if (domains.includes('Backend')) combined.push(...pool['Backend']);
    // @ts-ignore
    if (domains.includes('DSA') || combined.length === 0) combined.push(...pool['DSA']);

    return combined.sort((a, b) => a.week - b.week);
  }, [domains]);

  return (
    <div className="flex w-full min-h-[calc(100vh-4rem)] animate-in fade-in duration-500">
      <div className="flex-1 p-8 pr-[336px] overflow-y-auto">
        
        {/* AI Re-routing Banner */}
        {showBanner && (
          <div className="bg-tertiary-container/10 border border-tertiary/20 rounded-2xl p-4 mb-8 shadow-ambient flex items-center justify-between animate-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-tertiary/20 rounded-xl flex items-center justify-center"><span className="material-symbols-outlined text-tertiary">psychology</span></div>
              <p className="text-on-surface text-sm font-medium">Personalizing roadmap for your {domains.join(' & ')} path. Adjusted for {timeline} window.</p>
            </div>
            <div className="flex gap-4 shrink-0">
              <button onClick={() => setShowBanner(false)} className="text-sm font-bold text-on-surface-variant hover:text-on-surface transition-colors">Dismiss</button>
            </div>
          </div>
        )}

        {/* Controls Bar */}
        <div className="flex justify-between items-center mb-8 border-b border-outline-variant/20 pb-4">
          <div className="flex gap-2">
            {['Foundation', 'Core Prep', 'Company Sprint', 'Final Polish'].map((phase, i) => (
              <button key={phase} onClick={() => setActivePhase(i)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activePhase === i ? 'bg-primary-container text-on-primary-container shadow-[0_0_15px_rgba(79,70,229,0.3)]' : 'text-on-surface-variant hover:bg-surface-container'}`}>
                {phase}
              </button>
            ))}
          </div>
          <div className="flex gap-3 items-center">
            <div className="px-3 py-1.5 bg-surface-container-high rounded-lg text-xs font-mono uppercase tracking-widest text-on-surface-variant border border-outline-variant/10">Timeline: {timeline}</div>
            <button onClick={() => alert('Customize roadmap dialog would open here.')} className="text-sm font-semibold text-primary hover:text-primary-container transition-colors ml-4">Customize →</button>
          </div>
        </div>

        {/* Week Cards */}
        <div className="flex flex-col gap-10">
          {weeks.map((week) => {
            const completed = week.days.filter(d => completedTasks.has(d.id)).length;
            const progress = Math.round((completed / week.days.length) * 100);
            return (
              <div key={week.id || week.week} className="bg-surface-container-low rounded-[24px] p-8 shadow-ambient border border-outline-variant/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[3px] bg-surface-container-highest">
                  <div className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500" style={{width: `${progress}%`}}></div>
                </div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-surface-container-high border border-outline-variant flex items-center justify-center font-mono text-xl font-bold text-on-surface">W{week.week}</div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-on-surface">{week.title}</h2>
                    <div className="text-[10px] uppercase font-mono tracking-widest text-on-surface-variant flex gap-2">
                      {progress === 100 ? '✅ Completed' : progress > 0 ? '⏳ In Progress' : '📅 Upcoming'} • {week.days.length} Sessions • {progress}% Done
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-6 ml-2">
                  {week.days.map((day, di) => {
                    const isDone = completedTasks.has(day.id);
                    return (
                      <div key={day.id} className="flex gap-6 items-start relative group">
                        {di < week.days.length - 1 && <div className="absolute top-8 left-4 w-px h-[calc(100%+8px)] bg-surface-container-highest group-hover:bg-outline-variant/30 transition-colors"></div>}
                        <div className="flex flex-col items-center gap-2 relative z-10 shrink-0">
                          <div onClick={() => toggleTask(day.id)} className={`w-8 h-8 rounded-full flex items-center justify-center border-[3px] border-surface-container-low shadow-ambient cursor-pointer hover:scale-110 transition-transform ${isDone ? 'bg-secondary text-on-secondary' : 'bg-surface-container-highest text-on-surface-variant border-outline-variant hover:bg-primary hover:border-primary'}`}>
                            {isDone ? <span className="material-symbols-outlined text-[14px]">check</span> : <div className="w-2.5 h-2.5 rounded-full bg-current"></div>}
                          </div>
                        </div>
                        <div className="bg-surface-container rounded-xl p-4 flex-1 flex items-center gap-4 border border-transparent hover:border-outline-variant/20 transition-all cursor-pointer">
                          <div className="w-12 h-12 bg-surface-container-highest rounded-lg flex items-center justify-center font-mono text-xs font-bold text-on-surface-variant shrink-0">{day.day}</div>
                          <div className="flex-1">
                            <h4 className={`text-base font-bold ${isDone ? 'text-on-surface-variant line-through' : 'text-on-surface'}`}>{day.title}</h4>
                            <div className="flex items-center gap-3 mt-1.5">
                              <span className="bg-secondary-container/20 text-secondary text-[10px] font-label uppercase tracking-widest px-2 py-0.5 rounded-md border border-secondary-container/30">{day.tag}</span>
                              <span className="flex items-center gap-1 text-[11px] font-mono text-on-surface-variant"><span className="material-symbols-outlined text-[14px]">schedule</span> {day.time}</span>
                            </div>
                          </div>
                          <Link to="/resources" className="w-8 h-8 rounded-lg border border-outline-variant/20 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/50 transition-colors">
                            <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Sidebar Panel */}
      <div className="w-72 fixed top-16 right-0 bottom-0 bg-surface-container-low border-l border-outline-variant/10 p-6 overflow-y-auto hidden xl:block shadow-[-20px_0_40px_rgba(6,14,32,0.5)]">
        <div className="bg-glass border border-outline-variant/10 rounded-[20px] p-5 shadow-ambient mb-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-32 h-32 bg-primary/10 blur-2xl rounded-full"></div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-on-surface-variant">AI Confidence Score</span>
          <div className="text-4xl font-extrabold text-primary my-2">91%</div>
          <p className="text-xs text-on-surface-variant font-medium">Trajectory indicates successful FAANG placement by target date.</p>
        </div>
        <h3 className="text-sm font-bold uppercase tracking-widest font-label text-on-surface mb-4">Topics Remaining</h3>
        <div className="flex flex-col gap-2 mb-8">
          {weeks.slice(1).map(w => (
            <Link to="/resources" key={w.week} className="flex justify-between items-center text-xs p-2 rounded-lg hover:bg-surface-container transition-colors">
              <span className="font-semibold text-on-surface-variant">{w.title}</span>
              <span className="font-mono text-[10px] text-tertiary bg-tertiary-container/20 px-2 rounded-md py-0.5">W{w.week}</span>
            </Link>
          ))}
        </div>
        <div className="bg-tertiary-container/20 border border-tertiary-container/50 rounded-[20px] p-5 relative overflow-hidden">
          <span className="material-symbols-outlined absolute -right-2 -bottom-2 text-[60px] text-tertiary opacity-10">warning</span>
          <h4 className="text-tertiary font-bold text-sm mb-2 flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">notifications_active</span> Target Focus</h4>
          <div className="flex flex-wrap gap-1.5 mt-3">
             {userData?.targetCompanies?.map(c => (
               <span key={c} className="px-2 py-1 bg-tertiary-container/30 text-tertiary text-[10px] rounded font-label uppercase">{c}</span>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}

