import Transaction from '../models/Transaction.js';

export const list  = async (req, res) => {
  res.json(await Transaction.find());
};
export const create = async (req, res) => {
  const tx = await Transaction.create(req.body);
  res.status(201).json(tx);
};
export const search = async (req, res) => {
  const { q } = req.query;
  res.json(await Transaction.find({ $text: { $search: q } }));
};
