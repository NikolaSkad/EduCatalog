import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { UserPayloadRegister } from '@/interface/user';
import CollapsibleForm from '@/components/ColasibleForm/ColasibleForm';
import { createUser } from '@/services/user';

const AddUserForm = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<UserPayloadRegister>();

  const { mutate } = useMutation({
    mutationFn: createUser,
    onError: (error: string) => toast.error(error),
    onSuccess: () => {
      toast.success('User created successfully');
      queryClient.invalidateQueries({ queryKey: ['all-users'] });
      reset();
    },
  });

  const onSubmit: SubmitHandler<UserPayloadRegister> = (data) => {
    mutate(data);
  };

  return (
    <CollapsibleForm title="Add a New User" actionName="Create User" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Full Name</span>
        </label>
        <input
          type="text"
          placeholder="Full Name"
          {...register('name', { required: true })}
          className="input input-bordered w-full"
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          placeholder="Email"
          {...register('email', { required: true })}
          className="input input-bordered w-full"
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          placeholder="Password"
          {...register('password', { required: true })}
          className="input input-bordered w-full"
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Role</span>
        </label>
        <select {...register('role', { required: true })} className="select select-bordered w-full">
          <option value="user">User</option>
          <option value="admin">Publisher</option>
        </select>
      </div>
    </CollapsibleForm>
  );
};

export default AddUserForm;
