<script lang="ts">
	export let displayErrorModal: boolean;
	export let modalText: string;
	const closeModal = () => {
		displayErrorModal = false;
	}
</script>

<div class="overlay"></div>
<div class="card content" style="">
	<div class="card-body">
	  <h6 class="card-text">{modalText}</h6>
	  <button class="btn btn-danger btn-sm close-modal" on:click={(closeModal)}>X</button>
	</div>
  </div>

<style>
	.overlay {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.3);
	}
	.content {
		position: absolute;
		border: 1px solid black;
		background: white;
		padding: 5px 0 0 0;
		top: 40%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.close-modal {
		position: absolute;
		left: 93%;
		bottom: 75%;
	}
</style>