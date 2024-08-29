<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Header languages={data.languages} lang={data.lang} />

<main class="relative mx-auto max-w-7xl p-6 md:px-12 md:py-10">
	<slot />
</main>
