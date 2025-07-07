<script>
	import Seo from '$lib/components/SEO.svelte';
	import ContactDialog from '$lib/components/home/ContactDialog.svelte';
	import { ArrowRight } from '@lucide/svelte';
</script>

<Seo
	title="The Solar Process - How Solar Installation Works with Maximum Solar"
	description="Learn about Maximum Solar's personalized solar installation process in Tasmania. From consultation to installation, discover how we find the right energy solution for your home or business."
	keywords="solar installation process Tasmania, how solar works, solar consultation process, solar installation steps, Maximum Solar process, personalized solar solutions, solar assessment"
	type="WebPage"
/>

<section class="relative flex w-full flex-col items-center justify-center pt-60 pb-24">
	<enhanced:img
		src="/src/lib/assets/images/the-process.jpg"
		alt="Hero background"
		class="absolute inset-0 h-full w-full object-cover"
	/>
	<div class="absolute inset-0 bg-black opacity-50"></div>
	<h1
		class="font-heading relative z-10 mx-auto max-w-5xl px-6 text-center text-4xl text-white lg:text-6xl/24"
	>
		In person, personalised energy solutions for you and your home.
	</h1>
	<p class="z-10 mx-auto mt-8 max-w-5xl px-6 text-center text-lg text-white lg:text-xl">
		With Maximum Solar, you can trust we will find the right solution to suit your finances,
		property and situation.
	</p>
	<a
		href="/contact"
		class="z-10 mt-8 rounded-full bg-black px-8 py-3 text-center text-sm font-semibold text-white hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
	>
		Book an appointment
		<ArrowRight class="ml-2 inline h-4 w-4" />
	</a>
</section>

<section id="about" class="mx-auto py-24">
	<div class="relative isolate overflow-hidden px-6 py-12 text-center sm:px-16 lg:py-24">
		<h2
			class="font-heading mx-auto max-w-2xl text-center text-xl font-semibold text-balance sm:text-2xl"
		>
			We value your input.
		</h2>

		<p
			class="font-heading mx-auto mt-12 max-w-2xl text-center text-4xl font-semibold text-balance text-[#FFC640] sm:text-5xl/14"
		>
			You have pain points, we have solutions.
		</p>
		<p class="font-heading mx-auto mt-12 max-w-2xl text-center text-xl font-semibold sm:text-2xl">
			With our in person, at-home consultations, we can work with you by assessing your situation to
			find the most ideal energy solution and meet your needs.
		</p>
		<p class="font-heading mx-auto mt-20 max-w-2xl text-center text-xl font-semibold sm:text-2xl">
			Be the change, save the change.
		</p>
	</div>
</section>

<div id="about" class="mx-auto">
	<div class="relative isolate overflow-hidden px-6 pb-48 text-center sm:px-16">
		<div
			class="mx-auto flex max-w-7xl flex-col items-center justify-center gap-x-6 gap-y-4 lg:flex-row"
		>
			<div
				class="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-12 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2"
			>
				<div class=" h-full w-full object-cover">
					<enhanced:img
						alt="Coal River Valley"
						src="$lib/assets/images/the-process-2.jpg"
						class="block h-full w-auto object-cover"
						loading="lazy"
					/>
				</div>

				<div>
					<div class="flex flex-col justify-start gap-8 text-base leading-7">
						<h2 class=" font-heading text-left text-3xl sm:text-5xl">How does it work?</h2>
						<div class="max-w-xl text-lg">
							<p class="col-span-1 text-left leading-7">
								There are several stages to getting set up for renewable energy at your property or
								business, below is our standard process.
							</p>
							<ul class="col-span-1 mt-6 list-disc space-y-4 pl-8 text-left leading-7">
								<li>Give us a call, let us know what you're after and book an appointment.</li>
								<li>
									Send us your full bill, photos of your metre and roof. (We do new builds too so
									feel free to still send what you do have).
								</li>
								<li>
									We will come to your property, look at your bills, discuss your needs and assess
									your metre, roofing and wiring to determine what is needed. We will design a
									layout with you to your liking.
								</li>
								<li>
									We will then discuss the most suitable financial options to fit your budget and
									needs, then quote the best possible solar solution.
								</li>
								<li>
									Once paperwork is filled out, we can apply for a grid approval and book install
									for you. Instal generally takes about a day, with the full process taking around
									3-6 weeks.
								</li>
								<li>After installation, you can sit back, relax and reap your savings!</li>
							</ul>
						</div>
						<a
							href="/contact"
							class=" w-40 rounded-full bg-black px-8 py-3 text-center text-sm font-semibold text-white hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
						>
							Book now
							<ArrowRight class="ml-2 inline h-4 w-4" />
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
