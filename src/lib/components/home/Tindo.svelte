<script>
	import * as Accordion from '$lib/components/ui/accordion';

	let value = 'item-1';
	const faqSections = [
		{
			title: 'Maximum Solar',
			items: [
				{
					question: 'Australian-Made Excellence',
					answer: `
					By choosing Tindo, we get to support local innovation and jobs while ensuring we can provide top-quality products designed specifically for our climate.
         `
				},
				{
					question: 'Superior Performance',
					answer: `
					Tindo's panels consistently outperform in independent tests, demonstrating excellent efficiency and durability in Australia's harsh conditions. Their latest Walara Series offers up to 20.4% efficiency, maximising energy production for our clients.
         `
				},
				{
					question: 'Unmatched Warranty',
					answer: `Tindo's 25-year full manufacturer's replacement warranty gives us and our customers peace of mind, reflecting our confidence in their products' longevity and performance.`
				},
				{
					question: 'Environmental Commitment',
					answer: `By using Tindo panels, we reduce the carbon footprint associated with long-distance shipping. Tindo also uses renewable energy in their manufacturing process, aligning with our own sustainability goals.`
				},
				{
					question: 'Cutting-Edge Technology',
					answer: `Tindo employs advanced manufacturing techniques, including advanced robotics and AI, ensuring consistent high quality. Their panels feature innovative designs like the M10 solar cells and half-cut cell technology.`
				},
				{
					question: 'Future-Focused Innovation',
					answer: `Tindo's commitment to growth and innovation, including plans for a $100 million Gigafactory, ensures we'll have access to cutting-edge solar technology for years to come.`
				}
			]
		}
	];
</script>

<section class="custom-gradient py-20">
	<div class="mx-auto max-w-screen-2xl px-4">
		<div
			class="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-12 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2"
		>
			<div class="order-2 flex h-full w-full flex-col items-center justify-center">
				<div class="mb-6 flex items-center justify-center gap-10">
					<a
						href="https://tindosolar.com.au/"
						aria-label="tindo solar"
						target="_blank"
						rel="noopener noreferrer"
					>
						<enhanced:img
							src="/src/lib/assets/images/logos/tindo-partner.png"
							alt="tindo solar"
							class="h-24 w-auto"
						/>
					</a>
					<enhanced:img
						src="/src/lib/assets/images/logos/aus-made.png"
						alt="aus made"
						class="h-24 w-auto"
					/>
				</div>
				<div class="aspect-video w-full max-w-4xl">
					<iframe
						width="100%"
						height="100%"
						src="https://www.youtube.com/embed/dmxM1Kff5Fc"
						title="YouTube video player"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowfullscreen
						class="rounded-lg shadow-lg"
					></iframe>
				</div>
			</div>

			<div>
				<div class="text-base leading-7">
					<h2 class=" font-heading text-4xl tracking-tight sm:text-6xl">Why We Use Tindo Solar</h2>
					<div class="max-w-xl">
						<p class="col-span-1 mt-6 leading-7">
							By partnering with Tindo Solar, we offer our customers not just a solar panel, but a
							piece of Australian innovation that delivers exceptional performance, durability, and
							value.
						</p>

						<p class="col-span-1 mt-6 leading-7">
							It's our way of supporting the local economy while providing the best solar solutions
							to our clients.
						</p>
						{#each faqSections as section, sectionIndex}
							<div class="mt-6 w-full max-w-2xl">
								<!-- <h2 class="mb-4 font-heading text-xl font-semibold lg:text-3xl">{section.title}</h2> -->
								<Accordion.Root type="single" class="w-full">
									{#each section.items as item, itemIndex}
										<Accordion.Item class="border-b-black">
											<Accordion.Trigger class="font-heading w-full text-left text-3xl font-bold"
												>{item.question}</Accordion.Trigger
											>
											<Accordion.Content class="w-full py-2 pl-4">
												<p class="pb-10 text-base">{item.answer}</p>
											</Accordion.Content>
										</Accordion.Item>
									{/each}
								</Accordion.Root>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.custom-gradient {
		background: linear-gradient(
			to top right,
			rgba(255, 198, 64, 0.7) 0%,
			rgba(255, 198, 64, 0.2) 30%,
			transparent 50%
		) !important;
	}
</style>
