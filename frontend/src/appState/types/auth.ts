import { ApiResponseType } from './api';

export interface UserLoginType {
  id: string;
  email: number;
  token: string;
}

export interface UserProfile {
  id: string;
  email: number;
  first_name: string;
  last_name: string;
  created_at: string;
  updated_at: string;
  token: string;
}

export interface LoginResponse extends ApiResponseType {
  data: UserLoginType;
}

export interface RegisterResponse extends ApiResponseType {
  data: UserProfile;
}

export interface ProfileResponse extends ApiResponseType {
  data: UserProfile;
}

export interface UserLogin {
  email: string;
  password: string;
  remember?: string;
}

export interface UserRegister {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  confirmPassword: string;
}

export interface ErrorMutateResponse {
  message?: string;
  statusCode?: string;
}
