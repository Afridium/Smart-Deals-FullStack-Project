import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";

const AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000'
})

const useAxiosSecure = () => {
    const {logOut} = useContext(AuthContext);
    const navigate = useNavigate();
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
            config.headers.authorization = `Bearer ${user.accessToken}`;
            return config;
        })

        //response interceptor
        AxiosInstance.interceptors.response.use(res=>{
            
            return res;
        }, err=>{
            const status = err.status;
            if(status === 401 || status === 403){
                console.log("log out user for bad request");
                logOut()
                .then(() => {
                   navigate('/login'); 
                })
                
            }
        })

        return () => {
            AxiosInstance.interceptors.request.eject(requestInterceptor);
        }
    }, [user])
     return AxiosInstance;
}

export default useAxiosSecure;