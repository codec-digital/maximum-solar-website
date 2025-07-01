<script>
	import ContactDialog from './ContactDialog.svelte';

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
</script>

<div id="about" class="mx-auto">
	<div class="relative isolate overflow-hidden bg-black px-6 py-20 text-center shadow-2xl sm:px-16">
		<enhanced:img
			src="/src/lib/assets/images/logo-transparent.png"
			alt="Maximum Solar"
			class="mx-auto max-w-48"
		/>

		<h2 class="font-heading mt-6 text-4xl font-semibold text-balance text-white sm:text-7xl">
			Our mission
		</h2>
		<p class="font-heading mx-auto mt-6 max-w-2xl text-2xl/8 text-pretty text-white">
			Run by long time Tassie locals Patrick Bass and Antonio Macri, Maximum Solar brings experience
			and knowledge into Tasmania’s energy industry.
		</p>
		<div
			class="mx-auto mt-20 flex max-w-7xl flex-col items-center justify-center gap-x-6 gap-y-4 lg:flex-row"
		>
			<div
				class="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-12 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2"
			>
				<div class=" h-full w-full object-cover">
					<enhanced:img
						alt="Coal River Valley"
						src="$lib/assets/images/mission.jpg"
						class="block h-full w-auto object-cover"
						loading="lazy"
					/>
				</div>

				<div>
					<div class="text-base leading-7 text-white">
						<!-- <h2 class=" font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
							Craft Your Own Experience
						</h2> -->
						<div class="max-w-xl text-lg">
							<p class="col-span-1 text-left leading-7">
								With 13 years industry experience, the team at Maximum Solar are committed to
								providing long lasting, high quality service and products to the people of Tasmania.
							</p>
							<p class="col-span-1 mt-6 text-left leading-7">
								As a locally owned and operated Tasmanian company with offices in Hobart and
								Launceston, our mission at Maximum solar is to provide exceptional solar energy
								solutions to both the local community statewide and to the rest of Australia.
							</p>
							<p class="col-span-1 mt-6 text-left leading-7">
								We take pride in using only the best tier 1 products for our solar installations,
								known for their high quality, reliability, and efficiency. With exceptional
								warranties, we ensure that our customers have peace of mind knowing that their solar
								panels and other components are protected for the long term.
							</p>
							<div class="mt-8 text-left"><ContactDialog /></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
