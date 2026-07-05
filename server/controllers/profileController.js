import Profile from '../models/Profile.js';

export async function getProfile(_req, res) {
  const profile = await Profile.findOne().lean();
  if (!profile) {
    return res.status(404).json({ error: 'Profile not found. Run: npm run seed' });
  }
  res.json(profile);
}

export async function updateProfile(req, res) {
  const allowed = ['name', 'title', 'tagline', 'location', 'portrait', 'portraitVideo', 'about', 'socials'];
  const updates = {};

  for (const key of allowed) {
    if (req.body[key] !== undefined) updates[key] = req.body[key];
  }

  if (!Object.keys(updates).length) {
    return res.status(400).json({ error: 'No valid fields to update' });
  }

  let profile = await Profile.findOne();

  if (!profile) {
    profile = await Profile.create(updates);
    return res.status(201).json(profile);
  }

  Object.assign(profile, updates);
  await profile.save();
  res.json(profile);
}