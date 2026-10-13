<script>
	import {
		Carousel,
		CarouselContent,
		CarouselItem,
		CarouselNext,
		CarouselPrevious
	} from '$lib/components/ui/carousel';
	import lauderdale from '$lib/assets/images/community-clubs/logos/lauderdale-football-club.png?enhanced';
	import richmond from '$lib/assets/images/community-clubs/logos/richmond-football-club.jpg?enhanced';
	import whitemore from '$lib/assets/images/community-clubs/logos/whitemore-warriors-cricket-club.jpg?enhanced';
	import kingborough from '$lib/assets/images/community-clubs/logos/kingborough-lions-united-fc.png?enhanced';
	import football1 from '$lib/assets/images/community-clubs/images/football-match-1.jpg?enhanced';
	import football2 from '$lib/assets/images/community-clubs/images/football-match-2.jpg?enhanced';
	import football3 from '$lib/assets/images/community-clubs/images/football-match-3.jpg?enhanced';
	import football4 from '$lib/assets/images/community-clubs/images/football-match-4.jpg?enhanced';
	import soccer1 from '$lib/assets/images/community-clubs/images/soccer-match-1.jpg?enhanced';
	import soccer2 from '$lib/assets/images/community-clubs/images/soccer-match-2.jpg?enhanced';

	// `bleed` logos come with their own background, so they fill the tile edge to edge
	const clubs = [
		{ name: 'Lauderdale Football Club', logo: lauderdale, bleed: true },
		{ name: 'Richmond Football Club (TAS)', logo: richmond, bleed: true },
		{ name: 'Whitemore Warriors Cricket Club', logo: whitemore },
		{ name: 'Kingborough Lions United Football Club', logo: kingborough }
	];

	const photos = [
		{
			src: soccer1,
			alt: 'A soccer player celebrating with arms outstretched in front of Maximum Solar signage'
		},
		{
			src: football3,
			alt: 'A women’s football match with a Maximum Solar sign on the boundary fence'
		},
		{
			src: football2,
			alt: 'Footballers contesting a mark in front of Maximum Solar boundary signage'
		},
		{
			src: soccer2,
			alt: 'A soccer player raising both arms in front of Maximum Solar banners'
		},
		{
			src: football4,
			alt: 'A football match in play with a Maximum Solar sign on the boundary fence'
		},
		{
			src: football1,
			alt: 'Football players and an umpire beside Maximum Solar banners on the ground fence'
		}
	];
</script>

<section class="px-6 py-20 text-center sm:px-16">
	<h2 class="font-heading mx-auto mt-6 max-w-5xl text-4xl text-balance sm:text-6xl/18">
		Community Clubs We Support
	</h2>
	<p class="font-heading mx-auto mt-6 max-w-2xl text-2xl/8 text-pretty">
		We’re proud to back local Tasmanian sport, on the field and off it.
	</p>

	<ul class="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-x-10">
		{#each clubs as club}
			<li class="flex flex-col items-center">
				<div
					class="aspect-square w-full max-w-44 overflow-hidden rounded-3xl border border-black/10 bg-white {club.bleed
						? ''
						: 'p-4'}"
				>
					<enhanced:img
						src={club.logo}
						alt="{club.name} logo"
						sizes="176px"
						class="h-full w-full {club.bleed ? 'object-cover' : 'object-contain'}"
					/>
				</div>
				<p class="font-heading mt-4 max-w-44 text-lg/6 text-balance">{club.name}</p>
			</li>
		{/each}
	</ul>

	<div class="mx-auto mt-16 h-1 w-24 rounded-full bg-[#FFC640]"></div>

	<div class="-mx-6 mt-16 max-w-screen-2xl sm:mx-auto">
		<Carousel opts={{ align: 'start', loop: true }}>
			<CarouselContent class="ml-0 sm:-ml-4">
				{#each photos as photo}
					<CarouselItem class="basis-auto pl-6 sm:pl-4">
						<enhanced:img
							src={photo.src}
							alt={photo.alt}
							sizes="(min-width: 1024px) 576px, 336px"
							class="h-56 w-auto rounded-3xl sm:h-80 lg:h-96"
						/>
					</CarouselItem>
				{/each}
			</CarouselContent>
			<div class="mt-8 flex items-center justify-center gap-2">
				<CarouselPrevious
					class="static translate-y-0 border border-black bg-black text-white hover:bg-black/80 hover:text-white"
				/>
				<CarouselNext
					class="static translate-y-0 border border-black bg-black text-white hover:bg-black/80 hover:text-white"
				/>
			</div>
		</Carousel>
	</div>
</section>
