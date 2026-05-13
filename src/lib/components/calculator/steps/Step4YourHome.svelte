<script lang="ts">
	import StepWrapper from '../StepWrapper.svelte';
	import { quizState } from '$lib/state/quiz.svelte';
	import { Sun, Briefcase, Moon, Home, Building2, Trees, Tractor, Compass } from '@lucide/svelte';
	import { cn } from '$lib/utils';

	type OccupancyOption = {
		value: 'all_day' | 'morning_evening' | 'night_only';
		label: string;
		subtext: string;
		icon: typeof Sun;
	};
	type HouseholdOption = { value: '1_2' | '3_4' | '5_plus'; label: string };
	type HomeSizeOption = {
		value: 'apartment' | 'medium' | 'large' | 'rural';
		label: string;
		subtext: string;
		icon: typeof Home;
	};
	type OrientationOption = {
		value: 'north' | 'north_east_west' | 'east_west' | 'south' | 'not_sure';
		label: string;
		subtext: string;
	};

	const occupancyOptions: OccupancyOption[] = [
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

	const householdOptions: HouseholdOption[] = [
		{ value: '1_2', label: '1–2 people' },
		{ value: '3_4', label: '3–4 people' },
		{ value: '5_plus', label: '5+ people' }
	];

	const homeSizeOptions: HomeSizeOption[] = [
		{ value: 'apartment', label: 'Apartment or unit', subtext: 'Under 120m²', icon: Building2 },
		{ value: 'medium', label: 'Medium home', subtext: '120–250m²', icon: Home },
		{ value: 'large', label: 'Large home', subtext: '250m²+', icon: Trees },
		{ value: 'rural', label: 'Rural or acreage', subtext: 'Farm or large property', icon: Tractor }
	];

	const orientationOptions: OrientationOption[] = [
		{ value: 'north', label: 'Mainly north', subtext: 'Optimal. Best solar output' },
		{
			value: 'north_east_west',
			label: 'North-east or north-west',
			subtext: '−10% vs north-facing'
		},
		{ value: 'east_west', label: 'East or west', subtext: '−18% vs north-facing' },
		{ value: 'south', label: 'Mainly south', subtext: '−35% vs north-facing' },
		{ value: 'not_sure', label: 'Not sure', subtext: "We'll use a conservative estimate" }
	];

	let error = $state('');

	function handleContinue() {
		if (
			!quizState.inputs.occupancyProfile ||
			!quizState.inputs.householdSize ||
			!quizState.inputs.homeSize ||
			!quizState.inputs.roofOrientation
		) {
			error = 'Please answer all four questions to continue.';
			return;
		}
		error = '';
		quizState.currentStep += 1;
	}
</script>

<StepWrapper
	title="Tell us about your home"
	subtitle="These details help personalise your savings estimate."
>
	<div class="space-y-8">
		<!-- Question A: Occupancy -->
		<div>
			<p class="mb-3 text-sm font-semibold text-zinc-300">When is your home most active?</p>
			<div class="flex flex-col gap-2">
				{#each occupancyOptions as option}
					<button
						onclick={() => {
							quizState.inputs.occupancyProfile = option.value;
							error = '';
						}}
						class={cn(
							'flex items-center gap-4 rounded-xl border-2 p-3.5 text-left transition-all hover:border-[#FFC640] hover:bg-zinc-800',
							quizState.inputs.occupancyProfile === option.value
								? 'border-[#FFC640] bg-zinc-800'
								: 'border-zinc-700 bg-zinc-900/50'
						)}
					>
						<div
							class={cn(
								'flex size-10 flex-shrink-0 items-center justify-center rounded-full transition-colors',
								quizState.inputs.occupancyProfile === option.value
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
		</div>

		<!-- Question B: Household size -->
		<div>
			<p class="mb-3 text-sm font-semibold text-zinc-300">How many people live in your home?</p>
			<div class="grid grid-cols-3 gap-2">
				{#each householdOptions as option}
					<button
						onclick={() => {
							quizState.inputs.householdSize = option.value;
							error = '';
						}}
						class={cn(
							'rounded-xl border-2 py-3 text-center text-sm font-semibold transition-all hover:border-[#FFC640] hover:bg-zinc-800',
							quizState.inputs.householdSize === option.value
								? 'border-[#FFC640] bg-zinc-800 text-white'
								: 'border-zinc-700 bg-zinc-900/50 text-zinc-400'
						)}
					>
						{option.label}
					</button>
				{/each}
			</div>
		</div>

		<!-- Question C: Home size -->
		<div>
			<p class="mb-3 text-sm font-semibold text-zinc-300">What best describes your home?</p>
			<div class="grid grid-cols-2 gap-2">
				{#each homeSizeOptions as option}
					<button
						onclick={() => {
							quizState.inputs.homeSize = option.value;
							error = '';
						}}
						class={cn(
							'flex items-center gap-3 rounded-xl border-2 p-3.5 text-left transition-all hover:border-[#FFC640] hover:bg-zinc-800',
							quizState.inputs.homeSize === option.value
								? 'border-[#FFC640] bg-zinc-800'
								: 'border-zinc-700 bg-zinc-900/50'
						)}
					>
						<div
							class={cn(
								'flex size-9 flex-shrink-0 items-center justify-center rounded-lg transition-colors',
								quizState.inputs.homeSize === option.value
									? 'bg-[#FFC640] text-zinc-900'
									: 'bg-zinc-800 text-zinc-400'
							)}
						>
							<option.icon class="size-4" />
						</div>
						<div>
							<p class="text-sm font-semibold text-white">{option.label}</p>
							<p class="text-xs text-zinc-500">{option.subtext}</p>
						</div>
					</button>
				{/each}
			</div>
		</div>

		<!-- Question D: Roof orientation -->
		<div>
			<p class="mb-1 text-sm font-semibold text-zinc-300">
				Which direction does your main roof face?
			</p>
			<p class="mb-3 text-xs text-zinc-500">
				Face your home from the street. Which way does the largest roof area point?
			</p>
			<div class="flex flex-col gap-2">
				{#each orientationOptions as option}
					<button
						onclick={() => {
							quizState.inputs.roofOrientation = option.value;
							error = '';
						}}
						class={cn(
							'flex items-center gap-4 rounded-xl border-2 p-3.5 text-left transition-all hover:border-[#FFC640] hover:bg-zinc-800',
							quizState.inputs.roofOrientation === option.value
								? 'border-[#FFC640] bg-zinc-800'
								: 'border-zinc-700 bg-zinc-900/50'
						)}
					>
						<div
							class={cn(
								'flex size-10 flex-shrink-0 items-center justify-center rounded-full transition-colors',
								quizState.inputs.roofOrientation === option.value
									? 'bg-[#FFC640] text-zinc-900'
									: 'bg-zinc-800 text-zinc-400'
							)}
						>
							<Compass class="size-5" />
						</div>
						<div>
							<p class="font-semibold text-white">{option.label}</p>
							<p class="text-sm text-zinc-400">{option.subtext}</p>
						</div>
					</button>
				{/each}
			</div>
		</div>

		{#if error}
			<p class="text-sm text-red-400">{error}</p>
		{/if}

		<button
			onclick={handleContinue}
			class="w-full rounded-xl py-3.5 text-base font-semibold text-zinc-900 transition-opacity hover:opacity-90"
			style="background-color: #FFC640;"
		>
			Continue
		</button>
	</div>
</StepWrapper>
