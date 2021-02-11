import { AuthValidatorResult, LoginInput } from '../interfaces'

export const loginValidator = (inputData: LoginInput): AuthValidatorResult => {
	const errorMsg: string[] = []
	let emailError = false
	let passwordError = false
	if (inputData.email.length < 1 && inputData.password.length < 1) {
		emailError = true
		passwordError = true
		errorMsg.push('Tolong masukkan email dan password anda')
	} else if (inputData.password.length < 1) {
		passwordError = true
		errorMsg.push('Tolong masukkan password anda')
	} else if (inputData.email.length < 1) {
		emailError = true
		errorMsg.push('Tolong masukkan email anda')
	}
	if (errorMsg.length === 0) {
		return { pass: true, message: [], emailError, passwordError }
	}
	return { pass: false, message: errorMsg, emailError, passwordError }
}
