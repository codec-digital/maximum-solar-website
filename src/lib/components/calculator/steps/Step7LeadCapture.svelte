<script lang="ts">
	import StepWrapper from '../StepWrapper.svelte';
	import { quizState } from '$lib/state/quiz.svelte';
	import { Label } from '$lib/components/ui/label';
	import { Loader2, Lock } from '@lucide/svelte';

	interface Props {
		onSubmit: (data: {
			firstName: string;
			lastName: string;
			email: string;
			phone: string;
		}) => Promise<void>;
		onBasicReport: () => void;
		submitting: boolean;
		submitError: string;
	}

	let { onSubmit, onBasicReport, submitting, submitError }: Props = $props();

	let firstName = $state(quizState.inputs.firstName);
	let lastName = $state(quizState.inputs.lastName);
	let email = $state(quizState.inputs.email);
	let phone = $state(quizState.inputs.phone);
	let errors = $state<Record<string, string>>({});

	function validate() {
		const e: Record<string, string> = {};
		if (!firstName.trim()) e.firstName = 'First name is required.';
		if (!lastName.trim()) e.lastName = 'Last name is required.';
		if (!email.trim()) e.email = 'Email address is required.';
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Please enter a valid email.';
		if (!phone.trim()) e.phone = 'Phone number is required.';
		else if (!/^[\d\s\+\-\(\)]{8,}$/.test(phone)) e.phone = 'Please enter a valid phone number.';
		return e;
	}

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		errors = validate();
		if (Object.keys(errors).length > 0) return;

		quizState.inputs.firstName = firstName;
		quizState.inputs.lastName = lastName;
		quizState.inputs.email = email;
		quizState.inputs.phone = phone;

		await onSubmit({ firstName, lastName, email, phone });
	}

	const inputBase =
		'w-full rounded-xl border-2 border-zinc-700 bg-zinc-800 px-4 py-3 text-base text-white outline-none transition-all placeholder:text-zinc-500 focus:border-[#FFC640]';
	const inputError = 'border-red-500';
</script>

<StepWrapper
	title="See your personalised savings estimate"
	subtitle="Enter your details to unlock your full results. Free and no obligation."
>
	<form onsubmit={handleSubmit} class="space-y-4">
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
			<div>
				<Label for="firstName" class="mb-1.5 block text-sm font-medium text-zinc-300"
					>First name</Label
				>
				<input
					id="firstName"
					type="text"
					autocomplete="given-name"
					placeholder="Jane"
					bind:value={firstName}
					class="{inputBase} {errors.firstName ? inputError : ''}"
				/>
				{#if errors.firstName}
					<p class="mt-1 text-sm text-red-400">{errors.firstName}</p>
				{/if}
			</div>
			<div>
				<Label for="lastName" class="mb-1.5 block text-sm font-medium text-zinc-300"
					>Last name</Label
				>
				<input
					id="lastName"
					type="text"
					autocomplete="family-name"
					placeholder="Smith"
					bind:value={lastName}
					class="{inputBase} {errors.lastName ? inputError : ''}"
				/>
				{#if errors.lastName}
					<p class="mt-1 text-sm text-red-400">{errors.lastName}</p>
				{/if}
			</div>
		</div>

		<div>
			<Label for="email" class="mb-1.5 block text-sm font-medium text-zinc-300">Email address</Label
			>
			<input
				id="email"
				type="email"
				autocomplete="email"
				placeholder="jane@example.com"
				bind:value={email}
				class="{inputBase} {errors.email ? inputError : ''}"
			/>
			{#if errors.email}
				<p class="mt-1 text-sm text-red-400">{errors.email}</p>
			{/if}
		</div>

		<div>
			<Label for="phone" class="mb-1.5 block text-sm font-medium text-zinc-300">Phone number</Label>
			<input
				id="phone"
				type="tel"
				autocomplete="tel"
				placeholder="0400 000 000"
				bind:value={phone}
				class="{inputBase} {errors.phone ? inputError : ''}"
			/>
			{#if errors.phone}
				<p class="mt-1 text-sm text-red-400">{errors.phone}</p>
			{/if}
		</div>

		{#if submitError}
			<div class="rounded-xl border border-red-900 bg-red-950/50 p-4 text-sm text-red-400">
				{submitError}
			</div>
		{/if}

		<button
			type="submit"
			disabled={submitting}
			class="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-base font-semibold text-zinc-900 transition-opacity disabled:opacity-60"
			style="background-color: #FFC640;"
		>
			{#if submitting}
				<Loader2 class="size-5 animate-spin" />
				Calculating your savings…
			{:else}
				See My Savings →
			{/if}
		</button>

		<p class="flex items-center justify-center gap-1.5 text-xs text-zinc-600">
			<Lock class="size-3.5" />
			Your details are only shared with Maximum Solar. We don't sell or share your information with third
			parties.
		</p>
	</form>

	<div class="mt-5 text-center">
		<button
			onclick={onBasicReport}
			class="text-sm text-zinc-500 underline underline-offset-2 transition-colors hover:text-zinc-300"
		>
			Show me my basic report (no details required)
		</button>
	</div>
</StepWrapper>
