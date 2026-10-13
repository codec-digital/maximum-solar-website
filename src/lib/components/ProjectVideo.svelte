<script>
	let { src, poster, label, class: className = '' } = $props();

	let videoElement = $state();
	let reducedMotion = $state(false);

	$effect(() => {
		reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reducedMotion) return;

		// Only download and play while on screen; pause again once scrolled past
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					videoElement.play().catch(() => {});
				} else {
					videoElement.pause();
				}
			},
			{ threshold: 0.25 }
		);

		observer.observe(videoElement);

		return () => observer.disconnect();
	});
</script>

<div class="relative aspect-[9/16] w-full overflow-hidden rounded-3xl bg-gray-900 {className}">
	<video
		bind:this={videoElement}
		{src}
		{poster}
		aria-label={label}
		muted
		loop
		playsinline
		preload="none"
		controls={reducedMotion}
		class="absolute inset-0 h-full w-full object-cover"
	></video>
</div>
