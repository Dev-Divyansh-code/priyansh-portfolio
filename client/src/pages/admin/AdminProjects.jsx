import { useEffect, useState } from 'react';
import { adminCreateProject, adminDeleteProject, adminGetProjects, adminUpdateProject } from '../../api/admin';
import ImageField from '../../components/admin/ImageField';
import { AdminAlert, AdminButton, AdminCard, AdminInput, AdminLabel, AdminTextarea } from '../../components/admin/AdminUI';

const TAG_OPTIONS = ['premiere', 'aftereffects', 'davinci', 'wedding', 'corporate', 'reel'];

const emptyProject = {
  title: '',
  description: '',
  thumbnail: '',
  tags: [],
  links: '',
  order: 0,
};

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyProject);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  async function load() {
    const data = await adminGetProjects();
    setProjects(data);
  }

  useEffect(() => {
    load()
      .catch(() => setError('Failed to load projects'))
      .finally(() => setLoading(false));
  }, []);

  function resetForm() {
    setForm(emptyProject);
    setEditingId(null);
  }

  function startEdit(project) {
    setEditingId(project._id);
    setForm({
      title: project.title,
      description: project.description,
      thumbnail: project.thumbnail,
      tags: project.tags || [],
      links: (project.links || []).join('\n'),
      order: project.order || 0,
    });
  }

  function toggleTag(tag) {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag],
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const payload = {
      title: form.title,
      description: form.description,
      thumbnail: form.thumbnail,
      tags: form.tags,
      links: form.links.split('\n').map((s) => s.trim()).filter(Boolean),
      order: Number(form.order),
    };

    try {
      if (editingId) {
        await adminUpdateProject(editingId, payload);
      } else {
        await adminCreateProject(payload);
      }
      await load();
      resetForm();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save project');
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this project?')) return;
    try {
      await adminDeleteProject(id);
      await load();
      if (editingId === id) resetForm();
    } catch {
      setError('Failed to delete project');
    }
  }

  if (loading) return <p className="text-sm text-xghoststroke">Loading projects...</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-xstroke">Projects</h1>
        <p className="mt-1 text-sm text-xghoststroke">Manage featured projects and showreels</p>
      </div>

      {error && <AdminAlert>{error}</AdminAlert>}

      <AdminCard title={editingId ? 'Edit project' : 'Add project'}>
        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <AdminLabel>Title</AdminLabel>
            <AdminInput value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </div>
          <div className="sm:col-span-2">
            <AdminLabel>Description</AdminLabel>
            <AdminInput value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
          </div>
          <div className="sm:col-span-2">
            <ImageField
              label="Thumbnail image"
              value={form.thumbnail}
              onChange={(thumbnail) => setForm({ ...form, thumbnail })}
              placeholder="https://images.unsplash.com/..."
              required
            />
          </div>
          <div className="sm:col-span-2">
            <AdminLabel>Project links (one per line)</AdminLabel>
            <AdminTextarea
              rows={3}
              value={form.links}
              onChange={(e) => setForm({ ...form, links: e.target.value })}
              placeholder="https://youtube.com/..."
            />
            <p className="mt-1 text-xs text-xghoststroke">YouTube, Vimeo, Instagram, and other links all work.</p>
          </div>
          <div className="sm:col-span-2">
            <AdminLabel>Tags</AdminLabel>
            <div className="flex flex-wrap gap-2">
              {TAG_OPTIONS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold capitalize transition-colors ${
                    form.tags.includes(tag) ? 'bg-xblue text-xaccent-text' : 'bg-xghostwhite text-xstroke hover:bg-xarrow'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <div>
            <AdminLabel>Order</AdminLabel>
            <AdminInput type="number" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} />
          </div>
          <div className="flex gap-2 sm:col-span-2">
            <AdminButton type="submit">{editingId ? 'Update' : 'Add'} Project</AdminButton>
            {editingId && (
              <AdminButton type="button" variant="ghost" onClick={resetForm}>
                Cancel
              </AdminButton>
            )}
          </div>
        </form>
      </AdminCard>

      <AdminCard title={`All projects (${projects.length})`}>
        <div className="space-y-3">
          {projects.map((project) => (
            <div key={project._id} className="flex flex-col gap-3 rounded-xl border border-xline bg-xblank p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                {project.thumbnail && (
                  <img src={project.thumbnail} alt="" className="h-12 w-20 rounded-lg object-cover" />
                )}
                <div>
                  <p className="font-semibold text-xstroke">{project.title}</p>
                  <p className="text-xs text-xghoststroke">order {project.order}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <AdminButton variant="ghost" onClick={() => startEdit(project)}>
                  Edit
                </AdminButton>
                <AdminButton variant="danger" onClick={() => handleDelete(project._id)}>
                  Delete
                </AdminButton>
              </div>
            </div>
          ))}
          {!projects.length && <p className="text-sm text-xghoststroke">No projects yet.</p>}
        </div>
      </AdminCard>
    </div>
  );
}