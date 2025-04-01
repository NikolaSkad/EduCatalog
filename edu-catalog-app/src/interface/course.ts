import { AtLeastOne } from './bootcamp';
import { WithError, WithSuccess } from './fetch';

export interface Course {
  _id: string;
  title: string;
  description: string;
  weeks: string;
  tuition: number;
  minimumSkill: 'beginner' | 'intermediate' | 'advanced';
  scholarshipAvailable: boolean;
  createdAt: string;
  bootcamp: string;
  user: string;
  image: string;
  __v: number;
  whatYouWillLearn: string[];
  courseContent: CourseContentSection[];
}

export interface CourseContentSection {
  sectionTitle: string;
  lectures: Lecture[];
}

export interface Lecture {
  lectureTitle: string;
  duration: string;
}

export interface AllCoursesResponse extends WithSuccess, WithError {
  data: Course[];
}

export interface SingleCourseResponse extends WithSuccess, WithError {
  data: Course;
}

export interface EditCoursePayload {
  scholarshipAvailable: boolean;
  title: string;
  description: string;
  weeks: string;
  tuition: number;
  minimumSkill: string;
}

export type EditCoursePayloadWithOneRequired = AtLeastOne<EditCoursePayload>;
