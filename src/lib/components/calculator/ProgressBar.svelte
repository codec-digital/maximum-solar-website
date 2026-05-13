<script lang="ts">
	interface Props {
		currentStep: number;
		totalSteps: number;
	}

	let { currentStep, totalSteps }: Props = $props();

	const percent = $derived(Math.round((currentStep / totalSteps) * 100));
</script>

<div class="mb-8">
	<div class="mb-2 flex items-center justify-between">
		<span class="text-sm font-medium text-zinc-400">Step {currentStep} of {totalSteps}</span>
		<span class="text-sm font-medium text-zinc-400">{percent}%</span>
	</div>
	<div class="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
		<div
			class="h-full rounded-full transition-all duration-500 ease-out"
			style="width: {percent}%; background-color: #FFC640;"
		></div>
	</div>
</div>
