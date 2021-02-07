/**
 * Calculates how many days the difference between date2 and date1
 * Simple Logic : date1 - date2 = output
 * @param date1 input date
 * @param date2 input date
 * @returns num of day differences (int)
 */
export const calcDayDifference = (date1, date2) => {
	const oneDayTimeMillis = 1000 * 60 * 60 * 24
	const calcResult =
		Math.round(date1.getTime() - date2.getTime()) / oneDayTimeMillis
	return calcResult.toFixed(0)
}

/**
 * Check date1 is greater than date2 or not
 * @param date1 input date
 * @param date2 input date
 * @returns true if date1 >= date2 and vice versa
 */
export const isGreaterThan = (date1, date2) =>
	Date.parse(date1) >= Date.parse(date2)

/**
 * Format date to YYYY-MM-DD
 * @param date input date
 * @returns true if date1 >= date2 and vice versa
 */
export const formatYYYYMMDD = (date) => date.toISOString().split('T')[0]
