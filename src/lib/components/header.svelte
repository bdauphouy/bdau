<script lang="ts">
	import { goto } from '$app/navigation';
	import LangSelector from './lang-selector.svelte';

	export let languages: string[];
	export let lang: string;

	const handleLangChange = (event: CustomEvent<string>) => {
		localStorage.setItem('lang', event.detail);

		goto(`/${event.detail}`);
	};
</script>

<header class="mx-auto flex max-w-7xl items-start justify-between p-6 md:px-12 md:pt-10">
	<a href="/" class="h-12 w-12 origin-top-left overflow-hidden rounded-full">
		<img src="/images/logo.png" alt="Baptiste Dauphouy" />
	</a>
	<LangSelector options={languages} defaultOption={lang} on:change={handleLangChange} />
</header>
