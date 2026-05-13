<script lang="ts">
	import { quizState } from '$lib/state/quiz.svelte';
	import { ArrowLeft } from '@lucide/svelte';
	import { fade } from 'svelte/transition';
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		subtitle?: string;
		showBack?: boolean;
		children: Snippet;
	}

	let { title, subtitle, showBack = true, children }: Props = $props();
</script>

<div in:fade={{ duration: 200 }}>
	{#if showBack && quizState.currentStep > 1}
		<button
			onclick={() => (quizState.currentStep -= 1)}
			class="mb-6 flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-white"
		>
			<ArrowLeft class="size-4" />
			Back
		</button>
	{/if}

	<h2 class="font-heading text-2xl font-bold text-white md:text-3xl">{title}</h2>
	{#if subtitle}
		<p class="mt-2 text-zinc-400">{subtitle}</p>
	{/if}

	<div class="mt-8">
		{@render children()}
	</div>
</div>
