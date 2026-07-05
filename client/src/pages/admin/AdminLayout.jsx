import { Icon } from '@iconify/react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { clearAdminKey } from '../../api/admin';
import ThemeSwitcher from '../../components/ThemeSwitcher';

const navItems = [
  { to: '/admin', label: 'Overview', icon: 'mdi:view-dashboard', end: true },
  { to: '/admin/profile', label: 'Profile', icon: 'mdi:account-circle' },
  { to: '/admin/works', label: 'Work', icon: 'mdi:briefcase' },
  { to: '/admin/projects', label: 'Projects', icon: 'mdi:movie-open' },
  { to: '/admin/messages', label: 'Messages', icon: 'mdi:email' },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    clearAdminKey();
    navigate('/admin/login');
  }

  return (
    <div className="min-h-dvh bg-xbg">
      <header className="border-b border-xline bg-xheader px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <h1 className="font-title text-lg font-semibold text-xheader-text">Priyansh Admin</h1>
            <p className="text-xs text-xheader-text/70">Portfolio content manager</p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeSwitcher variant="inverse" />
            <a href="/" target="_blank" rel="noreferrer" className="text-sm text-xheader-text/80 hover:text-xyellow">
              View site ↗
            </a>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-xheader-text/30 px-3 py-1.5 text-sm text-xheader-text hover:bg-white/10"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:flex-row sm:px-6">
        <aside className="shrink-0 sm:w-52">
          <nav className="flex gap-2 overflow-x-auto sm:flex-col sm:overflow-visible">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                    isActive ? 'bg-xbtn text-xbtn-text' : 'bg-xsurface text-xstroke hover:bg-xarrow'
                  }`
                }
              >
                <Icon icon={item.icon} className="text-lg" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}