import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = ({ permissions }) => {
  const { auth } = useAuth();
  const location = useLocation();

  const path = auth?.permissions?.map((permission) => permission.name);
  // console.log(`path: ${path}`);
  // console.log(`permissions: ${permissions}`);

  return path?.find((permission) => permissions?.includes(permission)) ? (
    <Outlet />
  ) : auth?.username ? (
    <Navigate to='/unauthorized' state={{ from: location }} replace />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

export default RequireAuth;
