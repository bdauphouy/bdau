<script lang="ts">
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import Badge from './badge.svelte';
	import Button from './button.svelte';

	export let currentTimelineItem;
	export let technologiesTitle;
	export let closeTitle;
	export let membersTitle;

	const dispatch = createEventDispatcher();

	const handleClose = () => {
		dispatch('close');
	};

	onMount(() => {
		document.body.style.overflow = 'hidden';
	});

	onDestroy(() => {
		document.body.style.overflow = 'auto';
	});
</script>

<div
	class="fixed -left-6 bottom-0 z-10 flex h-screen w-screen flex-col gap-12 overflow-auto bg-primary p-6 md:py-12 lg:hidden"
	in:slide={{ duration: 300 }}
	out:slide={{ duration: 300 }}
>
	<div class="self-end">
		<Button on:click={handleClose}>{closeTitle}</Button>
	</div>
	<h2 class="text-4xl font-medium lg:text-5xl">
		{currentTimelineItem.title}
	</h2>
	<div class="flex flex-col gap-8">
		<p class="text-lg">
			{currentTimelineItem.text}
		</p>
		<div class="flex flex-col gap-6 md:flex-row md:gap-8">
			{#if currentTimelineItem.technologies && currentTimelineItem.technologies.length > 0}
				<div class="flex flex-col gap-4">
					<h3 class="text-md font-medium text-secondary/60">
						{technologiesTitle}
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
						{membersTitle}
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
</div>
