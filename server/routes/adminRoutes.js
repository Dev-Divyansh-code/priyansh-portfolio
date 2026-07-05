import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/profileController.js';
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from '../controllers/projectController.js';
import { deleteMessage, getMessages } from '../controllers/contactController.js';
import { createWork, deleteWork, getWork, getWorks, updateWork } from '../controllers/workController.js';
import { adminAuth } from '../middleware/adminAuth.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = Router();

router.use(adminAuth);

router.get('/profile', asyncHandler(getProfile));
router.put('/profile', asyncHandler(updateProfile));

router.get('/works', asyncHandler(getWorks));
router.get('/works/:id', asyncHandler(getWork));
router.post('/works', asyncHandler(createWork));
router.put('/works/:id', asyncHandler(updateWork));
router.delete('/works/:id', asyncHandler(deleteWork));

router.get('/projects', asyncHandler(getProjects));
router.get('/projects/:id', asyncHandler(getProject));
router.post('/projects', asyncHandler(createProject));
router.put('/projects/:id', asyncHandler(updateProject));
router.delete('/projects/:id', asyncHandler(deleteProject));

router.get('/messages', asyncHandler(getMessages));
router.delete('/messages/:id', asyncHandler(deleteMessage));

export default router;