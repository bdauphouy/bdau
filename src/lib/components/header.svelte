<script lang="ts">
	import { goto } from '$app/navigation';
	import LangSelector from './lang-selector.svelte';

	export let languages: string[];
	export let lang: string;

	const handleLangChange = (event: CustomEvent<string>) => {
		localStorage.setItem('lang', event.detail);

		goto(`/?lang=${event.detail}`);
	};
</script>

<header class="mx-auto flex max-w-7xl items-start justify-between px-6 pt-10 md:px-12">
	<a href="/" class="overflow-hidden rounded-full">
		<img src="/images/logo.png" alt="Baptiste Dauphouy" class="h-16 w-16" />
	</a>
	<LangSelector options={languages} defaultOption={lang} on:change={handleLangChange} />
</header>
