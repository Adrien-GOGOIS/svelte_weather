<script lang="ts">
	import type { CitySuggestion, CurrentWeatherResponse } from "../types/Cities";
	import {PUBLIC_API_KEY} from '$env/static/public';
	import CurrentWeatherCard from "../components/CurrentWeatherCard.svelte";
	import type { AirQuality } from "../types/AirQuality";
	import CurrentAirQualityCard from "../components/CurrentAirQualityCard.svelte";
	import SearchWeatherForm from "../components/SearchWeather/SearchWeatherForm.svelte";

	let city: CitySuggestion;
	let cityCurrentWeather: CurrentWeatherResponse;
	let airQuality: AirQuality;

	const submitValue = async () => {
		if (!city) { 
			alert("You didn't type anything.")
		}
		const {lat, lon} = city;
		await getCurrentWeather(lat, lon);
	}

	const getCurrentWeather = async (latitude: number, longitude: number): Promise<void> => {
		fetch(`http://api.weatherapi.com/v1/current.json?key=${PUBLIC_API_KEY}&q=${latitude} ${longitude}&aqi=yes`)
		.then(response => response.json())
		.then((response: any) => {
			cityCurrentWeather = response as CurrentWeatherResponse;
			// TODO : Type problem below with data received with '-'
			airQuality = {
				...response.current.air_quality,
				us_epa_index: response.current.air_quality['us-epa-index'],
				gb_defra_index: response.current.air_quality['gb-defra-index'],
			} as AirQuality;
		})
	}	
</script>

<div>
	<SearchWeatherForm on:submit={submitValue} bind:city={city}/>
	<div>
		{#if cityCurrentWeather}
			<CurrentWeatherCard {cityCurrentWeather}/>
			<CurrentAirQualityCard {airQuality}/>
		{/if}
	</div>
</div>