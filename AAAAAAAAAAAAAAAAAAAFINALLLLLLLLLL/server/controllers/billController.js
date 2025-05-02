import Bill from '../models/Bill.js';

// GET /api/bills
export const listBills = async (req, res) => {
  const bills = await Bill.find({ user: req.userId }).sort('dueDate');
  res.json(bills);
};

// POST /api/bills
export const createBill = async (req, res) => {
  const b = await Bill.create({ ...req.body, user: req.userId });
  res.status(201).json(b);
};

// DELETE /api/bills/:id
export const deleteBill = async (req, res) => {
  const b = await Bill.findOneAndDelete({
    _id:     req.params.id,
    user:    req.userId
  });
  if (!b) return res.sendStatus(404);
  res.sendStatus(204);
};
