import { useLocation, Navigate, Outlet} from "react-router-dom";
import useAuth from "../Hooks/useAuth"

const RequiredAuth = () => {
    const { user } = useAuth();
    const location = useLocation();


    return (
        user?.user
        ? <Outlet />
        : <Navigate to="/login" state={{ from: location}} replace />
    );
}

export default RequiredAuth;