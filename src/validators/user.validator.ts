import {
	AddPatroliNonLoginUserInput,
	AddUserInput,
	CreateNonPatroliUser,
	DeleteNonPatroliUser,
	DeletePatroliNonLoginUserInput,
	DeleteUserInput,
	NonPatroliUserData,
	UpdatePatroliNonLoginUserInput,
	UpdateUserInput,
	ValidatorResult
} from '../interfaces'
import { digitLength, isEmail, isPhoneNumber } from '../utils'

export const createUserValidator = (
	inputData: AddUserInput
): ValidatorResult => {
	const errorMsg: string[] = []
	if (inputData.name.length < 1) errorMsg.push('Tolong masukan nama pengguna')
	if (!isEmail(inputData.email))
		errorMsg.push('Tolong masukan email pengguna yang valid')
	if (inputData.registrationNumber.length < 1)
		errorMsg.push('Tolong masukan nomor registrasi/NIP')
	if (!isPhoneNumber(inputData.phoneNumber))
		errorMsg.push('Tolong masukan nomor hape yang valid')
	if (inputData.password.length < 8)
		errorMsg.push('Password minimal 8 karakter')
	if (
		inputData.password !== inputData.cPassword &&
		inputData.password.length > 7
	) {
		errorMsg.push('Konfirmasi password tidak sama')
	}
	if (errorMsg.length === 0) return { pass: true, message: [] }
	return { pass: false, message: errorMsg }
}

export const updateUserValidator = (
	inputData: UpdateUserInput
): ValidatorResult => {
	const errorMsg: string[] = []
	if (inputData.name.length < 1) errorMsg.push('Tolong masukan nama pengguna')
	if (!isEmail(inputData.email))
		errorMsg.push('Tolong masukan email pengguna yang valid')
	if (inputData.registrationNumber.length < 1)
		errorMsg.push('Tolong masukan nomor registrasi/NIP')
	if (!isPhoneNumber(inputData.phoneNumber))
		errorMsg.push('Tolong masukan nomor hape yang valid')
	if (inputData.password || inputData.cPassword) {
		if (inputData.password.length < 8)
			errorMsg.push('Password minimal 8 karakter')
		else if (inputData.password !== inputData.cPassword) {
			errorMsg.push('Konfirmasi password tidak sama')
		}
	}
	if (errorMsg.length === 0) return { pass: true, message: [] }
	return { pass: false, message: errorMsg }
}

export const deleteUserValidator = (
	inputData: DeleteUserInput
): ValidatorResult => {
	const errorMsg: string[] = []
	if (digitLength(inputData.id) < 1) errorMsg.push('ID Pengguna tidak ada')
	if (errorMsg.length === 0) {
		return { pass: true, message: [] }
	}
	return { pass: false, message: errorMsg }
}

export const createPatroliNonLoginValidator = (
	inputData: AddPatroliNonLoginUserInput
): ValidatorResult => {
	const errorMsg: string[] = []
	if (inputData.name.length < 1) errorMsg.push('Tolong masukan nama pengguna')
	if (digitLength(inputData.role) < 1)
		errorMsg.push('Tolong pilih hak akses pengguna')
	if (errorMsg.length === 0) {
		return { pass: true, message: [] }
	}
	return { pass: false, message: errorMsg }
}

export const updatePatroliNonLoginValidator = (
	inputData: UpdatePatroliNonLoginUserInput
): ValidatorResult => {
	const errorMsg: string[] = []
	if (digitLength(inputData.id) < 1) errorMsg.push('Tidak ada ID pengguna')
	if (inputData.name.length < 1) errorMsg.push('Tolong masukan nama pengguna')
	if (digitLength(inputData.role) < 1)
		errorMsg.push('Tolong pilih hak akses pengguna')
	if (errorMsg.length === 0) {
		return { pass: true, message: [] }
	}
	return { pass: false, message: errorMsg }
}

export const deletePatroliNonLoginValidator = (
	inputData: DeletePatroliNonLoginUserInput
): ValidatorResult => {
	const errorMsg: string[] = []
	if (digitLength(inputData.id) < 1) errorMsg.push('ID hak akses tidak ada')
	if (errorMsg.length === 0) {
		return { pass: true, message: [] }
	}
	return { pass: false, message: errorMsg }
}

export const createNonPatroliValidator = (
	inputData: CreateNonPatroliUser
): ValidatorResult => {
	const errorMsg: string[] = []
	if (digitLength(inputData.id) < 1) errorMsg.push('ID pengguna tidak ada')
	if (digitLength(inputData.role) < 1)
		errorMsg.push('Tolong pilih hak akses pengguna')
	// if (inputData.organization.length < 1)
	//   errorMsg.push("Tolong pilih Daops/Balai");
	if (errorMsg.length === 0) {
		return { pass: true, message: [] }
	}
	return { pass: false, message: errorMsg }
}

export const updateNonPatroliValidator = (
	inputData: NonPatroliUserData
): ValidatorResult => {
	const errorMsg: string[] = []
	if (digitLength(inputData.id) < 1) errorMsg.push('ID Pengguna tidak ada')
	if (digitLength(inputData.role) < 1)
		errorMsg.push('Tolong pilih hak akses pengguna')
	if (errorMsg.length === 0) {
		return { pass: true, message: [] }
	}
	return { pass: false, message: errorMsg }
}

export const deleteNonPatroliValidator = (
	inputData: DeleteNonPatroliUser
): ValidatorResult => {
	const errorMsg: string[] = []
	if (digitLength(inputData.accessId) < 1)
		errorMsg.push('ID Akses Pengguna tidak ada')
	if (errorMsg.length === 0) {
		return { pass: true, message: [] }
	}
	return { pass: false, message: errorMsg }
}
