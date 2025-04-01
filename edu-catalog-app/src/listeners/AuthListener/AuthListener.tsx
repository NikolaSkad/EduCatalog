import { useAuthStore } from '@/store/auth';
import { useEffect } from 'react';

const AuthListener = () => {
  const { fetchUserInfo } = useAuthStore();

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return <></>;
};

export default AuthListener;
