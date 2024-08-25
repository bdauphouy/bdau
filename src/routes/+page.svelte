<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import Project from '$lib/components/project.svelte';
	import ResumeSpinner from '$lib/components/resume-spinner.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="flex justify-start py-32 md:justify-center">
	<h1 class="text-6xl font-medium leading-tight md:whitespace-pre">
		{data.content.landing.title}
	</h1>
	<div class="absolute right-6 top-10 md:right-12">
		<ResumeSpinner url="/resumes/{data.lang}.pdf" text={data.content.landing.resume.title} />
	</div>
</section>

<section class="py-32">
	<ul class="grid grid-cols-3 gap-10">
		{#each data.content.projects as project}
			<li>
				<Project {project} />
			</li>
		{/each}
	</ul>
</section>

<section class="grid grid-cols-3 gap-20 py-32">
	<div class="flex flex-col justify-between">
		<p class="text-lg">
			For any inqueries about me, you can contact me using my email or social networks.
		</p>
		<ul class="flex gap-4">
			{#each Object.entries(data.content.contact.socials) as [name, url]}
				<li class="">
					<Button href={url}>
						{name.charAt(0).toUpperCase() + name.slice(1)}
					</Button>
				</li>
			{/each}
		</ul>
	</div>
	<div class="col-span-2">
		<h3 class="text-5xl font-medium">
			{data.content.contact.title}
		</h3>
		<div class="mt-10 flex flex-col items-start gap-2 border-b-4 border-secondary/20 pb-6">
			<a
				class="rounded-full text-4xl font-medium transition-colors duration-300 hover:text-secondary/80"
				href={`mailto:${data.content.contact.email}`}
			>
				{data.content.contact.email}
			</a>
		</div>
	</div>
</section>

<footer class="item-end flex justify-between text-left text-sm text-secondary/60">
	<p>{data.content.footer.text}</p>
</footer>
