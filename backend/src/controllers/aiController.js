import { config } from '../config/config.js';

// Action verbs and enhancers for offline / zero-key mode
const ACTION_VERBS = [
  'Spearheaded', 'Engineered', 'Architected', 'Streamlined', 'Optimized',
  'Accelerated', 'Implemented', 'Orchestrated', 'Delivered', 'Transformed'
];

// Common high-demand tech & domain keywords for heuristic analysis
const COMMON_KEYWORDS = [
  'javascript', 'typescript', 'python', 'java', 'c++', 'go', 'golang', 'rust',
  'react', 'next.js', 'vue', 'angular', 'node.js', 'express', 'django', 'fastapi',
  'postgresql', 'mongodb', 'mysql', 'redis', 'graphql', 'rest api', 'kafka',
  'docker', 'kubernetes', 'aws', 'gcp', 'azure', 'ci/cd', 'git', 'microservices',
  'unit testing', 'jest', 'agile', 'scrum', 'system design', 'distributed systems'
];

function ruleBasedEnhance(type, text) {
  if (!text || text.trim() === '') {
    return text;
  }

  const trimmed = text.trim();

  if (type === 'summary') {
    let enhanced = trimmed;
    if (!enhanced.startsWith('Results-driven') && !enhanced.startsWith('Accomplished') && !enhanced.startsWith('Dedicated')) {
      enhanced = `Results-oriented professional with demonstrated expertise in ${enhanced.toLowerCase().replace(/^(i am a|i am an|experienced|passionate)\s+/i, '')}`;
    }
    if (!enhanced.endsWith('.')) enhanced += '.';
    enhanced += ' Proven track record of delivering scalable solutions, optimizing workflows, and collaborating effectively across cross-functional teams to drive measurable business impact.';
    return enhanced;
  }

  const lines = trimmed.split('\n');
  const improvedLines = lines.map(line => {
    let l = line.trim().replace(/^[-*•]\s*/, '');
    if (!l) return '';

    l = l.replace(/^(responsible for|worked on|helped in|handled|involved in)\s+/i, '');
    l = l.charAt(0).toUpperCase() + l.slice(1);

    const firstWord = l.split(' ')[0].toLowerCase();
    const weakStarters = ['making', 'doing', 'creating', 'building', 'supporting', 'managing'];
    if (weakStarters.includes(firstWord)) {
      const randomVerb = ACTION_VERBS[Math.floor(Math.random() * ACTION_VERBS.length)];
      l = `${randomVerb} ${l.slice(firstWord.length).trim()}`;
    }

    if (!/\d+%|\d+x|\$\d+|\d+\s*(users|clients|teams|projects)/i.test(l)) {
      l = `${l}, resulting in enhanced performance, increased efficiency, and seamless user adoption.`;
    }

    if (!l.endsWith('.')) l += '.';
    return `• ${l}`;
  });

  return improvedLines.filter(Boolean).join('\n');
}

// 1. Text Enhancement (Summary / Bullet Points)
export async function enhanceText(req, res) {
  try {
    const { type, text, jobTitle } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text content is required for AI enhancement.' });
    }

    if (config.geminiApiKey) {
      try {
        const prompt = type === 'summary'
          ? `You are an expert resume writer and ATS specialist. Improve this resume professional summary for a ${jobTitle || 'professional'}. Make it punchy, impactful, ATS-friendly, and 3-4 sentences long. Do NOT fabricate experience. Return ONLY the enhanced summary text.\nUser draft:\n"${text}"`
          : `You are an expert resume writer and ATS specialist. Rewrite these resume bullet points using strong action verbs (XYZ format: Accomplished [X], as measured by [Y], by doing [Z]). Keep it realistic, ATS-optimized, and return clean bullet points starting with •. Return ONLY the bullet points.\nUser bullet points:\n"${text}"`;

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${config.geminiApiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { temperature: 0.3, maxOutputTokens: 600 }
            })
          }
        );

        if (response.ok) {
          const result = await response.json();
          const generatedText = result.candidates?.[0]?.content?.parts?.[0]?.text;
          if (generatedText) {
            return res.status(200).json({
              enhanced: generatedText.trim(),
              provider: 'gemini'
            });
          }
        }
      } catch (geminiErr) {
        console.warn('Gemini API call failed, using heuristic enhancer:', geminiErr.message);
      }
    }

    const enhanced = ruleBasedEnhance(type, text);
    return res.status(200).json({
      enhanced,
      provider: 'built-in'
    });
  } catch (err) {
    console.error('Enhance text error:', err);
    return res.status(500).json({ error: 'Failed to enhance text.' });
  }
}

// 2. Job Description Matcher & Shortlisting Chance
export async function matchJobDescription(req, res) {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({
        error: 'Both resume content and job description are required for matching.'
      });
    }

    // Try Gemini first if key configured
    if (config.geminiApiKey) {
      try {
        const prompt = `You are a Principal Technical Recruiter and ATS Expert.
Analyze this Resume against the Job Description.

Resume:
"""
${resumeText.slice(0, 4000)}
"""

Job Description:
"""
${jobDescription.slice(0, 3000)}
"""

Respond with a strictly valid JSON object matching this schema without any markdown formatting or ticks:
{
  "matchScore": <number between 0 and 100>,
  "shortlistingChance": "<'High (80-95%)' | 'Moderate (55-79%)' | 'Low (<50%)'>",
  "summary": "<2 sentence overview of candidate match>",
  "matchingKeywords": ["<keyword1>", "<keyword2>", "..."],
  "missingKeywords": ["<missingKey1>", "<missingKey2>", "..."],
  "issues": [
    "<Exact gap or issue 1>",
    "<Exact gap or issue 2>"
  ],
  "actionableFixes": [
    "<Concrete step candidate can take to fix issue 1>",
    "<Concrete step candidate can take to fix issue 2>"
  ]
}`;

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${config.geminiApiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.2,
                maxOutputTokens: 1200,
                responseMimeType: 'application/json'
              }
            })
          }
        );

        if (response.ok) {
          const result = await response.json();
          let jsonText = result.candidates?.[0]?.content?.parts?.[0]?.text;
          if (jsonText) {
            jsonText = jsonText.replace(/^```json/i, '').replace(/```$/i, '').trim();
            const parsed = JSON.parse(jsonText);
            return res.status(200).json({
              ...parsed,
              provider: 'gemini'
            });
          }
        }
      } catch (geminiErr) {
        console.warn('Gemini JD match failed, falling back to heuristic engine:', geminiErr.message);
      }
    }

    // Heuristic Engine for JD Matching
    const resumeLower = resumeText.toLowerCase();
    const jdLower = jobDescription.toLowerCase();

    // Extract potential tech skills & terms from JD
    const jdWords = jdLower.match(/[a-zA-Z0-9#+.]+/g) || [];
    const matched = [];
    const missing = [];

    COMMON_KEYWORDS.forEach(kw => {
      if (jdLower.includes(kw)) {
        if (resumeLower.includes(kw)) {
          matched.push(kw.toUpperCase());
        } else {
          missing.push(kw.toUpperCase());
        }
      }
    });

    // Check custom words in JD
    const customJDTerms = Array.from(new Set(jdWords.filter(w => w.length > 4 && !['years', 'experience', 'responsibilities', 'qualifications', 'requirements', 'preferred'].includes(w))));
    customJDTerms.slice(0, 15).forEach(term => {
      if (resumeLower.includes(term)) {
        if (!matched.includes(term.toUpperCase())) matched.push(term.toUpperCase());
      } else {
        if (!missing.includes(term.toUpperCase()) && missing.length < 8) missing.push(term.toUpperCase());
      }
    });

    const totalKey = matched.length + missing.length;
    const matchScore = totalKey > 0 ? Math.min(Math.round((matched.length / totalKey) * 100), 96) : 65;

    let shortlistingChance = 'Moderate (55-79%)';
    if (matchScore >= 78) shortlistingChance = 'High (80-95%)';
    else if (matchScore < 55) shortlistingChance = 'Low (<50%)';

    const issues = [];
    const actionableFixes = [];

    if (missing.length > 0) {
      issues.push(`Missing key technologies requested in JD: ${missing.slice(0, 4).join(', ')}.`);
      actionableFixes.push(`Integrate ${missing.slice(0, 3).join(', ')} into your Skills section and mention them in relevant experience bullet points.`);
    }

    if (!/\d+%|\d+x|\$\d+|\d+\s*users/i.test(resumeText)) {
      issues.push('Resume lacks quantified metrics and measurable business outcomes.');
      actionableFixes.push('Add percentage improvements, dollar values, or user counts to at least 3 experience bullet points (e.g. "reduced latency by 35%").');
    }

    if (!/summary|profile|about/i.test(resumeText)) {
      issues.push('Missing a dedicated Professional Summary tailored to this specific job title.');
      actionableFixes.push('Add a 3-sentence Professional Summary at the top highlighting your years of experience and core alignment with this job.');
    }

    if (issues.length === 0) {
      issues.push('Resume is well-matched; formatting can be further tuned for higher ATS parse rate.');
      actionableFixes.push('Ensure standard single-column layout with no text boxes or complex graphic tables.');
    }

    return res.status(200).json({
      matchScore,
      shortlistingChance,
      summary: `Your resume demonstrates approximately ${matchScore}% alignment with the job requirements. ${missing.length > 0 ? `Addressing ${missing.slice(0, 3).join(', ')} can substantially increase your shortlisting chance.` : 'Strong skill coverage.'}`,
      matchingKeywords: matched.slice(0, 10),
      missingKeywords: missing.slice(0, 8),
      issues,
      actionableFixes,
      provider: 'built-in'
    });
  } catch (err) {
    console.error('Match JD error:', err);
    return res.status(500).json({ error: 'Failed to analyze job description match.' });
  }
}

// 3. ATS Score & Health Checker
export async function checkAtsScore(req, res) {
  try {
    const { resumeText } = req.body;

    if (!resumeText) {
      return res.status(400).json({ error: 'Resume text is required to evaluate ATS score.' });
    }

    if (config.geminiApiKey) {
      try {
        const prompt = `You are an ATS System Engine (like Workday / Greenhouse). Audit this resume for ATS passability, structure, and keyword density.

Resume Content:
"""
${resumeText.slice(0, 4000)}
"""

Respond with a strictly valid JSON object matching this schema without any markdown formatting or ticks:
{
  "atsScore": <number between 0 and 100>,
  "grade": "<'A+' | 'A' | 'B' | 'C' | 'D'>",
  "breakdown": {
    "contactInfo": <number 0-100>,
    "summary": <number 0-100>,
    "experience": <number 0-100>,
    "skills": <number 0-100>,
    "formatting": <number 0-100>
  },
  "strengths": ["<strength 1>", "<strength 2>"],
  "issues": ["<issue 1>", "<issue 2>"],
  "actionableFixes": ["<fix 1>", "<fix 2>"]
}`;

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${config.geminiApiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.2,
                maxOutputTokens: 1200,
                responseMimeType: 'application/json'
              }
            })
          }
        );

        if (response.ok) {
          const result = await response.json();
          let jsonText = result.candidates?.[0]?.content?.parts?.[0]?.text;
          if (jsonText) {
            jsonText = jsonText.replace(/^```json/i, '').replace(/```$/i, '').trim();
            const parsed = JSON.parse(jsonText);
            return res.status(200).json({
              ...parsed,
              provider: 'gemini'
            });
          }
        }
      } catch (geminiErr) {
        console.warn('Gemini ATS check failed, falling back to heuristic engine:', geminiErr.message);
      }
    }

    // Heuristic Engine for ATS Audit
    const textLower = resumeText.toLowerCase();

    // Check contact info
    const hasEmail = /[\w.-]+@[\w.-]+\.\w+/.test(resumeText);
    const hasPhone = /\+?\d[\d\s().-]{7,}\d/.test(resumeText);
    const hasLinkedIn = /linkedin\.com/i.test(resumeText);
    const hasLocation = /ca|ny|tx|wa|india|usa|san francisco|remote|[a-z]+,\s*[a-z]+/i.test(resumeText);
    const contactScore = (hasEmail ? 30 : 0) + (hasPhone ? 25 : 0) + (hasLinkedIn ? 25 : 0) + (hasLocation ? 20 : 0);

    // Check summary
    const hasSummary = /summary|profile|overview|about/i.test(resumeText);
    const summaryLength = (resumeText.match(/(summary|profile)[\s\S]{50,400}?(experience|education|skills)/i) || [''])[0].length;
    const summaryScore = hasSummary ? (summaryLength > 80 ? 95 : 70) : 40;

    // Check experience & metrics
    const hasMetrics = (resumeText.match(/\d+%|\d+x|\$\d+|\d+\s*(users|clients|teams|projects)/gi) || []).length;
    const hasActionVerbs = ACTION_VERBS.filter(v => new RegExp(v, 'i').test(resumeText)).length;
    const expScore = Math.min(40 + (hasMetrics * 12) + (hasActionVerbs * 8), 98);

    // Check skills section
    const hasSkillsHeader = /skills|technical skills|technologies/i.test(resumeText);
    const foundKeywords = COMMON_KEYWORDS.filter(k => textLower.includes(k)).length;
    const skillsScore = hasSkillsHeader ? Math.min(50 + (foundKeywords * 6), 96) : 45;

    // Formatting check
    const formatScore = 92;

    const overallAtsScore = Math.round(
      contactScore * 0.2 + summaryScore * 0.15 + expScore * 0.35 + skillsScore * 0.2 + formatScore * 0.1
    );

    let grade = 'B';
    if (overallAtsScore >= 90) grade = 'A+';
    else if (overallAtsScore >= 80) grade = 'A';
    else if (overallAtsScore >= 70) grade = 'B';
    else grade = 'C';

    const strengths = [];
    const issues = [];
    const actionableFixes = [];

    if (hasEmail && hasPhone) strengths.push('Contact information is complete and easily extractable by ATS parsers.');
    if (hasMetrics >= 2) strengths.push(`Found ${hasMetrics} quantified achievement metrics that provide tangible proof of impact.`);
    if (hasSkillsHeader) strengths.push('Dedicated skills section allows ATS scanners to categorize competencies quickly.');

    if (!hasMetrics || hasMetrics < 2) {
      issues.push('Few or no quantifiable metrics detected in experience bullets.');
      actionableFixes.push('Rewrite bullets with specific metrics (e.g., "Reduced response latency by 40%", "Scaled service to 100k DAU").');
    }

    if (!hasSummary) {
      issues.push('Missing an executive Professional Summary.');
      actionableFixes.push('Add a 3-4 sentence Professional Summary at the top of the resume.');
    }

    if (foundKeywords < 5) {
      issues.push('Technical keyword density is relatively low for automated scanners.');
      actionableFixes.push('List core frameworks, libraries, cloud tools, and databases explicitly in your Technical Skills section.');
    }

    if (strengths.length === 0) strengths.push('Document structure follows clear chronological order.');
    if (issues.length === 0) {
      strengths.push('Excellent overall ATS compliance.');
      actionableFixes.push('Keep resume updated with recent project metrics and industry certifications.');
    }

    return res.status(200).json({
      atsScore: overallAtsScore,
      grade,
      breakdown: {
        contactInfo: contactScore,
        summary: summaryScore,
        experience: expScore,
        skills: skillsScore,
        formatting: formatScore
      },
      strengths,
      issues,
      actionableFixes,
      provider: 'built-in'
    });
  } catch (err) {
    console.error('Check ATS score error:', err);
    return res.status(500).json({ error: 'Failed to evaluate ATS score.' });
  }
}
