import { DaopsData, ValidatorResult } from '../interfaces'

export const createDaopsValidator = (inputData: DaopsData): ValidatorResult => {
	const errorMsg: string[] = []
	if (Object.keys(inputData).length > 0) {
		if (!inputData.code) errorMsg.push('Tolong masukkan kode daops')
		if (!inputData.name) errorMsg.push('Tolong masukkan nama daops')
		if (!inputData.balaiId) errorMsg.push('Tolong pilih balai')
	} else errorMsg.push('Tolong isikan data daops')
	if (errorMsg.length === 0) return { pass: true, message: [] }
	return { pass: false, message: errorMsg }
}

export const updateDaopsValidator = (inputData: DaopsData): ValidatorResult => {
	const errorMsg: string[] = []
	if (Object.keys(inputData).length > 0) {
		if (!inputData.id) errorMsg.push('ID daops tidak disertakan')
		if (!inputData.code) errorMsg.push('Tolong masukkan kode daops')
		if (!inputData.name) errorMsg.push('Tolong masukkan nama daops')
		if (!inputData.balaiId) errorMsg.push('Tolong pilih balai')
	} else errorMsg.push('Tolong isikan data daops')
	if (errorMsg.length === 0) return { pass: true, message: [] }
	return { pass: false, message: errorMsg }
}

export const deleteDaopsValidator = (inputData: DaopsData): ValidatorResult => {
	const errorMsg: string[] = []
	if (!inputData.id) errorMsg.push('ID Daops tidak disertakan')
	if (errorMsg.length === 0) return { pass: true, message: [] }
	return { pass: false, message: errorMsg }
}
