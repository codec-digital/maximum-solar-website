<script>
	import { ArrowRight } from '@lucide/svelte';
	import { onMount } from 'svelte';

	// Props for customizing content
	export let heading = '100% Tasmanian owned and operated.';
	export let description =
		'Maximum Solar is a mission driven company providing exceptional solar energy solutions to the people of Tasmania and Australia. Our services offer peace of mind, high quality installations aimed at helping you reduce both your bills and carbon footprint all in one. Get a quote today. ';
	export let primaryCTA = 'Get your free quote';
	export let secondaryCTA = 'How much can I save?';
	export let videoSrc = '/src/lib/assets/videos/promo-video.mov';

	let videoElement;
	let loaded = false;

	function handleAnchorClick(event) {
		event.preventDefault();
		const link = event.currentTarget;
		const anchorId = new URL(link.href).hash.replace('#', '');
		const anchor = document.getElementById(anchorId);
		window.scrollTo({
			top: anchor.offsetTop - 100,
			behavior: 'smooth'
		});
	}

	onMount(() => {
		// Intersection Observer for lazy loading
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !loaded) {
						videoElement.load();
						loaded = true;
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1 }
		);

		observer.observe(videoElement);

		return () => {
			observer.disconnect();
		};
	});

	function handleLoadedData() {
		console.log('Video loaded and ready to play');
	}

	function handleError(e) {
		console.error('Video loading error:', e);
	}
</script>

<div id="about" class="mx-auto">
	<div class="relative isolate overflow-hidden bg-black px-6 py-24 text-center shadow-2xl sm:px-16">
		<h2 class="font-heading text-4xl font-semibold text-balance text-white sm:text-5xl">
			{heading}
		</h2>
		<p class="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-white">
			{description}
		</p>
		<div class="mt-10 flex flex-col items-center justify-center gap-x-6 gap-y-4 lg:flex-row">
			<a
				href="/residential-solar"
				class="all rounded-full bg-[#FFC640] px-8 py-4 text-base font-medium text-black transition hover:bg-[#FFC640]/80 sm:text-lg"
			>
				Residential Solar
			</a>
			<a
				href="/commercial-solar"
				class="all rounded-full bg-[#FFC640] px-8 py-4 text-base font-medium text-black transition hover:bg-[#FFC640]/80 sm:text-lg"
			>
				Commercial Solar
			</a>
		</div>

		<div class="mx-auto mt-12 max-w-7xl overflow-hidden rounded-xl">
			<div class="relative aspect-video w-full bg-gray-800">
				<div class="mx-auto mb-12 flex max-w-7xl items-center justify-center shadow-2xl lg:mb-20">
					<video
						bind:this={videoElement}
						preload="metadata"
						controls
						loop
						playsinline
						on:loadeddata={handleLoadedData}
						on:error={handleError}
						class="w-full"
					>
						<source src={videoSrc} type="video/mp4" />
						Your browser does not support the video tag.
					</video>
				</div>
			</div>
		</div>
	</div>
</div>
