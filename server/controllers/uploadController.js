import { storeImage } from '../utils/gridfs.js';

export async function uploadImageHandler(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file provided' });
  }

  const ext = req.file.originalname?.split('.').pop()?.toLowerCase() || 'jpg';
  const safeExt = ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext) ? ext : 'jpg';
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${safeExt}`;

  const fileId = await storeImage(req.file.buffer, {
    filename,
    mimetype: req.file.mimetype,
  });

  res.status(201).json({
    url: `/api/media/${fileId}`,
    id: fileId,
    filename,
  });
}