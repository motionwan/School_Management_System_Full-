import axios from 'axios';
import { baseUrl } from '../baseUrl';
import useAuth from './useAuth';

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth();
    try {
      await axios.get(`${baseUrl}/logout`, {
        withCredentials: true,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return logout;
};
export default useLogout;
