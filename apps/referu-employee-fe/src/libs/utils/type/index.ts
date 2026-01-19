export type HrPostedJobsType = {
  _id: string;
  jobTitle: string;
  jobDepartment: string;
  jobType: string;
  jobLevel: string;
  salaryMin: number;
  salaryMax: number;
  keyDuties: string[];
  requirements: string[];
  additionalNotes: string;
  requiredSkills: string[];
  benefits: string[];
  contactInfo: string;
  location: string;
  createdAt: string;
  updatedAt: string;
};

export type EmployeeType = {
  _id: string;
  employeeClerkId: string;
  employeeFirstName: string;
  employeeLastName: string;
  employeeTelNumber: string;
  employeeEmail: string;
  employeeDepartment: string;
  employeeJobTitle: string;
  employeeJobType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT';
  employeeJobLevel: 'SPECIALIST' | 'MANAGER' | 'OTHER';
  createdAt: string;
  updatedAt: string;
};

export type ReferralType = {
  _id: string;
  postedJobId: string;
  referringEmployeeId: string;
  relationWithCandidate: 'FRIEND' | 'FORMER_COLLEAGUE' | 'PARENT' | 'SIBLING' | 'RELATIVE' | 'OTHER';
  refferalReason: string;
  candidateFirstName: string;
  candidateLastName: string;
  candidateTelNumber: string;
  candidateEmail: string;
  candidateLinkedinUrl?: string;
  candidateCurrentStatus: 'CURRENTLY_EMPLOYED' | 'UNEMPLOYED' | 'STUDENT' | 'OTHER';
  candidateFieldOfInterest: string;
  candidateResume: string;
  hasCandidateConsent: boolean;
  isNotCurrentEmployee: boolean;
  referralStatus: 'SUBMITTED' | 'APPROVED' | 'REJECTED';
  referralStatusUpdatedAt: string;
  bonusAmount?: number;
  bonusApprovedAt?: string;
  createdAt: string;
  updatedAt: string;
};
