<script>
	import Seo from '$lib/components/SEO.svelte';
	import { ArrowRight } from '@lucide/svelte';
	import * as Carousel from '$lib/components/ui/carousel';
</script>

<Seo
	title="Residential Solar Panels - Home Solar Installation Tasmania"
	description="Professional residential solar panel installation across Tasmania. From rural homes to city dwellings, tin to tile roofs - we've got you covered. Reduce bills, go fully electric, or get off-grid with Maximum Solar."
	keywords="residential solar panels Tasmania, home solar installation, solar panels for homes, residential solar systems Hobart, house solar panels, home renewable energy, solar for rural homes"
	type="WebPage"
/>

<section class="relative flex w-full flex-col items-center justify-center pt-60 pb-24">
	<video
		src="/videos/residential-solar.mp4"
		poster="/src/lib/assets/images/commercial-solar.jpg"
		autoplay
		muted
		loop
		class="absolute inset-0 h-full w-full object-cover"
	></video>
	<div class="absolute inset-0 bg-black opacity-50"></div>
	<h1 class="font-heading relative z-10 max-w-7xl px-6 text-4xl text-white lg:text-7xl/24">
		Residential Solar
	</h1>
	<p class="font-heading z-10 mt-8 max-w-5xl px-6 text-center text-xl text-white lg:text-3xl">
		From rural countryside homes to city dwellings, tin to tile, we’ve got you covered.
	</p>
	<a
		href="/contact"
		class="z-10 mt-8 rounded-full bg-black px-8 py-3 text-center text-sm font-semibold text-white hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
	>
		Book an appointment
		<ArrowRight class="ml-2 inline h-4 w-4" />
	</a>
</section>

<section id="about" class="mx-auto">
	<div class="relative isolate overflow-hidden px-6 py-12 text-center sm:px-16 lg:pt-24">
		<h2 class="font-heading mx-auto mt-10 max-w-3xl text-center text-2xl font-semibold sm:text-4xl">
			With residential solar, you can save a huge chunk on your electricity bills, go fully electric
			and even get off grid.
		</h2>
		<p class="mx-auto mt-10 max-w-3xl text-center text-base font-bold lg:text-lg">
			Whether you need solar panels for your home or business, we have the expertise to design and
			install a system that meets your specific requirements.
		</p>
		<p class="mx-auto mt-10 max-w-3xl text-center text-base lg:text-lg">
			We understand that every property is unique, and energy consumption patterns vary. Our team
			will collaborate with you to assess your energy needs and recommend the appropriate size
			system for your residential or commercial property.
		</p>
		<p class="mx-auto mt-10 max-w-3xl text-center text-base lg:text-lg">
			Our installation services are comprehensive to your specific requirements. We have experience
			in installing systems of all sizes, from small residential setups to large-scale commercial
			installations. Our trained professionals accredited by the Clean Energy Council (CEC) will
			guarantee that your solar panels are properly and effectively fitted, maximising their energy
			output potential. Solar energy not only helps you save on your electricity bills but also
			contributes to a greener and more sustainable future.
		</p>
		<div class="mx-auto mt-6 flex max-w-2xl items-center justify-center gap-6">
			<enhanced:img
				class="w-auto lg:h-48"
				src="/src/lib/assets/images/logos/SEC.png"
				alt="Smart Energy Council"
			/>
			<enhanced:img
				class="w-auto lg:h-60"
				src="/src/lib/assets/images/logos/CEC.jpg"
				alt="Clean Energy Council"
			/>
		</div>
	</div>
</section>

<section id="about" class="mx-auto pb-12">
	<div class="relative isolate overflow-hidden px-6 py-12 text-center sm:px-16">
		<h2 class="font-heading mx-auto mt-10 max-w-3xl text-center text-4xl font-semibold sm:text-6xl">
			Our Services
		</h2>
		<p class="mx-auto mt-10 max-w-3xl text-center text-base font-bold lg:text-lg">
			At Maximum Solar we offer a range of services to meet the solar energy needs of both
			residential and commercial customers. Our services include solar panel and battery
			installation, as well as electrical (EV) charging installs.
		</p>
		<p class="mx-auto mt-10 max-w-3xl text-center text-base lg:text-lg">
			For residential customers, we understand that each household has unique energy consumption
			patterns. That’s why we tailor our solar packages to suit your specific needs.
		</p>
		<p class="mx-auto mt-10 max-w-3xl text-center text-base lg:text-lg">
			Our team will conduct an in-home consultation to assess your energy requirements and provide a
			comprehensive understanding of the solar industry. We will then explain the benefits of
			switching to solar energy, including cost savings, reduced reliance on the grid, and
			environmental sustainability.
		</p>
	</div>
	<div class="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 lg:grid-cols-3">
		<div class="col-span-1 flex flex-col items-center text-center">
			<div class="aspect-[3/4] max-h-96 w-full rounded-3xl lg:max-h-none">
				<enhanced:img
					class="h-full w-full rounded-2xl object-cover"
					src="/src/lib/assets/images/residential-solar-1.jpg"
					alt="Solar Panel Installation"
				/>
			</div>
			<h3 class="font-heading mt-4 text-xl font-semibold">Solar</h3>
			<p class="mt-2 text-base">
				We service all types of properties across Tasmania and Australia. Expect a reduction on your
				bills straight away post-install.
			</p>
		</div>
		<div class="col-span-1 flex flex-col items-center text-center">
			<div class="aspect-[3/4] max-h-96 min-h-0 w-full rounded-3xl lg:max-h-none">
				<enhanced:img
					class="h-full w-full rounded-2xl object-cover"
					src="/src/lib/assets/images/residential-solar-2.jpg"
					alt="Battery Storage Solutions"
				/>
			</div>
			<h3 class="font-heading mt-4 text-xl font-semibold">Batteries</h3>
			<p class="mt-2 text-base">
				Battery solutions for those with EV's, night time users or people just wanting to invest
				more to save more.
			</p>
		</div>
		<div class="col-span-1 flex flex-col items-center text-center">
			<div class="aspect-[3/4] max-h-96 w-full rounded-3xl lg:max-h-none">
				<enhanced:img
					class="h-full w-full rounded-2xl object-cover"
					src="/src/lib/assets/images/residential-solar-3.jpg"
					alt="EV Charging Installation"
				/>
			</div>
			<h3 class="font-heading mt-4 text-xl font-semibold">Black out protection</h3>
			<p class="mt-2 text-base">
				Talk to us today about how you can protect yourself from being cut off from power in the
				event of a black out. Great for fire-prone areas or life-saving devices.
			</p>
		</div>
		<div
			class="col-span-1 mx-auto flex w-full items-center justify-center px-6 text-center lg:col-span-3"
		>
			<a
				href="/contact"
				class="z-10 mt-8 rounded-full bg-black px-8 py-3 text-center text-sm font-semibold text-white hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
			>
				Book an appointment
				<ArrowRight class="ml-2 inline h-4 w-4" />
			</a>
		</div>
	</div>
</section>

<section id="about" class="mx-auto bg-[#236EA4] pb-12">
	<div class="relative isolate overflow-hidden px-6 py-12 text-center sm:px-16">
		<h2
			class="font-heading mx-auto mt-10 max-w-3xl text-center text-4xl font-semibold text-white sm:text-6xl"
		>
			Our Installers
		</h2>
		<p class="mx-auto mt-10 max-w-3xl text-center text-base font-bold text-white lg:text-lg">
			At Maximum Solar we take pride in having a team of highly skilled and qualified installers who
			are accredited by the Clean Energy Council (CEC). This accreditation ensures that we have only
			the best people working on your solar installation.
		</p>
		<p class="mx-auto mt-10 max-w-3xl text-center text-base text-white lg:text-lg">
			Our installers have undergone extensive training and assessments to meet the industry
			standards set by the CEC. We believe in delivering quality workmanship to our customers. Our
			installers are experienced professionals who are committed to providing installations of the
			highest standard. We pay attention to every detail and ensure that your solar panels are
			installed correctly and efficiently.
		</p>
		<p class="mx-auto mt-10 max-w-3xl text-center text-base text-white lg:text-lg">
			To demonstrate our confidence in our work, we offer a 10-year warranty on our workmanship.
			This warranty gives you peace of mind knowing that we stand behind the quality of our
			installations. Safety is a top priority for us.
		</p>
	</div>
</section>

<section id="gallery" class="mx-auto pb-12">
	<div class="relative isolate overflow-hidden px-6 py-12 text-center sm:px-16">
		<h2 class="font-heading mx-auto mt-10 max-w-3xl text-center text-4xl font-semibold sm:text-6xl">
			Previous Residential Installations
		</h2>
	</div>
	<div class="mx-auto max-w-full">
		<Carousel.Root opts={{ loop: true, align: 'center' }} class="w-full">
			<Carousel.Content class="-ml-0">
				<Carousel.Item class="basis-4/5 pl-0 md:basis-3/4 lg:basis-3/5">
					<enhanced:img
						class="h-80 w-full object-cover md:h-[40rem]"
						src="/src/lib/assets/images/installations/installation1.jpeg"
						alt="Residential Solar Installation 1"
					/>
				</Carousel.Item>
				<Carousel.Item class="basis-4/5 pl-0 md:basis-3/4 lg:basis-3/5">
					<enhanced:img
						class="h-80 w-full object-cover md:h-[40rem]"
						src="/src/lib/assets/images/installations/installation2.jpeg"
						alt="Residential Solar Installation 2"
					/>
				</Carousel.Item>
				<Carousel.Item class="basis-4/5 pl-0 md:basis-3/4 lg:basis-3/5">
					<enhanced:img
						class="h-80 w-full object-cover md:h-[40rem]"
						src="/src/lib/assets/images/installations/installation3.jpeg"
						alt="Residential Solar Installation 3"
					/>
				</Carousel.Item>
				<Carousel.Item class="basis-4/5 pl-0 md:basis-3/4 lg:basis-3/5">
					<enhanced:img
						class="h-80 w-full object-cover md:h-[40rem]"
						src="/src/lib/assets/images/installations/installation4.jpeg"
						alt="Residential Solar Installation 4"
					/>
				</Carousel.Item>
				<Carousel.Item class="basis-4/5 pl-0 md:basis-3/4 lg:basis-3/5">
					<enhanced:img
						class="h-80 w-full object-cover md:h-[40rem]"
						src="/src/lib/assets/images/installations/installation5.jpeg"
						alt="Residential Solar Installation 5"
					/>
				</Carousel.Item>
				<Carousel.Item class="basis-4/5 pl-0 md:basis-3/4 lg:basis-3/5">
					<enhanced:img
						class="h-80 w-full object-cover md:h-[40rem]"
						src="/src/lib/assets/images/installations/installation6.jpeg"
						alt="Residential Solar Installation 6"
					/>
				</Carousel.Item>
				<Carousel.Item class="basis-4/5 pl-0 md:basis-3/4 lg:basis-3/5">
					<enhanced:img
						class="h-80 w-full object-cover md:h-[40rem]"
						src="/src/lib/assets/images/installations/installation7.jpeg"
						alt="Residential Solar Installation 7"
					/>
				</Carousel.Item>
				<Carousel.Item class="basis-4/5 pl-0 md:basis-3/4 lg:basis-3/5">
					<enhanced:img
						class="h-80 w-full object-cover md:h-[40rem]"
						src="/src/lib/assets/images/installations/installation8.jpeg"
						alt="Residential Solar Installation 8"
					/>
				</Carousel.Item>
				<Carousel.Item class="basis-4/5 pl-0 md:basis-3/4 lg:basis-3/5">
					<enhanced:img
						class="h-80 w-full object-cover md:h-[40rem]"
						src="/src/lib/assets/images/installations/installation9.jpeg"
						alt="Residential Solar Installation 9"
					/>
				</Carousel.Item>
			</Carousel.Content>
			<Carousel.Previous class="left-4" />
			<Carousel.Next class="right-4" />
		</Carousel.Root>
	</div>
</section>

<section id="ev-chargers" class="mx-auto pb-12">
	<div class="relative isolate overflow-hidden px-6 py-12 text-center sm:px-16">
		<h2 class="font-heading mx-auto mt-10 max-w-3xl text-center text-4xl font-semibold sm:text-6xl">
			EV Chargers
		</h2>
		<h3 class="font-heading mx-auto mt-6 max-w-3xl text-center text-xl font-semibold sm:text-2xl">
			In partnership with Charger Stations Australia
		</h3>
		<p class="mx-auto mt-10 max-w-3xl text-center text-base lg:text-lg">
			We have an exclusive partnership with Charge Stations Australia providing some of the worlds
			best and most cost effective technology to charge electric vehicles. VIARIS - a European
			designed and manufactured EV charger has many functions that put them ahead of the game in the
			industry.
		</p>
	</div>

	<!-- Two Column Layout with EV Charger Image and Benefits -->
	<div class="mx-auto max-w-7xl px-6">
		<div class="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
			<!-- Left Column - EV Charger Image -->
			<div class="flex items-center justify-center">
				<div class="relative">
					<div class="aspect-square w-full max-w-lg overflow-hidden rounded-full">
						<enhanced:img
							class="h-full w-full object-cover"
							src="/src/lib/assets/images/ev-charger-1.jpg"
							alt="EV Charger Installation"
						/>
					</div>
				</div>
			</div>

			<!-- Right Column - Benefits -->
			<div class="flex flex-col justify-center">
				<h3 class="font-heading mb-6 text-2xl font-semibold sm:text-3xl">
					BENEFITS OF AN EV CHARGER
				</h3>
				<p class="mb-6 text-base font-bold lg:text-lg">
					Save plenty of money and on carbon emissions.
				</p>
				<ul class="space-y-3 text-base lg:text-lg">
					<li class="flex items-start">
						<span class="mt-1 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-black"></span>
						Much cheaper than public charging stations or grid consumption
					</li>
					<li class="flex items-start">
						<span class="mt-1 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-black"></span>
						Great for families who travel long distance - a fraction of petrol costs
					</li>
					<li class="flex items-start">
						<span class="mt-1 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-black"></span>
						At home service and owned by you
					</li>
				</ul>
			</div>
		</div>
	</div>

	<!-- VIARIS EV Chargers Information -->
	<div class="mx-auto mt-16 max-w-7xl px-6">
		<div class="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
			<!-- Left Column - VIARIS Info -->
			<div class="flex flex-col justify-center">
				<h3 class="font-heading mb-6 text-2xl font-semibold sm:text-3xl">VIARIS EV CHARGERS</h3>
				<p class="mb-6 text-base font-bold lg:text-lg">Important Information</p>
				<ul class="space-y-3 text-base lg:text-lg">
					<li class="flex items-start">
						<span class="mt-1 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-black"></span>
						ORBIS has been around since the 1920's
					</li>
					<li class="flex items-start">
						<span class="mt-1 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-black"></span>
						Function to allow charging your EV solely with solar
					</li>
					<li class="flex items-start">
						<span class="mt-1 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-black"></span>
						Full monitoring capabilities
					</li>
					<li class="flex items-start">
						<span class="mt-1 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-black"></span>
						European owned, designed and manufactured
					</li>
					<li class="flex items-start">
						<span class="mt-1 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-black"></span>
						Super-fast and cost effective charging
					</li>
					<li class="flex items-start">
						<span class="mt-1 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-black"></span>
						Can easily get spare parts or customer service in Australia
					</li>
					<li class="flex items-start">
						<span class="mt-1 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-black"></span>
						Warranties 3 years
					</li>
					<li class="flex items-start">
						<span class="mt-1 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-black"></span>
						Installed by licensed electricians only
					</li>
				</ul>
			</div>

			<!-- Right Column - House with EV Charger Image -->
			<div class="flex items-center justify-center">
				<div class="relative">
					<div class="aspect-square w-full max-w-lg overflow-hidden rounded-full">
						<enhanced:img
							class="h-full w-full object-cover"
							src="/src/lib/assets/images/ev-charger-2.jpg"
							alt="House with EV Charger"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Comparison to the Market -->
	<div class="mx-auto mt-16 max-w-7xl px-6">
		<h3 class="font-heading mb-12 text-center text-2xl font-semibold sm:text-3xl">
			COMPARISON TO THE MARKET
		</h3>

		<div class="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
			<!-- VIARIS Column -->
			<div class="rounded-lg bg-gray-50 p-8">
				<h4 class="font-heading mb-6 text-center text-xl font-semibold sm:text-2xl">VIARIS</h4>
				<ul class="space-y-4 text-base lg:text-lg">
					<li class="flex items-start">
						<span class="mt-1 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-green-600"></span>
						The chargers work with any EV
					</li>
					<li class="flex items-start">
						<span class="mt-1 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-green-600"></span>
						Fully European and owned by ORBIS who have been around since the 1920's - high quality, high
						efficiency
					</li>
					<li class="flex items-start">
						<span class="mt-1 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-green-600"></span>
						3-9 hours for 40%-100% charge
					</li>
				</ul>
			</div>

			<!-- Market Column -->
			<div class="rounded-lg bg-gray-50 p-8">
				<h4 class="font-heading mb-6 text-center text-xl font-semibold sm:text-2xl">MARKET</h4>
				<ul class="space-y-4 text-base lg:text-lg">
					<li class="flex items-start">
						<span class="mt-1 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-red-600"></span>
						Often only works with their brands
					</li>
					<li class="flex items-start">
						<span class="mt-1 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-red-600"></span>
						Most EV chargers are new brands or imported from China as cheap options - lacking quality,
						customer service and longevity
					</li>
					<li class="flex items-start">
						<span class="mt-1 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-red-600"></span>
						Charge time: Public stations or slow chargers can take 40-50 hrs
					</li>
				</ul>
			</div>
		</div>
	</div>

	<!-- Call to Action -->
	<div class="mx-auto mt-12 flex w-full items-center justify-center px-6 text-center">
		<a
			href="/contact"
			class="z-10 mt-8 rounded-full bg-black px-8 py-3 text-center text-sm font-semibold text-white hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
		>
			Book an appointment
			<ArrowRight class="ml-2 inline h-4 w-4" />
		</a>
	</div>
</section>

<section class="relative flex w-full flex-col items-center justify-center py-36">
	<enhanced:img
		src="/src/lib/assets/images/residential-solar-4.jpg"
		alt="Hero background"
		class="absolute inset-0 h-full w-full object-cover"
	/>
	<div class="absolute inset-0 bg-black opacity-20"></div>
	<h4
		class="font-heading relative z-10 mx-auto max-w-7xl px-6 text-center text-6xl text-white lg:text-7xl/24"
	>
		Curious about how it all works? Check out our process below.
	</h4>
	<div class="mx-auto mt-12 flex w-full items-center justify-center px-6 text-center">
		<a
			href="/the-process"
			class="z-10 mt-8 rounded-full bg-black px-8 py-3 text-center text-sm font-semibold text-white hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
		>
			Our Process
			<ArrowRight class="ml-2 inline h-4 w-4" />
		</a>
	</div>
</section>
