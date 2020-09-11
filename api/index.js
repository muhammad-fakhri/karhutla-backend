import axios from "axios";
import CookieService from "../services/CookieService";

export const BASE_URL = 'http://103.129.223.216/api_dev';
export const simaduApiUrl = 'http://103.129.223.216/api/simadu';
export const simadu2Url = 'http://103.129.223.216/simadu2';
export const siavipalaUrl = 'http://103.129.223.216/siavipala';

const handleRequestSend = (config) => {
    // Set Auth Token
    const token = CookieService.getToken();
    if (!!token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
};

const handleRequestError = (error) => {
    return Promise.reject(error);
};

const handleResponseReceive = (response) => {
    return response.data;
};

const handleResponseError = (error) => {
    return error.response.data;
};

const API = axios.create({
    baseURL: BASE_URL,
    headers: { Accept: "application/json" },
});

API.interceptors.request.use(handleRequestSend, handleRequestError);
API.interceptors.response.use(handleResponseReceive, handleResponseError);

export default API;