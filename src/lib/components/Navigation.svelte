<script>
	import { X, Phone } from '@lucide/svelte';
	import { Sheet, SheetTrigger, SheetContent } from '$lib/components/ui/sheet'; // Correct import path
	import * as Popover from '$lib/components/ui/popover/index.js';
	import * as Accordion from '$lib/components/ui/accordion/index.js';

	let sheetOpen = false;
	let servicesPopoverOpen = false;
	let maintenancePopoverOpen = false;
	let aboutPopoverOpen = false;

	/**
	 * Handles anchor link clicks by closing the sheet and then scrolling to the target section.
	 * @param {Event} event - The click event.
	 * @param {string} targetId - The ID of the element to scroll to.
	 */
	async function handleAnchorClick(event, targetId) {
		event.preventDefault(); // Prevent default anchor behavior

		// Close the sheet first
		sheetOpen = false;

		// Wait for the sheet to close (adjust delay if needed for animation)
		await new Promise((resolve) => setTimeout(resolve, 300)); // Example delay

		const anchor = document.getElementById(targetId);

		if (anchor) {
			// Smooth scroll to the target section
			anchor.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
	}
</script>

<header class="absolute inset-x-0 top-0 z-50 mx-auto max-w-screen-2xl">
	<nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
		<div class="flex lg:flex-1">
			<a href="/" class="-m-1.5 p-1.5">
				<span class="sr-only">Maximum Solar</span>
				<enhanced:img
					src="/src/lib/assets/images/logo-transparent.png"
					alt="Maximum Solar"
					class="absolute top-4 h-36 w-36"
				/>
			</a>
		</div>
		<div class="flex lg:hidden">
			<Sheet bind:open={sheetOpen}>
				<SheetTrigger>
					<button
						type="button"
						class="-m-2.5 inline-flex cursor-pointer items-center justify-center rounded-full bg-black p-2.5 text-[#FFC640]"
					>
						<span class="sr-only">Open main menu</span>
						<svg
							class="size-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
							data-slot="icon"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
							/>
						</svg>
					</button>
				</SheetTrigger>
				<SheetContent
					side="right"
					class="flex flex-col bg-black p-6 text-white"
					style="border-left: none;"
				>
					<!-- Phone button at the top of mobile nav -->
					<div class="mt-12 flex justify-end">
						<a
							href="tel:1300457542"
							class="flex items-center gap-3 text-xl font-semibold text-white transition"
						>
							<div
								class="font-heading flex items-center justify-center rounded-full bg-[#FFC640] p-2"
							>
								<Phone class="h-5 w-5 fill-black text-black" />
							</div>
							<span class="font-heading font-semibold underline">1300 457 542</span>
						</a>
					</div>

					<!-- Navigation links -->
					<div class=" font-heading flex flex-col text-right">
						<Accordion.Root type="single" class="">
							<Accordion.Item value="item-1">
								<Accordion.Trigger
									class="flex flex-row-reverse items-center justify-start text-right text-lg"
									>Services</Accordion.Trigger
								>
								<Accordion.Content class="mr-2 flex flex-col gap-4 text-lg">
									<a
										href="/residential-solar"
										class="hover:underline"
										on:click={() => (sheetOpen = false)}>Residential Solar</a
									>
									<a
										href="/commercial-solar"
										class="hover:underline"
										on:click={() => (sheetOpen = false)}>Commercial Solar</a
									>
								</Accordion.Content>
							</Accordion.Item>
						</Accordion.Root>
						<Accordion.Root type="single" class="">
							<Accordion.Item value="item-1">
								<Accordion.Trigger
									class="flex flex-row-reverse items-center justify-start text-right text-lg"
									>Maintenance</Accordion.Trigger
								>
								<Accordion.Content class="mr-2 flex flex-col gap-4 text-lg">
									<a
										href="/system-inspections"
										class="hover:underline"
										on:click={() => (sheetOpen = false)}>System Inspections</a
									>
									<a
										href="/maintenance-plans"
										class="hover:underline"
										on:click={() => (sheetOpen = false)}>Maintenance Plans</a
									>
									<a
										href="/site-maintenance"
										class="hover:underline"
										on:click={() => (sheetOpen = false)}>Commercial Solar</a
									>
								</Accordion.Content>
							</Accordion.Item>
						</Accordion.Root>
						<Accordion.Root type="single" class="">
							<Accordion.Item value="item-1">
								<Accordion.Trigger
									class="flex flex-row-reverse items-center justify-start text-right text-lg"
									>About</Accordion.Trigger
								>
								<Accordion.Content class="mr-2 flex flex-col gap-4 text-lg">
									<a
										href="/the-process"
										class="hover:underline"
										on:click={() => (sheetOpen = false)}>The Process</a
									>
									<a
										href="/financial-incentives"
										class="hover:underline"
										on:click={() => (sheetOpen = false)}>Financial Incentives</a
									>
								</Accordion.Content>
							</Accordion.Item>
						</Accordion.Root>
						<a
							href="/careers"
							class="mt-3 text-lg hover:underline"
							on:click={() => (sheetOpen = false)}
						>
							Careers
						</a>
						<a
							href="/contact"
							class="mt-6 text-lg hover:underline"
							on:click={() => (sheetOpen = false)}
						>
							Contact
						</a>
						<a
							href="/faq"
							class="mt-6 text-lg hover:underline"
							on:click={() => (sheetOpen = false)}
						>
							FAQ
						</a>
						<!-- <a
							href="/blog"
							class="mt-6 text-lg hover:underline"
							on:click={() => (sheetOpen = false)}
						>
							Blog
						</a> -->
					</div>

					<!-- Logo positioned halfway between nav links and bottom -->
					<div class="mt-auto mb-auto flex justify-center pt-12">
						<enhanced:img
							src="/src/lib/assets/images/logo-transparent.png"
							alt="Maximum Solar Logo"
							class="h-36 w-36"
						/>
					</div>

					<!-- Empty space at the bottom to push logo up -->
					<div class="h-12"></div>
				</SheetContent>
			</Sheet>
		</div>
		<div class="hidden lg:flex lg:gap-x-12">
			<Popover.Root bind:open={servicesPopoverOpen}>
				<Popover.Trigger class="font-heading text-md cursor-pointer text-[#FFC640]"
					>Services</Popover.Trigger
				>
				<Popover.Content
					align="start"
					class="font-heading w-auto border-0 bg-black p-3 text-base text-[#FFC640]"
				>
					<div class="flex flex-col gap-3">
						<a
							href="/residential-solar"
							class="text-md transition-colors duration-200 hover:underline"
							on:click={() => (servicesPopoverOpen = false)}>Residential Solar</a
						>
						<a
							href="/commercial-solar"
							class="text-md transition-colors duration-200 hover:underline"
							on:click={() => (servicesPopoverOpen = false)}>Commercial Solar</a
						>
					</div>
				</Popover.Content>
			</Popover.Root>
			<Popover.Root bind:open={maintenancePopoverOpen}>
				<Popover.Trigger class="font-heading text-md cursor-pointer text-[#FFC640]"
					>Maintenance</Popover.Trigger
				>
				<Popover.Content
					align="start"
					class="font-heading w-auto border-0 bg-black p-3 text-base text-[#FFC640]"
				>
					<div class="flex flex-col gap-3">
						<a
							href="/system-inspections"
							class="text-md transition-colors duration-200 hover:underline"
							on:click={() => (maintenancePopoverOpen = false)}>System Inspections</a
						>
						<a
							href="/maintenance-plans"
							class="text-md transition-colors duration-200 hover:underline"
							on:click={() => (maintenancePopoverOpen = false)}>Maintenance Plans</a
						>
						<a
							href="/site-maintenance"
							class="text-md transition-colors duration-200 hover:underline"
							on:click={() => (maintenancePopoverOpen = false)}>Site Maintenance</a
						>
					</div>
				</Popover.Content>
			</Popover.Root>
			<Popover.Root bind:open={aboutPopoverOpen}>
				<Popover.Trigger class="font-heading text-md cursor-pointer text-[#FFC640]"
					>About</Popover.Trigger
				>
				<Popover.Content
					align="start"
					class="font-heading w-auto border-0 bg-black p-3 text-base text-[#FFC640]"
				>
					<div class="flex flex-col gap-3">
						<a
							href="/the-process"
							class="text-md transition-colors duration-200 hover:underline"
							on:click={() => (aboutPopoverOpen = false)}>The Process</a
						>
						<a
							href="/financial-incentives"
							class="text-md transition-colors duration-200 hover:underline"
							on:click={() => (aboutPopoverOpen = false)}>Financial Incentives</a
						>
					</div>
				</Popover.Content>
			</Popover.Root>
			<a href="/careers" class="font-heading text-md text-[#FFC640]"> Careers </a>
			<a href="/contact" class="font-heading text-md text-[#FFC640]"> Contact </a>
			<a href="/faq" class="font-heading text-md text-[#FFC640]"> FAQ </a>
			<!-- <a href="/blog" class="font-heading text-md text-[#FFC640]"> Blog </a> -->
		</div>
		<div class="hidden lg:flex lg:flex-1 lg:justify-end">
			<a
				href="tel:1300457542"
				class="flex items-center gap-3 text-2xl font-semibold text-white transition"
			>
				<div class="font-heading flex items-center justify-center rounded-full bg-[#FFC640] p-2">
					<Phone class="h-6 w-6 fill-black text-black" />
				</div>
				<span class="font-heading font-semibold underline">1300 457 542</span>
			</a>
		</div>
	</nav>
</header>
