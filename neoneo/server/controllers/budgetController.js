// server/controllers/budgetController.js
import Budget from '../models/Budget.js';
import Transaction from '../models/Transaction.js';

export const list = async (req, res) => {
  const budgets = await Budget.find();
  res.json(budgets);
};

export const create = async (req, res) => {
  const b = await Budget.create(req.body);
  res.status(201).json(b);
};

export const summary = async (req, res) => {
  const budgets = await Budget.find();
  const results = await Promise.all(
    budgets.map(async b => {
      const agg = await Transaction.aggregate([
        { $match: { category: b.category } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]);
      const spent = agg[0]?.total || 0;
      const percent = Math.min((spent / b.amount) * 100, 100);
      return {
        _id:      b._id,
        category: b.category,
        amount:   b.amount,
        spent,
        percent: Math.round(percent)
      };
    })
  );
  res.json(results);
};
