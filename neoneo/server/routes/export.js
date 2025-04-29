// server/routes/export.js
import { Router } from 'express';
import { exportPDF, exportCSV } from '../utils/exportController.js';

const router = Router();

// GET  /api/export/pdf → PDF download of all transactions
router.get('/pdf', exportPDF);

// GET  /api/export/csv → CSV download of all transactions
router.get('/csv', exportCSV);

export default router;
