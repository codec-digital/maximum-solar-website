<script lang="ts">
	import StepWrapper from '../StepWrapper.svelte';
	import { quizState } from '$lib/state/quiz.svelte';
	import { normaliseToQuarterly } from '$lib/solar/calculator';
	import { cn } from '$lib/utils';

	const chips = [
		{ label: 'Under $300', midpoint: 200 },
		{ label: '$300–$500', midpoint: 400 },
		{ label: '$500–$700', midpoint: 600 },
		{ label: '$700–$1,000', midpoint: 850 },
		{ label: 'Over $1,000', midpoint: 1200 },
		{ label: "Not sure", midpoint: 500 }
	];

	const periods: Array<{ value: 'monthly' | 'quarterly' | 'annually'; label: string }> = [
		{ value: 'monthly', label: 'Monthly' },
		{ value: 'quarterly', label: 'Quarterly' },
		{ value: 'annually', label: 'Annually' }
	];

	let amountStr = $state(
		quizState.inputs.billAmount != null ? String(quizState.inputs.billAmount) : ''
	);
	let period = $state<'monthly' | 'quarterly' | 'annually'>(quizState.inputs.billPeriod ?? 'monthly');
	let error = $state('');
	let notSureSelected = $state(false);

	function selectChip(chip: { label: string; midpoint: number }) {
		amountStr = String(chip.midpoint);
		period = 'quarterly';
		notSureSelected = chip.label === 'Not sure';
		error = '';
	}

	function handleContinue() {
		const amount = parseFloat(amountStr);
		if (!amountStr || isNaN(amount) || amount <= 0) {
			error = 'Please enter a valid bill amount.';
			return;
		}
		const quarterly = normaliseToQuarterly(amount, period);
		quizState.inputs.billAmount = amount;
		quizState.inputs.billPeriod = period;
		quizState.inputs.quarterlyBill = quarterly;
		quizState.currentStep += 1;
	}

	const inputBase =
		'w-full rounded-xl border-2 border-zinc-700 bg-zinc-800 px-4 py-3.5 text-base text-white outline-none transition-all placeholder:text-zinc-500 focus:border-[#FFC640]';
</script>

<StepWrapper
	title="What's your electricity bill?"
	subtitle="Enter your amount and billing period, or choose from the options below."
>
	<div class="space-y-5">
		<!-- Amount input -->
		<div>
			<label class="mb-2 block text-sm font-medium text-zinc-400" for="bill-amount">
				Bill amount
			</label>
			<div class="relative">
				<span class="absolute top-1/2 left-4 -translate-y-1/2 text-base font-medium text-zinc-400">$</span>
				<input
					id="bill-amount"
					type="number"
					inputmode="decimal"
					placeholder="e.g. 500"
					min="1"
					bind:value={amountStr}
					oninput={() => { error = ''; notSureSelected = false; }}
					class="{inputBase} pl-8 {error ? 'border-red-500' : ''}"
				/>
			</div>
			{#if error}
				<p class="mt-1.5 text-sm text-red-400">{error}</p>
			{/if}
		</div>

		<!-- Period selector -->
		<div>
			<p class="mb-2 text-sm font-medium text-zinc-400">Billing period</p>
			<div class="grid grid-cols-3 gap-2">
				{#each periods as p}
					<button
						onclick={() => { period = p.value; }}
						class={cn(
							'rounded-xl border-2 py-2.5 text-sm font-medium transition-all',
							period === p.value
								? 'border-[#FFC640] bg-zinc-800 text-white'
								: 'border-zinc-700 bg-zinc-900/50 text-zinc-400 hover:border-zinc-600 hover:text-white'
						)}
					>
						{p.label}
					</button>
				{/each}
			</div>
		</div>

		<!-- Quick-select chips -->
		<div>
			<p class="mb-2 text-sm font-medium text-zinc-500">Or choose a range (quarterly)</p>
			<div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
				{#each chips as chip}
					<button
						onclick={() => selectChip(chip)}
						class={cn(
							'rounded-xl border-2 px-3 py-2 text-center text-sm font-medium transition-all hover:border-[#FFC640] hover:bg-zinc-800',
							amountStr === String(chip.midpoint) && period === 'quarterly'
								? 'border-[#FFC640] bg-zinc-800 text-white'
								: 'border-zinc-700 bg-zinc-900/50 text-zinc-400'
						)}
					>
						{chip.label}
					</button>
				{/each}
			</div>
		</div>

		{#if notSureSelected}
			<p class="text-sm text-zinc-500">
				We'll use $500/quarter as a typical estimate. Your results will note this assumption.
			</p>
		{/if}

		<button
			onclick={handleContinue}
			class="mt-2 w-full rounded-xl py-3.5 text-base font-semibold text-zinc-900 transition-opacity hover:opacity-90"
			style="background-color: #FFC640;"
		>
			Continue
		</button>
	</div>
</StepWrapper>
