import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const RequiredAuth = () => { 
  const { auth } = useAuth();
  console.log(auth.uid);
  const location = useLocation();

  return (
    auth?.uid
    ? <Outlet />
    : <Navigate to="/login" state={{ from: location }} replace />
  )
}; 

export default RequiredAuth;
