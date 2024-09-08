export type Lang = 'en' | 'fr' | 'es';

export type Badge = {
	handle: string;
	title: string;
};

export type Link = {
	title: string;
	url: string;
};

export type TimelineItemMember = {
	name: string;
	link: string;
};

export type TimelineItem = {
	date: string;
	title: string;
	text: string;
	link?: string;
	technologies?: string[];
	members?: TimelineItemMember[];
};

export type Project = {
	id: string;
	title: string;
	description: string;
	badges?: Badge[];
	links?: Link[];
};

export type MetaTags = {
	title: string;
	description: string;
	keywords: string;
};

export type PageContent = {
	meta: {
		portfolio: MetaTags;
		archives: MetaTags;
	};
	landing: {
		title: string;
		badges?: Badge[];
		resume: {
			title: string;
		};
	};
	projects: Project[];
	timeline: {
		technologiesTitle: string;
		membersTitle: string;
		linkTitle: string;
		learnMoreTitle: string;
		closeTitle: string;
		scrollToExploreTitle: string;
		items: TimelineItem[];
	};
	contact: {
		title: string;
		subtitle: string;
	};
	footer: {
		text: string;
		lastUpdateTitle: string;
		archivesTitle: string;
	};
	archives: Project[];
};

export type PageGlobals = {
	isAvailable: boolean;
	email: string;
	meta: {
		name: string;
		twitter: string;
		theme: string;
	};
	socials: {
		github: string;
		linkedin: string;
		malt: string;
		x: string;
	};
};
