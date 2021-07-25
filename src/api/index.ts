import { getTokenCookie } from '@service'
import axios, {
	AxiosError,
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse
} from 'axios'

const serverIP = process.env.NEXT_PUBLIC_API_SERVER_IP
const baseAPIv1 = process.env.NEXT_PUBLIC_API_V1

export const apiUrl = `${serverIP}/api_dev`
export const simaduApiUrl = `${baseAPIv1}/api/simadu`
export const simadu2Url = `${serverIP}/simadu2`
export const siavipalaUrl = `${serverIP}/siavipala`
export const authApiUrl = `${baseAPIv1}/api/auth`

const handleRequestSend = (config: AxiosRequestConfig) => {
	// Set Auth Token
	const token = getTokenCookie()
	const modifiedconfig = config
	if (token) {
		modifiedconfig.headers.Authorization = `Bearer ${token}`
	}
	return modifiedconfig
}

const handleRequestError = (error: AxiosError) => {
	return Promise.reject(error)
}

const handleResponseReceive = (response: AxiosResponse) => {
	return response.data
}

const handleResponseError = (error: AxiosError) => {
	return error.response ? error.response.data : error
}

export const API: AxiosInstance = axios.create({
	baseURL: apiUrl,
	headers: { Accept: 'application/json' }
})

export const SimaduAPI: AxiosInstance = axios.create({
	baseURL: simaduApiUrl,
	headers: { Accept: 'application/json' }
})

export const SiavipalaAPI: AxiosInstance = axios.create({
	baseURL: siavipalaUrl,
	headers: { Accept: 'application/json' }
})

export const AuthAPI: AxiosInstance = axios.create({
	baseURL: authApiUrl,
	headers: { Accept: 'application/json' }
})

API.interceptors.request.use(handleRequestSend, handleRequestError)
API.interceptors.response.use(handleResponseReceive, handleResponseError)

SimaduAPI.interceptors.request.use(handleRequestSend, handleRequestError)
SimaduAPI.interceptors.response.use(handleResponseReceive, handleResponseError)

SiavipalaAPI.interceptors.request.use(handleRequestSend, handleRequestError)
SiavipalaAPI.interceptors.response.use(
	handleResponseReceive,
	handleResponseError
)

AuthAPI.interceptors.request.use(handleRequestSend, handleRequestError)
AuthAPI.interceptors.response.use(handleResponseReceive, handleResponseError)
