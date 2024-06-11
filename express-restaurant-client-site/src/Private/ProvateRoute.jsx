import { useContext } from "react";
import { authContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const ProvateRoute = ({ children }) => {
    const { user, loader } = useContext(authContext)
    const location = useLocation()
    if (loader) {
        return <span className="loading loading-bars loading-xs"></span>
    }
    if (user) {
        return children
    }
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default ProvateRoute;