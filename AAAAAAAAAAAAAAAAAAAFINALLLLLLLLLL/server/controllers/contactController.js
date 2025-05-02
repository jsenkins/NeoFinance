import Contact from '../models/Contact.js';

// GET /api/contacts
export const list = async (req, res) => {
  const contacts = await Contact.find({ user: req.userId });
  res.json(contacts);
};

// POST /api/contacts
export const create = async (req, res) => {
  const c = await Contact.create({ ...req.body, user: req.userId });
  res.status(201).json(c);
};
