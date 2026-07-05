import { useRef, useState } from 'react';
import { adminUploadVideo } from '../../api/admin';
import { AdminButton, AdminInput, AdminLabel } from './AdminUI';

export default function VideoField({
  label,
  value,
  onChange,
  placeholder = 'https://youtube.com/watch?v=... or upload MP4',
  hint = 'YouTube, Vimeo, or direct video link. Click portrait on site to flip and play.',
}) {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  async function handleFileSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError('');

    try {
      const { url } = await adminUploadVideo(file);
      onChange(url);
    } catch (err) {
      setUploadError(err.response?.data?.error || 'Upload failed. Try a smaller video (max 50MB).');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  return (
    <div>
      <AdminLabel>{label}</AdminLabel>
      <div className="space-y-3">
        <AdminInput
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
        <div className="flex flex-wrap items-center gap-2">
          <input
            ref={fileRef}
            type="file"
            accept="video/mp4,video/webm,video/ogg,video/quicktime"
            className="hidden"
            onChange={handleFileSelect}
          />
          <AdminButton
            type="button"
            variant="ghost"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload video file'}
          </AdminButton>
          {value && (
            <AdminButton type="button" variant="ghost" onClick={() => onChange('')}>
              Clear
            </AdminButton>
          )}
        </div>
        <p className="text-xs text-xghoststroke">{hint}</p>
        {uploadError && <p className="text-xs text-xred">{uploadError}</p>}
      </div>
    </div>
  );
}