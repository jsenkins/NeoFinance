// backend/controllers/debtController.js
import Debt from '../models/Debt.js';
import Transaction from '../models/Transaction.js';

export const listDebts = async (req, res) => {
  //const debts = await Debt.find({ user: req.user._id });
  const debts = await Debt.find();
  res.json(debts);
};

export const createDebt = async (req, res) => {
 // const debt = await Debt.create({ ...req.body, user: req.user._id, outstanding: req.body.principal });
  const debt = await Debt.create({ ...req.body, outstanding: req.body.principal });
  res.status(201).json(debt);
};

// record a payment
export const payDebt = async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;  // payment amount
  const debt = await Debt.findById(id);
  debt.outstanding = Math.max(0, debt.outstanding - amount);
  await debt.save();
  // also log as an expense transaction
  await Transaction.create({
    user: req.user._id,
    type: 'expense',
    category: `Debt: ${debt.name}`,
    amount: amount,
    date: new Date()
  });
  res.json(debt);
};

// summary: total outstanding + upcoming payments
export const debtSummary = async (req, res) => {
  //const debts = await Debt.find({ user: req.user._id });
  const debts = await Debt.find();
  const totalOutstanding = debts.reduce((sum, d) => sum + d.outstanding, 0);
  const nextDue = debts.map(d => ({
    name: d.name,
    payment: d.monthlyPayment,
    dueDate: new Date(d.startDate).setMonth(new Date(d.startDate).getMonth() + 1)
  }));
  res.json({ totalOutstanding, nextDue, debts });
};
