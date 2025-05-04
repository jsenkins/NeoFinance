import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name:  String,
  email: String,
  phone: String,
  location: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], default: [74.3587, 31.5204] }
  }
});

contactSchema.index({ location: '2dsphere' });

export default mongoose.model('Contact', contactSchema);
