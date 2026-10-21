import React from 'react';
import { 
  FileText, 
  Target, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Download, 
  Zap, 
  Check, 
  Layers, 
  TrendingUp, 
  Cpu, 
  Eye, 
  FileCheck2,
  Lock,
  Flame
} from 'lucide-react';

export default function LandingPage({ onSelectTool }) {
  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative pt-8 pb-12 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[250px] bg-violet-600/15 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10 px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider shadow-sm">
            <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Modern ATS Resume Platform & AI Job Matcher</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Build Resumes That Beat the ATS &{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
              Win Interviews
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Create ATS-compliant resumes with real-time live preview, test your match against any job description to calculate your shortlisting chance, and uncover actionable fixes with AI assistance.
          </p>

          {/* Quick Feature Badges */}
          <div className="flex flex-wrap justify-center gap-3 pt-2 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              100% Free Forever
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              Workday & Greenhouse Verified
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              Gemini AI Integration
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              Direct PDF Download
            </span>
          </div>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <button
              onClick={() => onSelectTool('builder')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-semibold text-sm flex items-center gap-2 shadow-xl shadow-indigo-600/25 transition-all transform active:scale-95"
            >
              <FileText className="w-4 h-4" />
              <span>Launch Resume Builder</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onSelectTool('matcher')}
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-700 font-semibold text-sm flex items-center gap-2 transition-all active:scale-95"
            >
              <Target className="w-4 h-4 text-violet-400" />
              <span>Test JD Matcher</span>
            </button>

            <button
              onClick={() => onSelectTool('checker')}
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-700 font-semibold text-sm flex items-center gap-2 transition-all active:scale-95"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Check ATS Score</span>
            </button>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Complete Suite of Career Tools
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Everything you need to bypass automated filters and stand out to hiring managers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Resume Builder */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-indigo-500/50 transition-all group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Live Resume Builder & Multi-Template Engine
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Build your resume with structured forms and watch changes reflect instantly in a true-to-life A4 live preview. Switch effortlessly between ATS-Friendly, Minimalist, Modern, and Classic layouts without retyping your data.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Real-time instant live preview</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>4 curated professional templates</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>One-click high-resolution PDF download</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => onSelectTool('builder')}
              className="mt-6 w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-indigo-600 text-xs font-semibold text-white flex items-center justify-center gap-2 transition"
            >
              <span>Open Resume Builder</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: JD Matcher */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-violet-500/50 transition-all group relative overflow-hidden">
            <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-[10px] font-bold text-violet-400 uppercase">
              AI Powered
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400 group-hover:scale-105 transition-transform">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Job Description Matcher & Shortlisting Predictor
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Paste any job description to calculate your match percentage and shortlisting probability. It uncovers missing technical keywords, diagnoses exact gaps in your experience, and gives actionable fixes before you apply.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Predicts shortlisting chance (High/Medium/Low)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Identifies missing required keywords</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Identifies what is wrong & step-by-step fixes</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => onSelectTool('matcher')}
              className="mt-6 w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-violet-600 text-xs font-semibold text-white flex items-center justify-center gap-2 transition"
            >
              <span>Try JD Matcher</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: ATS Score Checker */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-emerald-500/50 transition-all group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Deep ATS Health & Passability Audit
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Scan your resume against modern Applicant Tracking System standards. Receive a letter grade (A+ through D) and breakdown across contact data, executive summary, action metrics, and formatting cleanliness.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Overall ATS Score (0–100) & Letter Grade</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>5-category passability breakdown</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Actionable instructions to reach 95%+</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => onSelectTool('checker')}
              className="mt-6 w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-emerald-600 text-xs font-semibold text-white flex items-center justify-center gap-2 transition"
            >
              <span>Audit ATS Score</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Workflow Section */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              How ResumeCraft Powers Your Job Search
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-lg mx-auto">
              Follow this 3-step workflow to maximize your interview conversion rate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2">
              <div className="text-xs font-bold text-indigo-400">Step 01</div>
              <h4 className="text-sm font-bold text-white">Enter Your Experience</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Add your employment history, technical projects, and education. Use the ✨ AI Polish tool to turn duties into achievement metrics.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2">
              <div className="text-xs font-bold text-violet-400">Step 02</div>
              <h4 className="text-sm font-bold text-white">Match with Target JD</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Paste the job description you are applying for. Inspect your match score, uncover missing keywords, and follow the actionable fixes.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2">
              <div className="text-xs font-bold text-emerald-400">Step 03</div>
              <h4 className="text-sm font-bold text-white">Export ATS-Ready PDF</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Verify your 90%+ ATS score and download a clean, single-column, parser-friendly PDF ready to submit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Gemini AI Integration Info & Setup Guide */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-violet-950/40 border border-indigo-700/30 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Google Gemini 1.5 Integration</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Powered by Gemini AI + Zero-Key Fallback Engine
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
                ResumeCraft can run on Google Gemini 1.5 Flash for recruitment reasoning, and includes an intelligent offline rule engine so all features work immediately out-of-the-box!
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                Instant Local Mode Active
              </span>
            </div>
          </div>

          {/* Setup Instructions Card */}
          <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3 text-xs text-slate-300">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>How to link your own Google Gemini API Key:</span>
            </h4>
            <ol className="list-decimal ml-5 space-y-2 text-slate-300 leading-relaxed">
              <li>
                Visit <strong>Google AI Studio</strong> at{' '}
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-400 underline font-semibold hover:text-indigo-300"
                >
                  aistudio.google.com/app/apikey
                </a>{' '}
                and click <strong>"Create API key"</strong> (it's 100% free with generous tier quotas).
              </li>
              <li>
                Open the file <code className="bg-slate-900 px-1.5 py-0.5 rounded text-indigo-300">backend/.env</code> in your project.
              </li>
              <li>
                Add your key to the variable: <code className="bg-slate-900 px-1.5 py-0.5 rounded text-emerald-300">GEMINI_API_KEY=your_key_here</code>
              </li>
              <li>
                Save the file. The Express backend will automatically use Gemini 1.5 Flash for deeper contextual reasoning!
              </li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
