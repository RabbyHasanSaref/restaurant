import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthContext from "./useAuthContext";

const axiosSecuer = axios.create({
    baseURL: 'http://localhost:5000'
})
const useAxios = () => {

    const navigate = useNavigate();
    const { logoutUser } = useAuthContext();

    axiosSecuer.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        // console.log('request stopped by interceptors', token)
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // intercepts 401 and 403 status
    axiosSecuer.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        console.log('status error in the interceptor', status);

        if (status === 401 || status === 403) {
            await logoutUser();
            navigate('/login');
        }
        
        return Promise.reject(error);
    })

    return axiosSecuer;
};

export default useAxios;