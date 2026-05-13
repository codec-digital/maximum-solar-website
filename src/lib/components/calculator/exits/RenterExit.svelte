<script lang="ts">
	import { Loader2, Mail, ArrowLeft } from '@lucide/svelte';
	import { fade } from 'svelte/transition';
	import { quizState } from '$lib/state/quiz.svelte';

	function goBack() {
		quizState.exitType = null;
		quizState.currentStep = 1;
	}

	let email = $state('');
	let submitted = $state(false);
	let loading = $state(false);
	let error = $state('');

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			error = 'Please enter a valid email address.';
			return;
		}
		loading = true;
		error = '';
		try {
			await fetch('/api/send-email', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email,
					type: 'Renter Interest',
					name: 'Renter',
					phone: '',
					postCode: '',
					preferredContact: 'Email',
					message: 'User indicated they rent and would like to be notified of renter solar options.'
				})
			});
			submitted = true;
		} catch {
			error = 'Something went wrong. Please try again.';
		} finally {
			loading = false;
		}
	}
</script>

<div in:fade={{ duration: 300 }} class="py-8 text-center">
	<div
		class="mx-auto mb-6 flex size-16 items-center justify-center rounded-full"
		style="background-color: #FFC640;"
	>
		<Mail class="size-8 text-zinc-900" />
	</div>
	<h2 class="font-heading text-2xl font-bold text-white md:text-3xl">
		Solar for renters is coming.
	</h2>
	<p class="mx-auto mt-4 max-w-md text-zinc-400">
		We're tracking the growth of community solar and renter-friendly battery schemes in Tasmania.
		Leave your email and we'll update you when options become available.
	</p>

	{#if submitted}
		<div
			class="mx-auto mt-8 max-w-sm rounded-xl border border-green-800 bg-green-950/50 p-4 text-green-400"
		>
			Thanks! We'll be in touch when renter options become available.
		</div>
	{:else}
		<form onsubmit={handleSubmit} class="mx-auto mt-8 max-w-sm space-y-3">
			<input
				type="email"
				placeholder="Your email address"
				bind:value={email}
				class="w-full rounded-xl border-2 border-zinc-700 bg-zinc-800 px-4 py-3 text-base text-white outline-none transition-all placeholder:text-zinc-500 focus:border-[#FFC640] {error
					? 'border-red-500'
					: ''}"
			/>
			{#if error}
				<p class="text-sm text-red-400">{error}</p>
			{/if}
			<button
				type="submit"
				disabled={loading}
				class="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-base font-semibold text-zinc-900 disabled:opacity-60"
				style="background-color: #FFC640;"
			>
				{#if loading}
					<Loader2 class="size-5 animate-spin" />
				{:else}
					Keep me updated
				{/if}
			</button>
		</form>
	{/if}

	<button
		onclick={goBack}
		class="mx-auto mt-6 flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
	>
		<ArrowLeft class="size-4" />
		Back to calculator
	</button>
</div>
