<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Alert from '$lib/components/ui/alert';
	import * as Accordion from '$lib/components/ui/accordion';
	import Seo from '$lib/components/SEO.svelte';
	import {
		ArrowRight,
		Loader2,
		CheckCircle,
		AlertTriangle,
		Shield,
		Search,
		FileText,
		CheckCircle2,
		AlertCircle,
		Clock,
		Award
	} from '@lucide/svelte';
	import { fly } from 'svelte/transition';
	import { browser } from '$app/environment';

	// Temporary fallback values - replace with actual imports when available
	const EMAIL_ENDPOINT = '/api/send-email';
	const logApiRequest = (url: string, options: any) => console.log('API Request:', url, options);
	const logApiResponse = (url: string, response: any) =>
		console.log('API Response:', url, response);

	// Contact form data
	let formData = {
		name: '',
		email: '',
		phone: '',
		preferredContact: 'Either',
		message: '',
		formType: 'System Inspections'
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
		formData.formType = 'System Inspections';
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
			preferredContact: formData.preferredContact,
			message: formData.message,
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
					const errorJson = JSON.parse(errorText);
					if (errorJson && errorJson.error) {
						message = errorJson.error;
					}
				} catch (e) {
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

	const faqItems = [
		{
			question: 'What does a system integrity inspection include?',
			answer: `
				<p class="pb-4 text-base ">
					Our inspection covers all major components: solar panels, inverters, cabling, mounting hardware, isolators, safety switches, and electrical connections. We check for physical damage, corrosion, loose or faulty wiring, shading issues, and animal or weather-related damage. We also test system output and safety devices.
				</p>
			`
		},
		{
			question: 'Who will carry out my inspection?',
			answer: `
				<p class="pb-4 text-base ">
					All Maximum Solar inspections are performed by Clean Energy Council-accredited electricians with extensive experience in Tasmania's solar industry. Our team is fully licensed, insured, and up-to-date with the latest standards.
				</p>
			`
		},
		{
			question: 'How long does the inspection take?',
			answer: `
				<p class="pb-4 text-base ">
					Most inspections take between 1 and 2 hours, depending on system size and accessibility. We'll always work around your schedule.
				</p>
			`
		},
		{
			question: 'Will I receive a report?',
			answer: `
				<p class="pb-4 text-base ">
					Absolutely. You'll get a detailed, easy-to-understand report with photos, test results, and clear recommendations. We're happy to walk you through the findings and answer any questions.
				</p>
			`
		},
		{
			question: 'What happens if you find a problem?',
			answer: `
				<p class="pb-4 text-base ">
					We'll explain the issue, outline your options, and provide a transparent quote for repairs or upgrades. If you choose to upgrade with us, your inspection fee is waived.
				</p>
			`
		},
		{
			question: 'How often should I have my system inspected?',
			answer: `
				<p class="pb-4 text-base ">
					Annual inspections are strongly recommended, especially for older systems or after extreme weather events. Regular checks help maintain your warranty and insurance coverage.
				</p>
			`
		},
		{
			question: 'Can you help with insurance or warranty claims?',
			answer: `
				<p class="pb-4 text-base ">
					Yes, our reports are suitable for most insurance and warranty claims. We can also liaise with your provider if needed.
				</p>
			`
		},
		{
			question: 'Is the inspection mandatory?',
			answer: `
				<p class="pb-4 text-base ">
					While not always mandatory, many insurers and manufacturers require annual inspections for coverage. Regular checks also protect your investment and safety.
				</p>
			`
		}
	];

	export let stats = [
		{
			label: 'Identify wear, corrosion, or faults before they escalate into costly repairs.',
			value: 'Catch Problems Early'
		},
		{
			label: 'Ensure your system is generating as much clean energy as possible.',
			value: 'Maintain Peak Performance'
		},
		{
			label: 'Many manufacturers and insurers require regular professional inspections.',
			value: 'Protect Your Warranty'
		},
		{
			label: 'Prevent electrical hazards and ensure compliance with all Australian standards.',
			value: 'Stay Safe'
		}
	];
</script>

<Seo
	title="Solar System Inspections - Professional Solar Performance Analysis Tasmania"
	description="Comprehensive solar system inspections in Tasmania. Protect your solar investment with professional performance analysis, safety checks, and detailed reporting. Ensure optimal efficiency and safety."
	keywords="solar system inspection Tasmania, solar performance analysis, solar safety inspection, solar system check Hobart, solar efficiency testing, solar panel inspection, solar system assessment"
	type="WebPage"
/>

<!-- Hero Section -->
<section class="relative flex w-full flex-col items-center justify-center pt-60 pb-24">
	<enhanced:img
		src="/src/lib/assets/images/system-inspections.jpg"
		alt="Solar panel inspection in Tasmania"
		class="absolute inset-0 h-full w-full object-cover"
	/>
	<div class="absolute inset-0 bg-black opacity-60"></div>
	<div class="relative z-10 max-w-7xl px-6 text-center">
		<h1 class="font-heading max-w-6xl text-4xl text-white lg:text-7xl">
			Protect Your Solar Investment with
			<span class="text-[#FFC640]">Expert Inspections</span>
		</h1>
		<p class="font-heading mx-auto mt-8 max-w-5xl text-xl text-white lg:text-2xl">
			Your solar energy system is a valuable asset that powers your home and saves you money every
			day. Our comprehensive system integrity inspections ensure your system is safe, efficient, and
			performing at its best.
		</p>
		<div class="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
			<a
				href="#contact-form"
				class="rounded-full bg-[#FFC640] px-8 py-4 text-base text-black transition hover:bg-[#FFC640]/90 sm:text-lg"
			>
				Book Your Inspection
				<ArrowRight class="ml-2 inline h-5 w-5" />
			</a>
			<a
				href="#why-inspections"
				class="rounded-full border-2 border-white bg-black/30 px-8 py-4 text-base text-white transition hover:bg-black/50 sm:text-lg"
			>
				Learn More
			</a>
		</div>
	</div>
</section>

<!-- Why Inspections Matter -->
<section id="why-inspections" class="bg-black py-24">
	<div class="mx-auto max-w-7xl px-6">
		<div class="text-center">
			<h2 class="font-heading text-4xl text-[#FFC640] sm:text-5xl">
				Why System Integrity Inspections Matter
			</h2>
			<p class="mx-auto mt-6 max-w-3xl text-xl text-white">
				Solar and electrical systems are complex, and even minor issues can lead to reduced
				performance, safety hazards, or expensive repairs if left unchecked.
			</p>
		</div>
		<dl
			class="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4"
		>
			{#each stats as stat}
				<div class="flex h-full flex-col bg-white/5 p-8">
					<dt class="flex flex-1 items-center justify-center text-sm/6 text-gray-300">
						{stat.label}
					</dt>
					<dd
						class="font-heading order-first flex h-16 flex-shrink-0 items-center justify-center text-3xl tracking-tight text-[#FFC640]"
					>
						{stat.value}
					</dd>
				</div>
			{/each}
		</dl>
	</div>
</section>

<!-- What We Offer -->
<section class="py-24">
	<div class="mx-auto max-w-7xl px-6">
		<div class="text-center">
			<h2 class="font-heading text-4xl sm:text-5xl">Comprehensive Solar System Inspections</h2>
			<p class="mx-auto mt-6 max-w-3xl text-xl text-gray-600">
				Our Clean Energy Council-accredited professionals provide thorough assessments tailored to
				Tasmania's unique weather conditions.
			</p>
		</div>

		<div class="mt-20 grid gap-12 lg:grid-cols-2">
			<div class="space-y-8">
				<div class="flex items-start gap-4">
					<div
						class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#FFC640]"
					>
						<Search class="h-6 w-6 text-black" />
					</div>
					<div>
						<h3 class="font-heading mb-2 text-xl">Thorough Visual & Technical Assessments</h3>
						<p class="text-gray-600">
							Our team examines every component of your solar system, including panels, inverters,
							isolators, mounting structures, cabling, and safety switches. We look for damage,
							corrosion, loose fittings, and signs of animal interference.
						</p>
					</div>
				</div>

				<div class="flex items-start gap-4">
					<div
						class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#FFC640]"
					>
						<CheckCircle2 class="h-6 w-6 text-black" />
					</div>
					<div>
						<h3 class="font-heading mb-2 text-xl">Performance Testing</h3>
						<p class="text-gray-600">
							Using advanced diagnostic tools, we measure your system's output and compare it to
							manufacturer and site-specific benchmarks. This helps us spot hidden faults or
							underperformance.
						</p>
					</div>
				</div>

				<div class="flex items-start gap-4">
					<div
						class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#FFC640]"
					>
						<Shield class="h-6 w-6 text-black" />
					</div>
					<div>
						<h3 class="font-heading mb-2 text-xl">Safety & Compliance Checks</h3>
						<p class="text-gray-600">
							We ensure your system meets all Tasmanian and Australian electrical safety
							regulations, including AS/NZS 5033 and Clean Energy Council guidelines.
						</p>
					</div>
				</div>
			</div>

			<div class="space-y-8">
				<div class="flex items-start gap-4">
					<div
						class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#FFC640]"
					>
						<FileText class="h-6 w-6 text-black" />
					</div>
					<div>
						<h3 class="font-heading mb-2 text-xl">Detailed Reporting</h3>
						<p class="text-gray-600">
							After the inspection, you'll receive a comprehensive report including photos, test
							results, and a clear summary of any issues found. Our report also includes tailored
							recommendations for maintenance, repairs, or upgrades.
						</p>
					</div>
				</div>

				<div class="flex items-start gap-4">
					<div
						class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#FFC640]"
					>
						<Award class="h-6 w-6 text-black" />
					</div>
					<div>
						<h3 class="font-heading mb-2 text-xl">Actionable Advice</h3>
						<p class="text-gray-600">
							If we find any issues, we'll provide a transparent quote and explain your options.
							Your inspection fee is fully waived if you choose to upgrade your system with Maximum
							Solar.
						</p>
					</div>
				</div>

				<div class="rounded-lg bg-gray-50 p-6">
					<div class="flex items-center gap-3">
						<Clock class="h-6 w-6 text-[#FFC640]" />
						<h4 class="font-heading text-lg">Quick & Convenient</h4>
					</div>
					<p class="mt-2 text-gray-600">
						Most inspections take 1-2 hours and we work around your schedule.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Investment Section -->
<section id="investment" class="relative bg-black">
	<div
		class="relative h-80 overflow-hidden bg-[#FFC640] md:absolute md:left-0 md:h-full md:w-1/3 lg:w-1/2"
	>
		<enhanced:img
			class="h-full w-full object-cover"
			src="/src/lib/assets/images/system-inspections-2.jpg"
			alt="Solar panel inspection in Tasmania"
		/>
		<div class="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
		<svg
			viewBox="0 0 926 676"
			aria-hidden="true"
			class="absolute -bottom-24 left-24 w-[57.875rem] transform-gpu blur-[118px]"
		>
			<path
				fill="url(#solar-gradient)"
				fill-opacity=".4"
				d="m254.325 516.708-90.89 158.331L0 436.427l254.325 80.281 163.691-285.15c1.048 131.759 36.144 345.144 168.149 144.613C751.171 125.508 707.17-93.823 826.603 41.15c95.546 107.978 104.766 294.048 97.432 373.585L685.481 297.694l16.974 360.474-448.13-141.46Z"
			/>
			<defs>
				<linearGradient
					id="solar-gradient"
					x1="926.392"
					x2="-109.635"
					y1=".176"
					y2="321.024"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#FFC640" />
					<stop offset="1" stop-color="#FF8A00" />
				</linearGradient>
			</defs>
		</svg>
	</div>

	<div class="relative mx-auto max-w-7xl py-24 sm:py-32 lg:px-8 lg:py-40">
		<div class="pr-6 pl-6 md:ml-auto md:w-2/3 md:pl-16 lg:w-1/2 lg:pr-0 lg:pl-24 xl:pl-32">
			<p class="font-heading text-4xl font-semibold tracking-tight text-white sm:text-5xl">
				Investment in Your <span class="text-[#FFC640]">Solar Future</span>
			</p>

			<div class="mt-8 max-w-lg">
				<p class="mb-6 text-lg text-white">
					Professional inspection services that protect your solar investment and ensure optimal
					performance.
				</p>

				<div class="mb-8 space-y-6">
					<p class="mt-4 flex items-baseline gap-x-2">
						<span class="font-heading text-5xl text-white">$550</span>
						<span class="text-base text-white">/Inspection</span>
					</p>

					<div class="space-y-3">
						<div class="flex items-center gap-3">
							<CheckCircle2 class="h-5 w-5 flex-shrink-0 text-[#FFC640]" />
							<span class="text-white">Comprehensive system assessment</span>
						</div>
						<div class="flex items-center gap-3">
							<CheckCircle2 class="h-5 w-5 flex-shrink-0 text-[#FFC640]" />
							<span class="text-white">Detailed performance testing</span>
						</div>
						<div class="flex items-center gap-3">
							<CheckCircle2 class="h-5 w-5 flex-shrink-0 text-[#FFC640]" />
							<span class="text-white">Safety & compliance verification</span>
						</div>
						<div class="flex items-center gap-3">
							<CheckCircle2 class="h-5 w-5 flex-shrink-0 text-[#FFC640]" />
							<span class="text-white">Comprehensive written report</span>
						</div>
					</div>

					<div class="rounded-lg border border-[#FFC640]/30 bg-[#FFC640]/20 p-4">
						<div class="flex items-start gap-3">
							<div
								class="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#FFC640]"
							>
								<span class="text-sm font-bold text-black">💡</span>
							</div>
							<p class="text-sm font-medium text-white">
								<strong class="text-[#FFC640]">Fee waived</strong> if you proceed with a system upgrade
								through Maximum Solar
							</p>
						</div>
					</div>
				</div>

				<div class="mt-8">
					<a
						href="#contact-form"
						class="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-white/90 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
					>
						Book Your Inspection Today
						<ArrowRight class="h-4 w-4" />
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- FAQ Section -->
<section class="py-24">
	<div class="mx-auto max-w-4xl px-6">
		<div class="text-center">
			<h2 class="font-heading text-4xl sm:text-5xl">Frequently Asked Questions</h2>
			<p class="mt-6 text-xl text-gray-600">
				Everything you need to know about our system integrity inspections.
			</p>
		</div>

		<div class="mt-12">
			<Accordion.Root type="single" class="w-full">
				{#each faqItems as item, index}
					<Accordion.Item class="border-b border-gray-200">
						<Accordion.Trigger
							class="font-heading w-full py-6 text-left text-xl  transition-colors hover:text-[#FFC640]"
						>
							{item.question}
						</Accordion.Trigger>
						<Accordion.Content class="w-full py-4 pl-4 text-left text-gray-600">
							{@html item.answer}
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
			<h2 class="font-heading text-4xl text-[#FFC640] sm:text-5xl">
				Book Your System Integrity Inspection
			</h2>
			<p class="mt-6 text-xl text-white">
				Protect your solar investment with a comprehensive professional inspection.
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
							<Label for="full-name" class="text-sm/6  text-white">Full name</Label>
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
							<Label for="email" class="text-sm/6  text-white">Email</Label>
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
								<Label for="phone-number" class=" text-white">Phone number</Label>
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
							<Label for="preferred-contact" class="text-sm/6  text-white">
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
							<Label for="message" class=" text-white">Message</Label>
							<p class="text-gray-400">Max 500 characters</p>
						</div>
						<div class="mt-2.5">
							<textarea
								id="message"
								name="message"
								rows="4"
								bind:value={formData.message}
								placeholder="Tell us about your solar system and when you'd like the inspection"
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
								Book Your Inspection
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
							<CheckCircle class="h-4 w-4 fill-[#FFC640] text-[#FFC640]" />
							<Alert.Title class="text-white"
								>Your inspection request has been received!</Alert.Title
							>
							<Alert.Description class="text-gray-300">
								Thank you for your request. A member of our team will contact you shortly to
								schedule your system integrity inspection.
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
								Submit Another Request
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
		<h2 class="font-heading text-4xl text-white sm:text-5xl">
			Don't Let Small Issues Become Big Problems
		</h2>
		<p class="mt-6 text-xl text-white">
			Regular inspections are the key to maintaining your solar system's performance, safety, and
			warranty coverage.
		</p>
		<div class="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
			<a
				href="#contact-form"
				class="rounded-full bg-[#FFC640] px-8 py-4 text-lg text-black transition hover:bg-[#FFC640]/90 focus:ring-2 focus:ring-[#FFC640] focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
			>
				Schedule Your Inspection
				<ArrowRight class="ml-2 inline h-5 w-5" />
			</a>
			<a
				href="tel:1300457"
				class="rounded-full border-2 border-white bg-black/30 px-8 py-4 text-lg text-white transition hover:bg-black/50 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
			>
				Call 1300 457 542
			</a>
		</div>
	</div>
</section>
