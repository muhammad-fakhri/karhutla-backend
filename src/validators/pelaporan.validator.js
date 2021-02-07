import { calcDayDifference, isGreaterThan } from '../utils/date.util'

class PelaporanValidator {
	static downloadRentangTanggal(startDate, endDate) {
		const errorMsg = []
		// End Date must greater than Start Date
		if (!isGreaterThan(endDate, startDate)) {
			errorMsg.push(
				'Tanggal Selesai harus lebih besar dari Tanggal Mulai'
			)
		}
		// Max 7 day range
		if (calcDayDifference(endDate, startDate) > 7) {
			errorMsg.push(
				'Maksimal rentang tanggal adalah 7 hari, silakan pilih rentang tanggal lain'
			)
		}

		if (errorMsg.length === 0) {
			return { pass: true }
		}
		return { pass: false, message: errorMsg }
	}
}
export default PelaporanValidator
