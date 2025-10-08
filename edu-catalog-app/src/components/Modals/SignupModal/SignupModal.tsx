import { toast } from 'sonner';
import SignupForm from './SignupForm/SignupForm';
import { useAuthStore } from '@/store/auth';
import ForgotPasswordBtn from '@/components/ForgotPasswordBtn/ForgotPasswordBtn';

const SignupModal = () => {
  const { fetchUserInfo } = useAuthStore();

  // @ts-ignore
  const closeSignUpModal = () => document.getElementById('signup_modal').close();
  // @ts-ignore
  const openLoginModal = () => document.getElementById('login_modal').showModal();

  const handleError = (errorMsg: string) => {
    toast.error(errorMsg, { duration: 5000 });
  };
  const handleSuccess = (token: string) => {
    toast.success('Registration successful! You are now logged in.');
    fetchUserInfo();
    closeSignUpModal();
  };

  return (
    <dialog id="signup_modal" className="modal">
      <div className="modal-box text-center">
        <span className="font-semibold text-xl">Register New Account</span>
        <div className="mt-10">
          <SignupForm onError={handleError} onSuccess={handleSuccess} />
        </div>
        <p className="text-sm mt-4">
          Already have an account?{' '}
          <button
            className="text-blue-500 underline ml-2 btn"
            onClick={() => {
              closeSignUpModal();
              openLoginModal();
            }}
          >
            Log in
          </button>
        </p>
        <ForgotPasswordBtn closeAction={closeSignUpModal} />
      </div>
    </dialog>
  );
};

export default SignupModal;
