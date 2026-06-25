<script lang="ts">
	import LocationPage from '$lib/components/LocationPage.svelte';
	import { getLocationPage } from '$lib/data/locationPages';

	const page = getLocationPage('solar-huon-valley')!;
</script>

<LocationPage {page} />
