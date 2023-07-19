<script lang="ts">
	import { Mood, WeatherText } from "../types/Mood";

	export let weatherText: string;

	const getMoodText = (weather: string): string => {
		if(weather === WeatherText.RAIN_AND_THUNDER) {
			return Mood.THUNDER
		}
		if(weather === WeatherText.LIGHT_RAIN || weather === WeatherText.RAIN || weather === WeatherText.SHOWER) {
			return Mood.UMBRELLA
		}
		if(weather === WeatherText.MIST) {
			return Mood.BLIND
		}
		if(weather === WeatherText.OVERCAST) {			
			return Mood.CAREFUL
		}
		if(weather === WeatherText.SUNNY || weather === WeatherText.CLEAR || weather === WeatherText.PARTLY_CLOUDY) {
			return Mood.GRUMPY
		}
		return '';
	}	
</script>

<div class="text-center">
	<h3>{getMoodText(weatherText)}</h3>
</div>