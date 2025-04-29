// backend/controllers/creditController.js
import CreditLine from '../models/CreditLine.js';

export const listCredits = async (req, res) => {
  //const credits = await CreditLine.find({ user: req.user._id });
  const credits = await CreditLine.find();
  res.json(credits);
};

export const createCredit = async (req, res) => {
 // const credit = await CreditLine.create({ ...req.body, user: req.user._id });
  const credit = await CreditLine.create({ ...req.body});
  res.status(201).json(credit);
};

// summary: utilization ratios
export const creditSummary = async (req, res) => {
  //const credits = await CreditLine.find({ user: req.user._id });
  const credits = await CreditLine.find();
  const summary = credits.map(c => ({
    name: c.name,
    limit: c.limit,
    used: c.balanceUsed,
    utilization: Math.round((c.balanceUsed / c.limit) * 100)
  }));
  res.json(summary);
};
