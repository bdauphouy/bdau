<script lang="ts">
	import type { Project } from '$lib/types';
	import Badge from './badge.svelte';
	import Button from './button.svelte';

	export let project: Project;
</script>

<div class="group relative overflow-hidden rounded-lg ring-2 ring-secondary/20">
	<div class="relative bg-primary">
		{#if project.badgeText}
			<div
				class="absolute right-0 top-0 z-10 m-3 opacity-100 transition-opacity duration-300 group-focus-within:opacity-0 group-hover:opacity-0"
			>
				<Badge>{project.badgeText}</Badge>
			</div>
		{/if}
		<img
			class="transition-all duration-300 group-focus-within:opacity-25 group-focus-within:blur-sm group-hover:opacity-25 group-hover:blur-sm"
			src="/images/projects/{project.handle}.png"
			alt={project.title}
		/>
	</div>
	<div
		class="absolute inset-0 left-0 top-0 z-20 flex h-full w-full cursor-pointer flex-col justify-center gap-1 px-5 py-3 opacity-0 transition-opacity duration-300 focus-within:opacity-100 group-hover:opacity-100"
	>
		<h2 class="text-lg font-medium text-secondary">{project.title}</h2>
		<p class="w-4/5 text-sm text-secondary/60">{project.description}</p>
		<div class="mt-4 flex gap-4">
			<Button as="a" href={project.githubUrl}>See on Github</Button>
			<Button as="a" href={project.siteUrl}>Go to the site</Button>
		</div>
	</div>
</div>
