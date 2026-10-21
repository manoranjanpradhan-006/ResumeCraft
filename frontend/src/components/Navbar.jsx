import React from 'react';
import { 
  FileText, 
  Download, 
  Sparkles, 
  RotateCcw, 
  FolderOpen, 
  User, 
  LogOut, 
  Check, 
  Printer
} from 'lucide-react';

export default function Navbar({
  template,
  setTemplate,
  onLoadDemo,
  onReset,
  onExportPdf,
  user,
  onOpenAuth,
  onLogout,
  onOpenSaved,
  isSaving
}) {
  return (
    <nav className="no-print sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                ResumeCraft
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                ATS Engine
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Build your professional identity & export ATS-ready resumes
            </p>
          </div>
        </div>

        {/* Template Selector */}
        <div className="flex items-center gap-1.5 bg-slate-950/70 p-1 rounded-xl border border-slate-800 text-xs">
          <span className="text-slate-400 font-medium px-2 hidden md:inline">Template:</span>
          {[
            { id: 'ats', name: 'ATS-Friendly' },
            { id: 'minimal', name: 'Minimal' },
            { id: 'modern', name: 'Modern' },
            { id: 'classic', name: 'Classic' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTemplate(t.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                template === t.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Load Sample Demo */}
          <button
            onClick={onLoadDemo}
            title="Load comprehensive sample resume"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Load Sample</span>
          </button>

          {/* Reset */}
          <button
            onClick={onReset}
            title="Clear all fields"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-red-400 bg-slate-800/40 hover:bg-slate-800 border border-slate-700/50 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Saved Resumes Button */}
          {user ? (
            <button
              onClick={onOpenSaved}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition"
            >
              <FolderOpen className="w-3.5 h-3.5 text-indigo-400" />
              <span>My Resumes</span>
            </button>
          ) : null}

          {/* User Auth */}
          {user ? (
            <div className="flex items-center gap-2 pl-1 border-l border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800/60 px-2.5 py-1.5 rounded-lg border border-slate-700/60">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="max-w-[100px] truncate">{user.name || user.email}</span>
              </div>
              <button
                onClick={onLogout}
                title="Logout"
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
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

          {/* Export / Print PDF Button */}
          <button
            onClick={onExportPdf}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 hover:from-indigo-600 hover:to-violet-700 shadow-md shadow-indigo-500/20 active:scale-95 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
