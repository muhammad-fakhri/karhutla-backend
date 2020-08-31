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