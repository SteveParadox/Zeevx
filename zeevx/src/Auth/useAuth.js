import { useContext } from "react";
import AuthContext from './Auth.js';

const useAuth = () => {
    return useContext(AuthContext);

}

export default useAuth;