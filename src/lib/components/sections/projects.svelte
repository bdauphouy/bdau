<script lang="ts">
	import Project from '$lib/components/projects/project.svelte';
	import type { PageContent } from '$lib/types';

	export let content: PageContent['projects'];
</script>

<section id="projects-section" class="py-12 md:py-[10vh]">
	<ul class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
		{#each content as project}
			<li>
				<Project {project} />
			</li>
		{/each}
	</ul>
</section>
