import { applicationStore } from '../services/storage.js';

export async function listApplications(req, res) {
  try {
    const applications = await applicationStore.listByUser(req.user.id);
    return res.status(200).json({ applications });
  } catch (err) {
    console.error('List applications error:', err);
    return res.status(500).json({ error: 'Failed to retrieve applications.' });
  }
}

export async function createApplication(req, res) {
  try {
    const { company, position, location, salary, status, appliedDate, jobUrl, resumeUsed, notes } = req.body;

    if (!company || !position) {
      return res.status(400).json({ error: 'Company and position are required.' });
    }

    const application = await applicationStore.create({
      userId: req.user.id,
      company,
      position,
      location,
      salary,
      status: status || 'applied',
      appliedDate,
      jobUrl,
      resumeUsed,
      notes
    });

    return res.status(201).json({
      message: 'Application created successfully',
      application
    });
  } catch (err) {
    console.error('Create application error:', err);
    return res.status(500).json({ error: 'Failed to create application.' });
  }
}

export async function getApplication(req, res) {
  try {
    const { id } = req.params;
    const application = await applicationStore.getById(id, req.user.id);
    if (!application) {
      return res.status(404).json({ error: 'Application not found or unauthorized.' });
    }
    return res.status(200).json({ application });
  } catch (err) {
    console.error('Get application error:', err);
    return res.status(500).json({ error: 'Failed to retrieve application.' });
  }
}

export async function updateApplication(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updated = await applicationStore.update(id, req.user.id, updates);
    if (!updated) {
      return res.status(404).json({ error: 'Application not found or unauthorized.' });
    }

    return res.status(200).json({
      message: 'Application updated successfully',
      application: updated
    });
  } catch (err) {
    console.error('Update application error:', err);
    return res.status(500).json({ error: 'Failed to update application.' });
  }
}

export async function deleteApplication(req, res) {
  try {
    const { id } = req.params;
    const deleted = await applicationStore.delete(id, req.user.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Application not found or already deleted.' });
    }
    return res.status(200).json({ message: 'Application deleted successfully.' });
  } catch (err) {
    console.error('Delete application error:', err);
    return res.status(500).json({ error: 'Failed to delete application.' });
  }
}
