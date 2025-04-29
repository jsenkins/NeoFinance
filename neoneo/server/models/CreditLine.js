// backend/models/CreditLine.js
import mongoose from 'mongoose';

const creditSchema = new mongoose.Schema({
  user:         { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name:         { type: String, required: true },        // “Visa Platinum”
  limit:        { type: Number, required: true },
  balanceUsed:  { type: Number, default: 0 },
  interestRate: { type: Number, required: true },        // annual %
  cycleDate:    { type: Number, default: 1 }             // day-of-month cycle resets
});

export default mongoose.model('CreditLine', creditSchema);
