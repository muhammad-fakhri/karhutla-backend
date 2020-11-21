import axios from 'axios'
import CookieService from '../services/cookies.service'

const serverIP = 'http://103.129.223.216'

export const apiUrl = `${serverIP}/api_dev`
export const simaduApiUrl = `${serverIP}/api/simadu`
export const simadu2Url = `${serverIP}/simadu2`
export const siavipalaUrl = `${serverIP}/siavipala`
export const authApiUrl = `${serverIP}/api/auth`

const handleRequestSend = (config) => {
	// Set Auth Token
	const token = CookieService.getToken()
	const modifiedconfig = config
	if (token) {
		modifiedconfig.headers.Authorization = `Bearer ${token}`
	}
	return modifiedconfig
}

const handleRequestError = (error) => {
	return Promise.reject(error)
}

const handleResponseReceive = (response) => {
	return response.data
}

const handleResponseError = (error) => {
	return error.response ? error.response.data : error
}

export const API = axios.create({
	baseURL: apiUrl,
	headers: { Accept: 'application/json' }
})

export const SimaduAPI = axios.create({
	baseURL: simaduApiUrl,
	headers: { Accept: 'application/json' }
})

export const SiavipalaAPI = axios.create({
	baseURL: siavipalaUrl,
	headers: { Accept: 'application/json' }
})

export const AuthAPI = axios.create({
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
