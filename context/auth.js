import React, { createContext, useState, useContext, useEffect } from 'react'
import Cookies from 'js-cookie'
import Router, { useRouter } from 'next/router'

//api here is an axios instance
// import api from '../services/Api';


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadUserFromCookies() {
            const token = Cookies.get('token')
            if (token) {
                console.log("Got a token in the cookies, let's see if it is valid")
                // api.defaults.headers.Authorization = `Bearer ${token}`
                // const { data: user } = await api.get('users/me')
                const user = {
                    name: 'Muhammad Fakhri',
                    email: 'muhammadfakhri301@gmail.com'
                };
                if (user) setUser(user);
            }
            setLoading(false)
        }
        loadUserFromCookies()
    }, [])

    const login = async (email, password) => {
        // const { data: token } = await api.post('auth/login', { email, password })
        let token = 'asdjbiu1e';
        if (token) {
            console.log("Got token")
            Cookies.set('token', token, { expires: 60 })
            // api.defaults.headers.Authorization = `Bearer ${token.token}`
            // const { data: user } = await api.get('users/me')
            let user = {
                name: 'Muhammad Fakhri',
                email: 'muhammadfakhri301@gmail.com'
            }
            setUser(user)
            console.log("Got user", user)
            window.location.pathname = '/dashboard'
        }
    }

    const logout = (email, password) => {
        Cookies.remove('token')
        setUser(null)
        window.location.pathname = '/login'
    }


    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, loading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    const context = useContext(AuthContext)

    return context
};

export function ProtectRoute(Component) {
    return () => {
        const { user, isAuthenticated, loading } = useAuth();
        const router = useRouter()

        useEffect(() => {
            if (!isAuthenticated && !loading) Router.push('/login')
        }, [loading, isAuthenticated])

        return (<Component {...arguments} />)
    }
}

// TODO: inverse protect route for login page