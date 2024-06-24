import { configureAuth } from 'react-query-auth';
import { isEmpty } from 'lodash';
import Router from 'next/router';

import {
  clearSession,
  getSession,
  getSessionWithKey,
  removeSessionWithKey,
  setSession,
  setSessionWithValue,
} from './store/cookies';
import { RegisterResponse, UserLogin, UserLoginType, UserProfile } from './types/auth';
import api from './api';
import { LOGIN_URL, REGISTER_URL } from './constants';
import { queryClientContext } from '../../pages/_app';

const { push: redirect } = Router;

export const removeWithRedirect = async (referer?: string) => {
  clearSession();
  removeSessionWithKey('token');
  removeSessionWithKey('expiresIn');
  api.clearToken();
  const queryClient = queryClientContext;

  queryClient.removeQueries();
  await redirect(referer && referer.length ? `/auth/login?r=${referer}` : '/auth/login');
};

const loginUser = ({ data }: { data: UserLoginType }) => {
  setSession(data);
  setSessionWithValue('5', 'expiresIn');
  api.setToken(data.token);
  setSessionWithValue(data.token, 'token');
};

const userFn = () => {
  const user: UserProfile = getSession();

  if (isEmpty(user)) {
    return null;
  } else {
    const token = getSessionWithKey('token');
    // TODO: validate token

    return { ...user, token };
  }
};

const loginFn = async (credentials: UserLogin) => {
  const { data: res }: { data: RegisterResponse } = await api.post(LOGIN_URL, credentials);

  loginUser(res);

  return res.data;
};

const registerFn = async (credentials: UserLogin) => {
  const { data: res }: { data: RegisterResponse } = await api.post(REGISTER_URL, credentials);
  // loginUser(res);
  return res.data;
};

const logoutFn = async () => {
  await removeWithRedirect();
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
export const { useUser, useLogin, useRegister, useLogout, AuthLoader } = configureAuth({
  userFn,
  loginFn,
  registerFn,
  logoutFn,
  userKey: ['user'],
});
