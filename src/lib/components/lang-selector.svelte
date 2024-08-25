<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let options: string[];
	export let defaultOption: string;

	const dispatch = createEventDispatcher();

	const handleChange = (event: Event) => {
		const select = event.target as HTMLSelectElement;
		const selectedOption = select.options[select.selectedIndex].value;

		dispatch('change', selectedOption);
	};
</script>

<select on:change={handleChange} class="rounded-full bg-transparent text-lg font-medium">
	{#each options as option}
		<option value={option} selected={defaultOption === option}>{option}</option>
	{/each}
</select>
