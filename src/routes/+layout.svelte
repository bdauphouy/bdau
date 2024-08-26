<script lang="ts">
	import { goto } from '$app/navigation';
	import Header from '$lib/components/header.svelte';
	import type { Lang } from '$lib/types';
	import { onMount } from 'svelte';
	import '../app.css';
	import type { PageData } from './$types';

	export let data: PageData;

	onMount(() => {
		const lang = localStorage.getItem('lang') as Lang | null;

		if (lang && lang !== data.lang) {
			data.lang = lang;

			goto(`/?lang=${data.lang}`);
		}
	});
</script>

<Header languages={data.languages} lang={data.lang} />

<main class="relative mx-auto max-w-7xl p-6 md:px-12 md:py-10">
	<slot />
</main>
