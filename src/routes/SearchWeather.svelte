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
	let isLoading: boolean = false;

	const submitValue = async () => {
		if (!city) { 
			displayErrorModal = true;
		}
		const {lat, lon} = city;
		await getCurrentWeather(lat, lon);
	}

	const handlePosition = () => {
		isLoading = true;
		const options = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0,
		};

		async function success(position: { coords: any; }) {
			const crd = await position.coords;
			await getCurrentWeather(crd.latitude, crd.longitude)
		}

		function error(error: { code: any; message: any; }) {
			console.warn(`ERROR(${error.code}): ${error.message}`);
		}

		navigator.geolocation.getCurrentPosition(success, error, options);
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
			isLoading = false;
		})
	}	
</script>

<div>
	<div class="row d-flex justify-content-center align-items-center">
		<SearchWeatherForm on:submit={submitValue} bind:city={city}/>
		<button class="btn border border-dark border-2 mb-1 ms-3 w-25" on:click={handlePosition}>Et chez moi ?</button>
	</div>
	<div>
		{#if isLoading}
			<div class="d-flex justify-content-center mt-5">
				<div class="spinner-border" role="status">
				<span class="visually-hidden">Loading...</span>
				</div>
			</div>
		{/if}
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