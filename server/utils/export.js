import { Router } from 'express';
import { exportPDF, exportCSV } from '../utils/exportController.js';
const r = Router();
r.get('/pdf', exportPDF);
r.get('/csv', exportCSV);
export default r;
