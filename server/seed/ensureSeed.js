import Profile from '../models/Profile.js';
import Project from '../models/Project.js';
import Work from '../models/Work.js';
import { profile, projects, works } from './seedData.js';

export async function ensureSeed() {
  const existingProfile = await Profile.findOne().select('_id').lean();
  if (existingProfile) return;

  await Profile.create(profile);
  await Work.insertMany(works);
  await Project.insertMany(projects);
  console.log('Database seeded with default portfolio content');
}