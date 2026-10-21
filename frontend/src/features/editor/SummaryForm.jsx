import React, { useState } from 'react';
import { Sparkles, Loader2, CheckCircle2 } from 'lucide-react';
import { aiService } from '../../services/api';

export default function SummaryForm({ summary, jobTitle, onChange }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleEnhance() {
    if (!summary || summary.trim().length === 0) return;
    setLoading(true);
    setSuccess(false);
    try {
      const res = await aiService.enhance('summary', summary, jobTitle);
      if (res && res.enhanced) {
        onChange(res.enhanced);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Enhancement error:', err);
    } finally {
      setLoading(false);
    }
  }

  const wordCount = summary ? summary.trim().split(/\s+/).filter(Boolean).length : 0;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-300">
          Professional Summary
        </label>

        <button
          type="button"
          onClick={handleEnhance}
          disabled={loading || !summary}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold text-indigo-300 bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-700/60 disabled:opacity-40 transition"
        >
          {loading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" />
          ) : success ? (
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          )}
          <span>{loading ? 'Enhancing...' : success ? 'Enhanced!' : '✨ AI Polish'}</span>
        </button>
      </div>

      <div className="relative">
        <textarea
          rows={5}
          value={summary || ''}
          onChange={e => onChange(e.target.value)}
          placeholder="Briefly summarize your background, key technical proficiencies, years of experience, and primary accomplishments..."
          className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 leading-relaxed"
        />
        <div className="flex justify-between items-center text-[11px] text-slate-500 mt-1">
          <span>Target: 40–80 words for optimal ATS scoring</span>
          <span className={wordCount > 100 ? 'text-amber-400' : 'text-slate-400'}>
            {wordCount} words
          </span>
        </div>
      </div>
    </div>
  );
}
