import fs from 'node:fs';
import path from 'node:path';
import yaml from 'yaml';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ request, url }) => {
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

	const rawYamlContent = fs.readFileSync(path.resolve(`static/content/${lang}.yml`), 'utf8');
	const parsedYamlContent = yaml.parse(rawYamlContent);

	return { content: parsedYamlContent, languages, lang };
};
