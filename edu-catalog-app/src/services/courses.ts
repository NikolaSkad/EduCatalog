import config from '@/config/config.json';
import { _fetch } from './fetch';
import { AllCoursesResponse, Course, EditCoursePayloadWithOneRequired, SingleCourseResponse } from '@/interface/course';
import { CreateCoursePayload } from '@/interface/bootcamp';

// 5
// Get Course

export const getAllCourses = async (): Promise<AllCoursesResponse['data']> => {
  const FETCH_ALL_COURSES_URL = `${config.API_URL}/courses`;
  const { data: courses } = await _fetch<AllCoursesResponse>(FETCH_ALL_COURSES_URL);
  return courses;
};

export const getCoursesForBootcamp = async (id: string): Promise<AllCoursesResponse['data']> => {
  const FETCH_BOOTCAMP_URL = `${config.API_URL}/bootcamps/${id}/courses`;
  const { data: courses } = await _fetch<AllCoursesResponse>(FETCH_BOOTCAMP_URL);
  return courses;
};

export const getSingleCourse = async (id: string): Promise<SingleCourseResponse['data']> => {
  const FETCH_COURSE_URL = `${config.API_URL}/courses/${id}`;
  const { data: course } = await _fetch<SingleCourseResponse>(FETCH_COURSE_URL);
  return course;
};

// CRUD Course

export const createCourse = async (bootcampId: string, payload: CreateCoursePayload): Promise<Course> => {
  const body = JSON.stringify(payload);
  const url = `${config.API_URL}/bootcamps/${bootcampId}/courses`;

  const { data } = await _fetch<{ success: boolean; data: Course }>(url, {
    method: 'POST',
    body,
    isAuthed: true,
  });

  console.log({ data });

  return data;
};

export const editCourse = async (
  id: string,
  payload: EditCoursePayloadWithOneRequired,
): Promise<SingleCourseResponse['data']> => {
  console.log('a');
  const body = JSON.stringify(payload);

  const EDIT_COURSE_URL = `${config.API_URL}/courses/${id}`;
  const { data: editedCourse } = await _fetch<SingleCourseResponse>(EDIT_COURSE_URL, {
    method: 'PUT',
    body,
    isAuthed: true,
  });
  return editedCourse;
};

// Delete Course Function
export const deleteCourse = async (id: string) => {
  const DELETE_COURSE_URL = `${config.API_URL}/courses/${id}`;
  await _fetch<SingleCourseResponse>(DELETE_COURSE_URL, {
    method: 'DELETE',
    isAuthed: true,
  });
};
