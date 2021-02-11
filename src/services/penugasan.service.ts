import axios from 'axios'
import { SimaduAPI, simaduApiUrl } from '../api'
import {
	APIResponse,
	ServiceResponse,
	SuratTugasData,
	SuratTugasResponse,
	SuratTugasTeamMemberData,
	SuratTugasTeamMemberResponse
} from '../interfaces'
import { splitAndTrim } from '../utils'
import { uploadPenugasanValidator } from '../validators'

export default class PenugasanService {
	static async getAllPenugasan(): Promise<SuratTugasData[]> {
		const r: APIResponse<SuratTugasResponse[]> = await SimaduAPI.get(
			'/listsk'
		)
		if (r.status === 200) {
			return r.data.map((work) => {
				return {
					id: work.id,
					number: work.nomor,
					type: work.jenis_surat,
					startDate: work.tanggal_awal,
					finishDate: work.tanggal_akhir,
					reportLink: `${simaduApiUrl}/downloadPeriode?nomor_sk=${work.nomor}`
				}
			})
		}
		return []
	}

	static async uploadPenugasan(
		file: File,
		type: string
	): Promise<ServiceResponse> {
		const validate = uploadPenugasanValidator(file, type)
		if (!validate.pass) {
			return {
				success: false,
				message: validate.message
			}
		}

		const formData = new FormData()
		formData.append('file', file)
		formData.append('jenis_patroli', type)

		const r: APIResponse<string> = await axios.post(
			`${simaduApiUrl}/uploadtim`,
			formData
		)

		if (r.status === 200)
			return {
				success: true,
				message: splitAndTrim(r.data, '<a href=')
			}

		return {
			success: false,
			message: splitAndTrim(r.data, '<br><br>')
		}
	}

	static async getPenugasanDetail(
		noSK: string
	): Promise<SuratTugasTeamMemberData[]> {
		const r: APIResponse<
			SuratTugasTeamMemberResponse[]
		> = await SimaduAPI.get(`/listregu?nomor_sk=${noSK}`)
		if (r.status === 200) {
			return r.data.map((teamMember) => {
				return {
					id: teamMember.id,
					name: teamMember.nama,
					registrationNumber: teamMember.no_registrasi,
					organization: teamMember.instansi,
					startDate: teamMember.tanggal_awal,
					endDate: teamMember.tanggal_akhir,
					posko: teamMember.posko,
					daops: teamMember.daops
				}
			})
		}
		return []
	}
}
