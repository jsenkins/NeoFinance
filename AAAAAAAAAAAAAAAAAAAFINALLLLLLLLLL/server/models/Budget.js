import mongoose from 'mongoose';

// models/Budget.js
const budgetSchema = new mongoose.Schema({
  user:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String,  required: true },
  amount:   { type: Number,  required: true },   // budget limit
  period:   { type: String, enum: ['monthly','yearly'], default: 'monthly' },

  spent:    { type: Number,  default: 0 },       // ← NEW
});


export default mongoose.model('Budget', budgetSchema);
