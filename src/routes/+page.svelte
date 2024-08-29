<script lang="ts">
	import Badge from '$lib/components/badge.svelte';
	import Button from '$lib/components/button.svelte';
	import Project from '$lib/components/project.svelte';
	import ResumeSpinner from '$lib/components/resume-spinner.svelte';
	import Timeline from '$lib/components/timeline.svelte';
	import { fade } from 'svelte/transition';
	import type { PageData } from './$types';

	export let data: PageData;

	let currentTimelineItemIndex = 0;

	const getProjectGlobals = (handle: string) =>
		data.content.globals.projects.find((project) => project.handle === handle)!;

	$: orderedTimelineItems = data.content.timeline.items.sort(
		(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
	);

	$: currentTimelineItem = orderedTimelineItems[currentTimelineItemIndex];

	const handleTimelineItemIntersect = (event: CustomEvent<number>) => {
		currentTimelineItemIndex = event.detail;
	};
</script>

<section class="flex justify-start pb-12 pt-20 md:justify-center md:py-32">
	<div class="flex flex-col gap-8">
		{#if data.content.landing.badges && data.content.landing.badges.length > 0}
			<ul class="flex flex-wrap items-center gap-4">
				{#each data.content.landing.badges as badge}
					{#if badge.handle === 'available'}
						{#if data.content.globals.isAvailable}
							<Badge variant="secondary">
								<span class="mr-2 h-1 w-1 rounded-full bg-green-500"></span>
								{badge.title}
							</Badge>
						{/if}
					{:else if badge.handle === 'unavailable'}
						{#if !data.content.globals.isAvailable}
							<Badge variant="secondary">
								<span class="mr-2 h-1 w-1 rounded-full bg-red-500"></span>
								{badge.title}
							</Badge>
						{/if}
					{:else}
						<Badge variant="secondary">{badge.title}</Badge>
					{/if}
				{/each}
			</ul>
		{/if}
		<h1 class="text-5xl font-medium leading-tight md:whitespace-pre lg:text-6xl lg:leading-tight">
			{data.content.landing.title}
		</h1>
	</div>
	<div class="absolute right-6 top-0 md:right-12">
		<ResumeSpinner url="/resumes/{data.lang}.pdf" text={data.content.resume.title} />
	</div>
</section>

<section class="py-12 md:py-32">
	<ul class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
		{#each data.content.projects as project}
			{@const projectGlobals = getProjectGlobals(project.handle)}
			<li>
				<Project
					project={{
						...project,
						...projectGlobals,
						links:
							projectGlobals.links &&
							projectGlobals.links.map((link) => ({
								...(project.links && project.links.find(({ handle }) => handle === link.handle)),
								...link
							}))
					}}
				/>
			</li>
		{/each}
	</ul>
</section>

<section
	id="timeline-section"
	class="flex h-screen flex-col-reverse justify-end gap-12 py-12 md:gap-20 lg:grid lg:h-auto lg:grid-cols-2 lg:py-32"
>
	<div class="flex max-w-sm flex-col gap-12 lg:max-w-full">
		{#key currentTimelineItemIndex}
			<h2 in:fade class="text-4xl font-medium lg:text-5xl">
				{currentTimelineItem.title}
			</h2>
			<div in:fade={{ delay: 200 }} class="flex flex-col gap-8">
				<p class="text-lg">
					{currentTimelineItem.text}
				</p>
				<div class="flex flex-col gap-6 md:flex-row md:gap-8">
					{#if currentTimelineItem.technologies && currentTimelineItem.technologies.length > 0}
						<div class="flex flex-col gap-4">
							<h3 class="text-md font-medium text-secondary/60">
								{data.content.timeline.technologiesTitle}
							</h3>
							<ul class="flex items-center gap-4">
								{#each currentTimelineItem.technologies as technology}
									<li>
										<Badge variant="secondary">{technology}</Badge>
									</li>
								{/each}
							</ul>
						</div>
					{/if}
					{#if currentTimelineItem.members && currentTimelineItem.members.length > 0}
						<div class="flex flex-col gap-4">
							<h3 class="text-md font-medium text-secondary/60">
								{data.content.timeline.membersTitle}
							</h3>
							<ul class="flex flex-wrap items-center gap-4">
								{#each currentTimelineItem.members as member}
									<li class="flex">
										<Button as="a" href={member.link}>{member.name}</Button>
									</li>
								{/each}
							</ul>
						</div>
					{/if}
				</div>
			</div>
		{/key}
	</div>
	<div class="flex w-80 flex-col items-center self-center md:w-1/2 lg:w-full">
		<Timeline items={orderedTimelineItems} on:intersect={handleTimelineItemIntersect} />
		<Badge variant="secondary">Scroll to explore</Badge>
	</div>
</section>

<section class="flex flex-col-reverse gap-12 py-12 md:gap-20 md:py-32 lg:grid lg:grid-cols-3">
	<div class="col-span-2">
		<h3 class="text-4xl font-medium lg:text-5xl">
			{data.content.contact.title}
		</h3>
		<div class="mt-10 flex flex-col items-start gap-2 border-b-4 border-secondary/20 pb-6">
			<a
				class="rounded-full text-3xl font-medium transition-colors duration-300 hover:text-secondary/80 focus:text-secondary/80 lg:text-4xl"
				href={`mailto:${data.content.globals.email}`}
			>
				{data.content.globals.email}
			</a>
		</div>
	</div>
	<div class="col-start-1 row-start-1 flex max-w-sm flex-col justify-between gap-8">
		<p class="text-lg">
			{data.content.contact.subtitle}
		</p>
		<ul class="flex gap-4">
			{#each Object.entries(data.content.globals.socials) as [name, url]}
				<li class="flex">
					<Button as="a" href={url}>
						{name.charAt(0).toUpperCase() + name.slice(1)}
					</Button>
				</li>
			{/each}
		</ul>
	</div>
</section>

<footer class="text-left text-sm text-secondary/60">
	<p>{data.content.footer.text}</p>
</footer>
