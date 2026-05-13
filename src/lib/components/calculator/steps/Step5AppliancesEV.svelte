<script lang="ts">
	import StepWrapper from '../StepWrapper.svelte';
	import { quizState } from '$lib/state/quiz.svelte';
	import { Flame, Wind, Waves, Car, X } from '@lucide/svelte';
	import { cn } from '$lib/utils';

	type ApplianceKey = 'hasElectricHotWater' | 'hasDucatedHvac' | 'hasPool' | 'hasEvOwned';

	const appliances: Array<{ key: ApplianceKey; label: string; icon: typeof Flame }> = [
		{ key: 'hasElectricHotWater', label: 'Electric hot water system', icon: Flame },
		{ key: 'hasDucatedHvac', label: 'Ducted heating or air conditioning', icon: Wind },
		{ key: 'hasPool', label: 'Swimming pool or spa', icon: Waves },
		{ key: 'hasEvOwned', label: 'Electric vehicle (already owned)', icon: Car }
	];

	let noneSelected = $state(
		!quizState.inputs.hasElectricHotWater &&
		!quizState.inputs.hasDucatedHvac &&
		!quizState.inputs.hasPool &&
		!quizState.inputs.hasEvOwned
	);

	function toggleAppliance(key: ApplianceKey) {
		quizState.inputs[key] = !quizState.inputs[key];
		// If any appliance is selected, deselect "none"
		if (quizState.inputs[key]) {
			noneSelected = false;
			// If EV is now owned, clear hasEvPlanned
			if (key === 'hasEvOwned' && quizState.inputs.hasEvOwned) {
				quizState.inputs.hasEvPlanned = false;
			}
		}
	}

	function toggleNone() {
		noneSelected = !noneSelected;
		if (noneSelected) {
			quizState.inputs.hasElectricHotWater = false;
			quizState.inputs.hasDucatedHvac = false;
			quizState.inputs.hasPool = false;
			quizState.inputs.hasEvOwned = false;
		}
	}

	function handleContinue() {
		quizState.currentStep += 1;
	}
</script>

<StepWrapper
	title="Tell us about your appliances and future plans"
	subtitle="This helps us size your system accurately and personalise your estimate."
>
	<div class="space-y-7">
		<!-- Question A: Appliances -->
		<div>
			<p class="mb-3 text-sm font-semibold text-zinc-300">Does your home have any of the following?</p>
			<div class="flex flex-col gap-2">
				{#each appliances as appliance}
					<button
						onclick={() => toggleAppliance(appliance.key)}
						class={cn(
							'flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all hover:border-[#FFC640] hover:bg-zinc-800',
							quizState.inputs[appliance.key]
								? 'border-[#FFC640] bg-zinc-800'
								: 'border-zinc-700 bg-zinc-900/50'
						)}
					>
						<div class={cn(
							'flex size-10 flex-shrink-0 items-center justify-center rounded-full transition-colors',
							quizState.inputs[appliance.key]
								? 'bg-[#FFC640] text-zinc-900'
								: 'bg-zinc-800 text-zinc-400'
						)}>
							<appliance.icon class="size-5" />
						</div>
						<span class="flex-1 text-sm font-medium text-white">{appliance.label}</span>
						<div class={cn(
							'size-5 rounded border-2 transition-colors',
							quizState.inputs[appliance.key]
								? 'border-[#FFC640] bg-[#FFC640]'
								: 'border-zinc-600 bg-zinc-800'
						)}>
							{#if quizState.inputs[appliance.key]}
								<svg viewBox="0 0 20 20" fill="currentColor" class="text-zinc-900">
									<path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
								</svg>
							{/if}
						</div>
					</button>
				{/each}

				<!-- None of the above -->
				<button
					onclick={toggleNone}
					class={cn(
						'flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all hover:border-[#FFC640] hover:bg-zinc-800',
						noneSelected
							? 'border-[#FFC640] bg-zinc-800'
							: 'border-zinc-700 bg-zinc-900/50'
					)}
				>
					<div class={cn(
						'flex size-10 flex-shrink-0 items-center justify-center rounded-full transition-colors',
						noneSelected ? 'bg-[#FFC640] text-zinc-900' : 'bg-zinc-800 text-zinc-400'
					)}>
						<X class="size-5" />
					</div>
					<span class="flex-1 text-sm font-medium text-white">None of the above</span>
					<div class={cn(
						'size-5 rounded border-2 transition-colors',
						noneSelected ? 'border-[#FFC640] bg-[#FFC640]' : 'border-zinc-600 bg-zinc-800'
					)}>
						{#if noneSelected}
							<svg viewBox="0 0 20 20" fill="currentColor" class="text-zinc-900">
								<path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
							</svg>
						{/if}
					</div>
				</button>
			</div>
		</div>

		<!-- Question B: EV plans (hidden if EV already owned) -->
		{#if !quizState.inputs.hasEvOwned}
			<div>
				<p class="mb-3 text-sm font-semibold text-zinc-300">Do you plan to get an electric vehicle in the next 1–2 years?</p>
				<div class="grid grid-cols-2 gap-2">
					<button
						onclick={() => { quizState.inputs.hasEvPlanned = true; }}
						class={cn(
							'rounded-xl border-2 py-3 text-sm font-semibold transition-all hover:border-[#FFC640] hover:bg-zinc-800',
							quizState.inputs.hasEvPlanned
								? 'border-[#FFC640] bg-zinc-800 text-white'
								: 'border-zinc-700 bg-zinc-900/50 text-zinc-400'
						)}
					>
						Yes
					</button>
					<button
						onclick={() => { quizState.inputs.hasEvPlanned = false; }}
						class={cn(
							'rounded-xl border-2 py-3 text-sm font-semibold transition-all hover:border-[#FFC640] hover:bg-zinc-800',
							quizState.inputs.hasEvPlanned === false
								? 'border-[#FFC640] bg-zinc-800 text-white'
								: 'border-zinc-700 bg-zinc-900/50 text-zinc-400'
						)}
					>
						No
					</button>
				</div>
			</div>
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
