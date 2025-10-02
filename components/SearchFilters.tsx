'use client';

export interface JobFilters {
  search: string;
  location: string;
  jobType: string;
  salaryMin: number;
  salaryMax: number;
}

interface SearchFiltersProps {
  filters: JobFilters;
  setFilters: (filters: JobFilters) => void;
}

export default function SearchFilters({ filters, setFilters }: SearchFiltersProps) {
  return (
    <section className="bg-white sm:px-8 md:px-12 lg:px-25 md:py-3 border-b border-gray-100">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-5 items-stretch lg:items-center w-full">
        {/* Search */}
        <div className="w-full lg:flex-1 lg:min-w-[200px] flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-md bg-white focus-within:border-purple-500 focus-within:shadow-[0_0_0_3px_rgba(168,85,247,0.1)]">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="   Search By Job Title, Role"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="border-none bg-transparent outline-none text-sm w-full text-gray-700 placeholder:text-gray-600"
          />
        </div>
        <div className="w-0.5 h-13 bg-gray-200 mx-2 hidden lg:block"></div>

        {/* Location */}
        <div className="w-full lg:flex-1 lg:min-w-[200px] flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-md bg-white focus-within:border-purple-500 focus-within:shadow-[0_0_0_3px_rgba(168,85,247,0.1)]">
          <svg className="w-7 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <select
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="border-none bg-transparent outline-none text-sm w-full text-gray-600 cursor-pointer"
          >
            <option value="">Preferred Location</option>
            <option value="chennai">Chennai</option>
            <option value="bangalore">Bangalore</option>
            <option value="mumbai">Mumbai</option>
            <option value="delhi">Delhi</option>
            <option value="hyderabad">Hyderabad</option>
            <option value="pune">Pune</option>
          </select>
        </div>

        <div className="w-0.5 h-13 bg-gray-200 mx-2 hidden lg:block"></div>

        {/* Job Type */}
        <div className="w-full lg:flex-1 lg:min-w-[200px] flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-md bg-white focus-within:border-purple-500 focus-within:shadow-[0_0_0_3px_rgba(168,85,247,0.1)]">
          <svg className="w-6 h-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" xmlSpace="preserve" fill="currentColor">
            <path d="M12.375 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zm0-12c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zM23.375 32a1 1 0 0 1-1-1v-6.115a6.95 6.95 0 0 0-6.942-6.943H9.317a6.95 6.95 0 0 0-6.942 6.943V31a1 1 0 1 1-2 0v-6.115c0-4.93 4.012-8.943 8.942-8.943h6.116c4.93 0 8.942 4.012 8.942 8.943V31a1 1 0 0 1-1 1z"/>
            <g><path d="M30.625 12.914H20.254a1 1 0 1 1 0-2h10.371a1 1 0 1 1 0 2zM30.625 20.293h-5.25a1 1 0 1 1 0-2h5.25a1 1 0 1 1 0 2zM30.625 27.672h-3.914a1 1 0 1 1 0-2h3.914a1 1 0 1 1 0 2z"/></g>
          </svg>
          <select
            value={filters.jobType}
            onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
            className="border-none bg-transparent outline-none text-sm w-full text-gray-600 cursor-pointer"
          >
            <option value="">Job type</option>
            <option value="fulltime">Full Time</option>
            <option value="parttime">Part Time</option>
            <option value="internship">Internship</option>
            <option value="contract">Contract</option>
          </select>
        </div>

        <div className="w-0.5 h-13 bg-gray-200 mx-2 hidden lg:block"></div>

        {/* Salary Range */}
        <div className="w-full lg:flex-1 lg:min-w-[220px] xl:min-w-[240px] px-3 md:px-6 py-1">
          <div className="flex justify-between mb-1.5 text-[14px] font-medium text-black-500">
            <span>Salary (LPA)</span>
            <span className="text-gray-900 font-semibold">{filters.salaryMax} LPA</span>
          </div>
          <div className="relative h-1.5 bg-gray-200 rounded-full mt-2">
            <div
              className="absolute h-1.5 bg-black rounded-full shadow-sm"
              style={{
                left: `${(filters.salaryMin / 60) * 100}%`,
                width: `${((filters.salaryMax - filters.salaryMin) / 60) * 100}%`
              }}
            ></div>
            <input
              type="range"
              min="0"
              max="60"
              value={filters.salaryMin}
              onChange={(e) => setFilters({ ...filters, salaryMin: parseInt(e.target.value) })}
              className="absolute w-full h-1.5 top-0 bg-transparent appearance-none cursor-pointer range-slider"
            />
            <input
              type="range"
              min="0"
              max="60"
              value={filters.salaryMax}
              onChange={(e) => setFilters({ ...filters, salaryMax: parseInt(e.target.value) })}
              className="absolute w-full h-1.5 top-0 bg-transparent appearance-none cursor-pointer range-slider"
            />
          </div>
        </div>
      </div>
    </section>
  );
}