export type Lang = 'en' | 'fr' | 'es';

export type Project = {
	title: string;
	handle: string;
	description: string;
	badgeText?: string;
	githubUrl: string;
	siteUrl: string;
};

export type PageContent = {
	landing: {
		title: string;
		resume: {
			title: string;
			url: string;
		};
	};
	projects: Project[];
	contact: {
		title: string;
		email: string;
		socials: {
			github: string;
			linkedin: string;
			x: string;
		};
	};
	footer: {
		text: string;
	};
};
