import React from 'react';

export default function MinimalTemplate({ data }) {
  const { personal, summary, experience, education, skills, projects, certifications } = data;

  return (
    <div className="resume-paper p-10 text-slate-800 bg-white leading-relaxed text-[10pt] font-sans antialiased">
      {/* Header */}
      <header className="mb-6 pb-4 border-b border-slate-200">
        <h1 className="text-3xl font-light tracking-tight text-slate-900 mb-1">
          {personal.fullName || 'YOUR NAME'}
        </h1>
        {personal.jobTitle && (
          <p className="text-xs font-medium tracking-widest text-indigo-600 uppercase mb-3">
            {personal.jobTitle}
          </p>
        )}

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 font-light">
          {personal.email && (
            <span className="flex items-center gap-1">
              <span className="text-slate-400">e:</span> {personal.email}
            </span>
          )}
          {personal.phone && (
            <span className="flex items-center gap-1">
              <span className="text-slate-400">m:</span> {personal.phone}
            </span>
          )}
          {personal.location && (
            <span className="flex items-center gap-1">
              <span className="text-slate-400">loc:</span> {personal.location}
            </span>
          )}
          {personal.linkedin && (
            <a href={`https://${personal.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="text-slate-600 hover:text-indigo-600 transition-colors">
              linkedin.com
            </a>
          )}
          {personal.github && (
            <a href={`https://${personal.github.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="text-slate-600 hover:text-indigo-600 transition-colors">
              github.com
            </a>
          )}
          {personal.website && (
            <a href={`https://${personal.website.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="text-slate-600 hover:text-indigo-600 transition-colors">
              portfolio
            </a>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-6">
          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            {summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-[11px] font-semibold tracking-wider uppercase text-slate-400 mb-3">
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp, idx) => (
              <div key={exp.id || idx} className="group">
                <div className="flex justify-between items-baseline mb-1">
                  <div>
                    <span className="font-semibold text-xs text-slate-900">{exp.position}</span>
                    {exp.company && <span className="text-xs text-slate-500 font-normal"> — {exp.company}</span>}
                  </div>
                  <span className="text-[9pt] text-slate-400 font-light">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="space-y-1 mt-1.5 text-xs text-slate-600">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <span className="text-slate-300 font-bold select-none">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-[11px] font-semibold tracking-wider uppercase text-slate-400 mb-3">
            Selected Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj, idx) => (
              <div key={proj.id || idx}>
                <div className="flex justify-between items-baseline">
                  <div className="text-xs font-semibold text-slate-900">
                    {proj.title}
                  </div>
                  <div className="text-[9pt] space-x-2 text-indigo-600">
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noreferrer" className="hover:underline">
                        Visit
                      </a>
                    )}
                    {proj.github && (
                      <a href={proj.github} target="_blank" rel="noreferrer" className="text-slate-500 hover:underline">
                        Source
                      </a>
                    )}
                  </div>
                </div>
                {proj.technologies && proj.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 my-1">
                    {proj.technologies.map((t, tIdx) => (
                      <span key={tIdx} className="text-[8pt] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                {proj.description && (
                  <p className="text-xs text-slate-600 mt-0.5">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Grid: Skills & Education */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
        {/* Skills */}
        {skills && (
          <section>
            <h2 className="text-[11px] font-semibold tracking-wider uppercase text-slate-400 mb-2">
              Capabilities
            </h2>
            <div className="space-y-2 text-xs">
              {skills.languages && skills.languages.length > 0 && (
                <div>
                  <div className="text-[9pt] font-medium text-slate-400">Languages</div>
                  <div className="text-slate-700">{skills.languages.join(' • ')}</div>
                </div>
              )}
              {skills.frameworks && skills.frameworks.length > 0 && (
                <div>
                  <div className="text-[9pt] font-medium text-slate-400">Frameworks & Libraries</div>
                  <div className="text-slate-700">{skills.frameworks.join(' • ')}</div>
                </div>
              )}
              {skills.databases && skills.databases.length > 0 && (
                <div>
                  <div className="text-[9pt] font-medium text-slate-400">Databases & Tools</div>
                  <div className="text-slate-700">{[...skills.databases, ...(skills.tools || [])].join(' • ')}</div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Education & Certs */}
        <div>
          {education && education.length > 0 && (
            <section className="mb-4">
              <h2 className="text-[11px] font-semibold tracking-wider uppercase text-slate-400 mb-2">
                Education
              </h2>
              <div className="space-y-2">
                {education.map((edu, idx) => (
                  <div key={edu.id || idx}>
                    <div className="text-xs font-semibold text-slate-800">
                      {edu.degree} in {edu.field}
                    </div>
                    <div className="text-[9pt] text-slate-500">
                      {edu.institution} ({edu.startDate} – {edu.endDate})
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications && certifications.length > 0 && (
            <section>
              <h2 className="text-[11px] font-semibold tracking-wider uppercase text-slate-400 mb-2">
                Credentials
              </h2>
              <div className="space-y-1 text-xs text-slate-700">
                {certifications.map((cert, idx) => (
                  <div key={cert.id || idx}>
                    <span className="font-medium text-slate-800">{cert.name}</span>
                    <span className="text-[9pt] text-slate-400 ml-1">({cert.issuer})</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
