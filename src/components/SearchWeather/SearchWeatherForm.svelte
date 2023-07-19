<script lang="ts">
	import {PUBLIC_API_KEY} from '$env/static/public';
	import type { CitySuggestion } from '../../types/Cities';
	import CitySuggestionInput from './CitySuggestionInput.svelte';

	let hiLiteIndex: number = 0;
	let citiesSuggestions: CitySuggestion[] = [];
	let displayLocation: string = '';
	export let city: CitySuggestion;

	const handleInput = (event: any) => { 
		event.preventDefault()
		fetch(`http://api.weatherapi.com/v1/search.json?key=${PUBLIC_API_KEY}&q=${event.target.value}`)
		.then(response => response.json())
		.then((response) => {
			citiesSuggestions = response as CitySuggestion[];
		})
	}

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
	
	const setInputVal = (citySelected: CitySuggestion) => {
		city = citySelected
		const {name, country} = city;
		displayLocation = `${name}, ${country}`
		citiesSuggestions = [];
		hiLiteIndex = 0;
	}	
</script>

<svelte:window on:keydown={navigateList} />

<form autocomplete="off" on:submit|preventDefault class="container text-center mt-5">
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
	<button type="submit" class="btn border border-dark border-2 mb-1 ms-3">Recherche</button>
	  {#if citiesSuggestions.length > 0}
		  <ul id="autocomplete-items-list text-center w-50">
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

  <style>
	div.autocomplete {
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