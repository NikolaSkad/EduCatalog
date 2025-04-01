import { toast } from 'sonner';
import ForgotPasswordForm from './ForgotPasswordForm/ForgotPasswordForm';

const ForgotPasswordModal = () => {
  // @ts-ignore
  const closeForgotPasswordModal = () => document.getElementById('forgot_password_modal').close();
  // @ts-ignore
  const openLoginModal = () => document.getElementById('login_modal').showModal();

  const handleError = (errorMsg: string) => {
    toast.error(errorMsg);
  };

  const handleSuccess = () => {
    toast.success('You are successufully logged in!');
    closeForgotPasswordModal();
  };

  return (
    <dialog id="forgot_password_modal" className="modal">
      <div className="modal-box text-center">
        <span className="font-semibold text-xl">Reset Your Password</span>
        <div className="mt-10">
          <ForgotPasswordForm onError={handleError} onSuccess={handleSuccess} />
        </div>
        <p className="text-sm mt-4">
          You remember your password?{' '}
          <button
            className="text-blue-500 underline ml-2 btn"
            onClick={() => {
              closeForgotPasswordModal();
              openLoginModal();
            }}
          >
            Log in
          </button>
        </p>
      </div>
    </dialog>
  );
};

export default ForgotPasswordModal;
