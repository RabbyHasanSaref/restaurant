// import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useMenu = () => {
    const axiosPublic = useAxiosPublic();

    // const [menu, setMenu] = useState([]);
    // const [loader, setLoader] = useState(true);

    // useEffect(()=>{
    //     fetch('http://localhost:5000/menu')
    //     .then(res => res.json())
    //     .then(data => {
    //         setMenu(data)
    //         setLoader(false)
    //     })
    // },[])

    const { data: menu = [], isPending: loader, refetch } = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const res = await axiosPublic.get('/menu');
            return res.data;
        }
    })

    return [menu, loader, refetch];
    // return [menu, loader];
};

export default useMenu;