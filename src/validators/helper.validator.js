export const isNumeric = (value) => {
	return /^\d+$/.test(value)
}

export const isEmail = (value) => {
	return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
}

export const isPhoneNumber = (value) => {
	return /^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/.test(value)
}

export const digitLength = (number) => {
	return number.toString().length
}
