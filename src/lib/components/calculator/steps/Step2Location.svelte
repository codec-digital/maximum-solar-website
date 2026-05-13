<script lang="ts">
	import StepWrapper from '../StepWrapper.svelte';
	import { quizState } from '$lib/state/quiz.svelte';
	import { getRegionFromPostcode } from '$lib/solar/postcodes';
	import { Button } from '$lib/components/ui/button';
	import { MapPin } from '@lucide/svelte';

	let postcode = $state(quizState.inputs.postcode);
	let error = $state('');
	let touched = $state(false);

	function validate() {
		const trimmed = postcode.trim();
		if (!trimmed) return 'Please enter your postcode.';
		if (!/^\d{4}$/.test(trimmed)) return 'Please enter a valid 4-digit postcode.';
		return null;
	}

	function handleInput() {
		if (touched) error = validate() ?? '';
	}

	function handleSubmit() {
		touched = true;
		const trimmed = postcode.trim();
		if (!trimmed || !/^\d{4}$/.test(trimmed)) {
			error = 'Please enter a valid 4-digit postcode.';
			return;
		}
		const code = parseInt(trimmed, 10);
		quizState.inputs.postcode = trimmed;
		quizState.inputs.region = getRegionFromPostcode(trimmed);
		if (code < 7000 || code > 7999) {
			quizState.exitType = 'out_of_area';
			return;
		}
		quizState.currentStep += 1;
	}
</script>

<StepWrapper
	title="What's your postcode?"
	subtitle="We use this to tailor your savings estimate to your region of Tasmania."
>
	<div class="max-w-sm">
		<div class="relative">
			<MapPin class="absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-zinc-500" />
			<input
				type="text"
				inputmode="numeric"
				maxlength="4"
				placeholder="e.g. 7000"
				bind:value={postcode}
				oninput={handleInput}
				onkeydown={(e) => e.key === 'Enter' && handleSubmit()}
				class="w-full rounded-xl border-2 bg-zinc-800 py-3.5 pr-4 pl-11 text-base text-white outline-none transition-all placeholder:text-zinc-500 focus:border-[#FFC640] {error
					? 'border-red-500'
					: 'border-zinc-700'}"
			/>
		</div>
		{#if error}
			<p class="mt-2 text-sm text-red-400">{error}</p>
		{/if}

		<Button
			onclick={handleSubmit}
			class="mt-6 w-full rounded-xl py-3 text-base font-semibold"
			style="background-color: #FFC640; color: #1a1a1a;"
		>
			Continue
		</Button>
	</div>
</StepWrapper>
