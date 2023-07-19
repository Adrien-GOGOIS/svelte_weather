<script lang="ts">
	import type { AirQuality } from "../types/AirQuality";
	import type { CurrentWeatherResponse } from "../types/Cities";

	export let cityCurrentWeather: CurrentWeatherResponse;
	export let airQuality: AirQuality;
</script>


{#if airQuality}
	<section>
		<div class="container py-5 h-100">
	
		<div class="row d-flex justify-content-center align-items-center h-100">
			<div class="col-md-8 col-lg-6 col-xl-4">
	
			<div class="card">
				<div class="card-body p-4">
				<div class="d-flex">
					<h6 class="flex-grow-1">{cityCurrentWeather.location.name}, {cityCurrentWeather.location.country}</h6>
					<h6>15:07</h6>
				</div>
	
				<div class="d-flex flex-column text-center mt-4 mb-4">
					<h6 class="display-4 mb-0 font-weight-bold">{airQuality.us_epa_index}</h6>
					<span class="small">Indice de pollution</span>
				</div>
				<div class="d-flex align-items-center small mt-4">
					<div class="flex-grow-1">
						<div><span class="ms-1">Ozone (O₃): {airQuality.o3.toFixed(2)}µg/m³</span></div>
						<div><span class="ms-1">Dioxyde d'Azote (NO₂): {airQuality.no2.toFixed(2)}µg/m³</span></div>
						<div><span class="ms-1">Particules (PM₁₀): {airQuality.pm10.toFixed(2)}µg/m³</span></div>
						<div><span class="ms-1">Particules fines (PM₂.₅): {airQuality.pm2_5.toFixed(2)}µg/m³</span></div>
					</div>
				</div>
	
				</div>
			</div>
	
			</div>
		</div>
	
		</div>
	</section>
{/if}