import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    /* persist checks to see if device is trusted */

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, [refresh, auth]);

  useEffect(() => {
    // console.log(`isLoading: ${isLoading}`);
    // console.log(`username: ${auth.username}`);
    // console.log(`permissions: ${auth.role}`);
    // console.log(`username: ${auth.name}`);
    // console.log(`userId: ${auth.userId}`);
    // console.log(`userImage: ${auth.image}`);
  }, [isLoading, auth]);

  return (
    <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>
  );
};

export default PersistLogin;
