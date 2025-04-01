import Button from '@/components/Button/Button';
import { wait } from '@/services/async';
import { deleteCourse } from '@/services/courses';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const DeleteCourseBtn = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: mutateDelete } = useMutation<void, Error, string>({
    mutationFn: deleteCourse,
  });

  const onError = (errorMsg: string) => {
    console.log({ errorMsg });
    toast.error(errorMsg, { duration: 5000 });
  };
  const onSuccess = async (fields?: string[]) => {
    toast.success(`Your successfully delete this course!`);
    queryClient.invalidateQueries({ queryKey: ['courses-for-bootcamp', id] });
    await wait(1000);
    navigate('/');
  };

  const handleDelete = () => {
    // @ts-ignore
    mutateDelete(id, { onError, onSuccess });
  };

  return <Button text="Delete" className="bg-red-400 hover:bg-red-300 text-white" onClick={handleDelete} />;
};

export default DeleteCourseBtn;
