import { Router } from 'express';
import { getProfile } from '../controllers/profileController.js';
import { getProjects } from '../controllers/projectController.js';
import { sendMessage } from '../controllers/contactController.js';
import { getWorks } from '../controllers/workController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

router.get('/profile', asyncHandler(getProfile));
router.get('/works', asyncHandler(getWorks));
router.get('/projects', asyncHandler(getProjects));
router.post('/contact', asyncHandler(sendMessage));

export default router;