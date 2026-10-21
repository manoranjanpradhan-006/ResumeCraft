import React, { useState } from 'react';
import { 
  FileText, 
  Target, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Check, 
  Briefcase, 
  TrendingUp, 
  Cpu, 
  Flame,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Award,
  Users,
  CheckCircle2,
  Clock,
  LayoutGrid
} from 'lucide-react';

export default function LandingPage({ onSelectTool }) {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: 'Will my resume pass ATS scanners like Workday, Greenhouse, and Taleo?',
      a: 'Yes. Our ATS-Friendly and Minimal templates are specifically engineered with single-column layouts, standard hierarchical headings (H1/H2), standard bullet symbols, and zero unparseable graphics or complex tables that break automated applicant tracking systems.'
    },
    {
      q: 'How does the Job Description Matcher calculate my shortlisting chance?',
      a: 'The matcher analyzes both your resume and the target job description to identify keyword intersection, required skills coverage, years of experience, and action verb density. It assigns an alignment score (0–100%) and shortlisting probability tier (High, Moderate, Low), highlighting exactly what is missing and how to fix it.'
    },
    {
      q: 'How does the Job Application Tracker help my search?',
      a: 'Instead of messy spreadsheets, the built-in Kanban and Table board lets you track application stages (Wishlist, Applied, Interviewing, Offer, Rejected), record compensation ranges, set follow-up deadlines, and measure your interview callback conversion rate.'
    },
    {
      q: 'Is ResumeCraft completely free to use and host?',
      a: 'Yes! ResumeCraft is 100% free and open source under the MIT license. You can use it locally with zero configuration, or deploy it for free using MongoDB Atlas (Free M0), Render.com, and Vercel.'
    }
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative pt-6 pb-12 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-indigo-600/15 blur-[130px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/3 right-1/4 w-[350px] h-[280px] bg-violet-600/15 blur-[110px] rounded-full pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10 px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider shadow-sm">
            <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Complete Career Suite: Builder + JD Matcher + ATS Checker + Job Tracker</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Build Resumes That Beat the ATS &{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
              Land 4x More Interviews
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Create ATS-compliant resumes with real-time live preview, calculate your shortlisting probability against any job description, uncover actionable fixes, and organize your entire pipeline in one unified dashboard.
          </p>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap justify-center items-center gap-3.5 pt-3">
            <button
              onClick={() => onSelectTool('builder')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-semibold text-sm flex items-center gap-2 shadow-xl shadow-indigo-600/25 transition-all transform active:scale-95"
            >
              <FileText className="w-4 h-4" />
              <span>Launch Resume Builder</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onSelectTool('tailor')}
              className="px-5 py-3.5 rounded-xl bg-gradient-to-r from-indigo-900/60 via-purple-900/50 to-indigo-900/60 hover:from-indigo-800/80 hover:to-purple-800/70 text-indigo-200 border border-indigo-700/60 font-semibold text-sm flex items-center gap-2 shadow-lg transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Auto-Tailor to JD</span>
            </button>

            <button
              onClick={() => onSelectTool('matcher')}
              className="px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-700 font-semibold text-sm flex items-center gap-2 transition-all active:scale-95"
            >
              <Target className="w-4 h-4 text-violet-400" />
              <span>Match Job Description</span>
            </button>

            <button
              onClick={() => onSelectTool('checker')}
              className="px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-700 font-semibold text-sm flex items-center gap-2 transition-all active:scale-95"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Audit ATS Score</span>
            </button>

            <button
              onClick={() => onSelectTool('tracker')}
              className="px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-700 font-semibold text-sm flex items-center gap-2 transition-all active:scale-95"
            >
              <Briefcase className="w-4 h-4 text-amber-400" />
              <span>Job Tracker</span>
            </button>
          </div>

          {/* Social Proof Stats Bar */}
          <div className="pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <div className="text-xl sm:text-2xl font-black text-white">98.4%</div>
              <div className="text-[11px] text-slate-400 mt-0.5">ATS Parse Pass Rate</div>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <div className="text-xl sm:text-2xl font-black text-indigo-400">4.2x</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Higher Callback Rate</div>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <div className="text-xl sm:text-2xl font-black text-emerald-400">&lt; 1 min</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Instant PDF Generation</div>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <div className="text-xl sm:text-2xl font-black text-amber-400">100%</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Free & Open Source</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid: 4 Core Pillars */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            An All-in-One Career Super-App
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Everything you need from drafting your first bullet to signing the final job offer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <span>Real-time instant live preview with zoom & page scaling</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>4 curated professional templates (ATS, Minimal, Modern, Classic)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Direct PDF export & one-click plain text copy for online portals</span>
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
                  <span>Predicts shortlisting chance (High / Moderate / Low)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Keyword overlap matrix & missing ATS terms</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Pinpoints what is wrong & step-by-step coaching fixes</span>
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

          {/* Card 3: AI Resume Tailor & Generator (BRAND NEW) */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-900 border border-indigo-800/40 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-indigo-500/70 transition-all group relative overflow-hidden md:col-span-2 lg:col-span-1">
            <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-gradient-to-r from-indigo-500/20 to-violet-500/20 border border-indigo-500/40 text-[10px] font-bold text-indigo-300 uppercase flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>AI Auto-Tailor</span>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-lg font-bold text-white">
                One-Click AI Resume Tailor & Generator
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Take your existing resume and paste any target job description. The AI analyzes the role, customizes your executive summary, reorders and injects demanded ATS skills, and rewrites bullet points with strong action verbs and metrics.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Boosts match score by up to +35% with targeted phrasing</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Injects high-frequency keywords while keeping your real history</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>1-click load into Builder or sync to Job Tracker</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => onSelectTool('tailor')}
              className="mt-6 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-xs font-semibold text-white flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition"
            >
              <span>Tailor Resume to a Job Description</span>
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
                  <span>Overall ATS Score (0–100) & Letter Grade (A+ to D)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>5-category passability breakdown bars</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Identifies risky tables, text-boxes, or low metrics</span>
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

          {/* Card 4: Job Application Tracker (NEW) */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-amber-500/50 transition-all group relative overflow-hidden">
            <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] font-bold text-amber-400 uppercase">
              Brand New
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Recruitment Pipeline & Job Application Tracker
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Track your active job applications in an interactive Kanban board or data table. Monitor stages from Wishlist to Offer, track salary ranges, log interview notes, and view your conversion rate.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Interactive Kanban board with 5 recruitment stages</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Track compensation ranges, deadlines, and resume versions</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Interview conversion rate KPI analytics</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => onSelectTool('tracker')}
              className="mt-6 w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-amber-600 text-xs font-semibold text-white flex items-center justify-center gap-2 transition"
            >
              <span>Open Job Tracker</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Everything You Need to Know</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-200 hover:text-white"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-indigo-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Gemini AI Integration Card */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-violet-950/40 border border-indigo-700/30 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Google Gemini 1.5 Flash Support</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Dual AI Reasoning: Gemini Cloud + Zero-Key Local Engine
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
                ResumeCraft can run on Google Gemini 1.5 Flash for advanced recruiter reasoning, and includes an intelligent offline rule engine so all features work immediately out-of-the-box!
              </p>
            </div>
            <span className="text-xs px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold shrink-0">
              Zero-Key Mode Active
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3 text-xs text-slate-300">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>How to link your free Google Gemini API Key:</span>
            </h4>
            <ol className="list-decimal ml-5 space-y-1.5 text-slate-300 leading-relaxed">
              <li>
                Open <strong>Google AI Studio</strong> at{' '}
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-400 underline font-semibold hover:text-indigo-300"
                >
                  aistudio.google.com/app/apikey
                </a>{' '}
                and click <strong>"Create API key"</strong> (100% free, no credit card).
              </li>
              <li>
                Open the file <code className="bg-slate-900 px-1.5 py-0.5 rounded text-indigo-300">backend/.env</code> in your project.
              </li>
              <li>
                Add your key: <code className="bg-slate-900 px-1.5 py-0.5 rounded text-emerald-300">GEMINI_API_KEY=AIzaSy...</code>
              </li>
              <li>
                Save the file. Express auto-detects the key and switches seamlessly to Gemini 1.5 Flash!
              </li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
