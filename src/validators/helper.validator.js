export const isNumeric = (value) => {
	return /^\d+$/.test(value)
}

export const isEmail = (value) => {
	return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
}

export const isPhoneNumber = (value) => {
	return /^(^\+62)\d{11,12}$/.test(value)
}

export const digitLength = (number) => {
	return number.toString().length
}
