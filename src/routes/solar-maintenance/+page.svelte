<script lang="ts">
	import ServicePage from '$lib/components/ServicePage.svelte';
	import { getServicePage } from '$lib/data/servicePages';

	const page = getServicePage('solar-maintenance')!;
</script>

<ServicePage {page} />
