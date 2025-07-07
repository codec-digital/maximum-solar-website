<script lang="ts">
	import Seo from '$lib/components/SEO.svelte';
	import * as Accordion from '$lib/components/ui/accordion';
	import * as Carousel from '$lib/components/ui/carousel';
	import * as Tabs from '$lib/components/ui/tabs';
	import { Button } from '$lib/components/ui/button';
	import { slide, fade } from 'svelte/transition';
	import {
		ArrowRight,
		CheckCircle,
		Shield,
		Wrench,
		Zap,
		Home,
		Search,
		Cloud,
		BarChart3
	} from '@lucide/svelte';
	import MailingList from '$lib/components/MailingList.svelte';
	import ContactDialog from '$lib/components/home/ContactDialog.svelte';

	let activeTab = 'all';

	const serviceCategories = {
		roofing: {
			title: 'Roofing Services',
			icon: Home,
			items: [
				{
					name: 'Roof Assessments',
					icon: Search,
					description:
						'Our experienced team conducts thorough inspections to identify leaks, wear, storm damage, and structural issues before they become costly problems.'
				},
				{
					name: 'Roof Maintenance',
					icon: Wrench,
					description:
						'Regular upkeep, including gutter cleaning, minor repairs, and preventative treatments, extends the life of your roof and protects your property.'
				},
				{
					name: 'Repairs & Re-Roofs (Pre-Installs)',
					icon: Shield,
					description:
						'We handle everything from patching leaks to complete re-roofing, ensuring your property is ready for solar installation or just Tasmanian weather.'
				},
				{
					name: 'Roof Painting',
					icon: Cloud,
					description:
						'Our premium paints and coatings protect your roof from the elements, improve energy efficiency by reflecting heat, and give your home a fresh, attractive look.'
				}
			]
		},
		electrical: {
			title: 'Electrical Services',
			icon: Zap,
			items: [
				{
					name: 'Electrical Maintenance',
					icon: Zap,
					description:
						'From switchboard upgrades to safety checks and rewiring, our licensed electricians ensure your system is safe, compliant, and future-ready.'
				},
				{
					name: 'New & Old Systems',
					icon: Shield,
					description:
						"We service both modern and legacy systems, bringing older properties up to today's standards."
				}
			]
		},
		heatpumps: {
			title: 'Heat Pumps',
			icon: Wrench,
			items: [
				{
					name: 'Installation & Maintenance',
					icon: Wrench,
					description:
						'Heat pumps are a smart, energy-efficient choice for Tasmanian homes. We offer expert installation, regular servicing, and repairs to keep your system running smoothly.'
				}
			]
		}
	};

	const whyChooseUs = [
		{
			title: 'Quality Assurance',
			description:
				'We use only high-quality materials and employ experienced, licensed tradespeople. All our work is covered by industry-leading warranties.'
		},
		{
			title: 'Sustainability Focus',
			description:
				'Our services are designed to improve energy efficiency, reduce your carbon footprint, and support a cleaner Tasmania.'
		},
		{
			title: 'One-Stop Shop',
			description:
				'From your roof to your renewable energy systems, we handle everything in-house, saving you time and hassle.'
		},
		{
			title: 'Customer Testimonials',
			description:
				'Trusted by thousands of Tasmanians, see our before-and-after photos and read real customer reviews.'
		}
	];

	const faqSections = [
		{
			title: 'Maintenance FAQs',
			items: [
				{
					question: 'Why is regular roof maintenance important?',
					answer: `
					<p class="pb-6 text-base text-white">
					Tasmania's weather can be harsh on roofs. Regular maintenance prevents leaks, extends roof lifespan, and protects your property from water damage and costly repairs.
					</p>
					`
				},
				{
					question: 'What are the benefits of roof painting?',
					answer: `
					<p class="pb-6 text-base text-white">
					Roof painting shields your roof from UV and weather damage, improves energy efficiency by reflecting sunlight, and enhances your home's appearance.
					</p>
					`
				},
				{
					question: 'How often should I have my roof inspected?',
					answer: `
					<p class="pb-6 text-base text-white">
					We recommend annual inspections, especially after storms or heavy rainfall. Early detection of issues saves money in the long run.
					</p>
					`
				},
				{
					question: 'What does an energy audit involve?',
					answer: `
					<p class="pb-6 text-base text-white">
					We assess your property's energy consumption, insulation, and appliances, then suggest practical improvements to reduce costs and environmental impact.
					</p>
					`
				},
				{
					question: 'Why install a heat pump?',
					answer: `
					<p class="pb-6 text-base text-white">
					Heat pumps are highly efficient for both heating and cooling, helping you save on energy bills and reduce emissions.
					</p>
					`
				},
				{
					question: 'Do you offer warranties?',
					answer: `
					<p class="pb-6 text-base text-white">
					Yes, all our work is backed by strong warranties and our commitment to quality.
					</p>
					`
				},
				{
					question: 'Are your technicians licensed and insured?',
					answer: `
					<p class="pb-6 text-base text-white">
					Absolutely. All Maximum Solar staff are fully qualified, licensed, and insured for your peace of mind.
					</p>
					`
				},
				{
					question: 'Can you coordinate multiple jobs at once?',
					answer: `
					<p class="pb-6 text-base text-white">
					Yes! Our one-stop approach means we can handle roofing, electrical, and renewable upgrades in a single, streamlined project.
					</p>
					`
				}
			]
		}
	];

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
	title="Site Maintenance Services - Professional Property & Solar System Care"
	description="Comprehensive site maintenance services in Tasmania including roofing, electrical work, solar system care, and property maintenance. Professional, reliable service for residential and commercial properties."
	keywords="site maintenance Tasmania, property maintenance services, roofing services Hobart, electrical maintenance, solar system maintenance, building maintenance, residential maintenance"
	type="WebPage"
/>

<svelte:head>
	<title>Maintenance Division - Tasmania's Trusted Experts | Maximum Solar</title>
	<meta
		name="description"
		content="Maximum Solar's Maintenance Division offers comprehensive roofing, electrical, and renewable maintenance services across Tasmania. Quality, reliability, and peace of mind guaranteed."
	/>
</svelte:head>

<!-- Hero Section -->
<section class="relative overflow-hidden bg-black pt-14">
	<div class="absolute inset-0 z-0">
		<enhanced:img
			class="h-full w-full object-cover opacity-60"
			src="/src/lib/assets/images/site-maintenance.jpg"
			sizes="min(1280px, 100vw)"
			alt="Professional maintenance services in Tasmania"
		/>
		<div class="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/5"></div>
	</div>

	<div class="relative mx-auto max-w-7xl px-6 pt-56 pb-24 lg:px-8 lg:pb-20">
		<div class="max-w-4xl">
			<div class="text-left">
				<h1 class="font-heading max-w-5xl text-5xl font-bold text-white lg:text-7xl">
					<span class="block">Maintenance Division</span>
				</h1>
				<p class="font-heading mt-6 max-w-4xl text-2xl font-medium text-white">
					Tasmania's Trusted Experts in Roofing, Electrical, and Renewable Maintenance
				</p>
				<p class="mt-6 max-w-3xl text-lg text-white">
					Maximum Solar's dedicated Maintenance Division offers comprehensive care for your
					property's most important systems - roofing, electrical, and renewable energy. As a local
					Tasmanian business, we understand the unique challenges our climate presents, and we're
					committed to delivering quality, reliability, and peace of mind for every customer.
				</p>
				<div class="mt-10 flex flex-col items-start justify-start gap-4 lg:flex-row">
					<a
						href="#contact"
						on:click={handleAnchorClick}
						class="inline-flex items-center justify-center rounded-full bg-[#FFC640] px-8 py-4 text-lg font-semibold text-black transition hover:bg-[#FFD700]"
					>
						Book Free Consultation
						<ArrowRight class="ml-2 h-5 w-5" />
					</a>
					<a
						href="#services"
						on:click={handleAnchorClick}
						class="inline-flex items-center justify-center rounded-full border-2 border-white/50 bg-black/30 px-8 py-4 text-lg font-semibold text-white transition hover:bg-black/50"
					>
						Our Services
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Introduction Section -->
<section id="about" class="mx-auto bg-white py-20">
	<div class="mx-auto max-w-4xl px-6 text-center">
		<h2 class="font-heading text-4xl font-semibold text-black sm:text-5xl">
			Protecting Your Investment
		</h2>
		<p class="mx-auto mt-6 max-w-3xl text-lg text-gray-700">
			Your home or business is a major investment, and keeping it in top condition is essential for
			comfort, safety, and long-term value. From storm-damaged roofs to ageing electrical systems
			and the latest in renewable technology, Maximum Solar is your one-stop shop for expert
			maintenance and installations across Tasmania.
		</p>
	</div>
</section>

<!-- Services Section -->
<section id="services" class="bg-black py-20">
	<div class="mx-auto max-w-7xl px-6">
		<div class="text-center">
			<h2 class="font-heading text-4xl font-semibold text-white sm:text-5xl">Our Services</h2>
			<p class="mx-auto mt-6 max-w-3xl text-lg text-gray-300">
				Comprehensive maintenance solutions for all your property needs
			</p>
		</div>

		<div class="mx-auto mt-16 max-w-7xl">
			<Tabs.Root bind:value={activeTab} class="w-full ">
				<div class="w-full overflow-auto lg:overflow-hidden">
					<Tabs.List class="mx-auto grid w-xl  grid-cols-4 overflow-auto rounded-full bg-zinc-800">
						<Tabs.Trigger
							value="all"
							class="rounded-full text-white data-[state=active]:bg-[#FFC640] data-[state=active]:text-black"
						>
							<Shield class="mr-2 h-4 w-4" />
							All
						</Tabs.Trigger>
						<Tabs.Trigger
							value="roofing"
							class="rounded-full text-white data-[state=active]:bg-[#FFC640] data-[state=active]:text-black"
						>
							<Home class="mr-2 h-4 w-4" />
							Roofing
						</Tabs.Trigger>
						<Tabs.Trigger
							value="electrical"
							class="rounded-full text-white data-[state=active]:bg-[#FFC640] data-[state=active]:text-black"
						>
							<Zap class="mr-2 h-4 w-4" />
							Electrical
						</Tabs.Trigger>
						<Tabs.Trigger
							value="heatpumps"
							class="rounded-full text-white data-[state=active]:bg-[#FFC640] data-[state=active]:text-black"
						>
							<Wrench class="mr-2 h-4 w-4" />
							Heat Pumps
						</Tabs.Trigger>
					</Tabs.List>
				</div>
				<Tabs.Content value="all" class="mt-20 lg:mt-12">
					{#if activeTab === 'all'}
						<div
							in:fade={{ duration: 200, delay: 100 }}
							out:fade={{ duration: 100 }}
							class="min-h-[200px]"
						>
							<Carousel.Root opts={{ align: 'start', loop: true }} class="w-full">
								<Carousel.Content class="min-h-[200px]">
									{#each Object.entries(serviceCategories) as [categoryKey, category]}
										{#each category.items as item}
											<Carousel.Item class="flex md:basis-1/2 lg:basis-1/3">
												<div class="mx-auto flex h-full max-w-xl justify-center">
													<dl class="grid w-full grid-cols-1 gap-y-8">
														<div class="flex flex-col">
															<dt class="font-heading flex items-center gap-x-3 text-lg text-white">
																<svelte:component
																	this={item.icon}
																	class="h-5 w-5 flex-none text-[#FFC640]"
																/>
																{item.name}
															</dt>
															<dd class="mt-4 flex flex-col text-base text-white">
																<p>{item.description}</p>
																<p class="mt-2 text-sm text-[#FFC640]">{category.title}</p>
															</dd>
														</div>
													</dl>
												</div>
											</Carousel.Item>
										{/each}
									{/each}
									<!-- Energy Audit - Only in All tab -->
									<Carousel.Item class="flex md:basis-1/2 lg:basis-1/3">
										<div class="mx-auto flex h-full max-w-xl justify-center">
											<dl class="grid w-full grid-cols-1 gap-y-8">
												<div class="flex flex-col">
													<dt class="font-heading flex items-center gap-x-3 text-lg text-white">
														<BarChart3 class="h-5 w-5 flex-none text-[#FFC640]" />
														Professional Energy Assessment
													</dt>
													<dd class="mt-4 flex flex-col text-base text-white">
														<p>
															Our experts assess your property's energy use and provide practical
															recommendations to cut costs and boost efficiency.
														</p>
														<p class="mt-2 text-sm text-[#FFC640]">Energy Services</p>
													</dd>
												</div>
											</dl>
										</div>
									</Carousel.Item>
								</Carousel.Content>
								<div class="mt-8 flex items-center justify-center gap-2">
									<Carousel.Previous
										class="-top-12 right-14 left-auto border border-[#FFC640] bg-[#FFC640] text-black hover:bg-[#FFD700] hover:text-black sm:top-1/2 sm:right-auto sm:-left-12 sm:-translate-y-1/2"
									/>
									<Carousel.Next
										class="-top-12 right-4 border border-[#FFC640] bg-[#FFC640] text-black hover:bg-[#FFD700] hover:text-black sm:top-1/2 sm:-right-12 sm:left-auto sm:-translate-y-1/2"
									/>
								</div>
							</Carousel.Root>
						</div>
					{/if}
				</Tabs.Content>

				{#each Object.entries(serviceCategories) as [key, category]}
					<Tabs.Content value={key} class="mt-20 lg:mt-12">
						{#if activeTab === key}
							<div
								in:fade={{ duration: 200, delay: 100 }}
								out:fade={{ duration: 100 }}
								class="min-h-[200px]"
							>
								<Carousel.Root opts={{ align: 'start', loop: true }} class="w-full">
									<Carousel.Content class="min-h-[200px]">
										{#each category.items as item}
											<Carousel.Item class="flex md:basis-1/2 lg:basis-1/3">
												<div class="mx-auto flex h-full max-w-xl justify-center">
													<dl class="grid w-full grid-cols-1 gap-y-8">
														<div class="flex flex-col">
															<dt class="font-heading flex items-center gap-x-3 text-lg text-white">
																<svelte:component
																	this={item.icon}
																	class="h-5 w-5 flex-none text-[#FFC640]"
																/>
																{item.name}
															</dt>
															<dd class="mt-4 flex flex-col text-base text-white">
																<p>{item.description}</p>
															</dd>
														</div>
													</dl>
												</div>
											</Carousel.Item>
										{/each}
									</Carousel.Content>
									<div class="mt-8 flex items-center justify-center gap-2">
										<Carousel.Previous
											class="-top-12 right-14 left-auto border border-[#FFC640] bg-[#FFC640] text-black hover:bg-[#FFD700] hover:text-black sm:top-1/2 sm:right-auto sm:-left-12 sm:-translate-y-1/2"
										/>
										<Carousel.Next
											class="-top-12 right-4 border border-[#FFC640] bg-[#FFC640] text-black hover:bg-[#FFD700] hover:text-black sm:top-1/2 sm:-right-12 sm:left-auto sm:-translate-y-1/2"
										/>
									</div>
								</Carousel.Root>
							</div>
						{/if}
					</Tabs.Content>
				{/each}
			</Tabs.Root>
			<div class="mx-auto flex max-w-7xl items-center justify-center px-4"><ContactDialog /></div>
		</div>
	</div>
</section>

<div class="bg-white py-24">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div
			class="mx-auto grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-5"
		>
			<enhanced:img
				class="col-span-1 max-h-20 w-full object-contain sm:col-start-auto lg:col-span-1"
				src="/src/lib/assets/images/logos/tindo.png"
				alt="Tindo"
			/>
			<enhanced:img
				class="col-span-1 max-h-20 w-full object-contain sm:col-start-auto lg:col-span-1"
				src="/src/lib/assets/images/logos/sungrow.jpg"
				alt="Sungrow"
			/>
			<enhanced:img
				class="col-span-1 max-h-20 w-full object-contain sm:col-start-auto lg:col-span-1"
				src="/src/lib/assets/images/logos/fronius.jpg"
				alt="Fronius"
			/>
			<enhanced:img
				class="col-span-1 max-h-20 w-full object-contain sm:col-start-auto lg:col-span-1"
				src="/src/lib/assets/images/logos/sma.png"
				alt="SMA"
			/>
			<enhanced:img
				class="col-span-2 mx-auto max-h-20 w-full max-w-[50%] object-contain sm:col-span-1 sm:col-start-auto sm:max-w-none lg:col-span-1"
				src="/src/lib/assets/images/logos/trina.png"
				alt="Trina"
			/>
		</div>
	</div>
</div>
<!-- Why Choose Us Section -->
<!-- <section class="bg-[#236EA4] py-20">
	<div class="mx-auto max-w-7xl px-6">
		<div class="text-center">
			<h2 class="font-heading text-4xl font-semibold text-white sm:text-5xl">
				Why Choose Maximum Solar?
			</h2>
		</div>

		<div class="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
			{#each whyChooseUs as item}
				<div class="text-center">
					<div
						class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FFC640] p-4"
					>
						<CheckCircle class="h-8 w-8 text-black" />
					</div>
					<h3 class="font-heading mt-6 text-xl font-semibold text-white">
						{item.title}
					</h3>
					<p class="mt-4 text-white/90">
						{item.description}
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>
-->

<!-- Before and After Section -->
<!-- <section class="py-20">
	<div class="mx-auto max-w-screen-2xl px-6">
		<div class="text-center">
			<h2 class="font-heading text-4xl font-semibold text-black sm:text-5xl">Before & After</h2>
			<p class="mx-auto mt-6 max-w-3xl text-lg text-gray-700">
				See the difference our maintenance services make
			</p>
		</div>

		<div class="mt-16 grid gap-12 lg:grid-cols-2">
			<div class="text-center">
				<h3 class="font-heading mb-6 text-2xl font-semibold text-black">Before Maintenance</h3>
				<div class="aspect-[4/3] w-full overflow-hidden rounded-lg">
					<enhanced:img
						class="h-full w-full object-cover"
						src="/src/lib/assets/images/installations/installation1.jpeg"
						sizes="(min-width: 1024px) 50vw, 100vw"
						alt="Property before maintenance work"
					/>
				</div>
				<p class="mt-4 text-gray-600">Worn roof requiring maintenance and upgrades</p>
			</div>
			<div class="text-center">
				<h3 class="font-heading mb-6 text-2xl font-semibold text-black">After Maintenance</h3>
				<div class="aspect-[4/3] w-full overflow-hidden rounded-lg">
					<enhanced:img
						class="h-full w-full object-cover"
						src="/src/lib/assets/images/installations/installation2.jpeg"
						sizes="(min-width: 1024px) 50vw, 100vw"
						alt="Property after maintenance work completed"
					/>
				</div>
				<p class="mt-4 text-gray-600">Fully restored with solar installation ready</p>
			</div>
		</div>
	</div>
</section> -->

<!-- Local Expertise Section -->
<section class="py-20">
	<div class="mx-auto max-w-4xl px-6 text-center">
		<h2 class="font-heading text-4xl font-semibold text-black sm:text-5xl">Local Expertise</h2>
		<p class="mt-6 text-lg text-gray-700">
			Maximum Solar is 100% Tasmanian owned and operated. We're proud to have served thousands of
			homes and businesses across the state, earning a reputation for quality, reliability, and
			genuine local care.
		</p>
	</div>
</section>

<!-- FAQ Section -->
<section id="faq" class="bg-black py-20">
	<div class="mx-auto max-w-4xl px-6">
		<div class="text-center">
			<h2 class="font-heading text-4xl font-semibold text-white sm:text-5xl">
				Frequently Asked Questions
			</h2>
			<p class="mt-6 text-lg text-white/90">
				Get answers to common questions about our maintenance services
			</p>
		</div>

		{#each faqSections as section}
			<div class="mt-12">
				<Accordion.Root type="single" class="w-full">
					{#each section.items as item}
						<Accordion.Item class="border-b border-white/20">
							<Accordion.Trigger
								class="font-heading w-full py-6 text-left text-xl font-bold text-white lg:text-2xl"
							>
								{item.question}
							</Accordion.Trigger>
							<Accordion.Content class="w-full py-2 pl-4 text-left">
								{@html item.answer}
							</Accordion.Content>
						</Accordion.Item>
					{/each}
				</Accordion.Root>
			</div>
		{/each}
	</div>
</section>

<!-- Call to Action Section -->
<section id="contact" class="relative py-20">
	<enhanced:img
		src="/src/lib/assets/images/hero.jpg"
		alt="Solar panels in Tasmania"
		class="absolute inset-0 h-full w-full object-cover"
	/>
	<div class="mx-auto max-w-4xl px-6 text-center">
		<h2 class="font-heading text-4xl font-semibold text-black sm:text-5xl">
			Book Your Free Consultation
		</h2>
		<p class="mt-6 text-lg text-black">
			Ready to protect your property and save on energy? Contact Maximum Solar's Maintenance
			Division for a no-obligation consultation or roof assessment.
		</p>
		<div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
			<a
				href="/contact"
				class="inline-flex items-center justify-center rounded-full bg-black px-8 py-4 text-lg font-semibold text-white transition hover:bg-gray-800"
			>
				Book Now
				<ArrowRight class="ml-2 h-5 w-5" />
			</a>
			<a
				href="tel:1300457542"
				class="inline-flex items-center justify-center rounded-full border-2 border-black bg-transparent px-8 py-4 text-lg font-semibold text-black transition hover:bg-black hover:text-white"
			>
				Call 1300 457 542
			</a>
		</div>
	</div>
</section>
