import { EditPasswordMutate, RegisterUserResponse, ResetPasswordPayload } from '@/interface/user';
import { resetPassword } from '@/services/user';
import { useAuthStore } from '@/store/auth';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const ResetPassword = () => {
  const { resetToken } = useParams(); // Obtain the reset token from the URL
  const navigate = useNavigate();
  const { loggoutUser } = useAuthStore();

  const { register, handleSubmit } = useForm<ResetPasswordPayload>();

  const { mutate } = useMutation<RegisterUserResponse['token'], Error, EditPasswordMutate>({
    mutationFn: (data) => resetPassword(data),
    // @ts-ignore
    onError: (error: string) => toast.error(error),
    onSuccess: () => {
      toast.success('Password reset successfully');
      loggoutUser();

      navigate('/');
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordPayload> = (data) => {
    const payload: EditPasswordMutate = {
      resetToken,
      payload: data,
    };

    mutate(payload);
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
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
        <button type="submit" className="btn btn-primary w-full">
          Change password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
