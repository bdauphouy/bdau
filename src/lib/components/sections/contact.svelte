<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import type { PageContent, PageGlobals } from '$lib/types';

	export let content: PageContent['contact'] & { globals: PageGlobals };
</script>

<section
	id="contact-section"
	class="flex flex-col-reverse gap-12 py-12 md:gap-20 md:py-[10vh] lg:grid lg:grid-cols-3"
>
	<div class="col-span-2">
		<h3 class="text-4xl font-medium lg:text-5xl">
			{content.title}
		</h3>
		<div class="mt-10 flex flex-col items-start gap-2 border-b-4 border-secondary/20 pb-6">
			<a
				class="rounded-full text-3xl font-medium transition-colors duration-300 hover:text-secondary/80 focus-visible:text-secondary/80 lg:text-4xl"
				href={`mailto:${content.globals.email}`}
			>
				{content.globals.email}
			</a>
		</div>
	</div>
	<div class="col-start-1 row-start-1 flex max-w-sm flex-col justify-between gap-8">
		<p class="text-lg">
			{content.subtitle}
		</p>
		<ul class="flex gap-4">
			{#each Object.entries(content.globals.socials) as [name, url]}
				<li class="flex">
					<Button as="a" href={url}>
						{name.charAt(0).toUpperCase() + name.slice(1)}
					</Button>
				</li>
			{/each}
		</ul>
	</div>
</section>
