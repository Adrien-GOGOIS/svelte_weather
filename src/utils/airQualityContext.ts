export const getAirQualityContext = (airQualityIndex: number): string => {
	if (airQualityIndex === 1) {
		return 'bg-good'
	}
	if (airQualityIndex === 2) {
		return 'bg-moderate'
	}
	if (airQualityIndex === 3) {
		return 'bg-unhealthy-for-some'
	}
	if (airQualityIndex === 4) {
		return 'bg-unhealthy'
	}
	if (airQualityIndex === 5) {
		return 'bg-very-unhealthy'
	}
	if (airQualityIndex === 6) {
		return 'bg-hazardous'
	}
	return ''
}