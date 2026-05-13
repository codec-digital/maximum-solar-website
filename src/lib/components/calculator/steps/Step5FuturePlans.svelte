<script lang="ts">
	import StepWrapper from '../StepWrapper.svelte';
	import { quizStore } from '$lib/stores/quiz.svelte';
	import { Battery, Car, X } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';

	let battery = $state(quizStore.inputs.batteryInterest);
	let ev = $state(quizStore.inputs.evInterest);
	let neither = $state(!quizStore.inputs.batteryInterest && !quizStore.inputs.evInterest);

	function toggleBattery() {
		battery = !battery;
		if (battery) neither = false;
	}

	function toggleEV() {
		ev = !ev;
		if (ev) neither = false;
	}

	function toggleNeither() {
		neither = !neither;
		if (neither) {
			battery = false;
			ev = false;
		}
	}

	function handleContinue() {
		quizStore.setFuturePlans(battery, ev);
		quizStore.nextStep();
	}

	const options = [
		{ label: 'Battery storage', icon: Battery, checked: () => battery, toggle: toggleBattery },
		{ label: 'EV charging', icon: Car, checked: () => ev, toggle: toggleEV },
		{ label: 'Neither right now', icon: X, checked: () => neither, toggle: toggleNeither }
	];
</script>

<StepWrapper
	title="Are you interested in any of the following?"
	subtitle="Select all that apply. This helps our team prepare for your consultation."
>
	<div class="flex flex-col gap-3">
		{#each options as option}
			<button
				onclick={option.toggle}
				class={cn(
					'flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all hover:border-[#FFC640] hover:bg-zinc-800',
					option.checked() ? 'border-[#FFC640] bg-zinc-800' : 'border-zinc-700 bg-zinc-900/50'
				)}
			>
				<div
					class={cn(
						'flex size-10 flex-shrink-0 items-center justify-center rounded-full transition-colors',
						option.checked() ? 'bg-[#FFC640] text-zinc-900' : 'bg-zinc-800 text-zinc-400'
					)}
				>
					<option.icon class="size-5" />
				</div>
				<span class="text-base font-medium text-white">{option.label}</span>
				<div class="ml-auto">
					<div
						class={cn(
							'size-5 rounded border-2 transition-colors',
							option.checked() ? 'border-[#FFC640] bg-[#FFC640]' : 'border-zinc-600 bg-zinc-800'
						)}
					>
						{#if option.checked()}
							<svg viewBox="0 0 20 20" fill="currentColor" class="text-zinc-900">
								<path
									fill-rule="evenodd"
									d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
									clip-rule="evenodd"
								/>
							</svg>
						{/if}
					</div>
				</div>
			</button>
		{/each}
	</div>

	<Button
		onclick={handleContinue}
		class="mt-6 w-full rounded-xl py-3 text-base font-semibold"
		style="background-color: #FFC640; color: #1a1a1a;"
	>
		Continue
	</Button>
</StepWrapper>
