<script lang="ts">
	import Meta from '$lib/components/meta.svelte';
	import Contact from '$lib/components/sections/contact.svelte';
	import Landing from '$lib/components/sections/landing.svelte';
	import Projects from '$lib/components/sections/projects.svelte';
	import Timeline from '$lib/components/sections/timeline.svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import Lenis from 'lenis';
	import { onDestroy, onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	onMount(() => {
		const lenis = new Lenis();

		lenis.on('scroll', ScrollTrigger.update);

		gsap.ticker.add((time) => {
			lenis.raf(time * 1000);
		});

		gsap.ticker.lagSmoothing(0);
	});

	onDestroy(() => {
		ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
	});
</script>

<Meta
	content={{
		...data.content.meta.portfolio,
		...{ globals: data.content.globals, lang: data.lang }
	}}
/>

<Landing
	content={{
		...data.content.landing,
		...{ globals: data.content.globals, lang: data.lang },
		location: data.location
	}}
/>

<Projects content={data.content.projects} />

<Timeline content={{ ...{ globals: data.content.globals }, ...data.content.timeline }} />

<Contact content={{ ...data.content.contact, ...{ globals: data.content.globals } }} />
