import CollapsibleForm from '@/components/ColasibleForm/ColasibleForm';
import { UpdateUserInfoPayload } from '@/interface/user';
import { updateUser, updateUserInfo } from '@/services/user';
import { useAuthStore } from '@/store/auth';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

type EditUserInputs = {
  email: string;
  name: string;
};

const EditUserInfo = () => {
  const { fetchUserInfo } = useAuthStore();

  const { register, handleSubmit, reset } = useForm<EditUserInputs>({
    defaultValues: {
      email: '',
      name: '',
    },
  });

  const { mutate } = useMutation({
    mutationFn: updateUserInfo,
    onError: (error: string) => toast.error(error),
    onSuccess: () => {
      toast.success('User edited successfully');
      fetchUserInfo();
      reset();
    },
  });

  const onSubmit: SubmitHandler<UpdateUserInfoPayload> = (data) => {
    mutate(data);
  };

  return (
    <CollapsibleForm onSubmit={handleSubmit(onSubmit)} title="Update Your Info" actionName="Update Info">
      <div className="cards space-y-5">
        <input type="text" placeholder="name" {...register('name')} className="input input-bordered w-full" />
        <input
          type="text"
          placeholder="email"
          {...register('email', { required: true })}
          className="input input-bordered w-full"
        />
      </div>
    </CollapsibleForm>
  );
};

export default EditUserInfo;
