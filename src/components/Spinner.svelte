<div class="container mt-5">
	<div class="dot m-1"></div>
	<div class="dot m-1"></div>
	<div class="dot m-1"></div>
</div>

<style>
	.dot {
		display: inline-block;
		width: 15px;
		height: 15px;
		border-radius: 20%;
	}

	@keyframes jumpingAnimation {
		0% {
			background-color: #0b8a59;
			transform: translate3d(0, 0, 0);
		}
		50% {
			transform: translate3d(0, 25px, 0);
		}
		100% {
			background-color: #0b538a;
			transform: translate3d(0, 0, 0);
		}
	}

	.container .dot:nth-last-child(1) {
		animation: jumpingAnimation 0.7s 0.1s ease-in infinite;
	}
	.container .dot:nth-last-child(2) {
		animation: jumpingAnimation 0.7s 0.2s ease-in infinite;
	}
	.container .dot:nth-last-child(3) {
		animation: jumpingAnimation 0.7s 0.3s ease-in infinite;
	}

</style>