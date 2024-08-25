<script lang="ts">
	export let as: 'button' | 'a' = 'button';
	export let href: string = '';
</script>

<svelte:element
	this={as}
	{...href && { href }}
	class="group/button relative rounded-full bg-secondary px-3 py-1 text-sm font-medium text-primary ring-2 ring-secondary/20 transition-[padding] duration-300 hover:pr-8"
>
	<slot />
	<div
		class="absolute ml-2 inline-block opacity-0 transition-opacity duration-300 group-hover/button:opacity-100"
	>
		&RightArrow;
	</div>
</svelte:element>
