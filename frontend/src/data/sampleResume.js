export const initialResumeData = {
  personal: {
    fullName: 'Rahul Sharma',
    jobTitle: 'Senior Full Stack Software Engineer',
    email: 'rahul.sharma@example.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/rahulsharma-dev',
    github: 'github.com/rahulsharma',
    website: 'rahulsharma.dev'
  },
  summary: 'Results-driven Senior Full Stack Engineer with 5+ years of experience designing scalable distributed web architectures, high-performance REST/GraphQL APIs, and responsive cloud applications. Proven expertise in React, Node.js, TypeScript, and AWS, with a track record of improving system uptime to 99.99% and optimizing latency by 35%. Passionate about clean code, mentoring engineering teams, and building ATS-compliant web platforms.',
  experience: [
    {
      id: 'exp-1',
      company: 'CloudScale Technologies',
      position: 'Senior Full Stack Developer',
      location: 'San Francisco, CA',
      startDate: '2022-03',
      endDate: 'Present',
      current: true,
      bullets: [
        'Architected and deployed a multi-tenant microservices dashboard using React and Node.js, serving 120,000+ daily active users.',
        'Engineered an event-driven data pipeline using Kafka and MongoDB, reducing average message latency by 42% across 15 services.',
        'Spearheaded the migration of monolithic services to Docker and AWS ECS, cutting infrastructure costs by $18,000 monthly.',
        'Mentored 6 junior and mid-level developers in React best practices, test-driven development, and CI/CD automation.'
      ]
    },
    {
      id: 'exp-2',
      company: 'Apex Data Systems',
      position: 'Full Stack Engineer',
      location: 'Austin, TX',
      startDate: '2020-01',
      endDate: '2022-02',
      current: false,
      bullets: [
        'Designed and implemented responsive web dashboards with React and Redux, boosting client retention by 28%.',
        'Developed 20+ secure RESTful endpoints in Express with JWT authentication, rate limiting, and role-based permissions.',
        'Optimized PostgreSQL database queries and indexing strategies, decreasing complex query response times from 1.8s to 180ms.'
      ]
    }
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      location: 'Berkeley, CA',
      startDate: '2015-08',
      endDate: '2019-05',
      gpa: '3.85 / 4.0'
    }
  ],
  skills: {
    languages: ['JavaScript (ES6+)', 'TypeScript', 'Python', 'Go', 'SQL', 'HTML5/CSS3'],
    frameworks: ['React', 'Node.js', 'Express', 'Next.js', 'Tailwind CSS', 'Redux Toolkit'],
    databases: ['PostgreSQL', 'MongoDB', 'Redis', 'Firebase'],
    tools: ['Docker', 'AWS (S3, EC2, Lambda)', 'Git & GitHub', 'CI/CD (GitHub Actions)', 'Jest', 'Postman']
  },
  projects: [
    {
      id: 'proj-1',
      title: 'ResumeCraft — Intelligent Resume Builder',
      technologies: ['React', 'Node.js', 'Express', 'Tailwind CSS', 'MongoDB'],
      link: 'https://resumecraft.dev',
      github: 'https://github.com/rahulsharma/resumecraft',
      description: 'Built a full-stack ATS-friendly resume creation web application featuring live preview, multi-template rendering, and export to PDF.'
    },
    {
      id: 'proj-2',
      title: 'DevPulse — Real-Time API Health Monitor',
      technologies: ['React', 'TypeScript', 'WebSockets', 'Go', 'PostgreSQL'],
      link: 'https://devpulse.io',
      github: 'https://github.com/rahulsharma/devpulse',
      description: 'Engineered a developer dashboard providing real-time uptime monitoring, ping latency metrics, and automated Slack alert webhooks.'
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services',
      date: '2023-06'
    },
    {
      id: 'cert-2',
      name: 'Meta Certified Front-End Developer',
      issuer: 'Meta',
      date: '2022-04'
    }
  ]
};

export const emptyResumeData = {
  personal: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    website: ''
  },
  summary: '',
  experience: [],
  education: [],
  skills: {
    languages: [],
    frameworks: [],
    databases: [],
    tools: []
  },
  projects: [],
  certifications: []
};
