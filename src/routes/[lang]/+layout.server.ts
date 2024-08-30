import { languages } from '$lib';
import type { Lang, PageContent, PageGlobals } from '$lib/types';
import { getLastUpdate } from '$lib/utils/getLastUpdate';
import en from '$static/content/en.json';
import es from '$static/content/es.json';
import fr from '$static/content/fr.json';
import globals from '$static/content/globals.json';
import type { LayoutServerLoad } from './$types';

export const prerender = true;

export const load: LayoutServerLoad = async ({ params }) => {
	const lastUpdate = await getLastUpdate();
	const files: Record<Lang, PageContent> = { en, fr, es };

	let lang: Lang = params.lang as Lang;

	if (!languages.includes(lang)) lang = 'en';

	return {
		content: {
			...files[lang],
			globals: globals as PageGlobals
		},
		languages,
		lang,
		lastUpdate
	};
};
