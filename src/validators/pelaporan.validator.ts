import { ValidatorResult } from '../interfaces'
import { calcDayDifference, isGreaterThan } from '../utils'

export const downloadRentangTanggalValidator = (
	startDate: Date,
	endDate: Date
): ValidatorResult => {
	const errorMsg: string[] = []
	// End Date must greater than Start Date
	if (!isGreaterThan(endDate.toISOString(), startDate.toISOString())) {
		errorMsg.push('Tanggal Selesai harus lebih besar dari Tanggal Mulai')
	}
	// Max 7 day range
	if (calcDayDifference(endDate, startDate) > 7) {
		errorMsg.push(
			'Maksimal rentang tanggal adalah 7 hari, silakan pilih rentang tanggal lain'
		)
	}

	if (errorMsg.length === 0) return { pass: true, message: [] }
	return { pass: false, message: errorMsg }
}
