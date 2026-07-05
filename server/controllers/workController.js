import Work from '../models/Work.js';

export async function getWorks(_req, res) {
  const works = await Work.find().sort({ order: 1, date: -1 }).lean();
  res.json(works);
}

export async function getWork(req, res) {
  const work = await Work.findById(req.params.id).lean();
  if (!work) return res.status(404).json({ error: 'Work not found' });
  res.json(work);
}

export async function createWork(req, res) {
  const { title, description, category } = req.body;

  if (!title?.trim() || !description?.trim() || !category?.trim()) {
    return res.status(400).json({ error: 'title, description, and category are required' });
  }

  const work = await Work.create(req.body);
  res.status(201).json(work);
}

export async function updateWork(req, res) {
  const work = await Work.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!work) return res.status(404).json({ error: 'Work not found' });
  res.json(work);
}

export async function deleteWork(req, res) {
  const work = await Work.findByIdAndDelete(req.params.id);
  if (!work) return res.status(404).json({ error: 'Work not found' });
  res.json({ success: true, id: work._id });
}