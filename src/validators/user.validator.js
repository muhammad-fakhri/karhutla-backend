import {
	isEmail,
	isNumeric,
	isPhoneNumber,
	digitLength
} from './helper.validator'

class UserValidator {
	static createUser(inputData) {
		const errorMsg = new Array()
		if (inputData.name.length < 1)
			errorMsg.push('Tolong masukan nama pengguna')
		if (!isEmail(inputData.email))
			errorMsg.push('Tolong masukan email pengguna yang valid')
		if (inputData.registrationNumber.length < 1)
			errorMsg.push('Tolong masukan nomor registrasi/NIP')
		if (!isPhoneNumber(inputData.phone))
			errorMsg.push('Tolong masukan nomor hape yang valid')
		if (inputData.password.length < 8)
			errorMsg.push('Password minimal 8 karakter')
		if (
			inputData.password !== inputData.cPassword &&
			inputData.password.length > 7
		) {
			errorMsg.push('Konfirmasi password tidak sama')
		}
		if (errorMsg.length == 0) {
			return { pass: true }
		}
		return { pass: false, message: errorMsg }
	}

	static updateUser(inputData) {
		const errorMsg = new Array()
		if (inputData.name.length < 1)
			errorMsg.push('Tolong masukan nama pengguna')
		if (!isEmail(inputData.email))
			errorMsg.push('Tolong masukan email pengguna yang valid')
		if (inputData.registrationNumber.length < 1)
			errorMsg.push('Tolong masukan nomor registrasi/NIP')
		if (!isPhoneNumber(inputData.phone))
			errorMsg.push('Tolong masukan nomor hape yang valid')
		if (errorMsg.length == 0) {
			return { pass: true }
		}
		return { pass: false, message: errorMsg }
	}

	static deleteUser(inputData) {
		const errorMsg = new Array()
		if (digitLength(inputData.id) < 1)
			errorMsg.push('ID Pengguna tidak ada')
		if (errorMsg.length == 0) {
			return { pass: true }
		}
		return { pass: false, message: errorMsg }
	}

	static createPatroliNonLogin(inputData) {
		const errorMsg = new Array()
		if (inputData.name.length < 1)
			errorMsg.push('Tolong masukan nama pengguna')
		if (digitLength(inputData.role) < 1)
			errorMsg.push('Tolong pilih hak akses pengguna')
		if (errorMsg.length == 0) {
			return { pass: true }
		}
		return { pass: false, message: errorMsg }
	}

	static updatePatroliNonLogin(inputData) {
		const errorMsg = new Array()
		if (digitLength(inputData.name) < 1)
			errorMsg.push('Tidak ada ID pengguna')
		if (inputData.name.length < 1)
			errorMsg.push('Tolong masukan nama pengguna')
		if (digitLength(inputData.role) < 1)
			errorMsg.push('Tolong pilih hak akses pengguna')
		if (errorMsg.length == 0) {
			return { pass: true }
		}
		return { pass: false, message: errorMsg }
	}

	static deletePatroliNonLogin(inputData) {
		const errorMsg = new Array()
		if (digitLength(inputData.id) < 1)
			errorMsg.push('ID hak akses tidak ada')
		if (errorMsg.length == 0) {
			return { pass: true }
		}
		return { pass: false, message: errorMsg }
	}

	static createNonPatroli(inputData) {
		const errorMsg = new Array()
		if (digitLength(inputData.id) < 1)
			errorMsg.push('ID pengguna tidak ada')
		if (digitLength(inputData.role) < 1)
			errorMsg.push('Tolong pilih hak akses pengguna')
		// if (inputData.organization.length < 1)
		//   errorMsg.push("Tolong pilih Daops/Balai");
		if (errorMsg.length == 0) {
			return { pass: true }
		}
		return { pass: false, message: errorMsg }
	}

	static updateNonPatroli(inputData) {
		const errorMsg = new Array()
		if (digitLength(inputData.id) < 1)
			errorMsg.push('ID Pengguna tidak ada')
		if (digitLength(inputData.role) < 1)
			errorMsg.push('Tolong pilih hak akses pengguna')
		if (errorMsg.length == 0) {
			return { pass: true }
		}
		return { pass: false, message: errorMsg }
	}

	static deleteNonPatroli(inputData) {
		const errorMsg = new Array()
		if (digitLength(inputData.accessId) < 1)
			errorMsg.push('ID Akses Pengguna tidak ada')
		if (errorMsg.length == 0) {
			return { pass: true }
		}
		return { pass: false, message: errorMsg }
	}
}
export default UserValidator
