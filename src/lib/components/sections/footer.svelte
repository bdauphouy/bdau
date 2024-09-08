<script lang="ts">
	import type { Lang, PageContent } from '$lib/types';

	export let content: PageContent['footer'] & { lastUpdate: Date; lang: Lang };

	$: lastUpdate = content.lastUpdate.toLocaleDateString(content.lang, {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
</script>

<footer
	class="flex flex-col justify-between gap-2 p-6 text-sm text-secondary/60 md:flex-row md:px-12 md:pb-10"
>
	<p>{content.text}</p>
	<p>{content.lastUpdateTitle} {lastUpdate}.</p>
</footer>
