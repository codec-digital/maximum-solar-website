<script lang="ts">
	import StepWrapper from '../StepWrapper.svelte';
	import { quizState } from '$lib/state/quiz.svelte';
	import { Home, Building2, KeyRound } from '@lucide/svelte';
	import { cn } from '$lib/utils';

	const options: Array<{
		value: 'owner' | 'renter' | 'business';
		label: string;
		icon: typeof Home;
	}> = [
		{ value: 'owner', label: 'Yes, I own my home', icon: Home },
		{ value: 'renter', label: 'I rent', icon: KeyRound },
		{ value: 'business', label: "I'm a business owner", icon: Building2 }
	];

	function handleSelect(value: 'owner' | 'renter' | 'business') {
		quizState.inputs.ownershipType = value;
		if (value === 'renter') {
			quizState.exitType = 'renter';
		} else if (value === 'business') {
			quizState.exitType = 'commercial';
		} else {
			quizState.currentStep += 1;
		}
	}
</script>

<StepWrapper title="Do you own your home in Tasmania?" showBack={false}>
	<div class="flex flex-col gap-3">
		{#each options as option}
			<button
				onclick={() => handleSelect(option.value)}
				class={cn(
					'flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all hover:border-[#FFC640] hover:bg-zinc-800',
					quizState.inputs.ownershipType === option.value
						? 'border-[#FFC640] bg-zinc-800'
						: 'border-zinc-700 bg-zinc-900/50'
				)}
			>
				<div
					class={cn(
						'flex size-10 flex-shrink-0 items-center justify-center rounded-full transition-colors',
						quizState.inputs.ownershipType === option.value
							? 'bg-[#FFC640] text-zinc-900'
							: 'bg-zinc-800 text-zinc-400'
					)}
				>
					<option.icon class="size-5" />
				</div>
				<span class="text-base font-medium text-white">{option.label}</span>
			</button>
		{/each}
	</div>
</StepWrapper>
