import { Course } from './course';
import { WithError, WithSuccess } from './fetch';

export type AtLeastOne<T> = { [K in keyof T]-?: Pick<T, K> & Partial<Omit<T, K>> }[keyof T];

export interface Bootcamp {
  careers: string[];
  photo: string;
  housing: boolean;
  jobAssistance: boolean;
  jobGuarantee: boolean;
  acceptGi: boolean;
  _id: string;
  user: string;
  name: string;
  description: string;
  website: string;
  phone: string;
  email: string;
  address: string;
  createdAt: string;
  slug: string;
  __v: number;
  averageCost: number;
  averageRating: number;
  courses: Course[];
  id: string;
}

export interface AllBootcampsResponse extends WithSuccess, WithError {
  data: Bootcamp[];
}

export interface BootcampResponse extends WithSuccess, WithError {
  data: Bootcamp;
}

export interface EditBootcampPayload {
  name: string;
  description: string;
  website: string;
  email: string;
  image: string;
}

export type EditBootcampPayloadWithOneRequired = AtLeastOne<EditBootcampPayload>;

export type CreateBootcampPayload = {
  name: string;
  description: string;
  website?: string;
  phone?: string;
  email?: string;
  address: string;
  careers: string[];
  photo?: string;
  housing?: boolean;
  jobAssistance?: boolean;
  jobGuarantee?: boolean;
};

export type CreateCoursePayload = {
  title: string;
  description: string;
  weeks: string;
  tuition: number;
  minimumSkill: 'beginner' | 'intermediate' | 'advanced';
  scholarshipAvailable?: boolean;
  image?: string;
  whatYouWillLearn?: string[];
  courseContent?: {
    sectionTitle: string;
    lectures: {
      lectureTitle: string;
      duration: string;
    }[];
  }[];
};
