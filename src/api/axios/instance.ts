import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://api.quqee.tech/',
    headers: {
        'Content-Type': 'application/json',
    },
})

export const setupTokenInterceptor = () => {
    instance.interceptors.request.use(
        config => {
            config.headers.Authorization = `Bearer ${localStorage.getItem('ROCP_token')?.slice(1,length-1)}`
            return config;
        }
    )
}