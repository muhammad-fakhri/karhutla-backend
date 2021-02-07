import { API } from '../api'

class WilayahService {
	static async getAllWilayah() {
		const r = await API.get('/wilayah/list')
		if (r.status === 200) {
			const data = []
			r.data.forEach((wilayah) => {
				data.push({
					id: wilayah.id,
					code: wilayah.kode,
					name: wilayah.nama,
					type: wilayah.tipe
				})
			})
			return data
		}
		return []
	}

	static async getAllKecamatan() {
		const r = await API.get('/wilayah/list')
		if (r.status === 200) {
			const kecamatan = []
			r.data.forEach((wilayah) => {
				if (wilayah.tipe === 'Kecamatan') {
					kecamatan.push({
						id: wilayah.id,
						code: wilayah.kode,
						name: wilayah.nama,
						type: wilayah.tipe
					})
				}
			})
			return kecamatan
		}
		return []
	}

	static async getAllPulau() {
		const r = await API.get('/wilayah/list')
		if (r.status === 200) {
			const pulau = []
			r.data.forEach((wilayah) => {
				if (wilayah.tipe === 'Pulau') {
					pulau.push({
						id: wilayah.id,
						code: wilayah.kode,
						name: wilayah.nama,
						type: wilayah.tipe
					})
				}
			})
			return pulau
		}
		return []
	}
}
export default WilayahService
