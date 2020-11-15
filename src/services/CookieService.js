import Cookies from 'js-cookie'
// import { parseJwt } from "../utils/formatter";
const KEY_TOKEN = '_z2lj4lY7Wn_hIz_'

export default class CookieService {
	static getToken() {
		return Cookies.get(KEY_TOKEN)
	}

	static setToken(token = '') {
		Cookies.set(KEY_TOKEN, token, { expires: 1 })
	}

	static removeToken() {
		Cookies.remove(KEY_TOKEN)
	}

	// static checkToken() {
	// 	const token = Cookies.get(KEY_TOKEN);
	// 	return !!token;
	// }

	// static getUserFromToken() {
	// 	const token = Cookies.get(KEY_TOKEN);
	// 	return parseJwt(token);
	// }
}
