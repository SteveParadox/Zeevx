import { useContext } from "react";
import { AuthContext } from '../Auth/Auth.js';

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;
