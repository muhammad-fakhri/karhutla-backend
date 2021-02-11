import { BalaiData, ValidatorResult } from '../interfaces'

export const createBalaiValidator = (inputData: BalaiData): ValidatorResult => {
	const errorMsg: string[] = []
	if (Object.keys(inputData).length > 0) {
		if (!inputData.code) errorMsg.push('Tolong masukkan kode balai')
		if (!inputData.name) errorMsg.push('Tolong masukkan nama balai')
		if (!inputData.region) errorMsg.push('Tolong pilih wilayah balai')
	} else {
		errorMsg.push('Tolong isikan data balai')
	}
	if (errorMsg.length === 0) {
		return { pass: true, message: [] }
	}
	return { pass: false, message: errorMsg }
}

export const updateBalaiValidator = (inputData: BalaiData): ValidatorResult => {
	const errorMsg: string[] = []
	if (Object.keys(inputData).length > 0) {
		if (!inputData.id) errorMsg.push('ID balai tidak disertakan')
		if (!inputData.code) errorMsg.push('Tolong masukkan kode balai')
		if (!inputData.name) errorMsg.push('Tolong masukkan nama balai')
		if (!inputData.region) errorMsg.push('Tolong pilih wilayah')
	} else {
		errorMsg.push('Tolong isikan data balai')
	}
	if (errorMsg.length === 0) {
		return { pass: true, message: [] }
	}
	return { pass: false, message: errorMsg }
}

export const deleteBalaiValidator = (inputData: BalaiData): ValidatorResult => {
	const errorMsg: string[] = []
	if (!inputData.id) errorMsg.push('ID Balai tidak disertakan')
	if (errorMsg.length === 0) {
		return { pass: true, message: [] }
	}
	return { pass: false, message: errorMsg }
}
