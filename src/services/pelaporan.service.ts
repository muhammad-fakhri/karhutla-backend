import { simaduApiUrl } from '@api'
import { ServiceResponse } from '@interface'
import { formatYYYYMMDD } from '@util'
import { downloadRentangTanggalValidator } from '@validator'

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
