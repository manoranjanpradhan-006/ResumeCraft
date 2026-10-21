import mongoose from 'mongoose';

export const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true
    },
    position: {
      type: String,
      required: [true, 'Job position is required'],
      trim: true
    },
    location: {
      type: String,
      default: '',
      trim: true
    },
    salary: {
      type: String,
      default: '',
      trim: true
    },
    status: {
      type: String,
      enum: ['wishlist', 'applied', 'interviewing', 'offer', 'rejected'],
      default: 'applied'
    },
    appliedDate: {
      type: String,
      default: () => new Date().toISOString().split('T')[0]
    },
    jobUrl: {
      type: String,
      default: '',
      trim: true
    },
    resumeUsed: {
      type: String,
      default: 'Default Resume'
    },
    notes: {
      type: String,
      default: ''
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
  { timestamps: true }
);

export const Application = mongoose.models.Application || mongoose.model('Application', applicationSchema);
export default Application;
