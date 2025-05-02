import mongoose from 'mongoose';

const creditLineSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  limit: {
    type: Number,
    required: true
  },
  balanceUsed: {
    type: Number,
    default: 0
  },
  interestRate: {
    type: Number,
    required: true
  },
  cycleDate: {
    type: Number,
    default: 1
  }
});

export default mongoose.model('CreditLine', creditLineSchema);
