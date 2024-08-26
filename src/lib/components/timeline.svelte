<script lang="ts">
	import type { TimelineItem } from '$lib/types';
	import { gsap } from 'gsap';
	import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { createEventDispatcher, onMount } from 'svelte';

	gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

	export let items: TimelineItem[];

	const dispatch = createEventDispatcher();

	let pointsPositions: number[] = [];

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
					const currentRoundedProgress = Math.round(progress * 50) / 50;

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

	const getPointPosition = (date: string) => {
		const dateInMs = new Date(date).getTime();
		const firstDateInMs = new Date(items[0].date).getTime();
		const lastDateInMs = new Date(items[items.length - 1].date).getTime();

		return Math.round(((dateInMs - firstDateInMs) / (lastDateInMs - firstDateInMs)) * 50) / 50;
	};

	const getAllPointsPositions = () => {
		for (const item of items) {
			pointsPositions = [...pointsPositions, getPointPosition(item.date)];
		}
	};

	onMount(() => {
		getAllPointsPositions();
		handlePicturePathFollowing();
		handleItemPointsPlacing();
	});
</script>

<img
	src="/images/logo.png"
	alt="Baptiste Dauphouy"
	id="circle"
	class="absolute h-6 w-6 rounded-full md:h-8 md:w-8"
/>
<svg viewBox="0 0 10.5 8" xmlns="http://www.w3.org/2000/svg">
	{#each items as _, i}
		<circle id="point-{i}" r="0.1" class="fill-secondary" />
	{/each}
	<path
		id="timeline-path"
		d="M9,1 L3,1 C1,1 1,3 3,3 L7,3 C9,3 9,5 7,5 L3,5 C1,5 1,7 3,7 L9,7"
		stroke-width="0.1"
		stroke-linecap="round"
		class="fill-none stroke-secondary"
	/>
</svg>
