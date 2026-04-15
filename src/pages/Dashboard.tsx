import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { userData } = useAuth();
  
  const calculateReadiness = () => {
    if (!userData?.skills) return 78; // Fallback
    const skills = Object.values(userData.skills);
    const avg = skills.reduce((a, b) => a + b, 0) / skills.length;
    return Math.round(avg * 20);
  };

  const readiness = calculateReadiness();
  const userName = userData?.profile?.name || 'User';

  const [bookmarked, setBookmarked] = useState<Set<number>>(new Set());

  // Generate personalized tasks based on domains
  const tasks = useMemo(() => {
    const domains = userData?.domains || ['Backend', 'DSA'];
    const domainTasks = {
      'Frontend': [
        { title: "Optimize Core Web Vitals for Dashboard", tag: "Frontend", time: "45m", priority: "urgent" as const },
        { title: "Implement Component testing with Vitest", tag: "Testing", time: "30m", priority: "normal" as const }
      ],
      'Backend': [
        { title: "Review Distributed Counter System Design", tag: "System Design", time: "45m", priority: "urgent" as const },
        { title: "Watch Kafka Partitioning Deep Dive", tag: "Infrastructure", time: "25m", priority: "normal" as const }
      ],
      'Full Stack': [
        { title: "Connect API endpoints to Frontend", tag: "Integration", time: "1h", priority: "urgent" as const },
        { title: "Database Schema Migration Strategy", tag: "Design", time: "40m", priority: "normal" as const }
      ],
      'DSA': [
        { title: "Solve Top K Frequent Elements", tag: "Blind 75", time: "30m", priority: "normal" as const },
        { title: "Implement LRU Cache from scratch", tag: "Practice", time: "20m", priority: "urgent" as const }
      ]
    };

    const result = [];
    domains.forEach(d => {
      // @ts-ignore
      if (domainTasks[d]) result.push(...domainTasks[d]);
    });
    
    // Fallback if no tasks or too few
    if (result.length < 3) {
      result.push({ title: "Solve Top K Frequent Elements", tag: "Blind 75", time: "30m", priority: "normal" as const });
    }

    return result.slice(0, 3).map(t => ({ ...t, done: false }));
  }, [userData?.domains]);

  const [localTasks, setLocalTasks] = useState(tasks);

  const toggleTask = (i: number) => {
    setLocalTasks(prev => prev.map((t, idx) => idx === i ? { ...t, done: !t.done } : t));
  };

  const toggleBookmark = (i: number) => {
    setBookmarked(prev => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; });
  };

  const targetCompanies = useMemo(() => {
    const defaultCompanies = [
      { name: 'Google', ready: 82, status: 'Preparing', logo: 'G' },
      { name: 'Meta', ready: 60, status: 'Application Open', logo: 'M' },
      { name: 'Swiggy', ready: 95, status: 'Ready', logo: 'S' },
      { name: 'Apple', ready: 40, status: 'Foundation Gap', logo: 'A' },
    ];

    if (!userData?.targetCompanies || userData.targetCompanies.length === 0) return defaultCompanies;

    return userData.targetCompanies.map(name => ({
      name,
      ready: 50 + Math.floor(Math.random() * 40),
      status: 'Targeted',
      logo: name[0]
    }));
  }, [userData?.targetCompanies]);

  return (
    <div className="p-8 max-w-[1400px] mx-auto animate-in fade-in duration-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-on-surface mb-2">Welcome back, {userName.split(' ')[0]}</h1>
        <p className="text-on-surface-variant font-medium text-sm">Target Tier: <span className="text-secondary font-bold uppercase tracking-widest">{userData?.profile?.selectedTier || 'FAANG+'}</span></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
        
        {/* Card 1: Placement Readiness Gauge */}
        <div className="col-span-12 md:col-span-5 bg-surface-container-low rounded-[24px] p-6 shadow-ambient relative overflow-hidden cursor-pointer hover:shadow-[0_0_30px_rgba(79,70,229,0.15)] transition-shadow" onClick={() => navigate('/analytics')}>
          <span className="material-symbols-outlined absolute top-4 right-4 text-[120px] text-surface-container-highest opacity-20 pointer-events-none -rotate-12">speed</span>
          <h2 className="text-xl font-bold mb-6 relative z-10">Placement Readiness</h2>
          <div className="flex flex-col items-center justify-center py-4 relative z-10">
            <div className="relative w-48 h-48 flex items-center justify-center mb-6">
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle cx="96" cy="96" r="80" className="stroke-surface-container-highest" strokeWidth="12" fill="none" />
                <circle cx="96" cy="96" r="80" className="stroke-primary" strokeWidth="12" fill="none" strokeDasharray="502" strokeDashoffset={502 - (readiness / 100) * 502} strokeLinecap="round" />
              </svg>
              <div className="flex flex-col items-center">
                <span className="text-5xl font-extrabold text-primary">{readiness}%</span>
                <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">Placement Ready</span>
              </div>
            </div>
            <div className="w-full">
              <div className="flex justify-between text-sm mb-2 text-on-surface-variant font-medium">
                <span>Current Level: Apprentice II</span>
                <span className="text-secondary font-mono">{userData?.stats?.totalHours || 126} XP</span>
              </div>
              <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000" style={{ width: `${readiness}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Today's Focus */}
        <div className="col-span-12 md:col-span-7 bg-surface-container-low rounded-[24px] p-6 shadow-ambient flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-tertiary">bolt</span>
            <h2 className="text-xl font-bold">Today's Focus</h2>
          </div>
          <div className="flex flex-col gap-6">
            {localTasks.map((task, i) => (
              <div key={i} className={`bg-surface-container rounded-xl p-4 flex items-center gap-4 border-l-4 ${task.done ? 'border-outline-variant opacity-60' : task.priority === 'urgent' ? 'border-tertiary' : 'border-secondary'} transition-all hover:-translate-y-1 hover:shadow-ambient`}>
                <div onClick={() => toggleTask(i)} className="w-6 h-6 rounded border border-outline-variant flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                  {task.done && <span className="material-symbols-outlined text-[18px] text-secondary">check</span>}
                </div>
                <div className="flex-1 cursor-pointer" onClick={() => navigate('/roadmap')}>
                  <div className={`font-semibold ${task.done ? 'line-through text-on-surface-variant' : 'text-on-surface'}`}>{task.title}</div>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-[10px] bg-surface-container-highest px-2 py-0.5 rounded font-label uppercase text-on-surface-variant tracking-wider">{task.tag}</span>
                    <span className="text-[10px] text-on-surface-variant font-mono">{task.time}</span>
                  </div>
                </div>
                {!task.done && <span className={`text-[10px] uppercase font-mono tracking-widest ${task.priority === 'urgent' ? 'text-tertiary' : 'text-secondary'}`}>{task.priority}</span>}
              </div>
            ))}
          </div>
          <Link to="/roadmap" className="mt-auto pt-4 text-sm font-bold text-primary hover:text-primary-container self-start">View Full Roadmap →</Link>
        </div>

        {/* Card 3: AI Insight Spotlight */}
        <div className="col-span-12 md:col-span-4 bg-primary-container/10 border border-primary/20 rounded-[24px] p-6 shadow-ambient">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-primary text-shadow-glow">psychology</span>
          </div>
          <h3 className="text-lg font-bold mb-3 text-on-surface">AI Coach Nudge</h3>
          <p className="text-on-surface-variant text-sm leading-relaxed mb-6 font-medium">Your {userData?.preferences?.interviewFocus || 'System Design'} score dropped 8 pts. I've adjusted your roadmap for the next 2 days to close this gap.</p>
          <Link to="/coach" className="text-xs font-bold bg-primary-container text-on-primary-container px-4 py-2 rounded-lg inline-block hover:scale-105 transition-transform">Open AI Coach →</Link>
        </div>

        {/* Card 4: Upcoming Deadlines */}
        <div className="col-span-12 md:col-span-4 bg-surface-container-low rounded-[24px] p-6 shadow-ambient cursor-pointer" onClick={() => navigate('/scheduler')}>
          <h3 className="text-lg font-bold mb-5 text-on-surface">Upcoming Deadlines</h3>
          <div className="relative border-l border-outline-variant/30 ml-2 space-y-6">
            {[
              { date: 'Apr 18', event: `${targetCompanies[0]?.name || 'Google'} Application`, color: 'text-tertiary' },
              { date: 'Apr 21', event: 'Mock Interview (DSA)', color: 'text-secondary' },
              { date: 'Apr 25', event: 'Stripe Take-home Due', color: 'text-error' },
            ].map((evt, i) => (
              <div key={i} className="relative pl-6">
                <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-surface-container-highest border-2 border-surface-container-low"></div>
                <div className={`text-[11px] font-mono mb-1 ${evt.color}`}>{evt.date}</div>
                <div className="text-sm font-semibold">{evt.event}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 5: Streak & Activity */}
        <div className="col-span-12 md:col-span-4 bg-surface-container-low rounded-[24px] p-6 shadow-ambient flex flex-col justify-between cursor-pointer" onClick={() => navigate('/analytics')}>
          <div>
            <h3 className="text-2xl font-bold mb-1">{userData?.stats?.streak || 14} Days 🔥</h3>
            <div className="text-xs text-on-surface-variant font-medium">Study Streak</div>
          </div>
          <div className="mx-auto w-full grid grid-cols-7 gap-1 mt-4">
            {(userData?.stats?.activity || Array.from({length: 35}).map(() => Math.random())).slice(-35).map((r, i) => {
              return <div key={i} className={`w-full aspect-square rounded-sm ${r > 0.7 ? 'bg-primary-container' : r > 0.4 ? 'bg-primary-container/40' : 'bg-surface-container-highest'}`}></div>;
            })}
          </div>
          <div className="mt-4 flex justify-between text-xs items-center">
            <span className="font-mono text-secondary">This week: 12.5 hrs</span>
          </div>
        </div>
      </div>

      {/* Bottom Section - Company Pipeline */}
      <div className="mb-8">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold">Your Target Companies</h2>
          <Link to="/companies" className="text-sm font-bold text-primary hover:text-primary-container">Edit Targets →</Link>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-6 -mx-8 px-8 snap-x">
          {targetCompanies.map((c, i) => (
            <div key={i} onClick={() => navigate('/companies')} className="min-w-[280px] bg-surface-container rounded-[24px] p-5 shadow-ambient flex flex-col gap-4 snap-start border border-outline-variant/10 hover:border-primary/30 transition-colors cursor-pointer hover:scale-[1.02] transition-transform">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-surface font-extrabold text-xl">{c.logo}</div>
                <div className="flex items-center gap-2">
                  <button onClick={(e) => { e.stopPropagation(); toggleBookmark(i); }} className="text-on-surface-variant hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">{bookmarked.has(i) ? 'bookmark_added' : 'bookmark_add'}</span>
                  </button>
                  <div className="px-2 py-1 bg-surface-container-lowest text-[10px] uppercase font-mono rounded">{c.status}</div>
                </div>
              </div>
              <h3 className="text-lg font-bold">{c.name}</h3>
              <div>
                <div className="flex justify-between text-[11px] font-mono text-on-surface-variant mb-1">
                  <span>Readiness</span>
                  <span className={c.ready > 80 ? 'text-secondary' : c.ready > 50 ? 'text-tertiary' : 'text-error'}>{c.ready}%</span>
                </div>
                <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                  <div className={`h-full bg-current ${c.ready > 80 ? 'text-secondary' : c.ready > 50 ? 'text-tertiary' : 'text-error'}`} style={{width: `${c.ready}%`}}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

