<script>
	import Hero from '$lib/components/home/Hero.svelte';
	import Installations from '$lib/components/home/Installations.svelte';
	import Mission from '$lib/components/home/Mission.svelte';
	import Testimonials from '$lib/components/home/Testimonials.svelte';
	import Tindo from '$lib/components/home/Tindo.svelte';
	import Video from '$lib/components/home/Video.svelte';
	import WhySolar from '$lib/components/home/WhySolar.svelte';
	import Seo from '$lib/components/SEO.svelte';
</script>

<Seo
	title="Maximum Solar - Your Local Tasmanian Solar Company"
	description="Tasmanian-owned solar experts offering high-quality installations in Hobart and beyond. Reduce bills and carbon footprint. Get a free quote for your home today."
	keywords="solar panels, solar installation, solar energy, renewable energy, solar power, Maximum Solar, Australian solar, solar quotes, clean energy, solar systems"
/>
<Hero />
<Video />
<Mission />
<Installations />
<Testimonials />
<Tindo />
<WhySolar />
