<script lang="ts">
	export let text: string;
	export let url: string;

	let interval: ReturnType<typeof setInterval> = setInterval(() => {}, 0);

	const getDiameter = (text: string) => {
		return Math.floor(text.length * 3.2);
	};

	const handleMouseEnter = () => {
		if (interval) clearInterval(interval);

		interval = setInterval(() => {
			if (diameter === Math.floor(getDiameter(text) * 0.8)) {
				clearInterval(interval);
				return;
			}

			diameter -= 1;
		}, 10);
	};

	const handleMouseLeave = () => {
		if (interval) clearInterval(interval);

		interval = setInterval(() => {
			if (diameter === getDiameter(text)) {
				clearInterval(interval);
				return;
			}

			diameter += 1;
		}, 10);
	};

	$: diameter = getDiameter(text);
</script>

<div class="group relative h-24 w-24 rounded-full md:h-32 md:w-32">
	<svg class="animate-spin [animation-duration:_10s]" viewBox="0 0 140 140">
		<path
			id="text-diameter"
			d="M {diameter},0 A {diameter},{diameter} 0 0 1 -{diameter},0 A {diameter},{diameter} 0 0 1 {diameter},0"
			fill="none"
			transform="translate(70, 70)"
		/>
		<text
			class="text-md group-focus-visible-within:fill-secondary/60 fill-secondary font-medium tracking-wide transition-[letter-spacing,_fill] group-hover:fill-secondary/60 group-hover:tracking-widest"
		>
			<textPath href="#text-diameter">
				<tspan>
					{text}
					<tspan
						class="group-focus-visible-within:opacity-0 transition-opacity duration-300 group-hover:opacity-0 firefox:group-hover:invisible"
					>
						&nbsp; - &nbsp;{text}
					</tspan>
				</tspan>
			</textPath>
		</text>
	</svg>
	<a
		href={url}
		download="Baptiste DAUPHOUY.pdf"
		class="absolute left-0 top-0 flex h-full w-full rotate-90 items-center justify-center rounded-full text-2xl transition-[transform,_color] duration-300 hover:rotate-0 hover:text-secondary/60 focus-visible:text-secondary/60 md:text-3xl"
		on:mouseenter={handleMouseEnter}
		on:mouseleave={handleMouseLeave}
		on:focus={handleMouseEnter}
		on:blur={handleMouseLeave}
	>
		&RightArrow;
	</a>
</div>
