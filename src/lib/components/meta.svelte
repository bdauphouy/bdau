<script lang="ts">
	import { page } from '$app/stores';
	import type { Lang, PageContent, PageGlobals } from '$lib/types';

	export let content: PageContent['meta'] & { globals: PageGlobals; lang: Lang };
</script>

<svelte:head>
	<title>{content.title}</title>
	<meta name="description" content={content.description} />
	<meta name="robots" content="index, follow" />
	<meta name="author" content={content.globals.meta.name} />
	<meta name="theme-color" content={content.globals.meta.theme} />
	<meta property="og:title" content={content.title} />
	<meta property="og:description" content={content.description} />
	<meta property="og:image" content="https://bdau.fr/images/meta/og-image.png" />
	<meta property="og:url" content="https://{$page.url.host}/{content.lang}" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={content.globals.meta.name} />
	<meta property="og:locale" content={content.lang} />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={content.title} />
	<meta name="twitter:description" content={content.description} />
	<meta property="twitter:image" content="https://bdau.fr/images/meta/og-image.png" />
	<meta property="twitter:url" content="https://{$page.url.host}/{content.lang}" />
	<meta name="twitter:site" content={content.globals.meta.twitter} />
	<meta name="twitter:creator" content={content.globals.meta.twitter} />
	<meta name="keywords" content={content.globals.meta.keywords} />
</svelte:head>
