export const getRequestTime = (time: number): string => {
	const date = new Date(time * 1000);
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	return `${hours}:${minutes}`;
}