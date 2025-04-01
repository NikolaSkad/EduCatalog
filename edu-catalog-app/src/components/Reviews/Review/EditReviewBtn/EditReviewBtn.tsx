import Button from '@/components/Button/Button';
import { EditReviewPayloadWithOneRequired, ReviewResponse } from '@/interface/revirews';
import { editReview } from '@/services/revirews';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const EditReviewBtn = ({ id, bootcampId }: { id: string; bootcampId: string }) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation<ReviewResponse['data'], Error, EditReviewPayloadWithOneRequired>({
    mutationFn: (payload) => editReview(id, payload),
  });

  const onError = (errorMsg: string) => {
    toast.error(errorMsg, { duration: 5000 });
  };

  const onSuccess = () => {
    toast.success(`You successfully edited this review!`);
    queryClient.invalidateQueries({ queryKey: ['reviews-for-bootcamp', bootcampId] });
  };

  const handleEdit = () => {
    // @ts-ignore
    mutate({ title: 'Updated Review Title 2' }, { onError, onSuccess });
  };

  return <Button text="Edit" onClick={handleEdit} />;
};

export default EditReviewBtn;
