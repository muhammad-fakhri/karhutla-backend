class BalaiValidator {
	static createBalai(inputData) {
		const errorMsg = []
		if (Object.keys(inputData).length > 0) {
			if (!inputData.code) errorMsg.push('Tolong masukkan kode balai')
			if (!inputData.name) errorMsg.push('Tolong masukkan nama balai')
			if (!inputData.region) errorMsg.push('Tolong pilih wilayah balai')
		} else {
			errorMsg.push('Tolong isikan data balai')
		}
		if (errorMsg.length === 0) {
			return { pass: true }
		}
		return { pass: false, message: errorMsg }
	}

	static updateBalai(inputData) {
		const errorMsg = []
		if (Object.keys(inputData).length > 0) {
			if (!inputData.id) errorMsg.push('ID balai tidak disertakan')
			if (!inputData.code) errorMsg.push('Tolong masukkan kode balai')
			if (!inputData.name) errorMsg.push('Tolong masukkan nama balai')
			if (!inputData.region) errorMsg.push('Tolong pilih wilayah')
		} else {
			errorMsg.push('Tolong isikan data balai')
		}
		if (errorMsg.length === 0) {
			return { pass: true }
		}
		return { pass: false, message: errorMsg }
	}

	static deleteBalai(inputData) {
		const errorMsg = []
		if (!inputData.id) errorMsg.push('ID Balai tidak disertakan')
		if (errorMsg.length === 0) {
			return { pass: true }
		}
		return { pass: false, message: errorMsg }
	}
}
export default BalaiValidator
