import Router from 'next/router'
import {
	ComponentType,
	createContext,
	FC,
	useContext,
	useEffect,
	useState
} from 'react'
import { API, APIResponse } from '../api'
import { UserData } from '../interfaces'
import CookieService from '../services/cookies.service'

const DefaultUser: UserData = {
	id: null,
	name: '',
	email: '',
	registrationNumber: '',
	phoneNumber: '',
	instantion: '',
	photo: '',
	roleLevel: 100,
	roleName: ''
}

type AuthContextType = {
	isAuthenticated: boolean
	loading: boolean
	user: UserData
	login: (username: string, password: string) => Promise<unknown>
	logout: () => void
}

const AuthContext = createContext<AuthContextType>({
	isAuthenticated: false,
	loading: true,
	user: DefaultUser,
	login: async (username: string, password: string) => {
		try {
			if (!username && !password) {
				throw new Error('Login failed')
			}
			return { success: true, message: '' }
		} catch (error) {
			return { success: false, message: error.message }
		}
	},
	logout: () => {
		// This function is purposely left blank
		// because it is only used for
		// the createContext default value
	}
})

export const AuthProvider: FC<{ children: any }> = ({ children }) => {
	const [user, setUser] = useState<UserData>(DefaultUser)
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

	const login = async (username: string, password: string) => {
		// Login user
		try {
			const { status, data, message }: APIResponse = await API.post(
				'/auth/login',
				{
					username,
					password
				}
			)
			if (status !== 200) throw new Error(message)

			const user: UserData = {
				id: parseInt(data.user.id_user, 10),
				name: data.user.nama,
				email: data.user.email,
				registrationNumber: data.detail.no_registrasi,
				phoneNumber: data.detail.no_telepon,
				instantion: data.detail.instansi,
				photo: data.detail.foto,
				roleLevel:
					// If user has role then store the role level
					// Otherwise assign 100 as role level
					// 100 is big enough to be mark as not have any role
					data.detail.roles.length > 0
						? parseInt(data.detail.roles[0].level, 10)
						: 100,
				roleName:
					data.detail.roles.length > 0
						? data.detail.roles[0].nama
						: ''
			}

			const token: string = data.token || ''
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
			}
			return { success: true, message: 'Login success' }
		} catch (error) {
			return { success: false, message: error.message }
		}
	}

	const logout = () => {
		CookieService.removeToken()
		// CookieService.removeTokenV1()
		CookieService.removeUser()
		setUser(DefaultUser)
		window.location.pathname = '/login'
	}

	return (
		<AuthContext.Provider
			value={{ isAuthenticated: !!user.id, user, login, loading, logout }}
		>
			{children}
		</AuthContext.Provider>
	)
}

export default function useAuth(): AuthContextType {
	const context = useContext(AuthContext)

	return context
}

export const ProtectRoute = (
	Page: ComponentType,
	isAuthRoute = false
): (() => JSX.Element) => {
	return () => {
		const { isAuthenticated, loading } = useAuth()
		useEffect(() => {
			if (!isAuthenticated && !loading) Router.push('/login')
			if (isAuthRoute && isAuthenticated) Router.push('/patroli')
		}, [loading, isAuthenticated])

		return <Page />
	}
}
