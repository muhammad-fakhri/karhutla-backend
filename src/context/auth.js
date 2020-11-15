import React, { createContext, useState, useContext, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import CookieService from '../services/cookies.service'
import { AuthAPI } from '../api'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function loadUserFromCookies() {
			const token = CookieService.getToken()
			if (token) {
				console.log(
					'Got a token in the cookies, let\'s see if it is valid'
				)
				// TODO: fetch user data from api
				// const { data: user } = await api.get('users/me')
				const user = {
					name: 'Nama Pengguna',
					email: 'Email Pengguna'
				}
				if (user) setUser(user)
			}
			setLoading(false)
		}
		loadUserFromCookies()
	}, [])

	const login = async (email, password) => {
		// TODO: login user then fetch user data from api
		try {
			const response = await AuthAPI.post('/login', {
				email,
				password
			})
			if (response.status == '200') {
				const user = {
					name: response.data.user.nama,
					email: response.data.user.email
				}
				const token = response.data.token ? response.data.token : null
				if (token) {
					console.log('Got token')
					CookieService.setToken(token)
					setUser(user)
					console.log('Got user', user)
					window.location.pathname = '/dashboard'
				}
			} else throw response.message
		} catch (error) {
			return { success: false, message: error }
		}
	}

	const logout = (email, password) => {
		CookieService.removeToken()
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
		const { user, isAuthenticated, loading } = useAuth()
		const router = useRouter()

		useEffect(() => {
			if (!isAuthenticated && !loading) Router.push('/login')
			if (isAuthRoute && isAuthenticated) Router.push('/dashboard')
		}, [loading, isAuthenticated])

		return <Component {...arguments} />
	}
}
