// backend/routes/auth.js
import { Router } from 'express';
import { register, login } from '../controllers/authController.js';
import Joi from 'joi';

const schema = {
  register: Joi.object({ email:Joi.string().email().required(), password:Joi.string().min(6).required() }),
  login:    Joi.object({ email:Joi.string().email().required(), password:Joi.string().required() })
};

const r = Router();
r.post('/register', (req,res,next)=>{
  const { error } = schema.register.validate(req.body);
  if (error) return res.status(400).json({ message:error.details[0].message });
  next();
}, register);

r.post('/login', (req,res,next)=>{
  const { error } = schema.login.validate(req.body);
  if (error) return res.status(400).json({ message:error.details[0].message });
  next();
}, login);

export default r;
