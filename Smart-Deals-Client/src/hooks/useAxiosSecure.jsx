import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000'
})

const useAxiosSecure = () => {
    return AxiosInstance;
}

export default useAxiosSecure;