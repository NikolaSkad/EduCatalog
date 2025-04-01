import { toast } from 'sonner';
import LoginForm from './LoginForm/LoginForm';
import { User } from '@/interface/user';
import { useAuthStore } from '@/store/auth';
import ForgotPasswordBtn from '@/components/ForgotPasswordBtn/ForgotPasswordBtn';

const LoginModal = () => {
  const { setUserInfo } = useAuthStore();

  // @ts-ignore
  const closeLoginModal = () => document.getElementById('login_modal').close();
  // @ts-ignore
  const openSignUpModal = () => document.getElementById('signup_modal').showModal();

  const handleError = (errorMsg: string) => {
    toast.error(errorMsg);
  };

  const handleSuccess = (data: User) => {
    setUserInfo(data);
    toast.success('You are successufully logged in!');
    closeLoginModal();
  };

  return (
    <dialog id="login_modal" className="modal">
      <div className="modal-box text-center">
        <span className="font-semibold text-xl">Login To Your Account</span>
        <div className="mt-10">
          <LoginForm onError={handleError} onSuccess={handleSuccess} />
        </div>
        <p className="text-sm mt-4">
          Don't have an account?{' '}
          <button
            className="text-blue-500 underline ml-2 btn"
            onClick={() => {
              closeLoginModal();
              openSignUpModal();
            }}
          >
            Sign up
          </button>
        </p>
        <ForgotPasswordBtn closeAction={closeLoginModal} />
      </div>
    </dialog>
  );
};

export default LoginModal;
