import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminGetMessages, adminGetProfile, adminGetProjects, adminGetWorks } from '../../api/admin';
import { AdminAlert, AdminCard, AdminStat } from '../../components/admin/AdminUI';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ works: 0, projects: 0, messages: 0, name: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([adminGetProfile(), adminGetWorks(), adminGetProjects(), adminGetMessages()])
      .then(([profile, works, projects, messages]) => {
        setStats({
          name: profile.name,
          works: works.length,
          projects: projects.length,
          messages: messages.length,
        });
      })
      .catch(() => setError('Failed to load dashboard data'));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-xstroke">Overview</h1>
        <p className="mt-1 text-sm text-xghoststroke">
          Welcome back{stats.name ? `, ${stats.name}` : ''}. Manage your portfolio from here.
        </p>
      </div>

      {error && <AdminAlert>{error}</AdminAlert>}

      <div className="grid gap-4 sm:grid-cols-3">
        <AdminStat label="Work items" value={stats.works} />
        <AdminStat label="Projects" value={stats.projects} />
        <AdminStat label="Messages" value={stats.messages} />
      </div>

      <AdminCard title="Quick actions">
        <div className="grid gap-3 sm:grid-cols-2">
          <Link to="/admin/profile" className="rounded-xl border border-xline bg-xblank p-4 hover:border-xblue">
            <p className="font-semibold text-xstroke">Edit Profile</p>
            <p className="mt-1 text-xs text-xghoststroke">Name, bio, social links</p>
          </Link>
          <Link to="/admin/works" className="rounded-xl border border-xline bg-xblank p-4 hover:border-xblue">
            <p className="font-semibold text-xstroke">Manage Work</p>
            <p className="mt-1 text-xs text-xghoststroke">Add or edit gallery items</p>
          </Link>
          <Link to="/admin/projects" className="rounded-xl border border-xline bg-xblank p-4 hover:border-xblue">
            <p className="font-semibold text-xstroke">Manage Projects</p>
            <p className="mt-1 text-xs text-xghoststroke">Showreels and featured edits</p>
          </Link>
          <Link to="/admin/messages" className="rounded-xl border border-xline bg-xblank p-4 hover:border-xblue">
            <p className="font-semibold text-xstroke">View Messages</p>
            <p className="mt-1 text-xs text-xghoststroke">Contact form submissions</p>
          </Link>
        </div>
      </AdminCard>
    </div>
  );
}