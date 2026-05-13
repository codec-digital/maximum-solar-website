<script lang="ts">
	import type { CalculationResult } from '$lib/solar/calculator';

	interface Props {
		result: CalculationResult;
	}

	let { result }: Props = $props();

	const maxYears = 15;
	const clampedPayback = $derived(Math.min(result.simplePaybackYears, maxYears));
	const fillPercent = $derived((clampedPayback / maxYears) * 100);

	function formatCurrency(value: number) {
		return new Intl.NumberFormat('en-AU', {
			style: 'currency',
			currency: 'AUD',
			maximumFractionDigits: 0
		}).format(value);
	}
</script>

<div class="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
	<h3 class="mb-1 font-heading text-xl font-bold text-white">Payback Period</h3>
	<p class="mb-6 text-sm text-zinc-400">Estimated time for your system to pay for itself</p>

	<div class="mb-4">
		<div class="mb-2 flex items-end justify-between">
			<span class="font-heading text-4xl font-bold text-white"
				>{result.simplePaybackYears} years</span
			>
			<span class="text-sm text-zinc-500">System cost: {formatCurrency(result.estimatedSystemCost)}</span>
		</div>

		<div class="relative h-4 w-full overflow-hidden rounded-full bg-zinc-800">
			<div
				class="absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out"
				style="width: {fillPercent}%; background-color: #FFC640;"
			></div>
			<div
				class="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
				style="left: {fillPercent}%;"
			>
				<div class="size-5 rounded-full border-2 border-zinc-900 bg-white shadow-md"></div>
			</div>
		</div>

		<div class="mt-1.5 flex justify-between text-xs text-zinc-600">
			<span>Now</span>
			<span>{maxYears} years</span>
		</div>
	</div>

	<p class="text-sm text-zinc-400">
		Your system pays for itself in approximately <strong class="text-white"
			>{result.simplePaybackYears} years</strong
		>, then generates free electricity for the remaining life of your panels
		<strong class="text-white">(25+ years).</strong>
	</p>
</div>
