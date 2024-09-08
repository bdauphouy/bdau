<script lang="ts">
	import Meta from '$lib/components/meta.svelte';
	import Contact from '$lib/components/sections/contact.svelte';
	import Landing from '$lib/components/sections/landing.svelte';
	import Projects from '$lib/components/sections/projects.svelte';
	import Timeline from '$lib/components/sections/timeline.svelte';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { onDestroy } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

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
	content={{ ...data.content.landing, ...{ globals: data.content.globals, lang: data.lang } }}
/>

<Projects content={data.content.projects} />

<Timeline content={{ ...{ globals: data.content.globals }, ...data.content.timeline }} />

<Contact content={{ ...data.content.contact, ...{ globals: data.content.globals } }} />
