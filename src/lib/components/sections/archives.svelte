<script lang="ts">
	import Project from '$lib/components/projects/project.svelte';
	import type { PageContent } from '$lib/types';
	import { gsap } from 'gsap';
	import { onMount } from 'svelte';

	export let content: PageContent['archives'];

	onMount(() => {
		gsap.fromTo(
			'#archives-section li',
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

<section id="archives-section">
	<ul class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
		{#each content as project}
			<li>
				<Project {project} isArchive />
			</li>
		{/each}
	</ul>
</section>
