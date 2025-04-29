import { Router } from 'express';
import { list, create } from '../controllers/contactController.js';
const router = Router();
router.get('/', list);
router.post('/', create);
export default router;
