<script lang="ts">
	import type { AirQuality } from "../types/AirQuality";

	export let airQuality: AirQuality;
	export let airQualityIndexDescription: string
	export let airQualityBackground: string
</script>

<section>
	<div class="container py-5 h-100">
		<div class="row d-flex justify-content-center align-items-center h-100">
			<div class="col-md-8 col-lg-6 col-xl-4">
				<div class={`card ${airQualityBackground}`}>
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

<style>
	.bg-good {
		background-color: rgba(129, 237, 229, 0.9);
	}
	.bg-moderate {
		background-color: rgba(116, 201, 172, 0.9);
	}
	.bg-unhealthy-for-some {
		background-color: rgba(238, 229, 97, 0.9);
	}
	.bg-unhealthy {
		background-color: rgba(236, 94, 87, 0.9);
	}
	.bg-very-unhealthy {
		background-color: rgba(137, 26, 52, 0.9);
		color: white;
	}
	.bg-hazardous {
		background-color: rgba(115, 40, 125, 0.9);
		color: white;
	}
</style>