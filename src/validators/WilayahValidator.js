class WilayahValidator {
	static createWilayah(inputData) {
		let errorMsg = new Array()
		if (Object.keys(inputData).length > 0) {
			if (!inputData.code) errorMsg.push('Tolong masukkan kode wilayah')
			if (!inputData.name) errorMsg.push('Tolong masukkan nama wilayah')
			if (!inputData.type) errorMsg.push('Tolong pilih tipe wilayah')
		} else {
			errorMsg.push('Tolong isikan data wilayah')
		}
		if (errorMsg.length == 0) {
			return { pass: true }
		} else {
			return { pass: false, message: errorMsg }
		}
	}

	static updateWilayah(inputData) {
		let errorMsg = new Array()
		if (Object.keys(inputData).length > 0) {
			if (!inputData.id) errorMsg.push('ID Wilayah tidak disertakan')
			if (!inputData.code) errorMsg.push('Tolong masukkan kode wilayah')
			if (!inputData.name) errorMsg.push('Tolong masukkan nama wilayah')
			if (!inputData.type) errorMsg.push('Tolong pilih tipe wilayah')
		} else {
			errorMsg.push('Tolong isikan data wilayah')
		}
		if (errorMsg.length == 0) {
			return { pass: true }
		} else {
			return { pass: false, message: errorMsg }
		}
	}

	static deleteWilayah(inputData) {
		let errorMsg = new Array()
		if (!inputData.id) errorMsg.push('ID Wilayah tidak disertakan')
		if (errorMsg.length == 0) {
			return { pass: true }
		} else {
			return { pass: false, message: errorMsg }
		}
	}
}
export default WilayahValidator