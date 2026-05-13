<script lang="ts">
	import StepWrapper from '../StepWrapper.svelte';
	import { quizStore } from '$lib/stores/quiz.svelte';
	import { cn } from '$lib/utils';

	const options = [
		{ label: 'Under $300', midpoint: 200 },
		{ label: '$300 – $500', midpoint: 400 },
		{ label: '$500 – $700', midpoint: 600 },
		{ label: '$700 – $1,000', midpoint: 850 },
		{ label: 'Over $1,000', midpoint: 1200 },
		{ label: "I'm not sure", midpoint: 500 }
	];

	function handleSelect(label: string, midpoint: number) {
		quizStore.setBillRange(label, midpoint);
		quizStore.nextStep();
	}
</script>

<StepWrapper
	title="What's your average quarterly electricity bill?"
	subtitle="Check your latest bill or make your best estimate."
>
	<div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
		{#each options as option}
			<button
				onclick={() => handleSelect(option.label, option.midpoint)}
				class={cn(
					'rounded-xl border-2 p-4 text-center transition-all hover:border-[#FFC640] hover:bg-zinc-800',
					quizStore.inputs.quarterlyBillLabel === option.label
						? 'border-[#FFC640] bg-zinc-800'
						: 'border-zinc-700 bg-zinc-900/50'
				)}
			>
				<span class="text-base font-semibold text-white">{option.label}</span>
			</button>
		{/each}
	</div>
	{#if quizStore.inputs.quarterlyBillLabel === "I'm not sure"}
		<p class="mt-3 text-sm text-zinc-500">
			We'll use $500 as a typical estimate. Your results will note this assumption.
		</p>
	{/if}
</StepWrapper>
