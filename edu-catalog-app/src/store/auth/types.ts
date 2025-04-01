import { User } from '@/interface/user';

export type AuthState = {
  userInfo?: User | null;
  loadingUserInfo: boolean;
  error?: Error | null;
};

export type AuthAction = {
  setUserInfo: (userInfo: AuthState['userInfo']) => void;
  fetchUserInfo: () => void;
  loggoutUser: () => void;
};
