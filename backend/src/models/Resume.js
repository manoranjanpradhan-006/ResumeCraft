import mongoose from 'mongoose';

export const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true
    },
    title: {
      type: String,
      default: 'Untitled Resume',
      trim: true
    },
    template: {
      type: String,
      enum: ['ats', 'minimal', 'modern', 'classic'],
      default: 'ats'
    },
    /**
     * Structured Resume Data:
     * - personal: { fullName, jobTitle, email, phone, location, linkedin, github, website }
     * - summary: String
     * - experience: [{ id, company, position, location, startDate, endDate, current, bullets }]
     * - education: [{ id, institution, degree, field, location, startDate, endDate, gpa }]
     * - skills: { languages: [], frameworks: [], databases: [], tools: [] }
     * - projects: [{ id, title, technologies: [], link, github, description }]
     * - certifications: [{ id, name, issuer, date }]
     */
    data: {
      type: Object,
      default: () => ({
        personal: {},
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
      })
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// Guard against compiling model multiple times
export const Resume = mongoose.models.Resume || mongoose.model('Resume', resumeSchema);
export default Resume;
