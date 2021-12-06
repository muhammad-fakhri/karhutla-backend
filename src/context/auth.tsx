import { API } from '@api'
import {
	APIResponse,
	LoginResponse,
	ServiceResponse,
	UserData
} from '@interface'
import {
	getTokenCookie,
	getUserCookie,
	removeTokenCookie,
	removeUserCookie,
	setTokenCookie,
	setUserCookie
} from '@service'
import { useRouter } from 'next/router'
import {
	ComponentType,
	createContext,
	FC,
	useContext,
	useEffect,
	useState
} from 'react'

const DefaultUser: UserData = {
	id: 0,
	name: '',
	accessId: 0,
	role: 0,
	email: '',
	registrationNumber: '',
	phoneNumber: '',
	organization: '',
	photo: '',
	roleLevel: 100,
	roleName: ''
}

type AuthContextType = {
	isAuthenticated: boolean
	loading: boolean
	user: UserData
	login: (username: string, password: string) => Promise<ServiceResponse>
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
			const token = getTokenCookie()
			if (token) {
				const user = getUserCookie()
				if (user) setUser(JSON.parse(user))
			}
			setLoading(false)
		}
		loadUserFromCookies()
	}, [])

	const login = async (
		username: string,
		password: string
	): Promise<ServiceResponse> => {
		// Login user
		try {
			const {
				status,
				data,
				message
			}: APIResponse<LoginResponse> = await API.post('/auth/login', {
				username,
				password
			})

			const user: UserData = {
				id: parseInt(data.user.id_user, 10),
				accessId: 0,
				role: 0,
				name: data.user.nama,
				email: data.user.email,
				registrationNumber: data.detail.no_registrasi,
				phoneNumber: data.detail.no_telepon,
				organization: data.detail.instansi,
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

				setTokenCookie(token)
				setUserCookie(user)
				setUser(user)
				window.location.pathname = '/patroli'
			}
			return { success: true, message: 'Login success' }
		} catch (error) {
			return { success: false, message: error.message }
		}
	}

	const logout = () => {
		removeTokenCookie()
		// CookieService.removeTokenV1()
		removeUserCookie()
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
	isAuthRoute = false,
	limitedAccessRight = false
): (() => JSX.Element) => {
	return () => {
		const router = useRouter()
		const { isAuthenticated, loading, user } = useAuth()
		useEffect(() => {
			if (
				!isAuthenticated &&
				!loading &&
				router.pathname !== '/forgot_password' &&
				router.pathname !== '/reset_password'
			)
				router.push('/login')
			if (
				isAuthRoute &&
				isAuthenticated &&
				router.pathname !== '/forgot_password' &&
				router.pathname !== '/reset_password'
			)
				router.push('/patroli')
			if (limitedAccessRight && user.email) {
				// Insufficient user access rights
				if (user.roleLevel > 2) {
					alert(
						'Hak akses anda tidak mencukupi untuk mengakses halaman ini'
					)
					router.push('/patroli')
				}
			}
		}, [loading, isAuthenticated, user])

		return <Page />
	}
}
