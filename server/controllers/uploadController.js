export function uploadImageHandler(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file provided' });
  }

  res.status(201).json({
    url: `/uploads/${req.file.filename}`,
    filename: req.file.filename,
  });
}