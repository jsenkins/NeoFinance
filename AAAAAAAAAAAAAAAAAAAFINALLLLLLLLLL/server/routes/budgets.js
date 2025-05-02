// backend/routes/budgets.js
import { Router } from 'express';
import { list, create, summary } from '../controllers/budgetController.js';
import Joi from 'joi';
import { protect } from '../middleware/auth.js';

const router = Router();

router.use(protect);

/* ─── extend the schema ─── */
const schema = Joi.object({
  category: Joi.string().required(),
  amount:   Joi.number().positive().required(),
  period:   Joi.string().valid('monthly', 'yearly').default('monthly')
});

router.get('/', list);

router.post(
  '/',
  (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    next();
  },
  create
);

router.get('/summary', summary);

export default router;
