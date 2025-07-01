<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Alert from '$lib/components/ui/alert';
	import { ArrowRight, Loader2, CheckCircle, AlertTriangle } from '@lucide/svelte';
	import { fly } from 'svelte/transition';
	import { browser } from '$app/environment';

	// Temporary fallback values - replace with actual imports when available
	const EMAIL_ENDPOINT = '/api/careers';
	const logApiRequest = (url: string, options: any) => console.log('API Request:', url, options);
	const logApiResponse = (url: string, response: any) =>
		console.log('API Response:', url, response);

	// Contact form data
	let formData = {
		name: '',
		email: '',
		phone: '',
		jobAreas: [] as string[],
		message: ''
	};

	const jobAreaOptions = ['Sales', 'Installation', 'Administration', 'Electrician'];

	let loading = false;
	let submitted = false;
	let error = false;
	let errorMessage = '';

	function resetForm() {
		formData.name = '';
		formData.email = '';
		formData.phone = '';
		formData.jobAreas = [];
		formData.message = '';
		loading = false;
		error = false;
		errorMessage = '';
	}

	function handleJobAreaChange(area: string, checked: boolean) {
		if (checked) {
			formData.jobAreas = [...formData.jobAreas, area];
		} else {
			formData.jobAreas = formData.jobAreas.filter((a) => a !== area);
		}
	}

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();

		// Only proceed if we're running in the browser
		if (!browser) return;

		// Validate at least one job area is selected
		if (formData.jobAreas.length === 0) {
			error = true;
			errorMessage = 'Please select at least one job area you are interested in.';
			return;
		}

		loading = true;
		error = false;
		errorMessage = '';

		const submissionData = {
			name: formData.name,
			email: formData.email,
			phone: formData.phone,
			jobAreas: formData.jobAreas,
			message: formData.message,
			type: 'Career Interest'
		};

		try {
			const requestOptions: RequestInit = {
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
				let message = 'Failed to send application';

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
				throw new Error(result.error || 'Failed to send application');
			}
		} catch (err) {
			console.error('Error sending application:', err);
			logApiResponse(EMAIL_ENDPOINT, err);

			// Detect CORS errors which typically show up as TypeError or opaque responses
			if (err instanceof Error && err.name === 'TypeError' && err.message.includes('fetch')) {
				errorMessage =
					'Network error: Failed to connect to our server. This might be due to a CORS restriction or network issue.';
			} else {
				errorMessage =
					err instanceof Error ? err.message : 'Failed to send application. Please try again.';
			}

			error = true;
		} finally {
			loading = false;
		}
	}
</script>

<section class="relative flex w-full items-center justify-center pt-60 pb-24">
	<enhanced:img
		src="/src/lib/assets/images/careers.jpg"
		alt="Hero background"
		class="absolute inset-0 h-full w-full object-cover"
	/>
	<div class="absolute inset-0 bg-black opacity-50"></div>
	<h1 class="font-heading relative z-10 px-4 text-center text-4xl text-white lg:text-6xl/24">
		Looking for a job in renewable energy? <br /> We want to hear from you.
	</h1>
</section>

<section id="about" class="mx-auto">
	<div class="relative isolate overflow-hidden px-6 py-12 text-center sm:px-16 lg:py-24">
		<h2
			class="font-heading mx-auto max-w-2xl text-center text-4xl font-semibold text-balance sm:text-5xl"
		>
			Let’s work together
		</h2>

		<p class="mx-auto mt-6 max-w-2xl text-center text-lg text-pretty">
			Our team is fun, energetic and driven to make a change.
		</p>
		<p class="mx-auto mt-6 max-w-2xl text-center text-lg text-pretty">
			Interested in working with us? Fill out some info and we will be in touch shortly! We
			encourage people from all backgrounds, ages and genders to apply.
		</p>
	</div>
</section>

<!-- Career Application Form Section -->
<section class=" pb-24">
	<div class="mx-auto max-w-5xl px-6">
		{#if !submitted}
			<form on:submit={handleSubmit} method="POST" class="grid items-start gap-6">
				{#if error}
					<Alert.Root class="mb-4 border-red-200 bg-red-50 text-red-800">
						<AlertTriangle class="h-4 w-4 text-red-600" />
						<Alert.Title class="text-red-800">Submission Error</Alert.Title>
						<Alert.Description class="text-red-700">
							{errorMessage}
						</Alert.Description>
					</Alert.Root>
				{/if}

				<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
					<div class="grid gap-2">
						<Label for="full-name" class="text-sm/6 font-semibold text-gray-900">Full name</Label>
						<div class="mt-2.5">
							<input
								type="text"
								id="full-name"
								name="full-name"
								autocomplete="name"
								bind:value={formData.name}
								required
								class="block w-full rounded-full bg-zinc-100 px-6 py-2 text-base text-gray-900 placeholder:text-gray-600 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FFC640]"
							/>
						</div>
					</div>
					<div class="grid gap-2">
						<Label for="email" class="text-sm/6 font-semibold text-gray-900">Email</Label>
						<div class="mt-2.5">
							<input
								type="email"
								id="email"
								name="email"
								autocomplete="email"
								bind:value={formData.email}
								required
								class="block w-full rounded-full bg-zinc-100 px-6 py-2 text-base text-gray-900 placeholder:text-gray-600 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FFC640]"
							/>
						</div>
					</div>
				</div>

				<div class="grid gap-2">
					<div class="flex justify-between text-sm/6">
						<Label for="phone-number" class="font-semibold text-gray-900">Phone number</Label>
						<p class="text-gray-600">Required</p>
					</div>
					<div class="mt-2.5">
						<input
							type="tel"
							id="phone-number"
							name="phone-number"
							autocomplete="tel"
							bind:value={formData.phone}
							required
							class="block w-full rounded-full bg-zinc-100 px-6 py-2 text-base text-gray-900 placeholder:text-gray-600 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FFC640]"
						/>
					</div>
				</div>

				<div class="grid gap-4">
					<Label class="text-sm/6 font-semibold text-gray-900"
						>Which job areas are you interested in?</Label
					>
					<div class="grid grid-cols-2 gap-4 md:grid-cols-4">
						{#each jobAreaOptions as area}
							<label class="flex cursor-pointer items-center space-x-3">
								<button
									type="button"
									class="relative h-5 w-5 rounded-full border-2 border-gray-400 transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-[#FFC640] {formData.jobAreas.includes(
										area
									)
										? 'border-[#FFC640] bg-[#FFC640]'
										: 'bg-white hover:border-gray-500'}"
									on:click={() => handleJobAreaChange(area, !formData.jobAreas.includes(area))}
								>
									{#if formData.jobAreas.includes(area)}
										<div class="absolute inset-1 rounded-full bg-white"></div>
									{/if}
								</button>
								<span class="text-sm font-medium text-gray-900">{area}</span>
							</label>
						{/each}
					</div>
				</div>

				<div class="grid gap-2">
					<div class="flex justify-between text-sm/6">
						<Label for="message" class="font-semibold text-gray-900">Message</Label>
						<p class="text-gray-600">Max 500 characters</p>
					</div>
					<div class="mt-2.5">
						<textarea
							id="message"
							name="message"
							rows="4"
							bind:value={formData.message}
							placeholder="Please tell us about you and why you want to work with us"
							required
							class="block w-full rounded-lg bg-zinc-100 px-6 py-2 text-base text-gray-900 placeholder:text-gray-600 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FFC640]"
						></textarea>
					</div>
				</div>

				<div class="mt-6 flex justify-center">
					{#if !loading}
						<button
							type="submit"
							class="rounded-full bg-black px-8 py-3 text-center text-sm font-semibold text-white hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
						>
							Submit Application
							<ArrowRight class="ml-2 inline h-4 w-4" />
						</button>
					{:else}
						<button
							type="button"
							disabled
							class="rounded-full bg-gray-600 px-8 py-3 text-center text-sm font-semibold text-white"
						>
							<Loader2 class="mr-2 inline h-4 w-4 animate-spin" />
							Submitting...
						</button>
					{/if}
				</div>
			</form>
		{:else}
			<div class="flex justify-center" in:fly={{ y: 20, duration: 300 }}>
				<div class="w-full max-w-lg">
					<Alert.Root class="border-green-200 bg-green-50 text-green-800">
						<CheckCircle class="h-4 w-4 fill-green-600 text-green-600" />
						<Alert.Title class="text-green-800">Your application has been received!</Alert.Title>
						<Alert.Description class="text-green-700">
							Thank you for your interest in working with Maximum Solar. A member of our team will
							review your application and get back to you shortly.
						</Alert.Description>
					</Alert.Root>
					<div class="mt-6 flex justify-center">
						<button
							on:click={() => {
								submitted = false;
								resetForm();
							}}
							class="rounded-full bg-black px-8 py-3 text-center text-sm font-semibold text-white hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
						>
							Submit Another Application
						</button>
					</div>
				</div>
			</div>
		{/if}
	</div>
</section>
