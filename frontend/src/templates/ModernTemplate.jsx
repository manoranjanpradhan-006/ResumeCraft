import React from 'react';

export default function ModernTemplate({ data }) {
  const { personal, summary, experience, education, skills, projects, certifications } = data;

  return (
    <div className="resume-paper p-8 text-neutral-800 bg-white leading-relaxed text-[10pt] font-sans antialiased">
      {/* Top Accent Stripe */}
      <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-full mb-6"></div>

      {/* Header */}
      <div className="flex justify-between items-start border-b border-neutral-200 pb-5 mb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-neutral-900 tracking-tight">
            {personal.fullName || 'YOUR NAME'}
          </h1>
          {personal.jobTitle && (
            <p className="text-sm font-semibold text-indigo-600 mt-0.5">
              {personal.jobTitle}
            </p>
          )}
        </div>

        <div className="text-right text-[9pt] text-neutral-600 space-y-0.5">
          {personal.email && <div>{personal.email}</div>}
          {personal.phone && <div>{personal.phone}</div>}
          {personal.location && <div>{personal.location}</div>}
          {personal.linkedin && <div className="text-indigo-600 font-medium">{personal.linkedin}</div>}
        </div>
      </div>

      {/* Professional Summary */}
      {summary && (
        <section className="mb-5 bg-slate-50 p-3 rounded-lg border-l-4 border-indigo-600">
          <p className="text-xs text-neutral-700 leading-relaxed font-normal">
            {summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            Experience
          </h2>
          <div className="space-y-3.5">
            {experience.map((exp, idx) => (
              <div key={exp.id || idx}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <div className="font-bold text-xs text-neutral-900">
                    {exp.position} <span className="font-medium text-neutral-500">at {exp.company}</span>
                  </div>
                  <span className="text-[9pt] font-medium text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc ml-4 space-y-1 mt-1 text-xs text-neutral-700">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Key Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            Featured Projects
          </h2>
          <div className="space-y-2.5">
            {projects.map((proj, idx) => (
              <div key={proj.id || idx} className="border border-neutral-100 p-2.5 rounded-md bg-neutral-50/50">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-xs font-bold text-neutral-900">{proj.title}</span>
                  <div className="space-x-2 text-[9pt]">
                    {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">Demo</a>}
                    {proj.github && <a href={proj.github} target="_blank" rel="noreferrer" className="text-neutral-500 hover:underline">Code</a>}
                  </div>
                </div>
                {proj.description && <p className="text-xs text-neutral-600 mb-1.5">{proj.description}</p>}
                {proj.technologies && proj.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {proj.technologies.map((tech, tIdx) => (
                      <span key={tIdx} className="text-[8pt] font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills & Education Grid */}
      <div className="grid grid-cols-2 gap-5 pt-3 border-t border-neutral-200">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            Technical Skills
          </h2>
          <div className="space-y-1.5 text-xs">
            {skills.languages && skills.languages.length > 0 && (
              <div>
                <span className="font-semibold text-neutral-900">Languages: </span>
                <span className="text-neutral-700">{skills.languages.join(', ')}</span>
              </div>
            )}
            {skills.frameworks && skills.frameworks.length > 0 && (
              <div>
                <span className="font-semibold text-neutral-900">Frameworks: </span>
                <span className="text-neutral-700">{skills.frameworks.join(', ')}</span>
              </div>
            )}
            {skills.tools && skills.tools.length > 0 && (
              <div>
                <span className="font-semibold text-neutral-900">Tools: </span>
                <span className="text-neutral-700">{skills.tools.join(', ')}</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            Education & Certs
          </h2>
          {education && education.map((edu, idx) => (
            <div key={edu.id || idx} className="text-xs mb-2">
              <div className="font-semibold text-neutral-900">{edu.degree} in {edu.field}</div>
              <div className="text-neutral-600 text-[9pt]">{edu.institution} ({edu.startDate} – {edu.endDate})</div>
            </div>
          ))}
          {certifications && certifications.map((c, idx) => (
            <div key={c.id || idx} className="text-xs text-neutral-700">
              <span className="font-medium">• {c.name}</span> <span className="text-[9pt] text-neutral-500">({c.issuer})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
