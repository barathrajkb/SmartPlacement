import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export function Header() {
  const [showNotifs, setShowNotifs] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { currentUser, userData, logout } = useAuth();
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  const calculateReadiness = () => {
    if (!userData?.skills) return 0;
    const skills = Object.values(userData.skills);
    const avg = skills.reduce((a, b) => a + b, 0) / skills.length;
    return Math.round(avg * 20);
  };

  const readiness = calculateReadiness();

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifs(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setShowUserMenu(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (q.includes('company') || q.includes('google') || q.includes('meta')) navigate('/companies');
      else if (q.includes('resume')) navigate('/resume');
      else if (q.includes('coach')) navigate('/coach');
      else if (q.includes('roadmap') || q.includes('plan')) navigate('/roadmap');
      else if (q.includes('mock') || q.includes('interview')) navigate('/mock-interview');
      else if (q.includes('analytic') || q.includes('progress')) navigate('/analytics');
      else if (q.includes('resource') || q.includes('learn')) navigate('/resources');
      else if (q.includes('schedule') || q.includes('calendar')) navigate('/scheduler');
      else if (q.includes('collab') || q.includes('hive') || q.includes('peer')) navigate('/collaborate');
      else if (q.includes('setting')) navigate('/settings');
      else navigate('/resources');
      setSearchQuery('');
    }
  };

  const notifications = [
    { icon: 'psychology', text: 'AI Coach suggests reviewing CAP theorem today.', time: '2m ago', color: 'text-primary' },
    { icon: 'calendar_month', text: `Next session for ${userData?.targetCompanies?.[0] || 'Google'} tomorrow at 3 PM.`, time: '1h ago', color: 'text-secondary' },
    { icon: 'timer', text: 'Application deadline for top targets in 2 days.', time: '3h ago', color: 'text-tertiary' },
    { icon: 'trending_up', text: `Readiness reached ${readiness}%!`, time: '1d ago', color: 'text-secondary' },
  ];

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-surface/80 backdrop-blur-xl z-20 flex items-center justify-between px-8 shadow-ambient border-b border-outline-variant/10">
      
      {/* Global Search */}
      <div className="flex-1 max-w-md">
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[20px]">search</span>
          <input 
            type="text" 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Search intelligence, companies, roles..." 
            className="w-full bg-surface-container-highest text-on-surface rounded-full py-2 pl-10 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-on-surface-variant"
          />
        </div>
      </div>

      {/* Right User Controls */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button onClick={() => setShowNotifs(!showNotifs)} className="relative text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-[2px] right-[2px] w-2 h-2 bg-tertiary rounded-full shadow-ambient"></span>
          </button>

          {showNotifs && (
            <div className="absolute top-12 right-0 w-[380px] bg-surface-container rounded-2xl shadow-ambient border border-outline-variant/10 overflow-hidden z-50 animate-in">
              <div className="p-4 border-b border-outline-variant/10 flex justify-between items-center">
                <h3 className="font-bold text-sm">Notifications</h3>
                <button onClick={() => setShowNotifs(false)} className="text-xs text-primary font-bold">Mark all read</button>
              </div>
              <div className="max-h-[320px] overflow-y-auto">
                {notifications.map((n, i) => (
                  <div key={i} className="flex gap-3 p-4 hover:bg-surface-container-high cursor-pointer transition-colors border-b border-outline-variant/5 last:border-0">
                    <span className={`material-symbols-outlined ${n.color} text-[20px] mt-0.5 shrink-0`}>{n.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm text-on-surface leading-snug font-medium">{n.text}</p>
                      <span className="text-[10px] text-on-surface-variant font-mono mt-1 block">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="h-8 w-[1px] bg-outline-variant/30"></div>

        <div className="relative" ref={userRef}>
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setShowUserMenu(!showUserMenu)}>
            <div className="flex flex-col items-end">
              <span className="text-sm font-bold text-on-surface leading-tight">{userData?.profile?.name || currentUser?.email?.split('@')[0] || 'User'}</span>
              <span className="text-[10px] font-mono text-secondary uppercase tracking-widest leading-tight mt-0.5">Readiness: {readiness}%</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-surface-container-highest border-2 border-primary-container flex items-center justify-center text-primary font-bold overflow-hidden shadow-ambient hover:scale-105 transition-transform">
               <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${currentUser?.email || 'Alex'}&backgroundColor=transparent`} alt="avatar" className="w-full h-full object-cover" />
            </div>
          </div>

          {showUserMenu && (
            <div className="absolute top-12 right-0 w-[200px] bg-surface-container rounded-2xl shadow-ambient border border-outline-variant/10 overflow-hidden z-50 animate-in">
              <div className="flex flex-col">
                <button onClick={() => { setShowUserMenu(false); navigate('/settings'); }} className="flex items-center gap-2 px-4 py-3 text-sm text-left hover:bg-surface-container-high transition-colors text-on-surface">
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant">settings</span> Settings
                </button>
                <div className="h-[1px] bg-outline-variant/10"></div>
                <button onClick={async () => { await logout(); navigate('/auth'); }} className="flex items-center gap-2 px-4 py-3 text-sm text-left hover:bg-error/10 text-error transition-colors">
                  <span className="material-symbols-outlined text-[18px]">logout</span> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

    </header>
  );
}
