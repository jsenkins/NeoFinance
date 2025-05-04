// server/routes/export.js
import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { exportPDF, exportCSV } from '../utils/exportController.js';

const router = Router();
router.use(protect); 

// GET  /api/export/pdf → PDF download of all transactions
router.get('/pdf', exportPDF);

// GET  /api/export/csv → CSV download of all transactions
router.get('/csv', exportCSV);

export default router;
