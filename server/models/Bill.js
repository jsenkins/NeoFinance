import mongoose from 'mongoose';

const billSchema = new mongoose.Schema({
  user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name:    { type: String, required: true },
  amount:  { type: Number, required: true },
  dueDate: { type: Date, required: true },

  frequency: {                    // ← NEW
    type: String,
    enum: ['monthly', 'weekly', 'yearly'],
    default: 'monthly',
  },

  reminded: { type: Boolean, default: false },
});


export default mongoose.model('Bill', billSchema);
