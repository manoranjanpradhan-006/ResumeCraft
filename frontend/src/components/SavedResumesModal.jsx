import React, { useState, useEffect } from 'react';
import { 
  X, 
  FolderPlus, 
  Copy, 
  Trash2, 
  FileCheck, 
  Loader2, 
  AlertCircle, 
  Save, 
  Calendar,
  ExternalLink 
} from 'lucide-react';
import { resumeService } from '../services/api';

export default function SavedResumesModal({
  isOpen,
  onClose,
  currentResumeData,
  currentTemplate,
  currentResumeId,
  onLoadResume,
  onSaveSuccess
}) {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [resumeTitle, setResumeTitle] = useState('My Resume');
  const [error, setError] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchResumes();
      if (currentResumeData?.personal?.fullName) {
        setResumeTitle(`${currentResumeData.personal.fullName}'s Resume`);
      }
    }
  }, [isOpen]);

  async function fetchResumes() {
    setLoading(true);
    setError('');
    try {
      const list = await resumeService.listResumes();
      setResumes(list || []);
    } catch (err) {
      setError(err.message || 'Failed to load resumes');
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveNew() {
    if (!resumeTitle.trim()) return;
    setSaving(true);
    setError('');
    try {
      const saved = await resumeService.createResume(
        resumeTitle,
        currentTemplate,
        currentResumeData
      );
      setStatusMsg('Saved new resume successfully!');
      onSaveSuccess(saved);
      fetchResumes();
    } catch (err) {
      setError(err.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdateCurrent() {
    if (!currentResumeId) return;
    setSaving(true);
    setError('');
    try {
      const updated = await resumeService.updateResume(
        currentResumeId,
        resumeTitle,
        currentTemplate,
        currentResumeData
      );
      setStatusMsg('Updated resume successfully!');
      onSaveSuccess(updated);
      fetchResumes();
    } catch (err) {
      setError(err.message || 'Failed to update');
    } finally {
      setSaving(false);
    }
  }

  async function handleDuplicate(id) {
    try {
      await resumeService.duplicateResume(id);
      fetchResumes();
    } catch (err) {
      setError(err.message || 'Failed to duplicate');
    }
  }

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this saved resume?')) return;
    try {
      await resumeService.deleteResume(id);
      fetchResumes();
    } catch (err) {
      setError(err.message || 'Failed to delete');
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl max-h-[85vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-5">
          <h2 className="text-xl font-bold text-white tracking-tight">
            My Saved Resumes
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage your saved resumes, create copies for different roles, and switch between versions
          </p>
        </div>

        {/* Save Current Section */}
        <div className="mb-5 p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            value={resumeTitle}
            onChange={e => setResumeTitle(e.target.value)}
            placeholder="Resume title (e.g. Frontend Engineer - TechCorp)"
            className="w-full sm:flex-1 px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {currentResumeId && (
              <button
                onClick={handleUpdateCurrent}
                disabled={saving}
                className="flex-1 sm:flex-initial px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 rounded-lg flex items-center justify-center gap-1.5 transition"
              >
                <Save className="w-3.5 h-3.5 text-indigo-400" />
                <span>Update Existing</span>
              </button>
            )}
            <button
              onClick={handleSaveNew}
              disabled={saving}
              className="flex-1 sm:flex-initial px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white rounded-lg flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/30 transition"
            >
              <FolderPlus className="w-3.5 h-3.5" />
              <span>Save As New</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-xs text-red-300">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {statusMsg && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-xs text-emerald-300">
            <FileCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{statusMsg}</span>
          </div>
        )}

        {/* Resumes List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center text-slate-400 gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
              <span className="text-xs">Loading resumes...</span>
            </div>
          ) : resumes.length === 0 ? (
            <div className="py-10 text-center text-slate-500 text-xs border border-dashed border-slate-800 rounded-xl">
              No saved resumes yet. Click "Save As New" above to save your current work!
            </div>
          ) : (
            resumes.map(r => (
              <div
                key={r.id}
                className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition ${
                  currentResumeId === r.id
                    ? 'bg-indigo-950/20 border-indigo-500/50'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-white truncate">
                      {r.title}
                    </span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {r.template || 'ats'}
                    </span>
                    {currentResumeId === r.id && (
                      <span className="text-[10px] text-indigo-400 font-medium">
                        (Active)
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                    <Calendar className="w-3 h-3" />
                    <span>Last modified: {new Date(r.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => {
                      onLoadResume(r);
                      onClose();
                    }}
                    title="Load into editor"
                    className="px-2.5 py-1.5 bg-indigo-600/80 hover:bg-indigo-600 text-white rounded-lg text-xs font-medium flex items-center gap-1 transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open</span>
                  </button>
                  <button
                    onClick={() => handleDuplicate(r.id)}
                    title="Duplicate copy"
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(r.id)}
                    title="Delete resume"
                    className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
