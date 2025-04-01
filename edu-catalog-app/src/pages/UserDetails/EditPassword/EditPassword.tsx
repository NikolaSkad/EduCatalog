import CollapsibleForm from '@/components/ColasibleForm/ColasibleForm';
import { RegisterUserResponse, ResetPasswordPayload, UpdateUserPasswordPayload } from '@/interface/user';
import { updateUser, updateUserInfo, updateUserPassword } from '@/services/user';
import { useAuthStore } from '@/store/auth';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

type EditPasswordInputs = {
  currentPassword: string;
  newPassword: string;
};

const EditPassword = () => {
  const { loggoutUser } = useAuthStore();

  // @ts-ignore
  const openLoginModal = () => document.getElementById('login_modal').showModal();

  const { register, handleSubmit, reset } = useForm<EditPasswordInputs>({
    defaultValues: {
      newPassword: '',
      currentPassword: '',
    },
  });

  const { mutate } = useMutation({
    mutationFn: updateUserPassword,
    onError: (error: string) => toast.error(error),
    onSuccess: () => {
      toast.success('User edited successfully');
      loggoutUser();
      openLoginModal();
      reset();
    },
  });

  const onSubmit: SubmitHandler<UpdateUserPasswordPayload> = (data) => {
    mutate(data);
  };

  return (
    <CollapsibleForm onSubmit={handleSubmit(onSubmit)} title="Update Your Password" actionName="Update Password">
      <div className="cards space-y-5">
        <input
          type="password"
          placeholder="Current password"
          {...register('currentPassword')}
          className="input input-bordered w-full"
        />
        <input
          type="password"
          placeholder="New password"
          {...register('newPassword')}
          className="input input-bordered w-full"
        />
      </div>
    </CollapsibleForm>
  );
};

export default EditPassword;
