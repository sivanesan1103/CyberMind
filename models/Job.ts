import mongoose from 'mongoose';

export interface IJob {
  _id?: string;
  CompanyName: string;
  Jobtitle: string;
  experience: string;//1-3years default
  location: string;//(prefered loaction ,chennai,bagalore)
  salary: string;//(salary range, 0-3LPA,3-6LPA)
  salaryValue: number;//(0,12)
  JobType?: string;//(fulltime,parttime,internship)
  ApplicationDate?: Date;
  postedTime: string; // ("24h Ago")
  JobDescription: string;
  Experience: string;//default 1-3years
  Jobicon: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const JobSchema = new mongoose.Schema<IJob>({
  CompanyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
  },
  Jobtitle: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true,
  },
  experience: {
    type: String,
    required: [true, 'Experience level is required'],
    trim: true,
    default: '1-3 years',
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
  },
  salary: {
    type: String,
    required: [true, 'Salary is required'],
    trim: true,
  },
  salaryValue: {
    type: Number,
    required: [true, 'Salary value is required'],
    min: 0,
    max: 60,
  },
  JobType: {
    type: String,
    enum: ['fulltime', 'parttime', 'internship', 'contract'],
    default: 'fulltime',
  },
  ApplicationDate: {
    type: Date,
  },
  postedTime: {
    type: String,
    default: '24h Ago',
  },
  JobDescription: {
    type: String,
    required: [true, 'Job description is required'],
  },
  Experience: {
    type: String,
    default: '1-3 years',
  },
  Jobicon: {
    type: String,
    required: [true, 'Job icon is required'],
  },
}, {
  timestamps: true,
});

// Create indexes for better query performance
JobSchema.index({ CompanyName: 1 });
JobSchema.index({ Jobtitle: 1 });
JobSchema.index({ location: 1 });
JobSchema.index({ salaryValue: 1 });
JobSchema.index({ createdAt: -1 });

// Force model refresh to pick up schema changes
delete mongoose.models.Job;
export default mongoose.model<IJob>('Job', JobSchema);