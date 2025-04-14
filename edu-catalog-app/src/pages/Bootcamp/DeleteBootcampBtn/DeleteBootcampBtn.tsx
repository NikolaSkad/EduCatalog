import Button from '@/components/Button/Button';
import { deleteBootcamp } from '@/services/bootcamp';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const DeleteBootcampBtn = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: mutateDelete } = useMutation<void, Error, string>({
    mutationFn: () => deleteBootcamp(id),
    onError: (error) => {
      toast.error(error.message || 'An error occurred while deleting the bootcamp.', { duration: 5000 });
    },
    onSuccess: () => {
      toast.success(`Your successfully delete this bootcamp!`);
      queryClient.invalidateQueries({ queryKey: ['all-bootcamps'] });
      queryClient.invalidateQueries({ queryKey: ['bootcamps-publisher'] });
      navigate('/');
    },
  });

  return <Button text="Delete Bootcamp" className="bg-red-400 hover:bg-red-300 text-white" onClick={mutateDelete} />;
};

export default DeleteBootcampBtn;
