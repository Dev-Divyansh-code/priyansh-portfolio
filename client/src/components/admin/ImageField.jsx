import { useRef, useState } from 'react';
import { adminUploadImage } from '../../api/admin';
import { AdminButton, AdminInput, AdminLabel } from './AdminUI';

export default function ImageField({
  label,
  value,
  onChange,
  placeholder = 'https://... or /uploads/...',
  required = false,
  hint = 'Paste an image link or upload from your device',
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
      const { url } = await adminUploadImage(file);
      onChange(url);
    } catch (err) {
      setUploadError(err.response?.data?.error || 'Upload failed. Try a smaller image (max 5MB).');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  return (
    <div>
      <AdminLabel>
        {label}
        {required && <span className="text-xred"> *</span>}
      </AdminLabel>
      <div className="space-y-3">
        <AdminInput
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required && !value}
        />
        <div className="flex flex-wrap items-center gap-2">
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={handleFileSelect}
          />
          <AdminButton
            type="button"
            variant="ghost"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload from device'}
          </AdminButton>
          {value && (
            <AdminButton type="button" variant="ghost" onClick={() => onChange('')}>
              Clear
            </AdminButton>
          )}
        </div>
        <p className="text-xs text-xghoststroke">{hint}</p>
        {uploadError && <p className="text-xs text-xred">{uploadError}</p>}
        {value && (
          <img
            src={value}
            alt="Preview"
            className="h-28 max-w-full rounded-xl border border-xline object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        )}
      </div>
    </div>
  );
}