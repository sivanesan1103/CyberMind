// Utility functions for the job board application

export const formatSalary = (salaryValue: number): string => {
  if (salaryValue <= 3) return '0-3 LPA';
  if (salaryValue <= 6) return '3-6 LPA';
  if (salaryValue <= 10) return '6-10 LPA';
  if (salaryValue <= 15) return '10-15 LPA';
  if (salaryValue <= 25) return '15-25 LPA';
  return '25+ LPA';
};

export const getTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - new Date(date).getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return '24h Ago';
  if (diffDays <= 7) return `${diffDays}d Ago`;
  if (diffDays <= 30) return `${Math.ceil(diffDays / 7)}w Ago`;
  return `${Math.ceil(diffDays / 30)}m Ago`;
};

// Companies that have logo files in public directory
const COMPANY_LOGOS: { [key: string]: string } = {
  'amazon': '/amazon-icon.svg',
  'flipkart': '/flipkart-icon.svg',
  'microsoft': '/microsoft-icon.svg',
  'swiggy': '/swiggy-icon.svg'
};

export const getCompanyIcon = (companyName: string) => {
  const companyKey = companyName.toLowerCase();
  
  // Check if company has a local logo file
  if (COMPANY_LOGOS[companyKey]) {
    return { 
      type: 'logo', 
      logo: COMPANY_LOGOS[companyKey],
      color: 'bg-white border-2 border-gray-200'
    };
  }

  // Generate initials for companies without logos
  const words = companyName.trim().split(' ').filter(word => word.length > 0);
  let letters = '';
  
  if (words.length >= 2) {
    // Use first letter of first and second word
    letters = words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
  } else if (words.length === 1) {
    // Use just the first letter for single word companies
    letters = words[0].charAt(0).toUpperCase();
  } else {
    letters = 'C'; // Default fallback
  }

  const colors = [
    'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 
    'bg-yellow-500', 'bg-indigo-500', 'bg-pink-500', 'bg-gray-800',
    'bg-orange-500', 'bg-teal-500', 'bg-cyan-500', 'bg-rose-500'
  ];
  const colorIndex = companyName.length % colors.length;
  return { 
    type: 'letter', 
    letter: letters, 
    color: colors[colorIndex] 
  };
};

export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const getJobTypeDisplayName = (jobType: string): string => {
  switch (jobType?.toLowerCase()) {
    case 'fulltime':
      return 'Full Time';
    case 'parttime':
      return 'Part Time';
    case 'internship':
      return 'Internship';
    case 'contract':
      return 'Contract';
    default:
      return 'Full Time';
  }
};

export const getLocationDisplayName = (location: string): string => {
  return location.split(',')[0].trim(); // Get first location if multiple
};

// Popular job categories for quick filters
export const JOB_CATEGORIES = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Mobile Developer',
  'DevOps Engineer',
  'Data Scientist',
  'UI/UX Designer',
  'Product Manager',
  'QA Engineer',
  'Business Analyst'
];

// Popular locations
export const POPULAR_LOCATIONS = [
  'Bangalore',
  'Chennai',
  'Mumbai',
  'Delhi',
  'Hyderabad',
  'Pune',
  'Gurgaon',
  'Noida',
  'Kolkata',
  'Ahmedabad'
];

// Experience levels
export const EXPERIENCE_LEVELS = [
  '0-1 years',
  '1-3 years',
  '3-5 years',
  '5-8 years',
  '8-12 years',
  '12+ years'
];

// Salary ranges
export const SALARY_RANGES = [
  { label: '0-3 LPA', min: 0, max: 3 },
  { label: '3-6 LPA', min: 3, max: 6 },
  { label: '6-10 LPA', min: 6, max: 10 },
  { label: '10-15 LPA', min: 10, max: 15 },
  { label: '15-25 LPA', min: 15, max: 25 },
  { label: '25+ LPA', min: 25, max: 100 }
];

// Company icons mapping for popular companies
export const COMPANY_ICONS: Record<string, string> = {
  'google': '🔍',
  'microsoft': '🪟',
  'amazon': '📦',
  'apple': '🍎',
  'facebook': '👥',
  'netflix': '🎬',
  'uber': '🚗',
  'airbnb': '🏠',
  'spotify': '🎵',
  'twitter': '🐦',
  'linkedin': '💼',
  'tesla': '⚡',
  'meta': '👥',
  'swiggy': '🍔',
  'zomato': '🍕',
  'flipkart': '🛒',
  'paytm': '💰',
  'ola': '🚕',
  'byju': '📚',
  'freshworks': '🌱'
};