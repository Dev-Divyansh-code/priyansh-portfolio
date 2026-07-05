import { useEffect, useState } from 'react';
import { adminGetProfile, adminUpdateProfile } from '../../api/admin';
import ImageField from '../../components/admin/ImageField';
import VideoField from '../../components/admin/VideoField';
import { AdminAlert, AdminButton, AdminCard, AdminInput, AdminLabel, AdminTextarea } from '../../components/admin/AdminUI';

const emptyForm = {
  name: '',
  title: '',
  tagline: '',
  location: '',
  portrait: '',
  portraitVideo: '',
  about: '',
  email: '',
  instagram: '',
  youtube: '',
  linkedin: '',
};

export default function AdminProfile() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminGetProfile()
      .then((p) => {
        setForm({
          name: p.name || '',
          title: p.title || '',
          tagline: p.tagline || '',
          location: p.location || '',
          portrait: p.portrait || '',
          portraitVideo: p.portraitVideo || '',
          about: (p.about || []).join('\n'),
          email: p.socials?.email || '',
          instagram: p.socials?.instagram || '',
          youtube: p.socials?.youtube || '',
          linkedin: p.socials?.linkedin || '',
        });
      })
      .catch(() => setError('Failed to load profile'))
      .finally(() => setLoading(false));
  }, []);

  function update(field) {
    return (e) => setForm({ ...form, [field]: e.target.value });
  }

  async function handleSave(e) {
    e.preventDefault();
    setStatus('saving');
    setError('');

    try {
      await adminUpdateProfile({
        name: form.name,
        title: form.title,
        tagline: form.tagline,
        location: form.location,
        portrait: form.portrait,
        portraitVideo: form.portraitVideo,
        about: form.about.split('\n').map((s) => s.trim()).filter(Boolean),
        socials: {
          email: form.email,
          instagram: form.instagram,
          youtube: form.youtube,
          linkedin: form.linkedin,
        },
      });
      setStatus('saved');
      setTimeout(() => setStatus(''), 3000);
    } catch {
      setError('Failed to save profile');
      setStatus('');
    }
  }

  if (loading) return <p className="text-sm text-xghoststroke">Loading profile...</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-xstroke">Profile</h1>
        <p className="mt-1 text-sm text-xghoststroke">Update hero, about section, and social links</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <AdminCard title="Basic info">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <AdminLabel>Name</AdminLabel>
              <AdminInput value={form.name} onChange={update('name')} required />
            </div>
            <div>
              <AdminLabel>Title</AdminLabel>
              <AdminInput value={form.title} onChange={update('title')} required />
            </div>
            <div className="sm:col-span-2">
              <AdminLabel>Tagline</AdminLabel>
              <AdminInput value={form.tagline} onChange={update('tagline')} required />
            </div>
            <div>
              <AdminLabel>Location</AdminLabel>
              <AdminInput value={form.location} onChange={update('location')} />
            </div>
            <div className="sm:col-span-2">
              <ImageField
                label="Portrait image"
                value={form.portrait}
                onChange={(portrait) => setForm({ ...form, portrait })}
                placeholder="/assets/images/portrait.webp or https://..."
              />
            </div>
            <div className="sm:col-span-2">
              <VideoField
                label="Portrait video (flip on click)"
                value={form.portraitVideo}
                onChange={(portraitVideo) => setForm({ ...form, portraitVideo })}
              />
            </div>
          </div>
        </AdminCard>

        <AdminCard title="About (one paragraph per line)">
          <AdminTextarea rows={6} value={form.about} onChange={update('about')} />
        </AdminCard>

        <AdminCard title="Social links">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <AdminLabel>Email</AdminLabel>
              <AdminInput type="email" value={form.email} onChange={update('email')} />
            </div>
            <div>
              <AdminLabel>Instagram URL</AdminLabel>
              <AdminInput value={form.instagram} onChange={update('instagram')} />
            </div>
            <div>
              <AdminLabel>YouTube URL</AdminLabel>
              <AdminInput value={form.youtube} onChange={update('youtube')} />
            </div>
            <div>
              <AdminLabel>LinkedIn URL</AdminLabel>
              <AdminInput value={form.linkedin} onChange={update('linkedin')} />
            </div>
          </div>
        </AdminCard>

        {error && <AdminAlert>{error}</AdminAlert>}
        {status === 'saved' && <AdminAlert type="success">Profile saved successfully!</AdminAlert>}

        <AdminButton type="submit" disabled={status === 'saving'}>
          {status === 'saving' ? 'Saving...' : 'Save Profile'}
        </AdminButton>
      </form>
    </div>
  );
}