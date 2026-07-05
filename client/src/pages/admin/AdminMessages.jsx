import { useEffect, useState } from 'react';
import { adminDeleteMessage, adminGetMessages } from '../../api/admin';
import { AdminAlert, AdminButton, AdminCard } from '../../components/admin/AdminUI';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  async function load() {
    const data = await adminGetMessages();
    setMessages(data);
  }

  useEffect(() => {
    load()
      .catch(() => setError('Failed to load messages'))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id) {
    if (!confirm('Delete this message?')) return;
    try {
      await adminDeleteMessage(id);
      await load();
    } catch {
      setError('Failed to delete message');
    }
  }

  if (loading) return <p className="text-sm text-xghoststroke">Loading messages...</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-xstroke">Messages</h1>
        <p className="mt-1 text-sm text-xghoststroke">Contact form submissions from your portfolio</p>
      </div>

      {error && <AdminAlert>{error}</AdminAlert>}

      <AdminCard title={`Inbox (${messages.length})`}>
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg._id} className="rounded-xl border border-xline bg-xblank p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-semibold text-xstroke">{msg.name}</p>
                  <a href={`mailto:${msg.email}`} className="text-sm text-xblue hover:underline">
                    {msg.email}
                  </a>
                  <p className="mt-1 text-xs text-xghoststroke">
                    {new Date(msg.createdAt).toLocaleString()}
                  </p>
                </div>
                <AdminButton variant="danger" onClick={() => handleDelete(msg._id)}>
                  Delete
                </AdminButton>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-xstroke">{msg.message}</p>
            </div>
          ))}
          {!messages.length && <p className="text-sm text-xghoststroke">No messages yet.</p>}
        </div>
      </AdminCard>
    </div>
  );
}