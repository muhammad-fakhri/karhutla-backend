class PenugasanValidator {
	static uploadPenugasan(file, type) {
		const errorMsg = []
		if (!file)
			errorMsg.push('Tolong pilih berkas penugasan yang ingin diunggah')
		if (!type) errorMsg.push('Tolong pilih kategori penugasan')
		if (errorMsg.length === 0) {
			return { pass: true }
		}
		return { pass: false, message: errorMsg }
	}
}
export default PenugasanValidator
