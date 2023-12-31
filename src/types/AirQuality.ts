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
	NO_DATA = 'Aucune donnée',
	GOOD = 'Bonne',
	MODERATE = 'Moyenne',
	UNHEALTHY_FOR_SOME = 'Dégradée',
	UNHEALTHY = 'Mauvaise',
	VERY_UNHEALTHY = 'Très mauvaise',
	HAZARDOUS = 'Extrêmement mauvaise',
}