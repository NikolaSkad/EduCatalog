import Button from '@/components/Button/Button';
import { Course, EditCoursePayloadWithOneRequired } from '@/interface/course';
import { editCourse } from '@/services/courses';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const EditCourseBtn = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation<Course, Error, EditCoursePayloadWithOneRequired>({
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

  const handleEdit = () => {
    // Mutate with payload
    mutate({ title: 'Tvoj mamejn' });
  };

  return <Button text="Edit" onClick={handleEdit} />;
};

export default EditCourseBtn;
