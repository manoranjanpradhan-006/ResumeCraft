import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Target, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  Briefcase, 
  Building2, 
  Copy, 
  Check, 
  RotateCcw, 
  Loader2, 
  TrendingUp, 
  Layers, 
  Zap, 
  Send,
  AlertCircle,
  Eye,
  BookmarkPlus
} from 'lucide-react';
import { aiService, applicationService } from '../../services/api';
import { resumeToText } from '../../utils/resumeToText';

const PRESET_JDS = [
  {
    name: 'Stripe — Senior Full Stack',
    company: 'Stripe',
    role: 'Senior Full Stack Engineer',
    text: `Senior Full Stack Engineer
Company: Stripe
Location: San Francisco, CA / Remote

About the Role:
We are looking for an experienced Full Stack Engineer to build next-generation merchant checkout experiences. You will design reliable financial primitives, low-latency React interfaces, and distributed microservices.

Requirements & Tech Stack:
- 4+ years building high-availability web applications with React, TypeScript, and Node.js.
- Strong knowledge of PostgreSQL, Redis caching, and Kafka event streaming.
- Experience with AWS infrastructure (ECS, Lambda, S3, CloudFront) and Docker.
- Track record of optimizing API latency, managing 99.99% uptime, and zero-downtime database migrations.
- Passion for rigorous testing (Jest, Cypress, integration tests) and high security standards.`
  },
  {
    name: 'OpenAI — Web Platform Lead',
    company: 'OpenAI',
    role: 'Full Stack Web Platform Developer',
    text: `Full Stack Web Platform Developer
Company: OpenAI
Location: San Francisco, CA

About the Role:
Join the team building the web platform interfaces that power ChatGPT and our developer API playground.

Requirements & Tech Stack:
- Deep expertise in Next.js, React, TypeScript, and modern state management.
- Backend proficiency in Node.js, Python, FastAPI, and PostgreSQL.
- Experience with real-time streaming interfaces (WebSockets, SSE) and high-concurrency microservices.
- Familiarity with containerized deployments (Docker, Kubernetes) and CI/CD pipelines.
- Proven ability to reduce client bundle sizes and optimize web vitals (LCP, FID, CLS).`
  },
  {
    name: 'Datadog — Backend API Engineer',
    company: 'Datadog',
    role: 'Backend API Engineer',
    text: `Backend API Engineer
Company: Datadog
Location: New York, NY / Remote

About the Role:
We are looking for a Backend Engineer to scale our telemetry collection pipelines and public REST/GraphQL APIs handling petabytes of data daily.

Requirements & Tech Stack:
- Experience building distributed backend services with Node.js, Go, or Python.
- Strong foundation in distributed systems, Kafka, Redis, and high-throughput PostgreSQL.
- Hands-on expertise with Docker, Kubernetes, and monitoring distributed microservices.
- Experience authoring clean, documented REST and GraphQL endpoints.
- Passion for latency profiling, performance tuning, and automated test coverage.`
  }
];

export default function ResumeTailor({
  currentResumeData,
  onApplyTailoredResume,
  onNavigateToBuilder,
  onNavigateToTracker,
  initialJobDescription = ''
}) {
  const [jobDescription, setJobDescription] = useState(
    initialJobDescription || PRESET_JDS[0].text
  );
  const [targetJobTitle, setTargetJobTitle] = useState(PRESET_JDS[0].role);
  const [companyName, setCompanyName] = useState(PRESET_JDS[0].company);
  
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState('');
  const [tailoredResult, setTailoredResult] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'summary' | 'skills' | 'experience' | 'projects'
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [appliedSuccess, setAppliedSuccess] = useState(false);
  const [trackerSuccess, setTrackerSuccess] = useState(false);

  function handleSelectPreset(preset) {
    setJobDescription(preset.text);
    setTargetJobTitle(preset.role);
    setCompanyName(preset.company);
  }

  async function handleGenerateTailoredResume() {
    if (!jobDescription.trim()) {
      setError('Please provide a target job description.');
      return;
    }

    setError('');
    setLoading(true);
    setTailoredResult(null);
    setAppliedSuccess(false);
    setTrackerSuccess(false);

    // Simulate progressive loading steps for great UX
    setLoadingStage('Analyzing job description requirements & keywords...');
    const step1 = setTimeout(() => {
      setLoadingStage('Aligning your professional summary & target role...');
    }, 900);
    const step2 = setTimeout(() => {
      setLoadingStage('Injecting demanded technical competencies & action verbs...');
    }, 1800);
    const step3 = setTimeout(() => {
      setLoadingStage('Formulating quantifiable experience metrics & ATS optimization...');
    }, 2700);

    try {
      const data = await aiService.tailorResume({
        currentResume: currentResumeData,
        jobDescription,
        targetJobTitle,
        companyName
      });

      setTailoredResult(data);
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.3 }
      });
    } catch (err) {
      setError(err.message || 'Failed to tailor resume.');
    } finally {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
      setLoading(false);
    }
  }

  function handleApplyToBuilder() {
    if (!tailoredResult?.tailoredResume) return;
    onApplyTailoredResume(tailoredResult.tailoredResume);
    setAppliedSuccess(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.2 }
    });
    setTimeout(() => {
      onNavigateToBuilder();
    }, 600);
  }

  async function handleAddToTracker() {
    if (!tailoredResult) return;
    const company = tailoredResult.targetCompany || companyName || 'Target Company';
    const position = tailoredResult.targetRole || targetJobTitle || 'Software Engineer';
    const resumeUsed = tailoredResult.tailoredResume?.title || `Tailored for ${company}`;

    const newApp = {
      company,
      position,
      location: tailoredResult.tailoredResume?.personal?.location || 'Remote',
      salary: '',
      status: 'wishlist',
      appliedDate: new Date().toISOString().split('T')[0],
      jobUrl: '',
      resumeUsed,
      notes: `Generated ATS-tailored resume with projected match score of ${tailoredResult.matchScoreAfter}%. Optimized summary, injected ${tailoredResult.tailoredResume?.skills?.length || 0} skills.`
    };

    try {
      await applicationService.create(newApp);
      setTrackerSuccess(true);
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.3 }
      });
    } catch (err) {
      console.warn('Tracker add failed:', err);
    }
  }

  function handleCopyPlainText() {
    if (!tailoredResult?.tailoredResume) return;
    const text = resumeToText(tailoredResult.tailoredResume);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const baseResumeName = currentResumeData.personal?.fullName || 'Your Current Resume';
  const baseSkillsCount = (currentResumeData.skills || []).length;
  const baseExpCount = (currentResumeData.experience || []).length;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI RESUME TAILOR & GENERATOR</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Tailor Your Resume to Any Job Description
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
            Provide your target job posting. Our intelligent engine extracts the company’s requirements, rewrites your executive summary for the role, injects demanded ATS keywords into your skills, and frames your experience with quantifiable metrics.
          </p>
        </div>
      </div>

      {/* Main Workspace: 2 Column Input */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Base Resume Info */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>Base Resume Selected</span>
              </div>
              <button
                onClick={onNavigateToBuilder}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium transition"
              >
                <span>Edit Base</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="bg-slate-950/80 border border-slate-800/80 rounded-lg p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-slate-100">{baseResumeName}</span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/50">
                  Active
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1 text-xs text-slate-400">
                <div className="flex items-center gap-1.5 bg-slate-900/80 px-2 py-1.5 rounded border border-slate-800">
                  <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                  <span>{baseExpCount} Roles</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-900/80 px-2 py-1.5 rounded border border-slate-800">
                  <Layers className="w-3.5 h-3.5 text-slate-500" />
                  <span>{baseSkillsCount} Skills</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Target Role Title (Optional)
              </label>
              <input
                type="text"
                value={targetJobTitle}
                onChange={e => setTargetJobTitle(e.target.value)}
                placeholder="e.g. Senior Full Stack Engineer"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Target Company Name (Optional)
              </label>
              <input
                type="text"
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                placeholder="e.g. Stripe, OpenAI, Google"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Quick Sample Presets */}
            <div className="pt-2 border-t border-slate-800/80 space-y-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Load Sample Job Postings
              </span>
              <div className="flex flex-col gap-1.5">
                {PRESET_JDS.map(preset => (
                  <button
                    key={preset.name}
                    onClick={() => handleSelectPreset(preset)}
                    className="text-left text-xs px-3 py-2 rounded-lg bg-slate-950 hover:bg-slate-800/70 border border-slate-800 text-slate-300 hover:text-white transition flex items-center justify-between"
                  >
                    <span>{preset.name}</span>
                    <Sparkles className="w-3 h-3 text-indigo-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Target Job Description Textarea */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Target className="w-4 h-4 text-violet-400" />
                <span>Target Job Description (JD)</span>
              </div>
              <span className="text-[11px] text-slate-400">
                {jobDescription.length} characters
              </span>
            </div>

            <textarea
              rows={13}
              value={jobDescription}
              onChange={e => setJobDescription(e.target.value)}
              placeholder="Paste the full job posting requirements, responsibilities, and qualifications here..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 leading-relaxed resize-y"
            />

            {error && (
              <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              onClick={handleGenerateTailoredResume}
              disabled={loading}
              className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all shadow-lg ${
                loading
                  ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-indigo-600/25 active:scale-[0.99]'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                  <span>{loadingStage || 'Tailoring Resume with AI...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Generate ATS-Tailored Resume for this Job</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Results View: Interactive Tailored Resume & Diff */}
      {tailoredResult && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in duration-300">
          {/* Top Score Comparison Banner */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              {/* Score Before */}
              <div className="text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Original Match
                </span>
                <span className="text-xl font-extrabold text-slate-300">
                  {tailoredResult.matchScoreBefore}%
                </span>
              </div>

              <div className="flex items-center text-indigo-400">
                <ArrowRight className="w-5 h-5" />
              </div>

              {/* Score After */}
              <div className="text-center">
                <span className="text-[10px] uppercase font-bold text-emerald-400 block tracking-wider">
                  Tailored Match
                </span>
                <span className="text-2xl font-black text-emerald-400">
                  {tailoredResult.matchScoreAfter}%
                </span>
              </div>

              <div className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-800/60 text-emerald-300 text-xs font-bold">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+{(tailoredResult.matchScoreAfter - tailoredResult.matchScoreBefore)}% Match Boost</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-indigo-950/80 text-indigo-300 border border-indigo-800/50 font-medium">
                {tailoredResult.provider === 'gemini' ? '⚡ Google Gemini 1.5 Flash' : '🤖 ATS Heuristic Engine'}
              </span>
            </div>
          </div>

          {/* Highlights of What AI Optimized */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-indigo-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Tailored Optimizations Made for this Role</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {tailoredResult.tailoredChanges?.map((change, i) => (
                <div
                  key={i}
                  className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3 text-xs text-slate-300 flex items-start gap-2.5"
                >
                  <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                  <span className="leading-relaxed">{change}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Section Tabs */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto no-scrollbar">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'summary', label: 'Tailored Summary' },
                { id: 'skills', label: `Skills (${tailoredResult.tailoredResume?.skills?.length || 0})` },
                { id: 'experience', label: `Experience (${tailoredResult.tailoredResume?.experience?.length || 0})` },
                { id: 'projects', label: `Projects (${tailoredResult.tailoredResume?.projects?.length || 0})` }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab: Overview */}
            {activeTab === 'overview' && (
              <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 space-y-4 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase font-bold mb-1">Generated Resume Title</span>
                  <h3 className="text-base font-bold text-white">{tailoredResult.tailoredResume?.title}</h3>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase font-bold mb-1">Tailored Executive Summary</span>
                  <p className="text-slate-200 leading-relaxed bg-slate-900/60 p-3.5 rounded-lg border border-slate-800">
                    {tailoredResult.tailoredResume?.summary}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase font-bold mb-1">Target ATS Competencies</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {tailoredResult.tailoredResume?.skills?.slice(0, 16).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 rounded bg-indigo-950/70 border border-indigo-800/60 text-indigo-300 font-mono text-[11px]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Summary */}
            {activeTab === 'summary' && (
              <div className="space-y-4">
                <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
                    <span>✨ Tailored Summary (Aligned with {tailoredResult.targetRole || 'Role'})</span>
                    <span className="text-slate-400 text-[10px]">Ready to export</span>
                  </div>
                  <p className="text-slate-100 text-xs sm:text-sm leading-relaxed p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-800/40">
                    {tailoredResult.tailoredResume?.summary}
                  </p>
                </div>

                {currentResumeData.summary && (
                  <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800/60 space-y-2">
                    <span className="text-xs font-bold text-slate-400">Original Summary (For Reference)</span>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      {currentResumeData.summary}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Tab: Skills */}
            {activeTab === 'skills' && (
              <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">
                    ATS-Optimized Competencies ({tailoredResult.tailoredResume?.skills?.length || 0})
                  </span>
                  <span className="text-[11px] text-slate-400">Keywords prioritized for recruiter queries</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {tailoredResult.tailoredResume?.skills?.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 border border-indigo-800/50 text-indigo-200 text-xs font-medium font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Experience */}
            {activeTab === 'experience' && (
              <div className="space-y-3">
                {tailoredResult.tailoredResume?.experience?.map((exp, i) => (
                  <div key={i} className="bg-slate-950 rounded-xl p-5 border border-slate-800 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-sm text-white">{exp.position}</h4>
                        <span className="text-xs text-indigo-400">{exp.company} • {exp.location}</span>
                      </div>
                      <span className="text-xs text-slate-400">{exp.startDate} – {exp.endDate}</span>
                    </div>

                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {(exp.bullets || []).map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60">
                          <span className="text-indigo-400 font-bold mt-0.5">•</span>
                          <span className="leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Tab: Projects */}
            {activeTab === 'projects' && (
              <div className="space-y-3">
                {tailoredResult.tailoredResume?.projects?.map((proj, i) => (
                  <div key={i} className="bg-slate-950 rounded-xl p-5 border border-slate-800 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-white">{proj.name}</h4>
                      {proj.link && (
                        <span className="text-xs text-indigo-400 font-mono">{proj.link}</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {proj.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {(proj.technologies || []).map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300 font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Toolbar */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyPlainText}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Plain Text'}</span>
              </button>

              <button
                onClick={handleAddToTracker}
                disabled={trackerSuccess}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition ${
                  trackerSuccess
                    ? 'bg-emerald-950/60 border-emerald-800/80 text-emerald-300'
                    : 'bg-slate-800 hover:bg-slate-750 text-slate-200 border-slate-700'
                }`}
              >
                {trackerSuccess ? <Check className="w-3.5 h-3.5" /> : <BookmarkPlus className="w-3.5 h-3.5 text-amber-400" />}
                <span>{trackerSuccess ? 'Saved to Tracker!' : 'Track in Job Pipeline'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleApplyToBuilder}
                className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-emerald-900/30 transition active:scale-[0.99]"
              >
                <Zap className="w-4 h-4 text-amber-300" />
                <span>{appliedSuccess ? 'Opening in Builder...' : 'Load into Resume Builder & Preview'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
