<script lang="ts">
	import type { CalculationResult } from '$lib/solar/calculator';
	import { fade } from 'svelte/transition';

	interface Props {
		result: CalculationResult;
	}

	let { result }: Props = $props();

	const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	const maxKwh = $derived(Math.max(...result.monthlyYieldKwh));
</script>

<div in:fade={{ duration: 300 }} class="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
	<h3 class="mb-1 font-heading text-xl font-bold text-white">Monthly Solar Production</h3>
	<p class="mb-6 text-sm text-zinc-400">Estimated generation per month (kWh)</p>

	<div class="flex items-end gap-1.5 h-48">
		{#each result.monthlyYieldKwh as kwh, i}
			<div class="flex flex-1 flex-col items-center gap-1.5">
				<span class="text-xs font-medium text-zinc-400 tabular-nums">{kwh}</span>
				<div
					class="w-full min-h-[4px] rounded-t transition-all duration-500"
					style="height: {Math.max((kwh / maxKwh) * 152, 4)}px; background-color: {kwh === maxKwh ? '#FFC640' : 'rgba(255,198,64,0.4)'};"
				></div>
				<span class="text-xs text-zinc-600">{MONTHS[i]}</span>
			</div>
		{/each}
	</div>

	<p class="mt-4 text-sm text-zinc-400">
		Tasmania's cooler winter means lower generation June–August, but your panels perform efficiently year-round.
	</p>
</div>
