import {
	AddPoskoInput,
	PoskoData,
	UpdatePoskoInput,
	ValidatorResult
} from '../interfaces'
import { digitLength } from '../utils'

export const createPoskoValidator = (
	inputData: AddPoskoInput
): ValidatorResult => {
	const errorMsg: string[] = []
	if (!inputData.name) errorMsg.push('Tolong masukkan nama posko')
	if (digitLength(parseInt(inputData.daops)) < 1)
		errorMsg.push('Tolong pilih daops')
	if (digitLength(parseInt(inputData.kecamatan)) < 1)
		errorMsg.push('Tolong pilih kecamatan')
	if (errorMsg.length === 0) {
		return { pass: true, message: [] }
	}
	return { pass: false, message: errorMsg }
}

export const updatePoskoValidator = (
	inputData: UpdatePoskoInput
): ValidatorResult => {
	const errorMsg: string[] = []
	if (!inputData.id) errorMsg.push('ID posko tidak disertakan')
	if (!inputData.name) errorMsg.push('Tolong masukkan nama posko')
	if (!inputData.daops) errorMsg.push('Tolong pilih daops')
	if (!inputData.kecamatan) errorMsg.push('Tolong pilih kecamatan')
	if (errorMsg.length === 0) return { pass: true, message: [] }
	return { pass: false, message: errorMsg }
}

export const deletePoskoValidator = (inputData: PoskoData): ValidatorResult => {
	const errorMsg: string[] = []
	if (!inputData.id) errorMsg.push('ID posko tidak disertakan')
	if (errorMsg.length === 0) return { pass: true, message: [] }
	return { pass: false, message: errorMsg }
}
