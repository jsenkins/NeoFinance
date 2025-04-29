// backend/models/Bill.js
import mongoose from 'mongoose';

const billSchema = new mongoose.Schema({
  user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  name:    { type: String, required: true },
  amount:  { type: Number, required: true },
  dueDate: { type: Date,   required: true },
  reminded: {               // so we don’t re-email the same bill
    type: Boolean,
    default: false
  }
});

export default mongoose.model('Bill', billSchema);
