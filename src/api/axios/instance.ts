import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://api.quqee.tech/',
})

export const setupTokenInterceptor = (token: string | null) => {
    instance.interceptors.request.use(
        config => {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config;
        }
    )
}