'use client';

import { IJob } from '../models/Job';
import { getCompanyIcon, getJobTypeDisplayName, truncateText } from '../lib/utils';
import { useRouter } from 'next/navigation';

interface JobCardProps {
  job: IJob;
}

export default function JobCard({ job }: JobCardProps) {
  const icon = getCompanyIcon(job.CompanyName);
  const router = useRouter();

  return (
    <div className="bg-white rounded-[12px] px-7 py-2shadow-sm hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 relative border-12 border-transparent flex flex-col w-[98%] h-full">
      {/* Time Badge */}
      <div className="absolute top-4 right-4 bg-blue-200 text-blue-900 px-2 py-1 rounded-[8px] text-[10px] font-semibold">
        {job.postedTime}
      </div>

      {/* Company Logo */}
      <div className="mb-3 w-18 h-18 bg-white rounded-[8px] shadow-lg flex justify-center items-center">
        <div className={`w-14 h-14 ${icon.color} rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-md`}>
          {icon.type === 'logo' ? (
            <img src={icon.logo} alt={job.CompanyName} className="w-13 h-13 object-cover rounded-full" />
          ) : (
            icon.letter
          )}
        </div>
      </div>

      {/* Job Title */}
      <h3 className="text-[17px] font-semibold mb-4 text-gray-900 leading-tight">{job.Jobtitle}</h3>

      {/* Job Meta */}
      <div className="flex gap-3 mb-3 flex-wrap text-[16px] text-gray-800">
        <span className="flex items-center gap-1.5">
          <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="7" r="4"/>
            <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
            <line x1="19" y1="8" x2="19" y2="14"/>
            <line x1="22" y1="11" x2="16" y2="11"/>
          </svg>
        {job.experience} Exp
        </span>
        <span className="flex items-center gap-1.5">
          <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 20h2m0 0h10M4 20V6.2c0-1.12 0-1.68.218-2.108c.192-.377.497-.682.874-.874C5.52 3 6.08 3 7.2 3h3.6c1.12 0 1.68 0 2.107.218c.377.192.684.497.875.874c.218.427.218.987.218 2.105V12m0 8h6m-6 0v-8m6 8h2m-2 0v-8c0-.932 0-1.398-.152-1.765a2 2 0 0 0-1.082-1.083C18.398 9 17.932 9 17 9s-1.398 0-1.766.152a2 2 0 0 0-1.082 1.083C14 10.602 14 11.068 14 12m-7-2h4M7 7h4"/>
          </svg>
          {getJobTypeDisplayName(job.JobType || 'fulltime')}
        </span>
        <span className="flex items-center gap-1.5">
          <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <path fill="currentColor" d="M230.91 172a8 8 0 0 1-2.91 10.91l-96 56a8 8 0 0 1-8.06 0l-96-56A8 8 0 0 1 36 169.09l92 53.65l92-53.65a8 8 0 0 1 10.91 2.91ZM220 121.09l-92 53.65l-92-53.65a8 8 0 0 0-8 13.82l96 56a8 8 0 0 0 8.06 0l96-56a8 8 0 1 0-8.06-13.82ZM24 80a8 8 0 0 1 4-6.91l96-56a8 8 0 0 1 8.06 0l96 56a8 8 0 0 1 0 13.82l-96 56a8 8 0 0 1-8.06 0l-96-56A8 8 0 0 1 24 80Zm23.88 0L128 126.74L208.12 80L128 33.26Z"/>
          </svg>
          {(() => {
            // Extract maximum salary from salary string like "0-60 LPA" -> "₹60 LPA"
            const salaryMatch = job.salary.match(/(\d+)-(\d+)\s*LPA/);
            if (salaryMatch) {
              return `${salaryMatch[2]} LPA`;
            }
            return job.salary;
          })()}
        </span>
      </div>

      {/* Job Description */}
      <div className="text-[13px] text-gray-500 leading-relaxed mb-6 flex-grow">
        <div className="space-y-1.5">
          {(() => {
            if (!job.JobDescription || job.JobDescription.trim() === '') {
              return (
                <>
                  <div className="flex items-start gap-2">
                    <span className="text-gray-400 text-xs mt-0.5 flex-shrink-0">•</span>
                    <span className="text-gray-500 text-[13px] leading-5">
                      No specific requirements mentioned
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-gray-400 text-xs mt-0.5 flex-shrink-0">•</span>
                    <span className="text-gray-500 text-[13px] leading-5">
                      Contact for more details
                    </span>
                  </div>
                </>
              );
            }

            let lines = job.JobDescription
              .replace(/\r\n/g, '\n')
              .replace(/\r/g, '\n')
              .split('\n')
              .filter(line => line.trim() !== '');

            // Ensure exactly 2 bullet points
            if (lines.length === 0) {
              lines = ['No specific requirements mentioned', 'Contact for more details'];
            } else if (lines.length === 1) {
              // Split the single line if it's too long, or duplicate it
              const singleLine = lines[0].trim();
              if (singleLine.length > 85) {
                const midPoint = Math.floor(singleLine.length / 2);
                const breakPoint = singleLine.lastIndexOf(' ', midPoint);
                if (breakPoint > 20) {
                  lines = [
                    singleLine.substring(0, breakPoint),
                    singleLine.substring(breakPoint + 1)
                  ];
                } else {
                  lines = [singleLine, 'Apply to know more details'];
                }
              } else {
                lines = [singleLine, 'Apply to know more details'];
              }
            }

            // Take exactly 2 lines
            lines = lines.slice(0, 2);

            return lines.map((line, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-gray-400 text-xs mt-0.5 flex-shrink-0">•</span>
                <span className="text-gray-500 text-[13px] leading-5">
                  {truncateText(line.trim(), 85)}
                </span>
              </div>
            ));
          })()}
        </div>
      </div>

      {/* Apply Button */}
      <button
        onClick={() => router.push('/applications')}
        className="w-full bg-sky-500 hover:bg-sky-600 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(14,165,233,0.3)] text-white py-3 px-4 rounded-md font-semibold text-sm transition-all duration-300 mt-auto"
      >
        Apply Now
      </button>
    </div>
  );
}