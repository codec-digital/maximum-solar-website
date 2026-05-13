<script lang="ts">
	import type { CalculationResult } from '$lib/solar/calculator';
	import { ArrowRight } from '@lucide/svelte';
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
	<h3 class="font-heading mb-1 text-xl font-bold text-white">Before vs After Solar</h3>
	<p class="mb-6 text-sm text-zinc-400">Your estimated electricity bill: Year 1</p>

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
		<!-- Now -->
		<div class="rounded-xl bg-zinc-800 p-5">
			<p class="mb-3 text-xs font-semibold tracking-widest text-zinc-500 uppercase">Now</p>
			<div class="space-y-3">
				<div>
					<p class="text-2xl font-bold text-white">{formatCurrency(result.currentQuarterlyBill)}</p>
					<p class="text-xs text-zinc-500">per quarter</p>
				</div>
				<div>
					<p class="text-lg font-semibold text-zinc-300">
						{formatCurrency(result.currentAnnualBill)}
					</p>
					<p class="text-xs text-zinc-500">per year</p>
				</div>
			</div>
		</div>

		<!-- After Solar -->
		<div class="rounded-xl p-5" style=" outline: 2px solid #FFC640;">
			<p class="mb-3 text-xs font-semibold tracking-widest uppercase" style="color: #FFC640;">
				After Solar
			</p>
			<div class="space-y-3">
				<div>
					<p class="text-2xl font-bold text-white">{formatCurrency(result.newQuarterlyBill)}</p>
					<p class="text-xs text-zinc-500">per quarter</p>
				</div>
				<div>
					<p class="text-lg font-semibold text-zinc-300">{formatCurrency(result.newAnnualBill)}</p>
					<p class="text-xs text-zinc-500">per year</p>
				</div>
			</div>
		</div>
	</div>

	<div class="mt-4 rounded-xl bg-zinc-800/60 px-4 py-3 text-xs text-zinc-500">
		Your estimated bill includes a fixed daily supply charge of ~$1.51/day (~${result.annualSupplyCharge}/year)
		that applies regardless of solar. This is a network access fee charged by Aurora Energy and
		cannot be offset.
	</div>

	<div class="mt-3 flex items-start gap-3 rounded-xl bg-zinc-800 p-4">
		<ArrowRight class="mt-0.5 size-4 flex-shrink-0 text-zinc-400" />
		<p class="text-sm text-zinc-300">
			Going solar costs you approximately
			<strong class="text-white">${result.dailySolarCost}/day</strong> for {result.simplePaybackYears}
			years, then your electricity is essentially free for the life of your system.
		</p>
	</div>
</div>
