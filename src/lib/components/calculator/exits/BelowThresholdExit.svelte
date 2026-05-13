<script lang="ts">
	import { TrendingUp, Phone, ArrowRight } from '@lucide/svelte';
	import { fade } from 'svelte/transition';
	import type { CalculationResult } from '$lib/solar/calculator';

	interface Props {
		result: CalculationResult;
	}

	let { result }: Props = $props();
</script>

<div in:fade={{ duration: 300 }} class="py-8 text-center">
	<div
		class="mx-auto mb-6 flex size-16 items-center justify-center rounded-full"
		style="background-color: #FFC640;"
	>
		<TrendingUp class="size-8 text-zinc-900" />
	</div>
	<h2 class="font-heading text-2xl font-bold text-white md:text-3xl">
		Solar might not be the right fit yet.
	</h2>
	<p class="mx-auto mt-4 max-w-md text-zinc-400">
		{result.recommendedDescription}
	</p>

	<div class="mx-auto mt-8 flex max-w-sm flex-col gap-3">
		<a
			href="/contact"
			class="flex items-center justify-center gap-2 rounded-xl py-3.5 text-base font-semibold text-zinc-900"
			style="background-color: #FFC640;"
		>
			Book a free chat
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
</div>
