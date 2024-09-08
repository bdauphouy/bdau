<script lang="ts">
	import Footer from '$lib/components/sections/footer.svelte';
	import Header from '$lib/components/sections/header.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Header languages={data.languages} lang={data.lang} />

<main class="relative p-6 md:px-12 md:py-10">
	<slot />
</main>

<Footer content={{ ...data.content.footer, ...{ lastUpdate: data.lastUpdate, lang: data.lang } }} />
