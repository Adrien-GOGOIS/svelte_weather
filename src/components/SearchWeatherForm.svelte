<script lang="ts">
	import type { CitySuggestion, CurrentWeatherResponse } from "../routes/types/Cities";
	import {PUBLIC_API_KEY} from '$env/static/public';
	import CitySuggestionInput from "./CitySuggestionInput.svelte";
	import CurrentWeatherCard from "./CurrentWeatherCard.svelte";

	let displayLocation: string = '';
	let city: CitySuggestion;
	let cityCurrentWeather: CurrentWeatherResponse;
	let citiesSuggestions: CitySuggestion[] = [];

	let adviseText: string;

	$: if(cityCurrentWeather?.current.condition.text === 'Light rain') {
		adviseText = 'Take your umbrella !'
	}

	const handleInput = (event: any) => { 
		event.preventDefault()
		fetch(`http://api.weatherapi.com/v1/search.json?key=${PUBLIC_API_KEY}&q=${event.target.value}`)
		.then(response => response.json())
		.then((response) => {
			citiesSuggestions = response as CitySuggestion[];
		})
	}
	
	const setInputVal = (citySelected: CitySuggestion) => {
		city = citySelected
		citiesSuggestions = [];
		hiLiteIndex = 0;
	}			

	const submitValue = () => {
		if (!city) { 
			alert("You didn't type anything.")
		}
		displayLocation = `${city.name}, ${city.region}, ${city.country}`
		const {lat, lon} = city;
		getCurrentWeather(lat, lon);
	}

	const getCurrentWeather = (latitude: number, longitude: number): void => {
		fetch(`http://api.weatherapi.com/v1/current.json?key=${PUBLIC_API_KEY}&q=${latitude} ${longitude}&aqi=no`)
		.then(response => response.json())
		.then((response: CurrentWeatherResponse) => {
			cityCurrentWeather = response;
		})
	}
	
	let hiLiteIndex: number = 0;
	
	const navigateList = (event: KeyboardEvent) => {
			if (event.key === "ArrowDown" && hiLiteIndex <= citiesSuggestions.length - 1) {
				hiLiteIndex === null ? hiLiteIndex = 0 : hiLiteIndex += 1
			} else if (event.key === "ArrowUp" && hiLiteIndex !== null) {
				hiLiteIndex === 0 ? hiLiteIndex = citiesSuggestions.length - 1 : hiLiteIndex -= 1
			} else if (event.key === "Enter") {
				setInputVal(citiesSuggestions[hiLiteIndex]);
			} else {
				return;
			}
	}	 
</script>

<svelte:window on:keydown={navigateList} />

<form autocomplete="off" on:submit|preventDefault={submitValue} class="container">
  <div class="autocomplete input-group mb-3">
	<input 
		type="text" 
		id="city-input" 
		class="form-control" 
		placeholder="Entrez un nom de ville" 
		bind:value={displayLocation}
		on:input={handleInput}
	>
  </div>
  <button type="submit" class="btn btn-success">On croise les doigts...</button>
	{#if citiesSuggestions.length > 0}
		<ul id="autocomplete-items-list">
			{#each citiesSuggestions as city, index}
				<CitySuggestionInput 
					itemLabel={`${city.name}, ${city.region}, ${city.country}`} 
					highlighted={index === hiLiteIndex} 
					on:click={() => setInputVal(city)} 
				/>
			{/each}			
		</ul>
	{/if}
</form>

<CurrentWeatherCard {cityCurrentWeather}/>

{#if adviseText}
	<h3>{adviseText}</h3>
{/if}
	
<style>
div.autocomplete {
  /*the container must be positioned relative:*/
  position: relative;
  display: inline-block;
  width: 300px;
}
input {
  border: 1px solid transparent;
  background-color: #f1f1f1;
  padding: 10px;
  font-size: 16px;
  margin: 0;
}
input[type=text] {
  background-color: #f1f1f1;
  width: 100%;
}
input[type=submit] {
  background-color: DodgerBlue;
  color: #fff;
}
#autocomplete-items-list {
	position: absolute;
	margin: 0;
	padding: 0;
	top: 10;
	width: 297px;
	border: 1px solid #ddd;
	background-color: #ddd;
}	
</style>	