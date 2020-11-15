import DaopsValidator from '../validators/DaopsValidator'
import API from '../api'

class DaopsService {
	static async getAllDaops() {
		const r = await API.get('/daops/list')
		if (r.status == 200) {
			const data = new Array()
			r.data.forEach((daops) => {
				data.push({
					id: daops.id,
					code: daops.kode,
					name: daops.nama,
					balaiId: daops.r_balai_id,
				})
			})
			return data
		} else {
			return new Array()
		}
	}

	static async addDaops(daops) {
		let validate = DaopsValidator.createDaops(daops)
		if (!validate.pass) return { success: false, message: validate.message }

		let formData = new FormData()
		formData.append('kode', daops.code)
		formData.append('nama', daops.name)
		formData.append('r_balai_id', daops.balaiId)

		let r = await API.post('/daops/add', formData)

		if (r.status == 200) {
			return { success: true }
		} else {
			return { success: false, message: [r.message] }
		}
	}

	static async updateDaops(newData, oldData) {
		let validate = DaopsValidator.updateDaops(newData)
		if (!validate.pass) return { success: false, message: validate.message }

		let formData = new FormData()
		formData.append('id', newData.id)
		formData.append('nama', newData.name)
		formData.append('r_balai_id', newData.balaiId)
		if (oldData.code !== newData.code) {
			formData.append('kode', newData.code)
		}

		let r = await API.post('/daops/save', formData)

		if (r.status == 200) {
			return { success: true }
		} else {
			return { success: false, message: [r.message] }
		}
	}

	static async deleteDaops(daops) {
		const validate = DaopsValidator.deleteDaops(daops)
		if (!validate.pass) return { success: false, message: validate.message }

		const r = await API.delete(`/daops/remove/${daops.id}`)

		if (r.status == 200) {
			return { success: true }
		} else {
			r = await r.json()
			return { success: false, message: [r.message] }
		}
	}
}
export default DaopsService
