import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { getAdminKey, verifyAdminKey } from '../../api/admin';
import ThemeSwitcher from '../../components/ThemeSwitcher';
import { AdminAlert, AdminButton, AdminCard, AdminInput, AdminLabel } from '../../components/admin/AdminUI';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (getAdminKey()) {
    return <Navigate to="/admin" replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await verifyAdminKey(apiKey.trim());
      navigate('/admin');
    } catch {
      setError('Invalid API key. Check ADMIN_API_KEY in server/.env');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-dvh items-center justify-center bg-xblank px-4">
      <div className="absolute top-4 right-4">
        <ThemeSwitcher variant="surface" />
      </div>
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="font-serif text-3xl text-xstroke">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-xghoststroke">Sign in with your API key to manage portfolio content</p>
        </div>

        <AdminCard>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <AdminLabel>API Key</AdminLabel>
              <AdminInput
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter admin API key"
                required
              />
            </div>

            {error && <AdminAlert>{error}</AdminAlert>}

            <AdminButton type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </AdminButton>
          </form>
        </AdminCard>

        <p className="mt-6 text-center text-sm text-xghoststroke">
          <Link to="/" className="link font-semibold">
            ← Back to portfolio
          </Link>
        </p>
      </div>
    </div>
  );
}