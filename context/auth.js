import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
import Cookies from 'js-cookie'

export const getTokenFromRequest = context => {
    const cookieList = {},
        rc = context.req.headers.cookie;

    rc && rc.split(';').forEach(function (cookie) {
        let parts = cookie.split('=');
        cookieList[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return cookieList['token'] ? true : false;
}

export const getToken = () => Cookies.get('token');

export const login = async (email, password) => {
    // const responseJson = await (await fetch('http://103.129.223.216/api/auth/login', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         email,
    //         password,
    //     }),
    // })).json();

    // if (responseJson.data.token) {
    // Cookies.set('token', responseJson.data.token, { expires: 2 });
    Cookies.set('token', 'iab213basdb21ebwqk', { expires: 2 });
    redirectAfterLogin()
    // }
}

export const logout = () => {
    Cookies.remove('token')
    redirectAfterLogout();
}

const redirectAfterLogin = () => {
    Router.push('/dashboard')
}

const redirectAfterLogout = () => {
    Router.push('/')
}

// import React, { createContext, useState, useContext, useEffect } from 'react'




// //api here is an axios instance
// // import api from '../services/Api';


// const AuthContext = createContext({});

// export const AuthProvider = ({ children }) => {

//     const [user, setUser] = useState(null)
//     const [loading, setLoading] = useState(true)

//     useEffect(() => {
//         async function loadUserFromCookies() {
//             const token = Cookies.get('token')
//             if (token) {
//                 console.log("Got a token in the cookies, let's see if it is valid")
//                 // api.defaults.headers.Authorization = `Bearer ${token}`
//                 // const { data: user } = await api.get('users/me')
//                 const user = { name: "Muhammad Fakhri", email: "muhammadfakhri301@gmail.com" }
//                 if (user) setUser(user);
//             } else {
//                 console.log("no token in cookie");
//             }
//             setLoading(false)
//         }
//         loadUserFromCookies()
//     }, [])



//     const setToken = async (token) => {
//         
//         // await updateUser();
//         redirectAfterLogin();
//     }



//     return (
//         <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, loading, logout, setToken }}>
//             {children}
//         </AuthContext.Provider>
//     )
// }



// // export function ProtectRoute(Component) {
// //     return () => {
// //         const { user, isAuthenticated, loading } = useAuth();
// //         // const router = useRouter()

// //         // useEffect(() => {
// //         //     if (!isAuthenticated && !loading) Router.push('/login')
// //         // }, [loading, isAuthenticated])
// //         // return (<Component {...arguments} />)

// //         if (!isAuthenticated && !loading) {
// //             Router.push('/login')
// //         } else {
// //             return (<Component {...arguments} />)
// //         }
// //     }
// // }

// export const useAuth = () => {
//     const context = useContext(AuthContext)

//     return context
// };

