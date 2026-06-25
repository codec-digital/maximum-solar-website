<script lang="ts">
	import ServicePage from '$lib/components/ServicePage.svelte';
	import { getServicePage } from '$lib/data/servicePages';

	const page = getServicePage('ev-charging-solar')!;
</script>

<ServicePage {page} />
