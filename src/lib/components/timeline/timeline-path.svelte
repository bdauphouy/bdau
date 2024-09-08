<script lang="ts">
	import type { TimelineItem } from '$lib/types';
	import { gsap } from 'gsap';
	import { createEventDispatcher, onMount } from 'svelte';

	export let items: TimelineItem[];

	const dispatch = createEventDispatcher();

	let pointsPositions: number[] = [];
	let beforeTimelineOffsetHeight = 0;
	let timelineSection: HTMLElement;

	const getPointPosition = (date: string) => {
		const dateInMs = new Date(date).getTime();
		const firstDateInMs = new Date(items[0].date).getTime();
		const lastDateInMs = new Date(items[items.length - 1].date).getTime();

		return Math.floor(((dateInMs - firstDateInMs) / (lastDateInMs - firstDateInMs)) * 50) / 50;
	};

	const getAllPointsPositions = () => {
		for (const item of items) {
			pointsPositions = [...pointsPositions, getPointPosition(item.date)];
		}
	};

	const getBeforeTimelineOffsetHeight = () => {
		timelineSection = document.querySelector('#timeline-section')!;
		const sections = document.querySelectorAll('section');

		for (const section of sections) {
			if (section === timelineSection) break;

			beforeTimelineOffsetHeight += section.offsetHeight;
		}
	};

	const handlePicturePathFollowing = () => {
		let roundedProgress = 0;

		const timeline = gsap.timeline({
			scrollTrigger: {
				trigger: '#timeline-section',
				start: 'center center',
				end: `${innerHeight * 10} top`,
				scrub: true,
				pin: true,
				onUpdate: ({ progress }) => {
					const currentRoundedProgress = Math.floor(progress * 50) / 50;

					if (currentRoundedProgress === roundedProgress) return;

					roundedProgress = currentRoundedProgress;

					if (pointsPositions.includes(roundedProgress)) {
						dispatch('intersect', pointsPositions.indexOf(roundedProgress));
					}
				}
			}
		});

		timeline.to('#circle', {
			motionPath: {
				path: '#timeline-path',
				align: '#timeline-path',
				alignOrigin: [0.5, 0.5]
			},
			ease: 'none'
		});
	};

	const handleItemPointsPlacing = () => {
		const timeline = gsap.timeline();

		for (const [i, item] of items.entries()) {
			timeline.to(`#point-${i}`, {
				motionPath: {
					path: '#timeline-path',
					end: pointsPositions[i]
				},
				duration: 0
			});
		}
	};

	const handlePointClick = (i: number) => {
		scrollTo({
			top:
				pointsPositions[i] * (innerHeight * 10 + timelineSection.offsetTop) +
				beforeTimelineOffsetHeight,
			left: 0,
			behavior: 'smooth'
		});
	};

	onMount(() => {
		getAllPointsPositions();
		handleItemPointsPlacing();
		getBeforeTimelineOffsetHeight();
		handlePicturePathFollowing();
	});
</script>

<img
	src="/images/timeline/me.png"
	alt="Baptiste Dauphouy"
	id="circle"
	class="absolute h-6 w-6 rounded-full ring-2 ring-secondary/20 md:h-8 md:w-8"
/>
<svg viewBox="0 0 10.5 8" xmlns="http://www.w3.org/2000/svg">
	<path
		id="timeline-path"
		d="M9,1 L3,1 C1,1 1,3 3,3 L7,3 C9,3 9,5 7,5 L3,5 C1,5 1,7 3,7 L9,7"
		stroke-width="0.1"
		stroke-linecap="round"
		class="fill-none stroke-secondary"
	/>
	{#each items as _, i}
		<!-- svelte-ignore a11y-invalid-attribute -->
		<a
			href="#"
			class="group hidden cursor-pointer focus-visible:outline-none lg:block"
			on:click|preventDefault={() => handlePointClick(i)}
		>
			<circle
				id="point-{i}"
				r="0.1"
				class="fill-secondary transition-colors duration-300 group-hover:fill-secondary/60 group-focus-visible:fill-blue-500"
			/>
		</a>
		<circle
			id="point-{i}"
			r="0.1"
			class="block fill-secondary transition-colors duration-300 group-hover:fill-secondary/60 group-focus-visible:fill-blue-500 lg:hidden"
		/>
	{/each}
</svg>
