// backend/routes/finance.js
import { Router } from 'express';
import {
  listDebts, createDebt, payDebt, debtSummary
} from '../controllers/debtController.js';
import {
  listCredits, createCredit, creditSummary
} from '../controllers/creditController.js';

const r = Router();
r.get('/debts',       listDebts);
r.post('/debts',      createDebt);
r.post('/debts/:id/pay', payDebt);
r.get('/debts/summary', debtSummary);

r.get('/credits',      listCredits);
r.post('/credits',     createCredit);
r.get('/credits/summary', creditSummary);

export default r;
