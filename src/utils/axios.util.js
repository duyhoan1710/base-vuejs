import Axios from 'axios';
import {
  setToken,
  getRefreshToken,
  setRefreshToken,
  getToken,
} from './storage.util';
import configs from '@/configs';
import { LOGIN } from '@/constants/pageRouter';
import { redirectRouter } from '@/helper';

const baseURL = configs.API_DOMAIN;

const logout = () => {
  setToken('');
  setRefreshToken('');
  redirectRouter({ path: LOGIN });
};

const axios = Axios.create({
  baseURL,
  timeout: 10000,
});

axios.interceptors.request.use(
  async function (config) {
    const token = getToken();
    config.headers['authorization'] = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalConfig = error.config;

    if (error.response.status === 401) {
      if (window.isCallRefresh) return;

      window.isCallRefresh = true;
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        logout();
        window.isCallRefresh = false;

        return Promise.reject(error);
      }

      return Axios.get(`${baseURL}/api/auth/refresh-token`, {
        params: {
          refreshToken,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            const token = res.data?.data?.accessToken;
            setToken(token);
            originalConfig.headers.authorization = `Bearer ${token}`;
            window.isCallRefresh = false;
            return Axios(originalConfig);
          } else {
            window.isCallRefresh = false;
            logout();
            return Promise.reject(error);
          }
        })
        .catch(() => {
          logout();
          window.isCallRefresh = false;
          return Promise.reject(error);
        });
    } else if (error.response.data.errorCode === 'E_101') {
      logout();
    }
    return Promise.reject(error);
  }
);

export { axios };
