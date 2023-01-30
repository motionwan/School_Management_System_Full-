import axios from 'axios';
import useAuth from './useAuth';
import { baseUrl } from '../helpers/baseUrl';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const res = await axios.get(`${baseUrl}/users/refresh`, {
      withCredentials: true,
    });

    setAuth((prev) => {
      return {
        ...prev,
        accessToken: res.data?.accessToken,
        roles: res?.data?.roles,
        username: res?.data?.username,
        constituencyId: res?.data?.constituencyId,
        regionId: res?.data?.regionId,
        currentElectionYearId: res?.data?.currentElectionYearId,
        image: res?.data?.image,
        userId: res.data.userId,
      };
    });
    console.log('refresh token', res?.data?.accessToken);
    console.log('roles', res?.data?.roles);
    console.log('username', res?.data?.name);
    console.log('constituencyId', res?.data?.constituencyId);
    console.log('regionId', res?.data?.regionId);
    console.log('userId', res?.data?.userId);
    console.log('currentElectionYear', res?.data?.currentElectionYearId);
    return res?.data?.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
