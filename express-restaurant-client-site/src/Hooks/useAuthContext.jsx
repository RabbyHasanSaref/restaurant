import { useContext } from "react";
import { authContext } from "../Providers/AuthProvider";

const useAuthContext = () => {
    const auth = useContext(authContext);
    return auth;
};

export default useAuthContext;