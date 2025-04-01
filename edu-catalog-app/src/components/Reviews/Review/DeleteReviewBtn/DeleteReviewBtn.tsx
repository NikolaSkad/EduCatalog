import Button from '@/components/Button/Button';
import { deleteReview } from '@/services/revirews';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const DeleteReviewBtn = ({ id, bootcampId }: { id: string; bootcampId: string }) => {
  const queryClient = useQueryClient();

  const { mutate: mutateDelete } = useMutation<void, Error, string>({
    mutationFn: deleteReview,
  });

  const onError = (errorMsg: string) => {
    console.log({ errorMsg });
    toast.error(errorMsg, { duration: 5000 });
  };
  const onSuccess = () => {
    toast.success(`You successfully deleted this review!`);
    queryClient.invalidateQueries({ queryKey: ['reviews-for-bootcamp', bootcampId] });
  };

  const handleDelete = () => {
    // @ts-ignore
    mutateDelete(id, { onError, onSuccess });
  };

  return <Button text="Delete" className="bg-red-400 hover:bg-red-300 text-white" onClick={handleDelete} />;
};

export default DeleteReviewBtn;
