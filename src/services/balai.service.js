import API from '../api'
import BalaiValidator from '../validators/balai.validator'

class BalaiService {
	static async getAllBalai() {
		const r = await API.get('/balai/list')
		if (r.status === 200) {
			const data = []
			r.data.forEach((balai) => {
				data.push({
					id: balai.id,
					code: balai.kode,
					name: balai.nama,
					region: balai.r_wilayah_id
				})
			})
			return data
		}
		return []
	}

	static async addBalai(balai) {
		const validate = BalaiValidator.createBalai(balai)
		if (!validate.pass) return { success: false, message: validate.message }

		const formData = new FormData()
		formData.append('kode', balai.code)
		formData.append('nama', balai.name)
		formData.append('r_wilayah_id', balai.region)

		const r = await API.post('/balai/add', formData)
		if (r.status === 200) {
			return { success: true }
		}
		return { success: false, message: [r.message] }
	}

	static async updateBalai(newData, oldData) {
		const validate = BalaiValidator.updateBalai(newData)
		if (!validate.pass) return { success: false, message: validate.message }

		const formData = new FormData()
		formData.append('id', newData.id)
		formData.append('nama', newData.name)
		formData.append('r_wilayah_id', newData.region)
		if (oldData.code !== newData.code) {
			formData.append('kode', newData.code)
		}

		const r = await API.post('/balai/save', formData)

		if (r.status === 200) {
			return { success: true }
		}
		return { success: false, message: [r.message] }
	}

	static async deleteBalai(balai) {
		const validate = BalaiValidator.deleteBalai(balai)
		if (!validate.pass) return { success: false, message: validate.message }

		let r = await API.delete(`/balai/remove/${balai.id}`)

		if (r.status === 200) {
			return { success: true }
		}
		r = await r.json()
		return { success: false, message: [r.message] }
	}
}
export default BalaiService
