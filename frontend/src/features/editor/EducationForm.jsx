import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function EducationForm({ education = [], onChange }) {
  function handleAdd() {
    const newEdu = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: ''
    };
    onChange([...education, newEdu]);
  }

  function handleRemove(id) {
    onChange(education.filter(e => e.id !== id));
  }

  function handleUpdate(id, field, value) {
    onChange(education.map(e => {
      if (e.id === id) {
        return { ...e, [field]: value };
      }
      return e;
    }));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400">
          Degrees, universities, colleges, and academic credentials.
        </span>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-sm transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Education</span>
        </button>
      </div>

      {education.length === 0 ? (
        <div className="p-6 text-center border border-dashed border-slate-800 rounded-xl text-slate-500 text-xs">
          No education entries added. Click "Add Education" to add your degree.
        </div>
      ) : (
        education.map((edu, idx) => (
          <div
            key={edu.id || idx}
            className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3 relative"
          >
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Education #{idx + 1}
              </span>
              <button
                type="button"
                onClick={() => handleRemove(edu.id)}
                className="text-slate-500 hover:text-red-400 p-1 rounded transition"
                title="Remove entry"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Institution / University *
                </label>
                <input
                  type="text"
                  value={edu.institution || ''}
                  onChange={e => handleUpdate(edu.id, 'institution', e.target.value)}
                  placeholder="e.g. UC Berkeley"
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Degree & Level *
                </label>
                <input
                  type="text"
                  value={edu.degree || ''}
                  onChange={e => handleUpdate(edu.id, 'degree', e.target.value)}
                  placeholder="e.g. Bachelor of Science"
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Field of Study
                </label>
                <input
                  type="text"
                  value={edu.field || ''}
                  onChange={e => handleUpdate(edu.id, 'field', e.target.value)}
                  placeholder="e.g. Computer Science"
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={edu.location || ''}
                  onChange={e => handleUpdate(edu.id, 'location', e.target.value)}
                  placeholder="e.g. Berkeley, CA"
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Start Year
                  </label>
                  <input
                    type="text"
                    value={edu.startDate || ''}
                    onChange={e => handleUpdate(edu.id, 'startDate', e.target.value)}
                    placeholder="e.g. 2017"
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Graduation Year
                  </label>
                  <input
                    type="text"
                    value={edu.endDate || ''}
                    onChange={e => handleUpdate(edu.id, 'endDate', e.target.value)}
                    placeholder="e.g. 2021"
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  GPA or Percentage (Optional)
                </label>
                <input
                  type="text"
                  value={edu.gpa || ''}
                  onChange={e => handleUpdate(edu.id, 'gpa', e.target.value)}
                  placeholder="e.g. 3.8 / 4.0"
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
