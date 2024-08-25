export type Project = {
	title: string;
	handle: string;
	description: string;
	badgeText?: string;
	githubUrl: string;
	siteUrl: string;
};

export type PageContent = {
	title: string;
	projects: Project[];
};

export type Lang = 'en' | 'fr' | 'es';
