import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { removeFromSessionstorage, retriveFromSessionStorage, USER_SS_KEY } from '@/services/sessionStorage';
import { fetchUser } from '@/services/user';
import { AuthAction, AuthState } from './types';
import { JWT_LS_KEY, removeFromLocalstorage, retriveFromLocalStorage } from '@/services/localstorage';

const storedUser: AuthState['userInfo'] = retriveFromSessionStorage(USER_SS_KEY) || null;

export const useAuthStore = create<AuthState & AuthAction>()(
  devtools((set) => ({
    userInfo: null,
    loadingUserInfo: false,
    error: null,
    loggoutUser: () => {
      set({ userInfo: null });
      removeFromLocalstorage(JWT_LS_KEY);
      removeFromSessionstorage(USER_SS_KEY);
    },
    setUserInfo: (userInfo) => set({ userInfo }),
    fetchUserInfo: async () => {
      try {
        set({ loadingUserInfo: true });
        const userInfo = await fetchUser();
        set({ userInfo: userInfo, loadingUserInfo: false });
      } catch (err) {
        set({ error: err as Error, loadingUserInfo: false });
      }
    },
  })),
);
