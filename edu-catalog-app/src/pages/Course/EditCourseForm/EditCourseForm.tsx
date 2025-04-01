import CollapsibleForm from '@/components/ColasibleForm/ColasibleForm';
import { Course, EditCoursePayload } from '@/interface/course';
import { editCourse } from '@/services/courses';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface CourseFormValues {
  scholarshipAvailable: boolean;
  title: string;
  description: string;
  weeks: string;
  tuition: number;
  minimumSkill: string;
}

const EditCourseForm = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();

  const { register, handleSubmit } = useForm<CourseFormValues>();

  const { mutate } = useMutation<Course, Error, EditCoursePayload>({
    mutationFn: (payload) => editCourse(id, payload),
    onError: (error) => {
      // Handle error with toast notification
      toast.error(error.message || 'An error occurred while editing the course.', { duration: 5000 });
    },
    onSuccess: () => {
      // Handle success with toast notification
      toast.success('You successfully edited this course!');
      // Invalidate and refetch queries
      queryClient.invalidateQueries({ queryKey: ['course-by-id', id] });
    },
  });

  const onSubmit: SubmitHandler<CourseFormValues> = (data) => {
    // @ts-ignore
    mutate(data);
  };
  return (
    <CollapsibleForm title="Edit Catalog Info" onSubmit={handleSubmit(onSubmit)}>
      <div className="cards space-y-5">
        {/* Title Input */}
        <div>
          <label className="label">
            <span className="label-text">Course Title</span>
          </label>
          <input
            type="text"
            placeholder="Enter course title"
            {...register('title', { required: 'Title is required' })}
            className={`input input-bordered w-full`}
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            placeholder="Enter course description"
            {...register('description', { required: 'Description is required' })}
            className={`w-full textarea textarea-bordered`}
          />
        </div>

        {/* Weeks Input */}
        <div>
          <label className="label">
            <span className="label-text">Duration (Weeks)</span>
          </label>
          <input
            type="number"
            placeholder="Enter number of weeks"
            {...register('weeks', { required: 'Weeks duration is required' })}
            className={`input input-bordered w-full`}
          />
        </div>

        {/* Tuition Input */}
        <div>
          <label className="label">
            <span className="label-text">Tuition ($)</span>
          </label>
          <input
            type="number"
            placeholder="Enter tuition fee"
            {...register('tuition', { required: 'Tuition is required', valueAsNumber: true })}
            className={`input input-bordered w-full`}
          />
        </div>

        {/* Minimum Skill Input */}
        <div>
          <label className="label">
            <span className="label-text">Minimum Skill</span>
          </label>
          <select
            {...register('minimumSkill', { required: 'Minimum skill level is required' })}
            className="select select-bordered w-full"
          >
            <option value="">Select skill level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        {/* Scholarship Availability */}
        <div className="flex items-center space-x-2">
          <label className="label cursor-pointer">
            <input type="checkbox" className="checkbox" {...register('scholarshipAvailable')} />
            <span className="ml-2 label-text">Scholarships Available</span>
          </label>
        </div>
      </div>
    </CollapsibleForm>
  );
};

export default EditCourseForm;
