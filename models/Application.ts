import mongoose from 'mongoose';

export interface IApplication {
  _id?: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone?: string;
  resume?: string;
  coverLetter?: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  appliedAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const ApplicationSchema = new mongoose.Schema<IApplication>({
  jobId: {
    type: String,
    required: [true, 'Job ID is required'],
  },
  jobTitle: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true,
  },
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
  },
  applicantName: {
    type: String,
    required: [true, 'Applicant name is required'],
    trim: true,
  },
  applicantEmail: {
    type: String,
    required: [true, 'Applicant email is required'],
    lowercase: true,
    trim: true,
  },
  applicantPhone: {
    type: String,
    trim: true,
  },
  resume: {
    type: String,
  },
  coverLetter: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'accepted', 'rejected'],
    default: 'pending',
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Create indexes for better query performance
ApplicationSchema.index({ jobId: 1 });
ApplicationSchema.index({ applicantEmail: 1 });
ApplicationSchema.index({ status: 1 });
ApplicationSchema.index({ createdAt: -1 });

// Force model refresh to avoid caching issues
delete mongoose.models.Application;
export default mongoose.model<IApplication>('Application', ApplicationSchema);