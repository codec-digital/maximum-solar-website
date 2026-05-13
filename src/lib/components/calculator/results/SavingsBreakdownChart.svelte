<script lang="ts">
	import type { CalculationResult } from '$lib/solar/calculator';
	import { PieChart } from 'layerchart';

	interface Props {
		result: CalculationResult;
	}

	let { result }: Props = $props();

	const data = $derived([
		{ key: 'offset', label: 'Energy you use directly', value: result.savingsFromOffset },
		{ key: 'export', label: 'Energy you export', value: result.savingsFromExport }
	]);

	const series = $derived([
		{ key: 'offset', value: 'value', label: 'Energy you use directly', color: '#FFC640' },
		{ key: 'export', value: 'value', label: 'Energy you export', color: '#52525b' }
	]);

	function formatCurrency(value: number) {
		return new Intl.NumberFormat('en-AU', {
			style: 'currency',
			currency: 'AUD',
			maximumFractionDigits: 0
		}).format(value);
	}

	const offsetPct = $derived(Math.round((result.savingsFromOffset / result.annualSavings) * 100));
	const exportPct = $derived(100 - offsetPct);
</script>

<div class="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
	<h3 class="font-heading mb-1 text-xl font-bold text-white">Savings Breakdown</h3>
	<p class="mb-6 text-sm text-zinc-400">Where your savings come from</p>

	<div class="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
		<div class="h-56">
			<PieChart
				{data}
				key="key"
				label="label"
				value="value"
				innerRadius={55}
				legend={false}
				{series}
				props={{
					tooltip: {
						root: {
							variant: 'none',
							classes: {
								container:
									'bg-zinc-800 border border-zinc-700 text-white text-sm py-2 px-3 rounded-xl shadow-xl [&_.label]:text-zinc-400'
							}
						}
					}
				}}
			/>
		</div>

		<div class="space-y-4">
			<div class="flex items-center gap-3 rounded-xl bg-zinc-800 p-4">
				<div class="size-3 flex-shrink-0 rounded-full" style="background: #FFC640;"></div>
				<div>
					<p class="text-sm font-semibold text-white">Energy you use directly</p>
					<p class="text-xs text-zinc-500">Avoided grid cost ({offsetPct}%)</p>
				</div>
				<p class="ml-auto text-base font-bold text-white">
					{formatCurrency(result.savingsFromOffset)}
				</p>
			</div>

			<div class="flex items-center gap-3 rounded-xl bg-zinc-800 p-4">
				<div class="size-3 flex-shrink-0 rounded-full bg-zinc-500"></div>
				<div>
					<p class="text-sm font-semibold text-white">Energy you export</p>
					<p class="text-xs text-zinc-500">Feed-in tariff credits ({exportPct}%)</p>
				</div>
				<p class="ml-auto text-base font-bold text-white">
					{formatCurrency(result.savingsFromExport)}
				</p>
			</div>
		</div>
	</div>

	{#if result.isHighExport}
		<div class="mt-5 rounded-xl border border-amber-900/40 bg-amber-950/20 p-4">
			<p class="text-sm text-zinc-300">
				<strong class="text-[#FFC640]">High export ratio.</strong> Because your home is mainly active
				in the mornings and evenings, a larger share of your solar generation is exported to the grid
				at 8.78c/kWh. Shifting some energy use to daylight hours, like running the dishwasher or washing
				machine during the day, or adding a battery can significantly increase your savings.
			</p>
		</div>
	{/if}
</div>
