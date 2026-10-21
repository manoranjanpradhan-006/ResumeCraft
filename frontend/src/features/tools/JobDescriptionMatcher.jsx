import React, { useState } from 'react';
import { 
  Target, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  Loader2, 
  FileText, 
  Briefcase,
  TrendingUp,
  XCircle,
  Wrench
} from 'lucide-react';
import { aiService } from '../../services/api';
import { resumeToText } from '../../utils/resumeToText';

const SAMPLE_JD = `Senior Full Stack Developer
Company: Horizon Cloud Systems

About the Role:
We are seeking an experienced Senior Full Stack Engineer to build and scale our high-throughput data analytics platform. You will work on distributed systems, modern web dashboards, and cloud infrastructure.

Key Qualifications & Requirements:
- 4+ years of professional experience with React, TypeScript, and Node.js.
- Strong proficiency in PostgreSQL, Redis, and message streaming with Kafka.
- Hands-on experience deploying containerized microservices to AWS (ECS, Lambda, S3).
- Experience with GraphQL APIs and Docker containerization.
- Proven ability to optimize database query latency and maintain high availability (99.9%+).
- Track record of mentoring junior engineers and participating in agile ceremonies.`;

export default function JobDescriptionMatcher({ currentResumeData, onNavigateToBuilder }) {
  const [resumeText, setResumeText] = useState(() => resumeToText(currentResumeData));
  const [jobDescription, setJobDescription] = useState(SAMPLE_JD);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  async function handleAnalyze() {
    if (!resumeText.trim() || !jobDescription.trim()) {
      setError('Please provide both your resume content and the job description.');
      return;
    }

    setError('');
    setLoading(true);
    try {
      const data = await aiService.matchJobDescription(resumeText, jobDescription);
      setResults(data);
    } catch (err) {
      setError(err.message || 'Failed to analyze job description match.');
    } finally {
      setLoading(false);
    }
  }

  function handleLoadActiveResume() {
    setResumeText(resumeToText(currentResumeData));
  }

  function handleLoadSampleJd() {
    setJobDescription(SAMPLE_JD);
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-violet-950/60 border border-indigo-800/40 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold uppercase tracking-wider mb-2">
              <Target className="w-3.5 h-3.5" />
              <span>AI Job Match & Shortlisting Predictor</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Match Your Resume With Any Job Description
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Discover your shortlisting chance, uncover missing ATS keywords, see exactly what is holding your resume back, and get precise step-by-step instructions on how to fix each issue.
            </p>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="self-start md:self-center px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 hover:from-indigo-600 hover:to-violet-700 disabled:opacity-50 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all shrink-0 active:scale-95"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 text-amber-300" />
            )}
            <span>{loading ? 'Analyzing Match...' : 'Calculate Shortlisting Chance'}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-xs text-red-300">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Two Column Input Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Resume Content */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              <label className="text-xs font-bold text-white uppercase tracking-wider">
                Your Resume Text
              </label>
            </div>
            <button
              type="button"
              onClick={handleLoadActiveResume}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium underline"
            >
              Sync Active Resume
            </button>
          </div>
          <textarea
            rows={12}
            value={resumeText}
            onChange={e => setResumeText(e.target.value)}
            placeholder="Paste your plain resume text here, or click 'Sync Active Resume' above..."
            className="w-full flex-1 p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 leading-relaxed font-mono"
          />
        </div>

        {/* Right: Job Description */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-violet-400" />
              <label className="text-xs font-bold text-white uppercase tracking-wider">
                Target Job Description (JD)
              </label>
            </div>
            <button
              type="button"
              onClick={handleLoadSampleJd}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium underline"
            >
              Load Sample JD
            </button>
          </div>
          <textarea
            rows={12}
            value={jobDescription}
            onChange={e => setJobDescription(e.target.value)}
            placeholder="Paste the full job posting, required qualifications, and responsibilities here..."
            className="w-full flex-1 p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 leading-relaxed"
          />
        </div>
      </div>

      {/* Analysis Results Display */}
      {results && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6 animate-in fade-in duration-300">
          {/* Top Score Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-slate-800 pb-6">
            {/* Match Score */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full bg-slate-900 border-4 border-indigo-500 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">
                <span className="text-lg font-extrabold text-white">
                  {results.matchScore}%
                </span>
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Overall Match Score
                </span>
                <p className="text-xs text-slate-500 mt-0.5">
                  Semantic & keyword alignment with role
                </p>
              </div>
            </div>

            {/* Shortlisting Chance */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Shortlisting Chance
                </span>
                <div className="text-base font-bold text-emerald-400 mt-0.5">
                  {results.shortlistingChance}
                </div>
              </div>
            </div>

            {/* AI Engine Provider */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-violet-400" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Audit Intelligence
                </span>
                <div className="text-sm font-bold text-white capitalize mt-0.5">
                  {results.provider === 'gemini' ? 'Google Gemini 1.5' : 'ATS Heuristic Engine'}
                </div>
              </div>
            </div>
          </div>

          {/* Overview Summary */}
          {results.summary && (
            <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-800/40 text-xs sm:text-sm text-indigo-200 leading-relaxed">
              <strong>Match Evaluation:</strong> {results.summary}
            </div>
          )}

          {/* Keywords Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Matching Keywords */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>Found In Both ({results.matchingKeywords?.length || 0})</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {results.matchingKeywords?.map((kw, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-950/40 text-emerald-300 border border-emerald-800/50"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Keywords */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-rose-400 uppercase tracking-wider">
                <XCircle className="w-4 h-4" />
                <span>Missing ATS Keywords ({results.missingKeywords?.length || 0})</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {results.missingKeywords?.map((kw, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md text-xs font-medium bg-rose-950/40 text-rose-300 border border-rose-800/50"
                  >
                    + {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Diagnosis: What is Wrong & How to Fix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* What is Wrong */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
                <AlertCircle className="w-4 h-4" />
                <span>⚠️ What Is Holding Your Resume Back</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {results.issues?.map((issue, i) => (
                  <li key={i} className="flex items-start gap-2 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-amber-400 font-bold mt-0.5">•</span>
                    <span className="leading-normal">{issue}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* How It Can Be Fixed */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-indigo-400">
                <Wrench className="w-4 h-4" />
                <span>💡 Actionable Fixes & Adjustments</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {results.actionableFixes?.map((fix, i) => (
                  <li key={i} className="flex items-start gap-2 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-indigo-400 font-bold mt-0.5">✓</span>
                    <span className="leading-normal">{fix}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={onNavigateToBuilder}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition"
            >
              <span>Open Resume in Builder to Apply Fixes</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
