// backend/middleware/auth.js
import jwt from 'jsonwebtoken';
export const protect = (req, res, next) => {
  const h = req.headers.authorization?.split(' ')[1];
  if (!h) return res.sendStatus(401);
  try {
    const { id } = jwt.verify(h, process.env.JWT_SECRET);
    req.userId = id;
    next();
  } catch {
    res.sendStatus(401);
  }
};
