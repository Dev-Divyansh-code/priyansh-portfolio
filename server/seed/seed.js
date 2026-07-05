import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Profile from '../models/Profile.js';
import Project from '../models/Project.js';
import Work from '../models/Work.js';
import { profile, projects, works } from './seedData.js';

dotenv.config();

async function seed() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/priyansh-portfolio';
  await mongoose.connect(uri);

  await Promise.all([Profile.deleteMany({}), Work.deleteMany({}), Project.deleteMany({})]);
  await Profile.create(profile);
  await Work.insertMany(works);
  await Project.insertMany(projects);

  console.log('Database seeded successfully!');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});