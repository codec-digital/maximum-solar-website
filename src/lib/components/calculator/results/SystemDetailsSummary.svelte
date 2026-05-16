<script lang="ts">
	import type { CalculationResult } from '$lib/solar/calculator';

	interface Props {
		result: CalculationResult;
	}

	let { result }: Props = $props();

	function formatCurrency(value: number) {
		return new Intl.NumberFormat('en-AU', {
			style: 'currency',
			currency: 'AUD',
			maximumFractionDigits: 0
		}).format(value);
	}

	function formatNumber(value: number) {
		return new Intl.NumberFormat('en-AU').format(value);
	}

	const stats = $derived([
		{ label: 'Recommended system', value: `${result.systemSizeKw} kW` },
		{ label: 'Number of panels', value: `${result.numberOfPanels} panels` },
		{ label: 'Approximate roof area', value: `~${result.roofAreaSqm}m²` },
		{ label: 'Annual generation', value: `${formatNumber(result.annualYieldKwh)} kWh` },
		{ label: 'Daily average generation', value: `${result.dailyYieldKwh} kWh` },
		{ label: 'Daily average export', value: `${result.dailyExportKwh} kWh` },
		{ label: 'Self-consumption rate', value: `${Math.round(result.selfConsumptionRatio * 100)}%` }
	]);
</script>

<div class="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
	<h3 class="mb-1 font-heading text-xl font-bold text-white">System Details</h3>
	<p class="mb-6 text-sm text-zinc-400">Your estimated system specifications and cost breakdown</p>

	<dl class="divide-y divide-zinc-800">
		{#each stats as stat}
			<div class="flex items-center justify-between py-3">
				<dt class="text-sm text-zinc-400">{stat.label}</dt>
				<dd class="text-sm {stat.bold ? 'font-bold text-white' : stat.highlight === 'green' ? 'font-semibold text-green-400' : 'font-semibold text-white'}">
					{stat.value}
				</dd>
			</div>
		{/each}
	</dl>

	<p class="mt-4 text-xs text-zinc-600">
		System cost and pricing are confirmed at your free site assessment and depend on your roof, preferred panels, and inverter.
	</p>
</div>
