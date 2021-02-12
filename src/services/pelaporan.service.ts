import { simaduApiUrl } from '../api'
import { ServiceResponse } from '../interfaces'
import { formatYYYYMMDD } from '../utils'
import { downloadRentangTanggalValidator } from '../validators'

export default class PelaporanService {
	static downloadLaporanRentangTanggal(
		startDate: Date,
		endDate: Date
	): ServiceResponse {
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
}
