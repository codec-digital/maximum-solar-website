<script lang="ts">
	import { ChevronDown } from '@lucide/svelte';
	import { slide } from 'svelte/transition';

	let open = $state(false);
</script>

<div class="rounded-xl border border-zinc-800 bg-zinc-900/50">
	<button
		onclick={() => (open = !open)}
		class="flex w-full items-center justify-between px-5 py-4 text-left"
	>
		<span class="text-sm font-medium text-zinc-500">Assumptions & Disclosures</span>
		<ChevronDown
			class="size-4 flex-shrink-0 text-zinc-600 transition-transform duration-200 {open
				? 'rotate-180'
				: ''}"
		/>
	</button>

	{#if open}
		<div transition:slide={{ duration: 200 }} class="border-t border-zinc-800 px-5 pb-5 pt-4">
			<p class="text-xs leading-relaxed text-zinc-600">
				These figures are estimates based on average Tasmanian conditions and are not a guarantee of financial return. Calculations assume: Aurora Energy Tariff 93 blended rate of 25.35c/kWh; feed-in tariff of 8.78c/kWh (2025–26 regulated minimum, held flat in projections as the trend is declining); regional solar yield of 1,150–1,220 kWh/kW/year adjusted for roof orientation; 3% annual electricity price increase applied to grid savings only; 0.5% annual panel degradation applied across 25-year projection; system cost range post-STC rebate (mid-point used for calculations). Battery scenario assumes 10kWh system at $12,000 installed with 90% round-trip efficiency. A fixed daily supply charge of ~$552/year cannot be offset by solar and is included in projected bills. Actual results will vary based on shading, roof pitch, household behaviour, and future tariff changes. Maximum Solar recommends a free in-home site assessment before making any investment decision.
			</p>
		</div>
	{/if}
</div>
