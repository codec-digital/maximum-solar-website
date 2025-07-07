<script lang="ts">
	import {
		ArrowRight,
		CheckCircle,
		Calendar,
		Shield,
		Users,
		Wrench,
		AlertTriangle,
		Loader2
	} from '@lucide/svelte';
	import * as Accordion from '$lib/components/ui/accordion';
	import * as Card from '$lib/components/ui/card';
	import * as Alert from '$lib/components/ui/alert';
	import Label from '$lib/components/ui/label/label.svelte';
	import { fly } from 'svelte/transition';
	import Seo from '$lib/components/SEO.svelte';
	import { browser } from '$app/environment';

	// Temporary fallback values - replace with actual imports when available
	const EMAIL_ENDPOINT = '/api/send-email';
	const logApiRequest = (url: string, options: any) => console.log('API Request:', url, options);
	const logApiResponse = (url: string, response: any) =>
		console.log('API Response:', url, response);

	let formData = {
		name: '',
		email: '',
		phone: '',
		preferredContact: 'Either',
		message: '',
		formType: 'Maintenance Plans'
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
		formData.formType = 'Maintenance Plans';
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

	function handleAnchorClick(event: Event) {
		event.preventDefault();
		const link = event.currentTarget as HTMLAnchorElement;
		const anchorId = new URL(link.href).hash.replace('#', '');
		const anchor = document.getElementById(anchorId);
		if (anchor) {
			window.scrollTo({
				top: anchor.offsetTop - 100,
				behavior: 'smooth'
			});
		}
	}
</script>

<Seo
	title="Solar Maintenance Plans - Keep Your System Running at Peak Performance"
	description="Professional solar maintenance plans in Tasmania. Keep your solar panels performing optimally with regular inspections, cleaning, and professional care. Protect your solar investment with Maximum Solar."
	keywords="solar maintenance Tasmania, solar panel cleaning, solar system servicing, solar inspection plans, solar panel maintenance Hobart, solar system care, preventive solar maintenance"
	type="WebPage"
/>

<svelte:head>
	<title>Solar Maintenance Plans - Maximum Solar Tasmania</title>
	<meta
		name="description"
		content="Keep your solar system performing at its best with Maximum Solar's professional maintenance plans. Tailored for Tasmanian conditions with hassle-free, expert care."
	/>
</svelte:head>

<!-- Hero Section -->
<section class="relative flex w-full flex-col items-center justify-center pt-60 pb-24">
	<enhanced:img
		src="/src/lib/assets/images/why-solar-2.jpg"
		alt="Solar panels on Tasmanian roof - maintenance background"
		class="absolute inset-0 h-full w-full object-cover"
	/>
	<div class="absolute inset-0 bg-black opacity-50"></div>
	<h1
		class="font-heading relative z-10 max-w-7xl px-6 text-center text-4xl text-white lg:text-7xl/24"
	>
		Solar Maintenance Plans
	</h1>
	<p class="font-heading z-10 mt-8 max-w-5xl px-6 text-center text-xl text-white lg:text-3xl">
		Keep Your Solar System Performing at Its Best, Year After Year
	</p>
	<p class="z-10 mt-6 max-w-4xl px-6 text-center text-base text-white lg:text-lg">
		At Maximum Solar, we believe a well-maintained solar system is the key to maximising your energy
		savings and extending the life of your investment. Our tailored Solar Maintenance Plans are
		designed for Tasmanian conditions and provide hassle-free, professional care for your system so
		you can enjoy clean, reliable energy all year round.
	</p>
	<a
		href="#plans"
		on:click={handleAnchorClick}
		class="z-10 mt-8 rounded-full bg-black px-8 py-3 text-center text-sm font-semibold text-white hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
	>
		View Our Plans
		<ArrowRight class="ml-2 inline h-4 w-4" />
	</a>
</section>

<!-- Introduction Section -->
<section class="bg-gradient-to-b from-white to-gray-50 py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			<h2 class="font-heading text-3xl text-black sm:text-5xl">
				Professional Solar System Care You Can Trust
			</h2>
			<p class="mx-auto mt-4 max-w-4xl text-lg text-gray-600">
				Solar panels are built tough, but even the best systems need a little TLC to keep running at
				peak performance. Dust, lichen, bird droppings, and weather can all reduce your system's
				output over time. With Maximum Solar's maintenance plans, you'll never have to worry about
				your system's health. We'll handle everything, so you can focus on enjoying the benefits.
			</p>
		</div>
	</div>
</section>

<!-- Why Choose Our Maintenance Plans Section -->
<section class="mx-auto py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			<h2 class="font-heading text-3xl text-black sm:text-5xl">
				Why Choose Our Maintenance Plans?
			</h2>
		</div>

		<div class="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2">
			<div class="flex flex-col items-center text-center">
				<div
					class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#FFC640]"
				>
					<enhanced:img
						src="/src/lib/assets/images/icons/reduced-carbon.png"
						alt="Maximise Efficiency"
						class="h-12 w-auto"
					/>
				</div>
				<h3 class="font-heading mb-4 text-xl font-semibold text-black">Maximise Efficiency</h3>
				<p class="text-center text-base text-gray-600">
					Regular inspections and cleanings ensure your panels are always producing as much energy
					as possible, even in Tasmania's challenging climate.
				</p>
			</div>

			<div class="flex flex-col items-center text-center">
				<div
					class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#FFC640]"
				>
					<enhanced:img
						src="/src/lib/assets/images/icons/house.png"
						alt="Extend System Lifespan"
						class="h-12 w-auto"
					/>
				</div>
				<h3 class="font-heading mb-4 text-xl font-semibold text-black">Extend System Lifespan</h3>
				<p class="text-center text-base text-gray-600">
					Preventative maintenance reduces wear and tear, helping your system last for decades and
					protecting your investment.
				</p>
			</div>

			<div class="flex flex-col items-center text-center">
				<div
					class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#FFC640]"
				>
					<enhanced:img
						src="/src/lib/assets/images/icons/stress-free.png"
						alt="Professional Service"
						class="h-12 w-auto"
					/>
				</div>
				<h3 class="font-heading mb-4 text-xl font-semibold text-black">Professional Service</h3>
				<p class="text-center text-base text-gray-600">
					All work is performed by experienced, Clean Energy Council-accredited technicians who know
					Tasmanian solar inside and out.
				</p>
			</div>

			<div class="flex flex-col items-center text-center">
				<div
					class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#FFC640]"
				>
					<enhanced:img
						src="/src/lib/assets/images/icons/trusted-company.png"
						alt="Priority Support"
						class="h-12 w-auto"
					/>
				</div>
				<h3 class="font-heading mb-4 text-xl font-semibold text-black">Priority Support</h3>
				<p class="text-center text-base text-gray-600">
					As a maintenance plan member, you receive priority scheduling and exclusive discounts on
					repairs and upgrades.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Our Solar Maintenance Plans Section -->
<section id="plans" class="relative bg-black">
	<div
		class="relative h-80 overflow-hidden bg-[#FFC640] md:absolute md:left-0 md:h-full md:w-1/3 lg:w-1/2"
	>
		<enhanced:img
			class="h-full w-full object-cover"
			src="/src/lib/assets/images/maintenance-plans.jpeg"
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
				Invest in Your <span class="text-[#FFC640]">Solar Future</span>
			</p>

			<div class="mt-8 max-w-lg">
				<p class="mb-6 text-lg text-gray-300">
					Our comprehensive maintenance plan ensures your solar investment continues to deliver
					maximum returns year after year.
				</p>

				<div class="mb-8 space-y-6">
					<p class="mt-4 flex items-baseline gap-x-2">
						<span class="font-heading text-5xl text-white">$799</span>
						<span class="text-base text-white">/year</span>
					</p>
					<div class="space-y-3">
						<div class="flex items-center gap-3">
							<CheckCircle class="h-5 w-5 flex-shrink-0 text-[#FFC640]" />
							<span class="text-white">Two comprehensive inspections per year</span>
						</div>
						<div class="flex items-center gap-3">
							<CheckCircle class="h-5 w-5 flex-shrink-0 text-[#FFC640]" />
							<span class="text-white">One professional cleaning service</span>
						</div>
						<div class="flex items-center gap-3">
							<CheckCircle class="h-5 w-5 flex-shrink-0 text-[#FFC640]" />
							<span class="text-white">Continuous performance monitoring</span>
						</div>
						<div class="flex items-center gap-3">
							<CheckCircle class="h-5 w-5 flex-shrink-0 text-[#FFC640]" />
							<span class="text-white">Priority support & discounted repairs</span>
						</div>
					</div>

					<div class="rounded-lg border border-[#FFC640]/30 bg-[#FFC640]/20 p-4">
						<div class="flex items-start gap-3">
							<div
								class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#FFC640] text-xs"
							>
								<span class="text-sm font-bold text-black">!</span>
							</div>
							<p class="text-sm font-medium text-white">
								Don't let poor maintenance cost you thousands in lost efficiency.
								<strong class="text-[#FFC640]">Protect your investment today.</strong>
							</p>
						</div>
					</div>
				</div>

				<div class="mt-8">
					<a
						href="#contact-form"
						on:click={handleAnchorClick}
						class="inline-flex items-center gap-2 rounded-full bg-[#FFC640] px-8 py-3 text-base font-semibold text-black transition-all hover:bg-[#FFD700]"
					>
						Sign Up Today
						<ArrowRight class="h-4 w-4" />
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- How It Works Section -->
<section class="bg-gradient-to-b from-white to-gray-50 py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			<h2 class="font-heading text-3xl text-black sm:text-5xl">How It Works</h2>
			<p class="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
				Getting started with our maintenance plan is simple and hassle-free. Follow these three easy
				steps to protect your solar investment.
			</p>
		</div>

		<!-- Desktop version (hidden on mobile) -->
		<div class="mt-16 hidden md:block">
			<div class="relative">
				<!-- Horizontal connecting line -->
				<div
					class="absolute top-24 h-1 w-full bg-gradient-to-r from-[#FFC640]/20 via-[#FFC640] to-[#FFC640]/20"
				></div>

				<!-- Steps container -->
				<div class="grid grid-cols-3 gap-8">
					<!-- Step 1 -->
					<div class="relative">
						<div class="mb-12 flex justify-center">
							<div
								class="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFC640] shadow-lg transition-transform hover:scale-110"
							>
								<span class="text-2xl font-bold text-black">1</span>
							</div>
						</div>
						<div class="text-center">
							<h3 class="font-heading text-xl text-gray-900">Sign Up Online</h3>
							<p class="mt-3 text-gray-600">
								Complete our simple registration form with no paperwork or hassle.
							</p>
						</div>
					</div>

					<!-- Step 2 -->
					<div class="relative">
						<div class="mb-12 flex justify-center">
							<div
								class="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFC640] shadow-lg transition-transform hover:scale-110"
							>
								<span class="text-2xl font-bold text-black">2</span>
							</div>
						</div>
						<div class="text-center">
							<h3 class="font-heading text-xl text-gray-900">We'll Contact You</h3>
							<p class="mt-3 text-gray-600">
								Our friendly team will schedule your first inspection and cleaning at a time that
								suits you.
							</p>
						</div>
					</div>

					<!-- Step 3 -->
					<div class="relative">
						<div class="mb-12 flex justify-center">
							<div
								class="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFC640] shadow-lg transition-transform hover:scale-110"
							>
								<span class="text-2xl font-bold text-black">3</span>
							</div>
						</div>
						<div class="text-center">
							<h3 class="font-heading text-xl text-gray-900">Sit Back & Relax</h3>
							<p class="mt-3 text-gray-600">
								Enjoy peace of mind, knowing your solar system is in expert hands. We'll remind you
								when your next service is due and keep you updated on your system's health.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Mobile version (visible only on mobile) -->
		<div class="mt-12 md:hidden">
			<div class="space-y-10">
				<!-- Step 1 -->
				<div class="relative overflow-hidden rounded-xl bg-white p-6 shadow-lg">
					<div class="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-[#FFC640]/10"></div>
					<div class="flex">
						<div
							class="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFC640] text-xl font-bold text-black"
						>
							1
						</div>
						<div>
							<h3 class="font-heading text-xl text-gray-900">Sign Up Online</h3>
							<p class="mt-2 text-gray-600">
								Complete our simple registration form with no paperwork or hassle.
							</p>
						</div>
					</div>
				</div>

				<!-- Step 2 -->
				<div class="relative overflow-hidden rounded-xl bg-white p-6 shadow-lg">
					<div class="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-[#FFC640]/10"></div>
					<div class="flex">
						<div
							class="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFC640] text-xl font-bold text-black"
						>
							2
						</div>
						<div>
							<h3 class="font-heading text-xl text-gray-900">We'll Contact You</h3>
							<p class="mt-2 text-gray-600">
								Our friendly team will schedule your first inspection and cleaning at a time that
								suits you.
							</p>
						</div>
					</div>
				</div>

				<!-- Step 3 -->
				<div class="relative overflow-hidden rounded-xl bg-white p-6 shadow-lg">
					<div class="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-[#FFC640]/10"></div>
					<div class="flex">
						<div
							class="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFC640] text-xl font-bold text-black"
						>
							3
						</div>
						<div>
							<h3 class="font-heading text-xl text-gray-900">Sit Back & Relax</h3>
							<p class="mt-2 text-gray-600">
								Enjoy peace of mind, knowing your solar system is in expert hands. We'll remind you
								when your next service is due and keep you updated on your system's health.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Call to action -->
		<div class="mt-16 text-center">
			<a
				href="/contact"
				class="inline-flex items-center justify-center gap-2 rounded-full bg-black px-8 py-3 text-base font-semibold text-white transition-all hover:bg-gray-800"
			>
				Get Started Today
				<ArrowRight class="h-5 w-5" />
			</a>
		</div>
	</div>
</section>

<!-- Contact Form Section -->
<section id="contact-form" class="bg-black py-24">
	<div class="mx-auto max-w-4xl px-6">
		<div class="text-center">
			<h2 class="font-heading text-4xl text-[#FFC640] sm:text-5xl">Get Started Today</h2>
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
									class="block w-full rounded-full bg-zinc-800 px-6 py-2 text-base text-white placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FFC640]"
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
									class="block w-full rounded-full bg-zinc-800 px-6 py-2 text-base text-white placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FFC640]"
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
									class="block w-full rounded-full bg-zinc-800 px-6 py-2 text-base text-white placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-[#FFC640]"
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
<!-- FAQ Section -->
<section class="mx-auto bg-black py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			<h2 class="font-heading text-3xl text-[#FFC640] sm:text-5xl">Frequently Asked Questions</h2>
		</div>

		<div class="mx-auto mt-16 max-w-4xl text-left">
			<Accordion.Root type="single" class="w-full">
				<Accordion.Item class="border-b border-gray-700">
					<Accordion.Trigger
						class="font-heading w-full py-6 text-left text-lg font-semibold text-white"
					>
						Why is regular maintenance important for solar panels?
					</Accordion.Trigger>
					<Accordion.Content class="pb-6">
						<p class="text-base text-white">
							Maintenance prevents performance losses caused by dirt, shading, or minor faults. It
							also helps you avoid unexpected breakdowns and maximises your savings over the life of
							your system.
						</p>
					</Accordion.Content>
				</Accordion.Item>

				<Accordion.Item class="border-b border-gray-700">
					<Accordion.Trigger
						class="font-heading w-full py-6 text-left text-lg font-semibold text-white"
					>
						What does the inspection involve?
					</Accordion.Trigger>
					<Accordion.Content class="pb-6">
						<p class="text-base text-white">
							We assess every component: panel output, inverter function, electrical safety,
							mounting stability, and overall system health. We also check for shading, debris, and
							signs of animal or weather damage.
						</p>
					</Accordion.Content>
				</Accordion.Item>

				<Accordion.Item class="border-b border-gray-700">
					<Accordion.Trigger
						class="font-heading w-full py-6 text-left text-lg font-semibold text-white"
					>
						How do I schedule my cleaning?
					</Accordion.Trigger>
					<Accordion.Content class="pb-6">
						<p class="text-base text-white">
							After signing up, we'll contact you to arrange your annual cleaning and inspections at
							times that suit you. You'll receive reminders before each visit.
						</p>
					</Accordion.Content>
				</Accordion.Item>

				<Accordion.Item class="border-b border-gray-700">
					<Accordion.Trigger
						class="font-heading w-full py-6 text-left text-lg font-semibold text-white"
					>
						What if my system needs repairs?
					</Accordion.Trigger>
					<Accordion.Content class="pb-6">
						<p class="text-base text-white">
							If we find any issues, we'll provide a detailed report and a no-obligation quote.
							Maintenance plan members get priority scheduling and discounted rates on repairs.
						</p>
					</Accordion.Content>
				</Accordion.Item>

				<Accordion.Item class="border-b border-gray-700">
					<Accordion.Trigger
						class="font-heading w-full py-6 text-left text-lg font-semibold text-white"
					>
						Can I cancel my plan?
					</Accordion.Trigger>
					<Accordion.Content class="pb-6">
						<p class="text-base text-white">
							Yes, you can cancel at any time. Simply contact our customer service team and we'll
							handle the process for you.
						</p>
					</Accordion.Content>
				</Accordion.Item>

				<Accordion.Item class="border-b border-gray-700">
					<Accordion.Trigger
						class="font-heading w-full py-6 text-left text-lg font-semibold text-white"
					>
						Are there additional costs?
					</Accordion.Trigger>
					<Accordion.Content class="pb-6">
						<p class="text-base text-white">
							Your plan includes two inspections and one cleaning per year. Any repairs or extra
							cleanings are quoted separately, with discounts for plan members.
						</p>
					</Accordion.Content>
				</Accordion.Item>

				<Accordion.Item class="border-b border-gray-700">
					<Accordion.Trigger
						class="font-heading w-full py-6 text-left text-lg font-semibold text-white"
					>
						Is this plan suitable for commercial systems?
					</Accordion.Trigger>
					<Accordion.Content class="pb-6">
						<p class="text-base text-white">
							Absolutely! We offer tailored maintenance plans for commercial, agricultural, and
							residential systems of all sizes.
						</p>
					</Accordion.Content>
				</Accordion.Item>

				<Accordion.Item class="border-b border-gray-700">
					<Accordion.Trigger
						class="font-heading w-full py-6 text-left text-lg font-semibold text-white"
					>
						What areas do you service?
					</Accordion.Trigger>
					<Accordion.Content class="pb-6">
						<p class="text-base text-white">
							We proudly service all of Tasmania, including Hobart, Launceston, Devonport, Burnie,
							and surrounding regions.
						</p>
					</Accordion.Content>
				</Accordion.Item>
			</Accordion.Root>
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="relative flex w-full flex-col items-center justify-center py-36">
	<enhanced:img
		src="/src/lib/assets/images/installations/installation3.jpeg"
		alt="Professional solar installation in Tasmania"
		class="absolute inset-0 h-full w-full object-cover"
	/>
	<div class="absolute inset-0 bg-black opacity-50"></div>
	<h3
		class="font-heading relative z-10 max-w-4xl px-6 text-center text-4xl font-semibold text-white sm:text-5xl"
	>
		Ready to Protect Your Solar Investment?
	</h3>
	<p class="font-heading relative z-10 mt-6 max-w-3xl px-6 text-center text-xl text-white">
		Join hundreds of satisfied customers who trust Maximum Solar to keep their systems running at
		peak performance.
	</p>
	<div class="relative z-10 mt-8">
		<a
			href="/contact"
			class="rounded-full bg-black px-8 py-3 text-center text-sm font-semibold text-white hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
		>
			Get Started Today
			<ArrowRight class="ml-2 inline h-4 w-4" />
		</a>
	</div>
</section>
