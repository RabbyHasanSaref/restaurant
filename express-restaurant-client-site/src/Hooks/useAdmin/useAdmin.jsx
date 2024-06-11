import { useQuery } from "@tanstack/react-query";
import useAuthContext from "../useAuthContext";
import useAxios from "../useAxios";

const useAdmin = () => {
    const { user, loader } = useAuthContext();
    const axiosSecuer = useAxios();
    const { data: isAdmin, isPending: isAdminLoading} = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loader,
        queryFn: async () => {
            const res = await axiosSecuer.get(`/users/admin/${user.email}`);
            console.log(res.data);
            return res.data?.admin;
        }
    })
    return [isAdmin, isAdminLoading]
};

export default useAdmin;