import { SimaduAPI, simaduApiUrl, apiV2, API } from '@api'
import {
	APIResponse,
	ServiceResponse,
	SuratTugasData,
	SuratTugasResponse,
	SuratTugasTeamMemberData,
	SuratTugasTeamMemberResponse,
	DeletePenugasanInput,
	ProvinsiData,
	ProvinsiResponse,
	KabupatenData,
	KabupatenResponse,
	APIResponseUpload,
	SkNumberData,
	SkNumberResponse,
	PenugasanData
} from '@interface'
import { splitAndTrim } from '@util'
import { uploadPenugasanValidator, deletePenugasanValidator } from '@validator'
import axios from 'axios'

export const getAllPenugasan = async (): Promise<SuratTugasData[]> => {
	// const r: APIResponse<SuratTugasResponse[]> = await SimaduAPI.get('/listsk')
	const r: APIResponse<SuratTugasResponse[]> = await apiV2.get(
		'simadu/listsk'
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

export const checkSkNumber = async (
	no_sk
): Promise<{
	success: boolean
	message: string | string[]
}> => {
	const r: APIResponse<SkNumberResponse> = await apiV2.get(
		'simadu/cekst/?no_st=' + no_sk
	)
	if (r.status === 200) {
		return { success: true, message: r.data.message }
	} else {
		return { success: false, message: r.data.message }
	}
}

export const getAllProvinsi = async (): Promise<ProvinsiData[]> => {
	const r: APIResponse<ProvinsiResponse[]> = await apiV2.get('/lists/wilayah')
	if (r.status === 200) {
		return r.data.map((provinsi) => {
			return {
				kode_wilayah: provinsi.kode_wilayah,
				nama_wilayah: provinsi.nama_wilayah
			}
		})
	}
	return []
}

export const getAllKabupaten = async (
	id_provinsi
): Promise<KabupatenData[]> => {
	const r: APIResponse<KabupatenResponse[]> = await apiV2.get(
		'/lists/wilayah/' + id_provinsi
	)
	if (r.status === 200) {
		return r.data.map((provinsi) => {
			return {
				kode_wilayah: provinsi.kode_wilayah,
				nama_wilayah: provinsi.nama_wilayah
			}
		})
	}
	return []
}

export const deletePenugasan = async (
	data: DeletePenugasanInput
): Promise<ServiceResponse> => {
	try {
		const validate = deletePenugasanValidator(data)
		if (!validate.pass) return { success: false, message: validate.message }

		// const r: APIResponse<null> = await SimaduAPI.get(`/deletesk?no_st=${data.number}`)
		const r: APIResponse<{
			id: string
			number: string
			message: string
		}> = await apiV2.get(`simadu/deletesk?no_st=${data.number}`)
		console.log(r)
		if (r.status === 200) return { success: true, message: r.data.message }
		return { success: false, message: r.data.message }
	} catch (error) {
		return { success: false, message: error }
	}
}

export const uploadPenugasan = async (
	file: File,
	type: string,
	sk_number: string,
	province: string,
	kabupaten: string
): Promise<ServiceResponse> => {
	const validate = uploadPenugasanValidator(
		file,
		type,
		sk_number,
		province,
		kabupaten
	)
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
		formData.append('sk_number', sk_number)
		formData.append('provinsi', province)
		formData.append('kabupaten', kabupaten)

		// }> = await axios.post(`${simaduApiUrl}/uploadtim`, formData)
		const r: APIResponseUpload<{
			code: string
		}> = await apiV2.post(`/simadu/uploadtim`, formData)
		console.log(r)
		if (r.code === '200') {
			return {
				success: true,
				message: [r.message]
			}
		} else if (r.code === '400') {
			return {
				success: false,
				message: [r.message]
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
