<script lang="ts">
	export let as: 'button' | 'a' = 'button';
	export let href: string = '';
</script>

<svelte:element
	this={as}
	on:click
	{...href && { href }}
	class="{as === 'a'
		? 'transition-[padding] hover:pr-8 focus-visible:pr-8'
		: 'transition-colors hover:bg-secondary/60 focus-visible:bg-secondary/60'} group/button relative rounded-full bg-secondary px-3 py-1 text-sm font-medium text-primary ring-2 ring-secondary/20 duration-300"
>
	<slot />
	{#if as === 'a'}
		<div
			class="absolute ml-2 inline-block opacity-0 transition-opacity duration-300 group-hover/button:opacity-100 group-focus-visible/button:opacity-100"
		>
			&RightArrow;
		</div>
	{/if}
</svelte:element>
