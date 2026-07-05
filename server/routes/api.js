import { Router } from 'express';
import adminRoutes from './adminRoutes.js';
import publicRoutes from './publicRoutes.js';

const router = Router();

router.use('/', publicRoutes);
router.use('/admin', adminRoutes);

export default router;