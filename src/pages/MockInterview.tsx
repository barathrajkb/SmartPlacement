import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MockInterview() {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [format, setFormat] = useState('Text Answer');
  const [showResults, setShowResults] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
  const handleSubmit = () => { if (content.trim().length < 10) { alert('Please write a more detailed answer before submitting.'); return; } setShowResults(true); };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-background overflow-hidden relative">
      
      {/* Post-Submission Results Modal */}
      {showResults && (
        <div className="absolute inset-0 z-50 bg-primary-container/20 backdrop-blur-2xl flex items-center justify-center p-8">
          <div className="bg-surface-container rounded-[32px] p-10 max-w-2xl w-full shadow-ambient border border-outline-variant/20 relative">
            <button onClick={() => setShowResults(false)} className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface"><span className="material-symbols-outlined">close</span></button>
            
            <div className="text-center mb-8">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="64" cy="64" r="56" className="stroke-surface-container-highest" strokeWidth="10" fill="none" />
                  <circle cx="64" cy="64" r="56" className="stroke-secondary" strokeWidth="10" fill="none" strokeDasharray="352" strokeDashoffset="98" strokeLinecap="round" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-4xl font-extrabold text-secondary">72</span>
              </div>
              <h2 className="text-2xl font-extrabold mb-2">Good Effort!</h2>
              <p className="text-on-surface-variant text-sm">Your answer shows solid understanding with room for improvement.</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: 'Communication', score: 80, color: 'bg-secondary' },
                { label: 'Technical Accuracy', score: 65, color: 'bg-tertiary' },
                { label: 'Depth', score: 70, color: 'bg-primary' },
                { label: 'Clarity', score: 75, color: 'bg-secondary' },
              ].map(metric => (
                <div key={metric.label} className="bg-surface-container-low rounded-xl p-4">
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span>{metric.label}</span><span>{metric.score}/100</span>
                  </div>
                  <div className="h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className={`h-full ${metric.color} rounded-full`} style={{width: `${metric.score}%`}}></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-primary-container/10 rounded-xl p-4 mb-8 border border-primary/20">
              <h3 className="font-bold text-sm text-primary mb-2 flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">psychology</span> AI Feedback</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">Good mention of Redis for low-latency checks. Consider discussing CRDTs or gossip protocols for cross-region synchronization. The CAP theorem trade-off was missed — this is critical for distributed rate limiters.</p>
            </div>

            <div className="flex gap-4 justify-end">
              <button onClick={() => { setShowResults(false); setContent(''); }} className="px-4 py-2 text-sm font-bold text-on-surface-variant hover:text-on-surface transition-colors">Retry Question</button>
              <button onClick={() => navigate('/mock-interview')} className="px-4 py-2 text-sm font-bold bg-primary-container text-on-primary-container rounded-xl shadow-ambient hover:scale-105 transition-transform">Next Question</button>
              <button onClick={() => { alert('Saved to portfolio!'); setShowResults(false); }} className="px-4 py-2 text-sm font-bold text-secondary hover:text-secondary-container transition-colors">Save to Portfolio</button>
            </div>
          </div>
        </div>
      )}

      {/* Header Bar */}
      <div className="h-20 bg-surface border-b border-outline-variant/10 flex items-center justify-between px-8 shrink-0 relative z-10 shadow-ambient">
        <div>
          <h1 className="text-2xl font-extrabold text-primary mb-1">System Design: Distributed Rate Limiter</h1>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-mono text-sm text-on-surface-variant"><span className="material-symbols-outlined text-[18px]">schedule</span> 45:00 Remaining</span>
            <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
            <span className="flex items-center gap-1.5 font-mono text-sm text-secondary"><span className="material-symbols-outlined text-[18px]">bolt</span> Difficulty: Hard</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={handleSave} className={`text-sm font-bold px-4 py-2 transition-all ${saved ? 'text-secondary' : 'text-on-surface-variant hover:text-on-surface'}`}>
            {saved ? '✓ Saved!' : 'Save Draft'}
          </button>
          <button onClick={handleSubmit} className="bg-primary-container text-on-primary-container text-sm font-bold px-6 py-2.5 rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:scale-105 transition-transform">Submit Answer</button>
        </div>
      </div>

      {/* 3-Panel Layout */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Left Panel: Context */}
        <div className="w-1/3 bg-surface-container-low border-r border-outline-variant/10 overflow-y-auto p-8 flex flex-col gap-10">
          <div>
            <h2 className="text-[12px] font-mono font-bold tracking-[0.2em] uppercase text-on-surface-variant mb-4">Context</h2>
            <p className="text-on-surface leading-relaxed text-[15px]">Design a distributed rate limiter to enforce API usage quotas. The system must handle 10 million active users globally, with an average request rate of 50K RPS across the fleet. Spikes can go up to 500K RPS.</p>
          </div>
          <div>
            <h2 className="text-[12px] font-mono font-bold tracking-[0.2em] uppercase text-on-surface-variant mb-4">Requirements</h2>
            <ul className="text-on-surface text-[14px] leading-relaxed space-y-3 list-disc list-outside ml-4">
              <li>Accurately limit requests based on a defined policy per user (e.g., 100 req/min).</li>
              <li>Low latency overhead (must not add more than 5ms to the API request path).</li>
              <li>Highly available and fault-tolerant.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-[12px] font-mono font-bold tracking-[0.2em] uppercase text-on-surface-variant mb-4">Constraints</h2>
            <ul className="text-on-surface text-[14px] leading-relaxed space-y-3 list-disc list-outside ml-4">
              <li>Data inconsistency during network partitions should be minimized but availability prioritized (AP system).</li>
              <li>Deployed across 3 disparate geographical regions.</li>
            </ul>
          </div>
          <div className={`bg-tertiary-container/10 border border-tertiary/20 rounded-2xl overflow-hidden transition-all ${showHint ? '' : 'cursor-pointer'}`}>
            <div className="p-5 flex items-center gap-4" onClick={() => setShowHint(!showHint)}>
              <span className="material-symbols-outlined text-tertiary shrink-0">tips_and_updates</span>
              <h4 className="text-sm font-bold text-tertiary flex-1">Architectural Hint</h4>
              <span className={`material-symbols-outlined text-tertiary transition-transform ${showHint ? 'rotate-180' : ''}`}>expand_more</span>
            </div>
            {showHint && (
              <div className="px-5 pb-5">
                <p className="text-xs text-on-surface-variant leading-relaxed">Consider utilizing a sliding window log or sliding window counter algorithm stored in an in-memory database like Redis using Lua scripts for atomicity.</p>
              </div>
            )}
          </div>
        </div>

        {/* Center Panel: Answer Workspace */}
        <div className="w-1/3 bg-surface-container-lowest flex flex-col relative group">
          <div className="absolute top-4 right-4 flex bg-surface-container rounded-lg p-1 border border-outline-variant/10 z-10 shadow-ambient opacity-50 group-hover:opacity-100 transition-opacity">
            {['Text Answer', 'Code Editor', 'Diagram Canvas'].map(fmt => (
              <button key={fmt} onClick={() => setFormat(fmt)} className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${format === fmt ? 'bg-surface-container-highest text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}>
                {fmt}
              </button>
            ))}
          </div>
          <textarea value={content} onChange={(e) => setContent(e.target.value)}
            className={`flex-1 w-full bg-transparent text-on-surface p-8 pt-20 resize-none focus:outline-none focus:ring-1 focus:ring-inset focus:ring-primary/20 placeholder:text-on-surface-variant/50 leading-relaxed text-[15px] ${format === 'Code Editor' ? 'font-mono' : ''}`}
            placeholder={format === 'Code Editor' ? '// Start writing your solution here...' : 'Start typing your architectural approach here...'}
          ></textarea>
          <div className="absolute bottom-4 right-6 font-mono text-[11px] text-on-surface-variant bg-surface px-2 py-1 rounded shadow-ambient pointer-events-none">
            {content.trim().split(/\s+/).filter(x => x.length > 0).length} words | {content.split('\n').length} lines
          </div>
        </div>

        {/* Right Panel: AI Live Feedback */}
        <div className="w-1/3 bg-surface-container border-l border-outline-variant/10 flex flex-col pt-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 blur-[80px] rounded-full pointer-events-none"></div>
          <div className="px-8 flex items-center justify-between mb-8">
            <h2 className="text-sm font-label font-bold uppercase tracking-widest text-on-surface flex items-center gap-2 relative z-10">
              <span className="material-symbols-outlined text-secondary animate-pulse text-[18px]">wifi</span> AI Live Feedback
            </h2>
            <span className="text-[10px] bg-secondary-container/20 text-secondary border border-secondary-container rounded-full px-2 py-0.5 tracking-widest uppercase font-mono shadow-[0_0_10px_rgba(78,222,163,0.1)]">Active</span>
          </div>
          <div className="px-8 flex flex-col gap-3 flex-1 overflow-y-auto mb-8 relative z-10 pr-4">
            {content.length > 20 && <div className="bg-surface-container-high border border-secondary/30 rounded-[16px] p-4 flex gap-3 shadow-ambient">
              <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">check_circle</span>
              <p className="text-sm text-on-surface leading-snug">Strong start. Mentioning storage handles the low latency constraint well.</p>
            </div>}
            {content.length > 50 && <div className="bg-surface-container-high border border-tertiary/40 rounded-[16px] p-4 flex gap-3 shadow-ambient">
              <span className="material-symbols-outlined text-tertiary text-[20px] shrink-0 mt-0.5">warning</span>
              <p className="text-sm text-on-surface leading-snug">You haven't addressed the geographical deployment constraint yet.</p>
            </div>}
            {content.length > 100 && <div className="bg-surface-container-high border border-error/30 rounded-[16px] p-4 flex gap-3 shadow-ambient">
              <span className="material-symbols-outlined text-error text-[20px] shrink-0 mt-0.5">cancel</span>
              <p className="text-sm text-on-surface leading-snug">Missing CAP theorem consideration — explicitly hinted in the constraints.</p>
            </div>}
            {content.length === 0 && <div className="text-center text-on-surface-variant text-sm py-12 opacity-50">Start typing to receive live AI feedback...</div>}
          </div>
          <div className="mt-auto px-8 pb-8 relative z-10 border-t border-outline-variant/10 pt-6 bg-surface-container/80 backdrop-blur-md">
            <div className="mb-6">
              <h4 className="text-[10px] uppercase font-mono tracking-widest text-on-surface-variant mb-3">Required Concepts</h4>
              <div className="flex flex-wrap gap-2">
                {['Redis Lua', 'Token Bucket', 'CRDTs', 'Gossip Protocol', 'API Gateway'].map((kw) => {
                  const found = content.toLowerCase().includes(kw.toLowerCase().split(' ')[0].toLowerCase());
                  return <span key={kw} className={`px-2.5 py-1 text-[11px] font-bold rounded-md border ${found ? 'bg-secondary/10 border-secondary/50 text-secondary' : 'bg-surface-container-highest border-outline-variant/30 text-on-surface-variant'}`}>{kw}</span>;
                })}
              </div>
            </div>
            <div className="bg-glass rounded-2xl p-5 border border-outline-variant/20 shadow-ambient">
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-xs font-bold text-on-surface">Score Projection</span>
                <span className="text-2xl font-extrabold text-tertiary">{Math.min(100, 30 + Math.floor(content.length / 5))}/100</span>
              </div>
              <div className="h-2 w-full bg-surface-container-lowest rounded-full overflow-hidden border border-outline-variant/10">
                <div className="h-full bg-gradient-to-r from-error via-tertiary to-secondary transition-all duration-1000 ease-in-out" style={{width: `${Math.min(100, 30 + Math.floor(content.length / 5))}%`}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
