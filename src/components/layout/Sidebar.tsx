import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
  { name: 'AI Roadmap', path: '/roadmap', icon: 'map' },
  { name: 'Company Intelligence', path: '/companies', icon: 'corporate_fare' },
  { name: 'Mock Interview', path: '/mock-interview', icon: 'psychology' },
  { name: 'Progress Analytics', path: '/analytics', icon: 'analytics' },
  { name: 'Peer Collaboration', path: '/collaborate', icon: 'group' },
  { name: 'Resume Builder', path: '/resume', icon: 'description' },
  { name: 'AI Career Coach', path: '/coach', icon: 'smart_toy' },
  { name: 'Resource Library', path: '/resources', icon: 'library_books' },
  { name: 'Interview Scheduler', path: '/scheduler', icon: 'calendar_month' },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-surface-container flex flex-col z-20 shadow-ambient border-r border-outline-variant/10">
      <div className="p-6 pb-2">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-on-primary-container shadow-ambient">
            <span className="material-symbols-outlined">rocket_launch</span>
          </div>
          <span className="text-xl font-extrabold text-primary tracking-tight">SmartPlacement</span>
        </div>
        <span className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-semibold pl-[3.25rem]">
          Career Intelligence
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto mt-6 px-3 flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              twMerge(
                clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all',
                  isActive
                    ? 'bg-primary-container/20 text-primary border-r-4 border-primary-container'
                    : 'text-on-surface-variant hover:bg-primary-container/10 hover:text-primary'
                )
              )
            }
          >
            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-outline-variant/10">
        <NavLink
            to="/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-on-surface-variant hover:bg-primary-container/10 hover:text-primary transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">settings</span>
            Settings
          </NavLink>
      </div>
    </aside>
  );
}
