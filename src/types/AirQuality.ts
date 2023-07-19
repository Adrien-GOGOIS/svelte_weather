export type AirQuality = { 
	co: number, 
	no2: number, 
	o3: number, 
	so2: number, 
	pm2_5: number, 
	pm10: number, 
	us_epa_index: number, 
	gb_defra_index: number 
}

export enum AirQualityIndex {
	NO_DATA = 'bg-light',
	GOOD = 'bg-success',
	MODERATE = 'bg-info',
	UNHEALTHY_FOR_SOME = 'bg-primary',
	UNHEALTHY = 'bg-warning',
	VERY_UNHEALTHY = 'bg-danger',
	HAZARDOUS = 'bg-dark',
}