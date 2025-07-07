<script>
	import { ArrowRight } from '@lucide/svelte';
</script>

<section class="n relative flex items-center justify-center overflow-hidden py-48">
	<video autoplay muted loop class="absolute top-0 left-0 -z-20 h-full w-full object-cover">
		<source src="/videos/why-solar.mp4" type="video/mp4" />
	</video>
	<div class="absolute top-0 left-0 -z-10 h-full w-full bg-[#236EA4] opacity-20"></div>
	<div class="z-10 grid w-full max-w-7xl grid-cols-2 gap-8 p-8 md:grid-cols-4">
		<div class="text-center text-white">
			<h3 class="font-heading mb-2 text-4xl lg:text-5xl">10 Year</h3>
			<p class="font-heading m-0 text-lg">Workmanship Warranty</p>
		</div>
		<div class="text-center text-white">
			<h3 class="font-heading mb-2 text-4xl lg:text-5xl">CEC</h3>
			<p class="font-heading m-0 text-lg">Accredited Installers</p>
		</div>
		<div class="text-center text-white">
			<h3 class="font-heading mb-2 text-4xl lg:text-5xl">Marine Grade</h3>
			<p class="font-heading m-0 text-lg">Rust-Proof Steel Racking</p>
		</div>
		<div class="text-center text-white">
			<h3 class="font-heading mb-2 text-4xl lg:text-5xl">25 Year</h3>
			<p class="font-heading m-0 text-lg">Panel Warranty</p>
		</div>
	</div>
</section>

<div class="mx-auto">
	<div class="relative isolate overflow-hidden bg-black px-6 py-20 text-center shadow-2xl sm:px-16">
		<h2 class="font-heading mt-6 text-4xl text-balance text-[#FFC640] sm:text-6xl">
			Why go solar?
		</h2>
		<p class="font-heading mx-auto mt-6 max-w-2xl text-2xl/8 text-pretty text-white">
			With rising power costs and pressure on Australia’s precious natural resources, solar is one
			of the few ways that people can regain power (literally!) by protecting themselves from
			inflation and becoming more self sufficient with their energy.
		</p>
		<div class="mx-auto mt-20 grid max-w-7xl grid-cols-2 gap-20 p-8 lg:grid-cols-3">
			<div class="flex flex-col items-center justify-center text-center">
				<enhanced:img
					src="/src/lib/assets/images/icons/financial-incentives.png"
					alt=""
					class="mx-auto mb-4 max-h-32 w-auto"
				/>
				<p class="font-heading mt-6 text-lg text-[#FFC640] lg:text-2xl">Financial incentives</p>
			</div>
			<div class="flex flex-col items-center justify-center text-center">
				<enhanced:img
					src="/src/lib/assets/images/icons/trusted-company.png"
					alt=""
					class="mx-auto mb-4 max-h-32 w-auto"
				/>
				<p class="font-heading mt-6 text-lg text-[#FFC640] lg:text-2xl">Local trusted company</p>
			</div>
			<div class="flex flex-col items-center justify-center text-center">
				<enhanced:img
					src="/src/lib/assets/images/icons/reduced-bills.png"
					alt=""
					class="mx-auto mb-4 max-h-32 w-auto"
				/>
				<p class="font-heading mt-6 text-lg text-[#FFC640] lg:text-2xl">Reduced power bills</p>
			</div>
			<div class="flex flex-col items-center justify-center text-center">
				<enhanced:img
					src="/src/lib/assets/images/icons/upfront-options.png"
					alt=""
					class="mx-auto mb-4 max-h-32 w-auto"
				/>
				<p class="font-heading mt-6 text-lg text-[#FFC640] lg:text-2xl">$0 upfront options</p>
			</div>
			<div class="flex flex-col items-center justify-center text-center">
				<enhanced:img
					src="/src/lib/assets/images/icons/reduced-carbon.png"
					alt=""
					class="mx-auto mb-4 max-h-32 w-auto"
				/>
				<p class="font-heading mt-6 text-lg text-[#FFC640] lg:text-2xl">Reduced carbon footprint</p>
			</div>
			<div class="flex flex-col items-center justify-center text-center">
				<enhanced:img
					src="/src/lib/assets/images/icons/stress-free.png"
					alt=""
					class="mx-auto mb-4 max-h-32 w-auto"
				/>
				<p class="font-heading mt-6 text-lg text-[#FFC640] lg:text-2xl">Stress free installation</p>
			</div>
		</div>
	</div>
</div>

<div class="mx-auto">
	<div class="relative isolate overflow-hidden px-6 py-20 text-center shadow-2xl sm:px-16">
		<h2 class="font-heading mx-auto mt-6 max-w-5xl text-4xl sm:text-6xl/18">
			Do you have referrals or are part of a community group?
		</h2>
		<p class="font-heading mx-auto mt-6 max-w-2xl text-2xl/8 text-pretty">
			You can earn bonuses, rewards or discounts by referring people you know to us.
		</p>
		<div class="relative mx-auto w-full max-w-7xl font-sans">
			<div class="mt-20 overflow-hidden rounded-3xl">
				<enhanced:img
					src="/src/lib/assets/images/why-solar.jpg"
					alt="A multi-generational family with a Black man holding a baby, standing next to an older white couple in a garden setting."
					class="h-auto w-full max-w-4xl rounded-3xl"
				/>
			</div>
			<div
				class="bg-opacity-80 right-10 bottom-10 mt-8 w-full rounded-3xl bg-black p-12 text-white lg:absolute lg:max-w-lg"
			>
				<p class="mb-4 text-left text-lg">
					We reward our loyal customers with special discounts, deals and incentives for those who
					bring new business to us.
				</p>
				<p class="text-left text-lg">
					If you have referrals, or belong to a community or club, contact us today to find out how
					you can benefit.
				</p>
			</div>
		</div>
		<div class="mt-12 text-center">
			<a
				href="/contact"
				class="inline-flex items-center justify-center gap-2 rounded-full bg-black px-8 py-3 text-base font-semibold text-white transition-all hover:bg-gray-800"
			>
				Get Your Free Quote
				<ArrowRight class="h-5 w-5" />
			</a>
		</div>
	</div>
</div>

<section class="relative flex items-center justify-center overflow-hidden py-18 lg:py-48">
	<enhanced:img
		src="/src/lib/assets/images/why-solar-2.jpg"
		alt=""
		class="absolute top-0 left-0 -z-10 h-full w-full object-cover"
	/>
	<div class="absolute top-0 left-0 -z-10 h-full w-full bg-black opacity-50"></div>
	<div class="z-10 mx-auto max-w-7xl px-6 text-center">
		<p class="font-heading text-xl text-white sm:text-3xl">
			“This company has exceeded, our expectations from start to finish. With their amazing customer
			service, knowledge, information and quality of their product. We are extremely happy with our
			solar panels not only are we saving money, but they also look great too. We would highly
			recommend Maximum solar.”
		</p>
		<p class=" mt-6 text-lg text-white">-Sabrina Symons</p>
	</div>
</section>
