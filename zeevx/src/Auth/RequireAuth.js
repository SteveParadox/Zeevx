import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const RequiredAuth = () => { 
    console.log(useAuth);
  const { auth } = useAuth();
  const location = useLocation();

  return (
    auth?.user
    ? <Outlet />
    : <Navigate to="/login" state={{ from: location }} replace />
  )
}; 

export default RequiredAuth;
