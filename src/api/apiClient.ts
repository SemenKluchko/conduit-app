import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { APIError } from "./types/response";
import { TOKEN_KEY } from "api/constants";


export const ApiClient = axios.create({
    baseURL: process.env.REACT_APP_API_GATEWAY as string,
});

export const updateToken = async (config: InternalAxiosRequestConfig) => {
    const jwtToken = Cookies.get(TOKEN_KEY);

    if (jwtToken) {
        config.headers.Authorization  = `Token ${jwtToken}`;
    }

    return config;
};

ApiClient.interceptors.request.use(updateToken);

ApiClient.interceptors.response.use(
    (response) => response,
    (error): Promise<AxiosError<APIError>> => {
        const { status } = error.response;

        if (status === 401) {
            Cookies.remove(TOKEN_KEY);
            window.location.reload();
        }

        return Promise.reject(error)
    }
);

