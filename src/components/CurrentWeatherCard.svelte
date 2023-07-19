<script lang="ts">
	import type { CurrentWeatherResponse } from "../types/Cities";
	import { getRequestTime } from "../utils/dateService";

	export let cityCurrentWeather: CurrentWeatherResponse;
</script>


{#if cityCurrentWeather}
	<section>
		<div class="container py-5 h-100">
			<div class="row d-flex justify-content-center align-items-center h-100">
				<div class="col-md-8 col-lg-6 col-xl-4">
					<div class="card">
						<div class="card-body p-4">
							<div class="d-flex">
								<h6 class="flex-grow-1">{cityCurrentWeather.location.name}, {cityCurrentWeather.location.country}</h6>
								<h6>{getRequestTime(cityCurrentWeather.location.localtime_epoch)}</h6>
							</div>
				
							<div class="d-flex flex-column text-center mt-5 mb-4">
								<h6 class="display-4 mb-0 font-weight-bold">{cityCurrentWeather.current.temp_c}°C </h6>
								<span class="small">{cityCurrentWeather.current.condition.text}</span>
							</div>
				
							<div class="d-flex align-items-center">
								<div class="flex-grow-1">
									<div><span class="ms-1">{cityCurrentWeather.current.wind_kph} km/h</span></div>
									<div><span class="ms-1">{cityCurrentWeather.current.humidity} %</span></div>
									<div><span class="ms-1"> {cityCurrentWeather.current.precip_mm} mm </span></div>
								</div>
								<div>
								<img src={cityCurrentWeather.current.condition.icon} alt="Current weather icon" width="90px">
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
{/if}