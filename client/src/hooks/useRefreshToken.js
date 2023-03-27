import axios from 'axios';
import useAuth from './useAuth';
import { baseUrl } from '../helpers/baseUrl';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const res = await axios.get(`${baseUrl}/refresh`, {
      withCredentials: true,
    });

    setAuth((prev) => {
      return {
        ...prev,
        accessToken: res.data?.accessToken,
        permissions: res?.data?.role,
        username: res?.data?.username,
        image: res?.data?.image,
        userId: res.data.userId,
        schoolId: res?.data?.schoolId,
        currentTermId: res.data?.currentTermId,
        photoId: res?.data?.photoId,
        zoomApiKey: res?.data?.zoomApiKey,
        zoomApiSecret: res?.data?.zoomApiSecret,
      };
    });
    console.log('refresh token', res?.data?.accessToken);
    console.log('permissions', res?.data?.role);
    console.log('username', res?.data?.username);
    console.log('userId', res?.data?.userId);
    console.log('schoolId', res?.data?.schoolId);
    console.log('currentTermId', res?.data?.currentTermId);
    console.log('role', res?.data?.role);
    console.log('photoId', res?.data?.photoId);
    console.log('zoomApiKey', res?.data?.zoomApiKey);
    console.log('zoomApiSecret', res?.data?.zoomApiSecret);
    return res?.data?.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
// accessToken: accessToken,
// username: staff.username,
// image: staff?.image,
// email: staff.email,
// role: staff?.role?.permissions,
// userId: staff?._id,
