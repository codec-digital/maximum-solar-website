<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<Navigation />
{@render children()}
<Footer />
