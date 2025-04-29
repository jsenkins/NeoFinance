import Contact from '../models/Contact.js';

export const list = async (_, res) => {
  res.json(await Contact.find());
};
export const create = async (req, res) => {
  const c = await Contact.create(req.body);
  res.status(201).json(c);
};
