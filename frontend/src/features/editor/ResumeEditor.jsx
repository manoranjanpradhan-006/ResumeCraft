import React, { useState } from 'react';
import { 
  User, 
  FileText, 
  Briefcase, 
  Wrench, 
  GraduationCap, 
  FolderGit2, 
  Award,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import PersonalInfoForm from './PersonalInfoForm';
import SummaryForm from './SummaryForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import ProjectsForm from './ProjectsForm';
import CertificationsForm from './CertificationsForm';

const TABS = [
  { id: 'personal', name: 'Contact Info', icon: User },
  { id: 'summary', name: 'Summary', icon: FileText },
  { id: 'experience', name: 'Experience', icon: Briefcase },
  { id: 'skills', name: 'Skills', icon: Wrench },
  { id: 'education', name: 'Education', icon: GraduationCap },
  { id: 'projects', name: 'Projects', icon: FolderGit2 },
  { id: 'certifications', name: 'Certificates', icon: Award }
];

export default function ResumeEditor({ resumeData, onChange }) {
  const [activeTab, setActiveTab] = useState('personal');

  const currentIndex = TABS.findIndex(t => t.id === activeTab);

  function handleNext() {
    if (currentIndex < TABS.length - 1) {
      setActiveTab(TABS[currentIndex + 1].id);
    }
  }

  function handlePrev() {
    if (currentIndex > 0) {
      setActiveTab(TABS[currentIndex - 1].id);
    }
  }

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
      {/* Tab Navigation Header */}
      <div className="bg-slate-950/70 border-b border-slate-800 p-2 overflow-x-auto no-scrollbar">
        <div className="flex gap-1 min-w-max">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            let badge = null;
            if (tab.id === 'experience') badge = resumeData.experience?.length;
            if (tab.id === 'education') badge = resumeData.education?.length;
            if (tab.id === 'projects') badge = resumeData.projects?.length;
            if (tab.id === 'certifications') badge = resumeData.certifications?.length;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{tab.name}</span>
                {badge !== undefined && badge > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-indigo-700 text-white' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Body */}
      <div className="flex-1 overflow-y-auto p-5">
        {activeTab === 'personal' && (
          <PersonalInfoForm
            data={resumeData.personal || {}}
            onChange={personal => onChange({ ...resumeData, personal })}
          />
        )}

        {activeTab === 'summary' && (
          <SummaryForm
            summary={resumeData.summary || ''}
            jobTitle={resumeData.personal?.jobTitle || ''}
            onChange={summary => onChange({ ...resumeData, summary })}
          />
        )}

        {activeTab === 'experience' && (
          <ExperienceForm
            experiences={resumeData.experience || []}
            onChange={experience => onChange({ ...resumeData, experience })}
          />
        )}

        {activeTab === 'skills' && (
          <SkillsForm
            skills={resumeData.skills || {}}
            onChange={skills => onChange({ ...resumeData, skills })}
          />
        )}

        {activeTab === 'education' && (
          <EducationForm
            education={resumeData.education || []}
            onChange={education => onChange({ ...resumeData, education })}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectsForm
            projects={resumeData.projects || []}
            onChange={projects => onChange({ ...resumeData, projects })}
          />
        )}

        {activeTab === 'certifications' && (
          <CertificationsForm
            certifications={resumeData.certifications || []}
            onChange={certifications => onChange({ ...resumeData, certifications })}
          />
        )}
      </div>

      {/* Footer Stepper */}
      <div className="bg-slate-950/80 border-t border-slate-800 px-5 py-3 flex items-center justify-between">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <span className="text-[11px] text-slate-500 font-medium">
          Step {currentIndex + 1} of {TABS.length}
        </span>

        <button
          type="button"
          onClick={handleNext}
          disabled={currentIndex === TABS.length - 1}
          className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 disabled:opacity-30 disabled:pointer-events-none transition"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
