<script lang="ts">
	import type { CitySuggestion, CurrentWeatherResponse } from "../types/Cities";
	import {PUBLIC_API_KEY} from '$env/static/public';
	import CurrentWeatherCard from "../components/CurrentWeatherCard.svelte";
	import { AirQualityIndex, type AirQuality } from "../types/AirQuality";
	import CurrentAirQualityCard from "../components/CurrentAirQualityCard.svelte";
	import SearchWeatherForm from "../components/SearchWeather/SearchWeatherForm.svelte";
	import ErrorModal from "../components/ErrorModal.svelte";
	import { getAirQualityContext } from "../utils/airQualityContext";

	let city: CitySuggestion;
	let cityCurrentWeather: CurrentWeatherResponse;
	let airQuality: AirQuality;
	let airQualityIndexDescription: string;
	let airQualityBackground: string;
	let displayErrorModal: boolean;

	const submitValue = async () => {
		if (!city) { 
			displayErrorModal = true;
		}
		const {lat, lon} = city;
		await getCurrentWeather(lat, lon);
	}

	const getCurrentWeather = async (latitude: number, longitude: number): Promise<void> => {
		fetch(`http://api.weatherapi.com/v1/current.json?key=${PUBLIC_API_KEY}&q=${latitude} ${longitude}&aqi=yes`)
		.then(response => response.json())
		.then((response) => {
			cityCurrentWeather = response;
			airQuality = {
				...response.current.air_quality,
				us_epa_index: response.current.air_quality['us-epa-index'],
				gb_defra_index: response.current.air_quality['gb-defra-index'],
			} as AirQuality;
			let airQualityIndex: number = airQuality.us_epa_index;
			airQualityIndexDescription = Object.values(AirQualityIndex)[airQualityIndex];
			airQualityBackground = getAirQualityContext(airQuality.us_epa_index);
		})
	}	
</script>

<div>
	<SearchWeatherForm on:submit={submitValue} bind:city={city}/>
	<div>
		{#if displayErrorModal}
			<ErrorModal bind:displayErrorModal={displayErrorModal} modalText="Veuillez renseigner une ville"/>
		{/if}
		{#if cityCurrentWeather}
			<CurrentWeatherCard {cityCurrentWeather}/>
			<CurrentAirQualityCard 
				airQualityBackground={airQualityBackground} 
				airQualityIndexDescription={airQualityIndexDescription} 
				airQuality={airQuality} 
			/>
		{/if}
	</div>
</div>