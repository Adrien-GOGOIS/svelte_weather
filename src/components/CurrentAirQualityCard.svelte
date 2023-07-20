<script lang="ts">
	import { AirQualityIndex, type AirQuality } from "../types/AirQuality";

	export let airQuality: AirQuality;
	let airQualityIndexDescription: string;
	let airQualityBackground: string;

	const getAirQualityIndex = (airQualityIndex: number): string => {
		airQualityIndexDescription = Object.values(AirQualityIndex)[airQualityIndex];
		if (airQualityIndex === 1) {
			return 'bg-good'
		}
		if (airQualityIndex === 2) {
			return 'bg-moderate'
		}
		if (airQualityIndex === 3) {
			return 'bg-unhealthy-for-some'
		}
		if (airQualityIndex === 4) {
			return 'bg-unhealthy'
		}
		if (airQualityIndex === 5) {
			return 'bg-very-unhealthy'
		}
		if (airQualityIndex === 6) {
			return 'bg-hazardous'
		}
		return ''
	}
</script>

{#if airQuality}
	<section>
		<div class="container py-5 h-100">
			<div class="row d-flex justify-content-center align-items-center h-100">
				<div class="col-md-8 col-lg-6 col-xl-4">
					<div class={`card ${getAirQualityIndex(airQuality.us_epa_index)}`}>
						<div class="card-body p-4">
							<div class="d-flex">
								<h6 class="flex-grow-1">Indice de qualité de l'air</h6>
							</div>
							<div class="d-flex flex-column text-center mt-4 mb-4">
								<h6 class="display-4 mb-0 font-weight-bold">{airQuality.us_epa_index}</h6>
								<span class="small">{airQualityIndexDescription}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
{/if}

<style>
	.bg-good {
		background-color: rgba(129, 237, 229, 0.8);
	}
	.bg-moderate {
		background-color: rgba(122, 202, 163, 0.8);
	}
	.bg-unhealthy-for-some {
		background-color: rgba(238, 229, 97, 0.8);
	}
	.bg-unhealthy {
		background-color: rgba(233, 131, 82, 0.8);
	}
	.bg-very-unhealthy {
		background-color: rgba(225, 6, 43, 0.8);
		color: white;
	}
	.bg-hazardous {
		background-color: rgba(39, 13, 43, 0.8);
		color: white;
	}
</style>