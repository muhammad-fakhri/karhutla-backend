import { simaduApiUrl, apiV2 } from '@api'
import { formatYYYYMMDD } from '@util'
import { downloadRentangTanggalValidator } from '@validator'
import {
	APIResponse,
	ServiceResponse,
	LaporanData,
	LaporanDataResponse
} from '@interface'

export const downloadLaporanRentangTanggal = (
	startDate: Date,
	endDate: Date
): ServiceResponse => {
	const validate = downloadRentangTanggalValidator(startDate, endDate)
	if (!validate.pass) {
		return {
			success: false,
			message: validate.message
		}
	}

	// Prepare Download URL
	const url = `${simaduApiUrl}/downloadrange?start=${formatYYYYMMDD(
		startDate
	)}&end=${formatYYYYMMDD(endDate)}`

	// Open URL in new tab
	window.open(url)
	return {
		success: true,
		message: ''
	}
}

export const getLaporanDetail = async (
	laporanId: string
): Promise<{
	success: boolean
	message: string | string[]
	data?: any
}> => {
	const r: APIResponse<LaporanDataResponse[]> = await apiV2.get(
		`laporan/fetch/${laporanId}`
	)
	console.log(r)
	if (r.status === 200) {
		console.log(r.data)
		return { success: true, message: r.message, data: r.data }
	}
	return { success: false, message: r.message }
}

export const getDetailList = async (): Promise<{
	success: boolean
	message: string | string[]
	data?: any
}> => {
	const r: APIResponse<LaporanDataResponse[]> = await apiV2.get(`lists/all`)
	console.log(r)
	if (r.status === 200) {
		console.log(r.data)
		return { success: true, message: r.message, data: r.data }
	}
	return { success: false, message: r.message }
}

export const updateLaporan = async (data: any): Promise<ServiceResponse> => {
	console.log(data)
	const r: APIResponse<null> = await apiV2.post('/laporan/save', data)
	console.log(r)
	if (r.status === 200)
		return { success: true, message: 'Ubah data Laporan berhasil' }
	return { success: false, message: data.message }
}
