import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    tagline: { type: String, required: true },
    location: { type: String, default: 'IND' },
    portrait: { type: String, default: '/assets/portrait.webp' },
    portraitVideo: { type: String, default: '' },
    about: [{ type: String }],
    socials: {
      email: String,
      instagram: String,
      youtube: String,
      linkedin: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Profile', profileSchema);