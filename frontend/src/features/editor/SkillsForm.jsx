import React, { useState } from 'react';
import { X, Plus, Lightbulb } from 'lucide-react';

export default function SkillsForm({ skills = {}, onChange }) {
  const [inputs, setInputs] = useState({
    languages: '',
    frameworks: '',
    databases: '',
    tools: ''
  });

  const categories = [
    { key: 'languages', title: 'Programming Languages', placeholder: 'e.g. JavaScript, TypeScript, Python, SQL, Go' },
    { key: 'frameworks', title: 'Frameworks & Libraries', placeholder: 'e.g. React, Node.js, Express, Next.js, Tailwind CSS' },
    { key: 'databases', title: 'Databases & Caching', placeholder: 'e.g. PostgreSQL, MongoDB, Redis, MySQL' },
    { key: 'tools', title: 'Developer Tools & Cloud', placeholder: 'e.g. Git, Docker, AWS, CI/CD, Kubernetes, Postman' }
  ];

  function handleAddTag(key) {
    const val = (inputs[key] || '').trim();
    if (!val) return;

    // Support comma separated pasting
    const newItems = val
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const currentList = skills[key] || [];
    const merged = Array.from(new Set([...currentList, ...newItems]));

    onChange({
      ...skills,
      [key]: merged
    });

    setInputs({ ...inputs, [key]: '' });
  }

  function handleRemoveTag(key, itemToRemove) {
    const currentList = skills[key] || [];
    onChange({
      ...skills,
      [key]: currentList.filter(item => item !== itemToRemove)
    });
  }

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-800/40 flex items-start gap-2 text-xs text-indigo-300">
        <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <span>
          <strong>ATS Tip:</strong> Include exact keywords from job descriptions you are targeting. You can paste comma-separated lists and press Enter or "Add".
        </span>
      </div>

      <div className="space-y-4">
        {categories.map(cat => {
          const list = skills[cat.key] || [];
          return (
            <div key={cat.key} className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
              <label className="block text-xs font-semibold text-slate-200">
                {cat.title}
              </label>

              {/* Tag Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputs[cat.key]}
                  onChange={e => setInputs({ ...inputs, [cat.key]: e.target.value })}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag(cat.key);
                    }
                  }}
                  placeholder={cat.placeholder}
                  className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => handleAddTag(cat.key)}
                  className="px-3 py-1.5 bg-indigo-600/80 hover:bg-indigo-600 text-white rounded-lg text-xs font-medium flex items-center gap-1 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>

              {/* Tag Badges */}
              {list.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {list.map((item, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700/80"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(cat.key, item)}
                        className="text-slate-400 hover:text-red-400 ml-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
