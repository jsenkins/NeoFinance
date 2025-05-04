import { Router } from 'express';
import { list, create } from '../controllers/contactController.js';
import { protect } from '../middleware/auth.js';

const router = Router();
router.use(protect); 

router.get('/', list);
router.post('/', create);
export default router;
