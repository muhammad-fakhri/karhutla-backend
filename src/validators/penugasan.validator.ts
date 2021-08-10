import { ValidatorResult } from '@interface'

export const uploadPenugasanValidator = (
	file: File,
	type: string
): ValidatorResult => {
	let errorMsg = ''
	if (!file) errorMsg = 'Tolong pilih berkas penugasan yang ingin diunggah'
	else if (!type) errorMsg = 'Tolong pilih kategori penugasan'

	if (errorMsg) return { pass: false, message: errorMsg }
	return { pass: true, message: '' }
}
