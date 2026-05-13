<script lang="ts">
	import type { CalculationResult } from '$lib/solar/calculator';
	import { fade } from 'svelte/transition';

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
</script>

<div in:fade={{ duration: 300 }} class="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
	<h3 class="mb-1 font-heading text-xl font-bold text-white">Year 1 vs Year 25</h3>
	<p class="mb-6 text-sm text-zinc-400">Projected annual electricity costs</p>

	<div class="overflow-hidden rounded-xl border border-zinc-800">
		<table class="w-full border-collapse">
			<thead>
				<tr class="border-b border-zinc-800 bg-zinc-800/50">
					<th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500"></th>
					<th class="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-zinc-400">Year 1</th>
					<th class="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-zinc-400">Year 25</th>
				</tr>
			</thead>
			<tbody>
				<tr class="border-b border-zinc-800">
					<td class="px-4 py-4 text-sm font-medium text-zinc-400">Without solar</td>
					<td class="px-4 py-4 text-center text-sm font-semibold text-zinc-300">
						{formatCurrency(result.billYear1WithoutSolar)}
					</td>
					<td class="px-4 py-4 text-center text-sm font-semibold text-red-400">
						{formatCurrency(result.billYear25WithoutSolar)}
					</td>
				</tr>
				<tr>
					<td class="px-4 py-4 text-sm font-medium text-zinc-400">With solar</td>
					<td class="px-4 py-4 text-center text-sm font-semibold" style="color: #FFC640;">
						{formatCurrency(result.billYear1WithSolar)}
					</td>
					<td class="px-4 py-4 text-center text-sm font-bold text-white">
						{formatCurrency(result.billYear25WithSolar)}
					</td>
				</tr>
			</tbody>
		</table>
	</div>

	<p class="mt-4 text-xs text-zinc-600">
		Without-solar figures assume 3% annual electricity price increase. With-solar figures include 0.5% annual panel degradation. Feed-in tariff held flat in projections.
	</p>
</div>
