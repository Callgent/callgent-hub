import axios, { AxiosResponse } from 'axios';
import { useMessageStore } from '@/store/useMessageStore';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API || 'http://localhost:3000',
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => { return config },
    (error) => { return error }
);

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    (error) => {
        const { setMessage } = useMessageStore.getState();
        const errorMessage =
            error.response?.data?.message || error.message || 'Unknown error, please try again later！';
        setMessage(errorMessage, 'error');
        return Promise.reject(new Error(errorMessage));
    }
);

export default axiosInstance;
