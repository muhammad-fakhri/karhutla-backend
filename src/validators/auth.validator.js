export default class AuthValidator {
	static login(inputData) {
		let errorMsg = ''
		let emailError = false
		let passwordError = false
		if (inputData.email.length < 1 && inputData.password.length < 1) {
			emailError = true
			passwordError = true
			errorMsg = 'Tolong masukkan email dan password anda'
		} else if (inputData.password.length < 1) {
			passwordError = true
			errorMsg = 'Tolong masukkan password anda'
		} else if (inputData.email.length < 1) {
			emailError = true
			errorMsg = 'Tolong masukkan email anda'
		}
		if (errorMsg.length == 0) {
			return { pass: true }
		} else {
			return { pass: false, message: errorMsg, emailError, passwordError }
		}
	}
}
