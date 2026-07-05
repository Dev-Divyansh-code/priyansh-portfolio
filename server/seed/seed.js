import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Profile from '../models/Profile.js';
import Project from '../models/Project.js';
import Work from '../models/Work.js';

dotenv.config();

const works = [
  {
    title: 'Eternal Vows — A Cinematic Wedding Film',
    description: 'A dreamy wedding film with warm color grading and emotional storytelling.',
    category: 'wedding',
    accent: '#e44c6c',
    icon: 'mdi:heart',
    order: 1,
    date: new Date('2025-11-14'),
  },
  {
    title: 'Brand Summit 2025 — Corporate Event Recap',
    description: 'Fast-paced event highlight reel with dynamic cuts and branded motion graphics.',
    category: 'corporate',
    accent: '#4a90d9',
    icon: 'mdi:office-building',
    order: 2,
    date: new Date('2025-09-22'),
  },
  {
    title: 'Midnight Drive — Indie Music Video',
    description: 'Moody night-time music video with neon color grading and beat-synced cuts.',
    category: 'music video',
    accent: '#7b68ee',
    icon: 'mdi:music-note',
    order: 3,
    date: new Date('2025-07-08'),
  },
  {
    title: 'Lifestyle Reels — 30-Day Content Pack',
    description: 'Punchy Instagram reels with trending transitions and hook-first editing.',
    category: 'reels',
    accent: '#e1306c',
    icon: 'mdi:instagram',
    order: 4,
    date: new Date('2025-05-18'),
  },
  {
    title: 'Wanderlust — Travel Documentary Short',
    description: 'Cinematic travel film with drone footage and narrative pacing.',
    category: 'documentary',
    accent: '#2ecc71',
    icon: 'mdi:airplane',
    order: 5,
    date: new Date('2025-03-10'),
  },
  {
    title: 'TechLaunch — Product Ad Campaign',
    description: 'High-energy product launch video with kinetic typography.',
    category: 'commercial',
    accent: '#f39c12',
    icon: 'mdi:bullhorn',
    order: 6,
    date: new Date('2025-01-25'),
  },
];

const projects = [
  {
    title: 'Cinematic Showreel 2025',
    description: 'A 2-minute highlight reel showcasing my best work across weddings, brands, and music videos.',
    tags: ['premiere', 'davinci', 'aftereffects'],
    thumbnail: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=500&fit=crop',
    links: ['https://www.youtube.com/'],
    order: 1,
  },
  {
    title: 'Wedding Highlight Series',
    description: 'Cinematic wedding highlight films with emotional storytelling and filmic color grades.',
    tags: ['wedding', 'premiere'],
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=500&fit=crop',
    links: ['https://www.youtube.com/', 'https://www.instagram.com/'],
    order: 2,
  },
  {
    title: 'Brand Film Collection',
    description: 'Corporate brand films for startups and established companies.',
    tags: ['corporate', 'davinci'],
    thumbnail: 'https://images.unsplash.com/photo-1492619375914-88005aa99e8b?w=800&h=500&fit=crop',
    links: ['https://www.youtube.com/'],
    order: 3,
  },
  {
    title: 'The Last Frame — Short Film Edit',
    description: 'A narrative short with deliberate pacing, VFX compositing, and a haunting score.',
    tags: ['aftereffects', 'premiere'],
    thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=500&fit=crop',
    links: ['https://vimeo.com/'],
    order: 4,
  },
];

const profile = {
  name: 'Priyansh',
  title: 'Video Editor',
  tagline:
    'Dedicated Video Editor crafting cinematic stories. I help brands, creators, and filmmakers bring their vision to life through powerful visual storytelling.',
  location: 'IND',
  portrait: '/assets/images/portrait.webp',
  about: [
    "I've been obsessed with moving images since I picked up my first camera at 14. What started as cutting together travel clips for friends quickly turned into a full-blown passion for cinematic storytelling.",
    'My toolkit lives in Premiere Pro, DaVinci Resolve, and After Effects, but great editing is about rhythm, emotion, and knowing exactly when to hold a shot and when to cut.',
    'From wedding films that make people cry to punchy Instagram reels and corporate brand films, I love working across formats.',
  ],
  socials: {
    email: 'priyansh@email.com',
    instagram: 'https://www.instagram.com/',
    youtube: 'https://www.youtube.com/',
    linkedin: 'https://www.linkedin.com/',
  },
};

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