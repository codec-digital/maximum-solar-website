<script lang="ts">
	import type { CalculationResult } from '$lib/solar/calculator';
	import { AreaChart } from 'layerchart';

	interface Props {
		result: CalculationResult;
	}

	let { result }: Props = $props();

	const data = $derived(
		[{ year: 0, savings: -result.estimatedSystemCostMid }].concat(
			result.yearProjections.map((p) => ({ year: p.year, savings: p.cumulativeSavings }))
		)
	);

	const breakEvenYear = $derived(
		result.yearProjections.find((p) => p.cumulativeSavings >= 0)?.year ?? result.simplePaybackYears
	);

	function formatCurrency(value: number) {
		return new Intl.NumberFormat('en-AU', {
			style: 'currency',
			currency: 'AUD',
			maximumFractionDigits: 0
		}).format(value);
	}
</script>

<div class="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
	<div class="mb-6 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
		<div>
			<h3 class="font-heading text-xl font-bold text-white">25-Year Return</h3>
			<p class="text-sm text-zinc-400">Cumulative savings after system cost</p>
		</div>
		<div class="text-right">
			<p class="font-heading text-2xl font-bold text-white">{formatCurrency(result.lifetimeSavings)}</p>
			<p class="text-xs text-zinc-500">total estimated return</p>
		</div>
	</div>

	<div class="h-72">
		<AreaChart
			{data}
			x="year"
			y="savings"
			axis={true}
			series={[
				{
					key: 'savings',
					value: 'savings',
					label: 'Cumulative Savings ($)',
					color: '#FFC640'
				}
			]}
			grid={true}
			props={{
				xAxis: {
					tickLabelProps: { fill: '#a1a1aa' }
				},
				yAxis: {
					label: 'Savings ($)',
					labelProps: { fill: '#71717a' },
					tickLabelProps: { fill: '#a1a1aa' },
					format: (v) => {
						const abs = Math.abs(v);
						if (abs === 0) return '$0';
						const sign = v < 0 ? '-' : '';
						return abs >= 1000 ? `${sign}$${(abs / 1000).toFixed(0)}k` : `${sign}$${abs}`;
					}
				},
				tooltip: {
					root: {
						variant: 'none',
						classes: {
							container:
								'bg-zinc-800 border border-zinc-700 text-white text-sm py-2 px-3 rounded-xl shadow-xl [&_.label]:text-zinc-400'
						}
					},
					header: { class: 'border-zinc-600' }
				}
			}}
		/>
	</div>

	<p class="mt-4 text-sm text-zinc-400">
		Break-even at approximately <strong class="text-white">Year {breakEvenYear}</strong>. After that,
		savings accelerate as electricity prices rise 3% per year.
	</p>
	<p class="mt-2 text-xs text-zinc-600">
		Projection applies 3% annual electricity price growth to grid savings and 0.5% annual panel degradation. Feed-in tariff held flat.
	</p>
</div>
