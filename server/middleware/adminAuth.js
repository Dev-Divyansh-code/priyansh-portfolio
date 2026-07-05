export function adminAuth(req, res, next) {
  const apiKey = process.env.ADMIN_API_KEY;

  if (!apiKey) {
    return res.status(503).json({ error: 'Admin API is not configured. Set ADMIN_API_KEY in .env' });
  }

  const provided = req.headers['x-api-key'];

  if (!provided || provided !== apiKey) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
}