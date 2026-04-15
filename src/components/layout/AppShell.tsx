import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function AppShell() {
  return (
    <div className="flex bg-background min-h-screen text-on-surface">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <Header />
        <main className="flex-1 pt-16 mt-8 overflow-x-hidden relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
