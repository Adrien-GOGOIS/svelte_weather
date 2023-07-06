<script lang="ts">
	import type { Cat } from "./Cats";
	import Cats from "./CatsList.svelte";

	const cats: Cat[] = [{
		name: 'shoshana',
		weight: 3,
		age: 9,
		color: 'blanche'
	},
	{
		name: 'jacques',
		weight: 5,
		age: 17,
		color: 'roux'
	}]
</script>

<main>
	<h1>CHATS</h1>
	{#each cats as cat}
		<Cats cat={cat}/>
	{/each}
</main>