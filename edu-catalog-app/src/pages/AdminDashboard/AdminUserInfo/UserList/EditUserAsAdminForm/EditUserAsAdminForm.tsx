import CollapsibleForm from '@/components/ColasibleForm/ColasibleForm';
import { User, UserPayloadRegister } from '@/interface/user';
import { updateUser } from '@/services/user';
import { useAuthStore } from '@/store/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

type EditUserInputs = {
  email: string;
  name: string;
  password: string;
  role: string;
};

const EditUserAsAdminForm = ({ id }: { id: string }) => {
  const { fetchUserInfo } = useAuthStore();
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm<EditUserInputs>({
    defaultValues: {
      email: '',
      name: '',
    },
  });

  const { mutate } = useMutation<User, Error, UserPayloadRegister>({
    mutationFn: (data) => updateUser(id, data),
    // @ts-ignore
    onError: (error: string) => toast.error(error),
    onSuccess: () => {
      toast.success('User edited successfully');
      fetchUserInfo();
      queryClient.invalidateQueries({ queryKey: ['all-users'] });
      reset();
    },
  });

  const onSubmit: SubmitHandler<EditUserInputs> = (data) => {
    mutate(data);
  };

  return (
    <CollapsibleForm onSubmit={handleSubmit(onSubmit)} title="Update User Info" actionName="Update Info">
      <div className="cards space-y-5">
        <input type="text" placeholder="name" {...register('name')} className="input input-bordered w-full" />
        <input type="text" placeholder="email" {...register('email')} className="input input-bordered w-full" />
        <input
          type="password"
          placeholder="password"
          {...register('password')}
          className="input input-bordered w-full"
        />
      </div>
      <select {...register('role')} className="select select-bordered w-full">
        <option value="">Select role</option>
        <option value="user">User</option>
        <option value="publisher">Publisher</option>
      </select>
    </CollapsibleForm>
  );
};

export default EditUserAsAdminForm;
