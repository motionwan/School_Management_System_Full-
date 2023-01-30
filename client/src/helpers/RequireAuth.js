import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = ({ permissions }) => {
  const { auth } = useAuth();
  const location = useLocation();

  const paths = [];
  auth?.permissions?.map((perm) => paths.push(perm.path));

  return paths?.find((permission) => permissions?.includes(permission)) ? (
    <Outlet />
  ) : auth?.username ? (
    <Navigate to='/unauthorized' state={{ from: location }} replace />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

export default RequireAuth;
