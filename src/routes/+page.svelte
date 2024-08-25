<script lang="ts">
	import Project from '$lib/components/project.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="flex justify-start py-32 md:justify-center">
	<h1 class="text-6xl font-medium leading-tight md:whitespace-pre">
		{data.content.title}
	</h1>
</section>

<section class="py-32">
	<ul class="grid grid-cols-3 gap-10">
		{#each data.content.projects as project}
			<li>
				<Project {project} />
			</li>
		{/each}
	</ul>
</section>
