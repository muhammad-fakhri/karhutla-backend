import { API } from '../api'
import { APIResponse, RegionData, RegionResponse } from '../interfaces'

export default class WilayahService {
	static async getAllWilayah(): Promise<RegionData[]> {
		const r: APIResponse<RegionResponse[]> = await API.get('/wilayah/list')
		if (r.status === 200) {
			return r.data.map((wilayah) => {
				return {
					id: wilayah.id,
					code: wilayah.kode,
					name: wilayah.nama,
					type: wilayah.tipe
				}
			})
		}
		return []
	}

	static async getAllKecamatan(): Promise<RegionData[]> {
		const r: APIResponse<RegionResponse[]> = await API.get('/wilayah/list')
		if (r.status === 200) {
			const kecamatan: RegionData[] = []
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

	static async getAllPulau(): Promise<RegionData[]> {
		const r: APIResponse<RegionResponse[]> = await API.get('/wilayah/list')
		if (r.status === 200) {
			const pulau: RegionData[] = []
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
