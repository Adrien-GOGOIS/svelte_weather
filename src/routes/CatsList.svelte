<script lang="ts">
	import type { Cat } from "./Cats";

	export let cat: Cat;
</script>

<div>
	<ul>
		<li>Nom: {cat.name}</li>
		<li>Couleur: {cat.color}</li>
		<li>Poids: {cat.weight}kg</li>
		<li>Âge: {cat.age} ans</li>
	</ul>
</div>