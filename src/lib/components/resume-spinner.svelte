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
			class="translate-x-1/2 translate-y-1/2"
		/>
		<text
			class="text-md fill-secondary font-medium tracking-wide transition-[letter-spacing,_fill] group-focus-within:fill-secondary/60 group-hover:fill-secondary/60 group-hover:tracking-widest"
		>
			<textPath href="#text-diameter">
				<tspan>
					{text}
					<tspan class="transition-opacity duration-300 group-hover:opacity-0">
						&nbsp; - &nbsp;{text}
					</tspan>
				</tspan>
			</textPath>
		</text>
	</svg>
	<a
		href={url}
		download="Baptiste DAUPHOUY.pdf"
		class="absolute left-0 top-0 flex h-full w-full rotate-90 items-center justify-center rounded-full text-2xl transition-[transform,_color] duration-300 hover:rotate-0 hover:text-secondary/60 focus:text-secondary/60 md:text-3xl"
		on:mouseenter={handleMouseEnter}
		on:mouseleave={handleMouseLeave}
		on:focus={handleMouseEnter}
		on:blur={handleMouseLeave}
	>
		&RightArrow;
	</a>
</div>
