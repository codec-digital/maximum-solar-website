<script lang="ts">
	import { Building2, Phone, ArrowRight, ArrowLeft } from '@lucide/svelte';
	import { fade } from 'svelte/transition';
	import { quizState } from '$lib/state/quiz.svelte';

	function goBack() {
		quizState.exitType = null;
		quizState.currentStep = 1;
	}
</script>

<div in:fade={{ duration: 300 }} class="py-8 text-center">
	<div
		class="mx-auto mb-6 flex size-16 items-center justify-center rounded-full"
		style="background-color: #FFC640;"
	>
		<Building2 class="size-8 text-zinc-900" />
	</div>
	<h2 class="font-heading text-2xl font-bold text-white md:text-3xl">
		We'd love to help with your commercial solar needs.
	</h2>
	<p class="mx-auto mt-4 max-w-md text-zinc-400">
		Commercial solar has different requirements and opportunities. Our team handles commercial
		assessments personally to ensure you get the right solution for your business.
	</p>

	<div class="mx-auto mt-8 flex max-w-sm flex-col gap-3">
		<a
			href="/commercial-solar"
			class="flex items-center justify-center gap-2 rounded-xl py-3.5 text-base font-semibold text-zinc-900"
			style="background-color: #FFC640;"
		>
			View Commercial Solar
			<ArrowRight class="size-5" />
		</a>
		<a
			href="tel:1300457542"
			class="flex items-center justify-center gap-2 rounded-xl border-2 border-zinc-700 py-3.5 text-base font-semibold text-white transition-colors hover:border-[#FFC640]"
		>
			<Phone class="size-5" />
			Call 1300 457 542
		</a>
	</div>

	<button
		onclick={goBack}
		class="mx-auto mt-6 flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
	>
		<ArrowLeft class="size-4" />
		Back to calculator
	</button>
</div>
