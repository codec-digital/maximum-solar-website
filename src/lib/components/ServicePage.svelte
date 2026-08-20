<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import * as Accordion from '$lib/components/ui/accordion';
	import * as Alert from '$lib/components/ui/alert';
	import { Label } from '$lib/components/ui/label/index.js';
	import {
		ArrowRight,
		CheckCircle,
		CheckCircle2,
		Loader2,
		AlertTriangle,
		Sun
	} from '@lucide/svelte';
	import { fly } from 'svelte/transition';
	import { browser } from '$app/environment';
	import type { ServicePage } from '$lib/data/servicePages';
	import batteryHero from '$lib/assets/images/services/battery-storage.jpg?enhanced';
	import farmHero from '$lib/assets/images/services/farm-solar.jpg?enhanced';
	import offGridHero from '$lib/assets/images/services/off-grid-solar.jpg?enhanced';
	import evChargingHero from '$lib/assets/images/services/ev-charging.jpg?enhanced';
	import rebatesHero from '$lib/assets/images/why-solar.jpg?enhanced';
	import maintenanceHero from '$lib/assets/images/why-solar-2.jpg?enhanced';

	export let page: ServicePage;

	// Per-service hero imagery, keyed by route slug. Solar rebates keeps the
	// existing image; solar maintenance shares the maintenance-plans photo.
	const heroImages: Record<string, typeof batteryHero> = {
		'battery-storage': batteryHero,
		'farm-solar-tasmania': farmHero,
		'off-grid-solar-tasmania': offGridHero,
		'ev-charging-solar': evChargingHero,
		'solar-rebates-tasmania': rebatesHero,
		'solar-maintenance': maintenanceHero
	};
	$: heroImage = heroImages[page.slug] ?? rebatesHero;

	function smoothScrollTo(e: MouseEvent, id: string) {
		e.preventDefault();
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
	}

	// Bullet sections render as feature cards; text sections as centered prose.
	// The whole page sits on a black background.
	type RenderSection = ServicePage['sections'][number] & {
		variant: 'bullets' | 'text';
	};
	let renderSections: RenderSection[] = [];
	$: renderSections = page.sections.map((section) => ({
		...section,
		variant: section.bullets ? 'bullets' : 'text'
	}));

	// Contact form state (shared enquiry form, tagged with the service name).
	const EMAIL_ENDPOINT = '/api/send-email';

	let formData = {
		name: '',
		email: '',
		phone: '',
		postCode: '',
		preferredContact: 'Either',
		message: '',
		formType: `Service Enquiry - ${page.shortName}`
	};

	let loading = false;
	let submitted = false;
	let error = false;
	let errorMessage = '';

	function resetForm() {
		formData.name = '';
		formData.email = '';
		formData.phone = '';
		formData.postCode = '';
		formData.preferredContact = 'Either';
		formData.message = '';
		formData.formType = `Service Enquiry - ${page.shortName}`;
		loading = false;
		error = false;
		errorMessage = '';
	}

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();

		if (!browser) return;

		loading = true;
		error = false;
		errorMessage = '';

		const submissionData = {
			name: formData.name,
			email: formData.email,
			phone: formData.phone,
			postCode: formData.postCode,
			preferredContact: formData.preferredContact,
			message: formData.message,
			type: formData.formType
		};

		try {
			const response = await fetch(EMAIL_ENDPOINT, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(submissionData),
				credentials: 'same-origin'
			});

			if (!response.ok) {
				const errorText = await response.text().catch(() => '');
				let message = 'Failed to send email';
				try {
					const errorJson = JSON.parse(errorText);
					if (errorJson && errorJson.error) message = errorJson.error;
				} catch {
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
			if (err instanceof Error && err.name === 'TypeError' && err.message.includes('fetch')) {
				errorMessage =
					'Network error: Failed to connect to our server. This might be due to a network issue.';
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

<SEO title={page.titleTag} description={page.metaDescription} type="WebPage" faq={page.faqItems} />

<!-- Hero Section -->
<section class="relative flex w-full flex-col items-center justify-center pt-60 pb-24">
	<enhanced:img
		src={heroImage}
		alt={page.h1}
		class="absolute inset-0 h-full w-full object-cover"
	/>
	<div class="absolute inset-0 bg-black opacity-65"></div>
	<div class="relative z-10 mx-auto max-w-5xl px-6 text-center">
		<p
			class="font-heading inline-flex items-center gap-2 text-sm tracking-widest text-[#FFC640] uppercase"
		>
			<Sun class="h-4 w-4" />
			Solar Services · Tasmania
		</p>
		<h1 class="font-heading mt-4 text-4xl text-white lg:text-7xl">
			{page.h1}
		</h1>
		<p class="font-heading mx-auto mt-8 max-w-3xl text-lg text-white/90 lg:text-2xl">
			{page.metaDescription}
		</p>
		<div class="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
			<a
				href="#contact-form"
				on:click={(e) => smoothScrollTo(e, 'contact-form')}
				class="inline-flex items-center justify-center gap-2 rounded-full bg-[#FFC640] px-8 py-4 text-base text-black transition hover:bg-[#FFC640]/90 sm:text-lg"
			>
				Get Your Free Quote
				<ArrowRight class="h-5 w-5" />
			</a>
			<a
				href="#faq"
				on:click={(e) => smoothScrollTo(e, 'faq')}
				class="rounded-full border-2 border-white bg-black/30 px-8 py-4 text-base text-white transition hover:bg-black/50 sm:text-lg"
			>
				Read FAQs
			</a>
		</div>
	</div>
</section>

<!-- Body Content -->
{#each renderSections as section}
	{#if section.variant === 'bullets'}
		<section class="bg-black py-20 sm:py-24">
			<div class="mx-auto max-w-6xl px-6">
				<h2 class="font-heading text-center text-3xl text-white sm:text-4xl">{section.heading}</h2>
				<div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{#each section.bullets ?? [] as bullet}
						<div class="flex items-start gap-4 rounded-2xl bg-white/5 p-6">
							<CheckCircle class="mt-0.5 h-6 w-6 flex-shrink-0 text-[#FFC640]" />
							<span class="text-base leading-7 text-gray-200">{bullet}</span>
						</div>
					{/each}
				</div>
			</div>
		</section>
	{:else}
		<section class="bg-black py-20 sm:py-24">
			<div class="mx-auto max-w-3xl px-6 text-center">
				<h2 class="font-heading text-3xl text-white sm:text-4xl">{section.heading}</h2>
				<div class="mt-6 space-y-6">
					{#each section.paragraphs ?? [] as paragraph}
						<p class="text-lg leading-8 text-gray-300">{paragraph}</p>
					{/each}
				</div>
			</div>
		</section>
	{/if}
{/each}

<!-- FAQ Section -->
<section id="faq" class="bg-black py-24">
	<div class="mx-auto max-w-4xl px-6">
		<div class="text-center">
			<h2 class="font-heading text-4xl text-white sm:text-5xl">Frequently Asked Questions</h2>
			<p class="mt-6 text-xl text-gray-300">Answers to the questions we hear most.</p>
		</div>

		<div class="mt-12">
			<Accordion.Root type="single" class="w-full">
				{#each page.faqItems as item}
					<Accordion.Item class="border-b border-white/15">
						<Accordion.Trigger
							class="font-heading w-full py-6 text-left text-xl text-white transition-colors hover:text-[#FFC640]"
						>
							{item.question}
						</Accordion.Trigger>
						<Accordion.Content class="w-full py-4 pl-4 text-left text-base text-gray-300">
							{item.answer}
						</Accordion.Content>
					</Accordion.Item>
				{/each}
			</Accordion.Root>
		</div>
	</div>
</section>

<!-- Contact Form Section -->
<section id="contact-form" class="bg-black py-24">
	<div class="mx-auto max-w-4xl px-6">
		<div class="text-center">
			<h2 class="font-heading text-4xl text-[#FFC640] sm:text-5xl">Get Your Free Quote</h2>
			<p class="mt-6 text-xl text-white">
				Tell us what you need and our Tasmanian team will be in touch.
			</p>
		</div>

		<div class="mt-12">
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
							<Label for="full-name" class="text-sm/6 text-white">Full name</Label>
							<div class="mt-2.5">
								<input
									type="text"
									id="full-name"
									name="full-name"
									autocomplete="name"
									bind:value={formData.name}
									required
									class="block w-full rounded-full bg-zinc-800 px-6 py-3 text-base text-white transition placeholder:text-gray-500 focus:ring-2 focus:ring-[#FFC640] focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
								/>
							</div>
						</div>
						<div class="grid gap-2">
							<Label for="email" class="text-sm/6 text-white">Email</Label>
							<div class="mt-2.5">
								<input
									type="email"
									id="email"
									name="email"
									autocomplete="email"
									bind:value={formData.email}
									required
									class="block w-full rounded-full bg-zinc-800 px-6 py-3 text-base text-white transition placeholder:text-gray-500 focus:ring-2 focus:ring-[#FFC640] focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
								/>
							</div>
						</div>
					</div>

					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div class="grid gap-2">
							<div class="flex justify-between text-sm/6">
								<Label for="phone-number" class="text-white">Phone number</Label>
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
									class="block w-full rounded-full bg-zinc-800 px-6 py-3 text-base text-white transition placeholder:text-gray-500 focus:ring-2 focus:ring-[#FFC640] focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
								/>
							</div>
						</div>
						<div class="grid gap-2">
							<Label for="postcode" class="text-sm/6 text-white">Suburb and State</Label>
							<div class="mt-2.5">
								<input
									type="text"
									id="postcode"
									name="postcode"
									autocomplete="postal-code"
									bind:value={formData.postCode}
									class="block w-full rounded-full bg-zinc-800 px-6 py-3 text-base text-white transition placeholder:text-gray-500 focus:ring-2 focus:ring-[#FFC640] focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
								/>
							</div>
						</div>
					</div>

					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div class="grid gap-2">
							<Label for="preferred-contact" class="text-sm/6 text-white">
								Preferred contact method
							</Label>
							<div class="mt-2.5">
								<select
									id="preferred-contact"
									name="preferred-contact"
									bind:value={formData.preferredContact}
									class="block w-full rounded-full bg-zinc-800 px-6 py-3 text-base text-white transition focus:ring-2 focus:ring-[#FFC640] focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
								>
									<option value="Either">Either</option>
									<option value="Phone">Phone</option>
									<option value="Email">Email</option>
								</select>
							</div>
						</div>
					</div>

					<div class="grid gap-2">
						<div class="flex justify-between text-sm/6">
							<Label for="message" class="text-white">Message</Label>
							<p class="text-gray-400">Max 500 characters</p>
						</div>
						<div class="mt-2.5">
							<textarea
								id="message"
								name="message"
								rows="4"
								bind:value={formData.message}
								placeholder="Tell us about your property and what you'd like from your solar system"
								class="block w-full rounded-lg bg-zinc-800 px-6 py-3 text-base text-white transition placeholder:text-gray-500 focus:ring-2 focus:ring-[#FFC640] focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
							></textarea>
						</div>
					</div>

					<div class="mt-8 flex justify-center">
						{#if !loading}
							<button
								type="submit"
								class="rounded-full bg-[#FFC640] px-8 py-4 text-center text-lg text-black shadow-sm transition hover:bg-[#FFC640]/90 focus:ring-2 focus:ring-[#FFC640] focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
							>
								Get Your Free Quote
								<ArrowRight class="ml-2 inline h-5 w-5" />
							</button>
						{:else}
							<button
								type="button"
								disabled
								class="cursor-not-allowed rounded-full bg-[#FFC640]/70 px-8 py-4 text-center text-lg text-black shadow-sm"
							>
								<Loader2 class="mr-2 inline h-5 w-5 animate-spin" />
								Submitting...
							</button>
						{/if}
					</div>
				</form>
			{:else}
				<div class="flex justify-center" in:fly={{ y: 20, duration: 300 }}>
					<div class="w-full max-w-lg">
						<Alert.Root class="border-[#FFC640] bg-green-50/10 text-white">
							<CheckCircle2 class="h-4 w-4 fill-[#FFC640] text-[#FFC640]" />
							<Alert.Title class="text-white">Your enquiry has been received!</Alert.Title>
							<Alert.Description class="text-gray-300">
								Thank you for getting in touch. A member of our team will contact you shortly to
								discuss {page.shortName} for your property.
							</Alert.Description>
						</Alert.Root>
						<div class="mt-6 flex justify-center">
							<button
								on:click={() => {
									submitted = false;
									resetForm();
								}}
								class="rounded-full bg-[#FFC640] px-8 py-4 text-center text-lg text-black shadow-sm transition hover:bg-[#FFC640]/90 focus:ring-2 focus:ring-[#FFC640] focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
							>
								Submit Another Enquiry
							</button>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</section>

<!-- Final CTA Section -->
<section class="relative py-24">
	<enhanced:img
		src="/src/lib/assets/images/hero.jpg"
		alt="Solar panels in Tasmania"
		class="absolute inset-0 h-full w-full object-cover"
	/>
	<div class="absolute inset-0 bg-black opacity-70"></div>
	<div class="relative z-10 mx-auto max-w-4xl px-6 text-center">
		<h2 class="font-heading text-4xl text-white sm:text-5xl">Ready to Get Started?</h2>
		<p class="mt-6 text-xl text-white">
			Get a free, no-obligation quote from Tasmania's local solar experts.
		</p>
		<div class="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
			<a
				href="#contact-form"
				on:click={(e) => smoothScrollTo(e, 'contact-form')}
				class="rounded-full bg-[#FFC640] px-8 py-4 text-lg text-black transition hover:bg-[#FFC640]/90 focus:ring-2 focus:ring-[#FFC640] focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
			>
				Get Your Free Quote
				<ArrowRight class="ml-2 inline h-5 w-5" />
			</a>
			<a
				href="tel:1300457542"
				class="rounded-full border-2 border-white bg-black/30 px-8 py-4 text-lg text-white transition hover:bg-black/50 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
			>
				Call 1300 457 542
			</a>
		</div>
	</div>
</section>
