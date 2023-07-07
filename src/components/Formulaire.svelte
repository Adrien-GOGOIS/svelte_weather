<script lang="ts">
	import type { CitySuggestion } from "../routes/types/Cities";
	import {PUBLIC_API_KEY} from '$env/static/public';
	import CitySuggestionInput from "./CitySuggestionInput.svelte";

	let searchInput: HTMLInputElement;
	let city: CitySuggestion | null;
	let citiesSuggestions: CitySuggestion[] = [];

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

<form autocomplete="off" on:submit|preventDefault={submitValue}>
  <div class="autocomplete">
    <input 
		id="city-input" 
		type="text" 
		placeholder="Search City Names" 
		bind:this={searchInput}
		on:input={handleInput}
	>
  </div>
  <input type="submit">
	{#if citiesSuggestions.length > 0}
		<ul id="autocomplete-items-list">
			{#each citiesSuggestions as city, i}
				<CitySuggestionInput 
					itemLabel={`${city.name}, ${city.region}, ${city.country}`} 
					highlighted={i === hiLiteIndex} 
					on:click={() => setInputVal(city)} 
				/>
			{/each}			
		</ul>
	{/if}
</form>
	
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
	position: relative;
	margin: 0;
	padding: 0;
	top: 0;
	width: 297px;
	border: 1px solid #ddd;
	background-color: #ddd;
}	
</style>	