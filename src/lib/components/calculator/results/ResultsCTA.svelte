<script lang="ts">
	import type { CalculationResult } from '$lib/solar/calculator';
	import type { QuizStateInputs } from '$lib/state/quiz.svelte';
	import { Phone, ArrowRight, Battery, Car } from '@lucide/svelte';
	import { fade } from 'svelte/transition';

	interface Props {
		result: CalculationResult;
		inputs: QuizStateInputs;
	}

	let { result, inputs }: Props = $props();
</script>

<div in:fade={{ duration: 300 }} class="space-y-6">
	<!-- Battery / EV callouts -->
	{#if inputs.batteryMaybe}
		<div class="flex items-start gap-3 rounded-xl border border-amber-900/50 bg-amber-950/30 p-4">
			<Battery class="mt-0.5 size-5 flex-shrink-0 text-[#FFC640]" />
			<p class="text-sm text-zinc-300">
				<strong class="text-white">Battery storage:</strong> You indicated interest in battery storage.
				Our team can discuss battery options and show you the savings at your site assessment.
			</p>
		</div>
	{/if}

	{#if inputs.hasEvPlanned}
		<div class="flex items-start gap-3 rounded-xl border border-amber-900/50 bg-amber-950/30 p-4">
			<Car class="mt-0.5 size-5 flex-shrink-0 text-[#FFC640]" />
			<p class="text-sm text-zinc-300">
				<strong class="text-white">Planning an EV?</strong> We'll model EV charging into your system
				design at your personalised site assessment.
			</p>
		</div>
	{/if}

	{#if result.isHighExport}
		<div class="flex items-start gap-3 rounded-xl border border-amber-900/50 bg-amber-950/30 p-4">
			<Battery class="mt-0.5 size-5 flex-shrink-0 text-[#FFC640]" />
			<p class="text-sm text-zinc-300">
				<strong class="text-white">Battery opportunity:</strong> Your export ratio suggests a battery
				could significantly boost your savings. Ask about this at your assessment.
			</p>
		</div>
	{/if}

	<!-- Primary CTA -->
	<div class="rounded-2xl bg-zinc-800 p-8 text-center ring-1 ring-white/10">
		<h3 class="font-heading text-2xl font-bold text-white">Ready to get started?</h3>
		<p class="mt-2 text-zinc-400">
			Book your free, no-obligation site assessment with a Maximum Solar specialist.
		</p>
		<div class="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
			<a
				href="/contact"
				class="flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold text-zinc-900 transition-opacity hover:opacity-90"
				style="background-color: #FFC640;"
			>
				Book Your Free Site Assessment
				<ArrowRight class="size-5" />
			</a>
			<a
				href="tel:1300457542"
				class="flex items-center justify-center gap-2 rounded-xl border border-zinc-600 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:border-[#FFC640]"
			>
				<Phone class="size-5" />
				1300 457 542
			</a>
		</div>
	</div>
</div>
