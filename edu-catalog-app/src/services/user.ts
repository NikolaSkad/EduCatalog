import {
  AllUsersResponse,
  EditUserPayloadWithOneRequired,
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  RegisterUserResponse,
  ResetPasswordPayload,
  UpdateUserInfoPayload,
  UpdateUserPasswordPayload,
  UserPayloadLogin,
  UserPayloadRegister,
  UserResponse,
} from '@/interface/user';
import config from '@/config/config.json';
import { storeUserInSessionStorage } from './sessionStorage';
import { storeJwtInLocalStorage } from './localstorage';
import { _fetch } from './fetch';

// AUTH - 7

export const fetchUser = async (): Promise<UserResponse['data']> => {
  const FETCH_USER_URL = `${config.API_URL}/auth/me`;
  const { data: user } = await _fetch<UserResponse>(FETCH_USER_URL, { isAuthed: true });
  storeUserInSessionStorage(user);
  return user;
};

export const registerUser = async (payload: UserPayloadRegister): Promise<RegisterUserResponse['token']> => {
  const body = JSON.stringify(payload);

  const REGISTER_USER_URL = `${config.API_URL}/auth/register`;
  const { token } = await _fetch<RegisterUserResponse>(REGISTER_USER_URL, { method: 'POST', body });
  storeJwtInLocalStorage(token);
  return token;
};

export const loginUser = async (payload: UserPayloadLogin): Promise<RegisterUserResponse['token']> => {
  const body = JSON.stringify(payload);

  const LOGIN_USER_URL = `${config.API_URL}/auth/login`;
  const { token } = await _fetch<RegisterUserResponse>(LOGIN_USER_URL, { method: 'POST', body });
  storeJwtInLocalStorage(token);
  return token;
};

export const forgotPassword = async (payload: ForgotPasswordPayload): Promise<ForgotPasswordResponse['data']> => {
  const body = JSON.stringify(payload);

  const FORGOT_PASSWORD_URL = `${config.API_URL}/auth/forgotpassword`;
  const { data: successMessage } = await _fetch<ForgotPasswordResponse>(FORGOT_PASSWORD_URL, {
    method: 'POST',
    body: body,
  });
  return successMessage;
};

export const resetPassword = async ({
  resetToken,
  payload,
}: {
  resetToken: string;
  payload: ResetPasswordPayload;
}): Promise<RegisterUserResponse['token']> => {
  const body = JSON.stringify(payload);

  const RESET_PASSWORD_URL = `${config.API_URL}/auth/resetpassword/${resetToken}`;
  const { token } = await _fetch<RegisterUserResponse>(RESET_PASSWORD_URL, {
    method: 'PUT',
    body: body,
  });
  return token;
};

export const updateUserInfo = async (payload: UpdateUserInfoPayload): Promise<UserResponse['data']> => {
  const body = JSON.stringify(payload);

  const UPDATE_DETAILS_URL = `${config.API_URL}/auth/updatedetails`;
  const { data: user } = await _fetch<UserResponse>(UPDATE_DETAILS_URL, {
    method: 'PUT',
    isAuthed: true,
    body: body,
  });
  return user;
};

export const updateUserPassword = async (
  payload: UpdateUserPasswordPayload,
): Promise<RegisterUserResponse['token']> => {
  const body = JSON.stringify(payload);

  const UPDATE_PASSWORD_URL = `${config.API_URL}/auth/updatepassword`;
  const { token } = await _fetch<RegisterUserResponse>(UPDATE_PASSWORD_URL, {
    method: 'PUT',
    isAuthed: true,
    body: body,
  });
  return token;
};

// USER: ADMIN - 4

export const getAllUsers = async (): Promise<AllUsersResponse['data']> => {
  const FETCH_ALL_USERS_URL = `${config.API_URL}/users`;
  const { data: user } = await _fetch<AllUsersResponse>(FETCH_ALL_USERS_URL, { isAuthed: true });
  return user;
};

export const createUser = async (payload: UserPayloadRegister): Promise<UserResponse['data']> => {
  const body = JSON.stringify(payload);

  const CREATE_USER_URL = `${config.API_URL}/users`;
  const { data: user } = await _fetch<UserResponse>(CREATE_USER_URL, { isAuthed: true, method: 'POST', body: body });
  return user;
};

export const updateUser = async (id: string, payload: UserPayloadRegister): Promise<UserResponse['data']> => {
  const body = JSON.stringify(payload);

  const EDIT_USER_URL = `${config.API_URL}/users/${id}`;
  const { data: user } = await _fetch<UserResponse>(EDIT_USER_URL, { isAuthed: true, method: 'PUT', body: body });
  return user;
};

export const deleteUser = async (id: string): Promise<UserResponse['data']> => {
  const DELETE_USER_URL = `${config.API_URL}/users/${id}`;
  const { data: user } = await _fetch<UserResponse>(DELETE_USER_URL, { isAuthed: true, method: 'DELETE' });
  return user;
};
