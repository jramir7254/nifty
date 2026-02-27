import axios, { type AxiosInstance, type AxiosRequestConfig, } from "axios";
import { logger } from "@/lib/logger";

const BASE_URL = process.env.BASE_URL;
const apiLogger = logger.create('API')




export const client: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL!,
});





client.interceptors.request.use((config) => {
    apiLogger.debug(`<Request>`, {
        method: config.method,
        url: config.url,
        baseUrl: config.baseURL,
        params: config.params,
        body: config.data,
        headers: config.headers
    })
    return config;
});



client.interceptors.response.use(
    (response) => {
        apiLogger.debug(`<Response>`, {
            data: response.data,
            status: response.status,
        })

        return response
    },
    (error) => {
        apiLogger.error('<Raw Error>:', error)
        const err = error.response?.data || {
            success: false,
            message: "Unknown error",
            code: "UNKNOWN",
        }
        apiLogger.error('<Normalized Error>:', err)
        return Promise.reject(err);
    }
);


