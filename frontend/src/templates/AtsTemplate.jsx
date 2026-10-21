import React from 'react';

export default function AtsTemplate({ data }) {
  const { personal, summary, experience, education, skills, projects, certifications } = data;

  return (
    <div className="resume-paper p-8 text-neutral-900 bg-white leading-relaxed text-[10pt] font-sans">
      {/* Header / Personal Info */}
      <header className="border-b-2 border-neutral-900 pb-3 mb-4 text-center">
        <h1 className="text-2xl font-bold uppercase tracking-wider text-neutral-900 mb-1">
          {personal.fullName || 'YOUR NAME'}
        </h1>
        {personal.jobTitle && (
          <p className="text-sm font-semibold tracking-wide text-neutral-700 uppercase mb-2">
            {personal.jobTitle}
          </p>
        )}
        
        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-xs text-neutral-700">
          {personal.phone && <span>{personal.phone}</span>}
          {personal.phone && personal.email && <span>•</span>}
          {personal.email && (
            <a href={`mailto:${personal.email}`} className="text-neutral-900 hover:underline">
              {personal.email}
            </a>
          )}
          {personal.email && personal.location && <span>•</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>•</span>}
          {personal.linkedin && (
            <a href={`https://${personal.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="text-neutral-900 hover:underline">
              {personal.linkedin}
            </a>
          )}
          {personal.github && <span>•</span>}
          {personal.github && (
            <a href={`https://${personal.github.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="text-neutral-900 hover:underline">
              {personal.github}
            </a>
          )}
          {personal.website && <span>•</span>}
          {personal.website && (
            <a href={`https://${personal.website.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="text-neutral-900 hover:underline">
              {personal.website}
            </a>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {summary && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-0.5 mb-2">
            Professional Summary
          </h2>
          <p className="text-xs text-neutral-800 text-justify leading-normal">
            {summary}
          </p>
        </section>
      )}

      {/* Work Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-0.5 mb-2.5">
            Work Experience
          </h2>
          <div className="space-y-3">
            {experience.map((exp, idx) => (
              <div key={exp.id || idx}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <div className="font-bold text-xs text-neutral-900">
                    {exp.position || 'Position Title'}
                    {exp.company && <span className="font-semibold text-neutral-700"> | {exp.company}</span>}
                  </div>
                  <div className="text-[9pt] text-neutral-600 font-medium whitespace-nowrap">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate || 'Present'}
                    {exp.location && ` | ${exp.location}`}
                  </div>
                </div>

                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-neutral-800">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="leading-normal">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Technical Skills */}
      {skills && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-0.5 mb-2">
            Technical Skills
          </h2>
          <div className="text-xs space-y-1 text-neutral-800">
            {skills.languages && skills.languages.length > 0 && (
              <div>
                <span className="font-bold text-neutral-900">Languages: </span>
                {skills.languages.join(', ')}
              </div>
            )}
            {skills.frameworks && skills.frameworks.length > 0 && (
              <div>
                <span className="font-bold text-neutral-900">Frameworks & Libraries: </span>
                {skills.frameworks.join(', ')}
              </div>
            )}
            {skills.databases && skills.databases.length > 0 && (
              <div>
                <span className="font-bold text-neutral-900">Databases: </span>
                {skills.databases.join(', ')}
              </div>
            )}
            {skills.tools && skills.tools.length > 0 && (
              <div>
                <span className="font-bold text-neutral-900">Developer Tools & Cloud: </span>
                {skills.tools.join(', ')}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Key Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-0.5 mb-2.5">
            Key Projects
          </h2>
          <div className="space-y-2.5">
            {projects.map((proj, idx) => (
              <div key={proj.id || idx}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <div className="font-bold text-xs text-neutral-900">
                    {proj.title}
                    {proj.technologies && proj.technologies.length > 0 && (
                      <span className="font-normal text-neutral-600 text-[9pt]">
                        {' '}({proj.technologies.join(', ')})
                      </span>
                    )}
                  </div>
                  <div className="text-[9pt] text-neutral-600 space-x-2">
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noreferrer" className="text-neutral-900 underline">
                        Live Demo
                      </a>
                    )}
                    {proj.github && (
                      <a href={proj.github} target="_blank" rel="noreferrer" className="text-neutral-900 underline">
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
                {proj.description && (
                  <p className="text-xs text-neutral-800 leading-normal">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-0.5 mb-2">
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu, idx) => (
              <div key={edu.id || idx} className="flex justify-between items-baseline">
                <div>
                  <div className="font-bold text-xs text-neutral-900">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </div>
                  <div className="text-xs text-neutral-700">
                    {edu.institution} {edu.location && `– ${edu.location}`}
                  </div>
                </div>
                <div className="text-right text-[9pt] text-neutral-600">
                  <div>{edu.startDate} – {edu.endDate}</div>
                  {edu.gpa && <div className="font-semibold text-neutral-800">GPA: {edu.gpa}</div>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section className="mb-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-0.5 mb-2">
            Certifications & Awards
          </h2>
          <div className="space-y-1 text-xs">
            {certifications.map((cert, idx) => (
              <div key={cert.id || idx} className="flex justify-between">
                <span className="font-semibold text-neutral-900">
                  {cert.name} <span className="font-normal text-neutral-600">— {cert.issuer}</span>
                </span>
                <span className="text-[9pt] text-neutral-500">{cert.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
