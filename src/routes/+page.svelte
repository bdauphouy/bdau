<script lang="ts">
	import Badge from '$lib/components/badge.svelte';
	import Button from '$lib/components/button.svelte';
	import Project from '$lib/components/project.svelte';
	import ResumeSpinner from '$lib/components/resume-spinner.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="sticky top-6 z-30 -mt-6">
	<div class="absolute right-0">
		<ResumeSpinner url="/resumes/{data.lang}.pdf" text={data.content.resume.title} />
	</div>
</div>

<section class="flex justify-start py-32 md:justify-center">
	<div class="flex flex-col gap-8">
		<div class="flex items-center gap-4">
			<Badge variant="secondary">
				<span
					class="{data.content.landing.isAvailable
						? 'bg-green-500'
						: 'bg-red-500'} mr-2 block h-1 w-1 rounded-full"
				></span>
				{data.content.landing.badges[
					data.content.landing.isAvailable ? 'available' : 'unavailable'
				]}
			</Badge>
			<Badge variant="secondary">{data.content.landing.badges.location}</Badge>
		</div>
		<h1 class="text-5xl font-medium leading-tight md:whitespace-pre lg:text-6xl lg:leading-tight">
			{data.content.landing.title}
		</h1>
	</div>
</section>

<section class="py-32">
	<ul class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
		{#each data.content.projects as project}
			<li>
				<Project {project} />
			</li>
		{/each}
	</ul>
</section>

<section class="flex flex-col gap-20 py-32 lg:grid lg:grid-cols-3">
	<div class="flex max-w-sm flex-col justify-between gap-8">
		<p class="text-lg">
			{data.content.contact.subtitle}
		</p>
		<ul class="flex gap-4">
			{#each Object.entries(data.content.contact.socials) as [name, url]}
				<li class="flex">
					<Button as="a" href={url}>
						{name.charAt(0).toUpperCase() + name.slice(1)}
					</Button>
				</li>
			{/each}
		</ul>
	</div>
	<div class="col-span-2">
		<h3 class="text-4xl font-medium lg:text-5xl">
			{data.content.contact.title}
		</h3>
		<div class="mt-10 flex flex-col items-start gap-2 border-b-4 border-secondary/20 pb-6">
			<a
				class="rounded-full text-3xl font-medium transition-colors duration-300 hover:text-secondary/80 focus:text-secondary/80 lg:text-4xl"
				href={`mailto:${data.content.contact.email}`}
			>
				{data.content.contact.email}
			</a>
		</div>
	</div>
</section>

<footer class="text-left text-sm text-secondary/60">
	<p>{data.content.footer.text}</p>
</footer>
