'use client';

import { useState, useEffect } from 'react';
import { getCompanyIcon } from '../lib/utils';

interface JobFormData {
  CompanyName: string;
  Jobtitle: string;
  experience: string;
  location: string;
  salary: string;
  salaryMin: string;
  salaryMax: string;
  salaryValue: number;
  JobType: string;
  JobDescription: string;
  postedTime: string;
  Experience: string;
  Jobicon: string;
}

interface CreateJobModalProps {
  onClose: () => void;
  onSubmit: (data: JobFormData) => void;
}

export default function CreateJobModal({ onClose, onSubmit }: CreateJobModalProps) {
  const [formData, setFormData] = useState({
    CompanyName: '',
    Jobtitle: '',
    experience: '',
    location: '',
    salary: '',
    salaryMin: '',
    salaryMax: '',
    salaryValue: 0,
    JobDescription: '',
    JobType: 'fulltime',
    ApplicationDate: '',
    Jobicon: ''
  });

  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showJobTypeDropdown, setShowJobTypeDropdown] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);

  // Load draft when modal opens
  useEffect(() => {
    const savedDraft = localStorage.getItem('jobDraft');
    if (savedDraft) {
      try {
        const draftData = JSON.parse(savedDraft);
        // Remove the draft-specific fields before setting form data
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { savedAt, isDraft, ...cleanDraftData } = draftData;
        setFormData(cleanDraftData);
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.location || formData.location === '') {
      alert('Please select a location');
      return;
    }

    if (!formData.salaryMin || !formData.salaryMax) {
      alert('Please enter both minimum and maximum salary');
      return;
    }

    const minSalary = parseInt(formData.salaryMin) || 0;
    const maxSalary = parseInt(formData.salaryMax) || 60;

    if (minSalary >= maxSalary) {
      alert('Maximum salary must be greater than minimum salary');
      return;
    }

    // Generate company icon automatically based on company name
    const companyIcon = getCompanyIcon(formData.CompanyName || 'Company');

    onSubmit({
      ...formData,
      experience: formData.experience || '1-3 years',
      Experience: formData.experience || '1-3 years',
      postedTime: '24h Ago',
      salary: (formData.salaryMin && formData.salaryMax) ? `${minSalary}-${maxSalary} LPA` : '0-60 LPA',
      salaryValue: maxSalary,
      Jobicon: companyIcon.type === 'logo' && companyIcon.logo ? companyIcon.logo : (companyIcon.letter || 'C') // Use logo path or letter
    });

    // Clear draft after successful publish
    localStorage.removeItem('jobDraft');
  };

  const handleSaveDraft = async () => {
    setIsSavingDraft(true);
    setDraftSaved(false);

    try {
      // Save draft to localStorage
      const draftData = {
        ...formData,
        savedAt: new Date().toISOString(),
        isDraft: true
      };

      localStorage.setItem('jobDraft', JSON.stringify(draftData));
      setDraftSaved(true);

      // Show success message briefly then close modal
      setTimeout(() => {
        setDraftSaved(false);
        onClose(); // Close the modal after saving
      }, 1500);

    } catch (error) {
      console.error('Error saving draft:', error);
      alert('Failed to save draft');
      setIsSavingDraft(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="mb-10">
            <h2 className="text-xl font-semibold flex justify-center">Create Job Opening</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <input
                  type="text"
                  required
                  value={formData.Jobtitle}
                  onChange={(e) => setFormData({ ...formData, Jobtitle: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                  placeholder="Full Stack Developer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  value={formData.CompanyName}
                  onChange={(e) => setFormData({ ...formData, CompanyName: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                  placeholder="Amazon, Microsoft, Swiggy"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <div className="relative inline-block w-full">
                  <button
                    type="button"
                    onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                    className="inline-flex w-full justify-between gap-x-1.5 rounded-xl bg-white px-3 py-3 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    {formData.location === 'preferred' ? 'Preferred Location' : formData.location === 'chennai' ? 'Chennai' : formData.location === 'bangalore' ? 'Bangalore' : formData.location === 'mumbai' ? 'Mumbai' : formData.location === 'delhi' ? 'Delhi' : formData.location === 'hyderabad' ? 'Hyderabad' : formData.location === 'pune' ? 'Pune' : 'Choose Preferred Location'}
                    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-gray-400">
                      <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {showLocationDropdown && (
                    <div className="absolute left-0 z-10 mt-2 w-full origin-top-left rounded-xl bg-white focus:outline-none">
                      <div className="py-1">
                        {["Preferred Location", "Chennai", "Bangalore", "Mumbai", "Delhi", "Hyderabad", "Pune"].map((city) => (
                          <button
                            key={city}
                            onClick={() => {
                              setFormData({ ...formData, location: city === "Preferred Location" ? "preferred" : city.toLowerCase() });
                              setShowLocationDropdown(false);
                            }}
                            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          >
                            {city}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                <div className="relative inline-block w-full">
                  <button
                    type="button"
                    onClick={() => setShowJobTypeDropdown(!showJobTypeDropdown)}
                    className="inline-flex w-full justify-between gap-x-1.5 rounded-xl bg-white px-3 py-3 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    {formData.JobType === 'fulltime' ? 'Full Time' : formData.JobType === 'parttime' ? 'Part Time' : formData.JobType === 'internship' ? 'Internship' : formData.JobType === 'contract' ? 'Contract' : 'Full Time'}
                    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-gray-400">
                      <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {showJobTypeDropdown && (
                    <div className="absolute left-0 z-10 mt-2 w-full origin-top-left rounded-xl bg-white focus:outline-none">
                      <div className="py-1">
                        {[
                          { value: "fulltime", label: "Full Time" },
                          { value: "internship", label: "Internship" },
                          { value: "parttime", label: "Part Time" },
                          { value: "contract", label: "Contract" }
                        ].map((jobType) => (
                          <button
                            key={jobType.value}
                            onClick={() => {
                              setFormData({ ...formData, JobType: jobType.value });
                              setShowJobTypeDropdown(false);
                            }}
                            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          >
                            {jobType.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                <div className="flex gap-3">
                  <div className="flex items-center">
                    <input
                      type="text"
                      required
                      placeholder="↓↑ ₹0"
                      value={formData.salaryMin}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, '');
                        setFormData({
                          ...formData,
                          salaryMin: value
                        });
                      }}
                      className="w-36 h-12 px-3 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-transparent placeholder:text-xs placeholder:text-gray-400"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="text"
                      required
                      placeholder="↓↑ ₹12,00,000"
                      value={formData.salaryMax}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, '');
                        setFormData({
                          ...formData,
                          salaryMax: value
                        });
                      }}
                      className="w-36 h-12 px-3 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-transparent placeholder:text-xs placeholder:text-gray-400"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Application Deadline</label>
                <input
                  type="text"
                  required
                  value={formData.ApplicationDate}
                  onChange={(e) => setFormData({ ...formData, ApplicationDate: e.target.value })}
                  onFocus={(e) => e.target.type = 'date'}
                  onBlur={(e) => {
                    if (!e.target.value) e.target.type = 'text';
                  }}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-transparent text-sm placeholder:text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
              <textarea
                required
                rows={4}
                value={formData.JobDescription}
                onChange={(e) => setFormData({ ...formData, JobDescription: e.target.value })}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-transparent text-xs"
                placeholder="Please share a description to let the candidate know more about the job role"
              />
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={handleSaveDraft}
                disabled={isSavingDraft}
                className={`py-3 px-7 border border-black rounded-xl transition-colors font-medium text-sm flex items-center gap-2 ${isSavingDraft
                    ? 'bg-gray-100 text-black cursor-not-allowed'
                    : draftSaved
                      ? 'bg-green-50 text-green-700 border-green-300'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
              >
                {isSavingDraft ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
                    Saving...
                  </>
                ) : draftSaved ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Saved!
                  </>
                ) : (
                  <>
                    Save Draft
                    <svg width="16" height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.85355 2.14645C3.65829 1.95118 3.34171 1.95118 3.14645 2.14645C2.95118 2.34171 2.95118 2.65829 3.14645 2.85355L7.14645 6.85355C7.34171 7.04882 7.65829 7.04882 7.85355 6.85355L11.8536 2.85355C12.0488 2.65829 12.0488 2.34171 11.8536 2.14645C11.6583 1.95118 11.3417 1.95118 11.1464 2.14645L7.5 5.79289L3.85355 2.14645ZM3.85355 8.14645C3.65829 7.95118 3.34171 7.95118 3.14645 8.14645C2.95118 8.34171 2.95118 8.65829 3.14645 8.85355L7.14645 12.8536C7.34171 13.0488 7.65829 13.0488 7.85355 12.8536L11.8536 8.85355C12.0488 8.65829 12.0488 8.34171 11.8536 8.14645C11.6583 7.95118 11.3417 7.95118 11.1464 8.14645L7.5 11.7929L3.85355 8.14645Z"
                        fill="currentColor"
                      />
                    </svg>
                  </>
                )}
              </button>
              <button
                type="submit"
                className="py-3 px-8 bg-blue-500 text-white rounded-xl hover:bg-blue-400 transition-colors font-medium text-sm flex items-center gap-2"
              >
                Publish »
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}