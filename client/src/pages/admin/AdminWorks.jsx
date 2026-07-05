import { useEffect, useState } from 'react';
import { adminCreateWork, adminDeleteWork, adminGetWorks, adminUpdateWork } from '../../api/admin';
import ImageField from '../../components/admin/ImageField';
import { AdminAlert, AdminButton, AdminCard, AdminInput, AdminLabel } from '../../components/admin/AdminUI';

const emptyWork = {
  title: '',
  description: '',
  category: '',
  accent: '#4a90d9',
  icon: 'mdi:play-circle',
  thumbnail: '',
  videoUrl: '',
  order: 0,
  date: new Date().toISOString().slice(0, 10),
};

export default function AdminWorks() {
  const [works, setWorks] = useState([]);
  const [form, setForm] = useState(emptyWork);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  async function load() {
    const data = await adminGetWorks();
    setWorks(data);
  }

  useEffect(() => {
    load()
      .catch(() => setError('Failed to load works'))
      .finally(() => setLoading(false));
  }, []);

  function resetForm() {
    setForm(emptyWork);
    setEditingId(null);
  }

  function startEdit(work) {
    setEditingId(work._id);
    setForm({
      title: work.title,
      description: work.description,
      category: work.category,
      accent: work.accent || '#4a90d9',
      icon: work.icon || 'mdi:play-circle',
      thumbnail: work.thumbnail || '',
      videoUrl: work.videoUrl || '',
      order: work.order || 0,
      date: work.date ? new Date(work.date).toISOString().slice(0, 10) : '',
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const payload = { ...form, order: Number(form.order), date: new Date(form.date) };

    try {
      if (editingId) {
        await adminUpdateWork(editingId, payload);
      } else {
        await adminCreateWork(payload);
      }
      await load();
      resetForm();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save work item');
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this work item?')) return;
    try {
      await adminDeleteWork(id);
      await load();
      if (editingId === id) resetForm();
    } catch {
      setError('Failed to delete work item');
    }
  }

  if (loading) return <p className="text-sm text-xghoststroke">Loading works...</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-xstroke">Work Gallery</h1>
        <p className="mt-1 text-sm text-xghoststroke">Add and edit portfolio work items</p>
      </div>

      {error && <AdminAlert>{error}</AdminAlert>}

      <AdminCard title={editingId ? 'Edit work item' : 'Add work item'}>
        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <AdminLabel>Title</AdminLabel>
            <AdminInput value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </div>
          <div className="sm:col-span-2">
            <AdminLabel>Description</AdminLabel>
            <AdminInput value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
          </div>
          <div>
            <AdminLabel>Category</AdminLabel>
            <AdminInput value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
          </div>
          <div>
            <AdminLabel>Date</AdminLabel>
            <AdminInput type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </div>
          <div>
            <AdminLabel>Accent color</AdminLabel>
            <AdminInput value={form.accent} onChange={(e) => setForm({ ...form, accent: e.target.value })} />
          </div>
          <div>
            <AdminLabel>Icon (Iconify)</AdminLabel>
            <AdminInput value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="mdi:heart" />
          </div>
          <div className="sm:col-span-2">
            <ImageField
              label="Cover image (optional)"
              value={form.thumbnail}
              onChange={(thumbnail) => setForm({ ...form, thumbnail })}
              hint="Optional image — icon is used on the site if this is empty"
            />
          </div>
          <div className="sm:col-span-2">
            <AdminLabel>Video / project link (optional)</AdminLabel>
            <AdminInput
              value={form.videoUrl}
              onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
              placeholder="https://youtube.com/watch?v=..."
            />
          </div>
          <div>
            <AdminLabel>Order</AdminLabel>
            <AdminInput type="number" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} />
          </div>
          <div className="flex gap-2 sm:col-span-2">
            <AdminButton type="submit">{editingId ? 'Update' : 'Add'} Work</AdminButton>
            {editingId && (
              <AdminButton type="button" variant="ghost" onClick={resetForm}>
                Cancel
              </AdminButton>
            )}
          </div>
        </form>
      </AdminCard>

      <AdminCard title={`All work (${works.length})`}>
        <div className="space-y-3">
          {works.map((work) => (
            <div key={work._id} className="flex flex-col gap-3 rounded-xl border border-xline bg-xblank p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                {work.thumbnail && (
                  <img src={work.thumbnail} alt="" className="h-12 w-12 rounded-lg object-cover" />
                )}
                <div>
                <p className="font-semibold text-xstroke">{work.title}</p>
                <p className="text-xs text-xghoststroke">
                  {work.category} · order {work.order}
                </p>
                </div>
              </div>
              <div className="flex gap-2">
                <AdminButton variant="ghost" onClick={() => startEdit(work)}>
                  Edit
                </AdminButton>
                <AdminButton variant="danger" onClick={() => handleDelete(work._id)}>
                  Delete
                </AdminButton>
              </div>
            </div>
          ))}
          {!works.length && <p className="text-sm text-xghoststroke">No work items yet.</p>}
        </div>
      </AdminCard>
    </div>
  );
}