import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [{ type: String }],
    thumbnail: { type: String, required: true },
    links: [{ type: String }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.model('Project', projectSchema);