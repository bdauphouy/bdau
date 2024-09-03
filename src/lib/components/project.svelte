<script lang="ts">
	import type { Project } from '$lib/types';
	import Badge from './badge.svelte';
	import Button from './button.svelte';

	export let project: Project;
</script>

<div class="group relative overflow-hidden rounded-lg ring-2 ring-secondary/20">
	<div class="relative bg-primary">
		{#if project.badges && project.badges.length > 0}
			<ul
				class="group-focus-visible-within:opacity-0 absolute right-0 top-0 z-10 m-3 flex flex-wrap items-center gap-2 opacity-100 transition-opacity duration-300 group-hover:opacity-0"
			>
				{#each project.badges as badge}
					<li>
						<Badge>{badge.title}</Badge>
					</li>
				{/each}
			</ul>
		{/if}
		<img
			class="group-focus-visible-within:opacity-25 group-focus-visible-within:blur-sm transition-all duration-300 group-hover:opacity-25 group-hover:blur-sm"
			src="/images/projects/{project.id}.png"
			alt={project.title}
		/>
	</div>
	<div
		class="focus-visible-within:opacity-100 absolute inset-0 left-0 top-0 z-20 flex h-full w-full cursor-pointer flex-col justify-center gap-1 px-5 py-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
	>
		<h2 class="text-lg font-medium text-secondary">{project.title}</h2>
		<p class="w-4/5 text-sm text-secondary/60">{project.description}</p>
		{#if project.links && project.links.length > 0}
			<ul class="mt-4 flex gap-4">
				{#each project.links as link}
					<li class="flex">
						<Button as="a" href={link.url}>{link.title}</Button>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
