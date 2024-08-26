export type Lang = 'en' | 'fr' | 'es';

export type Badge = {
	handle: string;
	title: string;
};

export type Link = {
	handle: string;
	title: string;
	url: string;
};

export type Project = {
	handle: string;
	title: string;
	description: string;
	badges?: Badge[];
	links?: Link[];
};

export type PageContent = {
	landing: {
		title: string;
		badges?: Badge[];
	};
	resume: {
		title: string;
	};
	projects: (Pick<Project, 'handle' | 'description' | 'badges'> & {
		links?: Pick<Link, 'handle' | 'title'>[];
	})[];
	contact: {
		title: string;
		subtitle: string;
	};
	footer: {
		text: string;
	};
};

export type PageGlobals = {
	isAvailable: boolean;
	email: string;
	socials: {
		github: string;
		linkedin: string;
		x: string;
	};
	projects: (Pick<Project, 'title' | 'handle'> & { links?: Pick<Link, 'handle', 'url'>[] })[];
};
