'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface IApplication {
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

interface IJob {
  _id?: string;
  CompanyName: string;
  Jobtitle: string;
  experience: string;
  location: string;
  salary: string;
  salaryValue: number;
  JobType?: string;
  ApplicationDate?: Date;
  postedTime: string;
  JobDescription: string;
  Experience: string;
  Jobicon: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default function ApplicationsPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<IApplication[]>([]);
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'applications' | 'jobs'>('applications');

  useEffect(() => {
    fetchApplications();
    fetchJobs();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/applications');
      const data = await response.json();
      if (data.success) {
        setApplications(data.data);
      } else {
        console.error('Failed to fetch applications:', data.error);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/jobs');
      const data = await response.json();
      if (data.success) {
        setJobs(data.data);
      } else {
        console.error('Failed to fetch jobs:', data.error);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteApplication = async (id: string) => {
    if (!confirm('Are you sure you want to delete this application?')) {
      return;
    }

    try {
      const response = await fetch(`/api/applications?id=${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      if (data.success) {
        setApplications(applications.filter(app => app._id !== id));
        alert('Application deleted successfully');
      } else {
        alert('Failed to delete application');
      }
    } catch (error) {
      console.error('Error deleting application:', error);
      alert('Error deleting application');
    }
  };

  const handleDeleteJob = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job? This will also remove all related applications.')) {
      return;
    }

    try {
      const response = await fetch(`/api/jobs?id=${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      if (data.success) {
        setJobs(jobs.filter(job => job._id !== id));
        // Also remove related applications
        setApplications(applications.filter(app => app.jobId !== id));
        alert('Job deleted successfully');
      } else {
        alert('Failed to delete job');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Error deleting job');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#fafafa] flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm border-b flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage applications and job postings</p>
            </div>
            <button
              onClick={() => router.push('/')}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-shrink-0">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('applications')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'applications'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Applications ({applications.length})
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'jobs'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Job Postings ({jobs.length})
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 overflow-hidden">
        {activeTab === 'applications' && (
          <div className="h-full flex flex-col">
            {applications.length === 0 ? (
              <div className="text-center py-12 flex-1 flex flex-col justify-center">
                <div className="text-gray-400 text-6xl mb-4">📄</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No applications yet</h3>
                <p className="text-gray-500">Applications will appear here when users apply for jobs.</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden flex-1 flex flex-col">
                <div className="overflow-auto flex-1">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Applicant Details
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Job Information
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact & Resume
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status & Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {applications.map((application) => (
                        <tr key={application._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">
                              {application.applicantName}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {application._id?.slice(-8)}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">{application.jobTitle}</div>
                            <div className="text-sm text-gray-500">{application.companyName}</div>
                            <div className="text-xs text-gray-400">Job ID: {application.jobId.slice(-8)}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">{application.applicantEmail}</div>
                            {application.applicantPhone && (
                              <div className="text-sm text-gray-500">{application.applicantPhone}</div>
                            )}
                            {application.resume && (
                              <div className="text-xs text-blue-600">Resume: Available</div>
                            )}
                            {application.coverLetter && (
                              <div className="text-xs text-green-600">Cover Letter: Available</div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}>
                              {application.status}
                            </span>
                            <div className="text-xs text-gray-500 mt-1">
                              Applied: {new Date(application.appliedAt).toLocaleDateString()}
                            </div>
                            {application.createdAt && (
                              <div className="text-xs text-gray-400">
                                Created: {new Date(application.createdAt).toLocaleDateString()}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => handleDeleteApplication(application._id!)}
                              className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md transition-colors"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="h-full flex flex-col">
            {jobs.length === 0 ? (
              <div className="text-center py-12 flex-1 flex flex-col justify-center">
                <div className="text-gray-400 text-6xl mb-4">💼</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No jobs posted yet</h3>
                <p className="text-gray-500">Job postings will appear here when created.</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden flex-1 flex flex-col">
                <div className="overflow-auto flex-1">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Job Details
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Company & Location
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Salary & Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Posted & Deadline
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {jobs.map((job) => (
                        <tr key={job._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">{job.Jobtitle}</div>
                            <div className="text-sm text-gray-500">{job.experience} experience</div>
                            <div className="text-xs text-gray-400">ID: {job._id?.slice(-8)}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">{job.CompanyName}</div>
                            <div className="text-sm text-gray-500">{job.location}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">{job.salary}</div>
                            <div className="text-sm text-gray-500">{job.JobType || 'Full Time'}</div>
                            <div className="text-xs text-gray-400">Max: ₹{job.salaryValue} LPA</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500">{job.postedTime}</div>
                            {job.ApplicationDate && (
                              <div className="text-xs text-red-600">
                                Deadline: {new Date(job.ApplicationDate).toLocaleDateString()}
                              </div>
                            )}
                            {job.createdAt && (
                              <div className="text-xs text-gray-400">
                                Created: {new Date(job.createdAt).toLocaleDateString()}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => handleDeleteJob(job._id!)}
                              className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md transition-colors"
                            >
                              Delete Job
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}