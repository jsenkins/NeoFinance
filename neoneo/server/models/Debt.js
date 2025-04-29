// backend/models/Debt.js
import mongoose from 'mongoose';

const debtSchema = new mongoose.Schema({
  user:            { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name:            { type: String, required: true },         // e.g. “Car Loan”
  principal:       { type: Number, required: true },         // original amount
  interestRate:    { type: Number, required: true },         // annual %  
  termMonths:      { type: Number, required: true },         // e.g. 60
  monthlyPayment:  { type: Number, required: true },
  outstanding:     { type: Number, required: true },         // starts = principal
  startDate:       { type: Date,   default: Date.now }
});

export default mongoose.model('Debt', debtSchema);
