'use client';

interface HeaderProps {
  onCreateJob: () => void;
}

export default function Header({ onCreateJob }: HeaderProps) {
  return (
    <header className="lg:py-3 md:py-8 bg-white">
      <div className="2xl:container mx-auto">
        <div className="w-[95%] sm:w-[90%] md:w-[70%] lg:w-[60%] mx-auto">
          <nav className="bg-white shadow-md py-3 md:py-4 rounded-full ring-1 ring-gray-200">
            <div className="flex justify-between items-center px-4 sm:px-6 md:px-6 lg:px-8">
              {/* Logo */}
              <div className="flex-shrink-0">
                <svg width="28" height="29" viewBox="0 0 44 46" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 md:w-8 md:h-8">
                  <g clipPath="url(#clip0_2_110)">
                    <mask id="mask0_2_110" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="44" height="46">
                      <path d="M44 0.661621H0V45.3385H44V0.661621Z" fill="white" />
                    </mask>
                    <g mask="url(#mask0_2_110)">
                      <path d="M26.33 5.41968L26.8852 23.3961L41.6353 13.9324L26.33 5.41968Z" fill="#333333" />
                      <path d="M41.5308 32.7551V13.8619L20.395 27.4678V45.3387H21.1064" fill="#494949" />
                      <path d="M3.18878 32.0419L16.7153 23.3629L17.2245 39.8485L3.18878 32.0419Z" fill="url(#paint0_linear_2_110)" />
                      <path d="M2.46906 13.2451V32.1381L23.6051 18.5501V0.661621H22.8936" fill="url(#paint4_linear_2_110)" />
                    </g>
                  </g>
                  <defs>
                    <linearGradient id="paint0_linear_2_110" x1="2.36496" y1="31.5921" x2="17.6704" y2="31.5921" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#00AAFF" />
                      <stop offset="1" stopColor="#8636F8" />
                    </linearGradient>
                    <linearGradient id="paint4_linear_2_110" x1="1.5926" y1="20.0785" x2="24.8932" y2="18.3851" gradientUnits="userSpaceOnUse">
                      <stop offset="0.0226" stopColor="#8636F8" />
                      <stop offset="0.3484" stopColor="#F020B3" />
                      <stop offset="0.6742" stopColor="#F8475E" />
                      <stop offset="1" stopColor="#FF9421" />
                    </linearGradient>
                    <clipPath id="clip0_2_110">
                      <rect width="44" height="44.6769" fill="white" transform="translate(0 0.661621)" />
                    </clipPath>
                  </defs>
                </svg>
              </div>

              {/* Navigation Links - Desktop */}
              <div className="hidden md:flex space-x-6 lg:space-x-10 xl:space-x-16">
                <a href="#" className="text-gray-700 hover:text-purple-600 text-sm font-medium transition-colors">
                  Home
                </a>
                <a href="#" className="text-gray-700 hover:text-purple-600 text-sm font-medium transition-colors">
                  Find Jobs
                </a>
                <a href="#" className="text-gray-700 hover:text-purple-600 text-sm font-medium transition-colors">
                  Find Talents
                </a>
                <a href="#" className="text-gray-700 hover:text-purple-600 text-sm font-medium transition-colors">
                  About us
                </a>
                <a href="#" className="text-gray-700 hover:text-purple-600 text-sm font-medium transition-colors">
                  Testimonials
                </a>
              </div>

              {/* Mobile Navigation - Simplified */}
              <div className="flex md:hidden space-x-4">
                <a href="#" className="text-gray-700 hover:text-purple-600 text-xs font-medium">
                  Home
                </a>
                <a href="#" className="text-gray-700 hover:text-purple-600 text-xs font-medium">
                  Find Jobs
                </a>
                <a href="#" className="text-gray-700 hover:text-purple-600 text-xs font-medium">
                  Find Talents
                </a>
                <a href="#" className="text-gray-700 hover:text-purple-600 text-xs font-medium">
                  About us
                </a>
                <a href="#" className="text-gray-700 hover:text-purple-600 text-xs font-medium">
                  Testimonials
                </a>
              </div>

              {/* Create Jobs Button */}
              <button
                onClick={onCreateJob}
                className="bg-gradient-to-r from-[#A128FF] to-[#6100AD] hover:from-[#8B1FE6] hover:to-[#5200A1] text-white px-3 py-1.5 sm:px-4 md:px-5 md:py-2 rounded-full text-xs md:text-sm font-semibold transition-all flex-shrink-0"
              >
                <span className="hidden sm:inline">Create Jobs</span>
                <span className="sm:hidden">Create</span>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}