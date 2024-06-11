import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin/useAdmin";
import useAuthContext from "../Hooks/useAuthContext";


const AdminRoute = ({children}) => {
    const [user, loader] = useAuthContext(); 
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if(loader || isAdminLoading){
        return <progress className="progress w-56"></progress>
    }

    if (user && isAdmin) {
        return children;
    }
    return <Navigate to="/" state={{from: location}} replace></Navigate>
};

export default AdminRoute;