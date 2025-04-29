import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  type:   { type: String, enum: ['income','expense'], required: true },
  amount: { type: Number, required: true },
  category: String,
  description: String,
  date:   { type: Date, default: Date.now }
});
schema.index({ description: 'text', category: 'text' });
export default mongoose.model('Transaction', schema);
