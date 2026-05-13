<script lang="ts">
	import StepWrapper from '../StepWrapper.svelte';
	import { quizState } from '$lib/state/quiz.svelte';
	import { Battery, Clock, X } from '@lucide/svelte';
	import { cn } from '$lib/utils';

	type BatteryChoice = 'yes' | 'maybe' | 'no';

	let selected = $state<BatteryChoice | null>(
		quizState.inputs.batteryInterest ? 'yes' : quizState.inputs.batteryMaybe ? 'maybe' : null
	);

	const options: Array<{
		value: BatteryChoice;
		label: string;
		subtext: string;
		icon: typeof Battery;
	}> = [
		{
			value: 'yes',
			label: 'Yes, show me the savings',
			subtext: 'Include battery storage in my estimate',
			icon: Battery
		},
		{
			value: 'maybe',
			label: 'Maybe later',
			subtext: "I'm open to it but not ready to decide",
			icon: Clock
		},
		{
			value: 'no',
			label: 'No thanks',
			subtext: "I'll just focus on solar for now",
			icon: X
		}
	];

	function handleSelect(value: BatteryChoice) {
		selected = value;
		quizState.inputs.batteryInterest = value === 'yes';
		quizState.inputs.batteryMaybe = value === 'maybe';
		quizState.currentStep += 1;
	}
</script>

<StepWrapper
	title="Are you interested in adding battery storage?"
	subtitle="Battery storage lets you use solar energy after dark. We can show you the numbers."
>
	<div class="flex flex-col gap-3">
		{#each options as option}
			<button
				onclick={() => handleSelect(option.value)}
				class={cn(
					'flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all hover:border-[#FFC640] hover:bg-zinc-800',
					selected === option.value
						? 'border-[#FFC640] bg-zinc-800'
						: 'border-zinc-700 bg-zinc-900/50'
				)}
			>
				<div
					class={cn(
						'flex size-11 flex-shrink-0 items-center justify-center rounded-full transition-colors',
						selected === option.value ? 'bg-[#FFC640] text-zinc-900' : 'bg-zinc-800 text-zinc-400'
					)}
				>
					<option.icon class="size-5" />
				</div>
				<div>
					<p class="font-semibold text-white">{option.label}</p>
					<p class="text-sm text-zinc-400">{option.subtext}</p>
				</div>
			</button>
		{/each}
	</div>
</StepWrapper>
