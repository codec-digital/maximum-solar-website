<script>
	import ContactDialog from '$lib/components/home/ContactDialog.svelte';
	import { X, Phone, Play } from '@lucide/svelte';

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

<section class="relative overflow-hidden bg-black pt-14">
	<div class="absolute inset-0 z-0">
		<enhanced:img
			class="h-full w-full object-cover opacity-60"
			src="/src/lib/assets/images/hero.jpg"
			sizes="min(1280px, 100vw)"
			alt="Solar panels on Tasmanian home"
		/>
		<!-- Simple overlay gradient -->
		<div class="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/5"></div>
	</div>

	<div class="relative mx-auto max-w-7xl px-6 pt-56 pb-24 lg:px-8 lg:pt-96 lg:pb-20">
		<div class=" max-w-2xl">
			<div class="text-left">
				<h1 class="font-heading max-w-4xl text-5xl font-bold text-white lg:text-7xl">
					<span class="block">Be the Change.</span>
					<span class="mt-2 block text-[#FFC640]">Save the Change.</span>
				</h1>
				<p class="font-heading mt-6 max-w-xl text-2xl font-medium text-white">
					High quality solar and battery installations for Australian properties
				</p>
				<div class="mt-10 flex flex-col items-start justify-start gap-4 lg:flex-row">
					<ContactDialog />
					<a
						href="#about"
						on:click={handleAnchorClick}
						class="hidden items-center justify-center gap-2 rounded-full border-2 border-white/50 bg-black/30 px-8 py-4 text-base font-semibold text-white transition hover:bg-black/50 sm:text-lg lg:flex"
					>
						<Play class="h-5 w-5" />
						See How It Works
					</a>
					<a
						href="tel:1300457542"
						class="mt-2 flex items-center gap-3 text-2xl font-semibold text-white transition lg:hidden"
					>
						<div
							class="font-heading flex items-center justify-center rounded-full bg-[#FFC640] p-2"
						>
							<Phone class="h-6 w-6 fill-black text-black" />
						</div>
						<span class="font-heading font-semibold underline">1300 457 542</span>
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
