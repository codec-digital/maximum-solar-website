<script>
	import Seo from '$lib/components/SEO.svelte';
	import * as Accordion from '$lib/components/ui/accordion';

	const faqSections = [
		{
			title: 'Maximum Solar',
			items: [
				{
					question: 'What Are The Benefits Of Going Solar In Tasmania?',
					answer: `
					<p class="pb-6 text-base text-white">
					Going solar in Tasmania offers numerous benefits. Firstly, it can significantly reduce your electricity bills by generating your own clean energy. Tasmania's climate is well-suited for solar, with long summer days providing ample sunlight.
					</p>
					<p class="pb-6 text-base text-white">
					Additionally, solar panels increase your home's value and reduce your carbon footprint. The state government offers various incentives for solar installations, making it more affordable.
					</p>
					<p class="pb-6 text-base text-white">
					Maximum Solar, as a locally owned and operated company, understands Tasmania's unique energy needs and can provide tailored solutions. With rising energy costs, solar provides a hedge against future price increases. It also offers energy independence, reducing reliance on the grid.
					</p>
					`
				},
				{
					question: 'How Do I Know If My Roof Is Suitable For Solar Panels?',
					answer: `
					<p class="pb-6 text-base text-white">
					Determining if your roof is suitable for solar panels involves several factors. Ideally, you want a roof that receives ample sunlight throughout the day. In Tasmania, north-facing roofs are optimal, but east and west-facing roofs can also be effective.
					</p>
					<p class="pb-6 text-base text-white">
					The roof should be in good condition and able to support the weight of the panels. Maximum Solar conducts thorough site assessments to evaluate your roof's suitability.
					</p>
					`
				},
				{
					question: 'What Size Solar System Do I Need For My Home?',
					answer: `
					<p class="pb-6 text-base text-white">
					Determining the right size solar system for your home depends on several factors. Maximum Solar considers your current energy consumption, which can be found on your electricity bills. They also take into account your future energy needs, budget, and available roof space. A typical Tasmanian home might benefit from a 5-6kW system, but this can vary.
					</p>
					<p class="pb-6 text-base text-white">
					Factors like your household size, energy usage patterns, and whether you plan to add energy-intensive appliances in the future also play a role. Maximum Solar's experts will analyse your specific situation and recommend a system size that balances your energy needs with optimal return on investment.
					</p>
					`
				},
				{
					question: 'How Much Can I Save On My Electricity Bills With Solar?',
					answer: `
					<p class="pb-6 text-base text-white">
					The amount you can save on electricity bills with solar varies depending on factors such as your system size, energy consumption, and local electricity rates. However, many Tasmanian households see significant savings.
					</p>
					<p class="pb-6 text-base text-white">
					With a properly sized system from Maximum Solar, you could potentially reduce your electricity bills by 50-90%. The exact savings depend on how much of your generated solar power you use directly and how much you export to the grid.
					</p>
					`
				},
				{
					question: 'What Maintenance Is Required For A Solar Panel System?',
					answer: `
					<p class="pb-6 text-base text-white">
					Solar panel systems from Maximum Solar are designed to be low-maintenance. The panels themselves are durable and typically only require occasional cleaning to remove dust or debris. In most cases, rainfall is sufficient to keep the panels clean.
					</p>
					`
				},
				{
					question: 'How Long Do Solar Panels Last?',
					answer: `
					<p class="pb-6 text-base text-white">
					Solar panels from Maximum Solar are built to last. Typically, high-quality solar panels have a lifespan of 25-30 years, and many continue to produce significant amounts of energy even beyond this timeframe. Maximum Solar uses tier 1 panels known for their durability and longevity. These panels are designed to withstand Tasmania's varied weather conditions, including strong winds and hail.
					</p>
					`
				},
				{
					question: 'Can I Add Battery Storage To My Solar System?',
					answer: `
					<p class="pb-6 text-base text-white">
					Yes, Maximum Solar offers battery storage solutions that can be added to your solar system. Battery storage allows you to store excess energy generated during the day for use at night or during power outages, increasing your energy independence. While batteries can be added at any time, it's often more cost-effective to consider them during the initial solar installation.
					</p>
					<p class="pb-6 text-base text-white">
					Maximum Solar can design your system with future battery addition in mind.
					</p>
					`
				},
				{
					question: 'What Happens To My Solar System During A Power Outage?',
					answer: `
					<p class="pb-6 text-base text-white">
					During a power outage, standard grid-connected solar systems will automatically shut down as a safety measure to prevent feeding power back into the grid, which could endanger utility workers. However, Maximum Solar offers solutions to keep your power on during outages. One option is to add battery storage to your system with a specialised inverter.
					</p>
					<p class="pb-6 text-base text-white">
					This setup can automatically isolate from the grid during an outage, allowing your solar panels to continue powering your home and charging your batteries. Another option is a hybrid system that can operate both on and off-grid.
					</p>
					`
				},
				{
					question: 'How Does The Installation Process Work With Maximum Solar?',
					answer: `
					<p class="pb-6 text-base text-white">
					The installation process with Maximum Solar is streamlined and customer-focused. It begins with a free consultation where our experts assess your energy needs and property.
					</p>
					<p class="pb-6 text-base text-white">
					We then design a customised solar solution and provide a detailed quote. Once you approve, Maximum Solar handles all necessary paperwork, including permits and grid connection applications.
					</p>
					`
				},
				{
					question: 'Are There Any Government Incentives Available For Solar In Tasmania?',
					answer: `
					<p class="pb-6 text-base text-white">
					Yes, there are government incentives available for solar installations in Tasmania. The main federal incentive is the Small-scale Renewable Energy Scheme (SRES), which provides Small-scale Technology Certificates (STCs) based on the amount of electricity your system is expected to produce until 2030. These STCs can be sold to recoup a portion of your installation costs, and Maximum Solar can handle this process for you, offering the value as an upfront discount.
					</p>
					<p class="pb-6 text-base text-white">
					At the state level, Tasmania offers a feed-in tariff for excess energy exported to the grid, although rates can vary between retailers. Some local councils also offer their own incentives. Additionally, businesses may be eligible for instant asset write-off schemes.
					</p>
					<p class="pb-6 text-base text-white">
					Maximum Solar stays up-to-date with all available incentives and can help you understand and access all benefits you're eligible for, maximising your savings on your solar investment.
					</p>
					`
				}
			]
		}
	];
</script>

<Seo
	title="FAQ - Solar Panel Questions Answered by Maximum Solar Tasmania"
	description="Get answers to common solar panel questions from Tasmania's solar experts. Learn about solar benefits, system sizing, maintenance, costs, and more. Maximum Solar FAQ guide."
	keywords="solar panel FAQ, solar questions Tasmania, solar panel benefits, solar system size, solar maintenance, solar costs, solar installation questions, Maximum Solar FAQ"
	type="WebPage"
/>
<section id="about" class="mx-auto">
	<div
		class="relative isolate overflow-hidden bg-black px-6 pt-60 pb-24 text-center shadow-2xl sm:px-16"
	>
		<h2
			class="font-heading mx-auto max-w-2xl text-left text-4xl font-semibold text-balance text-white sm:text-5xl"
		>
			Frequently Asked Questions
		</h2>
		<p class="mx-auto mt-6 max-w-2xl text-left text-lg text-pretty text-white">
			Welcome to Maximum Solar’s Frequently Asked Questions page. We understand that making the
			switch to solar energy can come with many questions. Whether you’re curious about the benefits
			of solar power in Tasmania, wondering about system sizes, or have questions about installation
			and maintenance, we’re here to help.
		</p>
		<p class="mx-auto mt-6 max-w-2xl text-left text-base text-pretty text-white">
			Our team of local experts has compiled answers to the most common questions we receive from
			our customers. We hope this information helps you make an informed decision about embracing
			clean, renewable energy for your home or business. If you don’t find the answer you’re looking
			for, don’t hesitate to contact us directly. At Maximum Solar, we’re committed to guiding you
			through every step of your solar journey.
		</p>
		{#each faqSections as section, sectionIndex}
			<div class="mx-auto mt-6 w-full max-w-2xl">
				<!-- <h2 class="mb-4 font-heading text-xl font-semibold lg:text-3xl">{section.title}</h2> -->
				<Accordion.Root type="single" class="w-full">
					{#each section.items as item, itemIndex}
						<Accordion.Item class="border-b">
							<Accordion.Trigger
								class="font-heading w-full py-4 text-left text-xl font-bold text-white lg:py-8 lg:text-3xl"
								>{item.question}</Accordion.Trigger
							>
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
