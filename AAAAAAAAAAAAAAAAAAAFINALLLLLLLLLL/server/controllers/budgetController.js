import Budget from '../models/Budget.js';

/* ───────── GET /api/budgets ───────── */
export const list = async (req, res) => {
  const budgets = await Budget.find({ user: req.userId });
  res.json(budgets);
};

/* ───────── POST /api/budgets ───────── */
export const create = async (req, res) => {
  const b = await Budget.create({ ...req.body, user: req.userId });
  res.status(201).json(b);
};

/* ───────── GET /api/budgets/summary ───────── */
export const summary = async (req, res) => {
  const budgets = await Budget.find({ user: req.userId });

  const results = budgets.map((b) => {
    const percent = Math.min((b.spent / b.amount) * 100, 100);
    return {
      _id:      b._id,
      category: b.category,
      amount:   b.amount,
      spent:    b.spent,             // ← use the stored value
      percent:  Math.round(percent),
    };
  });

  res.json(results);
};
