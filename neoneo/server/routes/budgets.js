import { Router } from 'express';
import { list, create, summary } from '../controllers/budgetController.js';
import Joi from 'joi';

const router = Router();
const schema = Joi.object({
  category: Joi.string().required(),
  amount: Joi.number().positive().required()
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

// New summary endpoint
router.get('/summary', summary);

export default router;
