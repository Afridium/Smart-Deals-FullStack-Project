import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000'
})

const useAxiosSecure = () => {
    const {user} = useContext(AuthContext);
    // AxiosInstance.interceptors.request.use((config) => {
    //     console.log(config);
    //     config.headers.authorization = `Bearer ${user.accessToken}`;
    //     return config;
    // });
    // return AxiosInstance;
    useEffect(()=>{
        //request interceptor
        const requestInterceptor = AxiosInstance.interceptors.request.use((config)=>{
            console.log(config);
            config.headers.authorization = `Bearer ${user.accessToken}`;
        })

        //response interceptor
        

        return () => {
            AxiosInstance.interceptors.request.eject(requestInterceptor);
        }
    }, [user])
}

export default useAxiosSecure;