<script lang="ts">
	import type { CalculationResult } from '$lib/solar/calculator';
	import type { QuizStateInputs } from '$lib/state/quiz.svelte';
	import { REGIONS } from '$lib/solar/constants';
	import { fade } from 'svelte/transition';

	interface Props {
		result: CalculationResult;
		inputs: QuizStateInputs;
	}

	let { result, inputs }: Props = $props();

	const regionLabel = $derived(REGIONS[inputs.region]?.label ?? 'Tasmania');

	const orientationLabel: Record<string, string> = {
		north: 'north-facing',
		north_east_west: 'north-east/west-facing',
		east_west: 'east/west-facing',
		south: 'south-facing',
		not_sure: 'estimated-orientation'
	};
	const orientationText = $derived(
		inputs.roofOrientation ? (orientationLabel[inputs.roofOrientation] ?? '') : ''
	);

	function formatCurrency(value: number) {
		return new Intl.NumberFormat('en-AU', {
			style: 'currency',
			currency: 'AUD',
			maximumFractionDigits: 0
		}).format(value);
	}
</script>

<div
	in:fade={{ duration: 400 }}
	class="rounded-2xl px-8 py-12 text-center md:py-16"
	style="background-color: #FFC640;"
>
	<p class="mb-2 text-sm font-semibold tracking-widest text-zinc-700 uppercase">
		Your Estimated Annual Savings
	</p>
	<p class="font-heading text-6xl font-bold text-zinc-900 md:text-7xl">
		{formatCurrency(result.annualSavings)}
	</p>
	<p class="mt-3 text-xl font-semibold text-zinc-800">
		{formatCurrency(result.lifetimeSavings)} over 25 years
	</p>
	<p class="mt-3 text-base text-zinc-700">
		Based on our recommended system for your home in {regionLabel}
	</p>
	{#if result.recommendedDescription && result.recommendedDescription !== 'not_recommended'}
		<p class="mt-1 text-sm text-zinc-600">{result.recommendedDescription}</p>
	{/if}
</div>
