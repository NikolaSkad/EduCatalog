import CollapsibleForm from '@/components/ColasibleForm/ColasibleForm';
import { Bootcamp, EditBootcampPayload } from '@/interface/bootcamp';
import { editBootcamp } from '@/services/bootcamp';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const EditBootcampForm = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();

  const { register, handleSubmit } = useForm();

  const { mutate } = useMutation<Bootcamp, Error, EditBootcampPayload>({
    mutationFn: (payload) => editBootcamp(id, payload),
    onError: (error) => {
      toast.error(error.message || 'An error occurred while editing the bootcamp.', { duration: 5000 });
    },
    onSuccess: () => {
      toast.success('You successfully edited this bootcamp!');
      queryClient.invalidateQueries({ queryKey: ['bootcamp-by-id', id] });
    },
  });

  const onSubmit = (data) => {
    // Only the title and description will be updated
    mutate(data);
  };

  return (
    <CollapsibleForm title="Edit Bootcamp Info" onSubmit={handleSubmit(onSubmit)}>
      <div className="cards space-y-5">
        {/* Title Input */}
        <div>
          <label className="label">
            <span className="label-text">Bootcamp Title</span>
          </label>
          <input
            type="text"
            placeholder="Enter bootcamp title"
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
            placeholder="Enter bootcamp description"
            {...register('description', { required: 'Description is required' })}
            className={`w-full textarea textarea-bordered`}
          />
        </div>
      </div>
    </CollapsibleForm>
  );
};

export default EditBootcampForm;
