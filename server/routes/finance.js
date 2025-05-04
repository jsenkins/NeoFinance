// backend/routes/finance.js
import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import {
  listDebts,
  createDebt,
  payDebt,
  debtSummary
} from '../controllers/debtController.js';
import {
  listCredits,
  createCredit,
  creditSummary
} from '../controllers/creditController.js';

const router = Router();        // ← router must be defined before you use it
router.use(protect);           // ← now you can guard all finance routes

// Debt endpoints
router.get('/debts', listDebts);
router.post('/debts', createDebt);
router.post('/debts/:id/pay', payDebt);
router.get('/debts/summary', debtSummary);

// Credit endpoints
router.get('/credits', listCredits);
router.post('/credits', createCredit);
router.get('/credits/summary', creditSummary);

export default router;
