type Job = {
  id: string;
  title: string;
  department: string;
  postedDate: string;
  salaryRange: string;
  referralCount?: number;
};

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    department: 'Технологийн алба',
    postedDate: '1-р сарын 10',
    salaryRange: '₮4,000,000 - ₮6,000,000',
    referralCount: 3,
  },
  {
    id: '2',
    title: 'Product Manager',
    department: 'Бүтээгдэхүүний алба',
    postedDate: '1-р сарын 8',
    salaryRange: '₮3,500,000 - ₮5,000,000',
    referralCount: 1,
  },
  {
    id: '3',
    title: 'UX Designer',
    department: 'Дизайны алба',
    postedDate: '1-р сарын 5',
    salaryRange: '₮2,500,000 - ₮4,000,000',
  },
  {
    id: '4',
    title: 'Data Analyst',
    department: 'Өгөгдлийн алба',
    postedDate: '1-р сарын 3',
    salaryRange: '₮3,000,000 - ₮4,500,000',
  },
];
