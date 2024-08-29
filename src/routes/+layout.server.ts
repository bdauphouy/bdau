import { languages } from '$lib';
import type { Lang } from '$lib/types';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ request, params }) => {
	if (params.lang) return;

	let lang: Lang = 'en';

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

	redirect(302, `/${lang}`);
};
