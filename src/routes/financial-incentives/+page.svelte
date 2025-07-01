<script>
	import { ArrowRight } from '@lucide/svelte';
	import * as Accordion from '$lib/components/ui/accordion';
</script>

<section class="relative flex w-full flex-col items-center justify-center pt-60 pb-24">
	<enhanced:img
		src="/src/lib/assets/images/financial-incentives.jpg"
		alt="Hero background"
		class="absolute inset-0 h-full w-full object-cover"
	/>
	<div class="absolute inset-0 bg-black opacity-50"></div>
	<h1
		class="font-heading relative z-10 mx-auto max-w-5xl px-6 text-center text-6xl text-white lg:text-7xl/24"
	>
		Financial incentives to help you go green.
	</h1>
</section>

<section id="about" class="mx-auto pt-12 pb-24">
	<div class="relative isolate overflow-hidden px-6 py-12 text-center sm:px-16 lg:py-24">
		<h2 class=" mx-auto max-w-5xl text-center text-lg text-balance lg:text-xl">
			Solar energy is a renewable and clean source of power that harnesses energy from the sun to
			produce electricity. Generating power this way does not produce harmful greenhouse gasses into
			the atmosphere, which has a positive effect on the environment.
		</h2>

		<p class="mx-auto mt-10 max-w-5xl text-center text-base text-balance lg:text-lg">
			The Tasmanian state government has set ambitious renewable energy targets to be net zero by
			2030 and the installation of solar panels plays a crucial role in achieving these goals. By
			incentivising solar panel installation, Tasmania is taking a proactive approach towards
			transitioning to a greener and more sustainable energy future. Below are some of the available
			financial incentives to help people go renewable.
		</p>
	</div>
</section>

<section class="custom-gradient pb-32">
	<div class="mx-auto max-w-7xl px-4">
		<h2
			class="font-heading mx-auto max-w-2xl text-center text-4xl font-semibold text-balance sm:text-5xl"
		>
			Available Incentives
		</h2>
		<div
			class="mx-auto mt-12 grid max-w-2xl grid-cols-1 items-start gap-x-12 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2"
		>
			<div class="order-2 flex h-full w-full flex-col">
				<div class="max-w-xl">
					<p class="col-span-1 mt-6 text-xl leading-7 font-bold italic">
						You don’t always have to pay upfront to afford solar.
					</p>

					<p class="col-span-1 mt-6 pb-6 text-lg leading-7 lg:pb-20">
						There are many ways to work around your financial situation, so book a consultation with
						us today to find out what you’re eligible to receive.
					</p>
					<a
						href="/contact"
						class=" rounded-full bg-black px-8 py-3 text-center text-sm font-semibold text-white hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
					>
						Book an appointment
						<ArrowRight class="ml-2 inline h-4 w-4" />
					</a>
				</div>
			</div>

			<div>
				<div class="text-base leading-7">
					<div class="max-w-xl">
						<div class="mt-6 w-full max-w-lg rounded-3xl bg-[#FFC640] p-6 pb-12">
							<!-- <h2 class="mb-4 font-heading text-xl font-semibold lg:text-3xl">{section.title}</h2> -->
							<Accordion.Root type="single" class="w-full border-b border-black">
								<Accordion.Item class="border-b-black">
									<Accordion.Trigger class="font-heading w-full py-8 text-left text-3xl font-bold"
										>Solar Rebates</Accordion.Trigger
									>
									<Accordion.Content class="w-full py-2 pl-4">
										<div class="p-4 font-sans">
											<p class="mb-4">
												On a national scale, the Australian Federal Government implemented what’s
												called the “Small-scale Renewable Energy Scheme” to help households and
												businesses reduce the upfront cost of installing solar.
											</p>
											<p class="mb-4">
												How it works is that the scheme will award a number of Small-scale
												Technology Certificates (STCs) to eligible households and businesses that
												install solar panels at their premises.
											</p>
											<p class="mb-2 text-lg font-bold">Important information:</p>
											<ul class="list-disc space-y-2 pl-5">
												<li>
													STCs are available to everyone in Australia, be it businesses or
													households.
												</li>
												<li>
													You do not need to apply for them. Your solar retailer would redeem them
													for you, then apply it as a point of sale discount when you purchase your
													solar system.
												</li>
												<li>Without STCs, the cost of solar would be at least 30% higher.</li>
												<li>
													There is no limit as to the number of properties you can get STCs for i.e.
													you can get them for your main residence, your investment property, your
													small business ... there are no limits.
												</li>
												<li>
													The earlier you switch to solar, the higher the value of STCs you'll get
													hence the greater discount applicable for your solar system.
												</li>
											</ul>
										</div>
									</Accordion.Content>
								</Accordion.Item>
								<Accordion.Item class="border-b-black">
									<Accordion.Trigger class="font-heading w-full py-8 text-left text-3xl font-bold"
										>Referral Bonuses</Accordion.Trigger
									>
									<Accordion.Content class="w-full py-2 pl-4">
										<div class="p-4 font-sans">
											<p class="mb-4">
												Maximum Solar is all for rewarding those who bring business to us.
											</p>
											<p class="mb-4">
												We can sponsor clubs with discounted membership prices, give referral cash
												bonuses, or vouchers to local stores.
											</p>
											<p class="mb-4">Enquire with us today to see how you can earn with us!</p>
										</div>
									</Accordion.Content>
								</Accordion.Item>
							</Accordion.Root>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="relative flex w-full flex-col items-center justify-center py-36">
	<enhanced:img
		src="/src/lib/assets/images/financial-incentives-2.jpeg"
		alt="Hero background"
		class="absolute inset-0 h-full w-full object-cover object-bottom"
	/>
	<div class="absolute inset-0 bg-black opacity-20"></div>
	<h4
		class="font-heading relative z-10 mx-auto max-w-7xl px-6 text-center text-6xl text-white lg:text-7xl/24"
	>
		Solar Brilliance, Financial Resiliance.
	</h4>
</section>
