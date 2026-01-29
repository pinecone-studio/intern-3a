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

export type EmployeeJobType = 'FULL_TIME' | 'PART_TIME' | 'SHIFT_BASED' | 'SEASONAL' | 'CONTRACT' | 'TEMPORARY' | 'OTHER';
export type EmployeeJobLevel = 'EXECUTIVE' | 'UNIT_DIRECTOR' | 'UNIT_HEAD' | 'SENIOR_MANAGER' | 'MANAGER' | 'SENIOR_SPECIALIST' | 'SPECIALIST' | 'SENIOR_STAFF' | 'EMPLOYEE' | 'INTERN' | 'OTHER';

export type EmployeeType = {
  _id?: string;
  employeeClerkId: string;
  employeeFirstName: string;
  employeeLastName: string;
  employeeTelNumber: string;
  employeeEmail: string;
  employeeDepartment: string;
  employeeJobTitle: string;
  employeeJobType: EmployeeJobType;
  employeeJobLevel: EmployeeJobLevel;
  createdAt?: string;
  updatedAt?: string;
};

export type ReferralType = {
  _id: string;
  postedJobId: string;
  referringEmployeeId: string;
  relationWithCandidate: 'FORMER_COLLEAGUE' | 'ALUMNI' | ' FRIEND' | 'FAMILY_RELATIVES' | 'OTHER';
  refferalReason: string;
  candidateFirstName: string;
  candidateLastName: string;
  candidateTelNumber: string;
  candidateEmail: string;
  candidateLinkedinUrl?: string;
  candidateCurrentStatus: 'CURRENTLY_EMPLOYED' | 'STUDENT' | 'UNEMPLOYED' | 'OTHER';
  candidateFieldOfInterest: string;
  candidateResume: string;
  hasCandidateConsent: boolean;
  isNotCurrentEmployee: boolean;
  referralStatus: 'SUBMITTED' | 'BONUS100' |'BONUS200'| 'REJECTED';
  referralStatusUpdatedAt: string;
  bonusAmount?: number;
  bonusApprovedAt?: string;
  createdAt: string;
  updatedAt: string;
};
