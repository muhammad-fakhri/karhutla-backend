import React, { createContext, useState, useContext, useEffect } from 'react'
import Router from 'next/router'
import CookieService from '../services/cookies.service'
import { API } from '../api'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function loadUserFromCookies() {
			const token = CookieService.getToken()
			if (token) {
				const user = CookieService.getUser()
				if (user) setUser(JSON.parse(user))
			}
			setLoading(false)
		}
		loadUserFromCookies()
	}, [])

	const login = async (username, password) => {
		// Login user
		try {
			const response = await API.post('/auth/login', {
				username,
				password
			})
			if (response.status !== 200) throw new Error(response.message)

			const user = {
				id: parseInt(response.data.user.id_user, 10),
				name: response.data.user.nama,
				email: response.data.user.email,
				registrationNumber: response.data.detail.no_registrasi,
				phoneNumber: response.data.detail.no_telepon,
				instantion: response.data.detail.instansi,
				photo: response.data.detail.foto,
				roleLevel:
					// If user has role then store the role level
					// Otherwise assign 100 as role level
					// 100 is big enough to be mark as not have any role
					response.data.detail.roles.length > 0
						? parseInt(response.data.detail.roles[0].level, 10)
						: 100
			}

			const token = response.data.token ? response.data.token : null
			if (token) {
				// TODO: remove pre-download auth when auth system in DB V2 is completed
				// Login to simadu/app, for report old pre-download auth
				// const responseAPIAuth = await AuthAPI.post('/login', {
				// 	email: 'balai',
				// 	password: '123'
				// })
				// if (responseAPIAuth.data.token) {
				// 	CookieService.setTokenV1(responseAPIAuth.data.token)
				// }

				CookieService.setToken(token)
				CookieService.setUser(user)
				setUser(user)
				window.location.pathname = '/patroli'
				return true
			}
			return null
		} catch (error) {
			return { success: false, message: error.message }
		}
	}

	const logout = () => {
		CookieService.removeToken()
		// CookieService.removeTokenV1()
		CookieService.removeUser()
		setUser(null)
		window.location.pathname = '/login'
	}

	return (
		<AuthContext.Provider
			value={{ isAuthenticated: !!user, user, login, loading, logout }}
		>
			{children}
		</AuthContext.Provider>
	)
}

export default function useAuth() {
	const context = useContext(AuthContext)

	return context
}

export function ProtectRoute(Component, isAuthRoute = false) {
	return () => {
		const { isAuthenticated, loading } = useAuth()
		useEffect(() => {
			if (!isAuthenticated && !loading) Router.push('/login')
			if (isAuthRoute && isAuthenticated) Router.push('/patroli')
		}, [loading, isAuthenticated])

		return <Component {...arguments} />
	}
}
