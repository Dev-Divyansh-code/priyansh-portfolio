import Project from '../models/Project.js';

export async function getProjects(_req, res) {
  const projects = await Project.find().sort({ order: 1 }).lean();
  res.json(projects);
}

export async function getProject(req, res) {
  const project = await Project.findById(req.params.id).lean();
  if (!project) return res.status(404).json({ error: 'Project not found' });
  res.json(project);
}

export async function createProject(req, res) {
  const { title, description, thumbnail } = req.body;

  if (!title?.trim() || !description?.trim() || !thumbnail?.trim()) {
    return res.status(400).json({ error: 'title, description, and thumbnail are required' });
  }

  const project = await Project.create(req.body);
  res.status(201).json(project);
}

export async function updateProject(req, res) {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!project) return res.status(404).json({ error: 'Project not found' });
  res.json(project);
}

export async function deleteProject(req, res) {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) return res.status(404).json({ error: 'Project not found' });
  res.json({ success: true, id: project._id });
}