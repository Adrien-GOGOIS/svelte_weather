<script lang="ts">
	import type { CitySuggestion } from "../routes/types/Cities";
	import {PUBLIC_API_KEY} from '$env/static/public';

	let city: string | null = '';
	let suggestions: CitySuggestion[] = [];
	const handleCity = (event: any) => { 
		event.preventDefault()
		city = event.target.value;
		fetch(`http://api.weatherapi.com/v1/search.json?key=${PUBLIC_API_KEY}&q=${city}`)
		.then(response => response.json())
		.then((response) => {
			suggestions = response as CitySuggestion[];
		})
	}
</script>

<div class="container">
	<form>
		<div class="form-group">
			<label for="city">Entre le nom de ta ville :</label>
			<input type="text" id="city" class="form-control" placeholder={city} on:input={handleCity}>
		</div>
		<button class="btn btn-success" type="submit">Submit</button>
		{#if suggestions.length > 0}
			{#each suggestions as suggestion}
				<p>{suggestion.name}, {suggestion.region}, {suggestion.country}</p>
			{/each}
		{/if}
	</form>
</div>