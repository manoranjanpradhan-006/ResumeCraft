import React from 'react';
import { Plus, Trash2, Globe } from 'lucide-react';

const GithubIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);

export default function ProjectsForm({ projects = [], onChange }) {
  function handleAdd() {
    const newProj = {
      id: `proj-${Date.now()}`,
      title: '',
      technologies: [],
      link: '',
      github: '',
      description: ''
    };
    onChange([...projects, newProj]);
  }

  function handleRemove(id) {
    onChange(projects.filter(p => p.id !== id));
  }

  function handleUpdate(id, field, value) {
    onChange(projects.map(p => {
      if (p.id === id) {
        return { ...p, [field]: value };
      }
      return p;
    }));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400">
          Highlight 2-4 key technical projects demonstrating real impact.
        </span>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-sm transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Project</span>
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="p-6 text-center border border-dashed border-slate-800 rounded-xl text-slate-500 text-xs">
          No projects added yet. Click "Add Project" to showcase your work.
        </div>
      ) : (
        projects.map((proj, idx) => (
          <div
            key={proj.id || idx}
            className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3 relative"
          >
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Project #{idx + 1}
              </span>
              <button
                type="button"
                onClick={() => handleRemove(proj.id)}
                className="text-slate-500 hover:text-red-400 p-1 rounded transition"
                title="Remove project"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={proj.title || ''}
                  onChange={e => handleUpdate(proj.id, 'title', e.target.value)}
                  placeholder="e.g. Distributed Task Queue"
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Technologies Used (comma separated)
                </label>
                <input
                  type="text"
                  value={(proj.technologies || []).join(', ')}
                  onChange={e =>
                    handleUpdate(
                      proj.id,
                      'technologies',
                      e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                    )
                  }
                  placeholder="e.g. React, Node.js, Redis, Docker"
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Live URL
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
                  <input
                    type="text"
                    value={proj.link || ''}
                    onChange={e => handleUpdate(proj.id, 'link', e.target.value)}
                    placeholder="https://myproject.com"
                    className="w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  GitHub Repository
                </label>
                <div className="relative">
                  <GithubIcon className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
                  <input
                    type="text"
                    value={proj.github || ''}
                    onChange={e => handleUpdate(proj.id, 'github', e.target.value)}
                    placeholder="https://github.com/user/project"
                    className="w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Description & Outcomes
              </label>
              <textarea
                rows={2}
                value={proj.description || ''}
                onChange={e => handleUpdate(proj.id, 'description', e.target.value)}
                placeholder="Engineered high throughput distributed worker system processing 50k jobs/sec with automated failover..."
                className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}
