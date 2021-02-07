import axios from 'axios'
import { SimaduAPI, simaduApiUrl } from '../api'
import splitAndTrim from '../utils/string.util'
import PenugasanValidator from '../validators/penugasan.validator'

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
					finishDate: work.tanggal_akhir,
					reportLink: `${simaduApiUrl}/downloadPeriode?nomor_sk=${work.nomor}`
				})
			})
			return data
		}
		return []
	}

	static async uploadPenugasan(file, type) {
		const validate = PenugasanValidator.uploadPenugasan(file, type)
		if (!validate.pass) {
			return {
				success: false,
				message: validate.message
			}
		}

		const formData = new FormData()
		formData.append('file', file)
		formData.append('jenis_patroli', type)

		const r = await axios.post(`${simaduApiUrl}/uploadtim`, formData)

		if (r.status === 200) {
			return {
				success: true,
				message: splitAndTrim(r.data, '<a href=')
			}
		}

		return {
			success: false,
			message: splitAndTrim(r.data, '<br><br>')
		}
	}

	static async getPenugasanDetail(noSK) {
		const r = await SimaduAPI.get(`/listregu?nomor_sk=${noSK}`)
		if (r.status === 200) {
			const data = []
			r.data.forEach((teamMember) => {
				data.push({
					id: teamMember.id,
					name: teamMember.nama,
					registrationNumber: teamMember.no_registrasi,
					organization: teamMember.instansi,
					startDate: teamMember.tanggal_awal,
					endDate: teamMember.tanggal_akhir,
					posko: teamMember.posko,
					daops: teamMember.daops
				})
			})
			return data
		}
		return []
	}
}
export default PenugasanService
