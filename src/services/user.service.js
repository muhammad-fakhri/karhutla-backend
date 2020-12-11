import { API } from '../api'
import UserValidator from '../validators/user.validator'

class UserService {
	static async getAllUsers() {
		const r = await API.get('/user/list')
		if (r.status === 200) {
			const users = []
			r.data.forEach((user) => {
				users.push({
					id: user.id,
					registrationNumber: user.no_registrasi,
					name: user.nama,
					email: user.email,
					phone: user.no_telepon
				})
			})
			return users
		}
		return []
	}

	static async getUserDetail(userId) {
		const r = await API.get(`/user/single/${userId}`)
		if (r.status === 200) {
			const user = {}
			user.id = r.data.id
			user.registrationNumber = r.data.no_registrasi
			user.name = r.data.nama
			user.email = r.data.email
			user.phone = r.data.no_telepon
			return { success: true, user }
		}
		return { success: false, message: r.message }
	}

	static async addUser(data) {
		const validate = UserValidator.createUser(data)
		if (!validate.pass) return { success: false, message: validate.message }

		const formData = new FormData()
		formData.append('no_registrasi', data.registrationNumber)
		formData.append('nama', data.name)
		formData.append('email', data.email)
		formData.append('password', data.password)
		formData.append('no_telepon', data.phone)
		formData.append('instansi', '-')
		formData.append('aktif', true)

		const r = await API.post('/user/add', formData)

		if (r.status === 200) {
			return { success: true }
		}
		return { success: false, message: [r.message] }
	}

	static async updateUser(data) {
		const validate = UserValidator.updateUser(data)
		if (!validate.pass) return { success: false, message: validate.message }

		const formData = new FormData()
		formData.append('id', data.id)
		formData.append('nama', data.name)
		formData.append('no_telepon', data.phone)
		if (data.password) formData.append('password', data.password)
		if (data.oldEmail !== data.email) formData.append('email', data.email)
		if (data.oldRegistrationNumber !== data.registrationNumber)
			formData.append('no_registrasi', data.registrationNumber)

		const r = await API.post('/user/save', formData)

		if (r.status === 200) {
			return { success: true, message: 'Ubah data pengguna berhasil' }
		}
		return { success: false, message: [r.message] }
	}

	static async deleteUser(data) {
		const validate = UserValidator.deleteUser(data)
		if (!validate.pass) return { success: false, message: validate.message }

		const r = await API.delete(`/user/remove/${data.id}`)
		if (r.status === 200) {
			return { success: true }
		}
		return { success: false, message: r.message }
	}

	static async getNonPatroliUsers() {
		const r = await API.get('/non_patroli/list')
		if (r.status === 200) {
			const daopsUsers = []
			const balaiUsers = []
			r.data.forEach((userAccess) => {
				if (userAccess.r_role_id === 8 || userAccess.r_role_id === 9) {
					daopsUsers.push({
						id: userAccess.m_user.id,
						accessId: userAccess.id,
						role: userAccess.r_role_id,
						institution: userAccess.m_user.instansi,
						nip: userAccess.m_user.no_registrasi,
						name: userAccess.m_user.nama,
						email: userAccess.m_user.email,
						organization: ''
					})
				} else {
					balaiUsers.push({
						id: userAccess.m_user.id,
						accessId: userAccess.id,
						role: userAccess.r_role_id,
						institution: userAccess.m_user.instansi,
						nip: userAccess.m_user.no_registrasi,
						name: userAccess.m_user.nama,
						email: userAccess.m_user.email,
						organization: ''
					})
				}
			})
			return { daopsUsers, balaiUsers }
		}
		return []
	}

	static async getPatroliNonLoginUsers() {
		const r = await API.get('/non_login/list')
		if (r.status === 200) {
			const users = []
			r.data.forEach((user) => {
				users.push({
					id: user.id,
					name: user.nama,
					role: user.r_role_id
				})
			})
			return users
		}
		return []
	}

	static async addPatroliNonLoginUser(data) {
		const validate = UserValidator.createPatroliNonLogin(data)
		if (!validate.pass) return { success: false, message: validate.message }

		const formData = new FormData()
		formData.append('nama', data.name)
		formData.append('r_role_id', data.role)

		const r = await API.post('/non_login/add', formData)

		if (r.status === 200) {
			return { success: true }
		}
		return { success: false, message: [r.message] }
	}

	static async updatePatroliNonLoginUser(data) {
		const validate = UserValidator.updatePatroliNonLogin(data)
		if (!validate.pass) return { success: false, message: validate.message }

		const formData = new FormData()
		formData.append('id', data.id)
		formData.append('nama', data.name)
		formData.append('r_role_id', data.role)

		const r = await API.post('/non_login/save', formData)

		if (r.status === 200) {
			return { success: true }
		}
		return { success: false, message: [r.message] }
	}

	static async deletePatroliNonLoginUser(data) {
		const validate = UserValidator.deletePatroliNonLogin(data)
		if (!validate.pass) return { success: false, message: validate.message }

		const r = await API.delete(`/non_login/remove/${data.id}`)

		if (r.status === 200) {
			return { success: true }
		}
		return { success: false, message: [r.message] }
	}

	static async getNonPatroliRoles() {
		const r = await API.get('/role/list')
		if (r.status === 200) {
			const data = []
			r.data.forEach((role) => {
				if (role.id <= 9) {
					data.push({
						id: role.id,
						name: role.nama,
						level: role.level,
						active: role.aktif
					})
				}
			})
			return data
		}
		return []
	}

	static async getPatroliNonLoginRoles() {
		const r = await API.get('/role/list')
		if (r.status === 200) {
			const data = []
			r.data.forEach((role) => {
				if (role.id > 11) {
					data.push({
						id: role.id,
						name: role.nama,
						level: role.level,
						active: role.aktif
					})
				}
			})
			return data
		}
		return []
	}

	static async addNonPatroliUser(data) {
		const validate = UserValidator.createNonPatroli(data)
		if (!validate.pass) return { success: false, message: validate.message }

		// TODO: Add organization detail
		const formData = new FormData()
		formData.append('m_user_id', data.id)
		formData.append('r_role_id', data.role)

		const r = await API.post('/non_patroli/add', formData)

		if (r.status === 200) {
			return { success: true }
		}
		return { success: false, message: [r.message] }
	}

	static async updateNonPatroliUser(data) {
		const validate = UserValidator.updateNonPatroli(data)
		if (!validate.pass) return { success: false, message: validate.message }

		const formData = new FormData()
		formData.append('id', data.accessId)
		formData.append('r_role_id', data.role)

		const r = await API.post('non_patroli/save', formData)
		// TODO: update daops/balai organization in user access
		if (r.status === 200) {
			return { success: true }
		}
		return { success: false, message: [r.message] }
	}

	static async deleteNonPatroliUser(data) {
		const validate = UserValidator.deleteNonPatroli(data)
		if (!validate.pass) return { success: false, message: validate.message }
		const r = await API.delete(`/non_patroli/remove/${data.accessId}`)
		if (r.status === 200) {
			return { success: true }
		}
		return { success: false, message: [r.message] }
	}
}
export default UserService
