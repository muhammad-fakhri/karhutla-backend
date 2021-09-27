import { getTokenCookie } from '@service'
import axios, {
	AxiosError,
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse
} from 'axios'

const baseAPIv1 = process.env.NEXT_PUBLIC_API_V1
const baseAPIv2 = process.env.NEXT_PUBLIC_API_V2

export const simaduApiUrl = `${baseAPIv1}/simadu`
export const authApiUrl = `${baseAPIv1}/auth`
export const hotspotApiUrl = `${baseAPIv1}/hotspot`
export const apiV2URL = `https://karhutla.apps.cs.ipb.ac.id/api_dev`

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
	baseURL: baseAPIv2 || '',
	headers: { Accept: 'application/json' }
})

export const SimaduAPI: AxiosInstance = axios.create({
	baseURL: simaduApiUrl,
	headers: { Accept: 'application/json' }
})

export const apiV2: AxiosInstance = axios.create({
	baseURL: apiV2URL,
	headers: { Accept: 'application/json' }
})

export const AuthAPI: AxiosInstance = axios.create({
	baseURL: authApiUrl,
	headers: { Accept: 'application/json' }
})

export const HotspotAPI: AxiosInstance = axios.create({
	baseURL: hotspotApiUrl,
	headers: { Accept: 'application/json' }
})

API.interceptors.request.use(handleRequestSend, handleRequestError)
API.interceptors.response.use(handleResponseReceive, handleResponseError)

SimaduAPI.interceptors.request.use(handleRequestSend, handleRequestError)
SimaduAPI.interceptors.response.use(handleResponseReceive, handleResponseError)

AuthAPI.interceptors.request.use(handleRequestSend, handleRequestError)
AuthAPI.interceptors.response.use(handleResponseReceive, handleResponseError)

HotspotAPI.interceptors.request.use(handleRequestSend, handleRequestError)
HotspotAPI.interceptors.response.use(handleResponseReceive, handleResponseError)

apiV2.interceptors.request.use(handleRequestSend, handleRequestError)
apiV2.interceptors.response.use(handleResponseReceive, handleResponseError)
