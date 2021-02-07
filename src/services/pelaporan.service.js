import { simaduApiUrl } from '../api'
import { formatYYYYMMDD } from '../utils/date.util'
import PelaporanValidator from '../validators/pelaporan.validator'

class PelaporanService {
	static downloadLaporanRentangTanggal(startDate, endDate) {
		const validate = PelaporanValidator.downloadRentangTanggal(
			startDate,
			endDate
		)
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
			success: true
		}
	}
}
export default PelaporanService
