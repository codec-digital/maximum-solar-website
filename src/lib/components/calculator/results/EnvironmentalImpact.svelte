<script lang="ts">
	import type { CalculationResult } from '$lib/solar/calculator';
	import { Leaf, Trees, Car } from '@lucide/svelte';

	interface Props {
		result: CalculationResult;
	}

	let { result }: Props = $props();

	function formatNumber(value: number) {
		return new Intl.NumberFormat('en-AU').format(value);
	}
</script>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
	<div class="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
		<div
			class="mb-3 flex size-12 items-center justify-center rounded-xl"
			style="background-color: #FFC640;"
		>
			<Leaf class="size-6 text-zinc-900" />
		</div>
		<p class="font-heading text-3xl font-bold text-white">
			{formatNumber(result.annualCO2OffsetKg)} kg
		</p>
		<p class="mt-1 text-sm font-medium text-zinc-300">CO₂ offset per year</p>
		<p class="mt-1 text-xs text-zinc-500">
			Equivalent to keeping {Math.round((result.annualCO2OffsetKg / 1000) * 10) / 10} tonnes of carbon
			out of the atmosphere annually.
		</p>
	</div>

	<div class="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
		<div
			class="mb-3 flex size-12 items-center justify-center rounded-xl"
			style="background-color: #FFC640;"
		>
			<Trees class="size-6 text-zinc-900" />
		</div>
		<p class="font-heading text-3xl font-bold text-white">{result.treesEquivalent} trees</p>
		<p class="mt-1 text-sm font-medium text-zinc-300">Planted every year</p>
		<p class="mt-1 text-xs text-zinc-500">
			Like planting {result.treesEquivalent} mature trees in your community annually.
		</p>
	</div>

	<div class="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
		<div
			class="mb-3 flex size-12 items-center justify-center rounded-xl"
			style="background-color: #FFC640;"
		>
			<Car class="size-6 text-zinc-900" />
		</div>
		<p class="font-heading text-3xl font-bold text-white">{result.carsOffRoadEquivalent} cars</p>
		<p class="mt-1 text-sm font-medium text-zinc-300">Off the road per year</p>
		<p class="mt-1 text-xs text-zinc-500">
			Equivalent to taking {result.carsOffRoadEquivalent} cars off the road for a year.
		</p>
	</div>
</div>
