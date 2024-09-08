<script lang="ts">
	import Badge from '$lib/components/badge.svelte';
	import type { Lang, PageContent, PageGlobals } from '$lib/types';
	import ResumeSpinner from '../landing/resume-spinner.svelte';

	export let content: PageContent['landing'] & { globals: PageGlobals; lang: Lang };
</script>

<section id="landing-section" class="flex justify-start pb-12 pt-20 md:justify-center md:py-[10vh]">
	<div class="flex flex-col gap-8">
		{#if content.badges && content.badges.length > 0}
			<ul class="flex flex-wrap items-center gap-4">
				{#each content.badges as badge}
					{#if badge.handle === 'available'}
						{#if content.globals.isAvailable}
							<Badge variant="secondary">
								<span class="mr-2 h-1 w-1 rounded-full bg-green-500"></span>
								{badge.title}
							</Badge>
						{/if}
					{:else if badge.handle === 'unavailable'}
						{#if !content.globals.isAvailable}
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
			{content.title}
		</h1>
	</div>
	<div class="absolute right-6 top-0 md:right-12">
		<ResumeSpinner url="/resumes/{content.lang}.pdf" text={content.resume.title} />
	</div>
</section>
