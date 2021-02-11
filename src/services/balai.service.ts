import { API } from '../api'
import {
	APIResponse,
	BalaiData,
	BalaiResponse,
	ServiceResponse
} from '../interfaces'
import {
	createBalaiValidator,
	deleteBalaiValidator,
	updateBalaiValidator
} from '../validators'

export default class BalaiService {
	static async getAllBalai(): Promise<BalaiData[]> {
		const r: APIResponse<BalaiResponse[]> = await API.get('/balai/list')
		if (r.status === 200) {
			const data: BalaiData[] = r.data.map((balai) => {
				return {
					id: balai.id,
					code: balai.kode,
					name: balai.nama,
					region: balai.r_wilayah_id
				}
			})
			return data
		}
		return []
	}

	static async addBalai(balai: BalaiData): Promise<ServiceResponse> {
		const validate = createBalaiValidator(balai)
		if (!validate.pass) return { success: false, message: validate.message }

		const formData = new FormData()
		formData.append('kode', balai.code)
		formData.append('nama', balai.name)
		formData.append('r_wilayah_id', balai.region)

		const r: APIResponse<null> = await API.post('/balai/add', formData)
		if (r.status === 200) return { success: true, message: [] }
		return { success: false, message: [r.message] }
	}

	static async updateBalai(
		newData: BalaiData,
		oldData: BalaiData
	): Promise<ServiceResponse> {
		const validate = updateBalaiValidator(newData)
		if (!validate.pass) return { success: false, message: validate.message }

		const formData = new FormData()
		formData.append('id', newData.id)
		formData.append('nama', newData.name)
		formData.append('r_wilayah_id', newData.region)
		if (oldData.code !== newData.code) formData.append('kode', newData.code)

		const r: APIResponse<null> = await API.post('/balai/save', formData)
		if (r.status === 200) return { success: true, message: [] }
		return { success: false, message: [r.message] }
	}

	static async deleteBalai(balai: BalaiData): Promise<ServiceResponse> {
		const validate = deleteBalaiValidator(balai)
		if (!validate.pass) return { success: false, message: validate.message }

		const r: APIResponse<null> = await API.delete(
			`/balai/remove/${balai.id}`
		)
		if (r.status === 200) return { success: true, message: [] }
		return { success: false, message: [r.message] }
	}
}
