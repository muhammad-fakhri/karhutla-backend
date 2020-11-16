import API from '../api'

class PenugasanService {
	static async getAllPenugasan(url) {
		const r = await API.get(url)
		if (r.status === 200) {
			const data = []
			r.data.forEach((work) => {
				data.push({
					id: work.id,
					number: work.nomor,
					type: work.jenis_surat,
					startDate: work.tanggal_awal,
					finishDate: work.tanggal_akhir
				})
			})
			return data
		}
		return []
	}
}
export default PenugasanService
