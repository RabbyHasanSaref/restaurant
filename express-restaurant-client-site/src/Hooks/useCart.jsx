import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import useAuthContext from "./useAuthContext";

const useCart = () => {
    const axiosSecuer = useAxios();
    const {user} = useAuthContext();
    const {data: cart = [], refetch, } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            const res = await axiosSecuer.get(`/carts?email=${user.email}`)
            return res.data
        }
    })
    return [cart, refetch];
};

export default useCart;