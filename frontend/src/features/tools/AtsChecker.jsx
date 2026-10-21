import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  Loader2, 
  FileText, 
  Check, 
  AlertTriangle, 
  Award, 
  Wrench 
} from 'lucide-react';
import { aiService } from '../../services/api';
import { resumeToText } from '../../utils/resumeToText';

export default function AtsChecker({ currentResumeData, onNavigateToBuilder }) {
  const [resumeText, setResumeText] = useState(() => resumeToText(currentResumeData));
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  async function handleAudit() {
    if (!resumeText.trim()) {
      setError('Please provide resume text to audit.');
      return;
    }

    setError('');
    setLoading(true);
    try {
      const data = await aiService.checkAtsScore(resumeText);
      setResults(data);
    } catch (err) {
      setError(err.message || 'Failed to check ATS score.');
    } finally {
      setLoading(false);
    }
  }

  function handleLoadActiveResume() {
    setResumeText(resumeToText(currentResumeData));
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-indigo-950/60 border border-emerald-800/40 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ATS Parseability & Health Auditor</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Test Your Resume Against Modern ATS Systems
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Find out if automated parsers (Workday, Taleo, Greenhouse) can extract your skills, detect your achievements, and rank you in the top 10% of applicants.
            </p>
          </div>

          <button
            onClick={handleAudit}
            disabled={loading}
            className="self-start md:self-center px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all shrink-0 active:scale-95"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 text-amber-300" />
            )}
            <span>{loading ? 'Running Audit...' : 'Audit ATS Score'}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-xs text-red-300">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Input Textarea */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-400" />
            <label className="text-xs font-bold text-white uppercase tracking-wider">
              Resume Content for Audit
            </label>
          </div>
          <button
            type="button"
            onClick={handleLoadActiveResume}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-medium underline"
          >
            Sync Active Resume
          </button>
        </div>
        <textarea
          rows={10}
          value={resumeText}
          onChange={e => setResumeText(e.target.value)}
          placeholder="Paste resume text here or click 'Sync Active Resume'..."
          className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500 leading-relaxed font-mono"
        />
      </div>

      {/* Results Display */}
      {results && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6 animate-in fade-in duration-300">
          {/* Top Score Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-slate-800 pb-6">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full bg-slate-900 border-4 border-emerald-500 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
                <span className="text-xl font-extrabold text-white">
                  {results.atsScore}
                </span>
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Overall ATS Score
                </span>
                <p className="text-xs text-slate-500 mt-0.5">
                  Target: 80+ for automated pass
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Compliance Grade
                </span>
                <div className="text-2xl font-black text-emerald-400 mt-0.5">
                  {results.grade}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Engine Status
                </span>
                <div className="text-sm font-bold text-white capitalize mt-0.5">
                  {results.provider === 'gemini' ? 'Gemini 1.5 Evaluator' : 'Workday ATS Heuristic'}
                </div>
              </div>
            </div>
          </div>

          {/* Breakdown Bars */}
          {results.breakdown && (
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Category Passability Breakdown
              </h3>
              <div className="space-y-2.5 text-xs">
                {[
                  { name: 'Contact & Profile Links', score: results.breakdown.contactInfo },
                  { name: 'Executive Summary Quality', score: results.breakdown.summary },
                  { name: 'Experience & Action Metrics', score: results.breakdown.experience },
                  { name: 'Technical Keywords Density', score: results.breakdown.skills },
                  { name: 'Formatting & Layout Cleanliness', score: results.breakdown.formatting }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-slate-400">
                      <span>{item.name}</span>
                      <span className="font-semibold text-slate-200">{item.score || 0}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-indigo-500 transition-all duration-500"
                        style={{ width: `${Math.min(item.score || 0, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Strengths & Issues */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Strengths</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {results.strengths?.map((str, i) => (
                  <li key={i} className="flex items-start gap-2 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-normal">{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
                <AlertTriangle className="w-4 h-4" />
                <span>Issues & Formatting Gaps</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {results.issues?.map((issue, i) => (
                  <li key={i} className="flex items-start gap-2 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="leading-normal">{issue}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {results.actionableFixes && results.actionableFixes.length > 0 && (
            <div className="p-5 rounded-xl bg-indigo-950/20 border border-indigo-800/40 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-indigo-300">
                <Wrench className="w-4 h-4" />
                <span>Recommended Action Steps to Reach 95%+</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {results.actionableFixes.map((fix, i) => (
                  <li key={i} className="flex items-start gap-2 bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-indigo-400 font-bold mt-0.5">{i + 1}.</span>
                    <span className="leading-normal">{fix}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={onNavigateToBuilder}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition"
            >
              <span>Edit Resume in Builder</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
