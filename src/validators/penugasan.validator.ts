import { ValidatorResult } from '../interfaces'

export const uploadPenugasanValidator = (
	file: File,
	type: string
): ValidatorResult => {
	const errorMsg: string[] = []
	if (!file)
		errorMsg.push('Tolong pilih berkas penugasan yang ingin diunggah')
	if (!type) errorMsg.push('Tolong pilih kategori penugasan')
	if (errorMsg.length === 0) {
		return { pass: true, message: [] }
	}
	return { pass: false, message: errorMsg }
}
