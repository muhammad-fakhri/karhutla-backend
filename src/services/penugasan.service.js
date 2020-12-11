import axios from 'axios'
import { SimaduAPI } from '../api'

class PenugasanService {
	static async getAllPenugasan() {
		const r = await SimaduAPI.get('/listsk')
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

	static async uploadPenugasan(data) {
		if (!data) {
			return { success: false, message: 'Gagal mengupload berkas' }
		}

		const formData = new FormData()
		formData.append('file', data)

		const r = await axios
			.post('http://103.129.223.216/api/simadu/uploadtim', formData)
			.then((res) => res.data)

		const message = r.split('<')[0].trim()
		if (r.status === 200) {
			return { success: true, message }
		}
		return { success: false, message }
	}
}
export default PenugasanService
