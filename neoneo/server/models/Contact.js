import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  location: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], default: [74.3587,31.5204] }
  }
});
schema.index({ location: '2dsphere' });
export default mongoose.model('Contact', schema);
