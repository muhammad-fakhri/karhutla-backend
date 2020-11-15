import { digitLength } from './helper.validator'

class PoskoValidator {
	static createPosko(inputData) {
		const errorMsg = []
		if (!inputData.name) errorMsg.push('Tolong masukkan nama posko')
		if (digitLength(inputData.daops) < 1)
			errorMsg.push('Tolong pilih daops')
		if (digitLength(inputData.kecamatan) < 1)
			errorMsg.push('Tolong pilih kecamatan')
		if (errorMsg.length === 0) {
			return { pass: true }
		}
		return { pass: false, message: errorMsg }
	}

	static updatePosko(inputData) {
		const errorMsg = []
		if (!inputData.id) errorMsg.push('ID posko tidak disertakan')
		if (!inputData.name) errorMsg.push('Tolong masukkan nama posko')
		if (!inputData.daops) errorMsg.push('Tolong pilih daops')
		if (!inputData.kecamatan) errorMsg.push('Tolong pilih kecamatan')
		if (errorMsg.length === 0) {
			return { pass: true }
		}
		return { pass: false, message: errorMsg }
	}

	static deletePosko(inputData) {
		const errorMsg = []
		if (!inputData.id) errorMsg.push('ID posko tidak disertakan')
		if (errorMsg.length === 0) {
			return { pass: true }
		}
		return { pass: false, message: errorMsg }
	}
}
export default PoskoValidator
