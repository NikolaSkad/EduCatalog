import CollapsibleForm from '@/components/ColasibleForm/ColasibleForm';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { CreateCoursePayload } from '@/interface/bootcamp';
import { createCourse } from '@/services/courses';

const courseFields = [
  {
    name: 'title',
    label: 'Course Title',
    type: 'text',
    placeholder: 'Enter course title',
    required: true,
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Enter course description',
    required: true,
  },
  {
    name: 'weeks',
    label: 'Duration (in weeks)',
    type: 'text',
    placeholder: 'e.g. 4, 6, 12',
    required: true,
  },
  {
    name: 'tuition',
    label: 'Tuition ($)',
    type: 'number',
    placeholder: 'e.g. 5000',
    required: true,
  },
  {
    name: 'image',
    label: 'Course Image (filename or URL)',
    type: 'text',
    placeholder: 'e.g. course.jpg or full image URL',
  },
];

const minimumSkillOptions = ['beginner', 'intermediate', 'advanced'];

const AddCourseForm = ({ bootcampId }: { bootcampId: string }) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm<CreateCoursePayload>();

  const { mutate } = useMutation({
    mutationFn: (payload: CreateCoursePayload) => createCourse(bootcampId, payload),
    onSuccess: () => {
      toast.success('Course created successfully!');
      queryClient.invalidateQueries({ queryKey: ['all-courses'] });
      queryClient.invalidateQueries({ queryKey: ['courses-for-bootcamp', bootcampId] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'An error occurred while creating the course.');
    },
  });

  const onSubmit = (data: CreateCoursePayload) => {
    console.log('as');
    mutate(data);
  };

  return (
    <CollapsibleForm title="Add Course" onSubmit={handleSubmit(onSubmit)}>
      <div className="cards space-y-5">
        {/* Input/Textarea Fields */}
        {courseFields.map(({ name, label, type, placeholder, required }) => (
          <div key={name}>
            <label className="label">
              <span className="label-text">{label}</span>
            </label>
            {type === 'textarea' ? (
              <textarea
                placeholder={placeholder}
                {...register(name as keyof CreateCoursePayload, required ? { required: `${label} is required` } : {})}
                className="textarea textarea-bordered w-full"
              />
            ) : (
              <input
                type={type}
                placeholder={placeholder}
                {...register(name as keyof CreateCoursePayload, required ? { required: `${label} is required` } : {})}
                className="input input-bordered w-full"
              />
            )}
          </div>
        ))}

        {/* Minimum Skill Select */}
        <div>
          <label className="label">
            <span className="label-text">Minimum Skill</span>
          </label>
          <select {...register('minimumSkill', { required: true })} className="select select-bordered w-full">
            <option value="" disabled>
              Select skill level
            </option>
            {minimumSkillOptions.map((skill) => (
              <option key={skill} value={skill}>
                {skill.charAt(0).toUpperCase() + skill.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Scholarship Toggle */}
        <div className="form-control hover:bg-base-200 px-3 py-1.5 transition-50 rounded-lg">
          <label className="label cursor-pointer">
            <span className="label-text">Scholarship Available</span>
            <input type="checkbox" className="toggle" {...register('scholarshipAvailable')} />
          </label>
        </div>
      </div>
    </CollapsibleForm>
  );
};

export default AddCourseForm;
