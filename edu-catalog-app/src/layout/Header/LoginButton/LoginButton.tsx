import React from 'react';

const LoginButton = () => {
  return (
    // @ts-ignore
    <button className="btn" onClick={() => document.getElementById('login_modal').showModal()}>
      Login
    </button>
  );
};

export default LoginButton;
