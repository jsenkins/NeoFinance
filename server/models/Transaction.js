import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: String,
  description: String,
  date: {
    type: Date,
    default: Date.now
  }
});

transactionSchema.index({ description: 'text', category: 'text' });

export default mongoose.model('Transaction', transactionSchema);
