import fs from 'node:fs';
import path from 'node:path';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request, fetch }) => {
	const languages = fs
		.readdirSync(path.resolve('static/content/'))
		.map((file) => file.replace('.yml', ''));

	let lang = languages[0];

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

	const response = await fetch(`/api/content?lang=${lang}`);
	const content = await response.json();

	return { content };
};
