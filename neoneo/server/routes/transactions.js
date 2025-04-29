import { Router } from 'express';
import { list, create, search } from '../controllers/transactionController.js';
import Joi from 'joi';

const router = Router();
const schema = Joi.object({
  type: Joi.string().valid('income','expense').required(),
  amount: Joi.number().positive().required(),
  category: Joi.string().allow(''),
  description: Joi.string().allow(''),
  date: Joi.date()
});

router.get('/', list);
router.post('/', (req,res,next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);
  next();
}, create);
router.get('/search', search);

export default router;
