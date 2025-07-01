<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { ArrowRight, CheckCircle, Loader2 } from '@lucide/svelte';

	let email = $state('');
	let loading = $state(false);
	let success = $state(false);
	let error = $state('');

	onMount(() => {
		const form = document.querySelector('form');
		form.addEventListener('submit', handleSubmit);
	});

	function resetForm() {
		if (success) {
			success = false;
			email = '';
			error = '';
		}
	}

	async function handleSubmit(event) {
		event.preventDefault();
		loading = true;
		error = '';

		try {
			const response = await fetch('https://formspree.io/f/mwpkengg', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email })
			});

			if (response.ok) {
				success = true;
				email = '';
			} else {
				throw new Error('Submission failed');
			}
		} catch (err) {
			error = 'An error occurred. Please try again.';
		} finally {
			loading = false;
		}
	}
</script>

<form class="w-full max-w-md">
	<div class="relative flex w-full items-center justify-center">
		<div class="flex-grow">
			<Input
				placeholder="Enter your email"
				type="email"
				id="email"
				name="email"
				bind:value={email}
				required
				class="h-12 w-full rounded-full pr-4 pl-4 text-gray-700 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
				on:focus={resetForm}
			/>
		</div>

		<Button
			type="submit"
			size="icon"
			class="{success
				? 'bg-[#FFC640] hover:bg-[#FFC640]/80'
				: 'bg-[#FFC640] hover:bg-[#FFC640]/80'} absolute right-2 flex items-center justify-center rounded-full font-bold text-white transition duration-300 ease-in-out"
			disabled={loading || success}
		>
			{#if loading}
				<Loader2 class="h-5 w-5 animate-spin" />
			{:else if success}
				<CheckCircle class="h-5 w-5" />
			{:else}
				<ArrowRight class="h-5 w-5 text-black" />
			{/if}
		</Button>
	</div>

	{#if error}
		<p transition:fade class="mt-4 text-center text-red-600">{error}</p>
	{/if}
</form>
