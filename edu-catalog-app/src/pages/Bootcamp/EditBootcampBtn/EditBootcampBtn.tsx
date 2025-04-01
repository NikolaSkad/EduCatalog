import Button from '@/components/Button/Button';
import { Bootcamp, EditBootcampPayloadWithOneRequired } from '@/interface/bootcamp';
import { editBootcamp } from '@/services/bootcamp';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const EditBootcampBtn = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation<Bootcamp, Error, EditBootcampPayloadWithOneRequired>({
    mutationFn: (payload) => editBootcamp(id, payload),
  });

  const onError = (errorMsg: string) => {
    toast.error(errorMsg, { duration: 5000 });
  };
  const onSuccess = () => {
    toast.success(`Your successfully edit this bootcamp!`);
    queryClient.invalidateQueries({ queryKey: ['bootcamp-by-id', id] });
    queryClient.invalidateQueries({ queryKey: ['courses-for-bootcamp', id] });
  };

  const handleEdit = () => {
    // @ts-ignore
    mutate({ name: 'ITS Bootcamp' }, { onError, onSuccess });
  };

  return <Button text="Edit" onClick={handleEdit} />;
};

export default EditBootcampBtn;
