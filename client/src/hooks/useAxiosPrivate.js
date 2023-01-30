import { axiosPriviate } from '../api/axios';
import { useEffect } from 'react';
import useAuth from './useAuth';
import useRefreshToken from './useRefreshToken';

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const reqIntercept = axiosPriviate.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      async (err) => {
        Promise.reject(err);
      }
    );

    const resIntercept = axiosPriviate.interceptors.response.use(
      (response) => response,
      async (err) => {
        const prevRequest = err?.config;
        if (err?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosPriviate(prevRequest);
        }
        return Promise.reject(err);
      }
    );
    return () => {
      axiosPriviate.interceptors.request.eject(reqIntercept);
      axiosPriviate.interceptors.response.eject(resIntercept);
    };
  }, [refresh, auth]);

  return axiosPriviate;
};
export default useAxiosPrivate;
