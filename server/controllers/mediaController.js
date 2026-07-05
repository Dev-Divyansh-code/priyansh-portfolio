import { isValidMediaId, openImageStream } from '../utils/gridfs.js';

export function getMedia(req, res, next) {
  const { id } = req.params;

  if (!isValidMediaId(id)) {
    return res.status(400).json({ error: 'Invalid media id' });
  }

  const stream = openImageStream(id);

  stream.on('file', (file) => {
    if (file.contentType) res.setHeader('Content-Type', file.contentType);
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  });

  stream.on('error', (err) => {
    if (res.headersSent) return;
    if (err.message?.includes('File not found') || err.code === 'ENOENT') {
      return res.status(404).json({ error: 'Image not found' });
    }
    next(err);
  });

  stream.pipe(res);
}