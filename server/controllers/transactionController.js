import dayjs from 'dayjs';
import Transaction from '../models/Transaction.js';
import Budget from '../models/Budget.js';

/* ───────── POST /api/transactions ───────── */
const createTransaction = async (req, res) => {
  const {
    type = 'expense',
    amount,
    category = '',
    description = '',
    date,
  } = req.body;

  /* sanitize payload */
  const cleanCategory    = category.trim();
  const cleanDescription = description.trim();
  const numAmount        = Number(amount);

  // 1️⃣  save the transaction
  const tx = await Transaction.create({
    ...req.body,
    type,
    amount:      numAmount,
    category:    cleanCategory,
    description: cleanDescription,
    user:        req.userId,
  });

  // 2️⃣  auto‑adjust matching budget if this is an expense
  if (type === 'expense') {
    await Budget.findOneAndUpdate(
      { user: req.userId, category: cleanCategory },   // ← period filter removed
      { $inc: { spent: numAmount } },
      { new: true }
    );
  }

  res.status(201).json(tx);
};

/* ───────── GET /api/transactions ───────── */
const list = async (req, res) => {
  const txs = await Transaction.find({ user: req.userId }).sort('-date');
  res.json(txs);
};

/* ───────── GET /api/transactions/search?q=keyword ───────── */
const search = async (req, res) => {
  const q = (req.query.q || '').trim();
  if (!q) return res.json([]);

  const txs = await Transaction.find({
    user: req.userId,
    $or: [
      { description: { $regex: q, $options: 'i' } },
      { category:    { $regex: q, $options: 'i' } },
    ],
  }).sort('-date');

  res.json(txs);
};

/* ───────── exports ───────── */
export { list, createTransaction as create, search };
