import Button from '@/components/Button/Button';
import { RegisterUserResponse, UserPayloadRegister } from '@/interface/user';
import { registerUser } from '@/services/user';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginFormProps } from '../../LoginModal/LoginForm/LoginForm';

interface Inputs {
  name: string;
  email: string;
  password: string;
  role: boolean;
}

const SignupForm: React.FC<LoginFormProps> = ({ onError, onSuccess }) => {
  const { register, handleSubmit } = useForm<Inputs>();

  const {
    mutate,
    data: token,
    isPending,
  } = useMutation<RegisterUserResponse['token'], Error, UserPayloadRegister>({
    mutationFn: registerUser,
  });

  const getRole = (isPublisher) => (isPublisher ? 'publisher' : 'user');

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const role = getRole(data.role);
    mutate({ ...data, role }, { onSuccess, onError });
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <label className="input input-bordered flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input type="text" className="grow" placeholder="Username" {...register('name')} />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
          <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
          <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
        </svg>
        <input type="text" className="grow" placeholder="Email" {...register('email')} />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
          <path
            fillRule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clipRule="evenodd"
          />
        </svg>
        <input type="password" className="grow" placeholder="Password" {...register('password')} />
      </label>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Register as Publisher</span>
          <input type="checkbox" className="toggle" defaultChecked={false} {...register('role')} />
        </label>
      </div>
      <Button text="SignUp" loadingText="Signing up..." loading={isPending} buttonProps={{ type: 'submit' }} />
    </form>
  );
};

export default SignupForm;
