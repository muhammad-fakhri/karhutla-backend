import DaopsValidator from '../validators/daops.validator'
import API from '../api'

class DaopsService {
	static async getAllDaops() {
		const r = await API.get('/daops/list')
		if (r.status === 200) {
			const data = []
			r.data.forEach((daops) => {
				data.push({
					id: daops.id,
					code: daops.kode,
					name: daops.nama,
					balaiId: daops.r_balai_id
				})
			})
			return data
		}
		return []
	}

	static async addDaops(daops) {
		const validate = DaopsValidator.createDaops(daops)
		if (!validate.pass) return { success: false, message: validate.message }

		const formData = new FormData()
		formData.append('kode', daops.code)
		formData.append('nama', daops.name)
		formData.append('r_balai_id', daops.balaiId)

		const r = await API.post('/daops/add', formData)

		if (r.status === 200) {
			return { success: true }
		}
		return { success: false, message: [r.message] }
	}

	static async updateDaops(newData, oldData) {
		const validate = DaopsValidator.updateDaops(newData)
		if (!validate.pass) return { success: false, message: validate.message }

		const formData = new FormData()
		formData.append('id', newData.id)
		formData.append('nama', newData.name)
		formData.append('r_balai_id', newData.balaiId)
		if (oldData.code !== newData.code) {
			formData.append('kode', newData.code)
		}

		const r = await API.post('/daops/save', formData)

		if (r.status === 200) {
			return { success: true }
		}
		return { success: false, message: [r.message] }
	}

	static async deleteDaops(daops) {
		const validate = DaopsValidator.deleteDaops(daops)
		if (!validate.pass) return { success: false, message: validate.message }

		let r = await API.delete(`/daops/remove/${daops.id}`)

		if (r.status === 200) {
			return { success: true }
		}
		r = await r.json()
		return { success: false, message: [r.message] }
	}
}
export default DaopsService
