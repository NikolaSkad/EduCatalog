import Button from '@/components/Button/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface DeleteButtonProps<TResponse> {
  id: string;
  mutationFn: (id: string) => Promise<TResponse>;
  queryKeys?: string[][]; // Queries to invalidate after successful deletion
  onSuccess?: (data?: TResponse) => Promise<void> | void; // Optional success handler with response data
  successMessage: string;
  errorMessage: string;
}

const DeleteButton = <TResponse,>({
  id,
  mutationFn,
  queryKeys = [],
  onSuccess,
  successMessage,
  errorMessage,
}: DeleteButtonProps<TResponse>) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation<TResponse, Error, string>({
    mutationFn: (itemId) => mutationFn(itemId),
    onError: (error) => {
      toast.error(error.message || errorMessage, { duration: 5000 });
    },
    onSuccess: async (data) => {
      toast.success(successMessage);

      // Invalidate queries if provided
      queryKeys.forEach((queryKey) => {
        queryClient.invalidateQueries({ queryKey });
      });

      if (onSuccess) {
        await onSuccess(data);
      }
    },
  });

  const handleDelete = () => {
    mutate(id);
  };

  return <Button text="Delete" className="bg-red-400 hover:bg-red-300 text-white" onClick={handleDelete} />;
};

export default DeleteButton;
