export type HrPostedJobsType = {
  _id: string;
  jobTitle: string;
  jobDepartment: string;
  jobType: EmployeeJobType;
  jobLevel: EmployeeJobLevel;
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

export type EmployeeJobType = 'FULL_TIME' | 'PART_TIME' | 'ROSTER' | 'SHIFT' | 'REMOTE' | 'SEASONAL' | 'OTHER';
export type EmployeeJobLevel = 'EXECUTIVE' | 'SENIOR' | 'MID_LEVEL' | 'JUNIOR' | 'CONTRACTOR' | 'INTERN' | 'VOLUNTEER' | 'OTHER';

export type EmployeeType = {
  _id: string;
  employeeClerkId: string;
  employeeFirstName: string;
  employeeLastName: string;
  employeeTelNumber: string;
  employeeEmail: string;
  employeeDepartment: string;
  employeeJobTitle: string;
  employeeJobType: EmployeeJobType;
  employeeJobLevel: EmployeeJobLevel;
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
  candidateCurrentStatus: 'CURRENTLY_EMPLOYED' | 'UNEMPLOYED' | 'SELF_EMPLOYED' | 'STUDENT' | 'INTERN' | 'OTHER';
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
