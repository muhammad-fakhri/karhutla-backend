import { API } from '../api'
import {
	AddPatroliNonLoginUserInput,
	AddUserInput,
	APIResponse,
	CreateNonPatroliUser,
	DeleteNonPatroliUser,
	DeletePatroliNonLoginUserInput,
	DeleteUserInput,
	NonLoginUserResponse,
	NonPatroliUserData,
	NonPatroliUserResponse,
	RoleData,
	RoleResponse,
	ServiceResponse,
	UpdatePatroliNonLoginUserInput,
	UpdateUserInput,
	UserData,
	UserDetailResponse
} from '../interfaces'
import {
	createNonPatroliValidator,
	createPatroliNonLoginValidator,
	createUserValidator,
	deleteNonPatroliValidator,
	deletePatroliNonLoginValidator,
	deleteUserValidator,
	updateNonPatroliValidator,
	updatePatroliNonLoginValidator,
	updateUserValidator
} from '../validators'

export default class UserService {
	static async getAllUsers(): Promise<UserData[]> {
		const r: APIResponse<UserDetailResponse[]> = await API.get('/user/list')
		if (r.status === 200) {
			return r.data.map((user) => {
				return {
					id: parseInt(user.id),
					registrationNumber: user.no_registrasi,
					name: user.nama,
					email: user.email,
					phoneNumber: user.no_telepon,
					accessId: 0,
					nip: '',
					organization: '',
					role: 0,
					photo: '',
					roleLevel: 0,
					roleName: ''
				}
			})
		}
		return []
	}

	static async getUserDetail(
		userId: string
	): Promise<ServiceResponse<UserData>> {
		const r: APIResponse<UserDetailResponse> = await API.get(
			`/user/single/${userId}`
		)
		if (r.status === 200) {
			const user: UserData = {
				id: parseInt(r.data.id),
				registrationNumber: r.data.no_registrasi,
				name: r.data.nama,
				email: r.data.email,
				phoneNumber: r.data.no_telepon,
				accessId: 0,
				role: 0,
				organization: r.data.instansi,
				photo: r.data.foto,
				roleLevel:
					r.data.roles.length > 0
						? parseInt(r.data.roles[0].level)
						: 0,
				roleName: r.data.roles.length > 0 ? r.data.roles[0].nama : ''
			}
			return { success: true, message: [], data: user }
		}
		return { success: false, message: [r.message] }
	}

	static async addUser(data: AddUserInput): Promise<ServiceResponse> {
		const validate = createUserValidator(data)
		if (!validate.pass) return { success: false, message: validate.message }

		const formData = new FormData()
		formData.append('no_registrasi', data.registrationNumber)
		formData.append('nama', data.name)
		formData.append('email', data.email)
		formData.append('password', data.password)
		formData.append('no_telepon', data.phoneNumber)
		formData.append('instansi', '-')
		formData.append('aktif', 't')

		const r: APIResponse<null> = await API.post('/user/add', formData)
		if (r.status === 200) return { success: true, message: [] }
		return { success: false, message: [r.message] }
	}

	static async updateUser(data: UpdateUserInput): Promise<ServiceResponse> {
		const validate = updateUserValidator(data)
		if (!validate.pass) return { success: false, message: validate.message }

		const formData = new FormData()
		formData.append('id', data.id)
		formData.append('nama', data.name)
		formData.append('no_telepon', data.phoneNumber)
		if (data.password) formData.append('password', data.password)
		if (data.oldEmail !== data.email) formData.append('email', data.email)
		if (data.oldRegistrationNumber !== data.registrationNumber)
			formData.append('no_registrasi', data.registrationNumber)

		const r: APIResponse<null> = await API.post('/user/save', formData)
		if (r.status === 200)
			return { success: true, message: ['Ubah data pengguna berhasil'] }
		return { success: false, message: [r.message] }
	}

	static async deleteUser(data: DeleteUserInput): Promise<ServiceResponse> {
		const validate = deleteUserValidator(data)
		if (!validate.pass) return { success: false, message: validate.message }

		const r: APIResponse<null> = await API.delete(`/user/remove/${data.id}`)
		if (r.status === 200) return { success: true, message: [] }
		return { success: false, message: [r.message] }
	}

	static async getPatroliNonLoginUsers(): Promise<UserData[]> {
		const r: APIResponse<NonLoginUserResponse[]> = await API.get(
			'/non_login/list'
		)
		if (r.status === 200) {
			const users: UserData[] = r.data.map((user) => {
				return {
					id: parseInt(user.id),
					accessId: 0,
					email: '',
					nip: '',
					organization: '',
					phoneNumber: '',
					registrationNumber: '',
					name: user.nama,
					role: parseInt(user.r_role_id),
					photo: '',
					roleLevel: parseInt(user.r_role.level),
					roleName: user.r_role.nama
				}
			})
			return users
		}
		return []
	}

	static async addPatroliNonLoginUser(
		data: AddPatroliNonLoginUserInput
	): Promise<ServiceResponse> {
		const validate = createPatroliNonLoginValidator(data)
		if (!validate.pass) return { success: false, message: validate.message }

		const formData = new FormData()
		formData.append('nama', data.name)
		formData.append('r_role_id', data.role.toString())

		const r: APIResponse<null> = await API.post('/non_login/add', formData)
		if (r.status === 200) return { success: true, message: [] }
		return { success: false, message: [r.message] }
	}

	static async updatePatroliNonLoginUser(
		data: UpdatePatroliNonLoginUserInput
	): Promise<ServiceResponse> {
		const validate = updatePatroliNonLoginValidator(data)
		if (!validate.pass) return { success: false, message: validate.message }

		const formData = new FormData()
		formData.append('id', data.id.toString())
		formData.append('nama', data.name)
		formData.append('r_role_id', data.role.toString())

		const r: APIResponse<null> = await API.post('/non_login/save', formData)
		if (r.status === 200) return { success: true, message: [] }
		return { success: false, message: [r.message] }
	}

	static async deletePatroliNonLoginUser(
		data: DeletePatroliNonLoginUserInput
	): Promise<ServiceResponse> {
		const validate = deletePatroliNonLoginValidator(data)
		if (!validate.pass) return { success: false, message: validate.message }

		const r: APIResponse<null> = await API.delete(
			`/non_login/remove/${data.id}`
		)
		if (r.status === 200) return { success: true, message: [] }
		return { success: false, message: [r.message] }
	}

	static async getNonPatroliRoles(): Promise<RoleData[]> {
		const r: APIResponse<RoleResponse[]> = await API.get('/role/list')
		if (r.status === 200) {
			const data: RoleData[] = []
			r.data.forEach((role) => {
				if (parseInt(role.level, 10) <= 5) {
					data.push({
						id: parseInt(role.id, 10),
						name: role.nama,
						level: parseInt(role.level, 10),
						active: role.aktif
					})
				}
			})
			return data
		}
		return []
	}

	static async getPatroliNonLoginRoles(): Promise<RoleData[]> {
		const r: APIResponse<RoleResponse[]> = await API.get('/role/list')
		if (r.status === 200) {
			const data: RoleData[] = []
			r.data.forEach((role) => {
				if (parseInt(role.level, 10) === 7) {
					data.push({
						id: parseInt(role.id, 10),
						name: role.nama,
						level: parseInt(role.level, 10),
						active: role.aktif
					})
				}
			})
			return data
		}
		return []
	}

	static async getNonPatroliUsers(): Promise<{
		daopsUsers: NonPatroliUserData[]
		balaiUsers: NonPatroliUserData[]
	}> {
		const r: APIResponse<NonPatroliUserResponse[]> = await API.get(
			'/non_patroli/list'
		)
		const daopsUsers: NonPatroliUserData[] = []
		const balaiUsers: NonPatroliUserData[] = []
		if (r.status === 200) {
			r.data.forEach((userAccess) => {
				const user: NonPatroliUserData = {
					id: parseInt(userAccess.m_user.id, 10),
					accessId: parseInt(userAccess.id, 10),
					registrationNumber: userAccess.m_user.no_registrasi,
					role: parseInt(userAccess.r_role_id, 10),
					organization: userAccess.m_user.instansi,
					name: userAccess.m_user.nama,
					email: userAccess.m_user.email
				}
				if (parseInt(userAccess.r_role.level, 10) <= 3) {
					balaiUsers.push(user)
				} else {
					daopsUsers.push(user)
				}
			})
			return { daopsUsers, balaiUsers }
		}
		return { daopsUsers, balaiUsers }
	}

	static async addNonPatroliUser(
		data: CreateNonPatroliUser
	): Promise<ServiceResponse> {
		const validate = createNonPatroliValidator(data)
		if (!validate.pass) return { success: false, message: validate.message }

		// TODO: Add organization detail
		const formData = new FormData()
		formData.append('m_user_id', data.id.toString())
		formData.append('r_role_id', data.role.toString())

		const r: APIResponse<null> = await API.post(
			'/non_patroli/add',
			formData
		)
		if (r.status === 200) return { success: true, message: [] }
		return { success: false, message: [r.message] }
	}

	static async updateNonPatroliUser(
		data: NonPatroliUserData
	): Promise<ServiceResponse> {
		const validate = updateNonPatroliValidator(data)
		if (!validate.pass) return { success: false, message: validate.message }

		const formData = new FormData()
		formData.append('id', data.accessId.toString())
		formData.append('r_role_id', data.role.toString())

		const r: APIResponse<null> = await API.post(
			'non_patroli/save',
			formData
		)
		// TODO: update daops/balai organization in user access
		if (r.status === 200) return { success: true, message: [] }
		return { success: false, message: [r.message] }
	}

	static async deleteNonPatroliUser(
		data: DeleteNonPatroliUser
	): Promise<ServiceResponse> {
		const validate = deleteNonPatroliValidator(data)
		if (!validate.pass) return { success: false, message: validate.message }
		const r: APIResponse<null> = await API.delete(
			`/non_patroli/remove/${data.accessId}`
		)
		if (r.status === 200) return { success: true, message: [] }
		return { success: false, message: [r.message] }
	}
}
