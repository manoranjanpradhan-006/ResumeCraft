import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import SavedResumesModal from './components/SavedResumesModal';
import ResumeEditor from './features/editor/ResumeEditor';
import ResumePreview from './features/preview/ResumePreview';
import LandingPage from './features/landing/LandingPage';
import JobDescriptionMatcher from './features/tools/JobDescriptionMatcher';
import AtsChecker from './features/tools/AtsChecker';
import ApplicationTracker from './features/tracker/ApplicationTracker';
import { initialResumeData, emptyResumeData } from './data/sampleResume';
import { authService } from './services/api';
import { Edit3, Eye } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'resumecraft_current_data';
const LOCAL_TEMPLATE_KEY = 'resumecraft_current_template';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'builder' | 'matcher' | 'checker' | 'tracker'

  const [resumeData, setResumeData] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialResumeData;
    } catch {
      return initialResumeData;
    }
  });

  const [template, setTemplate] = useState(() => {
    return localStorage.getItem(LOCAL_TEMPLATE_KEY) || 'ats';
  });

  const [user, setUser] = useState(null);
  const [currentResumeId, setCurrentResumeId] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [mobileView, setMobileView] = useState('editor'); // 'editor' | 'preview'

  // Load user session on mount
  useEffect(() => {
    async function checkAuth() {
      const u = await authService.getMe();
      if (u) setUser(u);
    }
    checkAuth();
  }, []);

  // Save to local storage on edits
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(resumeData));
    } catch (err) {
      console.warn('Failed to save to localStorage:', err);
    }
  }, [resumeData]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_TEMPLATE_KEY, template);
    } catch (err) {
      console.warn('Failed to save template to localStorage:', err);
    }
  }, [template]);

  function handleLoadDemo() {
    setResumeData(initialResumeData);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.2 }
    });
  }

  function handleReset() {
    if (confirm('Clear all resume fields? You can also reload the sample data anytime.')) {
      setResumeData(emptyResumeData);
      setCurrentResumeId(null);
    }
  }

  function handleExportPdf() {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.15 }
    });

    setTimeout(() => {
      window.print();
    }, 200);
  }

  function handleLogout() {
    authService.clearAuth();
    setUser(null);
    setCurrentResumeId(null);
  }

  function handleLoadSavedResume(saved) {
    if (saved.data) {
      setResumeData(saved.data);
    }
    if (saved.template) {
      setTemplate(saved.template);
    }
    setCurrentResumeId(saved.id);
    setCurrentView('builder');
  }

  const activeResumeTitle = resumeData.personal?.fullName
    ? `${resumeData.personal.fullName}'s Resume`
    : 'Active Resume';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        template={template}
        setTemplate={setTemplate}
        onLoadDemo={handleLoadDemo}
        onReset={handleReset}
        onExportPdf={handleExportPdf}
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        onOpenSaved={() => setIsSavedOpen(true)}
      />

      {/* Main Content Area based on currentView */}
      <div className="flex-1 w-full max-w-[1700px] mx-auto p-4 sm:p-6">
        {/* View 1: Landing Page */}
        {currentView === 'landing' && (
          <LandingPage onSelectTool={tool => setCurrentView(tool)} />
        )}

        {/* View 2: Resume Builder */}
        {currentView === 'builder' && (
          <div className="space-y-4">
            {/* Mobile View Toggle */}
            <div className="no-print lg:hidden flex justify-center pb-2">
              <div className="bg-slate-900 border border-slate-800 p-1 rounded-xl flex gap-1 w-full max-w-xs">
                <button
                  onClick={() => setMobileView('editor')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-lg transition ${
                    mobileView === 'editor'
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Editor</span>
                </button>
                <button
                  onClick={() => setMobileView('preview')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-lg transition ${
                    mobileView === 'preview'
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Live Preview</span>
                </button>
              </div>
            </div>

            {/* Split Screen Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-[calc(100vh-120px)]">
              {/* Left: Editor */}
              <section
                className={`no-print lg:col-span-5 xl:col-span-5 h-full ${
                  mobileView === 'editor' ? 'block' : 'hidden lg:block'
                }`}
              >
                <ResumeEditor
                  resumeData={resumeData}
                  onChange={setResumeData}
                />
              </section>

              {/* Right: Live Preview */}
              <section
                className={`lg:col-span-7 xl:col-span-7 h-full ${
                  mobileView === 'preview' ? 'block' : 'hidden lg:block'
                }`}
              >
                <ResumePreview
                  resumeData={resumeData}
                  template={template}
                />
              </section>
            </div>
          </div>
        )}

        {/* View 3: Job Description Matcher */}
        {currentView === 'matcher' && (
          <JobDescriptionMatcher
            currentResumeData={resumeData}
            onNavigateToBuilder={() => setCurrentView('builder')}
          />
        )}

        {/* View 4: ATS Score Checker */}
        {currentView === 'checker' && (
          <AtsChecker
            currentResumeData={resumeData}
            onNavigateToBuilder={() => setCurrentView('builder')}
          />
        )}

        {/* View 5: Job Application Tracker */}
        {currentView === 'tracker' && (
          <ApplicationTracker
            currentResumeTitle={activeResumeTitle}
          />
        )}
      </div>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={user => setUser(user)}
      />

      <SavedResumesModal
        isOpen={isSavedOpen}
        onClose={() => setIsSavedOpen(false)}
        currentResumeData={resumeData}
        currentTemplate={template}
        currentResumeId={currentResumeId}
        onLoadResume={handleLoadSavedResume}
        onSaveSuccess={saved => setCurrentResumeId(saved.id)}
      />
    </div>
  );
}
