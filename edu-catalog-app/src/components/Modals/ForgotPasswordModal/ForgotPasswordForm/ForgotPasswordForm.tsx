import Button from '@/components/Button/Button';
import { ForgotPasswordPayload, ForgotPasswordResponse } from '@/interface/user';
import { forgotPassword } from '@/services/user';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  email: string;
};

export interface ForgotPasswordFormProps<T = any> {
  onSuccess: (data: T) => void;
  onError: (error) => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSuccess, onError }) => {
  const { register, handleSubmit } = useForm<Inputs>();

  const {
    mutate,
    data: successMessage,
    isPending,
  } = useMutation<ForgotPasswordResponse['data'], Error, ForgotPasswordPayload>({
    mutationFn: forgotPassword,
  });

  const onSubmit: SubmitHandler<ForgotPasswordPayload> = (data) => {
    console.log({ data });
    mutate(data, { onSuccess, onError });
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <label className="input input-bordered flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
          <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
          <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
        </svg>
        <input type="text" className="grow" placeholder="Email" {...register('email')} />
      </label>
      <Button text="Submit" loadingText="Submiting in..." loading={isPending} buttonProps={{ type: 'submit' }} />
    </form>
  );
};

export default ForgotPasswordForm;
