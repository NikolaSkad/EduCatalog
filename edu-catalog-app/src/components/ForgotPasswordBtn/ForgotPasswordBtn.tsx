const ForgotPasswordBtn = ({ closeAction }: { closeAction: () => void }) => {
  // @ts-ignore
  const openForgotPasswordModal = () => document.getElementById('forgot_password_modal').showModal();

  return (
    <button
      className="text-blue-500 underline bg-transparent ml-2 "
      onClick={() => {
        closeAction();
        openForgotPasswordModal();
      }}
    >
      Forgot Password?
    </button>
  );
};

export default ForgotPasswordBtn;
