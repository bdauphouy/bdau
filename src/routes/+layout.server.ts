import type { PageContent } from '$lib/types';
import fs from 'node:fs';
import path from 'node:path';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ request, url, fetch }) => {
	const langSearchParam = url.searchParams.get('lang');

	const languages = fs
		.readdirSync(path.resolve('static/content/'))
		.map((file) => file.replace('.yml', ''));

	let lang = languages[0];

	if (langSearchParam && languages.includes(langSearchParam)) {
		lang = langSearchParam;
	} else {
		const acceptLanguageHeader = request.headers.get('accept-language');

		if (acceptLanguageHeader) {
			const parsedAcceptLanguage = acceptLanguageHeader
				.split(',')
				.map((lang) => ({ language: lang.split(';q=')[0] }));

			for (const { language } of parsedAcceptLanguage) {
				if (languages.includes(language)) {
					lang = language;
					break;
				}
			}
		}
	}

	const response = await fetch(`/api/content?lang=${lang}`);
	const content: PageContent = await response.json();

	return { content, languages, lang };
};
