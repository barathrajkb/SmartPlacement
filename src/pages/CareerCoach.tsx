import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Message { role: 'user' | 'ai'; text: string; }

const aiResponses = [
  "Based on your current readiness score of 78%, I'd recommend focusing on System Design today. Your mock interview scores in this area have been declining. Let's start with CAP theorem fundamentals — can you explain the trade-offs between Consistency, Availability, and Partition Tolerance?",
  "Great question! For your Google L4 preparation, the most critical areas are:\n\n1. **Graph algorithms** — BFS/DFS on grids, shortest path\n2. **Dynamic Programming** — Top-down vs bottom-up, state optimization\n3. **System Design** — URL shortener, rate limiter, notification system\n\nI'd suggest spending 60% of your time on coding and 40% on system design at this stage.",
  "Looking at your resume, I notice a few areas for improvement:\n\n• Your bullet points lack quantifiable metrics. Instead of 'Improved performance', try 'Reduced API latency by 40% serving 2M daily requests'\n• Consider adding your open-source contributions\n• The skills section could be reorganized by proficiency level\n\nWould you like me to help rewrite specific sections?",
  "For behavioral interviews, I recommend the STAR method:\n\n**S**ituation → **T**ask → **A**ction → **R**esult\n\nPrepare stories for these common themes:\n- Conflict resolution with a teammate\n- A time you failed and learned from it\n- Leading without authority\n- Making a decision with incomplete data\n\nShall I help you structure a specific story?",
  "Your weak areas based on recent mock performance:\n\n🔴 **Dynamic Programming** — 45% accuracy (needs significant work)\n🟡 **Graph Traversal** — 65% accuracy (getting there)\n🟢 **Arrays/Strings** — 88% accuracy (strong)\n\nI recommend dedicating the next 3 days exclusively to DP patterns. Start with the 'climbing stairs' family of problems.",
];

export default function CareerCoach() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeConvo, setActiveConvo] = useState(0);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: 'user', text: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiReply: Message = { role: 'ai', text: aiResponses[messages.length % aiResponses.length] };
      setMessages(prev => [...prev, aiReply]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  };

  const startNewConvo = () => { setMessages([]); setActiveConvo(-1); };

  const convos = [
    { title: 'System Design: Capacity Estimation', time: '2 hours ago' },
    { title: 'Resume Review Feedback', time: 'Yesterday' },
    { title: 'Behavioral: Conflict Resolution', time: 'Apr 12' },
    { title: 'Google L4 Preparation Plan', time: 'Apr 10' },
    { title: 'Dynamic Programming Patterns', time: 'Apr 05' },
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background">
      
      {/* Left — Conversation History */}
      <div className="w-80 bg-surface-container-low border-r border-outline-variant/10 flex flex-col pt-6 z-10 shadow-ambient">
        <div className="px-6 mb-6">
          <button onClick={startNewConvo} className="w-full bg-primary-container text-on-primary-container font-bold px-4 py-3 rounded-xl shadow-[0_0_15px_rgba(79,70,229,0.2)] hover:scale-[1.02] transition-transform flex justify-center items-center gap-2">
            <span className="material-symbols-outlined">add</span> New Conversation
          </button>
        </div>
        <div className="px-6 mb-4"><h2 className="text-lg font-bold">Conversations</h2></div>
        <div className="flex-1 overflow-y-auto px-4 space-y-2 pb-6">
          {convos.map((convo, i) => (
            <div key={i} onClick={() => { setActiveConvo(i); setMessages([]); }} className={`p-4 rounded-xl cursor-pointer transition-colors border-l-4 ${activeConvo === i ? 'bg-surface-container border-primary' : 'bg-surface-container-highest border-transparent hover:bg-surface-container'}`}>
              <h3 className="text-sm font-bold truncate text-on-surface mb-1">{convo.title}</h3>
              <span className="text-[10px] text-on-surface-variant font-mono">{convo.time}</span>
            </div>
          ))}
        </div>
        <div className="p-6 border-t border-outline-variant/10 bg-surface-container/50">
          <h4 className="text-[10px] uppercase font-mono tracking-widest text-on-surface-variant mb-4">Live Readiness Stats</h4>
          <div className="space-y-3">
            {[{ label: 'Coding Fluency', val: 82 }, { label: 'System Design', val: 76 }, { label: 'Behavioral', val: 90 }].map(stat => (
              <div key={stat.label}>
                <div className="flex justify-between text-[10px] font-bold mb-1"><span>{stat.label}</span><span className="text-secondary">{stat.val}</span></div>
                <div className="h-1 bg-surface-container-highest rounded-full overflow-hidden"><div className="h-full bg-primary" style={{width: `${stat.val}%`}}></div></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Center — Chat Interface */}
      <div className="flex-1 flex flex-col bg-surface relative">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-surface to-surface">
            <div className="w-20 h-20 rounded-3xl bg-primary-container/20 border border-primary-container shadow-[0_0_40px_rgba(79,70,229,0.2)] flex items-center justify-center mb-8">
              <span className="material-symbols-outlined text-[48px] text-primary">smart_toy</span>
            </div>
            <h1 className="text-3xl font-extrabold mb-4">Ask me anything about your placement journey.</h1>
            <p className="text-on-surface-variant max-w-md mx-auto text-sm leading-relaxed mb-12">I can review your system architecture, conduct mock interviews, explain complex algorithms, or help construct behavioral answers.</p>
            <div className="grid grid-cols-2 gap-4 max-w-2xl w-full">
              {[
                { icon: 'architecture', text: 'Review my rate limiter design' },
                { icon: 'code', text: 'Explain KMP algorithm simply' },
                { icon: 'description', text: 'Critique my resume summary' },
                { icon: 'psychology', text: 'Start a behavioral mock' }
              ].map((chip, i) => (
                <button key={i} onClick={() => sendMessage(chip.text)} className="flex flex-col gap-2 items-start p-4 bg-surface-container-low rounded-2xl border border-outline-variant/10 hover:border-primary/40 hover:bg-surface-container transition-all text-left">
                  <span className="material-symbols-outlined text-primary text-[20px]">{chip.icon}</span>
                  <span className="text-sm font-semibold text-on-surface-variant">{chip.text}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div ref={chatRef} className="flex-1 overflow-y-auto p-8 space-y-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center shrink-0 mr-3 mt-1">
                    <span className="material-symbols-outlined text-[16px] text-on-primary-container">smart_toy</span>
                  </div>
                )}
                <div className={`max-w-[70%] p-4 text-sm leading-relaxed whitespace-pre-wrap ${msg.role === 'user' ? 'bg-primary-container/20 rounded-2xl rounded-br-sm text-on-surface' : 'bg-surface-container rounded-2xl rounded-bl-sm text-on-surface'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center shrink-0 mr-3 mt-1">
                  <span className="material-symbols-outlined text-[16px] text-on-primary-container">smart_toy</span>
                </div>
                <div className="bg-surface-container rounded-2xl rounded-bl-sm p-4 flex gap-1">
                  <div className="w-2 h-2 bg-on-surface-variant rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-on-surface-variant rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-on-surface-variant rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Input Box */}
        <div className="p-8 pt-0 w-full max-w-4xl mx-auto shrink-0 relative mt-auto">
          {messages.length === 0 && (
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2 absolute bottom-[100%] left-8 right-8">
              {['Analyze my weak areas', 'What should I study today?', 'Review my resume', 'FAANG interview patterns'].map(chip => (
                <button key={chip} onClick={() => sendMessage(chip)} className="px-4 py-2 bg-surface-container-high rounded-full text-xs font-semibold whitespace-nowrap text-on-surface-variant hover:text-on-surface border border-outline-variant/10 hover:border-primary/30 transition-colors">
                  {chip}
                </button>
              ))}
            </div>
          )}
          <div className="bg-surface-container rounded-3xl p-2 pl-6 shadow-[0_-10px_40px_rgba(6,14,32,0.5)] border border-outline-variant/10 flex items-center focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
            <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Message AI Coach..." className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-4 resize-none h-[56px] min-h-[56px] text-on-surface placeholder:text-on-surface-variant/50 leading-relaxed font-medium" />
            <button onClick={() => sendMessage(input)} disabled={!input.trim() || isTyping} className="w-12 h-12 rounded-2xl bg-primary-container text-on-primary-container shadow-ambient flex items-center justify-center shrink-0 ml-4 hover:scale-105 transition-transform disabled:opacity-40 disabled:hover:scale-100">
              <span className="material-symbols-outlined text-[20px]">send</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right — Context Panel */}
      <div className="w-72 bg-surface-container-low border-l border-outline-variant/10 p-6 flex flex-col z-10 shadow-[-20px_0_40px_rgba(6,14,32,0.4)] overflow-y-auto hidden xl:flex">
        <div className="bg-surface-container rounded-[20px] p-5 shadow-ambient border border-outline-variant/10 mb-8 flex items-center gap-4">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full -rotate-90"><circle cx="28" cy="28" r="24" className="stroke-surface-container-highest" strokeWidth="4" fill="none" /><circle cx="28" cy="28" r="24" className="stroke-secondary" strokeWidth="4" fill="none" strokeDasharray="150" strokeDashoffset="33" strokeLinecap="round" /></svg>
            <span className="text-secondary font-bold text-sm">78%</span>
          </div>
          <div><h3 className="font-bold text-sm">Readiness</h3><span className="font-mono text-[10px] uppercase text-primary tracking-widest leading-tight">Apprentice II</span></div>
        </div>
        <div className="mb-8">
          <h4 className="text-[10px] uppercase font-mono tracking-widest text-on-surface-variant mb-4">Focus Context</h4>
          <div className="flex flex-wrap gap-2">
            {['Google', 'Meta', 'Swiggy'].map(cmp => (<span key={cmp} className="bg-surface-container-highest px-3 py-1.5 rounded-lg text-xs font-semibold border border-outline-variant/10">{cmp}</span>))}
          </div>
        </div>
        <div className="bg-primary/5 rounded-[20px] p-5 border border-primary/20 mb-8 relative overflow-hidden flex-1">
          <span className="material-symbols-outlined absolute top-2 right-2 text-[60px] text-primary opacity-5">lightbulb</span>
          <h4 className="text-[10px] uppercase font-mono tracking-widest text-primary mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-[14px]">psychology</span> Session Insights</h4>
          <ul className="text-xs text-on-surface-variant space-y-3 leading-relaxed list-disc ml-3 font-medium">
            <li>User struggles with estimating write capacities during System Design.</li>
            <li>Recommended revisiting Consistent Hashing vs. Sharding tradeoffs.</li>
          </ul>
        </div>
        <div className="flex flex-col gap-2 mt-auto pb-4">
          <h4 className="text-[10px] uppercase font-mono tracking-widest text-on-surface-variant mb-2">Quick Actions</h4>
          {[
            { icon: 'psychology', text: 'Start Mock Interview', path: '/mock-interview' },
            { icon: 'map', text: 'View Roadmap', path: '/roadmap' },
            { icon: 'description', text: 'Build Resume', path: '/resume' }
          ].map((action, i) => (
            <Link to={action.path} key={i} className="flex items-center gap-3 w-full bg-surface-container hover:bg-surface-container-highest p-3 rounded-xl border border-outline-variant/10 transition-colors text-left group">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant group-hover:text-primary transition-colors">{action.icon}</span>
              <span className="text-xs font-bold text-on-surface-variant group-hover:text-on-surface transition-colors">{action.text}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
