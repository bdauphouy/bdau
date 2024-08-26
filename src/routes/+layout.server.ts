import type { Lang, PageContent, PageGlobals } from '$lib/types';
import en from '$static/content/en.json';
import es from '$static/content/es.json';
import fr from '$static/content/fr.json';
import globals from '$static/content/globals.json';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ request, url }) => {
	const langSearchParam = url.searchParams.get('lang') as Lang | null;

	const files: Record<Lang, PageContent> = { en, fr, es };
	const languages = Object.keys(files);

	let lang: Lang = 'en';

	if (langSearchParam && languages.includes(langSearchParam)) {
		lang = langSearchParam;
	} else {
		const acceptLanguageHeader = request.headers.get('accept-language');

		if (acceptLanguageHeader) {
			const parsedAcceptLanguage = acceptLanguageHeader
				.split(',')
				.map((lang) => ({ language: lang.split(';q=')[0] })) as { language: Lang }[];

			for (const { language } of parsedAcceptLanguage) {
				if (languages.includes(language)) {
					lang = language;
					break;
				}
			}
		}
	}

	return {
		content: {
			...files[lang],
			globals: globals as PageGlobals
		},
		languages,
		lang
	};
};
