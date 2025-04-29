
// backend/validation/bill.js
import Joi from 'joi';

export const billSchema = Joi.object({
  name: Joi.string().required(),
  amount: Joi.number().positive().required(),
  dueDate: Joi.date().iso().required()
});
