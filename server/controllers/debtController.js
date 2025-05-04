import Debt from '../models/Debt.js';
import Transaction from '../models/Transaction.js';

// GET /api/finance/debts
export const listDebts = async (req, res) => {
  const debts = await Debt.find({ user: req.userId });
  res.json(debts);
};

// POST /api/finance/debts
export const createDebt = async (req, res) => {
  const debt = await Debt.create({
    ...req.body,
    user:        req.userId,
    outstanding: req.body.principal
  });
  res.status(201).json(debt);
};

// POST /api/finance/debts/:id/pay
export const payDebt = async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;
  // ensure this debt belongs to the user
  const debt = await Debt.findOne({ _id: id, user: req.userId });
  if (!debt) return res.sendStatus(404);

  debt.outstanding = Math.max(0, debt.outstanding - amount);
  await debt.save();

  // log it as an expense
  await Transaction.create({
    user:        req.userId,
    type:        'expense',
    category:    `Debt: ${debt.name}`,
    amount:      amount,
    date:        new Date()
  });

  res.json(debt);
};

// GET /api/finance/debts/summary
export const debtSummary = async (req, res) => {
  const debts = await Debt.find({ user: req.userId });
  const totalOutstanding = debts.reduce((sum, d) => sum + d.outstanding, 0);
  const nextDue = debts.map(d => ({
    name:     d.name,
    payment:  d.monthlyPayment,
    dueDate:  new Date(d.startDate).setMonth(new Date(d.startDate).getMonth() + 1)
  }));
  res.json({ totalOutstanding, nextDue, debts });
};
