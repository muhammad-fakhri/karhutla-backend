import { SimaduAPI, simaduApiUrl } from '@api'
import {
	APIResponse,
	ServiceResponse,
	SuratTugasData,
	SuratTugasResponse,
	SuratTugasTeamMemberData,
	SuratTugasTeamMemberResponse
} from '@interface'
import { splitAndTrim } from '@util'
import { uploadPenugasanValidator } from '@validator'
import axios from 'axios'

export const getAllPenugasan = async (): Promise<SuratTugasData[]> => {
	const r: APIResponse<SuratTugasResponse[]> = await SimaduAPI.get('/listsk')
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

export const uploadPenugasan = async (
	file: File,
	type: string
): Promise<ServiceResponse> => {
	const validate = uploadPenugasanValidator(file, type)
	if (!validate.pass) {
		return {
			success: false,
			message: [validate.message]
		}
	}

	try {
		const formData = new FormData()
		formData.append('file', file)
		formData.append('jenis_patroli', type)

		const r: APIResponse<{
			code: string
			message: string
		}> = await axios.post(`${simaduApiUrl}/uploadtim`, formData)

		if (r.status === 200) {
			return {
				success: true,
				message: [r.data.message]
			}
		}

		throw new Error(
			'Unexpected error when uploading penugasan, please contact the administrator'
		)
	} catch (error) {
		if (!error.response) {
			return {
				success: false,
				message: [error.message]
			}
		}
		return {
			success: false,
			message: splitAndTrim(error.response.data.message, '\n\n')
		}
	}
}

export const getPenugasanDetail = async (
	noSK: string
): Promise<SuratTugasTeamMemberData[]> => {
	const r: APIResponse<SuratTugasTeamMemberResponse[]> = await SimaduAPI.get(
		`/listregu?nomor_sk=${noSK}`
	)
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
