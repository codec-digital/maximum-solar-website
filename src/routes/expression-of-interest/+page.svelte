<script lang="ts">
	import Seo from '$lib/components/SEO.svelte';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Alert from '$lib/components/ui/alert';
	import { ArrowRight, Loader2, CheckCircle, AlertTriangle } from '@lucide/svelte';
	import { fly } from 'svelte/transition';
	import { browser } from '$app/environment';
	import Map from '$lib/components/Map.svelte';

	// Email endpoint for expression of interest
	const EMAIL_ENDPOINT = '/api/send-eoi';
	const logApiRequest = (url: string, options: any) => console.log('API Request:', url, options);
	const logApiResponse = (url: string, response: any) =>
		console.log('API Response:', url, response);

	// Expression of Interest form data
	let formData = {
		companyName: '',
		yourName: '',
		positionHeld: '',
		phone: '',
		email: '',
		formType: 'Expression of Interest'
	};

	let loading = false;
	let submitted = false;
	let error = false;
	let errorMessage = '';

	function resetForm() {
		formData.companyName = '';
		formData.yourName = '';
		formData.positionHeld = '';
		formData.phone = '';
		formData.email = '';
		formData.formType = 'Expression of Interest';
		loading = false;
		error = false;
		errorMessage = '';
	}

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();

		// Only proceed if we're running in the browser
		if (!browser) return;

		loading = true;
		error = false;
		errorMessage = '';

		const submissionData = {
			companyName: formData.companyName,
			yourName: formData.yourName,
			positionHeld: formData.positionHeld,
			phone: formData.phone,
			email: formData.email,
			type: formData.formType
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
		} catch (err) {
			console.error('Error sending email:', err);
			logApiResponse(EMAIL_ENDPOINT, err);

			// Detect CORS errors which typically show up as TypeError or opaque responses
			if (err instanceof Error && err.name === 'TypeError' && err.message.includes('fetch')) {
				errorMessage =
					'Network error: Failed to connect to our server. This might be due to a CORS restriction or network issue.';
			} else {
				errorMessage =
					err instanceof Error ? err.message : 'Failed to send email. Please try again.';
			}

			error = true;
		} finally {
			loading = false;
		}
	}
</script>

<Seo
	title="Expression of Interest - Maximum Solar Builder Partnership"
	description="Join Maximum Solar's network of trusted builders. Express your interest in partnering with Tasmania's leading solar installation company for residential and commercial projects."
	keywords="Maximum Solar partnership, builder collaboration Tasmania, solar installation partnership, commercial solar builders, residential solar contractors"
	type="WebPage"
/>

<section id="about" class="mx-auto">
	<div
		class="relative isolate overflow-hidden bg-black px-6 pt-60 pb-24 text-center shadow-2xl sm:px-16"
	>
		<h2
			class="font-heading mx-auto max-w-2xl text-center text-4xl font-semibold text-balance text-white sm:text-5xl"
		>
			Expression of Interest
		</h2>
		<p class="mx-auto mt-6 max-w-2xl text-center text-lg text-pretty text-white">
			Thank you for your interest in partnering with Maximum Solar. We work with trusted builders
			across Tasmania to deliver exceptional solar solutions for residential and commercial
			projects.
		</p>
		<p class="mx-auto mt-6 max-w-2xl text-center text-base text-pretty text-white italic">
			Fill out the form below to learn more about our products and services.
		</p>
	</div>
</section>

<!-- Expression of Interest Form Section -->
<section class="bg-black pb-32">
	<div class="mx-auto max-w-3xl px-6">
		{#if !submitted}
			<form on:submit={handleSubmit} method="POST" class="grid items-start gap-6">
				{#if error}
					<Alert.Root class="mb-4 bg-red-50/10 text-white">
						<AlertTriangle class="h-4 w-4 text-red-400" />
						<Alert.Title class="text-white">Submission Error</Alert.Title>
						<Alert.Description class="text-gray-300">
							{errorMessage}
						</Alert.Description>
					</Alert.Root>
				{/if}

				<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
					<div class="grid gap-2">
						<Label for="company-name" class="text-sm/6 font-semibold text-white">Company name</Label
						>
						<div class="mt-2.5">
							<input
								type="text"
								id="company-name"
								name="company-name"
								autocomplete="organization"
								bind:value={formData.companyName}
								required
								class="block w-full rounded-full bg-zinc-800 px-6 py-2 text-base text-white placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FFC640]"
							/>
						</div>
					</div>
					<div class="grid gap-2">
						<Label for="your-name" class="text-sm/6 font-semibold text-white">Your name</Label>
						<div class="mt-2.5">
							<input
								type="text"
								id="your-name"
								name="your-name"
								autocomplete="name"
								bind:value={formData.yourName}
								required
								class="block w-full rounded-full bg-zinc-800 px-6 py-2 text-base text-white placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FFC640]"
							/>
						</div>
					</div>
				</div>

				<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
					<div class="grid gap-2">
						<Label for="position-held" class="text-sm/6 font-semibold text-white"
							>Position held</Label
						>
						<div class="mt-2.5">
							<input
								type="text"
								id="position-held"
								name="position-held"
								autocomplete="organization-title"
								bind:value={formData.positionHeld}
								required
								class="block w-full rounded-full bg-zinc-800 px-6 py-2 text-base text-white placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FFC640]"
							/>
						</div>
					</div>
					<div class="grid gap-2">
						<Label for="phone-number" class="text-sm/6 font-semibold text-white">Phone number</Label
						>
						<div class="mt-2.5">
							<input
								type="tel"
								id="phone-number"
								name="phone-number"
								autocomplete="tel"
								bind:value={formData.phone}
								required
								class="block w-full rounded-full bg-zinc-800 px-6 py-2 text-base text-white placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FFC640]"
							/>
						</div>
					</div>
				</div>

				<div class="grid grid-cols-1 gap-6">
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
								class="block w-full rounded-full bg-zinc-800 px-6 py-2 text-base text-white placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FFC640]"
							/>
						</div>
					</div>
				</div>

				<div class="mt-6 flex justify-center">
					{#if !loading}
						<button
							type="submit"
							class="rounded-full bg-white px-8 py-3 text-center text-sm font-semibold text-black shadow-sm hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFC640]"
						>
							Submit
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
			<div class="flex justify-center" in:fly={{ y: 20, duration: 300 }}>
				<div class="w-full max-w-lg">
					<Alert.Root class="border-[#FFC640] bg-green-50/10 text-white">
						<CheckCircle class="h-4 w-4 fill-[#FFC640] text-[#FFC640]" />
						<Alert.Title class="text-white"
							>Your expression of interest has been received!</Alert.Title
						>
						<Alert.Description class="text-white">
							Thank you for your interest in partnering with Maximum Solar. A member of our team
							will get back to you shortly with more information about our services and partnership
							opportunities.
						</Alert.Description>
					</Alert.Root>
					<div class="mt-6 flex justify-center">
						<button
							on:click={() => {
								submitted = false;
								resetForm();
							}}
							class="rounded-full bg-white px-8 py-3 text-center text-sm font-semibold text-black shadow-sm hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFC640]"
						>
							Submit Another Request
						</button>
					</div>
				</div>
			</div>
		{/if}
	</div>
</section>

<section class="bg-black">
	<div class="mx-auto max-w-7xl p-6 pb-12 lg:pb-20">
		<div class="flex flex-col lg:flex-row">
			<!-- Map Section -->
			<div class="flex-1">
				<Map />
			</div>

			<!-- Contact Information Section -->
			<div class="flex-shrink-0 bg-black px-6 py-12 lg:px-12">
				<div class="space-y-12 lg:space-y-48">
					<!-- Hobart Section -->
					<div>
						<h3 class="font-heading mb-4 text-5xl text-white">Hobart</h3>
						<p class="text-gray-300">
							<a
								href="https://www.google.com/maps/place/Maximum+Solar/@-42.8596256,147.3901282,1149m/data=!3m3!1e3!4b1!5s0xaa6e7506c947d77d:0x50837726367d10e0!4m6!3m5!1s0xaa6e75cf1732d60d:0x4baa3a0e617bda0!8m2!3d-42.8596256!4d147.3927031!16s%2Fg%2F11y2k5_dg5?entry=ttu&g_ep=EgoyMDI2MDMwMi4wIKXMDSoASAFQAw%3D%3D"
								target="_blank"
								class="hover:underline"
							>
								Warehouse 3, Lot 4/21 South Arm Hwy<br />
								Mornington TAS<br />
								7018
							</a>
						</p>
					</div>

					<!-- Contact Section -->
					<div>
						<h3 class="font-heading mb-4 text-5xl text-white">Contact</h3>
						<div class="space-y-2 text-gray-300">
							<p>
								Email: <a
									href="mailto:info@maximumsolar.com.au"
									target="_blank"
									class="hover:underline">info@maximumsolar.com.au</a
								>
							</p>
							<p>
								Phone: <a href="tel:1300457542" target="_blank" class="hover:underline"
									>1300 457 542</a
								>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
