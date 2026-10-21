import React, { useState } from 'react';
import { Plus, Trash2, Sparkles, Loader2, GripVertical, Building, MapPin, Calendar } from 'lucide-react';
import { aiService } from '../../services/api';

export default function ExperienceForm({ experiences = [], onChange }) {
  const [enhancingId, setEnhancingId] = useState(null);

  function handleAddExperience() {
    const newExp = {
      id: `exp-${Date.now()}`,
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      bullets: ['']
    };
    onChange([...experiences, newExp]);
  }

  function handleRemoveExperience(id) {
    onChange(experiences.filter(exp => exp.id !== id));
  }

  function handleUpdate(id, field, value) {
    onChange(experiences.map(exp => {
      if (exp.id === id) {
        return { ...exp, [field]: value };
      }
      return exp;
    }));
  }

  function handleBulletChange(expId, bIdx, value) {
    onChange(experiences.map(exp => {
      if (exp.id === expId) {
        const newBullets = [...(exp.bullets || [])];
        newBullets[bIdx] = value;
        return { ...exp, bullets: newBullets };
      }
      return exp;
    }));
  }

  function handleAddBullet(expId) {
    onChange(experiences.map(exp => {
      if (exp.id === expId) {
        return { ...exp, bullets: [...(exp.bullets || []), ''] };
      }
      return exp;
    }));
  }

  function handleRemoveBullet(expId, bIdx) {
    onChange(experiences.map(exp => {
      if (exp.id === expId) {
        const newBullets = exp.bullets.filter((_, idx) => idx !== bIdx);
        return { ...exp, bullets: newBullets.length ? newBullets : [''] };
      }
      return exp;
    }));
  }

  async function handleEnhanceBullets(exp) {
    const text = (exp.bullets || []).filter(Boolean).join('\n');
    if (!text.trim()) return;

    setEnhancingId(exp.id);
    try {
      const res = await aiService.enhance('experience', text, exp.position);
      if (res && res.enhanced) {
        const newBullets = res.enhanced
          .split('\n')
          .map(b => b.replace(/^[-*•]\s*/, '').trim())
          .filter(Boolean);
        handleUpdate(exp.id, 'bullets', newBullets);
      }
    } catch (err) {
      console.error('Enhance bullets failed:', err);
    } finally {
      setEnhancingId(null);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400">
          List your relevant work history starting with your most recent role.
        </span>
        <button
          type="button"
          onClick={handleAddExperience}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-sm transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Position</span>
        </button>
      </div>

      {experiences.length === 0 ? (
        <div className="p-6 text-center border border-dashed border-slate-800 rounded-xl text-slate-500 text-xs">
          No experience entries added yet. Click "Add Position" above to add your employment history.
        </div>
      ) : (
        experiences.map((exp, idx) => (
          <div
            key={exp.id || idx}
            className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3 relative group"
          >
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Position #{idx + 1}
              </span>
              <button
                type="button"
                onClick={() => handleRemoveExperience(exp.id)}
                className="text-slate-500 hover:text-red-400 p-1 rounded transition"
                title="Remove entry"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Job Title *
                </label>
                <input
                  type="text"
                  value={exp.position || ''}
                  onChange={e => handleUpdate(exp.id, 'position', e.target.value)}
                  placeholder="e.g. Software Engineer"
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Company / Organization *
                </label>
                <input
                  type="text"
                  value={exp.company || ''}
                  onChange={e => handleUpdate(exp.id, 'company', e.target.value)}
                  placeholder="e.g. Google or TechCorp"
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={exp.location || ''}
                  onChange={e => handleUpdate(exp.id, 'location', e.target.value)}
                  placeholder="e.g. San Francisco, CA or Remote"
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Start Date
                  </label>
                  <input
                    type="text"
                    value={exp.startDate || ''}
                    onChange={e => handleUpdate(exp.id, 'startDate', e.target.value)}
                    placeholder="e.g. 2021-03"
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    End Date
                  </label>
                  <input
                    type="text"
                    disabled={exp.current}
                    value={exp.current ? 'Present' : exp.endDate || ''}
                    onChange={e => handleUpdate(exp.id, 'endDate', e.target.value)}
                    placeholder="e.g. 2023-08"
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 disabled:opacity-50"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`curr-${exp.id}`}
                checked={!!exp.current}
                onChange={e => handleUpdate(exp.id, 'current', e.target.checked)}
                className="rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-0"
              />
              <label htmlFor={`curr-${exp.id}`} className="text-xs text-slate-300 cursor-pointer">
                I currently work here
              </label>
            </div>

            {/* Bullets */}
            <div className="pt-2 border-t border-slate-800/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">
                  Key Achievements & Responsibilities
                </span>
                <button
                  type="button"
                  onClick={() => handleEnhanceBullets(exp)}
                  disabled={enhancingId === exp.id}
                  className="flex items-center gap-1 text-[11px] font-medium text-indigo-400 hover:text-indigo-300 disabled:opacity-40"
                >
                  {enhancingId === exp.id ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Sparkles className="w-3 h-3" />
                  )}
                  <span>✨ Polish Bullets</span>
                </button>
              </div>

              {(exp.bullets || []).map((bullet, bIdx) => (
                <div key={bIdx} className="flex items-start gap-2">
                  <span className="text-slate-500 mt-2 text-xs">•</span>
                  <input
                    type="text"
                    value={bullet}
                    onChange={e => handleBulletChange(exp.id, bIdx, e.target.value)}
                    placeholder="Accomplished [X], measured by [Y], by doing [Z]..."
                    className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveBullet(exp.id, bIdx)}
                    className="p-1.5 text-slate-500 hover:text-red-400"
                    title="Remove bullet"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => handleAddBullet(exp.id)}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium mt-1"
              >
                <Plus className="w-3 h-3" />
                <span>Add bullet point</span>
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
