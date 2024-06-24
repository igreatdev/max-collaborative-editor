import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { isEmpty } from 'lodash';
import { getSessionWithKey } from './store/cookies';
import { removeWithRedirect } from './auth';
// import { removeWithRedirect } from './actions/auth';

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5001/';

export const settings = {
  baseURL: baseUrl,
};

const instance = axios.create(settings);

export const bearer = `Bearer ${getSessionWithKey('token')}`; // TODO: Remove this line
const token = getSessionWithKey('token');

if (token != null && !isEmpty(token)) {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
}

const onResponseSuccess = (response: any) => {
  return Promise.resolve(response);
};

// const checked = false;
/**
 * https://stackoverflow.com/questions/75082367/how-to-refresh-token-in-axios
 * @param error
 */
const onResponseFail = async (error: AxiosError) => {
  // const originalRequest = error.config;

  if (
    (error?.response?.status === 401 || error?.response?.status === 403) &&
    !window.location.pathname.startsWith('/auth')
  ) {
    let referer;
    if (error.response.status === 401) {
      referer = window.location.pathname + window.location.search;
    }
    await removeWithRedirect(referer);
  }

  return Promise.reject(error.response?.data);
};

const getUrl = (url: string): string => `${url}`;

instance.interceptors.response.use(onResponseSuccess, onResponseFail);

const api = {
  setToken(token: string) {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  clearToken() {
    instance.defaults.headers.common.Authorization = ``;
  },
  async getUrl(url: string, request: any) {
    return instance.get(url, request);
  },
  async get(url: string, request?: AxiosRequestConfig) {
    return instance.get(getUrl(url), request);
  },
  async post(url: string, data?: any, request?: AxiosRequestConfig) {
    return instance.post(getUrl(url), data, request);
  },
  async put(url: string, request: any) {
    return instance.put(getUrl(url), request);
  },
  async patch(url: string, request: any) {
    return instance.patch(getUrl(url), request);
  },
  async delete(url: string, request: any) {
    return instance.delete(getUrl(url), request);
  },
};

export default api;
