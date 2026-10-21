export function resumeToText(resumeData) {
  if (!resumeData) return '';

  const { 
    personal = {}, 
    summary = '', 
    experience = [], 
    education = [], 
    skills = {}, 
    projects = [], 
    certifications = [] 
  } = resumeData;

  const lines = [];

  // Personal Info
  if (personal.fullName) lines.push(personal.fullName);
  if (personal.jobTitle) lines.push(personal.jobTitle);

  const contact = [
    personal.email,
    personal.phone,
    personal.location,
    personal.linkedin,
    personal.github,
    personal.website
  ].filter(Boolean);
  if (contact.length) lines.push(contact.join(' | '));

  lines.push('');

  // Summary
  if (summary) {
    lines.push('PROFESSIONAL SUMMARY');
    lines.push(summary);
    lines.push('');
  }

  // Experience
  if (experience && experience.length) {
    lines.push('WORK EXPERIENCE');
    experience.forEach(exp => {
      lines.push(`${exp.position || ''} at ${exp.company || ''} (${exp.startDate || ''} - ${exp.current ? 'Present' : exp.endDate || ''})`);
      if (exp.location) lines.push(`Location: ${exp.location}`);
      (exp.bullets || []).forEach(b => {
        if (b) lines.push(`• ${b}`);
      });
      lines.push('');
    });
  }

  // Skills
  const allSkills = [
    ...(skills.languages || []),
    ...(skills.frameworks || []),
    ...(skills.databases || []),
    ...(skills.tools || [])
  ];
  if (allSkills.length) {
    lines.push('TECHNICAL SKILLS');
    if (skills.languages?.length) lines.push(`Languages: ${skills.languages.join(', ')}`);
    if (skills.frameworks?.length) lines.push(`Frameworks: ${skills.frameworks.join(', ')}`);
    if (skills.databases?.length) lines.push(`Databases: ${skills.databases.join(', ')}`);
    if (skills.tools?.length) lines.push(`Tools & Cloud: ${skills.tools.join(', ')}`);
    lines.push('');
  }

  // Projects
  if (projects && projects.length) {
    lines.push('KEY PROJECTS');
    projects.forEach(p => {
      lines.push(`${p.title || ''} (${(p.technologies || []).join(', ')})`);
      if (p.link || p.github) lines.push(`Links: ${[p.link, p.github].filter(Boolean).join(' | ')}`);
      if (p.description) lines.push(p.description);
      lines.push('');
    });
  }

  // Education
  if (education && education.length) {
    lines.push('EDUCATION');
    education.forEach(edu => {
      lines.push(`${edu.degree || ''} in ${edu.field || ''} - ${edu.institution || ''} (${edu.startDate || ''} - ${edu.endDate || ''})`);
      if (edu.gpa) lines.push(`GPA: ${edu.gpa}`);
    });
    lines.push('');
  }

  // Certifications
  if (certifications && certifications.length) {
    lines.push('CERTIFICATIONS');
    certifications.forEach(c => {
      lines.push(`${c.name || ''} - ${c.issuer || ''} (${c.date || ''})`);
    });
  }

  return lines.join('\n');
}
