import { ValidatorResult, DeletePenugasanInput } from '@interface'

import { digitLength } from '@util'
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

export const deletePenugasanValidator = (
	inputData: DeletePenugasanInput
): ValidatorResult => {
	if (digitLength(inputData.id) < 1)
		return { pass: false, message: 'ID Penugasan tidak ada' }
	return { pass: true, message: '' }
}
