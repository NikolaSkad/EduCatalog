import Button from '@/components/Button/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface EditButtonProps<TPayload> {
  id: string;
  queryKeys: string[][];
  mutationFn: (id: string, payload: TPayload) => Promise<any>;
  payload: TPayload;
  successMessage: string;
  errorMessage: string;
}

const EditButton = <TPayload,>({
  id,
  queryKeys,
  mutationFn,
  payload,
  successMessage,
  errorMessage,
}: EditButtonProps<TPayload>) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation<any, Error, TPayload>({
    mutationFn: (data) => mutationFn(id, data),
    onError: (error) => {
      toast.error(error.message || errorMessage, { duration: 5000 });
    },
    onSuccess: () => {
      toast.success(successMessage);
      queryKeys.forEach((queryKey) => {
        queryClient.invalidateQueries({ queryKey });
      });
    },
  });

  const handleEdit = () => {
    mutate(payload);
  };

  return <Button text="Edit" onClick={handleEdit} />;
};

export default EditButton;
