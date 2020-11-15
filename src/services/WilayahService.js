import API from '../api'
import WilayahValidator from '../validators/WilayahValidator'

// TODO: fetch wilayah by type

class WilayahService {
	static async getAllWilayah() {
		const r = await API.get('/wilayah/list')
		if (r.status == 200) {
			const data = new Array()
			r.data.forEach((wilayah) => {
				data.push({
					id: wilayah.id,
					code: wilayah.kode,
					name: wilayah.nama,
					type: wilayah.tipe,
				})
			})
			return data
		} else {
			return new Array()
		}
	}

	static async getAllKecamatan() {
		const r = await API.get('/wilayah/list')
		if (r.status == 200) {
			const kecamatan = new Array()
			r.data.forEach((wilayah) => {
				if (wilayah.tipe === 'Kecamatan') {
					kecamatan.push({
						id: wilayah.id,
						code: wilayah.kode,
						name: wilayah.nama,
						type: wilayah.tipe,
					})
				}
			})
			return kecamatan
		} else {
			return new Array()
		}
	}

	static async getAllPulau() {
		const r = await API.get('/wilayah/list')
		if (r.status == 200) {
			const pulau = new Array()
			r.data.forEach((wilayah) => {
				if (wilayah.tipe === 'Pulau') {
					pulau.push({
						id: wilayah.id,
						code: wilayah.kode,
						name: wilayah.nama,
						type: wilayah.tipe,
					})
				}
			})
			return pulau
		} else {
			return new Array()
		}
	}

	static async addWilayah(wilayah) {
		let validate = WilayahValidator.createWilayah(wilayah)
		if (!validate.pass) return { success: false, message: validate.message }

		let formData = new FormData()
		formData.append('kode', wilayah.code)
		formData.append('nama', wilayah.name)
		formData.append('tipe', wilayah.type)

		let r = await API.post('/wilayah/add', formData)

		if (r.status == 200) {
			return { success: true }
		} else {
			return { success: false, message: [r.message] }
		}
	}

	static async updateWilayah(newData, oldData) {
		let validate = WilayahValidator.updateWilayah(newData)
		if (!validate.pass) return { success: false, message: validate.message }

		let formData = new FormData()
		formData.append('id', newData.id)
		formData.append('nama', newData.name)
		formData.append('tipe', newData.type)
		if (oldData.code !== newData.code) {
			formData.append('kode', newData.code)
		}

		let r = await API.post('/wilayah/save', formData)

		if (r.status == 200) {
			return { success: true }
		} else {
			return { success: false, message: [r.message] }
		}
	}

	static async deleteWilayah(wilayah) {
		const validate = WilayahValidator.deleteWilayah(wilayah)
		if (!validate.pass) return { success: false, message: validate.message }

		const r = await API.delete(`/wilayah/remove/${wilayah.id}`)

		if (r.status == 200) {
			return { success: true }
		} else {
			r = await r.json()
			return { success: false, message: [r.message] }
		}
	}
}
export default WilayahService
