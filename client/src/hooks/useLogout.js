import axios from 'axios';
import { VscRunAbove } from 'react-icons/vsc';
import { where } from '../../../server/src/models/Token/Token.mongo';
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

// const logout = useLogout();
//  function that will use logout
// const Signout = async() => {
//   await logout();
//   navigate('/to wherever you want');
