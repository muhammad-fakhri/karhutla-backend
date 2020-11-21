import PoskoValidator from '../validators/posko.validator'
import { API } from '../api'

class PoskoService {
	static async getAllPosko() {
		const response = await API.get('/posko/list')
		const poskoData = []
		if (response.status === 200) {
			response.data.forEach((posko) => {
				poskoData.push({
					id: posko.id,
					name: posko.nama,
					daops: posko.daops.nama,
					daopsId: posko.m_daops_id,
					kecamatan: posko.kecamatan.nama,
					kecamatanId: posko.r_wilayah_id_kec
				})
			})
			return poskoData
		}
		return []
	}

	static async getDetailPosko(id) {
		const response = await API.get(`/posko/single/${id}`)

		if (response.status === 200) {
			const posko = {}
			posko.id = response.data.id
			posko.name = response.data.nama
			posko.daops = response.data.daops.nama
			posko.daopsId = response.data.m_daops_id
			posko.kecamatan = response.data.kecamatan.nama
			posko.kecamatanId = response.data.r_wilayah_id_kec
			return posko
		}
		return []
	}

	static async addPosko(posko) {
		const validate = PoskoValidator.createPosko(posko)
		if (!validate.pass) return { success: false, message: validate.message }

		const formData = new FormData()
		formData.append('nama', posko.name)
		formData.append('m_daops_id', posko.daops)
		formData.append('r_wilayah_id_kec', posko.kecamatan)

		const r = await API.post('/posko/add', formData)

		if (r.status === 200) {
			return { success: true }
		}
		return { success: false, message: [r.message] }
	}

	static async updatePosko(newData, oldName) {
		const validate = PoskoValidator.updatePosko(newData)
		if (!validate.pass) return { success: false, message: validate.message }

		const formData = new FormData()
		formData.append('id', newData.id)
		if (newData.name !== oldName) formData.append('nama', newData.name)
		formData.append('m_daops_id', newData.daops)
		formData.append('r_wilayah_id_kec', newData.kecamatan)

		const r = await API.post('/posko/save', formData)

		if (r.status === 200) {
			return { success: true }
		}
		return { success: false, message: [r.message] }
	}

	static async deletePosko(posko) {
		const validate = PoskoValidator.deletePosko(posko)
		if (!validate.pass) return { success: false, message: validate.message }

		let r = await API.delete(`/posko/remove/${posko.id}`)

		if (r.status === 200) {
			return { success: true }
		}
		r = await r.json()
		return { success: false, message: [r.message] }
	}
}
export default PoskoService
