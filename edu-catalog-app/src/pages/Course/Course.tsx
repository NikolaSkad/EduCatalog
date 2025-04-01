import { getSingleCourse } from '@/services/courses';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import DeleteCourseBtn from './DeleteCourseBtn/DeleteCourseBtn';
import { useAuthStore } from '@/store/auth';
import EditCourseForm from './EditCourseForm/EditCourseForm';
import ShowAt from '@/components/ShowAt/ShowAt';
import ExpandableSection from '@/components/ExpandableSection/ExpandableSection';

const Course = () => {
  const { id } = useParams<{ id: string }>();
  const { userInfo } = useAuthStore();
  const { role } = userInfo || {};

  const { data: course, isLoading } = useQuery({
    queryKey: ['course-by-id', id],
    queryFn: () => getSingleCourse(id),
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg" />
        <p className="ml-4">Loading course data...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base-200">
        <p>Course not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-base-200 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Course Card */}
        <section className="card lg:card-side bg-base-100 shadow-xl">
          <figure className="w-full lg:w-1/2">
            <img src={course.image} alt={course.title} className="h-full w-full object-cover" />
          </figure>

          <div className="card-body w-full lg:w-1/2">
            <div className="card-actions justify-end">
              <ShowAt at={role === 'admin' || course.user === userInfo._id}>
                <DeleteCourseBtn id={id!} />
              </ShowAt>
            </div>
            <h2 className="card-title text-3xl font-bold">{course.title}</h2>
            <p className="text-gray-600">{course.description}</p>

            <div className="flex gap-2 mt-4">
              <div className="badge badge-primary">{course.weeks} Weeks</div>
              {course.scholarshipAvailable ? (
                <div className="badge badge-success">Scholarship Available</div>
              ) : (
                <div className="badge badge-error">No Scholarship</div>
              )}
            </div>

            <div className="mt-4 space-y-2">
              <p className="text-lg">
                <span className="font-semibold">Tuition:</span>{' '}
                <span className="text-green-600 font-bold">${course.tuition.toLocaleString()}</span>
              </p>
              <p className="text-lg">
                <span className="font-semibold">Skill Level:</span> {course.minimumSkill}
              </p>
              <p className="text-sm text-gray-500">Created At: {new Date(course.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </section>

        {/* Course Lectures */}
        <section className="mt-10 space-y-6">
          <h3 className="text-2xl font-bold mb-4">Course Content</h3>
          {course.courseContent?.map((section, index) => (
            <ExpandableSection key={index} title={`${section.sectionTitle}`}>
              <ul className="space-y-2">
                {section.lectures.map((lecture, idx) => (
                  <li key={idx} className="flex justify-between items-center border-b pb-2">
                    <span>{lecture.lectureTitle}</span>
                    <span className="text-sm text-gray-500">{lecture.duration}</span>
                  </li>
                ))}
              </ul>
            </ExpandableSection>
          ))}
        </section>

        {/* Course Lectures */}
        <section className="mt-10 space-y-6">
          <h3 className="text-2xl font-bold mb-4">Detailed Learning Objectives</h3>
          <ExpandableSection title="What would you learn">
            <ul className="space-y-2">
              {course.whatYouWillLearn?.map((content, index) => (
                <li key={index} className="flex justify-between items-center border-b pb-2">
                  <span>{content}</span>
                </li>
              ))}
            </ul>
          </ExpandableSection>
        </section>

        {/* Edit Form (Admin Only) */}
        <ShowAt at={role === 'admin' || course.user === userInfo._id}>
          <div className="card bg-base-100 shadow-xl mt-8 p-6">
            <h3 className="text-xl font-semibold mb-4">Edit Course</h3>
            <EditCourseForm id={id!} />
          </div>
        </ShowAt>
      </div>
    </div>
  );
};

export default Course;
