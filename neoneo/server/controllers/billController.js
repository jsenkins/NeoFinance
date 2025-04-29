// backend/controllers/billController.js
import Bill from '../models/Bill.js';

export const listBills = async (req, res) => {
  const bills = await Bill.find().sort('dueDate');
  res.json(bills);
};

export const createBill = async (req, res) => {
  const b = await Bill.create(req.body);
  res.status(201).json(b);
};

export const deleteBill = async (req, res) => {
  await Bill.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
};
