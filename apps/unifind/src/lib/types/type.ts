export type University = {
  id: number;
  name: string;
  city: string;
  description: string;
  website: string;
  image?: string;
  logo?: string;
  burtgelduusah_end_date: string;
  burtgelehleh_start_date: string;
};

export type Subject = {
  id: number;
  name: string;
  type?: string;
};

export interface FilterState {
  search: string;
  categories: string[];
  minScore: number;
  sortBy: string;
}

export type MajorRequirement = {
  id: number;
  major_id: number;
  min_score: number;
  subject_id: number;
  subjects: Subject;
};

export type Major = {
  id: number;
  name: string;
  university_id: number;
  degree_type: string;
  description: string;
  universities: University;
  major_requirements: MajorRequirement[];
  created_at: string;
};

export type NumDates = {
  start_date: string;
  end_date: string;
  raw_text: string;
};
// src/types/filters.ts
export type Filters = {
  search: string;
  majorNames: string[];
  minScore: number;
  sortBy: string;
};

export const MONGOL_MONTHS = ['1 сарын', '2 сарын', '3 сарын', '4 сарын', '5 сарын', '6 сарын', '7 сарын', '8 сарын', '9 сарын', '10 сарын', '11 сарын', '12 сарын'];
