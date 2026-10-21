import React from 'react';

export default function ClassicTemplate({ data }) {
  const { personal, summary, experience, education, skills, projects, certifications } = data;

  return (
    <div className="resume-paper p-10 text-neutral-900 bg-white leading-relaxed text-[10pt] font-serif antialiased">
      {/* Header */}
      <header className="text-center pb-4 mb-4 border-b border-neutral-400">
        <h1 className="text-2xl font-bold tracking-normal uppercase text-neutral-900 mb-1">
          {personal.fullName || 'YOUR NAME'}
        </h1>
        {personal.jobTitle && (
          <p className="text-xs italic text-neutral-700 mb-2 font-sans">
            {personal.jobTitle}
          </p>
        )}
        <div className="text-xs text-neutral-700 font-sans space-x-2">
          {personal.location && <span>{personal.location}</span>}
          {personal.location && personal.phone && <span>•</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.phone && personal.email && <span>•</span>}
          {personal.email && <span>{personal.email}</span>}
          {personal.linkedin && <span>•</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-0.5 mb-2 font-sans">
            Executive Summary
          </h2>
          <p className="text-xs text-neutral-800 leading-normal text-justify">
            {summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-0.5 mb-2.5 font-sans">
            Professional Experience
          </h2>
          <div className="space-y-3">
            {experience.map((exp, idx) => (
              <div key={exp.id || idx}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <div>
                    <span className="font-bold text-xs text-neutral-900">{exp.company}</span>
                    <span className="text-xs italic text-neutral-700"> — {exp.position}</span>
                  </div>
                  <span className="text-[9pt] font-sans text-neutral-600 italic">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc ml-5 space-y-1 text-xs text-neutral-800">
                    {exp.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-0.5 mb-2 font-sans">
            Education
          </h2>
          <div className="space-y-1.5">
            {education.map((edu, idx) => (
              <div key={edu.id || idx} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-xs text-neutral-900">{edu.institution}</span>
                  <span className="text-xs text-neutral-700">, {edu.degree} in {edu.field}</span>
                </div>
                <span className="text-[9pt] font-sans text-neutral-600">{edu.startDate} – {edu.endDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-0.5 mb-2 font-sans">
            Notable Projects
          </h2>
          <div className="space-y-2">
            {projects.map((proj, idx) => (
              <div key={proj.id || idx}>
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-neutral-900">{proj.title}</span>
                  <span className="text-[9pt] font-sans text-neutral-600">{proj.technologies?.join(', ')}</span>
                </div>
                <p className="text-xs text-neutral-800 mt-0.5">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills && (
        <section className="mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-0.5 mb-2 font-sans">
            Expertise & Skills
          </h2>
          <div className="text-xs text-neutral-800 space-y-1">
            {skills.languages && <div><span className="font-bold">Languages:</span> {skills.languages.join(', ')}</div>}
            {skills.frameworks && <div><span className="font-bold">Frameworks & Tools:</span> {[...skills.frameworks, ...(skills.tools || [])].join(', ')}</div>}
          </div>
        </section>
      )}
    </div>
  );
}
