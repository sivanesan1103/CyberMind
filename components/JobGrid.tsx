'use client';

import { IJob } from '../models/Job';
import JobCard from './JobCard';

interface JobGridProps {
  jobs: IJob[];
}

export default function JobGrid({ jobs }: JobGridProps) {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full max-w-8xl mx-auto px-4">
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  );
}