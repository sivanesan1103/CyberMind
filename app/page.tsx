'use client';

import { useState, useEffect, useCallback } from 'react';
import { IJob } from '../models/Job';
import { Header, SearchFilters, JobGrid, CreateJobModal, rangeSliderStyles, type JobFilters } from '../components';

type JobFormData = Omit<IJob, '_id'>;

export default function Home() {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<IJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filters, setFilters] = useState<JobFilters>({
    search: '',
    location: '',
    jobType: '',
    salaryMin: 0,
    salaryMax: 60
  });

  // Add styles to head
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = rangeSliderStyles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  // Fetch jobs from API
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/jobs');
      const data = await response.json();
      if (data.success) {
        setJobs(data.data);
      } else {
        console.error('Failed to fetch jobs:', data.error);
        setJobs([]);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = useCallback(() => {
    let filtered = [...jobs];

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(job =>
        job.Jobtitle.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.CompanyName.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(job =>
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Job type filter
    if (filters.jobType) {
      filtered = filtered.filter(job =>
        job.JobType?.toLowerCase() === filters.jobType.toLowerCase()
      );
    }

    // Salary filter
    filtered = filtered.filter(job =>
      job.salaryValue >= filters.salaryMin && job.salaryValue <= filters.salaryMax
    );

    setFilteredJobs(filtered);
  }, [jobs, filters]);

  // Apply filters when jobs or filters change
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleCreateJob = async (jobData: JobFormData) => {
    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });

      if (response.ok) {
        fetchJobs(); // Refresh jobs list
        setShowCreateModal(false);
      }
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <Header onCreateJob={() => setShowCreateModal(true)} />

      {/* Search and Filters */}
      <SearchFilters filters={filters} setFilters={setFilters} />

      {/* Job Listings */}
      <main className="px-4 sm:px-8 md:px-12 lg:px-16 py-6 md:py-10">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <JobGrid jobs={filteredJobs} />
        )}
      </main>

      {/* Create Job Modal */}
      {showCreateModal && (
        <CreateJobModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateJob}
        />
      )}
    </div>
  );
}


