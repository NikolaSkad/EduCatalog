import { AtLeastOne } from './bootcamp';
import { WithError, WithSuccess } from './fetch';

export type role = 'user' | 'publisher' | 'admin';

export interface User {
  role: role;
  isEmailConfirmed: boolean;
  twoFactorEnable: boolean;
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  __v: number;
}

export interface UserPayloadRegister {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface UserPayloadLogin {
  email: string;
  password: string;
}

export interface UpdateUserInfoPayload {
  email: string;
  name: string;
}

export interface UpdateUserPasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ForgotPasswordResponse extends WithError, WithSuccess {
  data: string;
}

export interface ResetPasswordPayload {
  password: string;
}

export interface UserResponse extends WithSuccess, WithError {
  data: User;
}

export interface AllUsersResponse extends WithSuccess, WithError {
  data: User[];
}

export interface RegisterUserResponse extends WithSuccess, WithError {
  token: string;
}

export type EditUserPayloadWithOneRequired = AtLeastOne<UserPayloadRegister>;

export interface EditPasswordMutate {
  resetToken: string;
  payload: ResetPasswordPayload;
}
