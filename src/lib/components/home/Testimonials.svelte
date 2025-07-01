<script>
	import Tp from '$lib/assets/TP.svelte';
	import {
		Carousel,
		CarouselContent,
		CarouselItem,
		CarouselNext,
		CarouselPrevious
	} from '$lib/components/ui/carousel';
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { ArrowRight, X, Star } from '@lucide/svelte';

	function handleAnchorClick(event) {
		event.preventDefault();
		const link = event.currentTarget;
		const anchorId = new URL(link.href).hash.replace('#', '');
		const anchor = document.getElementById(anchorId);
		window.scrollTo({
			top: anchor.offsetTop - 100,
			behavior: 'smooth'
		});
	}

	let testimonials = [
		{
			name: 'Matthew Adams',
			date: '13 January 2024',
			headline: 'Had a great experience dealing with this company',
			text: 'Had a great experience dealing with this company. Found them to be very professional and easy to deal with. Recommend these guys for anyone going down this path - Matt',
			rating: 5
		},
		{
			name: 'Karen Trousselot',
			date: '11 January 2024',
			headline: 'Professional Service',
			text: 'The Maximum Solar team were very professional to deal with, fast turn around times with solution proposal, quotation, scheduling the job and implementing the solar system. Very happy with the product and the business dealings.',
			rating: 5
		},
		{
			name: 'Denis Mayne',
			date: '10 January 2024',
			headline: 'Maximum Solar 5 stars',
			text: 'Maximum Solar (Company) I dealt with two fine honest young men in Antonio and Patrick. They gave me the correct information required to make a decision. I have replaced my old system with a 13.2KW system and battery system. This was completed in a full day by their installation crew lead by Oliver, everyone in the crew knew their skill. I would recommend Maximum Solar with a 5 star.',
			rating: 5
		},
		{
			name: 'Lyn',
			date: '29 December 2023',
			headline: 'Maximum Solar',
			text: 'We went through Maximum Solar after a friends recommendation. We upgraded our old system to a bigger one and we couldn’t be happier with the whole process.',
			rating: 5
		},
		{
			name: 'Hamish Brass',
			date: '19 December 2023',
			headline: 'Awesome service, exactly what I needed',
			text: 'Super friendly and helpful team. Knowledgeable and communicated every detail well. Highly recommend.',
			rating: 5
		},
		{
			name: 'Chitti Lardi',
			date: '8 December 2023',
			headline: 'Great team. Fantastic Service',
			text: 'Antonio and his team are so professional and easy to work with. Squeezed us in before Chrissie and now we don’t even have to use the electrical system for hot water with all the sunshine we’re having. Highly recommend!',
			rating: 5
		},
		{
			name: 'Andras',
			date: '8 December 2023',
			headline: 'Easy and smooth process',
			text: 'They have been very professional with a good knowledge. The process was very smooth, it was easy to communicate. I’d highly recommend.',
			rating: 5
		},
		{
			name: 'Monica Bianchi',
			date: '7 December 2023',
			headline: 'Above and beyond',
			text: 'Really happy with the whole process with these guys. The staff are friendly and genuine, and they went above and beyond to get me locked in before the New Year. Cheers guys, definitely going to recommend you to anyone I know that might be interested in Solar.',
			rating: 5
		}
	];
</script>

<!-- Testimonials Section -->
<section class=" py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			<h2 class="font-heading mt-6 text-4xl text-balance sm:text-7xl">What our customers say</h2>
			<p class="mx-auto mt-4 max-w-2xl pb-4 text-lg">
				Join hundreds of satisfied Tasmanian homeowners who have transformed their energy future
				with Maximum Solar.
			</p>
			<Tp />
		</div>

		<div class="mt-24 lg:mt-12">
			<div>
				<Carousel opts={{ align: 'start', loop: true }}>
					<CarouselContent class="-ml-4">
						{#each testimonials as testimonial}
							<CarouselItem class="pl-4 md:basis-1/3 lg:basis-1/3">
								<Card
									class="flex h-full flex-col rounded-none border-0 bg-[#FFC640]  transition-all"
								>
									<CardHeader class="pb-2 text-center">
										<div class="flex justify-center">
											{#each Array(5) as _, j}
												<Star
													class="h-5 w-5 {j < testimonial.rating
														? 'fill-black text-black'
														: 'fill-gray-200 text-gray-200'}"
												/>
											{/each}
										</div>
										<CardTitle class="mt-3 h-8 text-xl text-black">{testimonial.headline}</CardTitle
										>
									</CardHeader>
									<CardContent class="flex-1 text-center">
										<div class="h-40 overflow-y-auto pr-1">
											<p class="text-black/80">{testimonial.text}</p>
										</div>
									</CardContent>
									<CardFooter class="mt-auto pt-4">
										<div class="flex w-full items-center justify-center text-center">
											<div>
												<p class="font-semibold text-black">{testimonial.name}</p>
												<p class="text-sm text-black/70">{testimonial.date}</p>
											</div>
										</div>
									</CardFooter>
								</Card>
							</CarouselItem>
						{/each}
					</CarouselContent>
					<div class="mt-8 flex items-center justify-center gap-2">
						<CarouselPrevious
							class="border border-black bg-black text-white hover:bg-black/80 hover:text-white"
						/>
						<CarouselNext
							class="border border-black bg-black text-white hover:bg-black/80 hover:text-white"
						/>
					</div>
				</Carousel>
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
</section>
