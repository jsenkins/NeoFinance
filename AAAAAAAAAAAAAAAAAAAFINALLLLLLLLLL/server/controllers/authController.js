// backend/controllers/authController.js
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
const sign = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn:'7d' });

export const register = async (req, res) => {
  const { email, password } = req.body;
  if (await User.findOne({ email })) return res.status(400).json({ message:'Email taken' });
  const u = await User.create({ email, password });
  res.json({ token: sign(u._id) });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const u = await User.findOne({ email });
  if (!u || !(await u.compare(password))) return res.status(400).json({ message:'Invalid credentials' });
  res.json({ token: sign(u._id) });
};
