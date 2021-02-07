/**
 * Split string and trim the output
 * @param string input string
 * @param sep separator
 */
const splitAndTrim = (string, sep) => {
	const splittedString = string.split(sep)
	for (let i = 0; i < splittedString.length; i += 1) {
		splittedString[i] = splittedString[i].trim()
	}
	return splittedString
}

export default splitAndTrim
