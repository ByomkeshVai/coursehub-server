import { Model, Types } from 'mongoose';

export interface TTag {
  name: string;
  isDeleted: boolean;
}

export interface TDetails {
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
}

export interface TCourse {
  title: string;
  instructor: string;
  categoryId: Types.ObjectId;
  price: number;
  tags: TTag[];
  startDate: string;
  endDate: string;
  language: string;
  provider: string;
  durationInWeeks?: number;
  details: TDetails;
  createdBy?: string | Types.ObjectId;
}

export interface GetAllCoursesParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  minPrice?: number;
  maxPrice?: number;
  tags?: string;
  startDate?: number;
  endDate?: number;
  language?: string;
  provider?: string;
  durationInWeeks?: number;
  level?: string;
}

export interface CourseModel extends Model<TCourse> {
  // eslint-disable-next-line no-unused-vars
  isCourseExists(title: string): Promise<TCourse | null>;
}
