<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Lang } from '$lib/types';
	import { onMount } from 'svelte';
	import '../app.css';

	onMount(() => {
		const lang = localStorage.getItem('lang') as Lang | null;

		if (lang) goto(`/${lang}`);
	});
</script>

<slot />
