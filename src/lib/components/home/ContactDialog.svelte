<script lang="ts">
	import { MediaQuery } from 'svelte/reactivity';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Alert from '$lib/components/ui/alert';
	import { ArrowRight, Loader2, CheckCircle, AlertTriangle } from '@lucide/svelte';
	import { fly } from 'svelte/transition';
	import { browser } from '$app/environment';
	// import { EMAIL_ENDPOINT } from '$lib/config/environment';
	// import { logApiRequest, logApiResponse } from '$lib/utils/api-debug';

	let open = false;
	const isDesktop = new MediaQuery('(min-width: 768px)');

	// Contact form data
	let formData = {
		name: '',
		email: '',
		phone: '',
		preferredContact: 'Either',
		message: ''
	};

	let loading = false;
	let submitted = false;
	let error = false;
	let errorMessage = '';

	function resetForm() {
		formData.name = '';
		formData.email = '';
		formData.phone = '';
		formData.preferredContact = 'Either';
		formData.message = '';
		loading = false;
		error = false;
		errorMessage = '';
	}

	function closeAndReset() {
		open = false;
		setTimeout(() => {
			submitted = false;
			resetForm();
		}, 300); // Reset after dialog closes
	}

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();

		// Only proceed if we're running in the browser
		if (!browser) return;

		loading = true;
		error = false;
		errorMessage = '';

		const submissionData = {
			name: formData.name,
			email: formData.email,
			phone: formData.phone,
			preferredContact: formData.preferredContact,
			message: formData.message,
			type: 'Solar Quote Request'
		};

		try {
			const requestOptions = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(submissionData),
				credentials: 'same-origin'
			};

			logApiRequest(EMAIL_ENDPOINT, requestOptions);
			const response = await fetch(EMAIL_ENDPOINT, requestOptions);

			if (!response.ok) {
				const errorText = await response.text().catch(() => '');
				let message = 'Failed to send email';

				try {
					// Try to parse error as JSON
					const errorJson = JSON.parse(errorText);
					if (errorJson && errorJson.error) {
						message = errorJson.error;
					}
				} catch (e) {
					// If not JSON, use status text
					message = `Server error: ${response.status} ${response.statusText}`;
				}

				throw new Error(message);
			}

			const result = await response.json();

			if (result.success) {
				resetForm();
				submitted = true;
			} else {
				throw new Error(result.error || 'Failed to send email');
			}
		} catch (error) {
			console.error('Error sending email:', error);
			logApiResponse(EMAIL_ENDPOINT, error);

			// Detect CORS errors which typically show up as TypeError or opaque responses
			if (error.name === 'TypeError' && error.message.includes('fetch')) {
				errorMessage =
					'Network error: Failed to connect to our server. This might be due to a CORS restriction or network issue.';
			} else {
				errorMessage = error.message || 'Failed to send email. Please try again.';
			}

			error = true;
		} finally {
			loading = false;
		}
	}
</script>

{#if isDesktop.current}
	<Dialog.Root bind:open>
		<Dialog.Trigger>
			<button
				class="all rounded-full bg-white px-8 py-4 text-base font-bold text-black transition hover:bg-white/80 sm:text-lg"
			>
				Get Your Free Quote <ArrowRight class="ml-2 inline h-5 w-5" />
			</button>
		</Dialog.Trigger>
		<Dialog.Content class="dark bg-black sm:max-w-[550px]">
			<Dialog.Header>
				<h2 class="font-heading text-3xl font-semibold tracking-tight text-white">
					Switch to solar at no upfront cost
				</h2>
				<Dialog.Description class="mt-2 text-lg/8 text-gray-300">
					Find out how much you could save with a solar-powered solution.
				</Dialog.Description>
			</Dialog.Header>

			{#if !submitted}
				<form on:submit={handleSubmit} method="POST" class="mt-6 grid items-start gap-4">
					{#if error}
						<Alert.Root class="mb-4 bg-red-50/10 text-white">
							<AlertTriangle class="h-4 w-4 text-red-400" />
							<Alert.Title class="text-white">Submission Error</Alert.Title>
							<Alert.Description class="text-gray-300">
								{errorMessage}
							</Alert.Description>
						</Alert.Root>
					{/if}
					<div class="grid gap-2">
						<Label for="full-name" class="text-sm/6 font-semibold text-white">Full name</Label>
						<div class="mt-2.5">
							<input
								type="text"
								id="full-name"
								name="full-name"
								autocomplete="name"
								bind:value={formData.name}
								required
								class="block w-full rounded-full bg-zinc-800 px-6 py-2 text-base text-white placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#FFC640]"
							/>
						</div>
					</div>
					<div class="grid gap-2">
						<Label for="email" class="text-sm/6 font-semibold text-white">Email</Label>
						<div class="mt-2.5">
							<input
								type="email"
								id="email"
								name="email"
								autocomplete="email"
								bind:value={formData.email}
								required
								class="block w-full rounded-full bg-zinc-800 px-6 py-2 text-base text-white placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#FFC640]"
							/>
						</div>
					</div>
					<div class="grid gap-2">
						<div class="flex justify-between text-sm/6">
							<Label for="phone-number" class="font-semibold text-white">Phone number</Label>
							<p class="text-gray-400">Required</p>
						</div>
						<div class="mt-2.5">
							<input
								type="tel"
								id="phone-number"
								name="phone-number"
								autocomplete="tel"
								bind:value={formData.phone}
								required
								class="block w-full rounded-full bg-zinc-800 px-6 py-2 text-base text-white placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#FFC640]"
							/>
						</div>
					</div>
					<div class="grid gap-2">
						<Label for="preferred-contact" class="text-sm/6 font-semibold text-white"
							>Preferred contact method</Label
						>
						<div class="mt-2.5">
							<select
								id="preferred-contact"
								name="preferred-contact"
								bind:value={formData.preferredContact}
								class="block w-full rounded-full bg-zinc-800 px-6 py-2 text-base text-white placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#FFC640]"
							>
								<option value="Either">Either</option>
								<option value="Phone">Phone</option>
								<option value="Email">Email</option>
							</select>
						</div>
					</div>
					<div class="grid gap-2">
						<div class="flex justify-between text-sm/6">
							<Label for="message" class="font-semibold text-white">Message</Label>
							<p class="text-gray-400">Max 500 characters</p>
						</div>
						<div class="mt-2.5">
							<textarea
								id="message"
								name="message"
								rows="4"
								bind:value={formData.message}
								placeholder="Tell us about your property and any specific requirements"
								class="block w-full rounded-lg bg-zinc-800 px-6 py-2 text-base text-white placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#FFC640]"
							></textarea>
						</div>
					</div>
					<div class="mt-6 flex justify-center">
						{#if !loading}
							<button
								type="submit"
								class="rounded-full bg-white px-8 py-3 text-center text-sm font-semibold text-black shadow-sm hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFC640]"
							>
								Get Your Free Solar Quote
								<ArrowRight class="ml-2 inline h-4 w-4" />
							</button>
						{:else}
							<button
								type="button"
								disabled
								class="rounded-full bg-white px-8 py-3 text-center text-sm font-semibold text-black shadow-sm"
							>
								<Loader2 class="mr-2 inline h-4 w-4 animate-spin" />
								Submitting...
							</button>
						{/if}
					</div>
				</form>
			{:else}
				<div in:fly={{ y: 20, duration: 300 }}>
					<Alert.Root class="border-[#FFC640] bg-green-50/10 text-white">
						<CheckCircle class="h-4 w-4 fill-[#FFC640] text-[#FFC640]" />
						<Alert.Title class="text-white">Your request has been received!</Alert.Title>
						<Alert.Description class="text-gray-300">
							Thank you for your interest. A member of our team will get back to you shortly with a
							free solar quote.
						</Alert.Description>
					</Alert.Root>
					<div class="mt-6 flex justify-center">
						<button
							on:click={closeAndReset}
							class="rounded-full bg-white px-8 py-3 text-center text-sm font-semibold text-black shadow-sm hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFC640]"
						>
							Close
						</button>
					</div>
				</div>
			{/if}

			{#if !submitted}
				<Dialog.Footer class="mt-4">
					<Dialog.Close
						class="dark border-white/10 text-gray-400 transition hover:border-white/30 hover:bg-black/50 hover:text-white"
					>
						Cancel
					</Dialog.Close>
				</Dialog.Footer>
			{/if}
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open>
		<Drawer.Trigger>
			<button
				class="all rounded-full bg-white px-8 py-4 text-base font-bold text-black transition hover:bg-white/80 sm:text-lg"
			>
				Get Your Free Quote <ArrowRight class="ml-2 inline h-5 w-5" />
			</button>
		</Drawer.Trigger>
		<Drawer.Content class="dark flex h-[80vh] flex-col  bg-black">
			<div class="h-full overflow-auto">
				<Drawer.Header class="text-center">
					<h2 class="font-heading text-3xl font-semibold tracking-tight text-white">
						Switch to solar at no upfront cost
					</h2>
					<Drawer.Description class="mt-2 text-lg/8 text-gray-300">
						Find out how much you could save with a solar-powered solution.
					</Drawer.Description>
				</Drawer.Header>

				{#if !submitted}
					<form on:submit={handleSubmit} method="POST" class="grid items-start gap-4 px-4">
						{#if error}
							<Alert.Root class="mb-4 bg-red-50/10 text-white">
								<AlertTriangle class="h-4 w-4 text-red-400" />
								<Alert.Title class="text-white">Submission Error</Alert.Title>
								<Alert.Description class="text-gray-300">
									{errorMessage}
								</Alert.Description>
							</Alert.Root>
						{/if}
						<div class="grid gap-2">
							<Label for="mobile-full-name" class="text-sm/6 font-semibold text-white"
								>Full name</Label
							>
							<div class="mt-2.5">
								<input
									type="text"
									id="mobile-full-name"
									name="full-name"
									autocomplete="name"
									bind:value={formData.name}
									required
									class="block w-full rounded-full bg-zinc-800 px-6 py-2 text-base text-white placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#FFC640]"
								/>
							</div>
						</div>
						<div class="grid gap-2">
							<Label for="mobile-email" class="text-sm/6 font-semibold text-white">Email</Label>
							<div class="mt-2.5">
								<input
									type="email"
									id="mobile-email"
									name="email"
									autocomplete="email"
									bind:value={formData.email}
									required
									class="block w-full rounded-full bg-zinc-800 px-6 py-2 text-base text-white placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#FFC640]"
								/>
							</div>
						</div>
						<div class="grid gap-2">
							<div class="flex justify-between text-sm/6">
								<Label for="mobile-phone-number" class="font-semibold text-white"
									>Phone number</Label
								>
								<p class="text-gray-400">Required</p>
							</div>
							<div class="mt-2.5">
								<input
									type="tel"
									id="mobile-phone-number"
									name="phone-number"
									autocomplete="tel"
									bind:value={formData.phone}
									required
									class="block w-full rounded-full bg-zinc-800 px-6 py-2 text-base text-white placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#FFC640]"
								/>
							</div>
						</div>
						<div class="grid gap-2">
							<Label for="mobile-preferred-contact" class="text-sm/6 font-semibold text-white"
								>Preferred contact method</Label
							>
							<div class="mt-2.5">
								<select
									id="mobile-preferred-contact"
									name="preferred-contact"
									bind:value={formData.preferredContact}
									class="block w-full rounded-full bg-zinc-800 px-6 py-2 text-base text-white placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#FFC640]"
								>
									<option value="Either">Either</option>
									<option value="Phone">Phone</option>
									<option value="Email">Email</option>
								</select>
							</div>
						</div>
						<div class="grid gap-2">
							<div class="flex justify-between text-sm/6">
								<Label for="mobile-message" class="font-semibold text-white">Message</Label>
								<p class="text-gray-400">Max 500 characters</p>
							</div>
							<div class="mt-2.5">
								<textarea
									id="mobile-message"
									name="message"
									rows="4"
									bind:value={formData.message}
									placeholder="Tell us about your property and any specific requirements"
									class="block w-full rounded-lg bg-zinc-800 px-6 py-2 text-base text-white placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#FFC640]"
								></textarea>
							</div>
						</div>
						<div class="mt-6 flex justify-center">
							{#if !loading}
								<button
									type="submit"
									class="rounded-full bg-white px-8 py-3 text-center text-sm font-semibold text-black shadow-sm hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFC640]"
								>
									Get Your Free Solar Quote
									<ArrowRight class="ml-2 inline h-4 w-4" />
								</button>
							{:else}
								<button
									type="button"
									disabled
									class="rounded-full bg-white px-8 py-3 text-center text-sm font-semibold text-black shadow-sm"
								>
									<Loader2 class="mr-2 inline h-4 w-4 animate-spin" />
									Submitting...
								</button>
							{/if}
						</div>
					</form>
				{:else}
					<div class="px-4" in:fly={{ y: 20, duration: 300 }}>
						<Alert.Root class="border-[#FFC640] bg-green-50/10 text-white">
							<CheckCircle class="h-4 w-4 fill-[#FFC640] text-[#FFC640]" />
							<Alert.Title class="text-white">Your request has been received!</Alert.Title>
							<Alert.Description class="text-gray-300">
								Thank you for your interest. A member of our team will get back to you shortly with
								a free solar quote.
							</Alert.Description>
						</Alert.Root>
						<div class="mt-6 flex justify-center">
							<button
								on:click={closeAndReset}
								class="rounded-full bg-white px-8 py-3 text-center text-sm font-semibold text-black shadow-sm hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFC640]"
							>
								Close
							</button>
						</div>
					</div>
				{/if}

				{#if !submitted}
					<Drawer.Footer class="flex justify-center pt-4">
						<Drawer.Close
							class="rounded-full border border-white/10 px-5 py-2 text-gray-400 transition hover:border-white/30 hover:bg-black/50 hover:text-white"
						>
							Cancel
						</Drawer.Close>
					</Drawer.Footer>
				{/if}
			</div>
		</Drawer.Content>
	</Drawer.Root>
{/if}
