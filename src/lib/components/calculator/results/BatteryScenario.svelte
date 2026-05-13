<script lang="ts">
	import type { CalculationResult } from '$lib/solar/calculator';
	import { Battery, TrendingUp } from '@lucide/svelte';
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

{#if result.batteryScenario}
	<div
		in:fade={{ duration: 300 }}
		class="rounded-2xl border border-amber-900/50 bg-amber-950/20 p-6"
	>
		<div class="mb-5 flex items-center gap-3">
			<div
				class="flex size-10 items-center justify-center rounded-xl"
				style="background-color: #FFC640;"
			>
				<Battery class="size-5 text-zinc-900" />
			</div>
			<div>
				<h3 class="font-heading text-xl font-bold text-white">Battery Storage Scenario</h3>
				<p class="text-sm text-zinc-400">Solar + battery combined estimate</p>
			</div>
		</div>

		<div class="mb-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
			<div class="rounded-xl bg-zinc-800/60 p-4 text-center">
				<p class="font-heading text-2xl font-bold text-white">
					{formatCurrency(result.batteryScenario.combinedAnnualSavings)}
				</p>
				<p class="mt-1 text-xs text-zinc-500">Combined annual savings</p>
			</div>
			<div class="rounded-xl bg-zinc-800/60 p-4 text-center">
				<p class="font-heading text-2xl font-bold" style="color: #FFC640;">
					+{formatCurrency(result.batteryScenario.additionalAnnualSavings)}
				</p>
				<p class="mt-1 text-xs text-zinc-500">Additional from battery</p>
			</div>
			<div class="rounded-xl bg-zinc-800/60 p-4 text-center">
				<p class="font-heading text-2xl font-bold text-white">
					{result.batteryScenario.batteryPaybackYears} yrs
				</p>
				<p class="mt-1 text-xs text-zinc-500">Battery payback</p>
			</div>
			<div class="rounded-xl bg-zinc-800/60 p-4 text-center">
				<p class="font-heading text-2xl font-bold text-white">
					{formatCurrency(result.batteryScenario.batteryCost)}
				</p>
				<p class="mt-1 text-xs text-zinc-500">Battery cost (est.)</p>
			</div>
		</div>

		<div class="flex items-start gap-3 rounded-xl bg-zinc-800/50 p-4">
			<TrendingUp class="mt-0.5 size-4 flex-shrink-0 text-zinc-400" />
			<p class="text-sm text-zinc-300">
				A battery stores energy you'd otherwise export at 8.78c/kWh, making it available for evening
				use at 25.35c/kWh. nearly 3× the value. Estimate assumes a 10kWh system with 90% round-trip
				efficiency.
			</p>
		</div>
	</div>
{/if}
