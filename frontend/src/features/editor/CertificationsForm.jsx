import React from 'react';
import { Plus, Trash2, Award } from 'lucide-react';

export default function CertificationsForm({ certifications = [], onChange }) {
  function handleAdd() {
    const newCert = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      date: ''
    };
    onChange([...certifications, newCert]);
  }

  function handleRemove(id) {
    onChange(certifications.filter(c => c.id !== id));
  }

  function handleUpdate(id, field, value) {
    onChange(certifications.map(c => {
      if (c.id === id) {
        return { ...c, [field]: value };
      }
      return c;
    }));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400">
          Industry certifications, licenses, and notable honors.
        </span>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-sm transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Certification</span>
        </button>
      </div>

      {certifications.length === 0 ? (
        <div className="p-6 text-center border border-dashed border-slate-800 rounded-xl text-slate-500 text-xs">
          No certifications added. Click "Add Certification" to highlight your credentials.
        </div>
      ) : (
        certifications.map((cert, idx) => (
          <div
            key={cert.id || idx}
            className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3 relative"
          >
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Certificate #{idx + 1}</span>
              </span>
              <button
                type="button"
                onClick={() => handleRemove(cert.id)}
                className="text-slate-500 hover:text-red-400 p-1 rounded transition"
                title="Remove certification"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-1">
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Certification Name *
                </label>
                <input
                  type="text"
                  value={cert.name || ''}
                  onChange={e => handleUpdate(cert.id, 'name', e.target.value)}
                  placeholder="e.g. AWS Solutions Architect"
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Issuing Organization *
                </label>
                <input
                  type="text"
                  value={cert.issuer || ''}
                  onChange={e => handleUpdate(cert.id, 'issuer', e.target.value)}
                  placeholder="e.g. Amazon Web Services"
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Issue Date / Year
                </label>
                <input
                  type="text"
                  value={cert.date || ''}
                  onChange={e => handleUpdate(cert.id, 'date', e.target.value)}
                  placeholder="e.g. 2023-06"
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
