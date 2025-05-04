// backend/routes/bills.js
import { Router } from 'express';
import { listBills, createBill, deleteBill } from '../controllers/billController.js';
import { billSchema } from '../validation/bill.js';
import { protect } from '../middleware/auth.js';

const router = Router();
router.use(protect); 

router.get('/', listBills);
router.post(
  '/',
  (req, res, next) => {
    const { error } = billSchema.validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    next();
  },
  createBill
);
router.delete('/:id', deleteBill);

export default router;
