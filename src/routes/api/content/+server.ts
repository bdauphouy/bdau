import fs from 'node:fs';
import path from 'node:path';
import yaml from 'yaml';

import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const lang = url.searchParams.get('lang') || 'en';

	const rawYamlContent = fs.readFileSync(path.resolve(`static/content/${lang}.yml`), 'utf8');
	const parsedYamlContent = yaml.parse(rawYamlContent);

	return json(parsedYamlContent);
};
