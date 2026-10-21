import React from 'react';
import { 
  FileText, 
  Target, 
  ShieldCheck, 
  Briefcase, 
  Home, 
  Sparkles, 
  RotateCcw, 
  FolderOpen, 
  User, 
  LogOut, 
  Printer
} from 'lucide-react';

export default function Navbar({
  currentView,
  onNavigate,
  template,
  setTemplate,
  onLoadDemo,
  onReset,
  onExportPdf,
  user,
  onOpenAuth,
  onLogout,
  onOpenSaved
}) {
  return (
    <nav className="no-print sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-3 sm:px-5 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand */}
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2.5 text-left group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/20 group-hover:scale-105 transition-transform">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                ResumeCraft
              </span>
              <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden md:block">
              ATS Resume Builder & Job Application Suite
            </p>
          </div>
        </button>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs overflow-x-auto no-scrollbar">
          <button
            onClick={() => onNavigate('landing')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              currentView === 'landing'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-850'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>

          <button
            onClick={() => onNavigate('builder')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              currentView === 'builder'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-850'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Builder</span>
          </button>

          <button
            onClick={() => onNavigate('matcher')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              currentView === 'matcher'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-850'
            }`}
          >
            <Target className="w-3.5 h-3.5 text-violet-400" />
            <span>JD Matcher</span>
          </button>

          <button
            onClick={() => onNavigate('tailor')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              currentView === 'tailor'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-850'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>AI Tailor</span>
          </button>

          <button
            onClick={() => onNavigate('checker')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              currentView === 'checker'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-850'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>ATS Score</span>
          </button>

          <button
            onClick={() => onNavigate('tracker')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              currentView === 'tracker'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-850'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-amber-400" />
            <span>Job Tracker</span>
          </button>
        </div>

        {/* Builder Controls or General Actions */}
        <div className="flex items-center gap-2">
          {currentView === 'builder' && (
            <>
              {/* Template Selector */}
              <div className="hidden xl:flex items-center gap-1 bg-slate-950/70 p-1 rounded-xl border border-slate-800 text-xs mr-1">
                {[
                  { id: 'ats', name: 'ATS' },
                  { id: 'minimal', name: 'Minimal' },
                  { id: 'modern', name: 'Modern' },
                  { id: 'classic', name: 'Classic' }
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTemplate(t.id)}
                    className={`px-2 py-1 rounded-md font-medium text-[11px] transition ${
                      template === t.id
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>

              {/* Load Sample Demo */}
              <button
                onClick={onLoadDemo}
                title="Load comprehensive sample resume"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Sample</span>
              </button>

              {/* Reset */}
              <button
                onClick={onReset}
                title="Clear all fields"
                className="p-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-red-400 bg-slate-800/40 hover:bg-slate-800 border border-slate-700/50 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {/* Download PDF */}
              <button
                onClick={onExportPdf}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 hover:from-indigo-600 hover:to-violet-700 shadow-md shadow-indigo-500/20 active:scale-95 transition-all"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>PDF</span>
              </button>
            </>
          )}

          {/* Saved Resumes Button */}
          {user ? (
            <button
              onClick={onOpenSaved}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition"
            >
              <FolderOpen className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">My Resumes</span>
            </button>
          ) : null}

          {/* User Auth */}
          {user ? (
            <div className="flex items-center gap-1.5 pl-1 border-l border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800/60 px-2 py-1 rounded-lg border border-slate-700/60">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="max-w-[80px] sm:max-w-[110px] truncate">{user.name || user.email}</span>
              </div>
              <button
                onClick={onLogout}
                title="Logout"
                className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-indigo-300 hover:text-white bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-700/50 transition"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
