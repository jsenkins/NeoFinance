import mongoose from 'mongoose';

const debtSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  principal: {
    type: Number,
    required: true
  },
  interestRate: {
    type: Number,
    required: true
  },
  termMonths: {
    type: Number,
    required: true
  },
  monthlyPayment: {
    type: Number,
    required: true
  },
  outstanding: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Debt', debtSchema);
