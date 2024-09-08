<script lang="ts">
	import Project from '$lib/components/projects/project.svelte';
	import type { PageContent } from '$lib/types';
	import { gsap } from 'gsap';
	import { onMount } from 'svelte';

	export let content: PageContent['projects'];

	onMount(() => {
		gsap.fromTo(
			'#projects-section li',
			{
				opacity: 0,
				y: 20
			},
			{
				opacity: 1,
				y: 0,
				stagger: 0.03,
				duration: 0.6,
				ease: 'power2.out'
			}
		);
	});
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
