import React, { useState } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  ShieldCheck, 
  Copy, 
  Check, 
  Layers
} from 'lucide-react';
import AtsTemplate from '../../templates/AtsTemplate';
import MinimalTemplate from '../../templates/MinimalTemplate';
import ModernTemplate from '../../templates/ModernTemplate';
import ClassicTemplate from '../../templates/ClassicTemplate';
import { resumeToText } from '../../utils/resumeToText';

export default function ResumePreview({ resumeData, template = 'ats' }) {
  const [zoom, setZoom] = useState(0.85);
  const [copied, setCopied] = useState(false);

  function handleZoomIn() {
    setZoom(prev => Math.min(prev + 0.1, 1.4));
  }

  function handleZoomOut() {
    setZoom(prev => Math.max(prev - 0.1, 0.5));
  }

  function handleResetZoom() {
    setZoom(0.85);
  }

  function handleCopyPlainText() {
    const text = resumeToText(resumeData);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  // Calculate ATS readiness score
  let score = 0;
  if (resumeData.personal?.fullName) score += 15;
  if (resumeData.personal?.email) score += 15;
  if (resumeData.personal?.phone) score += 10;
  if (resumeData.summary && resumeData.summary.length > 50) score += 15;
  if (resumeData.experience && resumeData.experience.length > 0) score += 20;
  if (resumeData.education && resumeData.education.length > 0) score += 10;
  if (
    resumeData.skills &&
    (resumeData.skills.languages?.length > 0 || resumeData.skills.frameworks?.length > 0)
  ) score += 15;

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
      {/* Preview Toolbar */}
      <div className="no-print bg-slate-950/80 border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          {/* ATS Score Indicator */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-850 text-slate-300 font-medium border border-slate-700/60">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>ATS Score:</span>
            <span className="font-bold text-white">{score}%</span>
          </div>

          <span className="text-slate-600 hidden sm:inline">•</span>

          <span className="text-slate-400 font-medium capitalize hidden sm:inline">
            Template: {template}
          </span>
        </div>

        {/* Action Buttons: Copy Text & Zoom Controls */}
        <div className="flex items-center gap-2">
          {/* Copy Plain Text for Application portals */}
          <button
            type="button"
            onClick={handleCopyPlainText}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-slate-300 hover:text-white bg-slate-850 hover:bg-slate-800 border border-slate-700/80 text-[11px] font-medium transition"
            title="Copy formatted plain text to paste directly into job portals (Workday, Taleo, etc.)"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-slate-400" />
                <span>Copy Plain Text</span>
              </>
            )}
          </button>

          {/* Zoom Controls */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
              type="button"
              onClick={handleZoomOut}
              title="Zoom Out"
              className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono text-slate-300 px-1.5">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={handleZoomIn}
              title="Zoom In"
              className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleResetZoom}
              title="Fit to Screen"
              className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded ml-0.5"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Preview Viewport */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 bg-slate-950/60 flex justify-center items-start">
        <div
          className="print-area transition-transform origin-top duration-150 shadow-2xl ring-1 ring-slate-800/40 rounded-sm"
          style={{ transform: `scale(${zoom})` }}
        >
          {template === 'ats' && <AtsTemplate data={resumeData} />}
          {template === 'minimal' && <MinimalTemplate data={resumeData} />}
          {template === 'modern' && <ModernTemplate data={resumeData} />}
          {template === 'classic' && <ClassicTemplate data={resumeData} />}
        </div>
      </div>
    </div>
  );
}
