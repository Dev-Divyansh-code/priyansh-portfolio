import mongoose from 'mongoose';

const workSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    accent: { type: String, default: '#4a90d9' },
    icon: { type: String, default: 'mdi:play-circle' },
    videoUrl: String,
    thumbnail: String,
    date: { type: Date, default: Date.now },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.model('Work', workSchema);