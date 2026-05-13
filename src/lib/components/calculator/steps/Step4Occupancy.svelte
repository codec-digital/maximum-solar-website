<script lang="ts">
	import StepWrapper from '../StepWrapper.svelte';
	import { quizStore, type OccupancyProfile } from '$lib/stores/quiz.svelte';
	import { Sun, Briefcase, Moon } from '@lucide/svelte';
	import { cn } from '$lib/utils';

	const options: Array<{
		value: OccupancyProfile;
		label: string;
		subtext: string;
		icon: typeof Sun;
	}> = [
		{
			value: 'all_day',
			label: 'All day',
			subtext: "Someone's usually home during the day",
			icon: Sun
		},
		{
			value: 'morning_evening',
			label: 'Mornings & evenings',
			subtext: 'The home is quiet during work hours',
			icon: Briefcase
		},
		{
			value: 'night_only',
			label: 'Mostly at night',
			subtext: "We're rarely home until the evening",
			icon: Moon
		}
	];

	function handleSelect(value: OccupancyProfile) {
		quizStore.setOccupancy(value);
		quizStore.nextStep();
	}
</script>

<StepWrapper
	title="When is your home most active?"
	subtitle="This helps us estimate how much solar energy you'll use directly vs. export to the grid."
>
	<div class="flex flex-col gap-3">
		{#each options as option}
			<button
				onclick={() => handleSelect(option.value)}
				class={cn(
					'flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all hover:border-[#FFC640] hover:bg-zinc-800',
					quizStore.inputs.occupancyProfile === option.value
						? 'border-[#FFC640] bg-zinc-800'
						: 'border-zinc-700 bg-zinc-900/50'
				)}
			>
				<div
					class={cn(
						'flex size-11 flex-shrink-0 items-center justify-center rounded-full transition-colors',
						quizStore.inputs.occupancyProfile === option.value
							? 'bg-[#FFC640] text-zinc-900'
							: 'bg-zinc-800 text-zinc-400'
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
