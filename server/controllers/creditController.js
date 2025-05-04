import CreditLine from '../models/CreditLine.js';

// GET /api/finance/credits
export const listCredits = async (req, res) => {
  const credits = await CreditLine.find({ user: req.userId });
  res.json(credits);
};

// POST /api/finance/credits
export const createCredit = async (req, res) => {
  const credit = await CreditLine.create({ ...req.body, user: req.userId });
  res.status(201).json(credit);
};

// GET /api/finance/credits/summary
export const creditSummary = async (req, res) => {
  const credits = await CreditLine.find({ user: req.userId });
  const summary = credits.map(c => ({
    name:        c.name,
    limit:       c.limit,
    used:        c.balanceUsed,
    utilization: Math.round((c.balanceUsed / c.limit) * 100)
  }));
  res.json(summary);
};
