<script lang="ts">
	import Meta from '$lib/components/meta.svelte';
	import Archives from '$lib/components/sections/archives.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Meta
	content={{
		...data.content.meta.archives,
		...{ globals: data.content.globals, lang: data.lang }
	}}
/>

<Archives content={data.content.archives} />
