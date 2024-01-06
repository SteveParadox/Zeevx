import { useContext } from "react";
import { AuthProvider  } from '../Auth/Auth.js';

const useAuth = () => {
    return useContext(AuthProvider );

}

export default useAuth;