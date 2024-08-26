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
		isAvailable: boolean;
		badges: {
			available: string;
			unavailable: string;
			location: string;
		};
	};
	resume: {
		title: string;
	};
	projects: Project[];
	contact: {
		title: string;
		subtitle: string;
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
