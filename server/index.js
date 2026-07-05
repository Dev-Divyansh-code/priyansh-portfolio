import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import { uploadsDir } from './middleware/upload.js';
import { ensureSeed } from './seed/ensureSeed.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import apiRoutes from './routes/api.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';
const clientDist = path.resolve(__dirname, '../client/dist');
const hasClientBuild = fs.existsSync(path.join(clientDist, 'index.html'));

const app = express();
const PORT = process.env.PORT || 5001;

app.use(
  cors({
    origin: isProduction
      ? true
      : process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  }),
);
app.use(express.json({ limit: '1mb' }));
app.use('/uploads', express.static(uploadsDir));

app.use('/api', apiRoutes);

if (isProduction && hasClientBuild) {
  app.use(express.static(clientDist));

  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(clientDist, 'index.html'));
  });
} else {
  app.get('/', (_req, res) => {
    res.json({
      name: 'Priyansh Portfolio API',
      version: '1.0.0',
      endpoints: {
        health: 'GET /api/health',
        profile: 'GET /api/profile',
        works: 'GET /api/works',
        projects: 'GET /api/projects',
        contact: 'POST /api/contact',
        admin: 'GET /api/admin/* (requires x-api-key header)',
      },
    });
  });
}

app.use(notFound);
app.use(errorHandler);

await connectDB();
await ensureSeed();

function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`API running at http://localhost:${port}`);
    console.log(`Health check: http://localhost:${port}/api/health`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      const nextPort = port + 1;
      console.warn(`Port ${port} busy, trying ${nextPort}...`);
      startServer(nextPort);
      return;
    }
    console.error('Server failed to start:', err);
    process.exit(1);
  });
}

startServer(Number(PORT));