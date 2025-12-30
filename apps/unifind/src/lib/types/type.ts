export type University = {
  id: number;
  name: string;
  city: string;
  description: string;
  website: string;
  image?: string;
  logo?: string;
};

export type Subject = {
  id: number;
  name: string;
  type?: string;
};

export type MajorRequirement = {
  id: number;
  major_id: number;
  min_score: number;
  subject_id: number;
  subjects: Subject; // Массив биш, дан объект
};

export type Major = {
  id: number;
  name: string;
  university_id: number;
  degree_type: string;
  description: string;
  universities: University; // Дан объект
  major_requirements: MajorRequirement[];
  created_at: string;
};
