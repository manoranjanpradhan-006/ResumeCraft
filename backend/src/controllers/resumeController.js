import { resumeStore } from '../services/storage.js';

export async function listResumes(req, res) {
  try {
    const resumes = await resumeStore.listByUser(req.user.id);
    return res.status(200).json({ resumes });
  } catch (err) {
    console.error('List resumes error:', err);
    return res.status(500).json({ error: 'Failed to retrieve resumes.' });
  }
}

export async function createResume(req, res) {
  try {
    const { title, template, data } = req.body;
    const resume = await resumeStore.create({
      userId: req.user.id,
      title: title || 'My Resume',
      template: template || 'ats',
      data: data || {}
    });
    return res.status(201).json({
      message: 'Resume created successfully',
      resume
    });
  } catch (err) {
    console.error('Create resume error:', err);
    return res.status(500).json({ error: 'Failed to create resume.' });
  }
}

export async function getResume(req, res) {
  try {
    const { id } = req.params;
    const resume = await resumeStore.getById(id, req.user.id);
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found or you do not have permission to access it.' });
    }
    return res.status(200).json({ resume });
  } catch (err) {
    console.error('Get resume error:', err);
    return res.status(500).json({ error: 'Failed to retrieve resume.' });
  }
}

export async function updateResume(req, res) {
  try {
    const { id } = req.params;
    const { title, template, data } = req.body;

    const updated = await resumeStore.update(id, req.user.id, {
      ...(title !== undefined && { title }),
      ...(template !== undefined && { template }),
      ...(data !== undefined && { data })
    });

    if (!updated) {
      return res.status(404).json({ error: 'Resume not found or access denied.' });
    }

    return res.status(200).json({
      message: 'Resume updated successfully',
      resume: updated
    });
  } catch (err) {
    console.error('Update resume error:', err);
    return res.status(500).json({ error: 'Failed to update resume.' });
  }
}

export async function deleteResume(req, res) {
  try {
    const { id } = req.params;
    const deleted = await resumeStore.delete(id, req.user.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Resume not found or already deleted.' });
    }
    return res.status(200).json({ message: 'Resume deleted successfully.' });
  } catch (err) {
    console.error('Delete resume error:', err);
    return res.status(500).json({ error: 'Failed to delete resume.' });
  }
}

export async function duplicateResume(req, res) {
  try {
    const { id } = req.params;
    const original = await resumeStore.getById(id, req.user.id);
    if (!original) {
      return res.status(404).json({ error: 'Original resume not found.' });
    }

    const copy = await resumeStore.create({
      userId: req.user.id,
      title: `${original.title} (Copy)`,
      template: original.template,
      data: original.data
    });

    return res.status(201).json({
      message: 'Resume duplicated successfully',
      resume: copy
    });
  } catch (err) {
    console.error('Duplicate resume error:', err);
    return res.status(500).json({ error: 'Failed to duplicate resume.' });
  }
}
