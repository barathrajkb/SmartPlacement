import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Analytics() {
  const { userData, currentUser } = useAuth();
  const [period, setPeriod] = useState('30D');

  const calculateReadiness = () => {
    if (!userData?.skills) return 78;
    const skills = Object.values(userData.skills);
    const avg = skills.reduce((a, b) => a + b, 0) / skills.length;
    return Math.round(avg * 20);
  };

  const readiness = calculateReadiness();

  // Radar chart points calculation
  // DSA, SYS DES, COMM, CORE CS, BEHAVIORAL
  const radarPoints = useMemo(() => {
    if (!userData?.skills) return "100,50 140,85 125,160 50,130 20,70"; // Fallback
    
    const s = userData.skills;
    const center = 100;
    const maxRadius = 90;
    
    // Skill mapping to angles
    const skills = [
      s['Data Structures'] || 3,
      s['System Design'] || 3,
      s['Communication'] || 3,
      s['Core CS'] || 3,
      s['Aptitude'] || 3 // Behavioral
    ];

    const points = skills.map((level, i) => {
      const angle = (i * 72 - 90) * (Math.PI / 180);
      const radius = (level / 5) * maxRadius;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      return `${x},${y}`;
    });

    return points.join(' ');
  }, [userData?.skills]);

  return (
    <div className="p-8 max-w-[1400px] mx-auto animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-on-surface mb-2">Career Readiness Intelligence</h1>
          <p className="text-on-surface-variant font-medium max-w-2xl text-sm leading-relaxed">Comprehensive performance telemetry across technical domains and recruitment benchmarks.</p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => alert('Generating PDF report... Your Career Readiness Report will download shortly.')} className="flex items-center gap-2 text-sm font-bold text-on-surface-variant hover:text-on-surface px-4 py-2 hover:bg-surface-container rounded-xl transition-colors">
            <span className="material-symbols-outlined text-[20px]">file_download</span> Export Report
          </button>
          <button onClick={() => { navigator.clipboard.writeText(`https://smartplacement.app/profile/${currentUser?.uid}`); alert('Profile link copied to clipboard!'); }} className="bg-primary-container text-on-primary-container px-6 py-2 rounded-xl text-sm font-bold shadow-ambient hover:scale-105 transition-transform">
            Share Profile
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Card 1: Readiness Trend */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-low rounded-[24px] p-6 shadow-ambient">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-lg font-bold">Readiness Score Trend</h2>
              <p className="font-mono text-[10px] text-on-surface-variant tracking-widest uppercase mt-1">30-day algorithmic projection</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-extrabold text-primary">{readiness}</div>
              <div className="text-sm font-bold text-secondary">+12 pts</div>
            </div>
          </div>
          <div className="relative h-48 w-full mt-8 mb-4">
            <svg viewBox="0 0 800 200" preserveAspectRatio="none" className="w-full h-full overflow-visible">
              <path d="M0,40 H800 M0,100 H800 M0,160 H800" stroke="#464555" strokeOpacity="0.1" strokeWidth="1" />
              <path d="M0,180 C100,160 200,170 300,120 S500,150 600,80" fill="none" stroke="#c3c0ff" strokeWidth="4" strokeLinecap="round" />
              <path d="M600,80 C700,40 800,20" fill="none" stroke="#ffb95f" strokeWidth="3" strokeDasharray="8 6" strokeLinecap="round" />
              <circle cx="300" cy="120" r="5" fill="#4f46e5" stroke="#c3c0ff" strokeWidth="3" />
              <circle cx="600" cy="80" r="6" fill="#4f46e5" stroke="#c3c0ff" strokeWidth="3" />
              <circle cx="800" cy="20" r="5" fill="#131b2e" stroke="#ffb95f" strokeWidth="3" />
            </svg>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-outline-variant/10">
            <div className="flex gap-2">
              {['7D', '30D', '90D', 'All Time'].map(f => (
                <button key={f} onClick={() => setPeriod(f)} className={`text-[10px] font-mono px-2 py-1 rounded cursor-pointer transition-colors ${period === f ? 'bg-surface-container-highest text-on-surface' : 'text-on-surface-variant hover:bg-surface-container'}`}>{f}</button>
              ))}
            </div>
            <div className="flex font-mono text-[10px] text-on-surface-variant w-full max-w-[60%] justify-between pr-4">
              <span>W1</span><span>W2</span><span>W3</span><span>W4 (Now)</span><span>Projection</span>
            </div>
          </div>
        </div>

        {/* Card 2: Radar */}
        <div className="col-span-12 lg:col-span-4 bg-surface-container-low rounded-[24px] p-6 shadow-ambient flex flex-col items-center">
          <h2 className="text-lg font-bold mb-6 self-start">Skill Radar</h2>
          <div className="flex-1 flex justify-center items-center relative w-full">
            <svg viewBox="0 0 200 200" className="w-[85%] max-w-[240px] drop-shadow-[0_0_15px_rgba(79,70,229,0.2)]">
              <polygon points="100,10 190,70 155,170 45,170 10,70" fill="none" stroke="#464555" strokeOpacity="0.3" strokeWidth="1"/>
              <polygon points="100,40 160,80 135,145 65,145 40,80" fill="none" stroke="#464555" strokeOpacity="0.1" strokeWidth="1"/>
              <line x1="100" y1="100" x2="100" y2="10" stroke="#464555" strokeOpacity="0.2"/>
              <line x1="100" y1="100" x2="190" y2="70" stroke="#464555" strokeOpacity="0.2"/>
              <line x1="100" y1="100" x2="155" y2="170" stroke="#464555" strokeOpacity="0.2"/>
              <line x1="100" y1="100" x2="45" y2="170" stroke="#464555" strokeOpacity="0.2"/>
              <line x1="100" y1="100" x2="10" y2="70" stroke="#464555" strokeOpacity="0.2"/>
              
              {/* Target Outline (Top 10%) */}
              <polygon points="100,30 170,80 145,150 55,150 30,80" fill="none" stroke="#ffb95f" strokeOpacity="0.3" strokeDasharray="4 4" strokeWidth="2"/>
              
              {/* User Data Polygon */}
              <polygon points={radarPoints} fill="#4f46e5" fillOpacity="0.25" stroke="#4f46e5" strokeWidth="3" strokeLinejoin="round" className="transition-all duration-1000"/>
              
              <text x="100" y="5" fontSize="8" fill="#c7c4d8" textAnchor="middle" fontFamily="JetBrains Mono">DSA</text>
              <text x="195" y="75" fontSize="8" fill="#c7c4d8" textAnchor="start" fontFamily="JetBrains Mono">SYS DES</text>
              <text x="160" y="180" fontSize="8" fill="#c7c4d8" textAnchor="middle" fontFamily="JetBrains Mono">COMM.</text>
              <text x="40" y="180" fontSize="8" fill="#c7c4d8" textAnchor="middle" fontFamily="JetBrains Mono">CORE CS</text>
              <text x="5" y="75" fontSize="8" fill="#c7c4d8" textAnchor="end" fontFamily="JetBrains Mono">BEHAVIORAL</text>
            </svg>
          </div>
          <div className="mt-4 flex gap-4 text-xs font-medium justify-center">
            <span className="flex items-center gap-1.5"><div className="w-2 h-2 bg-primary"></div> You</span>
            <span className="flex items-center gap-1.5"><div className="w-2 h-2 bg-tertiary/20 border border-tertiary/40 border-dashed"></div> Target Top 10%</span>
          </div>
        </div>

        {/* Card 3: Topic Heatmap */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-low rounded-[24px] p-6 shadow-ambient border border-outline-variant/10">
          <h2 className="text-lg font-bold mb-6">Practice Heatmap</h2>
          <div className="flex font-mono text-[10px] text-on-surface-variant mb-2 pl-6 ml-1 justify-between pr-4">
            {['Jan','Feb','Mar','Apr'].map(m => <span key={m}>{m}</span>)}
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col gap-[7.5px] font-mono text-[9px] text-on-surface-variant py-1 h-full justify-between"><span>Mon</span><span>Wed</span><span>Fri</span></div>
            <div className="flex-1 grid grid-cols-[repeat(52,minmax(0,1fr))] gap-1">
              {(userData?.stats?.activity || []).map((r, i) => {
                return <div key={i} className={`aspect-square rounded-[2px] cursor-pointer hover:ring-1 hover:ring-primary/50 transition-all ${r > 0.85 ? 'bg-primary-container' : r > 0.6 ? 'bg-primary-container/60' : r > 0.3 ? 'bg-surface-container-highest' : 'bg-surface-container'}`}></div>;
              })}
            </div>
          </div>
          <div className="mt-6 flex gap-6 text-[11px] font-mono border-t border-outline-variant/10 pt-4">
            <span className="text-on-surface">Total Sessions: <span className="text-secondary font-bold">{userData?.stats?.streak ? userData.stats.streak * 6 : 84}</span></span>
            <span className="text-on-surface">Total Hours: <span className="text-secondary font-bold">{userData?.stats?.totalHours || 126}</span></span>
            <span className="text-on-surface">Avg/Day: <span className="text-primary font-bold">1.4 hrs</span></span>
          </div>
        </div>

        {/* Card 4: Peer Benchmark */}
        <div className="col-span-12 lg:col-span-4 bg-surface-container-low rounded-[24px] p-6 shadow-ambient border border-outline-variant/10">
          <h2 className="text-lg font-bold mb-6">Cohort Standing</h2>
          <div className="flex items-baseline gap-2 mb-6 border-b border-outline-variant/10 pb-6">
            <span className="text-5xl font-extrabold text-secondary tracking-tighter">Top {readiness > 80 ? '8%' : readiness > 50 ? '15%' : '42%'}</span>
            <span className="material-symbols-outlined text-secondary">trending_up</span>
          </div>
          <div className="flex flex-col gap-4">
            <div className="relative h-1.5 w-full bg-surface-container-high rounded-full my-2">
              <div className="absolute left-[50%] h-full w-[2px] bg-tertiary"></div>
              <div className="absolute h-4 w-1 -top-1 bg-secondary rounded-full shadow-[0_0_10px_#4edea3] transition-all duration-1000" style={{ left: `${readiness}%` }}></div>
            </div>
            <div className="flex justify-between text-[9px] font-mono uppercase text-on-surface-variant">
              <span>Bottom</span><span className="text-tertiary font-bold">Target Top 10%</span><span className="text-secondary font-bold">You</span>
            </div>
          </div>
        </div>

        {/* Card 5: Mock Interview Performance */}
        <div className="col-span-12 lg:col-span-6 bg-surface-container-low rounded-[24px] p-6 shadow-ambient border border-outline-variant/10">
          <h2 className="text-lg font-bold mb-6">Recent Mock Sessions</h2>
          <div className="flex flex-col gap-4">
            {[
              { company: `${userData?.targetCompanies?.[0] || 'Google'} Target`, type: 'System Design', score: 72, date: 'Apr 12' },
              { company: `${userData?.targetCompanies?.[1] || 'Meta'} Target`, type: 'DSA - DP', score: 85, date: 'Apr 09' },
              { company: 'General', type: 'Behavioral', score: 92, date: 'Apr 05' },
              { company: 'Baseline', type: 'Aptitude', score: 58, date: 'Mar 28' },
            ].map((m, i) => (
              <Link to="/mock-interview" key={i} className="flex items-center justify-between group hover:bg-surface-container p-2 -mx-2 rounded-xl transition-colors">
                <div className="flex flex-col gap-1 w-1/3">
                  <span className="text-sm font-bold group-hover:text-primary transition-colors">{m.company}</span>
                  <span className="text-[10px] uppercase font-mono text-on-surface-variant px-2 py-0.5 bg-surface-container rounded-md inline-block w-fit">{m.type}</span>
                </div>
                <div className={`text-xl font-extrabold w-16 text-center ${m.score >= 80 ? 'text-secondary' : m.score >= 60 ? 'text-tertiary' : 'text-error'}`}>{m.score}</div>
                <div className="font-mono text-xs text-on-surface-variant text-right w-16">{m.date}</div>
              </Link>
            ))}
          </div>
          <Link to="/scheduler" className="text-sm font-bold text-primary mt-6 hover:text-primary-container inline-block">View All Sessions →</Link>
        </div>

        {/* Card 6: Time Investment */}
        <div className="col-span-12 lg:col-span-6 bg-surface-container-low rounded-[24px] p-6 shadow-ambient border border-outline-variant/10 flex flex-col">
          <h2 className="text-lg font-bold mb-6">Time Invested by Domain</h2>
          <div className="flex-1 flex flex-col justify-center gap-5 pr-8">
            {[
              { label: 'Data Structures', w: '85%', hrs: '48h' },
              { label: 'System Design', w: '65%', hrs: '32h' },
              { label: 'Core CS Concepts', w: '40%', hrs: '20h' },
              { label: 'Logical Aptitude', w: '25%', hrs: '14h' },
              { label: 'Behavioral', w: '15%', hrs: '8h' },
            ].map(bar => (
              <div key={bar.label} className="flex items-center gap-4 group cursor-pointer" onClick={() => alert(`${bar.label}: ${bar.hrs} invested\n\nView detailed breakdown in Resources.`)}>
                <div className="w-[120px] shrink-0 text-xs font-mono text-on-surface-variant truncate text-right group-hover:text-primary transition-colors">{bar.label}</div>
                <div className="flex-1 h-3 bg-surface-container-highest rounded-full overflow-hidden flex items-center">
                  <div className="h-full bg-primary-container rounded-full group-hover:bg-primary transition-colors" style={{width: bar.w}}></div>
                </div>
                <div className="w-10 font-bold text-xs shrink-0 text-right">{bar.hrs}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-outline-variant/10 flex justify-end">
            <div className="bg-primary/10 border border-primary/20 text-primary px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2 shadow-[0_0_10px_rgba(195,192,255,0.1)]">{userData?.stats?.totalHours || 126} hrs Total Prep</div>
          </div>
        </div>
      </div>
    </div>
  );
}

